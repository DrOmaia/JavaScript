window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[5] = {
  title: "Strings, template literals and prompt",
  intro: "Until today your programs talked, but they never listened. Today, {{name}}, you learn to take text apart, clean it, search inside it, build neat messages with template literals — and ask the user questions with <code>prompt()</code>.",
  goals: [
    "Find the length of a string and read single characters with `s[0]`",
    "Use string methods: `toUpperCase`, `toLowerCase`, `trim`, `includes`, `indexOf`, `slice`, `replace`",
    "Build messages with `+` and with template literals (backticks and `${}`)",
    "Ask the user a question with `prompt()` and use the answer",
    "Turn text into numbers with `Number()`, `parseInt()` and `parseFloat()`, and spot `NaN`",
  ],
  learn: [
    { t: "h", text: "A string is a row of characters" },
    { t: "p", html: "<p>Your name, a password, a WhatsApp message, the title of a song — most of the data you meet every day is <b>text</b>. Programs measure it (\"is this password long enough?\"), read parts of it and change it (\"show the name in capitals\").</p>" },
    { t: "analogy", title: "A string is like a row of numbered lockers", html: "<p>Imagine a row of school lockers, each holding one character. The lockers are numbered, but the numbering starts at <b>0</b>, not 1. The word <code>\"Riyadh\"</code> fills six lockers: <code>R</code> is in locker 0, <code>i</code> in locker 1 … and <code>h</code> in locker 5. The number of a locker is called its <b>index</b>.</p>" },
    { t: "code", code: c`const city = "Riyadh";
console.log(city.length);
console.log(city[0]);
console.log(city[2]);
console.log(city[city.length - 1]);`, before: "<p>Look at the numbers inside the square brackets.</p>", note: "<p><code>.length</code> counts the characters: 6. <code>city[0]</code> is the first character. Because counting starts at 0, the <b>last</b> character is always at <code>length - 1</code>, here <code>city[5]</code>.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`city.length`, "The <b>length</b> of the string: how many characters it has. Spaces and punctuation count too. No parentheses — it is a value, not an action."],
      [c`city[0]`, "Square brackets with an <b>index</b> give you one character. Index 0 is the first one."],
      [c`city[city.length - 1]`, "JavaScript calculates <code>6 - 1</code> first, then reads <code>city[5]</code>: the last character. This works for a string of any length."],
    ] },
    { t: "check", q: "What does this show?", code: c`const word = "Football";
console.log(word[1]);`, o: ["`F`", "`o`", "`l`", "`undefined`"], a: 1, e: "Indexes start at 0, so `word[0]` is `F` and `word[1]` is the second letter, `o`.", hint: "The first character has index 0, not 1." },
    { t: "h", text: "String methods: tools that come with every string" },
    { t: "p", html: "<p>A sign-up form gets <code>\"  SARA@Mail.com \"</code> — with extra spaces and random capitals. Before you save it, you want it clean. Every string carries built-in tools called <b>methods</b>. You call a method with a dot and parentheses, like <code>console.log</code>. You already met one on Day 1: <code>.repeat()</code>.</p>" },
    { t: "code", code: c`const email = "  SARA@Mail.com ";
console.log(email.trim());
console.log(email.toLowerCase());
console.log(email.trim().toLowerCase());
console.log(email);`, note: "<p><code>trim()</code> removes spaces at the start and the end (not in the middle). <code>toLowerCase()</code> and <code>toUpperCase()</code> change the letters. Line 4 <b>chains</b> two methods: first trim, then lower case. The last line proves something important: methods <b>never change</b> the original string — they give you a <b>new</b> one.</p>" },
    { t: "code", code: c`const song = "We will rock you";
console.log(song.includes("rock"));
console.log(song.includes("Rock"));
console.log(song.indexOf("will"));
console.log(song.indexOf("pop"));
console.log(song.slice(3, 7));
console.log(song.slice(-3));
console.log(song.replace("you", "{{name}}"));`, before: "<p>Four more methods for <b>searching</b> and <b>cutting</b>.</p>", note: "<p><code>includes</code> answers <code>true</code> or <code>false</code> (and it cares about capitals). <code>indexOf</code> tells you <b>where</b> the text starts, or <code>-1</code> if it is not there. <code>slice(3, 7)</code> cuts from index 3 up to — but <b>not including</b> — index 7. A negative number counts from the end. <code>replace</code> swaps the <b>first</b> match.</p>" },
    { t: "table", head: ["Method", "What it gives back", "Example → result"], rows: [
      ["`s.length`", "number of characters", "`\"Hi!\".length` → `3`"],
      ["`s.toUpperCase()` / `s.toLowerCase()`", "a new string in capitals / small letters", "`\"Js\".toUpperCase()` → `JS`"],
      ["`s.trim()`", "a new string without spaces at both ends", "`\" a b \".trim()` → `a b`"],
      ["`s.includes(x)`", "`true` or `false`", "`\"goal\".includes(\"oa\")` → `true`"],
      ["`s.indexOf(x)`", "index where `x` starts, or `-1`", "`\"goal\".indexOf(\"l\")` → `3`"],
      ["`s.slice(a, b)`", "the part from index `a` up to (not including) `b`", "`\"goal\".slice(1, 3)` → `oa`"],
      ["`s.replace(a, b)`", "a new string with the first `a` changed to `b`", "`\"cat cat\".replace(\"cat\", \"dog\")` → `dog cat`"],
    ] },
    { t: "turn", level: "Easy", q: "What does this line show? Type exactly what appears.", code: c`console.log("  Hello  ".trim().toUpperCase());`, answers: ["HELLO"], run: true, e: "`trim()` removes the spaces on both sides, giving `Hello`; then `toUpperCase()` makes it `HELLO`.", hint: "Do the methods from left to right." },
    { t: "check", q: "What does this show?", code: c`console.log("Saturday".slice(0, 3));`, o: ["`Sat`", "`Satu`", "`atu`", "`Sa`"], a: 0, e: "`slice(0, 3)` takes indexes 0, 1 and 2 — it stops just before 3. So you get `Sat`.", hint: "The second number is where slice stops, and that character is not included." },
    { t: "h", text: "Joining strings: + and template literals" },
    { t: "p", html: "<p>Programs build messages all the time: <i>\"Hi Sara, you scored 18 out of 20\"</i>. With <code>+</code> you glue pieces together, but long messages fill up with quotes, plus signs and missing spaces. <b>Template literals</b> fix that. They use <b>backticks</b> (the key under Esc) instead of quotes, and inside them <code>${ }</code> drops in any value or calculation.</p>" },
    { t: "analogy", title: "A template literal is like a form with blanks", html: "<p>Think of a certificate printed with blanks: <i>\"This is to certify that ______ scored ______ points.\"</i> You only fill in the blanks. In a template literal the text is the printed part, and each <code>${ }</code> is a blank that JavaScript fills with a value.</p>" },
    { t: "code", code: c`const player = "Salem";
const goals = 3;
console.log("Player " + player + " scored " + goals + " goals.");
console.log(¦Player #{player} scored #{goals} goals.¦);
console.log(¦Two more games like this = #{goals * 3} goals!¦);`, note: "<p>Lines 3 and 4 show the same sentence. The template literal is easier to read and the spaces are exactly where you see them. Line 5 shows that <code>${ }</code> can hold a whole calculation.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`¦...¦`, "Backticks start and end a <b>template literal</b>. It is still a string, just a smarter one."],
      [c`#{player}`, "The dollar sign and curly braces make a <b>placeholder</b>. JavaScript puts the value of <code>player</code> here."],
      [c`#{goals * 3}`, "Any expression works inside: JavaScript calculates <code>9</code> first, then puts it in the text."],
    ] },
    { t: "code", code: c`const day = 5;
const card = ¦*** JS30 ***
Student: {{name}}
Day: #{day} of 30¦;
console.log(card);`, before: "<p>Template literals can also span <b>several lines</b>. The line breaks you type are kept.</p>" },
    { t: "turn", level: "Medium", q: "What does this show? Type the output.", code: c`const item = "juice";
const price = 4;
console.log(¦2 #{item}s cost #{price * 2} riyals¦);`, answers: ["2 juices cost 8 riyals"], run: true, e: "`${item}` becomes `juice` (followed by the letter s), and `${price * 2}` is calculated: 8.", hint: "Replace every `${...}` with its value." },
    { t: "h", text: "Asking the user: prompt()" },
    { t: "p", html: "<p>A program that always prints the same thing is like a vending machine with one button. <code>prompt(\"question\")</code> stops the program, asks the user, and gives back what they typed so you can store it in a variable. In a real browser a small window pops up. In JS30, the answers come from the <b>Input</b> box under the editor: <b>one line for each</b> <code>prompt()</code>, in order.</p>" },
    { t: "code", code: c`const name = prompt("What is your name?");
const food = prompt("Favourite food?");
console.log(¦Hello #{name}! I like #{food} too.¦);`, stdin: "Noura\nkabsa", before: "<p>The Input box already has two lines: <code>Noura</code> and <code>kabsa</code>. Change them and run again.</p>", note: "<p>The first <code>prompt()</code> takes the first line of the Input box, the second takes the second line. There is also <code>alert(\"message\")</code>, which only shows a message in a pop-up and asks nothing; in JS30 it appears in the output as <code>[alert] message</code>.</p>" },
    { t: "h", text: "prompt always gives you a string" },
    { t: "p", html: "<p>Here is the trap that catches every beginner: even if the user types <code>5</code>, <code>prompt()</code> gives you the <b>string</b> <code>\"5\"</code>. And <code>+</code> with a string <b>glues</b> instead of adding. So before doing math, <b>convert</b> the answer to a number.</p>" },
    { t: "code", code: c`const answer = prompt("How old are you?");
console.log(typeof answer);
console.log(answer + 1);
const age = Number(answer);
console.log(typeof age);
console.log(age + 1);`, stdin: "15", note: "<p>The string <code>\"15\"</code> plus 1 gives <code>151</code> — glued text. After <code>Number()</code> you have the number 15, and <code>age + 1</code> gives <code>16</code>.</p>" },
    { t: "code", code: c`console.log("5" + 2);
console.log(Number("5") + 2);
console.log(parseInt("12 riyals"));
console.log(parseFloat("3.75kg"));
console.log(Number("twelve"));
console.log(String(2026) + "!");`, before: "<p>The conversion tools side by side.</p>", note: "<p><code>Number()</code> converts the whole string, so it needs clean digits. <code>parseInt()</code> reads a whole number from the <b>start</b> and stops at the first non-digit; <code>parseFloat()</code> does the same but keeps the decimal part. When the text is not a number at all you get <code>NaN</code> — \"Not a Number\". <code>String()</code> goes the other way: number to text.</p>" },
    { t: "check", q: "The user types `4` and `6`. What does this show?", code: c`const a = prompt("First?");
const b = prompt("Second?");
console.log(a + b);`, o: ["`10`", "`46`", "`NaN`", "`a + b`"], a: 1, noRun: true, e: "Both answers are strings: `\"4\" + \"6\"` glues them into `46`. Use `Number(a) + Number(b)` to get 10.", hint: "What type does `prompt()` always give you?" },
    { t: "check", q: "What does this show?", code: c`console.log(Number("7") * 2, parseInt("7.9"));`, o: ["`14 7`", "`14 7.9`", "`77 7`", "`NaN 7`"], a: 0, e: "`Number(\"7\")` is the number 7, times 2 is 14. `parseInt` keeps only the whole number part, so `\"7.9\"` gives 7.", hint: "`parseInt` stops at the decimal point." },
    { t: "viz", code: c`const first = "  layla ";
const clean = first.trim();
const big = clean.toUpperCase();
const initial = big[0];
console.log(¦#{big} starts with #{initial}¦);`, before: "<p>Press <b>Visualize</b> and watch each variable get a <b>new</b> string while <code>first</code> stays the same.</p>" },
    { t: "steps", title: "A cinema ticket", problem: "<p>The school cinema club wants a small program: it asks for the student's name and the number of tickets (8 riyals each), then prints a ticket like this:</p><pre class=\"code-static\">=== CINEMA CLUB ===\nName: SARA\nTickets: 3\nTo pay: 24 riyals\nCode: SAR-3</pre>",
      steps: [
        { html: "<p><b>Understand.</b> Two inputs: a name (text) and a number of tickets (a number, but <code>prompt</code> gives text!). The name is shown in capitals. The code is the first 3 letters of the name, a dash, and the tickets.</p>" },
        { html: "<p><b>Plan.</b> Ask with <code>prompt()</code>, clean the name with <code>trim()</code> and <code>toUpperCase()</code>, convert the tickets with <code>Number()</code>, then print with template literals.</p>" },
        { html: "<p><b>Read the inputs.</b> Clean the name right away, and convert the tickets right away, so the rest of the program works with good values.</p>", code: c`const name = prompt("Your name?").trim().toUpperCase();
const tickets = Number(prompt("How many tickets?"));
const price = 8;` },
        { html: "<p><b>Build the pieces.</b> The total is a calculation. The code uses <code>slice(0, 3)</code> on the name.</p>", code: c`const total = tickets * price;
const code = ¦#{name.slice(0, 3)}-#{tickets}¦;` },
        { html: "<p><b>Print and test.</b> One <code>console.log</code> per line. Try different names in the Input box, with spaces and small letters.</p>", code: c`console.log("=== CINEMA CLUB ===");
console.log(¦Name: #{name}¦);
console.log(¦Tickets: #{tickets}¦);
console.log(¦To pay: #{total} riyals¦);
console.log(¦Code: #{code}¦);` },
      ],
      code: c`// Cinema club ticket
const name = prompt("Your name?").trim().toUpperCase();
const tickets = Number(prompt("How many tickets?"));
const price = 8;

const total = tickets * price;
const code = ¦#{name.slice(0, 3)}-#{tickets}¦;

console.log("=== CINEMA CLUB ===");
console.log(¦Name: #{name}¦);
console.log(¦Tickets: #{tickets}¦);
console.log(¦To pay: #{total} riyals¦);
console.log(¦Code: #{code}¦);`, stdin: "  sara \n3" },
  ],
  mistakes: [
    { title: "Doing math with prompt answers", html: "<code>prompt()</code> always returns a string, so <code>+</code> glues the text: <code>\"10\" + \"5\"</code> is <code>105</code>. Convert first.", wrong: c`const a = prompt("Number?");
console.log(a + 5);`, right: c`const a = Number(prompt("Number?"));
console.log(a + 5);` },
    { title: "Quotes instead of backticks", html: "<code>${ }</code> only works inside backticks. Inside normal quotes it is just text, and you see the dollar sign in the output.", wrong: c`console.log("Hi #{name}");`, right: c`console.log(¦Hi #{name}¦);` },
    { title: "Thinking the last character is s[s.length]", html: "Indexes start at 0, so the last one is <code>length - 1</code>. <code>s[s.length]</code> is past the end and gives <code>undefined</code>.", wrong: c`const s = "pizza";
console.log(s[s.length]);`, right: c`const s = "pizza";
console.log(s[s.length - 1]);` },
    { title: "Expecting a method to change the original", html: "String methods give back a <b>new</b> string. If you want to keep the result, store it in a variable.", wrong: c`let city = "jeddah";
city.toUpperCase();
console.log(city);`, right: c`let city = "jeddah";
city = city.toUpperCase();
console.log(city);` },
  ],
  tricks: [
    { title: "The last characters with a negative slice", html: "<code>slice(-n)</code> gives the last n characters — handy for the end of a phone number or a year.", code: c`const phone = "0551234567";
console.log(¦Ends with #{phone.slice(-4)}¦);
console.log("2009".slice(-2));` },
    { title: "Capitalize the first letter", html: "Take the first character in capitals and glue it to the rest of the word.", code: c`const word = "riyadh";
console.log(word[0].toUpperCase() + word.slice(1));` },
    { title: "A quick number: the unary plus", html: "A <code>+</code> in front of a string converts it to a number, just like <code>Number()</code>. You will see it in other people's code — <code>Number()</code> is clearer while you learn.", code: c`const a = "8";
console.log(+a + 2);
console.log(Number(a) + 2);` },
  ],
  practice: [
    { t: "try", title: "Make it yours", html: "<p>Change the answers in the Input box (one per line), run, then add a third question of your own.</p>", code: c`const name = prompt("Your name?");
const team = prompt("Favourite team?");
console.log(¦#{name.toUpperCase()} supports #{team}!¦);
console.log(¦#{name} has #{name.length} letters.¦);`, stdin: "{{name}}\nAl Hilal" },
    { t: "predict", code: c`console.log("3" + 4);
console.log(3 + 4);
console.log(Number("3") + 4);
console.log("3" * 4);`, explain: "<p><code>+</code> with a string glues: <code>34</code>. Two numbers add: <code>7</code>. After <code>Number()</code> both are numbers: <code>7</code>. Surprise: <code>*</code> has no text meaning, so JavaScript converts <code>\"3\"</code> to a number by itself and gives <code>12</code>. Only <code>+</code> is the tricky one.</p>" },
    { t: "turn", level: "Easy", q: "What does this line show?", code: c`console.log("JavaScript".indexOf("S"));`, answers: ["4"], run: true, e: "J-a-v-a are indexes 0 to 3, so the capital `S` is at index 4.", placeholder: "type the output" },
    { t: "parsons", title: "Order the greeting program", prompt: "Put the lines in order: ask for the name, clean it, then greet.", lines: [c`const raw = prompt("Name?");`, c`const name = raw.trim();`, c`console.log(¦Welcome, #{name}!¦);`], distractors: [c`console.log("Welcome, #{name}!");`], explain: "You must have a value before you use it, so the order is: ask → clean → print. The extra line uses quotes instead of backticks, so it would print <code>${name}</code> literally." },
    { t: "predict", code: c`const s = "Good morning";
console.log(s.length);
console.log(s.slice(5));
console.log(s.includes("good"));`, explain: "<p>The space counts, so the length is 12. <code>slice(5)</code> with one number goes to the end: <code>morning</code>. <code>includes</code> is case-sensitive, so <code>\"good\"</code> is not found: <code>false</code>.</p>" },
    { t: "try", title: "Story machine", html: "<p>Fill the Input box with four words (one per line) and get a silly story. Then write your own story template.</p>", code: c`const animal = prompt("An animal?");
const place = prompt("A place?");
const food = prompt("A food?");
const n = Number(prompt("A number?"));
console.log(¦One day a #{animal} walked into #{place}.
It ate #{n} plates of #{food} and asked for #{n * 2} more!¦);`, stdin: "camel\nthe school library\nsamosa\n7" },
    { t: "turn", level: "Medium", q: "What does this line show?", code: c`console.log(parseInt("25px") + 5);`, answers: ["30"], run: true, e: "`parseInt` reads `25` from the start and stops at `p`. Now it is a number, so `25 + 5` is 30.", placeholder: "type the output" },
  ],
  exercises: [
    { id: "shout", lvl: "seed", title: "Shout it", prompt: "<p>Ask the user for a word with <code>prompt()</code> and show it in capital letters. For the input <code>hello</code> the output is:</p><pre class=\"code-static\">HELLO</pre>", starter: c`const word = prompt("A word?");
// show it in capitals
`, tests: [{ stdin: "hello", expected: "HELLO" }, { stdin: "Js30", expected: "JS30" }],
      hint: "Use <code>.toUpperCase()</code> on the answer.",
      solutions: [{ name: "Method on the variable", code: c`const word = prompt("A word?");
console.log(word.toUpperCase());`, note: "<code>toUpperCase()</code> gives a new string in capitals." },
        { name: "All in one line", code: c`console.log(prompt("A word?").toUpperCase());`, note: "You can call a method directly on what <code>prompt()</code> returns." }] },
    { id: "welcome-tpl", lvl: "seed", title: "Welcome with a template", prompt: "<p>Ask for the user's name and city, then show one line using a <b>template literal</b>. For <code>Sara</code> and <code>Riyadh</code>:</p><pre class=\"code-static\">Welcome Sara from Riyadh!</pre>", tests: [{ stdin: "Sara\nRiyadh", expected: "Welcome Sara from Riyadh!" }, { stdin: "Omar\nAbha", expected: "Welcome Omar from Abha!" }],
      hint: "Two <code>prompt()</code> calls, then backticks with two <code>${...}</code> placeholders.",
      solutions: [{ name: "Template literal", code: c`const name = prompt("Name?");
const city = prompt("City?");
console.log(¦Welcome #{name} from #{city}!¦);`, note: "Spaces and the exclamation mark sit right where you see them." },
        { name: "With +", code: c`const name = prompt("Name?");
const city = prompt("City?");
console.log("Welcome " + name + " from " + city + "!");`, note: "It works too, but watch the spaces inside the quotes." }] },
    { id: "initials", lvl: "star", title: "Initials", prompt: "<p>Ask for a first name and a last name (they may be in small letters). Show the initials in capitals with dots. For <code>sara</code> and <code>alharbi</code>:</p><pre class=\"code-static\">S.A.</pre>", tests: [{ stdin: "sara\nalharbi", expected: "S.A." }, { stdin: "Khalid\nomar", expected: "K.O." }],
      hint: "The first letter of a string <code>s</code> is <code>s[0]</code>. Turn it into a capital with <code>toUpperCase()</code>.",
      solutions: [{ name: "Index and template", code: c`const first = prompt("First name?");
const last = prompt("Last name?");
console.log(¦#{first[0].toUpperCase()}.#{last[0].toUpperCase()}.¦);`, note: "Take character 0 of each name and make it a capital." },
        { name: "Build, then capitals", code: c`const first = prompt("First name?");
const last = prompt("Last name?");
const initials = first[0] + "." + last[0] + ".";
console.log(initials.toUpperCase());`, note: "Glue the pieces first, then change the whole string to capitals once. Dots have no capital form, so they stay." }] },
    { id: "next-year", lvl: "star", title: "Next year", prompt: "<p>Ask for the user's age and show how old they will be next year. For <code>15</code>:</p><pre class=\"code-static\">Next year you will be 16.</pre><p>Careful: <code>prompt()</code> gives a string!</p>", tests: [{ stdin: "15", expected: "Next year you will be 16." }, { stdin: "9", expected: "Next year you will be 10." }],
      hint: "Convert the answer with <code>Number()</code> before you add 1, or you will get <code>151</code>.",
      solutions: [{ name: "Number()", code: c`const age = Number(prompt("Your age?"));
console.log(¦Next year you will be #{age + 1}.¦);`, note: "Convert once, when you read the answer." },
        { name: "parseInt()", code: c`const age = parseInt(prompt("Your age?"));
const next = age + 1;
console.log("Next year you will be " + next + ".");`, note: "<code>parseInt</code> also works for whole numbers." }] },
    { id: "clean-email", lvl: "star", title: "Clean the email", prompt: "<p>Users type emails carelessly. Ask for an email, then show it without spaces at the ends and in small letters, and on a second line whether it contains <code>@</code>. For <code>  Sara@Mail.COM </code>:</p><pre class=\"code-static\">sara@mail.com\nHas @: true</pre>", tests: [{ stdin: "  Sara@Mail.COM ", expected: "sara@mail.com\nHas @: true" }, { stdin: "OMAR.mail.com", expected: "omar.mail.com\nHas @: false" }],
      hint: "Chain <code>.trim().toLowerCase()</code>, then use <code>.includes(\"@\")</code>.",
      solutions: [{ name: "Clean, then check", code: c`const email = prompt("Email?").trim().toLowerCase();
console.log(email);
console.log(¦Has @: #{email.includes("@")}¦);`, note: "Clean the value once and store it. A boolean inside <code>${}</code> becomes the text <code>true</code> or <code>false</code>." },
        { name: "Two values", code: c`const raw = prompt("Email?");
const email = raw.trim().toLowerCase();
console.log(email);
console.log("Has @:", email.includes("@"));`, note: "<code>console.log</code> with two values adds the space for you." }] },
    { id: "fix-sum", lvl: "fire", debug: true, title: "Fix the calculator", prompt: "<p>This program should add two numbers typed by the user. With <code>5</code> and <code>7</code> it must show:</p><pre class=\"code-static\">5 + 7 = 12</pre><p>It has <b>two</b> bugs. Run it first and look at what it prints.</p>",
      starter: c`const a = prompt("First number?");
const b = prompt("Second number?");
console.log("#{a} + #{b} = #{a + b}");`, tests: [{ stdin: "5\n7", expected: "5 + 7 = 12" }, { stdin: "2.5\n10", expected: "2.5 + 10 = 12.5" }],
      hint: "Bug 1: <code>${}</code> needs backticks. Bug 2: what type does <code>prompt()</code> return? Use <code>Number()</code> (not <code>parseInt</code> — the second test has a decimal).",
      solutions: [{ name: "Convert when reading", code: c`const a = Number(prompt("First number?"));
const b = Number(prompt("Second number?"));
console.log(¦#{a} + #{b} = #{a + b}¦);`, note: "Backticks make the placeholders work, and <code>Number()</code> turns the answers into numbers so <code>+</code> adds." },
        { name: "parseFloat", code: c`const a = parseFloat(prompt("First number?"));
const b = parseFloat(prompt("Second number?"));
console.log(¦#{a} + #{b} = #{a + b}¦);`, note: "<code>parseFloat</code> keeps the decimal part, so 2.5 stays 2.5." }] },
    { id: "username", lvl: "fire", title: "Make a username", prompt: "<p>Ask for a full name (first and last, maybe with extra spaces) and a birth year. Make a username: the name in small letters, the space changed to <code>_</code>, then the last two digits of the year. For <code>  Sara Ahmed </code> and <code>2010</code>:</p><pre class=\"code-static\">sara_ahmed10</pre>", tests: [{ stdin: "  Sara Ahmed \n2010", expected: "sara_ahmed10" }, { stdin: "OMAR Ali\n2009", expected: "omar_ali09" }],
      hint: "Clean with <code>trim()</code> and <code>toLowerCase()</code>, swap with <code>replace(\" \", \"_\")</code>, and take the end of the year with <code>slice(-2)</code>.",
      solutions: [{ name: "Step by step", code: c`const full = prompt("Full name?");
const year = prompt("Birth year?");
const clean = full.trim().toLowerCase();
const user = clean.replace(" ", "_") + year.slice(-2);
console.log(user);`, note: "The year stays a string here — that is exactly what you want, because you are cutting text, not calculating." },
        { name: "One template", code: c`const full = prompt("Full name?").trim().toLowerCase();
const year = prompt("Birth year?");
console.log(¦#{full.replace(" ", "_")}#{year.slice(-2)}¦);`, note: "Two placeholders right next to each other glue the parts with nothing between them." }],
      twist: "Add the length of the first name at the end: <code>sara_ahmed104</code>. Hint: the first name ends where <code>indexOf(\" \")</code> finds the space." },
  ],
  quiz: [
    { q: "What does this show?", code: c`console.log("Jeddah".length);`, o: ["`5`", "`6`", "`7`"], a: 1, e: "J-e-d-d-a-h is 6 characters." },
    { q: "What does this show?", code: c`const s = "Makkah";
console.log(s[s.length - 1]);`, o: ["`M`", "`h`", "`a`", "`undefined`"], a: 1, e: "`s.length - 1` is 5, the index of the last character, `h`." },
    { q: "What does this show?", code: c`const n = 4;
console.log(¦#{n} x 5 = #{n * 5}¦);`, o: ["`4 x 5 = 20`", "`${n} x 5 = ${n * 5}`", "`n x 5 = n * 5`"], a: 0, e: "Inside backticks every `${...}` is replaced by its value." },
    { q: "What does `prompt()` always give back when the user types something?", o: ["A number", "A string", "A boolean", "It depends on what was typed"], a: 1, e: "Always a string, even for `42`. Convert it with `Number()` before doing math." },
    { q: "What does this show?", code: c`console.log("8" + 2, Number("8") + 2);`, o: ["`82 10`", "`10 10`", "`82 82`", "`10 82`"], a: 0, e: "A string plus a number glues: `82`. After `Number()` it adds: `10`." },
    { q: "What does this show?", code: c`console.log(Number("ten") + 1);`, o: ["`11`", "`ten1`", "`NaN`", "`1`"], a: 2, e: "`\"ten\"` is not digits, so `Number()` gives `NaN`, and any math with `NaN` stays `NaN`." },
  ],
  puzzle: { title: "Secret code", q: "<p>Without running it: what <b>exactly</b> does this program show?</p>", code: c`const w = "  banana split ";
const t = w.trim();
console.log(¦#{t.slice(0, 3).toUpperCase()}-#{t.length}-#{t.indexOf("s")}¦);`, answers: ["BAN-12-7"], run: true, hint: "First trim. Then count characters (the middle space counts). Then find the index of `s`.", e: "`t` is `banana split` (12 characters). `slice(0, 3)` is `ban` → `BAN`. The `s` is after `banana` (indexes 0–5) and the space (6), so it is at index 7." },
  cards: [
    { f: "How do you get the first and the last character of `s`?", b: "`s[0]` and `s[s.length - 1]` — indexes start at 0." },
    { f: "What does `s.slice(1, 4)` give?", b: "The characters at indexes 1, 2 and 3 (it stops before 4)." },
    { f: "How do you put a value inside a template literal?", b: "Write the string with backticks and put the value in `${ }`, e.g. a template with `${name}`." },
    { f: "What type does `prompt()` return?", b: "Always a string. Use `Number()` before doing math with it." },
    { f: "What is `NaN`?", b: "\"Not a Number\" — the result of turning text like `\"abc\"` into a number." },
  ],
  remember: [
    "A string is a row of characters; `s.length` counts them and `s[0]` is the first one.",
    "Methods like `trim`, `toUpperCase`, `slice` and `replace` give back a **new** string; the original does not change.",
    "`includes` says `true` / `false`; `indexOf` says where (or `-1`).",
    "Template literals use backticks; `${ }` puts any value or calculation inside, and they can span several lines.",
    "`prompt()` always returns a **string**: convert with `Number()`, `parseInt()` or `parseFloat()` before math.",
    "Bad text turned into a number gives `NaN`.",
  ],
};
})();
