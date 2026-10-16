window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[26] = {
  title: "Create elements, lists and timers",
  intro: "So far your JavaScript could only change elements that were already in the HTML, {{name}}. Today it builds new ones: list items, buttons, a whole to-do list. Then you teach your page to wait and to repeat with timers, and to remember one thing even after the page closes.",
  goals: [
    "Create new elements with `document.createElement()` and put them on the page with `append` / `prepend`",
    "Delete elements with `remove()` and clear a box with `innerHTML = \"\"`",
    "Build a list on the page from an array with `for...of`",
    "Build a mini to-do list: add, mark as done, delete",
    "Run code later with `setTimeout`, and again and again with `setInterval` / `clearInterval`",
    "Save and load a value with `localStorage` (and an array with `JSON.stringify` / `JSON.parse`)",
  ],
  learn: [
    { t: "h", text: "Why create elements with JavaScript?" },
    { t: "p", html: "<p>Think about a to-do list app. When you write the HTML, you do not know how many tasks the user will add tomorrow: maybe two, maybe twenty. The same is true for chat messages, search results or the songs in a playlist. The HTML cannot list them in advance, so JavaScript must <b>make new elements</b> while the page is open.</p>" },
    { t: "analogy", title: "createElement is like a LEGO brick in your hand", html: "<p><code>document.createElement(\"li\")</code> gives you a new brick, but it is still in your hand — nobody can see it. You can paint it (<code>textContent</code>, <code>className</code>) while you hold it. Only when you <b>snap it onto the model</b> with <code>append</code> does it appear on the page.</p>" },
    { t: "web", title: "create.html", code: c`<!DOCTYPE html>
<html>
<body>
  <h2>My subjects</h2>
  <ul id="subjects">
    <li>Maths</li>
  </ul>

  <script>
    const list = document.querySelector("#subjects");

    const li = document.createElement("li");
    li.textContent = "Physics";
    list.append(li);
  </script>
</body>
</html>`, before: "<p>The HTML has one subject. The script makes a second one. Look at the preview, then change <code>Physics</code> to your favourite subject and press <b>▶ Run</b>.</p>", height: 170 },
    { t: "lines", title: "Read it like a web developer", rows: [
      [c`document.createElement("li")`, "Makes a <b>new, empty</b> <code>&lt;li&gt;</code> element. You write the tag name without angle brackets. The element exists only inside JavaScript for now."],
      [c`const li = ...`, "Keep the new element in a variable so you can work on it."],
      [c`li.textContent = "Physics";`, "Give it text, exactly as you did on Day 23 with elements found by <code>querySelector</code>."],
      [c`list.append(li);`, "Put it <b>inside</b> <code>list</code>, as the <b>last</b> child. Now it is on the page."],
    ] },
    { t: "check", q: "A script runs `const p = document.createElement(\"p\"); p.textContent = \"Hi\";` and nothing else. What do you see on the page?", o: ["A new paragraph `Hi` at the bottom", "Nothing new: the paragraph was never appended", "An error message"], a: 1, e: "`createElement` only makes the element. It appears on the page only after you `append` (or `prepend`) it somewhere.", hint: "Remember the LEGO brick: is it on the model yet?" },
    { t: "h", text: "append, prepend and remove" },
    { t: "p", html: "<p>New messages in a chat go to the <b>bottom</b>, but a news site shows the newest story at the <b>top</b>. And when you finish a task you want it <b>gone</b>. Three small methods do these jobs. Each new element below also gets a <code>className</code>, which is the same as writing <code>class=\"...\"</code> in the HTML.</p>" },
    { t: "web", title: "add-remove.html", code: c`<!DOCTYPE html>
<html>
<body>
  <button id="end">Add at the end</button>
  <button id="start">Add at the start</button>
  <button id="del">Remove the first</button>
  <ol id="queue"></ol>

  <script>
    const queue = document.querySelector("#queue");
    let n = 0;

    function makeItem() {
      n++;
      const li = document.createElement("li");
      li.textContent = "Student " + n;
      li.className = "student";
      return li;
    }

    document.querySelector("#end").addEventListener("click", () => {
      queue.append(makeItem());
    });
    document.querySelector("#start").addEventListener("click", () => {
      queue.prepend(makeItem());
    });
    document.querySelector("#del").addEventListener("click", () => {
      const first = document.querySelector(".student");
      if (first) {
        first.remove();
      }
    });
  </script>
</body>
</html>`, before: "<p>Click the three buttons in different orders and watch the canteen queue change.</p>", note: "<p><code>makeItem()</code> is a normal function from Week 3 that <b>returns</b> a new element. The <code>if (first)</code> protects us: when the list is empty, <code>querySelector</code> returns <code>null</code>, and <code>null.remove()</code> would crash.</p>", height: 240 },
    { t: "table", head: ["Code", "What it does"], rows: [
      ["`document.createElement(\"li\")`", "makes a new element (not on the page yet)"],
      ["`el.textContent = \"...\"`", "sets its text"],
      ["`el.className = \"done\"`", "sets its class (like `class=\"done\"` in HTML)"],
      ["`box.append(el)`", "puts `el` inside `box`, at the end"],
      ["`box.prepend(el)`", "puts `el` inside `box`, at the start"],
      ["`el.remove()`", "deletes `el` from the page"],
      ["`box.innerHTML = \"\"`", "deletes everything inside `box`"],
    ] },
    { t: "turn", level: "Easy", q: "Which method puts a new element at the **start** of a list? Type only its name.", answers: ["prepend", "prepend()", ".prepend()", ".prepend"], e: "`prepend` adds at the start, `append` adds at the end.", placeholder: "e.g. append" },
    { t: "h", text: "From an array to a list on the page" },
    { t: "p", html: "<p>In Week 3 you kept data in arrays: marks, songs, names. Now you can show an array on the page. The plan is always the same: <b>loop</b> over the array, and for every item <b>create</b>, <b>fill</b> and <b>append</b> one element.</p>" },
    { t: "web", title: "playlist.html", code: c`<!DOCTYPE html>
<html>
<body>
  <h2>{{name}}'s playlist</h2>
  <ul id="songs"></ul>

  <script>
    const songs = ["Morning run", "Study beats", "Road trip", "Calm night"];
    const ul = document.querySelector("#songs");

    for (const song of songs) {
      const li = document.createElement("li");
      li.textContent = song;
      ul.append(li);
    }
  </script>
</body>
</html>`, height: 200, note: "<p>Add a fifth song <b>to the array</b> and run again: the page grows by itself. You change the data, and the loop builds the page. <code>songs.forEach(song => { ... })</code> works exactly the same way.</p>" },
    { t: "check", q: "The array has 6 items and the loop body creates and appends one `<li>`. How many `<li>` are created?", o: ["1", "6", "7"], a: 1, e: "The loop body runs once for every item, so 6 times: one `<li>` per item." },
    { t: "steps", web: true, title: "A mini to-do list", problem: "<p>Build a to-do list: type a task, click <b>Add</b> and it appears in the list. Clicking a task crosses it out (and clicking again brings it back). Each task has a <b>✕</b> button that deletes it, and <b>Clear all</b> empties the list. Empty tasks must be ignored.</p>",
      steps: [
        { html: "<p><b>Understand.</b> The input, the two buttons and an empty <code>&lt;ul&gt;</code> are fixed HTML. Every task is a new <code>&lt;li&gt;</code> created by JavaScript. A small CSS rule gives the class <code>done</code> a line through the text.</p>", code: c`<style>
  .done { text-decoration: line-through; color: gray; }
</style>
<input id="task" placeholder="New task">
<button id="add">Add</button>
<button id="clear">Clear all</button>
<ul id="list"></ul>` },
        { html: "<p><b>Plan.</b> On a click of <b>Add</b>: read the input (Day 25), stop if it is empty, create an <code>&lt;li&gt;</code>, append it, and empty the input for the next task.</p>", code: c`addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") {
    return;
  }
  const li = document.createElement("li");
  li.textContent = text;
  list.append(li);
  input.value = "";
});` },
        { html: "<p><b>Mark as done.</b> Each new <code>&lt;li&gt;</code> gets its <b>own</b> click listener, added right after it is created. <code>classList.toggle(\"done\")</code> adds the class if it is missing and removes it if it is there.</p>", code: c`li.addEventListener("click", () => {
  li.classList.toggle("done");
});` },
        { html: "<p><b>Delete one task.</b> Create a small ✕ button, put it inside the <code>&lt;li&gt;</code>, and make it remove its own <code>&lt;li&gt;</code>.</p>", code: c`const del = document.createElement("button");
del.textContent = "✕";
del.addEventListener("click", () => {
  li.remove();
});
li.append(" ", del);` },
        { html: "<p><b>Clear all.</b> Setting <code>innerHTML</code> to an empty string deletes everything inside the list in one line. Then put the pieces together and test every button.</p>", code: c`clearBtn.addEventListener("click", () => {
  list.innerHTML = "";
});` },
      ],
      code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    .done { text-decoration: line-through; color: gray; }
  </style>
</head>
<body>
  <h2>To-do</h2>
  <input id="task" placeholder="New task">
  <button id="add">Add</button>
  <button id="clear">Clear all</button>
  <ul id="list"></ul>

  <script>
    const input = document.querySelector("#task");
    const addBtn = document.querySelector("#add");
    const clearBtn = document.querySelector("#clear");
    const list = document.querySelector("#list");

    addBtn.addEventListener("click", () => {
      const text = input.value.trim();
      if (text === "") {
        return;
      }
      const li = document.createElement("li");
      li.textContent = text;
      li.addEventListener("click", () => {
        li.classList.toggle("done");
      });

      const del = document.createElement("button");
      del.textContent = "✕";
      del.addEventListener("click", () => {
        li.remove();
      });
      li.append(" ", del);

      list.append(li);
      input.value = "";
    });

    clearBtn.addEventListener("click", () => {
      list.innerHTML = "";
    });
  </script>
</body>
</html>`, height: 260 },
    { t: "h", text: "Waiting: setTimeout" },
    { t: "p", html: "<p>Many apps do something <b>later</b>: \"Saved!\" disappears after two seconds, a game shows \"Ready… Go!\", a quiz hides the answer after a moment. <code>setTimeout(function, ms)</code> runs a function once, after a number of <b>milliseconds</b> (1000 ms = 1 second).</p>" },
    { t: "analogy", title: "setTimeout is like an oven timer", html: "<p>You set the timer for 20 minutes and then you go and do other things — you do not stand in front of the oven. When the time is up, the timer rings and you take the food out. JavaScript is the same: it sets the timer, <b>continues with the next lines</b>, and runs your function when the time is up.</p>" },
    { t: "code", code: c`console.log("Start");
setTimeout(() => {
  console.log("Two seconds later");
}, 2000);
console.log("End");`, before: "<p>Read the code, guess the order of the three lines, then run it.</p>", note: "<p><code>End</code> comes <b>before</b> <code>Two seconds later</code>! <code>setTimeout</code> does not stop the program; it only plans the function for later.</p>" },
    { t: "check", q: "What does this show, in order?", code: c`console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");`, o: ["`A B C`", "`A C B`", "`B A C`"], a: 1, e: "Even with 0 ms, the timer function waits until the current code has finished. So `A`, `C`, then `B`.", hint: "setTimeout never runs its function in the middle of the code that is running now." },
    { t: "web", title: "later.html", code: c`<!DOCTYPE html>
<html>
<body>
  <button id="save">Save</button>
  <p id="msg"></p>

  <script>
    const msg = document.querySelector("#msg");

    document.querySelector("#save").addEventListener("click", () => {
      msg.textContent = "Saved!";
      setTimeout(() => {
        msg.textContent = "";
      }, 2000);
    });
  </script>
</body>
</html>`, height: 120, note: "<p>Click <b>Save</b>: the message appears at once and disappears 2 seconds later.</p>" },
    { t: "h", text: "Repeating: setInterval and clearInterval" },
    { t: "p", html: "<p>A countdown, a stopwatch or a clock must change <b>again and again</b>. <code>setInterval(function, ms)</code> runs the function every <code>ms</code> milliseconds, forever. It gives back an <b>id number</b>; keep it in a variable, because <code>clearInterval(id)</code> is the only way to stop it.</p>" },
    { t: "analogy", title: "setInterval is like the school bell", html: "<p>The bell rings at the end of every lesson, all day, without anyone pressing it. <code>clearInterval</code> is the switch in the office that turns the bell off. If you lose the key to that office (the id), the bell never stops.</p>" },
    { t: "web", title: "stopwatch.html", code: c`<!DOCTYPE html>
<html>
<body>
  <h1 id="time">0</h1>
  <button id="start">Start</button>
  <button id="stop">Stop</button>

  <script>
    const time = document.querySelector("#time");
    let seconds = 0;
    let timer = null;

    document.querySelector("#start").addEventListener("click", () => {
      if (timer !== null) {
        return;
      }
      timer = setInterval(() => {
        seconds++;
        time.textContent = seconds;
      }, 1000);
    });

    document.querySelector("#stop").addEventListener("click", () => {
      clearInterval(timer);
      timer = null;
    });
  </script>
</body>
</html>`, height: 170 },
    { t: "lines", title: "Read it like a web developer", rows: [
      [c`let timer = null;`, "<code>timer</code> will hold the id of the interval. It lives <b>outside</b> both listeners so <b>both</b> can use it. <code>null</code> means \"not running\"."],
      [c`if (timer !== null) { return; }`, "Pressing Start twice would start a <b>second</b> interval and the watch would run twice as fast. This line ignores the extra click."],
      [c`timer = setInterval(() => { ... }, 1000);`, "Every 1000 ms: add one second and show it. The id is saved in <code>timer</code>."],
      [c`clearInterval(timer);`, "Stops the interval with that id. Then <code>timer = null</code> says \"stopped\", so Start works again."],
    ] },
    { t: "turn", level: "Medium", q: "Which function stops a `setInterval`? Type only its name.", answers: ["clearInterval", "clearInterval()"], e: "`clearInterval(id)` stops the interval whose id you saved when you started it.", placeholder: "e.g. setTimeout" },
    { t: "h", text: "Remember one thing: localStorage" },
    { t: "p", html: "<p>Close a normal page and every variable is forgotten. To keep a little data — a name, a high score, a theme — the browser gives each site a small storage box called <code>localStorage</code>. It stores <b>text only</b>: <code>localStorage.setItem(\"key\", value)</code> saves, <code>localStorage.getItem(\"key\")</code> loads (and gives <code>null</code> if nothing was saved).</p>" },
    { t: "web", title: "remember.html", code: c`<!DOCTYPE html>
<html>
<body>
  <input id="best" placeholder="Your best score">
  <button id="save">Save</button>
  <button id="load">Load</button>
  <p id="out"></p>

  <script>
    const best = document.querySelector("#best");
    const out = document.querySelector("#out");

    document.querySelector("#save").addEventListener("click", () => {
      localStorage.setItem("bestScore", best.value);
      out.textContent = "Saved.";
    });
    document.querySelector("#load").addEventListener("click", () => {
      const saved = localStorage.getItem("bestScore");
      out.textContent = "Best score: " + saved;
    });
  </script>
</body>
</html>`, height: 140, note: "<p>In the JS30 preview the storage is forgotten every time you press <b>▶ Run</b>. In a real <code>.html</code> file opened in Chrome or Edge, the value is still there tomorrow.</p>" },
    { t: "p", html: "<p>Because <code>localStorage</code> keeps only text, an array must be turned into text first. <code>JSON.stringify</code> does that, and <code>JSON.parse</code> turns the text back into a real array:</p>" },
    { t: "code", code: c`const tasks = ["Homework", "Gym"];
const text = JSON.stringify(tasks);
console.log(text);
console.log(typeof text);

const back = JSON.parse(text);
console.log(back.length, back[1]);`, note: "<p>In a page you would write <code>localStorage.setItem(\"tasks\", JSON.stringify(tasks))</code> to save and <code>JSON.parse(localStorage.getItem(\"tasks\"))</code> to load.</p>" },
    { t: "check", q: "What does the last line show?", code: c`const marks = [90, 85];
const saved = JSON.stringify(marks);
console.log(JSON.parse(saved)[0] + 10);`, o: ["`100`", "`9010`", "`[90, 85]10`"], a: 0, e: "`JSON.parse` gives back a real array of numbers, so `[0]` is the number 90 and 90 + 10 = 100." },
  ],
  mistakes: [
    { title: "Creating but never appending", html: "The element is made and filled, but it never reaches the page. No error appears — the page simply does not change.", wrong: c`const li = document.createElement("li");
li.textContent = "Milk";`, right: c`const li = document.createElement("li");
li.textContent = "Milk";
list.append(li);` },
    { title: "Calling the function inside setTimeout", html: "<code>setTimeout(show(), 2000)</code> runs <code>show</code> <b>now</b> and gives its result to the timer. Pass the function itself (no brackets) or an arrow function.", wrong: c`setTimeout(show(), 2000);`, right: c`setTimeout(show, 2000);
setTimeout(() => show(), 2000);` },
    { title: "Losing the interval id", html: "If the id is a <code>const</code> inside the Start listener, the Stop listener cannot see it (scope, Day 16) and the interval runs forever.", wrong: c`start.addEventListener("click", () => {
  const timer = setInterval(tick, 1000);
});
stop.addEventListener("click", () => {
  clearInterval(timer); // ReferenceError
});`, right: c`let timer = null;
start.addEventListener("click", () => {
  timer = setInterval(tick, 1000);
});
stop.addEventListener("click", () => {
  clearInterval(timer);
});` },
    { title: "Saving an array without JSON", html: "<code>localStorage</code> turns the array into the text <code>\"a,b\"</code>, and you cannot get the array back. Use <code>JSON.stringify</code> and <code>JSON.parse</code>.", wrong: c`localStorage.setItem("tasks", tasks);`, right: c`localStorage.setItem("tasks", JSON.stringify(tasks));` },
  ],
  tricks: [
    { title: "append can take several things", html: "<code>box.append(a, b, \" text \")</code> adds several elements and pieces of plain text in one call, in that order. That is how the to-do list put a space and the ✕ button inside each task." },
    { title: "Cancel a setTimeout", html: "<code>setTimeout</code> also returns an id. <code>clearTimeout(id)</code> cancels it before it rings.", code: c`const id = setTimeout(() => console.log("You will never see me"), 1000);
clearTimeout(id);
console.log("Timer cancelled");` },
    { title: "Two-digit clocks with padStart", html: "A timer looks better as <code>01:05</code> than <code>1:5</code>. <code>String(n).padStart(2, \"0\")</code> adds a zero in front when needed.", code: c`const total = 65;
const min = Math.floor(total / 60);
const sec = total % 60;
console.log(String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0"));` },
  ],
  practice: [
    { t: "webtry", title: "Your favourite things", html: "<p>Change the array to five of your favourite foods (or games, or players). Then add <code>li.className = \"fav\"</code> inside the loop and a CSS rule that colours <code>.fav</code>.</p>", code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    /* add a rule for .fav here */
  </style>
</head>
<body>
  <h2>My favourites</h2>
  <ul id="favs"></ul>
  <script>
    const favs = ["Kabsa", "Pizza", "Dates"];
    const ul = document.querySelector("#favs");
    for (const f of favs) {
      const li = document.createElement("li");
      li.textContent = f;
      ul.append(li);
    }
  </script>
</body>
</html>` },
    { t: "predict", code: c`console.log("1. Fill the kettle");
setTimeout(() => console.log("4. Tea is ready"), 3000);
setTimeout(() => console.log("3. Water boils"), 1000);
console.log("2. Get a cup");`, explain: "The two normal lines run first. Then the timers ring in order of their time: 1000 ms before 3000 ms — not in the order they were written." },
    { t: "parsons", title: "Add one task", prompt: "Put the lines in order: when the button is clicked, a new list item with the input's text is added to the list.", lines: [c`btn.addEventListener("click", () => {`, c`  const li = document.createElement("li");`, c`  li.textContent = input.value;`, c`  list.append(li);`, c`});`], distractors: [c`  list.append("li");`], explain: "Create the element first, fill it, then append it. Appending the string <code>\"li\"</code> would add the two letters l and i as text, not a list item." },
    { t: "webtry", title: "Ready, steady, go", html: "<p>Click the button: the page shows <code>Ready…</code>. Make it show <code>Steady…</code> after 1 second and <code>Go!</code> after 2 seconds, using two <code>setTimeout</code> calls.</p>", code: c`<button id="go">Start race</button>
<h1 id="out"></h1>
<script>
  const out = document.querySelector("#out");
  document.querySelector("#go").addEventListener("click", () => {
    out.textContent = "Ready…";
    // add two setTimeout calls here
  });
</script>` },
    { t: "turn", level: "Medium", q: "How many milliseconds do you give to `setInterval` so the function runs every **half** second?", answers: ["500"], e: "1 second = 1000 ms, so half a second is 500 ms.", placeholder: "a number" },
    { t: "webtry", title: "Countdown to the bell", html: "<p>This countdown never stops and goes below zero. Fix it: when <code>left</code> reaches 0, show <code>Break time!</code> and call <code>clearInterval</code>.</p>", code: c`<h1 id="left">10</h1>
<script>
  const box = document.querySelector("#left");
  let left = 10;
  const timer = setInterval(() => {
    left--;
    box.textContent = left;
  }, 500);
</script>` },
    { t: "webtry", title: "Remember my name", html: "<p>When the page opens, it reads <code>localStorage.getItem(\"name\")</code>. Finish the Save button so it saves the name and shows the greeting at once.</p>", code: c`<input id="name" placeholder="Your name">
<button id="save">Save</button>
<p id="hello"></p>
<script>
  const hello = document.querySelector("#hello");
  const saved = localStorage.getItem("name");
  if (saved !== null) {
    hello.textContent = "Welcome back, " + saved + "!";
  }
  document.querySelector("#save").addEventListener("click", () => {
    // save the input's value under "name", then show "Welcome back, ...!"
  });
</script>` },
  ],
  exercises: [
    { id: "one-item", lvl: "seed", web: true, title: "One new item", prompt: "<p>The page has an empty list <code>&lt;ul id=\"list\"&gt;</code>. Write a script that <b>creates</b> an <code>&lt;li&gt;</code> with the text <code>Learn JavaScript</code> and appends it to the list. (Do not write the <code>&lt;li&gt;</code> in the HTML.)</p>",
      starter: c`<ul id="list"></ul>
<script>
  // create the li here
</script>`,
      tests: [
        { check: "count('#list li')", expected: "1", desc: "the list has one item" },
        { check: "text('#list li')", expected: "Learn JavaScript", desc: "the item has the right text" },
      ],
      hint: "Three lines: <code>createElement(\"li\")</code>, set <code>textContent</code>, then <code>append</code> it to <code>document.querySelector(\"#list\")</code>.",
      solutions: [{ name: "Create, fill, append", code: c`<ul id="list"></ul>
<script>
  const list = document.querySelector("#list");
  const li = document.createElement("li");
  li.textContent = "Learn JavaScript";
  list.append(li);
</script>` }] },
    { id: "click-add", lvl: "seed", web: true, title: "One click, one item", prompt: "<p>Every click on the button <code>#add</code> must add a new <code>&lt;li&gt;</code> with the text <code>New idea</code> to the list <code>#ideas</code>.</p>",
      starter: c`<button id="add">Add idea</button>
<ul id="ideas"></ul>
<script>
  const ideas = document.querySelector("#ideas");
  // add a click listener to #add
</script>`,
      tests: [
        { check: "count('#ideas li')", expected: "0", desc: "no items before any click" },
        { before: "click('#add'); click('#add'); click('#add');", check: "count('#ideas li')", expected: "3", desc: "three clicks make three items" },
        { before: "click('#add');", check: "text('#ideas li')", expected: "New idea", desc: "the item says New idea" },
      ],
      hint: "Put the create–fill–append lines <b>inside</b> the click listener, so they run on every click.",
      solutions: [{ name: "Listener", code: c`<button id="add">Add idea</button>
<ul id="ideas"></ul>
<script>
  const ideas = document.querySelector("#ideas");
  document.querySelector("#add").addEventListener("click", () => {
    const li = document.createElement("li");
    li.textContent = "New idea";
    ideas.append(li);
  });
</script>` }] },
    { id: "from-array", lvl: "star", web: true, title: "The timetable", prompt: "<p>Show the array <code>lessons</code> as a list: one <code>&lt;li&gt;</code> per lesson inside <code>#day</code>, in the same order, each with the class <code>lesson</code>. Use a loop — if someone adds a lesson to the array, the page must show it too.</p>",
      starter: c`<h2>Sunday</h2>
<ul id="day"></ul>
<script>
  const lessons = ["Maths", "English", "Biology", "Chemistry", "PE"];
  const day = document.querySelector("#day");
  // your loop here
</script>`,
      tests: [
        { check: "count('#day li.lesson')", expected: "5", desc: "five items with the class lesson" },
        { check: "[...document.querySelectorAll('#day li')].map(li => li.textContent.trim()).join(',')", expected: "Maths,English,Biology,Chemistry,PE", desc: "the items are in order" },
      ],
      hint: "<code>for (const lesson of lessons) { ... }</code> — inside: create, set <code>textContent</code> and <code>className</code>, append.",
      solutions: [
        { name: "for...of", code: c`<h2>Sunday</h2>
<ul id="day"></ul>
<script>
  const lessons = ["Maths", "English", "Biology", "Chemistry", "PE"];
  const day = document.querySelector("#day");
  for (const lesson of lessons) {
    const li = document.createElement("li");
    li.textContent = lesson;
    li.className = "lesson";
    day.append(li);
  }
</script>` },
        { name: "forEach", code: c`<h2>Sunday</h2>
<ul id="day"></ul>
<script>
  const lessons = ["Maths", "English", "Biology", "Chemistry", "PE"];
  const day = document.querySelector("#day");
  lessons.forEach(lesson => {
    const li = document.createElement("li");
    li.textContent = lesson;
    li.classList.add("lesson");
    day.append(li);
  });
</script>`, note: "<code>classList.add</code> does the same job as <code>className</code> here." },
      ],
      twist: "Add a number in front of each lesson (<code>1. Maths</code>) using the index from <code>forEach((lesson, i) => ...)</code>." },
    { id: "todo", lvl: "star", web: true, title: "To-do list", prompt: "<p>Make the to-do list work:</p><ul><li>Clicking <code>#add</code> adds an <code>&lt;li&gt;</code> with the text of <code>#task</code> (without extra spaces) to <code>#list</code>, then empties the input.</li><li>If the input is empty (or only spaces), nothing is added.</li><li>Clicking a task toggles the class <code>done</code> on it.</li></ul>",
      starter: c`<style>.done { text-decoration: line-through; }</style>
<input id="task">
<button id="add">Add</button>
<ul id="list"></ul>
<script>
  const input = document.querySelector("#task");
  const list = document.querySelector("#list");
  // your code here
</script>`,
      tests: [
        { before: "type('#task', 'Read a chapter'); click('#add'); type('#task', 'Gym'); click('#add');", check: "[...document.querySelectorAll('#list li')].map(li => li.textContent.trim()).join(',')", expected: "Read a chapter,Gym", desc: "two tasks are added in order" },
        { before: "type('#task', 'Read a chapter'); click('#add');", check: "$('#task').value", expected: "", desc: "the input is emptied after adding" },
        { before: "type('#task', '   '); click('#add'); type('#task', ''); click('#add');", check: "count('#list li')", expected: "0", desc: "empty tasks are ignored" },
        { before: "type('#task', '  Gym  '); click('#add');", check: "text('#list li')", expected: "Gym", desc: "extra spaces are removed" },
        { before: "type('#task', 'Gym'); click('#add'); click('#list li');", check: "$('#list li').classList.contains('done')", expected: "true", desc: "one click marks the task done" },
        { before: "type('#task', 'Gym'); click('#add'); click('#list li'); click('#list li');", check: "$('#list li').classList.contains('done')", expected: "false", desc: "a second click un-marks it" },
      ],
      hint: "Read and trim the input; <code>return</code> early if it is <code>\"\"</code>. Add the click listener to the new <code>li</code> right after you create it, and use <code>li.classList.toggle(\"done\")</code>.",
      solutions: [{ name: "Solution", code: c`<style>.done { text-decoration: line-through; }</style>
<input id="task">
<button id="add">Add</button>
<ul id="list"></ul>
<script>
  const input = document.querySelector("#task");
  const list = document.querySelector("#list");
  document.querySelector("#add").addEventListener("click", () => {
    const text = input.value.trim();
    if (text === "") {
      return;
    }
    const li = document.createElement("li");
    li.textContent = text;
    li.addEventListener("click", () => {
      li.classList.toggle("done");
    });
    list.append(li);
    input.value = "";
  });
</script>` }] },
    { id: "wait-msg", lvl: "star", web: true, title: "Wait for it", prompt: "<p>When <code>#go</code> is clicked, <code>#msg</code> must show <code>Wait...</code> at once, and then <code>Time is up!</code> <b>500 milliseconds</b> later.</p>",
      starter: c`<button id="go">Start</button>
<p id="msg"></p>
<script>
  const msg = document.querySelector("#msg");
  // your code here
</script>`,
      tests: [
        { check: "text('#msg')", expected: "", desc: "the message is empty before the click" },
        { before: "click('#go');", check: "text('#msg')", expected: "Wait...", desc: "right after the click it says Wait..." },
        { before: "click('#go'); await wait(700);", check: "text('#msg')", expected: "Time is up!", desc: "after 500 ms it says Time is up!" },
      ],
      hint: "In the listener: first set the text to <code>Wait...</code>, then <code>setTimeout(() => { ... }, 500);</code>",
      solutions: [{ name: "setTimeout", code: c`<button id="go">Start</button>
<p id="msg"></p>
<script>
  const msg = document.querySelector("#msg");
  document.querySelector("#go").addEventListener("click", () => {
    msg.textContent = "Wait...";
    setTimeout(() => {
      msg.textContent = "Time is up!";
    }, 500);
  });
</script>` }] },
    { id: "countdown", lvl: "fire", web: true, title: "Launch countdown", prompt: "<p><code>#count</code> starts at <code>5</code>. When <code>#start</code> is clicked, it goes down by 1 every <b>200 ms</b> (4, 3, 2, 1). When it reaches 0 it shows <code>Go!</code> and the countdown <b>stops</b> (use <code>clearInterval</code>). Before the click nothing moves.</p>",
      starter: c`<h1 id="count">5</h1>
<button id="start">Start</button>
<script>
  const count = document.querySelector("#count");
  let n = 5;
  // your code here
</script>`,
      tests: [
        { before: "await wait(300);", check: "text('#count')", expected: "5", desc: "nothing moves before the click" },
        { before: "click('#start'); await wait(500);", check: "['4', '3', '2'].includes(text('#count'))", expected: "true", desc: "after about half a second it is counting down" },
        { before: "click('#start'); await wait(1400);", check: "text('#count')", expected: "Go!", desc: "it ends with Go! and stays there" },
      ],
      hint: "Keep the id: <code>const timer = setInterval(() => { n--; ... }, 200);</code>. Inside, <code>if (n === 0)</code> show <code>Go!</code> and call <code>clearInterval(timer)</code>; otherwise show <code>n</code>.",
      solutions: [
        { name: "if / else", code: c`<h1 id="count">5</h1>
<button id="start">Start</button>
<script>
  const count = document.querySelector("#count");
  let n = 5;
  document.querySelector("#start").addEventListener("click", () => {
    const timer = setInterval(() => {
      n--;
      if (n === 0) {
        count.textContent = "Go!";
        clearInterval(timer);
      } else {
        count.textContent = n;
      }
    }, 200);
  });
</script>` },
        { name: "Ternary", code: c`<h1 id="count">5</h1>
<button id="start">Start</button>
<script>
  const count = document.querySelector("#count");
  let n = 5;
  let timer = null;
  document.querySelector("#start").addEventListener("click", () => {
    if (timer !== null) return;
    timer = setInterval(() => {
      n--;
      count.textContent = n > 0 ? n : "Go!";
      if (n === 0) clearInterval(timer);
    }, 200);
  });
</script>`, note: "The <code>timer !== null</code> check also stops a second click from starting a second, faster countdown." },
      ],
      twist: "Add a <b>Reset</b> button that stops the countdown and puts it back to 5." },
    { id: "fix-stopwatch", lvl: "fire", web: true, debug: true, title: "Fix the stopwatch", prompt: "<p>This stopwatch should add 1 to <code>#time</code> every 100 ms after <code>#start</code> is clicked, and freeze when <code>#stop</code> is clicked. It has <b>three</b> bugs. Click the buttons, read the console, and fix it.</p>",
      starter: c`<h1 id="time">0</h1>
<button id="start">Start</button>
<button id="stop">Stop</button>
<script>
  const time = document.querySelector("#time");
  let count = 0;

  function tick() {
    count + 1;
    time.textContent = count;
  }

  document.querySelector("#start").addEventListener("click", () => {
    const timer = setInterval(tick(), 100);
  });

  document.querySelector("#stop").addEventListener("click", () => {
    clearInterval(timer);
  });
</script>`,
      tests: [
        { before: "click('#start'); await wait(550);", check: "Number(text('#time')) >= 3", expected: "true", desc: "the time goes up after Start" },
        { before: "click('#start'); await wait(350); click('#stop'); window.seen = text('#time'); await wait(350);", check: "Number(window.seen) > 0 && text('#time') === window.seen", expected: "true", desc: "Stop freezes the time" },
      ],
      hint: "1) <code>count + 1</code> calculates but never saves. 2) <code>setInterval(tick(), 100)</code> calls <code>tick</code> once, right now. 3) Where does <code>timer</code> live? Can the Stop listener see it?",
      solutions: [{ name: "Fixed", code: c`<h1 id="time">0</h1>
<button id="start">Start</button>
<button id="stop">Stop</button>
<script>
  const time = document.querySelector("#time");
  let count = 0;
  let timer = null;

  function tick() {
    count++;
    time.textContent = count;
  }

  document.querySelector("#start").addEventListener("click", () => {
    timer = setInterval(tick, 100);
  });

  document.querySelector("#stop").addEventListener("click", () => {
    clearInterval(timer);
  });
</script>`, note: "<code>count + 1</code> → <code>count++</code>; <code>tick()</code> → <code>tick</code> (pass the function, do not call it); <code>timer</code> moved outside both listeners with <code>let</code>." }] },
  ],
  quiz: [
    { q: "Which line makes a new `<button>` element?", o: ["`document.querySelector(\"button\")`", "`document.createElement(\"button\")`", "`document.append(\"button\")`", "`new button()`"], a: 1, e: "`createElement` makes a new element; `querySelector` only finds one that already exists." },
    { q: "A list shows `A`, `B`. The script runs `list.prepend(li)` with an `li` whose text is `C`. What is the order now?", o: ["A, B, C", "C, A, B", "A, C, B", "C only"], a: 1, e: "`prepend` puts the new element at the start." },
    { q: "What does `box.innerHTML = \"\"` do?", o: ["Deletes `box` itself", "Deletes everything inside `box`", "Hides `box` for a moment", "Nothing"], a: 1, e: "It replaces the content of `box` with nothing, so all its children disappear. The box stays." },
    { q: "What does this show, in order?", code: c`setTimeout(() => console.log("late"), 500);
setTimeout(() => console.log("soon"), 100);
console.log("now");`, o: ["`late soon now`", "`now soon late`", "`now late soon`", "`soon late now`"], a: 1, e: "Normal code first (`now`), then the timers in order of their time: 100 ms, then 500 ms." },
    { q: "Why do we keep the value returned by `setInterval` in a variable?", o: ["To make it faster", "So `clearInterval` can stop it later", "Because `setInterval` crashes otherwise", "To print it"], a: 1, e: "The id is the only way to tell `clearInterval` which interval to stop." },
    { q: "What does `JSON.parse(\"[1,2,3]\")` give?", o: ["the text `[1,2,3]`", "a real array with 3 numbers", "the number 123", "an error"], a: 1, e: "`JSON.parse` turns text back into real JavaScript data. `JSON.stringify` goes the other way." },
  ],
  puzzle: { title: "Upside-down list", q: "<p>What do the list items read, from top to bottom? Type the letters with no spaces.</p>", code: c`<ul id="l"><li>X</li></ul>
<script>
  const l = document.querySelector("#l");
  for (const letter of ["A", "B", "C"]) {
    const li = document.createElement("li");
    li.textContent = letter;
    if (letter === "B") {
      l.append(li);
    } else {
      l.prepend(li);
    }
  }
</script>`, answers: ["CAXB", "C A X B", "C,A,X,B", "C, A, X, B"], hint: "Do it on paper, one letter at a time. `prepend` puts a letter at the very top of what is there NOW.", e: "Start: X. A is prepended → A X. B is appended → A X B. C is prepended → C A X B." },
  cards: [
    { f: "How do you make a new `<li>` and put it at the end of `list`?", b: "`const li = document.createElement(\"li\");` then `li.textContent = \"...\";` then `list.append(li);`" },
    { f: "`append` vs `prepend`?", b: "`append` adds inside, at the end. `prepend` adds inside, at the start." },
    { f: "How do you delete an element `el`? And everything inside `box`?", b: "`el.remove();` and `box.innerHTML = \"\";`" },
    { f: "`setTimeout` vs `setInterval`?", b: "`setTimeout(fn, ms)` runs once after ms. `setInterval(fn, ms)` runs every ms until `clearInterval(id)`." },
    { f: "How do you save an array in `localStorage`?", b: "`localStorage.setItem(\"key\", JSON.stringify(arr));` and load it with `JSON.parse(localStorage.getItem(\"key\"))`." },
  ],
  remember: [
    "`document.createElement(\"tag\")` makes an element; it appears only after `append` or `prepend`.",
    "`el.remove()` deletes one element; `box.innerHTML = \"\"` empties a box.",
    "To show an array: loop, and for each item create, fill and append one element.",
    "Give each new element its own listener right after you create it.",
    "`setTimeout(fn, ms)` runs once later; `setInterval(fn, ms)` repeats until `clearInterval(id)`. 1000 ms = 1 second.",
    "`localStorage` keeps text only: use `JSON.stringify` to save arrays and `JSON.parse` to load them.",
  ],
};
})();
