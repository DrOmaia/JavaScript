window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[15] = {
  title: "Functions: parameters and return",
  intro: "Welcome to Week 3, {{name}}! Until now every program was one long list of instructions. Today you learn to pack instructions into a <b>function</b>: a small machine with a name that you build once and use as many times as you like.",
  goals: [
    "Explain why functions help: reuse, clear names, no repeated code",
    "Declare a function with `function name(params) { }` and call it",
    "Tell **parameters** from **arguments**",
    "Send a value back with `return`, and know that code after `return` does not run",
    "Explain the difference between `return` and `console.log` (very important!)",
    "Use default parameters and make one function call another",
  ],
  learn: [
    { t: "h", text: "Why functions?" },
    { t: "p", html: "<p>Imagine your program greets five friends, and each greeting is three lines long. You copy the three lines five times. Then your teacher asks for a small change in the greeting… and you must fix it in five places. Programmers have a rule for this: <b>DRY — Don't Repeat Yourself</b>. A <b>function</b> lets you write the steps <b>once</b>, give them a <b>name</b>, and run them whenever you need them.</p>" },
    { t: "analogy", title: "A function is like a juice machine", html: "<p>A juice machine in the canteen has a name on it (\"Juicer\"). You put fruit <b>in</b> (the input), the machine does its job inside where you cannot see, and a cup of juice comes <b>out</b> (the output). You do not rebuild the machine every time you want juice — you just press the button again. A function works the same way: build it once, use it many times.</p>" },
    { t: "code", code: c`function greet() {
  console.log("Hello!");
  console.log("Welcome to JS30.");
}

greet();
greet();`, before: "<p>Look at the two parts: first we <b>declare</b> (build) the function, then we <b>call</b> (use) it twice.</p>", note: "<p>Declaring a function does <b>not</b> run it. Nothing happens until a line says <code>greet();</code>. Two calls, so the two lines appear twice.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`function`, "The keyword that says \"I am building a function\"."],
      [c`greet`, "The function's <b>name</b>. Same naming rules as variables; a good name is a verb: <code>greet</code>, <code>showMenu</code>, <code>calcTotal</code>."],
      [c`()`, "Parentheses hold the inputs. This function needs none, so they are empty — but they must be there."],
      [c`{ ... }`, "The <b>body</b>: the instructions that run each time the function is called."],
      [c`greet();`, "The <b>call</b>. The name plus <code>()</code> means \"run it now\". Without <code>()</code> nothing runs."],
    ] },
    { t: "check", q: "How many times does `Hi` appear?", code: c`function sayHi() {
  console.log("Hi");
}
sayHi();
sayHi();
sayHi();`, o: ["`Hi`", "`Hi\nHi\nHi`", "nothing"], a: 1, e: "The body runs once per call, and there are three calls.", hint: "Count the lines that end with `();`." },
    { t: "h", text: "Parameters and arguments" },
    { t: "p", html: "<p>A greeting that always says the same thing is boring. We want <code>greet(\"Sara\")</code> and <code>greet(\"Omar\")</code> to say different things. The function needs an <b>input</b>. Inside the parentheses of the declaration you write a <b>parameter</b>: a variable that will receive the value.</p>" },
    { t: "code", code: c`function greet(name) {
  console.log(¦Hello, #{name}!¦);
}

greet("{{name}}");
greet("Omar");`, note: "<p><code>name</code> is the <b>parameter</b> (the empty box in the declaration). <code>\"{{name}}\"</code> and <code>\"Omar\"</code> are the <b>arguments</b> (the real values you put in when you call). Several parameters are separated by commas: <code>function add(a, b)</code>, called with <code>add(2, 3)</code>; the first argument goes into the first parameter, the second into the second.</p>" },
    { t: "analogy", title: "Parameters are empty seats, arguments are the people", html: "<p>A bus has numbered seats: seat 1, seat 2. When the bus leaves, real people sit in them. The <b>parameters</b> are the seats written in the declaration; the <b>arguments</b> are the people who sit there for one trip (one call). Next trip, different people — same seats.</p>" },
    { t: "turn", level: "Easy", q: "What does this program show?", code: c`function price(item, riyals) {
  console.log(item, "costs", riyals);
}
price("Juice", 5);`, answers: ["Juice costs 5"], run: true, e: "The first argument `\"Juice\"` goes into `item`, the second `5` goes into `riyals`.", hint: "Match the arguments to the parameters in order.", placeholder: "type the output", oneWord: false },
    { t: "h", text: "return: sending a value back" },
    { t: "p", html: "<p>Most useful functions <b>calculate something and give the answer back</b>, so the rest of your program can use it: save it in a variable, add it to something, compare it. The keyword <code>return</code> does this. It also <b>ends the function right away</b>.</p>" },
    { t: "code", code: c`function area(width, height) {
  return width * height;
}

const room = area(4, 5);
console.log(room);
console.log(area(2, 3) + area(1, 1));`, note: "<p><code>area(4, 5)</code> is replaced by its result, <code>20</code>, like a calculation. That is why you can store it, print it, or add two calls together: 6 + 1 = 7.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`return width * height;`, "Calculate <code>width * height</code>, then <b>send it back</b> to the place that called the function, and stop."],
      [c`const room = area(4, 5);`, "Call <code>area</code> with 4 and 5. The call becomes the returned value <code>20</code>, which is saved in <code>room</code>."],
      [c`area(2, 3) + area(1, 1)`, "Two calls, two returned values (6 and 1), added like any numbers."],
    ] },
    { t: "code", code: c`function check(mark) {
  if (mark >= 50) {
    return "pass";
  }
  return "fail";
  console.log("This line never runs");
}
console.log(check(70));
console.log(check(30));`, before: "<p><code>return</code> is an exit door: once it runs, the function is finished.</p>", note: "<p>For 70 the first <code>return</code> runs, so the function leaves before reaching <code>return \"fail\"</code>. That is why you often do not need an <code>else</code> after a <code>return</code>. The last <code>console.log</code> is after a <code>return</code>, so it can never run.</p>" },
    { t: "check", q: "What does this program show?", code: c`function test() {
  return 1;
  return 2;
}
console.log(test());`, o: ["`1`", "`2`", "`1\n2`"], a: 0, e: "The first `return` sends back 1 and ends the function. The second `return` is never reached." },
    { t: "h", text: "return vs console.log — the big one" },
    { t: "p", html: "<p>Beginners mix these two up all the time, so read this slowly, {{name}}. <code>console.log</code> <b>shows</b> a value on the screen for a human. <code>return</code> <b>gives</b> a value back to the program. A function that only logs its result has shown it to you, but the program cannot use it afterwards: the call gives back <code>undefined</code>. In fact <b>every function without a <code>return</code> gives back <code>undefined</code></b>.</p>" },
    { t: "code", code: c`function doubleLog(n) {
  console.log(n * 2);
}
function doubleReturn(n) {
  return n * 2;
}

const a = doubleLog(5);
const b = doubleReturn(5);
console.log("a is", a);
console.log("b is", b);`, note: "<p><code>doubleLog(5)</code> printed <code>10</code> while running, but returned nothing, so <code>a</code> is <code>undefined</code>. <code>doubleReturn(5)</code> printed nothing, but <code>b</code> holds <code>10</code> and can be used in more math.</p>" },
    { t: "analogy", title: "Telling vs handing", html: "<p>You ask a friend to solve a homework question. <code>console.log</code> is your friend <b>saying</b> the answer out loud — you heard it, but you have nothing to write with. <code>return</code> is your friend <b>handing you the paper</b> with the answer — now you can copy it, add to it, or pass it on.</p>" },
    { t: "turn", level: "Medium", q: "What does the last line show?", code: c`function half(n) {
  console.log(n / 2);
}
const x = half(8);
console.log(x);`, answers: ["undefined"], e: "`half(8)` prints 4 while running, but it has no `return`, so it gives back `undefined`. The last line shows `undefined`.", hint: "Is there a `return` inside `half`?", placeholder: "one word" },
    { t: "h", text: "Default parameters" },
    { t: "code", code: c`function welcome(name = "student") {
  return ¦Welcome, #{name}!¦;
}
console.log(welcome("{{name}}"));
console.log(welcome());`, before: "<p>If a caller forgets an argument, the parameter is <code>undefined</code>. A <b>default value</b> after <code>=</code> is used instead.</p>", note: "<p>The default is used only when the argument is missing.</p>" },
    { t: "h", text: "Functions that call functions" },
    { t: "p", html: "<p>Big problems become easy when you split them into small functions and let one call another. Each function does one job and has a clear name. Use the visualizer below and watch the <b>call stack</b>: each call gets its own box of variables, and the box disappears when the function returns.</p>" },
    { t: "viz", code: c`function square(n) {
  return n * n;
}
function sumOfSquares(a, b) {
  const first = square(a);
  const second = square(b);
  return first + second;
}
const result = sumOfSquares(3, 4);
console.log(result);`, before: "<p>Press <b>Visualize</b> and click <b>Next ▶</b>. Notice how <code>square</code> appears on top of <code>sumOfSquares</code>, returns a value, and vanishes.</p>" },
    { t: "check", q: "What does this program show?", code: c`function add(a, b) {
  return a + b;
}
function triple(n) {
  return add(n, add(n, n));
}
console.log(triple(4));`, o: ["`8`", "`12`", "`16`", "`undefined`"], a: 1, e: "The inner call `add(4, 4)` returns 8, then `add(4, 8)` returns 12.", hint: "Work from the inside out." },
    { t: "table", head: ["Word", "Meaning", "Example"], rows: [
      ["declare", "build the function (does not run it)", "`function area(w, h) { ... }`"],
      ["call", "run the function", "`area(4, 5)`"],
      ["parameter", "the variable in the declaration", "`w`, `h`"],
      ["argument", "the value given in the call", "`4`, `5`"],
      ["return", "give a value back and stop", "`return w * h;`"],
      ["default", "value used when the argument is missing", "`function f(n = 1)`"],
    ] },
    { t: "steps", title: "Canteen bill with a discount", problem: "<p>The school canteen gives students 10% off. Write a function <code>bill(price, count)</code> that returns the amount to pay, and use it to print:</p><pre class=\"code-static\">Sandwiches: 18 riyals\nJuice: 9 riyals\nTotal: 27 riyals</pre><p>(4 sandwiches at 5 riyals and 2 juices at 5 riyals, both with 10% off.)</p>",
      steps: [
        { html: "<p><b>Understand.</b> For each item: price × count, then take 10% off (multiply by 0.9). 4 × 5 = 20 → 18. 2 × 5 = 10 → 9. Total 27.</p>" },
        { html: "<p><b>Plan.</b> One small function for the discount, one for the bill. The bill function <b>returns</b> a number, so we can add two bills together later.</p>", code: c`function discount(amount) {
  return amount * 0.9;
}` },
        { html: "<p><b>Build the bill.</b> It calls <code>discount</code> — a function using another function.</p>", code: c`function bill(price, count) {
  return discount(price * count);
}` },
        { html: "<p><b>Use the returned values.</b> Save each bill in a variable; the total is just an addition.</p>", code: c`const sandwiches = bill(5, 4);
const juice = bill(5, 2);
console.log(¦Sandwiches: #{sandwiches} riyals¦);` },
        { html: "<p><b>Full program.</b> Run it and compare with the expected receipt.</p>" },
      ],
      code: c`function discount(amount) {
  return amount * 0.9;
}

function bill(price, count) {
  return discount(price * count);
}

const sandwiches = bill(5, 4);
const juice = bill(5, 2);
console.log(¦Sandwiches: #{sandwiches} riyals¦);
console.log(¦Juice: #{juice} riyals¦);
console.log(¦Total: #{sandwiches + juice} riyals¦);` },
  ],
  mistakes: [
    { title: "Forgetting the () when calling", html: "A function name without parentheses does not run the function. Add <code>()</code> to call it.", wrong: c`function hello() {
  console.log("Hi");
}
hello;`, right: c`function hello() {
  console.log("Hi");
}
hello();` },
    { title: "Logging instead of returning", html: "If the rest of the program needs the result, the function must <code>return</code> it. A function that only logs gives back <code>undefined</code>.", wrong: c`function add(a, b) {
  console.log(a + b);
}
const total = add(2, 3) * 10; // NaN`, right: c`function add(a, b) {
  return a + b;
}
const total = add(2, 3) * 10; // 50` },
    { title: "Code after return", html: "<code>return</code> ends the function. Anything written after it in the same block never runs — put your <code>console.log</code> before the <code>return</code>.", wrong: c`function bonus(m) {
  return m + 5;
  console.log("Bonus added");
}`, right: c`function bonus(m) {
  console.log("Bonus added");
  return m + 5;
}` },
    { title: "Using a parameter outside its function", html: "A parameter lives only inside its function. Outside, it does not exist and you get a <code>ReferenceError</code>.", wrong: c`function show(score) {
  console.log(score);
}
show(9);
console.log(score);`, right: c`function show(score) {
  console.log(score);
}
const score = 9;
show(score);
console.log(score);` },
  ],
  tricks: [
    { title: "Return a comparison directly", html: "A comparison is already <code>true</code> or <code>false</code>, so you can return it without an <code>if</code>.", code: c`function isAdult(age) {
  return age >= 18;
}
console.log(isAdult(20), isAdult(15));` },
    { title: "Early return for bad input", html: "Check for problems first and <code>return</code> early. The rest of the function stays simple and flat.", code: c`function percent(part, total) {
  if (total === 0) {
    return 0;
  }
  return part / total * 100;
}
console.log(percent(3, 4), percent(5, 0));` },
    { title: "A function can return a string", html: "Returning a ready-made sentence lets the caller decide where to show it.", code: c`function badge(name, level) {
  return ¦⭐ #{name} — level #{level}¦;
}
console.log(badge("{{name}}", 3));` },
  ],
  practice: [
    { t: "try", title: "Make it yours", html: "<p>Change <code>introduce</code> so it also takes your favourite subject as a third parameter and shows it. Then call it for two friends.</p>", code: c`function introduce(name, age) {
  console.log(¦I am #{name} and I am #{age}.¦);
}
introduce("{{name}}", 15);` },
    { t: "predict", code: c`function f(x) {
  return x + 1;
}
console.log(f(f(1)));`, explain: "<p>The inner call <code>f(1)</code> returns 2, then <code>f(2)</code> returns 3.</p>" },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`function power(base, exp = 2) {
  return base ** exp;
}
console.log(power(5));`, answers: ["25"], run: true, e: "`exp` is missing, so the default 2 is used: 5 ** 2 = 25.", placeholder: "type the output" },
    { t: "parsons", title: "Build a temperature converter", prompt: "Put the lines in order: a function that converts Celsius to Fahrenheit, then print the result for 40 (Riyadh in summer).", lines: [c`function toF(celsius) {`, c`  return celsius * 9 / 5 + 32;`, c`}`, c`console.log(toF(40));`], distractors: [c`  console.log celsius * 9 / 5 + 32;`], explain: "The declaration comes first, the body returns the converted value, and the call is outside the function. 40 °C is 104 °F." },
    { t: "predict", code: c`function hi(name) {
  console.log("Hi " + name);
}
console.log(hi("Ali"));`, explain: "<p>First the call runs and shows <code>Hi Ali</code>. Then the outer <code>console.log</code> shows what the call <b>returned</b>: nothing, so <code>undefined</code>.</p>" },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`function grade(m) {
  if (m >= 90) return "A";
  if (m >= 80) return "B";
  return "C";
}
console.log(grade(85) + grade(95));`, answers: ["BA"], run: true, e: "`grade(85)` returns `\"B\"`, `grade(95)` returns `\"A\"`, and `+` glues the two strings.", placeholder: "type the output" },
    { t: "try", title: "Watch the stack", html: "<p>Press <b>Visualize</b> and follow the calls. How many boxes are on the stack at the busiest moment?</p>", code: c`function addOne(n) {
  return n + 1;
}
function addTwo(n) {
  return addOne(addOne(n));
}
console.log(addTwo(10));` },
  ],
  exercises: [
    { id: "area", lvl: "seed", title: "Area of a rectangle", prompt: "<p>Write a function <code>area(width, height)</code> that <b>returns</b> the area of a rectangle. Do not print inside the function.</p>", starter: c`function area(width, height) {
  // your code
}`, hint: "One line: <code>return width * height;</code>",
      tests: [{ after: c`console.log(area(3, 4));`, expected: "12" }, { after: c`console.log(area(10, 2));`, expected: "20" }, { after: c`console.log(area(7, 7));`, expected: "49" }],
      solutions: [{ name: "Return", code: c`function area(width, height) {
  return width * height;
}`, note: "The caller decides what to do with the number." }] },
    { id: "hello-name", lvl: "seed", title: "A personal greeting", prompt: "<p>Write <code>greeting(name)</code> that returns the string <code>Hello, NAME!</code> (with the name inside). For example <code>greeting(\"Mona\")</code> returns <code>Hello, Mona!</code>.</p>", hint: "Use a template string with backticks, or glue with <code>+</code>.",
      tests: [{ after: c`console.log(greeting("Mona"));`, expected: "Hello, Mona!" }, { after: c`console.log(greeting("Khalid"));`, expected: "Hello, Khalid!" }],
      solutions: [{ name: "Template string", code: c`function greeting(name) {
  return ¦Hello, #{name}!¦;
}` }, { name: "Plus", code: c`function greeting(name) {
  return "Hello, " + name + "!";
}` }] },
    { id: "is-even", lvl: "star", title: "Even or not?", prompt: "<p>Write <code>isEven(n)</code> that returns <code>true</code> if <code>n</code> is even and <code>false</code> otherwise.</p>", hint: "A number is even when <code>n % 2 === 0</code>. You can return the comparison directly.",
      tests: [{ after: c`console.log(isEven(4));`, expected: "true" }, { after: c`console.log(isEven(7));`, expected: "false" }, { after: c`console.log(isEven(0), isEven(-3));`, expected: "true false" }],
      solutions: [{ name: "Return the comparison", code: c`function isEven(n) {
  return n % 2 === 0;
}` }, { name: "With if", code: c`function isEven(n) {
  if (n % 2 === 0) {
    return true;
  }
  return false;
}`, note: "Works, but longer: the comparison is already true or false." }] },
    { id: "max-of-two", lvl: "star", title: "The bigger mark", prompt: "<p>Write <code>bigger(a, b)</code> that returns the bigger of two numbers (if they are equal, return either). Do not use <code>Math.max</code> — use <code>if</code> or the ternary.</p>", hint: "<code>if (a > b) return a;</code> then return b.",
      tests: [{ after: c`console.log(bigger(3, 9));`, expected: "9" }, { after: c`console.log(bigger(15, 2));`, expected: "15" }, { after: c`console.log(bigger(-1, -5), bigger(4, 4));`, expected: "-1 4" }],
      solutions: [{ name: "if", code: c`function bigger(a, b) {
  if (a > b) {
    return a;
  }
  return b;
}` }, { name: "Ternary", code: c`function bigger(a, b) {
  return a > b ? a : b;
}` }] },
    { id: "ticket", lvl: "star", title: "Cinema ticket", prompt: "<p>Write <code>ticket(age, isStudent = false)</code> that returns the price in riyals: under 12 pays 20, students pay 30, everyone else pays 45. (A child is 20 even if a student.)</p>", hint: "Check the age first, then <code>isStudent</code>, then return 45.",
      tests: [{ after: c`console.log(ticket(8));`, expected: "20" }, { after: c`console.log(ticket(16, true));`, expected: "30" }, { after: c`console.log(ticket(30), ticket(10, true));`, expected: "45 20" }],
      solutions: [{ name: "Early returns", code: c`function ticket(age, isStudent = false) {
  if (age < 12) return 20;
  if (isStudent) return 30;
  return 45;
}` }, { name: "if / else if", code: c`function ticket(age, isStudent = false) {
  let price;
  if (age < 12) {
    price = 20;
  } else if (isStudent) {
    price = 30;
  } else {
    price = 45;
  }
  return price;
}` }] },
    { id: "fix-avg", lvl: "fire", debug: true, title: "Fix the average", prompt: "<p>This function should return the average of three marks, and the program should print <code>Average: 80</code>. It has <b>three</b> bugs. Find and fix them.</p>", starter: c`function average(a, b, c) {
  const avg = a + b + c / 3;
  console.log(avg);
}
const result = average(70, 80, 90)
console.log("Average:", result);`,
      hint: "Remember the order of operations, the difference between <code>return</code> and <code>console.log</code>, and the end of every statement.",
      tests: [{ expected: "Average: 80" }, { after: c`console.log(average(10, 20, 30));`, expected: "20" }],
      solutions: [{ name: "Fixed", code: c`function average(a, b, c) {
  const avg = (a + b + c) / 3;
  return avg;
}
const result = average(70, 80, 90);
console.log("Average:", result);`, note: "Bug 1: parentheses so the sum is divided, not only <code>c</code>. Bug 2: <code>return</code> instead of <code>console.log</code> (otherwise <code>result</code> is <code>undefined</code>). Bug 3: the missing semicolon." }] },
    { id: "stars-line", lvl: "fire", title: "Rating stars", prompt: "<p>Write <code>stars(rating, max = 5)</code> that returns a string of <code>★</code> for the rating followed by <code>☆</code> for the rest. Example: <code>stars(3)</code> returns <code>★★★☆☆</code>, <code>stars(2, 4)</code> returns <code>★★☆☆</code>. Use a <code>for</code> loop (or <code>.repeat</code>).</p>", hint: "Start with <code>let s = \"\";</code>, loop from 1 to <code>max</code>, add ★ when <code>i &lt;= rating</code>, else ☆. Return <code>s</code> at the end — after the loop.",
      tests: [{ after: c`console.log(stars(3));`, expected: "★★★☆☆" }, { after: c`console.log(stars(2, 4));`, expected: "★★☆☆" }, { after: c`console.log(stars(5), stars(0, 3));`, expected: "★★★★★ ☆☆☆" }],
      solutions: [{ name: "Loop", code: c`function stars(rating, max = 5) {
  let s = "";
  for (let i = 1; i <= max; i++) {
    s += i <= rating ? "★" : "☆";
  }
  return s;
}`, note: "The <code>return</code> is after the loop; inside the loop it would stop after the first star." }, { name: "repeat", code: c`function stars(rating, max = 5) {
  return "★".repeat(rating) + "☆".repeat(max - rating);
}` }],
      twist: "Write <code>showRating(name, rating)</code> that <b>uses</b> <code>stars</code> and returns e.g. <code>Pizza: ★★★★☆</code>." },
  ],
  quiz: [
    { q: "What is the difference between a parameter and an argument?", o: ["They are the same thing", "A parameter is the variable in the declaration; an argument is the value given in the call", "An argument is in the declaration; a parameter is in the call", "Parameters are numbers, arguments are strings"], a: 1, e: "In `function add(a, b)`, `a` and `b` are parameters. In `add(2, 3)`, `2` and `3` are arguments." },
    { q: "What does this show?", code: c`function f(n) {
  return n * 10;
}
console.log(f(3) + 1);`, o: ["`31`", "`40`", "`30`", "`301`"], a: 0, e: "`f(3)` returns 30, plus 1 is 31." },
    { q: "What does this show?", code: c`function f() {
  console.log("A");
}
const r = f();
console.log(r);`, o: ["`A\nundefined`", "`A\nA`", "`undefined`", "`A`"], a: 0, e: "The call shows A. With no `return`, `r` is `undefined`." },
    { q: "What does this show?", code: c`function f() {
  console.log("1");
  return;
  console.log("2");
}
f();`, o: ["`1`", "`1\n2`", "`2`"], a: 0, e: "`return` ends the function, so the second log never runs." },
    { q: "What does this show?", code: c`function hi(name = "friend") {
  return "Hi " + name;
}
console.log(hi());`, o: ["`Hi friend`", "`Hi undefined`", "`Hi `", "`Hi name`"], a: 0, e: "No argument, so the default value `\"friend\"` is used." },
    { q: "Which line **calls** the function `start`?", o: ["`function start() {}`", "`start;`", "`start();`", "`call start`"], a: 2, e: "A call is the name followed by parentheses." },
  ],
  puzzle: { title: "Nested calls", q: "<p>Without running it: what does this program show?</p>", code: c`function a(n) {
  return n + 2;
}
function b(n) {
  return a(n) * 2;
}
console.log(b(a(1)));`, answers: ["10"], run: true, hint: "Start with the innermost call: `a(1)`.", e: "`a(1)` is 3. `b(3)` calls `a(3)` = 5, times 2 = 10." },
  cards: [
    { f: "How do you declare a function?", b: "`function name(params) { body }` — it does not run until you call it." },
    { f: "How do you call a function?", b: "Name plus parentheses: `greet(\"Sara\");`" },
    { f: "Parameter vs argument?", b: "Parameter: the variable in the declaration. Argument: the value given in the call." },
    { f: "`return` vs `console.log`?", b: "`console.log` shows a value to a human. `return` gives it back to the program and ends the function." },
    { f: "What does a function without `return` give back?", b: "`undefined`." },
  ],
  remember: [
    "A function is a named block of code you can run again and again (DRY: Don't Repeat Yourself).",
    "Declaring does not run it; calling `name()` does.",
    "Parameters are the variables in the declaration; arguments are the values in the call, matched in order.",
    "`return` gives a value back and ends the function at once; code after it does not run.",
    "`console.log` only shows; a function without `return` gives back `undefined`.",
    "Default parameters (`n = 1`) fill in missing arguments; functions can call other functions.",
  ],
};
})();
