window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[25] = {
  title: "Inputs and forms: read what the user types",
  intro: "In Week 1 you used <code>prompt()</code> to ask questions, {{name}}. Real websites never do that — they use boxes, lists and checkboxes right on the page. Today you will read what the user types, turn it into numbers, check it with friendly messages, update the page live, and handle a real form.",
  goals: [
    "Read an input with `.value` and remember that it is always a string",
    "Convert with `Number()` and build small calculators (tip, age, totals)",
    "Show friendly messages when a box is empty or not a number",
    "Update the page live with the `input` event",
    "Read a `<select>` with `.value` and a checkbox with `.checked`",
    "Handle a `<form>` with `submit` and `event.preventDefault()`, then clear and focus the input",
  ],
  learn: [
    { t: "h", text: "input.value is always a string" },
    { t: "p", html: "<p>To read what someone typed in <code>&lt;input id=\"age\"&gt;</code>, find it and read its <code>value</code> property. There is one surprise: even if the user types <code>16</code>, <code>value</code> is the <b>string</b> <code>\"16\"</code>. That is the same rule you met with <code>prompt()</code> on Day 5 — and the same fix: <code>Number()</code>.</p>" },
    { t: "analogy", title: "An input is like an envelope", html: "<p>Whatever the user writes — a name, a price, a phone number — arrives inside an envelope marked <b>text</b>. The browser does not open it or guess what it means. If you want to do maths with it, you must take it out and turn it into a number yourself with <code>Number()</code>.</p>" },
    { t: "web", title: "string-trap.html", code: c`<!DOCTYPE html>
<html>
<body>
  <input id="a" value="5"> + <input id="b" value="3">
  <button id="go">Add</button>
  <p id="wrong"></p>
  <p id="right"></p>

  <script>
    document.querySelector("#go").addEventListener("click", () => {
      const a = document.querySelector("#a").value;
      const b = document.querySelector("#b").value;
      document.querySelector("#wrong").textContent = "Without Number: " + (a + b);
      document.querySelector("#right").textContent = "With Number: " + (Number(a) + Number(b));
    });
  </script>
</body>
</html>`, before: "<p>Click <b>Add</b>, then type other numbers and click again.</p>", note: "<p><code>\"5\" + \"3\"</code> joins two strings into <code>\"53\"</code>. After <code>Number()</code> they are real numbers and <code>+</code> adds them: <code>8</code>.</p>", height: 160 },
    { t: "check", q: "The user types `12` in `#qty`. What is `typeof document.querySelector(\"#qty\").value`?", o: ["`\"number\"`", "`\"string\"`", "`\"undefined\"`"], a: 1, e: "An input's `value` is always a string — even when it looks like a number.", noRun: true },

    { t: "h", text: "Read the inputs when the button is clicked" },
    { t: "p", html: "<p>Every small calculator on the web has the same shape: inputs, a button, and a place for the result. Inside the click handler you <b>read</b> the inputs, <b>calculate</b>, and <b>show</b> the result. Read the values inside the handler, so you get what is in the box <b>at the moment of the click</b>.</p>" },
    { t: "web", title: "tip.html", code: c`<!DOCTYPE html>
<html>
<body>
  <p>Bill (SAR): <input id="bill" value="120"></p>
  <p>Tip %: <input id="pct" value="10"></p>
  <button id="calc">Calculate</button>
  <p id="out"></p>

  <script>
    document.querySelector("#calc").addEventListener("click", () => {
      const bill = Number(document.querySelector("#bill").value);
      const pct = Number(document.querySelector("#pct").value);
      const tip = bill * pct / 100;
      document.querySelector("#out").textContent = ¦Tip: #{tip} SAR, total: #{bill + tip} SAR¦;
    });
  </script>
</body>
</html>`, height: 180 },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`document.querySelector("#calc").addEventListener("click", () => {`, "Wait for a click on the button."],
      [c`const bill = Number(document.querySelector("#bill").value);`, "<b>Read</b>: find the input, take its text, turn it into a number."],
      [c`const tip = bill * pct / 100;`, "<b>Calculate</b> with real numbers."],
      [c`document.querySelector("#out").textContent = ...`, "<b>Show</b> the result on the page with a template string."],
    ] },
    { t: "turn", level: "Easy", q: "What does `Number(\"abc\")` give? Run it in your head (or in the playground).", code: c`console.log(Number("abc"));`, answers: ["NaN"], run: true, e: "`NaN` means \"Not a Number\": the text could not be turned into a number. You will use this to catch bad input.", placeholder: "e.g. 0", oneWord: true },

    { t: "h", text: "Friendly messages for bad input" },
    { t: "p", html: "<p>Users make mistakes: they click before typing, or type <code>sixteen</code>. A good page never shows <code>NaN</code> — it explains what to do. Check two things <b>before</b> you calculate: is the box empty (<code>value.trim() === \"\"</code>)? Is the number valid (<code>Number.isNaN(n)</code> is <code>true</code> for NaN)? Check the empty box first, because <code>Number(\"\")</code> is <code>0</code>, not NaN!</p>" },
    { t: "web", title: "age.html", code: c`<!DOCTYPE html>
<html>
<body>
  <p>Your age: <input id="age"></p>
  <button id="go">Next year</button>
  <p id="out"></p>

  <script>
    const out = document.querySelector("#out");
    document.querySelector("#go").addEventListener("click", () => {
      const text = document.querySelector("#age").value;
      const age = Number(text);
      if (text.trim() === "") {
        out.textContent = "Please type your age first.";
      } else if (Number.isNaN(age)) {
        out.textContent = "Please use digits, like 16.";
      } else {
        out.textContent = ¦Next year you will be #{age + 1}.¦;
      }
    });
  </script>
</body>
</html>`, before: "<p>Try three things: click with an empty box, type <code>abc</code>, then type <code>16</code>.</p>", note: "<p>This is the <code>if / else if / else</code> chain from Day 9 guarding the real calculation. The happy path comes last.</p>", height: 150 },
    { t: "check", q: "Why do we check for an empty box **before** checking for NaN?", o: ["Because `Number(\"\")` is `0`, which is not NaN", "Because empty boxes crash the page", "The order does not matter"], a: 0, e: "An empty string becomes `0`, so a NaN check alone would happily calculate with 0. Check the empty case on its own." },

    { t: "h", text: "Live updates with the input event" },
    { t: "p", html: "<p>Sometimes a button is one click too many. The <code>input</code> event (you met it yesterday) fires on <b>every</b> change of the box, so the page can react while the user types — like the character counter under a social media post.</p>" },
    { t: "web", title: "counter.html", code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    .warn { color: darkorange; font-weight: bold; }
  </style>
</head>
<body>
  <input id="status" placeholder="What are you doing?" size="30">
  <p id="left">30 characters left</p>

  <script>
    const box = document.querySelector("#status");
    const left = document.querySelector("#left");
    box.addEventListener("input", () => {
      const remaining = 30 - box.value.length;
      left.textContent = remaining + " characters left";
      if (remaining < 5) {
        left.classList.add("warn");
      } else {
        left.classList.remove("warn");
      }
    });
  </script>
</body>
</html>`, note: "<p><code>box.value.length</code> works because <code>value</code> is a string, and strings have a <code>length</code> (Day 5).</p>", height: 120 },
    { t: "check", q: "A counter must update after **every letter** the user types. Which event?", o: ["`\"click\"`", "`\"input\"`", "`\"submit\"`"], a: 1, e: "`input` fires on every change of the text. `click` would need a button." },

    { t: "h", text: "Drop-down lists and checkboxes" },
    { t: "p", html: "<p>A <code>&lt;select&gt;</code> lets the user pick one option from a list. Its <code>.value</code> is the <code>value</code> of the chosen <code>&lt;option&gt;</code> — a string again. A checkbox (<code>&lt;input type=\"checkbox\"&gt;</code>) is different: you read <code>.checked</code>, which is a <b>boolean</b>, <code>true</code> or <code>false</code>.</p>" },
    { t: "web", title: "canteen.html", code: c`<!DOCTYPE html>
<html>
<body>
  <select id="meal">
    <option value="12">Chicken wrap — 12</option>
    <option value="15">Burger — 15</option>
    <option value="9">Salad — 9</option>
  </select>
  <label><input type="checkbox" id="juice"> Add juice (+3)</label>
  <p id="total">Total: 12 SAR</p>

  <script>
    const meal = document.querySelector("#meal");
    const juice = document.querySelector("#juice");

    function update() {
      let total = Number(meal.value);
      if (juice.checked) {
        total = total + 3;
      }
      document.querySelector("#total").textContent = ¦Total: #{total} SAR¦;
    }
    meal.addEventListener("change", update);
    juice.addEventListener("change", update);
  </script>
</body>
</html>`, note: "<p>The <code>change</code> event fires when a choice is made. Both elements call the same <code>update</code> function, which reads <b>everything</b> again and redraws the total.</p>", height: 120 },
    { t: "turn", level: "Medium", q: "What **type** of value is `checkbox.checked`? Type the type name.", answers: ["boolean", "a boolean", "bool"], e: "`.checked` is `true` when the box is ticked and `false` when not — a boolean, ready to use in an `if`.", placeholder: "e.g. string" },

    { t: "h", text: "Real forms: submit and preventDefault" },
    { t: "p", html: "<p>Wrap inputs in a <code>&lt;form&gt;</code> and you get a gift: the user can press <b>Enter</b> instead of clicking. Both Enter and the form's button fire one event on the form: <code>submit</code>. But a form has an old habit: it tries to send the data away and <b>reload the page</b>, wiping your work. <code>event.preventDefault()</code> stops that.</p>" },
    { t: "analogy", title: "preventDefault is like saying \"I'll handle it\"", html: "<p>When you hand in an exam paper, the teacher's default action is to collect it and put it in the pile. If you say \"wait, I'll handle it myself\", the default does not happen and you decide what to do. <code>preventDefault()</code> tells the browser: \"skip your default action — my JavaScript handles this.\"</p>" },
    { t: "web", title: "form.html", code: c`<!DOCTYPE html>
<html>
<body>
  <form id="join">
    <input id="nick" placeholder="Nickname">
    <button>Join</button>
  </form>
  <p id="msg"></p>

  <script>
    const nick = document.querySelector("#nick");
    document.querySelector("#join").addEventListener("submit", (event) => {
      event.preventDefault();
      if (nick.value.trim() === "") {
        document.querySelector("#msg").textContent = "Please choose a nickname.";
        return;
      }
      document.querySelector("#msg").textContent = "Welcome to the team, " + nick.value + "!";
      nick.value = "";
      nick.focus();
    });
  </script>
</body>
</html>`, before: "<p>Type a nickname and press <b>Enter</b> or click <b>Join</b>.</p>", note: "<p>We listen on the <b>form</b> (not the button) for <code>\"submit\"</code>. After a good answer, <code>nick.value = \"\"</code> clears the box and <code>nick.focus()</code> puts the cursor back in it, ready for the next name. <code>return</code> stops the handler early, like in Week 3 functions.</p>", height: 120 },
    { t: "check", q: "You forgot `event.preventDefault()` in a submit handler. What happens when the user presses Enter?", o: ["Nothing, it works the same", "The form tries to send the data and the page reloads, losing your result", "The page shows an error"], a: 1, e: "Submitting is the form's default action. Without `preventDefault()` the page reloads and your message disappears at once." },

    { t: "table", head: ["Element", "Read it with", "Type", "Typical event"], rows: [
      ["`<input>`", "`.value`", "string → use `Number()` for maths", "`input` or a button `click`"],
      ["`<select>`", "`.value` (of the chosen option)", "string", "`change`"],
      ["checkbox", "`.checked`", "boolean", "`change`"],
      ["`<form>`", "read its inputs inside the handler", "–", "`submit` + `event.preventDefault()`"],
    ] },

    { t: "steps", web: true, title: "Split the bill", problem: "<p>You and your friends ate at a restaurant. Make a page with two inputs — the bill and the number of people — and a button. It shows <code>Each person pays 30 SAR</code>, or a friendly message if something is missing or wrong.</p>",
      steps: [
        { html: "<p><b>Understand.</b> Input: two texts. Output: one sentence. The calculation is <code>bill / people</code>. Possible problems: an empty box, letters, or 0 people (we cannot divide by 0).</p>" },
        { html: "<p><b>HTML.</b> Two inputs with ids, a button and an output paragraph.</p>", code: c`<p>Bill: <input id="bill"></p>
<p>People: <input id="people"></p>
<button id="split">Split</button>
<p id="out"></p>` },
        { html: "<p><b>Read and convert</b> inside the click handler.</p>", code: c`const bill = Number(document.querySelector("#bill").value);
const people = Number(document.querySelector("#people").value);` },
        { html: "<p><b>Guard, then calculate.</b> Check the problems first. <code>toFixed(2)</code> keeps two decimals, like real money.</p>", code: c`if (Number.isNaN(bill) || Number.isNaN(people) || bill <= 0 || people <= 0) {
  out.textContent = "Please type a bill and a number of people above 0.";
} else {
  const each = bill / people;
  out.textContent = ¦Each person pays #{Number(each.toFixed(2))} SAR¦;
}` },
      ],
      code: c`<!DOCTYPE html>
<html>
<body>
  <p>Bill (SAR): <input id="bill" value="90"></p>
  <p>People: <input id="people" value="3"></p>
  <button id="split">Split</button>
  <p id="out"></p>

  <script>
    const out = document.querySelector("#out");
    document.querySelector("#split").addEventListener("click", () => {
      const bill = Number(document.querySelector("#bill").value);
      const people = Number(document.querySelector("#people").value);
      if (Number.isNaN(bill) || Number.isNaN(people) || bill <= 0 || people <= 0) {
        out.textContent = "Please type a bill and a number of people above 0.";
      } else {
        const each = bill / people;
        out.textContent = ¦Each person pays #{Number(each.toFixed(2))} SAR¦;
      }
    });
  </script>
</body>
</html>` },
  ],
  mistakes: [
    { title: "Adding values without Number()", html: "<code>value</code> is a string, so <code>+</code> joins the texts: <code>\"10\" + \"5\"</code> is <code>\"105\"</code>.", wrong: c`const total = a.value + b.value;`, right: c`const total = Number(a.value) + Number(b.value);` },
    { title: "Reading the value too early", html: "Code outside the handler runs when the page loads, when the box is still empty. Read inside the handler, at the moment of the click.", wrong: c`const age = Number(input.value);
btn.addEventListener("click", () => {
  out.textContent = age + 1;
});`, right: c`btn.addEventListener("click", () => {
  const age = Number(input.value);
  out.textContent = age + 1;
});` },
    { title: "Using .value on a checkbox", html: "A checkbox's <code>value</code> is always <code>\"on\"</code>, ticked or not. Ask <code>.checked</code> instead.", wrong: c`if (juice.value) {
  total = total + 3;
}`, right: c`if (juice.checked) {
  total = total + 3;
}` },
    { title: "Forgetting preventDefault in a form", html: "The page reloads and your result vanishes in a flash. Always make <code>preventDefault()</code> the first line of a submit handler.", wrong: c`form.addEventListener("submit", () => {
  out.textContent = "Saved!";
});`, right: c`form.addEventListener("submit", (event) => {
  event.preventDefault();
  out.textContent = "Saved!";
});` },
  ],
  tricks: [
    { title: "type=\"number\" helps on phones", html: "<code>&lt;input type=\"number\"&gt;</code> opens the number keyboard on a phone and has small up/down arrows. Its <code>value</code> is <b>still a string</b>, so you still need <code>Number()</code>." },
    { title: "trim() the text", html: "Users often type a space by accident. <code>input.value.trim()</code> removes spaces at the start and end, so <code>\"  \"</code> counts as empty and <code>\" Sara \"</code> becomes <code>\"Sara\"</code>." },
    { title: "One update() for many inputs", html: "When several inputs affect one result, write one <code>update()</code> function that reads all of them, and attach it to every input's <code>input</code> or <code>change</code> event." },
  ],
  practice: [
    { t: "webtry", title: "Make it yours: price with VAT", html: "<p>This page adds 15% VAT to a price. Add a friendly message when the box is empty or not a number.</p>", code: c`<!DOCTYPE html>
<html>
<body>
  <p>Price: <input id="price" value="100"></p>
  <button id="go">Add VAT</button>
  <p id="out"></p>
  <script>
    document.querySelector("#go").addEventListener("click", () => {
      const price = Number(document.querySelector("#price").value);
      document.querySelector("#out").textContent = ¦With VAT: #{price * 1.15} SAR¦;
    });
  </script>
</body>
</html>` },
    { t: "predict", code: c`const typed = "7";
console.log(typed + 3);
console.log(Number(typed) + 3);
console.log(Number(""));`, explain: "<p>An input gives text like <code>\"7\"</code>. With <code>+</code>, text joins (<code>73</code>). After <code>Number()</code> it adds (<code>10</code>). And an empty box becomes <code>0</code> — that is why you check for empty text first.</p>" },
    { t: "parsons", title: "A form that does not reload", prompt: "Put the lines in order: on submit, stop the reload and show what was typed.", lines: [c`form.addEventListener("submit", (event) => {`, c`  event.preventDefault();`, c`  const text = input.value;`, c`  out.textContent = "You typed: " + text;`, c`});`], distractors: [c`form.addEventListener("submit", event.preventDefault());`], explain: "Stop the default first, then read, then show." },
    { t: "webtry", title: "Live name badge", html: "<p>The badge updates on every letter. Add a <code>&lt;select&gt;</code> with three colours and make the badge background follow the chosen colour (use the <code>change</code> event and <code>style.backgroundColor</code>).</p>", code: c`<!DOCTYPE html>
<html>
<body>
  <input id="name" placeholder="Your name">
  <h2 id="badge" style="padding: 10px; background: lightblue;">Hello!</h2>
  <script>
    const nameBox = document.querySelector("#name");
    nameBox.addEventListener("input", () => {
      document.querySelector("#badge").textContent = "Hello, " + nameBox.value + "!";
    });
  </script>
</body>
</html>` },
    { t: "turn", level: "Medium", q: "Which line clears the input `box`? Type the whole statement.", answers: ["box.value = \"\";", "box.value = \"\"", "box.value = '';", "box.value=\"\""], e: "Give the `value` an empty string: `box.value = \"\";`. Then `box.focus();` puts the cursor back.", placeholder: "box...." },
    { t: "webtry", title: "Agree to the rules", html: "<p>The button only works when the checkbox is ticked. Change it so the button is <b>disabled</b> until the box is ticked (hint: <code>btn.disabled = !rules.checked</code> in a <code>change</code> handler).</p>", code: c`<!DOCTYPE html>
<html>
<body>
  <label><input type="checkbox" id="rules"> I agree to the class rules</label>
  <p><button id="btn">Join the class</button></p>
  <p id="msg"></p>
  <script>
    const rules = document.querySelector("#rules");
    const btn = document.querySelector("#btn");
    btn.addEventListener("click", () => {
      if (rules.checked) {
        document.querySelector("#msg").textContent = "Welcome!";
      } else {
        document.querySelector("#msg").textContent = "Please tick the box first.";
      }
    });
  </script>
</body>
</html>` },
  ],
  exercises: [
    { id: "double", lvl: "seed", web: true, title: "Double it", prompt: "<p>When <code>#go</code> is clicked, read the number in <code>#num</code> and show <b>twice</b> that number in <code>#out</code>.</p>", starter: c`<input id="num">
<button id="go">Double</button>
<p id="out"></p>
<script>
  // your code here
</script>`,
      tests: [{ before: "type('#num', '21'); click('#go');", check: "text('#out')", expected: "42", desc: "21 doubled is 42" }, { before: "type('#num', '2.5'); click('#go');", check: "text('#out')", expected: "5", desc: "2.5 doubled is 5" }],
      hint: "<code>const n = Number(document.querySelector(\"#num\").value);</code> inside the click handler.",
      solutions: [{ name: "Solution", code: c`<input id="num">
<button id="go">Double</button>
<p id="out"></p>
<script>
  document.querySelector("#go").addEventListener("click", () => {
    const n = Number(document.querySelector("#num").value);
    document.querySelector("#out").textContent = n * 2;
  });
</script>`, note: "<code>n * 2</code> would also work without <code>Number()</code> (the <code>*</code> converts), but <code>+</code> would not — so always convert." }] },
    { id: "welcome", lvl: "seed", web: true, title: "Welcome message", prompt: "<p>When <code>#go</code> is clicked, show <code>Welcome, NAME!</code> in <code>#out</code>, where NAME is what the user typed in <code>#name</code>.</p>", starter: c`<input id="name" placeholder="Your name">
<button id="go">Enter</button>
<p id="out"></p>
<script>
  const nameBox = document.querySelector("#name");
  // your code here
</script>`,
      tests: [{ before: "type('#name', 'Reem'); click('#go');", check: "text('#out')", expected: "Welcome, Reem!", desc: "Reem is welcomed" }, { before: "type('#name', '{{name}}'); click('#go');", check: "text('#out')", expected: "Welcome, {{name}}!", desc: "any name works" }],
      hint: "Use a template string with <code>nameBox.value</code> inside the click handler.",
      solutions: [{ name: "Template string", code: c`<input id="name" placeholder="Your name">
<button id="go">Enter</button>
<p id="out"></p>
<script>
  const nameBox = document.querySelector("#name");
  document.querySelector("#go").addEventListener("click", () => {
    document.querySelector("#out").textContent = ¦Welcome, #{nameBox.value}!¦;
  });
</script>` }] },
    { id: "next-age", lvl: "star", web: true, title: "Age next year, with checks", prompt: "<p>When <code>#calc</code> is clicked, show in <code>#out</code>:</p><ul><li><code>Please type your age.</code> if <code>#age</code> is empty (or only spaces),</li><li><code>Please type a number.</code> if it is not a number,</li><li>otherwise <code>Next year you will be 17.</code> (with the right number).</li></ul>", starter: c`<input id="age">
<button id="calc">Calculate</button>
<p id="out"></p>
<script>
  // your code here
</script>`,
      tests: [{ before: "type('#age', '16'); click('#calc');", check: "text('#out')", expected: "Next year you will be 17.", desc: "16 → 17" }, { before: "type('#age', '9'); click('#calc');", check: "text('#out')", expected: "Next year you will be 10.", desc: "9 → 10 (numbers, not text)" }, { before: "type('#age', '  '); click('#calc');", check: "text('#out')", expected: "Please type your age.", desc: "an empty box gets a message" }, { before: "type('#age', 'ten'); click('#calc');", check: "text('#out')", expected: "Please type a number.", desc: "letters get a message" }],
      hint: "Check <code>text.trim() === \"\"</code> first, then <code>Number.isNaN(age)</code>, then calculate.",
      solutions: [{ name: "if / else if / else", code: c`<input id="age">
<button id="calc">Calculate</button>
<p id="out"></p>
<script>
  const out = document.querySelector("#out");
  document.querySelector("#calc").addEventListener("click", () => {
    const text = document.querySelector("#age").value;
    const age = Number(text);
    if (text.trim() === "") {
      out.textContent = "Please type your age.";
    } else if (Number.isNaN(age)) {
      out.textContent = "Please type a number.";
    } else {
      out.textContent = ¦Next year you will be #{age + 1}.¦;
    }
  });
</script>` }] },
    { id: "char-count", lvl: "star", web: true, title: "Live character counter", prompt: "<p>A status may have at most 20 characters. On every change of <code>#msg</code> (the <code>input</code> event), show <code>N characters left</code> in <code>#left</code> (N = 20 minus the length; it may go below 0). When N is below 0, <code>#left</code> must have the class <code>over</code>; otherwise it must not.</p>", starter: c`<!DOCTYPE html>
<html>
<head>
  <style>
    .over { color: darkorange; font-weight: bold; }
  </style>
</head>
<body>
  <input id="msg">
  <p id="left">20 characters left</p>
  <script>
    // your code here
  </script>
</body>
</html>`,
      tests: [{ before: "type('#msg', 'hello');", check: "text('#left')", expected: "15 characters left", desc: "hello leaves 15" }, { before: "type('#msg', 'I love JavaScript so much');", check: "text('#left') + ' ' + $('#left').classList.contains('over')", expected: "-5 characters left true", desc: "25 letters: -5 and the class over" }, { before: "type('#msg', 'I love JavaScript so much'); type('#msg', 'ok');", check: "text('#left') + ' ' + $('#left').classList.contains('over')", expected: "18 characters left false", desc: "shorter again: the class goes away" }],
      hint: "<code>const left = 20 - box.value.length;</code> Then <code>add</code> or <code>remove</code> the class with an <code>if</code>.",
      solutions: [{ name: "add / remove", code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    .over { color: darkorange; font-weight: bold; }
  </style>
</head>
<body>
  <input id="msg">
  <p id="left">20 characters left</p>
  <script>
    const box = document.querySelector("#msg");
    const leftEl = document.querySelector("#left");
    box.addEventListener("input", () => {
      const left = 20 - box.value.length;
      leftEl.textContent = left + " characters left";
      if (left < 0) {
        leftEl.classList.add("over");
      } else {
        leftEl.classList.remove("over");
      }
    });
  </script>
</body>
</html>` }] },
    { id: "order", lvl: "star", web: true, title: "Canteen order", prompt: "<p>The option values of <code>#meal</code> are prices. When <code>#total</code> is clicked, show <code>Total: X SAR</code> in <code>#out</code>: the meal price, plus 3 if the checkbox <code>#juice</code> is ticked.</p>", starter: c`<select id="meal">
  <option value="12">Chicken wrap</option>
  <option value="15">Burger</option>
  <option value="9">Salad</option>
</select>
<label><input type="checkbox" id="juice"> Juice (+3)</label>
<button id="total">Total</button>
<p id="out"></p>
<script>
  // your code here
</script>`,
      tests: [{ before: "click('#total');", check: "text('#out')", expected: "Total: 12 SAR", desc: "the first meal, no juice: 12" }, { before: "type('#meal', '15'); click('#juice'); click('#total');", check: "text('#out')", expected: "Total: 18 SAR", desc: "burger with juice: 18" }, { before: "type('#meal', '9'); click('#total');", check: "text('#out')", expected: "Total: 9 SAR", desc: "salad without juice: 9" }],
      hint: "<code>Number(meal.value)</code> for the price; <code>if (juice.checked)</code> add 3.",
      solutions: [{ name: "if", code: c`<select id="meal">
  <option value="12">Chicken wrap</option>
  <option value="15">Burger</option>
  <option value="9">Salad</option>
</select>
<label><input type="checkbox" id="juice"> Juice (+3)</label>
<button id="total">Total</button>
<p id="out"></p>
<script>
  const meal = document.querySelector("#meal");
  const juice = document.querySelector("#juice");
  document.querySelector("#total").addEventListener("click", () => {
    let total = Number(meal.value);
    if (juice.checked) {
      total = total + 3;
    }
    document.querySelector("#out").textContent = ¦Total: #{total} SAR¦;
  });
</script>` }, { name: "Ternary", code: c`<select id="meal">
  <option value="12">Chicken wrap</option>
  <option value="15">Burger</option>
  <option value="9">Salad</option>
</select>
<label><input type="checkbox" id="juice"> Juice (+3)</label>
<button id="total">Total</button>
<p id="out"></p>
<script>
  document.querySelector("#total").addEventListener("click", () => {
    const price = Number(document.querySelector("#meal").value);
    const extra = document.querySelector("#juice").checked ? 3 : 0;
    document.querySelector("#out").textContent = "Total: " + (price + extra) + " SAR";
  });
</script>` }],
      twist: "Make the total update live, without the button: listen for <code>change</code> on both the select and the checkbox." },
    { id: "fix-tip", lvl: "fire", web: true, debug: true, title: "Fix the tip calculator", prompt: "<p>With bill <code>100</code> and tip <code>15</code>% the page should show <code>Tip: 15 SAR, total: 115 SAR</code>. It shows nothing useful. Find the three bugs.</p>",
      starter: c`<p>Bill: <input id="bill"></p>
<p>Tip:
  <select id="pct">
    <option value="10">10%</option>
    <option value="15">15%</option>
    <option value="20">20%</option>
  </select>
</p>
<button id="calc">Calculate</button>
<p id="out"></p>
<script>
  const bill = document.querySelector("#bill").value;
  const out = document.querySelector("out");
  document.querySelector("#calc").addEventListener("click", () => {
    const pct = Number(document.querySelector("#pct").value);
    const tip = bill * pct / 100;
    out.textContent = ¦Tip: #{tip} SAR, total: #{bill + tip} SAR¦;
  });
</script>`,
      tests: [{ before: "type('#bill', '100'); type('#pct', '15'); click('#calc');", check: "text('#out')", expected: "Tip: 15 SAR, total: 115 SAR", desc: "100 with 15%" }, { before: "type('#bill', '80'); type('#pct', '10'); click('#calc');", check: "text('#out')", expected: "Tip: 8 SAR, total: 88 SAR", desc: "80 with 10%" }, { before: "type('#bill', '50'); type('#pct', '20'); click('#calc');", check: "text('#out')", expected: "Tip: 10 SAR, total: 60 SAR", desc: "50 with 20%" }],
      hint: "1) When is the bill read — at load or at the click? 2) Check every selector. 3) What does <code>+</code> do with a string?",
      solutions: [{ name: "Fixed", code: c`<p>Bill: <input id="bill"></p>
<p>Tip:
  <select id="pct">
    <option value="10">10%</option>
    <option value="15">15%</option>
    <option value="20">20%</option>
  </select>
</p>
<button id="calc">Calculate</button>
<p id="out"></p>
<script>
  const out = document.querySelector("#out");
  document.querySelector("#calc").addEventListener("click", () => {
    const bill = Number(document.querySelector("#bill").value);
    const pct = Number(document.querySelector("#pct").value);
    const tip = bill * pct / 100;
    out.textContent = ¦Tip: #{tip} SAR, total: #{bill + tip} SAR¦;
  });
</script>`, note: "The bill is now read <b>inside</b> the handler, the selector has its <code>#</code>, and <code>Number()</code> makes <code>bill + tip</code> a real sum." }] },
    { id: "list-form", lvl: "fire", web: true, title: "Shopping list form", prompt: "<p>Handle the <code>submit</code> event of the form <code>#add-form</code> (do not forget <code>preventDefault</code>):</p><ul><li>If <code>#item</code> is empty (or only spaces): show <code>Type something first.</code> in <code>#msg</code> and add nothing.</li><li>Otherwise: count the item, show <code>Added: milk</code> (the trimmed text) in <code>#last</code>, show the count in <code>#count</code> as <code>1 item</code>, <code>2 items</code>, <code>3 items</code>… (mind the singular!), clear <code>#msg</code>, then clear the input and focus it.</li></ul>", starter: c`<form id="add-form">
  <input id="item" placeholder="Milk, bread...">
  <button>Add</button>
</form>
<p id="msg"></p>
<p id="last"></p>
<p id="count">0 items</p>
<script>
  let count = 0;
  // your code here
</script>`,
      tests: [
        { before: "type('#item', ' milk '); $('#add-form').dispatchEvent(new Event('submit', { cancelable: true }));", check: "text('#last') + '|' + text('#count') + '|' + $('#item').value", expected: "Added: milk|1 item|", desc: "one item: Added: milk, 1 item, empty box" },
        { before: "for (const x of ['tea', 'rice', 'eggs']) { type('#item', x); $('#add-form').dispatchEvent(new Event('submit', { cancelable: true })); }", check: "text('#count') + '|' + text('#last')", expected: "3 items|Added: eggs", desc: "three items: plural" },
        { before: "type('#item', '   '); $('#add-form').dispatchEvent(new Event('submit', { cancelable: true }));", check: "text('#msg') + '|' + text('#count')", expected: "Type something first.|0 items", desc: "an empty box is not added" },
        { before: "type('#item', 'bread'); window.__ev = new Event('submit', { cancelable: true }); $('#add-form').dispatchEvent(window.__ev);", check: "window.__ev.defaultPrevented + ' ' + (document.activeElement === $('#item'))", expected: "true true", desc: "preventDefault is called and the input gets the focus" },
      ],
      hint: "<code>form.addEventListener(\"submit\", (event) => { event.preventDefault(); ... })</code>. For the count text: <code>count === 1 ? \"1 item\" : count + \" items\"</code>.",
      solutions: [{ name: "Solution", code: c`<form id="add-form">
  <input id="item" placeholder="Milk, bread...">
  <button>Add</button>
</form>
<p id="msg"></p>
<p id="last"></p>
<p id="count">0 items</p>
<script>
  let count = 0;
  const item = document.querySelector("#item");
  const msg = document.querySelector("#msg");
  document.querySelector("#add-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const text = item.value.trim();
    if (text === "") {
      msg.textContent = "Type something first.";
      return;
    }
    count++;
    msg.textContent = "";
    document.querySelector("#last").textContent = "Added: " + text;
    document.querySelector("#count").textContent = count === 1 ? "1 item" : ¦#{count} items¦;
    item.value = "";
    item.focus();
  });
</script>` }],
      twist: "Tomorrow (Day 26) you will learn <code>createElement</code> and make each item appear in a real list under the form." },
  ],
  quiz: [
    { q: "The user types `7` in an input. What is `input.value + 1`?", o: ["`8`", "`\"71\"`", "`NaN`", "an error"], a: 1, e: "`value` is the string `\"7\"`, and string + number joins them: `\"71\"`. Use `Number(input.value) + 1`.", noRun: true },
    { q: "What is `Number(\"\")`?", code: c`console.log(Number(""));`, o: ["`0`", "`NaN`", "`undefined`"], a: 0, e: "An empty string becomes 0 — that is why you test for an empty box separately." },
    { q: "How do you know if `<input type=\"checkbox\" id=\"ok\">` is ticked?", o: ["`ok.value === \"yes\"`", "`ok.checked`", "`ok.ticked`", "`ok.selected`"], a: 1, e: "`.checked` is `true` or `false`." },
    { q: "Which event should a `<form>` handler listen for?", o: ["`\"click\"`", "`\"send\"`", "`\"submit\"`", "`\"enter\"`"], a: 2, e: "Both the Enter key and the form's button fire `submit` on the form." },
    { q: "What does `event.preventDefault()` do in a submit handler?", o: ["Deletes what the user typed", "Stops the browser's default action (sending the form and reloading)", "Prevents all future events", "Shows an error"], a: 1, e: "It cancels only the default action of this event, so your JavaScript can handle the form." },
    { q: "Which pair clears the box and puts the cursor back into it?", o: ["`box.value = \"\"; box.focus();`", "`box.clear(); box.select();`", "`box.textContent = \"\"; box.click();`", "`box = \"\"; focus(box);`"], a: 0, e: "An input's text is its `value`; `focus()` moves the cursor into it." },
  ],
  puzzle: { title: "The sneaky total", q: "<p>The user types <code>5</code> in <code>#a</code> and <code>2</code> in <code>#b</code>, then clicks. What does <code>#out</code> show?</p>", code: c`<input id="a"> <input id="b">
<button id="go">Go</button>
<p id="out"></p>
<script>
  document.querySelector("#go").addEventListener("click", () => {
    const a = document.querySelector("#a").value;
    const b = document.querySelector("#b").value;
    document.querySelector("#out").textContent = a * b + a + b;
  });
</script>`, answers: ["1052"], hint: "`*` turns strings into numbers, `+` with a string joins. Go from left to right.", e: "`a * b` is `10` (a number, because `*` only works with numbers). Then `10 + \"5\"` joins to `\"105\"`, and `\"105\" + \"2\"` gives **`1052`**." },
  cards: [
    { f: "What type is `input.value`?", b: "Always a string. Use `Number(input.value)` before doing maths." },
    { f: "How do you check for an empty box and for a bad number?", b: "`text.trim() === \"\"` for empty; `Number.isNaN(Number(text))` for not a number. Check empty first, because `Number(\"\")` is 0." },
    { f: "How do you read a checkbox and a `<select>`?", b: "Checkbox: `.checked` (true/false). Select: `.value` (the chosen option's value, a string)." },
    { f: "Which event updates the page on every letter?", b: "`input`." },
    { f: "The two lines every submit handler needs?", b: "`form.addEventListener(\"submit\", (event) => {` and `event.preventDefault();` as its first line." },
  ],
  remember: [
    "`input.value` is always a string; convert with `Number()` before maths.",
    "Read inputs inside the handler, at the moment of the click.",
    "Check bad input first (empty, then `Number.isNaN`) and show a friendly message.",
    "The `input` event updates the page live; `change` fits selects and checkboxes.",
    "Select: `.value`. Checkbox: `.checked` (a boolean).",
    "Forms: listen for `submit` on the form, call `event.preventDefault()`, then clear (`value = \"\"`) and `focus()` the input.",
  ],
};
})();
