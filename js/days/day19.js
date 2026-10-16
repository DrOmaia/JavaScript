window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[19] = {
  title: "Objects and arrays of objects",
  intro: "An array is great for a list of the same kind of thing. But how do you store <i>everything</i> about one student — name, age, city, marks — in one place, {{name}}? Today you meet <b>objects</b>: labelled data. Then you put objects inside arrays and get the shape almost every real app uses: a list of records.",
  goals: [
    "Create an object of `key: value` pairs and read it with dot and bracket notation",
    "Add, change and delete properties; nest objects inside objects",
    "Write a method (a function inside an object) and use `this` in it",
    "Store and process an array of objects (a class list)",
    "Loop over an object with `for...in` and `Object.keys / values / entries`, and turn it into text with `JSON.stringify`",
  ],
  learn: [
    { t: "h", text: "Why objects?" },
    { t: "p", html: "<p>Say you keep a student in an array: <code>[\"Sara\", 16, \"Riyadh\"]</code>. What is <code>student[1]</code>? You have to remember that position 1 means \"age\". Add a phone number in the middle and every position after it moves. Arrays number their items; for data <b>about one thing</b> you want <b>names</b> instead of numbers.</p>" },
    { t: "analogy", title: "An object is like a profile card", html: "<p>Think of a student ID card or a game profile. Each line has a <b>label</b> and a <b>value</b>: <i>Name: Sara</i>, <i>Age: 16</i>, <i>City: Riyadh</i>. You find information by its label, not by counting lines. In JavaScript the label is called a <b>key</b> (or property name), and a key with its value is a <b>property</b>.</p>" },
    { t: "code", code: c`const student = {
  name: "Sara",
  age: 16,
  city: "Riyadh",
};

console.log(student);
console.log(student.name);`, note: "<p>The console shows the whole object in braces, with string values in single quotes — the same way Chrome does. Values can be any type: strings, numbers, booleans, arrays, even other objects.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`const student = {`, "Curly braces <code>{ }</code> create an object. (Square brackets <code>[ ]</code> create an array.)"],
      [c`name: "Sara",`, "One property: the key <code>name</code>, a colon, the value <code>\"Sara\"</code>, then a comma before the next property."],
      [c`city: "Riyadh",`, "A comma after the last property is allowed and makes adding new lines easier."],
      [c`student.name`, "The <b>dot</b> reads one property: \"the <code>name</code> of <code>student</code>\". You have used this since Day 1 — <code>console.log</code> is the <code>log</code> of <code>console</code>!"],
    ] },
    { t: "check", q: "What does this show?", code: c`const phone = { brand: "Nova", battery: 64 };
console.log(phone.battery);`, o: ["`64`", "`battery`", "`{battery: 64}`", "`Nova`"], a: 0, e: "`phone.battery` reads the value stored under the key `battery`." },

    { t: "h", text: "Dot and bracket access" },
    { t: "p", html: "<p>There is a second way to read a property: <b>brackets</b> with the key as a string, <code>student[\"age\"]</code>. Why two ways? Brackets let the key come from a <b>variable</b> — for example, a field the user typed. The dot only works with the exact name written in your code.</p>" },
    { t: "code", code: c`const student = { name: "Sara", age: 16, city: "Riyadh" };

console.log(student["age"]);   // same as student.age

const field = "city";
console.log(student[field]);    // the key comes from a variable
console.log(student.field);     // looks for a key called "field"
console.log(student.phone);     // no such key`, note: "<p><code>student[field]</code> uses the <b>value</b> of the variable (<code>\"city\"</code>). <code>student.field</code> looks for a property literally named <code>field</code>, which does not exist. A missing property is not an error: it is simply <code>undefined</code>.</p>" },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`const scores = { math: 90, art: 75 };
const subject = "art";
console.log(scores[subject]);`, answers: ["75"], run: true, e: "`subject` holds `\"art\"`, so `scores[subject]` is `scores[\"art\"]`, which is 75.", hint: "Brackets use the value inside the variable.", placeholder: "a number" },

    { t: "h", text: "Add, change and delete properties" },
    { t: "code", code: c`const player = { name: "Fahad", goals: 2 };

player.goals = 3;          // change
player.team = "Falcons";   // add a new key
delete player.name;        // remove a key

console.log(player);`, note: "<p>Assigning to a key that exists <b>changes</b> it; assigning to a new key <b>adds</b> it. <code>delete</code> removes a key completely. And yes, this works on a <code>const</code> object: <code>const</code> only stops you from putting a <b>different object</b> in the variable, not from changing what is inside.</p>" },
    { t: "check", q: "What does this show?", code: c`const bag = { books: 3 };
bag.books = bag.books + 2;
bag.pens = 4;
console.log(bag);`, o: ["`{books: 5, pens: 4}`", "`{books: 3, pens: 4}`", "`{books: 5}`", "`TypeError: Assignment to constant variable.`"], a: 0, e: "`books` is changed to 5 and `pens` is added. Changing the contents of a `const` object is allowed." },

    { t: "h", text: "Nested objects" },
    { t: "p", html: "<p>A value can itself be an object or an array. A student has an address with a city and a district, and a list of marks. Read nested data with a chain of dots, left to right, one step at a time.</p>" },
    { t: "code", code: c`const student = {
  name: "Omar",
  marks: [80, 95, 70],
  address: { city: "Jeddah", district: "Al-Rawdah" },
};

console.log(student.address.city);
console.log(student.marks[1]);
console.log(student.marks.length);` },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`const game = {
  title: "Racer",
  best: { player: "Lina", time: 52 },
};
console.log(game.best.player);`, answers: ["Lina"], run: true, e: "`game.best` is the inner object `{player: 'Lina', time: 52}`, and `.player` reads `Lina` from it.", hint: "Go one dot at a time: first `game.best`, then `.player`.", placeholder: "type the output" },

    { t: "h", text: "Methods and this" },
    { t: "p", html: "<p>Objects can also <b>do</b> things. A function stored in an object is called a <b>method</b> — like <code>log</code> in <code>console</code>, or <code>push</code> on an array. Inside a method, the word <code>this</code> means <i>\"the object this method belongs to\"</i>, so the method can read the other properties.</p>" },
    { t: "analogy", title: "this is like saying \"my\"", html: "<p>When you say <i>\"my name\"</i>, everyone knows whose name you mean: the person speaking. When a method says <code>this.name</code>, it means <i>\"the name of the object I am in\"</i>. The same method in two different objects gives two different answers.</p>" },
    { t: "code", code: c`const robot = {
  name: "Bolt",
  battery: 40,
  greet() {
    return "Hi, I am " + this.name;
  },
  charge(amount) {
    this.battery = this.battery + amount;
  },
};

console.log(robot.greet());
robot.charge(25);
console.log(robot.battery);`, note: "<p><code>greet() { ... }</code> is the short way to write <code>greet: function () { ... }</code>. Call a method with a dot and parentheses: <code>robot.greet()</code>. Use this <code>function</code> style for methods — an arrow function does <b>not</b> get its own <code>this</code>.</p>" },
    { t: "check", q: "What does this show?", code: c`const counter = {
  count: 0,
  add() {
    this.count = this.count + 1;
  },
};
counter.add();
counter.add();
console.log(counter.count);`, o: ["`2`", "`0`", "`1`", "`undefined`"], a: 0, e: "Each call to `add()` increases `this.count`, which is `counter.count`. Two calls: 0 → 1 → 2." },

    { t: "h", text: "Arrays of objects: a class list" },
    { t: "p", html: "<p>Now combine Day 17 and today: an array where every item is an object. This is how real apps store data — a list of messages, products, players. Everything you learned yesterday works: loops, <code>map</code>, <code>filter</code>, <code>find</code>. You just read a property of each item.</p>" },
    { t: "code", code: c`const classList = [
  { name: "Sara", mark: 92 },
  { name: "Omar", mark: 67 },
  { name: "Lina", mark: 85 },
];

console.log(classList[0].name);
console.log(classList.map(s => s.name));
console.log(classList.filter(s => s.mark >= 80).length);
console.log(classList.find(s => s.name === "Omar"));` },
    { t: "viz", code: c`const classList = [
  { name: "Sara", mark: 92 },
  { name: "Omar", mark: 67 },
];
for (const s of classList) {
  console.log(¦#{s.name} got #{s.mark}¦);
}`, before: "<p>Press <b>Visualize</b> and step through: each time round the loop, <code>s</code> is one whole object.</p>" },
    { t: "check", q: "What does this show?", code: c`const team = [
  { name: "Ali", goals: 3 },
  { name: "Sami", goals: 5 },
];
console.log(team[1].goals);`, o: ["`5`", "`3`", "`Sami`", "`undefined`"], a: 0, e: "`team[1]` is the second object (Sami), and `.goals` reads 5 from it." },

    { t: "h", text: "Looping over an object" },
    { t: "p", html: "<p>Sometimes you want <b>every</b> property of an object: to print a whole profile, or to add up all subjects. <code>for...in</code> gives you each <b>key</b>; use brackets to get the value. <code>Object.keys</code>, <code>Object.values</code> and <code>Object.entries</code> give you arrays, so all your array tools work on them.</p>" },
    { t: "code", code: c`const marks = { math: 90, science: 80, english: 70 };

for (const subject in marks) {
  console.log(subject, "->", marks[subject]);
}

console.log(Object.keys(marks));
console.log(Object.values(marks));
console.log(Object.entries(marks));`, note: "<p>Inside <code>for...in</code> the key is in a variable, so you <b>must</b> use brackets: <code>marks[subject]</code>. Use <code>for...in</code> for objects and <code>for...of</code> for arrays.</p>" },
    { t: "table", head: ["You write", "You get"], rows: [
      ["`for (const k in obj)`", "each key, one at a time"],
      ["`Object.keys(obj)`", "an array of the keys"],
      ["`Object.values(obj)`", "an array of the values"],
      ["`Object.entries(obj)`", "an array of `[key, value]` pairs"],
      ["`JSON.stringify(obj)`", "the whole object as one string of text"],
    ] },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`const prices = { tea: 2, juice: 5, cake: 8 };
console.log(Object.values(prices).reduce((a, p) => a + p, 0));`, answers: ["15"], run: true, e: "`Object.values` gives `[2, 5, 8]`, and `reduce` adds them: 15.", hint: "First get the array of values, then add them up.", placeholder: "a number" },

    { t: "h", text: "JSON.stringify: an object as text" },
    { t: "p", html: "<p>To save an object or send it across the internet, it must become plain text. <code>JSON.stringify</code> does that. <b>JSON</b> looks almost like JavaScript, but keys get double quotes too. You will see it again when web pages save data.</p>" },
    { t: "code", code: c`const settings = { theme: "dark", volume: 7 };
const text = JSON.stringify(settings);
console.log(text);
console.log(typeof text);` },

    { t: "steps", title: "Canteen menu", problem: "<p>The school canteen keeps its menu as an array of objects. Print the menu, then the items that are in stock, then the price of an order of one sandwich and two juices:</p><pre class=\"code-static\">Sandwich - 7 SAR\nJuice - 4 SAR\nCookie - 2 SAR\nIn stock: Sandwich, Cookie\nOrder: 15 SAR</pre>",
      steps: [
        { html: "<p><b>Understand.</b> Each item has a name, a price and how many are left. That is one object per item, in one array.</p>", code: c`const menu = [
  { name: "Sandwich", price: 7, stock: 12 },
  { name: "Juice", price: 4, stock: 0 },
  { name: "Cookie", price: 2, stock: 30 },
];` },
        { html: "<p><b>Print the menu.</b> Loop with <code>for...of</code>; each <code>item</code> is one object.</p>", code: c`for (const item of menu) {
  console.log(¦#{item.name} - #{item.price} SAR¦);
}` },
        { html: "<p><b>In stock.</b> Keep the items with <code>stock &gt; 0</code>, take their names, join them.</p>", code: c`const available = menu.filter(i => i.stock > 0).map(i => i.name);
console.log("In stock:", available.join(", "));` },
        { html: "<p><b>The order.</b> Write a small function that finds an item by name and returns its price, then use it.</p>", code: c`function priceOf(name) {
  return menu.find(i => i.name === name).price;
}
console.log("Order:", priceOf("Sandwich") + 2 * priceOf("Juice"), "SAR");` },
      ],
      code: c`const menu = [
  { name: "Sandwich", price: 7, stock: 12 },
  { name: "Juice", price: 4, stock: 0 },
  { name: "Cookie", price: 2, stock: 30 },
];

for (const item of menu) {
  console.log(¦#{item.name} - #{item.price} SAR¦);
}

const available = menu.filter(i => i.stock > 0).map(i => i.name);
console.log("In stock:", available.join(", "));

function priceOf(name) {
  return menu.find(i => i.name === name).price;
}
console.log("Order:", priceOf("Sandwich") + 2 * priceOf("Juice"), "SAR");` },
  ],
  mistakes: [
    { title: "Dot with a variable key", html: "<code>obj.key</code> looks for a property literally named <code>key</code>. When the key is in a variable, use brackets.", wrong: c`const field = "age";
console.log(student.field);`, right: c`const field = "age";
console.log(student[field]);` },
    { title: "Using = or ; inside an object", html: "Inside braces, properties use a <b>colon</b> and are separated by <b>commas</b>.", wrong: c`const p = { name = "Sara"; age = 16 };`, right: c`const p = { name: "Sara", age: 16 };` },
    { title: "Forgetting this in a method", html: "Inside a method, the other properties are not plain variables. Read them through <code>this</code>.", wrong: c`const pet = {
  name: "Mishmish",
  hello() { return "I am " + name; },
};`, right: c`const pet = {
  name: "Mishmish",
  hello() { return "I am " + this.name; },
};` },
    { title: "An arrow function as a method", html: "Arrow functions do not get their own <code>this</code>, so <code>this.name</code> will not find the object. Use the method form.", wrong: c`const car = { brand: "Kia", show: () => this.brand };`, right: c`const car = { brand: "Kia", show() { return this.brand; } };` },
  ],
  tricks: [
    { title: "Check if a key exists with in", html: "<code>\"key\" in obj</code> gives <code>true</code> or <code>false</code> — safer than checking for <code>undefined</code>.", code: c`const user = { name: "Noor", age: 15 };
console.log("age" in user, "email" in user);` },
    { title: "Pretty JSON", html: "Give <code>JSON.stringify</code> two more arguments, <code>null, 2</code>, and it adds new lines and indentation.", code: c`const s = { name: "Huda", marks: [90, 88] };
console.log(JSON.stringify(s, null, 2));` },
    { title: "Loop over entries with two names", html: "Each entry is a <code>[key, value]</code> pair. You can give both parts names right in the loop.", code: c`const stock = { pens: 12, rulers: 4 };
for (const [item, count] of Object.entries(stock)) {
  console.log(item, count);
}` },
  ],
  practice: [
    { t: "try", title: "Make it yours", html: "<p>Turn this into <b>your</b> profile card: change the values, add a property for your favourite subject, and a method <code>intro()</code> that uses <code>this</code>.</p>", code: c`const me = {
  name: "{{name}}",
  grade: 10,
  hobbies: ["football", "drawing"],
};
console.log(me);
console.log("First hobby:", me.hobbies[0]);` },
    { t: "predict", code: c`const box = { a: 1, b: 2 };
const key = "b";
console.log(box.key, box[key], box["a"]);`, explain: "<p><code>box.key</code> looks for a property called <code>key</code> — there is none, so <code>undefined</code>. <code>box[key]</code> uses the variable's value <code>\"b\"</code>: <code>2</code>. <code>box[\"a\"]</code> is <code>1</code>.</p>" },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`const car = { brand: "Kia", year: 2020 };
car.year = 2024;
console.log(car.year);`, answers: ["2024"], run: true, e: "Assigning to an existing key changes its value.", placeholder: "a number" },
    { t: "parsons", title: "Print the class list", prompt: "Arrange the lines so the program prints <code>Sara: 92</code> and <code>Omar: 67</code>.", lines: [c`const list = [{ name: "Sara", mark: 92 }, { name: "Omar", mark: 67 }];`, c`for (const s of list) {`, c`  console.log(s.name + ": " + s.mark);`, c`}`], distractors: [c`for (const s in list) {`], explain: "Use <code>for...of</code> to walk through an <b>array</b>; each <code>s</code> is one object. <code>for...in</code> would give you the indexes as strings." },
    { t: "predict", code: c`const stats = { wins: 4, losses: 1 };
for (const k in stats) {
  console.log(k);
}
console.log(Object.keys(stats).length);`, explain: "<p><code>for...in</code> gives the <b>keys</b>: <code>wins</code>, then <code>losses</code>. <code>Object.keys</code> is an array of 2 keys.</p>" },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`const timer = {
  seconds: 10,
  tick() { this.seconds = this.seconds - 1; },
};
timer.tick();
timer.tick();
timer.tick();
console.log(timer.seconds);`, answers: ["7"], run: true, e: "Each `tick()` takes 1 from `this.seconds`: 10 → 9 → 8 → 7.", placeholder: "a number" },
    { t: "try", title: "Your playlist", html: "<p>Each song is an object. Add two songs of your own, then print only the songs shorter than 4 minutes and the total time of the playlist.</p>", code: c`const playlist = [
  { title: "Song A", minutes: 3.5 },
  { title: "Song B", minutes: 5 },
  { title: "Song C", minutes: 2.75 },
];
const short = playlist.filter(s => s.minutes < 4).map(s => s.title);
console.log("Short songs:", short);
const total = playlist.reduce((acc, s) => acc + s.minutes, 0);
console.log("Total minutes:", total);` },
  ],
  exercises: [
    { id: "d19-make", lvl: "seed", title: "Make a student", prompt: "<p>Write a function <code>makeStudent(name, grade)</code> that <b>returns</b> an object with the keys <code>name</code> and <code>grade</code>.</p><pre class=\"code-static\">makeStudent(\"Sara\", 10)  →  {name: 'Sara', grade: 10}</pre>", starter: c`function makeStudent(name, grade) {
  // your code here
}`,
      tests: [{ after: c`console.log(makeStudent("Sara", 10));`, expected: "{name: 'Sara', grade: 10}" }, { after: c`console.log(makeStudent("Omar", 11).grade);`, expected: "11" }],
      hint: "Return an object literal: <code>return { name: name, grade: grade };</code>",
      solutions: [{ name: "Object literal", code: c`function makeStudent(name, grade) {
  return { name: name, grade: grade };
}`, note: "The key is on the left of the colon, the parameter (the value) on the right." }, { name: "Short form", code: c`function makeStudent(name, grade) {
  return { name, grade };
}`, note: "When the key and the variable have the same name, you may write it once. Both forms make the same object." }] },
    { id: "d19-describe", lvl: "seed", title: "Describe a phone", prompt: "<p>Write a function <code>describe(phone)</code> that takes an object like <code>{ brand: \"Nova\", battery: 64 }</code> and returns the string:</p><pre class=\"code-static\">Nova: 64% battery</pre>", starter: c`function describe(phone) {
  // your code here
}`,
      tests: [{ after: c`console.log(describe({ brand: "Nova", battery: 64 }));`, expected: "Nova: 64% battery" }, { after: c`console.log(describe({ battery: 5, brand: "Zed" }));`, expected: "Zed: 5% battery" }],
      hint: "Read <code>phone.brand</code> and <code>phone.battery</code> and build the string with a template literal.",
      solutions: [{ name: "Template literal", code: c`function describe(phone) {
  return ¦#{phone.brand}: #{phone.battery}% battery¦;
}`, note: "The order of the keys in the object does not matter; you read them by name." }, { name: "Plus", code: c`function describe(phone) {
  return phone.brand + ": " + phone.battery + "% battery";
}`, note: "The same with <code>+</code>." }] },
    { id: "d19-lookup", lvl: "star", title: "Safe lookup", prompt: "<p>Write a function <code>lookup(obj, key)</code> that returns the value of <code>key</code> in <code>obj</code>, or the string <code>\"missing\"</code> if the object has no such key.</p><pre class=\"code-static\">lookup({ math: 90 }, \"math\")  →  90\nlookup({ math: 90 }, \"art\")   →  missing</pre>", starter: c`function lookup(obj, key) {
  // your code here
}`,
      tests: [{ after: c`console.log(lookup({ math: 90 }, "math"));`, expected: "90" }, { after: c`console.log(lookup({ math: 90 }, "art"));`, expected: "missing" }, { after: c`console.log(lookup({ city: "Abha", zip: 0 }, "zip"));`, expected: "0" }],
      hint: "The key is in a variable, so use brackets: <code>obj[key]</code>. A missing key gives <code>undefined</code>. Careful: a value of <code>0</code> is not missing!",
      solutions: [{ name: "Check undefined", code: c`function lookup(obj, key) {
  if (obj[key] === undefined) {
    return "missing";
  }
  return obj[key];
}`, note: "Compare with <code>undefined</code> exactly, so a real value like <code>0</code> still counts." }, { name: "The in operator", code: c`function lookup(obj, key) {
  return key in obj ? obj[key] : "missing";
}`, note: "<code>key in obj</code> asks whether the key exists, and the ternary (Day 10) picks the answer." }] },
    { id: "d19-names", lvl: "star", title: "Names of the team", prompt: "<p>Write a function <code>scorers(team)</code>. <code>team</code> is an array of objects like <code>{ name: \"Ali\", goals: 3 }</code>. Return an array with the <b>names</b> of the players who scored at least one goal.</p><pre class=\"code-static\">scorers([{ name: \"Ali\", goals: 3 }, { name: \"Sami\", goals: 0 }, { name: \"Badr\", goals: 1 }])\n→  ['Ali', 'Badr']</pre>", starter: c`function scorers(team) {
  // your code here
}`,
      tests: [{ after: c`console.log(scorers([{ name: "Ali", goals: 3 }, { name: "Sami", goals: 0 }, { name: "Badr", goals: 1 }]));`, expected: "['Ali', 'Badr']" }, { after: c`console.log(scorers([{ name: "Ziad", goals: 0 }]));`, expected: "[]" }],
      hint: "<code>filter</code> the players with <code>goals &gt; 0</code>, then <code>map</code> each one to its <code>name</code>.",
      solutions: [{ name: "filter + map", code: c`function scorers(team) {
  return team.filter(p => p.goals > 0).map(p => p.name);
}`, note: "First keep the right objects, then turn each object into a string." }, { name: "Loop", code: c`function scorers(team) {
  const out = [];
  for (const p of team) {
    if (p.goals > 0) out.push(p.name);
  }
  return out;
}`, note: "The loop version of the same idea." }] },
    { id: "d19-cheapest", lvl: "star", title: "Cheapest item", prompt: "<p>Write a function <code>cheapest(menu)</code> that returns the <b>name</b> of the item with the lowest price. The menu always has at least one item.</p><pre class=\"code-static\">cheapest([{ name: \"Tea\", price: 3 }, { name: \"Water\", price: 1 }, { name: \"Cake\", price: 6 }])\n→  Water</pre>", starter: c`function cheapest(menu) {
  // your code here
}`,
      tests: [{ after: c`console.log(cheapest([{ name: "Tea", price: 3 }, { name: "Water", price: 1 }, { name: "Cake", price: 6 }]));`, expected: "Water" }, { after: c`console.log(cheapest([{ name: "Pizza", price: 20 }]));`, expected: "Pizza" }, { after: c`console.log(cheapest([{ name: "A", price: 9 }, { name: "B", price: 8 }]));`, expected: "B" }],
      hint: "Keep the best item so far in a variable, starting with <code>menu[0]</code>. Loop and replace it when you find a lower price.",
      solutions: [{ name: "Best so far", code: c`function cheapest(menu) {
  let best = menu[0];
  for (const item of menu) {
    if (item.price < best.price) {
      best = item;
    }
  }
  return best.name;
}`, note: "We keep the whole object, so at the end we can return its name." }, { name: "Sort a copy", code: c`function cheapest(menu) {
  const sorted = [...menu].sort((a, b) => a.price - b.price);
  return sorted[0].name;
}`, note: "The compare function can read a property: <code>a.price - b.price</code>. The copy keeps the original menu order." }] },
    { id: "d19-fix-team", lvl: "fire", debug: true, title: "Fix the team card", prompt: "<p>This code has <b>two</b> bugs. After fixing it, <code>team.addWin()</code> must add one win, and <code>stat(obj, key)</code> must return text like <code>wins = 4</code>.</p>",
      starter: c`const team = {
  name: "Falcons",
  wins: 3,
  addWin() {
    wins = wins + 1;
  },
};

function stat(obj, key) {
  return key + " = " + obj.key;
}

team.addWin();
console.log(stat(team, "wins"));`,
      tests: [{ after: c`const start = team.wins;
team.addWin();
team.addWin();
console.log("added:", team.wins - start);`, expected: "added: 2" }, { after: c`console.log(stat({ wins: 5, losses: 1 }, "wins"));`, expected: "wins = 5" }, { after: c`console.log(stat(team, "name"));`, expected: "name = Falcons" }, { after: c`console.log(stat({ x: 1 }, "x"));`, expected: "x = 1" }],
      hint: "Run it and read the error: inside a method, how do you reach the object's own <code>wins</code>? Then: does <code>obj.key</code> use the variable <code>key</code>?",
      solutions: [{ name: "Fixed", code: c`const team = {
  name: "Falcons",
  wins: 3,
  addWin() {
    this.wins = this.wins + 1;
  },
};

function stat(obj, key) {
  return key + " = " + obj[key];
}`, note: "Bug 1: <code>wins</code> is not a variable — it is a property, so write <code>this.wins</code>. Bug 2: <code>obj.key</code> looks for a key named \"key\"; the key is in a variable, so use <code>obj[key]</code>." }] },
    { id: "d19-count-city", lvl: "fire", title: "Students per city", prompt: "<p>Write a function <code>perCity(students)</code> that returns an <b>object</b> counting how many students live in each city.</p><pre class=\"code-static\">perCity([\n  { name: \"Sara\", city: \"Riyadh\" },\n  { name: \"Omar\", city: \"Jeddah\" },\n  { name: \"Lina\", city: \"Riyadh\" },\n])\n→  {Riyadh: 2, Jeddah: 1}</pre>", starter: c`function perCity(students) {
  const counts = {};
  // your code here
  return counts;
}`,
      tests: [{ after: c`console.log(perCity([{ name: "Sara", city: "Riyadh" }, { name: "Omar", city: "Jeddah" }, { name: "Lina", city: "Riyadh" }]));`, expected: "{Riyadh: 2, Jeddah: 1}" }, { after: c`console.log(perCity([]));`, expected: "{}" }, { after: c`console.log(perCity([{ name: "A", city: "Abha" }, { name: "B", city: "Abha" }, { name: "C", city: "Abha" }]));`, expected: "{Abha: 3}" }],
      hint: "Loop over the students. The city name is in a variable, so use <code>counts[s.city]</code>. If it is <code>undefined</code>, start it at 1; otherwise add 1.",
      solutions: [{ name: "Loop + brackets", code: c`function perCity(students) {
  const counts = {};
  for (const s of students) {
    if (counts[s.city] === undefined) {
      counts[s.city] = 1;
    } else {
      counts[s.city] = counts[s.city] + 1;
    }
  }
  return counts;
}`, note: "The object grows a new key the first time a city appears. Brackets let the key come from the data." }, { name: "With in", code: c`function perCity(students) {
  const counts = {};
  for (const s of students) {
    counts[s.city] = (s.city in counts) ? counts[s.city] + 1 : 1;
  }
  return counts;
}`, note: "The same idea with the <code>in</code> operator and a ternary." }],
      twist: "Change it to collect the <b>names</b> per city instead: <code>{Riyadh: ['Sara', 'Lina'], Jeddah: ['Omar']}</code>." },
  ],
  quiz: [
    { q: "Which line creates an object correctly?", o: ["`const s = { name: \"Sara\", age: 16 };`", "`const s = { name = \"Sara\", age = 16 };`", "`const s = [ name: \"Sara\", age: 16 ];`", "`const s = { name: \"Sara\"; age: 16 };`"], a: 0, e: "Braces, a colon between key and value, commas between properties." },
    { q: "What does this show?", code: c`const p = { x: 5, y: 9 };
const k = "y";
console.log(p[k]);`, o: ["`9`", "`5`", "`undefined`", "`y`"], a: 0, e: "`p[k]` uses the value of `k`, which is `\"y\"`." },
    { q: "What does this show?", code: c`const user = { name: "Noor" };
console.log(user.age);`, o: ["`undefined`", "`0`", "`null`", "`ReferenceError: age is not defined`"], a: 0, e: "Reading a key that does not exist gives `undefined` — no error." },
    { q: "Inside a method, what does `this` mean?", o: ["The object the method belongs to", "The whole program", "The last variable you created", "The function itself"], a: 0, e: "`this.name` reads the `name` of the object whose method is running." },
    { q: "What does this show?", code: c`const list = [{ n: "A", v: 1 }, { n: "B", v: 2 }];
console.log(list.map(o => o.v * 10));`, o: ["`[10, 20]`", "`[1, 2]`", "`['A', 'B']`", "`[{n: 'A', v: 10}, {n: 'B', v: 20}]`"], a: 0, e: "`map` turns each object into the number `o.v * 10`." },
    { q: "What does this show?", code: c`console.log(Object.keys({ a: 1, b: 2, c: 3 }));`, o: ["`['a', 'b', 'c']`", "`[1, 2, 3]`", "`3`"], a: 0, e: "`Object.keys` returns an array of the keys (as strings). `Object.values` would give `[1, 2, 3]`." },
  ],
  puzzle: { title: "The shared card", q: "<p>Without running it: what does the last line show? Type it exactly as the console would.</p>", code: c`const a = { score: 1 };
const b = a;
b.score = b.score + 10;
const key = "score";
console.log(a[key], a.key);`, answers: ["11 undefined"], run: true, hint: "Like arrays yesterday: does <code>const b = a</code> make a copy? And what is <code>a.key</code> looking for?", e: "`b` is a second name for the same object, so `a.score` becomes 11. `a[key]` reads `score` (11); `a.key` looks for a property called \"key\", which does not exist: `undefined`." },
  cards: [
    { f: "How do you create an object?", b: "With braces: `{ name: \"Sara\", age: 16 }` — key, colon, value; commas between properties." },
    { f: "`obj.key` vs `obj[key]`?", b: "`obj.key` reads the property literally called key. `obj[key]` uses the value of the variable `key`." },
    { f: "What do you get for a key that does not exist?", b: "`undefined` (no error)." },
    { f: "What is `this` inside a method?", b: "The object the method belongs to, e.g. `this.name`." },
    { f: "Object.keys / values / entries?", b: "Arrays of the keys, of the values, and of `[key, value]` pairs." },
  ],
  remember: [
    "An object stores **labelled** data: `{ key: value, key2: value2 }`.",
    "Read with a dot (`s.name`) or brackets (`s[\"name\"]`, `s[field]` when the key is in a variable).",
    "Assign to add or change a property; `delete obj.key` removes it; a missing key is `undefined`.",
    "A method is a function inside an object; inside it, `this` is the object.",
    "An array of objects is a list of records — use loops, `map`, `filter`, `find` on it.",
    "`for...in` and `Object.keys / values / entries` walk through an object; `JSON.stringify` turns it into text.",
  ],
};
})();
