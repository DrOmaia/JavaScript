window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[18] = {
  title: "Array methods: map, filter, find",
  intro: "Yesterday you stored lists in arrays and walked through them with loops, {{name}}. Today you meet the array's built-in helpers: short methods that transform, filter, search, add up and sort a list in one line. Each one replaces a loop you already know how to write — so you will always see the loop next to it.",
  goals: [
    "Run code for every item with `forEach`",
    "Build a new array with `map` and keep only some items with `filter`",
    "Search with `find`, `findIndex`, `some` and `every`",
    "Add up a list with `reduce` and sort numbers correctly with `(a, b) => a - b`",
    "Tell `slice` from `splice`, copy and join arrays with spread `[...arr]`, and chain methods",
  ],
  learn: [
    { t: "h", text: "Why array methods?" },
    { t: "p", html: "<p>Look back at your loops from yesterday. Again and again you wrote the same shapes: <i>go through every mark and change it</i>, <i>go through every mark and keep the good ones</i>, <i>go through every mark until you find one</i>. The loop works, but every extra line is a place for a bug.</p><p>Array methods give each of these common jobs a <b>name</b>. You say <i>what</i> you want (\"map\", \"filter\", \"find\") and give a small function that decides about <b>one</b> item. The method does the looping for you.</p>" },
    { t: "analogy", title: "Array methods are like machines in a juice shop", html: "<p>Imagine a row of fruits on a counter. A <b>juicer</b> takes every fruit and gives back one cup of juice for each — that is <code>map</code>. A <b>sieve</b> lets the good fruits through and keeps out the bad ones — that is <code>filter</code>. A worker who walks along the row and stops at the <b>first</b> ripe mango — that is <code>find</code>.</p>" },

    { t: "h", text: "forEach: do something with each item" },
    { t: "code", code: c`const players = ["Salem", "Omar", "Fahad"];

// the loop you know
for (const p of players) {
  console.log("Welcome,", p);
}

// the same job with forEach
players.forEach(p => console.log("Hi,", p));`, before: "<p>Both parts print one line per player. Compare them.</p>", note: "<p><code>forEach</code> takes a <b>callback</b> (Day 16): a function that JavaScript calls once for each item, giving it the item as the parameter <code>p</code>. <code>forEach</code> returns nothing useful — it is only for <b>doing</b> something, like printing.</p>" },
    { t: "check", q: "How many times does the arrow function run?", code: c`const days = ["Sun", "Mon", "Tue", "Wed"];
days.forEach(d => console.log(d));`, o: ["Once", "Four times — once per item", "It never runs", "Five times"], a: 1, e: "`forEach` calls your function once for every item. The array has 4 items, so it runs 4 times.", hint: "Count the items in the array." },

    { t: "h", text: "map: a new array, the same length" },
    { t: "p", html: "<p>Your teacher adds 5 bonus points to every quiz mark. You need a <b>new</b> list where each mark is changed. That is exactly what <code>map</code> does: it calls your function for each item and collects what the function <b>returns</b> into a new array. Same number of items in, same number out.</p>" },
    { t: "code", code: c`const marks = [70, 85, 60];

// loop version
const loopBonus = [];
for (const m of marks) {
  loopBonus.push(m + 5);
}
console.log(loopBonus);

// map version
const bonus = marks.map(m => m + 5);
console.log(bonus);
console.log(marks); // the original is not changed`, note: "<p>Both give <code>[75, 90, 65]</code>. The map version needs no empty array and no <code>push</code>. The original <code>marks</code> is not changed.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`marks.map(...)`, "Call the <code>map</code> method of the array <code>marks</code>."],
      [c`m => m + 5`, "The callback. <code>m</code> is one mark; the function <b>returns</b> <code>m + 5</code>. An arrow function without braces returns its value automatically."],
      [c`const bonus = ...`, "<code>map</code> returns the new array; we keep it in <code>bonus</code>."],
      [c`console.log(marks);`, "Proof that the old array was not touched."],
    ] },
    { t: "viz", code: c`const prices = [4, 10, 7];
const withTax = prices.map(p => p * 2);
console.log(withTax);`, before: "<p>Press <b>Visualize</b> and click <b>Next ▶</b>: watch the callback run three times and the new array appear.</p>" },
    { t: "turn", level: "Easy", q: "What does this show? Type the output.", code: c`const nums = [1, 2, 3];
console.log(nums.map(n => n * 10));`, answers: ["[10, 20, 30]"], run: true, e: "`map` calls `n => n * 10` for 1, 2 and 3 and collects the answers in a new array of the same length.", hint: "Three items in, three items out. Each one times 10.", placeholder: "e.g. [1, 2]" },

    { t: "h", text: "filter: keep only some items" },
    { t: "p", html: "<p>Now you want only the marks that passed. <code>filter</code> calls your function for each item; your function returns <code>true</code> (keep it) or <code>false</code> (drop it). The new array can be shorter than the original — or even empty.</p>" },
    { t: "code", code: c`const marks = [45, 80, 50, 30, 95];

// loop version
const passedLoop = [];
for (const m of marks) {
  if (m >= 50) passedLoop.push(m);
}
console.log(passedLoop);

// filter version
const passed = marks.filter(m => m >= 50);
console.log(passed);`, note: "<p>The condition <code>m &gt;= 50</code> is the same one you wrote in the <code>if</code>. With <code>filter</code> it simply becomes the body of the arrow function.</p>" },
    { t: "check", q: "What does this show?", code: c`const temps = [38, 45, 41, 29];
console.log(temps.filter(t => t > 40));`, o: ["`[45, 41]`", "`[true, true]`", "`[38, 29]`", "`[false, true, true, false]`"], a: 0, e: "`filter` keeps the **items** for which the function returns `true`. It does not give back the true/false values themselves (that would be `map`).", hint: "filter keeps items, it does not replace them." },

    { t: "h", text: "find and findIndex: the first match" },
    { t: "p", html: "<p>Sometimes you need just <b>one</b> item: the first song longer than 5 minutes, the first student who scored 100. <code>find</code> returns the first item that matches, and stops looking. If nothing matches you get <code>undefined</code>. <code>findIndex</code> returns the <b>position</b> instead, or <code>-1</code> if there is no match — just like <code>indexOf</code> from Day 17.</p>" },
    { t: "code", code: c`const songs = [3, 4, 6, 7]; // minutes

console.log(songs.find(s => s > 5));       // first item > 5
console.log(songs.findIndex(s => s > 5));  // its position
console.log(songs.find(s => s > 10));      // no match
console.log(songs.findIndex(s => s > 10)); // no match`, note: "<p><code>7</code> is also bigger than 5, but <code>find</code> stops at the <b>first</b> match, <code>6</code>, at index <code>2</code>.</p>" },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`const ages = [12, 15, 18, 21];
console.log(ages.findIndex(a => a >= 18));`, answers: ["2"], run: true, e: "The first age that is 18 or more is `18`, at index 2 (counting from 0).", hint: "findIndex gives a position. Positions start at 0.", placeholder: "a number" },

    { t: "h", text: "some and every: yes-or-no questions" },
    { t: "code", code: c`const battery = [80, 15, 60];

console.log(battery.some(b => b < 20));   // is at least one low?
console.log(battery.every(b => b > 10));  // are all above 10?
console.log(battery.every(b => b > 50));  // are all above 50?`, note: "<p><code>some</code> answers <i>\"is there at least one?\"</i> and <code>every</code> answers <i>\"are they all?\"</i>. Both return a boolean — perfect inside an <code>if</code>.</p>" },
    { t: "check", q: "What does this show?", code: c`const marks = [90, 70, 100];
console.log(marks.every(m => m >= 70), marks.some(m => m === 100));`, o: ["`true true`", "`true false`", "`false true`", "`false false`"], a: 0, e: "Every mark is 70 or more, so `every` gives `true`. At least one mark is 100, so `some` gives `true`." },

    { t: "h", text: "reduce, gently: add everything up" },
    { t: "p", html: "<p>To add up a shopping list you used a loop with <code>let total = 0</code>. <code>reduce</code> does the same: it carries a running total from item to item and gives you the final value.</p>" },
    { t: "analogy", title: "reduce is like a snowball", html: "<p>A small snowball rolls down a hill. At each step it picks up a bit more snow and keeps rolling. At the bottom you have one big ball. In <code>reduce</code> the snowball is the running <b>total</b>, each item adds to it, and at the end you get one value.</p>" },
    { t: "code", code: c`const prices = [5, 12, 3];

// loop version
let sum = 0;
for (const p of prices) {
  sum = sum + p;
}
console.log(sum);

// reduce version
const total = prices.reduce((acc, p) => acc + p, 0);
console.log(total);` },
    { t: "lines", title: "Read the reduce line", rows: [
      [c`prices.reduce(..., 0)`, "Start the running total at <code>0</code> — the same as <code>let sum = 0</code>."],
      [c`(acc, p) => acc + p`, "<code>acc</code> (short for <i>accumulator</i>) is the total so far, <code>p</code> is the current item. The function returns the <b>new</b> total."],
      [c`const total = ...`, "After the last item, <code>reduce</code> returns the final total: <code>0 + 5 + 12 + 3 = 20</code>."],
    ] },

    { t: "h", text: "sort and the numbers trap" },
    { t: "p", html: "<p><code>sort()</code> puts items in order — and it <b>changes the original array</b>. For words it works nicely. For numbers there is a trap: without help, <code>sort</code> compares items <b>as text</b>, letter by letter. As text, <code>\"100\"</code> comes before <code>\"9\"</code> because <code>\"1\"</code> comes before <code>\"9\"</code>.</p>" },
    { t: "code", code: c`const names = ["Omar", "Ali", "Sara"];
names.sort();
console.log(names);

const scores = [9, 100, 25];
scores.sort();
console.log(scores); // the trap!

scores.sort((a, b) => a - b);
console.log(scores); // small to big

scores.sort((a, b) => b - a);
console.log(scores); // big to small`, note: "<p>The compare function <code>(a, b) =&gt; a - b</code> tells <code>sort</code> to compare <b>numbers</b>: a negative answer puts <code>a</code> first, a positive one puts <code>b</code> first. Remember: <code>a - b</code> small to big, <code>b - a</code> big to small.</p>" },
    { t: "check", q: "What does this show?", code: c`const goals = [3, 10, 2];
goals.sort();
console.log(goals);`, o: ["`[10, 2, 3]`", "`[2, 3, 10]`", "`[3, 10, 2]`", "`[10, 3, 2]`"], a: 0, e: "Without a compare function, `sort` compares as text: `\"10\"` starts with `\"1\"`, which comes before `\"2\"` and `\"3\"`. Use `(a, b) => a - b` for real number order.", hint: "Think of the numbers as words in a dictionary." },

    { t: "h", text: "slice vs splice" },
    { t: "p", html: "<p>Their names differ by one letter, but they do opposite things. <code>slice(start, end)</code> <b>copies</b> a piece and leaves the array alone (the <code>end</code> position is not included). <code>splice(start, count)</code> <b>cuts</b> items out of the array itself and returns them.</p>" },
    { t: "code", code: c`const week = ["Sun", "Mon", "Tue", "Wed", "Thu"];

console.log(week.slice(1, 3)); // copy positions 1 and 2
console.log(week);             // unchanged

const removed = week.splice(1, 2); // cut 2 items from position 1
console.log(removed);
console.log(week);                  // changed!` },
    { t: "table", head: ["Method", "What it does", "Changes the original?"], rows: [
      ["`slice(start, end)`", "copies a piece (end not included)", "no"],
      ["`splice(start, count)`", "cuts `count` items out and returns them", "**yes**"],
    ] },

    { t: "h", text: "Spread: copy and join arrays" },
    { t: "p", html: "<p>Here is a surprise: <code>const copy = marks;</code> does <b>not</b> copy anything. Both names point to the <b>same</b> array, so sorting <code>copy</code> also sorts <code>marks</code>. To make a real copy, use the spread syntax <code>[...marks]</code>: the three dots pour all the items into a new array. Spread also joins arrays.</p>" },
    { t: "code", code: c`const marks = [70, 95, 80];
const sorted = [...marks].sort((a, b) => b - a);
console.log(sorted); // a sorted copy
console.log(marks);  // the original order is safe

const term1 = [1, 2];
const term2 = [3, 4];
console.log([...term1, ...term2, 5]);` },
    { t: "turn", level: "Medium", q: "What does the last line show?", code: c`const a = [3, 1, 2];
const b = a;
b.sort();
console.log(a);`, answers: ["[1, 2, 3]"], run: true, e: "`const b = a` does not copy: `a` and `b` are two names for the same array, so sorting `b` sorts `a` too. Use `[...a]` to make a real copy.", hint: "Is `b` a new array, or another name for the same one?", placeholder: "e.g. [3, 1, 2]" },

    { t: "h", text: "Chaining: one method after another" },
    { t: "p", html: "<p><code>filter</code> and <code>map</code> both return arrays, so you can call another method straight on the result. Read a chain from left to right, like a sentence: <i>\"take the marks, keep the ones that passed, then add a bonus\"</i>.</p>" },
    { t: "code", code: c`const marks = [40, 75, 90, 55];

const result = marks
  .filter(m => m >= 50)
  .map(m => m + 5);

console.log(result);`, note: "<p>One method per line, starting with a dot, keeps chains readable. Order matters: we filter <b>first</b>, so the bonus cannot help a failing mark pass.</p>" },
    { t: "table", head: ["Method", "Returns", "Loop it replaces"], rows: [
      ["`forEach(fn)`", "nothing (just runs `fn`)", "a `for...of` that prints"],
      ["`map(fn)`", "new array, same length", "empty array + `push(changed item)`"],
      ["`filter(fn)`", "new array, maybe shorter", "empty array + `if` + `push`"],
      ["`find(fn)` / `findIndex(fn)`", "first item / its index (`undefined` / `-1`)", "a loop with `break`"],
      ["`some(fn)` / `every(fn)`", "`true` or `false`", "a loop with a flag variable"],
      ["`reduce(fn, 0)`", "one value (a total)", "`let total = 0` + loop"],
      ["`sort((a, b) => a - b)`", "the same array, sorted", "(you never wrote this one!)"],
    ] },

    { t: "steps", title: "Quiz marks report", problem: "<p>Your class took a quiz out of 20. The marks are <code>[12, 18, 7, 20, 15, 9, 17]</code>. Print this report:</p><pre class=\"code-static\">Passed: [12, 18, 20, 15, 17]\nNumber passed: 5\nAverage: 14\nTop 3: [20, 18, 17]\nFull mark? true</pre><p>A pass is 10 or more.</p>",
      steps: [
        { html: "<p><b>Understand.</b> Five lines, five jobs: keep some marks, count them, add them all up, sort to get the best three, and answer a yes/no question. Each job matches one method.</p>" },
        { html: "<p><b>Keep the passes.</b> \"Keep some\" means <code>filter</code>. Its <code>length</code> is the number passed.</p>", code: c`const marks = [12, 18, 7, 20, 15, 9, 17];
const passed = marks.filter(m => m >= 10);
console.log("Passed:", passed);
console.log("Number passed:", passed.length);` },
        { html: "<p><b>Average.</b> Add everything with <code>reduce</code>, then divide by the number of marks (98 / 7 = 14).</p>", code: c`const total = marks.reduce((acc, m) => acc + m, 0);
console.log("Average:", total / marks.length);` },
        { html: "<p><b>Top 3.</b> Copy with spread so the original order stays, sort big to small with <code>b - a</code>, then <code>slice(0, 3)</code> for the first three.</p>", code: c`const top3 = [...marks].sort((a, b) => b - a).slice(0, 3);
console.log("Top 3:", top3);` },
        { html: "<p><b>Yes or no.</b> \"Did anyone get 20?\" is a <code>some</code> question. Run the full program and compare it with the report.</p>", code: c`console.log("Full mark?", marks.some(m => m === 20));` },
      ],
      code: c`const marks = [12, 18, 7, 20, 15, 9, 17];

const passed = marks.filter(m => m >= 10);
console.log("Passed:", passed);
console.log("Number passed:", passed.length);

const total = marks.reduce((acc, m) => acc + m, 0);
console.log("Average:", total / marks.length);

const top3 = [...marks].sort((a, b) => b - a).slice(0, 3);
console.log("Top 3:", top3);

console.log("Full mark?", marks.some(m => m === 20));` },
  ],
  mistakes: [
    { title: "Sorting numbers without a compare function", html: "<code>sort()</code> alone compares numbers as text, so <code>100</code> comes before <code>9</code>.", wrong: c`[9, 100, 25].sort();`, right: c`[9, 100, 25].sort((a, b) => a - b);` },
    { title: "Braces in a map arrow without return", html: "With <code>{ }</code> an arrow function needs <code>return</code>. Without it every item becomes <code>undefined</code>.", wrong: c`const doubled = nums.map(n => { n * 2; });`, right: c`const doubled = nums.map(n => n * 2);` },
    { title: "Expecting forEach to give back an array", html: "<code>forEach</code> always returns <code>undefined</code>. If you want a new array, use <code>map</code>.", wrong: c`const big = nums.forEach(n => n * 10);`, right: c`const big = nums.map(n => n * 10);` },
    { title: "Copying with = and then sorting", html: "<code>=</code> gives a second name to the same array. Sorting the \"copy\" changes the original. Copy with <code>[...arr]</code>.", wrong: c`const copy = marks;
copy.sort((a, b) => a - b);`, right: c`const copy = [...marks];
copy.sort((a, b) => a - b);` },
  ],
  tricks: [
    { title: "Biggest and smallest with spread", html: "<code>Math.max</code> wants separate numbers, not an array. Spread pours the array out for it.", code: c`const temps = [38, 45, 41];
console.log(Math.max(...temps), Math.min(...temps));` },
    { title: "map gives you the index too", html: "The callback of <code>map</code>, <code>filter</code> and <code>forEach</code> can take a second parameter: the position of the item.", code: c`const names = ["Lina", "Noor", "Huda"];
names.forEach((n, i) => console.log(i + 1 + ".", n));` },
    { title: "Count matches with filter().length", html: "To count how many items pass a test, filter them and read the length.", code: c`const marks = [55, 40, 90, 70];
console.log(marks.filter(m => m >= 60).length);` },
  ],
  practice: [
    { t: "try", title: "Make it yours", html: "<p>Change the list to your own week of phone-battery levels at bedtime. Then try a different test in <code>filter</code> and a different change in <code>map</code>.</p>", code: c`const battery = [35, 12, 60, 8, 50];
console.log("Low nights:", battery.filter(b => b < 20));
console.log("Used:", battery.map(b => 100 - b));
console.log("Ever below 10?", battery.some(b => b < 10));` },
    { t: "predict", code: c`const nums = [4, 7, 10];
console.log(nums.map(n => n > 5));
console.log(nums.filter(n => n > 5));`, explain: "<p><code>map</code> replaces each item with what the function returns — here <code>true</code> or <code>false</code>: <code>[false, true, true]</code>. <code>filter</code> uses that answer to decide which <b>items</b> to keep: <code>[7, 10]</code>.</p>" },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`console.log([5, 10, 15].reduce((acc, n) => acc + n, 0));`, answers: ["30"], run: true, e: "The total starts at 0 and adds 5, then 10, then 15.", placeholder: "a number" },
    { t: "parsons", title: "Names of the passing students", prompt: "Arrange the lines so the program prints the names of students with 60 or more: <code>['Rami', 'Yara']</code>.", lines: [c`const names = ["Rami", "Dana", "Yara"];`, c`const marks = [75, 40, 88];`, c`const ok = names.filter((n, i) => marks[i] >= 60);`, c`console.log(ok);`], distractors: [c`const ok = names.map((n, i) => marks[i] >= 60);`], explain: "<code>filter</code> keeps the names; the index <code>i</code> lets us look at the mark in the same position. <code>map</code> would give <code>[true, false, true]</code> instead." },
    { t: "predict", code: c`const week = ["A", "B", "C", "D"];
console.log(week.slice(1, 3));
console.log(week.splice(1, 3));
console.log(week);`, explain: "<p><code>slice(1, 3)</code> copies positions 1 and 2: <code>['B', 'C']</code>. <code>splice(1, 3)</code> cuts <b>three</b> items starting at position 1: <code>['B', 'C', 'D']</code>, and only <code>['A']</code> is left.</p>" },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`const goals = [2, 0, 5, 1];
console.log(goals.find(g => g > 1), goals.findIndex(g => g > 10));`, answers: ["2 -1"], run: true, e: "The first item greater than 1 is `2` itself (index 0). No item is greater than 10, so `findIndex` gives `-1`.", placeholder: "type the output" },
    { t: "try", title: "Chain it", html: "<p>Prices in riyals of today's canteen items. Build a chain that keeps the items under 10 riyals, adds 15% VAT with <code>map</code>, and then adds them up with <code>reduce</code>. Print the result.</p>", code: c`const prices = [4, 12, 6, 15, 8];
const total = prices
  .filter(p => p < 10)
  .map(p => p * 1.15)
  .reduce((acc, p) => acc + p, 0);
console.log(total.toFixed(2), "riyals");` },
  ],
  exercises: [
    { id: "d18-double", lvl: "seed", title: "Double everything", prompt: "<p>Write a function <code>doubleAll(nums)</code> that <b>returns</b> a new array where every number is doubled. Use <code>map</code>.</p><pre class=\"code-static\">doubleAll([1, 2, 3])  →  [2, 4, 6]</pre>", starter: c`function doubleAll(nums) {
  // your code here
}`,
      tests: [{ after: c`console.log(doubleAll([1, 2, 3]));`, expected: "[2, 4, 6]" }, { after: c`console.log(doubleAll([10, -5]));`, expected: "[20, -10]" }, { after: c`console.log(doubleAll([]));`, expected: "[]" }],
      hint: "<code>return nums.map(n =&gt; n * 2);</code> — remember to <b>return</b> the new array.",
      solutions: [{ name: "map", code: c`function doubleAll(nums) {
  return nums.map(n => n * 2);
}`, note: "One line: <code>map</code> builds the new array for you." }, { name: "Arrow function", code: c`const doubleAll = nums => nums.map(n => n * 2);`, note: "The same idea written as an arrow function." }, { name: "Loop", code: c`function doubleAll(nums) {
  const out = [];
  for (const n of nums) {
    out.push(n * 2);
  }
  return out;
}`, note: "The loop version. It works, but needs four extra lines." }] },
    { id: "d18-passed", lvl: "seed", title: "Who passed?", prompt: "<p>Write a function <code>passed(marks)</code> that returns only the marks that are <b>50 or more</b>, in the same order. Use <code>filter</code>.</p><pre class=\"code-static\">passed([45, 50, 90, 20])  →  [50, 90]</pre>", starter: c`function passed(marks) {
  // your code here
}`,
      tests: [{ after: c`console.log(passed([45, 50, 90, 20]));`, expected: "[50, 90]" }, { after: c`console.log(passed([10, 20]));`, expected: "[]" }, { after: c`console.log(passed([100, 49, 51]));`, expected: "[100, 51]" }],
      hint: "The test inside <code>filter</code> is <code>m &gt;= 50</code>.",
      solutions: [{ name: "filter", code: c`function passed(marks) {
  return marks.filter(m => m >= 50);
}`, note: "<code>filter</code> keeps every mark for which <code>m &gt;= 50</code> is true." }] },
    { id: "d18-total", lvl: "star", title: "Canteen bill", prompt: "<p>Write a function <code>bill(prices)</code> that returns the total of all prices. Use <code>reduce</code> (or a loop if you prefer). An empty list costs <code>0</code>.</p><pre class=\"code-static\">bill([5, 3.5, 7])  →  15.5</pre>", starter: c`function bill(prices) {
  // your code here
}`,
      tests: [{ after: c`console.log(bill([5, 3.5, 7]));`, expected: "15.5" }, { after: c`console.log(bill([10]));`, expected: "10" }, { after: c`console.log(bill([]));`, expected: "0" }],
      hint: "Start <code>reduce</code> at <code>0</code>: <code>prices.reduce((acc, p) =&gt; acc + p, 0)</code>. The <code>0</code> also makes the empty list work.",
      solutions: [{ name: "reduce", code: c`function bill(prices) {
  return prices.reduce((acc, p) => acc + p, 0);
}`, note: "The running total starts at 0 and grows with each price." }, { name: "Loop", code: c`function bill(prices) {
  let total = 0;
  for (const p of prices) {
    total += p;
  }
  return total;
}`, note: "The loop you already know does the same job." }] },
    { id: "d18-first-hot", lvl: "star", title: "First hot day", prompt: "<p>Write a function <code>firstHot(temps, limit)</code> that returns the <b>first</b> temperature that is <b>above</b> <code>limit</code>, or the string <code>\"none\"</code> if there is none.</p><pre class=\"code-static\">firstHot([30, 42, 39, 45], 40)  →  42\nfirstHot([30, 31], 40)          →  none</pre>", starter: c`function firstHot(temps, limit) {
  // your code here
}`,
      tests: [{ after: c`console.log(firstHot([30, 42, 39, 45], 40));`, expected: "42" }, { after: c`console.log(firstHot([30, 31], 40));`, expected: "none" }, { after: c`console.log(firstHot([50, 41], 44));`, expected: "50" }],
      hint: "<code>find</code> gives <code>undefined</code> when nothing matches. Check for that with <code>if</code> and return <code>\"none\"</code>.",
      solutions: [{ name: "find + if", code: c`function firstHot(temps, limit) {
  const hot = temps.find(t => t > limit);
  if (hot === undefined) {
    return "none";
  }
  return hot;
}`, note: "Keep the result of <code>find</code>, then handle the \"no match\" case." }, { name: "Loop", code: c`function firstHot(temps, limit) {
  for (const t of temps) {
    if (t > limit) return t;
  }
  return "none";
}`, note: "<code>return</code> inside the loop stops at the first match — exactly what <code>find</code> does." }] },
    { id: "d18-top3", lvl: "star", title: "Podium", prompt: "<p>Write a function <code>podium(scores)</code> that returns the <b>three highest</b> scores, biggest first, <b>without changing</b> the original array.</p><pre class=\"code-static\">const s = [7, 30, 12, 100, 9];\npodium(s)  →  [100, 30, 12]\ns          →  [7, 30, 12, 100, 9]   (unchanged)</pre>", starter: c`function podium(scores) {
  // your code here
}`,
      tests: [{ after: c`const s = [7, 30, 12, 100, 9];
console.log(podium(s));
console.log(s);`, expected: "[100, 30, 12]\n[7, 30, 12, 100, 9]" }, { after: c`console.log(podium([5, 50, 500, 1]));`, expected: "[500, 50, 5]" }],
      hint: "Copy with <code>[...scores]</code>, sort with <code>(a, b) =&gt; b - a</code> (numbers, big to small), then <code>slice(0, 3)</code>.",
      solutions: [{ name: "Copy, sort, slice", code: c`function podium(scores) {
  return [...scores].sort((a, b) => b - a).slice(0, 3);
}`, note: "The copy protects the original; <code>b - a</code> sorts numbers from big to small." }] },
    { id: "d18-fix-lengths", lvl: "fire", debug: true, title: "Fix the word lengths", prompt: "<p><code>lengths(words)</code> should return the length of every word, sorted from small to big. It has <b>two</b> bugs. Fix them.</p><pre class=\"code-static\">lengths([\"football\", \"tea\", \"basketball\", \"go\"])  →  [2, 3, 8, 10]</pre>",
      starter: c`function lengths(words) {
  const result = words.map(w => { w.length; });
  result.sort();
  return result;
}

console.log(lengths(["football", "tea", "basketball", "go"]));`,
      tests: [{ after: c`console.log(lengths(["football", "tea", "basketball", "go"]));`, expected: "[2, 3, 8, 10]" }, { after: c`console.log(lengths(["abcdefghijk", "abc", "abcdefghi"]));`, expected: "[3, 9, 11]" }],
      hint: "Run it: you get <code>[undefined, ...]</code>. An arrow with braces needs <code>return</code>. After that, look at the order of <code>10</code> and <code>2</code>.",
      solutions: [{ name: "Fixed", code: c`function lengths(words) {
  const result = words.map(w => w.length);
  result.sort((a, b) => a - b);
  return result;
}`, note: "Bug 1: <code>{ w.length; }</code> returned nothing, so every item was <code>undefined</code> — remove the braces (or write <code>return</code>). Bug 2: <code>sort()</code> compared as text, putting <code>10</code> before <code>2</code> — add <code>(a, b) =&gt; a - b</code>." }] },
    { id: "d18-hot-chain", lvl: "fire", title: "Heat warning", prompt: "<p>Write a function <code>heatWarning(temps)</code> that returns one string: the temperatures of <b>40 or more</b>, each followed by <code>C</code>, joined by <code>\", \"</code>. If there are none, return an empty string. Try to do it with one chain.</p><pre class=\"code-static\">heatWarning([38, 41, 45, 30, 40])  →  41C, 45C, 40C</pre>", starter: c`function heatWarning(temps) {
  // your code here
}`,
      tests: [{ after: c`console.log(heatWarning([38, 41, 45, 30, 40]));`, expected: "41C, 45C, 40C" }, { after: c`console.log(heatWarning([47]));`, expected: "47C" }, { after: c`console.log("[" + heatWarning([20, 25]) + "]");`, expected: "[]" }],
      hint: "<code>filter</code> to keep the hot ones, <code>map</code> to add <code>\"C\"</code>, then <code>join(\", \")</code> from Day 17.",
      solutions: [{ name: "One chain", code: c`function heatWarning(temps) {
  return temps
    .filter(t => t >= 40)
    .map(t => t + "C")
    .join(", ");
}`, note: "Each step returns an array, so the next method can work on it. <code>join</code> turns the final array into a string." }, { name: "Template literal", code: c`function heatWarning(temps) {
  return temps.filter(t => t >= 40).map(t => ¦#{t}C¦).join(", ");
}`, note: "Same chain on one line, with a template string." }],
      twist: "Can you add the count at the front, like <code>3 hot days: 41C, 45C, 40C</code>?" },
  ],
  quiz: [
    { q: "Which method builds a new array with the **same number** of items, each one changed?", o: ["`filter`", "`map`", "`find`", "`forEach`"], a: 1, e: "`map` transforms every item. `filter` can drop items, `find` returns one item, `forEach` returns nothing." },
    { q: "What does this show?", code: c`console.log([3, 8, 12, 5].filter(n => n > 4));`, o: ["`[8, 12, 5]`", "`[8, 12]`", "`8`", "`[false, true, true, true]`"], a: 0, e: "`filter` keeps every item where `n > 4` is true: 8, 12 and 5." },
    { q: "What does this show?", code: c`console.log([1, 5, 30, 200].sort());`, o: ["`[1, 200, 30, 5]`", "`[1, 5, 30, 200]`", "`[200, 30, 5, 1]`"], a: 0, e: "Without a compare function the numbers are compared as text: \"1\", \"200\", \"30\", \"5\"." },
    { q: "What does `find` return when no item matches?", o: ["`-1`", "`false`", "`undefined`", "an empty array `[]`"], a: 2, e: "`find` returns `undefined`. It is `findIndex` (and `indexOf`) that return `-1`." },
    { q: "What does this show?", code: c`const a = [1, 2, 3, 4];
a.splice(0, 2);
console.log(a);`, o: ["`[3, 4]`", "`[1, 2]`", "`[1, 2, 3, 4]`"], a: 0, e: "`splice(0, 2)` cuts two items from position 0 out of the array itself, so `[3, 4]` is left." },
    { q: "What does this show?", code: c`const marks = [40, 60, 80];
console.log(marks.filter(m => m >= 50).map(m => m / 10));`, o: ["`[6, 8]`", "`[4, 6, 8]`", "`[60, 80]`"], a: 0, e: "First `filter` keeps `[60, 80]`, then `map` divides each by 10." },
  ],
  puzzle: { title: "The sneaky copy", q: "<p>Without running it: what does the last line show? Type the array exactly as the console would.</p>", code: c`const original = [5, 1, 10];
const copy = original;
copy.sort();
console.log(original);`, answers: ["[1, 10, 5]"], run: true, hint: "Two traps at once: is <code>copy</code> really a copy? And how does <code>sort()</code> order numbers without help?", e: "`copy` is just a second name for the same array, so sorting it sorts `original`. And `sort()` without a compare function orders as text: \"1\", \"10\", \"5\" — so `[1, 10, 5]`." },
  cards: [
    { f: "`map` vs `filter`?", b: "`map` changes every item (same length). `filter` keeps only the items whose test is true (maybe shorter)." },
    { f: "How do you sort numbers from small to big?", b: "`arr.sort((a, b) => a - b)` — use `b - a` for big to small. Plain `sort()` compares as text." },
    { f: "`find` vs `findIndex` when nothing matches?", b: "`find` gives `undefined`, `findIndex` gives `-1`." },
    { f: "`slice` vs `splice`?", b: "`slice(start, end)` copies a piece and changes nothing. `splice(start, count)` cuts items out of the array." },
    { f: "How do you add up an array with reduce?", b: "`arr.reduce((acc, x) => acc + x, 0)` — start at 0, add each item." },
  ],
  remember: [
    "Array methods take a **callback**: a small function that decides about **one** item.",
    "`map` → new array, same length. `filter` → new array with only the items that pass.",
    "`find` → first match or `undefined`; `findIndex` → its position or `-1`; `some` / `every` → `true` or `false`.",
    "`reduce((acc, x) => acc + x, 0)` adds everything up.",
    "`sort()` changes the array and compares as **text** — for numbers use `(a, b) => a - b`.",
    "`[...arr]` makes a real copy (`=` does not); `slice` copies, `splice` cuts.",
  ],
};
})();
