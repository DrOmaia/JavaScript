window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[10] = {
  title: "switch and the ternary operator",
  intro: "You can already make any decision with <code>if</code>, {{name}}. Today you add two shortcuts that make some decisions shorter and easier to read: <code>switch</code> for menus with many exact choices, and the <b>ternary operator</b> <code>? :</code> for picking one of two values in a single line.",
  goals: [
    "Write a `switch` with `case`, `break` and `default`",
    "Explain what happens when you forget `break` (fall-through)",
    "Group several cases on purpose (friday and saturday → weekend)",
    "Remember that `switch` compares with `===`, so types must match",
    "Choose a value with the ternary `condition ? a : b`",
    "Decide when to use `if / else`, `switch` or a ternary — and avoid nested ternaries",
  ],
  learn: [
    { t: "h", text: "A menu of exact choices" },
    { t: "p", html: "<p>Imagine the school canteen machine: you press 1 for juice, 2 for water, 3 for a sandwich. With yesterday's tools you would write <code>if (choice === 1) ... else if (choice === 2) ... else if (choice === 3)</code> — and repeat <code>choice ===</code> again and again. When you compare <b>one</b> value with a list of <b>exact</b> values, <code>switch</code> says it more clearly.</p>" },
    { t: "analogy", title: "switch is like a lift", html: "<p>In a lift you press one button, say 3, and the lift goes straight to floor 3. It does not stop to ask at floors 1 and 2. A <code>switch</code> looks at one value and jumps to the <code>case</code> with the same value. If no floor matches, it goes to <code>default</code> — the \"ground floor\" for everything else.</p>" },
    { t: "code", code: c`const choice = 2;
switch (choice) {
  case 1:
    console.log("Orange juice");
    break;
  case 2:
    console.log("Water");
    break;
  case 3:
    console.log("Cheese sandwich");
    break;
  default:
    console.log("Not on the menu");
}`, before: "<p>Run it, then change <code>choice</code> to 3, then to 9.</p>", note: "<p>With 2 the program jumps to <code>case 2:</code>, shows <code>Water</code>, and <code>break</code> takes it out of the switch. With 9 no case matches, so <code>default</code> runs.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`switch (choice) {`, "The value in the brackets is the one being tested. The whole switch lives between <code>{</code> and the final <code>}</code>."],
      [c`case 1:`, "\"If the value is 1, start here.\" Note the <b>colon</b> <code>:</code> at the end, not a semicolon."],
      [c`  console.log("Orange juice");`, "The code for this case. It can be several lines; no braces are needed."],
      [c`  break;`, "<b>Leave the switch now.</b> Without it, JavaScript would carry on into the next case (you will see why that matters)."],
      [c`default:`, "Runs when no case matched, like the final <code>else</code>. It usually comes last, so it needs no <code>break</code>."],
    ] },
    { t: "check", q: "What does this show?", code: c`const level = 3;
switch (level) {
  case 1:
    console.log("Easy");
    break;
  case 3:
    console.log("Hard");
    break;
  default:
    console.log("Medium");
}`, o: ["`Easy`", "`Hard`", "`Medium`", "`Hard Medium`"], a: 1, e: "The value 3 matches `case 3:`, so `Hard` is shown, then `break` leaves the switch.", hint: "Find the case with the same value." },
    { t: "h", text: "Forgetting break: fall-through" },
    { t: "p", html: "<p>A <code>case</code> is only a <b>starting point</b>. Once JavaScript starts running inside a switch, it keeps going line by line — through the next cases too — until it meets a <code>break</code> or the end. This is called <b>fall-through</b>, and forgetting <code>break</code> is the most common switch bug.</p>" },
    { t: "code", code: c`const medal = "silver";
switch (medal) {
  case "gold":
    console.log("1st place");
  case "silver":
    console.log("2nd place");
  case "bronze":
    console.log("3rd place");
  default:
    console.log("Thanks for playing");
}`, note: "<p>There is no <code>break</code> anywhere. The switch starts at <code>\"silver\"</code> and falls through every case below it: you get three lines instead of one. Add <code>break;</code> after each <code>console.log</code> and run again.</p>" },
    { t: "check", q: "How many lines does this show?", code: c`const n = 1;
switch (n) {
  case 1:
    console.log("one");
  case 2:
    console.log("two");
    break;
  case 3:
    console.log("three");
}`, o: ["1 line: `one`", "2 lines: `one` and `two`", "3 lines", "0 lines"], a: 1, e: "It starts at `case 1`, shows `one`, falls into `case 2` (no break yet), shows `two`, then `break` stops it.", hint: "Start at the matching case and keep going until a `break`." },
    { t: "h", text: "Grouping cases on purpose" },
    { t: "p", html: "<p>Fall-through is not always a bug. When several values should do <b>the same thing</b>, write their cases one under the other with no code between them. In Saudi Arabia the weekend is Friday and Saturday; the other five days are school days.</p>" },
    { t: "viz", code: c`const day = "saturday";
switch (day) {
  case "friday":
  case "saturday":
    console.log("Weekend - no school!");
    break;
  case "sunday":
  case "monday":
  case "tuesday":
  case "wednesday":
  case "thursday":
    console.log("School day");
    break;
  default:
    console.log("That is not a day");
}`, before: "<p>Press <b>Visualize</b> and step through. Watch the program jump to <code>case \"saturday\":</code>, run the shared line, and leave at <code>break</code>.</p>" },
    { t: "turn", level: "Easy", q: "In the program above, what is shown when `day` is `\"monday\"`?", answers: ["School day"], e: "`monday` is one of the grouped cases that fall through to the same line: `School day`.", placeholder: "type the output" },
    { t: "h", text: "switch compares with ===" },
    { t: "p", html: "<p>A switch checks each case with the strict <code>===</code> from Day 8. That means the <b>type</b> must match too. This bites when the value comes from <code>prompt()</code>, which always gives a string.</p>" },
    { t: "code", code: c`const choice = prompt("Choose 1 or 2");
switch (choice) {
  case 1:
    console.log("You chose one");
    break;
  default:
    console.log("No match!");
}`, stdin: "1", note: "<p>The user typed 1, but <code>choice</code> is the string <code>\"1\"</code>, and <code>\"1\" === 1</code> is <code>false</code>. Fix it either way: convert with <code>Number(prompt(...))</code>, or write the cases as strings: <code>case \"1\":</code>.</p>" },
    { t: "check", q: "A program reads `const size = prompt(\"S, M or L?\");` and the user types `m`. Which line makes `case \"M\":` match?", o: ["`switch (size) {`", "`switch (size.toUpperCase()) {`", "`switch (Number(size)) {`", "`switch (size === \"M\") {`"], a: 1, e: "`\"m\" === \"M\"` is false. `.toUpperCase()` turns the input into `\"M\"`, which matches exactly.", hint: "switch uses `===`, so even capital letters must match." },
    { t: "h", text: "The ternary operator: pick one of two values" },
    { t: "p", html: "<p>Very often an <code>if / else</code> only chooses between two <b>values</b>: \"Pass\" or \"Fail\", \"day\" or \"days\", 25 or 40 riyals. Writing five lines for that feels heavy. The <b>ternary operator</b> does it in one expression: <code>condition ? valueIfTrue : valueIfFalse</code>. It is called \"ternary\" because it has three parts.</p>" },
    { t: "analogy", title: "The ternary is a quick question", html: "<p>Your mother asks: \"Is it cold? Then take the jacket, otherwise the T-shirt.\" One question, two possible answers, and you leave with exactly one of them. The <code>?</code> is the question mark of that sentence, and the <code>:</code> means \"otherwise\".</p>" },
    { t: "code", code: c`const mark = 64;
const result = mark >= 50 ? "Pass" : "Fail";
console.log(result);

const apples = 1;
console.log(¦You have #{apples} #{apples === 1 ? "apple" : "apples"}¦);` },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`mark >= 50`, "The condition, exactly like the one you would put inside <code>if ( )</code>."],
      [c`? "Pass"`, "The value to use when the condition is <code>true</code>."],
      [c`: "Fail"`, "The value to use when it is <code>false</code>. The colon reads as \"otherwise\"."],
      [c`const result = ...;`, "The whole ternary <b>is a value</b>, so you can store it, show it, or put it inside a template literal like the second example."],
    ] },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`const battery = 12;
console.log(battery < 20 ? "Charge me" : "OK");`, answers: ["Charge me"], run: true, e: "12 < 20 is `true`, so the ternary gives the first value.", hint: "True → the value after `?`. False → the value after `:`.", placeholder: "type the output" },
    { t: "h", text: "Which one should I use?" },
    { t: "table", head: ["Use", "When", "Example"], rows: [
      ["`if / else if / else`", "Ranges and mixed conditions (`>=`, `&&`), or several actions in each path", "grades from a mark, ticket rules"],
      ["`switch`", "One value compared with many **exact** values", "menu choice, day name, operator `+ - * /`"],
      ["ternary `? :`", "Choosing between **two values**", "`\"Pass\"` or `\"Fail\"`, singular or plural"],
    ] },
    { t: "p", html: "<p>A ternary can contain another ternary, but please don't. <code>mark &gt;= 90 ? \"A\" : mark &gt;= 80 ? \"B\" : \"C\"</code> works, yet it is hard to read and easy to break. With three or more choices, go back to <code>else if</code>. Code is read many more times than it is written.</p>" },
    { t: "turn", level: "Medium", q: "Which tool is best for showing `Free` for ages under 4 and `Paid` for everyone else? Type one word: `if`, `switch` or `ternary`.", answers: ["ternary", "the ternary", "ternary operator"], e: "Two possible **values** from one condition — that is exactly the job of `age < 4 ? \"Free\" : \"Paid\"`.", placeholder: "if, switch or ternary", oneWord: true },
    { t: "steps", title: "The canteen machine", problem: "<p>Build a canteen machine. It asks for a choice (1 = juice 5 riyals, 2 = water 2 riyals, 3 = sandwich 9 riyals) and the money you put in. It shows what you chose, then either <code>Enjoy!</code> or <code>Not enough money</code>.</p>",
      steps: [
        { html: "<p><b>Understand.</b> Two inputs: a menu number (an exact choice → <code>switch</code>) and an amount. The final message is one of two values → a ternary.</p>" },
        { html: "<p><b>Plan.</b> Read both inputs as numbers. Prepare two variables that the switch will fill in.</p>", code: c`const choice = Number(prompt("1 juice, 2 water, 3 sandwich"));
const money = Number(prompt("How many riyals?"));
let item = "nothing";
let price = 0;` },
        { html: "<p><b>Build the switch.</b> Each case sets the item and price, then <code>break</code>. The <code>default</code> handles a wrong button.</p>", code: c`switch (choice) {
  case 1:
    item = "juice";
    price = 5;
    break;
  case 2:
    item = "water";
    price = 2;
    break;
  case 3:
    item = "sandwich";
    price = 9;
    break;
  default:
    console.log("Unknown choice");
}` },
        { html: "<p><b>Finish with a ternary.</b> One condition, two messages. Try 3 and 10 (enough), then 3 and 5 (not enough).</p>", code: c`console.log(¦You chose: #{item} (#{price} riyals)¦);
console.log(money >= price ? "Enjoy!" : "Not enough money");` },
      ],
      code: c`// Canteen machine
const choice = Number(prompt("1 juice, 2 water, 3 sandwich"));
const money = Number(prompt("How many riyals?"));
let item = "nothing";
let price = 0;
switch (choice) {
  case 1:
    item = "juice";
    price = 5;
    break;
  case 2:
    item = "water";
    price = 2;
    break;
  case 3:
    item = "sandwich";
    price = 9;
    break;
  default:
    console.log("Unknown choice");
}
console.log(¦You chose: #{item} (#{price} riyals)¦);
console.log(money >= price ? "Enjoy!" : "Not enough money");`, stdin: "3\n10" },
  ],
  mistakes: [
    { title: "Forgetting break", html: "Without <code>break</code>, the code falls through into the next case. Put <code>break;</code> at the end of every case (except grouped cases on purpose and the last <code>default</code>).", wrong: c`const n = 1;
switch (n) {
  case 1:
    console.log("one");
  case 2:
    console.log("two");
}`, right: c`const n = 1;
switch (n) {
  case 1:
    console.log("one");
    break;
  case 2:
    console.log("two");
    break;
}` },
    { title: "String input, number cases", html: "<code>prompt()</code> gives a string, and switch uses <code>===</code>, so <code>\"2\"</code> never matches <code>case 2:</code>. Convert the input or use string cases.", wrong: c`const pick = "2"; // as from prompt()
switch (pick) {
  case 2:
    console.log("Water");
    break;
  default:
    console.log("No match");
}`, right: c`const pick = Number("2");
switch (pick) {
  case 2:
    console.log("Water");
    break;
  default:
    console.log("No match");
}` },
    { title: "Ranges in a case", html: "<code>case mark &gt;= 90:</code> compares <code>mark</code> with the <b>boolean</b> <code>true</code> or <code>false</code> — it does not do what you think. For ranges, use <code>if / else if</code>.", wrong: c`const mark = 95;
switch (mark) {
  case mark >= 90:
    console.log("A");
    break;
  default:
    console.log("No grade");
}`, right: c`const mark = 95;
if (mark >= 90) {
  console.log("A");
} else {
  console.log("No grade");
}` },
    { title: "Nested ternaries", html: "Two or more <code>?</code> in one line are hard to read and to fix. Use a ternary only for a simple two-way choice.", wrong: c`const t = 28;
console.log(t > 40 ? "very hot" : t > 30 ? "hot" : t > 20 ? "nice" : "cold");`, right: c`const t = 28;
if (t > 40) {
  console.log("very hot");
} else if (t > 30) {
  console.log("hot");
} else if (t > 20) {
  console.log("nice");
} else {
  console.log("cold");
}` },
  ],
  tricks: [
    { title: "Normalize the input before switch", html: "Change text input to one case with <code>.toLowerCase()</code> (and remove spaces with <code>.trim()</code>), so <code>\" Friday\"</code> still matches <code>case \"friday\":</code>.", code: c`const typed = " Friday ";
switch (typed.trim().toLowerCase()) {
  case "friday":
    console.log("Jumu'ah - weekend!");
    break;
  default:
    console.log("Another day");
}` },
    { title: "Ternary inside a template literal", html: "Perfect for small grammar choices like singular and plural.", code: c`const n = 3;
console.log(¦#{n} #{n === 1 ? "lesson" : "lessons"} left today¦);` },
    { title: "Ternary to set a value, if to do things", html: "A good rule of thumb: if each path <b>gives a value</b>, use a ternary. If each path <b>does something</b> (several lines, different actions), use <code>if / else</code>.", code: c`const isMember = true;
const discount = isMember ? 10 : 0;
console.log("Discount:", discount, "%");` },
  ],
  practice: [
    { t: "try", title: "Make it yours", html: "<p>Turn this into your own favourite-subject machine: change the subjects and the messages, and add a case 4.</p>", code: c`const subject = 2;
switch (subject) {
  case 1:
    console.log("Maths: you love numbers!");
    break;
  case 2:
    console.log("Biology: future doctor, {{name}}?");
    break;
  case 3:
    console.log("Computer science: you are in the right place!");
    break;
  default:
    console.log("Pick 1, 2 or 3");
}` },
    { t: "predict", code: c`const size = "M";
switch (size) {
  case "S":
    console.log("small");
  case "M":
    console.log("medium");
  case "L":
    console.log("large");
    break;
  default:
    console.log("unknown");
}`, explain: "It starts at <code>case \"M\"</code> and falls through to <code>case \"L\"</code> because there is no <code>break</code> after <code>medium</code>. The <code>break</code> after <code>large</code> stops it before <code>default</code>." },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`const age = 3;
console.log(age < 4 ? "Free" : "Paid");`, answers: ["Free"], run: true, e: "3 < 4 is `true`, so the value after `?` is chosen.", placeholder: "type the output" },
    { t: "predict", code: c`const x = "5";
switch (x) {
  case 5:
    console.log("number five");
    break;
  case "5":
    console.log("text five");
    break;
}`, explain: "<code>x</code> is the string <code>\"5\"</code>. <code>\"5\" === 5</code> is false, so the first case is skipped and <code>case \"5\"</code> matches: <code>text five</code>." },
    { t: "parsons", title: "Traffic light", prompt: "Put the lines in order: <code>red</code> shows <code>Stop</code>, <code>green</code> shows <code>Go</code>, anything else shows <code>Careful</code>.", lines: [c`const light = "green";`, c`switch (light) {`, c`  case "red":`, c`    console.log("Stop");`, c`    break; // end of red`, c`  case "green":`, c`    console.log("Go");`, c`    break; // end of green`, c`  default:`, c`    console.log("Careful");`, c`}`], distractors: [c`  case "green";`], explain: "Each case ends with a colon and a <code>break</code>; <code>default</code> comes last. The distractor has a semicolon instead of a colon." },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`const goals = 1;
console.log(¦#{goals} #{goals === 1 ? "goal" : "goals"}¦);`, answers: ["1 goal"], run: true, e: "`goals === 1` is true, so the ternary gives `\"goal\"`, and the template literal joins it: `1 goal`.", placeholder: "type the output" },
    { t: "try", title: "Rock, paper, scissors (one round)", html: "<p>The computer always plays <code>rock</code> here. Type your move in the <b>Input</b> box, run, and then extend the program: what message should a draw show?</p>", code: c`const me = prompt("rock, paper or scissors?").toLowerCase();
switch (me) {
  case "paper":
    console.log("Paper covers rock. You win!");
    break;
  case "scissors":
    console.log("Rock breaks scissors. You lose!");
    break;
  case "rock":
    console.log("Rock and rock. Draw!");
    break;
  default:
    console.log("That is not a move");
}`, stdin: "paper" },
  ],
  exercises: [
    { id: "d10-dayname", lvl: "seed", title: "Day of the week", prompt: "<p>Ask for a number from 1 to 7 and show the day: 1 = <code>Sunday</code>, 2 = <code>Monday</code>, 3 = <code>Tuesday</code>, 4 = <code>Wednesday</code>, 5 = <code>Thursday</code>, 6 = <code>Friday</code>, 7 = <code>Saturday</code>. Any other number: <code>Invalid day</code>.</p>", starter: c`const n = Number(prompt("Day number (1-7)?"));
switch (n) {
  case 1:
    console.log("Sunday");
    break;
  // add the other days here
}`, tests: [{ stdin: "1", expected: "Sunday" }, { stdin: "5", expected: "Thursday" }, { stdin: "7", expected: "Saturday" }, { stdin: "9", expected: "Invalid day" }],
      hint: "One <code>case</code> per day, each with a <code>break</code>, and a <code>default</code> at the end.",
      solutions: [{ name: "switch", code: c`const n = Number(prompt("Day number (1-7)?"));
switch (n) {
  case 1:
    console.log("Sunday");
    break;
  case 2:
    console.log("Monday");
    break;
  case 3:
    console.log("Tuesday");
    break;
  case 4:
    console.log("Wednesday");
    break;
  case 5:
    console.log("Thursday");
    break;
  case 6:
    console.log("Friday");
    break;
  case 7:
    console.log("Saturday");
    break;
  default:
    console.log("Invalid day");
}`, note: "Seven exact values: a perfect job for <code>switch</code>." }] },
    { id: "d10-passfail", lvl: "seed", title: "Pass or Fail in one line", prompt: "<p>Ask for a mark. Using a <b>ternary</b>, show <code>Result: Pass</code> for 50 or more and <code>Result: Fail</code> otherwise.</p>", tests: [{ stdin: "50", expected: "Result: Pass" }, { stdin: "31", expected: "Result: Fail" }, { stdin: "99", expected: "Result: Pass" }],
      hint: "<code>mark &gt;= 50 ? \"Pass\" : \"Fail\"</code>",
      solutions: [{ name: "Stored ternary", code: c`const mark = Number(prompt("Mark?"));
const result = mark >= 50 ? "Pass" : "Fail";
console.log("Result:", result);`, note: "The ternary gives a value, stored in <code>result</code>." },
        { name: "Inside a template literal", code: c`const mark = Number(prompt("Mark?"));
console.log(¦Result: #{mark >= 50 ? "Pass" : "Fail"}¦);`, note: "The whole decision fits inside the placeholder of a template literal." }] },
    { id: "d10-calc", lvl: "star", title: "Tiny calculator", prompt: "<p>Ask for a first number, a second number, then an operator (<code>+</code>, <code>-</code>, <code>*</code> or <code>/</code>). Show the result as <code>6 * 3 = 18</code>. For any other operator show <code>Unknown operator</code>.</p>", tests: [{ stdin: "6\n3\n*", expected: "6 * 3 = 18" }, { stdin: "10\n4\n-", expected: "10 - 4 = 6" }, { stdin: "7\n2\n/", expected: "7 / 2 = 3.5" }, { stdin: "1\n1\n%", expected: "Unknown operator" }, { stdin: "2\n5\n+", expected: "2 + 5 = 7" }],
      hint: "<code>switch (op)</code> with string cases <code>case \"+\":</code> etc. Remember <code>Number()</code> for the two numbers, or <code>+</code> will glue them.",
      solutions: [{ name: "switch on the operator", code: c`const a = Number(prompt("First number?"));
const b = Number(prompt("Second number?"));
const op = prompt("Operator (+ - * /)?");
switch (op) {
  case "+":
    console.log(¦#{a} + #{b} = #{a + b}¦);
    break;
  case "-":
    console.log(¦#{a} - #{b} = #{a - b}¦);
    break;
  case "*":
    console.log(¦#{a} * #{b} = #{a * b}¦);
    break;
  case "/":
    console.log(¦#{a} / #{b} = #{a / b}¦);
    break;
  default:
    console.log("Unknown operator");
}`, note: "Each case prints its own line." },
        { name: "Store the answer", code: c`const a = Number(prompt("First number?"));
const b = Number(prompt("Second number?"));
const op = prompt("Operator (+ - * /)?");
let answer = null;
switch (op) {
  case "+":
    answer = a + b;
    break;
  case "-":
    answer = a - b;
    break;
  case "*":
    answer = a * b;
    break;
  case "/":
    answer = a / b;
    break;
}
console.log(answer === null ? "Unknown operator" : ¦#{a} #{op} #{b} = #{answer}¦);`, note: "The switch only computes; a ternary decides what to show." }] },
    { id: "d10-weekend", lvl: "star", title: "Weekend or school day?", prompt: "<p>Ask for a day name. Show <code>Weekend</code> for Friday and Saturday, <code>School day</code> for Sunday to Thursday, and <code>Not a day</code> for anything else. Accept any capital letters (<code>FRIDAY</code>, <code>Friday</code>…).</p>", tests: [{ stdin: "Friday", expected: "Weekend" }, { stdin: "saturday", expected: "Weekend" }, { stdin: "MONDAY", expected: "School day" }, { stdin: "thursday", expected: "School day" }, { stdin: "holiday", expected: "Not a day" }],
      hint: "Switch on <code>day.toLowerCase()</code> and group the cases that share a message.",
      solutions: [{ name: "Grouped cases", code: c`const day = prompt("Day?").toLowerCase();
switch (day) {
  case "friday":
  case "saturday":
    console.log("Weekend");
    break;
  case "sunday":
  case "monday":
  case "tuesday":
  case "wednesday":
  case "thursday":
    console.log("School day");
    break;
  default:
    console.log("Not a day");
}`, note: "Grouped cases fall through to the same line on purpose." }] },
    { id: "d10-plural", lvl: "star", title: "Messages counter", prompt: "<p>Ask how many new messages there are. Show <code>You have 1 new message</code> for exactly one, and <code>You have 5 new messages</code> (with an <b>s</b>) for any other number, including 0. Use a ternary.</p>", tests: [{ stdin: "1", expected: "You have 1 new message" }, { stdin: "5", expected: "You have 5 new messages" }, { stdin: "0", expected: "You have 0 new messages" }],
      hint: "Only the word changes: <code>n === 1 ? \"message\" : \"messages\"</code>.",
      solutions: [{ name: "Ternary in a template", code: c`const n = Number(prompt("New messages?"));
console.log(¦You have #{n} new #{n === 1 ? "message" : "messages"}¦);`, note: "A small ternary inside a template literal." },
        { name: "Ternary for the ending", code: c`const n = Number(prompt("New messages?"));
const ending = n === 1 ? "" : "s";
console.log(¦You have #{n} new message#{ending}¦);`, note: "Choose only the letter <code>s</code> or nothing." }] },
    { id: "d10-season", lvl: "fire", title: "Season of the month", prompt: "<p>Ask for a month number (1–12) and show its season: <code>Winter</code> (12, 1, 2), <code>Spring</code> (3, 4, 5), <code>Summer</code> (6, 7, 8), <code>Autumn</code> (9, 10, 11). Anything else: <code>Invalid month</code>. Then, on a second line, show <code>Hot in Riyadh: yes</code> for June to September (6–9) and <code>Hot in Riyadh: no</code> otherwise — only for valid months.</p><pre class=\"code-static\">Input 7:\nSummer\nHot in Riyadh: yes</pre>", tests: [{ stdin: "7", expected: "Summer\nHot in Riyadh: yes" }, { stdin: "12", expected: "Winter\nHot in Riyadh: no" }, { stdin: "9", expected: "Autumn\nHot in Riyadh: yes" }, { stdin: "4", expected: "Spring\nHot in Riyadh: no" }, { stdin: "13", expected: "Invalid month" }],
      hint: "Group the cases for each season. For the second line use a ternary with <code>&amp;&amp;</code>, and only show it when the month is from 1 to 12.",
      solutions: [{ name: "switch + ternary", code: c`const m = Number(prompt("Month (1-12)?"));
switch (m) {
  case 12:
  case 1:
  case 2:
    console.log("Winter");
    break;
  case 3:
  case 4:
  case 5:
    console.log("Spring");
    break;
  case 6:
  case 7:
  case 8:
    console.log("Summer");
    break;
  case 9:
  case 10:
  case 11:
    console.log("Autumn");
    break;
  default:
    console.log("Invalid month");
}
if (m >= 1 && m <= 12) {
  console.log("Hot in Riyadh:", m >= 6 && m <= 9 ? "yes" : "no");
}`, note: "The switch groups months, the <code>if</code> skips invalid input, and the ternary chooses yes/no." },
        { name: "Season variable", code: c`const m = Number(prompt("Month (1-12)?"));
let season = "Invalid month";
switch (m) {
  case 12: case 1: case 2:
    season = "Winter";
    break;
  case 3: case 4: case 5:
    season = "Spring";
    break;
  case 6: case 7: case 8:
    season = "Summer";
    break;
  case 9: case 10: case 11:
    season = "Autumn";
    break;
}
console.log(season);
if (season !== "Invalid month") {
  const hot = m >= 6 && m <= 9;
  console.log(¦Hot in Riyadh: #{hot ? "yes" : "no"}¦);
}`, note: "Grouped cases can sit on one line. The default value of <code>season</code> replaces <code>default</code>." }] },
    { id: "d10-fix", lvl: "fire", debug: true, title: "Fix the burger menu", prompt: "<p>This menu has <b>three</b> kinds of bugs (one is a syntax error). Choice 1 must show only <code>Burger - 15 riyals</code>, 2 only <code>Pizza - 20 riyals</code>, 3 only <code>Salad - 12 riyals</code>, and anything else <code>Not on the menu</code>.</p>",
      starter: c`const choice = Number(prompt("Choose 1, 2 or 3"));
switch (choice) {
  case "1":
    console.log("Burger - 15 riyals");
  case 2:
    console.log("Pizza - 20 riyals");
  case 3:
    console.log("Salad - 12 riyals");
    break;
  default
    console.log("Not on the menu");
}`,
      tests: [{ stdin: "1", expected: "Burger - 15 riyals" }, { stdin: "2", expected: "Pizza - 20 riyals" }, { stdin: "3", expected: "Salad - 12 riyals" }, { stdin: "8", expected: "Not on the menu" }],
      hint: "Read the syntax error first (look at <code>default</code>). Then: what type is <code>choice</code>, and what type is <code>\"1\"</code>? Which cases have no <code>break</code>?",
      solutions: [{ name: "Fixed", code: c`const choice = Number(prompt("Choose 1, 2 or 3"));
switch (choice) {
  case 1:
    console.log("Burger - 15 riyals");
    break;
  case 2:
    console.log("Pizza - 20 riyals");
    break;
  case 3:
    console.log("Salad - 12 riyals");
    break;
  default:
    console.log("Not on the menu");
}`, note: "Syntax: <code>default</code> needs a colon. Type: <code>choice</code> is a number, so <code>case 1:</code>, not <code>case \"1\":</code>. Fall-through: cases 1 and 2 needed <code>break</code>." }] },
  ],
  quiz: [
    { q: "What does `break` do inside a switch?", o: ["Stops the whole program", "Leaves the switch", "Skips to `default`", "Restarts the switch"], a: 1, e: "`break` jumps out of the switch; the program continues after its closing `}`." },
    { q: "What does this show?", code: c`const x = 2;
switch (x) {
  case 1:
    console.log("A");
  case 2:
    console.log("B");
  case 3:
    console.log("C");
}`, o: ["`B`", "`B\nC`", "`A\nB\nC`", "`C`"], a: 1, e: "It starts at `case 2` and falls through into `case 3` because there is no `break`." },
    { q: "What does this show?", code: c`const v = "3";
switch (v) {
  case 3:
    console.log("number");
    break;
  default:
    console.log("other");
}`, o: ["`number`", "`other`"], a: 1, e: "switch compares with `===`, and `\"3\" === 3` is `false`." },
    { q: "What does this show?", code: c`const points = 70;
console.log(points > 50 ? "win" : "lose");`, o: ["`win`", "`lose`", "`true`"], a: 0, e: "70 > 50 is true, so the value after `?` is chosen." },
    { q: "Which job fits a **ternary** best?", o: ["Showing a grade A to F from a mark", "Choosing `\"am\"` or `\"pm\"` from the hour", "Running five lines when the user wins", "A menu with seven choices"], a: 1, e: "A ternary picks one of **two values**. Many choices → `else if` or `switch`; several actions → `if`." },
    { q: "Why avoid `a ? b : c ? d : e`?", o: ["It is a syntax error", "It is hard to read and easy to get wrong", "It is slower", "Ternaries cannot contain strings"], a: 1, e: "It works, but nested ternaries are hard to read. Use `else if` for three or more choices." },
  ],
  puzzle: { title: "Fall-through maze", q: "<p>Without running it: what <b>exactly</b> does this program show? Type the output on one line, values separated by spaces.</p>", code: c`let score = 0;
const level = "medium";
switch (level) {
  case "easy":
    score += 1;
  case "medium":
    score += 10;
  case "hard":
    score += 100;
    break;
  default:
    score = -1;
}
console.log(score, score > 100 ? "big" : "small");`, answers: ["110 big"], run: true, hint: "Start at the matching case and add until you meet a `break`. Is 110 greater than 100?", e: "It starts at `\"medium\"`: +10, falls into `\"hard\"`: +100, then `break`. So `score` is 110, and 110 > 100 is `true`, so the ternary gives `big`. The `default` never runs." },
  cards: [
    { f: "The parts of a switch?", b: "`switch (value) { case x: ... break; default: ... }`" },
    { f: "What is fall-through?", b: "Without `break`, a switch keeps running into the next cases. Useful only when grouping cases on purpose." },
    { f: "How does switch compare values?", b: "With `===` — so `\"2\"` does not match `case 2:`." },
    { f: "Shape of the ternary operator?", b: "`condition ? valueIfTrue : valueIfFalse` — it gives a value." },
    { f: "if, switch or ternary?", b: "Ranges/mixed conditions → `if`. One value vs many exact values → `switch`. Two values → ternary." },
  ],
  remember: [
    "`switch` compares one value with many exact `case` values, using `===`.",
    "End each case with `break;` or it falls through into the next case.",
    "Stack cases with no code between them to group values on purpose (`friday`, `saturday` → weekend).",
    "`default` runs when no case matches, like the final `else`.",
    "`cond ? a : b` picks one of two values; you can store it or put it in a template literal.",
    "Ranges belong in `if / else if`; never nest ternaries.",
  ],
};
})();
