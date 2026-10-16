window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[7] = {
  title: "Rest day",
  intro: "One week done, {{name}}! Today there is no new code. Your brain stores what you learned while you rest, so take it easy: read a short story about where JavaScript came from, try a few self-check questions, and enjoy your day.",
  goals: [
    "Know the short story of how JavaScript was born and where it runs today",
    "Check yourself on the big ideas of Week 1",
    "Rest — a tired brain learns less",
  ],
  learn: [
    { t: "h", text: "The language built in ten days" },
    { t: "p", html: "<p>In 1995 the web was mostly still: pages of text and pictures that could not react to you. The most popular browser was <b>Netscape Navigator</b>, and the company wanted pages to come alive — to check a form before sending it, or to change something when you clicked. They asked a young programmer, <b>Brendan Eich</b>, to create a small language for that.</p>" },
    { t: "p", html: "<p>There was a deadline: Eich wrote the first version in about <b>ten days</b>. It was first called Mocha, then LiveScript. Just before release it was renamed <b>JavaScript</b>. Why? Another language, <b>Java</b>, was very fashionable at the time, and the new name was a marketing idea. The two languages are <b>not related</b> — people like to say that Java and JavaScript are as similar as \"car\" and \"carpet\".</p>" },
    { t: "p", html: "<p>Soon other browsers made their own versions, and they did not always agree. To stop the chaos, the language was given an official rulebook, published by a standards group called Ecma. That rulebook is named <b>ECMAScript</b>. When you read \"ES6\" or \"ES2015\", it means a version of these rules — the version that gave us <code>let</code>, <code>const</code> and the template literals you used on Day 5.</p>" },
    { t: "h", text: "Where JavaScript lives today" },
    { t: "p", html: "<p>The little language from ten days of work grew into one of the most used languages in the world. It runs in <b>every browser</b> on phones, laptops and smart TVs. With <b>Node.js</b> it also runs on servers. It powers desktop apps (VS Code is written in it), mobile apps, games, and even small robots. Everything you wrote this week — <code>console.log</code>, variables, strings — works in all of these places.</p>" },
    { t: "tip", title: "A light plan for today (optional)", html: "<ul><li><b>10 minutes:</b> open the <a href=\"review.html\">review deck</a> and go through the cards that are due.</li><li><b>5 minutes:</b> in a notebook, write the three ideas from this week you find hardest, with one tiny example each.</li><li><b>Fun:</b> open the console of your browser (F12) on any website and type <code>console.log(\"Hi from {{name}}\")</code>.</li></ul>" },
    { t: "h", text: "Self-check: Week 1" },
    { t: "p", html: "<p>No pressure — these questions only help you see what you remember. If one feels hard, open that day again tomorrow.</p>" },
    { t: "check", q: "What does this show?", code: c`console.log("4" + 4, 4 + 4);`, o: ["`44 8`", "`8 8`", "`44 44`", "`8 44`"], a: 0, e: "A string plus a number glues (`44`); two numbers add (`8`). Days 1 and 4." },
    { t: "check", q: "Which variable name is **not** allowed?", o: ["`totalPrice`", "`_score`", "`2ndPlace`", "`$money`"], a: 2, e: "A name cannot start with a digit. Letters, `_` and `$` are fine at the start. Day 2." },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`console.log(typeof 2026);`, answers: ["number"], run: true, e: "No quotes, so 2026 is a `number`. Day 3.", placeholder: "type the output" },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`let x = 10;
x++;
x = x % 4;
console.log(x);`, answers: ["3"], run: true, e: "10 + 1 = 11, and 11 divided by 4 leaves a remainder of 3. Day 4.", placeholder: "type the output" },
    { t: "check", q: "The user types `7` in a `prompt()`. What type is the answer?", o: ["number", "string", "boolean", "undefined"], a: 1, e: "`prompt()` always returns a string. Convert it with `Number()` before doing math. Day 5." },
  ],
  remember: [
    "JavaScript was created by **Brendan Eich** at Netscape in **1995**, in about ten days.",
    "The name \"JavaScript\" was a marketing choice — it is **not related** to Java.",
    "The official rules of the language are called **ECMAScript** (ES6 brought `let`, `const` and template literals).",
    "Today JavaScript runs in every browser, on servers (Node.js), in apps and in games.",
    "Week 1: `console.log`, comments, `let` / `const`, data types and `typeof`.",
    "Week 1: arithmetic, `%`, `**`, `++` / `--`, `+=`, `Math` and `toFixed`.",
    "Week 1: string methods, template literals, `prompt()` returns a string.",
  ],
};
})();
