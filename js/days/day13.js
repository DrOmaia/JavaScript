window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[13] = {
  title: "Review + project: Number guessing game",
  intro: "Week 2 gave your programs a brain (decisions) and stamina (loops). Today, {{name}}, you put both together and build a real game: the computer thinks of a number and you hunt it down with hints. First, a quick tour of the week to make sure every tool is sharp.",
  goals: [
    "Recall comparisons and logic, `if` / `else if` / `else`, `switch`, the ternary, `while` and `for`",
    "Plan a program before writing it: understand → plan → build piece by piece",
    "Build a number guessing game that reads guesses in a loop and counts the tries",
    "Solve classic loop-and-decision problems: FizzBuzz and a canteen menu",
  ],
  learn: [
    { t: "h", text: "Week 2 recap" },
    { t: "p", html: "<p>Five days, five big ideas. Read each summary, run the tiny example, and answer the question. If one of them feels shaky, open that day again before the project — the game uses all of them.</p>" },
    { t: "h", text: "Day 8 — Comparisons and logic" },
    { t: "p", html: "<p>Comparisons (<code>===</code>, <code>!==</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>) answer a question with <code>true</code> or <code>false</code>. Always use the strict <code>===</code>. Then <code>&amp;&amp;</code> (and), <code>||</code> (or) and <code>!</code> (not) combine several answers into one.</p>" },
    { t: "code", code: c`const mark = 85;
const attendance = 92;
console.log(mark >= 80 && attendance >= 90);
console.log(mark === 100 || attendance === 100);` },
    { t: "check", q: "What does this show?", code: c`const age = 15;
console.log(age >= 13 && !(age >= 18));`, o: ["`true`", "`false`", "`15`", "`undefined`"], a: 0, e: "`15 >= 13` is true; `15 >= 18` is false, and `!` turns it into true. true && true is `true` — a teenager!", hint: "Work out each part first, then combine them." },
    { t: "h", text: "Day 9 — if, else if, else" },
    { t: "p", html: "<p>An <code>if</code> runs a block only when its condition is true. A chain of <code>else if</code> checks conditions from top to bottom and runs <b>only the first</b> one that is true; <code>else</code> catches everything left.</p>" },
    { t: "code", code: c`const temp = 44;
if (temp >= 40) {
  console.log("Stay inside, it's very hot");
} else if (temp >= 25) {
  console.log("Warm day");
} else {
  console.log("Take a jacket");
}` },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`const score = 70;
if (score >= 90) {
  console.log("A");
} else if (score >= 60) {
  console.log("B");
} else if (score >= 50) {
  console.log("C");
} else {
  console.log("F");
}`, answers: ["B"], run: true, e: "70 fails the first test (`>= 90`) and passes the second (`>= 60`). The chain stops at the first true condition, so `C` is never checked.", hint: "Go from the top and stop at the first true condition." },
    { t: "h", text: "Day 10 — switch and the ternary" },
    { t: "p", html: "<p><code>switch</code> compares one value with a list of exact cases — perfect for menus. Do not forget <code>break</code> at the end of each case. The ternary <code>condition ? a : b</code> is a tiny if/else that <b>gives back a value</b>.</p>" },
    { t: "code", code: c`const day = "Fri";
switch (day) {
  case "Fri":
  case "Sat":
    console.log("Weekend!");
    break;
  default:
    console.log("School day");
}
const battery = 15;
console.log(battery < 20 ? "Charge your phone" : "Battery OK");` },
    { t: "check", q: "What does this show?", code: c`const n = 7;
console.log(n % 2 === 0 ? "even" : "odd");`, o: ["`even`", "`odd`", "`true`", "`1`"], a: 1, e: "`7 % 2` is 1, so the condition is false and the ternary gives the second value: `odd`." },
    { t: "h", text: "Day 11 — while loops" },
    { t: "p", html: "<p><code>while (condition)</code> repeats its body as long as the condition is true. Something inside must change, or the loop never ends. With <code>prompt()</code>, read once before the loop and again at the end of the body.</p>" },
    { t: "code", code: c`let total = 0;
let price = prompt("Price (or stop):");
while (price !== "stop") {
  total += Number(price);
  price = prompt("Price (or stop):");
}
console.log("Total:", total);`, stdin: "4\n6\nstop" },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`let n = 1;
while (n < 30) {
  n *= 3;
}
console.log(n);`, answers: ["81"], run: true, e: "`n` goes 1 → 3 → 9 → 27 → 81. At 81 the check `81 < 30` is false.", hint: "Multiply by 3 until the number is no longer less than 30." },
    { t: "h", text: "Day 12 — for, break and continue" },
    { t: "p", html: "<p><code>for (start; check; change)</code> is a counter loop in one line — ideal when you know the number of rounds or want to visit every letter of a string. <code>break</code> leaves the loop; <code>continue</code> skips to the next round.</p>" },
    { t: "code", code: c`const word = "falcon";
for (let i = 0; i < word.length; i++) {
  if (word[i] === "c") {
    console.log("Found c at index", i);
    break;
  }
}` },
    { t: "check", q: "How many numbers does this show?", code: c`for (let i = 1; i <= 6; i++) {
  if (i === 3) continue;
  console.log(i);
}`, o: ["5", "6", "2", "3"], a: 0, e: "It shows 1, 2, 4, 5, 6. Only 3 is skipped; `continue` does not end the loop.", hint: "`continue` skips one round; `break` would stop everything." },
    { t: "h", text: "Project: the number guessing game" },
    { t: "p", html: "<p>Here is the game. The computer picks a secret number from 1 to 100. You guess. It answers <b>Too high</b> or <b>Too low</b>, and you guess again, until you find it. At the end it tells you how many tries you needed. With the smart strategy (always guess the middle) you never need more than 7 tries — can you see why?</p>" },
    { t: "tip", title: "Why the secret is fixed (for now)", html: "<p>A real game picks a different number every time with <code>Math.floor(Math.random() * 100) + 1</code>: <code>Math.random()</code> gives a decimal from 0 up to (not including) 1, times 100 gives 0 to 99.99…, <code>Math.floor</code> cuts the decimals, and <code>+ 1</code> shifts it to 1–100. But automatic tests need a program that behaves the same way every time, so in today's exercises the secret is fixed: <code>const secret = 37;</code>. Once your game passes the tests, swap in the random line and play for real.</p>", code: c`console.log(Math.floor(Math.random() * 100) + 1);` },
    { t: "steps", title: "Build the guessing game", problem: "<p>Write a game with a secret number (37). It reads guesses with <code>prompt()</code> until the guess is right. After each wrong guess it shows <code>Too high</code> or <code>Too low</code>. At the end it shows <code>Correct! You needed N tries</code>. With the guesses 50, 25, 37:</p><pre class=\"code-static\">Too high\nToo low\nCorrect! You needed 3 tries</pre>",
      steps: [
        { html: "<p><b>Understand.</b> What repeats? \"Read a guess, compare, give a hint.\" When does it stop? When the guess equals the secret — we do not know how many rounds that takes, so this is a job for <code>while</code>. What must we remember? The secret, the current guess and the number of tries.</p>" },
        { html: "<p><b>Plan one round first.</b> Forget the loop for a moment: read one guess and answer it. <code>prompt()</code> gives text, so wrap it in <code>Number()</code> — otherwise <code>\"37\" === 37</code> would be false.</p>", code: c`const secret = 37;
const guess = Number(prompt("Guess (1-100):"));
if (guess > secret) {
  console.log("Too high");
} else if (guess < secret) {
  console.log("Too low");
} else {
  console.log("Correct!");
}` },
        { html: "<p><b>Add the loop.</b> Read the first guess before the loop. The loop runs <i>while the guess is wrong</i>: give the hint, then read the next guess at the end of the body. When the guess is right, the loop ends by itself, so \"Correct\" moves after the loop. <code>guess</code> is now <code>let</code>, because it changes.</p>", code: c`let guess = Number(prompt("Guess (1-100):"));
while (guess !== secret) {
  if (guess > secret) {
    console.log("Too high");
  } else {
    console.log("Too low");
  }
  guess = Number(prompt("Guess (1-100):"));
}` },
        { html: "<p><b>Count the tries.</b> A counter starts at 1 (the first guess) and grows each time we read another guess. After the loop, a template string reports it.</p>", code: c`let tries = 1;
// ... inside the loop, after reading a new guess:
tries++;
// ... after the loop:
console.log(¦Correct! You needed #{tries} tries¦);` },
        { html: "<p><b>Test like a tester.</b> Put <code>50</code>, <code>25</code>, <code>37</code> in the Input box and compare with the expected output. Then test the edge case: <code>37</code> straight away should say 1 try. Finally try the random line and play a few rounds yourself.</p>" },
      ],
      code: c`// Number guessing game
const secret = 37; // a real game: Math.floor(Math.random() * 100) + 1
let tries = 1;
let guess = Number(prompt("Guess (1-100):"));
while (guess !== secret) {
  if (guess > secret) {
    console.log("Too high");
  } else {
    console.log("Too low");
  }
  guess = Number(prompt("Guess (1-100):"));
  tries++;
}
console.log(¦Correct! You needed #{tries} tries¦);`, stdin: "50\n25\n37" },
    { t: "p", html: "<p>The exercises below build the game in three milestones — one guess, the full loop, then a version with a limited number of tries — plus a few classic review problems.</p>" },
  ],
  practice: [
    { t: "try", title: "Watch the computer play", html: "<p>Here the computer picks a <b>random</b> secret and then plays against itself with the smart strategy: always guess the middle of the numbers that are still possible. Run it several times — it never needs more than 7 guesses. Then change <code>100</code> to <code>1000</code>: how many guesses now?</p>", code: c`const secret = Math.floor(Math.random() * 100) + 1;
let low = 1;
let high = 100;
let tries = 0;
let guess = 0;
while (guess !== secret) {
  guess = Math.floor((low + high) / 2);
  tries++;
  if (guess > secret) {
    console.log(guess, "Too high");
    high = guess - 1;
  } else if (guess < secret) {
    console.log(guess, "Too low");
    low = guess + 1;
  }
}
console.log(¦Found #{secret} in #{tries} tries¦);` },
    { t: "predict", code: c`const secret = 37;
let tries = 0;
let guess = 0;
do {
  tries++;
  guess += 20;
  console.log(guess, guess > secret ? "Too high" : guess < secret ? "Too low" : "Correct!");
} while (guess < secret);
console.log("Tries:", tries);`, explain: "The guess goes 20, then 40. 20 is too low; 40 is too high, and now <code>40 &lt; 37</code> is false, so the loop stops after <b>2</b> tries. A nested ternary picks one of three words — readable here, but an <code>if</code> chain is clearer for anything longer." },
    { t: "parsons", title: "FizzBuzz to 15", prompt: "Put the lines in order. Multiples of 3 show <code>Fizz</code>, of 5 <code>Buzz</code>, of both <code>FizzBuzz</code>, others the number.", lines: [c`for (let i = 1; i <= 15; i++) {`, c`  if (i % 15 === 0) {`, c`    console.log("FizzBuzz");`, c`  } else if (i % 3 === 0) {`, c`    console.log("Fizz");`, c`  } else if (i % 5 === 0) {`, c`    console.log("Buzz");`, c`  } else {`, c`    console.log(i);`, c`  }`, c`}`], explain: "The test for <b>both</b> (<code>% 15</code>) must come first: an <code>else if</code> chain stops at the first true test, so if <code>% 3</code> came first, 15 would show only <code>Fizz</code>." },
    { t: "turn", level: "Medium", q: "With the Input lines `80`, `20`, `37`, how many tries does the game from the worked example report? Type just the number.", answers: ["3"], e: "Three guesses were read: 80 (too high), 20 (too low) and 37 (correct). `tries` starts at 1 and grows twice.", hint: "Count the guesses, including the correct one.", placeholder: "a number", oneWord: true },
    { t: "predict", code: c`let line = "";
for (let i = 1; i <= 10; i++) {
  if (i % 4 === 0) break;
  line += i % 2 === 0 ? "E" : "O";
}
console.log(line);`, explain: "For 1, 2, 3 the ternary adds <code>O</code>, <code>E</code>, <code>O</code>. At 4, <code>4 % 4 === 0</code> and <code>break</code> ends the loop. Output: <b>OEO</b>." },
  ],
  exercises: [
    { id: "one-guess", lvl: "seed", title: "Milestone 1: one guess", prompt: "<p>The secret number is <code>37</code>. Read <b>one</b> guess and show <code>Too high</code>, <code>Too low</code> or <code>Correct!</code>.</p><pre class=\"code-static\">Input 50 → Too high</pre>", starter: c`const secret = 37;
const guess = Number(prompt("Guess (1-100):"));
`, tests: [{ stdin: "50", expected: "Too high" }, { stdin: "12", expected: "Too low" }, { stdin: "37", expected: "Correct!" }, { stdin: "38", expected: "Too high" }],
      hint: "An <code>if</code> / <code>else if</code> / <code>else</code> chain with <code>&gt;</code> and <code>&lt;</code>. Remember <code>Number()</code>.",
      solutions: [{ name: "if chain", code: c`const secret = 37;
const guess = Number(prompt("Guess (1-100):"));
if (guess > secret) {
  console.log("Too high");
} else if (guess < secret) {
  console.log("Too low");
} else {
  console.log("Correct!");
}`, note: "If it is neither higher nor lower, it must be equal — so plain <code>else</code> is enough." },
        { name: "Nested ternary", code: c`const secret = 37;
const guess = Number(prompt("Guess (1-100):"));
console.log(guess > secret ? "Too high" : guess < secret ? "Too low" : "Correct!");`, note: "Short, but harder to read. Fine for three choices; use <code>if</code> for more." }] },
    { id: "even-odd", lvl: "seed", title: "Even or odd?", prompt: "<p>Read a whole number and show whether it is even or odd, using a ternary. For <code>7</code>:</p><pre class=\"code-static\">7 is odd</pre>", tests: [{ stdin: "7", expected: "7 is odd" }, { stdin: "10", expected: "10 is even" }, { stdin: "0", expected: "0 is even" }],
      hint: "<code>n % 2 === 0</code> is true for even numbers. Put the ternary inside a template string.",
      solutions: [{ name: "Ternary", code: c`const n = Number(prompt("Number?"));
console.log(¦#{n} is #{n % 2 === 0 ? "even" : "odd"}¦);`, note: "The ternary gives back a word that goes straight into the template string." },
        { name: "if / else", code: c`const n = Number(prompt("Number?"));
if (n % 2 === 0) {
  console.log(n + " is even");
} else {
  console.log(n + " is odd");
}`, note: "Also correct — the ternary is just shorter." }] },
    { id: "guess-loop", lvl: "star", title: "Milestone 2: keep guessing", prompt: "<p>Turn milestone 1 into the full game. The secret is <code>37</code>. Read guesses until the guess is right. After each wrong guess show <code>Too high</code> or <code>Too low</code>. At the end show how many guesses were needed. For <code>50</code>, <code>25</code>, <code>37</code>:</p><pre class=\"code-static\">Too high\nToo low\nCorrect! You needed 3 tries</pre>", starter: c`const secret = 37;
`, tests: [{ stdin: "50\n25\n37", expected: "Too high\nToo low\nCorrect! You needed 3 tries" }, { stdin: "90\n10\n40\n30\n35\n37", expected: "Too high\nToo low\nToo high\nToo low\nToo low\nCorrect! You needed 6 tries" }, { stdin: "1\n37", expected: "Too low\nCorrect! You needed 2 tries" }],
      hint: "Read the first guess before a <code>while (guess !== secret)</code> loop. Inside: the hint, the next <code>prompt()</code>, and <code>tries++</code>.",
      solutions: [{ name: "while", code: c`const secret = 37;
let tries = 1;
let guess = Number(prompt("Guess (1-100):"));
while (guess !== secret) {
  if (guess > secret) {
    console.log("Too high");
  } else {
    console.log("Too low");
  }
  guess = Number(prompt("Guess (1-100):"));
  tries++;
}
console.log(¦Correct! You needed #{tries} tries¦);`, note: "The worked example from the lesson." },
        { name: "do...while", code: c`const secret = 37;
let tries = 0;
let guess;
do {
  guess = Number(prompt("Guess (1-100):"));
  tries++;
  if (guess > secret) {
    console.log("Too high");
  } else if (guess < secret) {
    console.log("Too low");
  }
} while (guess !== secret);
console.log(¦Correct! You needed #{tries} tries¦);`, note: "You always guess at least once, so <code>do...while</code> fits nicely: only one <code>prompt()</code> line, and <code>tries</code> starts at 0." }],
      twist: "Guessing it first time shows \"1 tries\". Use a ternary to write \"1 try\" instead." },
    { id: "fizzbuzz", lvl: "star", title: "FizzBuzz", prompt: "<p>The most famous programming interview question! Read <code>n</code> and show the numbers 1 to <code>n</code>, but show <code>Fizz</code> for multiples of 3, <code>Buzz</code> for multiples of 5, and <code>FizzBuzz</code> for multiples of both. For <code>6</code>:</p><pre class=\"code-static\">1\n2\nFizz\n4\nBuzz\nFizz</pre>", tests: [{ stdin: "6", expected: "1\n2\nFizz\n4\nBuzz\nFizz" }, { stdin: "15", expected: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz" }, { stdin: "2", expected: "1\n2" }],
      hint: "Test the \"both\" case first (<code>i % 15 === 0</code>, or <code>i % 3 === 0 &amp;&amp; i % 5 === 0</code>).",
      solutions: [{ name: "if chain", code: c`const n = Number(prompt("n?"));
for (let i = 1; i <= n; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}`, note: "The order of the tests matters: the most specific case first." },
        { name: "Build a word", code: c`const n = Number(prompt("n?"));
for (let i = 1; i <= n; i++) {
  let word = "";
  if (i % 3 === 0) word += "Fizz";
  if (i % 5 === 0) word += "Buzz";
  console.log(word === "" ? i : word);
}`, note: "Two separate <code>if</code>s glue the words together, so 15 gets both automatically. Adding a new rule (7 → \"Bazz\") is one more line." }] },
    { id: "canteen", lvl: "star", title: "Canteen till", prompt: "<p>The school canteen sells: <b>1</b> Juice (3 riyals), <b>2</b> Sandwich (7 riyals), <b>3</b> Water (1 riyal). Read item numbers until the user types <code>0</code>. Use a <code>switch</code> to show each item and its price; for any other number show <code>Unknown item</code>. At the end show the total. For <code>2</code>, <code>1</code>, <code>9</code>, <code>0</code>:</p><pre class=\"code-static\">Sandwich 7\nJuice 3\nUnknown item\nTotal: 10 riyals</pre>", tests: [{ stdin: "2\n1\n9\n0", expected: "Sandwich 7\nJuice 3\nUnknown item\nTotal: 10 riyals" }, { stdin: "3\n3\n2\n0", expected: "Water 1\nWater 1\nSandwich 7\nTotal: 9 riyals" }, { stdin: "0", expected: "Total: 0 riyals" }],
      hint: "A sentinel <code>while (item !== 0)</code> loop with <code>item = Number(prompt(...))</code>. Inside, <code>switch (item)</code> with <code>case 1:</code>, <code>case 2:</code>, <code>case 3:</code> and <code>default:</code> — each case adds to <code>total</code> and ends with <code>break</code>.",
      solutions: [{ name: "while + switch", code: c`let total = 0;
let item = Number(prompt("Item (0 to finish):"));
while (item !== 0) {
  switch (item) {
    case 1:
      console.log("Juice 3");
      total += 3;
      break;
    case 2:
      console.log("Sandwich 7");
      total += 7;
      break;
    case 3:
      console.log("Water 1");
      total += 1;
      break;
    default:
      console.log("Unknown item");
  }
  item = Number(prompt("Item (0 to finish):"));
}
console.log(¦Total: #{total} riyals¦);`, note: "Each <code>case</code> ends with <code>break</code>, otherwise the code would fall into the next case and add the wrong prices." }] },
    { id: "guess-limited", lvl: "fire", title: "Milestone 3: only 5 tries", prompt: "<p>Make the game harder: the player has <b>at most 5 guesses</b>. The secret is <code>37</code>.</p><ul><li>Wrong guess: show <code>Too high</code> or <code>Too low</code>.</li><li>Right guess: show <code>Correct! You needed N tries</code> — but <code>1 try</code> when it is the first guess — and stop reading.</li><li>After 5 wrong guesses: show <code>Game over! The number was 37</code>.</li></ul><pre class=\"code-static\">Input 1, 2, 3, 4, 5 →\nToo low\nToo low\nToo low\nToo low\nToo low\nGame over! The number was 37</pre>", tests: [{ stdin: "1\n2\n3\n4\n5", expected: "Too low\nToo low\nToo low\nToo low\nToo low\nGame over! The number was 37" }, { stdin: "50\n25\n37", expected: "Too high\nToo low\nCorrect! You needed 3 tries" }, { stdin: "37", expected: "Correct! You needed 1 try" }, { stdin: "90\n10\n40\n30\n37", expected: "Too high\nToo low\nToo high\nToo low\nCorrect! You needed 5 tries" }],
      hint: "A <code>for</code> loop from 1 to 5. A flag <code>won = false</code>. On a right guess: show the message, set <code>won = true</code> and <code>break</code>. After the loop: <code>if (!won)</code> → game over. For try/tries use a ternary.",
      solutions: [{ name: "for + break + flag", code: c`const secret = 37;
const maxTries = 5;
let won = false;
for (let tries = 1; tries <= maxTries; tries++) {
  const guess = Number(prompt("Guess (1-100):"));
  if (guess === secret) {
    console.log(¦Correct! You needed #{tries} #{tries === 1 ? "try" : "tries"}¦);
    won = true;
    break;
  }
  console.log(guess > secret ? "Too high" : "Too low");
}
if (!won) {
  console.log(¦Game over! The number was #{secret}¦);
}`, note: "We know the <i>maximum</i> number of rounds, so <code>for</code> fits; <code>break</code> ends early on a win. The flag remembers how the loop ended." },
        { name: "while with two conditions", code: c`const secret = 37;
let tries = 0;
let guess = 0;
while (guess !== secret && tries < 5) {
  guess = Number(prompt("Guess (1-100):"));
  tries++;
  if (guess > secret) {
    console.log("Too high");
  } else if (guess < secret) {
    console.log("Too low");
  }
}
if (guess === secret) {
  console.log(¦Correct! You needed #{tries} #{tries === 1 ? "try" : "tries"}¦);
} else {
  console.log(¦Game over! The number was #{secret}¦);
}`, note: "The loop stops for either reason (found it, or out of tries); after the loop, check which one happened. Starting <code>guess</code> at 0 works because 0 is never the secret." }],
      twist: "Swap in <code>Math.floor(Math.random() * 100) + 1</code>, and add a rule: a guess outside 1–100 shows <code>Out of range</code> and does not count as a try." },
  ],
  quiz: [
    { q: "What does this show?", code: c`console.log(5 > 3 && 2 > 4 || !false);`, o: ["`true`", "`false`", "`undefined`", "An error"], a: 0, e: "`5 > 3 && 2 > 4` is false; `!false` is true; false || true is `true`." },
    { q: "In an `if` / `else if` / `else` chain, how many blocks run at most?", o: ["One", "All the true ones", "Two", "None"], a: 0, e: "The chain runs only the first block whose condition is true (or the `else`)." },
    { q: "What happens if you forget `break` at the end of a `case`?", o: ["A SyntaxError", "The code falls through into the next case", "The switch restarts", "Nothing"], a: 1, e: "Without `break`, JavaScript keeps running the next case's code too." },
    { q: "Why do we write `Number(prompt(...))` in the guessing game?", o: ["`prompt()` gives text, and `\"37\" === 37` is false", "`prompt()` cannot be used alone", "To make the number random", "To count the tries"], a: 0, e: "`===` compares type too. Turning the answer into a number lets the comparison with `secret` work." },
    { q: "What does this show?", code: c`let n = 0;
for (let i = 10; i > 0; i -= 3) {
  n++;
}
console.log(n);`, o: ["`4`", "`3`", "`10`", "`5`"], a: 0, e: "`i` is 10, 7, 4, 1 — four rounds. Next would be -2, which fails `> 0`." },
    { q: "What does `Math.floor(Math.random() * 6) + 1` give?", o: ["A whole number from 1 to 6, like a dice", "A decimal from 0 to 6", "Always 6", "A whole number from 0 to 5"], a: 0, e: "`Math.random() * 6` is 0 to 5.99…; `Math.floor` makes it 0–5; `+ 1` shifts it to 1–6." },
  ],
  puzzle: { title: "How many guesses?", q: "<p>This program plays the guessing game <b>by itself</b>, always guessing the middle of the numbers that are still possible. The secret is 37. Without running it: what does it show?</p>", code: c`const secret = 37;
let low = 1;
let high = 100;
let tries = 0;
let guess = 0;
while (guess !== secret) {
  guess = Math.floor((low + high) / 2);
  tries++;
  if (guess > secret) high = guess - 1;
  else if (guess < secret) low = guess + 1;
}
console.log(tries);`, answers: ["3"], run: true, hint: "Follow `low`, `high` and `guess` in a small table, one row per round.", e: "Round 1: (1 + 100) / 2 → 50, too high, so `high` = 49. Round 2: (1 + 49) / 2 = 25, too low, so `low` = 26. Round 3: (26 + 49) / 2 = 37.5 → 37. Found in **3** tries." },
  cards: [
    { f: "`&&`, `||`, `!`?", b: "`&&` both must be true; `||` at least one is true; `!` flips true and false." },
    { f: "How many blocks of an `if / else if / else` chain run?", b: "At most one: the first whose condition is true (or the `else`)." },
    { f: "Ternary syntax?", b: "`condition ? valueIfTrue : valueIfFalse` — it gives back a value." },
    { f: "Random whole number from 1 to 100?", b: "`Math.floor(Math.random() * 100) + 1`" },
    { f: "Which loop for \"until the guess is right\"?", b: "`while (guess !== secret)` (or `do...while`) — you do not know the number of rounds in advance." },
  ],
  remember: [
    "Comparisons give `true` / `false`; combine them with `&&`, `||` and `!`. Use `===`.",
    "`if` / `else if` / `else` runs only the first true block; `switch` + `break` for exact menu choices; `? :` for a quick value.",
    "`while` when you stop because something happens; `for` when you know the number of rounds.",
    "Read with `prompt()` once before a `while` loop and again at the end of the body; wrap numbers in `Number()`.",
    "A flag (`let won = false;`) remembers what happened inside a loop.",
    "Plan first: one round without a loop, then the loop, then the counters, then test the edge cases.",
  ],
};
})();
