window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
// In a JS template literal "</script>" would end a real <script> tag on some pages; the lesson files are
// loaded as separate .js files, so it is safe here. Keep every example a complete small HTML page.
DAYS[22] = {
  title: "HTML basics and the <script> tag",
  intro: "Until now your programs talked only to the console, {{name}}. Today they get a real home: a web page. You will write your first HTML page, give elements ids, and run JavaScript inside the page with a <code>&lt;script&gt;</code> tag. This is exactly the second lesson of your book's web chapter.",
  goals: [
    "Explain what HTML does and what JavaScript adds to it",
    "Write a small HTML page with headings, paragraphs, buttons and inputs",
    "Use tags, attributes, `id` and `class` correctly",
    "Run JavaScript inside a page with `<script>` and see its console",
    "Change the text of an element with `document.querySelector()` and `.textContent`",
  ],
  learn: [
    { t: "h", text: "Three languages, three jobs" },
    { t: "p", html: "<p>Every web page is built with three languages that work together:</p><ul><li><b>HTML</b> — the <b>content</b> and structure: headings, paragraphs, buttons, pictures.</li><li><b>CSS</b> — the <b>look</b>: colours, sizes, spacing.</li><li><b>JavaScript</b> — the <b>behaviour</b>: what happens when you click, type or wait.</li></ul>" },
    { t: "analogy", title: "A web page is like a house", html: "<p>HTML is the walls and rooms. CSS is the paint and furniture. JavaScript is the electricity: lights that switch on when you press a button, a door bell that rings. Without JavaScript the house still stands — but nothing reacts.</p>" },
    { t: "check", q: "A button changes the page when you click it. Which language makes it react?", o: ["HTML", "CSS", "JavaScript"], a: 2, e: "HTML puts the button on the page, CSS colours it, and JavaScript decides what happens on a click." },
    { t: "h", text: "Tags: the building blocks of HTML" },
    { t: "web", title: "first-page.html", code: c`<h1>My first page</h1>
<p>Hello, I am {{name}}.</p>
<p>I am learning <b>JavaScript</b>.</p>
<button>Click me</button>`, before: "<p>HTML is written with <b>tags</b> in angle brackets. Look at the code, then at the preview next to it. Change the text and press <b>▶ Run</b>.</p>", note: "<p>The button does nothing yet — that is JavaScript's job, and you will add it on Day 24.</p>" },
    { t: "lines", title: "Read it like a web developer", rows: [
      [c`<h1>My first page</h1>`, "<code>&lt;h1&gt;</code> is an <b>opening tag</b>, <code>&lt;/h1&gt;</code> the <b>closing tag</b> (with a slash). Everything between them is the element's <b>content</b>. <code>h1</code> = the biggest heading; <code>h2</code>…<code>h6</code> are smaller."],
      [c`<p>Hello, I am {{name}}.</p>`, "<code>p</code> = a paragraph of text."],
      [c`<b>JavaScript</b>`, "Tags can be <b>inside</b> other tags. <code>b</code> makes text bold."],
      [c`<button>Click me</button>`, "A button. Its content is the text written on it."],
    ] },
    { t: "table", head: ["Tag", "What it makes"], rows: [["`<h1>` … `<h6>`", "headings, from biggest to smallest"], ["`<p>`", "a paragraph"], ["`<b>`, `<i>`", "bold, italic text"], ["`<button>`", "a button"], ["`<input>`", "a box to type in (no closing tag)"], ["`<ul>` + `<li>`", "a list with bullet points"], ["`<div>`, `<span>`", "plain boxes to group things"], ["`<img src=\"...\">`", "a picture (no closing tag)"]] },
    { t: "turn", level: "Easy", q: "Which tag makes the **biggest** heading? Type only the tag name.", answers: ["h1", "<h1>"], e: "`<h1>` is the main, biggest heading of a page. `<h2>` is a bit smaller, and so on until `<h6>`.", placeholder: "e.g. p" },
    { t: "h", text: "Attributes, id and class" },
    { t: "p", html: "<p>An opening tag can carry extra information called <b>attributes</b>, written as <code>name=\"value\"</code>. Two attributes matter most for JavaScript:</p><ul><li><code>id=\"...\"</code> — a <b>unique</b> name for one element, like a student ID number. Only one element on the page may have it.</li><li><code>class=\"...\"</code> — a <b>group</b> name. Many elements can share a class, like students in the same class.</li></ul>" },
    { t: "web", title: "attributes.html", code: c`<h1 id="title">Class 10B</h1>
<p class="student">Hassan</p>
<p class="student">Omar</p>
<p class="student">Sami</p>
<input id="nameBox" placeholder="Type your name">
<img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript logo" width="60">`, height: 260, note: "<p><code>placeholder</code> is the grey hint inside the input, <code>src</code> is the address of a picture, <code>alt</code> describes the picture for people who cannot see it, and <code>width</code> sets its size. The picture needs internet to appear.</p>" },
    { t: "check", q: "Five buttons should all look the same. Which attribute should they share?", o: ["the same `id`", "the same `class`", "the same `alt`"], a: 1, e: "An `id` must be unique — one element only. A `class` is a group name that many elements can share." },
    { t: "h", text: "The skeleton of a full page" },
    { t: "static", code: c`<!DOCTYPE html>
<html>
<head>
  <title>My page</title>
</head>
<body>
  <h1>Visible content goes here</h1>
</body>
</html>` },
    { t: "p", html: "<p><code>&lt;!DOCTYPE html&gt;</code> tells the browser \"this is modern HTML\". The <code>&lt;head&gt;</code> holds information <b>about</b> the page (like the title on the browser tab). The <code>&lt;body&gt;</code> holds everything you <b>see</b>. Notice how tags are <b>nested</b> like boxes inside boxes, and how indentation makes this easy to read.</p>" },
    { t: "h", text: "JavaScript inside the page: <script>" },
    { t: "web", title: "script.html", code: c`<!DOCTYPE html>
<html>
<body>
  <h1>Script test</h1>
  <p>Look at the console next to the page.</p>

  <script>
    console.log("Hello from inside the page!");
    console.log("2 + 3 =", 2 + 3);
  </script>
</body>
</html>`, before: "<p>The <code>&lt;script&gt;</code> tag holds JavaScript. The browser reads the page from top to bottom, and when it reaches <code>&lt;script&gt;</code> it runs the code inside. Everything you learned in Weeks 1–3 works here.</p>" },
    { t: "p", html: "<p>Where do you see <code>console.log</code> on a real website? Open any page in Chrome or Edge and press <b>F12</b> (or right-click → <i>Inspect</i>) and choose the <b>Console</b> tab. In JS30 the console is shown right next to your page.</p>" },
    { t: "check", q: "Where should the `<script>` tag go so that it can see all the elements of the page?", o: ["At the very top, before `<html>`", "At the end of `<body>`, after the elements", "Inside `<title>`"], a: 1, e: "The browser reads from top to bottom. A script at the end of `<body>` runs after every element above it already exists." },
    { t: "h", text: "Your first change to the page" },
    { t: "web", title: "change.html", code: c`<!DOCTYPE html>
<html>
<body>
  <h1 id="title">Hello!</h1>
  <p id="msg">This text will change.</p>

  <script>
    const title = document.querySelector("#title");
    title.textContent = "Hello, {{name}}!";

    document.querySelector("#msg").textContent = "JavaScript changed me.";
  </script>
</body>
</html>`, before: "<p>Now JavaScript reaches into the page and changes it. The page is called the <b>document</b>.</p>" },
    { t: "lines", title: "Read it like a web developer", rows: [
      [c`document`, "The whole web page, as an object JavaScript can use."],
      [c`document.querySelector("#title")`, "Finds the <b>first</b> element that matches. <code>#title</code> means \"the element with <code>id=\"title\"</code>\". (For a class you write <code>.student</code>, for a tag just <code>p</code>.)"],
      [c`const title = ...`, "Keeps the found element in a variable, so we can use it again."],
      [c`title.textContent = "Hello, {{name}}!";`, "<code>textContent</code> is the text inside the element. Giving it a new value changes what you see."],
    ] },
    { t: "turn", level: "Medium", q: "Which selector finds the element `<p id=\"score\">`? Type it with the quotes left out.", answers: ["#score"], e: "`#` means id. So `document.querySelector(\"#score\")` finds `<p id=\"score\">`.", placeholder: "e.g. .name" },
    { t: "steps", web: true, title: "A personal welcome card", problem: "<p>Make a page with a heading <code>Welcome!</code> and an empty paragraph. When the page loads, JavaScript must write <code>Today you start Week 4, {{name}}.</code> into the paragraph.</p>",
      steps: [
        { html: "<p><b>Understand.</b> HTML makes the heading and the paragraph. JavaScript fills in the paragraph. To find the paragraph, it needs an <code>id</code>.</p>" },
        { html: "<p><b>Write the HTML.</b> Give the paragraph <code>id=\"welcome\"</code>. It can be empty for now.</p>", code: c`<h1>Welcome!</h1>
<p id="welcome"></p>` },
        { html: "<p><b>Add the script after the elements.</b> Find the paragraph with <code>#welcome</code> and set its <code>textContent</code>.</p>", code: c`<script>
  const p = document.querySelector("#welcome");
  p.textContent = "Today you start Week 4, {{name}}.";
</script>` },
        { html: "<p><b>Test.</b> Run it. If nothing appears, check the console: <code>Cannot set properties of null</code> means the id in the selector does not match the id in the HTML.</p>" },
      ],
      code: c`<!DOCTYPE html>
<html>
<body>
  <h1>Welcome!</h1>
  <p id="welcome"></p>

  <script>
    const p = document.querySelector("#welcome");
    p.textContent = "Today you start Week 4, {{name}}.";
  </script>
</body>
</html>` },
  ],
  mistakes: [
    { title: "Forgetting the closing tag", html: "Most tags need a closing tag with a slash. Without it, the rest of the page may become part of that element.", wrong: c`<h1>My page
<p>Some text</p>`, right: c`<h1>My page</h1>
<p>Some text</p>` },
    { title: "Forgetting # in the selector", html: "<code>querySelector(\"title\")</code> looks for a <b>tag</b> called title. For an id you need <code>#</code>.", wrong: c`document.querySelector("score")`, right: c`document.querySelector("#score")` },
    { title: "Script before the element", html: "The browser runs the script when it reaches it. If the element comes later, it does not exist yet and <code>querySelector</code> returns <code>null</code>.", wrong: c`<script>
  document.querySelector("#msg").textContent = "Hi";
</script>
<p id="msg"></p>`, right: c`<p id="msg"></p>
<script>
  document.querySelector("#msg").textContent = "Hi";
</script>` },
    { title: "The same id twice", html: "An id must be unique. With two, <code>querySelector</code> only ever finds the first one. Use a <code>class</code> for groups.", wrong: c`<p id="item">Pen</p>
<p id="item">Book</p>`, right: c`<p class="item">Pen</p>
<p class="item">Book</p>` },
  ],
  tricks: [
    { title: "Comments in HTML", html: "HTML comments look different from JavaScript comments: <code>&lt;!-- like this --&gt;</code>. Inside <code>&lt;script&gt;</code> you still use <code>//</code>.", code: c`// inside <script>: a JavaScript comment
console.log("<!-- this is just text inside a string -->");` },
    { title: "innerHTML can add tags", html: "<code>textContent</code> puts plain text. <code>innerHTML</code> understands tags, so <code>el.innerHTML = \"&lt;b&gt;Hi&lt;/b&gt;\"</code> shows a bold Hi. Use <code>textContent</code> for text the user typed — it is safer." },
    { title: "Indent nested tags", html: "Every time you go one box deeper, indent by two spaces. Your future self will thank you." },
  ],
  practice: [
    { t: "webtry", title: "Your About Me page", html: "<p>Change this page into a page about you: your name, your school, and a list of three hobbies. Add one more <code>&lt;li&gt;</code>.</p>", code: c`<!DOCTYPE html>
<html>
<body>
  <h1>About me</h1>
  <p>My name is {{name}}.</p>
  <h2>My hobbies</h2>
  <ul>
    <li>Football</li>
    <li>Gaming</li>
  </ul>
</body>
</html>` },
    { t: "turn", level: "Easy", q: "What is the closing tag of `<p>`?", answers: ["</p>"], e: "A closing tag has the same name with a slash: `</p>`." },
    { t: "parsons", title: "Build the page in the right order", prompt: "Put the lines in order: a full page whose script changes the heading.", lines: [c`<body>`, c`  <h1 id="t">Old</h1>`, c`  <script>`, c`    document.querySelector("#t").textContent = "New";`, c`  </script>`, c`</body>`], explain: "The heading must come before the script, and every tag that opens must close in reverse order." },
    { t: "webtry", title: "Fix the selector", html: "<p>This script crashes. Read the console, then fix it so the paragraph shows <code>Fixed!</code>.</p>", code: c`<p id="status">Broken</p>
<script>
  document.querySelector("status").textContent = "Fixed!";
</script>` },
    { t: "predict", code: c`const tags = "<h1>Hi</h1>";
console.log(tags);
console.log("<p>" + "{{name}}" + "</p>");`, explain: "In plain JavaScript, HTML is just text inside a string. <code>console.log</code> shows the characters; only a browser page turns them into real elements." },
    { t: "webtry", title: "Two changes", html: "<p>Add a second paragraph with <code>id=\"city\"</code> and make the script write your city into it.</p>", code: c`<p id="name"></p>

<script>
  document.querySelector("#name").textContent = "{{name}}";
</script>` },
  ],
  exercises: [
    { id: "heading", lvl: "seed", web: true, title: "Your first heading", prompt: "<p>Write an <code>&lt;h1&gt;</code> with the exact text <code>Hello, Web!</code>.</p>", starter: "<!-- write your HTML below -->\n",
      tests: [{ check: "text('h1')", expected: "Hello, Web!", desc: "the page has an h1 with the right text" }],
      hint: "<code>&lt;h1&gt;Hello, Web!&lt;/h1&gt;</code> — mind the comma and the exclamation mark.",
      solutions: [{ name: "Solution", code: c`<h1>Hello, Web!</h1>`, note: "Opening tag, content, closing tag." }] },
    { id: "list", lvl: "seed", web: true, title: "A shopping list", prompt: "<p>Make a list (<code>&lt;ul&gt;</code>) with exactly three items: <code>Milk</code>, <code>Bread</code>, <code>Eggs</code>.</p>", starter: "",
      tests: [{ check: "count('li')", expected: "3", desc: "three list items" }, { check: "[...document.querySelectorAll('li')].map(li => li.textContent.trim()).join(',')", expected: "Milk,Bread,Eggs", desc: "the items in order" }],
      hint: "One <code>&lt;ul&gt;</code> with three <code>&lt;li&gt;</code> inside.",
      solutions: [{ name: "Solution", code: c`<ul>
  <li>Milk</li>
  <li>Bread</li>
  <li>Eggs</li>
</ul>` }] },
    { id: "ids", lvl: "star", web: true, title: "Give it an id", prompt: "<p>Make a paragraph with <code>id=\"score\"</code> and the text <code>0</code>, and a button with <code>id=\"add\"</code> and the text <code>+1</code>.</p>", starter: "",
      tests: [{ check: "text('#score')", expected: "0", desc: "#score shows 0" }, { check: "text('#add')", expected: "+1", desc: "#add is the +1 button" }, { check: "$('#add').tagName", expected: "BUTTON", desc: "#add is a button" }],
      hint: "<code>&lt;p id=\"score\"&gt;0&lt;/p&gt;</code>",
      solutions: [{ name: "Solution", code: c`<p id="score">0</p>
<button id="add">+1</button>` }] },
    { id: "logpage", lvl: "star", web: true, title: "Talk to the console", prompt: "<p>Make a page with a <code>&lt;script&gt;</code> that shows these two lines in the console:</p><pre class=\"code-static\">Page loaded\n10 x 10 = 100</pre><p>Let JavaScript calculate the 100.</p>", starter: c`<h1>Console page</h1>
<script>
  // your code here
</script>`,
      tests: [{ check: "@console", expected: "Page loaded\n10 x 10 = 100", desc: "the console shows both lines" }],
      hint: "<code>console.log(\"10 x 10 =\", 10 * 10);</code>",
      solutions: [{ name: "Solution", code: c`<h1>Console page</h1>
<script>
  console.log("Page loaded");
  console.log("10 x 10 =", 10 * 10);
</script>` }] },
    { id: "fill", lvl: "star", web: true, title: "Fill in the blank", prompt: "<p>The page has an empty paragraph <code>&lt;p id=\"out\"&gt;&lt;/p&gt;</code>. Add a script that writes <code>JavaScript was here</code> into it.</p>", starter: c`<p id="out"></p>
`,
      tests: [{ check: "text('#out')", expected: "JavaScript was here", desc: "#out has the text" }],
      hint: "<code>document.querySelector(\"#out\").textContent = ...</code>",
      solutions: [{ name: "Solution", code: c`<p id="out"></p>
<script>
  document.querySelector("#out").textContent = "JavaScript was here";
</script>` }] },
    { id: "fixpage", lvl: "fire", web: true, debug: true, title: "Fix the broken page", prompt: "<p>This page should show the heading <code>Week 4</code> and the paragraph <code>Let's build!</code>, but it has three bugs. Fix them.</p>",
      starter: c`<h1 id="title">Old title</h1>
<script>
  document.querySelector("#Title").textContent = "Week 4";
  document.querySelector("#msg").textContent = "Let's build!";
</script>
<p id="msg"></p>
<p id="msg">extra</p>`,
      tests: [{ check: "text('#title')", expected: "Week 4", desc: "the heading changed" }, { check: "text('#msg')", expected: "Let's build!", desc: "the paragraph changed" }, { check: "count('#msg')", expected: "1", desc: "only one element has id msg" }],
      hint: "1) ids are case-sensitive. 2) the script must come after the elements it uses. 3) an id must be unique.",
      solutions: [{ name: "Fixed", code: c`<h1 id="title">Old title</h1>
<p id="msg"></p>
<script>
  document.querySelector("#title").textContent = "Week 4";
  document.querySelector("#msg").textContent = "Let's build!";
</script>`, note: "<code>#Title</code> → <code>#title</code>; the paragraph moved above the script; the duplicate paragraph was removed." }] },
    { id: "profile", lvl: "fire", web: true, title: "Profile card", prompt: "<p>Make a page with an <code>&lt;h2 id=\"who\"&gt;</code> and a <code>&lt;p id=\"info\"&gt;</code>, both empty in the HTML. The script must create two variables, <code>name = \"Sara\"</code> and <code>age = 16</code>, and use them to fill the page so it shows:</p><pre class=\"code-static\">Sara\nAge: 16 · Next year: 17</pre><p>(The second line is the paragraph. Let JavaScript calculate 17.)</p>", starter: "",
      tests: [{ check: "text('#who')", expected: "Sara", desc: "#who shows the name" }, { check: "text('#info')", expected: "Age: 16 · Next year: 17", desc: "#info shows both ages" }],
      hint: "Use a template string: <code>`Age: ${age} · Next year: ${age + 1}`</code>.",
      solutions: [{ name: "Template string", code: c`<h2 id="who"></h2>
<p id="info"></p>
<script>
  const name = "Sara";
  const age = 16;
  document.querySelector("#who").textContent = name;
  document.querySelector("#info").textContent = ¦Age: #{age} · Next year: #{age + 1}¦;
</script>` }] },
  ],
  quiz: [
    { q: "Which language describes the **content and structure** of a page?", o: ["HTML", "CSS", "JavaScript"], a: 0, e: "HTML = content, CSS = look, JavaScript = behaviour." },
    { q: "Which is a correct paragraph?", o: ["`<p>Hi<p>`", "`<p>Hi</p>`", "`</p>Hi<p>`", "`<p Hi>`"], a: 1, e: "Opening tag, content, closing tag with a slash." },
    { q: "What does `document.querySelector(\".card\")` find?", o: ["The element with id card", "The first element with class card", "All elements with class card", "A tag called card"], a: 1, e: "A dot means class, and `querySelector` returns the first match." },
    { q: "What does this script do?", code: c`document.querySelector("#out").textContent = "Done";`, o: ["Shows Done in the console", "Puts the text Done inside the element with id out", "Creates a new element", "Nothing"], a: 1, e: "`textContent` is the text inside the element; giving it a value changes the page." },
    { q: "Why do we usually put `<script>` at the end of `<body>`?", o: ["It runs faster", "So the elements above it already exist when the script runs", "Browsers ignore scripts at the top", "It is required by HTML"], a: 1, e: "The page is read top to bottom. Elements below the script do not exist yet when it runs." },
  ],
  puzzle: { title: "Which element changes?", q: "<p>The page has three paragraphs. Which text does it show <b>in the second paragraph</b> after the script runs?</p>", code: c`<p class="x">A</p>
<p class="x" id="x">B</p>
<p id="y">C</p>
<script>
  document.querySelector(".x").textContent = "1";
  document.querySelector("#x").textContent = "2";
  document.querySelector("p").textContent = "3";
</script>`, answers: ["2"], hint: "`querySelector` returns only the FIRST match. Which paragraph does each line find?", e: "`.x` finds the first paragraph (A→1), `#x` finds the second (B→2), and `p` finds the first paragraph again (1→3). The second paragraph shows `2`." },
  cards: [
    { f: "HTML, CSS, JavaScript: who does what?", b: "HTML = content, CSS = look, JavaScript = behaviour." },
    { f: "What is the difference between `id` and `class`?", b: "An `id` is unique (one element). A `class` is a group name many elements can share." },
    { f: "How do you find the element with id `title`?", b: "`document.querySelector(\"#title\")`" },
    { f: "How do you change the text of an element `el`?", b: "`el.textContent = \"new text\";`" },
    { f: "Where does `<script>` usually go?", b: "At the end of `<body>`, after the elements it uses." },
  ],
  remember: [
    "HTML = content, CSS = look, JavaScript = behaviour.",
    "Tags come in pairs: `<p>` … `</p>`. Some, like `<input>` and `<img>`, have no closing tag.",
    "`id` is unique, `class` is for groups.",
    "`<script>` runs JavaScript inside the page; put it at the end of `<body>`.",
    "`document.querySelector(\"#id\")` finds an element; `.textContent = \"...\"` changes its text.",
  ],
};
})();
