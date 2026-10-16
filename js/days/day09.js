window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[9] = {
  title: "Decisions: if, else if, else",
  intro: "Yesterday your programs learned to answer questions with <code>true</code> or <code>false</code>. Today, {{name}}, they start to <b>act</b> on the answers: say \"Pass\" or \"Try again\", give a grade A to F, warn you when it is too hot outside. This is the moment your code starts to feel smart.",
  goals: [
    "Run code only when a condition is true with `if (...) { ... }`",
    "Choose between two paths with `else`",
    "Build `else if` chains (grades A, B, C...) and put the conditions in the right order",
    "Make decisions from user input read with `prompt()` and `Number()`",
    "Use `&&` and `||` inside conditions, and put an `if` inside another `if`",
    "Spot the classic mistakes: `=` instead of `===`, missing braces, a `;` after `if (...)`",
  ],
  learn: [
    { t: "h", text: "Programs that choose" },
    { t: "p", html: "<p>Every program you wrote so far ran <b>every</b> line, every time. But real apps choose: a game shows \"Game over\" only when your lives reach 0, and your phone shows a warning only when the battery is low. For this JavaScript has the <code>if</code> statement: <i>if this is true, do that</i>.</p>" },
    { t: "analogy", title: "if is like a door with a guard", html: "<p>Picture a door with a guard. The guard asks one yes/no question — \"Is it raining?\" If the answer is <code>true</code>, you go through the door and do everything inside the room (\"take an umbrella\"). If it is <code>false</code>, you skip the room and walk on. Either way, you continue with the rest of the program.</p>" },
    { t: "code", code: c`const battery = 15;
if (battery < 20) {
  console.log("Battery low!");
  console.log("Please charge your phone.");
}
console.log("Have a nice day.");`, before: "<p>Run it, then change <code>battery</code> to <code>80</code> and run again.</p>", note: "<p>With 15 all three lines appear. With 80 the condition is <code>false</code>, so the two lines inside the braces are skipped — but the last line still runs, because it is <b>outside</b> the <code>if</code>.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`if`, "The keyword that starts a decision. Small letters only."],
      [c`(battery < 20)`, "The <b>condition</b>, always inside round brackets. Any comparison from Day 8 can go here."],
      [c`{`, "The curly brace opens the <b>block</b>: the lines that run only when the condition is <code>true</code>."],
      [c`  console.log("Battery low!");`, "Lines inside the block are <b>indented</b> by 2 spaces, so your eyes see at once what belongs to the <code>if</code>."],
      [c`}`, "The closing brace ends the block. After it, the program continues normally."],
    ] },
    { t: "check", q: "What does this program show?", code: c`const mark = 40;
if (mark >= 50) {
  console.log("Pass");
}
console.log("Done");`, o: ["`Pass\nDone`", "`Done`", "`Pass`", "nothing"], a: 1, e: "40 >= 50 is `false`, so the block with \"Pass\" is skipped. `console.log(\"Done\")` is outside the braces, so it always runs.", hint: "Which line is outside the braces?" },
    { t: "h", text: "else: the other path" },
    { t: "p", html: "<p>Often you want to do one thing when the answer is yes and <b>something else</b> when it is no: \"Pass\" or \"Try again\", \"Good morning\" or \"Good evening\". Add <code>else</code> with its own block. Exactly <b>one</b> of the two blocks runs — never both, never none.</p>" },
    { t: "code", code: c`const mark = 42;
if (mark >= 50) {
  console.log("Pass. Well done!");
} else {
  console.log("Not yet. Let's practise more.");
}` },
    { t: "check", q: "What does this show?", code: c`const temp = 30;
if (temp > 30) {
  console.log("Hot");
} else {
  console.log("Not hot");
}`, o: ["`Hot`", "`Not hot`", "`Hot Not hot`"], a: 1, e: "30 is not **greater** than 30, so the condition is `false` and the `else` block runs.", hint: "Is 30 > 30?" },
    { t: "h", text: "Deciding from what the user types" },
    { t: "p", html: "<p>Decisions become interesting when the user gives the input. Remember from Day 5: <code>prompt()</code> always returns a <b>string</b>. Wrap it in <code>Number()</code> before you compare it with numbers. (On this site the answers come from the <b>Input</b> box under the editor.)</p>" },
    { t: "code", code: c`const n = Number(prompt("Type a whole number"));
if (n % 2 === 0) {
  console.log(¦#{n} is even¦);
} else {
  console.log(¦#{n} is odd¦);
}`, stdin: "7", note: "<p><code>n % 2</code> is the remainder after dividing by 2. Even numbers have remainder 0. Change the Input to <code>12</code> and run again.</p>" },
    { t: "turn", level: "Easy", q: "The user types `25`. What does the program show?", code: c`const age = Number(prompt("Age?"));
if (age >= 18) {
  console.log("You can drive");
} else {
  console.log("Wait a bit");
}`, answers: ["You can drive"], e: "25 >= 18 is `true`, so the first block runs.", placeholder: "type the output" },
    { t: "h", text: "else if: more than two choices" },
    { t: "p", html: "<p>A grade is not just pass or fail: it can be A, B, C, D or F. When you need more than two paths, add <code>else if</code> between the <code>if</code> and the <code>else</code>. JavaScript tests the conditions <b>from top to bottom</b> and runs the block of the <b>first</b> one that is true. Then it skips all the rest.</p>" },
    { t: "analogy", title: "else if is like a coin sorter", html: "<p>A coin sorting machine has holes from small to large. A coin rolls past them in order and falls into the <b>first</b> hole it fits. It never falls twice. An <code>else if</code> chain is the same: the value \"falls\" into the first block whose condition is true, and the final <code>else</code> catches everything that fit nowhere.</p>" },
    { t: "viz", code: c`const mark = 83;
if (mark >= 90) {
  console.log("Grade A");
} else if (mark >= 80) {
  console.log("Grade B");
} else if (mark >= 70) {
  console.log("Grade C");
} else {
  console.log("Grade F");
}
console.log("Report done");`, before: "<p>Press <b>Visualize</b> and click <b>Next ▶</b>. Watch JavaScript test 83 &gt;= 90 (false), then 83 &gt;= 80 (true) — and then jump straight to the last line without testing the rest.</p>" },
    { t: "p", html: "<p>Notice that the B condition is just <code>mark &gt;= 80</code>, not <code>mark &gt;= 80 &amp;&amp; mark &lt; 90</code>. We do not need the second half: if the mark were 90 or more, the A block would already have caught it.</p>" },
    { t: "h", text: "Order matters" },
    { t: "p", html: "<p>Because the first true condition wins, the order of an <code>else if</code> chain is part of its meaning. Put the <b>strictest</b> condition first. Look what happens if we start with the easy one:</p>" },
    { t: "code", code: c`const mark = 95;
if (mark >= 70) {
  console.log("Grade C");
} else if (mark >= 90) {
  console.log("Grade A");
}`, note: "<p>95 is greater than 70, so the very first test is true and the student gets a C! The A block can never run, because every mark above 90 is also above 70. With <code>&gt;=</code> chains, go from the <b>highest</b> number down.</p>" },
    { t: "check", q: "A program checks the speed of a car. Which order of conditions is correct?", o: ["`speed > 80` → \"Fast\", then `speed > 120` → \"Danger\"", "`speed > 120` → \"Danger\", then `speed > 80` → \"Fast\"", "The order does not matter"], a: 1, e: "Every speed above 120 is also above 80. If \"> 80\" came first, \"Danger\" could never be shown. Strictest first.", hint: "Which condition is harder to meet?" },
    { t: "h", text: "Conditions with && and ||" },
    { t: "p", html: "<p>Everything you learned yesterday works inside the brackets. Use <code>&amp;&amp;</code> when every part must be true and <code>||</code> when one part is enough.</p>" },
    { t: "code", code: c`const day = "friday";
const homeworkDone = true;
if (day === "friday" || day === "saturday") {
  console.log("Weekend!");
}
if (day === "friday" && homeworkDone) {
  console.log("Time for football.");
}` },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`const age = 16;
const hasTicket = false;
if (age >= 12 && hasTicket) {
  console.log("Enjoy the film");
} else {
  console.log("Sorry");
}`, answers: ["Sorry"], run: true, e: "The age part is `true`, but `hasTicket` is `false`, and `&&` needs both. So the `else` block runs.", hint: "`&&` needs both sides to be true.", placeholder: "type the output" },
    { t: "h", text: "An if inside an if" },
    { t: "p", html: "<p>Sometimes a second question only makes sense after the first answer. At the canteen you first ask \"do I have money?\" — and only if yes do you ask \"is there pizza today?\" You can put an <code>if</code> inside the block of another <code>if</code>. This is called <b>nesting</b>.</p>" },
    { t: "code", code: c`const money = 12;
const hasPizza = false;
if (money >= 10) {
  if (hasPizza) {
    console.log("One pizza, please!");
  } else {
    console.log("A sandwich, then.");
  }
} else {
  console.log("Just water today.");
}` },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`if (money >= 10) {`, "The outer question. Everything until its matching <code>}</code> runs only with enough money."],
      [c`  if (hasPizza) {`, "The inner question, asked <b>only</b> when the outer one was true. <code>hasPizza</code> is already a boolean, so no <code>=== true</code> is needed."],
      [c`  } else {`, "The inner <code>else</code>: we have money but no pizza."],
      [c`} else {`, "The outer <code>else</code>: not enough money. Indentation shows which <code>else</code> belongs to which <code>if</code>."],
    ] },
    { t: "table", head: ["You write", "It means"], rows: [
      ["`if (c) { A }`", "Run A only if `c` is true"],
      ["`if (c) { A } else { B }`", "Exactly one of A or B runs"],
      ["`if (c1) { A } else if (c2) { B } else { C }`", "The first true condition wins; C if none is true"],
      ["`if (c1) { if (c2) { A } }`", "Nesting: c2 is only asked when c1 is true"],
    ] },
    { t: "steps", title: "Riyadh weather advice", problem: "<p>Build a program that asks for today's temperature in Riyadh and gives advice:</p><pre class=\"code-static\">45 or more  → Stay inside, it is extremely hot\n35 to 44    → Hot: drink lots of water\n20 to 34    → Lovely weather for a walk\nbelow 20    → Take a jacket</pre>",
      steps: [
        { html: "<p><b>Understand.</b> One number in, four possible messages out. Exactly one message must appear, so this is an <code>if</code> / <code>else if</code> / <code>else</code> chain.</p>" },
        { html: "<p><b>Plan.</b> Read the number with <code>Number(prompt(...))</code>. Order the tests from the highest temperature down, so each one only needs one comparison.</p>", code: c`const temp = Number(prompt("Temperature today?"));` },
        { html: "<p><b>Build the top of the chain.</b> The strictest condition first.</p>", code: c`if (temp >= 45) {
  console.log("Stay inside, it is extremely hot");
} else if (temp >= 35) {
  console.log("Hot: drink lots of water");
}` },
        { html: "<p><b>Finish.</b> Add the last <code>else if</code> and an <code>else</code> for everything below 20. Test the edges: 45, 44, 35, 20 and 19.</p>", code: c`} else if (temp >= 20) {
  console.log("Lovely weather for a walk");
} else {
  console.log("Take a jacket");
}` },
      ],
      code: c`// Weather advice for Riyadh
const temp = Number(prompt("Temperature today?"));
if (temp >= 45) {
  console.log("Stay inside, it is extremely hot");
} else if (temp >= 35) {
  console.log("Hot: drink lots of water");
} else if (temp >= 20) {
  console.log("Lovely weather for a walk");
} else {
  console.log("Take a jacket");
}`, stdin: "38" },
  ],
  mistakes: [
    { title: "= instead of === in the condition", html: "<code>if (x = 5)</code> does not compare: it <b>stores</b> 5 in <code>x</code>, and 5 is truthy, so the block always runs. Use <code>===</code>.", wrong: c`let lives = 0;
if (lives = 3) {
  console.log("Still playing");
}`, right: c`let lives = 0;
if (lives === 3) {
  console.log("Still playing");
}` },
    { title: "Missing braces", html: "Without <code>{ }</code>, only the <b>first</b> line after <code>if</code> belongs to it. The second line runs every time, even though the indentation suggests otherwise. Always use braces.", wrong: c`const mark = 30;
if (mark >= 50)
  console.log("Pass");
  console.log("Certificate printed");`, right: c`const mark = 30;
if (mark >= 50) {
  console.log("Pass");
  console.log("Certificate printed");
}` },
    { title: "A semicolon after if (...)", html: "<code>if (cond);</code> ends the <code>if</code> right there with an empty statement. The block after it is then just normal code that <b>always</b> runs.", wrong: c`const temp = 10;
if (temp > 40); {
  console.log("Very hot!");
}`, right: c`const temp = 10;
if (temp > 40) {
  console.log("Very hot!");
}` },
    { title: "else if in the wrong order", html: "The first true condition wins. If an easy condition comes first, the stricter ones below it can never run. Go from the strictest to the easiest.", wrong: c`const mark = 95;
if (mark >= 50) {
  console.log("Pass");
} else if (mark >= 90) {
  console.log("Excellent");
}`, right: c`const mark = 95;
if (mark >= 90) {
  console.log("Excellent");
} else if (mark >= 50) {
  console.log("Pass");
}` },
  ],
  tricks: [
    { title: "Accept answers in any case", html: "Users type <code>Yes</code>, <code>YES</code> or <code>yes</code>. Change the answer to small letters before you compare it.", code: c`const answer = "YES";
if (answer.toLowerCase() === "yes") {
  console.log("Great, let's start!");
}` },
    { title: "Check for an empty answer with !", html: "An empty string is falsy, so <code>!text</code> is <code>true</code> when the user typed nothing. Handle that case first.", code: c`const name = "";
if (!name) {
  console.log("You did not type a name.");
} else {
  console.log(¦Hello, #{name}!¦);
}` },
    { title: "Use a variable to keep the result", html: "Instead of repeating <code>console.log</code> in every branch, store the result in a <code>let</code> and show it once at the end. It is easier to change later.", code: c`const mark = 77;
let grade = "F";
if (mark >= 90) {
  grade = "A";
} else if (mark >= 75) {
  grade = "B";
}
console.log("Your grade:", grade);` },
  ],
  practice: [
    { t: "try", title: "Make it yours", html: "<p>Write a greeting that depends on the hour (0–23). Change the hour and run. Then add a fourth message for late at night (after 21).</p>", code: c`const hour = 14;
if (hour < 12) {
  console.log("Good morning, {{name}}!");
} else if (hour < 18) {
  console.log("Good afternoon, {{name}}!");
} else {
  console.log("Good evening, {{name}}!");
}` },
    { t: "predict", code: c`const x = 10;
if (x > 5) {
  console.log("A");
}
if (x > 8) {
  console.log("B");
}`, explain: "These are two <b>separate</b> <code>if</code> statements, not a chain. Both conditions are true, so both <code>A</code> and <code>B</code> are shown. With <code>else if</code> only <code>A</code> would appear." },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`const points = 0;
if (points > 0) {
  console.log("You scored");
} else {
  console.log("No points yet");
}`, answers: ["No points yet"], run: true, e: "0 is not greater than 0, so the `else` block runs.", placeholder: "type the output" },
    { t: "predict", code: c`const mark = 75;
if (mark >= 90) {
  console.log("A");
} else if (mark >= 70) {
  console.log("C");
} else if (mark >= 60) {
  console.log("D");
}`, explain: "75 &gt;= 90 is false, 75 &gt;= 70 is true → <code>C</code>. The chain stops there, even though 75 &gt;= 60 is also true." },
    { t: "parsons", title: "Pass or fail", prompt: "Put the lines in order: read a mark, then show <code>Pass</code> for 50 or more and <code>Fail</code> otherwise.", lines: [c`const mark = Number(prompt("Mark?"));`, c`if (mark >= 50) {`, c`  console.log("Pass");`, c`} else {`, c`  console.log("Fail");`, c`}`], distractors: [c`if (mark => 50) {`], explain: "The input comes first, then the <code>if</code> with its block, then <code>else</code>. The distractor uses <code>=&gt;</code>, which is not \"greater or equal\"." },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`const n = 7;
if (n > 5) {
  if (n % 2 === 0) {
    console.log("big even");
  } else {
    console.log("big odd");
  }
} else {
  console.log("small");
}`, answers: ["big odd"], run: true, e: "7 > 5 is true, so we go inside. 7 % 2 is 1, not 0, so the inner `else` runs.", placeholder: "type the output" },
    { t: "try", title: "Build a mini quiz", html: "<p>Type an answer in the <b>Input</b> box and run. Then add a second question of your own with its own <code>prompt()</code> and <code>if</code>.</p>", code: c`const answer = prompt("What is the capital of Saudi Arabia?");
if (answer.toLowerCase() === "riyadh") {
  console.log("Correct! +10 points");
} else {
  console.log("Not quite. The answer is Riyadh.");
}`, stdin: "riyadh" },
  ],
  exercises: [
    { id: "d9-evenodd", lvl: "seed", title: "Even or odd", prompt: "<p>Ask for a whole number. Show <code>Even</code> if it is even, otherwise <code>Odd</code>.</p>", starter: c`const n = Number(prompt("A whole number?"));
`, tests: [{ stdin: "8", expected: "Even" }, { stdin: "13", expected: "Odd" }, { stdin: "0", expected: "Even" }],
      hint: "A number is even when <code>n % 2 === 0</code>.",
      solutions: [{ name: "if / else", code: c`const n = Number(prompt("A whole number?"));
if (n % 2 === 0) {
  console.log("Even");
} else {
  console.log("Odd");
}`, note: "Two paths, so <code>if</code> and <code>else</code>." }] },
    { id: "d9-pass", lvl: "seed", title: "Pass or try again", prompt: "<p>Ask for a mark. Show <code>Pass</code> if the mark is 50 or more, otherwise <code>Try again</code>.</p>", tests: [{ stdin: "50", expected: "Pass" }, { stdin: "49", expected: "Try again" }, { stdin: "88", expected: "Pass" }],
      hint: "Test the edge: 50 must pass, so use <code>&gt;=</code>.",
      solutions: [{ name: "if / else", code: c`const mark = Number(prompt("Mark?"));
if (mark >= 50) {
  console.log("Pass");
} else {
  console.log("Try again");
}`, note: "One condition, two paths." }] },
    { id: "d9-grade", lvl: "star", title: "Letter grade", prompt: "<p>Ask for a mark out of 100 and show the grade: <code>A</code> for 90+, <code>B</code> for 80–89, <code>C</code> for 70–79, <code>D</code> for 60–69 and <code>F</code> below 60. Show it as <code>Grade: B</code>.</p>", tests: [{ stdin: "95", expected: "Grade: A" }, { stdin: "80", expected: "Grade: B" }, { stdin: "79", expected: "Grade: C" }, { stdin: "60", expected: "Grade: D" }, { stdin: "12", expected: "Grade: F" }],
      hint: "Start with <code>mark &gt;= 90</code> and go down. Each <code>else if</code> needs only one comparison.",
      solutions: [{ name: "else if chain", code: c`const mark = Number(prompt("Mark?"));
if (mark >= 90) {
  console.log("Grade: A");
} else if (mark >= 80) {
  console.log("Grade: B");
} else if (mark >= 70) {
  console.log("Grade: C");
} else if (mark >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}`, note: "Highest first, so the first true condition is the right grade." },
        { name: "Store, then show", code: c`const mark = Number(prompt("Mark?"));
let grade = "F";
if (mark >= 90) {
  grade = "A";
} else if (mark >= 80) {
  grade = "B";
} else if (mark >= 70) {
  grade = "C";
} else if (mark >= 60) {
  grade = "D";
}
console.log(¦Grade: #{grade}¦);`, note: "Start with F and upgrade it. Only one <code>console.log</code>." }] },
    { id: "d9-battery", lvl: "star", title: "Battery icon", prompt: "<p>Ask for the battery level (0–100). Show:</p><pre class=\"code-static\">100      → Full\n50 to 99 → Good\n15 to 49 → Low\n1 to 14  → Charge now!\n0        → Phone is off</pre>", tests: [{ stdin: "100", expected: "Full" }, { stdin: "50", expected: "Good" }, { stdin: "15", expected: "Low" }, { stdin: "3", expected: "Charge now!" }, { stdin: "0", expected: "Phone is off" }],
      hint: "Use <code>===</code> for exactly 100 and for 0, and <code>&gt;=</code> for the ranges in between, from the top down.",
      solutions: [{ name: "Top down", code: c`const level = Number(prompt("Battery level?"));
if (level === 100) {
  console.log("Full");
} else if (level >= 50) {
  console.log("Good");
} else if (level >= 15) {
  console.log("Low");
} else if (level >= 1) {
  console.log("Charge now!");
} else {
  console.log("Phone is off");
}`, note: "Each test only needs one comparison because the earlier ones already removed the higher values." }] },
    { id: "d9-login", lvl: "star", title: "Log in", prompt: "<p>Ask for a username, then a password. If the username is <code>sara</code> <b>and</b> the password is <code>js30rocks</code>, show <code>Welcome back, sara!</code>. Otherwise show <code>Wrong username or password</code>.</p>", tests: [{ stdin: "sara\njs30rocks", expected: "Welcome back, sara!" }, { stdin: "sara\n1234", expected: "Wrong username or password" }, { stdin: "omar\njs30rocks", expected: "Wrong username or password" }],
      hint: "Both must be right: join two <code>===</code> comparisons with <code>&amp;&amp;</code>. No <code>Number()</code> — these are strings.",
      solutions: [{ name: "&&", code: c`const user = prompt("Username?");
const pass = prompt("Password?");
if (user === "sara" && pass === "js30rocks") {
  console.log(¦Welcome back, #{user}!¦);
} else {
  console.log("Wrong username or password");
}`, note: "Real sites never tell you <i>which</i> part was wrong — that would help a hacker." }],
      twist: "Accept the username in any case (<code>SARA</code>, <code>Sara</code>) but keep the password exact." },
    { id: "d9-ticket", lvl: "fire", title: "Cinema ticket price", prompt: "<p>Ask for an age, then the day (e.g. <code>friday</code>). Rules:</p><ul><li>Children under 4 enter free: show <code>Price: 0 riyals</code>.</li><li>Otherwise the price is 40 riyals, or 25 riyals for ages 60 and over.</li><li>On <code>friday</code> or <code>saturday</code>, add 10 riyals (not for the free children).</li></ul><p>Show <code>Price: 50 riyals</code> etc.</p>", tests: [{ stdin: "2\nfriday", expected: "Price: 0 riyals" }, { stdin: "16\nmonday", expected: "Price: 40 riyals" }, { stdin: "16\nsaturday", expected: "Price: 50 riyals" }, { stdin: "65\nfriday", expected: "Price: 35 riyals" }, { stdin: "60\ntuesday", expected: "Price: 25 riyals" }],
      hint: "First the free case. In the <code>else</code> block, set the base price with <code>if / else</code>, then a second <code>if</code> with <code>||</code> adds the weekend extra.",
      solutions: [{ name: "Nested", code: c`const age = Number(prompt("Age?"));
const day = prompt("Day?");
if (age < 4) {
  console.log("Price: 0 riyals");
} else {
  let price = 40;
  if (age >= 60) {
    price = 25;
  }
  if (day === "friday" || day === "saturday") {
    price += 10;
  }
  console.log(¦Price: #{price} riyals¦);
}`, note: "Inside the <code>else</code>, two independent <code>if</code>s each change <code>price</code>." },
        { name: "Price variable from the start", code: c`const age = Number(prompt("Age?"));
const day = prompt("Day?");
const weekend = day === "friday" || day === "saturday";
let price = 40;
if (age < 4) {
  price = 0;
} else if (age >= 60) {
  price = 25;
}
if (price > 0 && weekend) {
  price += 10;
}
console.log("Price:", price, "riyals");`, note: "A boolean <code>weekend</code> and one <code>console.log</code> at the end." }] },
    { id: "d9-fix", lvl: "fire", debug: true, title: "Fix the weather advice", prompt: "<p>This program has <b>three</b> bugs. It should show <code>Very hot</code> for 40+, <code>Hot</code> for 30–39, <code>Nice</code> for 20–29 and <code>Cold</code> below 20. For 45 or more it must <b>also</b> show <code>Stay inside!</code> and <code>Drink water!</code> — and only then.</p><pre class=\"code-static\">Input 46:\nVery hot\nStay inside!\nDrink water!</pre>",
      starter: c`const temp = Number(prompt("Temperature?"));
if (temp >= 30) {
  console.log("Hot");
} else if (temp >= 40) {
  console.log("Very hot");
} else if (temp >= 20); {
  console.log("Nice");
} else {
  console.log("Cold");
}
if (temp >= 45)
  console.log("Stay inside!");
  console.log("Drink water!");`,
      tests: [{ stdin: "46", expected: "Very hot\nStay inside!\nDrink water!" }, { stdin: "35", expected: "Hot" }, { stdin: "25", expected: "Nice" }, { stdin: "10", expected: "Cold" }],
      hint: "Run it and read the error first. Then check the order of the chain, and which lines really belong to the last <code>if</code>.",
      solutions: [{ name: "Fixed", code: c`const temp = Number(prompt("Temperature?"));
if (temp >= 40) {
  console.log("Very hot");
} else if (temp >= 30) {
  console.log("Hot");
} else if (temp >= 20) {
  console.log("Nice");
} else {
  console.log("Cold");
}
if (temp >= 45) {
  console.log("Stay inside!");
  console.log("Drink water!");
}`, note: "Bug 1: the <code>;</code> after <code>else if (temp &gt;= 20)</code> (it causes the SyntaxError). Bug 2: 40 must be tested before 30. Bug 3: without braces <code>Drink water!</code> showed for every temperature." }] },
  ],
  quiz: [
    { q: "What does this show?", code: c`const a = 3;
if (a > 5) {
  console.log("big");
} else {
  console.log("small");
}`, o: ["`big`", "`small`", "`big small`"], a: 1, e: "3 > 5 is `false`, so the `else` block runs." },
    { q: "In an `if / else if / else` chain, how many blocks run?", o: ["All blocks whose condition is true", "Exactly one", "At most two", "None if the last condition is false"], a: 1, e: "The first true condition wins and the rest are skipped. If none is true, the `else` runs. So always exactly one." },
    { q: "What does this show?", code: c`const mark = 85;
if (mark >= 50) {
  console.log("Pass");
} else if (mark >= 80) {
  console.log("Merit");
}`, o: ["`Pass`", "`Merit`", "`Pass Merit`"], a: 0, e: "85 >= 50 is true first, so `Pass` wins. The order is wrong: `Merit` can never be shown." },
    { q: "Which line correctly checks that `day` is `\"friday\"`?", o: ["`if (day = \"friday\") {`", "`if (day === \"friday\") {`", "`if day === \"friday\" {`", "`if (day === \"friday\"); {`"], a: 1, e: "Brackets around the condition, `===` to compare, and no `;` before the block." },
    { q: "What does this show?", code: c`const x = 0;
if (x) {
  console.log("yes");
} else {
  console.log("no");
}`, o: ["`yes`", "`no`"], a: 1, e: "`0` is falsy, so the condition counts as false and the `else` runs." },
    { q: "What does this show?", code: c`const h = 10;
if (h > 5) {
  if (h > 20) {
    console.log("X");
  } else {
    console.log("Y");
  }
}`, o: ["`X`", "`Y`", "nothing"], a: 1, noRun: true, e: "10 > 5 is true, so we enter. 10 > 20 is false, so the inner `else` shows `Y`." },
  ],
  puzzle: { title: "Which way does it go?", q: "<p>The user types <code>15</code>. What <b>exactly</b> does this program show? Type the output on one line.</p>", code: c`const n = Number(prompt("Number?"));
let label = "";
if (n % 3 === 0 && n % 5 === 0) {
  label = "FizzBuzz";
} else if (n % 3 === 0) {
  label = "Fizz";
} else if (n % 5 === 0) {
  label = "Buzz";
} else {
  label = String(n);
}
console.log(label, n > 10);`, answers: ["FizzBuzz true"], hint: "15 can be divided by 3 and by 5. Which condition is tested first?", e: "15 % 3 and 15 % 5 are both 0, so the first condition is true: `FizzBuzz`. And 15 > 10 is `true`. This is the famous FizzBuzz test — the order of the chain is the whole trick." },
  cards: [
    { f: "Shape of an `if` statement?", b: "`if (condition) { ... }` — round brackets for the condition, curly braces for the block." },
    { f: "In `if / else if / else`, which block runs?", b: "The **first** one whose condition is true. If none is true, the `else`." },
    { f: "In which order do you write `>=` conditions in a chain?", b: "From the strictest (highest) to the easiest, or the easy one catches everything." },
    { f: "Why is `if (x = 5)` a bug?", b: "`=` stores 5 in `x` instead of comparing. Use `===`." },
    { f: "Why always write `{ }`?", b: "Without braces only the first line belongs to the `if`; the next lines always run." },
  ],
  remember: [
    "`if (condition) { ... }` runs the block only when the condition is true (or truthy).",
    "`else` gives the other path: exactly one of the two blocks runs.",
    "In an `else if` chain the **first** true condition wins — put the strictest first.",
    "Convert `prompt()` input with `Number()` before comparing numbers.",
    "You can use `&&`, `||` and `!` in conditions, and put an `if` inside another `if`.",
    "Always use braces, `===`, and never a `;` right after `if (...)`.",
  ],
};
})();
