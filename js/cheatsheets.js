/* JS30 cheat sheets — one printable page per week: [heading, code]. Keep code lines at 31 characters or
   fewer so each card fits without sideways scrolling. */
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
window.CHEATSHEETS = {
  1: {
    title: "Week 1 cheat sheet — First steps",
    blocks: [
      ["Print and comment", c`console.log("Hi!");   // Hi!
console.log(5 + 3);   // 8
console.log("5" + 3); // 53
console.log("A", 7);  // A 7
console.log("1\n2");
// 1
// 2      (\n = new line)
console.log("a\tb");  // a  b
// a one-line comment
/* a comment on
   many lines */`],
      ["Variables", c`let score = 0;  // can change
score = 10;     // OK
const DAYS = 7; // fixed
// DAYS = 8;  → TypeError

// names: camelCase
let totalPrice = 25;
let player2 = "Ali";
// ✗ 2player  my-name  let`],
      ["Data types and typeof", c`typeof "hi";      // "string"
typeof 42;        // "number"
typeof true;      // "boolean"
typeof undefined;
// "undefined"
typeof null;      // "object"

let a;        // undefined
let b = null; // empty on purpose`],
      ["Operators", c`7 + 2;    // 9
7 - 2;    // 5
7 * 2;    // 14
7 / 2;    // 3.5
7 % 2;    // 1 (remainder)
2 ** 3;   // 8 (power)
2 + 3 * 4;   // 14 (* first)
(2 + 3) * 4; // 20 (brackets)`],
      ["Update a variable", c`let n = 5;
n++;      // n is 6
n--;      // n is 5
n += 10;  // n is 15
n -= 3;   // n is 12
n *= 2;   // n is 24
n /= 4;   // n is 6`],
      ["Math and special numbers", c`Math.round(4.5);   // 5
Math.floor(4.9);   // 4
Math.ceil(4.1);    // 5
Math.max(3, 9, 2); // 9
Math.min(3, 9, 2); // 2
Math.random();
// from 0 up to (not) 1
(9.5).toFixed(2);  // "9.50"
"abc" * 2;         // NaN
1 / 0;             // Infinity`],
      ["Strings", c`const w = "Riyadh";
w.length;           // 6
w[0];               // "R"
w.toUpperCase();    // "RIYADH"
w.includes("ya");   // true
w.indexOf("d");     // 4
w.slice(0, 3);      // "Riy"
w.replace("R", "J");
// "Jiyadh"
"  hi  ".trim();    // "hi"`],
      ["Template literals and input", c`const name = prompt("Name?");
const age = Number(
  prompt("Age?"));
console.log(¦Hi #{name}!¦);
console.log(¦Next: #{age + 1}¦);

"5" + 1;          // "51"
Number("5") + 1;  // 6
String(12);       // "12"
parseInt("15kg"); // 15`],
      ["Error quick guide", c`// SyntaxError
//  a missing ) } or "
//  → check that line
// ReferenceError:
//  x is not defined
//  → typo, or no let/const
// TypeError:
//  x is not a function
//  → wrong name: console.lg
// TypeError: Cannot read
//  properties of null
//  → element not found
// TypeError: Assignment
//  to constant variable
//  → use let, not const`],
    ],
  },
  2: {
    title: "Week 2 cheat sheet — Decisions and loops",
    blocks: [
      ["Comparisons", c`5 === 5;    // true
5 === "5";  // false (types)
5 == "5";   // true (avoid ==)
3 !== 4;    // true
7 > 3;      // true
7 <= 7;     // true
"b" > "a";  // true`],
      ["Logic: && || !", c`true && false; // false
true || false; // true
!true;         // false
// && both must be true
// || one is enough
// !  flips it

const age = 16;
age >= 13 && age <= 19;
// true`],
      ["Truthy and falsy", c`// falsy: false 0 "" null
//        undefined NaN
// all else is truthy:
//        "0" "hi" 5 -1

const name = "";
if (!name) {
  console.log("Empty!");
}
// Empty!`],
      ["if / else if / else", c`const mark = 82;
if (mark >= 90) {
  console.log("A");
} else if (mark >= 80) {
  console.log("B");
} else {
  console.log("Keep going");
}
// B`],
      ["switch", c`const day = "Fri";
switch (day) {
  case "Fri":
  case "Sat":
    console.log("Weekend");
    break;
  default:
    console.log("School day");
}
// Weekend`],
      ["Ternary ? :", c`// test ? ifTrue : ifFalse
const b = 15; // battery %
const msg =
  b < 20 ? "Low" : "OK";
console.log(msg); // Low`],
      ["while and do...while", c`let n = 3;
while (n > 0) {
  console.log(n); // 3, 2, 1
  n--; // no n-- → never ends!
}

let x = 10;
do {
  console.log(x); // 10
} while (x < 5); // runs once`],
      ["for, break, continue", c`for (let i = 1; i <= 3; i++) {
  console.log(i); // 1, 2, 3
}

for (let i = 1; i <= 5; i++) {
  if (i === 2) continue;
  if (i === 4) break;
  console.log(i); // 1, 3
}
// continue = skip this run
// break = stop the loop`],
      ["Nested loops", c`for (let r = 1; r <= 2; r++) {
  for (let c = 1; c <= 3; c++) {
    console.log(r, c);
  }
}
// 1 1   1 2   1 3
// 2 1   2 2   2 3
// the inner loop runs fully
// for each outer run`],
    ],
  },
  3: {
    title: "Week 3 cheat sheet — Functions, arrays and objects",
    blocks: [
      ["Functions and return", c`function greet(name) {
  return ¦Hi #{name}!¦;
}
greet("Sara"); // "Hi Sara!"
// name = parameter
// "Sara" = argument

function hi(who = "you") {
  return "Hello " + who;
}
hi();      // "Hello you"
function nothing() {}
nothing(); // undefined`],
      ["Arrow functions", c`const add = function (a, b) {
  return a + b;
};
const double = (n) => n * 2;
const sum = (a, b) => {
  return a + b;
};
add(2, 3);  // 5
double(4);  // 8
sum(1, 1);  // 2`],
      ["Callbacks and scope", c`function twice(fn) {
  fn();
  fn();
}
twice(() => console.log("Hi"));
// Hi
// Hi

let total = 0;     // global
function addTo(x) {
  const extra = 1; // local
  total += x + extra;
}
// no "extra" out here`],
      ["Arrays", c`const list = ["math", "art"];
list[0];      // "math"
list.length;  // 2
list.push("PE");    // + end
list.pop();         // - end
list.unshift("IT"); // + start
list.shift();       // - start
list.includes("art"); // true
list.indexOf("art");  // 1
list.indexOf("PE");   // -1`],
      ["for...of, join, split", c`const list = ["math", "art"];
for (const s of list) {
  console.log(s);
}
// math
// art

list.join(", ");
// "math, art"
"a-b-c".split("-");
// ["a", "b", "c"]`],
      ["Array methods", c`const m = [70, 95, 82];
m.map((x) => x + 5);
// [75, 100, 87]
m.filter((x) => x > 80);
// [95, 82]
m.find((x) => x > 80);    // 95
m.findIndex((x) => x > 80); // 1
m.some((x) => x < 60); // false
m.every((x) => x >= 70); // true
m.reduce((s, x) => s + x, 0);
// 247
m.forEach((x) => {
  console.log(x);
}); // 70, 95, 82`],
      ["sort, slice, splice, spread", c`const n = [10, 2, 33];
n.sort((a, b) => a - b);
// n is [2, 10, 33]
// (sort() alone sorts as text)
n.slice(0, 2);  // [2, 10]
// slice makes a copy
n.splice(1, 1); // removes 10
// n is [2, 33]
const more = [...n, 5];
// more is [2, 33, 5]`],
      ["Objects and methods", c`const p = {
  name: "Ali",
  age: 16,
};
p.name;        // "Ali"
p["age"];      // 16
p.age = 17;    // change
p.city = "Abha"; // add

const pet = {
  name: "Kiwi",
  hi() {
    return "I am " + this.name;
  },
};
pet.hi();      // "I am Kiwi"`],
      ["Object tools and JSON", c`const p = { name: "Ali" };
p.age = 16;
for (const k in p) {
  console.log(k, p[k]);
}
// name Ali
// age 16
Object.keys(p);
// ["name", "age"]
Object.values(p);
// ["Ali", 16]
Object.entries(p);
// [["name", "Ali"],
//  ["age", 16]]
JSON.stringify(p);
// '{"name":"Ali","age":16}'`],
    ],
  },
  4: {
    title: "Week 4 cheat sheet — JavaScript and HTML",
    blocks: [
      ["A small HTML page", c`<!DOCTYPE html>
<html>
<body>
  <h1 id="title">Hi</h1>
  <p class="note">Text</p>
  <button id="go">Go</button>
  <ul id="list"></ul>
  <script>
    console.log("Ready");
  </script>
</body>
</html>
<!-- <p> is a tag;
     id="go" is an attribute;
     the script goes last -->`],
      ["Find elements", c`const h = document
  .querySelector("#title");
const notes = document
  .querySelectorAll(".note");
const btn = document
  .getElementById("go");
// getElementById: no #

// "#id"  ".class"  "tag"
// not found → null`],
      ["Change elements", c`h.textContent = "Hello!";
h.innerHTML = "Hi <b>you</b>";
h.style.color = "teal";
h.style.fontSize = "30px";
h.classList.add("big");
h.classList.remove("big");
h.classList.toggle("dark");`],
      ["Events", c`btn.addEventListener(
  "click", (event) => {
    event.target
      .textContent = "Done!";
  });

document.addEventListener(
  "keydown", (e) => {
    console.log(e.key);
    // "Enter", "a", "ArrowUp"
  });`],
      ["Inputs, select, checkbox", c`<input id="age" type="number">
<select id="city">
  <option>Riyadh</option>
  <option>Jeddah</option>
</select>
<input id="ok" type="checkbox">

const ageBox = document
  .querySelector("#age");
Number(ageBox.value);
// .value is always a string
const city = document
  .querySelector("#city");
city.value;  // "Riyadh"
const ok = document
  .querySelector("#ok");
ok.checked;  // true or false`],
      ["Forms and submit", c`<form id="f">
  <input id="nm">
  <button>Send</button>
</form>

const f = document
  .querySelector("#f");
f.addEventListener(
  "submit", (e) => {
    e.preventDefault();
    // no page reload
    const nm = document
      .querySelector("#nm")
      .value;
    console.log(¦Hi #{nm}¦);
  });`],
      ["Create and remove", c`const ul = document
  .querySelector("#list");
const li = document
  .createElement("li");
li.textContent = "Milk";
ul.append(li); // on the page
li.remove();   // gone again`],
      ["Timers", c`setTimeout(() => {
  console.log("2 s later");
}, 2000); // once, after 2 s

let n = 0;
const id = setInterval(() => {
  n++;
  console.log(n); // 1, 2, 3
  if (n === 3) {
    clearInterval(id); // stop
  }
}, 1000); // every second`],
      ["localStorage and JSON", c`localStorage
  .setItem("nm", "Sara");
localStorage.getItem("nm");
// "Sara" (always a string)

const marks = [90, 85];
localStorage.setItem("marks",
  JSON.stringify(marks));
JSON.parse(localStorage
  .getItem("marks"));
// [90, 85]`],
    ],
  },
};
})();
