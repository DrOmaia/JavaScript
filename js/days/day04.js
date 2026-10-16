window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[4] = {
  title: "Numbers and operators, ++ and --",
  intro: "Today JavaScript becomes your calculator, {{name}} — a calculator that remembers. You will work out averages, split bills, find remainders, count with <code>++</code>, round prices, and meet a few strange numbers that surprise every programmer the first time.",
  goals: [
    "Use the operators `+ - * / % **` and control the order with parentheses",
    "Use `%` to find remainders and to tell even from odd",
    "Change a variable quickly with `++`, `--`, `+=`, `-=`, `*=`, `/=`",
    "Round and compare numbers with `Math` and `toFixed()`",
    "Recognise `NaN`, `Infinity` and the `0.1 + 0.2` surprise",
  ],
  learn: [
    { t: "h", text: "The arithmetic operators" },
    { t: "p", html: "<p>Programs calculate all the time: the total of a basket, the average of your marks, how many minutes until the bell. The symbols that do the work are called <b>operators</b>. You already know four of them from Day 1; here are all six.</p>" },
    { t: "table", head: ["Operator", "Meaning", "Example", "Result"], rows: [
      ["`+`", "add", "`7 + 2`", "`9`"],
      ["`-`", "subtract", "`7 - 2`", "`5`"],
      ["`*`", "multiply", "`7 * 2`", "`14`"],
      ["`/`", "divide", "`7 / 2`", "`3.5`"],
      ["`%`", "remainder", "`7 % 2`", "`1`"],
      ["`**`", "power", "`7 ** 2`", "`49`"],
    ] },
    { t: "code", code: c`let width = 4;
let height = 3;
console.log("Area:", width * height);
console.log("Square of width:", width ** 2);
console.log("Half the height:", height / 2);` },
    { t: "h", text: "Order of operations" },
    { t: "p", html: "<p>Your marks are 18, 16 and 20, and you want the average. If you write <code>18 + 16 + 20 / 3</code>, the answer is wrong, because JavaScript follows the same rules as your math teacher: <code>**</code> first, then <code>*</code> <code>/</code> <code>%</code>, then <code>+</code> <code>-</code>. <b>Parentheses</b> come before everything, so use them to say what you mean.</p>" },
    { t: "code", code: c`console.log(18 + 16 + 20 / 3);
console.log((18 + 16 + 20) / 3);`, note: "<p>The first line divides only 20 by 3, then adds: about 40.67 — an impossible average. The second line adds first, because of the parentheses, then divides: 18.</p>" },
    { t: "check", q: "What does this show?", code: c`console.log(2 + 3 * 4);`, o: ["`14`", "`20`", "`24`", "`9`"], a: 0, e: "Multiplication comes before addition: `3 * 4` is 12, then `2 + 12` is 14. Write `(2 + 3) * 4` to get 20.", hint: "Which operator does JavaScript do first, `+` or `*`?" },
    { t: "h", text: "% gives the remainder" },
    { t: "analogy", title: "Sharing sweets", html: "<p>You have 17 sweets and 5 friends. Each friend gets 3 sweets (15 in total) and <b>2 are left over</b>. Those 2 are the remainder, and that is exactly what <code>17 % 5</code> gives. The <code>%</code> sign here has nothing to do with percent — read it as \"remainder after dividing by\".</p>" },
    { t: "code", code: c`console.log(17 % 5);
console.log(10 % 2);
console.log(11 % 2);
console.log(125 % 60);` },
    { t: "p", html: "<p>The most common use: a number is <b>even</b> when <code>number % 2</code> is 0, and <b>odd</b> when it is 1. It is also useful for time: 125 minutes is 2 hours and <code>125 % 60</code> = 5 minutes.</p>" },
    { t: "turn", level: "Easy", q: "What does this line show?", code: c`console.log(23 % 4);`, answers: ["3"], run: true, e: "4 goes into 23 five times (20), and 23 − 20 leaves 3.", hint: "How many are left after making as many groups of 4 as possible?", placeholder: "type the output" },
    { t: "h", text: "Shortcuts: += -= *= /=" },
    { t: "p", html: "<p>Yesterday you wrote <code>money = money - 12;</code>. Changing a variable using its own value is so common that JavaScript has shortcuts. <code>money -= 12;</code> means exactly the same thing, with less typing and less chance of a typo in the name.</p>" },
    { t: "table", head: ["Shortcut", "Same as"], rows: [["`x += 5`", "`x = x + 5`"], ["`x -= 5`", "`x = x - 5`"], ["`x *= 5`", "`x = x * 5`"], ["`x /= 5`", "`x = x / 5`"], ["`x %= 5`", "`x = x % 5`"]] },
    { t: "code", code: c`let points = 10;
points += 5;
console.log(points);
points *= 2;
console.log(points);
points -= 7;
console.log(points);` },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`let points = 10;`, "Create the box and put 10 in it."],
      [c`points += 5;`, "Take the value (10), add 5, put 15 back into <code>points</code>."],
      [c`points *= 2;`, "Take 15, multiply by 2, store 30."],
      [c`points -= 7;`, "Take 30, subtract 7, store 23."],
    ] },
    { t: "turn", level: "Medium", q: "What does this program show?", code: c`let level = 4;
level *= 3;
level -= 2;
console.log(level);`, answers: ["10"], run: true, e: "4 × 3 = 12, then 12 − 2 = 10.", hint: "Do the lines one by one and keep track of `level`.", placeholder: "type the output" },
    { t: "h", text: "++ and --: up one, down one" },
    { t: "p", html: "<p>Counting by one is everywhere: a goal is scored, a life is lost, a day passes. <code>goals++</code> adds 1 to <code>goals</code> and <code>lives--</code> takes 1 away. They are short for <code>+= 1</code> and <code>-= 1</code>. On a line of their own, that is all you need to know.</p>" },
    { t: "code", code: c`let goals = 0;
goals++;
goals++;
console.log("Goals:", goals);
let lives = 3;
lives--;
console.log("Lives:", lives);` },
    { t: "analogy", title: "Before or after the bell", html: "<p>The <code>++</code> can go after the name (<code>x++</code>, <b>postfix</b>) or before it (<code>++x</code>, <b>prefix</b>). The difference only shows when you <b>use the value in the same line</b>. Postfix is \"tell, then grow\": it gives you the old value, then adds 1. Prefix is \"grow, then tell\": it adds 1 first and gives you the new value. Like asking a friend their age just before or just after the birthday party.</p>" },
    { t: "viz", code: c`let a = 5;
let oldValue = a++;
console.log(oldValue, a);
let b = 5;
let newValue = ++b;
console.log(newValue, b);`, before: "<p>Press <b>Visualize</b> and step through. On line 2, <code>oldValue</code> gets 5 and then <code>a</code> grows to 6. On line 5, <code>b</code> grows to 6 first, and <code>newValue</code> gets 6.</p>" },
    { t: "check", q: "What does this program show?", code: c`let n = 9;
console.log(n++);
console.log(n);`, o: ["`9` then `10`", "`10` then `10`", "`9` then `9`", "`10` then `11`"], a: 0, e: "`n++` is postfix: it gives the old value (9) to `console.log`, then `n` becomes 10. The second line shows 10.", hint: "Postfix: tell, then grow." },
    { t: "p", html: "<p>Good habit: put <code>++</code> and <code>--</code> on a line of their own. Then prefix and postfix do the same thing and nobody has to think about the difference.</p>" },
    { t: "h", text: "The Math toolbox" },
    { t: "p", html: "<p>JavaScript has a built-in toolbox called <code>Math</code> (capital M) for jobs like rounding a price, finding the highest mark or a square root.</p>" },
    { t: "table", head: ["Tool", "What it does", "Example → result"], rows: [
      ["`Math.round(x)`", "nearest whole number", "`Math.round(4.5)` → `5`"],
      ["`Math.floor(x)`", "always down", "`Math.floor(4.9)` → `4`"],
      ["`Math.ceil(x)`", "always up", "`Math.ceil(4.1)` → `5`"],
      ["`Math.max(a, b, ...)`", "the biggest", "`Math.max(3, 9, 5)` → `9`"],
      ["`Math.min(a, b, ...)`", "the smallest", "`Math.min(3, 9, 5)` → `3`"],
      ["`Math.abs(x)`", "drop the minus sign", "`Math.abs(-8)` → `8`"],
      ["`Math.sqrt(x)`", "square root", "`Math.sqrt(81)` → `9`"],
    ] },
    { t: "code", code: c`let buses = 130 / 50;
console.log(buses);
console.log("Buses needed:", Math.ceil(buses));
console.log("Best mark:", Math.max(78, 92, 85));`, note: "<p>130 students and buses with 50 seats: 2.6 buses. You cannot book 0.6 of a bus, and rounding down would leave students behind, so <code>Math.ceil</code> rounds <b>up</b> to 3.</p>" },
    { t: "check", q: "What does this show?", code: c`console.log(Math.floor(7.99));`, o: ["`7`", "`8`", "`7.9`", "`7.99`"], a: 0, e: "`Math.floor` always rounds **down**, no matter how close the next number is.", hint: "Floor = the floor of a room: always down." },
    { t: "h", text: "toFixed: a fixed number of decimals" },
    { t: "code", code: c`let price = 12.5;
console.log(price.toFixed(2));
console.log(typeof price.toFixed(2));`, note: "<p><code>toFixed(2)</code> shows a number with exactly 2 decimals — perfect for money. But be careful: the result is a <b>string</b>, made for showing, not for more math.</p>" },
    { t: "h", text: "Strange numbers: NaN, Infinity and 0.1 + 0.2" },
    { t: "code", code: c`console.log("hello" * 2);
console.log(typeof NaN);
console.log(10 / 0);
console.log(0.1 + 0.2);`, note: "<p><code>NaN</code> means <b>Not a Number</b>: the result of math that makes no sense, like multiplying a word. Funnily, its type is still <code>number</code>. Dividing by zero gives <code>Infinity</code>. And <code>0.1 + 0.2</code> is not exactly 0.3, because computers store decimals in binary and a few tiny pieces get lost — it happens in almost every language. When you show such results, use <code>toFixed</code>.</p>" },
    { t: "tip", title: "Warning: + with a string", html: "<p><code>\"5\" + 2</code> gives <code>52</code> (the <code>+</code> glues, as you saw on Day 3), but <code>\"5\" - 2</code> gives <code>3</code>, because <code>-</code> only works with numbers, so JavaScript turns the text into a number. Confusing! Day 5 shows how to convert values properly. For now: keep numbers without quotes.</p>", code: c`console.log("5" + 2);
console.log("5" - 2);` },
    { t: "steps", title: "Splitting the restaurant bill", problem: "<p>You and 3 friends eat together and the bill is 187 riyals. Each person pays the same whole number of riyals, enough to cover the bill. Show:</p><pre class=\"code-static\">Exact share: 46.75\nEach pays: 47\nExtra for the tip: 1</pre>",
      steps: [
        { html: "<p><b>Understand.</b> 4 people share 187. The exact share has decimals, so we round it — but <b>up</b>, or the bill will not be covered. The extra money is what is paid minus the bill.</p>" },
        { html: "<p><b>Store the facts.</b> They do not change, so use <code>const</code>.</p>", code: c`const bill = 187;
const people = 4;` },
        { html: "<p><b>Exact share.</b> Divide and show it with 2 decimals.</p>", code: c`const share = bill / people;
console.log("Exact share:", share.toFixed(2));` },
        { html: "<p><b>Round up.</b> <code>Math.ceil</code> always rounds up, so 46.75 becomes 47.</p>", code: c`const eachPays = Math.ceil(share);
console.log("Each pays:", eachPays);` },
        { html: "<p><b>The extra.</b> Everyone pays 47, so the group pays <code>eachPays * people</code>. Subtract the bill. Check: 47 × 4 = 188, and 188 − 187 = 1.</p>", code: c`const extra = eachPays * people - bill;
console.log("Extra for the tip:", extra);` },
      ],
      code: c`// Split the bill fairly
const bill = 187;
const people = 4;
const share = bill / people;
console.log("Exact share:", share.toFixed(2));
const eachPays = Math.ceil(share);
console.log("Each pays:", eachPays);
const extra = eachPays * people - bill;
console.log("Extra for the tip:", extra);` },
  ],
  mistakes: [
    { title: "Forgetting parentheses in an average", html: "Division happens before addition, so only the last mark is divided. Put the sum in parentheses.", wrong: c`let average = 15 + 17 + 19 / 3;`, right: c`let average = (15 + 17 + 19) / 3;` },
    { title: "Doing math with the result of toFixed", html: "<code>toFixed</code> gives a string, so <code>+</code> glues instead of adding. Do all the math first and use <code>toFixed</code> only at the end, to show the result.", wrong: c`let price = (9.5).toFixed(2);
console.log(price + 1);`, right: c`let price = 9.5 + 1;
console.log(price.toFixed(2));` },
    { title: "=+ instead of +=", html: "<code>x =+ 5</code> means \"x = +5\": it puts 5 into x and forgets the old value. The operator is <code>+=</code>, with the <code>+</code> first.", wrong: c`let score = 10;
score =+ 5;`, right: c`let score = 10;
score += 5;` },
    { title: "math with a small m", html: "The toolbox is called <code>Math</code> with a capital M. <code>math.round</code> gives <code>ReferenceError: math is not defined</code>.", wrong: c`console.log(math.round(4.6));`, right: c`console.log(Math.round(4.6));` },
  ],
  tricks: [
    { title: "Round to 2 decimals and keep a number", html: "Multiply by 100, round, divide by 100. Unlike <code>toFixed</code>, the result is still a number you can calculate with.", code: c`let average = 85.6666;
let rounded = Math.round(average * 100) / 100;
console.log(rounded, typeof rounded);` },
    { title: "Underscores in big numbers", html: "You may write <code>_</code> between digits to make big numbers readable. JavaScript ignores them.", code: c`const population = 7_000_000;
console.log(population);` },
    { title: "Last digit with % 10", html: "<code>n % 10</code> gives the last digit of a whole number, and <code>Math.floor(n / 10)</code> removes it. Useful for number puzzles.", code: c`let year = 2026;
console.log(year % 10);
console.log(Math.floor(year / 10));` },
  ],
  practice: [
    { t: "try", title: "Make it yours", html: "<p>Put in your own marks (out of 100) and run. Then add a fourth subject and fix the average so it divides by 4.</p>", code: c`const mathMark = 88;
const science = 93;
const english = 79;
const average = (mathMark + science + english) / 3;
console.log("Average:", average.toFixed(1));
console.log("Best:", Math.max(mathMark, science, english));
console.log("Lowest:", Math.min(mathMark, science, english));` },
    { t: "predict", code: c`console.log(10 - 2 * 3);
console.log((10 - 2) * 3);
console.log(2 ** 3 + 1);`, explain: "<p><code>*</code> comes before <code>-</code>: 10 − 6 = <b>4</b>. Parentheses first: 8 × 3 = <b>24</b>. Power first: 8 + 1 = <b>9</b>.</p>" },
    { t: "turn", level: "Easy", q: "What does this program show?", code: c`let steps = 100;
steps++;
steps += 9;
console.log(steps);`, answers: ["110"], run: true, e: "100 + 1 = 101, then 101 + 9 = 110.", placeholder: "type the output" },
    { t: "parsons", title: "Hours and minutes", prompt: "Put the lines in order so 200 minutes is shown as <code>3 hours 20 minutes</code>.", lines: [c`const total = 200;`, c`const hours = Math.floor(total / 60);`, c`const minutes = total % 60;`, c`console.log(hours, "hours", minutes, "minutes");`], distractors: [c`const hours = total / 60;`], explain: "<code>Math.floor(total / 60)</code> gives the whole hours (3) and <code>total % 60</code> the minutes left over (20). Without <code>Math.floor</code> you would get 3.3333333333333335 hours." },
    { t: "predict", code: c`let x = 5;
let y = x--;
console.log(x, y);`, explain: "<p>Postfix: \"tell, then shrink\". <code>y</code> gets the old value <b>5</b>, then <code>x</code> becomes <b>4</b>. Output: <code>4 5</code>.</p>" },
    { t: "turn", level: "Medium", q: "Is 2027 even or odd? Run this in your head: what does it show?", code: c`console.log(2027 % 2);`, answers: ["1"], run: true, e: "The remainder after dividing by 2 is 1, so 2027 is odd.", placeholder: "type the output", oneWord: true },
    { t: "try", title: "Calculator playground", html: "<p>Try the strange cases yourself: change the numbers, divide by zero, multiply a word, add other decimals like <code>0.1 + 0.7</code>. Which results surprise you?</p>", code: c`console.log(0.1 + 0.2);
console.log((0.1 + 0.2).toFixed(2));
console.log(1 / 0);
console.log("abc" * 3);
console.log(Math.sqrt(144));
console.log(Math.abs(-15));` },
  ],
  exercises: [
    { id: "avg-marks", lvl: "seed", title: "Average of three marks", prompt: "<p>Create <code>mark1 = 87</code>, <code>mark2 = 92</code>, <code>mark3 = 78</code> and a variable <code>average</code> that holds their average. Show it with 2 decimals:</p><pre class=\"code-static\">Average: 85.67</pre>", tests: [{ expected: "Average: 85.67" }, { after: c`console.log(Math.round(average));`, expected: "86" }],
      hint: "Parentheses around the sum! Then <code>average.toFixed(2)</code> inside <code>console.log</code>.",
      solutions: [{ name: "Parentheses", code: c`const mark1 = 87;
const mark2 = 92;
const mark3 = 78;
const average = (mark1 + mark2 + mark3) / 3;
console.log("Average:", average.toFixed(2));`, note: "Keep <code>average</code> as a number and use <code>toFixed</code> only when you show it." }, { name: "With a total", code: c`const mark1 = 87;
const mark2 = 92;
const mark3 = 78;
const total = mark1 + mark2 + mark3;
const average = total / 3;
console.log("Average:", average.toFixed(2));`, note: "A separate <code>total</code> variable means no parentheses are needed." }] },
    { id: "share-sweets", lvl: "seed", title: "Share the sweets", prompt: "<p>There are 23 sweets and 5 friends. Store the number each friend gets in <code>each</code> and the number left over in <code>left</code>. Show:</p><pre class=\"code-static\">Each gets: 4\nLeft over: 3</pre>", tests: [{ expected: "Each gets: 4\nLeft over: 3" }, { after: c`console.log(each, left);`, expected: "4 3" }],
      hint: "<code>Math.floor(sweets / friends)</code> for the share and <code>sweets % friends</code> for the remainder.",
      solutions: [{ name: "floor and %", code: c`const sweets = 23;
const friends = 5;
const each = Math.floor(sweets / friends);
const left = sweets % friends;
console.log("Each gets:", each);
console.log("Left over:", left);`, note: "<code>Math.floor</code> drops the decimals of 4.6, and <code>%</code> gives what remains." }, { name: "Using the share", code: c`const sweets = 23;
const friends = 5;
const each = Math.floor(sweets / friends);
const left = sweets - each * friends;
console.log("Each gets:", each);
console.log("Left over:", left);`, note: "Another way to get the remainder: everything minus what was given out." }] },
    { id: "likes-counter", lvl: "star", title: "Likes on a post", prompt: "<p>Start with <code>let likes = 10;</code>. Apply these changes in order and show <code>likes</code> after <b>each</b> one: two new likes with <code>++</code> (one at a time), <code>+= 5</code>, <code>*= 2</code> (the post went viral), <code>-= 4</code>, and one <code>--</code>. Output:</p><pre class=\"code-static\">11\n12\n17\n34\n30\n29</pre>", tests: [{ expected: "11\n12\n17\n34\n30\n29" }, { after: c`console.log(likes);`, expected: "29" }],
      hint: "Put each change on its own line, followed by <code>console.log(likes);</code>.",
      solutions: [{ name: "One change per line", code: c`let likes = 10;
likes++;
console.log(likes);
likes++;
console.log(likes);
likes += 5;
console.log(likes);
likes *= 2;
console.log(likes);
likes -= 4;
console.log(likes);
likes--;
console.log(likes);`, note: "Each shortcut reads the current value, changes it, and stores it back." }, { name: "Prefix inside log", code: c`let likes = 10;
console.log(++likes);
console.log(++likes);
likes += 5;
console.log(likes);
likes *= 2;
console.log(likes);
likes -= 4;
console.log(likes);
console.log(--likes);`, note: "Prefix (<code>++likes</code>) grows first, then gives the new value — so it can go straight into <code>console.log</code>. Postfix would show the old value." }] },
    { id: "movie-time", lvl: "star", title: "How long is the movie?", prompt: "<p>A movie lasts 135 minutes. Store <code>const totalMinutes = 135;</code>, then calculate <code>hours</code> and <code>minutes</code> and show:</p><pre class=\"code-static\">2 hours and 15 minutes</pre>", tests: [{ expected: "2 hours and 15 minutes" }, { after: c`console.log(hours, minutes);`, expected: "2 15" }],
      hint: "There are 60 minutes in an hour. Whole hours: <code>Math.floor(totalMinutes / 60)</code>. Minutes left: <code>totalMinutes % 60</code>.",
      solutions: [{ name: "floor and %", code: c`const totalMinutes = 135;
const hours = Math.floor(totalMinutes / 60);
const minutes = totalMinutes % 60;
console.log(hours, "hours and", minutes, "minutes");`, note: "135 / 60 = 2.25, rounded down: 2 hours. 135 % 60 = 15 minutes left." }],
      twist: "Change the movie to 98 minutes. Does your program still give the right answer without other changes?" },
    { id: "screen-diagonal", lvl: "star", title: "Phone screen diagonal", prompt: "<p>A phone screen is 5 cm wide and 9 cm tall. The diagonal is the square root of <code>width² + height²</code>. Store it in a variable called <code>diagonal</code> and show it with 1 decimal:</p><pre class=\"code-static\">Diagonal: 10.3 cm</pre>", tests: [{ expected: "Diagonal: 10.3 cm" }, { after: c`console.log(diagonal.toFixed(2));`, expected: "10.30" }],
      hint: "<code>Math.sqrt(width ** 2 + height ** 2)</code>, then <code>diagonal.toFixed(1)</code> when you show it.",
      solutions: [{ name: "Power and sqrt", code: c`const width = 5;
const height = 9;
const diagonal = Math.sqrt(width ** 2 + height ** 2);
console.log("Diagonal:", diagonal.toFixed(1), "cm");`, note: "Pythagoras: 25 + 81 = 106, and the square root of 106 is about 10.30." }, { name: "Multiply instead of **", code: c`const width = 5;
const height = 9;
const diagonal = Math.sqrt(width * width + height * height);
console.log("Diagonal:", diagonal.toFixed(1), "cm");`, note: "<code>width * width</code> is the same as <code>width ** 2</code>." }] },
    { id: "fix-game-store", lvl: "fire", debug: true, title: "Fix the game store", prompt: "<p>A game costs 200 riyals with a 15% discount, and 4 friends share the price. This program has <b>three</b> bugs. Fix them so it shows:</p><pre class=\"code-static\">Saving: 30\nFinal price: 170\nEach pays: 42.50</pre>", starter: c`const gamePrice = 200;
const discountPercent = 15;
const saving = gamePrice * discountPercent % 100;
const finalPrice = gamePrice - saving;
const eachPays = finalPrice / friends;
const friends = 4;
console.log("Saving:", saving);
console.log("Final price:", finalPrice);
console.log("Each pays:", eachPays.tofixed(2));`, tests: [{ expected: "Saving: 30\nFinal price: 170\nEach pays: 42.50" }, { after: c`console.log(saving, finalPrice, eachPays);`, expected: "30 170 42.5" }],
      hint: "15% of 200 is 200 × 15 <b>divided</b> by 100. A variable must exist before it is used. Method names are case-sensitive.",
      solutions: [{ name: "Fixed", code: c`const gamePrice = 200;
const discountPercent = 15;
const saving = gamePrice * discountPercent / 100;
const finalPrice = gamePrice - saving;
const friends = 4;
const eachPays = finalPrice / friends;
console.log("Saving:", saving);
console.log("Final price:", finalPrice);
console.log("Each pays:", eachPays.toFixed(2));`, note: "Bug 1: <code>%</code> is the remainder, not percent — use <code>/ 100</code>. Bug 2: <code>friends</code> was used before it was created; swap the two lines. Bug 3: <code>tofixed</code> → <code>toFixed</code> (capital F)." }] },
    { id: "change-machine", lvl: "fire", title: "The change machine", prompt: "<p>A machine pays 287 riyals using as few notes as possible: 100, 50, 10, 5 and 1. Keep the amount still to pay in <code>let rest</code> (it must be 0 at the end). Show:</p><pre class=\"code-static\">100s: 2\n50s: 1\n10s: 3\n5s: 1\n1s: 2</pre>", tests: [{ expected: "100s: 2\n50s: 1\n10s: 3\n5s: 1\n1s: 2" }, { after: c`console.log(rest);`, expected: "0" }],
      hint: "For each note: the count is <code>Math.floor(rest / note)</code>, and what is left is <code>rest % note</code> (so write <code>rest %= note;</code>).",
      solutions: [{ name: "floor and %=", code: c`let rest = 287;
console.log("100s:", Math.floor(rest / 100));
rest %= 100;
console.log("50s:", Math.floor(rest / 50));
rest %= 50;
console.log("10s:", Math.floor(rest / 10));
rest %= 10;
console.log("5s:", Math.floor(rest / 5));
rest %= 5;
console.log("1s:", Math.floor(rest / 1));
rest %= 1;`, note: "The same two lines for every note: count with <code>Math.floor(rest / note)</code>, then <code>rest %= note</code> keeps only what is still to pay. After the 1s nothing is left, so <code>rest</code> ends at 0." }, { name: "Subtract what was paid", code: c`let rest = 287;
let count = Math.floor(rest / 100);
console.log("100s:", count);
rest -= count * 100;
count = Math.floor(rest / 50);
console.log("50s:", count);
rest -= count * 50;
count = Math.floor(rest / 10);
console.log("10s:", count);
rest -= count * 10;
count = Math.floor(rest / 5);
console.log("5s:", count);
rest -= count * 5;
count = rest;
console.log("1s:", count);
rest -= count;`, note: "Like a real cashier: count the notes, then take their value away from what is left." }],
      twist: "Try 999 riyals. How many notes in total?" },
  ],
  quiz: [
    { q: "What does this show?", code: c`console.log(20 - 4 * 2);`, o: ["`12`", "`32`", "`8`", "`36`"], a: 0, e: "`*` comes first: 4 × 2 = 8, then 20 − 8 = 12." },
    { q: "What does this show?", code: c`console.log(14 % 3);`, o: ["`2`", "`4`", "`4.67`", "`1`"], a: 0, e: "3 goes into 14 four times (12), leaving 2." },
    { q: "What does this show?", code: c`let x = 7;
x += 3;
x *= 2;
console.log(x);`, o: ["`20`", "`13`", "`17`", "`10`"], a: 0, e: "7 + 3 = 10, then 10 × 2 = 20." },
    { q: "What does this show?", code: c`let k = 1;
console.log(k++, k);`, o: ["`1 2`", "`2 2`", "`1 1`", "`2 3`"], a: 0, e: "Postfix gives the old value (1) and then grows `k` to 2, which the second value shows." },
    { q: "What does this show?", code: c`console.log(Math.ceil(3.01), Math.floor(3.99));`, o: ["`4 3`", "`3 4`", "`3 3`", "`4 4`"], a: 0, e: "`ceil` always rounds up (4); `floor` always rounds down (3)." },
    { q: "What is the type of the value that `(2.5).toFixed(1)` gives?", o: ["string", "number", "boolean", "NaN"], a: 0, e: "`toFixed` returns a **string**, made for showing. Do your math before calling it." },
  ],
  puzzle: { title: "The shrinking number", q: "<p>Without running it: what <b>exactly</b> does this program show? Type the output on one line.</p>", code: c`let n = 7;
n += 3;
n *= 2;
n %= 6;
console.log(n, n ** 2);`, answers: ["2 4"], run: true, hint: "Follow `n` line by line. `%=` keeps only the remainder.", e: "7 + 3 = 10, × 2 = 20, 20 % 6 = 2 (6 × 3 = 18, remainder 2). Then `2 ** 2` is 4. Output: `2 4`." },
  cards: [
    { f: "What does `%` do?", b: "Gives the remainder of a division: `17 % 5` is `2`. `n % 2` is 0 for even numbers, 1 for odd." },
    { f: "`x++` vs `++x` in the same line?", b: "`x++` gives the old value, then adds 1. `++x` adds 1 first, then gives the new value." },
    { f: "`x += 5` means…", b: "`x = x + 5`. Also `-=`, `*=`, `/=`, `%=`." },
    { f: "round, floor, ceil?", b: "`Math.round` nearest, `Math.floor` always down, `Math.ceil` always up." },
    { f: "What does `toFixed(2)` give?", b: "A **string** with exactly 2 decimals, e.g. `(3).toFixed(2)` is `\"3.00\"`." },
  ],
  remember: [
    "Operators: `+ - * / % **`. Order: `**`, then `* / %`, then `+ -`; parentheses first.",
    "`%` is the remainder: `n % 2` tells even (0) from odd (1).",
    "`x += 5`, `x -= 5`, `x *= 5`, `x /= 5` change a variable using its own value; `x++` / `x--` add or take away 1.",
    "Postfix `x++` gives the old value; prefix `++x` gives the new one. On their own line they are the same.",
    "`Math.round / floor / ceil / max / min / abs / sqrt` — and `toFixed(2)` returns a **string**.",
    "`NaN` = not a number, `x / 0` = `Infinity`, and `0.1 + 0.2` is `0.30000000000000004`.",
  ],
};
})();
