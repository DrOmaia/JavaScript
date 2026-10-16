window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[24] = {
  title: "Events: clicks and key presses",
  intro: "Until now your scripts ran once, from top to bottom, and then stopped, {{name}}. Today your pages start to <b>listen</b>: they wait for a click, a key press or the mouse, and react. By the end you will build a counter, move things with the arrow keys and make a tiny click game.",
  goals: [
    "Explain what an event is and run code when it happens with `addEventListener`",
    "Write the handler as a named function or an arrow function",
    "Build a counter app with +1, −1 and reset buttons",
    "Use the event object: `event.target` and `event.key`",
    "React to `keydown`, `mouseover` / `mouseout` and `input` events",
    "Avoid the classic mistake `addEventListener(\"click\", f())`",
  ],
  learn: [
    { t: "h", text: "Events: the page tells you what happened" },
    { t: "p", html: "<p>A web page is not a program that runs once. People click, type, scroll and move the mouse whenever they like. Each of these actions is an <b>event</b>. Your job is to say: \"<i>when this event happens on this element, run this function</i>\". That is exactly what <code>addEventListener</code> does.</p>" },
    { t: "analogy", title: "An event listener is like a doorbell", html: "<p>You do not stand at the door all day waiting for guests. You install a doorbell once, and when someone presses it, you go and open. <code>addEventListener</code> installs the doorbell: it connects an element (the door), an event name (the press) and a function (what you do).</p>" },
    { t: "web", title: "first-click.html", code: c`<!DOCTYPE html>
<html>
<body>
  <button id="btn">Click me</button>
  <p id="msg">Nothing happened yet.</p>

  <script>
    const btn = document.querySelector("#btn");
    const msg = document.querySelector("#msg");

    btn.addEventListener("click", function () {
      msg.textContent = "You clicked, {{name}}!";
    });
  </script>
</body>
</html>`, before: "<p>Click the button in the preview. Watch the paragraph.</p>", note: "<p>The script runs when the page loads, but the code <b>inside</b> the function waits. It runs only when the click happens — every time it happens.</p>", height: 130 },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`btn.addEventListener(`, "On this element, start listening…"],
      [c`"click",`, "…for this event. The name is a string, always in small letters: <code>\"click\"</code>, <code>\"keydown\"</code>, <code>\"input\"</code>."],
      [c`function () { ... }`, "…and when it happens, call this function. It is called the <b>handler</b> (or listener)."],
      [c`});`, "Close the function with <code>}</code>, then the call with <code>)</code>, then <code>;</code>."],
    ] },
    { t: "check", q: "When does the code inside the handler run?", o: ["Once, when the page loads", "Every time the button is clicked", "Only the first time the button is clicked"], a: 1, e: "The listener stays installed. Each click calls the handler again." },

    { t: "h", text: "Named or arrow: any function works" },
    { t: "p", html: "<p>The handler is just a function, so everything from Week 3 applies. You can write it inline, as an arrow function, or give it a name and pass the <b>name</b>. A named handler is handy when two buttons should do the same thing.</p>" },
    { t: "web", title: "handlers.html", code: c`<!DOCTYPE html>
<html>
<body>
  <button id="a">Arrow</button>
  <button id="b">Named</button>
  <button id="c">Also named</button>
  <p id="out"></p>

  <script>
    const out = document.querySelector("#out");

    document.querySelector("#a").addEventListener("click", () => {
      out.textContent = "Arrow function ran";
    });

    function sayHi() {
      out.textContent = "sayHi ran";
    }
    document.querySelector("#b").addEventListener("click", sayHi);
    document.querySelector("#c").addEventListener("click", sayHi);
  </script>
</body>
</html>`, note: "<p>Look carefully: we pass <code>sayHi</code>, <b>not</b> <code>sayHi()</code>. We give the browser the function itself, and the browser calls it later.</p>", height: 130 },
    { t: "h", text: "The classic mistake: f()" },
    { t: "p", html: "<p>The brackets <code>()</code> mean \"call it <b>now</b>\". If you write them inside <code>addEventListener</code>, the function runs immediately while the page loads, and what you hand to the browser is its <b>result</b> (<code>undefined</code>), not the function. The click then does nothing.</p>" },
    { t: "web", title: "brackets-bug.html", code: c`<!DOCTYPE html>
<html>
<body>
  <button id="btn">Click</button>

  <script>
    function hello() {
      console.log("hello ran");
    }
    document.querySelector("#btn").addEventListener("click", hello());
  </script>
</body>
</html>`, before: "<p>Run it, look at the console, then click the button a few times.</p>", note: "<p><code>hello ran</code> appears once, at load, and never again. Remove the <code>()</code> after <code>hello</code> and try again.</p>", height: 110 },
    { t: "check", q: "Which line makes the button call `start` on every click?", o: ["`btn.addEventListener(\"click\", start());`", "`btn.addEventListener(\"click\", start);`", "`btn.addEventListener(click, start);`"], a: 1, e: "Pass the function itself (no brackets). The event name must be a string in quotes." },

    { t: "h", text: "The event object: who? which key?" },
    { t: "p", html: "<p>When the browser calls your handler, it gives it one argument: an <b>event object</b> full of details. Give your function a parameter (usually <code>event</code> or <code>e</code>) to receive it. <code>event.target</code> is the element that was clicked — perfect when one handler serves many buttons.</p>" },
    { t: "web", title: "target.html", code: c`<!DOCTYPE html>
<html>
<body>
  <p>Pick your drink:</p>
  <button class="drink">Water</button>
  <button class="drink">Laban</button>
  <button class="drink">Orange juice</button>
  <p id="choice"></p>

  <script>
    function pick(event) {
      const name = event.target.textContent;
      document.querySelector("#choice").textContent = "You picked " + name;
    }
    for (const b of document.querySelectorAll(".drink")) {
      b.addEventListener("click", pick);
    }
  </script>
</body>
</html>`, note: "<p>One function, three buttons. <code>event.target</code> tells the function which button was pressed.</p>", height: 150 },
    { t: "turn", level: "Medium", q: "Inside a click handler with the parameter `e`, what do you write to get the element that was clicked?", answers: ["e.target"], e: "`e.target` is the element where the event happened.", placeholder: "e.g. e.something" },

    { t: "h", text: "Keyboard events" },
    { t: "p", html: "<p>Games and shortcuts react to keys. The <code>keydown</code> event fires when a key goes down. Listen on the whole <code>document</code> to catch keys anywhere on the page, and read <code>event.key</code>: it is <code>\"a\"</code>, <code>\"Enter\"</code>, <code>\" \"</code> (space), or <code>\"ArrowUp\"</code>, <code>\"ArrowDown\"</code>, <code>\"ArrowLeft\"</code>, <code>\"ArrowRight\"</code>.</p>" },
    { t: "web", title: "arrows.html", code: c`<!DOCTYPE html>
<html>
<body>
  <p>Volume: <b id="vol">5</b></p>
  <p id="key">Click the page, then press the up and down arrows.</p>

  <script>
    let volume = 5;
    const vol = document.querySelector("#vol");

    document.addEventListener("keydown", (event) => {
      document.querySelector("#key").textContent = "You pressed: " + event.key;
      if (event.key === "ArrowUp" && volume < 10) {
        volume++;
      } else if (event.key === "ArrowDown" && volume > 0) {
        volume--;
      }
      vol.textContent = volume;
    });
  </script>
</body>
</html>`, before: "<p>Click inside the preview first, so it receives your key presses.</p>", note: "<p>The volume stays between 0 and 10 because of the extra conditions — the same <code>if</code> logic you learned in Week 2.</p>", height: 130 },
    { t: "turn", level: "Easy", q: "What is `event.key` when the user presses the **left** arrow key? Type it without quotes.", answers: ["ArrowLeft"], e: "Arrow keys are `ArrowUp`, `ArrowDown`, `ArrowLeft` and `ArrowRight` — with capital letters.", placeholder: "e.g. Enter", oneWord: true },

    { t: "h", text: "Mouse and typing events" },
    { t: "p", html: "<p>Three more events you will use a lot: <code>mouseover</code> (the mouse moves onto an element), <code>mouseout</code> (it leaves), and <code>input</code> (the text in a box changed — on every single letter). With <code>input</code> you can show a live preview while the user types.</p>" },
    { t: "analogy", title: "Events are like football commentary", html: "<p>A commentator does not read a script prepared before the match. He waits, and when something happens — a pass, a shot, a goal — he reacts at once. Your handlers are commentators: <code>mouseover</code> is \"the ball enters the box\", <code>input</code> is \"every touch of the ball\".</p>" },
    { t: "web", title: "mouse-and-input.html", code: c`<!DOCTYPE html>
<html>
<body>
  <p id="card" style="padding: 12px; background: #eee;">Move the mouse over me</p>
  <input id="nick" placeholder="Your nickname">
  <h3 id="preview">Hello, ...</h3>

  <script>
    const card = document.querySelector("#card");
    card.addEventListener("mouseover", () => {
      card.style.backgroundColor = "lightblue";
    });
    card.addEventListener("mouseout", () => {
      card.style.backgroundColor = "#eee";
    });

    const nick = document.querySelector("#nick");
    nick.addEventListener("input", () => {
      document.querySelector("#preview").textContent = "Hello, " + nick.value + "!";
    });
  </script>
</body>
</html>`, note: "<p><code>nick.value</code> is the text inside the input right now. You will learn much more about inputs tomorrow.</p>", height: 190 },
    { t: "check", q: "You want a word counter that updates while the user types. Which event?", o: ["`\"click\"`", "`\"input\"`", "`\"mouseout\"`"], a: 1, e: "`input` fires every time the text in the box changes." },

    { t: "h", text: "Switching a whole theme" },
    { t: "p", html: "<p>Remember <code>classList.toggle</code> from yesterday? Put it inside a click handler and you have a dark-mode button. The look lives in CSS; the button only switches the class on <code>document.body</code>.</p>" },
    { t: "web", title: "dark-mode.html", code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #fafafa; color: #222; }
    body.dark { background: #222; color: #eee; }
  </style>
</head>
<body>
  <h2>My notes</h2>
  <button id="mode">Dark mode</button>

  <script>
    const mode = document.querySelector("#mode");
    mode.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      if (document.body.classList.contains("dark")) {
        mode.textContent = "Light mode";
      } else {
        mode.textContent = "Dark mode";
      }
    });
  </script>
</body>
</html>`, note: "<p>The button text always offers the <b>other</b> mode, so we check with <code>contains</code> after toggling.</p>", height: 140 },

    { t: "table", head: ["Event", "Fires when…", "Useful in the handler"], rows: [
      ["`click`", "an element is clicked (or tapped)", "`event.target`"],
      ["`keydown`", "a key goes down", "`event.key`"],
      ["`mouseover` / `mouseout`", "the mouse enters / leaves an element", "`event.target`"],
      ["`input`", "the text in a box changes", "`input.value`"],
    ] },

    { t: "steps", web: true, title: "A counter app", problem: "<p>Build a counter for the number of glasses of water you drank today: a big number that starts at <code>0</code>, and three buttons: <code>+1</code>, <code>−1</code> and <code>Reset</code>. The number must never go below 0.</p>",
      steps: [
        { html: "<p><b>Understand.</b> We need a variable that remembers the count between clicks, three listeners that change it, and one place that shows it. Because all three buttons must update the screen, a small <code>show()</code> function avoids repeating code.</p>" },
        { html: "<p><b>HTML.</b> One element for the number and three buttons, each with an id.</p>", code: c`<h1 id="count">0</h1>
<button id="plus">+1</button>
<button id="minus">−1</button>
<button id="reset">Reset</button>` },
        { html: "<p><b>The state and the display.</b> The variable lives <b>outside</b> the handlers with <code>let</code>, so it keeps its value.</p>", code: c`let count = 0;
const countEl = document.querySelector("#count");
function show() {
  countEl.textContent = count;
}` },
        { html: "<p><b>The three listeners.</b> Change <code>count</code>, then call <code>show()</code>. The minus button checks first that we are above 0.</p>", code: c`document.querySelector("#plus").addEventListener("click", () => {
  count++;
  show();
});
document.querySelector("#minus").addEventListener("click", () => {
  if (count > 0) {
    count--;
  }
  show();
});
document.querySelector("#reset").addEventListener("click", () => {
  count = 0;
  show();
});` },
      ],
      code: c`<!DOCTYPE html>
<html>
<body>
  <p>Glasses of water today:</p>
  <h1 id="count">0</h1>
  <button id="plus">+1</button>
  <button id="minus">−1</button>
  <button id="reset">Reset</button>

  <script>
    let count = 0;
    const countEl = document.querySelector("#count");

    function show() {
      countEl.textContent = count;
    }

    document.querySelector("#plus").addEventListener("click", () => {
      count++;
      show();
    });
    document.querySelector("#minus").addEventListener("click", () => {
      if (count > 0) {
        count--;
      }
      show();
    });
    document.querySelector("#reset").addEventListener("click", () => {
      count = 0;
      show();
    });
  </script>
</body>
</html>` },
  ],
  mistakes: [
    { title: "Calling the function instead of passing it", html: "With <code>()</code> the function runs once while the page loads, and the click does nothing.", wrong: c`btn.addEventListener("click", addOne());`, right: c`btn.addEventListener("click", addOne);` },
    { title: "Capital letters in the event name", html: "Event names are all small letters. <code>\"Click\"</code> or <code>\"onclick\"</code> are not events, so the handler never runs — and there is no error to warn you.", wrong: c`btn.addEventListener("Click", addOne);`, right: c`btn.addEventListener("click", addOne);` },
    { title: "Using const for something that changes", html: "A counter changes on every click, so it needs <code>let</code>. With <code>const</code>, the first click crashes with <code>Assignment to constant variable</code>.", wrong: c`const score = 0;
btn.addEventListener("click", () => {
  score++;
});`, right: c`let score = 0;
btn.addEventListener("click", () => {
  score++;
});` },
    { title: "Creating the variable inside the handler", html: "A variable made inside the handler is created fresh on every click, so the counter is always 1. Keep the state <b>outside</b>.", wrong: c`btn.addEventListener("click", () => {
  let count = 0;
  count++;
  out.textContent = count;
});`, right: c`let count = 0;
btn.addEventListener("click", () => {
  count++;
  out.textContent = count;
});` },
  ],
  tricks: [
    { title: "One handler, many buttons", html: "Loop over <code>querySelectorAll</code> and add the same named handler to each button; inside it, <code>event.target</code> tells you which one was pressed." },
    { title: "console.log the event", html: "Not sure what a key is called? Put <code>console.log(event.key)</code> in a <code>keydown</code> handler and press keys. Detective work beats guessing." },
    { title: "Keep a show() function", html: "When several handlers change the same state, let each one update the variable and then call one <code>show()</code> function that draws everything. Fewer places to forget an update." },
  ],
  practice: [
    { t: "webtry", title: "Make it yours: the greeting button", html: "<p>Change the message, then add a second button <code>Bye</code> that writes a goodbye message into the same paragraph.</p>", code: c`<!DOCTYPE html>
<html>
<body>
  <button id="hi">Hi</button>
  <p id="msg"></p>
  <script>
    document.querySelector("#hi").addEventListener("click", () => {
      document.querySelector("#msg").textContent = "Hi, {{name}}!";
    });
  </script>
</body>
</html>` },
    { t: "parsons", title: "Build a click listener", prompt: "Put the lines in order: clicking <code>#like</code> adds one like.", lines: [c`let likes = 0;`, c`const btn = document.querySelector("#like");`, c`btn.addEventListener("click", () => {`, c`  likes++;`, c`  btn.textContent = "👍 " + likes;`, c`});`], distractors: [c`btn.addEventListener("click", likes++);`], explain: "The state comes first, then the element, then the listener whose function changes the state and the screen." },
    { t: "webtry", title: "Key detective", html: "<p>Click the page and press different keys: space, Enter, Shift, numbers. Write down what <code>event.key</code> shows for each. Then make <code>Enter</code> turn the box green.</p>", code: c`<!DOCTYPE html>
<html>
<body>
  <p id="box" style="padding: 20px; background: #ddd;">Press a key</p>
  <script>
    document.addEventListener("keydown", (event) => {
      document.querySelector("#box").textContent = "event.key = " + event.key;
    });
  </script>
</body>
</html>` },
    { t: "turn", level: "Easy", q: "Which event fires when the mouse **leaves** an element?", answers: ["mouseout", "\"mouseout\""], e: "`mouseover` = the mouse comes in, `mouseout` = it leaves.", placeholder: "e.g. click" },
    { t: "webtry", title: "Move the box", html: "<p>The arrow keys move the box left and right. Add <code>ArrowUp</code> and <code>ArrowDown</code> (use a second variable <code>y</code> and <code>box.style.top</code>).</p>", code: c`<!DOCTYPE html>
<html>
<body>
  <div id="box" style="position: relative; width: 40px; height: 40px; background: tomato;"></div>
  <script>
    const box = document.querySelector("#box");
    let x = 0;
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        x = x + 20;
      } else if (event.key === "ArrowLeft") {
        x = x - 20;
      }
      box.style.left = x + "px";
    });
  </script>
</body>
</html>` },
    { t: "webtry", title: "Hover cards", html: "<p>All three cards share one pair of handlers. Make the hovered card also get bold text, and back to normal on <code>mouseout</code>.</p>", code: c`<!DOCTYPE html>
<html>
<body>
  <p class="card">Math</p>
  <p class="card">Biology</p>
  <p class="card">Chemistry</p>
  <script>
    for (const card of document.querySelectorAll(".card")) {
      card.addEventListener("mouseover", (e) => {
        e.target.style.backgroundColor = "gold";
      });
      card.addEventListener("mouseout", (e) => {
        e.target.style.backgroundColor = "";
      });
    }
  </script>
</body>
</html>` },
    { t: "turn", level: "Medium", q: "A button does nothing when clicked. The code is `btn.addEventListener(\"click\", go());`. What must you remove? Type the characters.", answers: ["()"], e: "Remove the `()` so you pass the function `go` itself instead of calling it at load.", placeholder: "e.g. ;" },
  ],
  exercises: [
    { id: "hello-click", lvl: "seed", web: true, title: "Say hello on click", prompt: "<p>When the button <code>#btn</code> is clicked, the paragraph <code>#msg</code> must show <code>Hello, {{name}}!</code>. Before any click it keeps <code>Waiting...</code>.</p>", starter: c`<button id="btn">Say hello</button>
<p id="msg">Waiting...</p>
<script>
  // your code here
</script>`,
      tests: [{ check: "text('#msg')", expected: "Waiting...", desc: "before a click the text stays" }, { before: "click('#btn');", check: "text('#msg')", expected: "Hello, {{name}}!", desc: "one click shows the greeting" }],
      hint: "<code>document.querySelector(\"#btn\").addEventListener(\"click\", () => { ... });</code>",
      solutions: [{ name: "Arrow function", code: c`<button id="btn">Say hello</button>
<p id="msg">Waiting...</p>
<script>
  document.querySelector("#btn").addEventListener("click", () => {
    document.querySelector("#msg").textContent = "Hello, {{name}}!";
  });
</script>` }, { name: "Named function", code: c`<button id="btn">Say hello</button>
<p id="msg">Waiting...</p>
<script>
  function greet() {
    document.querySelector("#msg").textContent = "Hello, {{name}}!";
  }
  document.querySelector("#btn").addEventListener("click", greet);
</script>` }] },
    { id: "paint", lvl: "seed", web: true, title: "Paint the box", prompt: "<p>Clicking <code>#paint</code> must make the background of <code>#box</code> <code>orange</code>.</p>", starter: c`<div id="box" style="width: 80px; height: 80px; background: lightgray;"></div>
<button id="paint">Paint</button>
<script>
  const box = document.querySelector("#box");
  // your code here
</script>`,
      tests: [{ before: "click('#paint');", check: "style('#box', 'backgroundColor')", expected: "rgb(255, 165, 0)", desc: "after a click the box is orange" }, { check: "style('#box', 'backgroundColor')", expected: "rgb(211, 211, 211)", desc: "before a click it is still gray" }],
      hint: "Inside the handler: <code>box.style.backgroundColor = \"orange\";</code>",
      solutions: [{ name: "Solution", code: c`<div id="box" style="width: 80px; height: 80px; background: lightgray;"></div>
<button id="paint">Paint</button>
<script>
  const box = document.querySelector("#box");
  document.querySelector("#paint").addEventListener("click", () => {
    box.style.backgroundColor = "orange";
  });
</script>` }] },
    { id: "counter", lvl: "star", web: true, title: "Counter: +1, −1, reset", prompt: "<p>Make the counter work: <code>#plus</code> adds 1, <code>#minus</code> takes 1 away (negative numbers are allowed here), <code>#reset</code> sets it back to 0. <code>#count</code> always shows the current number.</p>", starter: c`<h1 id="count">0</h1>
<button id="plus">+1</button>
<button id="minus">-1</button>
<button id="reset">Reset</button>
<script>
  let count = 0;
  // your code here
</script>`,
      tests: [{ before: "click('#plus'); click('#plus'); click('#plus');", check: "text('#count')", expected: "3", desc: "three +1 clicks show 3" }, { before: "click('#plus'); click('#minus'); click('#minus');", check: "text('#count')", expected: "-1", desc: "+1, −1, −1 shows -1" }, { before: "click('#plus'); click('#plus'); click('#reset'); click('#plus');", check: "text('#count')", expected: "1", desc: "reset goes back to 0" }],
      hint: "Three listeners. In each one change <code>count</code>, then write it into <code>#count</code> with <code>textContent</code>.",
      solutions: [{ name: "With show()", code: c`<h1 id="count">0</h1>
<button id="plus">+1</button>
<button id="minus">-1</button>
<button id="reset">Reset</button>
<script>
  let count = 0;
  const countEl = document.querySelector("#count");
  function show() {
    countEl.textContent = count;
  }
  document.querySelector("#plus").addEventListener("click", () => {
    count++;
    show();
  });
  document.querySelector("#minus").addEventListener("click", () => {
    count--;
    show();
  });
  document.querySelector("#reset").addEventListener("click", () => {
    count = 0;
    show();
  });
</script>` }] },
    { id: "arrow-keys", lvl: "star", web: true, title: "Level with the arrow keys", prompt: "<p>Listen for <code>keydown</code> on the document. <code>ArrowUp</code> adds 1 to the level, <code>ArrowDown</code> takes 1 away; other keys do not change it. <code>#level</code> shows the level (it starts at 0) and <code>#last</code> always shows the last key pressed (its <code>event.key</code>).</p>", starter: c`<p>Level: <b id="level">0</b></p>
<p>Last key: <span id="last">none</span></p>
<script>
  let level = 0;
  // your code here
</script>`,
      tests: [{ before: "press('ArrowUp'); press('ArrowUp');", check: "text('#level')", expected: "2", desc: "two ArrowUp presses show 2" }, { before: "press('ArrowUp'); press('ArrowDown'); press('ArrowDown');", check: "text('#level')", expected: "-1", desc: "up, down, down shows -1" }, { before: "press('ArrowUp'); press('x');", check: "text('#level') + ' ' + text('#last')", expected: "1 x", desc: "another key shows its name but keeps the level" }],
      hint: "<code>document.addEventListener(\"keydown\", (event) => { ... })</code>, then compare <code>event.key === \"ArrowUp\"</code>.",
      solutions: [{ name: "if / else if", code: c`<p>Level: <b id="level">0</b></p>
<p>Last key: <span id="last">none</span></p>
<script>
  let level = 0;
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      level++;
    } else if (event.key === "ArrowDown") {
      level--;
    }
    document.querySelector("#level").textContent = level;
    document.querySelector("#last").textContent = event.key;
  });
</script>` }, { name: "switch", code: c`<p>Level: <b id="level">0</b></p>
<p>Last key: <span id="last">none</span></p>
<script>
  let level = 0;
  function onKey(e) {
    switch (e.key) {
      case "ArrowUp":
        level++;
        break;
      case "ArrowDown":
        level--;
        break;
    }
    document.getElementById("level").textContent = level;
    document.getElementById("last").textContent = e.key;
  }
  document.addEventListener("keydown", onKey);
</script>` }] },
    { id: "dark-mode", lvl: "star", web: true, title: "Dark mode button", prompt: "<p>Clicking <code>#mode</code> toggles the class <code>dark</code> on <code>document.body</code>. The button's text must be <code>Light mode</code> while the page is dark, and <code>Dark mode</code> while it is light.</p>", starter: c`<!DOCTYPE html>
<html>
<head>
  <style>
    body.dark { background: #222; color: #eee; }
  </style>
</head>
<body>
  <h2>Settings</h2>
  <button id="mode">Dark mode</button>
  <script>
    // your code here
  </script>
</body>
</html>`,
      tests: [{ before: "click('#mode');", check: "document.body.classList.contains('dark') + ' ' + text('#mode')", expected: "true Light mode", desc: "one click: dark page, button says Light mode" }, { before: "click('#mode'); click('#mode');", check: "document.body.classList.contains('dark') + ' ' + text('#mode')", expected: "false Dark mode", desc: "two clicks: back to light" }, { before: "click('#mode'); click('#mode'); click('#mode');", check: "document.body.className", expected: "dark", desc: "three clicks: dark again" }],
      hint: "<code>document.body.classList.toggle(\"dark\")</code>, then use <code>contains(\"dark\")</code> to choose the button text.",
      solutions: [{ name: "contains", code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    body.dark { background: #222; color: #eee; }
  </style>
</head>
<body>
  <h2>Settings</h2>
  <button id="mode">Dark mode</button>
  <script>
    const mode = document.querySelector("#mode");
    mode.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      if (document.body.classList.contains("dark")) {
        mode.textContent = "Light mode";
      } else {
        mode.textContent = "Dark mode";
      }
    });
  </script>
</body>
</html>` }, { name: "Ternary", code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    body.dark { background: #222; color: #eee; }
  </style>
</head>
<body>
  <h2>Settings</h2>
  <button id="mode">Dark mode</button>
  <script>
    const mode = document.querySelector("#mode");
    mode.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      mode.textContent = isDark ? "Light mode" : "Dark mode";
    });
  </script>
</body>
</html>`, note: "Bonus: <code>toggle</code> also <b>returns</b> <code>true</code> if the class is now on, so you can save it in a variable." }] },
    { id: "fix-score", lvl: "fire", web: true, debug: true, title: "Fix the score button", prompt: "<p>Every click on <code>#goal</code> should add 1 and show <code>Score: 1</code>, <code>Score: 2</code>… It has three bugs. Fix them.</p>",
      starter: c`<button id="goal">⚽ Goal!</button>
<p id="score">Score: 0</p>
<script>
  const score = 0;
  function addGoal() {
    score++;
    document.querySelector("#score").textContent = "Score: " + score;
  }
  document.querySelector("#goal").addEventListener("Click", addGoal());
</script>`,
      tests: [{ check: "text('#score')", expected: "Score: 0", desc: "nothing changes before a click" }, { before: "click('#goal'); click('#goal');", check: "text('#score')", expected: "Score: 2", desc: "two clicks show Score: 2" }, { before: "for (let i = 0; i < 5; i++) click('#goal');", check: "text('#score')", expected: "Score: 5", desc: "five clicks show Score: 5" }],
      hint: "1) a score that changes needs <code>let</code>. 2) event names are in small letters. 3) pass the function, do not call it.",
      solutions: [{ name: "Fixed", code: c`<button id="goal">⚽ Goal!</button>
<p id="score">Score: 0</p>
<script>
  let score = 0;
  function addGoal() {
    score++;
    document.querySelector("#score").textContent = "Score: " + score;
  }
  document.querySelector("#goal").addEventListener("click", addGoal);
</script>`, note: "<code>const</code> → <code>let</code>; <code>\"Click\"</code> → <code>\"click\"</code>; <code>addGoal()</code> → <code>addGoal</code>." }] },
    { id: "mole", lvl: "fire", web: true, title: "Tiny game: catch the mole", prompt: "<p>Three buttons have class <code>mole</code>; the one with the extra class <code>up</code> is the mole. Give every mole <b>one</b> click handler that uses <code>event.target</code>:</p><ul><li>If the clicked button has the class <code>up</code>: add 1 to the score shown in <code>#score</code>, show <code>Got it!</code> in <code>#msg</code>, and move the <code>up</code> class to the <b>next</b> button (after the last one, back to the first).</li><li>Otherwise: show <code>Missed!</code> in <code>#msg</code> and leave the score.</li></ul>", starter: c`<!DOCTYPE html>
<html>
<head>
  <style>
    .mole { font-size: 24px; padding: 10px; }
    .up { background: sienna; color: white; }
  </style>
</head>
<body>
  <button class="mole">🕳️</button>
  <button class="mole up">🐹</button>
  <button class="mole">🕳️</button>
  <p>Score: <b id="score">0</b></p>
  <p id="msg"></p>
  <script>
    const moles = document.querySelectorAll(".mole");
    let score = 0;
    let upIndex = 1;
    // your code here
  </script>
</body>
</html>`,
      tests: [{ before: "click('.up');", check: "text('#score') + ' ' + text('#msg')", expected: "1 Got it!", desc: "catching the mole scores 1" }, { before: "click('.up');", check: "[...document.querySelectorAll('.mole')].findIndex(m => m.classList.contains('up')) + ' ' + count('.up')", expected: "2 1", desc: "the mole moves to the next button" }, { before: "click('.up'); click('.up'); click('.up');", check: "text('#score') + ' ' + [...document.querySelectorAll('.mole')].findIndex(m => m.classList.contains('up'))", expected: "3 1", desc: "after the last button it goes back to the first" }, { before: "click('.mole:not(.up)');", check: "text('#score') + ' ' + text('#msg')", expected: "0 Missed!", desc: "an empty hole is a miss" }],
      hint: "In the handler: <code>if (event.target.classList.contains(\"up\"))</code>. To move: <code>moles[upIndex].classList.remove(\"up\")</code>, then <code>upIndex = (upIndex + 1) % moles.length</code>, then add <code>up</code> to <code>moles[upIndex]</code>.",
      solutions: [{ name: "Index with %", code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    .mole { font-size: 24px; padding: 10px; }
    .up { background: sienna; color: white; }
  </style>
</head>
<body>
  <button class="mole">🕳️</button>
  <button class="mole up">🐹</button>
  <button class="mole">🕳️</button>
  <p>Score: <b id="score">0</b></p>
  <p id="msg"></p>
  <script>
    const moles = document.querySelectorAll(".mole");
    let score = 0;
    let upIndex = 1;
    function hit(event) {
      if (event.target.classList.contains("up")) {
        score++;
        document.querySelector("#score").textContent = score;
        document.querySelector("#msg").textContent = "Got it!";
        moles[upIndex].classList.remove("up");
        upIndex = (upIndex + 1) % moles.length;
        moles[upIndex].classList.add("up");
      } else {
        document.querySelector("#msg").textContent = "Missed!";
      }
    }
    for (const m of moles) {
      m.addEventListener("click", hit);
    }
  </script>
</body>
</html>`, note: "<code>% moles.length</code> makes the index wrap around: 2 + 1 = 3, and 3 % 3 = 0." }],
      twist: "Change the emoji too: the mole button shows 🐹 and the others 🕳️. (Hint: set <code>textContent</code> when you move the class.)" },
  ],
  quiz: [
    { q: "What does `addEventListener` do?", o: ["Runs a function immediately", "Connects an event on an element to a function that runs when it happens", "Creates a new button", "Shows a message in the console"], a: 1, e: "It installs a listener: element + event name + handler function." },
    { q: "Which event name is correct?", o: ["`\"Click\"`", "`\"onclick\"`", "`\"click\"`", "`\"clicked\"`"], a: 2, e: "Event names are small letters, without `on`: `\"click\"`, `\"keydown\"`, `\"input\"`." },
    { q: "In a handler `(e) => { ... }` for many buttons, how do you know which button was clicked?", o: ["`e.key`", "`e.target`", "`this.button`", "`e.name`"], a: 1, e: "`e.target` is the element where the event happened. `e.key` is for keyboard events." },
    { q: "The user presses the space bar. What is `event.key`?", o: ["`\"Space\"`", "`\" \"` (one space)", "`\"space\"`", "`32`"], a: 1, e: "`event.key` is the character the key types, so for the space bar it is a string with one space in it." },
    { q: "What does this page log when it loads, before any click?", code: c`<button id="b">Go</button>
<script>
  function go() { console.log("go!"); }
  document.querySelector("#b").addEventListener("click", go());
</script>`, o: ["Nothing", "go!", "An error", "undefined"], a: 1, e: "`go()` is called immediately while the page loads, so `go!` is logged once. Clicks do nothing afterwards.", noRun: true },
    { q: "Why must a click counter variable be created **outside** the handler?", o: ["Handlers cannot create variables", "Otherwise it is created fresh (as 0) on every click", "So it can be const", "It is faster"], a: 1, e: "A variable made inside the function starts again on every call. Outside, it keeps its value between clicks." },
  ],
  puzzle: { title: "How many clicks?", q: "<p>The user clicks the button <b>three</b> times. What does <code>#out</code> show at the end?</p>", code: c`<button id="b">Click</button>
<p id="out"></p>
<script>
  let n = 10;
  const out = document.querySelector("#out");
  document.querySelector("#b").addEventListener("click", () => {
    n = n - 2;
    out.textContent = n;
  });
  document.querySelector("#b").addEventListener("click", () => {
    n = n * 2;
  });
</script>`, answers: ["26"], hint: "Both listeners run on every click, first the one added first. Follow `n` click by click — but `out` is written before the second listener runs!", e: "Click 1: 10 − 2 = 8 (shown 8), then 8 × 2 = 16. Click 2: 16 − 2 = 14 (shown), then 28. Click 3: 28 − 2 = **26** (shown), then 52. The page shows 26." },
  cards: [
    { f: "How do you run `f` every time `btn` is clicked?", b: "`btn.addEventListener(\"click\", f);` — no brackets after `f`." },
    { f: "What is `event.target`?", b: "The element where the event happened (for example the button that was clicked)." },
    { f: "How do you catch the arrow keys?", b: "`document.addEventListener(\"keydown\", e => { ... })` and compare `e.key` with `\"ArrowUp\"`, `\"ArrowDown\"`, `\"ArrowLeft\"`, `\"ArrowRight\"`." },
    { f: "Which events fire when the mouse enters / leaves an element?", b: "`mouseover` and `mouseout`." },
    { f: "Where does a counter variable live?", b: "Outside the handler, made with `let`, so it keeps its value between clicks." },
  ],
  remember: [
    "An event is something that happens on the page: a click, a key press, the mouse moving, typing.",
    "`el.addEventListener(\"event\", handler)` runs the handler every time the event happens.",
    "Pass the function (`f`), do not call it (`f()`). Event names are small letters.",
    "The handler receives an event object: `event.target` (which element), `event.key` (which key).",
    "Keep state (counters, scores) in `let` variables outside the handlers, and update the screen after every change.",
  ],
};
})();
