window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[6] = {
  title: "Review + project: Smart receipt",
  intro: "Five days ago you wrote your first <code>console.log</code>, {{name}}. Today you put everything from Week 1 together: a quick recap of each day, then a real project — a shop receipt that asks questions, does the math, adds VAT and prints a neat bill.",
  goals: [
    "Recall the key idea of every Week 1 lesson and test yourself on it",
    "Plan a program before writing it: inputs → calculations → output",
    "Build the Smart receipt project step by step with `prompt()`, numbers, `toFixed(2)` and template literals",
    "Solve mixed review problems that combine several days",
  ],
  learn: [
    { t: "h", text: "Week recap — Day 1: console.log and comments" },
    { t: "p", html: "<p>A program runs <b>top to bottom</b>, one statement at a time. <code>console.log()</code> shows values; commas separate several values and add one space. Text goes in quotes; without quotes JavaScript calculates. Comments (<code>//</code> and <code>/* */</code>) are notes for humans that never run, and <code>\\n</code> starts a new line inside a string.</p>" },
    { t: "code", code: c`// Day 1 in three lines
console.log("Week", 1, "done!");
console.log("2 + 2 =", 2 + 2); // text, then math` },
    { t: "check", q: "What does this program show?", code: c`console.log("A" + "B", 3 * 2);
// console.log("C");`, o: ["`AB 6`", "`A B 6`", "`AB 6 C`", "`AB32`"], a: 0, e: "`+` glues the two strings into `AB`, `3 * 2` is 6, the comma adds one space, and the comment line never runs." },
    { t: "h", text: "Day 2: variables, let and const" },
    { t: "p", html: "<p>A <b>variable</b> is a labelled box that stores a value. Use <code>const</code> when the value never changes and <code>let</code> when it will. Names use <b>camelCase</b> (<code>totalPrice</code>), cannot start with a digit, cannot contain spaces, and are case-sensitive.</p>" },
    { t: "code", code: c`const shop = "Corner Shop";
let coins = 10;
coins = coins - 3;
console.log(shop, "- coins left:", coins);` },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`let score = 4;
score = score * 5;
console.log(score);`, answers: ["20"], run: true, e: "`score` starts at 4, then gets a new value: 4 × 5 = 20. That is why it needs `let`, not `const`.", placeholder: "type the output" },
    { t: "h", text: "Day 3: data types and typeof" },
    { t: "p", html: "<p>Every value has a <b>type</b>: <code>string</code> (text), <code>number</code>, <code>boolean</code> (<code>true</code> / <code>false</code>), <code>undefined</code> (no value yet) and <code>null</code> (empty on purpose). <code>typeof</code> tells you the type — very useful when <code>\"5\"</code> and <code>5</code> look the same in the output.</p>" },
    { t: "code", code: c`console.log(typeof "5");
console.log(typeof 5);
console.log(typeof true);
let later;
console.log(typeof later);` },
    { t: "check", q: "What does this show?", code: c`console.log(typeof "false");`, o: ["`boolean`", "`string`", "`false`", "`undefined`"], a: 1, e: "The quotes make it text. `\"false\"` is a string that happens to spell a boolean.", hint: "Look for quotes first." },
    { t: "h", text: "Day 4: numbers and operators" },
    { t: "p", html: "<p>JavaScript does <code>+ - * /</code>, <code>%</code> (the remainder), and <code>**</code> (power). <code>++</code> adds 1, <code>--</code> takes 1 away, and <code>+=</code> adds to what is already there. <code>Math.round</code>, <code>Math.floor</code> and <code>Math.ceil</code> round numbers, and <code>toFixed(2)</code> shows exactly two decimals — perfect for money.</p>" },
    { t: "code", code: c`let points = 7;
points++;
points += 10;
console.log(points, 17 % 5, 2 ** 3);
console.log((10 / 3).toFixed(2));` },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`let n = 20;
n += 5;
n--;
console.log(n % 7);`, answers: ["3"], run: true, e: "20 + 5 = 25, then `n--` makes it 24. 24 ÷ 7 is 3 with remainder 3, so `24 % 7` is 3.", hint: "Follow `n` line by line, then find the remainder.", placeholder: "type the output" },
    { t: "h", text: "Day 5: strings, template literals and prompt" },
    { t: "p", html: "<p>Strings have a <code>length</code> and indexes from 0, and methods such as <code>trim</code>, <code>toUpperCase</code>, <code>slice</code>, <code>includes</code> and <code>replace</code>. Template literals (backticks with <code>${ }</code>) build messages cleanly. <code>prompt()</code> asks the user — and <b>always returns a string</b>, so convert with <code>Number()</code> before doing math.</p>" },
    { t: "code", code: c`const name = prompt("Name?").trim();
const age = Number(prompt("Age?"));
console.log(¦#{name.toUpperCase()} will be #{age + 1} next year.¦);`, stdin: "  layla\n15" },
    { t: "check", q: "The user types `20`. What does this show?", code: c`const x = prompt("Number?");
console.log(x + 5, Number(x) + 5);`, o: ["`205 25`", "`25 25`", "`205 205`", "`NaN 25`"], a: 0, noRun: true, e: "`x` is the string `\"20\"`, so `x + 5` glues: `205`. After `Number()` it adds: `25`.", hint: "What type does `prompt()` give back?" },
    { t: "h", text: "The project: a Smart receipt" },
    { t: "p", html: "<p>Every shop in Saudi Arabia prints receipts with <b>15% VAT</b> (value added tax). Your job: a program that asks for an item, its price and the quantity, then prints a clean receipt. It uses every day of the week: <code>console.log</code>, variables, types, math with <code>toFixed(2)</code>, strings and <code>prompt()</code>. Before you write any code, a good programmer splits the job into three parts: <b>inputs</b> (what do I ask?), <b>calculations</b> (what do I work out?) and <b>output</b> (what do I show?).</p>" },
    { t: "steps", title: "Smart receipt", problem: "<p>For the answers <code>Notebook</code>, <code>12.5</code> and <code>3</code>, the program prints exactly:</p><pre class=\"code-static\">===== SMART RECEIPT =====\nItem:     Notebook\nPrice:    12.50 SAR\nQuantity: 3\n-------------------------\nSubtotal: 37.50 SAR\nVAT 15%:  5.63 SAR\nTotal:    43.13 SAR\n=========================\nThank you for shopping!</pre>",
      steps: [
        { html: "<p><b>Understand.</b> Inputs: item (text), price and quantity (numbers — but <code>prompt</code> gives strings). Calculations: subtotal = price × quantity, VAT = subtotal × 0.15, total = subtotal + VAT. Output: 10 lines, money always with two decimals, labels lined up with spaces.</p>" },
        { html: "<p><b>Inputs.</b> Read the three answers and clean them at once: trim the item name, convert the numbers. VAT never changes, so it is a <code>const</code> with a clear name.</p>", code: c`const item = prompt("Item name?").trim();
const price = Number(prompt("Price in SAR?"));
const qty = Number(prompt("Quantity?"));
const VAT_RATE = 0.15;` },
        { html: "<p><b>Calculations.</b> Keep the numbers as numbers while you calculate. Only round at the very end, when you show them.</p>", code: c`const subtotal = price * qty;
const vat = subtotal * VAT_RATE;
const total = subtotal + vat;` },
        { html: "<p><b>Output — the top.</b> Template literals keep the spaces exactly as you type them, so lining up the labels is easy. <code>toFixed(2)</code> turns 12.5 into <code>12.50</code>.</p>", code: c`console.log("===== SMART RECEIPT =====");
console.log(¦Item:     #{item}¦);
console.log(¦Price:    #{price.toFixed(2)} SAR¦);
console.log(¦Quantity: #{qty}¦);` },
        { html: "<p><b>Output — the bottom, then test.</b> <code>\"-\".repeat(25)</code> draws the line. Run with different answers in the Input box (try <code>Pen</code>, <code>2</code>, <code>4</code>: the total must be <code>9.20</code>) and compare with a calculator.</p>", code: c`console.log("-".repeat(25));
console.log(¦Subtotal: #{subtotal.toFixed(2)} SAR¦);
console.log(¦VAT 15%:  #{vat.toFixed(2)} SAR¦);
console.log(¦Total:    #{total.toFixed(2)} SAR¦);
console.log("=".repeat(25));
console.log("Thank you for shopping!");` },
      ],
      code: c`// Smart receipt — Week 1 project
// 1. Inputs
const item = prompt("Item name?").trim();
const price = Number(prompt("Price in SAR?"));
const qty = Number(prompt("Quantity?"));
const VAT_RATE = 0.15;

// 2. Calculations
const subtotal = price * qty;
const vat = subtotal * VAT_RATE;
const total = subtotal + vat;

// 3. Output
console.log("===== SMART RECEIPT =====");
console.log(¦Item:     #{item}¦);
console.log(¦Price:    #{price.toFixed(2)} SAR¦);
console.log(¦Quantity: #{qty}¦);
console.log("-".repeat(25));
console.log(¦Subtotal: #{subtotal.toFixed(2)} SAR¦);
console.log(¦VAT 15%:  #{vat.toFixed(2)} SAR¦);
console.log(¦Total:    #{total.toFixed(2)} SAR¦);
console.log("=".repeat(25));
console.log("Thank you for shopping!");`, stdin: "Notebook\n12.5\n3" },
    { t: "tip", title: "Why round only at the end?", html: "<p><code>toFixed(2)</code> gives back a <b>string</b>. If you round the subtotal first and then add, <code>+</code> glues text instead of adding. Calculate with numbers, and use <code>toFixed</code> only inside the output.</p>", code: c`const sub = (37.5).toFixed(2);
console.log(typeof sub);
console.log(sub + 5.63);` },
  ],
  practice: [
    { t: "predict", code: c`const a = "7";
const b = 3;
console.log(a + b, a * b, typeof (a * b));`, explain: "<p><code>+</code> with a string glues: <code>73</code>. <code>*</code> has no text meaning, so JavaScript converts <code>\"7\"</code> to 7 and multiplies: <code>21</code>, a <code>number</code>.</p>" },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`const price = 9.5;
console.log((price * 2).toFixed(2));`, answers: ["19.00"], run: true, e: "9.5 × 2 = 19, and `toFixed(2)` always shows two decimals: `19.00`.", placeholder: "type the output" },
    { t: "parsons", title: "Order the price program", prompt: "Put the lines in the order inputs → calculation → output.", lines: [c`const price = Number(prompt("Price?"));`, c`const withVat = price * 1.15;`, c`console.log(¦With VAT: #{withVat.toFixed(2)} SAR¦);`], distractors: [c`const price = prompt("Price?");`], explain: "Read and convert the input, then calculate, then show. The extra line forgets <code>Number()</code> — it would still work here because <code>*</code> converts, but it is a bad habit that breaks the moment you use <code>+</code>." },
    { t: "try", title: "Make the receipt yours", html: "<p>Change the shop name, the currency or the VAT rate, and add a line with the date. Change the Input box to test different items.</p>", code: c`const item = prompt("Item?");
const price = Number(prompt("Price?"));
const total = price * 1.15;
console.log("*** {{name}}'s Shop ***");
console.log(¦#{item}: #{total.toFixed(2)} SAR (VAT included)¦);`, stdin: "Football\n85" },
    { t: "predict", code: c`let stock = 12;
stock -= 5;
stock++;
console.log(¦Left: #{stock}, boxes of 3: #{Math.floor(stock / 3)}¦);`, explain: "<p>12 − 5 = 7, then <code>++</code> makes 8. 8 ÷ 3 = 2.66…, and <code>Math.floor</code> rounds down to 2.</p>" },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`const word = "receipt";
console.log(¦#{word.length}#{word[0].toUpperCase()}#{word.slice(-2)}¦);`, answers: ["7Rpt"], run: true, e: "`length` is 7, the first letter in capitals is `R`, and `slice(-2)` is the last two letters `pt`. The placeholders sit next to each other, so nothing goes between them.", placeholder: "type the output" },
  ],
  exercises: [
    { id: "receipt-1", lvl: "seed", title: "Project milestone 1: the header", prompt: "<p>Start the receipt. Ask for the item name (it may have extra spaces) and show the header and the item line. For <code>  Notebook </code>:</p><pre class=\"code-static\">===== SMART RECEIPT =====\nItem:     Notebook</pre><p>There are 5 spaces after <code>Item:</code>.</p>", starter: c`const item = prompt("Item name?");
`, tests: [{ stdin: "  Notebook ", expected: "===== SMART RECEIPT =====\nItem:     Notebook" }, { stdin: "Pen", expected: "===== SMART RECEIPT =====\nItem:     Pen" }],
      hint: "Use <code>trim()</code> on the answer, then two <code>console.log</code> lines.",
      solutions: [{ name: "Trim and template", code: c`const item = prompt("Item name?").trim();
console.log("===== SMART RECEIPT =====");
console.log(¦Item:     #{item}¦);`, note: "Clean the input once, when you read it." },
        { name: "Two values", code: c`const item = prompt("Item name?");
console.log("===== SMART RECEIPT =====");
console.log("Item:    ", item.trim());`, note: "The label has 4 spaces, and the comma adds the fifth." }] },
    { id: "temp", lvl: "seed", title: "Riyadh weather converter", prompt: "<p>Ask for a temperature in Celsius and show it in Fahrenheit (F = C × 9 / 5 + 32). For <code>40</code>:</p><pre class=\"code-static\">40°C = 104°F</pre>", tests: [{ stdin: "40", expected: "40°C = 104°F" }, { stdin: "0", expected: "0°C = 32°F" }, { stdin: "25", expected: "25°C = 77°F" }],
      hint: "Convert the answer with <code>Number()</code>, calculate, then print with a template literal. Copy the ° sign from the example.",
      solutions: [{ name: "Template literal", code: c`const c = Number(prompt("Celsius?"));
const f = c * 9 / 5 + 32;
console.log(¦#{c}°C = #{f}°F¦);`, note: "Multiplication and division happen before the addition, so no parentheses are needed." }] },
    { id: "receipt-2", lvl: "star", title: "Project milestone 2: price and subtotal", prompt: "<p>Ask for the item, the price and the quantity. Show these lines (money with two decimals). For <code>Notebook</code>, <code>12.5</code>, <code>3</code>:</p><pre class=\"code-static\">Item:     Notebook\nPrice:    12.50 SAR\nQuantity: 3\nSubtotal: 37.50 SAR</pre>", tests: [{ stdin: "Notebook\n12.5\n3", expected: "Item:     Notebook\nPrice:    12.50 SAR\nQuantity: 3\nSubtotal: 37.50 SAR" }, { stdin: "Pen\n2\n4", expected: "Item:     Pen\nPrice:    2.00 SAR\nQuantity: 4\nSubtotal: 8.00 SAR" }],
      hint: "Convert price and quantity with <code>Number()</code>. Subtotal = price × quantity. Use <code>toFixed(2)</code> only when printing.",
      solutions: [{ name: "Inputs, math, output", code: c`const item = prompt("Item name?").trim();
const price = Number(prompt("Price?"));
const qty = Number(prompt("Quantity?"));
const subtotal = price * qty;
console.log(¦Item:     #{item}¦);
console.log(¦Price:    #{price.toFixed(2)} SAR¦);
console.log(¦Quantity: #{qty}¦);
console.log(¦Subtotal: #{subtotal.toFixed(2)} SAR¦);`, note: "Three clear parts: read, calculate, show." },
        { name: "One multi-line template", code: c`const item = prompt("Item name?").trim();
const price = Number(prompt("Price?"));
const qty = Number(prompt("Quantity?"));
console.log(¦Item:     #{item}
Price:    #{price.toFixed(2)} SAR
Quantity: #{qty}
Subtotal: #{(price * qty).toFixed(2)} SAR¦);`, note: "A template literal can span lines; the calculation goes right inside <code>${ }</code> (with parentheses before <code>.toFixed</code>)." }] },
    { id: "time-split", lvl: "star", title: "Minutes to hours", prompt: "<p>Your phone says how many minutes you studied this week. Ask for the minutes and show them as hours and minutes. For <code>135</code>:</p><pre class=\"code-static\">135 minutes = 2 h 15 min</pre>", tests: [{ stdin: "135", expected: "135 minutes = 2 h 15 min" }, { stdin: "60", expected: "60 minutes = 1 h 0 min" }, { stdin: "47", expected: "47 minutes = 0 h 47 min" }],
      hint: "Whole hours: <code>Math.floor(minutes / 60)</code>. What is left: <code>minutes % 60</code>.",
      solutions: [{ name: "floor and %", code: c`const minutes = Number(prompt("Minutes?"));
const h = Math.floor(minutes / 60);
const m = minutes % 60;
console.log(¦#{minutes} minutes = #{h} h #{m} min¦);`, note: "<code>%</code> gives the remainder of the division: exactly the minutes that do not fill a whole hour." },
        { name: "Subtract the hours", code: c`const minutes = Number(prompt("Minutes?"));
const h = Math.floor(minutes / 60);
const m = minutes - h * 60;
console.log(¦#{minutes} minutes = #{h} h #{m} min¦);`, note: "Same answer without <code>%</code>: take away the minutes used by the whole hours." }] },
    { id: "receipt-3", lvl: "star", title: "Project milestone 3: the full receipt", prompt: "<p>Finish the project: print the whole receipt with 15% VAT, exactly like the worked example. For <code>Notebook</code>, <code>12.5</code>, <code>3</code>:</p><pre class=\"code-static\">===== SMART RECEIPT =====\nItem:     Notebook\nPrice:    12.50 SAR\nQuantity: 3\n-------------------------\nSubtotal: 37.50 SAR\nVAT 15%:  5.63 SAR\nTotal:    43.13 SAR\n=========================\nThank you for shopping!</pre><p>The lines of <code>-</code> and <code>=</code> are 25 characters long.</p>",
      tests: [{ stdin: "Notebook\n12.5\n3", expected: "===== SMART RECEIPT =====\nItem:     Notebook\nPrice:    12.50 SAR\nQuantity: 3\n-------------------------\nSubtotal: 37.50 SAR\nVAT 15%:  5.63 SAR\nTotal:    43.13 SAR\n=========================\nThank you for shopping!" },
        { stdin: "Pen\n2\n4", expected: "===== SMART RECEIPT =====\nItem:     Pen\nPrice:    2.00 SAR\nQuantity: 4\n-------------------------\nSubtotal: 8.00 SAR\nVAT 15%:  1.20 SAR\nTotal:    9.20 SAR\n=========================\nThank you for shopping!" },
        { stdin: "Headphones\n149.99\n1", expected: "===== SMART RECEIPT =====\nItem:     Headphones\nPrice:    149.99 SAR\nQuantity: 1\n-------------------------\nSubtotal: 149.99 SAR\nVAT 15%:  22.50 SAR\nTotal:    172.49 SAR\n=========================\nThank you for shopping!" }],
      hint: "VAT = subtotal × 0.15 and total = subtotal + VAT. Keep them as numbers and use <code>toFixed(2)</code> only in the output. <code>\"-\".repeat(25)</code> draws the line.",
      solutions: [{ name: "Inputs → math → output", code: c`const item = prompt("Item name?").trim();
const price = Number(prompt("Price?"));
const qty = Number(prompt("Quantity?"));
const VAT_RATE = 0.15;

const subtotal = price * qty;
const vat = subtotal * VAT_RATE;
const total = subtotal + vat;

console.log("===== SMART RECEIPT =====");
console.log(¦Item:     #{item}¦);
console.log(¦Price:    #{price.toFixed(2)} SAR¦);
console.log(¦Quantity: #{qty}¦);
console.log("-".repeat(25));
console.log(¦Subtotal: #{subtotal.toFixed(2)} SAR¦);
console.log(¦VAT 15%:  #{vat.toFixed(2)} SAR¦);
console.log(¦Total:    #{total.toFixed(2)} SAR¦);
console.log("=".repeat(25));
console.log("Thank you for shopping!");`, note: "Three parts with a blank line between them. A named constant <code>VAT_RATE</code> makes the code easy to change if the rate changes." },
        { name: "Total with 1.15", code: c`const item = prompt("Item name?").trim();
const price = Number(prompt("Price?"));
const qty = Number(prompt("Quantity?"));
const subtotal = price * qty;
const total = subtotal * 1.15;
const vat = total - subtotal;
const line = "-".repeat(25);
console.log(¦===== SMART RECEIPT =====
Item:     #{item}
Price:    #{price.toFixed(2)} SAR
Quantity: #{qty}
#{line}
Subtotal: #{subtotal.toFixed(2)} SAR
VAT 15%:  #{vat.toFixed(2)} SAR
Total:    #{total.toFixed(2)} SAR
#{"=".repeat(25)}
Thank you for shopping!¦);`, note: "Multiplying by 1.15 adds 15% in one step; the VAT is the difference. One multi-line template prints everything." }],
      twist: "Add a line <code>You saved: ...</code> for a 10% student discount on the total." },
    { id: "receipt-fix", lvl: "fire", debug: true, title: "Fix the cashier's code", prompt: "<p>A cashier wrote this receipt, but it has <b>three</b> bugs. With price <code>12.5</code> and quantity <code>3</code> it must show:</p><pre class=\"code-static\">Subtotal: 37.50 SAR\nVAT: 5.63 SAR\nTotal: 43.13 SAR</pre><p>Run it, read the error, fix one bug at a time.</p>",
      starter: c`const price = Number(prompt("Price?"));
const qty = Number(prompt("Quantity?"));
const subtotal = price * qty;
const vat = subtotal * 15;
const total = subtotal + vat;
console.log("Subtotal: #{subtotal.toFixed(2)} SAR");
console.log(¦VAT: #{vat.toFixed(2)} SAR¦);
console.log(¦Total: #{total.tofixed(2)} SAR¦);`,
      tests: [{ stdin: "12.5\n3", expected: "Subtotal: 37.50 SAR\nVAT: 5.63 SAR\nTotal: 43.13 SAR" }, { stdin: "2\n4", expected: "Subtotal: 8.00 SAR\nVAT: 1.20 SAR\nTotal: 9.20 SAR" }],
      hint: "Look for: a method name with the wrong capital letter, a string that should use backticks, and a percentage written as a whole number (15% = 0.15).",
      solutions: [{ name: "Fixed", code: c`const price = Number(prompt("Price?"));
const qty = Number(prompt("Quantity?"));
const subtotal = price * qty;
const vat = subtotal * 0.15;
const total = subtotal + vat;
console.log(¦Subtotal: #{subtotal.toFixed(2)} SAR¦);
console.log(¦VAT: #{vat.toFixed(2)} SAR¦);
console.log(¦Total: #{total.toFixed(2)} SAR¦);`, note: "Bug 1: <code>tofixed</code> → <code>toFixed</code> (case-sensitive). Bug 2: <code>${}</code> needs backticks, not quotes. Bug 3: 15% is <code>0.15</code>; <code>* 15</code> made the VAT 15 times the price!" }] },
    { id: "split-bill", lvl: "fire", title: "Split the restaurant bill", prompt: "<p>You and your friends eat out. Ask for the bill and the number of friends. Add a 10% tip, then show the bill with tip, the exact share, and the share rounded <b>up</b> to a whole riyal (so nobody pays too little). For <code>150</code> and <code>4</code>:</p><pre class=\"code-static\">Bill with tip: 165.00 SAR\nEach pays: 41.25 SAR\nRounded up: 42 SAR</pre>",
      tests: [{ stdin: "150\n4", expected: "Bill with tip: 165.00 SAR\nEach pays: 41.25 SAR\nRounded up: 42 SAR" }, { stdin: "80\n3", expected: "Bill with tip: 88.00 SAR\nEach pays: 29.33 SAR\nRounded up: 30 SAR" }, { stdin: "200\n6", expected: "Bill with tip: 220.00 SAR\nEach pays: 36.67 SAR\nRounded up: 37 SAR" }],
      hint: "Bill with tip = bill × 1.1. Share = that ÷ friends. <code>Math.ceil()</code> rounds up.",
      solutions: [{ name: "Step by step", code: c`const bill = Number(prompt("Bill?"));
const friends = Number(prompt("Friends?"));
const withTip = bill * 1.1;
const share = withTip / friends;
console.log(¦Bill with tip: #{withTip.toFixed(2)} SAR¦);
console.log(¦Each pays: #{share.toFixed(2)} SAR¦);
console.log(¦Rounded up: #{Math.ceil(share)} SAR¦);`, note: "<code>Math.ceil</code> always goes up, even 33.0001 → 34, so the group never comes up short." },
        { name: "Tip as its own value", code: c`const bill = Number(prompt("Bill?"));
const friends = Number(prompt("Friends?"));
const tip = bill * 0.1;
const share = (bill + tip) / friends;
console.log("Bill with tip:", (bill + tip).toFixed(2), "SAR");
console.log("Each pays:", share.toFixed(2), "SAR");
console.log("Rounded up:", Math.ceil(share), "SAR");`, note: "Calculating the tip separately makes it easy to show it on its own line later." }],
      twist: "Show how much change the group gets back if everyone pays the rounded-up amount." },
  ],
  quiz: [
    { q: "Which keyword do you use for a value that will change later?", o: ["`const`", "`let`", "`typeof`", "`change`"], a: 1, e: "`let` makes a variable you can update. `const` cannot be given a new value." },
    { q: "What does this show?", code: c`console.log(typeof 3.5, typeof "3.5");`, o: ["`number string`", "`number number`", "`string string`", "`float string`"], a: 0, e: "All numbers, with or without decimals, have the type `number`. In quotes it is a `string`." },
    { q: "What does this show?", code: c`let lives = 3;
lives--;
lives += 2;
console.log(lives);`, o: ["`4`", "`5`", "`2`", "`6`"], a: 0, e: "3 − 1 = 2, then 2 + 2 = 4." },
    { q: "What does this show?", code: c`console.log((7.456).toFixed(1));`, o: ["`7.4`", "`7.5`", "`7.46`", "`7`"], a: 1, e: "`toFixed(1)` keeps one decimal and rounds: 7.456 → 7.5." },
    { q: "What does this show?", code: c`const city = "Dammam";
console.log(¦#{city.length} #{city.slice(0, 3)}¦);`, o: ["`6 Dam`", "`6 Damm`", "`5 Dam`", "`${city.length} ${city.slice(0, 3)}`"], a: 0, e: "Dammam has 6 letters, and `slice(0, 3)` takes indexes 0–2: `Dam`." },
    { q: "In the Smart receipt, why do we write `Number(prompt(\"Price?\"))`?", o: ["Because `prompt()` returns a string, and we need a number for math", "Because `prompt()` only works with `Number`", "To round the price", "To make the price an integer"], a: 0, e: "`prompt()` always returns text. `Number()` converts it so `+` adds instead of gluing." },
  ],
  puzzle: { title: "The mystery bill", q: "<p>Without running it: what <b>exactly</b> does this program show?</p>", code: c`let total = 10;
total *= 3;
total++;
const text = String(total);
console.log(¦#{text + 1} #{total + 1} #{text.length}¦);`, answers: ["311 32 2"], run: true, hint: "Follow `total`: 10, then ×3, then +1. `text` is a string version. String + 1 glues; number + 1 adds.", e: "`total` becomes 30, then 31. `text` is `\"31\"`, so `text + 1` glues to `311`, `total + 1` adds to `32`, and `\"31\"` has 2 characters." },
  cards: [
    { f: "Three parts of planning a program?", b: "**Inputs** (what to ask), **calculations** (what to work out), **output** (what to show)." },
    { f: "How do you add 15% VAT to `price`?", b: "`price * 0.15` is the VAT; `price * 1.15` is the price with VAT." },
    { f: "What type does `toFixed(2)` return?", b: "A **string** — so use it only for showing, not for more math." },
    { f: "`let` or `const`?", b: "`const` for values that never change (like `VAT_RATE`), `let` for values that will." },
    { f: "Whole hours and leftover minutes from `m` minutes?", b: "`Math.floor(m / 60)` hours and `m % 60` minutes." },
  ],
  remember: [
    "Plan first: **inputs → calculations → output**.",
    "Convert `prompt()` answers with `Number()` as soon as you read them.",
    "Calculate with numbers; use `toFixed(2)` only when you show money.",
    "Use `const` for fixed values with clear names, like `VAT_RATE`.",
    "Template literals keep spaces and line breaks exactly as you type them — great for neat output.",
    "Test with several inputs and compare with a calculator.",
  ],
};
})();
