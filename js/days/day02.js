window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[2] = {
  title: "Variables: let, const and naming rules",
  intro: "Yesterday every value lived for one line only, {{name}}. Today your programs get a memory: you will store values in variables, change them, swap them and give them names that make your code easy to read.",
  goals: [
    "Explain what a variable is and create one with `let`",
    "Change a value with `=` and understand that `=` means \"put into\", not \"equals\"",
    "Use `const` for values that never change, and know that `var` is old style",
    "Use variables inside `console.log` and in calculations, and swap two values",
    "Follow the naming rules and write clear camelCase names",
  ],
  learn: [
    { t: "h", text: "What is a variable?" },
    { t: "p", html: "<p>Imagine a game that shows your score. The score starts at 0, grows every time you collect a coin, and must be remembered between moves. On Day 1 we could only print fixed values. To remember something, a program needs a <b>variable</b>: a named place in the computer's memory that holds a value.</p>" },
    { t: "analogy", title: "A variable is like a labeled box", html: "<p>Picture a box with a sticker on it that says <code>score</code>. You put the number 0 inside. Later you can open the box to look at the value, or take the old value out and put a new one in. The label stays the same; only the content changes. In a program you have as many boxes as you need, each with its own label.</p>" },
    { t: "code", code: c`let score = 0;
console.log(score);
console.log("My score is", score);`, before: "<p>Run it and look at the output. Notice that <code>score</code> has <b>no quotes</b>.</p>", note: "<p>The first line creates the box and puts 0 inside. When JavaScript meets the word <code>score</code> without quotes, it opens the box and uses the value inside. With quotes, <code>\"score\"</code> would just be the text <i>score</i>.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`let`, "A keyword that means <b>\"create a new variable\"</b>. You use it once per variable."],
      [c`score`, "The <b>name</b> (the label on the box). You choose it."],
      [c`=`, "The <b>assignment</b> operator: take the value on the right and put it into the variable on the left."],
      [c`0`, "The value stored in the box. The first value is called the <b>initial value</b>."],
      [c`console.log(score);`, "No quotes around <code>score</code>, so JavaScript looks inside the box and shows <code>0</code>."],
    ] },
    { t: "check", q: "What does this program show?", code: c`let city = "Riyadh";
console.log("city");`, o: ["`Riyadh`", "`city`", "`\"Riyadh\"`", "an error"], a: 1, e: "`\"city\"` is in quotes, so it is just the text *city*. To see the value inside the box, write `console.log(city);` without quotes.", hint: "Look closely: is `city` inside quotes in the second line?" },
    { t: "h", text: "Changing a value: = means \"put into\"" },
    { t: "p", html: "<p>Values change all the time: your phone battery drops, your pocket money goes up and down, the time moves on. A variable made with <code>let</code> can receive a new value whenever you want. You write the name, <code>=</code>, and the new value — <b>without</b> <code>let</code> this time, because the box already exists.</p>" },
    { t: "code", code: c`let battery = 100;
console.log("Battery:", battery);
battery = 85;
console.log("Battery:", battery);
battery = battery - 10;
console.log("Battery:", battery);` },
    { t: "analogy", title: "= is an arrow, not a balance", html: "<p>In math class, <code>x = x - 10</code> is impossible: no number equals itself minus 10. In JavaScript, <code>=</code> is not a question and not a balance — it is an <b>arrow pointing left</b>: \"work out the right side, then put the result into the left side\". So <code>battery = battery - 10</code> means: take what is in <code>battery</code> (85), subtract 10, and put 75 back into <code>battery</code>.</p>" },
    { t: "turn", level: "Easy", q: "What does this program show? Type exactly what appears.", code: c`let coins = 3;
coins = coins + 2;
console.log(coins);`, answers: ["5"], run: true, e: "The right side is worked out first: `coins + 2` is `3 + 2`, which is `5`. Then `5` goes into `coins`.", hint: "Read `=` as \"put into\". Work out the right side first.", placeholder: "type the output" },
    { t: "h", text: "Variables in calculations" },
    { t: "p", html: "<p>The real power of variables is that you can calculate with their names. If the price changes, you change <b>one line</b> and every calculation that uses it updates by itself.</p>" },
    { t: "code", code: c`let price = 6;
let count = 3;
let total = price * count;
console.log("Shawarma x", count, "=", total, "riyals");`, note: "<p>JavaScript replaces each name with its value: <code>price * count</code> becomes <code>6 * 3</code>, which is 18. Try changing <code>count</code> to 5 and run again.</p>" },
    { t: "check", q: "What does this program show?", code: c`let mark1 = 18;
let mark2 = 16;
let sum = mark1 + mark2;
console.log(sum);`, o: ["`34`", "`1816`", "`mark1 + mark2`", "`sum`"], a: 0, e: "The names have no quotes, so they are replaced by their numbers: 18 + 16 = 34.", hint: "Variables without quotes are replaced by the values inside them." },
    { t: "h", text: "const: values that never change" },
    { t: "p", html: "<p>Some values must stay fixed: there are always 7 days in a week, and the school name does not change in the middle of the program. For these, use <code>const</code> (short for <i>constant</i>). If anyone — including you, by accident — tries to change it later, JavaScript stops with an error. That error protects you from bugs.</p>" },
    { t: "code", code: c`const daysInWeek = 7;
const school = "Al-Noor School";
console.log(school, "has", daysInWeek, "days in a week");` },
    { t: "code", code: c`const daysInWeek = 7;
daysInWeek = 8;
console.log(daysInWeek);`, error: true, before: "<p>Now try to change a <code>const</code>.</p>", note: "<p>This error is expected: <code>TypeError: Assignment to constant variable.</code> A <code>const</code> gets its value once, when it is created, and keeps it.</p>" },
    { t: "p", html: "<p>A simple rule many programmers follow: <b>start with <code>const</code></b>. Switch to <code>let</code> only when you know the value must change (a score, a balance, a counter).</p>" },
    { t: "check", q: "Which of these should be a `const`?", o: ["The number of seconds in a minute", "The player's score in a game", "The phone battery level", "The money left in your wallet"], a: 0, e: "There are always 60 seconds in a minute, so it never changes: `const`. The others change while the program runs, so they need `let`.", hint: "Ask: will this value ever change while the program runs?" },
    { t: "h", text: "var: the old style" },
    { t: "p", html: "<p>In older code and old tutorials you will see <code>var</code>. It is how variables were made before 2015. It still works, but it has some strange behaviours that cause bugs, so modern JavaScript uses <code>let</code> and <code>const</code>. If you see <code>var</code>, read it as \"an old <code>let</code>\" — and do not write it yourself.</p>" },
    { t: "static", code: c`var oldStyle = "please do not use me";   // old style
let newStyle = "use me instead";          // modern` },
    { t: "h", text: "Swapping two values" },
    { t: "p", html: "<p>Sometimes two variables must exchange their values — two players switch teams, or you sort two marks. A common beginner attempt is <code>a = b; b = a;</code>, but after the first line the old value of <code>a</code> is gone forever.</p>" },
    { t: "analogy", title: "Two cups need a third cup", html: "<p>You have tea in the left cup and juice in the right cup, and you want to swap them. You cannot pour the juice into the left cup — it is full! You need an empty third cup: pour the tea into it, pour the juice into the left cup, then pour the tea from the third cup into the right cup. In code, the third cup is a temporary variable, often called <code>temp</code>.</p>" },
    { t: "viz", code: c`let left = "tea";
let right = "juice";
let temp = left;
left = right;
right = temp;
console.log(left, right);`, before: "<p>Press <b>Visualize</b> and click <b>Next ▶</b>. Watch the three boxes in the variables panel: the value of <code>left</code> is saved in <code>temp</code> before it is overwritten.</p>" },
    { t: "turn", level: "Medium", q: "What does this program show?", code: c`let a = 1;
let b = 2;
a = b;
b = a;
console.log(a, b);`, answers: ["2 2"], run: true, e: "After `a = b;` both boxes hold 2, and the old 1 is lost. Then `b = a;` puts 2 into `b` again. That is why a swap needs a `temp` variable.", hint: "Follow the lines one by one and write the value of each box after every line.", placeholder: "type the output" },
    { t: "h", text: "Naming rules" },
    { t: "p", html: "<p>You choose variable names, but JavaScript has a few strict rules. Break one and the program will not even start.</p>" },
    { t: "table", head: ["Rule", "OK", "Not OK"], rows: [
      ["Letters, digits, `_` and `$` only", "`total_2`, `$price`", "`total-2`, `my@mail`"],
      ["Cannot start with a digit", "`player1`", "`1player`"],
      ["No spaces", "`phoneBattery`", "`phone battery`"],
      ["Not a reserved word", "`myClass`, `isReady`", "`let`, `class`, `if`, `const`"],
      ["Case-sensitive", "`score` and `Score` are **two different** variables", ""],
    ] },
    { t: "turn", level: "Easy", q: "Is `2ndPlace` a valid variable name? Type **yes** or **no**.", answers: ["no"], e: "A name cannot start with a digit. `secondPlace` or `place2` would work.", hint: "Look at the first character.", placeholder: "yes or no", oneWord: true },
    { t: "p", html: "<p>A name can be valid but still bad. <code>x</code>, <code>a1</code> and <code>thing</code> tell the reader nothing. Good names say <b>what is inside</b>: <code>pocketMoney</code>, <code>mathMark</code>, <code>studentsInClass</code>. When a name has several words, JavaScript programmers use <b>camelCase</b>: the first word is all small letters, and every next word starts with a capital, like the humps of a camel.</p>" },
    { t: "check", q: "Which name is valid **and** follows camelCase?", o: ["`favouriteSubject`", "`Favourite subject`", "`favourite-subject`", "`1favouriteSubject`"], a: 0, e: "`favouriteSubject` uses only letters, starts with a small letter, and each new word starts with a capital. The others have a space, a dash, or start with a digit.", hint: "No spaces, no dashes, no digit at the start." },
    { t: "h", text: "A variable with no value yet" },
    { t: "code", code: c`let nextExam;
console.log(nextExam);
nextExam = "Math";
console.log(nextExam);`, note: "<p>You can create a <code>let</code> without a value. Until you put something in, the box holds the special value <code>undefined</code> — \"nothing has been put here yet\". (A <code>const</code> must always get its value immediately.) You will meet <code>undefined</code> again tomorrow.</p>" },
    { t: "h", text: "Two errors to know" },
    { t: "code", code: c`console.log(goals);
let goals = 3;`, error: true, note: "<p>This error is expected: <code>ReferenceError: Cannot access 'goals' before initialization</code>. Code runs top to bottom, so the box must be created <b>before</b> you use it.</p>" },
    { t: "code", code: c`let goals = 3;
let goals = 4;`, error: true, note: "<p>This error is expected: <code>SyntaxError: Identifier 'goals' has already been declared</code>. Use <code>let</code> only the first time. To change the value, write <code>goals = 4;</code>.</p>" },
    { t: "steps", title: "Pocket money tracker", problem: "<p>You start the week with 50 riyals. You buy a shawarma for 12 riyals and a juice for 4 riyals, then your uncle gives you 20 riyals. Show your money after each event, like this:</p><pre class=\"code-static\">Start: 50\nAfter shawarma: 38\nAfter juice: 34\nAfter gift: 54</pre>",
      steps: [
        { html: "<p><b>Understand.</b> One value — the money — changes four times. The prices never change while the program runs.</p>" },
        { html: "<p><b>Plan.</b> The money changes, so it is a <code>let</code>. The prices are fixed, so they are <code>const</code>. Choose clear camelCase names.</p>", code: c`let money = 50;
const shawarmaPrice = 12;
const juicePrice = 4;
console.log("Start:", money);` },
        { html: "<p><b>Spend.</b> Use <code>money = money - ...</code>: work out the right side, put the result back in the box.</p>", code: c`money = money - shawarmaPrice;
console.log("After shawarma:", money);
money = money - juicePrice;
console.log("After juice:", money);` },
        { html: "<p><b>Receive.</b> A gift adds money, so use <code>+</code>.</p>", code: c`money = money + 20;
console.log("After gift:", money);` },
        { html: "<p><b>Check.</b> 50 − 12 = 38, 38 − 4 = 34, 34 + 20 = 54. Run the full program and compare line by line. Then change a price and watch every line update.</p>" },
      ],
      code: c`// Pocket money tracker for {{name}}
let money = 50;
const shawarmaPrice = 12;
const juicePrice = 4;
console.log("Start:", money);
money = money - shawarmaPrice;
console.log("After shawarma:", money);
money = money - juicePrice;
console.log("After juice:", money);
money = money + 20;
console.log("After gift:", money);` },
  ],
  mistakes: [
    { title: "Using a variable before creating it", html: "Code runs top to bottom. If <code>console.log</code> comes first, the box does not exist yet and you get a <code>ReferenceError</code>.", wrong: c`console.log(total);
let total = 10;`, right: c`let total = 10;
console.log(total);` },
    { title: "Writing let twice", html: "<code>let</code> creates a box. Creating a second box with the same name is a <code>SyntaxError</code>. To change the value, leave out <code>let</code>.", wrong: c`let score = 5;
let score = 8;`, right: c`let score = 5;
score = 8;` },
    { title: "Changing a const", html: "A <code>const</code> cannot get a new value: <code>TypeError: Assignment to constant variable.</code> If the value must change, use <code>let</code>.", wrong: c`const lives = 3;
lives = lives - 1;`, right: c`let lives = 3;
lives = lives - 1;` },
    { title: "Wrong capital letters", html: "Names are case-sensitive. <code>userName</code> and <code>username</code> are different, so the second one \"is not defined\".", wrong: c`let userName = "{{name}}";
console.log(username);`, right: c`let userName = "{{name}}";
console.log(userName);` },
  ],
  tricks: [
    { title: "Show the name with the value", html: "When you check what is inside a variable, print a label too. With many variables, a bare number is hard to recognise.", code: c`let speed = 60;
let distance = 120;
console.log("speed =", speed);
console.log("distance =", distance);` },
    { title: "Several variables on one line", html: "You can create several variables with one <code>let</code>, separated by commas. Use it for short, related values only — one per line is easier to read.", code: c`let wins = 4, draws = 2, losses = 1;
console.log(wins, draws, losses);` },
    { title: "A swap without temp (preview)", html: "Modern JavaScript can swap in one line using square brackets. You will understand the brackets on Day 17 (arrays); for now, just enjoy it.", code: c`let first = "Ali";
let second = "Sara";
[first, second] = [second, first];
console.log(first, second);` },
  ],
  practice: [
    { t: "try", title: "Make it yours", html: "<p>Change the values to describe <b>you</b>. Then add one more variable (your favourite food?) and print it.</p>", code: c`const myName = "{{name}}";
let age = 15;
let favouriteSubject = "Math";
console.log("Name:", myName);
console.log("Age:", age);
console.log("Favourite subject:", favouriteSubject);` },
    { t: "predict", code: c`let steps = 1000;
steps = steps + 500;
steps = steps * 2;
console.log(steps);`, explain: "<p>Follow the box: 1000, then 1000 + 500 = 1500, then 1500 × 2 = <b>3000</b>. Each line uses the value left by the line before.</p>" },
    { t: "turn", level: "Easy", q: "What does this program show?", code: c`let team = "Hilal";
team = "Nassr";
console.log("I support", team);`, answers: ["I support Nassr"], run: true, e: "The second line replaces the old value. Only the latest value is kept.", placeholder: "type the output" },
    { t: "parsons", title: "Swap the marks", prompt: "Put the lines in order so the program swaps the two marks and shows <code>20 15</code>.", lines: [c`let mathMark = 15;`, c`let scienceMark = 20;`, c`let temp = mathMark;`, c`mathMark = scienceMark;`, c`scienceMark = temp;`, c`console.log(mathMark, scienceMark);`], distractors: [c`let mathMark = scienceMark;`], explain: "Save the first value in <code>temp</code>, overwrite the first variable, then fill the second one from <code>temp</code>. Writing <code>let mathMark</code> again would be an error." },
    { t: "predict", code: c`let level = 1;
const bonus = 5;
level = level + bonus;
console.log("Level", level);`, explain: "<p><code>level</code> starts at 1 and gets 1 + 5 = 6. <code>bonus</code> is a <code>const</code> but is only <b>read</b> here, never changed, so there is no error.</p>" },
    { t: "turn", level: "Medium", q: "Which keyword should you use for a variable that holds the number of players on a football team (always 11)? Type one word.", answers: ["const"], e: "11 players never changes during the program, so `const` is the right choice.", placeholder: "let or const", oneWord: true },
    { t: "try", title: "Break it on purpose", html: "<p>Make each mistake <b>one at a time</b>, run, and read the error:</p><ol><li>Add <code>let</code> in front of line 3</li><li>Change <code>let</code> on line 1 to <code>const</code></li><li>Write <code>Battery</code> with a capital B on the last line</li><li>Move the last line to the very top</li></ol>", code: c`let battery = 90;
console.log(battery);
battery = battery - 30;
console.log(battery);` },
  ],
  exercises: [
    { id: "home-city", lvl: "seed", title: "Where do you live?", prompt: "<p>Create a variable named <code>city</code> that holds the text <code>Riyadh</code>. Then use it (not the text again!) to show:</p><pre class=\"code-static\">I live in Riyadh</pre>", starter: "// Create the variable city here\n", tests: [{ expected: "I live in Riyadh" }, { after: c`console.log(city);`, expected: "Riyadh" }],
      hint: "<code>let city = \"Riyadh\";</code> then <code>console.log(\"I live in\", city);</code> — the comma adds the space.",
      solutions: [{ name: "Two values", code: c`let city = "Riyadh";
console.log("I live in", city);`, note: "The comma puts one space between the text and the value." }, { name: "With const", code: c`const city = "Riyadh";
console.log("I live in", city);`, note: "Your city will not change while the program runs, so <code>const</code> is a good choice too." }] },
    { id: "school-hours", lvl: "seed", title: "Hours of school", prompt: "<p>Create <code>const daysPerWeek = 5;</code> and <code>const hoursPerDay = 6;</code>. Then show this line, letting JavaScript multiply the <b>variables</b>:</p><pre class=\"code-static\">Hours per week: 30</pre>", tests: [{ expected: "Hours per week: 30" }, { after: c`console.log(daysPerWeek, hoursPerDay);`, expected: "5 6" }],
      hint: "<code>console.log(\"Hours per week:\", daysPerWeek * hoursPerDay);</code>",
      solutions: [{ name: "Direct", code: c`const daysPerWeek = 5;
const hoursPerDay = 6;
console.log("Hours per week:", daysPerWeek * hoursPerDay);`, note: "The calculation uses the names, so changing one value updates the result." }, { name: "With a result variable", code: c`const daysPerWeek = 5;
const hoursPerDay = 6;
const hoursPerWeek = daysPerWeek * hoursPerDay;
console.log("Hours per week:", hoursPerWeek);`, note: "Storing the result in its own well-named variable makes the last line easy to read." }] },
    { id: "battery-drain", lvl: "star", title: "Phone battery", prompt: "<p>Create <code>let battery = 80;</code>. Show it, then lower it by 15 <b>two times</b> using <code>battery = battery - 15;</code>, showing it after each change:</p><pre class=\"code-static\">Battery: 80\nBattery: 65\nBattery: 50</pre>", tests: [{ expected: "Battery: 80\nBattery: 65\nBattery: 50" }, { after: c`console.log(battery);`, expected: "50" }],
      hint: "Three <code>console.log(\"Battery:\", battery);</code> lines, with one change between each pair.",
      solutions: [{ name: "Step by step", code: c`let battery = 80;
console.log("Battery:", battery);
battery = battery - 15;
console.log("Battery:", battery);
battery = battery - 15;
console.log("Battery:", battery);`, note: "The same two lines repeat. On Day 11 you will learn loops, which repeat lines for you." }, { name: "With a const for the drop", code: c`let battery = 80;
const drop = 15;
console.log("Battery:", battery);
battery = battery - drop;
console.log("Battery:", battery);
battery = battery - drop;
console.log("Battery:", battery);`, note: "Putting 15 in a named <code>const</code> means you change it in one place only." }],
      twist: "Add a third drop. What would the battery show?" },
    { id: "swap-drinks", lvl: "star", title: "Swap the drinks", prompt: "<p>The starter code has two variables. Swap their values using a third variable, then show both, so the output is:</p><pre class=\"code-static\">juice tea</pre><p>Do not type the words again — move the values.</p>", starter: c`let left = "tea";
let right = "juice";
// swap here

console.log(left, right);`, tests: [{ expected: "juice tea" }, { after: c`console.log(right, left);`, expected: "tea juice" }],
      hint: "<code>let temp = left;</code> saves the tea. Then <code>left = right;</code> and <code>right = temp;</code>",
      solutions: [{ name: "With temp", code: c`let left = "tea";
let right = "juice";
// swap here
let temp = left;
left = right;
right = temp;
console.log(left, right);`, note: "The third cup <code>temp</code> keeps the tea safe while <code>left</code> is overwritten." }] },
    { id: "canteen-total", lvl: "star", title: "Canteen bill", prompt: "<p>A sandwich costs 8 riyals and a juice costs 4 riyals. Store the prices in two <code>const</code> variables. Create <code>let total = 0;</code>, add <b>two</b> sandwiches to it, then <b>one</b> juice (two separate lines that change <code>total</code>). Show:</p><pre class=\"code-static\">Total: 20 riyals</pre>", tests: [{ expected: "Total: 20 riyals" }, { after: c`console.log(total);`, expected: "20" }],
      hint: "<code>total = total + sandwichPrice * 2;</code> then <code>total = total + juicePrice;</code>",
      solutions: [{ name: "Build the total", code: c`const sandwichPrice = 8;
const juicePrice = 4;
let total = 0;
total = total + sandwichPrice * 2;
total = total + juicePrice;
console.log("Total:", total, "riyals");`, note: "<code>total</code> grows step by step, like a real cashier adding items." }, { name: "Item by item", code: c`const sandwichPrice = 8;
const juicePrice = 4;
let total = 0;
total = total + sandwichPrice;
total = total + sandwichPrice;
total = total + juicePrice;
console.log("Total:", total, "riyals");`, note: "Adding one item per line is longer but very easy to follow." }] },
    { id: "fix-winner", lvl: "fire", debug: true, title: "Fix the winner board", prompt: "<p>This program has <b>three</b> bugs. Fix them so it shows:</p><pre class=\"code-static\">Winner: Noura\nPoints: 95</pre><p>Keep the variable names <code>firstPlace</code> and <code>points</code>.</p>", starter: c`let 1stPlace = "Noura";
const points = 90;
points = points + 5;
console.log("Winner:", firstplace);
console.log("Points:", points);`, tests: [{ expected: "Winner: Noura\nPoints: 95" }, { after: c`console.log(firstPlace, points);`, expected: "Noura 95" }],
      hint: "A name cannot start with a digit. A value that changes cannot be a <code>const</code>. Names are case-sensitive.",
      solutions: [{ name: "Fixed", code: c`let firstPlace = "Noura";
let points = 90;
points = points + 5;
console.log("Winner:", firstPlace);
console.log("Points:", points);`, note: "Bug 1: <code>1stPlace</code> starts with a digit → <code>firstPlace</code>. Bug 2: <code>points</code> changes, so it must be <code>let</code>. Bug 3: <code>firstplace</code> → <code>firstPlace</code> (capital P)." }] },
    { id: "rotate-three", lvl: "fire", title: "Rotate the seats", prompt: "<p>Three friends sit in a row. Every lesson they move one seat to the left, and the first one goes to the end. Start with:</p><pre class=\"code-static\">let first = \"Ali\";\nlet second = \"Sara\";\nlet third = \"Omar\";</pre><p>Rotate the values <b>once</b> (using only one extra variable), then show <code>console.log(first, second, third);</code> so the output is:</p><pre class=\"code-static\">Sara Omar Ali</pre>", starter: c`let first = "Ali";
let second = "Sara";
let third = "Omar";
// rotate here

console.log(first, second, third);`, tests: [{ expected: "Sara Omar Ali" }, { after: c`console.log(third, first, second);`, expected: "Ali Sara Omar" }],
      hint: "Save <code>first</code> in <code>temp</code>. Then each seat takes the value from the seat on its right. The last seat takes <code>temp</code>.",
      solutions: [{ name: "One temp", code: c`let first = "Ali";
let second = "Sara";
let third = "Omar";
// rotate here
let temp = first;
first = second;
second = third;
third = temp;
console.log(first, second, third);`, note: "Only <code>first</code> is overwritten before its value is used, so only that one needs saving." }],
      twist: "Rotate a second time (add four more lines, or reuse <code>temp</code> without <code>let</code>). What is the output now?" },
  ],
  quiz: [
    { q: "Which line creates a variable that can change later?", o: ["`let goals = 0;`", "`const goals = 0;`", "`goals == 0;`", "`variable goals = 0;`"], a: 0, e: "`let` makes a variable you can change. `const` cannot be changed, and `variable` is not a JavaScript keyword." },
    { q: "What does this show?", code: c`let x = 10;
x = x + 5;
x = x - 3;
console.log(x);`, o: ["`10`", "`15`", "`12`", "`x`"], a: 2, e: "10 + 5 = 15, then 15 − 3 = 12. Each line uses the value left by the line before." },
    { q: "What happens when you run this?", code: c`const year = 2026;
year = 2027;`, o: ["`year` becomes 2027", "A TypeError: you cannot change a `const`", "`year` becomes 4053", "Nothing"], a: 1, e: "A `const` keeps its first value. Trying to assign a new one is a `TypeError`." },
    { q: "Which variable name is **not** allowed?", o: ["`total2`", "`_count`", "`my score`", "`$price`"], a: 2, e: "Names cannot contain spaces. Write `myScore` instead." },
    { q: "What does this show?", code: c`let a = "red";
let b = "blue";
let temp = a;
a = b;
b = temp;
console.log(a, b);`, o: ["`blue red`", "`red blue`", "`blue blue`", "`red red`"], a: 0, e: "A correct swap: `temp` keeps \"red\", `a` gets \"blue\", then `b` gets \"red\" from `temp`." },
    { q: "What does this show?", code: c`let nextTrip;
console.log(nextTrip);`, o: ["`undefined`", "`0`", "`nextTrip`", "`null`"], a: 0, e: "A `let` with no value holds `undefined` until you put something in it." },
  ],
  puzzle: { title: "The busy box", q: "<p>Without running it: what <b>exactly</b> does this program show? Type the output on one line.</p>", code: c`let n = 2;
let m = n;
n = n * 10;
m = m + n;
console.log(n, m);`, answers: ["20 22"], run: true, hint: "`let m = n;` copies the value 2 into `m`. Changing `n` later does not change `m` by itself.", e: "`m` gets a copy of 2. Then `n` becomes 20. Then `m` becomes 2 + 20 = 22. Output: `20 22`." },
  cards: [
    { f: "What is a variable?", b: "A named box in memory that holds a value, e.g. `let score = 0;`" },
    { f: "`let` vs `const`?", b: "`let` can get a new value later. `const` keeps its first value forever (changing it is a TypeError)." },
    { f: "What does `x = x + 1` mean?", b: "Work out the right side (old x plus 1), then put the result into x. `=` means \"put into\"." },
    { f: "How do you swap `a` and `b`?", b: "`let temp = a; a = b; b = temp;`" },
    { f: "Name rules?", b: "Letters, digits, `_`, `$`; no digit first; no spaces; not a reserved word; case-sensitive. Use camelCase." },
  ],
  remember: [
    "A variable is a **named box**: `let score = 0;` creates it and puts 0 inside.",
    "`=` means **put into**: the right side is worked out first, then stored on the left.",
    "Use `let` only once per variable; to change it, write `name = newValue;`.",
    "Use `const` for values that never change; `var` is old style — do not use it.",
    "To swap two values you need a third variable (`temp`).",
    "Names: no digit first, no spaces, no reserved words, case-sensitive — and use clear **camelCase** names.",
  ],
};
})();
