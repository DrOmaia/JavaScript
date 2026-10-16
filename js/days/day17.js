window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[17] = {
  title: "Arrays",
  intro: "Five marks, thirty classmates, a playlist of 200 songs… one variable per value would be a nightmare, {{name}}. Today you meet the <b>array</b>: a whole list kept in one variable, which loops can walk through in a second.",
  goals: [
    "Create an array with `[ ]` and read items by **index** (starting at 0)",
    "Use `.length` and get the last item with `arr[arr.length - 1]`",
    "Change items and add / remove with `push`, `pop`, `shift`, `unshift`",
    "Search with `includes` and `indexOf`",
    "Loop over an array with `for` and `for...of`, and compute sum, average and maximum",
    "Turn strings into arrays and back with `split` and `join`",
  ],
  learn: [
    { t: "h", text: "Why arrays?" },
    { t: "p", html: "<p>You want to keep your five maths marks. With what you know, you would write <code>mark1</code>, <code>mark2</code> … <code>mark5</code>. Now find the average, or the best mark: you must name every variable by hand. And next term there are seven marks, so you rewrite everything. An <b>array</b> keeps any number of values in <b>one</b> variable, in order.</p>" },
    { t: "analogy", title: "An array is like a train", html: "<p>A train is one thing with a name, made of numbered carriages. Each carriage carries one value. The carriages are numbered <b>starting from 0</b>: the first carriage is number 0, the second is number 1, and so on. You can add a carriage at the end, remove one, or look inside any carriage by its number.</p>" },
    { t: "code", code: c`const marks = [85, 92, 78, 90, 88];
const friends = ["Sara", "Omar", "Lama"];

console.log(marks);
console.log(friends);
console.log(marks[0], friends[1]);`, note: "<p>Square brackets <code>[ ]</code> make an array; items are separated by commas. The console shows strings inside an array with quotes, like Chrome does. To read one item, write the array name and the <b>index</b> in brackets: <code>marks[0]</code> is the first mark.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`const marks = [85, 92, 78, 90, 88];`, "Create one variable <code>marks</code> holding a list of five numbers."],
      [c`marks[0]`, "The item at index 0 — the <b>first</b> item, 85."],
      [c`friends[1]`, "Index 1 is the <b>second</b> item: <code>\"Omar\"</code>. Index = position − 1."],
    ] },
    { t: "check", q: "What does this show?", code: c`const days = ["Sun", "Mon", "Tue", "Wed"];
console.log(days[2]);`, o: ["`Mon`", "`Tue`", "`Wed`"], a: 1, e: "Counting from 0: Sun is 0, Mon is 1, Tue is 2.", hint: "The first item has index 0." },
    { t: "h", text: "length and the last item" },
    { t: "code", code: c`const songs = ["Intro", "Sky", "Run", "Home"];
console.log(songs.length);
console.log(songs[songs.length - 1]);
console.log(songs[10]);`, note: "<p><code>.length</code> is the number of items: 4. Because indexes start at 0, the last index is always <b>length − 1</b>, so <code>songs[songs.length - 1]</code> gives the last song whatever the size of the list. Asking for an index that does not exist is not an error: you just get <code>undefined</code>.</p>" },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`const team = ["Ali", "Badr", "Fahad", "Majed", "Nasser"];
console.log(team[team.length - 1]);`, answers: ["Nasser"], run: true, e: "The length is 5, so the last index is 4: `\"Nasser\"`.", placeholder: "type the output" },
    { t: "h", text: "Changing, adding and removing" },
    { t: "p", html: "<p>A list is rarely fixed: a new song joins the playlist, the first person in the canteen queue is served. You can <b>change</b> an item by assigning to its index, and use four methods to add or remove at the ends. (Even with <code>const</code> you may change what is <i>inside</i> the array; you just cannot replace the whole array.)</p>" },
    { t: "code", code: c`const queue = ["Sara", "Omar"];
queue[1] = "Lama";          // change item 1
queue.push("Khalid");       // add at the end
queue.unshift("Mona");      // add at the start
console.log(queue);
const last = queue.pop();   // remove from the end
const first = queue.shift(); // remove from the start
console.log(first, last, queue);`, note: "<p><code>pop</code> and <code>shift</code> also <b>return</b> the item they removed, so you can save it.</p>" },
    { t: "analogy", title: "push / pop / shift / unshift in the canteen queue", html: "<p>A new student joins at the back: <b>push</b>. The student at the front is served and leaves: <b>shift</b>. The last student gives up and leaves: <b>pop</b>. A teacher jumps in at the front: <b>unshift</b>. Back = push / pop, front = unshift / shift.</p>" },
    { t: "table", head: ["Method", "What it does", "Returns"], rows: [
      ["`arr.push(x)`", "adds `x` at the end", "the new length"],
      ["`arr.pop()`", "removes the last item", "that item"],
      ["`arr.unshift(x)`", "adds `x` at the start", "the new length"],
      ["`arr.shift()`", "removes the first item", "that item"],
      ["`arr.includes(x)`", "is `x` in the array?", "`true` / `false`"],
      ["`arr.indexOf(x)`", "where is `x`?", "its index, or `-1`"],
      ["`arr.join(sep)`", "glue items into a string", "a string"],
      ["`str.split(sep)`", "cut a string into an array", "an array"],
    ] },
    { t: "check", q: "What does this show?", code: c`const a = [1, 2, 3];
a.push(4);
a.shift();
console.log(a);`, o: ["`[2, 3, 4]`", "`[1, 2, 3]`", "`[1, 2, 3, 4]`", "`[4, 1, 2, 3]`"], a: 0, e: "`push(4)` makes [1, 2, 3, 4], then `shift()` removes the first item." },
    { t: "h", text: "Searching: includes and indexOf" },
    { t: "code", code: c`const allergies = ["nuts", "milk"];
console.log(allergies.includes("milk"));
console.log(allergies.includes("eggs"));
console.log(allergies.indexOf("milk"));
console.log(allergies.indexOf("eggs"));`, note: "<p><code>includes</code> answers yes / no. <code>indexOf</code> tells you <b>where</b>, and <code>-1</code> means \"not found\" (no real index is negative). Both are case-sensitive: <code>\"Milk\"</code> is not <code>\"milk\"</code>.</p>" },
    { t: "h", text: "Looping over an array" },
    { t: "p", html: "<p>Here arrays and loops become best friends. A <code>for</code> loop with <code>i</code> from 0 to <code>length − 1</code> visits every index. When you only need the items, not their positions, <code>for...of</code> is shorter: it hands you each item in turn.</p>" },
    { t: "code", code: c`const subjects = ["Math", "Physics", "English"];

for (let i = 0; i < subjects.length; i++) {
  console.log(i + 1, subjects[i]);
}

for (const s of subjects) {
  console.log("I study " + s);
}`, note: "<p>Use <code>i &lt; subjects.length</code>, not <code>&lt;=</code>: the last index is length − 1.</p>" },
    { t: "viz", code: c`const marks = [70, 90, 80];
let sum = 0;
for (const m of marks) {
  sum += m;
}
const average = sum / marks.length;
console.log(sum, average);`, before: "<p>Press <b>Visualize</b> and follow <code>m</code> and <code>sum</code>: each round, the next mark is added. This <b>sum pattern</b> (start at 0, add each item) is one of the most used patterns in programming.</p>" },
    { t: "code", code: c`const temps = [38, 44, 41, 46, 39];
let max = temps[0];
for (const t of temps) {
  if (t > max) {
    max = t;
  }
}
console.log("Hottest day in Riyadh:", max);`, before: "<p>The <b>max pattern</b>: start with the first item as the \"best so far\", and replace it whenever you meet something bigger.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`let max = temps[0];`, "The best so far is the first item. (Starting at 0 would be wrong if all values were negative.)"],
      [c`for (const t of temps)`, "Take each temperature in turn and call it <code>t</code>."],
      [c`if (t > max) { max = t; }`, "Found a bigger one? It becomes the new best."],
    ] },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`const nums = [4, 1, 7, 2];
let total = 0;
for (let i = 0; i < nums.length; i++) {
  total += nums[i];
}
console.log(total / nums.length);`, answers: ["3.5"], run: true, e: "The sum is 4 + 1 + 7 + 2 = 14, and 14 / 4 = 3.5.", placeholder: "type the output" },
    { t: "h", text: "split and join: strings ↔ arrays" },
    { t: "code", code: c`const csv = "apple,banana,mango";
const fruits = csv.split(",");
console.log(fruits, fruits.length);
console.log(fruits.join(" | "));
console.log("hello".split(""));`, note: "<p><code>split(\",\")</code> cuts the string at every comma and returns an array. <code>join(\" | \")</code> does the opposite: glues the items with the text you choose. <code>split(\"\")</code> breaks a word into letters.</p>" },
    { t: "check", q: "What does this show?", code: c`const words = "I love JS".split(" ");
console.log(words.join("-"));`, o: ["`I-love-JS`", "`I love JS`", "`['I', 'love', 'JS']`", "`ILoveJS`"], a: 0, e: "`split(\" \")` gives ['I', 'love', 'JS'], then `join(\"-\")` glues them with dashes." },
    { t: "steps", title: "Class marks report", problem: "<p>Your teacher gives you the marks of a small class as a string: <code>\"72,95,60,88,45\"</code>. Print the number of students, the average, the best mark, and how many passed (50 or more):</p><pre class=\"code-static\">Students: 5\nAverage: 72\nBest: 95\nPassed: 4</pre>",
      steps: [
        { html: "<p><b>Understand.</b> The marks are text. We need numbers in an array, then three patterns: sum (for the average), max, and count.</p>" },
        { html: "<p><b>Turn the string into an array of numbers.</b> <code>split</code> gives strings like <code>\"72\"</code>, so convert each one with <code>Number()</code> and <code>push</code> it into a new array.</p>", code: c`const text = "72,95,60,88,45";
const marks = [];
for (const part of text.split(",")) {
  marks.push(Number(part));
}` },
        { html: "<p><b>One loop, three patterns.</b> Keep a sum, a best and a counter while you walk through the marks.</p>", code: c`let sum = 0;
let best = marks[0];
let passed = 0;
for (const m of marks) {
  sum += m;
  if (m > best) best = m;
  if (m >= 50) passed++;
}` },
        { html: "<p><b>Print the report.</b> The average is the sum divided by <code>marks.length</code>.</p>", code: c`console.log("Students:", marks.length);
console.log("Average:", sum / marks.length);` },
      ],
      code: c`const text = "72,95,60,88,45";
const marks = [];
for (const part of text.split(",")) {
  marks.push(Number(part));
}

let sum = 0;
let best = marks[0];
let passed = 0;
for (const m of marks) {
  sum += m;
  if (m > best) best = m;
  if (m >= 50) passed++;
}

console.log("Students:", marks.length);
console.log("Average:", sum / marks.length);
console.log("Best:", best);
console.log("Passed:", passed);` },
  ],
  mistakes: [
    { title: "Starting to count at 1", html: "The first item is at index 0. <code>arr[1]</code> is the <b>second</b> item.", wrong: c`const top = ["Sara", "Omar", "Lama"];
console.log(top[1]); // wanted the first: Sara`, right: c`const top = ["Sara", "Omar", "Lama"];
console.log(top[0]);` },
    { title: "<= length in the loop", html: "The last index is <code>length - 1</code>. With <code>&lt;=</code> the loop goes one step too far and reads <code>undefined</code>.", wrong: c`const a = [5, 6, 7];
for (let i = 0; i <= a.length; i++) {
  console.log(a[i]);
}`, right: c`const a = [5, 6, 7];
for (let i = 0; i < a.length; i++) {
  console.log(a[i]);
}` },
    { title: "Last item with arr[arr.length]", html: "<code>arr[arr.length]</code> is one past the end, so it is always <code>undefined</code>.", wrong: c`const a = [1, 2, 3];
console.log(a[a.length]);`, right: c`const a = [1, 2, 3];
console.log(a[a.length - 1]);` },
    { title: "Forgetting that split gives strings", html: "<code>\"3,4\".split(\",\")</code> gives <code>['3', '4']</code> — strings. Adding them glues text. Convert with <code>Number()</code> first.", wrong: c`const parts = "3,4".split(",");
console.log(parts[0] + parts[1]); // 34`, right: c`const parts = "3,4".split(",");
console.log(Number(parts[0]) + Number(parts[1])); // 7` },
  ],
  tricks: [
    { title: "Build a list step by step", html: "Start with an empty array <code>[]</code> and <code>push</code> into it inside a loop.", code: c`const evens = [];
for (let i = 2; i <= 10; i += 2) {
  evens.push(i);
}
console.log(evens);` },
    { title: "Reverse a word with split and join", html: "<code>split(\"\")</code> → letters, <code>.reverse()</code> flips the array, <code>join(\"\")</code> glues back.", code: c`const word = "level";
console.log(word.split("").reverse().join(""));
console.log("JS30".split("").reverse().join(""));` },
    { title: "Count words in a sentence", html: "Split on spaces and read the length.", code: c`const sentence = "Practice a little every day";
console.log(sentence.split(" ").length, "words");` },
  ],
  practice: [
    { t: "try", title: "Make it yours", html: "<p>Change the playlist to your own favourite songs. Add one with <code>push</code>, remove the first with <code>shift</code>, and print the playlist and its length.</p>", code: c`const playlist = ["Song A", "Song B", "Song C"];
playlist.push("Song D");
console.log(playlist);
console.log("Songs:", playlist.length);` },
    { t: "predict", code: c`const a = ["x", "y", "z"];
a[1] = "Y";
console.log(a, a.length);`, explain: "<p>Assigning to index 1 replaces <code>\"y\"</code> with <code>\"Y\"</code>. The length stays 3.</p>" },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`const colors = ["red", "green", "blue"];
console.log(colors.indexOf("blue"));`, answers: ["2"], run: true, e: "red is 0, green is 1, blue is 2.", placeholder: "type the output" },
    { t: "parsons", title: "Find the longest name", prompt: "Put the lines in order to print the longest name in the list.", lines: [c`const names = ["Ali", "Abdullah", "Reem"];`, c`let longest = names[0];`, c`for (const n of names) {`, c`  if (n.length > longest.length) longest = n;`, c`}`, c`console.log(longest);`], distractors: [c`for (let i = 0; i <= names.length; i++) {`], explain: "The max pattern again, but comparing lengths. Output: <code>Abdullah</code>." },
    { t: "predict", code: c`const stack = [1, 2, 3];
const x = stack.pop();
stack.push(x * 10);
console.log(stack);`, explain: "<p><code>pop</code> removes and returns 3. Then 30 is pushed: <code>[1, 2, 30]</code>.</p>" },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`const parts = "2026-10-16".split("-");
console.log(parts[1]);`, answers: ["10"], run: true, e: "The string is cut at each dash: ['2026', '10', '16']. Index 1 is `10`.", placeholder: "type the output" },
    { t: "try", title: "Visualize the max pattern", html: "<p>Press <b>Visualize</b> and watch <code>best</code> change only when a bigger score appears.</p>", code: c`const scores = [12, 30, 25, 41, 8];
let best = scores[0];
for (const s of scores) {
  if (s > best) {
    best = s;
  }
}
console.log("Best score:", best);` },
  ],
  exercises: [
    { id: "first-last", lvl: "seed", title: "First and last", prompt: "<p>Write <code>firstAndLast(arr)</code> that returns a string with the first item, a space and the last item. Example: <code>firstAndLast([\"a\", \"b\", \"c\"])</code> returns <code>a c</code>.</p>", hint: "First: <code>arr[0]</code>. Last: <code>arr[arr.length - 1]</code>.",
      tests: [{ after: c`console.log(firstAndLast(["a", "b", "c"]));`, expected: "a c" }, { after: c`console.log(firstAndLast([10, 20, 30, 40, 50]));`, expected: "10 50" }, { after: c`console.log(firstAndLast(["only"]));`, expected: "only only" }],
      solutions: [{ name: "Template", code: c`function firstAndLast(arr) {
  return ¦#{arr[0]} #{arr[arr.length - 1]}¦;
}` }, { name: "Arrow", code: c`const firstAndLast = arr => arr[0] + " " + arr[arr.length - 1];` }] },
    { id: "shopping", lvl: "seed", title: "Shopping list", prompt: "<p>Start with <code>const list = [\"bread\", \"milk\"];</code>. Add <code>eggs</code> at the end and <code>dates</code> at the start, then print the list. The output must be:</p><pre class=\"code-static\">['dates', 'bread', 'milk', 'eggs']</pre>", starter: c`const list = ["bread", "milk"];
`, hint: "<code>push</code> adds at the end, <code>unshift</code> at the start.",
      tests: [{ expected: "['dates', 'bread', 'milk', 'eggs']" }],
      solutions: [{ name: "push + unshift", code: c`const list = ["bread", "milk"];
list.push("eggs");
list.unshift("dates");
console.log(list);` }] },
    { id: "sum-array", lvl: "star", title: "Sum of a list", prompt: "<p>Write <code>sum(nums)</code> that returns the total of all numbers in the array. An empty array gives 0.</p>", hint: "The sum pattern: <code>let total = 0;</code> then add each item in a loop, then return <code>total</code> after the loop.",
      tests: [{ after: c`console.log(sum([1, 2, 3]));`, expected: "6" }, { after: c`console.log(sum([10, -4, 20, 5]));`, expected: "31" }, { after: c`console.log(sum([]));`, expected: "0" }],
      solutions: [{ name: "for...of", code: c`function sum(nums) {
  let total = 0;
  for (const n of nums) {
    total += n;
  }
  return total;
}` }, { name: "index loop", code: c`function sum(nums) {
  let total = 0;
  for (let i = 0; i < nums.length; i++) {
    total += nums[i];
  }
  return total;
}` }] },
    { id: "max-array", lvl: "star", title: "Highest mark", prompt: "<p>Write <code>highest(marks)</code> that returns the biggest number in a non-empty array. Do not use <code>Math.max</code>.</p>", hint: "Start with <code>let best = marks[0];</code> — not 0, because all marks might be negative.",
      tests: [{ after: c`console.log(highest([70, 95, 88]));`, expected: "95" }, { after: c`console.log(highest([3]));`, expected: "3" }, { after: c`console.log(highest([-5, -2, -9]));`, expected: "-2" }],
      solutions: [{ name: "Max pattern", code: c`function highest(marks) {
  let best = marks[0];
  for (const m of marks) {
    if (m > best) best = m;
  }
  return best;
}` }] },
    { id: "count-pass", lvl: "star", title: "Who passed?", prompt: "<p>Write <code>passedNames(names, marks)</code>: the two arrays have the same length (<code>marks[i]</code> is the mark of <code>names[i]</code>). Return a string with the names of everyone with 50 or more, joined by <code>, </code>. Example: <code>passedNames([\"Ali\", \"Mona\", \"Fay\"], [40, 75, 90])</code> returns <code>Mona, Fay</code>.</p>", hint: "Use an index loop so you can read <code>names[i]</code> and <code>marks[i]</code> together. Push the passing names into a new array, then <code>join(\", \")</code>.",
      tests: [{ after: c`console.log(passedNames(["Ali", "Mona", "Fay"], [40, 75, 90]));`, expected: "Mona, Fay" }, { after: c`console.log(passedNames(["Sara", "Omar"], [50, 49]));`, expected: "Sara" }, { after: c`console.log(passedNames(["A", "B", "C", "D"], [99, 100, 51, 60]));`, expected: "A, B, C, D" }],
      solutions: [{ name: "Push and join", code: c`function passedNames(names, marks) {
  const passed = [];
  for (let i = 0; i < names.length; i++) {
    if (marks[i] >= 50) {
      passed.push(names[i]);
    }
  }
  return passed.join(", ");
}` }] },
    { id: "fix-average", lvl: "fire", debug: true, title: "Fix the average", prompt: "<p>This program should print <code>Average: 85</code> for the marks 80, 90, 85. It has <b>three</b> bugs. Fix them.</p>", starter: c`const marks = [80, 90, 85];
let sum = 0;
for (let i = 1; i <= marks.length; i++) {
  sum += marks[i];
}
console.log("Average:", sum / marks.length - 1);`,
      hint: "Where do indexes start? Where do they stop? And what is the average of a list?",
      tests: [{ expected: "Average: 85" }],
      solutions: [{ name: "Fixed", code: c`const marks = [80, 90, 85];
let sum = 0;
for (let i = 0; i < marks.length; i++) {
  sum += marks[i];
}
console.log("Average:", sum / marks.length);`, note: "Bug 1: start at index 0. Bug 2: <code>&lt;</code> not <code>&lt;=</code> (index 3 is <code>undefined</code>, which makes the sum <code>NaN</code>). Bug 3: the average is <code>sum / length</code>; the <code>- 1</code> does not belong there." }] },
    { id: "word-stats", lvl: "fire", title: "Sentence stats", prompt: "<p>Write <code>wordStats(sentence)</code> that returns a string <code>N words, longest: W</code>, where N is the number of words (separated by single spaces) and W is the longest word (the first one if there is a tie). Example: <code>wordStats(\"I like coding games\")</code> returns <code>4 words, longest: coding</code>.</p>", hint: "<code>split(\" \")</code>, then the max pattern on <code>.length</code>. Use <code>&gt;</code> (not <code>&gt;=</code>) so the first longest word wins.",
      tests: [{ after: c`console.log(wordStats("I like coding games"));`, expected: "4 words, longest: coding" }, { after: c`console.log(wordStats("Hello"));`, expected: "1 words, longest: Hello" }, { after: c`console.log(wordStats("cat dog sun"));`, expected: "3 words, longest: cat" }],
      solutions: [{ name: "split + max", code: c`function wordStats(sentence) {
  const words = sentence.split(" ");
  let longest = words[0];
  for (const w of words) {
    if (w.length > longest.length) {
      longest = w;
    }
  }
  return ¦#{words.length} words, longest: #{longest}¦;
}` }],
      twist: "Make it say <code>1 word</code> (no s) when there is only one word — a ternary is perfect here." },
  ],
  quiz: [
    { q: "What is the index of the first item in an array?", o: ["`0`", "`1`", "`-1`"], a: 0, e: "Arrays count from 0." },
    { q: "What does this show?", code: c`const a = [5, 10, 15];
console.log(a[a.length - 1]);`, o: ["`15`", "`10`", "`3`", "`undefined`"], a: 0, e: "length is 3, so the last index is 2: 15." },
    { q: "What does this show?", code: c`const a = ["a", "b"];
console.log(a[5]);`, o: ["`undefined`", "`b`", "an error", "`null`"], a: 0, e: "A missing index gives `undefined`, not an error." },
    { q: "What does this show?", code: c`const q = ["x", "y", "z"];
q.pop();
q.unshift("w");
console.log(q);`, o: ["`['w', 'x', 'y']`", "`['x', 'y', 'w']`", "`['w', 'y', 'z']`", "`['x', 'y']`"], a: 0, e: "`pop` removes \"z\", then `unshift` adds \"w\" at the start." },
    { q: "What does this show?", code: c`console.log([3, 7, 9].indexOf(4));`, o: ["`-1`", "`0`", "`undefined`", "`false`"], a: 0, e: "`indexOf` returns -1 when the value is not found." },
    { q: "What does this show?", code: c`console.log("a b c".split(" ").join("+"));`, o: ["`a+b+c`", "`a b c`", "`['a', 'b', 'c']`", "`abc`"], a: 0, e: "Split on spaces, then glue with `+`." },
  ],
  puzzle: { title: "The shrinking train", q: "<p>Without running it: what does this program show?</p>", code: c`const t = [1, 2, 3, 4, 5];
t.shift();
t.pop();
t[0] = t[t.length - 1] * 10;
console.log(t.join(""));`, answers: ["4034"], run: true, hint: "After `shift` and `pop` the array is [2, 3, 4]. What is the last item?", e: "[2, 3, 4]: the last item is 4, so index 0 becomes 40. The array is [40, 3, 4], joined with nothing: `4034`." },
  cards: [
    { f: "How do you make an array?", b: "Square brackets, items separated by commas: `const a = [1, 2, 3];`" },
    { f: "How do you get the last item?", b: "`arr[arr.length - 1]` — indexes start at 0." },
    { f: "push / pop / unshift / shift?", b: "push / pop work at the **end**; unshift / shift work at the **start**." },
    { f: "includes vs indexOf?", b: "`includes` → true / false. `indexOf` → the index, or `-1` if not found." },
    { f: "split vs join?", b: "`\"a,b\".split(\",\")` → `['a', 'b']`. `['a', 'b'].join(\"-\")` → `\"a-b\"`." },
  ],
  remember: [
    "An array keeps a list of values in one variable: `[1, 2, 3]`.",
    "Indexes start at 0; the last index is `length - 1`; a missing index gives `undefined`.",
    "push / pop at the end, unshift / shift at the start; you can change an item with `arr[i] = x`.",
    "`includes` and `indexOf` search; `-1` means not found.",
    "Loop with `for (let i = 0; i < arr.length; i++)` or `for (const x of arr)`. Patterns: sum, average, max, count.",
    "`split` turns a string into an array; `join` turns an array into a string.",
  ],
};
})();
