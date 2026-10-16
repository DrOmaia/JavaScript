window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");

// helper used inside the calculator tests: clicks the buttons whose text matches each character
const TAP = "const tap = keys => [...keys].forEach(k => [...document.querySelectorAll('button')].find(b => b.textContent.trim() === k).click());";
// helper used inside the quiz tests: clicks the option button with this text
const PICK = "const pick = t => [...document.querySelectorAll('#options button')].find(b => b.textContent === t).click();";
const ALL_RIGHT = PICK + " pick('12'); click('#next'); pick('Jupiter'); click('#next'); pick('120'); click('#next');";

// ---------- shared solution pieces ----------
const CALC_LOGIC = c`    function calculate(a, op, b) {
      if (op === "+") return a + b;
      if (op === "-") return a - b;
      if (op === "*") return a * b;
      if (op === "/") return b === 0 ? "Cannot divide by 0" : a / b;
      return "Unknown operator";
    }
    function roundNice(x) {
      return Math.round(x * 10000) / 10000;
    }`;

const CALC_KEYS = c`  <div class="keys">
    <button class="digit">7</button><button class="digit">8</button><button class="digit">9</button><button class="op">/</button>
    <button class="digit">4</button><button class="digit">5</button><button class="digit">6</button><button class="op">*</button>
    <button class="digit">1</button><button class="digit">2</button><button class="digit">3</button><button class="op">-</button>
    <button class="digit">0</button><button class="digit">.</button><button id="equals">=</button><button class="op">+</button>
    <button id="clear">C</button>
  </div>`;

const QUIZ_DATA = c`    const questions = [
      { q: "What is 5 + 7?", options: ["10", "12", "13"], answer: "12" },
      { q: "Which planet is the biggest?", options: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
      { q: "How many minutes are in 2 hours?", options: ["120", "100", "200"], answer: "120" },
    ];`;

const TODO_LOGIC = c`    function addTask(tasks, text) {
      const clean = text.trim();
      if (clean !== "") tasks.push({ text: clean, done: false });
    }
    function countLeft(tasks) {
      return tasks.filter(task => !task.done).length;
    }
    function toggleTask(tasks, index) {
      tasks[index].done = !tasks[index].done;
    }
    function removeTask(tasks, index) {
      tasks.splice(index, 1);
    }`;

DAYS[30] = {
  title: "Capstone: finish, polish, certificate",
  intro: "Last day, {{name}}! Yesterday your project got its brain and a first page. Today you turn it into a real app: you finish the features, make it handle mistakes kindly, give it a clean look, and test it like a user would. Then you mark the day complete and print your certificate.",
  goals: [
    "Finish your app milestone by milestone, with automatic checks",
    "Polish it: clear messages, safe handling of wrong input, a tidy layout with a little CSS",
    "Test your app like a user, including the strange cases",
    "Show your work to someone and reflect on your 30 days",
  ],
  tracks: [
    { id: "calc", emoji: "🧮", name: "Calculator", desc: "<p><b>Calculator web app.</b> Today: real calculator buttons and a display, chained sums, a history line, keyboard support and a clean look.</p>" },
    { id: "quiz", emoji: "❓", name: "Quiz game", desc: "<p><b>Quiz game web app.</b> Today: a Next button, the final result, Play again, and a countdown timer for every question.</p>" },
    { id: "todo", emoji: "✅", name: "To-do list", desc: "<p><b>To-do list web app.</b> Today: add with Enter, tick tasks off, delete them, save everything in <code>localStorage</code>, and clear finished tasks.</p>" },
  ],
  learn: [
    { t: "h", text: "Working is not the same as finished" },
    { t: "p", html: "<p>Your app works when <b>you</b> use it the right way. A finished app also works when someone else uses it the <b>wrong</b> way: your little brother clicks every button twice, your friend leaves a box empty, your mum types \"ten\" instead of 10. <b>Polishing</b> means making the app clear, safe and pleasant for every user — it is often half of the real work.</p>" },
    { t: "analogy", title: "Polishing is like finishing a school project poster", html: "<p>The facts on the poster are done (that was yesterday). Now you add a clear title, fix the spelling, line things up, and ask a friend to read it before you hand it in. Same content, but now it looks and feels finished.</p>" },
    { t: "h", text: "Clear messages and wrong input" },
    { t: "p", html: "<p>A good app always tells the user what happened and what to do next. Instead of showing <code>NaN</code> or doing nothing, show a short, friendly sentence. Ask yourself for every input: what if it is <b>empty</b>? what if it is <b>not a number</b>? what if it is <b>too big or negative</b>?</p>" },
    { t: "web", title: "canteen.html", height: 230, code: c`<h3>Canteen order</h3>
<input id="count" placeholder="How many sandwiches?">
<button id="order">Order</button>
<p id="msg"></p>

<script>
  const box = document.querySelector("#count");
  const msg = document.querySelector("#msg");

  document.querySelector("#order").addEventListener("click", () => {
    const text = box.value.trim();
    const n = Number(text);
    if (text === "" || Number.isNaN(n)) {
      msg.textContent = "Please type a number, for example 2.";
    } else if (n < 1 || n > 10 || n !== Math.round(n)) {
      msg.textContent = "You can order 1 to 10 whole sandwiches.";
    } else {
      msg.textContent = ¦Done! ${n} sandwiches = ${n * 7} riyals.¦;
    }
  });
</script>`.replace(/\$\{/g, "${"), before: "<p>Try it with an empty box, with <code>abc</code>, with <code>-3</code>, with <code>2.5</code>, and with <code>3</code>. Every case gets a helpful sentence.</p>", note: "<p><code>Number.isNaN(n)</code> is <code>true</code> when the text was not a number (for example <code>Number(\"abc\")</code>). The checks go from \"not a number at all\" to \"a number, but not allowed\" to \"all good\".</p>" },
    { t: "turn", level: "Medium", q: "A user leaves the box empty. What does this line show? (This is why we test for empty text **before** converting.)", code: c`console.log(Number(""));`, answers: ["0"], run: true, e: "`Number(\"\")` is `0`, not an error and not `NaN`. Without an empty-box check, your app would quietly calculate with 0.", placeholder: "type the output" },
    { t: "h", text: "A nice layout with a little CSS" },
    { t: "p", html: "<p>A few lines of CSS in a <code>&lt;style&gt;</code> tag inside <code>&lt;head&gt;</code> make a big difference. You do not need much: a font, some space (<code>padding</code>, <code>margin</code>), rounded corners, soft colours, and bigger buttons that are easy to tap on a phone.</p>" },
    { t: "web", title: "style.html", height: 220, code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #f3f1ec; color: #333; }
    .card { max-width: 280px; margin: 16px auto; padding: 16px; background: #fffdf8; border-radius: 12px; box-shadow: 0 2px 8px #0002; }
    button { font-size: 1rem; padding: 8px 14px; border: 0; border-radius: 8px; background: #5b8def; color: white; cursor: pointer; }
    .muted { color: #888; font-size: .9rem; }
  </style>
</head>
<body>
  <div class="card">
    <h3>Score: 0</h3>
    <p class="muted">Press the button to score.</p>
    <button>+1 goal</button>
  </div>
</body>
</html>` , note: "<p>Each rule is <i>selector</i> <code>{ property: value; }</code>. <code>body</code> styles the whole page, <code>.card</code> every element with that class. Change a colour and press Run — that is the fastest way to learn CSS.</p>" },
    { t: "check", q: "Where should the CSS of your one-page app go?", o: ["In a `<style>` tag inside `<head>`", "Inside `console.log`", "In the `<script>` tag"], a: 0, e: "CSS lives in `<style>` (usually in `<head>`), HTML in `<body>`, and JavaScript in `<script>` at the end of `<body>`." },
    { t: "h", text: "Test like a user, then show it to someone" },
    { t: "p", html: "<p>Before you call it finished, use your app like a stranger would. Here is a short test list:</p><ul><li>Do the normal thing — does it work?</li><li>Leave things empty, type nonsense, click twice, click in a strange order.</li><li>Try it at phone width (make the preview narrow).</li><li>Is it obvious what to do first? Is every message clear?</li></ul><p>Then show it to your family or a friend <b>without explaining anything</b>. Watch where they hesitate — that is your next improvement.</p>" },
    { t: "check", q: "Your quiz works when you play it. Your friend clicks an answer three times quickly and gets 3 points. What kind of problem is this?", o: ["A bug that only users find — test strange actions too", "Not a problem: your friend cheated", "A CSS problem"], a: 0, e: "Users do things you did not plan. Locking the buttons after the first click fixes it — and testing \"click twice\" finds it." },
    { t: "steps", web: true, title: "Polishing the score counter", problem: "<p>Yesterday's score counter works. Polish it: a line that says who is winning, a −1 button that can never go below 0, and a little CSS.</p>",
      steps: [
        { html: "<p><b>Clear message.</b> Add a paragraph <code>#status</code>, and in <code>render()</code> write who is ahead.</p>", code: c`let status = "It's a draw";
if (homeScore > awayScore) status = "Hilal are winning";
if (awayScore > homeScore) status = "Nassr are winning";
document.querySelector("#status").textContent = status;` },
        { html: "<p><b>Wrong input.</b> A −1 button fixes a mistake, but a score of −1 makes no sense. Only subtract when the score is above 0.</p>", code: c`if (homeScore > 0) homeScore--;` },
        { html: "<p><b>Layout.</b> A <code>&lt;style&gt;</code> tag with a font, spacing and bigger buttons.</p>" },
        { html: "<p><b>Test like a user.</b> Click −1 at 0-0, score for both teams, Reset — every message should make sense.</p>" },
      ],
      code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #eef3ee; color: #2f3b2f; text-align: center; }
    h2 { font-size: 1.6rem; }
    button { font-size: 1rem; padding: 8px 12px; margin: 3px; border: 0; border-radius: 8px; background: #4f8a5b; color: white; }
    #reset { background: #b07a4f; }
  </style>
</head>
<body>
  <h2>Hilal <span id="home">0</span> - <span id="away">0</span> Nassr</h2>
  <p id="status"></p>
  <button id="homeGoal">Hilal +1</button><button id="homeUndo">Hilal -1</button><br>
  <button id="awayGoal">Nassr +1</button><button id="awayUndo">Nassr -1</button><br>
  <button id="reset">Reset</button>

  <script>
    let homeScore = 0;
    let awayScore = 0;

    function render() {
      document.querySelector("#home").textContent = homeScore;
      document.querySelector("#away").textContent = awayScore;
      let status = "It's a draw";
      if (homeScore > awayScore) status = "Hilal are winning";
      if (awayScore > homeScore) status = "Nassr are winning";
      document.querySelector("#status").textContent = status;
    }

    document.querySelector("#homeGoal").addEventListener("click", () => { homeScore++; render(); });
    document.querySelector("#awayGoal").addEventListener("click", () => { awayScore++; render(); });
    document.querySelector("#homeUndo").addEventListener("click", () => { if (homeScore > 0) homeScore--; render(); });
    document.querySelector("#awayUndo").addEventListener("click", () => { if (awayScore > 0) awayScore--; render(); });
    document.querySelector("#reset").addEventListener("click", () => { homeScore = 0; awayScore = 0; render(); });

    render();
  </script>
</body>
</html>` },
    { t: "h", text: "Your certificate" },
    { t: "p", html: "<p>When your milestones are done, press <b>Mark Day 30 as complete</b> at the bottom of this page. That unlocks your <a href=\"certificate.html\">certificate</a> — with your name and the project you built. Print it or save it as a PDF. You earned it, {{name}}.</p>" },
  ],
  exercises: [
    // ---------- Calculator ----------
    { id: "calc30-m1", track: "calc", lvl: "star", web: true, height: 380, title: "Milestone 4: buttons and a display", prompt: "<p>Turn the page into a real calculator. The starter has the buttons: digits <code>0</code>–<code>9</code> and <code>.</code> (class <code>digit</code>), operators <code>+ - * /</code> (class <code>op</code>), <code>=</code> (<code>#equals</code>), <code>C</code> (<code>#clear</code>) and a display <code>#display</code> showing <code>0</code>.</p><ul><li>Digits build the number on the display; the first digit replaces the <code>0</code>; a second <code>.</code> in one number is ignored.</li><li>An operator remembers the first number and the operator; the next digit starts a new number.</li><li><code>=</code> shows the answer (use <code>calculate</code> and <code>roundNice</code>), or the error text, e.g. <code>Cannot divide by 0</code>.</li><li><code>C</code> clears everything and shows <code>0</code>.</li></ul>",
      starter: c`<div id="display">0</div>
${CALC_KEYS}

<script>
${CALC_LOGIC}

    const display = document.querySelector("#display");
    let current = "0";  // the number being typed, as text
    let first = null;   // the first number
    let op = null;      // the operator that is waiting
    let fresh = false;  // true: the next digit starts a new number

    // your code: pressDigit(d), pressOp(o), pressEquals(), pressClear()
    // then connect the buttons
</script>`,
      hint: "Keep the number being typed as <b>text</b> in <code>current</code>: adding a digit is just <code>current + d</code>. Convert with <code>Number(current)</code> only when you calculate. Connect all digits at once: <code>document.querySelectorAll(\".digit\").forEach(b =&gt; b.addEventListener(\"click\", () =&gt; pressDigit(b.textContent)))</code>.",
      tests: [
        { before: TAP + " tap('12+7=');", check: "text('#display')", expected: "19", desc: "12 + 7 = shows 19" },
        { before: TAP + " tap('9/0=');", check: "text('#display')", expected: "Cannot divide by 0", desc: "9 / 0 = shows the error" },
        { before: TAP + " tap('8*5C');", check: "text('#display')", expected: "0", desc: "C clears to 0" },
        { before: TAP + " tap('1.5*2=');", check: "text('#display')", expected: "3", desc: "decimals work: 1.5 * 2 = 3" },
      ],
      solutions: [
        { name: "Four small functions", code: c`<div id="display">0</div>
${CALC_KEYS}

<script>
${CALC_LOGIC}

    const display = document.querySelector("#display");
    let current = "0";  // the number being typed, as text
    let first = null;   // the first number
    let op = null;      // the operator that is waiting
    let fresh = false;  // true: the next digit starts a new number

    function pressDigit(d) {
      if (fresh) {
        current = "0";
        fresh = false;
      }
      if (d === "." && current.includes(".")) return;
      current = current === "0" && d !== "." ? d : current + d;
      display.textContent = current;
    }

    function pressOp(o) {
      first = Number(current);
      op = o;
      fresh = true;
    }

    function pressEquals() {
      if (op === null) return;
      const result = calculate(first, op, Number(current));
      display.textContent = typeof result === "string" ? result : roundNice(result);
      current = typeof result === "string" ? "0" : String(roundNice(result));
      op = null;
      fresh = true;
    }

    function pressClear() {
      current = "0";
      first = null;
      op = null;
      fresh = false;
      display.textContent = current;
    }

    document.querySelectorAll(".digit").forEach(b => b.addEventListener("click", () => pressDigit(b.textContent)));
    document.querySelectorAll(".op").forEach(b => b.addEventListener("click", () => pressOp(b.textContent)));
    document.querySelector("#equals").addEventListener("click", pressEquals);
    document.querySelector("#clear").addEventListener("click", pressClear);
</script>`, note: "The four variables are the calculator's whole memory. Every button only changes them and updates the display. After <code>=</code> the answer becomes <code>current</code>, so you can keep calculating with it." },
      ] },
    { id: "calc30-m2", track: "calc", lvl: "star", web: true, height: 400, title: "Milestone 5: chains and a history line", prompt: "<p>Make it behave like a real calculator. Add a <code>&lt;div id=\"history\"&gt;</code> above the display.</p><ul><li><b>Chains:</b> <code>2 + 3 + 4 =</code> gives <code>9</code> — when an operator is pressed while another one is waiting (and a new number was typed), calculate the waiting one first.</li><li><b>History:</b> after <code>=</code>, <code>#history</code> shows the whole sum, e.g. <code>6 * 7 = 42</code>.</li><li><b>Fresh start:</b> a digit typed right after <code>=</code> starts a new number (<code>2+2=</code> then <code>5</code> shows <code>5</code>).</li><li>Answers are rounded: <code>0.1 + 0.2 =</code> shows <code>0.3</code>.</li></ul>",
      starter: c`<!-- paste your Milestone 4 page here, then add <div id="history"></div> above the display -->
`,
      hint: "At the start of <code>pressOp</code>: <code>if (op !== null &amp;&amp; !fresh) pressEquals();</code> — then the result of the waiting sum becomes the first number. In <code>pressEquals</code>, write the history line before you reset <code>op</code>.",
      tests: [
        { before: TAP + " tap('2+3+4=');", check: "text('#display')", expected: "9", desc: "2 + 3 + 4 = shows 9" },
        { before: TAP + " tap('0.1+0.2=');", check: "text('#display')", expected: "0.3", desc: "0.1 + 0.2 = shows 0.3" },
        { before: TAP + " tap('6*7=');", check: "text('#history')", expected: "6 * 7 = 42", desc: "the history line shows 6 * 7 = 42" },
        { before: TAP + " tap('2+2=5');", check: "text('#display')", expected: "5", desc: "a digit after = starts a new number" },
      ],
      solutions: [
        { name: "Chain in pressOp", code: c`<div id="history"></div>
<div id="display">0</div>
${CALC_KEYS}

<script>
${CALC_LOGIC}

    const display = document.querySelector("#display");
    const historyEl = document.querySelector("#history");
    let current = "0";
    let first = null;
    let op = null;
    let fresh = false;

    function pressDigit(d) {
      if (fresh) {
        current = "0";
        fresh = false;
      }
      if (d === "." && current.includes(".")) return;
      current = current === "0" && d !== "." ? d : current + d;
      display.textContent = current;
    }

    function pressOp(o) {
      if (op !== null && !fresh) pressEquals(); // finish the waiting sum first
      first = Number(current);
      op = o;
      fresh = true;
    }

    function pressEquals() {
      if (op === null) return;
      const second = Number(current);
      const result = calculate(first, op, second);
      if (typeof result === "string") {
        display.textContent = result;
        historyEl.textContent = "";
        current = "0";
      } else {
        const nice = roundNice(result);
        historyEl.textContent = ¦#{first} #{op} #{second} = #{nice}¦;
        current = String(nice);
        display.textContent = current;
      }
      op = null;
      first = null;
      fresh = true;
    }

    function pressClear() {
      current = "0";
      first = null;
      op = null;
      fresh = false;
      display.textContent = current;
      historyEl.textContent = "";
    }

    document.querySelectorAll(".digit").forEach(b => b.addEventListener("click", () => pressDigit(b.textContent)));
    document.querySelectorAll(".op").forEach(b => b.addEventListener("click", () => pressOp(b.textContent)));
    document.querySelector("#equals").addEventListener("click", pressEquals);
    document.querySelector("#clear").addEventListener("click", pressClear);
</script>`, note: "We named the element <code>historyEl</code>, not <code>history</code>: the browser already has a built-in <code>history</code> object, and reusing such names causes confusing bugs." },
      ] },
    { id: "calc30-m3", track: "calc", lvl: "fire", web: true, height: 440, title: "Milestone 6: keyboard and a clean look", prompt: "<p>Final polish.</p><ul><li><b>Keyboard:</b> listen for <code>keydown</code> on the <code>document</code>. Digits and <code>.</code> type, <code>+ - * /</code> are operators, <code>Enter</code> (or <code>=</code>) is equals, <code>Escape</code> clears, and <code>Backspace</code> deletes the last digit (deleting the only digit shows <code>0</code>).</li><li><b>Look:</b> add a <code>&lt;style&gt;</code> with at least: the display's text aligned to the <b>right</b> (<code>text-align: right</code>) and bigger buttons. Make it look like a calculator you would want to use.</li></ul>",
      starter: c`<!-- paste your Milestone 5 page here, then add the keyboard and the style -->
`,
      hint: "<code>\"0123456789.\".includes(event.key)</code> tells you the key is a digit. Call <code>event.preventDefault()</code> for Enter, so a focused button is not clicked a second time. For Backspace: <code>current.slice(0, -1)</code>, and if nothing is left use <code>\"0\"</code>.",
      tests: [
        { before: "['1', '2', '+', '7', 'Enter'].forEach(k => press(k));", check: "text('#display')", expected: "19", desc: "typing 12+7 Enter shows 19" },
        { before: "['5', '5', 'Escape'].forEach(k => press(k));", check: "text('#display')", expected: "0", desc: "Escape clears" },
        { before: "['1', '2', '3', 'Backspace'].forEach(k => press(k));", check: "text('#display')", expected: "12", desc: "Backspace deletes the last digit" },
        { before: "['7', 'Backspace'].forEach(k => press(k));", check: "text('#display')", expected: "0", desc: "deleting the only digit shows 0" },
        { check: "style('#display', 'textAlign')", expected: "right", desc: "the display is aligned to the right" },
      ],
      solutions: [
        { name: "Full calculator", code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #e9edf2; }
    .calc { max-width: 260px; margin: 16px auto; padding: 14px; background: #34404d; border-radius: 16px; }
    #history { color: #b9c4cf; font-size: .85rem; text-align: right; min-height: 1.2em; margin: 0 4px 4px; }
    #display { background: #dde5ec; color: #26313b; font-size: 1.8rem; text-align: right; padding: 10px; border-radius: 8px; margin-bottom: 10px; overflow: hidden; }
    .keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    button { font-size: 1.2rem; padding: 12px 0; border: 0; border-radius: 8px; background: #f2f4f7; cursor: pointer; }
    .op { background: #f2c66d; }
    #equals { background: #8cc49a; }
    #clear { background: #e59a86; }
  </style>
</head>
<body>
<div class="calc">
  <div id="history"></div>
  <div id="display">0</div>
${CALC_KEYS}
</div>

<script>
${CALC_LOGIC}

    const display = document.querySelector("#display");
    const historyEl = document.querySelector("#history");
    let current = "0";
    let first = null;
    let op = null;
    let fresh = false;

    function pressDigit(d) {
      if (fresh) {
        current = "0";
        fresh = false;
      }
      if (d === "." && current.includes(".")) return;
      current = current === "0" && d !== "." ? d : current + d;
      display.textContent = current;
    }

    function pressOp(o) {
      if (op !== null && !fresh) pressEquals();
      first = Number(current);
      op = o;
      fresh = true;
    }

    function pressEquals() {
      if (op === null) return;
      const second = Number(current);
      const result = calculate(first, op, second);
      if (typeof result === "string") {
        display.textContent = result;
        historyEl.textContent = "";
        current = "0";
      } else {
        const nice = roundNice(result);
        historyEl.textContent = ¦#{first} #{op} #{second} = #{nice}¦;
        current = String(nice);
        display.textContent = current;
      }
      op = null;
      first = null;
      fresh = true;
    }

    function pressClear() {
      current = "0";
      first = null;
      op = null;
      fresh = false;
      display.textContent = current;
      historyEl.textContent = "";
    }

    function pressBack() {
      if (fresh) return; // do not edit an answer
      current = current.slice(0, -1);
      if (current === "" || current === "-") current = "0";
      display.textContent = current;
    }

    document.querySelectorAll(".digit").forEach(b => b.addEventListener("click", () => pressDigit(b.textContent)));
    document.querySelectorAll(".op").forEach(b => b.addEventListener("click", () => pressOp(b.textContent)));
    document.querySelector("#equals").addEventListener("click", pressEquals);
    document.querySelector("#clear").addEventListener("click", pressClear);

    document.addEventListener("keydown", event => {
      const k = event.key;
      if ("0123456789.".includes(k)) pressDigit(k);
      else if ("+-*/".includes(k)) pressOp(k);
      else if (k === "Enter" || k === "=") {
        event.preventDefault();
        pressEquals();
      }
      else if (k === "Escape") pressClear();
      else if (k === "Backspace") pressBack();
    });
</script>
</body>
</html>`, note: "<code>display: grid</code> with <code>repeat(4, 1fr)</code> puts the buttons in 4 equal columns. The keyboard listener reuses exactly the same four functions as the buttons — no logic is written twice." },
      ] },
    // ---------- Quiz game ----------
    { id: "quiz30-m1", track: "quiz", lvl: "star", web: true, height: 340, title: "Milestone 4: Next question and the result", prompt: "<p>Make the whole quiz playable. Keep the three questions (the checks use them).</p><ul><li>A <code>#next</code> button is <b>disabled</b> until the question is answered.</li><li><code>#next</code> shows the next question (new text, new option buttons, empty <code>#feedback</code>).</li><li>After the last question, <code>#next</code> shows the result in <code>#result</code> using <code>resultMessage</code> from Day 29, e.g. <code>Good job! 2/3 (67%)</code>.</li></ul>",
      starter: c`<p id="score">Score: 0</p>
<h2 id="question"></h2>
<div id="options"></div>
<p id="feedback"></p>
<button id="next" disabled>Next</button>
<p id="result"></p>

<script>
${QUIZ_DATA}
    let index = 0;  // which question we are on
    let score = 0;

    // paste checkAnswer, resultMessage and your Milestone 3 code here,
    // then: showQuestion() for questions[index], and the Next button
</script>`,
      hint: "Keep the position in <code>index</code>. Next does <code>index++</code>; if <code>index &lt; questions.length</code> show that question, otherwise show the result. Remember <code>nextBtn.disabled = true</code> in <code>showQuestion</code> and <code>false</code> after an answer.",
      tests: [
        { check: "$('#next').disabled", expected: "true", desc: "Next is disabled before an answer" },
        { before: PICK + " pick('12'); click('#next');", check: "text('#question') + ' / ' + count('#options button') + ' / ' + text('#feedback').length", expected: "Which planet is the biggest? / 3 / 0", desc: "Next shows question 2 with fresh buttons" },
        { before: PICK + " pick('12'); click('#next'); pick('Jupiter'); click('#next'); pick('100'); click('#next');", check: "text('#result')", expected: "Good job! 2/3 (67%)", desc: "2 right out of 3 gives Good job! 2/3 (67%)" },
        { before: ALL_RIGHT, check: "text('#result') + ' / ' + text('#score')", expected: "Excellent! 3/3 (100%) / Score: 3", desc: "all right gives Excellent! 3/3 (100%)" },
      ],
      solutions: [
        { name: "index + showQuestion", code: c`<p id="score">Score: 0</p>
<h2 id="question"></h2>
<div id="options"></div>
<p id="feedback"></p>
<button id="next" disabled>Next</button>
<p id="result"></p>

<script>
${QUIZ_DATA}
    let index = 0;
    let score = 0;

    function checkAnswer(question, choice) {
      return choice === question.answer;
    }
    function resultMessage(score, total) {
      const percent = Math.round(score / total * 100);
      const words = percent >= 80 ? "Excellent!" : percent >= 50 ? "Good job!" : "Keep practising!";
      return ¦#{words} #{score}/#{total} (#{percent}%)¦;
    }

    const questionEl = document.querySelector("#question");
    const optionsEl = document.querySelector("#options");
    const feedbackEl = document.querySelector("#feedback");
    const scoreEl = document.querySelector("#score");
    const nextBtn = document.querySelector("#next");
    const resultEl = document.querySelector("#result");

    function answer(choice) {
      const question = questions[index];
      optionsEl.querySelectorAll("button").forEach(btn => { btn.disabled = true; });
      if (checkAnswer(question, choice)) {
        score++;
        feedbackEl.textContent = "Correct!";
      } else {
        feedbackEl.textContent = ¦Wrong! The answer is #{question.answer}¦;
      }
      scoreEl.textContent = ¦Score: #{score}¦;
      nextBtn.disabled = false;
    }

    function showQuestion() {
      const question = questions[index];
      questionEl.textContent = question.q;
      feedbackEl.textContent = "";
      optionsEl.innerHTML = "";
      nextBtn.disabled = true;
      question.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.addEventListener("click", () => answer(option));
        optionsEl.append(btn);
      });
    }

    function finish() {
      questionEl.textContent = "Finished!";
      optionsEl.innerHTML = "";
      feedbackEl.textContent = "";
      nextBtn.disabled = true;
      resultEl.textContent = resultMessage(score, questions.length);
    }

    nextBtn.addEventListener("click", () => {
      index++;
      if (index < questions.length) {
        showQuestion();
      } else {
        finish();
      }
    });

    showQuestion();
</script>`, note: "<code>index</code> is the quiz's bookmark. <code>showQuestion()</code> always reads <code>questions[index]</code>, so moving on is just <code>index++</code>." },
      ] },
    { id: "quiz30-m2", track: "quiz", lvl: "star", web: true, height: 360, title: "Milestone 5: Play again", prompt: "<p>Add a <code>&lt;button id=\"again\"&gt;Play again&lt;/button&gt;</code>.</p><ul><li>It is hidden while the quiz is running (<code>style.display = \"none\"</code>) and appears at the end.</li><li>Clicking it sets the score back to 0, clears <code>#result</code>, hides itself and shows question 1 again.</li></ul>",
      starter: c`<!-- paste your Milestone 4 page here and add the Play again button -->
`,
      hint: "Write a <code>start()</code> function that resets <code>index</code>, <code>score</code>, the texts and the button, then calls <code>showQuestion()</code>. Call it once at the beginning and again from the Play again button.",
      tests: [
        { check: "style('#again', 'display')", expected: "none", desc: "Play again is hidden at the start" },
        { before: ALL_RIGHT, check: "style('#again', 'display') !== 'none'", expected: "true", desc: "Play again appears at the end" },
        { before: ALL_RIGHT + " click('#again');", check: "text('#question') + ' / ' + text('#score') + ' / ' + text('#result').length", expected: "What is 5 + 7? / Score: 0 / 0", desc: "Play again restarts at question 1 with score 0" },
        { before: ALL_RIGHT + " click('#again'); pick('12');", check: "text('#score') + ' / ' + style('#again', 'display')", expected: "Score: 1 / none", desc: "the second game counts from 0 again" },
      ],
      solutions: [
        { name: "start() function", code: c`<p id="score">Score: 0</p>
<h2 id="question"></h2>
<div id="options"></div>
<p id="feedback"></p>
<button id="next" disabled>Next</button>
<p id="result"></p>
<button id="again">Play again</button>

<script>
${QUIZ_DATA}
    let index = 0;
    let score = 0;

    function checkAnswer(question, choice) {
      return choice === question.answer;
    }
    function resultMessage(score, total) {
      const percent = Math.round(score / total * 100);
      const words = percent >= 80 ? "Excellent!" : percent >= 50 ? "Good job!" : "Keep practising!";
      return ¦#{words} #{score}/#{total} (#{percent}%)¦;
    }

    const questionEl = document.querySelector("#question");
    const optionsEl = document.querySelector("#options");
    const feedbackEl = document.querySelector("#feedback");
    const scoreEl = document.querySelector("#score");
    const nextBtn = document.querySelector("#next");
    const resultEl = document.querySelector("#result");
    const againBtn = document.querySelector("#again");

    function answer(choice) {
      const question = questions[index];
      optionsEl.querySelectorAll("button").forEach(btn => { btn.disabled = true; });
      if (checkAnswer(question, choice)) {
        score++;
        feedbackEl.textContent = "Correct!";
      } else {
        feedbackEl.textContent = ¦Wrong! The answer is #{question.answer}¦;
      }
      scoreEl.textContent = ¦Score: #{score}¦;
      nextBtn.disabled = false;
    }

    function showQuestion() {
      const question = questions[index];
      questionEl.textContent = question.q;
      feedbackEl.textContent = "";
      optionsEl.innerHTML = "";
      nextBtn.disabled = true;
      question.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.addEventListener("click", () => answer(option));
        optionsEl.append(btn);
      });
    }

    function finish() {
      questionEl.textContent = "Finished!";
      optionsEl.innerHTML = "";
      feedbackEl.textContent = "";
      nextBtn.disabled = true;
      resultEl.textContent = resultMessage(score, questions.length);
      againBtn.style.display = "inline-block";
    }

    function start() {
      index = 0;
      score = 0;
      scoreEl.textContent = "Score: 0";
      resultEl.textContent = "";
      againBtn.style.display = "none";
      showQuestion();
    }

    nextBtn.addEventListener("click", () => {
      index++;
      if (index < questions.length) showQuestion();
      else finish();
    });
    againBtn.addEventListener("click", start);

    start();
</script>`, note: "One <code>start()</code> function is used for the first game and every new game, so both always begin in exactly the same state." },
      ] },
    { id: "quiz30-m3", track: "quiz", lvl: "fire", web: true, height: 380, title: "Milestone 6: a timer for each question", prompt: "<p>Add some pressure! Add <code>&lt;p id=\"time\"&gt;&lt;/p&gt;</code>.</p><ul><li>When a question appears, <code>#time</code> shows <code>10</code> and counts down by 1 every second.</li><li>Answering stops the timer (the number stays where it was).</li><li>At <code>0</code>: stop the timer, lock the options, show <code>Time is up! The answer is 12</code> (the real answer) and enable Next.</li><li>Each new question starts again from <code>10</code>. Make sure only <b>one</b> timer runs at a time.</li></ul>",
      starter: c`<!-- paste your Milestone 5 page here and add the timer -->
`,
      hint: "Keep the timer's id: <code>timer = setInterval(tick, 1000)</code>. Always <code>clearInterval(timer)</code> before starting a new one, when the player answers, and at the end of the quiz.",
      tests: [
        { check: "text('#time')", expected: "10", desc: "the timer starts at 10" },
        { before: "await wait(1300);", check: "text('#time')", expected: "9", desc: "after one second it shows 9" },
        { before: PICK + " pick('12'); await wait(1300);", check: "text('#time')", expected: "10", desc: "answering stops the timer" },
        { before: PICK + " await wait(1300); pick('12'); click('#next');", check: "text('#time') + ' / ' + text('#question')", expected: "10 / Which planet is the biggest?", desc: "the next question starts again from 10" },
      ],
      solutions: [
        { name: "setInterval + clearInterval", code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #f1eef6; color: #3a3346; text-align: center; }
    #options button { display: block; width: 220px; margin: 6px auto; padding: 10px; font-size: 1rem; border: 0; border-radius: 10px; background: #e2dcef; cursor: pointer; }
    #options button:disabled { opacity: .6; cursor: default; }
    #time { font-size: 1.4rem; font-weight: bold; color: #8a5fbf; }
    #next, #again { padding: 8px 16px; font-size: 1rem; border: 0; border-radius: 8px; background: #8a5fbf; color: white; }
    #next:disabled { background: #c9bfd8; }
  </style>
</head>
<body>
<p id="score">Score: 0</p>
<p id="time"></p>
<h2 id="question"></h2>
<div id="options"></div>
<p id="feedback"></p>
<button id="next" disabled>Next</button>
<p id="result"></p>
<button id="again">Play again</button>

<script>
${QUIZ_DATA}
    const SECONDS = 10;
    let index = 0;
    let score = 0;
    let timeLeft = SECONDS;
    let timer = null;

    function checkAnswer(question, choice) {
      return choice === question.answer;
    }
    function resultMessage(score, total) {
      const percent = Math.round(score / total * 100);
      const words = percent >= 80 ? "Excellent!" : percent >= 50 ? "Good job!" : "Keep practising!";
      return ¦#{words} #{score}/#{total} (#{percent}%)¦;
    }

    const questionEl = document.querySelector("#question");
    const optionsEl = document.querySelector("#options");
    const feedbackEl = document.querySelector("#feedback");
    const scoreEl = document.querySelector("#score");
    const nextBtn = document.querySelector("#next");
    const resultEl = document.querySelector("#result");
    const againBtn = document.querySelector("#again");
    const timeEl = document.querySelector("#time");

    function lockOptions() {
      optionsEl.querySelectorAll("button").forEach(btn => { btn.disabled = true; });
      nextBtn.disabled = false;
    }

    function startTimer() {
      clearInterval(timer); // never two timers at once
      timeLeft = SECONDS;
      timeEl.textContent = timeLeft;
      timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft === 0) {
          clearInterval(timer);
          lockOptions();
          feedbackEl.textContent = ¦Time is up! The answer is #{questions[index].answer}¦;
        }
      }, 1000);
    }

    function answer(choice) {
      clearInterval(timer);
      const question = questions[index];
      lockOptions();
      if (checkAnswer(question, choice)) {
        score++;
        feedbackEl.textContent = "Correct!";
      } else {
        feedbackEl.textContent = ¦Wrong! The answer is #{question.answer}¦;
      }
      scoreEl.textContent = ¦Score: #{score}¦;
    }

    function showQuestion() {
      const question = questions[index];
      questionEl.textContent = question.q;
      feedbackEl.textContent = "";
      optionsEl.innerHTML = "";
      nextBtn.disabled = true;
      question.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.addEventListener("click", () => answer(option));
        optionsEl.append(btn);
      });
      startTimer();
    }

    function finish() {
      clearInterval(timer);
      timeEl.textContent = "";
      questionEl.textContent = "Finished!";
      optionsEl.innerHTML = "";
      feedbackEl.textContent = "";
      nextBtn.disabled = true;
      resultEl.textContent = resultMessage(score, questions.length);
      againBtn.style.display = "inline-block";
    }

    function start() {
      index = 0;
      score = 0;
      scoreEl.textContent = "Score: 0";
      resultEl.textContent = "";
      againBtn.style.display = "none";
      showQuestion();
    }

    nextBtn.addEventListener("click", () => {
      index++;
      if (index < questions.length) showQuestion();
      else finish();
    });
    againBtn.addEventListener("click", start);

    start();
</script>
</body>
</html>`, note: "The most common timer bug is starting a second <code>setInterval</code> while the first is still running — then the clock runs twice as fast. Calling <code>clearInterval(timer)</code> first prevents it." },
      ] },
    // ---------- To-do list ----------
    { id: "todo30-m1", track: "todo", lvl: "star", web: true, height: 340, title: "Milestone 4: Enter, done and delete", prompt: "<p>Make the list useful.</p><ul><li>Pressing <code>Enter</code> in <code>#task</code> adds the task too (same as the Add button).</li><li>Each <code>&lt;li&gt;</code> now holds a <code>&lt;span&gt;</code> with the text and a <code>&lt;button class=\"delete\"&gt;✕&lt;/button&gt;</code>.</li><li>Clicking the <code>span</code> toggles the task: the <code>li</code> gets (or loses) the class <code>done</code>, shown with a line through it.</li><li>Clicking ✕ deletes that task. <code>#left</code> is always correct.</li></ul>",
      starter: c`<style>
  .done span { text-decoration: line-through; color: #999; }
</style>
<h2>My tasks</h2>
<input id="task" placeholder="New task">
<button id="add">Add</button>
<ul id="list"></ul>
<p id="left">0 tasks left</p>

<script>
    const tasks = [];
${TODO_LOGIC}

    // your code: render() with a span and a delete button per task,
    // the Add button, and Enter in the input
</script>`,
      hint: "In <code>render()</code>, <code>tasks.forEach((task, i) =&gt; ...)</code> gives you the index <code>i</code> of each task — pass it to <code>toggleTask(tasks, i)</code> or <code>removeTask(tasks, i)</code>, then call <code>render()</code> again. For Enter: <code>box.addEventListener(\"keydown\", e =&gt; { if (e.key === \"Enter\") ... })</code>.",
      tests: [
        { before: "type('#task', 'Read'); press('Enter', '#task');", check: "count('#list li') + ' ' + text('#list li span') + ' / ' + $('#task').value.length", expected: "1 Read / 0", desc: "Enter adds the task and clears the box" },
        { before: "type('#task', 'Read'); click('#add'); type('#task', 'Gym'); click('#add'); $('#list li span').click();", check: "$('#list li').classList.contains('done') + ' / ' + text('#left')", expected: "true / 1 task left", desc: "clicking a task marks it done" },
        { before: "type('#task', 'Read'); click('#add'); $('#list li span').click(); $('#list li span').click();", check: "count('#list .done') + ' / ' + text('#left')", expected: "0 / 1 task left", desc: "clicking again un-marks it" },
        { before: "type('#task', 'Read'); click('#add'); type('#task', 'Gym'); click('#add'); $('#list li .delete').click();", check: "count('#list li') + ' ' + text('#list li span') + ' / ' + text('#left')", expected: "1 Gym / 1 task left", desc: "✕ deletes the task" },
      ],
      solutions: [
        { name: "render() with index", code: c`<style>
  .done span { text-decoration: line-through; color: #999; }
</style>
<h2>My tasks</h2>
<input id="task" placeholder="New task">
<button id="add">Add</button>
<ul id="list"></ul>
<p id="left">0 tasks left</p>

<script>
    const tasks = [];
${TODO_LOGIC}

    const box = document.querySelector("#task");
    const listEl = document.querySelector("#list");
    const leftEl = document.querySelector("#left");

    function render() {
      listEl.innerHTML = "";
      tasks.forEach((task, i) => {
        const li = document.createElement("li");
        if (task.done) li.classList.add("done");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.addEventListener("click", () => { toggleTask(tasks, i); render(); });

        const del = document.createElement("button");
        del.textContent = "✕";
        del.className = "delete";
        del.addEventListener("click", () => { removeTask(tasks, i); render(); });

        li.append(span, del);
        listEl.append(li);
      });
      const n = countLeft(tasks);
      leftEl.textContent = ¦#{n} #{n === 1 ? "task" : "tasks"} left¦;
    }

    function addFromBox() {
      addTask(tasks, box.value);
      box.value = "";
      render();
    }
    document.querySelector("#add").addEventListener("click", addFromBox);
    box.addEventListener("keydown", e => {
      if (e.key === "Enter") addFromBox();
    });

    render();
</script>`, note: "The click listeners only change the array and call <code>render()</code>. Because the whole list is redrawn, every <code>i</code> always matches the right task." },
      ] },
    { id: "todo30-m2", track: "todo", lvl: "fire", web: true, height: 340, title: "Milestone 5: remember the tasks", prompt: "<p>Right now a page reload loses every task. Save them in <code>localStorage</code>:</p><ul><li>After <b>every</b> change (add, toggle, delete), save the array as JSON under the key <code>js30-todo</code>.</li><li>Write <code>loadTasks()</code> that returns the saved array, or <code>[]</code> when nothing is saved yet.</li><li>When the page opens, start with <code>let tasks = loadTasks();</code> and show them.</li></ul>",
      starter: c`<!-- paste your Milestone 4 page here and add saving and loading -->
`,
      hint: "<code>localStorage.setItem(\"js30-todo\", JSON.stringify(tasks))</code> saves; <code>JSON.parse(localStorage.getItem(\"js30-todo\"))</code> loads. <code>getItem</code> returns <code>null</code> when the key is missing — check that first. A small <code>update()</code> function (save, then render) keeps it in one place.",
      tests: [
        { before: "type('#task', 'Read'); click('#add');", check: "JSON.parse(localStorage.getItem('js30-todo'))[0].text", expected: "Read", desc: "adding saves the task" },
        { before: "type('#task', 'Read'); click('#add'); $('#list li span').click();", check: "JSON.parse(localStorage.getItem('js30-todo'))[0].done", expected: "true", desc: "marking done is saved" },
        { before: "type('#task', 'Read'); click('#add'); type('#task', 'Gym'); click('#add'); $('#list li .delete').click();", check: "JSON.parse(localStorage.getItem('js30-todo')).length", expected: "1", desc: "deleting is saved" },
        { before: "localStorage.removeItem('js30-todo'); window.firstLoad = loadTasks().length; localStorage.setItem('js30-todo', JSON.stringify([{ text: 'Swim', done: true }]));", check: "firstLoad + ' / ' + loadTasks()[0].text", expected: "0 / Swim", desc: "loadTasks() returns [] or the saved tasks" },
      ],
      solutions: [
        { name: "save + load", code: c`<style>
  .done span { text-decoration: line-through; color: #999; }
</style>
<h2>My tasks</h2>
<input id="task" placeholder="New task">
<button id="add">Add</button>
<ul id="list"></ul>
<p id="left">0 tasks left</p>

<script>
${TODO_LOGIC}

    const KEY = "js30-todo";
    function loadTasks() {
      const saved = localStorage.getItem(KEY);
      return saved === null ? [] : JSON.parse(saved);
    }
    function saveTasks() {
      localStorage.setItem(KEY, JSON.stringify(tasks));
    }

    let tasks = loadTasks();
    const box = document.querySelector("#task");
    const listEl = document.querySelector("#list");
    const leftEl = document.querySelector("#left");

    function update() {
      saveTasks();
      render();
    }

    function render() {
      listEl.innerHTML = "";
      tasks.forEach((task, i) => {
        const li = document.createElement("li");
        if (task.done) li.classList.add("done");
        const span = document.createElement("span");
        span.textContent = task.text;
        span.addEventListener("click", () => { toggleTask(tasks, i); update(); });
        const del = document.createElement("button");
        del.textContent = "✕";
        del.className = "delete";
        del.addEventListener("click", () => { removeTask(tasks, i); update(); });
        li.append(span, del);
        listEl.append(li);
      });
      const n = countLeft(tasks);
      leftEl.textContent = ¦#{n} #{n === 1 ? "task" : "tasks"} left¦;
    }

    function addFromBox() {
      addTask(tasks, box.value);
      box.value = "";
      update();
    }
    document.querySelector("#add").addEventListener("click", addFromBox);
    box.addEventListener("keydown", e => {
      if (e.key === "Enter") addFromBox();
    });

    render();
</script>`, note: "<code>localStorage</code> only keeps text, so <code>JSON.stringify</code> turns the array into text and <code>JSON.parse</code> turns it back. Try it in the preview: add tasks, press Run again — they are still there." },
      ] },
    { id: "todo30-m3", track: "todo", lvl: "fire", web: true, height: 360, title: "Milestone 6: clear finished tasks and polish", prompt: "<p>Last features:</p><ul><li>A <code>&lt;button id=\"clear\"&gt;Clear done&lt;/button&gt;</code> removes every task that is done (and saves).</li><li>Polish it with a <code>&lt;style&gt;</code>: a card in the middle, a comfortable font, bigger buttons. Make it a list you would really use for homework.</li></ul>",
      starter: c`<!-- paste your Milestone 5 page here and add Clear done and some style -->
`,
      hint: "<code>tasks = tasks.filter(task =&gt; !task.done);</code> keeps only the unfinished tasks — that is why <code>tasks</code> must be <code>let</code>, not <code>const</code>. Then save and render.",
      tests: [
        { before: "['A', 'B', 'C'].forEach(t => { type('#task', t); click('#add'); }); document.querySelectorAll('#list li span')[0].click(); document.querySelectorAll('#list li span')[2].click(); click('#clear');", check: "[...document.querySelectorAll('#list li span')].map(s => s.textContent).join(',') + ' / ' + text('#left')", expected: "B / 1 task left", desc: "Clear done keeps only unfinished tasks" },
        { before: "['A', 'B'].forEach(t => { type('#task', t); click('#add'); }); $('#list li span').click(); click('#clear');", check: "JSON.parse(localStorage.getItem('js30-todo')).map(t => t.text).join(',')", expected: "B", desc: "clearing is saved" },
        { before: "['A', 'B'].forEach(t => { type('#task', t); click('#add'); }); click('#clear');", check: "count('#list li')", expected: "2", desc: "nothing done: nothing is removed" },
      ],
      solutions: [
        { name: "Finished to-do app", code: c`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #eef2ef; color: #2e3a33; }
    .card { max-width: 340px; margin: 16px auto; padding: 16px 18px; background: #fbfcfa; border-radius: 14px; box-shadow: 0 2px 10px #0001; }
    #task { width: 65%; padding: 8px; font-size: 1rem; border: 1px solid #c5d0c8; border-radius: 8px; }
    button { padding: 8px 12px; font-size: 1rem; border: 0; border-radius: 8px; background: #5f9a74; color: white; cursor: pointer; }
    ul { list-style: none; padding: 0; }
    li { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid #e3e9e5; }
    li span { cursor: pointer; }
    .done span { text-decoration: line-through; color: #9aa59e; }
    .delete { background: none; color: #b5735f; padding: 2px 8px; }
    #clear { background: #c9a76b; }
  </style>
</head>
<body>
<div class="card">
  <h2>My tasks</h2>
  <input id="task" placeholder="New task">
  <button id="add">Add</button>
  <ul id="list"></ul>
  <p id="left">0 tasks left</p>
  <button id="clear">Clear done</button>
</div>

<script>
${TODO_LOGIC}

    const KEY = "js30-todo";
    function loadTasks() {
      const saved = localStorage.getItem(KEY);
      return saved === null ? [] : JSON.parse(saved);
    }

    let tasks = loadTasks();
    const box = document.querySelector("#task");
    const listEl = document.querySelector("#list");
    const leftEl = document.querySelector("#left");

    function update() {
      localStorage.setItem(KEY, JSON.stringify(tasks));
      render();
    }

    function render() {
      listEl.innerHTML = "";
      tasks.forEach((task, i) => {
        const li = document.createElement("li");
        if (task.done) li.classList.add("done");
        const span = document.createElement("span");
        span.textContent = task.text;
        span.addEventListener("click", () => { toggleTask(tasks, i); update(); });
        const del = document.createElement("button");
        del.textContent = "✕";
        del.className = "delete";
        del.addEventListener("click", () => { removeTask(tasks, i); update(); });
        li.append(span, del);
        listEl.append(li);
      });
      const n = countLeft(tasks);
      leftEl.textContent = ¦#{n} #{n === 1 ? "task" : "tasks"} left¦;
    }

    function addFromBox() {
      addTask(tasks, box.value);
      box.value = "";
      update();
    }
    document.querySelector("#add").addEventListener("click", addFromBox);
    box.addEventListener("keydown", e => {
      if (e.key === "Enter") addFromBox();
    });
    document.querySelector("#clear").addEventListener("click", () => {
      tasks = tasks.filter(task => !task.done);
      update();
    });

    render();
</script>
</body>
</html>`, note: "<code>display: flex</code> with <code>justify-content: space-between</code> puts the text on the left and ✕ on the right of every row. Your app is finished — open it every day for your homework!" },
      ] },
  ],
  extraTitle: "Make it yours",
  extra: [
    { t: "p", html: "<p>Your app works and looks good. Now make it <b>unmistakably yours</b>. A few ideas — choose the ones that excite you:</p>" },
    { t: "table", head: ["Project", "Ideas"], rows: [
      ["🧮 Calculator", "a `%` button; a `±` button that changes the sign; remember the last 5 results in a list; a dark and a light theme"],
      ["❓ Quiz game", "20 questions and pick 5 at random each game; save the best score in `localStorage`; a progress line \"Question 2 of 5\"; colour the right answer green"],
      ["✅ To-do list", "an \"Edit\" button that uses `prompt()`; a filter: All / Active / Done; a counter of tasks finished today; drag your favourite emoji onto important tasks"],
    ] },
    { t: "tip", title: "Take it outside JS30", html: "<p>Copy your finished code into a file called <code>index.html</code> with Notepad (or any editor), save it, and double-click it: it opens in your browser like any website. Send the file to a friend — it works on their computer too.</p>" },
    { t: "h", text: "Final reflection" },
    { t: "p", html: "<p>Take five quiet minutes and answer these in <b>My notes</b> below:</p><ol><li>What was the hardest idea in these 30 days, and when did it finally click?</li><li>Which part of your project are you most proud of?</li><li>What would you add if you had one more week?</li><li>What do you want to build next with JavaScript?</li></ol><p>Thirty days ago you did not know what <code>console.log</code> was, {{name}}. Today you planned, built, tested and polished a real web app. That is exactly what programmers do — just bigger, and every day.</p>" },
  ],
  quiz: [
    { q: "What does this show?", code: c`const marks = [80, 95, 70];
console.log(marks.map(m => m + 5).filter(m => m > 80));`, o: ["`[85, 100]`", "`[100]`", "`[85, 100, 75]`"], a: 0, e: "`map` adds 5 to every mark (`[85, 100, 75]`), then `filter` keeps those above 80." },
    { q: "Why do we use `JSON.stringify` before `localStorage.setItem`?", o: ["To make the data smaller", "`localStorage` can only keep text", "To hide the data"], a: 1, e: "`localStorage` stores strings only. `JSON.stringify` turns arrays and objects into text, and `JSON.parse` turns them back." },
    { q: "What does this show?", code: c`let s = "JS";
s += 30;
console.log(typeof s, s);`, o: ["`string JS30`", "`number 30`", "`string JS 30`"], a: 0, e: "`+` with a string glues: `\"JS\" + 30` is `\"JS30\"`, still a string." },
    { q: "A user leaves an input empty. What is the friendliest reaction of your app?", o: ["Show `NaN`", "Do nothing", "Show a short message saying what to type"], a: 2, e: "Clear messages are a big part of polishing: tell the user what happened and what to do." },
  ],
  cards: [
    { f: "Three things that make an app feel finished?", b: "Clear messages, safe handling of wrong input, and a clean layout — then test it like a user." },
    { f: "Where does the CSS of a one-page app go?", b: "In a `<style>` tag inside `<head>`: `selector { property: value; }`." },
    { f: "How do you save an array in `localStorage`?", b: "`localStorage.setItem(key, JSON.stringify(arr))`, and load it with `JSON.parse(localStorage.getItem(key))`." },
  ],
  remember: [
    "**Week 1:** `console.log`, variables with `let` / `const`, types, operators and template strings.",
    "**Week 2:** decisions with `if` / `else` / `switch`, and loops with `while` and `for`.",
    "**Week 3:** functions and arrow functions, arrays with `map` / `filter` / `find`, and objects.",
    "**Week 4:** HTML, the DOM (`querySelector`, `textContent`, `classList`), events, inputs and forms, creating elements, timers and `localStorage`.",
    "**Projects:** plan first (sees · data · functions · events), build in small milestones, and test after each one.",
    "**Polish:** clear messages, handle wrong input, a little CSS, and test like a user.",
    "Errors are not failure — they are directions. You read them every day for 30 days.",
    "Mark Day 30 complete to unlock your certificate. Then keep building, {{name}}!",
  ],
};
})();
