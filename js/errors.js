/* JS30 error translator: turns JavaScript errors into short, friendly lessons */
(function () {
  const esc = s => JS30.esc(s);
  const name = i => { const m = /^(\S+) is not defined/.exec(i.msg || "") || /'([^']+)'/.exec(i.msg || ""); return m ? m[1] : ""; };
  const BUILTIN_CASE = { "Console": "console", "console.Log": "console.log", "Log": "log", "Math": "Math", "math": "Math", "Let": "let", "Const": "const", "Function": "function", "If": "if", "Return": "return", "True": "true", "False": "false", "Prompt": "prompt", "Alert": "alert", "Document": "document", "print": "console.log" };

  // Each rule: t(info) -> bool, then title / en / fix / wrong / right (strings or functions of info)
  const RULES = [
    { t: i => i.type === "NeedMoreInput",
      title: "Your program is waiting for input",
      en: "The code called <code>prompt()</code> more times than there are lines in the <b>Input</b> box. Each <code>prompt()</code> reads one line.",
      fix: "Open the <b>Input</b> box under the editor and type one answer per line, then run again." },
    { t: i => i.type === "TooMuchOutput",
      title: "Too much output — probably a loop that never stops",
      en: "Your program printed thousands of characters. Usually a loop never stops because its condition never becomes <code>false</code>." ,
      fix: "Check the loop condition and make sure something inside the loop moves it toward stopping (for example <code>i++</code>)." },
    { t: i => i.type === "InfiniteLoop" || i.type === "Timeout",
      title: "A loop that never ends",
      en: "Your program was stopped because it kept running. This is almost always a loop whose condition never becomes <code>false</code>: a <code>while (true)</code> with no <code>break</code>, or a counter that never changes.",
      fix: "Make sure the loop variable changes every time (<code>i++</code>), and that the condition can become false. Try <b>Visualize</b> on a smaller version to watch it.",
      wrong: "let i = 1;\nwhile (i <= 5) {\n  console.log(i);\n}", right: "let i = 1;\nwhile (i <= 5) {\n  console.log(i);\n  i++;\n}" },
    { t: i => i.type === "TooManyTimers",
      title: "A timer that never stops",
      en: "A <code>setInterval</code> kept running. Save its id and call <code>clearInterval(id)</code> when you are done." },
    { t: i => i.type === "SyntaxError" && /Unterminated string/.test(i.msg),
      title: "A text (string) was not closed",
      en: "Text in JavaScript must start and end with the same quote mark: <code>\"...\"</code>, <code>'...'</code> or <code>`...`</code>. One of your strings starts but never ends.",
      fix: "Add the closing quote. Use the same kind you opened with.",
      wrong: 'console.log("Hello);', right: 'console.log("Hello");' },
    { t: i => i.type === "SyntaxError" && /Unterminated template/.test(i.msg),
      title: "A template string was not closed",
      en: "A string that starts with a backtick <code>`</code> must end with a backtick too.",
      wrong: "console.log(`Hi ${name});", right: "console.log(`Hi ${name}`);" },
    { t: i => i.type === "SyntaxError" && /already been declared/.test(i.msg),
      title: i => `The name <code>${esc(name(i))}</code> was declared twice`,
      en: i => `You can create a variable with <code>let</code> or <code>const</code> only once. To change <code>${esc(name(i))}</code> later, write it <b>without</b> <code>let</code>.`,
      wrong: "let score = 5;\nlet score = 10;", right: "let score = 5;\nscore = 10;" },
    { t: i => i.type === "SyntaxError" && /Unexpected token/.test(i.msg) && /\b(print|Print)\s*\(/.test(i.src || ""),
      title: "JavaScript has no print()",
      en: "To show something, use <code>console.log()</code>.",
      wrong: 'print("Hi")', right: 'console.log("Hi");' },
    { t: i => i.type === "SyntaxError" && /Unexpected token/.test(i.msg) && /^\s*(if|while|for)\b(?!\s*\()/.test(i.src || ""),
      title: "The condition needs parentheses",
      en: "In JavaScript the condition of <code>if</code>, <code>while</code> and <code>for</code> always goes inside <code>( )</code>.",
      wrong: "if age > 12 {\n  console.log(\"teen\");\n}", right: "if (age > 12) {\n  console.log(\"teen\");\n}" },
    { t: i => i.type === "SyntaxError" && /Unexpected token/.test(i.msg) && /^\s*(else\s+)?if\s*\(.*\)\s*:/.test(i.src || ""),
      title: "JavaScript uses { } instead of :",
      en: "This is Python style. In JavaScript the block after <code>if (...)</code> goes inside curly braces <code>{ }</code>.",
      wrong: "if (x > 5):\n  console.log(\"big\")", right: "if (x > 5) {\n  console.log(\"big\");\n}" },
    { t: i => i.type === "SyntaxError" && /Unexpected token/.test(i.msg) && /\b(let|const|var)\s+\d/.test(i.src || ""),
      title: "A variable name cannot start with a digit",
      en: "Names may contain letters, digits, <code>_</code> and <code>$</code>, but they must not <b>start</b> with a digit.",
      wrong: "let 1st = \"Ali\";", right: "let first = \"Ali\";" },
    { t: i => i.type === "SyntaxError" && /Unexpected token/.test(i.msg) && /\b(let|const|var)\s+[A-Za-z_$][\w$]*\s+[A-Za-z_$]/.test(i.src || ""),
      title: "A variable name cannot have spaces",
      en: "Join the words with camelCase: <code>firstName</code>, <code>totalScore</code>.",
      wrong: "let first name = \"Ali\";", right: "let firstName = \"Ali\";" },
    { t: i => i.type === "SyntaxError" && /Unexpected token|Unexpected character/.test(i.msg) && /[“”‘’]/.test(i.src || ""),
      title: "Curly “smart” quotes",
      en: "Copying code from Word or WhatsApp can bring curly quotes. JavaScript understands only straight quotes <code>\"</code> <code>'</code> and backticks <code>`</code>.",
      wrong: "console.log(“Hi”);", right: 'console.log("Hi");' },
    { t: i => i.type === "SyntaxError" && /Unexpected keyword/.test(i.msg) && /\b(let|const|var)\s+(let|const|var|if|for|while|function|return|class|new|true|false|null|typeof|default|switch|case)\b/.test(i.src || ""),
      title: "A reserved word cannot be a variable name",
      en: "Words like <code>let</code>, <code>if</code>, <code>for</code>, <code>class</code>, <code>new</code> already mean something in JavaScript. Choose another name.",
      wrong: "let class = \"10B\";", right: "let className = \"10B\";" },
    { t: i => i.type === "SyntaxError" && /Unexpected token/.test(i.msg) && ((i.src || "").match(/\(/g) || []).length > ((i.src || "").match(/\)/g) || []).length,
      title: "A bracket was opened but never closed",
      en: "Every <code>(</code> needs a matching <code>)</code>. Count the brackets on the highlighted line.",
      wrong: 'console.log("Hello";', right: 'console.log("Hello");' },
    { t: i => i.type === "SyntaxError" && /Unexpected token/.test(i.msg) && i.col && (i.src || "").length < i.col,
      title: "Something is missing at the end",
      en: "JavaScript reached the end of your code but a bracket <code>)</code>, a brace <code>}</code> or a value is still missing. Count your <code>{</code> and <code>}</code>: every block that opens must close.",
      wrong: "if (x > 1) {\n  console.log(x);", right: "if (x > 1) {\n  console.log(x);\n}" },
    { t: i => i.type === "SyntaxError",
      title: "JavaScript could not understand this line",
      en: i => `This is a <b>syntax error</b>: the grammar of the code is broken, so nothing ran. JavaScript stopped at line ${i.line || "?"}${i.col ? ", position " + i.col : ""}. Look there for a missing bracket <code>)</code> or <code>}</code>, a missing quote, a missing operator, or a typo.`,
      fix: "Compare the line with the examples in the lesson, character by character." },
    { t: i => i.type === "ReferenceError" && /is not defined/.test(i.msg) && BUILTIN_CASE[name(i)] !== undefined,
      title: i => `Did you mean <code>${esc(BUILTIN_CASE[name(i)])}</code>?`,
      en: i => `JavaScript is <b>case-sensitive</b>: <code>${esc(name(i))}</code> and <code>${esc(BUILTIN_CASE[name(i)])}</code> are different names.${name(i) === "print" ? " (JavaScript has no <code>print</code>; use <code>console.log</code>.)" : ""}`,
      wrong: "Console.log(\"Hi\");", right: "console.log(\"Hi\");" },
    { t: i => i.type === "ReferenceError" && /is not defined/.test(i.msg),
      title: i => `JavaScript doesn't know the name <code>${esc(name(i))}</code>`,
      en: i => `There is no variable or function called <code>${esc(name(i))}</code> at this point. The usual reasons:<ul><li>a <b>typo</b> or different capital letters (<code>userName</code> vs <code>username</code>),</li><li>you meant text but forgot the <b>quotes</b>: <code>"${esc(name(i))}"</code>,</li><li>you forgot to create it with <code>let</code> or <code>const</code>,</li><li>it was created inside <code>{ }</code> of another block or function, so it is not visible here.</li></ul>`,
      wrong: "console.log(Hello);", right: "console.log(\"Hello\");" },
    { t: i => i.type === "ReferenceError" && /before initialization/.test(i.msg),
      title: i => `<code>${esc(name(i))}</code> was used before it was created`,
      en: "Code runs from top to bottom. A <code>let</code> or <code>const</code> variable exists only <b>after</b> the line that creates it.",
      wrong: "console.log(total);\nlet total = 10;", right: "let total = 10;\nconsole.log(total);" },
    { t: i => i.type === "TypeError" && /constant variable/.test(i.msg),
      title: "You tried to change a const",
      en: "A <code>const</code> keeps the same value forever. If the value must change, create it with <code>let</code>.",
      wrong: "const score = 0;\nscore = score + 10;", right: "let score = 0;\nscore = score + 10;" },
    { t: i => i.type === "TypeError" && /is not a function/.test(i.msg) && /console\.(Log|print|write)|\.Log\b/.test(i.src || ""),
      title: "The function name is a little different",
      en: "It is <code>console.log</code> — all small letters.",
      wrong: "console.Log(\"Hi\");", right: "console.log(\"Hi\");" },
    { t: i => i.type === "TypeError" && /is not a function/.test(i.msg),
      title: "Calling something that is not a function",
      en: i => `You wrote <code>( )</code> after something that is not a function (<code>${esc(i.msg)}</code>). Check the spelling and capital letters of the function or method name, for example <code>toUpperCase()</code>, <code>push()</code>, <code>querySelector()</code>.` },
    { t: i => i.type === "TypeError" && /Cannot read properties of (undefined|null)|Cannot set properties of (undefined|null)|is (undefined|null)|has no properties/.test(i.msg),
      title: i => `Using a property of <code>${/null/.test(i.msg) ? "null" : "undefined"}</code>`,
      en: i => /null/.test(i.msg)
        ? "You wrote <code>something.property</code> but <code>something</code> is <code>null</code>. On a web page this usually means <code>document.querySelector()</code> found <b>no element</b>: check the id or class name (<code>#id</code>, <code>.class</code>) and that the element exists."
        : "You wrote <code>something.property</code> but <code>something</code> is <code>undefined</code>. Often an array index is too big (<code>list[10]</code> in a list of 3 items), or an object has no such key, or a function returned nothing.",
      fix: "Print the value just before this line with <code>console.log()</code> to see what it really is." },
    { t: i => i.type === "RangeError" && /call stack/.test(i.msg),
      title: "A function called itself forever",
      en: "A function that calls itself needs a <b>stop case</b> (an <code>if</code> that returns without calling again), and each call must move closer to it." },
    { t: i => i.type === "RangeError",
      title: "A number is out of range",
      en: i => `JavaScript says: <code>${esc(i.msg)}</code>. For example <code>"ab".repeat(-1)</code> or <code>num.toFixed(200)</code> are not allowed.` },
    { t: i => i.type === "Uncaught",
      title: "Your program threw a value",
      en: i => `<code>throw</code> stopped the program with <code>${esc(i.msg)}</code>. Use <code>throw new Error("message")</code>, and <code>try { } catch (e) { }</code> to handle it.` },
    { t: () => true,
      title: i => `${esc(i.type)}`,
      en: i => `JavaScript says: <code>${esc(i.msg)}</code>. Read the message carefully — it usually names exactly what went wrong.` },
  ];

  const val = (x, i) => (typeof x === "function" ? x(i) : x);

  function explain(info) {
    const r = RULES.find(r => { try { return r.t(info); } catch (e) { return false; } });
    const where = info.line ? `<div class="where">Line ${info.line}: ${esc((info.src || "").trim())}</div>` : "";
    const raw = ["NeedMoreInput", "TooMuchOutput", "InfiniteLoop", "Timeout", "TooManyTimers"].includes(info.type) ? "" : `<p class="muted" style="font-size:.85rem;margin:6px 0 0">JavaScript's message: <code>${esc(info.type)}: ${esc(info.msg)}</code></p>`;
    let ex = "";
    if (r.wrong) ex = `<div class="two-col" style="margin-top:8px"><div><span class="label-wrong">✗ Wrong</span><pre class="code-static">${esc(r.wrong)}</pre></div><div><span class="label-right">✓ Right</span><pre class="code-static">${esc(r.right)}</pre></div></div>`;
    return `<div class="err-card" role="alert"><h4>${val(r.title, info)}</h4>${where}<div>${val(r.en, info)}</div>
      ${r.fix ? `<p><b>How to fix:</b> ${val(r.fix, info)}</p>` : ""}${ex}${raw}</div>`;
  }

  // ---- Output comparison ----
  const norm = s => String(s).replace(/\r/g, "").split("\n").map(l => l.replace(/\s+$/, "")).join("\n").replace(/\n+$/, "");

  function markWS(s) { return esc(s).replace(/ /g, "<span class=\"ws\">·</span>"); }

  function diffHints(exp, got) {
    const hints = [];
    const E = norm(exp), G = norm(got);
    if (!G) { hints.push("Your program printed nothing. Did you forget <code>console.log()</code>?"); return hints; }
    if (E.toLowerCase() === G.toLowerCase()) hints.push("Only uppercase / lowercase letters are different. JavaScript cares about capital letters.");
    if (E.replace(/\s+/g, "") === G.replace(/\s+/g, "")) hints.push("The characters are right but the spaces or line breaks are different. Remember: <code>console.log(a, b)</code> puts one space between values; a template string <code>`${a}${b}`</code> gives you full control.");
    if (/undefined/.test(G) && !/undefined/.test(E)) hints.push("<code>undefined</code> appears in your output: a variable has no value yet, or a function did not <code>return</code> anything.");
    if (/NaN/.test(G) && !/NaN/.test(E)) hints.push("<code>NaN</code> means \"not a number\": you did math with text. Convert text to a number with <code>Number()</code>.");
    if (/\[object Object\]/.test(G)) hints.push("<code>[object Object]</code> appears when an object is joined to text. Print a property instead, like <code>user.name</code>.");
    const el = E.split("\n"), gl = G.split("\n");
    if (el.length !== gl.length) hints.push(`Expected ${el.length} line(s) of output but got ${gl.length}. Each <code>console.log()</code> makes one line.`);
    if (/^\d+\d$/.test(G.replace(/\n/g, "")) && /^\d+$/.test(E) && Number(E) < Number(G)) hints.push("Did <code>+</code> glue two texts together (<code>\"2\" + \"3\"</code> is <code>\"23\"</code>)? Convert with <code>Number()</code> first.");
    if (!hints.length) hints.push("Compare the two columns line by line — the first different line is highlighted.");
    return hints;
  }

  function diffHTML(exp, got) {
    const el = norm(exp).split("\n"), gl = norm(got).split("\n");
    const n = Math.max(el.length, gl.length);
    let e = "", g = "";
    for (let k = 0; k < n; k++) {
      const a = el[k], b = gl[k];
      const same = a === b;
      e += (a === undefined ? "" : same ? esc(a) : `<span class="good">${markWS(a)}</span>`) + "\n";
      g += (b === undefined ? `<span class="bad">(missing line)</span>` : same ? esc(b) : `<span class="bad">${markWS(b)}</span>`) + "\n";
    }
    return `<div class="diff"><div class="col"><b>Expected output</b>${e}</div><div class="col"><b>Your output</b>${g}</div></div>`;
  }

  window.JSErrors = { explain, diffHTML, diffHints, norm };
})();
