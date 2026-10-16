/* JS30 web pages: an HTML editor with a live preview, a console, and automatic tests.
   The page runs in a sandboxed <iframe>. Every inline <script> is instrumented first (loop guard,
   line numbers), and a small runtime is injected that sends console output and errors to the lesson. */
(function () {
  const esc = s => JS30.esc(s), T = s => JS30.T(s);
  const { h } = window.JSUI_BASE;

  // The runtime that runs inside the preview page (stringified, so it must not use outside names)
  function pageRuntime(TOKEN, FORMAT, MODE, STDIN) {
    const F = FORMAT();
    // sandboxed pages have no real storage: give them a memory one so localStorage code still works
    try { void window.localStorage; } catch (e) {
      const mem = () => { const d = {}; return { getItem: k => (k in d ? d[k] : null), setItem: (k, v) => { d[k] = String(v); }, removeItem: k => { delete d[k]; }, clear: () => { for (const k in d) delete d[k]; }, key: i => Object.keys(d)[i] ?? null, get length() { return Object.keys(d).length; } }; };
      try { Object.defineProperty(window, "localStorage", { value: mem(), configurable: true }); Object.defineProperty(window, "sessionStorage", { value: mem(), configurable: true }); } catch (e2) {}
    }
    const send = m => { m.token = TOKEN; parent.postMessage(m, "*"); };
    let line = 0, loops = 0, out = "";
    const input = STDIN ? String(STDIN).split("\n") : []; let inPos = 0;
    window.__L = l => { line = l; };
    window.__g = () => { if (++loops > 5000000) { loops = 0; throw new Error("JS30_LOOP"); } };
    const join = a => Array.prototype.map.call(a, x => F.format(x, true)).join(" ");
    const log = kind => function () { const t = join(arguments); out += t + "\n"; send({ type: "console", kind, text: t }); };
    console.log = log("out"); console.info = log("out"); console.warn = log("warn"); console.error = log("err");
    if (MODE === "test") {
      window.alert = m => { const t = "[alert] " + (m === undefined ? "" : String(m)); out += t + "\n"; };
      window.prompt = () => (inPos < input.length ? input[inPos++] : null);
      window.confirm = () => true;
    } else {
      const realAlert = window.alert;
      window.alert = function (m) { send({ type: "console", kind: "alert", text: "[alert] " + (m === undefined ? "" : String(m)) }); try { realAlert.call(window, m); } catch (e) {} };
    }
    const report = (e, msg) => {
      const loop = /JS30_LOOP/.test(msg || "");
      send({ type: "error", info: loop ? { type: "InfiniteLoop", msg: "A loop never stopped.", line } : { type: (e && e.name) || (/^(\w+Error):/.exec(msg || "") || [])[1] || "Error", msg: e && e.message ? e.message : String(msg || "").replace(/^Uncaught \w+: /, ""), line } });
    };
    window.addEventListener("error", ev => { report(ev.error, ev.message); });
    window.addEventListener("unhandledrejection", ev => report(ev.reason, String(ev.reason)));
    // test helpers
    const $ = s => document.querySelector(s);
    const need = s => { const e = $(s); if (!e) throw new Error("The page has no element " + s); return e; };
    const helpers = {
      $,
      click: s => need(s).click(),
      type: (s, v) => { const e = need(s); e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); e.dispatchEvent(new Event("change", { bubbles: true })); },
      press: (k, s) => { const e = s ? need(s) : document.body; e.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true })); e.dispatchEvent(new KeyboardEvent("keyup", { key: k, bubbles: true })); },
      text: s => need(s).textContent.trim(),
      count: s => document.querySelectorAll(s).length,
      style: (s, p) => getComputedStyle(need(s))[p],
      wait: ms => new Promise(r => setTimeout(r, ms)),
      output: () => out,
    };
    window.addEventListener("message", async ev => {
      const m = ev.data || {};
      if (m.token !== TOKEN || m.type !== "test") return;
      try {
        const names = Object.keys(helpers), vals = names.map(k => helpers[k]);
        if (m.before) await new Function(...names, "return (async () => {" + m.before + "\n})()")(...vals);
        await new Promise(r => setTimeout(r, 40));
        const v = m.check === "@console" ? out : await new Function(...names, "return (" + m.check + ")")(...vals);
        send({ type: "result", value: typeof v === "string" ? v : F.format(v, true) });
      } catch (e) {
        send({ type: "result", error: { type: e.name || "Error", msg: /JS30_LOOP/.test(e.message) ? "A loop never stopped." : e.message, line } });
      }
    });
    document.addEventListener("DOMContentLoaded", () => send({ type: "ready" }));
    window.addEventListener("load", () => send({ type: "loaded" }));
  }

  // Instrument every inline <script> in the HTML; returns { html, error }
  function prepare(src, mode, token, stdin) {
    let firstError = null;
    const html = src.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (all, attrs, code, offset) => {
      if (/\bsrc\s*=/.test(attrs) || /type\s*=\s*["']?(module|application\/json|text\/template)/i.test(attrs)) return all;
      const before = src.slice(0, offset + all.indexOf(">") + 1);
      const lineOffset = before.split("\n").length - 1;
      try {
        return `<script${attrs}>` + JSEngine.instrument(code, "run", lineOffset) + "</script>";
      } catch (e) {
        const ln = e.loc ? e.loc.line + lineOffset : null;
        if (!firstError) firstError = { type: "SyntaxError", msg: String(e.message).replace(/\s*\(\d+:\d+\)$/, ""), line: ln, col: e.loc ? e.loc.column + 1 : null };
        return "<script>/* syntax error: this script did not run */</script>";
      }
    });
    const rt = `<script>(${pageRuntime.toString()})(${JSON.stringify(token)}, ${JSEngine.formatLib.toString()}, ${JSON.stringify(mode)}, ${JSON.stringify(stdin || "")});</script>`;
    const style = `<style>html{background:#fff;color:#1d1d1f;font-family:system-ui,sans-serif}</style>`;
    // the runtime must run before the student's scripts
    const m = /<head[^>]*>/i.exec(html);
    const out = m ? html.slice(0, m.index + m[0].length) + rt + style + html.slice(m.index + m[0].length) : rt + style + html;
    return { html: out, error: firstError };
  }

  let tokSeq = 0;
  const newToken = () => "t" + Date.now().toString(36) + (++tokSeq) + Math.random().toString(36).slice(2, 6);
  const listeners = new Map();
  window.addEventListener("message", ev => { const m = ev.data; if (m && m.token && listeners.has(m.token)) listeners.get(m.token)(m, ev); });

  function srcLine(src, line) { return line ? (src.split("\n")[line - 1] || "") : ""; }

  // Run all tests on the given HTML. Each test gets its own fresh page.
  // test: { before?: "js", check: "js expression" | "@console", expected: "text", stdin?, desc? }
  function runTests(src, tests) {
    return Promise.all(tests.map(t => new Promise(resolve => {
      const token = newToken();
      const prep = prepare(src, "test", token, T(t.stdin || ""));
      if (prep.error) { prep.error.src = srcLine(src, prep.error.line); resolve({ error: prep.error }); return; }
      const fr = document.createElement("iframe");
      fr.setAttribute("sandbox", "allow-scripts");
      fr.style.cssText = "position:absolute;left:-9999px;top:0;width:800px;height:600px;border:0";
      fr.setAttribute("aria-hidden", "true"); fr.tabIndex = -1;
      let pageError = null, done = false;
      const finish = r => { if (done) return; done = true; listeners.delete(token); clearTimeout(timer); fr.remove(); if (r.error && r.error.line) r.error.src = srcLine(src, r.error.line); resolve(r); };
      const timer = setTimeout(() => finish({ error: pageError || { type: "Timeout", msg: "The page did not answer in time." } }), 6000);
      listeners.set(token, (m) => {
        if (m.type === "error" && !pageError) pageError = m.info;
        if (m.type === "loaded") setTimeout(() => fr.contentWindow && fr.contentWindow.postMessage({ token, type: "test", before: T(t.before || ""), check: T(t.check || "@console") }, "*"), 30);
        if (m.type === "result") finish(m.error ? { error: m.error } : pageError ? { error: pageError, got: m.value } : { got: m.value });
      });
      fr.srcdoc = prep.html;
      document.body.appendChild(fr);
    })));
  }

  // ---------- WebBox: editor + live preview + console (+ tests) ----------
  // opts: {id, code, tests, title, onPass, persist, height}
  function WebBox(opts) {
    const original = T(opts.code || "");
    const st = JS30.state;
    const saved = opts.persist && opts.id && st.code[opts.id];
    const el = h(`<div class="codebox webbox">
      <div class="cb-bar">
        <span class="cb-title">${esc(opts.title || "index.html")}</span>
        <span class="cb-status" aria-live="polite"></span>
        <button type="button" class="cb-btn run" data-a="run" title="Run (Ctrl+Enter)">▶ Run</button>
        ${opts.tests ? `<button type="button" class="cb-btn check" data-a="check">✓ Check</button>` : ""}
        <button type="button" class="cb-btn" data-a="reset" title="Back to the original code">Reset</button>
      </div>
      <div class="cb-editor"></div>
      <div class="web-out">
        <div class="web-pane"><div class="web-label">Your page</div><iframe sandbox="allow-scripts allow-modals" title="Preview of your page" style="height:${opts.height || 220}px"></iframe></div>
        <div class="web-pane"><div class="web-label">Console</div><div class="cb-out web-console" aria-live="polite"></div></div>
      </div>
    </div>`);
    const wrap = document.createElement("div");
    wrap.appendChild(el);
    const fb = document.createElement("div"); fb.className = "feedback"; wrap.appendChild(fb);
    const frame = el.querySelector("iframe"), con = el.querySelector(".web-console"), status = el.querySelector(".cb-status");
    let cm = null, errMark = null, token = null, shown = false;

    function mount() {
      if (cm) return;
      cm = CodeMirror(el.querySelector(".cb-editor"), {
        value: saved || original, mode: "htmlmixed", theme: "js30", lineNumbers: true, indentUnit: 2, tabSize: 2,
        indentWithTabs: false, matchBrackets: true, autoCloseBrackets: true, viewportMargin: Infinity, lineWrapping: true,
        extraKeys: { Tab: c => c.somethingSelected() ? c.indentSelection("add") : c.replaceSelection("  ", "end"), "Shift-Tab": c => c.indentSelection("subtract"), "Ctrl-Enter": () => run(), "Cmd-Enter": () => run() },
      });
      cm.on("change", () => {
        if (errMark != null) { cm.removeLineClass(errMark, "background", "cm-errline"); errMark = null; }
        if (opts.persist && opts.id) { st.code[opts.id] = cm.getValue(); JS30.save(); }
      });
    }
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { mount(); if (!shown) run(true); io.disconnect(); } }, { rootMargin: "300px" });
    io.observe(el);
    const code = () => (mount(), cm.getValue());
    function markLine(line) { if (cm && line) { if (errMark != null) cm.removeLineClass(errMark, "background", "cm-errline"); errMark = cm.addLineClass(line - 1, "background", "cm-errline"); } }
    function showError(info) { fb.innerHTML = JSErrors.explain(info); markLine(info.line); }
    function addCon(kind, text) {
      const cls = kind === "err" ? "o-err" : kind === "warn" ? "o-warn" : kind === "alert" ? "o-alert" : "";
      con.insertAdjacentHTML("beforeend", (cls ? `<span class="${cls}">${esc(text)}</span>` : esc(text)) + "\n");
    }

    function run(quiet) {
      shown = true;
      if (!quiet) JS30.touchStreak();
      fb.innerHTML = ""; con.innerHTML = "";
      if (token) listeners.delete(token);
      token = newToken();
      const src = code();
      const prep = prepare(src, "run", token, "");
      if (prep.error) { prep.error.src = srcLine(src, prep.error.line); addCon("err", "SyntaxError: " + prep.error.msg); showError(prep.error); }
      listeners.set(token, (m, ev) => {
        if (ev.source !== frame.contentWindow) return;
        if (m.type === "console") addCon(m.kind, m.text);
        if (m.type === "error") { m.info.src = srcLine(src, m.info.line); addCon("err", m.info.type + ": " + m.info.msg); if (!fb.innerHTML) showError(m.info); }
      });
      frame.srcdoc = prep.html;
    }

    async function check() {
      JS30.touchStreak();
      fb.innerHTML = "";
      el.querySelectorAll(".cb-btn").forEach(x => x.disabled = true);
      status.textContent = "Checking…";
      run(true);
      const tests = opts.tests;
      try {
        const r = await runTests(code(), tests);
        let pass = 0, items = "";
        r.forEach((res, k) => {
          const t = tests[k];
          const ok = !res.error && JSErrors.norm(res.got) === JSErrors.norm(T(t.expected));
          if (ok) pass++;
          let body = "";
          if (!ok) {
            if (res.error) { body = JSErrors.explain(res.error); markLine(res.error.line); }
            else body = JSErrors.diffHTML(T(t.expected), res.got || "");
          }
          items += `<li><div class="t-head ${ok ? "t-pass" : "t-fail"}">${ok ? "✓" : "✗"} Test ${k + 1}${t.desc ? ": " + esc(T(t.desc)) : ""}</div>${body}</li>`;
        });
        const all = pass === tests.length;
        fb.innerHTML = all
          ? `<div class="success-card"><h4>All ${tests.length} tests passed 🎉</h4><p>${esc(T(window.JSUI_BASE.praise()))}</p></div>`
          : `<div class="score-bar" style="background:var(--err-bg);color:var(--err)">${pass} of ${tests.length} tests passed — look at the first red test.</div><ul class="test-list">${items}</ul>`;
        if (all && opts.onPass) opts.onPass();
      } finally {
        el.querySelectorAll(".cb-btn").forEach(x => x.disabled = false);
        status.textContent = "";
      }
    }

    el.querySelector(".cb-bar").addEventListener("click", e => {
      const a = e.target.closest("[data-a]"); if (!a) return;
      const act = a.dataset.a;
      if (act === "run") run(); else if (act === "check") check();
      else if (act === "reset") { mount(); if (confirm("Reset this editor to the original code?")) { cm.setValue(original); fb.innerHTML = ""; run(true); } }
    });
    wrap.api = { run, check, get code() { return code(); } };
    return wrap;
  }

  window.JSWeb = { WebBox, runTests, prepare };
})();
