window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[12] = {
  title: "for loops, break and continue",
  intro: "Yesterday you built loops with <code>while</code>, {{name}}. Today you meet the loop programmers type most often: <code>for</code>. It packs the start, the check and the change into one tidy line. You will also learn to leave a loop early, skip a round, walk through a word letter by letter, and draw patterns with loops inside loops.",
  goals: [
    "Write a `for (start; check; change)` loop and read its three parts",
    "Count up, count down and count in steps",
    "Visit every letter of a string with `s.length` and `s[i]`",
    "Stop a loop early with `break` and skip a round with `continue`",
    "Use a loop inside a loop for tables and star patterns",
    "Choose between `for` and `while`, and avoid off-by-one mistakes",
  ],
  learn: [
    { t: "h", text: "for: a counter loop in one line" },
    { t: "p", html: "<p>Most <code>while</code> loops you wrote yesterday had the same shape: create a counter, check it, change it at the bottom of the body. Those three pieces were spread over three different lines, and forgetting the last one gave an infinite loop. The <code>for</code> loop puts all three pieces <b>in one line</b>, so you can see the whole plan at a glance.</p>" },
    { t: "code", code: c`for (let i = 1; i <= 5; i++) {
  console.log("Push-up", i);
}
console.log("Rest!");`, before: "<p>Run it. It does exactly what a counter <code>while</code> loop does.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`for (`, "Start a <code>for</code> loop. The parentheses hold <b>three</b> parts separated by <b>semicolons</b>."],
      [c`let i = 1;`, "<b>Start</b>: runs once, before everything else. <code>i</code> is the usual name for a loop counter (think <i>index</i>)."],
      [c`i <= 5;`, "<b>Check</b>: tested before every round, exactly like the condition of <code>while</code>."],
      [c`i++)`, "<b>Change</b>: runs at the end of every round, after the body."],
      [c`{ console.log("Push-up", i); }`, "The <b>body</b>: the work that repeats."],
    ] },
    { t: "analogy", title: "The for line is like a gym instruction", html: "<p>A coach does not say \"do a push-up, now count, now check, now do another\". She says: <i>\"Start at one, go up to five, one at a time.\"</i> The whole plan fits in one sentence. The <code>for</code> line is that sentence; the body is the push-up.</p>" },
    { t: "static", code: c`// the same loop written with while
let i = 1;            // start
while (i <= 5) {      // check
  console.log("Push-up", i);
  i++;                // change
}` },
    { t: "check", q: "In `for (let i = 0; i < 3; i++)`, which part runs **only once**?", o: ["`let i = 0`", "`i < 3`", "`i++`", "The body"], a: 0, e: "The start part runs once at the beginning. The check runs before every round, and the change after every round.", hint: "Which part would make no sense to repeat?" },
    { t: "viz", code: c`for (let i = 1; i <= 3; i++) {
  console.log("Round", i);
}
console.log("Done");`, before: "<p>Press <b>Visualize</b> and step through. Watch the order: start → check → body → change → check → body → …</p>" },
    { t: "h", text: "Counting up, down and in steps" },
    { t: "p", html: "<p>The three parts can be anything you like. Change the start, the check and the change, and the same loop counts backwards or skips numbers. This is handy for a countdown, for even numbers or for the multiples of 5.</p>" },
    { t: "code", code: c`for (let i = 10; i >= 0; i -= 5) {
  console.log("Countdown:", i);
}
for (let m = 5; m <= 20; m += 5) {
  console.log("Multiple of 5:", m);
}`, note: "<p>The first loop goes <b>down</b> by 5 (<code>i -= 5</code>) while <code>i &gt;= 0</code>. The second goes <b>up</b> by 5. When counting down, the check usually uses <code>&gt;</code> or <code>&gt;=</code>.</p>" },
    { t: "turn", level: "Easy", q: "What does this loop show? Type the numbers separated by spaces.", code: c`for (let i = 0; i < 10; i += 3) {
  console.log(i);
}`, answers: ["0 3 6 9", "0,3,6,9", "0, 3, 6, 9"], run: true, e: "`i` is 0, 3, 6, 9. The next value, 12, fails the check `12 < 10`.", hint: "Start at 0 and add 3 each time while the number is less than 10.", placeholder: "e.g. 1 2 3" },
    { t: "h", text: "Looping over a string" },
    { t: "p", html: "<p>A string is a row of characters, and each one has a position number called an <b>index</b>. The first index is <b>0</b>, not 1. <code>s[i]</code> gives the character at index <code>i</code>, and <code>s.length</code> tells you how many characters there are. Together with a <code>for</code> loop, you can visit every letter of a word — to count vowels, check a password or spell a name.</p>" },
    { t: "code", code: c`const city = "Riyadh";
for (let i = 0; i < city.length; i++) {
  console.log(i, city[i]);
}`, note: "<p>\"Riyadh\" has 6 letters, at indexes 0 to 5. That is why the check is <code>i &lt; city.length</code>: <code>i</code> stops at 5, the last index.</p>" },
    { t: "check", q: "What does this show?", code: c`const word = "loop";
console.log(word[0], word[word.length - 1]);`, o: ["`l p`", "`l o`", "`o p`", "`undefined`"], a: 0, e: "Index 0 is the first letter `l`. The last index is always `length - 1` (here 3), which is `p`.", hint: "Indexes start at 0, so the last one is one less than the length." },
    { t: "h", text: "break: leave the loop now" },
    { t: "p", html: "<p>Sometimes you find what you were looking for before the loop is over. Searching the rest is a waste of time. <code>break</code> jumps out of the loop immediately, and the program continues after the <code>}</code>.</p>" },
    { t: "analogy", title: "break is the fire alarm", html: "<p>The lesson plan says 45 minutes, but when the fire alarm rings, everyone leaves <b>now</b> — nobody finishes the exercise. <code>break</code> is the alarm: the loop ends right there, whatever the condition says.</p>" },
    { t: "code", code: c`for (let n = 1; n <= 100; n++) {
  if (n % 7 === 0 && n % 5 === 0) {
    console.log("First number divisible by 5 and 7:", n);
    break;
  }
}`, note: "<p>The loop could go up to 100, but it stops at 35, the first number that passes both tests. Without <code>break</code> it would also show 70.</p>" },
    { t: "h", text: "continue: skip this round" },
    { t: "p", html: "<p><code>continue</code> is gentler. It does not end the loop; it skips <b>the rest of this round</b> and goes on with the next one (in a <code>for</code> loop, the change part still runs). Use it to ignore the values you do not want.</p>" },
    { t: "code", code: c`for (let i = 1; i <= 10; i++) {
  if (i % 3 === 0) {
    continue;
  }
  console.log(i);
}`, note: "<p>3, 6 and 9 are skipped: when <code>i % 3 === 0</code>, <code>continue</code> jumps over the <code>console.log</code>.</p>" },
    { t: "check", q: "How many numbers does this show?", code: c`for (let i = 1; i <= 10; i++) {
  if (i === 4) {
    break;
  }
  console.log(i);
}`, o: ["3", "4", "9", "10"], a: 0, e: "It shows 1, 2, 3. When `i` is 4, `break` ends the whole loop before the `console.log`.", hint: "`break` ends everything; `continue` would only skip 4." },
    { t: "h", text: "Loops inside loops" },
    { t: "p", html: "<p>The body of a loop can contain another loop. For every single round of the outer loop, the inner loop runs <b>completely</b>. This is how you build tables (rows × columns) and drawings made of characters.</p>" },
    { t: "analogy", title: "Nested loops are like a clock", html: "<p>The minute hand goes all the way round, 60 steps, and only then does the hour hand move one step. The hour hand is the outer loop; the minute hand is the inner loop.</p>" },
    { t: "code", code: c`for (let row = 1; row <= 3; row++) {
  let line = "";
  for (let col = 1; col <= 3; col++) {
    line += row * col + "\t";
  }
  console.log(line);
}`, note: "<p>The outer loop makes 3 rows. For each row, the inner loop builds a line of 3 products, separated by tabs. Then the line is shown. 3 × 3 = 9 multiplications in total.</p>" },
    { t: "viz", code: c`for (let row = 1; row <= 2; row++) {
  for (let col = 1; col <= 3; col++) {
    console.log(row, col);
  }
}`, before: "<p>Watch <code>col</code> run 1, 2, 3 while <code>row</code> stays the same — then <code>row</code> moves and <code>col</code> starts again.</p>" },
    { t: "code", code: c`for (let i = 1; i <= 4; i++) {
  console.log("*".repeat(i));
}`, before: "<p>For star patterns, <code>.repeat()</code> from Day 1 can replace the inner loop.</p>" },
    { t: "turn", level: "Medium", q: "How many stars does this program print **in total**?", code: c`let stars = "";
for (let a = 1; a <= 3; a++) {
  for (let b = 1; b <= 4; b++) {
    stars += "*";
  }
}
console.log(stars.length);`, answers: ["12"], run: true, e: "The inner loop adds 4 stars, and it runs once for each of the 3 rounds of the outer loop: 3 × 4 = 12.", hint: "Rounds of the outer loop × rounds of the inner loop." },
    { t: "h", text: "for or while?" },
    { t: "table", head: ["Situation", "Best choice", "Example"], rows: [
      ["You know how many rounds", "`for`", "1 to 10, every letter of a word"],
      ["You stop when something happens", "`while`", "read until \"stop\", save until 1000 riyals"],
      ["The body must run at least once", "`do...while`", "show a menu, then ask again"],
    ] },
    { t: "h", text: "Off-by-one: < or <=?" },
    { t: "p", html: "<p>The most common loop bug in the world is running <b>one round too many or too few</b>. Before you run a loop, say its first and last value out loud. <code>i &lt; 5</code> stops at 4; <code>i &lt;= 5</code> stops at 5. With strings, always use <code>i &lt; s.length</code>, because the last index is <code>length - 1</code>.</p>" },
    { t: "check", q: "How many times does the body run?", code: c`for (let i = 0; i <= 5; i++) {
  console.log(i);
}`, o: ["5", "6", "4", "It never stops"], a: 1, e: "`i` takes the values 0, 1, 2, 3, 4, 5 — that is six values. Starting at 0 with `<=` adds one extra round.", hint: "Count the values from the first to the last, including both." },
    { t: "steps", title: "Does the password have a digit?", problem: "<p>A school website says: <i>a password must contain at least one digit</i>. Read a password with <code>prompt()</code> and show <code>Strong enough</code> or <code>Add a digit</code>. Stop looking as soon as you find a digit.</p>",
      steps: [
        { html: "<p><b>Understand.</b> We must look at each character of the string. A character is a digit if it is between <code>\"0\"</code> and <code>\"9\"</code> (strings compare like a dictionary, so this works for single characters).</p>" },
        { html: "<p><b>Plan.</b> A <code>for</code> loop over the string. A <b>flag</b> variable <code>hasDigit</code> starts as <code>false</code> and becomes <code>true</code> when we find a digit. Then <code>break</code>, because one digit is enough.</p>", code: c`const password = prompt("Password:");
let hasDigit = false;` },
        { html: "<p><b>Build the loop.</b> Visit every index from 0 to <code>length - 1</code> and test the character.</p>", code: c`for (let i = 0; i < password.length; i++) {
  const ch = password[i];
  if (ch >= "0" && ch <= "9") {
    hasDigit = true;
    break;
  }
}` },
        { html: "<p><b>Answer after the loop.</b> The flag tells us what the loop found. A ternary from Day 10 picks the message.</p>", code: c`console.log(hasDigit ? "Strong enough" : "Add a digit");` },
        { html: "<p><b>Test.</b> Try <code>falcon7</code>, <code>falcon</code> and <code>9lives</code> in the Input box. Use <b>Visualize</b> to see the loop stop early.</p>" },
      ],
      code: c`const password = prompt("Password:");
let hasDigit = false;
for (let i = 0; i < password.length; i++) {
  const ch = password[i];
  if (ch >= "0" && ch <= "9") {
    hasDigit = true;
    break;
  }
}
console.log(hasDigit ? "Strong enough" : "Add a digit");`, stdin: "falcon7" },
  ],
  mistakes: [
    { title: "Commas instead of semicolons", html: "The three parts of a <code>for</code> line are separated by <b>semicolons</b>. Commas give a SyntaxError.", wrong: c`for (let i = 0, i < 5, i++) {
  console.log(i);
}`, right: c`for (let i = 0; i < 5; i++) {
  console.log(i);
}` },
    { title: "<= s.length on a string", html: "The last index is <code>length - 1</code>. With <code>&lt;=</code> the loop goes one step too far and <code>s[i]</code> is <code>undefined</code>.", wrong: c`for (let i = 0; i <= s.length; i++) {
  console.log(s[i]);
}`, right: c`for (let i = 0; i < s.length; i++) {
  console.log(s[i]);
}` },
    { title: "A semicolon after for (…)", html: "<code>for (…);</code> repeats an empty statement. The body below runs only once, after the loop.", wrong: c`for (let i = 0; i < 3; i++); {
  console.log("Hi");
}`, right: c`for (let i = 0; i < 3; i++) {
  console.log("Hi");
}` },
    { title: "The same counter name in nested loops", html: "If the inner loop also uses <code>i</code>, the two loops fight over one counter. Give each loop its own name (<code>row</code> / <code>col</code>, or <code>i</code> / <code>j</code>).", wrong: c`for (let i = 1; i <= 3; i++) {
  for (let i = 1; i <= 3; i++) {
    console.log(i * i);
  }
}`, right: c`for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(i * j);
  }
}` },
  ],
  tricks: [
    { title: "Reverse a string by looping backwards", html: "Start at the last index and count down to 0, adding each character to a new string.", code: c`const word = "stressed";
let reversed = "";
for (let i = word.length - 1; i >= 0; i--) {
  reversed += word[i];
}
console.log(reversed);` },
    { title: "Count with a condition", html: "An accumulator plus an <code>if</code> counts only the items you care about — here, vowels.", code: c`const text = "javascript is fun";
let vowels = 0;
for (let i = 0; i < text.length; i++) {
  if ("aeiou".includes(text[i])) {
    vowels++;
  }
}
console.log("Vowels:", vowels);` },
    { title: "Right-aligned triangle with repeat", html: "Combine spaces and stars: fewer spaces, more stars on every row.", code: c`const size = 4;
for (let i = 1; i <= size; i++) {
  console.log(" ".repeat(size - i) + "*".repeat(i));
}` },
  ],
  practice: [
    { t: "try", title: "Make it yours", html: "<p>Spell your name letter by letter. Then change the loop so it shows the letters in capitals, or numbers them from 1 instead of 0.</p>", code: c`const name = "{{name}}";
for (let i = 0; i < name.length; i++) {
  console.log(i, name[i]);
}` },
    { t: "predict", code: c`for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue;
  }
  if (i > 7) {
    break;
  }
  console.log(i);
}`, explain: "Even numbers are skipped by <code>continue</code>. The odd numbers 1, 3, 5, 7 are shown. At 9, <code>9 &gt; 7</code> is true and <code>break</code> ends the loop, so 9 is never shown." },
    { t: "parsons", title: "A staircase of stars", prompt: "Order the lines to draw:<pre class=\"code-static\">*\n**\n***</pre>using two nested loops.", lines: [c`for (let row = 1; row <= 3; row++) {`, c`  let line = "";`, c`  for (let k = 1; k <= row; k++) {`, c`    line += "*";`, c`  }`, c`  console.log(line);`, c`}`], distractors: [c`  for (let k = 1; k <= 3; k++) {`], explain: "The inner loop runs <code>row</code> times, so each row has one more star. The line is shown after the inner loop and before the outer loop's <code>}</code>." },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`let s = "";
for (let i = 5; i > 0; i--) {
  s += i;
}
console.log(s);`, answers: ["54321"], run: true, e: "`i` counts down 5, 4, 3, 2, 1, and each number is glued to the string `s`.", hint: "Adding a number to a string glues it on." },
    { t: "predict", code: c`const word = "banana";
let count = 0;
for (let i = 0; i < word.length; i++) {
  if (word[i] === "a") {
    count++;
  }
}
console.log(count);`, explain: "The loop visits all 6 letters and counts each <code>a</code>: there are <b>3</b>." },
    { t: "try", title: "Your own pattern", html: "<p>Change the characters and the numbers to draw a pyramid, a square or a diamond. What does <code>size - i</code> do?</p>", code: c`const size = 5;
for (let i = 1; i <= size; i++) {
  console.log(" ".repeat(size - i) + "#".repeat(2 * i - 1));
}` },
    { t: "turn", level: "Hard", q: "How many times is `Hi` shown?", code: c`for (let a = 0; a < 4; a++) {
  for (let b = a; b < 4; b++) {
    console.log("Hi");
  }
}`, answers: ["10"], e: "The inner loop starts at `a`, so it runs 4, then 3, then 2, then 1 times: 4 + 3 + 2 + 1 = 10.", hint: "Count the inner rounds separately for a = 0, 1, 2 and 3.", placeholder: "a number", oneWord: true },
  ],
  exercises: [
    { id: "multiples", lvl: "seed", title: "Multiples of 5", prompt: "<p>Read a number <code>n</code> and show the first <code>n</code> multiples of 5, one per line. For <code>4</code>:</p><pre class=\"code-static\">5\n10\n15\n20</pre>", starter: c`const n = Number(prompt("How many?"));
`, tests: [{ stdin: "4", expected: "5\n10\n15\n20" }, { stdin: "1", expected: "5" }, { stdin: "6", expected: "5\n10\n15\n20\n25\n30" }],
      hint: "<code>for (let i = 1; i &lt;= n; i++)</code> and show <code>i * 5</code>.",
      solutions: [{ name: "Multiply", code: c`const n = Number(prompt("How many?"));
for (let i = 1; i <= n; i++) {
  console.log(i * 5);
}`, note: "The counter goes 1 to n; the body multiplies." },
        { name: "Step by 5", code: c`const n = Number(prompt("How many?"));
for (let m = 5; m <= n * 5; m += 5) {
  console.log(m);
}`, note: "The counter itself jumps by 5, up to the last multiple <code>n * 5</code>." }] },
    { id: "spell", lvl: "seed", title: "Spell it out", prompt: "<p>Read a word and show each letter on its own line, in capitals. For <code>code</code>:</p><pre class=\"code-static\">C\nO\nD\nE</pre>", tests: [{ stdin: "code", expected: "C\nO\nD\nE" }, { stdin: "js", expected: "J\nS" }],
      hint: "Loop from 0 while <code>i &lt; word.length</code>, and show <code>word[i].toUpperCase()</code>.",
      solutions: [{ name: "Index loop", code: c`const word = prompt("Word?");
for (let i = 0; i < word.length; i++) {
  console.log(word[i].toUpperCase());
}`, note: "<code>word[i]</code> is a one-letter string, so string methods work on it." },
        { name: "Upper first", code: c`const word = prompt("Word?").toUpperCase();
for (let i = 0; i < word.length; i++) {
  console.log(word[i]);
}`, note: "Change the whole word to capitals once, then loop." }] },
    { id: "vowels", lvl: "star", title: "Count the vowels", prompt: "<p>Read a sentence and count its vowels (a, e, i, o, u — small or capital). For <code>I love JavaScript</code>:</p><pre class=\"code-static\">Vowels: 6</pre>", tests: [{ stdin: "I love JavaScript", expected: "Vowels: 6" }, { stdin: "Riyadh", expected: "Vowels: 2" }, { stdin: "rhythm", expected: "Vowels: 0" }],
      hint: "Make the sentence lower case first. Inside the loop, <code>\"aeiou\".includes(ch)</code> tells you if <code>ch</code> is a vowel.",
      solutions: [{ name: "includes", code: c`const text = prompt("Sentence?").toLowerCase();
let count = 0;
for (let i = 0; i < text.length; i++) {
  if ("aeiou".includes(text[i])) {
    count++;
  }
}
console.log("Vowels:", count);`, note: "A counter plus a condition." },
        { name: "|| and ===", code: c`const text = prompt("Sentence?").toLowerCase();
let count = 0;
for (let i = 0; i < text.length; i++) {
  const ch = text[i];
  if (ch === "a" || ch === "e" || ch === "i" || ch === "o" || ch === "u") {
    count++;
  }
}
console.log("Vowels:", count);`, note: "Longer, but uses only Day 8 tools." }] },
    { id: "skip-sum", lvl: "star", title: "Sum without multiples of 3", prompt: "<p>Read <code>n</code> and add up the numbers from 1 to <code>n</code>, <b>skipping</b> every multiple of 3. Use <code>continue</code>. For <code>10</code>: 1+2+4+5+7+8+10 =</p><pre class=\"code-static\">37</pre>", tests: [{ stdin: "10", expected: "37" }, { stdin: "3", expected: "3" }, { stdin: "20", expected: "147" }],
      hint: "Inside the loop: <code>if (i % 3 === 0) continue;</code> before adding.",
      solutions: [{ name: "continue", code: c`const n = Number(prompt("n?"));
let sum = 0;
for (let i = 1; i <= n; i++) {
  if (i % 3 === 0) {
    continue;
  }
  sum += i;
}
console.log(sum);`, note: "<code>continue</code> jumps over <code>sum += i</code> for 3, 6, 9…" },
        { name: "if only", code: c`const n = Number(prompt("n?"));
let sum = 0;
for (let i = 1; i <= n; i++) {
  if (i % 3 !== 0) {
    sum += i;
  }
}
console.log(sum);`, note: "The same result by flipping the condition. Both are fine." }] },
    { id: "triangle", lvl: "star", title: "Number triangle", prompt: "<p>Read <code>n</code> and draw this triangle (for <code>4</code>). There are no spaces between the digits.</p><pre class=\"code-static\">1\n12\n123\n1234</pre>", tests: [{ stdin: "4", expected: "1\n12\n123\n1234" }, { stdin: "2", expected: "1\n12" }, { stdin: "6", expected: "1\n12\n123\n1234\n12345\n123456" }],
      hint: "Outer loop for the rows. Inner loop from 1 to <code>row</code> that glues each number to a string. Show the string after the inner loop.",
      solutions: [{ name: "Nested loops", code: c`const n = Number(prompt("n?"));
for (let row = 1; row <= n; row++) {
  let line = "";
  for (let k = 1; k <= row; k++) {
    line += k;
  }
  console.log(line);
}`, note: "The inner loop builds one row; the outer loop repeats it." },
        { name: "One loop", code: c`const n = Number(prompt("n?"));
let line = "";
for (let row = 1; row <= n; row++) {
  line += row;
  console.log(line);
}`, note: "Clever: each row is the previous row plus one more digit, so one growing string is enough." }] },
    { id: "prime", lvl: "fire", title: "Is it prime?", prompt: "<p>A <b>prime</b> number is bigger than 1 and can be divided evenly only by 1 and itself (2, 3, 5, 7, 11…). Read a whole number and show <code>N is prime</code> or <code>N is not prime</code>. Use <code>break</code> to stop as soon as you find a divisor.</p><pre class=\"code-static\">29 is prime</pre>", tests: [{ stdin: "29", expected: "29 is prime" }, { stdin: "21", expected: "21 is not prime" }, { stdin: "2", expected: "2 is prime" }, { stdin: "1", expected: "1 is not prime" }, { stdin: "97", expected: "97 is prime" }],
      hint: "A flag <code>isPrime = n &gt; 1</code>. Try every divisor <code>d</code> from 2 while <code>d &lt; n</code>; if <code>n % d === 0</code>, set the flag to false and <code>break</code>.",
      solutions: [{ name: "Flag + break", code: c`const n = Number(prompt("Number?"));
let isPrime = n > 1;
for (let d = 2; d < n; d++) {
  if (n % d === 0) {
    isPrime = false;
    break;
  }
}
console.log(¦#{n} is #{isPrime ? "prime" : "not prime"}¦);`, note: "1 is not prime, so the flag starts as <code>n &gt; 1</code>. For 2 the loop runs zero times." },
        { name: "Faster: up to the square root", code: c`const n = Number(prompt("Number?"));
let isPrime = n > 1;
for (let d = 2; d * d <= n; d++) {
  if (n % d === 0) {
    isPrime = false;
    break;
  }
}
console.log(¦#{n} is #{isPrime ? "prime" : "not prime"}¦);`, note: "If <code>n</code> has a divisor, one of them is at most √n, so we can stop at <code>d * d &lt;= n</code>. For big numbers this is much faster." }] },
    { id: "fix-reverse", lvl: "fire", debug: true, title: "Fix the word reverser", prompt: "<p>This program should read a word and show it backwards. For <code>stressed</code>:</p><pre class=\"code-static\">desserts</pre><p>It has <b>three</b> bugs. Run it and read the result carefully.</p>",
      starter: c`const word = prompt("Word?");
let result = "";
for (let i = word.length; i > 0; i--) {
  result = word[i];
}
console.log(result);`, tests: [{ stdin: "stressed", expected: "desserts" }, { stdin: "abc", expected: "cba" }, { stdin: "x", expected: "x" }],
      hint: "Which index is the last letter? Is the first letter (index 0) ever visited? Does <code>result</code> grow, or is it replaced each round?",
      solutions: [{ name: "Fixed", code: c`const word = prompt("Word?");
let result = "";
for (let i = word.length - 1; i >= 0; i--) {
  result += word[i];
}
console.log(result);`, note: "Bug 1: the last index is <code>length - 1</code>. Bug 2: <code>i &gt; 0</code> skipped index 0 → <code>i &gt;= 0</code>. Bug 3: <code>=</code> replaced the result each round → <code>+=</code> adds to it." }] },
  ],
  quiz: [
    { q: "What separates the three parts inside `for ( … )`?", o: ["Commas `,`", "Semicolons `;`", "Colons `:`", "Spaces"], a: 1, e: "`for (start; check; change)` — two semicolons." },
    { q: "What does this show?", code: c`for (let i = 3; i > 0; i--) {
  console.log(i);
}`, o: ["`3 2 1`", "`3 2 1 0`", "`1 2 3`", "`2 1 0`"], a: 0, e: "`i` is 3, 2, 1. At 0 the check `0 > 0` is false." },
    { q: "What does this show?", code: c`const s = "Hello";
console.log(s.length, s[1]);`, o: ["`5 e`", "`5 H`", "`4 e`", "`6 l`"], a: 0, e: "5 characters; index 1 is the second letter, `e`." },
    { q: "What does `continue` do?", o: ["Ends the loop", "Skips the rest of this round and goes to the next round", "Starts the loop again from the beginning", "Pauses the program"], a: 1, e: "`continue` skips to the next round; `break` ends the loop." },
    { q: "What does this show?", code: c`let n = 0;
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 2; j++) {
    n++;
  }
}
console.log(n);`, o: ["`5`", "`6`", "`3`", "`9`"], a: 1, e: "The inner loop runs 2 times for each of the 3 outer rounds: 3 × 2 = 6." },
    { q: "You must read answers until the user types `stop`. Which loop fits best?", o: ["`for`", "`while`", "Two nested `for` loops", "No loop is needed"], a: 1, e: "You do not know the number of rounds in advance, so a `while` loop is the natural choice." },
  ],
  puzzle: { title: "Break, continue, repeat", q: "<p>Without running it: what <b>exactly</b> does this program show? Type the output on one line.</p>", code: c`let out = "";
for (let i = 1; i <= 9; i++) {
  if (i % 2 === 0) continue;
  if (i === 7) break;
  out += i;
}
console.log(out, out.length);`, answers: ["135 3"], run: true, hint: "Even numbers are skipped. The loop ends when `i` reaches 7, before it is added.", e: "Odd numbers 1, 3, 5 are added to the string; at 7 the loop breaks. `out` is `\"135\"`, which has 3 characters." },
  cards: [
    { f: "The three parts of a `for` loop?", b: "`for (start; check; change)` — e.g. `for (let i = 0; i < 5; i++)`." },
    { f: "How do you visit every letter of `s`?", b: "`for (let i = 0; i < s.length; i++)` and use `s[i]`. Indexes go from 0 to `s.length - 1`." },
    { f: "`break` vs `continue`?", b: "`break` ends the loop now. `continue` skips the rest of this round and goes to the next." },
    { f: "How many rounds in nested loops?", b: "Outer rounds × inner rounds (3 rows × 4 columns = 12)." },
    { f: "`for` or `while`?", b: "`for` when you know how many rounds; `while` when you stop because something happens." },
  ],
  remember: [
    "`for (let i = 1; i <= n; i++) { … }`: start runs once, the check before every round, the change after every round.",
    "Count down with `i--` and a `>` / `>=` check; count in steps with `i += 2`, `i -= 5`…",
    "A string's indexes go from 0 to `length - 1`: loop with `i < s.length` and read `s[i]`.",
    "`break` leaves the loop; `continue` skips to the next round.",
    "In nested loops the inner loop finishes completely for every round of the outer loop.",
    "Off-by-one check: say the first and the last value before you run the loop.",
  ],
};
})();
