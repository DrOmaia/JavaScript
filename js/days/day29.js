window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[29] = {
  title: "Capstone: plan and build",
  intro: "Twenty-eight days ago you wrote your first <code>console.log</code>, {{name}}. Today and tomorrow you put everything together and build one real web app of your own. Today you learn how programmers <b>plan</b> a project, then you build its brain (the logic) and the first version of its page. Tomorrow you finish and polish it — and get your certificate.",
  goals: [
    "Plan a project with four questions: what the user sees, what data you keep, which functions, which events",
    "Split a big project into small milestones and test after each one",
    "Write the logic of your app as plain functions and test them in the console",
    "Connect those functions to a first working web page",
  ],
  tracks: [
    { id: "calc", emoji: "🧮", name: "Calculator", desc: "<p><b>Calculator web app.</b> Two numbers and an operator go in, a clean answer comes out — and dividing by zero never breaks it. Good if you like numbers and tidy logic.</p>" },
    { id: "quiz", emoji: "❓", name: "Quiz game", desc: "<p><b>Quiz game web app.</b> Questions with answer buttons, a score, and a result message at the end. Good if you want to make something your friends can play.</p>" },
    { id: "todo", emoji: "✅", name: "To-do list", desc: "<p><b>To-do list web app.</b> Add tasks, tick them off, count what is left, and (tomorrow) save them so they survive a page reload. Good if you want a tool you will really use for homework.</p>" },
  ],
  learn: [
    { t: "h", text: "A big project is many small ones" },
    { t: "p", html: "<p>Imagine you sit down to write a whole calculator in one go: forty lines, then you press Run — and nothing works. Where is the bug? It could be anywhere. Real programmers never work like this. They <b>plan first</b>, then build the project in small pieces, and they <b>test every piece</b> before they add the next one. When something breaks, the bug is almost always in the piece they just added.</p>" },
    { t: "analogy", title: "Building a project is like cooking a big meal", html: "<p>Before you cook Friday lunch for the family, you decide the dishes, check what is in the kitchen, and cook one dish at a time — tasting as you go. You do not throw everything into one pot and hope. A plan is your recipe, a milestone is one dish, and testing is tasting.</p>" },
    { t: "h", text: "Four questions before you write any code" },
    { t: "p", html: "<p>Answer these four questions on paper (or in your notes) first. Each answer turns into a part of your program:</p><ol><li><b>What does the user see?</b> → the HTML: headings, inputs, buttons, a list, a message.</li><li><b>What data do I keep?</b> → variables, arrays and objects: a score, a list of tasks, the questions.</li><li><b>Which functions do the work?</b> → small functions with clear names that take data and return a result.</li><li><b>Which events start the work?</b> → <code>click</code>, <code>keydown</code>, <code>input</code>: what the user does that makes the page react.</li></ol>" },
    { t: "table", head: ["Question", "Example: a canteen order page"], rows: [
      ["What the user sees", "a number box for sandwiches, an **Order** button, a line with the total"],
      ["Data you keep", "`price = 7` (riyals), `orders = []`"],
      ["Functions", "`orderTotal(count, price)` returns the total; `showTotal()` writes it on the page"],
      ["Events", "`click` on the Order button"],
    ] },
    { t: "web", title: "canteen.html", height: 200, code: c`<!-- what the user sees -->
<input id="count" type="number" placeholder="How many sandwiches?">
<button id="order">Order</button>
<p id="total"></p>

<script>
  // data
  const price = 7;

  // functions
  function orderTotal(count, price) {
    return count * price;
  }
  function showTotal() {
    const count = Number(document.querySelector("#count").value);
    document.querySelector("#total").textContent = ¦Total: #{orderTotal(count, price)} riyals¦;
  }

  // events
  document.querySelector("#order").addEventListener("click", showTotal);
</script>`, before: "<p>Here is that plan turned into a page. Find each row of the table in the code — the comments show where.</p>", note: "<p>Type 3 and press Order. Now try an empty box: it says <code>Total: 0 riyals</code>. Not wrong, but not helpful either — tomorrow you will learn to polish cases like this.</p>" },
    { t: "check", q: "You are planning a to-do app. Where does `tasks = [{ text: \"Read\", done: false }]` belong?", o: ["What the user sees", "The data you keep", "The events"], a: 1, e: "The array of task objects is the app's **data**. The page only shows it; the functions change it; the events decide when.", hint: "Is it something on the screen, or something the program remembers?" },
    { t: "h", text: "Logic first, page second" },
    { t: "p", html: "<p>The smartest order is: write the <b>logic</b> (the functions that calculate or change data) as plain JavaScript first and test it in the console with <code>console.log</code>. A function is easy to test there: give it values, look at what comes back. Only when the logic is right do you connect it to buttons and inputs. Then, if the page misbehaves, you know the bug is in the connection, not in the maths.</p>" },
    { t: "code", code: c`function orderTotal(count, price) {
  return count * price;
}

// tests: what I give it → what I expect
console.log(orderTotal(3, 7));  // expect 21
console.log(orderTotal(0, 7));  // expect 0
console.log(orderTotal(10, 7)); // expect 70`, before: "<p>Look at how the function is tested: every <code>console.log</code> has a comment with the answer we expect. If the output and the comment ever disagree, we found a bug.</p>", note: "<p>Three tests with different values — including an unusual one (zero). Testing the strange cases is where bugs hide.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`function orderTotal(count, price) {`, "The function takes the data it needs as <b>parameters</b>. It does not read the page — that makes it easy to test."],
      [c`  return count * price;`, "It <b>returns</b> the result instead of printing it, so other code (later: the page) can use it."],
      [c`console.log(orderTotal(3, 7));  // expect 21`, "A tiny test: call it, show the result, compare with the comment."],
    ] },
    { t: "h", text: "Milestones: build a little, test, repeat" },
    { t: "p", html: "<p>A <b>milestone</b> is a small step that ends with something you can test. For every project today you will do three:</p><ul><li><b>Milestone 1</b> — the core logic as functions, tested in the console.</li><li><b>Milestone 2</b> — more logic (results, scoring, counting), also tested in the console.</li><li><b>Milestone 3</b> — the first web page that uses those functions.</li></ul><p>Each milestone has automatic checks. Green checks mean you can move on with confidence.</p>" },
    { t: "check", q: "You added a new function and now nothing works. You tested everything before adding it. Where is the bug most likely?", o: ["In the HTML from yesterday", "In the code you just added", "In the browser"], a: 1, e: "Everything worked before the last change, so the change is the first place to look. This is why testing after each small step is so powerful.", hint: "What was different between \"working\" and \"broken\"?" },
    { t: "turn", level: "Easy", q: "Your app must react when the user presses **Enter** in an input. Which event do you listen for?", answers: ["keydown", "\"keydown\"", "keyup"], e: "`keydown` fires when a key is pressed; `event.key` tells you which one (`\"Enter\"`).", placeholder: "e.g. click" },
    { t: "steps", web: true, title: "Planning a football score counter", problem: "<p>Plan and build a page for a match: two teams, each with a score and a <b>+1</b> button, and a <b>Reset</b> button.</p>",
      steps: [
        { html: "<p><b>What the user sees.</b> Two team names, two scores, a +1 button for each, one Reset button. Every element JavaScript needs gets an <code>id</code>.</p>", code: c`<h2>Hilal <span id="home">0</span> - <span id="away">0</span> Nassr</h2>
<button id="homeGoal">Hilal +1</button>
<button id="awayGoal">Nassr +1</button>
<button id="reset">Reset</button>` },
        { html: "<p><b>The data.</b> Two numbers. They live in variables — the page only <i>shows</i> them.</p>", code: c`let homeScore = 0;
let awayScore = 0;` },
        { html: "<p><b>The functions.</b> One function writes the data onto the page. Keeping it in one place means we never forget to update something.</p>", code: c`function render() {
  document.querySelector("#home").textContent = homeScore;
  document.querySelector("#away").textContent = awayScore;
}` },
        { html: "<p><b>The events.</b> Each button changes the data, then calls <code>render()</code>. Test after adding each one: click it and watch.</p>", code: c`document.querySelector("#homeGoal").addEventListener("click", () => {
  homeScore++;
  render();
});` },
        { html: "<p><b>Last milestone.</b> Add the second team's button and Reset the same way, and test them one by one.</p>" },
      ],
      code: c`<!DOCTYPE html>
<html>
<body>
  <h2>Hilal <span id="home">0</span> - <span id="away">0</span> Nassr</h2>
  <button id="homeGoal">Hilal +1</button>
  <button id="awayGoal">Nassr +1</button>
  <button id="reset">Reset</button>

  <script>
    // data
    let homeScore = 0;
    let awayScore = 0;

    // show the data on the page
    function render() {
      document.querySelector("#home").textContent = homeScore;
      document.querySelector("#away").textContent = awayScore;
    }

    // events
    document.querySelector("#homeGoal").addEventListener("click", () => {
      homeScore++;
      render();
    });
    document.querySelector("#awayGoal").addEventListener("click", () => {
      awayScore++;
      render();
    });
    document.querySelector("#reset").addEventListener("click", () => {
      homeScore = 0;
      awayScore = 0;
      render();
    });
  </script>
</body>
</html>` },
    { t: "tip", title: "When you get stuck", html: "<p>1) Read the error in the console — it names the line. 2) Add <code>console.log</code> to see what a variable really holds. 3) Go back to your plan: is the data right, is the function right, is the event connected? 4) Look at the hint, and only then at the solution — and type it yourself rather than copying.</p>" },
    { t: "h", text: "Pick your project" },
    { t: "p", html: "<p>Below, choose <b>one</b> of three projects: a calculator, a quiz game or a to-do list. All three use the same skills; pick the one you would enjoy showing to someone. You can switch later — your code for each one is saved. Whatever you pick today, you finish tomorrow, and its name goes on your certificate.</p>" },
  ],
  exercises: [
    // ---------- Calculator ----------
    { id: "calc-m1", track: "calc", lvl: "seed", title: "Milestone 1: the calculate function", prompt: "<p>Write the brain of the calculator: a function <code>calculate(a, op, b)</code> that returns:</p><ul><li><code>a + b</code>, <code>a - b</code>, <code>a * b</code> or <code>a / b</code> when <code>op</code> is <code>\"+\"</code>, <code>\"-\"</code>, <code>\"*\"</code> or <code>\"/\"</code>;</li><li>the text <code>\"Cannot divide by 0\"</code> when <code>op</code> is <code>\"/\"</code> and <code>b</code> is 0;</li><li>the text <code>\"Unknown operator\"</code> for any other <code>op</code>.</li></ul><p>Return the result — do not print it. The checks call your function with different values.</p>",
      starter: c`function calculate(a, op, b) {
  // your code here
}

// try it:
console.log(calculate(7, "+", 5)); // expect 12
console.log(calculate(5, "/", 0)); // expect Cannot divide by 0`,
      hint: "Check the division-by-zero case <b>before</b> you divide. An <code>if / else if</code> chain or a <code>switch</code> on <code>op</code> both work.",
      tests: [
        { after: c`console.log(calculate(7, "+", 5));
console.log(calculate(7, "-", 10));`, expected: "12\n-3" },
        { after: c`console.log(calculate(6, "*", 4));
console.log(calculate(9, "/", 2));`, expected: "24\n4.5" },
        { after: c`console.log(calculate(5, "/", 0));
console.log(calculate(2, "^", 3));`, expected: "Cannot divide by 0\nUnknown operator" },
      ],
      solutions: [
        { name: "if / else if", code: c`function calculate(a, op, b) {
  if (op === "+") {
    return a + b;
  } else if (op === "-") {
    return a - b;
  } else if (op === "*") {
    return a * b;
  } else if (op === "/") {
    if (b === 0) {
      return "Cannot divide by 0";
    }
    return a / b;
  }
  return "Unknown operator";
}`, note: "Each <code>return</code> ends the function at once, so the last line only runs when no operator matched." },
        { name: "switch", code: c`function calculate(a, op, b) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? "Cannot divide by 0" : a / b;
    default: return "Unknown operator";
  }
}`, note: "A <code>switch</code> fits well when one value (<code>op</code>) is compared with many options. <code>return</code> replaces <code>break</code> here." },
      ] },
    { id: "calc-m2", track: "calc", lvl: "star", title: "Milestone 2: nice results", prompt: "<p>Computers sometimes give ugly answers: <code>0.1 + 0.2</code> is <code>0.30000000000000004</code>. Add two functions under your <code>calculate</code> (copy it from Milestone 1):</p><ul><li><code>roundNice(x)</code> returns <code>x</code> rounded to at most 4 decimals (<code>0.30000000000000004</code> → <code>0.3</code>, <code>2/3</code> → <code>0.6667</code>).</li><li><code>formatResult(a, op, b)</code> returns a full line like <code>\"7 + 5 = 12\"</code> using <code>calculate</code> and <code>roundNice</code>. If <code>calculate</code> returned a text (an error), return <code>\"Error: \"</code> + that text, e.g. <code>\"Error: Cannot divide by 0\"</code>.</li></ul>",
      starter: c`// 1) paste your calculate function from Milestone 1 here

function roundNice(x) {
  // your code here
}

function formatResult(a, op, b) {
  // your code here
}

console.log(formatResult(1, "/", 3)); // expect 1 / 3 = 0.3333`,
      hint: "<code>Math.round(x * 10000) / 10000</code> keeps 4 decimals. To spot an error, test <code>typeof result === \"string\"</code>. A template string builds the line: <code>`${a} ${op} ${b} = ...`</code>.",
      tests: [
        { after: c`console.log(roundNice(0.1 + 0.2), roundNice(2 / 3), roundNice(5));`, expected: "0.3 0.6667 5" },
        { after: c`console.log(formatResult(7, "+", 5));
console.log(formatResult(3, "*", 2.5));`, expected: "7 + 5 = 12\n3 * 2.5 = 7.5" },
        { after: c`console.log(formatResult(1, "/", 3));
console.log(formatResult(4, "/", 0));`, expected: "1 / 3 = 0.3333\nError: Cannot divide by 0" },
        { after: c`console.log(formatResult(2, "%", 3));`, expected: "Error: Unknown operator" },
      ],
      solutions: [
        { name: "Step by step", code: c`function calculate(a, op, b) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? "Cannot divide by 0" : a / b;
  return "Unknown operator";
}

function roundNice(x) {
  return Math.round(x * 10000) / 10000;
}

function formatResult(a, op, b) {
  const result = calculate(a, op, b);
  if (typeof result === "string") {
    return "Error: " + result;
  }
  return ¦#{a} #{op} #{b} = #{roundNice(result)}¦;
}`, note: "<code>formatResult</code> does not repeat any maths — it reuses <code>calculate</code> and <code>roundNice</code>. Small functions that use each other are the heart of a good program." },
        { name: "Ternary", code: c`function calculate(a, op, b) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? "Cannot divide by 0" : a / b;
    default: return "Unknown operator";
  }
}

const roundNice = x => Math.round(x * 10000) / 10000;

function formatResult(a, op, b) {
  const result = calculate(a, op, b);
  return typeof result === "string" ? ¦Error: #{result}¦ : ¦#{a} #{op} #{b} = #{roundNice(result)}¦;
}`, note: "Shorter, with an arrow function and the ternary operator. Both ways are fine — pick the one you can read easily." },
      ] },
    { id: "calc-m3", track: "calc", lvl: "fire", web: true, title: "Milestone 3: the first calculator page", height: 300, prompt: "<p>Now give your logic a face. The page has two number inputs <code>#a</code> and <code>#b</code>, four buttons <code>#plus</code>, <code>#minus</code>, <code>#times</code>, <code>#divide</code>, and a paragraph <code>#result</code>.</p><p>When a button is clicked, read both numbers and show <code>formatResult(...)</code> in <code>#result</code> (e.g. <code>7 + 5 = 12</code>). If one of the boxes is empty, show <code>Please type two numbers</code> instead.</p>",
      starter: c`<h2>Calculator</h2>
<input id="a" type="number" placeholder="first number">
<input id="b" type="number" placeholder="second number">
<div>
  <button id="plus">+</button>
  <button id="minus">-</button>
  <button id="times">*</button>
  <button id="divide">/</button>
</div>
<p id="result"></p>

<script>
  // 1) paste calculate, roundNice and formatResult here

  // 2) find the elements

  // 3) one function that reads the boxes and shows the result

  // 4) connect the four buttons
</script>`,
      hint: "<code>Number(\"\")</code> is <code>0</code>, not an error! So test <code>box.value.trim() === \"\"</code> before converting. Write one function <code>run(op)</code> and call it from each button: <code>() =&gt; run(\"+\")</code>.",
      tests: [
        { before: "type('#a', '7'); type('#b', '5'); click('#plus');", check: "text('#result')", expected: "7 + 5 = 12", desc: "7 + 5 shows 7 + 5 = 12" },
        { before: "type('#a', '9'); type('#b', '2'); click('#divide');", check: "text('#result')", expected: "9 / 2 = 4.5", desc: "9 / 2 shows 4.5" },
        { before: "type('#a', '5'); type('#b', '0'); click('#divide');", check: "text('#result')", expected: "Error: Cannot divide by 0", desc: "dividing by 0 shows the error" },
        { before: "type('#a', '4'); click('#times');", check: "text('#result')", expected: "Please type two numbers", desc: "an empty box asks for two numbers" },
      ],
      solutions: [
        { name: "One run(op) function", code: c`<h2>Calculator</h2>
<input id="a" type="number" placeholder="first number">
<input id="b" type="number" placeholder="second number">
<div>
  <button id="plus">+</button>
  <button id="minus">-</button>
  <button id="times">*</button>
  <button id="divide">/</button>
</div>
<p id="result"></p>

<script>
  function calculate(a, op, b) {
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "*") return a * b;
    if (op === "/") return b === 0 ? "Cannot divide by 0" : a / b;
    return "Unknown operator";
  }
  function roundNice(x) {
    return Math.round(x * 10000) / 10000;
  }
  function formatResult(a, op, b) {
    const result = calculate(a, op, b);
    if (typeof result === "string") return "Error: " + result;
    return ¦#{a} #{op} #{b} = #{roundNice(result)}¦;
  }

  const aBox = document.querySelector("#a");
  const bBox = document.querySelector("#b");
  const resultEl = document.querySelector("#result");

  function run(op) {
    if (aBox.value.trim() === "" || bBox.value.trim() === "") {
      resultEl.textContent = "Please type two numbers";
      return;
    }
    resultEl.textContent = formatResult(Number(aBox.value), op, Number(bBox.value));
  }

  document.querySelector("#plus").addEventListener("click", () => run("+"));
  document.querySelector("#minus").addEventListener("click", () => run("-"));
  document.querySelector("#times").addEventListener("click", () => run("*"));
  document.querySelector("#divide").addEventListener("click", () => run("/"));
</script>`, note: "The logic from Milestones 1 and 2 did not change at all — the page only reads the boxes, calls it, and shows the answer." },
        { name: "Loop over the buttons", code: c`<h2>Calculator</h2>
<input id="a" type="number" placeholder="first number">
<input id="b" type="number" placeholder="second number">
<div>
  <button id="plus" class="op">+</button>
  <button id="minus" class="op">-</button>
  <button id="times" class="op">*</button>
  <button id="divide" class="op">/</button>
</div>
<p id="result"></p>

<script>
  function calculate(a, op, b) {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return b === 0 ? "Cannot divide by 0" : a / b;
      default: return "Unknown operator";
    }
  }
  const roundNice = x => Math.round(x * 10000) / 10000;
  function formatResult(a, op, b) {
    const result = calculate(a, op, b);
    return typeof result === "string" ? ¦Error: #{result}¦ : ¦#{a} #{op} #{b} = #{roundNice(result)}¦;
  }

  const aBox = document.querySelector("#a");
  const bBox = document.querySelector("#b");
  const resultEl = document.querySelector("#result");

  // every operator button uses its own text as the operator
  document.querySelectorAll(".op").forEach(btn => {
    btn.addEventListener("click", () => {
      if (aBox.value.trim() === "" || bBox.value.trim() === "") {
        resultEl.textContent = "Please type two numbers";
      } else {
        resultEl.textContent = formatResult(Number(aBox.value), btn.textContent, Number(bBox.value));
      }
    });
  });
</script>`, note: "The buttons share a class, and each one's text (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>) is exactly the operator <code>calculate</code> expects — so one loop connects all four." },
      ] },
    // ---------- Quiz game ----------
    { id: "quiz-m1", track: "quiz", lvl: "seed", title: "Milestone 1: questions as data", prompt: "<p>A quiz is mostly <b>data</b>. Make an array <code>questions</code> with <b>at least 3</b> question objects. Each object has:</p><ul><li><code>q</code> — the question text,</li><li><code>options</code> — an array of 2 or more possible answers (strings),</li><li><code>answer</code> — the correct one, written exactly as in <code>options</code>.</li></ul><p>Then write <code>checkAnswer(question, choice)</code> that returns <code>true</code> if <code>choice</code> is the right answer of that question, otherwise <code>false</code>.</p>",
      starter: c`const questions = [
  { q: "What is 5 + 7?", options: ["10", "12", "13"], answer: "12" },
  // add at least two more questions
];

function checkAnswer(question, choice) {
  // your code here
}

console.log(checkAnswer(questions[0], "12")); // expect true`,
      hint: "<code>checkAnswer</code> needs only one line: compare <code>choice</code> with <code>question.answer</code> using <code>===</code> and return the result.",
      tests: [
        { after: c`console.log(questions.length >= 3);`, expected: "true" },
        { after: c`console.log(questions.every(x => typeof x.q === "string" && x.options.length >= 2 && x.options.includes(x.answer)));`, expected: "true" },
        { after: c`const testQ = { q: "Capital of Saudi Arabia?", options: ["Jeddah", "Riyadh"], answer: "Riyadh" };
console.log(checkAnswer(testQ, "Riyadh"), checkAnswer(testQ, "Jeddah"));`, expected: "true false" },
      ],
      solutions: [
        { name: "Return the comparison", code: c`const questions = [
  { q: "What is 5 + 7?", options: ["10", "12", "13"], answer: "12" },
  { q: "Which planet is the biggest?", options: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
  { q: "How many minutes are in 2 hours?", options: ["120", "100", "200"], answer: "120" },
];

function checkAnswer(question, choice) {
  return choice === question.answer;
}`, note: "<code>choice === question.answer</code> is already <code>true</code> or <code>false</code>, so we return it directly — no <code>if</code> needed." },
        { name: "Arrow + if", code: c`const questions = [
  { q: "Which language makes a page react to clicks?", options: ["HTML", "CSS", "JavaScript"], answer: "JavaScript" },
  { q: "What does typeof 42 give?", options: ["number", "string"], answer: "number" },
  { q: "How many days are in a week?", options: ["5", "7", "10"], answer: "7" },
  { q: "Which is a loop?", options: ["for", "if", "const"], answer: "for" },
];

const checkAnswer = (question, choice) => {
  if (choice === question.answer) {
    return true;
  }
  return false;
};`, note: "Longer but very clear. Your questions can be about anything — football, science, your school." },
      ] },
    { id: "quiz-m2", track: "quiz", lvl: "star", title: "Milestone 2: scoring and the result message", prompt: "<p>Keep <code>checkAnswer</code> from Milestone 1 and add two functions:</p><ul><li><code>scoreQuiz(questions, answers)</code> — <code>answers</code> is an array of the player's choices in the same order as <code>questions</code>. Return how many are correct.</li><li><code>resultMessage(score, total)</code> — work out the percent, rounded to a whole number, and return<br><code>\"Excellent! 4/5 (80%)\"</code> when the percent is 80 or more,<br><code>\"Good job! 3/5 (60%)\"</code> when it is 50 or more,<br><code>\"Keep practising! 1/5 (20%)\"</code> otherwise.</li></ul>",
      starter: c`function checkAnswer(question, choice) {
  return choice === question.answer;
}

function scoreQuiz(questions, answers) {
  // your code here
}

function resultMessage(score, total) {
  // your code here
}

console.log(resultMessage(4, 5)); // expect Excellent! 4/5 (80%)`,
      hint: "In <code>scoreQuiz</code>, loop with an index <code>i</code> and compare <code>questions[i]</code> with <code>answers[i]</code>. For the percent: <code>Math.round(score / total * 100)</code>. Check the biggest case (80) first.",
      tests: [
        { after: c`const qs = [
  { q: "1 + 1?", options: ["2", "3"], answer: "2" },
  { q: "2 * 3?", options: ["5", "6"], answer: "6" },
  { q: "10 - 4?", options: ["6", "7"], answer: "6" },
];
console.log(scoreQuiz(qs, ["2", "6", "6"]), scoreQuiz(qs, ["3", "6", "7"]), scoreQuiz(qs, []));`, expected: "3 1 0" },
        { after: c`console.log(resultMessage(4, 5));
console.log(resultMessage(5, 5));`, expected: "Excellent! 4/5 (80%)\nExcellent! 5/5 (100%)" },
        { after: c`console.log(resultMessage(2, 3));
console.log(resultMessage(1, 2));`, expected: "Good job! 2/3 (67%)\nGood job! 1/2 (50%)" },
        { after: c`console.log(resultMessage(1, 4));
console.log(resultMessage(0, 3));`, expected: "Keep practising! 1/4 (25%)\nKeep practising! 0/3 (0%)" },
      ],
      solutions: [
        { name: "for loop + if / else", code: c`function checkAnswer(question, choice) {
  return choice === question.answer;
}

function scoreQuiz(questions, answers) {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (checkAnswer(questions[i], answers[i])) {
      score++;
    }
  }
  return score;
}

function resultMessage(score, total) {
  const percent = Math.round(score / total * 100);
  let words;
  if (percent >= 80) {
    words = "Excellent!";
  } else if (percent >= 50) {
    words = "Good job!";
  } else {
    words = "Keep practising!";
  }
  return ¦#{words} #{score}/#{total} (#{percent}%)¦;
}`, note: "When <code>answers</code> is shorter than <code>questions</code>, <code>answers[i]</code> is <code>undefined</code>, which never equals an answer — so a missing answer simply counts as wrong." },
        { name: "filter", code: c`const checkAnswer = (question, choice) => choice === question.answer;

function scoreQuiz(questions, answers) {
  return questions.filter((question, i) => checkAnswer(question, answers[i])).length;
}

function resultMessage(score, total) {
  const percent = Math.round(score / total * 100);
  const words = percent >= 80 ? "Excellent!" : percent >= 50 ? "Good job!" : "Keep practising!";
  return ¦#{words} #{score}/#{total} (#{percent}%)¦;
}`, note: "<code>filter</code> keeps the questions answered correctly (its callback also receives the index <code>i</code>), and <code>.length</code> counts them." },
      ] },
    { id: "quiz-m3", track: "quiz", lvl: "fire", web: true, title: "Milestone 3: the first quiz page", height: 300, prompt: "<p>Show the <b>first</b> question on a page. The starter has the HTML and three questions (keep them — the checks use them).</p><ul><li>Write the question text into <code>#question</code>.</li><li>For each option, create a <code>&lt;button&gt;</code> with the option as its text and add it to <code>#options</code>.</li><li>Clicking an option: if it is right, show <code>Correct!</code> in <code>#feedback</code> and add 1 to the score; if not, show <code>Wrong! The answer is 12</code> (with the real answer).</li><li><code>#score</code> shows <code>Score: 0</code>, then <code>Score: 1</code>, …</li><li>After one answer, all option buttons are disabled, so nobody can click twice.</li></ul>",
      starter: c`<p id="score">Score: 0</p>
<h2 id="question"></h2>
<div id="options"></div>
<p id="feedback"></p>

<script>
  const questions = [
    { q: "What is 5 + 7?", options: ["10", "12", "13"], answer: "12" },
    { q: "Which planet is the biggest?", options: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
    { q: "How many minutes are in 2 hours?", options: ["120", "100", "200"], answer: "120" },
  ];
  let score = 0;

  function checkAnswer(question, choice) {
    return choice === question.answer;
  }

  // your code here: show questions[0] and its option buttons
</script>`,
      hint: "Loop over <code>questions[0].options</code> with <code>forEach</code>. Inside: <code>document.createElement(\"button\")</code>, set its <code>textContent</code>, add a click listener, then <code>append</code> it to <code>#options</code>. To lock the buttons: <code>btn.disabled = true</code> for each button in <code>#options</code>.",
      tests: [
        { check: "text('#question') + ' / ' + count('#options button')", expected: "What is 5 + 7? / 3", desc: "the first question and its 3 buttons are shown" },
        { before: "[...document.querySelectorAll('#options button')].find(b => b.textContent === '12').click();", check: "text('#feedback') + ' / ' + text('#score')", expected: "Correct! / Score: 1", desc: "the right answer says Correct! and adds 1" },
        { before: "[...document.querySelectorAll('#options button')].find(b => b.textContent === '10').click();", check: "text('#feedback') + ' / ' + text('#score')", expected: "Wrong! The answer is 12 / Score: 0", desc: "a wrong answer shows the right one" },
        { before: "const b = [...document.querySelectorAll('#options button')].find(b => b.textContent === '12'); b.click(); b.click();", check: "text('#score')", expected: "Score: 1", desc: "clicking twice does not count twice" },
      ],
      solutions: [
        { name: "Build the buttons", code: c`<p id="score">Score: 0</p>
<h2 id="question"></h2>
<div id="options"></div>
<p id="feedback"></p>

<script>
  const questions = [
    { q: "What is 5 + 7?", options: ["10", "12", "13"], answer: "12" },
    { q: "Which planet is the biggest?", options: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
    { q: "How many minutes are in 2 hours?", options: ["120", "100", "200"], answer: "120" },
  ];
  let score = 0;

  function checkAnswer(question, choice) {
    return choice === question.answer;
  }

  const questionEl = document.querySelector("#question");
  const optionsEl = document.querySelector("#options");
  const feedbackEl = document.querySelector("#feedback");
  const scoreEl = document.querySelector("#score");

  function answer(question, choice) {
    // lock all option buttons
    optionsEl.querySelectorAll("button").forEach(btn => {
      btn.disabled = true;
    });
    if (checkAnswer(question, choice)) {
      score++;
      feedbackEl.textContent = "Correct!";
    } else {
      feedbackEl.textContent = ¦Wrong! The answer is #{question.answer}¦;
    }
    scoreEl.textContent = ¦Score: #{score}¦;
  }

  function showQuestion(question) {
    questionEl.textContent = question.q;
    optionsEl.innerHTML = "";
    question.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.addEventListener("click", () => answer(question, option));
      optionsEl.append(btn);
    });
  }

  showQuestion(questions[0]);
</script>`, note: "<code>showQuestion</code> takes any question, so tomorrow showing question 2, 3, … is easy. A disabled button ignores clicks — that is what stops double scoring." },
      ] },
    // ---------- To-do list ----------
    { id: "todo-m1", track: "todo", lvl: "seed", title: "Milestone 1: add tasks and count them", prompt: "<p>The data of a to-do app is an array of task objects like <code>{ text: \"Read chapter 3\", done: false }</code>. Write two functions that work on such an array:</p><ul><li><code>addTask(tasks, text)</code> — removes spaces at the start and end of <code>text</code>, and if something is left, pushes <code>{ text: ..., done: false }</code> into <code>tasks</code>. Empty text is ignored.</li><li><code>countLeft(tasks)</code> — returns how many tasks are <b>not</b> done.</li></ul>",
      starter: c`function addTask(tasks, text) {
  // your code here
}

function countLeft(tasks) {
  // your code here
}

const tasks = [];
addTask(tasks, "Read chapter 3");
console.log(tasks); // expect [{text: 'Read chapter 3', done: false}]`,
      hint: "<code>text.trim()</code> removes the outside spaces. If the result is <code>\"\"</code>, just <code>return</code>. For <code>countLeft</code>: <code>filter</code> the tasks whose <code>done</code> is <code>false</code> and take <code>.length</code> — or count with a loop.",
      tests: [
        { after: c`const testList = [];
addTask(testList, "Read chapter 3");
addTask(testList, "Gym");
console.log(testList.length, countLeft(testList));
console.log(testList[0]);`, expected: "2 2\n{text: 'Read chapter 3', done: false}" },
        { after: c`const testList = [];
addTask(testList, "   ");
addTask(testList, "  Math homework  ");
console.log(testList.length, testList[0].text);`, expected: "1 Math homework" },
        { after: c`const testList = [{ text: "A", done: true }, { text: "B", done: false }, { text: "C", done: false }];
console.log(countLeft(testList), countLeft([]));`, expected: "2 0" },
      ],
      solutions: [
        { name: "trim + filter", code: c`function addTask(tasks, text) {
  const clean = text.trim();
  if (clean === "") {
    return;
  }
  tasks.push({ text: clean, done: false });
}

function countLeft(tasks) {
  return tasks.filter(task => !task.done).length;
}`, note: "The function changes the array it receives — arrays are passed by reference, so the caller's array grows too." },
        { name: "Loop to count", code: c`function addTask(tasks, text) {
  const clean = text.trim();
  if (clean !== "") {
    tasks.push({ text: clean, done: false });
  }
}

function countLeft(tasks) {
  let left = 0;
  for (const task of tasks) {
    if (task.done === false) {
      left++;
    }
  }
  return left;
}`, note: "A counter and a <code>for...of</code> loop do the same job as <code>filter(...).length</code>." },
      ] },
    { id: "todo-m2", track: "todo", lvl: "star", title: "Milestone 2: toggle, remove and show", prompt: "<p>Add three more functions (keep the ones from Milestone 1 above them):</p><ul><li><code>toggleTask(tasks, index)</code> — flips <code>done</code> of the task at <code>index</code> (<code>false</code> → <code>true</code> → <code>false</code>).</li><li><code>removeTask(tasks, index)</code> — removes the task at <code>index</code> from the array.</li><li><code>taskLine(task)</code> — returns <code>\"[x] Read\"</code> for a done task and <code>\"[ ] Read\"</code> for one that is not done.</li></ul>",
      starter: c`function addTask(tasks, text) {
  const clean = text.trim();
  if (clean !== "") tasks.push({ text: clean, done: false });
}
function countLeft(tasks) {
  return tasks.filter(task => !task.done).length;
}

function toggleTask(tasks, index) {
  // your code here
}

function removeTask(tasks, index) {
  // your code here
}

function taskLine(task) {
  // your code here
}`,
      hint: "Flip a boolean with <code>!</code>: <code>tasks[index].done = !tasks[index].done</code>. <code>tasks.splice(index, 1)</code> cuts out one item at that position (Day 18).",
      tests: [
        { after: c`const testList = [{ text: "Read", done: false }, { text: "Gym", done: false }];
toggleTask(testList, 1);
console.log(testList[1].done, countLeft(testList));
toggleTask(testList, 1);
console.log(testList[1].done, countLeft(testList));`, expected: "true 1\nfalse 2" },
        { after: c`const testList = [{ text: "Read", done: false }, { text: "Gym", done: true }, { text: "Swim", done: false }];
removeTask(testList, 0);
console.log(testList.length, testList[0].text, testList[1].text);`, expected: "2 Gym Swim" },
        { after: c`console.log(taskLine({ text: "Read", done: true }));
console.log(taskLine({ text: "Gym", done: false }));`, expected: "[x] Read\n[ ] Gym" },
      ],
      solutions: [
        { name: "Direct", code: c`function addTask(tasks, text) {
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
}

function taskLine(task) {
  const box = task.done ? "[x]" : "[ ]";
  return ¦#{box} #{task.text}¦;
}`, note: "Each function does one small job. Tomorrow the page will call them when the user clicks." },
        { name: "With if", code: c`function addTask(tasks, text) {
  const clean = text.trim();
  if (clean !== "") tasks.push({ text: clean, done: false });
}
function countLeft(tasks) {
  return tasks.filter(task => !task.done).length;
}

function toggleTask(tasks, index) {
  const task = tasks[index];
  if (task.done) {
    task.done = false;
  } else {
    task.done = true;
  }
}

function removeTask(tasks, index) {
  tasks.splice(index, 1);
}

function taskLine(task) {
  if (task.done) {
    return "[x] " + task.text;
  }
  return "[ ] " + task.text;
}`, note: "<code>const task = tasks[index]</code> points to the same object as in the array, so changing <code>task.done</code> changes the task inside the array." },
      ] },
    { id: "todo-m3", track: "todo", lvl: "fire", web: true, title: "Milestone 3: the first to-do page", height: 300, prompt: "<p>Build the first page. It has an input <code>#task</code>, a button <code>#add</code>, a list <code>&lt;ul id=\"list\"&gt;</code> and a paragraph <code>#left</code>.</p><ul><li>Clicking <b>Add</b> adds the typed text as a task (use <code>addTask</code>), clears the input, and shows every task as an <code>&lt;li&gt;</code> holding its text.</li><li>Empty text adds nothing.</li><li><code>#left</code> shows <code>0 tasks left</code>, <code>1 task left</code>, <code>2 tasks left</code>, … (note: <i>task</i> for exactly 1).</li></ul>",
      starter: c`<h2>My tasks</h2>
<input id="task" placeholder="New task">
<button id="add">Add</button>
<ul id="list"></ul>
<p id="left">0 tasks left</p>

<script>
  const tasks = [];

  // paste addTask and countLeft here

  // write render(): empty the list, add one <li> per task, update #left

  // connect the Add button
</script>`,
      hint: "Keep one <code>render()</code> function that rebuilds the whole list from the array: <code>list.innerHTML = \"\"</code>, then <code>forEach</code> task create an <code>li</code>. Call it after every change. For the text: <code>n === 1 ? \"task\" : \"tasks\"</code>.",
      tests: [
        { check: "text('#left')", expected: "0 tasks left", desc: "starts with 0 tasks left" },
        { before: "type('#task', 'Read'); click('#add');", check: "count('#list li') + ' ' + text('#list li') + ' / ' + text('#left')", expected: "1 Read / 1 task left", desc: "adding Read shows it and 1 task left" },
        { before: "type('#task', 'Read'); click('#add'); type('#task', 'Gym'); click('#add');", check: "count('#list li') + ' / ' + text('#left') + ' / ' + $('#task').value.length", expected: "2 / 2 tasks left / 0", desc: "two tasks, and the input is cleared" },
        { before: "type('#task', '   '); click('#add');", check: "count('#list li') + ' / ' + text('#left')", expected: "0 / 0 tasks left", desc: "empty text adds nothing" },
      ],
      solutions: [
        { name: "render() from the array", code: c`<h2>My tasks</h2>
<input id="task" placeholder="New task">
<button id="add">Add</button>
<ul id="list"></ul>
<p id="left">0 tasks left</p>

<script>
  const tasks = [];

  function addTask(tasks, text) {
    const clean = text.trim();
    if (clean !== "") tasks.push({ text: clean, done: false });
  }
  function countLeft(tasks) {
    return tasks.filter(task => !task.done).length;
  }

  const box = document.querySelector("#task");
  const listEl = document.querySelector("#list");
  const leftEl = document.querySelector("#left");

  function render() {
    listEl.innerHTML = "";
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.text;
      listEl.append(li);
    });
    const n = countLeft(tasks);
    leftEl.textContent = ¦#{n} #{n === 1 ? "task" : "tasks"} left¦;
  }

  document.querySelector("#add").addEventListener("click", () => {
    addTask(tasks, box.value);
    box.value = "";
    render();
  });

  render();
</script>`, note: "The array is the truth; the page is just a picture of it. <code>render()</code> redraws the picture after every change, so the list and the counter can never disagree." },
      ] },
  ],
  extraTitle: "Make it yours",
  extra: [
    { t: "p", html: "<p>Finished your three milestones? Here are ideas to make the project feel like <b>yours</b>. Pick one or two — do not start them all.</p>" },
    { t: "table", head: ["Project", "Ideas"], rows: [
      ["🧮 Calculator", "add `%` (percent) and `**` (power) to `calculate`; show the last 5 results; a button that swaps a and b"],
      ["❓ Quiz game", "write 10 questions about something you love (football, chemistry, your city); shuffle the order of the options; add a category to each question"],
      ["✅ To-do list", "add a due day to each task (`{ text, done, day }`); show the tasks for today first; an emoji for important tasks"],
    ] },
    { t: "webtry", title: "Your project sandbox", html: "<p>A free space to experiment with your own idea before you put it in a milestone. It is saved for you.</p>", code: c`<!DOCTYPE html>
<html>
<body>
  <h2>My idea</h2>
  <p id="out"></p>

  <script>
    // try something new here
    document.querySelector("#out").textContent = "Ready, {{name}}!";
  </script>
</body>
</html>` },
    { t: "p", html: "<p>Before you stop today, write your plan for tomorrow in <b>My notes</b> below: which features are still missing, and what you want your app to look like.</p>" },
  ],
  quiz: [
    { q: "What should you do **before** writing the code of a project?", o: ["Choose the colours", "Plan: what the user sees, the data, the functions, the events", "Write all the code, then test once at the end"], a: 1, e: "A short plan turns into the HTML, the variables, the functions and the event listeners — in that order." },
    { q: "What does this show?", code: c`const tasks = [{ text: "Read", done: true }, { text: "Gym", done: false }];
console.log(tasks.filter(t => !t.done).length);`, o: ["`1`", "`2`", "`0`"], a: 0, e: "Only the Gym task has `done: false`, so the filtered array has 1 item." },
    { q: "Why write the logic as functions that **return** values, without touching the page?", o: ["It runs faster", "You can test them in the console with different values", "HTML does not allow functions"], a: 1, e: "A function that takes values and returns a result is easy to test: call it, compare the answer. Then the page just uses it." },
    { q: "What is a good milestone?", o: ["\"Finish the whole app\"", "A small step that ends with something you can test", "Writing comments only"], a: 1, e: "Small, testable steps keep bugs small and easy to find." },
  ],
  cards: [
    { f: "The four planning questions?", b: "What the user sees (HTML) · what data you keep (variables) · which functions do the work · which events start it." },
    { f: "What is a milestone?", b: "A small step of a project that ends with something you can test." },
    { f: "Why test logic in the console first?", b: "Functions that return values are easy to check; when the page breaks later, you know the bug is in the connection, not the logic." },
  ],
  remember: [
    "Plan first: what the user **sees**, what **data** you keep, which **functions**, which **events**.",
    "Build in small milestones and **test after each one** — a new bug is almost always in the newest code.",
    "Write the logic as functions that take values and **return** a result; test them with `console.log`.",
    "Keep the data in variables and arrays; one `render()` function shows it on the page.",
    "Stuck? Read the error, `console.log` your variables, check your plan, then the hint.",
  ],
};
})();
