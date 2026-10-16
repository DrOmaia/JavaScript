window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[21] = {
  title: "Rest day",
  intro: "Three weeks done, {{name}} — you can now write functions, work with lists and build records out of objects. That is real programming. Today there is no new syntax. Instead, a short story about what happens when you open a website, because next week your JavaScript moves out of the console and into real web pages.",
  learn: [
    { t: "h", text: "What happens when you open a website?" },
    { t: "p", html: "<p>You type an address, press Enter, and less than a second later a page appears. It feels like magic, but it is a conversation between two computers. Knowing that conversation will make Week 4 much easier to understand.</p>" },
    { t: "analogy", title: "Opening a website is like ordering a meal", html: "<p>Your <b>browser</b> (Chrome, Edge, Safari) is the customer. The <b>URL</b> is the order slip: which restaurant, and which dish. The <b>server</b> is the kitchen — a computer, somewhere in the world, that is always on and waiting for orders. It does not send you a finished photo of the meal: it sends the <b>ingredients and the recipe</b>, and your browser cooks the page on your own device.</p>" },
    { t: "p", html: "<p>Here is the journey, step by step:</p><ol><li>You type <code>https://example.com/news.html</code> and press Enter.</li><li>The browser finds the <b>server</b> that owns that name (like looking up a phone number in your contacts).</li><li>It sends a <b>request</b>: \"please give me <code>/news.html</code>\".</li><li>The server sends back a <b>response</b>: the file, plus a short status code — <code>200</code> means OK, <code>404</code> means \"not found\".</li><li>The browser reads the HTML and notices it needs more files — a CSS file, a JavaScript file, some pictures — and asks for each of them.</li><li>The browser draws the page, then <b>runs the JavaScript</b> on your computer.</li></ol>" },
    { t: "table", head: ["Part of the URL", "What it means"], rows: [
      ["`https://`", "the language the browser and server speak (the `s` means the connection is secure)"],
      ["`example.com`", "the name of the server — which \"restaurant\""],
      ["`/news.html`", "the path to the file on that server — which \"dish\""],
    ] },
    { t: "h", text: "Three kinds of files" },
    { t: "p", html: "<p>Almost every web page is made of three kinds of files, and each one has a different job. <b>HTML</b> is the content: headings, paragraphs, buttons, pictures. <b>CSS</b> is the look: colours, fonts, spacing. <b>JavaScript</b> is the behaviour: what happens when you click, type or wait. The important part for you: the JavaScript runs <b>inside the browser</b>, on the visitor's own device. That is why JS30 works without installing anything — every exercise you solved ran right here in your browser.</p><p>Next week you will write small HTML pages and use JavaScript to read what a user types, react to clicks and change the page. Everything from this week is still needed: a click will call a <b>function</b>, a to-do list will be an <b>array</b>, and a quiz question will be an <b>object</b>.</p>" },
    { t: "check", q: "Where does the JavaScript of a normal web page run?", o: ["In the visitor's browser, on their own device", "Only on the server", "In the URL", "Inside the CSS file"], a: 0, e: "The server sends the JavaScript file, and the browser runs it on your device. That is how a page can react instantly to your clicks." },

    { t: "h", text: "A light plan for today (all optional)" },
    { t: "p", html: "<ul><li><b>10 minutes:</b> open the <a href=\"review.html\">review deck</a> and go through the cards that are due. Be honest — \"Not yet\" is how the deck helps you.</li><li><b>5 minutes:</b> in <a href=\"notes.html\">your notes</a>, write the one idea of this week that still feels shaky. Tomorrow you will know where to look.</li><li><b>For fun:</b> open the grades manager from Day 20 and add your own class, or a list of your favourite football players with their goals.</li><li>Then close the laptop. Rest is part of learning: your brain sorts new ideas while you sleep.</li></ul>" },

    { t: "h", text: "Self-check: Week 3" },
    { t: "p", html: "<p>Four quick questions about the week. If you miss one, the explanation tells you which day to revisit.</p>" },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`function triple(n) {
  return n * 3;
}
console.log(triple(4) + 1);`, answers: ["13"], run: true, e: "`triple(4)` returns 12, then 1 is added. (Day 15: return.)", placeholder: "a number" },
    { t: "check", q: "What does this show?", code: c`const nums = [8, 3, 12];
console.log(nums.filter(n => n > 5).length);`, o: ["`2`", "`[8, 12]`", "`3`", "`1`"], a: 0, e: "`filter` keeps 8 and 12, and `length` counts them: 2. (Day 18: array methods.)" },
    { t: "check", q: "What does this show?", code: c`const s = { name: "Yara", grade: 10 };
const key = "grade";
console.log(s[key], s.key);`, o: ["`10 undefined`", "`10 10`", "`undefined 10`", "`grade undefined`"], a: 0, e: "`s[key]` uses the value of `key` (\"grade\"); `s.key` looks for a property literally called `key`. (Day 19: objects.)" },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`const scores = [5, 40, 100];
scores.sort();
console.log(scores[0]);`, answers: ["100"], run: true, e: "Without `(a, b) => a - b`, `sort` compares as text, and \"100\" comes before \"40\" and \"5\". (Day 18: the numbers trap.)", hint: "How does a dictionary order \"100\", \"40\" and \"5\"?", placeholder: "a number" },
  ],
  remember: [
    "A **function** names a job; parameters go in, `return` gives the answer back.",
    "**Arrow functions** are short functions; variables made inside a block or function stay there (**scope**).",
    "An **array** is an ordered list: index from 0, `length`, `push` / `pop`, `for...of`.",
    "`map` changes every item, `filter` keeps some, `find` gets the first match, `reduce` adds up.",
    "Sort numbers with `(a, b) => a - b`; copy an array with `[...arr]` before changing it.",
    "An **object** stores labelled data: `obj.key`, or `obj[key]` when the key is in a variable.",
    "A **method** is a function inside an object, and `this` is that object.",
    "Opening a website = the browser asks a server for HTML, CSS and JS files, then runs the JS on your device.",
  ],
};
})();
