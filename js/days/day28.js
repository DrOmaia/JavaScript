window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[28] = {
  title: "Rest day",
  intro: "Four weeks done, {{name}}! No new code today. Read a little about the people who build the web, how to make pages that everyone can use, and how to put your own page on the internet for free. Then get ready: the last two days are your own project.",
  learn: [
    { t: "h", text: "What do web developers actually do?" },
    { t: "p", html: "<p>Every app and website you used today was built by people doing what you did this week. <b>Front-end</b> developers build what you see and click: HTML, CSS and JavaScript in the browser. <b>Back-end</b> developers build the part on the server that stores accounts, messages and scores. People who do both are called <b>full-stack</b>.</p><p>A normal day is less about typing fast and more about <b>thinking</b>: reading what the user needs, splitting it into small steps, testing, reading error messages, and searching the documentation (developers look things up all the time — nobody remembers every method). Sound familiar? That is exactly how you solved this week's problems.</p>" },
    { t: "h", text: "Pages for everyone: accessibility" },
    { t: "p", html: "<p>Some people cannot see the screen and use a <b>screen reader</b> that reads the page aloud. Some cannot use a mouse and move with the keyboard. Some see colours differently. Making a page work for all of them is called <b>accessibility</b>, and three small habits already help a lot:</p><ul><li><b>Alt text</b> — every picture gets an <code>alt</code> that says what it shows, so a screen reader can describe it.</li><li><b>Labels</b> — every input gets a <code>&lt;label&gt;</code>, so everyone knows what to type. Clicking the label also puts the cursor in the box.</li><li><b>Contrast</b> — dark text on a light background (or the opposite). Light grey on white looks stylish but many people cannot read it, especially on a phone in the sun.</li></ul>" },
    { t: "static", code: c`<img src="team.jpg" alt="Our football team holding the school cup">

<label for="city">Your city</label>
<input id="city">

<button id="send">Send</button>` },
    { t: "p", html: "<p>One more: use a real <code>&lt;button&gt;</code> for things you click. A button works with the Tab and Enter keys by itself; a clickable <code>&lt;div&gt;</code> does not.</p>" },
    { t: "h", text: "Put your page online for free" },
    { t: "p", html: "<p>A page on your computer is only for you. To share it with a link, it must live on a <b>web server</b>. <b>GitHub Pages</b> gives you one for free, and this course is hosted exactly like that. In simple words:</p><ol><li>Make a free account on GitHub (ask a parent first if you are under 18).</li><li>Create a new <b>repository</b> — a folder in the cloud — called <code>yourname.github.io</code>.</li><li>Upload your page and name it <code>index.html</code>. That name means \"the first page of the site\".</li><li>In the repository's <b>Settings → Pages</b>, choose the main branch and save.</li><li>Wait a minute and open <code>https://yourname.github.io</code>. Your page is on the internet!</li></ol><p>Before you share, check it on a phone and remove anything private, like your full name or school.</p>" },
    { t: "h", text: "A light plan for today (optional)" },
    { t: "p", html: "<ul><li>10 minutes: open the <a href=\"review.html\">review deck</a> and go through today's cards.</li><li>5 minutes: read your <a href=\"notes.html\">notes</a> from Days 22–27 and add one sentence in your own words.</li><li>If you feel like coding: open your quiz from Day 27 and add one question about something you love.</li></ul>" },
    { t: "h", text: "Self-check: Week 4" },
    { t: "p", html: "<p>Answer from memory. If one is hard, that day is the one to look at again.</p>" },
    { t: "check", q: "Which line finds the element `<p id=\"total\">`?", o: ["`document.querySelector(\"total\")`", "`document.querySelector(\"#total\")`", "`document.querySelector(\".total\")`"], a: 1, e: "`#` means id, `.` means class, and no sign means a tag name." },
    { t: "turn", level: "Easy", q: "An input holds the text `\"7\"`. Which function turns it into a number? Type only its name.", answers: ["Number", "Number()"], e: "`Number(input.value)` turns the text into a number you can do maths with.", placeholder: "e.g. String" },
    { t: "check", q: "Which code makes a new list item and shows it at the end of `list`?", o: ["`list.textContent = \"li\";`", "`const li = document.createElement(\"li\"); list.append(li);`", "`document.querySelector(\"li\");`"], a: 1, e: "`createElement` makes the element and `append` puts it on the page." },
    { t: "turn", level: "Medium", q: "Which attribute of `<img>` describes the picture for people who cannot see it? Type only its name.", answers: ["alt", "alt=\"\""], e: "`alt` text is read aloud by screen readers and also shows if the picture fails to load.", placeholder: "e.g. src" },
    { t: "check", q: "A stopwatch made with `setInterval` will not stop. What is the most likely reason?", o: ["`clearInterval` was never called, or it did not get the right id", "`setInterval` only works once", "The page has no `<script>` tag"], a: 0, e: "An interval repeats until `clearInterval(id)` is called with the id that `setInterval` returned." },
    { t: "h", text: "Coming next: your capstone (Days 29–30)" },
    { t: "p", html: "<p>The last two days are yours. You pick <b>one</b> project and build it step by step, with automatic checks for every milestone, then polish it and earn your certificate:</p><ul><li><b>Calculator</b> — buttons for digits and operators, a display, and clear.</li><li><b>Quiz game</b> — your Day 27 quiz, grown up: more questions, a timer, a best score.</li><li><b>To-do list</b> — add, finish and delete tasks, and keep them with <code>localStorage</code>.</li></ul><p>Think tonight about which one you would like to show your family. There is no wrong choice.</p>" },
  ],
  remember: [
    "`<script>` at the end of `<body>` runs JavaScript after the page's elements exist.",
    "`querySelector` finds one element, `querySelectorAll` finds all; `textContent`, `style` and `classList` change them.",
    "`addEventListener` runs your function on a click, a key press or typing; the event object tells you more.",
    "`input.value` is a string: use `Number()` before maths and `.trim()` to remove spaces.",
    "`createElement` + `append` / `prepend` add elements; `remove()` deletes one.",
    "`setTimeout` runs once later; `setInterval` repeats until `clearInterval`.",
    "Accessible pages: `alt` on images, a `<label>` for every input, strong contrast, real buttons.",
    "GitHub Pages puts a page online for free: upload `index.html` and turn Pages on.",
  ],
};
})();
