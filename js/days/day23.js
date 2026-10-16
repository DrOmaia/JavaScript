window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[23] = {
  title: "The DOM: find and change elements",
  intro: "Yesterday you changed one line of text on a page, {{name}}. Today you get the full toolbox: find any element — by id, by class, by tag, or all of them at once — and change its text, its colours, its classes and its attributes. This is how every interactive website works.",
  goals: [
    "Explain what the DOM is and why it looks like a tree",
    "Find elements with `querySelector`, `getElementById` and `querySelectorAll`",
    "Loop over many elements with `for...of`",
    "Change text with `textContent` and `innerHTML`, and colours with `el.style`",
    "Add, remove and toggle CSS classes with `classList`",
    "Read and change attributes like `src`, `href`, `value` and `disabled`, and understand the `null` error",
  ],
  learn: [
    { t: "h", text: "The DOM: your page as a tree" },
    { t: "p", html: "<p>When the browser opens an HTML file, it does not keep it as text. It builds a set of <b>objects</b>, one for every element, so that JavaScript can talk to them. This set of objects is called the <b>DOM</b> (Document Object Model). Every change you make to the DOM appears on the screen at once — no reload needed.</p>" },
    { t: "analogy", title: "The DOM is like a family tree", html: "<p><code>&lt;html&gt;</code> is the grandparent. It has two children, <code>&lt;head&gt;</code> and <code>&lt;body&gt;</code>. The body's children are your headings, paragraphs and lists, and a list's children are its <code>&lt;li&gt;</code> items. An element inside another element is its <b>child</b>; the outer one is its <b>parent</b>. JavaScript can walk to any member of the family.</p>" },
    { t: "web", title: "tree.html", code: c`<!DOCTYPE html>
<html>
<body>
  <h1>My playlist</h1>
  <ul id="songs">
    <li>Song one</li>
    <li>Song two</li>
    <li>Song three</li>
  </ul>

  <script>
    const list = document.querySelector("#songs");
    console.log("The list is a", list.tagName);
    console.log("It has", list.children.length, "children");
    console.log("Its parent is", list.parentElement.tagName);
  </script>
</body>
</html>`, before: "<p>Every element object knows its tag name, its children and its parent. Look at the console.</p>", note: "<p><code>tagName</code> is written in capital letters by the browser. The <code>&lt;ul&gt;</code> has three <code>&lt;li&gt;</code> children, and its parent is the <code>&lt;body&gt;</code>.</p>", height: 230 },
    { t: "check", q: "In the page above, what is the **parent** of each `<li>`?", o: ["`<body>`", "the `<ul>`", "the `<h1>`"], a: 1, e: "Each `<li>` sits directly inside the `<ul>`, so the `<ul>` is its parent. The `<body>` is its grandparent." },

    { t: "h", text: "Finding one element" },
    { t: "p", html: "<p>Before you can change something, you must <b>find</b> it — like finding a friend in a crowded school yard. <code>document.querySelector()</code> takes a CSS <b>selector</b> and returns the <b>first</b> element that matches. There is also an older, very common way just for ids: <code>document.getElementById()</code>.</p>" },
    { t: "web", title: "find.html", code: c`<!DOCTYPE html>
<html>
<body>
  <h1 id="title">Canteen menu</h1>
  <p class="food">Falafel wrap</p>
  <p class="food">Chicken rice</p>
  <p>Open from 9:30</p>

  <script>
    const a = document.querySelector("#title");    // by id
    const b = document.querySelector(".food");     // by class (first one)
    const c = document.querySelector("p");         // by tag (first one)
    const d = document.getElementById("title");    // by id, no #

    console.log(a.textContent);
    console.log(b.textContent);
    console.log(c.textContent);
    console.log(a === d);
  </script>
</body>
</html>`, height: 230 },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`document.querySelector("#title")`, "<code>#</code> means <b>id</b>. Finds the element with <code>id=\"title\"</code>."],
      [c`document.querySelector(".food")`, "<code>.</code> means <b>class</b>. Two paragraphs have this class, but <code>querySelector</code> returns only the <b>first</b> one: Falafel wrap."],
      [c`document.querySelector("p")`, "No symbol means a <b>tag name</b>. The first <code>&lt;p&gt;</code> on the page is the Falafel paragraph again."],
      [c`document.getElementById("title")`, "Finds by id only, so you write the id <b>without</b> <code>#</code>. It returns the very same object as <code>a</code>, so <code>a === d</code> is <code>true</code>."],
    ] },
    { t: "turn", level: "Easy", q: "Complete the line so it finds `<p id=\"score\">`: `document.getElementById(___)`. Type what goes in the blank, with quotes.", answers: ["\"score\"", "'score'"], e: "`getElementById` already knows you mean an id, so there is no `#`: `document.getElementById(\"score\")`.", hint: "No # here — the # is only for selectors.", placeholder: "e.g. \"name\"" },

    { t: "h", text: "Finding many elements: querySelectorAll" },
    { t: "p", html: "<p>What if you want to change <b>every</b> price on a menu, not just the first? <code>document.querySelectorAll()</code> returns <b>all</b> matching elements in a list (a <i>NodeList</i>). It has a <code>.length</code>, and you can loop over it with <code>for...of</code>, just like an array.</p>" },
    { t: "web", title: "all.html", code: c`<!DOCTYPE html>
<html>
<body>
  <p>Juice: <span class="price">3</span></p>
  <p>Sandwich: <span class="price">7</span></p>
  <p>Cookie: <span class="price">2</span></p>
  <p id="info"></p>

  <script>
    const prices = document.querySelectorAll(".price");
    let total = 0;
    for (const p of prices) {
      total = total + Number(p.textContent);
      p.textContent = p.textContent + " SAR";
    }
    document.querySelector("#info").textContent = ¦#{prices.length} items, total #{total} SAR¦;
  </script>
</body>
</html>`, before: "<p>One loop visits each price: it adds the number to a total and then writes \" SAR\" after it.</p>", note: "<p>Inside the loop, <code>p</code> is a different element each time — first the 3, then the 7, then the 2. <code>textContent</code> is always a string, so we use <code>Number()</code> before adding.</p>", height: 200 },
    { t: "check", q: "A page has 4 elements with class `card`. You find them with `querySelectorAll(\".card\")`. What is the `.length` of the result?", o: ["1", "4", "\"card\""], a: 1, e: "`querySelectorAll` collects every match, so the list has 4 elements. `querySelector` (without All) would give only the first one." },

    { t: "h", text: "textContent or innerHTML?" },
    { t: "p", html: "<p>Both change what is inside an element. <code>textContent</code> treats everything as <b>plain text</b>: tags show up as characters. <code>innerHTML</code> reads the string as <b>HTML</b>, so tags become real elements. Use <code>textContent</code> for normal text, and especially for anything a user typed — it is safer.</p>" },
    { t: "web", title: "text-vs-html.html", code: c`<!DOCTYPE html>
<html>
<body>
  <p id="one"></p>
  <p id="two"></p>

  <script>
    const msg = "Goal by <b>Salem</b>!";
    document.querySelector("#one").textContent = msg;
    document.querySelector("#two").innerHTML = msg;
  </script>
</body>
</html>`, note: "<p>The first paragraph shows the tags as text. The second one has a real bold <b>Salem</b>.</p>", height: 140 },
    { t: "check", q: "You want to show a user's comment exactly as they typed it, even if it contains `<` signs. Which do you use?", o: ["`innerHTML`", "`textContent`", "`console.log`"], a: 1, e: "`textContent` never turns text into tags, so the comment shows exactly as typed and cannot break your page." },

    { t: "h", text: "Changing the look: el.style" },
    { t: "p", html: "<p>Every element has a <code>style</code> object. Set one of its properties and the look changes instantly. CSS names with a dash, like <code>background-color</code>, are written in <b>camelCase</b> in JavaScript: remove the dash and make the next letter capital — <code>backgroundColor</code>, <code>fontSize</code>. A dash would mean minus!</p>" },
    { t: "web", title: "style.html", code: c`<!DOCTYPE html>
<html>
<body>
  <h2 id="battery">Battery: 12%</h2>

  <script>
    const b = document.getElementById("battery");
    b.style.color = "white";
    b.style.backgroundColor = "crimson";
    b.style.padding = "10px";
    b.style.fontSize = "30px";
  </script>
</body>
</html>`, note: "<p>The values are strings, written just like in CSS: <code>\"30px\"</code>, not <code>30</code>.</p>", height: 130 },
    { t: "turn", level: "Medium", q: "The CSS property is `border-radius`. What is its name in JavaScript, after `el.style.`?", answers: ["borderRadius"], e: "Remove the dash and make the next letter capital: `el.style.borderRadius = \"8px\";`", placeholder: "e.g. fontSize", oneWord: true },

    { t: "h", text: "Classes: classList" },
    { t: "p", html: "<p>Setting styles one by one gets long. A cleaner way: describe a look once as a CSS class in a <code>&lt;style&gt;</code> tag, then let JavaScript put the class on or take it off. Every element has a <code>classList</code> with four handy methods: <code>add</code>, <code>remove</code>, <code>toggle</code> (add if missing, remove if there) and <code>contains</code> (<code>true</code>/<code>false</code>).</p>" },
    { t: "analogy", title: "A class is like a sticker", html: "<p>Imagine a sheet of stickers called <code>done</code>: anything with this sticker gets a green line through it. JavaScript does not repaint the item — it just sticks the sticker on (<code>add</code>), peels it off (<code>remove</code>), or checks if it is there (<code>contains</code>).</p>" },
    { t: "web", title: "classes.html", code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    .done { color: gray; text-decoration: line-through; }
    .urgent { background: gold; font-weight: bold; }
  </style>
</head>
<body>
  <ul>
    <li id="t1">Math homework</li>
    <li id="t2" class="urgent">Study for the quiz</li>
    <li id="t3">Clean my room</li>
  </ul>

  <script>
    document.querySelector("#t1").classList.add("done");
    document.querySelector("#t2").classList.remove("urgent");
    document.querySelector("#t3").classList.toggle("urgent");
    console.log(document.querySelector("#t1").classList.contains("done"));
  </script>
</body>
</html>`, note: "<p>Notice: in <code>classList</code> methods you write the class name <b>without</b> a dot. The dot is only for selectors.</p>", height: 200 },
    { t: "check", q: "An element has no class `dark`. You call `el.classList.toggle(\"dark\")` **twice**. Does it have the class now?", o: ["Yes", "No", "It causes an error"], a: 1, e: "The first toggle adds the class, the second removes it again. Toggle is like a light switch." },

    { t: "h", text: "Attributes: src, href, value, disabled" },
    { t: "p", html: "<p>Many attributes are also properties of the element object, with the same name. Change <code>img.src</code> to show another picture, <code>a.href</code> to change where a link goes, <code>input.value</code> to change the text in a box, and set <code>button.disabled = true</code> to grey a button out.</p>" },
    { t: "web", title: "attributes.html", code: c`<!DOCTYPE html>
<html>
<body>
  <a id="link" href="https://example.com">Open the timetable</a>
  <p><input id="city" value="Jeddah"></p>
  <button id="send">Send</button>
  <p id="info"></p>

  <script>
    const link = document.querySelector("#link");
    link.href = "https://developer.mozilla.org";
    link.textContent = "Open MDN";

    const city = document.querySelector("#city");
    city.value = "Riyadh";

    document.querySelector("#send").disabled = true;
    document.querySelector("#info").textContent = "City box says: " + city.value;
  </script>
</body>
</html>`, note: "<p><code>disabled</code> is a boolean: <code>true</code> turns the button off, <code>false</code> turns it on again. You can also <b>read</b> every one of these properties.</p>", height: 170 },

    { t: "h", text: "When nothing matches: null" },
    { t: "p", html: "<p>If no element matches your selector, <code>querySelector</code> and <code>getElementById</code> do not crash — they return <code>null</code>, which means \"nothing\". The crash comes on the next step, when you try to use that nothing. This is the most common error in DOM code, and now you will recognise it.</p>" },
    { t: "web", title: "null.html", code: c`<!DOCTYPE html>
<html>
<body>
  <p id="score">0</p>

  <script>
    const el = document.querySelector("#scor");   // typo!
    console.log(el);
    el.textContent = "10";
  </script>
</body>
</html>`, before: "<p>This page has a bug on purpose. Read the error in the console.</p>", note: "<p>The error <code>Cannot set properties of null</code> means: \"the thing before the dot is null\" — your selector found nothing. Check the spelling, the <code>#</code> or <code>.</code>, and that the script is below the element. Fix the typo and run again.</p>", height: 130 },
    { t: "check", q: "You see `Cannot read properties of null (reading 'textContent')`. What is the most likely cause?", o: ["`textContent` is spelled wrong", "The selector did not find any element", "The page has too many elements"], a: 1, e: "The value before `.textContent` is `null`, so the search found nothing: a typo in the id, a missing `#` or `.`, or a script placed above the element." },

    { t: "table", head: ["You want to…", "Write"], rows: [
      ["find the first match", "`document.querySelector(\"#id\")`, `(\".class\")`, `(\"tag\")`"],
      ["find by id", "`document.getElementById(\"id\")`"],
      ["find all matches", "`document.querySelectorAll(\".class\")` + `for (const el of list)`"],
      ["change the text", "`el.textContent = \"...\"` (or `el.innerHTML` for tags)"],
      ["change one style", "`el.style.backgroundColor = \"gold\"`"],
      ["use a CSS class", "`el.classList.add / remove / toggle / contains(\"name\")`"],
      ["change an attribute", "`img.src`, `a.href`, `input.value`, `button.disabled`"],
    ] },

    { t: "steps", web: true, title: "Highlight today in the timetable", problem: "<p>A timetable lists five days with class <code>day</code>. Today is <code>Tuesday</code>. Make JavaScript find today's row, give it the class <code>today</code> (gold background), and write <code>Today: Tuesday — 4 classes</code> in the heading.</p>",
      steps: [
        { html: "<p><b>Understand.</b> We do not know which row is Tuesday by its position, so we must look at <b>every</b> row and compare its text. That means <code>querySelectorAll</code> and a loop.</p>" },
        { html: "<p><b>Write the HTML and the class.</b> Each row has class <code>day</code>. The <code>.today</code> class is described once in <code>&lt;style&gt;</code>.</p>", code: c`<style>
  .today { background: gold; font-weight: bold; }
</style>
<h2 id="head">Timetable</h2>
<p class="day">Sunday</p>
<p class="day">Monday</p>
<p class="day">Tuesday</p>` },
        { html: "<p><b>Loop and compare.</b> For each row, if its text equals the day we want, add the class.</p>", code: c`const today = "Tuesday";
for (const row of document.querySelectorAll(".day")) {
  if (row.textContent === today) {
    row.classList.add("today");
  }
}` },
        { html: "<p><b>Update the heading</b> with a template string, then run it. Change <code>today</code> to <code>\"Thursday\"</code> and run again — the gold row moves.</p>", code: c`document.querySelector("#head").textContent = ¦Today: #{today} — #{lessons} classes¦;` },
      ],
      code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    .today { background: gold; font-weight: bold; }
  </style>
</head>
<body>
  <h2 id="head">Timetable</h2>
  <p class="day">Sunday</p>
  <p class="day">Monday</p>
  <p class="day">Tuesday</p>
  <p class="day">Wednesday</p>
  <p class="day">Thursday</p>

  <script>
    const today = "Tuesday";
    const lessons = 4;
    for (const row of document.querySelectorAll(".day")) {
      if (row.textContent === today) {
        row.classList.add("today");
      }
    }
    document.querySelector("#head").textContent = ¦Today: #{today} — #{lessons} classes¦;
  </script>
</body>
</html>` },
  ],
  mistakes: [
    { title: "Using # with getElementById", html: "<code>getElementById</code> already expects an id. With <code>#</code> it looks for an id that really starts with #, finds nothing and returns <code>null</code>.", wrong: c`document.getElementById("#title")`, right: c`document.getElementById("title")` },
    { title: "Changing a list as if it were one element", html: "<code>querySelectorAll</code> returns a list. A list has no <code>textContent</code> or <code>style</code> of its own — loop over it and change each element.", wrong: c`document.querySelectorAll(".price").textContent = "0";`, right: c`for (const p of document.querySelectorAll(".price")) {
  p.textContent = "0";
}` },
    { title: "CSS names with a dash", html: "In JavaScript, <code>background-color</code> would mean \"background minus color\". Use camelCase.", wrong: c`el.style.background-color = "gold";`, right: c`el.style.backgroundColor = "gold";` },
    { title: "A dot inside classList", html: "The dot belongs to selectors only. <code>classList</code> wants the bare class name.", wrong: c`el.classList.add(".done");`, right: c`el.classList.add("done");` },
  ],
  tricks: [
    { title: "Keep elements in const variables", html: "Find an element once, keep it in a <code>const</code>, and use the variable many times. Your code is shorter and the browser does not search again and again." },
    { title: "Selectors can be combined", html: "<code>querySelector(\"ul .item\")</code> finds an <code>.item</code> inside a <code>&lt;ul&gt;</code>; <code>querySelector(\"li:first-child\")</code> finds a first list item. Any CSS selector works." },
    { title: "Prefer classes over many style lines", html: "If you set three or more styles together, make a CSS class in <code>&lt;style&gt;</code> and use <code>classList</code>. The look stays in CSS, the behaviour in JavaScript." },
  ],
  practice: [
    { t: "webtry", title: "Recolour the menu", html: "<p>Make every <code>.dish</code> dark green, and the second dish bold. Then try <code>fontSize</code> and <code>backgroundColor</code> too.</p>", code: c`<!DOCTYPE html>
<html>
<body>
  <p class="dish">Kabsa</p>
  <p class="dish">Shawarma</p>
  <p class="dish">Mutabbaq</p>

  <script>
    for (const d of document.querySelectorAll(".dish")) {
      // change d.style here
    }
  </script>
</body>
</html>` },
    { t: "turn", level: "Easy", q: "Which method returns **all** the matching elements? Type its name.", answers: ["querySelectorAll", "document.querySelectorAll", "querySelectorAll()"], e: "`querySelectorAll` returns a list of every match; `querySelector` returns only the first.", placeholder: "e.g. getElementById" },
    { t: "parsons", title: "Mark every finished task", prompt: "Put the lines in order so every <code>.task</code> gets the class <code>done</code>.", lines: [c`const tasks = document.querySelectorAll(".task");`, c`for (const t of tasks) {`, c`  t.classList.add("done");`, c`}`], distractors: [c`  t.classList.add(".done");`], explain: "First find all tasks, then loop and add the class — without a dot." },
    { t: "webtry", title: "Find the null", html: "<p>This page crashes. Read the console, find which selector returns <code>null</code>, and fix it.</p>", code: c`<h1 id="title">Hello</h1>
<p class="msg">Message</p>
<script>
  document.getElementById("title").textContent = "Fixed title";
  document.querySelector("msg").textContent = "Fixed message";
</script>` },
    { t: "webtry", title: "Light switch", html: "<p>Run this page a few times. Then change the script so it toggles the <code>on</code> class <b>three</b> times. Is the bulb on or off?</p>", code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    #bulb { font-size: 40px; padding: 10px; background: #333; color: #666; }
    #bulb.on { background: #ffe066; color: #000; }
  </style>
</head>
<body>
  <p id="bulb">💡 Bulb</p>
  <script>
    const bulb = document.querySelector("#bulb");
    bulb.classList.toggle("on");
    console.log("On?", bulb.classList.contains("on"));
  </script>
</body>
</html>` },
    { t: "turn", level: "Medium", q: "What does `document.querySelector(\"#nothing-here\")` return when no element has that id?", answers: ["null"], e: "It returns `null`. Using `.textContent` on `null` is what crashes.", placeholder: "one word" },
    { t: "webtry", title: "Swap the picture and the link", html: "<p>Change the link so it goes to <code>https://www.wikipedia.org</code> and says <code>Wikipedia</code>. Then disable the button.</p>", code: c`<!DOCTYPE html>
<html>
<body>
  <a id="go" href="https://example.com">Example</a>
  <button id="btn">Press</button>
  <script>
    const go = document.querySelector("#go");
    // your code here
  </script>
</body>
</html>` },
  ],
  exercises: [
    { id: "by-id", lvl: "seed", web: true, title: "Change the title", prompt: "<p>Use <code>document.getElementById</code> to change the text of the heading to <code>DOM master</code>.</p>", starter: c`<h1 id="title">Old title</h1>
<script>
  // your code here
</script>`,
      tests: [{ check: "text('#title')", expected: "DOM master", desc: "the heading says DOM master" }, { check: "count('h1')", expected: "1", desc: "there is still exactly one heading" }],
      hint: "<code>document.getElementById(\"title\").textContent = \"DOM master\";</code> — no <code>#</code> with getElementById.",
      solutions: [{ name: "getElementById", code: c`<h1 id="title">Old title</h1>
<script>
  document.getElementById("title").textContent = "DOM master";
</script>` }, { name: "querySelector", code: c`<h1 id="title">Old title</h1>
<script>
  const t = document.querySelector("#title");
  t.textContent = "DOM master";
</script>`, note: "Both find the same element." }] },
    { id: "warning", lvl: "seed", web: true, title: "Make a warning", prompt: "<p>The paragraph <code>#warn</code> should look like a warning: set its text colour to <code>red</code> and its background colour to <code>yellow</code> with <code>el.style</code>.</p>", starter: c`<p id="warn">Low battery!</p>
<script>
  const warn = document.querySelector("#warn");
  // your code here
</script>`,
      tests: [{ check: "style('#warn', 'color')", expected: "rgb(255, 0, 0)", desc: "the text is red" }, { check: "style('#warn', 'backgroundColor')", expected: "rgb(255, 255, 0)", desc: "the background is yellow" }],
      hint: "<code>warn.style.color = \"red\";</code> and <code>warn.style.backgroundColor = ...</code> (camelCase!).",
      solutions: [{ name: "Solution", code: c`<p id="warn">Low battery!</p>
<script>
  const warn = document.querySelector("#warn");
  warn.style.color = "red";
  warn.style.backgroundColor = "yellow";
</script>`, note: "The browser stores colours as rgb numbers — red is rgb(255, 0, 0)." }] },
    { id: "all-prices", lvl: "star", web: true, title: "Prices in riyals", prompt: "<p>Every <code>.price</code> holds a number. Use <code>querySelectorAll</code> and a <code>for...of</code> loop to add <code> SAR</code> after each one (so <code>5</code> becomes <code>5 SAR</code>). Then write the number of prices into <code>#count</code>, like <code>3 prices</code>.</p>", starter: c`<p>Water: <span class="price">1</span></p>
<p>Juice: <span class="price">4</span></p>
<p>Wrap: <span class="price">9</span></p>
<p id="count"></p>
<script>
  // your code here
</script>`,
      tests: [{ check: "[...document.querySelectorAll('.price')].map(e => e.textContent.trim()).join(' | ')", expected: "1 SAR | 4 SAR | 9 SAR", desc: "every price ends with SAR" }, { check: "text('#count')", expected: "3 prices", desc: "#count shows 3 prices" }],
      hint: "<code>for (const p of prices) { p.textContent = p.textContent + \" SAR\"; }</code> and use <code>prices.length</code> for the count.",
      solutions: [{ name: "for...of", code: c`<p>Water: <span class="price">1</span></p>
<p>Juice: <span class="price">4</span></p>
<p>Wrap: <span class="price">9</span></p>
<p id="count"></p>
<script>
  const prices = document.querySelectorAll(".price");
  for (const p of prices) {
    p.textContent = p.textContent + " SAR";
  }
  document.querySelector("#count").textContent = ¦#{prices.length} prices¦;
</script>` }, { name: "Template string", code: c`<p>Water: <span class="price">1</span></p>
<p>Juice: <span class="price">4</span></p>
<p>Wrap: <span class="price">9</span></p>
<p id="count"></p>
<script>
  const prices = document.querySelectorAll(".price");
  for (const p of prices) {
    p.textContent = ¦#{p.textContent} SAR¦;
  }
  document.getElementById("count").textContent = prices.length + " prices";
</script>` }],
      twist: "Also add up the prices and show <code>Total: 14 SAR</code> in another paragraph. (Remember <code>Number()</code>!)" },
    { id: "stickers", lvl: "star", web: true, title: "Classes on and off", prompt: "<p>Use <code>classList</code> (not <code>style</code>):</p><ul><li>add the class <code>done</code> to <code>#t1</code>,</li><li>remove the class <code>urgent</code> from <code>#t2</code>,</li><li>toggle the class <code>urgent</code> on <code>#t3</code>.</li></ul>", starter: c`<!DOCTYPE html>
<html>
<head>
  <style>
    .done { text-decoration: line-through; color: gray; }
    .urgent { background: gold; }
  </style>
</head>
<body>
  <ul>
    <li id="t1">Read chapter 4</li>
    <li id="t2" class="urgent">Buy a new pen</li>
    <li id="t3">Revise for the quiz</li>
  </ul>
  <script>
    // your code here
  </script>
</body>
</html>`,
      tests: [{ check: "$('#t1').classList.contains('done')", expected: "true", desc: "#t1 has the class done" }, { check: "$('#t2').classList.contains('urgent')", expected: "false", desc: "#t2 lost the class urgent" }, { check: "$('#t3').className", expected: "urgent", desc: "#t3 has the class urgent" }],
      hint: "<code>document.querySelector(\"#t1\").classList.add(\"done\");</code> — no dot before the class name.",
      solutions: [{ name: "Solution", code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    .done { text-decoration: line-through; color: gray; }
    .urgent { background: gold; }
  </style>
</head>
<body>
  <ul>
    <li id="t1">Read chapter 4</li>
    <li id="t2" class="urgent">Buy a new pen</li>
    <li id="t3">Revise for the quiz</li>
  </ul>
  <script>
    document.querySelector("#t1").classList.add("done");
    document.querySelector("#t2").classList.remove("urgent");
    document.querySelector("#t3").classList.toggle("urgent");
  </script>
</body>
</html>` }] },
    { id: "attrs", lvl: "star", web: true, title: "Change the attributes", prompt: "<p>With JavaScript (do not edit the HTML tags):</p><ul><li>set the picture's <code>src</code> to <code>cat.png</code>,</li><li>set the link's <code>href</code> to <code>https://developer.mozilla.org</code>,</li><li>put <code>{{name}}</code> into the input's <code>value</code>,</li><li>disable the button.</li></ul>", starter: c`<img id="pic" src="dog.png" alt="A pet">
<a id="link" href="https://example.com">Learn more</a>
<input id="who">
<button id="send">Send</button>
<script>
  // your code here
</script>`,
      tests: [{ check: "$('#pic').getAttribute('src')", expected: "cat.png", desc: "the picture is cat.png" }, { check: "$('#link').getAttribute('href')", expected: "https://developer.mozilla.org", desc: "the link goes to MDN" }, { check: "$('#who').value", expected: "{{name}}", desc: "the input holds your name" }, { check: "$('#send').disabled", expected: "true", desc: "the button is disabled" }],
      hint: "<code>document.querySelector(\"#pic\").src = \"cat.png\";</code> — the others work the same way; <code>disabled</code> takes <code>true</code>.",
      solutions: [{ name: "Solution", code: c`<img id="pic" src="dog.png" alt="A pet">
<a id="link" href="https://example.com">Learn more</a>
<input id="who">
<button id="send">Send</button>
<script>
  document.querySelector("#pic").src = "cat.png";
  document.querySelector("#link").href = "https://developer.mozilla.org";
  document.querySelector("#who").value = "{{name}}";
  document.querySelector("#send").disabled = true;
</script>` }] },
    { id: "fix-dom", lvl: "fire", web: true, debug: true, title: "Fix the score board", prompt: "<p>This page should show <code>Score: 25</code> in a gold box and make every <code>.player</code> bold. It has four bugs. Read the console and fix them one by one.</p>",
      starter: c`<!DOCTYPE html>
<html>
<head>
  <style>
    .bold { font-weight: bold; }
  </style>
</head>
<body>
  <p id="score">Score: 0</p>
  <p class="player">Faisal</p>
  <p class="player">Yousef</p>
  <script>
    const score = document.getElementById("#score");
    score.textContent = "Score: 25";
    score.style.backgroundcolor = "gold";
    document.querySelectorAll(".player").classList.add(".bold");
  </script>
</body>
</html>`,
      tests: [{ check: "text('#score')", expected: "Score: 25", desc: "the score shows 25" }, { check: "style('#score', 'backgroundColor')", expected: "rgb(255, 215, 0)", desc: "the score box is gold" }, { check: "count('.player.bold')", expected: "2", desc: "both players have the class bold" }],
      hint: "1) no <code>#</code> with getElementById. 2) camelCase has a capital C. 3) a list needs a loop. 4) no dot inside <code>classList.add</code>.",
      solutions: [{ name: "Fixed", code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    .bold { font-weight: bold; }
  </style>
</head>
<body>
  <p id="score">Score: 0</p>
  <p class="player">Faisal</p>
  <p class="player">Yousef</p>
  <script>
    const score = document.getElementById("score");
    score.textContent = "Score: 25";
    score.style.backgroundColor = "gold";
    for (const p of document.querySelectorAll(".player")) {
      p.classList.add("bold");
    }
  </script>
</body>
</html>`, note: "<code>backgroundcolor</code> (small c) does not crash — JavaScript just creates a useless new property, so nothing happens. That is why it is a sneaky bug." }] },
    { id: "leaderboard", lvl: "fire", web: true, title: "Leaderboard", prompt: "<p>The page has three empty <code>&lt;li class=\"player\"&gt;</code> items and an array of objects in the script. Fill item number <i>i</i> with the <i>i</i>-th player as <code>Name: points</code> (e.g. <code>Nora: 18</code>). Then give the class <code>winner</code> to the item of the player with the <b>most</b> points, and write <code>Winner: Name</code> into <code>#best</code>. Your code must still work if the points change.</p>", starter: c`<!DOCTYPE html>
<html>
<head>
  <style>
    .winner { background: gold; }
  </style>
</head>
<body>
  <ol>
    <li class="player"></li>
    <li class="player"></li>
    <li class="player"></li>
  </ol>
  <p id="best"></p>
  <script>
    const players = [
      { name: "Nora", points: 18 },
      { name: "Omar", points: 31 },
      { name: "Lina", points: 24 },
    ];
    const items = document.querySelectorAll(".player");
    // your code here
  </script>
</body>
</html>`,
      tests: [{ check: "[...document.querySelectorAll('.player')].map(e => e.textContent.trim()).join(' | ')", expected: "Nora: 18 | Omar: 31 | Lina: 24", desc: "the items show every player" }, { check: "count('.winner')", expected: "1", desc: "exactly one winner" }, { check: "text('.winner')", expected: "Omar: 31", desc: "Omar's item is the winner" }, { check: "text('#best')", expected: "Winner: Omar", desc: "#best names the winner" }],
      hint: "Use a normal <code>for</code> loop with an index <code>i</code>: <code>items[i]</code> goes with <code>players[i]</code>. Keep the index of the best player in a variable while you loop.",
      solutions: [{ name: "Index loop", code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    .winner { background: gold; }
  </style>
</head>
<body>
  <ol>
    <li class="player"></li>
    <li class="player"></li>
    <li class="player"></li>
  </ol>
  <p id="best"></p>
  <script>
    const players = [
      { name: "Nora", points: 18 },
      { name: "Omar", points: 31 },
      { name: "Lina", points: 24 },
    ];
    const items = document.querySelectorAll(".player");
    let best = 0;
    for (let i = 0; i < players.length; i++) {
      items[i].textContent = ¦#{players[i].name}: #{players[i].points}¦;
      if (players[i].points > players[best].points) {
        best = i;
      }
    }
    items[best].classList.add("winner");
    document.querySelector("#best").textContent = "Winner: " + players[best].name;
  </script>
</body>
</html>` }],
      twist: "Change Lina's points to 40 and run again — the gold item should move to Lina without any other change." },
  ],
  quiz: [
    { q: "What is the DOM?", o: ["A programming language", "The page as a tree of objects that JavaScript can change", "A list of CSS colours", "The browser's console"], a: 1, e: "The browser turns the HTML into objects — the Document Object Model — and JavaScript changes the page through them." },
    { q: "Which line finds the element `<div id=\"box\">`?", o: ["`document.getElementById(\"#box\")`", "`document.querySelector(\"box\")`", "`document.querySelector(\"#box\")`", "`document.querySelector(\".box\")`"], a: 2, e: "With `querySelector`, `#` means id. `getElementById` would need `\"box\"` without `#`." },
    { q: "How do you set the background colour of `el` to gold?", o: ["`el.style.background-color = \"gold\";`", "`el.style.backgroundColor = \"gold\";`", "`el.backgroundColor = \"gold\";`", "`el.style = gold;`"], a: 1, e: "Styles live in `el.style`, and dashed CSS names become camelCase." },
    { q: "What does `el.classList.contains(\"active\")` return?", o: ["the element", "`true` or `false`", "the class name", "nothing"], a: 1, e: "`contains` answers a yes/no question, so it returns a boolean." },
    { q: "What happens?", code: c`const items = document.querySelectorAll(".item");
items.textContent = "Hi";`, o: ["Every .item shows Hi", "Only the first .item shows Hi", "Nothing changes on the page", "The page reloads"], a: 2, e: "`items` is a list, not an element. Setting `textContent` on the list does nothing visible; you need a loop.", noRun: true },
    { q: "`el.innerHTML = \"<i>Hi</i>\"` shows…", o: ["the text `<i>Hi</i>` with the tags visible", "Hi in italics", "an error", "nothing"], a: 1, e: "`innerHTML` reads the string as HTML, so the `<i>` tag becomes real italics." },
  ],
  puzzle: { title: "Which colour wins?", q: "<p>After this script runs, what is the text colour of the <b>second</b> paragraph? Type one colour word.</p>", code: c`<p class="note">A</p>
<p class="note">B</p>
<script>
  for (const p of document.querySelectorAll(".note")) {
    p.style.color = "blue";
  }
  document.querySelector(".note").style.color = "green";
  document.querySelectorAll("p")[1].style.color = "red";
  document.querySelector("p").style.color = "orange";
</script>`, answers: ["red"], hint: "The loop paints both. Then which paragraph does each of the next three lines touch? `[1]` is the second item of the list.", e: "Both start blue. `.note` without All is the first paragraph (green). `querySelectorAll(\"p\")[1]` is the second paragraph → red. `querySelector(\"p\")` is the first again → orange. The second paragraph stays **red**." },
  cards: [
    { f: "What is the DOM?", b: "The Document Object Model: the page as a tree of element objects that JavaScript can read and change." },
    { f: "`querySelector` vs `querySelectorAll`?", b: "`querySelector` returns the first match (or `null`); `querySelectorAll` returns a list of all matches — loop over it with `for...of`." },
    { f: "How is `background-color` written in JavaScript?", b: "`el.style.backgroundColor` — camelCase, no dash." },
    { f: "The four `classList` methods?", b: "`add`, `remove`, `toggle`, `contains` — with the class name, no dot." },
    { f: "What does `Cannot set properties of null` mean?", b: "Your selector found nothing, so the variable is `null`. Check the spelling, `#` / `.`, and the script position." },
  ],
  remember: [
    "The DOM is the page as a tree of objects; changing it changes the screen at once.",
    "`querySelector(\"#id\" / \".class\" / \"tag\")` gives the first match; `getElementById(\"id\")` has no `#`.",
    "`querySelectorAll` gives a list: use `for...of` and change each element.",
    "`textContent` = plain text (safe); `innerHTML` = text read as HTML.",
    "Styles use camelCase (`el.style.fontSize`); classes use `classList.add / remove / toggle / contains`.",
    "No match → `null` → the next `.something` crashes. Check your selector first.",
  ],
};
})();
