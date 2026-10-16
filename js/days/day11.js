window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[11] = {
  title: "while loops",
  intro: "Until today, every line of your programs ran once. Today, {{name}}, you teach JavaScript to <b>repeat</b>: count to a thousand, add up a list of prices, keep asking questions until the user types \"stop\". This is where programs start doing the boring work for you.",
  goals: [
    "Explain why loops exist and write a `while (condition) { }` loop",
    "Use the **counter** pattern to repeat something a fixed number of times",
    "Use the **accumulator** pattern to build a total step by step",
    "Spot and fix an infinite loop (the loop variable must change)",
    "Use `do...while` when the body must run at least once",
    "Read `prompt()` answers in a loop until a stop word, and take a number apart digit by digit",
  ],
  learn: [
    { t: "h", text: "Why loops?" },
    { t: "p", html: "<p>Imagine your teacher asks you to print the numbers 1 to 5. Easy: five <code>console.log</code> lines. Now she asks for 1 to 1000. Copying a line 1000 times is slow, boring and full of typos. Programmers write the instruction <b>once</b> and tell the computer how many times to repeat it. That is a <b>loop</b>.</p>" },
    { t: "analogy", title: "A loop is like running laps", html: "<p>Your PE coach says: <i>\"Keep running while you have done fewer than 4 laps.\"</i> Before each lap you check the rule. If it is still true, you run one more lap and add one to your count. When the rule becomes false, you stop. A <code>while</code> loop works exactly like this: <b>check, run, check, run… stop</b>.</p>" },
    { t: "h", text: "while (condition) { … }" },
    { t: "code", code: c`let lap = 1;
while (lap <= 4) {
  console.log("Running lap", lap);
  lap++;
}
console.log("Finished!");`, before: "<p>Run it and count the lines of output.</p>", note: "<p>The body (the part between <code>{ }</code>) ran 4 times. After lap 4, <code>lap</code> became 5, the condition <code>5 &lt;= 4</code> was <code>false</code>, and JavaScript jumped to the line after the loop.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`let lap = 1;`, "Create the <b>loop variable</b> before the loop. It remembers where we are."],
      [c`while (lap <= 4) {`, "<code>while</code> means \"as long as\". The <b>condition</b> in the parentheses is checked <b>before every round</b>. True → run the body. False → skip to after the <code>}</code>."],
      [c`  console.log("Running lap", lap);`, "The work we want to repeat. It is indented two spaces so you can see it belongs to the loop."],
      [c`  lap++;`, "Move one step closer to the end. Without this line the condition would stay true forever."],
      [c`console.log("Finished!");`, "After the loop. It runs once, when the condition is finally false."],
    ] },
    { t: "check", q: "How many times does the body run?", code: c`let n = 3;
while (n <= 6) {
  console.log(n);
  n++;
}`, o: ["3 times", "4 times", "6 times", "It never stops"], a: 1, e: "`n` takes the values 3, 4, 5 and 6 — that is 4 rounds. When `n` is 7, `7 <= 6` is false and the loop ends.", hint: "Write down the value of `n` before each check." },
    { t: "viz", code: c`let lap = 1;
while (lap <= 3) {
  console.log("Lap", lap);
  lap++;
}
console.log("Done");`, before: "<p>Press <b>Visualize</b> and click <b>Next ▶</b>. Watch <code>lap</code> grow in the variables panel and see how JavaScript jumps back up to the <code>while</code> line after each round.</p>" },
    { t: "h", text: "The counter pattern" },
    { t: "p", html: "<p>Most loops you will write follow the same three-part recipe: <b>start</b> a counter, <b>check</b> it in the condition, <b>change</b> it at the end of the body. The counter can go up, go down, or jump by more than one.</p>" },
    { t: "code", code: c`let seconds = 5;
while (seconds > 0) {
  console.log(seconds);
  seconds--;
}
console.log("Lift off! 🚀");`, note: "<p>This time the counter goes <b>down</b> with <code>--</code>, and the condition is <code>seconds &gt; 0</code>. Same recipe: start, check, change.</p>" },
    { t: "turn", level: "Easy", q: "The counter jumps by 2. What is the **last** number this loop shows?", code: c`let k = 1;
while (k < 10) {
  console.log(k);
  k += 2;
}`, answers: ["9"], e: "`k` is 1, 3, 5, 7, 9. Then it becomes 11, and `11 < 10` is false, so 9 is the last number shown.", hint: "List the values: 1, then add 2, then add 2 again… stop when the condition is false.", placeholder: "a number", oneWord: true },
    { t: "h", text: "The accumulator: building a total" },
    { t: "p", html: "<p>A counter tells you <i>which round</i> you are in. Often you also want to <b>collect</b> something across the rounds: the total of your marks, the sum of all prices. For that you use a second variable, an <b>accumulator</b>. It starts at 0 and each round adds something to it.</p>" },
    { t: "analogy", title: "An accumulator is like a piggy bank", html: "<p>Every week you drop your pocket money into a piggy bank. The bank does not remember each coin — it just keeps a growing total. <code>total += amount</code> is dropping a coin in.</p>" },
    { t: "code", code: c`let total = 0;
let n = 1;
while (n <= 10) {
  total += n;
  n++;
}
console.log("1 + 2 + ... + 10 =", total);`, note: "<p><code>total</code> grows like this: 0 → 1 → 3 → 6 → 10 → … → 55. The accumulator must start at <b>0</b> and be created <b>before</b> the loop, or it would restart every round.</p>" },
    { t: "viz", code: c`let total = 0;
let n = 1;
while (n <= 4) {
  total += n;
  n++;
}
console.log(total);`, before: "<p>Watch <b>two</b> variables this time: <code>n</code> (the counter) and <code>total</code> (the accumulator).</p>" },
    { t: "turn", level: "Medium", q: "What does this program show?", code: c`let sum = 0;
let i = 1;
while (i <= 5) {
  sum += i;
  i++;
}
console.log(sum);`, answers: ["15"], run: true, e: "1 + 2 + 3 + 4 + 5 = 15. The accumulator `sum` collects each value of `i`.", hint: "Add the values that `i` takes." },
    { t: "h", text: "The loop variable must change" },
    { t: "p", html: "<p>If nothing inside the body moves the loop toward the end, the condition stays <code>true</code> forever. This is an <b>infinite loop</b>. In a normal browser tab it freezes the page. JS30 watches your loops and stops them for you, so experimenting here is safe.</p>" },
    { t: "code", code: c`let count = 1;
while (count <= 3) {
  console.log("Hello");
  // oops: we forgot count++
}`, error: true, noViz: true, note: "<p>This error is expected. <code>count</code> stays 1, so <code>1 &lt;= 3</code> is always true. JS30 stopped the loop and explained why. The fix is one line: <code>count++;</code> inside the body.</p>" },
    { t: "check", q: "Which loop never ends?", o: ["`let a = 0; while (a < 3) { a++; }`", "`let b = 5; while (b > 0) { b--; }`", "`let c = 0; while (c < 3) { c--; }`", "`let d = 10; while (d < 3) { d++; }`"], a: 2, e: "`c` goes 0, -1, -2… — further and further away from 3, so `c < 3` is always true. Option 4 never even starts: `10 < 3` is false at the first check.", hint: "For each loop, ask: does the change move the variable toward making the condition false?" },
    { t: "h", text: "do...while: run at least once" },
    { t: "p", html: "<p>A <code>while</code> loop checks first, so its body may run zero times. Sometimes you want the body to run <b>once no matter what</b>, and then decide whether to repeat — for example, show a menu, then ask whether to show it again. That is <code>do...while</code>: the check moves to the bottom.</p>" },
    { t: "code", code: c`let n = 10;
do {
  console.log("n is", n);
  n++;
} while (n < 5);
console.log("End");`, note: "<p>The condition <code>10 &lt; 5</code> is false from the start, but the body still ran once, because the check comes <b>after</b> the body. Note the semicolon after <code>while (n &lt; 5)</code>.</p>" },
    { t: "check", q: "How many times does the word `Hi` appear?", code: c`let x = 0;
while (x > 0) {
  console.log("Hi");
}
do {
  console.log("Hi");
} while (x > 0);`, o: ["0", "1", "2", "It never stops"], a: 1, e: "The `while` loop checks `0 > 0` first — false, so it never runs. The `do...while` runs its body once, then checks and stops.", hint: "Which loop checks before the body, and which one after?" },
    { t: "h", text: "Read answers until \"stop\"" },
    { t: "p", html: "<p>Often you do not know in advance how many rounds you need. A cashier does not know how many items you bought; she scans until the basket is empty. In code we keep reading with <code>prompt()</code> until the user types a special word, called a <b>sentinel</b>. Here the sentinel is <code>stop</code>.</p>" },
    { t: "analogy", title: "A sentinel is like the divider bar at the checkout", html: "<p>At the supermarket you put a plastic bar after your last item. The cashier scans item after item, and when she reaches the bar she knows your shopping is over and prints the total. The word <code>stop</code> is your divider bar.</p>" },
    { t: "code", code: c`let total = 0;
let answer = prompt("Price (or stop):");
while (answer !== "stop") {
  total += Number(answer);
  answer = prompt("Price (or stop):");
}
console.log("Total:", total, "riyals");`, stdin: "5\n12\n3\nstop", before: "<p>The <b>Input</b> box has one answer per line: 5, 12, 3 and then <code>stop</code>. Change the prices and run again.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`let answer = prompt("Price (or stop):");`, "Read the <b>first</b> answer before the loop, so the condition has something to check."],
      [c`while (answer !== "stop") {`, "Keep going as long as the answer is not the sentinel word. <code>prompt()</code> gives a string, so we compare with the string <code>\"stop\"</code>."],
      [c`  total += Number(answer);`, "Turn the text into a number and add it to the accumulator."],
      [c`  answer = prompt("Price (or stop):");`, "Read the <b>next</b> answer at the end of the body. This is the line that changes the loop variable — forget it and the loop never ends."],
    ] },
    { t: "turn", level: "Medium", q: "With the Input lines `20`, `30` and `stop`, what does the program above show?", answers: ["Total: 50 riyals"], e: "Two prices are read (20 and 30), then `stop` ends the loop. 20 + 30 = 50.", hint: "The word stop is never added; it only ends the loop.", placeholder: "type the output" },
    { t: "h", text: "Taking a number apart, digit by digit" },
    { t: "p", html: "<p>Two tools from Day 4 work beautifully inside a loop. <code>n % 10</code> gives the <b>last digit</b> of a number (the remainder after dividing by 10). <code>Math.floor(n / 10)</code> <b>removes</b> the last digit. Repeat until nothing is left.</p>" },
    { t: "code", code: c`let n = 4071;
while (n > 0) {
  console.log(n % 10);
  n = Math.floor(n / 10);
}`, note: "<p>The digits come out from right to left: 1, 7, 0, 4. Each round <code>n</code> gets shorter: 4071 → 407 → 40 → 4 → 0, and at 0 the loop stops.</p>" },
    { t: "viz", code: c`let n = 352;
let digitSum = 0;
while (n > 0) {
  digitSum += n % 10;
  n = Math.floor(n / 10);
}
console.log("Sum of digits:", digitSum);`, before: "<p>Counter and accumulator together: watch <code>n</code> shrink while <code>digitSum</code> grows (2, then 7, then 10).</p>" },
    { t: "steps", title: "Saving for a new phone", problem: "<p>{{name}} wants a phone that costs <b>1000 riyals</b>. Starting from 0, you save <b>150 riyals</b> every week. Show your savings after each week, and at the end say how many weeks it took:</p><pre class=\"code-static\">Week 1: 150 riyals\nWeek 2: 300 riyals\n...\nWeek 7: 1050 riyals\nYou can buy the phone after 7 weeks!</pre>",
      steps: [
        { html: "<p><b>Understand.</b> We repeat \"save 150, show the total\" but we do not know how many times — we stop when the savings reach the price. A <code>while</code> loop fits: it repeats <i>as long as</i> something is true.</p>" },
        { html: "<p><b>Plan.</b> We need an accumulator (<code>saved</code>, starts at 0) and a counter (<code>week</code>, starts at 0). The loop runs while <code>saved &lt; price</code>.</p>", code: c`const price = 1000;
const perWeek = 150;
let saved = 0;
let week = 0;` },
        { html: "<p><b>Build the loop.</b> Each round is one week: count it, add the money, show the line. Both variables change, so the loop will end.</p>", code: c`while (saved < price) {
  week++;
  saved += perWeek;
  console.log(¦Week #{week}: #{saved} riyals¦);
}` },
        { html: "<p><b>After the loop.</b> When the condition is false, <code>week</code> still holds the last value — exactly the answer we need.</p>", code: c`console.log(¦You can buy the phone after #{week} weeks!¦);` },
        { html: "<p><b>Test.</b> Run it. Then try <code>perWeek = 250</code> (4 weeks) and <code>perWeek = 1000</code> (1 week) to be sure the loop stops at the right moment.</p>" },
      ],
      code: c`const price = 1000;
const perWeek = 150;
let saved = 0;
let week = 0;
while (saved < price) {
  week++;
  saved += perWeek;
  console.log(¦Week #{week}: #{saved} riyals¦);
}
console.log(¦You can buy the phone after #{week} weeks!¦);` },
    { t: "table", head: ["Pattern", "Shape", "Use it to…"], rows: [
      ["Counter", "`let i = 1; while (i <= n) { …; i++; }`", "repeat a known number of times"],
      ["Accumulator", "`let total = 0;` before, `total += x;` inside", "build a sum, a count or a long string"],
      ["Sentinel", "read once before, read again at the end of the body", "read answers until a stop word"],
      ["Digits", "`n % 10` and `n = Math.floor(n / 10)`", "take a number apart"],
      ["`do...while`", "`do { … } while (condition);`", "run the body at least once"],
    ] },
  ],
  mistakes: [
    { title: "Forgetting to change the loop variable", html: "Nothing moves <code>i</code>, so the condition is true forever. Always ask: <i>which line brings the loop closer to the end?</i>", wrong: c`let i = 1;
while (i <= 3) {
  console.log(i);
}`, right: c`let i = 1;
while (i <= 3) {
  console.log(i);
  i++;
}` },
    { title: "A semicolon after while (…)", html: "<code>while (i &lt; 3);</code> means \"repeat <i>nothing</i>\". The body below is not part of the loop, and the empty loop never ends.", wrong: c`while (i < 3); {
  i++;
}`, right: c`while (i < 3) {
  i++;
}` },
    { title: "Reading prompt() only once", html: "In a sentinel loop you must read the next answer <b>inside</b> the loop too. Otherwise <code>answer</code> never changes and the loop never stops.", wrong: c`let answer = prompt("Word:");
while (answer !== "stop") {
  console.log(answer);
}`, right: c`let answer = prompt("Word:");
while (answer !== "stop") {
  console.log(answer);
  answer = prompt("Word:");
}` },
    { title: "Creating the accumulator inside the loop", html: "A <code>let total = 0;</code> inside the body resets the total every round (and it does not exist after the loop). Create it <b>before</b> the loop.", wrong: c`let n = 1;
while (n <= 3) {
  let total = 0;
  total += n;
  n++;
}`, right: c`let total = 0;
let n = 1;
while (n <= 3) {
  total += n;
  n++;
}` },
  ],
  tricks: [
    { title: "Count and add in the same loop", html: "One loop can keep several accumulators at once — for example a count and a total, so you can get an average at the end.", code: c`let count = 0;
let total = 0;
let mark = 70;
while (mark <= 90) {
  count++;
  total += mark;
  mark += 10;
}
console.log("Average:", total / count);` },
    { title: "Build a string in a loop", html: "An accumulator does not have to be a number. Start with an empty string <code>\"\"</code> and add pieces with <code>+=</code>.", code: c`let line = "";
let i = 1;
while (i <= 5) {
  line += i + " ";
  i++;
}
console.log(line);` },
    { title: "Spy on your loop with console.log", html: "When a loop gives a wrong answer, show the variables in every round. You will see the exact round where things go wrong.", code: c`let total = 0;
let i = 1;
while (i <= 3) {
  total += i;
  console.log("i =", i, "total =", total);
  i++;
}` },
  ],
  practice: [
    { t: "try", title: "Make it yours", html: "<p>Change the countdown: start from 10, count down by 2, and print your own message at the end. What happens if you start from 9?</p>", code: c`let t = 10;
while (t > 0) {
  console.log(t);
  t -= 2;
}
console.log("Go, {{name}}!");` },
    { t: "predict", code: c`let x = 1;
while (x < 50) {
  x = x * 3;
}
console.log(x);`, explain: "<code>x</code> goes 1 → 3 → 9 → 27 → 81. At 81 the condition <code>81 &lt; 50</code> is false, so the loop stops and shows <b>81</b> — a number <i>bigger</i> than 50. The check happens before each round, not in the middle." },
    { t: "parsons", title: "Sum of 1 to 100", prompt: "Put the lines in order to show <code>5050</code>, the sum of 1 to 100.", lines: [c`let sum = 0;`, c`let i = 1;`, c`while (i <= 100) {`, c`  sum += i;`, c`  i++;`, c`}`, c`console.log(sum);`], distractors: [c`  let sum = 0;`], explain: "Both variables are created before the loop. Inside: add, then move the counter. The result is shown once, after the loop." },
    { t: "predict", code: c`let k = 5;
do {
  console.log("k =", k);
  k--;
} while (k > 5);`, explain: "<code>do...while</code> runs the body first: it shows <code>k = 5</code>, then <code>k</code> becomes 4, and <code>4 &gt; 5</code> is false. One line only." },
    { t: "try", title: "Echo until stop", html: "<p>This program shows every word you type in CAPITALS until you type <code>stop</code>. Change the Input lines. Then make it also count how many words it showed.</p>", code: c`let word = prompt("Word:");
while (word !== "stop") {
  console.log(word.toUpperCase());
  word = prompt("Word:");
}`, stdin: "hello\nriyadh\njs30\nstop" },
    { t: "turn", level: "Medium", q: "What does this program show?", code: c`let n = 2026;
let digits = 0;
while (n > 0) {
  digits++;
  n = Math.floor(n / 10);
}
console.log(digits);`, answers: ["4"], run: true, e: "Each round removes one digit: 2026 → 202 → 20 → 2 → 0. Four rounds, so `digits` is 4.", hint: "Count how many times you can remove the last digit before nothing is left." },
    { t: "turn", level: "Hard", q: "How many times does `Hi` appear?", code: c`let a = 1;
while (a < 20) {
  console.log("Hi");
  a *= 2;
}`, answers: ["5"], e: "`a` is 1, 2, 4, 8, 16 — five rounds. Then `a` becomes 32 and `32 < 20` is false.", hint: "Double the number each time and count until it reaches 20 or more.", placeholder: "a number", oneWord: true },
  ],
  exercises: [
    { id: "count-to-n", lvl: "seed", title: "Count to n", prompt: "<p>Read a number <code>n</code> with <code>prompt()</code> and show the numbers from 1 to <code>n</code>, one per line. For input <code>4</code>:</p><pre class=\"code-static\">1\n2\n3\n4</pre>", starter: c`const n = Number(prompt("n?"));
// your loop here
`, tests: [{ stdin: "4", expected: "1\n2\n3\n4" }, { stdin: "7", expected: "1\n2\n3\n4\n5\n6\n7" }, { stdin: "1", expected: "1" }],
      hint: "Counter pattern: <code>let i = 1;</code>, condition <code>i &lt;= n</code>, and <code>i++</code> at the end of the body.",
      solutions: [{ name: "Counter", code: c`const n = Number(prompt("n?"));
let i = 1;
while (i <= n) {
  console.log(i);
  i++;
}`, note: "Start, check, change — the three parts of every counter loop." }] },
    { id: "times-table", lvl: "seed", title: "Times table", prompt: "<p>Read a number and show its times table from 1 to 10. For input <code>7</code> the first and last lines are:</p><pre class=\"code-static\">7 x 1 = 7\n...\n7 x 10 = 70</pre>", tests: [{ stdin: "7", expected: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70" }, { stdin: "3", expected: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30" }],
      hint: "A counter from 1 to 10. Inside, a template string: the number, the counter and their product.",
      solutions: [{ name: "Template string", code: c`const n = Number(prompt("Number?"));
let i = 1;
while (i <= 10) {
  console.log(¦#{n} x #{i} = #{n * i}¦);
  i++;
}`, note: "The calculation <code>n * i</code> can go straight inside <code>#{ }</code>." },
        { name: "Several values", code: c`const n = Number(prompt("Number?"));
let i = 1;
while (i <= 10) {
  console.log(n, "x", i, "=", n * i);
  i++;
}`, note: "Commas in <code>console.log</code> add the spaces for you." }] },
    { id: "sum-to-n", lvl: "star", title: "Sum from 1 to n", prompt: "<p>Read <code>n</code> and show the sum 1 + 2 + … + n like this (input <code>10</code>):</p><pre class=\"code-static\">Sum: 55</pre>", tests: [{ stdin: "10", expected: "Sum: 55" }, { stdin: "4", expected: "Sum: 10" }, { stdin: "100", expected: "Sum: 5050" }],
      hint: "Counter + accumulator. Create <code>sum = 0</code> before the loop and show it after the loop.",
      solutions: [{ name: "Counter + accumulator", code: c`const n = Number(prompt("n?"));
let sum = 0;
let i = 1;
while (i <= n) {
  sum += i;
  i++;
}
console.log("Sum:", sum);`, note: "The classic pattern. Only one line is shown, after the loop." },
        { name: "Counting down", code: c`let n = Number(prompt("n?"));
let sum = 0;
while (n > 0) {
  sum += n;
  n--;
}
console.log("Sum:", sum);`, note: "Addition does not care about order, so you can count <code>n</code> itself down to 0. (<code>n</code> needs <code>let</code> here because it changes.)" }],
      twist: "The young mathematician Gauss found a shortcut: <code>n * (n + 1) / 2</code>. Check that it gives the same answers — no loop needed!" },
    { id: "mark-average", lvl: "star", title: "Average until stop", prompt: "<p>Read marks with <code>prompt()</code> until the user types <code>stop</code> (there is at least one mark). Then show how many marks there were and their average with one decimal place. For <code>80</code>, <code>90</code>, <code>75</code>, <code>stop</code>:</p><pre class=\"code-static\">Marks: 3\nAverage: 81.7</pre>", tests: [{ stdin: "80\n90\n75\nstop", expected: "Marks: 3\nAverage: 81.7" }, { stdin: "95\n88\nstop", expected: "Marks: 2\nAverage: 91.5" }, { stdin: "60\nstop", expected: "Marks: 1\nAverage: 60.0" }],
      hint: "Sentinel loop with two accumulators: <code>count</code> and <code>total</code>. At the end use <code>(total / count).toFixed(1)</code>.",
      solutions: [{ name: "Sentinel loop", code: c`let count = 0;
let total = 0;
let answer = prompt("Mark (or stop):");
while (answer !== "stop") {
  count++;
  total += Number(answer);
  answer = prompt("Mark (or stop):");
}
console.log("Marks:", count);
console.log("Average:", (total / count).toFixed(1));`, note: "Read once before the loop and once at the end of the body. <code>toFixed(1)</code> also turns 60 into <code>60.0</code>." }] },
    { id: "digit-sum", lvl: "star", title: "Sum of the digits", prompt: "<p>Read a whole positive number and show the sum of its digits. For <code>4071</code>: 4 + 0 + 7 + 1 =</p><pre class=\"code-static\">12</pre>", tests: [{ stdin: "4071", expected: "12" }, { stdin: "9", expected: "9" }, { stdin: "99999", expected: "45" }],
      hint: "<code>n % 10</code> is the last digit; <code>n = Math.floor(n / 10)</code> removes it. Loop while <code>n &gt; 0</code>.",
      solutions: [{ name: "% and Math.floor", code: c`let n = Number(prompt("Number?"));
let sum = 0;
while (n > 0) {
  sum += n % 10;
  n = Math.floor(n / 10);
}
console.log(sum);`, note: "Each round takes one digit off the right side and adds it to <code>sum</code>." }],
      twist: "Change it to count the digits instead, or to show the number reversed (4071 → 1704)." },
    { id: "rumour", lvl: "fire", title: "How fast does news spread?", prompt: "<p>On day 1, one student knows a secret. Every day, the number of students who know it <b>doubles</b> (1, 2, 4, 8…). Read the number of students in the school and show the first day on which <b>at least</b> that many students know. For <code>1000</code>:</p><pre class=\"code-static\">Day 11: 1024 students know</pre>", tests: [{ stdin: "1000", expected: "Day 11: 1024 students know" }, { stdin: "30", expected: "Day 6: 32 students know" }, { stdin: "1", expected: "Day 1: 1 students know" }, { stdin: "64", expected: "Day 7: 64 students know" }],
      hint: "Start with <code>day = 1</code> and <code>people = 1</code>. While <code>people &lt; school</code>, double <code>people</code> and add one to <code>day</code>. Show the result after the loop.",
      solutions: [{ name: "while", code: c`const school = Number(prompt("Students?"));
let day = 1;
let people = 1;
while (people < school) {
  people *= 2;
  day++;
}
console.log(¦Day #{day}: #{people} students know¦);`, note: "If the school has only 1 student, the condition is false at once and the answer is day 1 — the loop runs zero times." }],
      twist: "This is why rumours (and viruses) spread so fast: after only 20 days, more than half a million people would know." },
    { id: "fix-evens", lvl: "fire", debug: true, title: "Fix the even-number sum", prompt: "<p>This program should read <code>n</code> and show the sum of the even numbers from 2 up to <code>n</code>. For <code>10</code>: 2 + 4 + 6 + 8 + 10 =</p><pre class=\"code-static\">Sum of evens: 30</pre><p>It has <b>three</b> bugs, and one of them makes the loop endless. Find them all.</p>",
      starter: c`const n = Number(prompt("n?"));
let sum = 0;
let i = 2;
while (i < n) {
  sum + i;
}
console.log("Sum of evens:", sum);`, tests: [{ stdin: "10", expected: "Sum of evens: 30" }, { stdin: "7", expected: "Sum of evens: 12" }, { stdin: "2", expected: "Sum of evens: 2" }],
      hint: "Ask three questions: Is <code>n</code> itself included? Does <code>sum</code> really change? Does <code>i</code> ever change?",
      solutions: [{ name: "Fixed", code: c`const n = Number(prompt("n?"));
let sum = 0;
let i = 2;
while (i <= n) {
  sum += i;
  i += 2;
}
console.log("Sum of evens:", sum);`, note: "Bug 1: <code>&lt;</code> skipped <code>n</code> itself → <code>&lt;=</code>. Bug 2: <code>sum + i</code> calculates but stores nothing → <code>sum += i</code>. Bug 3: <code>i</code> never changed (infinite loop) → <code>i += 2</code> jumps straight to the next even number." }] },
  ],
  quiz: [
    { q: "When does a `while` loop check its condition?", o: ["Only once, at the start", "Before every round", "After every round", "Only at the end"], a: 1, e: "`while` checks before each round. (`do...while` is the one that checks after.)" },
    { q: "What does this show?", code: c`let i = 0;
while (i < 3) {
  i++;
}
console.log(i);`, o: ["`2`", "`3`", "`4`", "`0`"], a: 1, e: "`i` becomes 1, 2, 3. At 3 the check `3 < 3` is false, so the loop stops and `i` is 3." },
    { q: "What does this show?", code: c`let total = 0;
let n = 2;
while (n <= 6) {
  total += n;
  n += 2;
}
console.log(total);`, o: ["`12`", "`20`", "`6`", "`8`"], a: 0, e: "`n` is 2, 4, 6, so the total is 2 + 4 + 6 = 12." },
    { q: "Which loop body always runs at least once?", o: ["`while`", "`do...while`", "Both", "Neither"], a: 1, e: "`do...while` runs the body first and checks afterwards." },
    { q: "What does this show?", code: c`console.log(538 % 10, Math.floor(538 / 10));`, o: ["`8 53`", "`53 8`", "`5 38`", "`8 53.8`"], a: 0, e: "`% 10` gives the last digit (8) and `Math.floor(n / 10)` removes it (53)." },
    { q: "Why does this loop never end?", code: c`let word = prompt("Word:");
while (word !== "stop") {
  console.log(word);
}`, o: ["`!==` should be `===`", "`prompt()` is not read again inside the loop", "Strings cannot be compared", "`console.log` is in the wrong place"], a: 1, e: "`word` never changes inside the loop, so if it is not `stop` the first time, it never will be." },
  ],
  puzzle: { title: "The shrinking number", q: "<p>Without running it: what <b>exactly</b> does this program show?</p>", code: c`let n = 1234;
let r = 0;
while (n > 0) {
  r = r * 10 + n % 10;
  n = Math.floor(n / 10);
}
console.log(r);`, answers: ["4321"], run: true, hint: "Write a small table with two columns, `n` and `r`, and fill one row per round.", e: "Each round moves the last digit of `n` to the end of `r`: r = 4, 43, 432, 4321. The loop reverses the number." },
  cards: [
    { f: "What are the three parts of a counter loop?", b: "**Start** (`let i = 1;`), **check** (`while (i <= 10)`), **change** (`i++;`)." },
    { f: "What is an accumulator?", b: "A variable created **before** the loop (often `0` or `\"\"`) that collects a result: `total += x;`." },
    { f: "Why does a loop run forever?", b: "Its condition never becomes `false` — usually because the loop variable never changes." },
    { f: "`while` vs `do...while`?", b: "`while` checks first (may run 0 times). `do...while` runs the body once, then checks." },
    { f: "Last digit of `n`? Remove it?", b: "`n % 10` is the last digit. `n = Math.floor(n / 10)` removes it." },
  ],
  remember: [
    "A loop repeats code: `while (condition) { body }` runs the body **as long as** the condition is true.",
    "The condition is checked **before every round**. When it is false, the program continues after the `}`.",
    "Counter pattern: start, check, change. Accumulator pattern: create it before the loop, add inside.",
    "Something in the body must move the loop toward the end, or it is an **infinite loop**.",
    "`do { … } while (condition);` runs at least once.",
    "Sentinel loop: read once before the loop, and again at the **end** of the body.",
  ],
};
})();
