window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[20] = {
  title: "Review + project: Grades manager",
  intro: "Week 3 gave you the three tools that organise real programs, {{name}}: <b>functions</b> to name your steps, <b>arrays</b> to hold lists, and <b>objects</b> to hold labelled records. Today you review each one quickly, then put them all together in a project a teacher could really use: a <b>grades manager</b> that works out averages, letters and the top student, and prints a neat report.",
  goals: [
    "Recall the key idea of every lesson of Week 3 and test yourself on it",
    "Model real data as an array of objects that contain arrays",
    "Split a problem into small functions that each return one answer",
    "Combine functions, array methods and objects into one complete program",
    "Print a neat, lined-up table in the console",
  ],
  learn: [
    { t: "h", text: "Week 3 recap" },
    { t: "p", html: "<p>Before the project, a quick tour of the week. For each day: the big idea, a tiny example and one question. If a question feels hard, open that day again for ten minutes — that is time well spent.</p>" },

    { t: "h", text: "Day 15 — Functions: parameters and return" },
    { t: "p", html: "<p>A function is a named recipe you can run again and again. <b>Parameters</b> are the ingredients you hand in; <code>return</code> hands the result back to whoever called it. A function that only prints cannot give its answer to the rest of your program — a function that returns can.</p>" },
    { t: "code", code: c`function area(width, height) {
  return width * height;
}
const room = area(4, 5);
console.log("Room:", room, "m²");` },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`function addBonus(mark, bonus = 5) {
  return mark + bonus;
}
console.log(addBonus(70), addBonus(70, 10));`, answers: ["75 80"], run: true, e: "The first call uses the default `bonus = 5`; the second passes 10 instead.", hint: "A default parameter is used only when you do not pass that argument.", placeholder: "type the output" },

    { t: "h", text: "Day 16 — Arrow functions and scope" },
    { t: "p", html: "<p>An arrow function is a shorter way to write a function: <code>n =&gt; n * 2</code>. Without braces, it returns its value automatically. <b>Scope</b> is where a variable can be seen: a variable created inside a function or a block <code>{ }</code> lives only there, which keeps your functions from stepping on each other.</p>" },
    { t: "code", code: c`const half = n => n / 2;
console.log(half(9));

function test() {
  const secret = 42;  // lives only inside test
  return secret;
}
console.log(test());` },
    { t: "check", q: "A variable is created with `let` **inside** a function. Can code **outside** the function use it?", o: ["No — it only exists inside that function", "Yes, always", "Only if the function returned it", "Only if its name starts with a capital"], a: 0, e: "Variables made inside a function (or any block) are local to it. Outside, you get `ReferenceError`. If you need the value outside, `return` it." },

    { t: "h", text: "Day 17 — Arrays" },
    { t: "p", html: "<p>An array is an ordered list in square brackets. Positions start at <b>0</b>, <code>length</code> counts the items, and <code>push</code> / <code>pop</code> add or remove at the end. Loop through an array with <code>for...of</code> when you need every item.</p>" },
    { t: "code", code: c`const bag = ["pen", "book"];
bag.push("ruler");
console.log(bag[0], bag.length);
console.log(bag.includes("book"));` },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`const timetable = ["Math", "Art", "PE", "Science"];
console.log(timetable[timetable.length - 1]);`, answers: ["Science"], run: true, e: "`length` is 4, so the last index is 3: `Science`.", hint: "The last index is always `length - 1`.", placeholder: "type the output" },

    { t: "h", text: "Day 18 — Array methods" },
    { t: "p", html: "<p><code>map</code> changes every item, <code>filter</code> keeps some, <code>find</code> returns the first match, and <code>reduce</code> adds everything up. Each takes a small callback that decides about one item. For numbers, sort with <code>(a, b) =&gt; a - b</code>, and copy with <code>[...arr]</code> before sorting if you need the original order.</p>" },
    { t: "code", code: c`const marks = [60, 95, 45, 80];
console.log(marks.filter(m => m >= 50).map(m => m + 5));
console.log(marks.reduce((acc, m) => acc + m, 0));
console.log([...marks].sort((a, b) => b - a));` },
    { t: "check", q: "What does this show?", code: c`console.log([2, 4, 6].map(n => n / 2));`, o: ["`[1, 2, 3]`", "`[2, 4, 6]`", "`6`", "`[true, true, true]`"], a: 0, e: "`map` builds a new array with each item divided by 2." },

    { t: "h", text: "Day 19 — Objects" },
    { t: "p", html: "<p>An object stores labelled data: <code>{ name: \"Huda\", age: 15 }</code>. Read with a dot, or with brackets when the key is in a variable. A function inside an object is a method, and <code>this</code> is the object. An <b>array of objects</b> is a list of records — exactly what today's project uses.</p>" },
    { t: "code", code: c`const s = { name: "Huda", marks: [80, 90] };
s.city = "Dammam";
console.log(s);
console.log(s.marks[1]);` },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`const team = [{ name: "Ali", goals: 2 }, { name: "Badr", goals: 6 }];
console.log(team.find(p => p.goals > 3).name);`, answers: ["Badr"], run: true, e: "`find` returns the first object with more than 3 goals (Badr's), and `.name` reads his name.", placeholder: "type the output" },

    { t: "h", text: "The project: Grades manager" },
    { t: "p", html: "<p>A teacher has a few students, each with three test marks. She wants to know each student's average and letter grade, who is top of the class, and a clean report she can copy into a message to parents. You will build it from four small functions. Each function does <b>one</b> job and <b>returns</b> its answer, so you can test it alone and then combine them.</p><p>The letter scale: <b>A</b> for 90 or more, <b>B</b> for 80 or more, <b>C</b> for 70 or more, <b>D</b> for 60 or more, otherwise <b>F</b>. Averages are rounded to one decimal place.</p>" },
    { t: "steps", title: "Build the grades manager", problem: "<p>From this data:</p><pre class=\"code-static\">const students = [\n  { name: \"Sara\", marks: [92, 88, 95] },\n  { name: \"Omar\", marks: [70, 65, 80] },\n  { name: \"Lina\", marks: [85, 90, 78] },\n  { name: \"Fahad\", marks: [55, 60, 48] },\n];</pre><p>print this report:</p><pre class=\"code-static\">Name      Avg  Grade\n--------------------\nSara     91.7  A\nOmar     71.7  C\nLina     84.3  B\nFahad    54.3  F\n--------------------\nTop student: Sara (91.7)</pre>",
      steps: [
        { html: "<p><b>Understand the data.</b> An array of objects; each object has a <code>name</code> string and a <code>marks</code> array. So <code>students[0].marks[2]</code> is Sara's third mark (95). Plan four functions: <code>average(student)</code>, <code>letter(avg)</code>, <code>topStudent(list)</code>, <code>report(list)</code>.</p>" },
        { html: "<p><b>average(student).</b> Add the marks with <code>reduce</code>, divide by how many there are, and round to one decimal: multiply by 10, <code>Math.round</code>, divide by 10.</p>", code: c`function average(student) {
  const sum = student.marks.reduce((acc, m) => acc + m, 0);
  const avg = sum / student.marks.length;
  return Math.round(avg * 10) / 10;
}` },
        { html: "<p><b>letter(avg).</b> An <code>if / else if</code> chain from the top grade down (Day 9). Because we check the highest first, each <code>else if</code> only needs one condition.</p>", code: c`function letter(avg) {
  if (avg >= 90) return "A";
  else if (avg >= 80) return "B";
  else if (avg >= 70) return "C";
  else if (avg >= 60) return "D";
  else return "F";
}` },
        { html: "<p><b>topStudent(list).</b> The \"best so far\" pattern: start with the first student, walk through the list, replace the best when someone has a higher average. Return the whole <b>object</b>, so the caller can read any property.</p>", code: c`function topStudent(list) {
  let best = list[0];
  for (const s of list) {
    if (average(s) > average(best)) best = s;
  }
  return best;
}` },
        { html: "<p><b>report(list).</b> To line up columns, use two string methods: <code>\"Sara\".padEnd(8)</code> adds spaces on the <b>right</b> until the text is 8 characters long, and <code>\"91.7\".padStart(5)</code> adds spaces on the <b>left</b>. Numbers must become strings first with <code>String()</code>.</p>", code: c`function report(list) {
  console.log("Name".padEnd(8) + "Avg".padStart(5) + "  Grade");
  console.log("-".repeat(20));
  for (const s of list) {
    const avg = average(s);
    console.log(s.name.padEnd(8) + String(avg).padStart(5) + "  " + letter(avg));
  }
  console.log("-".repeat(20));
  const top = topStudent(list);
  console.log(¦Top student: #{top.name} (#{average(top)})¦);
}` },
        { html: "<p><b>Run it all.</b> Put the data and the four functions together and call <code>report(students)</code>. Then try adding yourself to the list!</p>" },
      ],
      code: c`const students = [
  { name: "Sara", marks: [92, 88, 95] },
  { name: "Omar", marks: [70, 65, 80] },
  { name: "Lina", marks: [85, 90, 78] },
  { name: "Fahad", marks: [55, 60, 48] },
];

function average(student) {
  const sum = student.marks.reduce((acc, m) => acc + m, 0);
  const avg = sum / student.marks.length;
  return Math.round(avg * 10) / 10;
}

function letter(avg) {
  if (avg >= 90) return "A";
  else if (avg >= 80) return "B";
  else if (avg >= 70) return "C";
  else if (avg >= 60) return "D";
  else return "F";
}

function topStudent(list) {
  let best = list[0];
  for (const s of list) {
    if (average(s) > average(best)) best = s;
  }
  return best;
}

function report(list) {
  console.log("Name".padEnd(8) + "Avg".padStart(5) + "  Grade");
  console.log("-".repeat(20));
  for (const s of list) {
    const avg = average(s);
    console.log(s.name.padEnd(8) + String(avg).padStart(5) + "  " + letter(avg));
  }
  console.log("-".repeat(20));
  const top = topStudent(list);
  console.log(¦Top student: #{top.name} (#{average(top)})¦);
}

report(students);` },
    { t: "tip", title: "Why four small functions?", html: "<p>Each function can be tested alone: <code>letter(85)</code> must be <code>\"B\"</code>, whatever the rest of the program does. When something goes wrong, you know which small piece to look at. And <code>report</code> reads almost like English, because the hard work hides behind good names.</p>" },
  ],
  practice: [
    { t: "predict", code: c`const s = { name: "Noor", marks: [90, 70] };
s.marks.push(80);
console.log(s.marks.length, s.marks.reduce((a, m) => a + m, 0) / s.marks.length);`, explain: "<p><code>push</code> adds a third mark, so the length is <code>3</code>. The sum is 240, and 240 / 3 = <code>80</code>.</p>" },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`console.log("Ali".padEnd(6) + "|");`, answers: ["Ali   |"], run: true, e: "`padEnd(6)` adds spaces on the right until the string is 6 characters long: `Ali` plus 3 spaces.", placeholder: "type the output" },
    { t: "parsons", title: "The letter function", prompt: "Arrange the lines to build <code>letter(avg)</code>. The highest grade must be checked first.", lines: [c`function letter(avg) {`, c`  if (avg >= 90) return "A";`, c`  else if (avg >= 80) return "B";`, c`  else if (avg >= 70) return "C";`, c`  else return "F";`, c`}`], distractors: [c`  if (avg >= 70) return "C";`], explain: "Checking from the top grade down means each condition only needs one comparison. If <code>avg &gt;= 70</code> came first, a 95 would get a C!" },
    { t: "try", title: "Add yourself", html: "<p>Here is the finished manager. Add an object for <b>yourself</b> with three marks, and a fourth mark for every student. Watch the report update.</p>", code: c`const students = [
  { name: "Sara", marks: [92, 88, 95] },
  { name: "Omar", marks: [70, 65, 80] },
];
const average = s => Math.round(s.marks.reduce((a, m) => a + m, 0) / s.marks.length * 10) / 10;
for (const s of students) {
  console.log(s.name.padEnd(8) + String(average(s)).padStart(5));
}` },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`const list = [{ n: "A", avg: 72 }, { n: "B", avg: 91 }, { n: "C", avg: 85 }];
const sorted = [...list].sort((a, b) => b.avg - a.avg);
console.log(sorted.map(s => s.n).join(""));`, answers: ["BCA"], run: true, e: "Sorting by `b.avg - a.avg` puts the highest average first: B (91), C (85), A (72).", hint: "`b - a` means big to small.", placeholder: "three letters" },
  ],
  exercises: [
    { id: "d20-average", lvl: "seed", title: "Milestone 1: average", prompt: "<p>Write <code>average(student)</code>. A student looks like <code>{ name: \"Sara\", marks: [92, 88, 95] }</code>. Return the average of the marks, <b>rounded to one decimal</b>.</p><pre class=\"code-static\">average({ name: \"Sara\", marks: [92, 88, 95] })  →  91.7\naverage({ name: \"Ali\", marks: [80, 90] })        →  85</pre>", starter: c`function average(student) {
  // your code here
}`,
      tests: [{ after: c`console.log(average({ name: "Sara", marks: [92, 88, 95] }));`, expected: "91.7" }, { after: c`console.log(average({ name: "Ali", marks: [80, 90] }));`, expected: "85" }, { after: c`console.log(average({ name: "Omar", marks: [70, 65, 80] }));`, expected: "71.7" }],
      hint: "Sum with <code>reduce</code> (or a loop), divide by <code>student.marks.length</code>, then <code>Math.round(avg * 10) / 10</code>.",
      solutions: [{ name: "reduce", code: c`function average(student) {
  const sum = student.marks.reduce((acc, m) => acc + m, 0);
  return Math.round(sum / student.marks.length * 10) / 10;
}`, note: "Multiplying by 10 before rounding keeps one decimal." }, { name: "Loop", code: c`function average(student) {
  let sum = 0;
  for (const m of student.marks) {
    sum += m;
  }
  const avg = sum / student.marks.length;
  return Math.round(avg * 10) / 10;
}`, note: "The same with a <code>for...of</code> loop." }] },
    { id: "d20-letter", lvl: "seed", title: "Milestone 2: letter", prompt: "<p>Write <code>letter(avg)</code>: return <code>\"A\"</code> for 90 or more, <code>\"B\"</code> for 80 or more, <code>\"C\"</code> for 70 or more, <code>\"D\"</code> for 60 or more, otherwise <code>\"F\"</code>.</p>", starter: c`function letter(avg) {
  // your code here
}`,
      tests: [{ after: c`console.log(letter(91.7), letter(90), letter(89.9));`, expected: "A A B" }, { after: c`console.log(letter(80), letter(71.7), letter(60));`, expected: "B C D" }, { after: c`console.log(letter(59.9), letter(0));`, expected: "F F" }],
      hint: "Check from the top grade down: <code>if (avg &gt;= 90) return \"A\";</code> then <code>else if (avg &gt;= 80)</code>…",
      solutions: [{ name: "if / else if", code: c`function letter(avg) {
  if (avg >= 90) return "A";
  else if (avg >= 80) return "B";
  else if (avg >= 70) return "C";
  else if (avg >= 60) return "D";
  else return "F";
}`, note: "The order matters: highest first." }, { name: "Early returns", code: c`function letter(avg) {
  if (avg >= 90) return "A";
  if (avg >= 80) return "B";
  if (avg >= 70) return "C";
  if (avg >= 60) return "D";
  return "F";
}`, note: "<code>return</code> leaves the function at once, so the <code>else</code> words are not needed." }] },
    { id: "d20-top", lvl: "star", title: "Milestone 3: top student", prompt: "<p>Write <code>topStudent(list)</code> that returns the <b>student object</b> with the highest average. Your <code>average</code> function from Milestone 1 is already in the starter. If two students tie, return the first one.</p>", starter: c`function average(student) {
  const sum = student.marks.reduce((acc, m) => acc + m, 0);
  return Math.round(sum / student.marks.length * 10) / 10;
}

function topStudent(list) {
  // your code here
}`,
      tests: [{ after: c`console.log(topStudent([{ name: "Omar", marks: [70, 65] }, { name: "Sara", marks: [92, 95] }, { name: "Lina", marks: [85, 90] }]).name);`, expected: "Sara" }, { after: c`console.log(topStudent([{ name: "Huda", marks: [99] }]));`, expected: "{name: 'Huda', marks: [99]}" }, { after: c`console.log(topStudent([{ name: "A", marks: [80] }, { name: "B", marks: [80] }, { name: "C", marks: [70, 100] }]).name);`, expected: "C" }],
      hint: "Keep <code>let best = list[0];</code>, loop, and replace <code>best</code> when <code>average(s) &gt; average(best)</code>. Use <code>&gt;</code>, not <code>&gt;=</code>, so the first of a tie stays.",
      solutions: [{ name: "Best so far", code: c`function average(student) {
  const sum = student.marks.reduce((acc, m) => acc + m, 0);
  return Math.round(sum / student.marks.length * 10) / 10;
}

function topStudent(list) {
  let best = list[0];
  for (const s of list) {
    if (average(s) > average(best)) best = s;
  }
  return best;
}`, note: "Return the object, not the name — the caller decides what to show." }, { name: "Sort a copy", code: c`function average(student) {
  const sum = student.marks.reduce((acc, m) => acc + m, 0);
  return Math.round(sum / student.marks.length * 10) / 10;
}

function topStudent(list) {
  return [...list].sort((a, b) => average(b) - average(a))[0];
}`, note: "Sort a copy from highest to lowest average and take the first. (JavaScript's sort keeps tied items in their original order.)" }] },
    { id: "d20-add-mark", lvl: "star", title: "Add a mark", prompt: "<p>A new test was marked. Write <code>addMark(student, mark)</code> that adds <code>mark</code> to the end of the student's <code>marks</code> array and <b>returns</b> how many marks the student has now.</p><pre class=\"code-static\">const s = { name: \"Ali\", marks: [80, 90] };\naddMark(s, 75)  →  3\ns.marks         →  [80, 90, 75]</pre>", starter: c`function addMark(student, mark) {
  // your code here
}`,
      tests: [{ after: c`const s1 = { name: "Ali", marks: [80, 90] };
console.log(addMark(s1, 75));
console.log(s1.marks);`, expected: "3\n[80, 90, 75]" }, { after: c`const s2 = { name: "Dana", marks: [] };
addMark(s2, 100);
console.log(addMark(s2, 50), s2.marks);`, expected: "2 [100, 50]" }],
      hint: "<code>student.marks</code> is an array, so <code>push</code> works on it. Then return <code>student.marks.length</code>.",
      solutions: [{ name: "push + length", code: c`function addMark(student, mark) {
  student.marks.push(mark);
  return student.marks.length;
}`, note: "The object is changed in place, so the caller sees the new mark." }, { name: "push returns the length", code: c`function addMark(student, mark) {
  return student.marks.push(mark);
}`, note: "A little secret: <code>push</code> itself returns the new length." }] },
    { id: "d20-ranking", lvl: "star", title: "Class ranking", prompt: "<p>Write <code>ranking(list)</code> that returns an array of <b>names</b>, from the highest average to the lowest, <b>without changing</b> the original list. <code>average</code> is in the starter.</p><pre class=\"code-static\">ranking([{ name: \"Omar\", marks: [70] }, { name: \"Sara\", marks: [95] }, { name: \"Lina\", marks: [85] }])\n→  ['Sara', 'Lina', 'Omar']</pre>", starter: c`function average(student) {
  const sum = student.marks.reduce((acc, m) => acc + m, 0);
  return Math.round(sum / student.marks.length * 10) / 10;
}

function ranking(list) {
  // your code here
}`,
      tests: [{ after: c`const cls = [{ name: "Omar", marks: [70] }, { name: "Sara", marks: [95] }, { name: "Lina", marks: [85] }];
console.log(ranking(cls));
console.log(cls[0].name);`, expected: "['Sara', 'Lina', 'Omar']\nOmar" }, { after: c`console.log(ranking([{ name: "X", marks: [50, 60] }, { name: "Y", marks: [100, 0] }, { name: "Z", marks: [90, 91] }]));`, expected: "['Z', 'X', 'Y']" }],
      hint: "Copy with <code>[...list]</code>, sort with <code>(a, b) =&gt; average(b) - average(a)</code>, then <code>map</code> to the names.",
      solutions: [{ name: "Copy, sort, map", code: c`function average(student) {
  const sum = student.marks.reduce((acc, m) => acc + m, 0);
  return Math.round(sum / student.marks.length * 10) / 10;
}

function ranking(list) {
  return [...list]
    .sort((a, b) => average(b) - average(a))
    .map(s => s.name);
}`, note: "A chain of three steps. The copy keeps the teacher's original order safe." }] },
    { id: "d20-report", lvl: "fire", title: "Milestone 4: the report", prompt: "<p>Write <code>report(list)</code> that <b>prints</b> the table exactly like this (Name padded to 8, Avg padded on the left to 5, two spaces, the letter):</p><pre class=\"code-static\">Name      Avg  Grade\n--------------------\nSara     91.7  A\nFahad    54.3  F\n--------------------\nTop student: Sara (91.7)</pre><p>The starter already has <code>average</code>, <code>letter</code> and <code>topStudent</code> from the earlier milestones.</p>", starter: c`function average(student) {
  const sum = student.marks.reduce((acc, m) => acc + m, 0);
  return Math.round(sum / student.marks.length * 10) / 10;
}

function letter(avg) {
  if (avg >= 90) return "A";
  if (avg >= 80) return "B";
  if (avg >= 70) return "C";
  if (avg >= 60) return "D";
  return "F";
}

function topStudent(list) {
  let best = list[0];
  for (const s of list) {
    if (average(s) > average(best)) best = s;
  }
  return best;
}

function report(list) {
  // your code here
}`,
      tests: [{ after: c`report([{ name: "Sara", marks: [92, 88, 95] }, { name: "Fahad", marks: [55, 60, 48] }]);`, expected: "Name      Avg  Grade\n--------------------\nSara     91.7  A\nFahad    54.3  F\n--------------------\nTop student: Sara (91.7)" },
        { after: c`report([{ name: "Omar", marks: [70, 65, 80] }, { name: "Lina", marks: [85, 90, 78] }, { name: "Huda", marks: [100] }]);`, expected: "Name      Avg  Grade\n--------------------\nOmar     71.7  C\nLina     84.3  B\nHuda      100  A\n--------------------\nTop student: Huda (100)" }],
      hint: "Header: <code>\"Name\".padEnd(8) + \"Avg\".padStart(5) + \"  Grade\"</code>. Each row: <code>s.name.padEnd(8) + String(avg).padStart(5) + \"  \" + letter(avg)</code>. The line is <code>\"-\".repeat(20)</code>.",
      solutions: [{ name: "padEnd / padStart", code: c`function average(student) {
  const sum = student.marks.reduce((acc, m) => acc + m, 0);
  return Math.round(sum / student.marks.length * 10) / 10;
}

function letter(avg) {
  if (avg >= 90) return "A";
  if (avg >= 80) return "B";
  if (avg >= 70) return "C";
  if (avg >= 60) return "D";
  return "F";
}

function topStudent(list) {
  let best = list[0];
  for (const s of list) {
    if (average(s) > average(best)) best = s;
  }
  return best;
}

function report(list) {
  console.log("Name".padEnd(8) + "Avg".padStart(5) + "  Grade");
  console.log("-".repeat(20));
  for (const s of list) {
    const avg = average(s);
    console.log(s.name.padEnd(8) + String(avg).padStart(5) + "  " + letter(avg));
  }
  console.log("-".repeat(20));
  const top = topStudent(list);
  console.log(¦Top student: #{top.name} (#{average(top)})¦);
}`, note: "Every column has a fixed width, so the rows line up whatever the name or number." }],
      twist: "Add a last line <code>Passed: 3 of 4</code>, counting the students whose letter is not F." },
    { id: "d20-fix-class", lvl: "fire", debug: true, title: "Fix the class average", prompt: "<p><code>classAverage(list)</code> should return the average of <b>all</b> marks of <b>all</b> students, rounded to one decimal. It has <b>three</b> bugs. Fix them.</p><pre class=\"code-static\">classAverage([{ name: \"A\", marks: [80, 90] }, { name: \"B\", marks: [70] }])  →  80</pre>",
      starter: c`function classAverage(list) {
  let sum = 0;
  let count = 0;
  for (const s in list) {
    for (const m of s.marks) {
      sum += m;
    }
    count += 1;
  }
  Math.round(sum / count * 10) / 10;
}

console.log(classAverage([{ name: "A", marks: [80, 90] }, { name: "B", marks: [70] }]));`,
      tests: [{ after: c`console.log(classAverage([{ name: "A", marks: [80, 90] }, { name: "B", marks: [70] }]));`, expected: "80" }, { after: c`console.log(classAverage([{ name: "C", marks: [50, 60, 70] }, { name: "D", marks: [95, 100] }]));`, expected: "75" }, { after: c`console.log(classAverage([{ name: "E", marks: [91, 92, 92] }]));`, expected: "91.7" }],
      hint: "Read the error first. Is <code>for...in</code> right for an array of objects? What should <code>count</code> count — students or marks? And does the function give its answer back?",
      solutions: [{ name: "Fixed", code: c`function classAverage(list) {
  let sum = 0;
  let count = 0;
  for (const s of list) {
    for (const m of s.marks) {
      sum += m;
      count += 1;
    }
  }
  return Math.round(sum / count * 10) / 10;
}`, note: "Bug 1: <code>for...in</code> gives the indexes (\"0\", \"1\"), not the objects — use <code>for...of</code>. Bug 2: <code>count</code> must grow once per <b>mark</b>, so it moves into the inner loop. Bug 3: the last line computed the answer but did not <code>return</code> it." }] },
  ],
  quiz: [
    { q: "What does this show?", code: c`const s = { name: "Ali", marks: [60, 80] };
console.log(s.marks[0] + s.marks[1]);`, o: ["`140`", "`6080`", "`[60, 80]`", "`undefined`"], a: 0, e: "`s.marks[0]` is 60 and `s.marks[1]` is 80; both are numbers, so `+` adds them." },
    { q: "Why does `letter(avg)` check `avg >= 90` **before** `avg >= 80`?", o: ["Because 95 is also >= 80, so the first true check must be the highest grade", "Because JavaScript reads conditions from the bottom", "It does not matter", "Because 90 is a bigger number to type"], a: 0, e: "An `if / else if` chain stops at the first true condition. Checking the highest grade first gives every mark its correct letter." },
    { q: "What does this show?", code: c`console.log(Math.round(84.333 * 10) / 10);`, o: ["`84.3`", "`84`", "`843`", "`84.33`"], a: 0, e: "84.333 × 10 = 843.33, rounded to 843, divided by 10 = 84.3." },
    { q: "What does this show?", code: c`console.log("7".padStart(3, "0"));`, o: ["`007`", "`700`", "`7`", "`  7`"], a: 0, e: "`padStart(3, \"0\")` fills on the left with zeros until the length is 3. (Without the second argument it fills with spaces.)" },
    { q: "What does this show?", code: c`const list = [{ n: "A", m: 70 }, { n: "B", m: 95 }];
console.log(list.filter(s => s.m >= 80).map(s => s.n));`, o: ["`['B']`", "`['A', 'B']`", "`[{n: 'B', m: 95}]`", "`B`"], a: 0, e: "`filter` keeps B's object, then `map` turns it into its name — still inside an array." },
    { q: "A function prints the average but does not `return` it. What does `const x = thatFunction(s);` store in `x`?", o: ["`undefined`", "the average", "`0`", "an error"], a: 0, e: "Printing is not returning. A function without `return` gives back `undefined`." },
  ],
  puzzle: { title: "Whose report?", q: "<p>Without running it: what does the last line show? Type the output exactly.</p>", code: c`const students = [
  { name: "Rami", marks: [80, 90] },
  { name: "Dana", marks: [100, 60] },
];
const avg = s => s.marks.reduce((a, m) => a + m, 0) / s.marks.length;
students[1].marks.push(110);
const best = [...students].sort((a, b) => avg(b) - avg(a))[0];
console.log(best.name, avg(best));`, answers: ["Dana 90"], run: true, hint: "Before the push, both averages are 85. What does Dana's average become with a third mark?", e: "Before the push both students average 85. After `push(110)`, Dana's marks are `[100, 60, 110]`: 270 / 3 = 90. Sorting from highest to lowest puts Dana first: `Dana 90`." },
  cards: [
    { f: "Function with `return` vs one that only prints?", b: "`return` gives the value back so the rest of the program can use it. Printing only shows it." },
    { f: "Round a number to one decimal?", b: "`Math.round(x * 10) / 10`." },
    { f: "How do you line up columns in the console?", b: "`text.padEnd(8)` adds spaces on the right; `String(num).padStart(5)` adds spaces on the left." },
    { f: "Find the best item in a list?", b: "\"Best so far\": `let best = list[0];` then loop and replace it when an item is better." },
    { f: "Sort objects by a number they hold?", b: "`[...list].sort((a, b) => b.score - a.score)` — biggest first, on a copy." },
  ],
  remember: [
    "Functions take parameters and **return** results; a function without `return` gives `undefined`.",
    "Arrow functions are short functions; variables inside a function or block stay there (scope).",
    "Arrays hold ordered lists (index from 0); objects hold labelled data (`obj.key`, `obj[key]`).",
    "`map`, `filter`, `find`, `reduce` and `sort((a, b) => a - b)` replace most loops over arrays.",
    "Real data is often an **array of objects** — loop with `for...of`, never `for...in`, over an array.",
    "Split a project into small functions that each do one job; test each one alone, then combine.",
  ],
};
})();
