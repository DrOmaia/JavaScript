window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[14] = {
  title: "Rest day",
  intro: "Two weeks done, {{name}} — your programs can now make decisions and repeat work. Today there is no new syntax. Instead, a short story about bugs, four habits that help you squash them, and a few questions to see how much of Week 2 has stuck.",
  goals: [
    "Know where the word \"bug\" comes from",
    "Use four debugging habits: read the error, explain it to a duck, look inside with `console.log`, open the browser console",
    "Check yourself on Week 2: decisions and loops",
  ],
  learn: [
    { t: "h", text: "A real bug" },
    { t: "p", html: "<p>In September 1947, engineers at Harvard University were working on the Mark II, a room-sized computer full of electrical switches called relays. One day it kept giving wrong results. When they searched inside, they found the cause: a <b>moth</b> stuck in one of the relays. They removed it, taped it into their logbook and wrote next to it: <i>\"First actual case of bug being found.\"</i></p><p>Engineers had already used the word \"bug\" for small faults for decades, but this page made the joke famous, and the logbook is now kept in a museum in Washington. Computer pioneer Grace Hopper loved telling the story. Since then, finding and fixing mistakes in a program has been called <b>debugging</b>.</p>" },
    { t: "p", html: "<p>Here is the important part: every programmer writes bugs, every day — beginners and experts alike. Good programmers are simply good at <b>finding</b> them. Here are four habits that help.</p>" },
    { t: "h", text: "Habit 1: read the error message" },
    { t: "p", html: "<p>An error message is not a punishment; it is a clue. It tells you <b>what kind</b> of problem happened and <b>on which line</b>. Read it slowly before you change anything.</p>" },
    { t: "code", code: c`let total = 0;
for (let i = 1; i <= 3; i++) {
  total += i;
}
console.log("Total:", totl);`, error: true, note: "<p>This error is expected. <code>ReferenceError: totl is not defined</code> on line 5 says exactly what is wrong: a name JavaScript has never seen. It is a typo for <code>total</code>.</p>" },
    { t: "h", text: "Habit 2: talk to a rubber duck" },
    { t: "analogy", title: "Rubber-duck debugging", html: "<p>Some programmers keep a small rubber duck on their desk. When they are stuck, they explain the code to the duck, <b>line by line</b>, out loud: <i>\"Here I start i at 1, here I check i &lt; 3…\"</i> Very often they stop in the middle of a sentence: <i>\"…wait, that should be &lt;=!\"</i> Saying what the code does — not what you <i>hoped</i> it does — reveals the bug. No duck? A pet, a pencil or a patient friend works too.</p>" },
    { t: "h", text: "Habit 3: look inside with console.log" },
    { t: "p", html: "<p>When the result is wrong but there is no error, you cannot see where things go wrong. So make the program tell you: add a <code>console.log</code> that shows the variables in every round. Delete these lines when the bug is fixed.</p>" },
    { t: "code", code: c`let sum = 0;
for (let i = 1; i < 5; i++) {
  sum += i;
  console.log("i =", i, "sum =", sum); // spy line
}
console.log("Sum of 1 to 5:", sum);`, note: "<p>The spy lines show that <code>i</code> stops at 4, so 5 is never added. The fix: <code>i &lt;= 5</code>. The <b>Visualize</b> button in JS30 does the same job, step by step.</p>" },
    { t: "h", text: "Habit 4: the browser's own console" },
    { t: "tip", title: "Press F12", html: "<p>Every desktop browser has <b>developer tools</b>. In Chrome or Edge, press <b>F12</b> (or <b>Ctrl + Shift + J</b>; on a Mac <b>Cmd + Option + J</b>) and open the <b>Console</b> tab. It is the same kind of console you have used all along: type <code>2 + 3</code> and press Enter. On any website, red messages there are that site's errors — real developers see bugs too!</p>" },
    { t: "h", text: "A light plan for today (optional)" },
    { t: "p", html: "<p>Rest is part of learning: your brain stores new ideas while you take a break. If you want to do something small:</p><ul><li>Spend 5 minutes on the <a href=\"review.html\">review deck</a> — the cards that are due today.</li><li>Open your <a href=\"notes.html\">notes</a> and write, in your own words, the difference between <code>while</code> and <code>for</code>.</li><li>Play your guessing game from Day 13 against a friend or a family member.</li></ul>" },
    { t: "h", text: "Self-check: Week 2" },
    { t: "check", q: "What does this show?", code: c`const mark = 75;
if (mark >= 90) {
  console.log("Excellent");
} else if (mark >= 70) {
  console.log("Good");
} else {
  console.log("Keep going");
}`, o: ["`Excellent`", "`Good`", "`Keep going`", "`Good` and `Keep going`"], a: 1, e: "75 fails `>= 90` and passes `>= 70`. Only the first true block runs." },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`const n = 12;
console.log(n > 10 ? "big" : "small");`, answers: ["big"], run: true, e: "`12 > 10` is true, so the ternary gives the first value." },
    { t: "check", q: "Why does this loop never end?", code: c`let i = 0;
while (i < 3) {
  console.log(i);
}`, noRun: true, o: ["`i` never changes", "`while` needs a semicolon", "`i` should start at 1", "`console.log` cannot be in a loop"], a: 0, e: "Nothing inside the body changes `i`, so `0 < 3` stays true forever. Add `i++;`." },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`let s = 0;
for (let i = 1; i <= 6; i++) {
  if (i % 2 === 0) continue;
  s += i;
}
console.log(s);`, answers: ["9"], run: true, e: "Even numbers are skipped, so `s` is 1 + 3 + 5 = 9.", hint: "Add only the odd numbers." },
    { t: "check", q: "You want to read numbers until the user types `stop`. Which loop fits best?", o: ["`while`", "`for (let i = 0; i < 10; i++)`", "`switch`", "No loop"], a: 0, e: "You do not know how many numbers will come, so you loop while the answer is not `stop`." },
  ],
  remember: [
    "The word \"bug\" became famous in 1947, when a real moth was found inside the Mark II computer.",
    "Every programmer writes bugs; debugging is a normal part of programming, not a sign of failure.",
    "Read the error message first: it gives the kind of problem and the line number.",
    "Explain your code line by line, out loud (rubber-duck debugging).",
    "Add `console.log` spy lines (or use **Visualize**) to watch variables change.",
    "F12 opens the browser's developer tools and its Console.",
    "Week 2: comparisons and `&&` / `||` / `!`, `if` / `else`, `switch`, `? :`, `while`, `for`, `break`, `continue`.",
  ],
};
})();
