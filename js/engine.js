/* JS30 engine: runs a student's JavaScript safely and can record every step.
   Used by the web worker (js/worker.js), the web preview (js/web.js) and the lesson checker (tools/check-lessons.js).
   - instrument(code, mode) parses the code with acorn and inserts small calls:
       __L(line)            before every statement (current line, step budget)
       __s(line, getters)   instead of __L in "trace" mode (snapshot of the variables)
       __g()                at the start of every loop body (stops infinite loops)
       __enter / __exit / __r   around function bodies and return values ("trace" mode)
     Inserted text never contains a newline, so line numbers stay the same as the student's code.
   - execute(code, opts) runs it with console.log, prompt, alert and fake timers, and returns
     { segs: [[kind, text]...], error, steps?, truncated? }. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory(require("../assets/vendor/acorn/acorn.js"));
  else root.JSEngine = factory(root.acorn);
})(typeof self !== "undefined" ? self : this, function (acorn) {
  "use strict";

  const MAX_OUT = 20000;        // characters of output
  const MAX_LOOP = 5000000;     // loop iterations in one run
  const MAX_LINES = 20000000;   // statements in one run
  const MAX_STEPS = 800;        // recorded steps in trace mode
  const MAX_TIMERS = 2000;      // timer callbacks in one run

  class Stop extends Error { constructor(type, msg) { super(msg); this.stopType = type; } }

  // ---------------------------------------------------------------- value formatting (Chrome console style)
  // Self-contained (no outside names), so web.js can copy it into a web page preview with toString().
  function formatLib() {
    const IDENT = /^[A-Za-z_$][\w$]*$/;
    function quote(s) { return "'" + String(s).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "'"; }
    function format(v, top, depth, seen) {
      depth = depth || 0; seen = seen || [];
      const t = typeof v;
      if (t === "string") return top ? v : quote(v);
      if (t === "number") return Object.is(v, -0) ? "-0" : String(v);
      if (t === "bigint") return v + "n";
      if (t === "boolean" || t === "undefined" || v === null) return String(v);
      if (t === "symbol") return v.toString();
      if (t === "function") {
        const n = v.name;
        if (/^class\b/.test(Function.prototype.toString.call(v))) return "class " + (n || "(anonymous)");
        return "ƒ " + (n || "") + "()";
      }
      if (seen.indexOf(v) >= 0) return "[Circular]";
      if (v instanceof Error) return (v.name || "Error") + ": " + v.message;
      if (v instanceof Date) return isNaN(v) ? "Invalid Date" : v.toString();
      if (v instanceof RegExp) return String(v);
      const next = seen.concat([v]);
      if (Array.isArray(v)) {
        if (depth > 2) return "Array(" + v.length + ")";
        const items = [];
        for (let i = 0; i < v.length && i < 100; i++) items.push(i in v ? format(v[i], false, depth + 1, next) : "empty");
        if (v.length > 100) items.push("… " + (v.length - 100) + " more");
        return "[" + items.join(", ") + "]";
      }
      if (v instanceof Map) {
        if (depth > 2) return "Map(" + v.size + ")";
        return "Map(" + v.size + ") {" + Array.from(v).map(([k, x]) => format(k, false, depth + 1, next) + " => " + format(x, false, depth + 1, next)).join(", ") + "}";
      }
      if (v instanceof Set) {
        if (depth > 2) return "Set(" + v.size + ")";
        return "Set(" + v.size + ") {" + Array.from(v).map(x => format(x, false, depth + 1, next)).join(", ") + "}";
      }
      if (typeof Node !== "undefined" && v instanceof Node) return v.nodeType === 1 ? "<" + v.tagName.toLowerCase() + (v.id ? "#" + v.id : "") + ">" : v.nodeName;
      const proto = Object.getPrototypeOf(v);
      const cname = proto && proto !== Object.prototype && proto.constructor && proto.constructor.name ? proto.constructor.name + " " : "";
      if (depth > 2) return cname + "{…}";
      const keys = Object.keys(v);
      if (!keys.length) return cname + "{}";
      const parts = keys.slice(0, 50).map(k => (IDENT.test(k) ? k : quote(k)) + ": " + format(v[k], false, depth + 1, next));
      if (keys.length > 50) parts.push("…");
      return cname + "{" + parts.join(", ") + "}";
    }
    function typeName(v) {
      if (v === null) return "null";
      if (Array.isArray(v)) return "array";
      const t = typeof v;
      if (t === "function") return /^class\b/.test(Function.prototype.toString.call(v)) ? "class" : "function";
      if (t === "object") { const p = Object.getPrototypeOf(v); return p && p !== Object.prototype && p.constructor && p.constructor.name ? p.constructor.name : "object"; }
      return t;
    }
    return { format, typeName };
  }
  const { format, typeName } = formatLib();

  // ---------------------------------------------------------------- instrumentation
  function parse(code) {
    return acorn.parse(code, { ecmaVersion: "latest", sourceType: "script", locations: true, allowHashBang: true });
  }

  function patternNames(p, out) {
    if (!p) return out;
    switch (p.type) {
      case "Identifier": out.push(p.name); break;
      case "ObjectPattern": p.properties.forEach(q => patternNames(q.type === "RestElement" ? q.argument : q.value, out)); break;
      case "ArrayPattern": p.elements.forEach(e => patternNames(e, out)); break;
      case "RestElement": patternNames(p.argument, out); break;
      case "AssignmentPattern": patternNames(p.left, out); break;
    }
    return out;
  }
  const isFn = n => n && (n.type === "FunctionDeclaration" || n.type === "FunctionExpression" || n.type === "ArrowFunctionExpression");
  const isLoop = n => /^(For|ForIn|ForOf|While|DoWhile)Statement$/.test(n.type);

  // var declarations anywhere in a function body (not inside nested functions)
  function hoistedVars(body, out) {
    (function walk(n) {
      if (!n || typeof n.type !== "string") return;
      if (isFn(n)) return;
      if (n.type === "VariableDeclaration" && n.kind === "var") n.declarations.forEach(d => patternNames(d.id, out));
      for (const k in n) {
        if (k === "loc" || k === "start" || k === "end") continue;
        const c = n[k];
        if (Array.isArray(c)) c.forEach(walk); else if (c && typeof c.type === "string") walk(c);
      }
    })(body);
    return out;
  }
  // let / const / class / function declared directly in a statement list
  function blockNames(stmts) {
    const out = [];
    stmts.forEach(s => {
      if (s.type === "VariableDeclaration" && s.kind !== "var") s.declarations.forEach(d => patternNames(d.id, out));
      else if ((s.type === "FunctionDeclaration" || s.type === "ClassDeclaration") && s.id) out.push(s.id.name);
    });
    return out;
  }

  function instrument(code, mode, lineOffset) {
    const trace = mode === "trace";
    const off = lineOffset || 0;
    const ast = parse(code);
    const edits = [];   // [pos, prio, text]
    let prio = 0;
    const ins = (pos, text) => edits.push([pos, prio++, text]);
    const scopes = [];  // {fn: bool, names: [], name}

    const getters = (names) => "[" + names.filter((n, i) => names.indexOf(n) === i).map(n => `[${JSON.stringify(n)},()=>${n}]`).join(",") + "]";
    // names visible in the current function (or in top-level blocks)
    function localNames() {
      const out = [];
      for (let i = scopes.length - 1; i >= 0; i--) {
        const s = scopes[i];
        if (s.program) break;
        out.push.apply(out, s.names);
        if (s.fn) break;
      }
      return out;
    }
    function inFunction() { for (let i = scopes.length - 1; i >= 0; i--) { if (scopes[i].fn) return true; if (scopes[i].program) return false; } return false; }
    function stepCall(line) {
      if (!trace) return `__L(${line + off});`;
      return `__s(${line + off},${getters(localNames())},${inFunction() ? 1 : 0});`;
    }

    function list(stmts) {
      stmts.forEach(s => {
        if (s.type !== "EmptyStatement" && !(s.type === "ExpressionStatement" && s.directive)) ins(s.start, stepCall(s.loc.start.line));
        walk(s);
      });
    }
    // a statement used as the body of if / loops: wrap it in { } so we can add calls
    function body(s, isLoopBody) {
      if (s.type === "BlockStatement") {
        scopes.push({ names: blockNames(s.body) });
        if (isLoopBody) ins(s.start + 1, "__g();");
        list(s.body);
        scopes.pop();
        return;
      }
      ins(s.start, "{" + (isLoopBody ? "__g();" : "") + (s.type === "EmptyStatement" ? "" : stepCall(s.loc.start.line)));
      walk(s);
      ins(s.end, "}");
    }
    function fnName(n, parent) {
      if (n.id && n.id.name) return n.id.name;
      if (parent && parent.type === "VariableDeclarator" && parent.id.type === "Identifier") return parent.id.name;
      if (parent && (parent.type === "Property" || parent.type === "MethodDefinition" || parent.type === "PropertyDefinition") && parent.key) return parent.key.name || parent.key.value || "method";
      if (parent && parent.type === "AssignmentExpression" && parent.left.type === "Identifier") return parent.left.name;
      return "anonymous";
    }
    function fn(n, parent) {
      const name = fnName(n, parent).replace(/[^\w$]/g, "");
      const params = []; n.params.forEach(p => patternNames(p, params));
      const line = n.loc.start.line;
      if (n.body.type === "BlockStatement") {
        const names = params.concat(hoistedVars(n.body, []), blockNames(n.body.body));
        if (n.type === "FunctionExpression" && n.id) names.push(n.id.name);
        scopes.push({ fn: true, names, name });
        const plain = n.generator || n.async;
        if (trace && !plain) ins(n.body.start + 1, `__enter(${JSON.stringify(name)},${line});try{`);
        n.params.forEach(walk);
        list(n.body.body);
        if (trace && !plain) ins(n.body.end - 1, `}finally{__exit()}`);
        scopes.pop();
      } else {
        scopes.push({ fn: true, names: params, name });
        n.params.forEach(walk);
        if (trace && !n.async) {
          const arrow = code.lastIndexOf("=>", n.body.start);
          const start = arrow + 2;
          ins(start, `{__enter(${JSON.stringify(name)},${line});try{${stepCall(n.body.loc.start.line)}return __r(`);
          walk(n.body);
          ins(n.end, `)}finally{__exit()}}`);
        } else walk(n.body);
        scopes.pop();
      }
    }

    function walk(n, parent) {
      if (!n || typeof n.type !== "string") return;
      if (isFn(n)) {
        if (n.type === "FunctionDeclaration") return fn(n, parent);
        return fn(n, parent);
      }
      switch (n.type) {
        case "BlockStatement":
          scopes.push({ names: blockNames(n.body) }); list(n.body); scopes.pop(); return;
        case "IfStatement":
          walk(n.test, n); body(n.consequent, false); if (n.alternate) body(n.alternate, false); return;
        case "ForStatement": {
          const names = n.init && n.init.type === "VariableDeclaration" && n.init.kind !== "var" ? n.init.declarations.reduce((a, d) => patternNames(d.id, a), []) : [];
          scopes.push({ names });
          walk(n.init, n); walk(n.test, n); walk(n.update, n); body(n.body, true);
          scopes.pop(); return;
        }
        case "ForInStatement": case "ForOfStatement": {
          const names = n.left.type === "VariableDeclaration" && n.left.kind !== "var" ? n.left.declarations.reduce((a, d) => patternNames(d.id, a), []) : [];
          scopes.push({ names });
          walk(n.left, n); walk(n.right, n); body(n.body, true);
          scopes.pop(); return;
        }
        case "WhileStatement": walk(n.test, n); body(n.body, true); return;
        case "DoWhileStatement": body(n.body, true); walk(n.test, n); return;
        case "LabeledStatement": walk(n.body, n); return;
        case "SwitchStatement": {
          walk(n.discriminant, n);
          const all = []; n.cases.forEach(c => all.push.apply(all, c.consequent));
          scopes.push({ names: blockNames(all) });
          n.cases.forEach(c => { walk(c.test, c); list(c.consequent); });
          scopes.pop(); return;
        }
        case "TryStatement": {
          walk(n.block, n);
          if (n.handler) { scopes.push({ names: patternNames(n.handler.param, []) }); walk(n.handler.body, n.handler); scopes.pop(); }
          if (n.finalizer) walk(n.finalizer, n);
          return;
        }
        case "ReturnStatement":
          if (trace && n.argument && inFunction()) { ins(n.argument.start, "__r("); walk(n.argument, n); ins(n.argument.end, ")"); }
          else walk(n.argument, n);
          return;
        case "ClassBody":
          n.body.forEach(m => { if (m.value) { if (isFn(m.value)) fn(m.value, m); } else if (m.type === "StaticBlock") { scopes.push({ fn: true, names: [], name: "static" }); list(m.body); scopes.pop(); } });
          return;
      }
      for (const k in n) {
        if (k === "loc" || k === "start" || k === "end" || k === "type") continue;
        const c = n[k];
        if (Array.isArray(c)) c.forEach(x => walk(x, n)); else if (c && typeof c.type === "string") walk(c, n);
      }
    }

    const top = { program: true, names: hoistedVars(ast, []).concat(blockNames(ast.body)) };
    scopes.push(top);
    if (trace) ins(0, `__G(${getters(top.names)});`);
    list(ast.body);
    scopes.pop();

    edits.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    let out = "", last = 0;
    edits.forEach(([pos, , text]) => { out += code.slice(last, pos) + text; last = pos; });
    return out + code.slice(last);
  }

  // ---------------------------------------------------------------- execution
  // opts: { stdin, mode: "run" | "trace", after, globals: {name: value}, realTimers }
  async function execute(code, opts) {
    opts = opts || {};
    const mode = opts.mode || "run";
    const segs = [];
    let outLen = 0, line = 0, lines = 0, loops = 0, marked = -1;
    const steps = [];
    let truncated = false;
    const input = String(opts.stdin || "").replace(/\r/g, "").split("\n");
    if (input.length && input[input.length - 1] === "" && /\n$/.test(opts.stdin || "")) input.pop();
    if (!opts.stdin) input.length = 0;
    let inputPos = 0;

    function write(kind, text) {
      outLen += text.length;
      if (outLen > MAX_OUT) throw new Stop("TooMuchOutput", "Your program printed too much (maybe an infinite loop).");
      const last = segs[segs.length - 1];
      if (last && last[0] === kind && kind === "out") last[1] += text; else segs.push([kind, text]);
    }
    const outSoFar = () => segs.filter(s => s[0] === "out" || s[0] === "warn" || s[0] === "err" || s[0] === "alert").map(s => s[1]).join("");
    const join = args => Array.prototype.map.call(args, a => format(a, true)).join(" ");
    let indent = "";
    const con = {
      log() { write("out", indent + join(arguments) + "\n"); },
      info() { write("out", indent + join(arguments) + "\n"); },
      debug() { write("out", indent + join(arguments) + "\n"); },
      warn() { write("warn", indent + join(arguments) + "\n"); },
      error() { write("err", indent + join(arguments) + "\n"); },
      table(x) { write("out", indent + format(x, true) + "\n"); },
      group() { if (arguments.length) write("out", indent + join(arguments) + "\n"); indent += "  "; },
      groupEnd() { indent = indent.slice(2); },
      clear() { segs.length = 0; outLen = 0; },
    };
    function prompt(msg) {
      if (msg !== undefined) write("prompt", String(msg) + " ");
      if (inputPos >= input.length) throw new Stop("NeedMoreInput", "Your program called prompt() but the Input box has no more lines.");
      const v = input[inputPos++];
      write("in", v + "\n");
      return v;
    }
    function alert(msg) { write("alert", "[alert] " + (msg === undefined ? "" : format(msg, true)) + "\n"); }
    function confirm(msg) { const v = prompt(msg); return /^(y|yes|ok|true|1)$/i.test(String(v).trim()); }

    // fake timers: run after the main program, in order of time, without waiting
    const timers = []; let timerSeq = 0, clock = 0;
    function addTimer(fn, ms, args, repeat) {
      if (typeof fn !== "function") return 0;
      const id = ++timerSeq;
      timers.push({ id, t: clock + Math.max(0, +ms || 0), fn, args, repeat: repeat ? Math.max(1, +ms || 1) : 0 });
      return id;
    }
    const setTimeout_ = (fn, ms, ...a) => addTimer(fn, ms, a, false);
    const setInterval_ = (fn, ms, ...a) => addTimer(fn, ms, a, true);
    const clear = id => { const k = timers.findIndex(x => x.id === id); if (k >= 0) timers.splice(k, 1); };

    // trace state
    let globalsGet = [];
    const frames = []; // {name, line, vars}
    const snap = getters => {
      const vars = [];
      (getters || []).forEach(([k, g]) => {
        let v; try { v = g(); } catch (e) { return; }
        if (vars.some(x => x[0] === k)) return;
        vars.push([k, format(v, false), typeName(v)]);
      });
      return vars;
    };
    function record(event, extra, more) {
      const g = snap(more ? globalsGet.concat(more) : globalsGet);
      const stack = [{ name: "Global", vars: g }];
      frames.forEach(f => stack.push({ name: f.name + "()", vars: f.vars }));
      const st = { line, event, stack, out: outSoFar() };
      if (extra !== undefined) st.ret = extra;
      steps.push(st);
      if (steps.length >= MAX_STEPS) { truncated = true; throw new Stop("StepLimit", "steps"); }
    }
    const rt = {
      __L(l) { line = l; if (++lines > MAX_LINES) throw new Stop("InfiniteLoop", "Your program ran for too long (maybe an infinite loop)."); },
      __g() { if (++loops > MAX_LOOP) throw new Stop("InfiniteLoop", "A loop ran more than " + MAX_LOOP.toLocaleString("en") + " times, so it was stopped. It probably never ends."); },
      __s(l, getters, inFn) {
        line = l; lines++;
        if (inFn && frames.length) { frames[frames.length - 1].vars = snap(getters); record("line"); }
        else record("line", undefined, getters); // block variables at the top level (like the i of a for loop) show in Global
      },
      __G(getters) { globalsGet = getters; },
      __enter(name, l) { frames.push({ name, line: l, vars: [] }); if (frames.length > 200) throw new RangeError("Maximum call stack size exceeded"); },
      __exit() { frames.pop(); },
      __r(v) { if (frames.length) record("return", format(v, false)); return v; },
      __mark() { segs.push(["mark", ""]); marked = segs.length; outLen = 0; },
    };

    let src = code, err = null;
    const after = opts.after ? "\n;__mark();\n" + opts.after : "";
    try {
      src = instrument(code + after, mode);
    } catch (e) {
      if (e && e.loc) {
        const msg = String(e.message).replace(/\s*\(\d+:\d+\)$/, "");
        const ln = e.loc.line, all = (code + after).split("\n");
        return { segs, error: { type: "SyntaxError", msg, line: ln, col: e.loc.column + 1, src: all[ln - 1] }, steps: mode === "trace" ? [] : undefined };
      }
      throw e;
    }

    const names = ["console", "prompt", "alert", "confirm", "setTimeout", "setInterval", "clearTimeout", "clearInterval", "__L", "__g", "__s", "__G", "__enter", "__exit", "__r", "__mark"];
    const vals = [con, prompt, alert, confirm, setTimeout_, setInterval_, clear, clear, rt.__L, rt.__g, rt.__s, rt.__G, rt.__enter, rt.__exit, rt.__r, rt.__mark];
    const extra = opts.globals || {};
    Object.keys(extra).forEach(k => { names.push(k); vals.push(extra[k]); });

    function info(e) {
      if (e instanceof Stop) return { type: e.stopType, msg: e.message, line };
      if (e && typeof e === "object" && "message" in e) return { type: e.name || "Error", msg: String(e.message), line: line || null };
      return { type: "Uncaught", msg: format(e, false), line: line || null };
    }
    const realTick = () => new Promise(r => (typeof setImmediate === "function" ? setImmediate(r) : setTimeout(r, 0)));
    try {
      const f = new Function(...names, '"use strict";{' + src + "\n}");
      const ret = f(...vals);
      // let promises settle, then run fake timers in order
      await realTick();
      let count = 0;
      while (timers.length && !err) {
        timers.sort((a, b) => a.t - b.t || a.id - b.id);
        const tm = timers.shift();
        clock = tm.t;
        if (tm.repeat) timers.push(Object.assign({}, tm, { t: tm.t + tm.repeat }));
        if (++count > MAX_TIMERS) throw new Stop("TooManyTimers", "Your timers kept running for too long (setInterval with no clearInterval?).");
        tm.fn.apply(null, tm.args);
        await realTick();
      }
      void ret;
    } catch (e) {
      if (!(e instanceof Stop && e.stopType === "StepLimit")) err = info(e);
    }
    if (err && err.line) err.src = (code + after).split("\n")[err.line - 1];
    if (mode === "trace" && !truncated) {
      steps.push({ line: null, event: "end", stack: [{ name: "Global", vars: snap(globalsGet) }], out: outSoFar() });
    }
    const res = { segs, error: err };
    if (mode === "trace") { res.steps = steps; res.truncated = truncated; }
    if (marked >= 0) res.afterSegs = segs.slice(marked);
    return res;
  }

  // only the printed text (what tests compare)
  function outputOf(segs) { return segs.filter(s => s[0] === "out" || s[0] === "warn" || s[0] === "err" || s[0] === "alert").map(s => s[1]).join(""); }

  async function test(code, tests) {
    const results = [];
    for (const t of tests) {
      const r = await execute(code, { stdin: t.stdin || "", after: t.after });
      const got = outputOf(t.after ? (r.afterSegs || []) : r.segs);
      results.push({ got, error: r.error });
    }
    return results;
  }

  return { instrument, execute, test, format, typeName, formatLib, outputOf, parse };
});
