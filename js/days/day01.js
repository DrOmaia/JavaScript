window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[1] = {
  title: "Hello, JavaScript: console.log and comments",
  intro: "Today you write your first real programs, {{name}}. By the end of the lesson JavaScript will greet you by name, do math for you, and you will know how to read an error message without panic.",
  goals: [
    "Explain what a program is and how JavaScript runs it (top to bottom, one statement at a time)",
    "Show text and numbers with `console.log()`",
    "Tell the difference between text in quotes and math without quotes",
    "Write comments with `//` and `/* */`",
    "Read and fix your first errors",
  ],
  learn: [
    { t: "h", text: "What is programming?" },
    { t: "p", html: "<p>A <b>program</b> is a list of instructions for the computer. The computer is extremely fast, but it is also extremely literal: it does <i>exactly</i> what you write, in the order you write it — not what you meant.</p>" },
    { t: "analogy", title: "A program is like a recipe", html: "<p>A recipe lists steps in order: <i>boil water, add pasta, wait 10 minutes</i>. If you swap two steps, you get a different (probably bad) result. JavaScript reads your code the same way: <b>from top to bottom, one instruction at a time</b>.</p>" },
    { t: "p", html: "<p><b>JavaScript</b> (JS for short) is the language of the web. Every website you use — YouTube, Google, your school portal — runs JavaScript inside your browser to make buttons, menus and games work. It is also used for phone apps, servers and even robots. And you already have it: every browser can run it, so you need to install nothing.</p>" },
    { t: "check", q: "In what order does JavaScript run the instructions of your program?", o: ["From top to bottom, one at a time", "From bottom to top", "All of them at the same moment", "The shortest ones first"], a: 0, e: "Like a recipe: step 1, then step 2, then step 3. Change the order of the lines and you change the result." },
    { t: "h", text: "Your first program" },
    { t: "code", code: c`console.log("Hello, {{name}}!");`, before: "<p>Press <b>▶ Run</b> and look under the editor.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`console`, "The <b>console</b> is a place where a program can write messages. Developers use it all the time to see what their code is doing."],
      [c`.log`, "<code>log</code> means \"write a line\". The dot <code>.</code> means \"the <code>log</code> that belongs to <code>console</code>\"."],
      [c`( ... )`, "The <b>parentheses</b> hold what you give to <code>console.log</code>. This value is called an <b>argument</b>."],
      [c`"Hello, {{name}}!"`, "A <b>string</b> — a piece of text. Text always goes between quotes: <code>\"double\"</code> or <code>'single'</code>, as long as both sides match."],
      [c`;`, "The <b>semicolon</b> ends the instruction, like a full stop ends a sentence."],
    ] },
    { t: "check", q: "In `console.log(\"Good morning\");`, which part is the **string**?", o: ["`console`", "`\"Good morning\"`", "`log`", "`;`"], a: 1, e: "The string is the text between the quotes. `console.log` is the tool that shows it and `;` ends the instruction.", hint: "A string is text, and text always lives between quotes." },
    { t: "h", text: "Text vs numbers" },
    { t: "code", code: c`console.log("3 + 4");
console.log(3 + 4);
console.log(2026);
console.log(10 / 4);`, note: "<p>With quotes, JavaScript shows the text <i>exactly as written</i>. Without quotes, JavaScript <b>calculates</b> first, then shows the result. This small difference is one of the most important ideas in programming.</p>" },
    { t: "check", q: "What does this line show?", code: c`console.log(10 / 4);`, o: ["`10 / 4`", "`2.5`", "`2`", "`104`"], a: 1, e: "No quotes, so JavaScript calculates first: 10 divided by 4 is `2.5`. With quotes it would show the text `10 / 4`.", hint: "Look for quotes. No quotes means JavaScript calculates." },
    { t: "turn", level: "Easy", q: "What does this line show? Type exactly what appears.", code: c`console.log(6 * 7);`, answers: ["42"], run: true, e: "`*` means multiply, and there are no quotes, so JavaScript calculates 6 × 7.", hint: "No quotes — so it is math. `*` is multiply." },
    { t: "h", text: "Several values in one console.log" },
    { t: "code", code: c`console.log("Name:", "{{name}}");
console.log("Day", 1, "of", 30);
console.log("Score:", 8 + 2);` },
    { t: "p", html: "<p>Separate values with <b>commas</b> and <code>console.log</code> shows them on one line with <b>one space</b> between them. You can mix text and numbers, and you can even put a calculation in the middle.</p>" },
    { t: "check", q: "What does this line show?", code: c`console.log("A", "B", 5 - 2);`, o: ["`A B 3`", "`AB3`", "`A, B, 3`", "`A B 5 - 2`"], a: 0, e: "Each comma becomes one space in the output, and `5 - 2` is calculated first because it has no quotes." },
    { t: "h", text: "Comments: notes for humans" },
    { t: "code", code: c`// This is a comment. JavaScript ignores it completely.
console.log("Comments explain WHY the code does something"); // a comment can follow code

/* A comment between slash-star and star-slash
   can be as long as you want. */
// console.log("This line does not run");` },
    { t: "p", html: "<p>A <b>comment</b> starts with <code>//</code> and lasts until the end of the line. For longer notes use <code>/* ... */</code>. Programmers use comments to explain their code to other people (and to themselves next week!). Putting <code>//</code> in front of a line is also a quick way to switch it off without deleting it.</p>" },
    { t: "check", q: "What does this program show?", code: c`// console.log("one");
console.log("two"); // console.log("three");`, o: ["`one` and `two`", "only `two`", "`two` and `three`", "nothing"], a: 1, e: "Everything after `//` is a comment. Line 1 is all comment, and on line 2 only `console.log(\"two\");` runs.", hint: "JavaScript ignores everything from `//` to the end of the line." },
    { t: "h", text: "Special characters inside strings" },
    { t: "code", code: c`console.log("Line one\nLine two");
console.log("Name:\t{{name}}");
console.log("She said \"JS is fun\"");
console.log('It\'s day 1');
console.log("It's day 1 too");` },
    { t: "table", head: ["You write", "You get"], rows: [["`\\n`", "a new line"], ["`\\t`", "a tab (a wide space)"], ["`\\\"`", "a double quote inside a \"...\" string"], ["`\\'`", "a single quote inside a '...' string"]] },
    { t: "p", html: "<p>The backslash <code>\\</code> is the <b>escape</b> character: it gives the next letter a special meaning. An easier trick for quotes: put an apostrophe inside <b>double</b> quotes, like the last line.</p>" },
    { t: "h", text: "Top to bottom, one instruction at a time" },
    { t: "viz", code: c`console.log("First");
console.log("Second");
console.log("Third");`, before: "<p>The visualizer lets you <b>see</b> JavaScript working. Press <b>Visualize</b>, then click <b>Next ▶</b> and watch the output grow line by line.</p>" },
    { t: "steps", title: "A juice shop receipt", problem: "<p>The juice shop near your school asks you for a receipt that looks exactly like this:</p><pre class=\"code-static\">--- Juice receipt ---\nItem:\tMango juice\nPrice: 12 riyals\nThank you, {{name}}!\n---------------------</pre>",
      steps: [
        { html: "<p><b>Understand.</b> The receipt has 5 lines. Line 2 has a tab after <code>Item:</code>. Line 3 mixes text and a number. The top and bottom lines are borders.</p>" },
        { html: "<p><b>Plan.</b> Programs run top to bottom, so write one <code>console.log</code> per line, in the same order as the receipt. Start with a comment that says what the program does.</p>", code: c`// A juice receipt for {{name}}` },
        { html: "<p><b>Build the first two lines.</b> The border is plain text. For the tab use <code>\\t</code> inside the string.</p>", code: c`console.log("--- Juice receipt ---");
console.log("Item:\tMango juice");` },
        { html: "<p><b>Mix text and a number.</b> Give <code>console.log</code> three values separated by commas; it adds the spaces for you.</p>", code: c`console.log("Price:", 12, "riyals");` },
        { html: "<p><b>Finish and check.</b> Add the thank-you line and the bottom border, then run and compare with the receipt character by character.</p>", code: c`console.log("Thank you, {{name}}!");
console.log("---------------------");` },
      ],
      code: c`// A juice receipt for {{name}}
console.log("--- Juice receipt ---");
console.log("Item:\tMango juice");
console.log("Price:", 12, "riyals");
console.log("Thank you, {{name}}!");
console.log("---------------------");` },
  ],
  mistakes: [
    { title: "Forgetting the quotes", html: "Without quotes, JavaScript thinks <code>Hello</code> is the name of a variable and says <code>ReferenceError: Hello is not defined</code>.", wrong: c`console.log(Hello);`, right: c`console.log("Hello");` },
    { title: "Capital letters", html: "JavaScript is <b>case-sensitive</b>: <code>Console.log</code>, <code>console.Log</code> and <code>console.log</code> are three different names. Only <code>console.log</code> exists.", wrong: c`Console.log("Hi");`, right: c`console.log("Hi");` },
    { title: "Mixing quote types", html: "A string must end with the same quote it started with.", wrong: c`console.log("Hello');`, right: c`console.log("Hello");` },
    { title: "Curly quotes from Word or WhatsApp", html: "Copying code from a document can bring “smart quotes”. JavaScript only understands straight quotes <code>\"</code> and <code>'</code>. Type code on the keyboard, in English layout.", wrong: "console.log(“Hello”);", right: c`console.log("Hello");` },
  ],
  tricks: [
    { title: "Repeat text with .repeat()", html: "Strings have built-in tools. <code>.repeat(n)</code> repeats the text n times — perfect for borders.", code: c`console.log("=".repeat(20));
console.log("JS".repeat(3));` },
    { title: "Empty console.log() = empty line", html: "<code>console.log()</code> with nothing inside shows a blank line — useful to space out your output.", code: c`console.log("Part 1");
console.log();
console.log("Part 2");` },
    { title: "Backticks for many lines", html: "Text between backticks <code>`</code> can span several lines exactly as you type them. You will meet backticks again on Day 5.", code: c`console.log(¦Roses are red,
JavaScript is neat,
Day one is done,
{{name}} can't be beat!¦);` },
  ],
  practice: [
    { t: "try", title: "Make it yours", html: "<p>Change the messages below: add your city, your school and one thing you want to build with JavaScript. Run after every change.</p>", code: c`console.log("Hi! My name is {{name}}.");
console.log("I live in ...");
console.log("I study at ...");
console.log("One day I will build ...");` },
    { t: "predict", code: c`console.log("5" + "5");
console.log(5 + 5);`, explain: "With quotes they are <b>strings</b>, and <code>+</code> between strings <b>glues</b> them together: <code>55</code>. Without quotes they are numbers and <code>+</code> adds: <code>10</code>." },
    { t: "turn", level: "Easy", q: "What does this line show?", code: c`console.log("10 - 3");`, answers: ["10 - 3"], run: true, e: "The calculation is inside quotes, so it is just text. JavaScript shows it exactly as written.", placeholder: "type the output" },
    { t: "parsons", title: "Build a welcome card", prompt: "Put the lines in order so the program shows a top border, the welcome line, the day line and a bottom border.", lines: [c`console.log("*".repeat(24)); // top`, c`console.log("Welcome to JS30, {{name}}");`, c`console.log("Day 1 of 30");`, c`console.log("*".repeat(24)); // bottom`], explain: "Programs run top to bottom, so the order of the lines is the order of the output." },
    { t: "try", title: "Text art", html: "<p>Programmers love drawing with characters. Run this, then design your own picture — a house, a cat, your initials.</p>", code: c`console.log("   /\\");
console.log("  /  \\");
console.log(" /____\\");
console.log(" |    |");
console.log(" | [] |");
console.log(" |____|");` },
    { t: "predict", code: c`console.log("One\nTwo\n\nThree");`, explain: "Each <code>\\n</code> starts a new line. Two <code>\\n</code> in a row make an empty line between Two and Three." },
    { t: "turn", level: "Medium", q: "What does this line show?", code: c`console.log("Total:", 4 * 25);`, answers: ["Total: 100"], run: true, e: "Two values: the text `Total:` and the result of `4 * 25`. The comma becomes one space.", placeholder: "type the output", oneWord: false },
    { t: "try", title: "Break it on purpose", html: "<p>Good programmers are not people who never see errors — they are people who understand them quickly. Make each mistake below <b>one at a time</b>, run, and read JS30's explanation:</p><ol><li>Remove the closing <code>)</code></li><li>Remove one quote</li><li>Write <code>Console</code> with a capital C</li><li>Remove both quotes around the text</li></ol>", code: c`console.log("I am learning from my errors");` },
  ],
  exercises: [
    { id: "hello", lvl: "seed", title: "The classic", prompt: "<p>Every programmer's first program. Show exactly:</p><pre class=\"code-static\">Hello, World!</pre>", starter: "// Write your code below\n", tests: [{ expected: "Hello, World!" }],
      hint: "Use <code>console.log()</code> with the text inside quotes. Check the comma, the capital letters and the exclamation mark.",
      solutions: [{ name: "Direct", code: c`console.log("Hello, World!");`, note: "One console.log, one string." }, { name: "Two values", code: c`console.log("Hello,", "World!");`, note: "Two strings; console.log adds the space between them automatically." }],
      twist: "Now show the same line using <b>two</b> values. Can you get exactly the same output?" },
    { id: "card", lvl: "seed", title: "Your student card", prompt: "<p>Show these two lines (with your own name, exactly as you entered it in JS30):</p><pre class=\"code-static\">Name: {{name}}\nGrade: 10</pre>", starter: "", tests: [{ expected: "Name: {{name}}\nGrade: 10" }],
      hint: "Two <code>console.log</code> calls, one for each line.", solutions: [
        { name: "Two logs", code: c`console.log("Name: {{name}}");
console.log("Grade: 10");`, note: "Clear and simple." },
        { name: "One log with \\n", code: c`console.log("Name: {{name}}\nGrade: 10");`, note: "<code>\\n</code> makes the new line inside a single string." },
        { name: "Text and a number", code: c`console.log("Name:", "{{name}}");
console.log("Grade:", 10);`, note: "Commas add the spaces for you." }] },
    { id: "years", lvl: "star", title: "Let JavaScript calculate", prompt: "<p>JavaScript was created in 1995. Show how many years passed until 2026 — but <b>let JavaScript do the subtraction</b>. Your output must be just the number.</p>", tests: [{ expected: "31" }],
      hint: "No quotes around the calculation!",
      solutions: [{ name: "Calculation", code: c`console.log(2026 - 1995);`, note: "JavaScript calculates 2026 - 1995 first, then shows 31." }] },
    { id: "minutes", lvl: "star", title: "Minutes in a school week", prompt: "<p>A school day has 7 lessons of 45 minutes, and a school week has 5 days. Show this exact line, letting JavaScript calculate the number:</p><pre class=\"code-static\">Minutes of lessons per week: 1575</pre>", tests: [{ expected: "Minutes of lessons per week: 1575" }],
      hint: "Two values separated by a comma: the text, then <code>7 * 45 * 5</code>.",
      solutions: [{ name: "Text, then math", code: c`console.log("Minutes of lessons per week:", 7 * 45 * 5);`, note: "The comma adds one space between the text and the number." }] },
    { id: "poem", lvl: "star", title: "Three lines, one console.log", prompt: "<p>Using <b>a single</b> <code>console.log</code>, show:</p><pre class=\"code-static\">JavaScript\nis\nfun</pre>", tests: [{ expected: "JavaScript\nis\nfun" }],
      hint: "Use <code>\\n</code> inside the string where a new line must start.",
      solutions: [{ name: "\\n", code: c`console.log("JavaScript\nis\nfun");`, note: "Two <code>\\n</code> = two line breaks." }, { name: "Backticks", code: c`console.log(¦JavaScript
is
fun¦);`, note: "Text between backticks keeps the line breaks you type." }] },
    { id: "fix1", lvl: "fire", debug: true, title: "Fix the broken welcome", prompt: "<p>This program has <b>three</b> bugs. Fix them so it shows:</p><pre class=\"code-static\">Welcome to JS30\nDay 1 of 30\nLet's code!</pre><p>Run it first and read the error explanations — they tell you where to look.</p>",
      starter: c`Console.log("Welcome to JS30");
console.log('Day 1 of 30");
console.log("Let's code!";`, tests: [{ expected: "Welcome to JS30\nDay 1 of 30\nLet's code!" }],
      hint: "JavaScript stops at the first error it finds. Fix it, run again, and meet the next one.",
      solutions: [{ name: "Fixed", code: c`console.log("Welcome to JS30");
console.log("Day 1 of 30");
console.log("Let's code!");`, note: "Bug 1: <code>Console</code> → <code>console</code>. Bug 2: the quotes did not match. Bug 3: missing <code>)</code>. Note that <code>\"Let's code!\"</code> works because the apostrophe is inside double quotes." }] },
    { id: "box", lvl: "fire", title: "Draw a name badge", prompt: "<p>Show this badge exactly (8 dashes on top and bottom):</p><pre class=\"code-static\">+--------+\n|  JS30  |\n+--------+</pre>", tests: [{ expected: "+--------+\n|  JS30  |\n+--------+" }],
      hint: "Count the spaces around JS30: two on each side. <code>\"-\".repeat(8)</code> saves counting.",
      solutions: [
        { name: "Three logs", code: c`console.log("+--------+");
console.log("|  JS30  |");
console.log("+--------+");`, note: "Straightforward: copy each line carefully." },
        { name: "With repeat", code: c`console.log("+" + "-".repeat(8) + "+");
console.log("|  JS30  |");
console.log("+" + "-".repeat(8) + "+");`, note: "<code>+</code> glues strings together, and <code>.repeat(8)</code> makes the 8 dashes." }] },
  ],
  quiz: [
    { q: "Which line shows the text **Hi** correctly?", o: ["`console.log(Hi);`", "`console.log(\"Hi\");`", "`Console.log(\"Hi\");`", "`console.log(\"Hi');`"], a: 1, e: "Text needs matching quotes, and `console` is written with a small c." },
    { q: "What does this show?", code: c`console.log(2 + 3);`, o: ["`2 + 3`", "`5`", "`23`"], a: 1, e: "No quotes, so it is math: 2 + 3 = 5." },
    { q: "What does this show?", code: c`console.log("2" + "3");`, o: ["`5`", "`23`", "`2 + 3`"], a: 1, e: "Both are strings, and `+` glues strings together: `\"23\"`." },
    { q: "How do you start a one-line comment in JavaScript?", o: ["`#`", "`//`", "`<!--`", "`**`"], a: 1, e: "`//` starts a comment that lasts until the end of the line. (`#` is used in Python.)" },
    { q: "What does `\\n` do inside a string?", o: ["Shows the letter n", "Starts a new line", "Adds a tab", "Ends the program"], a: 1, e: "`\\n` is the new-line character." },
    { q: "What does this show?", code: c`console.log("Day", 7 * 2);`, o: ["`Day 14`", "`Day14`", "`Day 7 * 2`", "`Day, 14`"], a: 0, e: "The comma becomes one space, and `7 * 2` is calculated." },
  ],
  puzzle: { title: "The mystery output", q: "<p>Without running it: what <b>exactly</b> does this program show? Type the output on one line.</p>", code: c`// console.log("A");
console.log("B" + "C", 1 + 1); // console.log("D");`, answers: ["BC 2"], run: true, hint: "Comments do not run. `+` glues strings but adds numbers. The comma adds one space.", e: "Line 1 is a comment. On line 2, `\"B\" + \"C\"` glues to `BC`, `1 + 1` is `2`, and the comma adds a space: `BC 2`. The second comment never runs." },
  cards: [
    { f: "How do you show something in JavaScript?", b: "`console.log(value);` — the value goes inside the parentheses." },
    { f: "Text in quotes vs no quotes?", b: "`\"3 + 4\"` is text, shown as written. `3 + 4` is math: JavaScript shows `7`." },
    { f: "How do you write a comment?", b: "`// one line` or `/* several lines */`. JavaScript ignores comments." },
    { f: "What does `console.log(\"a\", 1)` show?", b: "`a 1` — a comma becomes one space." },
    { f: "What is `\\n`?", b: "The new-line character inside a string." },
  ],
  remember: [
    "A program is a list of instructions that runs **top to bottom**.",
    "`console.log(...)` shows values. Commas separate values and add one space.",
    "Text goes in quotes (`\"...\"` or `'...'`). Without quotes, JavaScript calculates.",
    "Comments start with `//` (or `/* ... */`) and are ignored.",
    "JavaScript is **case-sensitive**: `console`, not `Console`.",
    "Errors are normal. Read the message: it tells you the line and the problem.",
  ],
};
})();
