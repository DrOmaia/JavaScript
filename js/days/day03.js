window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[3] = {
  title: "Data types and typeof",
  intro: "On Day 1 you saw that <code>\"5\" + \"5\"</code> and <code>5 + 5</code> give different results, {{name}}. Today you find out why: every value in JavaScript has a <b>type</b>, and the type decides how the value behaves. You will also learn <code>typeof</code>, a tool that tells you the type of any value.",
  goals: [
    "Name the main data types: string, number, boolean, undefined and null",
    "Use `typeof` to find the type of a value, and know that it gives back a string",
    "Explain the famous `typeof null` quirk",
    "Tell the text `\"5\"` from the number `5`",
    "Understand that a variable can hold different types at different times",
  ],
  learn: [
    { t: "h", text: "Why types matter" },
    { t: "p", html: "<p>Your phone stores photos, songs and messages. It opens a photo in the gallery and a song in the music player — it never tries to <i>play</i> a photo. To do that, it must know what kind of file each one is. JavaScript is the same: before it can add, glue or compare values, it needs to know what <b>kind</b> of value each one is. That kind is called the <b>data type</b>.</p>" },
    { t: "analogy", title: "Types are like the kinds of things in your school bag", html: "<p>Your bag holds a notebook, a calculator and a lunch box. You write in the notebook, calculate with the calculator and eat from the lunch box. Each thing has its own job. In JavaScript, a <b>string</b> is the notebook (text), a <b>number</b> is the calculator (math), and a <b>boolean</b> is a small switch that is either on or off.</p>" },
    { t: "h", text: "string: text" },
    { t: "code", code: c`let subject = "Chemistry";
let emptyNote = "";
console.log(subject);
console.log(typeof subject);
console.log(typeof emptyNote);`, before: "<p>Meet <code>typeof</code>: put it in front of a value and it tells you the type.</p>", note: "<p>Anything between quotes is a <b>string</b>, even an empty pair of quotes <code>\"\"</code> (a string with no letters, like an empty page in the notebook).</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`let subject = "Chemistry";`, "Creates a variable and stores the text <i>Chemistry</i>. The quotes make it a string."],
      [c`typeof subject`, "<code>typeof</code> is an <b>operator</b>, like <code>+</code>. It looks at the value inside <code>subject</code> and gives back its type."],
      [c`console.log(typeof subject);`, "Shows the answer of <code>typeof</code>: the word <code>string</code>."],
      [c`""`, "The <b>empty string</b>. It has no characters, but its type is still string."],
    ] },
    { t: "h", text: "number: whole and decimal" },
    { t: "p", html: "<p>Marks, prices, temperatures and goals are numbers. Many languages have one type for whole numbers and another for decimals. JavaScript keeps it simple: <b>all numbers are the same type</b>, <code>number</code> — whole, decimal, positive or negative. Write decimals with a <b>dot</b>, never a comma.</p>" },
    { t: "code", code: c`let goals = 3;
let temperature = 41.5;
let belowZero = -4;
console.log(typeof goals, typeof temperature, typeof belowZero);` },
    { t: "turn", level: "Easy", q: "What is the data type of `3.75`? Type one word.", answers: ["number"], e: "Whole numbers and decimals are both `number` in JavaScript.", hint: "JavaScript does not have a separate type for decimals.", placeholder: "e.g. string", oneWord: true },
    { t: "h", text: "boolean: true or false" },
    { t: "analogy", title: "A boolean is a light switch", html: "<p>A light switch has exactly two positions: on or off. A <b>boolean</b> has exactly two values: <code>true</code> and <code>false</code>. Is the shop open? Did you pass? Is the phone charging? Every yes/no question can be stored as a boolean. From Week 2 your programs will use booleans to make decisions.</p>" },
    { t: "code", code: c`let isCharging = true;
let passedTest = false;
console.log(isCharging, passedTest);
console.log(typeof isCharging);`, note: "<p><code>true</code> and <code>false</code> have <b>no quotes</b>. With quotes, <code>\"true\"</code> would only be a string that happens to contain four letters. Boolean names often start with <code>is</code>, <code>has</code> or <code>can</code>.</p>" },
    { t: "turn", level: "Easy", q: "What is the data type of `false`? Type one word.", answers: ["boolean", "bool"], e: "`false` (without quotes) is one of the two boolean values.", hint: "It is one of the two values of a light switch.", placeholder: "e.g. number", oneWord: true },
    { t: "h", text: "typeof gives back a string" },
    { t: "p", html: "<p>The answer of <code>typeof</code> is itself a value — and that value is a <b>string</b>, like <code>\"number\"</code> or <code>\"boolean\"</code>. You can store it in a variable or print it next to other text.</p>" },
    { t: "code", code: c`let kind = typeof 2026;
console.log("The type is", kind);
console.log(typeof kind);` },
    { t: "turn", level: "Medium", q: "What does this line show?", code: c`console.log(typeof typeof 100);`, answers: ["string"], run: true, e: "Work from the right: `typeof 100` is the string `\"number\"`. Then `typeof \"number\"` is `string`.", hint: "First work out `typeof 100`. What type is that answer?", placeholder: "type the output", oneWord: true },
    { t: "h", text: "undefined and null: two kinds of \"nothing\"" },
    { t: "p", html: "<p>Sometimes a value is missing. JavaScript has two ways to say so. <code>undefined</code> means <b>no value was ever given</b> — you met it yesterday with <code>let nextExam;</code>. <code>null</code> means <b>empty on purpose</b>: you, the programmer, decided there is nothing there.</p>" },
    { t: "analogy", title: "A form with empty fields", html: "<p>Think of a school form. A field you skipped and never filled in is <code>undefined</code>. A field where you wrote \"none\" (for example <i>Allergies: none</i>) is <code>null</code> — you checked and the answer is \"nothing\".</p>" },
    { t: "code", code: c`let nickname;
let middleName = null;
console.log(nickname, typeof nickname);
console.log(middleName, typeof middleName);`, note: "<p>Look at the last result: <code>typeof null</code> gives <code>object</code>, not <code>null</code>! This is a famous mistake from the very first version of JavaScript in 1995. Fixing it now would break millions of websites, so it stays. Just remember: <b>null is its own type, but <code>typeof</code> says \"object\"</b>.</p>" },
    { t: "turn", level: "Medium", q: "What does `typeof null` give? Type one word.", answers: ["object"], e: "A famous quirk from 1995: `typeof null` is `\"object\"`, even though null is not really an object.", hint: "It is the famous bug of JavaScript — not the word you expect.", placeholder: "type one word", oneWord: true },
    { t: "h", text: "\"5\" is not 5" },
    { t: "p", html: "<p>This causes more beginner bugs than anything else. A value in quotes is a string <b>even if it looks like a number</b>. With strings, <code>+</code> glues; with numbers, <code>+</code> adds.</p>" },
    { t: "code", code: c`let a = "5";
let b = 5;
console.log(typeof a, typeof b);
console.log(a + a);
console.log(b + b);` },
    { t: "check", q: "What does this program show?", code: c`let price = "20";
let tax = "3";
console.log(price + tax);`, o: ["`23`", "`203`", "`20 + 3`", "an error"], a: 1, e: "Both values are in quotes, so they are strings, and `+` glues strings: `\"20\" + \"3\"` is `203`. Remove the quotes to get 23.", hint: "Are these numbers or strings? Look for quotes." },
    { t: "h", text: "One variable, different types" },
    { t: "p", html: "<p>In some languages a variable is created for one type only. JavaScript is <b>dynamically typed</b>: the type belongs to the <b>value</b>, not to the box. A <code>let</code> variable can hold a number now and a string later. It is allowed, but changing the type of a variable on purpose usually makes code confusing, so do it rarely.</p>" },
    { t: "viz", code: c`let thing = 42;
console.log(typeof thing);
thing = "forty-two";
console.log(typeof thing);
thing = true;
console.log(typeof thing);`, before: "<p>Press <b>Visualize</b> and click <b>Next ▶</b>. In the variables panel, watch the value and the type of <code>thing</code> change after each assignment.</p>" },
    { t: "h", text: "More types for later" },
    { t: "p", html: "<p>Lists and groups of data have types too. A list in square brackets is an <b>array</b> (Day 17) and a group of named values in curly braces is an <b>object</b> (Day 19). For both, <code>typeof</code> says <code>object</code>. Two more types exist for special jobs — <code>bigint</code> (huge whole numbers) and <code>symbol</code> (unique labels). You only need to know their names.</p>" },
    { t: "code", code: c`console.log(typeof [90, 85, 77]);
console.log(typeof {name: "Sara", grade: 10});` },
    { t: "table", head: ["Type", "Example", "`typeof` gives"], rows: [
      ["string", "`\"Riyadh\"`, `\"5\"`, `\"\"`", "`\"string\"`"],
      ["number", "`10`, `3.5`, `-4`", "`\"number\"`"],
      ["boolean", "`true`, `false`", "`\"boolean\"`"],
      ["undefined", "a `let` with no value", "`\"undefined\"`"],
      ["null", "`null` (empty on purpose)", "`\"object\"` (the quirk!)"],
      ["array / object", "`[1, 2]`, `{a: 1}`", "`\"object\"`"],
      ["bigint / symbol", "special uses", "`\"bigint\"` / `\"symbol\"`"],
    ] },
    { t: "check", q: "Which value is a **boolean**?", o: ["`\"true\"`", "`true`", "`1`", "`\"yes\"`"], a: 1, e: "Only `true` without quotes is a boolean. `\"true\"` and `\"yes\"` are strings, and `1` is a number.", hint: "Quotes always make a string." },
    { t: "steps", title: "A type report for your profile", problem: "<p>You are making a profile for a school app. It needs a name, a grade, the average mark and whether the student is in the coding club. Show each value with its type, like this:</p><pre class=\"code-static\">{{name}} string\n10 number\n92.5 number\ntrue boolean</pre>",
      steps: [
        { html: "<p><b>Understand.</b> Four values, four lines. Each line shows the value, one space, then its type.</p>" },
        { html: "<p><b>Plan the types.</b> The name is text → string. The grade and average are numbers (no quotes!). Coding club is a yes/no → boolean.</p>", code: c`const studentName = "{{name}}";
const grade = 10;
const average = 92.5;
const inCodingClub = true;` },
        { html: "<p><b>Show a value and its type.</b> Give <code>console.log</code> two values: the variable and <code>typeof</code> the variable. The comma adds the space.</p>", code: c`console.log(studentName, typeof studentName);` },
        { html: "<p><b>Repeat for the rest and check.</b> If a line shows <code>string</code> where you expected <code>number</code>, look for quotes you did not mean to type.</p>", code: c`console.log(grade, typeof grade);
console.log(average, typeof average);
console.log(inCodingClub, typeof inCodingClub);` },
      ],
      code: c`// Type report for {{name}}'s profile
const studentName = "{{name}}";
const grade = 10;
const average = 92.5;
const inCodingClub = true;
console.log(studentName, typeof studentName);
console.log(grade, typeof grade);
console.log(average, typeof average);
console.log(inCodingClub, typeof inCodingClub);` },
  ],
  mistakes: [
    { title: "true in quotes", html: "<code>\"true\"</code> is a string with four letters, not a boolean. Booleans never have quotes.", wrong: c`let isOpen = "true";
console.log(typeof isOpen);`, right: c`let isOpen = true;
console.log(typeof isOpen);` },
    { title: "Numbers in quotes", html: "A number in quotes is text, so <code>+</code> glues instead of adding: <code>\"10\" + 5</code> gives <code>105</code>.", wrong: c`let marks = "10";
console.log(marks + 5);`, right: c`let marks = 10;
console.log(marks + 5);` },
    { title: "A comma instead of a decimal dot", html: "In JavaScript a decimal is written with a dot. A comma separates two different things, so <code>3,5</code> is not three and a half.", wrong: c`console.log(3,5);`, right: c`console.log(3.5);` },
    { title: "Capital letters in typeof", html: "<code>typeof</code> is all small letters. <code>typeOf</code> or <code>TypeOf</code> is not a JavaScript word and causes an error.", wrong: c`console.log(TypeOf 7);`, right: c`console.log(typeof 7);` },
  ],
  tricks: [
    { title: "Print the type next to the value", html: "When a result surprises you, print the value <b>and</b> its type. Many \"weird\" bugs turn out to be a string that should be a number.", code: c`let total = "15";
console.log(total, typeof total);` },
    { title: "typeof with parentheses", html: "<code>typeof</code> works with or without parentheses. Parentheses are useful around a calculation, so the whole result is checked.", code: c`console.log(typeof (2 + 3));
console.log(typeof 2 + 3);` },
    { title: "The empty string and the space", html: "<code>\"\"</code> (nothing) and <code>\" \"</code> (one space) are both strings — and they are different strings. A space is a character too.", code: c`console.log(typeof "", typeof " ");
console.log("[" + "" + "]", "[" + " " + "]");` },
  ],
  practice: [
    { t: "try", title: "Make it yours", html: "<p>Change the values to describe your favourite football player or game character. Make sure each one keeps the right type, then run.</p>", code: c`let hero = "Salem";
let age = 27;
let height = 1.75;
let isCaptain = true;
console.log(hero, typeof hero);
console.log(age, typeof age);
console.log(height, typeof height);
console.log(isCaptain, typeof isCaptain);` },
    { t: "predict", code: c`console.log(typeof "42");
console.log(typeof 42);
console.log(typeof "false");`, explain: "<p>Quotes make strings, so <code>\"42\"</code> and <code>\"false\"</code> are both <b>string</b>. Only <code>42</code> without quotes is a <b>number</b>.</p>" },
    { t: "turn", level: "Easy", q: "What is the data type of `\"Riyadh\"`? Type one word.", answers: ["string"], e: "Text in quotes is always a string.", placeholder: "type one word", oneWord: true },
    { t: "turn", level: "Medium", q: "What does this program show?", code: c`let box;
console.log(typeof box);
box = null;
console.log(typeof box);`, answers: ["undefined\nobject", "undefined object"], run: true, e: "First `box` has no value (`undefined`). Then it holds `null`, and `typeof null` is the famous `object`.", hint: "Two lines of output. Remember the quirk.", placeholder: "type both words" },
    { t: "parsons", title: "From number to text", prompt: "Put the lines in order so the program shows <code>number</code>, then <code>string</code>.", lines: [c`let score = 50;`, c`console.log(typeof score); // number`, c`score = "fifty";`, c`console.log(typeof score); // string`], distractors: [c`let score = "fifty";`], explain: "Create the variable first, check its type, then put a string in it (without <code>let</code>) and check again." },
    { t: "predict", code: c`let x = "3";
let y = 3;
console.log(x + y);
console.log(y + y);`, explain: "<p>When one side of <code>+</code> is a string, JavaScript glues: <code>\"3\" + 3</code> gives <b>33</b>. Two numbers are added: <b>6</b>. You will learn the full story on Day 5.</p>" },
    { t: "try", title: "Type detective", html: "<p>Guess the type of each value <b>before</b> you run. Then add three values of your own and test your guesses.</p>", code: c`console.log(typeof 0);
console.log(typeof "0");
console.log(typeof -1.5);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);` },
  ],
  exercises: [
    { id: "type-trio", lvl: "seed", title: "Three types in one line", prompt: "<p>Create three variables: <code>mark</code> holding the number <code>95</code>, <code>subject</code> holding the text <code>Biology</code>, and <code>passed</code> holding the boolean <code>true</code>. Then show their types in one line:</p><pre class=\"code-static\">number string boolean</pre>", tests: [{ expected: "number string boolean" }, { after: c`console.log(mark, subject, passed);`, expected: "95 Biology true" }],
      hint: "<code>console.log(typeof mark, typeof subject, typeof passed);</code>",
      solutions: [{ name: "One log", code: c`let mark = 95;
let subject = "Biology";
let passed = true;
console.log(typeof mark, typeof subject, typeof passed);`, note: "Three <code>typeof</code> answers, separated by commas, so they appear on one line with spaces." }] },
    { id: "profile-types", lvl: "seed", title: "The right types", prompt: "<p>Create <code>studentName</code> with your name (exactly as you entered it in JS30), <code>grade</code> with the <b>number</b> 10 and <code>likesCoding</code> with the <b>boolean</b> true. Show all three on one line:</p><pre class=\"code-static\">{{name}} 10 true</pre><p>Careful: the tests also check the types!</p>", tests: [{ expected: "{{name}} 10 true" }, { after: c`console.log(typeof studentName, typeof grade, typeof likesCoding);`, expected: "string number boolean" }],
      hint: "Only the name needs quotes. <code>10</code> and <code>true</code> must not have quotes.",
      solutions: [{ name: "Three variables", code: c`const studentName = "{{name}}";
const grade = 10;
const likesCoding = true;
console.log(studentName, grade, likesCoding);`, note: "If you wrote <code>\"10\"</code> or <code>\"true\"</code>, the output looks the same — but the types are wrong. That is why the second test checks <code>typeof</code>." }] },
    { id: "changing-box", lvl: "star", title: "The changing box", prompt: "<p>Create <code>let box = 42;</code> and show its type. Then put the text <code>forty-two</code> into it and show its type. Then put <code>false</code> into it and show its type. Output:</p><pre class=\"code-static\">number\nstring\nboolean</pre>", tests: [{ expected: "number\nstring\nboolean" }, { after: c`console.log(box);`, expected: "false" }],
      hint: "Use <code>let</code> only on the first line. After that write <code>box = ...;</code>",
      solutions: [{ name: "Step by step", code: c`let box = 42;
console.log(typeof box);
box = "forty-two";
console.log(typeof box);
box = false;
console.log(typeof box);`, note: "The type belongs to the value. Each new value brings its own type into the same box." }] },
    { id: "two-nothings", lvl: "star", title: "Two kinds of nothing", prompt: "<p>Create <code>let nickname;</code> (no value) and <code>let middleName = null;</code>. Show each value followed by its type, one per line:</p><pre class=\"code-static\">undefined undefined\nnull object</pre>", tests: [{ expected: "undefined undefined\nnull object" }, { after: c`console.log(nickname, middleName);`, expected: "undefined null" }],
      hint: "<code>console.log(nickname, typeof nickname);</code> and the same for <code>middleName</code>.",
      solutions: [{ name: "Value and type", code: c`let nickname;
let middleName = null;
console.log(nickname, typeof nickname);
console.log(middleName, typeof middleName);`, note: "The second line shows the quirk: the value is <code>null</code> but <code>typeof</code> says <code>object</code>." }] },
    { id: "fruit-sum", lvl: "star", title: "Add, don't glue", prompt: "<p>The starter shows <code>Fruits: 43</code>, but there are 4 apples and 3 oranges. Change <b>only the first two lines</b> so it shows:</p><pre class=\"code-static\">Fruits: 7</pre>", starter: c`let apples = "4";
let oranges = "3";
console.log("Fruits:", apples + oranges);`, tests: [{ expected: "Fruits: 7" }, { after: c`console.log(typeof apples, typeof oranges);`, expected: "number number" }],
      hint: "The values are strings because of the quotes, so <code>+</code> glues them.",
      solutions: [{ name: "Remove the quotes", code: c`let apples = 4;
let oranges = 3;
console.log("Fruits:", apples + oranges);`, note: "Without quotes the values are numbers, and <code>+</code> adds them: 4 + 3 = 7." }] },
    { id: "fix-types", lvl: "fire", debug: true, title: "Fix the weather report", prompt: "<p>This program has <b>three</b> bugs. Fix them so it shows:</p><pre class=\"code-static\">number\nboolean\nstring\nobject</pre><p>Keep the values 41.5, true and Riyadh, and the variable names.</p>", starter: c`let temperature = 41.5;
let isHot = "true";
let city = Riyadh;
console.log(typeof temperature);
console.log(typeof isHot);
console.log(typeof city);
console.log(Typeof null);`, tests: [{ expected: "number\nboolean\nstring\nobject" }, { after: c`console.log(temperature, isHot, city);`, expected: "41.5 true Riyadh" }],
      hint: "One value has quotes it should not have, one value is missing quotes, and one word has a capital letter it should not have.",
      solutions: [{ name: "Fixed", code: c`let temperature = 41.5;
let isHot = true;
let city = "Riyadh";
console.log(typeof temperature);
console.log(typeof isHot);
console.log(typeof city);
console.log(typeof null);`, note: "Bug 1: <code>\"true\"</code> is a string → <code>true</code>. Bug 2: text needs quotes → <code>\"Riyadh\"</code> (without them JavaScript looks for a variable called Riyadh). Bug 3: <code>Typeof</code> → <code>typeof</code>." }] },
    { id: "type-tour", lvl: "fire", title: "A tour of the types", prompt: "<p>Use <b>one</b> variable called <code>value</code>. Give it five values one after another — <code>\"JS30\"</code>, <code>30</code>, <code>true</code>, nothing (<code>undefined</code>), and <code>null</code> — and after each one run the <b>same line</b> <code>console.log(value, \"->\", typeof value);</code>. Output:</p><pre class=\"code-static\">JS30 -> string\n30 -> number\ntrue -> boolean\nundefined -> undefined\nnull -> object</pre>", tests: [{ expected: "JS30 -> string\n30 -> number\ntrue -> boolean\nundefined -> undefined\nnull -> object" }, { after: c`console.log(value);`, expected: "null" }],
      hint: "Start with <code>let value = \"JS30\";</code>. To make it undefined again you can write <code>value = undefined;</code>.",
      solutions: [{ name: "Same line, new value", code: c`let value = "JS30";
console.log(value, "->", typeof value);
value = 30;
console.log(value, "->", typeof value);
value = true;
console.log(value, "->", typeof value);
value = undefined;
console.log(value, "->", typeof value);
value = null;
console.log(value, "->", typeof value);`, note: "The same <code>console.log</code> line gives a different answer each time, because the value — and its type — changed." }, { name: "Start empty", code: c`let value;
value = "JS30";
console.log(value, "->", typeof value);
value = 30;
console.log(value, "->", typeof value);
value = true;
console.log(value, "->", typeof value);
value = undefined;
console.log(value, "->", typeof value);
value = null;
console.log(value, "->", typeof value);`, note: "Creating the box first with no value also works; it holds <code>undefined</code> until line 2." }],
      twist: "Add <code>value = [1, 2];</code> and the same line. What type does it show?" },
  ],
  quiz: [
    { q: "What is the type of `-7.25`?", o: ["number", "decimal", "string", "float"], a: 0, e: "All numbers — whole, decimal, negative — are `number` in JavaScript." },
    { q: "What does this show?", code: c`console.log(typeof "100");`, o: ["`string`", "`number`", "`100`", "`object`"], a: 0, e: "The quotes make `\"100\"` a string, even though it looks like a number." },
    { q: "What does this show?", code: c`console.log(typeof null);`, o: ["`null`", "`object`", "`undefined`", "`boolean`"], a: 1, e: "The famous quirk from 1995: `typeof null` is `object`." },
    { q: "What does a `let` variable hold before you give it a value?", o: ["`0`", "`null`", "`undefined`", "`\"\"`"], a: 2, e: "A variable that was never given a value holds `undefined`." },
    { q: "What does this show?", code: c`let t = typeof 5;
console.log(typeof t);`, o: ["`number`", "`string`", "`typeof`", "`5`"], a: 1, e: "`typeof 5` gives the string `\"number\"`, so `t` is a string." },
    { q: "Which statement is true?", o: ["A variable can hold a number and later a string", "A variable keeps one type forever", "`\"false\"` is a boolean", "Decimals have their own type"], a: 0, e: "JavaScript is dynamically typed: the type belongs to the value, so a `let` can hold different types over time." },
  ],
  puzzle: { title: "Same look, different type", q: "<p>Without running it: what <b>exactly</b> does this program show? Type the output on one line.</p>", code: c`let x = "10";
let y = 10;
console.log(typeof x, typeof y, x + y);`, answers: ["string number 1010"], run: true, hint: "One value is a string. When `+` meets a string, it glues.", e: "`x` is a string and `y` is a number. `x + y` glues them into `1010`. Output: `string number 1010`." },
  cards: [
    { f: "The 5 basic types you met today?", b: "string, number, boolean, undefined, null (plus bigint and symbol, by name only)." },
    { f: "What does `typeof` give back?", b: "A **string** naming the type, e.g. `\"number\"`." },
    { f: "What is `typeof null`?", b: "`\"object\"` — a famous quirk from 1995. null is really its own type." },
    { f: "`undefined` vs `null`?", b: "`undefined`: no value was ever given. `null`: empty on purpose." },
    { f: "What is `\"5\" + 5`?", b: "`\"55\"` — a value in quotes is a string, and `+` with a string glues." },
  ],
  remember: [
    "Every value has a **type**: string (text), number, boolean (`true`/`false`), undefined, null.",
    "All numbers — whole or decimal — are one type: `number`. Decimals use a dot.",
    "`typeof value` gives the type as a **string**.",
    "`typeof null` is `\"object\"` — a famous old bug that cannot be fixed.",
    "Quotes make a string: `\"5\"` and `\"true\"` are text, not a number or a boolean.",
    "A `let` variable can hold different types at different times (dynamic typing).",
  ],
};
})();
