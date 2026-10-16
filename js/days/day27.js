window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");

// The quiz project is used several times (worked example, milestone 3, practice), so it is written once here.
const HEAD = c`<!DOCTYPE html>
<html>
<head>
  <style>
    #options button { display: block; margin: 6px 0; padding: 6px 14px; }
    .right { background: lightgreen; }
    .wrong { background: lightsalmon; }
  </style>
</head>
<body>
  <h1>JS Quiz</h1>
  <p id="question"></p>
  <div id="options"></div>
  <p id="feedback"></p>
  <p id="score">Score: 0</p>
  <button id="next">Next</button>
  <p id="result"></p>
  <button id="again">Play again</button>

  <script>
    const questions = [
      { q: "Which keyword creates a constant?", options: ["let", "const", "var"], answer: "const" },
      { q: "Which method finds one element?", options: ["querySelector", "findOne", "getElement"], answer: "querySelector" },
      { q: "Which event fires when you click?", options: ["press", "tap", "click"], answer: "click" },
    ];

    const questionEl = document.querySelector("#question");
    const optionsEl = document.querySelector("#options");
    const feedbackEl = document.querySelector("#feedback");
    const scoreEl = document.querySelector("#score");
    const nextBtn = document.querySelector("#next");
    const resultEl = document.querySelector("#result");
    const againBtn = document.querySelector("#again");

    let index = 0;
    let score = 0;
    let answered = false;
`;
const SHOW = c`
    function showQuestion() {
      const current = questions[index];
      questionEl.textContent = current.q;
      optionsEl.innerHTML = "";
      feedbackEl.textContent = "";
      answered = false;
      for (const option of current.options) {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.addEventListener("click", () => {
          choose(btn, option);
        });
        optionsEl.append(btn);
      }
    }
`;
const CHOOSE = c`
    function choose(btn, option) {
      if (answered) {
        return;
      }
      answered = true;
      const current = questions[index];
      if (option === current.answer) {
        score++;
        feedbackEl.textContent = "Correct!";
        btn.classList.add("right");
      } else {
        feedbackEl.textContent = ¦Wrong! The answer is #{current.answer}.¦;
        btn.classList.add("wrong");
      }
      scoreEl.textContent = ¦Score: #{score}¦;
    }
`;
const NEXT = c`
    function showResult() {
      questionEl.textContent = "Quiz finished!";
      optionsEl.innerHTML = "";
      feedbackEl.textContent = "";
      resultEl.textContent = ¦You scored #{score} out of #{questions.length}.¦;
      nextBtn.style.display = "none";
      againBtn.style.display = "inline-block";
    }

    nextBtn.addEventListener("click", () => {
      if (!answered) {
        feedbackEl.textContent = "Choose an answer first.";
        return;
      }
      index++;
      if (index < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    });

    againBtn.addEventListener("click", () => {
      index = 0;
      score = 0;
      scoreEl.textContent = "Score: 0";
      resultEl.textContent = "";
      nextBtn.style.display = "inline-block";
      againBtn.style.display = "none";
      showQuestion();
    });

    againBtn.style.display = "none";
`;
const END = c`
    showQuestion();
  </script>
</body>
</html>`;
const QUIZ = HEAD + SHOW + CHOOSE + NEXT + END;
const M1_START = HEAD + c`
    function showQuestion() {
      // 1. show the question text of questions[index] in questionEl
      // 2. for every option, create a button and append it to optionsEl
    }
` + END;
const M1_SOL = HEAD + c`
    function showQuestion() {
      const current = questions[index];
      questionEl.textContent = current.q;
      optionsEl.innerHTML = "";
      for (const option of current.options) {
        const btn = document.createElement("button");
        btn.textContent = option;
        optionsEl.append(btn);
      }
    }
` + END;
const M2_START = HEAD + SHOW + c`
    function choose(btn, option) {
      // check the answer, update feedbackEl and scoreEl
      // a second click on the same question must not count
    }
` + END;
const M2_SOL = HEAD + SHOW + CHOOSE + END;
const M3_START = HEAD + SHOW + CHOOSE + c`
    // Next button: go to the next question, or show the result after the last one
    // Play again button: start again from the first question
` + END;

// test helpers for the quiz milestones
const OPT = n => `click('#options button:nth-child(${n})');`;
const ALL_RIGHT = OPT(2) + " click('#next'); " + OPT(1) + " click('#next'); " + OPT(3) + " click('#next');";
const ONE_WRONG = OPT(2) + " click('#next'); " + OPT(2) + " click('#next'); " + OPT(3) + " click('#next');";

DAYS[27] = {
  title: "Review + project: Interactive quiz page",
  intro: "Week 4 turned you into a web builder, {{name}}. Today you look back at the five web lessons, one small idea at a time, and then put all of them together in one real project: a quiz page that asks questions, checks the answers, counts the score and lets you play again.",
  goals: [
    "Recall the key idea of every lesson of Week 4 and prove it with a quick check",
    "Keep quiz questions as an array of objects `{q, options, answer}`",
    "Create answer buttons with JavaScript and react to clicks on them",
    "Keep the state of a page (question number, score) in variables",
    "Build the full quiz in three milestones, with automatic tests",
  ],
  learn: [
    { t: "h", text: "Week 4 recap" },
    { t: "p", html: "<p>Five lessons, five ideas. Read each part, look at the tiny example, and answer the question. If one feels shaky, open that day again before the project — the quiz uses all five.</p>" },
    { t: "h", text: "Day 22 — HTML and the <script> tag" },
    { t: "p", html: "<p>HTML gives the page its <b>content</b>: headings, paragraphs, buttons, inputs. Tags come in pairs, an <code>id</code> names one element, and a <code>class</code> names a group. JavaScript lives in a <code>&lt;script&gt;</code> tag at the end of <code>&lt;body&gt;</code>, so every element above it already exists when it runs.</p>" },
    { t: "static", code: c`<h1 id="title">Quiz</h1>
<button class="option">A</button>
<script>
  console.log("The page is ready");
</script>` },
    { t: "turn", level: "Easy", q: "Which tag do you use to put JavaScript inside an HTML page? Type only the tag name.", answers: ["script", "<script>"], e: "`<script>` … `</script>` holds JavaScript. Put it at the end of `<body>`.", placeholder: "e.g. body" },
    { t: "h", text: "Day 23 — The DOM: find and change" },
    { t: "p", html: "<p>The page is an object called <code>document</code>. <code>querySelector</code> finds the <b>first</b> match (<code>#id</code>, <code>.class</code> or a tag), and <code>querySelectorAll</code> finds <b>all</b> of them. Then you change <code>textContent</code>, <code>style</code> or <code>classList</code>.</p>" },
    { t: "static", code: c`document.querySelector("#title").textContent = "JS Quiz";
document.querySelector("#title").style.color = "teal";
document.querySelectorAll(".option").forEach(b => b.classList.add("big"));` },
    { t: "check", q: "The page has five buttons with `class=\"option\"`. Which line makes **all five** say `?`", o: ["`document.querySelector(\".option\").textContent = \"?\";`", "`document.querySelectorAll(\".option\").forEach(b => b.textContent = \"?\");`", "`document.option.textContent = \"?\";`"], a: 1, e: "`querySelector` changes only the first button. `querySelectorAll` returns all of them, and `forEach` changes each one." },
    { t: "h", text: "Day 24 — Events" },
    { t: "p", html: "<p>An <b>event</b> is something that happens: a click, a key press, the mouse moving over an element. <code>addEventListener(\"click\", function)</code> tells the browser which function to run when it happens. The <b>event object</b> carries details, like <code>event.key</code> for the key that was pressed.</p>" },
    { t: "static", code: c`button.addEventListener("click", () => {
  count++;
});
document.addEventListener("keydown", (event) => {
  console.log(event.key);
});` },
    { t: "turn", level: "Medium", q: "Which event name do you listen for to react when a key is pressed down? Type only the name.", answers: ["keydown", "\"keydown\""], e: "`keydown` fires when a key goes down; `event.key` tells you which key (for example `ArrowUp` or `a`).", placeholder: "e.g. click" },
    { t: "h", text: "Day 25 — Inputs and forms" },
    { t: "p", html: "<p><code>input.value</code> is what the user typed, and it is <b>always a string</b>. Use <code>Number()</code> before doing maths with it, and <code>.trim()</code> to remove extra spaces. For a form, listen to <code>submit</code> and call <code>event.preventDefault()</code> so the page does not reload.</p>" },
    { t: "static", code: c`const age = Number(ageInput.value);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  out.textContent = ¦Next year: #{age + 1}¦;
});` },
    { t: "check", q: "The user typed `16` in an input. What does this show?", code: c`const typed = "16";
console.log(typed + 1, Number(typed) + 1);`, o: ["`17 17`", "`161 17`", "`161 161`"], a: 1, e: "A value from an input is a string, so `+ 1` glues: `161`. After `Number()` it is a real number: `17`." },
    { t: "h", text: "Day 26 — Create elements and timers" },
    { t: "p", html: "<p><code>document.createElement</code> makes a new element, and <code>append</code> / <code>prepend</code> put it on the page; <code>remove()</code> deletes it. A loop over an array can build a whole list. <code>setTimeout</code> runs code once later, <code>setInterval</code> repeats it until <code>clearInterval</code>.</p>" },
    { t: "static", code: c`for (const name of ["Ali", "Sara"]) {
  const li = document.createElement("li");
  li.textContent = name;
  list.append(li);
}
setTimeout(() => console.log("1 second later"), 1000);` },
    { t: "check", q: "A countdown made with `setInterval` never stops, even at 0. What is missing?", o: ["A second `setInterval`", "A call to `clearInterval` with the interval's id", "`innerHTML = \"\"`"], a: 1, e: "An interval repeats forever until you call `clearInterval(id)` with the id that `setInterval` returned." },

    { t: "h", text: "Project: an interactive quiz page" },
    { t: "p", html: "<p>Quiz apps are everywhere: Kahoot in class, driving theory tests, the trivia game on your phone. They all work the same way inside. The questions are <b>data</b> (an array), the page shows <b>one question at a time</b>, and a few variables remember <b>where you are</b> and <b>your score</b>. Each question is an object:</p>" },
    { t: "static", code: c`{ q: "Which event fires when you click?", options: ["press", "tap", "click"], answer: "click" }` },
    { t: "p", html: "<p><code>q</code> is the question text, <code>options</code> is an array of possible answers (one button each), and <code>answer</code> is the correct option, written exactly as in <code>options</code>. Adding a question to the quiz means adding one object to the array — no new HTML.</p>" },
    { t: "steps", web: true, title: "The quiz page", problem: "<p>Build a quiz that shows one question at a time with one button per option. A click on an option says <code>Correct!</code> or <code>Wrong! The answer is ….</code> and updates <code>Score: n</code>. <b>Next</b> goes to the next question; after the last one the page shows <code>You scored 2 out of 3.</code> and a <b>Play again</b> button.</p>",
      steps: [
        { html: "<p><b>Understand and plan.</b> The HTML holds empty boxes: <code>#question</code>, <code>#options</code>, <code>#feedback</code>, <code>#score</code>, <code>#result</code>, plus the <b>Next</b> and <b>Play again</b> buttons. Three variables hold the state: <code>index</code> (which question), <code>score</code>, and <code>answered</code> (has this question been answered yet?).</p>", code: c`let index = 0;
let score = 0;
let answered = false;` },
        { html: "<p><b>Show one question.</b> <code>showQuestion()</code> reads <code>questions[index]</code>, writes its text, empties the old buttons with <code>innerHTML = \"\"</code>, and creates one new button per option (Day 26). Each button gets its own click listener.</p>", code: SHOW.replace(/^\n/, "").replace(/^ {4}/gm, "") },
        { html: "<p><b>Check an answer.</b> <code>choose()</code> first stops a second click (<code>answered</code>). Then it compares the option with <code>answer</code>, adds a point if it is right, colours the button and writes the feedback.</p>", code: CHOOSE.replace(/^\n/, "").replace(/^ {4}/gm, "") },
        { html: "<p><b>Next and the end.</b> <b>Next</b> refuses to move until the question is answered. It adds 1 to <code>index</code>; if there are questions left it shows the next one, otherwise <code>showResult()</code> shows the final score and swaps the buttons.</p>", code: c`nextBtn.addEventListener("click", () => {
  if (!answered) {
    feedbackEl.textContent = "Choose an answer first.";
    return;
  }
  index++;
  if (index < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});` },
        { html: "<p><b>Play again and test.</b> <b>Play again</b> puts the state back to the start and calls <code>showQuestion()</code>. Finally the script hides that button and shows the first question. Play the whole quiz twice — once perfectly, once with a mistake.</p>", code: c`againBtn.addEventListener("click", () => {
  index = 0;
  score = 0;
  scoreEl.textContent = "Score: 0";
  resultEl.textContent = "";
  nextBtn.style.display = "inline-block";
  againBtn.style.display = "none";
  showQuestion();
});` },
      ],
      code: QUIZ, height: 380 },
    { t: "p", html: "<p>Now build it yourself, milestone by milestone, in the <b>Solve problems</b> section below. Each milestone starts from the previous one, so you are never lost.</p>" },
  ],
  practice: [
    { t: "predict", code: c`const questions = [
  { q: "2 + 2?", options: ["3", "4"], answer: "4" },
  { q: "Capital of Saudi Arabia?", options: ["Jeddah", "Riyadh", "Dammam"], answer: "Riyadh" },
];
console.log(questions.length);
console.log(questions[1].options[2]);
console.log(questions[0].answer === questions[0].options[1]);`, explain: "<code>questions[1]</code> is the second object; its <code>options[2]</code> is the third option, <code>Dammam</code>. The answer of the first question is <code>\"4\"</code>, which is also <code>options[1]</code>, so the comparison is <code>true</code>." },
    { t: "turn", level: "Medium", q: "The array is called `questions`. How do you read the `answer` of the **first** question? Type the expression.", answers: ["questions[0].answer", "questions[0][\"answer\"]", "questions[0]['answer']"], e: "`questions[0]` is the first object (index 0), and `.answer` reads its property.", placeholder: "e.g. questions[1].q" },
    { t: "parsons", title: "Make the option buttons", prompt: "Put the lines in order: one button per option, each with its own listener, all inside <code>optionsEl</code>.", lines: [c`for (const option of current.options) {`, c`  const btn = document.createElement("button");`, c`  btn.textContent = option;`, c`  btn.addEventListener("click", () => choose(btn, option));`, c`  optionsEl.append(btn);`, c`}`], distractors: [c`  optionsEl.textContent = option;`], explain: "Create the button, fill it, give it its listener, then append it. Setting <code>optionsEl.textContent</code> would wipe all the buttons and leave only plain text." },
    { t: "webtry", title: "Make the quiz yours", html: "<p>This is the finished quiz. Make it yours:</p><ol><li>Add a fourth question about anything you like (one more object in the array).</li><li>Add <code>&lt;p id=\"progress\"&gt;&lt;/p&gt;</code> and make <code>showQuestion()</code> write <code>Question 1 of 4</code> into it.</li><li>Bonus: if the score is perfect, add <code>Perfect!</code> to the result.</li></ol>", code: QUIZ },
    { t: "webtry", title: "Colour picker from an array", html: "<p>A small Week 4 mix: an array, <code>createElement</code>, events and <code>style</code>. Add two colours to the array and make each button also write the colour name into <code>#picked</code>.</p>", code: c`<div id="buttons"></div>
<h2 id="picked">Pick a colour</h2>
<script>
  const colours = ["teal", "coral", "gold"];
  const box = document.querySelector("#buttons");
  for (const colour of colours) {
    const b = document.createElement("button");
    b.textContent = colour;
    b.addEventListener("click", () => {
      document.body.style.background = colour;
    });
    box.append(b);
  }
</script>` },
  ],
  exercises: [
    { id: "week4-title", lvl: "seed", web: true, title: "Change the page (Day 23)", prompt: "<p>Without changing the HTML, write a script that:</p><ul><li>changes the heading <code>#title</code> to <code>Week 4 done!</code>,</li><li>makes its text colour <code>green</code>,</li><li>adds the class <code>done</code> to <b>every</b> element with the class <code>task</code>.</li></ul>",
      starter: c`<style>.done { text-decoration: line-through; }</style>
<h1 id="title">Week 3</h1>
<ul>
  <li class="task">HTML page</li>
  <li class="task">Events</li>
  <li class="task">Quiz project</li>
</ul>
<script>
  // your code here
</script>`,
      tests: [
        { check: "text('#title')", expected: "Week 4 done!", desc: "the heading text changed" },
        { check: "style('#title', 'color')", expected: "rgb(0, 128, 0)", desc: "the heading is green" },
        { check: "count('.task.done')", expected: "3", desc: "all three tasks have the class done" },
      ],
      hint: "<code>querySelectorAll(\".task\")</code> gives all tasks; use <code>forEach</code> with <code>classList.add(\"done\")</code>.",
      solutions: [
        { name: "forEach", code: c`<style>.done { text-decoration: line-through; }</style>
<h1 id="title">Week 3</h1>
<ul>
  <li class="task">HTML page</li>
  <li class="task">Events</li>
  <li class="task">Quiz project</li>
</ul>
<script>
  const title = document.querySelector("#title");
  title.textContent = "Week 4 done!";
  title.style.color = "green";
  document.querySelectorAll(".task").forEach(t => t.classList.add("done"));
</script>` },
        { name: "for...of", code: c`<style>.done { text-decoration: line-through; }</style>
<h1 id="title">Week 3</h1>
<ul>
  <li class="task">HTML page</li>
  <li class="task">Events</li>
  <li class="task">Quiz project</li>
</ul>
<script>
  const title = document.querySelector("#title");
  title.textContent = "Week 4 done!";
  title.style.color = "green";
  for (const task of document.querySelectorAll(".task")) {
    task.classList.add("done");
  }
</script>` },
      ] },
    { id: "next-year", lvl: "seed", web: true, title: "Next year (Day 25)", prompt: "<p>When <code>#go</code> is clicked, read <code>#name</code> and <code>#age</code> and show in <code>#out</code>:</p><pre class=\"code-static\">Hi Sara! Next year you will be 17.</pre><p>(for the name <code>Sara</code> and the age <code>16</code>). If the name is empty, show <code>Please type your name.</code> instead.</p>",
      starter: c`<input id="name" placeholder="Name">
<input id="age" type="number" placeholder="Age">
<button id="go">Go</button>
<p id="out"></p>
<script>
  // your code here
</script>`,
      tests: [
        { before: "type('#name', 'Sara'); type('#age', '16'); click('#go');", check: "text('#out')", expected: "Hi Sara! Next year you will be 17.", desc: "Sara, 16" },
        { before: "type('#name', 'Omar'); type('#age', '15'); click('#go');", check: "text('#out')", expected: "Hi Omar! Next year you will be 16.", desc: "Omar, 15 (the age must be a number)" },
        { before: "type('#age', '15'); click('#go');", check: "text('#out')", expected: "Please type your name.", desc: "an empty name" },
      ],
      hint: "<code>Number(ageInput.value) + 1</code> — without <code>Number()</code> you get <code>161</code>.",
      solutions: [{ name: "Solution", code: c`<input id="name" placeholder="Name">
<input id="age" type="number" placeholder="Age">
<button id="go">Go</button>
<p id="out"></p>
<script>
  const out = document.querySelector("#out");
  document.querySelector("#go").addEventListener("click", () => {
    const name = document.querySelector("#name").value.trim();
    const age = Number(document.querySelector("#age").value);
    if (name === "") {
      out.textContent = "Please type your name.";
      return;
    }
    out.textContent = ¦Hi #{name}! Next year you will be #{age + 1}.¦;
  });
</script>` }] },
    { id: "arrow-keys", lvl: "star", web: true, title: "Volume keys (Day 24)", prompt: "<p><code>#volume</code> starts at <code>5</code>. Pressing <b>ArrowUp</b> anywhere on the page adds 1, <b>ArrowDown</b> takes 1 away. Other keys do nothing. The volume must stay between <code>0</code> and <code>10</code>.</p>",
      starter: c`<p>Volume: <b id="volume">5</b></p>
<script>
  let volume = 5;
  // listen for keydown on the document
</script>`,
      tests: [
        { before: "press('ArrowUp'); press('ArrowUp'); press('ArrowDown');", check: "text('#volume')", expected: "6", desc: "up, up, down gives 6" },
        { before: "press('a'); press('Enter');", check: "text('#volume')", expected: "5", desc: "other keys do nothing" },
        { before: "for (let i = 0; i < 8; i++) press('ArrowUp');", check: "text('#volume')", expected: "10", desc: "it stops at 10" },
        { before: "for (let i = 0; i < 8; i++) press('ArrowDown');", check: "text('#volume')", expected: "0", desc: "it stops at 0" },
      ],
      hint: "<code>document.addEventListener(\"keydown\", (event) => { ... })</code>, then check <code>event.key === \"ArrowUp\"</code> and <code>volume &lt; 10</code>.",
      solutions: [
        { name: "if / else if", code: c`<p>Volume: <b id="volume">5</b></p>
<script>
  let volume = 5;
  const box = document.querySelector("#volume");
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && volume < 10) {
      volume++;
    } else if (event.key === "ArrowDown" && volume > 0) {
      volume--;
    }
    box.textContent = volume;
  });
</script>` },
        { name: "Math.min / Math.max", code: c`<p>Volume: <b id="volume">5</b></p>
<script>
  let volume = 5;
  const box = document.querySelector("#volume");
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") volume = Math.min(10, volume + 1);
    if (event.key === "ArrowDown") volume = Math.max(0, volume - 1);
    box.textContent = volume;
  });
</script>`, note: "<code>Math.min(10, x)</code> never lets the value go above 10, and <code>Math.max(0, x)</code> never below 0." },
      ] },
    { id: "quiz-1", lvl: "star", web: true, title: "Quiz milestone 1: show a question", prompt: "<p>The HTML and the <code>questions</code> array are ready. Finish <code>showQuestion()</code>:</p><ol><li>write the <code>q</code> of <code>questions[index]</code> into <code>#question</code>,</li><li>create one <code>&lt;button&gt;</code> per option (in order) and append it to <code>#options</code>.</li></ol><p>Do not write the option buttons in the HTML — the array must decide them.</p>", height: 320,
      starter: M1_START,
      tests: [
        { check: "text('#question')", expected: "Which keyword creates a constant?", desc: "the first question is shown" },
        { check: "count('#options button')", expected: "3", desc: "three option buttons" },
        { check: "[...document.querySelectorAll('#options button')].map(b => b.textContent.trim()).join(',')", expected: "let,const,var", desc: "the buttons show the options in order" },
      ],
      hint: "<code>const current = questions[index];</code> then <code>for (const option of current.options) { ... }</code> with create, fill, append.",
      solutions: [{ name: "Milestone 1", code: M1_SOL }] },
    { id: "quiz-2", lvl: "star", web: true, title: "Quiz milestone 2: check the answer", prompt: "<p>Now the buttons call <code>choose(btn, option)</code>. Finish it:</p><ul><li>If <code>option</code> is the right <code>answer</code>: add 1 to <code>score</code>, show <code>Correct!</code> in <code>#feedback</code> and add the class <code>right</code> to the button.</li><li>Otherwise: show <code>Wrong! The answer is const.</code> (with the real answer) and add the class <code>wrong</code>.</li><li>In both cases <code>#score</code> shows <code>Score: 1</code> (the real score).</li><li>Only the <b>first</b> click on a question counts: use the <code>answered</code> variable.</li></ul>", height: 320,
      starter: M2_START,
      tests: [
        { before: OPT(2), check: "text('#feedback') + ' / ' + text('#score')", expected: "Correct! / Score: 1", desc: "the right answer adds a point" },
        { before: OPT(1), check: "text('#feedback') + ' / ' + text('#score')", expected: "Wrong! The answer is const. / Score: 0", desc: "a wrong answer shows the right one" },
        { before: OPT(2) + " " + OPT(2) + " " + OPT(2), check: "text('#score')", expected: "Score: 1", desc: "clicking again does not add more points" },
        { before: OPT(1) + " " + OPT(2), check: "text('#score')", expected: "Score: 0", desc: "you cannot change your answer" },
        { before: OPT(2), check: "$('#options button:nth-child(2)').classList.contains('right')", expected: "true", desc: "the right button gets the class right" },
        { before: OPT(3), check: "$('#options button:nth-child(3)').classList.contains('wrong')", expected: "true", desc: "a wrong button gets the class wrong" },
      ],
      hint: "Start with <code>if (answered) { return; }</code> and <code>answered = true;</code>. Then compare <code>option === questions[index].answer</code>.",
      solutions: [{ name: "Milestone 2", code: M2_SOL }] },
    { id: "quiz-3", lvl: "fire", web: true, title: "Quiz milestone 3: Next, result and Play again", prompt: "<p>Finish the quiz:</p><ul><li><code>#again</code> is hidden at the start (<code>style.display = \"none\"</code>).</li><li><b>Next</b> (<code>#next</code>): if the question was not answered, show <code>Choose an answer first.</code> in <code>#feedback</code> and stay. Otherwise go to the next question (the feedback becomes empty).</li><li>After the last question: <code>#result</code> shows <code>You scored 2 out of 3.</code> (the real numbers), the options disappear, <b>Next</b> is hidden and <b>Play again</b> is shown.</li><li><b>Play again</b>: score back to 0 (<code>Score: 0</code>), result empty, the first question again.</li></ul>", height: 380,
      starter: M3_START,
      tests: [
        { check: "style('#again', 'display')", expected: "none", desc: "Play again is hidden at the start" },
        { before: OPT(2) + " click('#next');", check: "text('#question')", expected: "Which method finds one element?", desc: "Next shows the second question" },
        { before: OPT(2) + " click('#next');", check: "$('#feedback').textContent === '' && count('#options button') === 3", expected: "true", desc: "the new question has empty feedback and three new buttons" },
        { before: "click('#next');", check: "text('#feedback') + ' / ' + text('#question')", expected: "Choose an answer first. / Which keyword creates a constant?", desc: "Next without an answer does not move" },
        { before: ALL_RIGHT, check: "text('#result')", expected: "You scored 3 out of 3.", desc: "all right: 3 out of 3" },
        { before: ONE_WRONG, check: "text('#result')", expected: "You scored 2 out of 3.", desc: "one mistake: 2 out of 3" },
        { before: ALL_RIGHT, check: "style('#next', 'display') + ' / ' + style('#again', 'display') + ' / ' + count('#options button')", expected: "none / inline-block / 0", desc: "at the end Next is hidden, Play again is shown, no options" },
        { before: ONE_WRONG + " click('#again');", check: "[text('#question'), text('#score'), count('#options button'), $('#result').textContent === ''].join(' / ')", expected: "Which keyword creates a constant? / Score: 0 / 3 / true", desc: "Play again starts over" },
      ],
      hint: "In the Next listener: <code>index++</code>, then <code>if (index &lt; questions.length) showQuestion(); else showResult();</code>. Write <code>showResult()</code> yourself.",
      solutions: [{ name: "The full quiz", code: QUIZ, note: "Compare it with your version: the state lives in three variables, and every button only changes the state and then redraws the page." }],
      twist: "Shuffle the questions or add a 10-second timer per question with <code>setInterval</code> (Day 26)." },
  ],
  quiz: [
    { q: "Which line makes JavaScript find **all** elements with the class `card`?", o: ["`document.querySelector(\".card\")`", "`document.querySelectorAll(\".card\")`", "`document.querySelector(\"#card\")`", "`document.card`"], a: 1, e: "`querySelectorAll` returns all matches; `querySelector` only the first." },
    { q: "In the quiz, why do we keep the questions in an array of objects?", o: ["Because HTML cannot show text", "So adding a question means adding data, not new HTML or code", "Because objects are faster than strings", "It is required by `createElement`"], a: 1, e: "The code works for any number of questions. The data decides what the page shows." },
    { q: "What does `event.preventDefault()` do in a form's `submit` listener?", o: ["Deletes the form", "Stops the page from reloading, so your JavaScript can handle the data", "Clears all inputs", "Sends the form twice"], a: 1, e: "Submitting a form normally reloads the page. `preventDefault()` stops that default action." },
    { q: "What does this show?", code: c`const q = { q: "Best fruit?", options: ["Mango", "Apple", "Dates"], answer: "Dates" };
console.log(q.options.indexOf(q.answer));`, o: ["`2`", "`3`", "`Dates`", "`-1`"], a: 0, e: "`indexOf` gives the position of `Dates` in the options array: index 2." },
    { q: "Why does the quiz use a variable `answered`?", o: ["To count the questions", "So only the first click on a question can change the score", "To hide the Next button", "Because buttons need it"], a: 1, e: "Without it, clicking the right answer five times would give five points." },
    { q: "Which pair is correct?", o: ["`setTimeout` repeats, `setInterval` runs once", "`setTimeout` runs once later, `setInterval` repeats until `clearInterval`", "Both run once", "Both repeat forever"], a: 1, e: "`setTimeout` = once, later. `setInterval` = again and again until you clear it." },
  ],
  puzzle: { title: "What is the score?", q: "<p>In the finished quiz (questions: answers <code>const</code>, <code>querySelector</code>, <code>click</code>), a player does this. What does <code>#score</code> show at the end? Type only the number.</p>", code: c`Question 1: clicks "let", then clicks "const"
Next
Question 2: clicks "querySelector" three times
Next
Question 3: clicks Next first, then "click"`, answers: ["2"], hint: "Only the first click on each question counts, and Next without an answer does not move.", e: "Q1: the first click (`let`) is wrong and locks the question — 0. Q2: the first click is right — 1; the other clicks do nothing. Q3: Next is refused, then `click` is right — 2." },
  cards: [
    { f: "How do you keep quiz questions as data?", b: "An array of objects: `[{ q: \"...\", options: [\"a\", \"b\"], answer: \"b\" }, ...]`" },
    { f: "How do you read the options of the current question?", b: "`questions[index].options` — `index` is the number of the question you are on." },
    { f: "How do you create one button per option?", b: "Loop over the options; for each: `createElement(\"button\")`, set `textContent`, add a click listener, `append`." },
    { f: "How do you hide and show an element?", b: "`el.style.display = \"none\";` hides it; `el.style.display = \"inline-block\";` (or `\"block\"`) shows it again." },
    { f: "Why `innerHTML = \"\"` before showing the next question?", b: "It removes the old option buttons, so the new ones do not pile up under them." },
  ],
  remember: [
    "HTML = content; `<script>` at the end of `<body>` adds behaviour.",
    "`querySelector` finds one, `querySelectorAll` finds all; change `textContent`, `style` and `classList`.",
    "`addEventListener(\"click\" | \"keydown\" | \"input\", fn)` reacts to the user; `event.key` tells you the key.",
    "`input.value` is always a string: use `Number()` and `.trim()`.",
    "`createElement` + `append` build the page from data; `setTimeout` / `setInterval` add time.",
    "A page app = data (arrays of objects) + state (variables) + a function that redraws the page.",
  ],
};
})();
