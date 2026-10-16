window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[16] = {
  title: "Arrow functions and scope",
  intro: "Yesterday you built your first functions, {{name}}. Today you learn the short modern way to write them (arrow functions), how to hand a function to another function, and the rules that decide <b>where a variable can be seen</b>.",
  goals: [
    "Store a function in a variable with a **function expression**",
    "Write arrow functions: one line with implicit return, with braces and `return`, one parameter without `()`",
    "Pass a function to another function (a **callback**)",
    "Explain global, function and block **scope** with `let` / `const`",
    "Know why `var` is old style, and what a **pure** function is",
  ],
  learn: [
    { t: "h", text: "A function is a value" },
    { t: "p", html: "<p>On Day 2 you stored numbers and strings in variables. Here is a surprise: a function is <b>also a value</b>, so it can be stored in a variable too. This is called a <b>function expression</b>. You will see it in almost every modern program, so it is worth learning to read it.</p>" },
    { t: "code", code: c`const double = function (n) {
  return n * 2;
};

console.log(double(7));`, note: "<p>The function has no name of its own after <code>function</code>; the variable <code>double</code> holds it. You call it exactly like yesterday: <code>double(7)</code>. Notice the <code>;</code> after the <code>}</code> — this whole thing is one <code>const</code> statement.</p>" },
    { t: "check", q: "What does this program show?", code: c`const shout = function (word) {
  return word.toUpperCase() + "!";
};
console.log(shout("goal"));`, o: ["`GOAL!`", "`goal!`", "`shout`", "`undefined`"], a: 0, e: "`shout` holds a function. Calling it with `\"goal\"` returns `\"GOAL!\"`." },
    { t: "h", text: "Arrow functions: the short way" },
    { t: "p", html: "<p>Writing <code>function</code> and <code>return</code> again and again for tiny jobs is tiring. In 2015 JavaScript added <b>arrow functions</b>, written with <code>=&gt;</code>. They do the same job with less typing, and most code you will read online uses them.</p>" },
    { t: "analogy", title: "An arrow function is a shortcut on your phone", html: "<p>You can open the camera by unlocking the phone, finding the app and tapping it — or by one swipe on the lock screen. Same camera, fewer steps. An arrow function is the same function with a shorter way to get there.</p>" },
    { t: "code", code: c`const double = (n) => n * 2;
const add = (a, b) => a + b;
const square = n => n * n;

console.log(double(7), add(2, 3), square(4));`, before: "<p>Three arrow functions. Read each one as \"takes … and gives back …\".</p>", note: "<p>When the body is <b>one expression with no braces</b>, its value is returned automatically — this is called an <b>implicit return</b>. With exactly one parameter you may drop the parentheses: <code>n =&gt; n * n</code>.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`const add =`, "Create a constant named <code>add</code> that will hold a function."],
      [c`(a, b)`, "The parameters, as before."],
      [c`=>`, "The arrow: \"gives back\". It replaces the word <code>function</code>."],
      [c`a + b`, "One expression without braces: its value is returned. No <code>return</code> word needed."],
    ] },
    { t: "code", code: c`const report = (name, mark) => {
  const result = mark >= 50 ? "pass" : "fail";
  return ¦#{name}: #{result}¦;
};
console.log(report("{{name}}", 72));`, before: "<p>When you need <b>more than one line</b>, use braces — and then you must write <code>return</code> yourself.</p>", note: "<p>Rule to remember: <b>no braces → automatic return; braces → write <code>return</code></b>. Forgetting <code>return</code> inside braces gives <code>undefined</code>.</p>" },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`const cube = x => x * x * x;
console.log(cube(3));`, answers: ["27"], run: true, e: "One parameter `x`, no braces, so `x * x * x` is returned: 27.", placeholder: "type the output" },
    { t: "check", q: "What does this show?", code: c`const half = n => {
  n / 2;
};
console.log(half(10));`, o: ["`5`", "`undefined`", "`10`", "`n / 2`"], a: 1, e: "With braces there is no automatic return. The function calculates 5 and throws it away, so it gives back `undefined`.", hint: "Are there braces? Then is there a `return`?" },
    { t: "h", text: "Passing a function to a function" },
    { t: "p", html: "<p>Because a function is a value, you can <b>give it to another function as an argument</b>. A function passed like this is called a <b>callback</b>: \"here is what to do — call it back when it is time.\" On Day 18 and in Week 4 (button clicks!) you will use callbacks all the time, so let's meet them gently.</p>" },
    { t: "analogy", title: "A callback is like leaving instructions", html: "<p>You tell your little brother: \"Ring the bell <b>3 times</b>, and <i>each time</i>, do this: wave.\" The number is a normal value; \"wave\" is an <b>action</b> you handed him. He decides when to run it. <code>repeat(3, wave)</code> is exactly that.</p>" },
    { t: "code", code: c`function repeat(n, action) {
  for (let i = 1; i <= n; i++) {
    action(i);
  }
}

repeat(3, (i) => console.log("Lap", i));`, note: "<p><code>repeat</code> does not know what the action is; it just calls <code>action(i)</code> each round. We passed an arrow function that logs a lap. Pass a different arrow function and <code>repeat</code> does something different — without changing <code>repeat</code> at all.</p>" },
    { t: "viz", code: c`function repeat(n, action) {
  for (let i = 1; i <= n; i++) {
    action(i);
  }
}
const cheer = step => console.log("Go! " + step);
repeat(2, cheer);`, before: "<p>Visualize it. Watch <code>repeat</code> call <code>cheer</code>: each time, a new <code>cheer</code> box with its own <code>step</code> appears on top of <code>repeat</code>.</p>" },
    { t: "turn", level: "Medium", q: "What does this show (on one line)?", code: c`function twice(action) {
  action();
  action();
}
let count = 0;
twice(() => count++);
console.log(count);`, answers: ["2"], run: true, e: "`twice` calls the action two times, and each call adds 1 to `count`.", placeholder: "type the output" },
    { t: "h", text: "Scope: where can a variable be seen?" },
    { t: "p", html: "<p>When programs grow, two parts may use the same variable name, like <code>total</code>. If every variable were visible everywhere, they would fight. <b>Scope</b> is the rule that decides <b>where a variable lives</b>. With <code>let</code> and <code>const</code> the rule is simple: <b>a variable lives inside the nearest <code>{ }</code> where it was created</b>, and inner code can see outer variables, but not the other way round.</p>" },
    { t: "analogy", title: "Scope is like rooms in your home", html: "<p>Things in the living room (the <b>global</b> scope) can be used by everyone. Things in your bedroom (a <b>function</b>) belong to you: you can walk out and use the living-room TV, but your family cannot see your desk from the living room. A drawer in your desk (a <b>block</b>, like the <code>{ }</code> of an <code>if</code>) is even more private.</p>" },
    { t: "code", code: c`const school = "Riyadh High";      // global

function showClass() {
  const room = "10B";                // function scope
  if (room === "10B") {
    const teacher = "Ms. Huda";       // block scope
    console.log(school, room, teacher);
  }
  console.log(school, room);
}
showClass();`, note: "<p>Inside the <code>if</code> block, all three names are visible. After the block, <code>teacher</code> is gone. Outside the function, only <code>school</code> exists.</p>" },
    { t: "code", code: c`for (let i = 0; i < 3; i++) {
  const msg = "round " + i;
}
console.log(msg);`, error: true, before: "<p>Block scope applies to loops too.</p>", note: "<p>This error is expected: <code>msg</code> was created inside the loop's <code>{ }</code>, so it does not exist after it. If you need a value after the loop, create the variable <b>before</b> the loop.</p>" },
    { t: "check", q: "Which line causes a `ReferenceError`?", code: c`let a = 1;          // line 1
function f() {
  let b = 2;
  console.log(a);   // line 4
}
f();
console.log(b);     // line 7`, o: ["Line 4", "Line 7", "Neither"], a: 1, e: "Line 4 is inside the function and can see the global `a`. Line 7 is outside, and `b` lives only inside `f`.", noRun: true },
    { t: "p", html: "<p><b>What about <code>var</code>?</b> Old JavaScript only had <code>var</code>. It ignores block <code>{ }</code> of <code>if</code> and <code>for</code> and \"leaks\" out of them, which caused many hidden bugs. You will see it in old tutorials; just read it as an old <code>let</code> and always write <code>let</code> or <code>const</code> yourself.</p>" },
    { t: "h", text: "Pure functions" },
    { t: "p", html: "<p>A <b>pure function</b> uses only its parameters and returns a result. It changes nothing outside itself, so the same inputs always give the same output — easy to test and trust. An <b>impure</b> function changes an outside variable (or prints, or asks for input). Impure functions are sometimes needed, but prefer pure ones for calculations.</p>" },
    { t: "code", code: c`let score = 10;

function addBonusImpure() {
  score = score + 5;      // changes an outside variable
}
const addBonusPure = s => s + 5;

addBonusImpure();
addBonusImpure();
console.log(score);
console.log(addBonusPure(10), addBonusPure(10));`, note: "<p>Each call of the impure function changed <code>score</code>, so the result depends on how many times it ran. The pure one gives 15 every time for 10.</p>" },
    { t: "table", head: ["Style", "Example", "Return"], rows: [
      ["declaration", "`function add(a, b) { return a + b; }`", "write `return`"],
      ["expression", "`const add = function (a, b) { return a + b; };`", "write `return`"],
      ["arrow, one line", "`const add = (a, b) => a + b;`", "automatic"],
      ["arrow, one parameter", "`const sq = n => n * n;`", "automatic"],
      ["arrow with braces", "`const add = (a, b) => { return a + b; };`", "write `return`"],
    ] },
    { t: "steps", title: "A times-table printer with a callback", problem: "<p>Print the 7 times table up to 5, like this, using a reusable <code>repeat(n, action)</code> helper and an arrow function:</p><pre class=\"code-static\">7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35</pre>",
      steps: [
        { html: "<p><b>Understand.</b> Five lines, each with a number from 1 to 5. Something must run 5 times and know which round it is.</p>" },
        { html: "<p><b>Plan.</b> A general helper <code>repeat</code> does the counting and hands the round number to an action.</p>", code: c`function repeat(n, action) {
  for (let i = 1; i <= n; i++) {
    action(i);
  }
}` },
        { html: "<p><b>Build the action.</b> A small pure arrow function makes one line of text; another prints it.</p>", code: c`const line = (table, k) => ¦#{table} x #{k} = #{table * k}¦;` },
        { html: "<p><b>Connect them.</b> Pass an arrow function to <code>repeat</code>; it receives <code>k</code> each round.</p>", code: c`repeat(5, k => console.log(line(7, k)));` },
      ],
      code: c`function repeat(n, action) {
  for (let i = 1; i <= n; i++) {
    action(i);
  }
}

const line = (table, k) => ¦#{table} x #{k} = #{table * k}¦;

repeat(5, k => console.log(line(7, k)));` },
  ],
  mistakes: [
    { title: "Braces without return", html: "As soon as an arrow function has <code>{ }</code>, the automatic return is gone.", wrong: c`const add = (a, b) => { a + b; };
console.log(add(1, 2)); // undefined`, right: c`const add = (a, b) => a + b;
console.log(add(1, 2)); // 3` },
    { title: "Calling the callback too early", html: "Pass the function itself, not the result of calling it. <code>repeat(3, hello())</code> runs <code>hello</code> once and passes <code>undefined</code>.", wrong: c`const hello = () => console.log("Hi");
repeat(3, hello());`, right: c`const hello = () => console.log("Hi");
repeat(3, hello);` },
    { title: "Using a block variable after the block", html: "A <code>let</code> / <code>const</code> created inside <code>{ }</code> disappears at the <code>}</code>. Create it before the block if you need it later.", wrong: c`if (true) {
  let total = 50;
}
console.log(total);`, right: c`let total = 0;
if (true) {
  total = 50;
}
console.log(total);` },
    { title: "Using an arrow function before it is created", html: "A function <b>declaration</b> can be called above its line, but a function stored in <code>const</code> cannot: the variable is not ready yet.", wrong: c`console.log(sq(3));
const sq = n => n * n;`, right: c`const sq = n => n * n;
console.log(sq(3));` },
  ],
  tricks: [
    { title: "No parameters? Empty parentheses", html: "An arrow function with no parameters needs <code>()</code>.", code: c`const hello = () => "Hello, {{name}}!";
console.log(hello());` },
    { title: "Same name, different rooms", html: "Two functions can each have their own <code>total</code>; they never collide because each lives in its own scope.", code: c`function a() {
  const total = 1;
  return total;
}
function b() {
  const total = 2;
  return total;
}
console.log(a(), b());` },
    { title: "Store small helpers in const", html: "Writing helpers with <code>const</code> stops you from accidentally replacing them later.", code: c`const toRiyals = dollars => dollars * 3.75;
console.log(toRiyals(10));` },
  ],
  practice: [
    { t: "try", title: "Make it yours", html: "<p>Rewrite each function below as a one-line arrow function. Run to check that the output does not change.</p>", code: c`function triple(n) {
  return n * 3;
}
function isPass(mark) {
  return mark >= 50;
}
console.log(triple(5), isPass(64));` },
    { t: "predict", code: c`const f = x => x + 1;
const g = x => f(x) * 2;
console.log(g(3));`, explain: "<p><code>g(3)</code> calls <code>f(3)</code> = 4, then multiplies by 2: <code>8</code>.</p>" },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`const greet = name => ¦Hi #{name}¦;
console.log(greet("Lama"));`, answers: ["Hi Lama"], run: true, e: "One parameter, no braces, so the template string is returned.", placeholder: "type the output", oneWord: false },
    { t: "parsons", title: "Run an action 3 times", prompt: "Build <code>repeat</code>, then use it to print <code>Push-up 1</code>, <code>Push-up 2</code>, <code>Push-up 3</code>.", lines: [c`function repeat(n, action) {`, c`  for (let i = 1; i <= n; i++) {`, c`    action(i);`, c`  }`, c`}`, c`repeat(3, i => console.log("Push-up " + i));`], distractors: [c`repeat(3, console.log("Push-up " + i));`], explain: "The second argument must be a function (an arrow), not the result of a call." },
    { t: "predict", code: c`let x = "outside";
function test() {
  let x = "inside";
  console.log(x);
}
test();
console.log(x);`, explain: "<p>The function has its own <code>x</code>, which hides the outer one only inside the function. Outside, the global <code>x</code> is untouched.</p>" },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`let total = 0;
const addTo = n => { total += n; };
addTo(4);
addTo(6);
console.log(total);`, answers: ["10"], run: true, e: "`addTo` is impure: it changes the outside `total` each time. 0 + 4 + 6 = 10.", placeholder: "type the output" },
    { t: "try", title: "Visualize scope", html: "<p>Press <b>Visualize</b> and step through. Watch which variables appear in Global, in the function box, and when <code>bonus</code> disappears.</p>", code: c`const base = 80;
function finalMark(extra) {
  let mark = base + extra;
  if (mark > 100) {
    const bonus = "capped";
    mark = 100;
    console.log(bonus);
  }
  return mark;
}
console.log(finalMark(25));` },
  ],
  exercises: [
    { id: "arrow-square", lvl: "seed", title: "Square, the arrow way", prompt: "<p>Create <code>square</code> as a <b>one-line arrow function</b> that returns a number times itself.</p>", hint: "<code>const square = n =&gt; ...;</code>",
      tests: [{ after: c`console.log(square(4));`, expected: "16" }, { after: c`console.log(square(9));`, expected: "81" }, { after: c`console.log(square(-3));`, expected: "9" }],
      solutions: [{ name: "Arrow", code: c`const square = n => n * n;` }, { name: "With **", code: c`const square = (n) => n ** 2;` }] },
    { id: "full-name", lvl: "seed", title: "Full name", prompt: "<p>Create an arrow function <code>fullName(first, last)</code> that returns the two names with one space between them.</p>", hint: "Two parameters need parentheses: <code>(first, last) =&gt; ...</code>",
      tests: [{ after: c`console.log(fullName("Sara", "Ali"));`, expected: "Sara Ali" }, { after: c`console.log(fullName("Omar", "Saleh"));`, expected: "Omar Saleh" }],
      solutions: [{ name: "Template", code: c`const fullName = (first, last) => ¦#{first} #{last}¦;` }, { name: "Plus", code: c`const fullName = (first, last) => first + " " + last;` }] },
    { id: "repeat-helper", lvl: "star", title: "Your own repeat", prompt: "<p>Write <code>repeat(n, action)</code> that calls <code>action</code> <code>n</code> times, passing the round number (1, 2, 3 …) each time. The tests will pass their own actions.</p>", starter: c`function repeat(n, action) {
  // call action(1), action(2), ... action(n)
}`, hint: "A <code>for</code> loop from 1 to <code>n</code>, and inside it <code>action(i);</code>",
      tests: [{ after: c`repeat(3, i => console.log("Lap " + i));`, expected: "Lap 1\nLap 2\nLap 3" }, { after: c`let sum = 0;
repeat(4, i => { sum += i; });
console.log(sum);`, expected: "10" }, { after: c`repeat(0, i => console.log("never"));
console.log("done");`, expected: "done" }],
      solutions: [{ name: "for", code: c`function repeat(n, action) {
  for (let i = 1; i <= n; i++) {
    action(i);
  }
}` }, { name: "while", code: c`const repeat = (n, action) => {
  let i = 1;
  while (i <= n) {
    action(i);
    i++;
  }
};` }] },
    { id: "apply-twice", lvl: "star", title: "Apply twice", prompt: "<p>Write <code>applyTwice(f, x)</code> that returns <code>f(f(x))</code> — the function used on <code>x</code>, then used again on the result.</p>", hint: "One line: <code>const applyTwice = (f, x) =&gt; f(f(x));</code>",
      tests: [{ after: c`console.log(applyTwice(n => n + 3, 10));`, expected: "16" }, { after: c`console.log(applyTwice(n => n * n, 3));`, expected: "81" }, { after: c`console.log(applyTwice(s => s + "!", "Wow"));`, expected: "Wow!!" }],
      solutions: [{ name: "Arrow", code: c`const applyTwice = (f, x) => f(f(x));` }, { name: "Step by step", code: c`function applyTwice(f, x) {
  const once = f(x);
  return f(once);
}` }] },
    { id: "make-pure", lvl: "star", title: "Make it pure", prompt: "<p>The function below changes an outside variable. Rewrite <code>addVat</code> as a <b>pure</b> arrow function that takes a price and <b>returns</b> the price plus 15% VAT. Keep the name.</p>", starter: c`let price = 100;
function addVat() {
  price = price * 1.15;
}`, hint: "Use a parameter instead of the outside variable, and return the result: <code>p + p * 15 / 100</code>. (Computers store decimals like 1.15 slightly inexactly, so <code>100 * 1.15</code> gives 114.99999999999999 — this way avoids that.)",
      tests: [{ after: c`console.log(addVat(100));`, expected: "115" }, { after: c`console.log(addVat(20));`, expected: "23" }, { after: c`console.log(addVat(200), addVat(200));`, expected: "230 230" }],
      solutions: [{ name: "Pure arrow", code: c`const addVat = p => p + p * 15 / 100;`, note: "Same input, same output, nothing outside changes." }] },
    { id: "fix-scope", lvl: "fire", debug: true, title: "Fix the counter", prompt: "<p>This program should print <code>Even numbers: 5</code> (the even numbers from 1 to 10). It has <b>two</b> bugs: one about an arrow function and one about scope. Fix them.</p>", starter: c`const isEven = n => { n % 2 === 0; };

for (let i = 1; i <= 10; i++) {
  let count = 0;
  if (isEven(i)) {
    count++;
  }
}
console.log("Even numbers: " + count);`,
      hint: "Where must <code>count</code> be created so it is still alive after the loop and not reset every round? What does an arrow function with braces return?",
      tests: [{ expected: "Even numbers: 5" }, { after: c`console.log(isEven(6), isEven(7));`, expected: "true false" }],
      solutions: [{ name: "Fixed", code: c`const isEven = n => n % 2 === 0;

let count = 0;
for (let i = 1; i <= 10; i++) {
  if (isEven(i)) {
    count++;
  }
}
console.log("Even numbers: " + count);`, note: "Bug 1: the braces in <code>isEven</code> removed the automatic return. Bug 2: <code>count</code> was created inside the loop, so it was reset to 0 every round and did not exist after the loop. Create it once, before the loop." }] },
    { id: "countdown-callback", lvl: "fire", title: "Countdown with a callback", prompt: "<p>Write <code>countdown(from, onTick, onEnd)</code>: it calls <code>onTick(k)</code> for <code>k = from, from-1, … 1</code>, then calls <code>onEnd()</code> once. Example: <code>countdown(3, k =&gt; console.log(k), () =&gt; console.log(\"Go!\"))</code> prints <code>3</code>, <code>2</code>, <code>1</code>, <code>Go!</code>.</p>", hint: "A <code>for</code> loop going down (<code>k--</code>), then after the loop <code>onEnd();</code>",
      tests: [{ after: c`countdown(3, k => console.log(k), () => console.log("Go!"));`, expected: "3\n2\n1\nGo!" }, { after: c`let s = "";
countdown(5, k => { s += k; }, () => { s += "!"; });
console.log(s);`, expected: "54321!" }, { after: c`countdown(0, k => console.log(k), () => console.log("end"));`, expected: "end" }],
      solutions: [{ name: "for down", code: c`function countdown(from, onTick, onEnd) {
  for (let k = from; k >= 1; k--) {
    onTick(k);
  }
  onEnd();
}` }, { name: "Arrow + while", code: c`const countdown = (from, onTick, onEnd) => {
  let k = from;
  while (k > 0) {
    onTick(k);
    k--;
  }
  onEnd();
};` }],
      twist: "Use your countdown to print a rocket launch: <code>T-3</code>, <code>T-2</code>, <code>T-1</code>, <code>🚀 Lift off, {{name}}!</code>" },
  ],
  quiz: [
    { q: "Which arrow function returns its parameter times 10?", o: ["`const f = n => { n * 10; };`", "`const f = n => n * 10;`", "`const f => n * 10;`", "`const f = n -> n * 10;`"], a: 1, e: "No braces gives an automatic return. With braces you would need `return`." },
    { q: "What does this show?", code: c`const add = (a, b) => a + b;
console.log(add("1", 2));`, o: ["`3`", "`12`", "`undefined`", "`1 2`"], a: 1, e: "`\"1\"` is a string, so `+` glues: `\"12\"`." },
    { q: "What does this show?", code: c`function run(action) {
  return action(5);
}
console.log(run(n => n - 1));`, o: ["`4`", "`5`", "`6`", "`undefined`"], a: 0, e: "`run` calls the callback with 5, and the callback returns 5 - 1." },
    { q: "What does this show?", code: c`let x = 1;
if (true) {
  let x = 2;
}
console.log(x);`, o: ["`1`", "`2`", "`undefined`"], a: 0, e: "The inner `let x` lives only inside the block. The outer `x` is still 1." },
    { q: "Why is `var` called old style?", o: ["It is slower", "It ignores block `{ }` and leaks out of `if` and `for`", "It cannot hold numbers", "It only works in old browsers"], a: 1, e: "`let` and `const` respect blocks; `var` does not, which causes hidden bugs." },
    { q: "Which function is **pure**?", o: ["`const f = n => n + 1;`", "`const f = () => { total++; };`", "`const f = n => { console.log(n); };`"], a: 0, e: "It uses only its parameter and returns a result. The others change or print something outside." },
  ],
  puzzle: { title: "Callbacks in a chain", q: "<p>Without running it: what does this program show?</p>", code: c`const apply = (f, x) => f(x);
const inc = n => n + 1;
const dbl = n => n * 2;
console.log(apply(dbl, apply(inc, 4)));`, answers: ["10"], run: true, hint: "Start inside: `apply(inc, 4)`.", e: "`apply(inc, 4)` is 5. Then `apply(dbl, 5)` is 10." },
  cards: [
    { f: "Function expression?", b: "A function stored in a variable: `const f = function (x) { return x; };`" },
    { f: "Arrow function, one line?", b: "`const f = (a, b) => a + b;` — the value is returned automatically." },
    { f: "Arrow function with braces?", b: "`const f = x => { return x * 2; };` — braces mean you must write `return`." },
    { f: "What is a callback?", b: "A function passed to another function, which calls it later: `repeat(3, i => console.log(i));`" },
    { f: "Where does a `let` / `const` variable live?", b: "Inside the nearest `{ }` where it was created (block, function or global)." },
  ],
  remember: [
    "Functions are values: store them in variables (`const f = function ...`).",
    "Arrow functions: `x => x * 2` (one parameter), `(a, b) => a + b`, `() => ...`.",
    "No braces → automatic return. Braces → write `return`.",
    "A callback is a function you pass to another function; pass `f`, not `f()`.",
    "`let` / `const` live inside their `{ }`; inner code sees outer variables, not the other way. Avoid old `var`.",
    "Pure functions use only their parameters and return a result — easiest to test.",
  ],
};
})();
