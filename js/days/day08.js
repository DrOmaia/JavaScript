window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[8] = {
  title: "Comparisons and logic: true or false",
  intro: "Welcome to Week 2, {{name}}! So far your programs did the same thing every time. Today you teach them to ask questions — <i>is the mark at least 50? is it the weekend? is the battery low?</i> — and get a clear answer: <code>true</code> or <code>false</code>. Tomorrow those answers will let your programs make decisions.",
  goals: [
    "Compare values with `>`, `<`, `>=`, `<=`, `===` and `!==` and read the `true` / `false` answer",
    "Explain why we always use `===` and not `==`",
    "Compare strings and know how capital letters change the result",
    "Store answers in boolean variables with clear names like `isWeekend`",
    "Combine conditions with `&&`, `||` and `!`, and use their truth tables",
    "Name the six falsy values and test any value with `Boolean()`",
  ],
  learn: [
    { t: "h", text: "Questions with a yes or no answer" },
    { t: "p", html: "<p>Many questions in life have only two possible answers. <i>Did I pass? Is the canteen open? Do I have enough riyals for a shawarma?</i> Programs ask questions like these all the time, and the answer has its own type: the <b>boolean</b> (Day 3), with only two values, <code>true</code> and <code>false</code>.</p>" },
    { t: "analogy", title: "A comparison is like a light switch", html: "<p>A light switch has no \"half on\" or \"maybe\". It is either on or off. A comparison works the same way: you ask JavaScript a question about two values, and the answer is always exactly one of two things — <code>true</code> (on) or <code>false</code> (off).</p>" },
    { t: "code", code: c`console.log(8 > 5);
console.log(3 > 10);
console.log(typeof (8 > 5));`, before: "<p>The sign <code>&gt;</code> asks: \"is the left side greater than the right side?\" Run it.</p>", note: "<p>8 &gt; 5 is <code>true</code>; 3 &gt; 10 is <code>false</code>. <code>typeof</code> confirms the answer is a real <code>boolean</code>, not the text \"true\".</p>" },
    { t: "check", q: "What does this line show?", code: c`console.log(4 > 9);`, o: ["`true`", "`false`", "`4`", "`9`"], a: 1, e: "The question is \"is 4 greater than 9?\" The answer is no, so JavaScript shows `false`.", hint: "Read `>` as \"is greater than\" and answer the question." },
    { t: "h", text: "The six comparison operators" },
    { t: "p", html: "<p>Sometimes you need \"at least\" (a pass mark of 50 or more), \"at most\", \"exactly equal\" (the right PIN) or \"different\". JavaScript has one operator for each question.</p>" },
    { t: "code", code: c`const mark = 50;
console.log(mark > 50);   // greater than
console.log(mark >= 50);  // greater than or equal
console.log(mark < 50);   // less than
console.log(mark <= 50);  // less than or equal
console.log(mark === 50); // equal
console.log(mark !== 50); // not equal`, note: "<p>Look at the first two lines. <code>mark &gt; 50</code> is <code>false</code> because 50 is not <i>more</i> than 50. But <code>mark &gt;= 50</code> is <code>true</code> because 50 is \"greater <b>or equal</b>\".</p>" },
    { t: "table", head: ["Operator", "Question it asks", "Example", "Answer"], rows: [
      ["`>`", "greater than?", "`7 > 3`", "`true`"],
      ["`<`", "less than?", "`7 < 3`", "`false`"],
      ["`>=`", "greater than or equal?", "`5 >= 5`", "`true`"],
      ["`<=`", "less than or equal?", "`6 <= 5`", "`false`"],
      ["`===`", "equal (same value and same type)?", "`4 === 4`", "`true`"],
      ["`!==`", "not equal?", "`4 !== 4`", "`false`"],
    ] },
    { t: "turn", level: "Easy", q: "What does this line show?", code: c`console.log(12 <= 12);`, answers: ["true"], run: true, e: "`<=` means \"less than **or equal**\". 12 is equal to 12, so the answer is `true`.", hint: "The `=` in `<=` means equal also counts.", placeholder: "true or false" },
    { t: "h", text: "=== and not ==" },
    { t: "p", html: "<p>Remember that <b>one</b> equals sign <code>=</code> puts a value into a variable. To <i>ask</i> whether two values are equal, you use three: <code>===</code>. JavaScript also has an older two-sign version, <code>==</code>. You will see it in old code online, so you should know why we avoid it.</p>" },
    { t: "code", code: c`console.log(5 === "5");  // number vs string
console.log(5 == "5");   // the loose version
console.log(0 == "");    // a surprise
console.log(0 === "");`, before: "<p>Watch what <code>==</code> does when the types are different.</p>", note: "<p><code>===</code> is <b>strict</b>: a number and a string are never equal, so <code>5 === \"5\"</code> is <code>false</code>. <code>==</code> is <b>loose</b>: before comparing it quietly converts the values to the same type, so <code>\"5\"</code> becomes <code>5</code> and the answer is <code>true</code>. It also makes <code>0 == \"\"</code> true! Hidden conversions like this cause bugs that are hard to find.</p>" },
    { t: "analogy", title: "The strict guard and the relaxed guard", html: "<p>Two guards stand at the school gate. The relaxed guard (<code>==</code>) lets in anyone who <i>looks like</i> a student. The strict guard (<code>===</code>) checks the face <b>and</b> the ID card, so nobody gets in by mistake. Always hire the strict guard: <code>===</code> and <code>!==</code>.</p>" },
    { t: "check", q: "The program reads a mark with `prompt()` but forgets `Number()`. What does this show?", code: c`const typed = "90";
console.log(typed === 90);`, o: ["`true`", "`false`", "`90`", "`undefined`"], a: 1, e: "`typed` holds the **string** `\"90\"`, and `===` never says a string equals a number. This is a useful warning: convert input with `Number()` before you compare it.", hint: "Look at the quotes around `\"90\"`. What type is it?" },
    { t: "h", text: "Comparing strings" },
    { t: "p", html: "<p>Comparisons also work on text. <code>===</code> checks whether two strings are exactly the same, letter by letter. <code>&lt;</code> and <code>&gt;</code> compare them in <b>dictionary order</b>: a word that comes earlier in the dictionary is \"smaller\". </p>" },
    { t: "code", code: c`console.log("apple" < "banana");
console.log("Sara" === "sara");
console.log("Zain" < "adam");
console.log("Zain".toLowerCase() < "adam".toLowerCase());`, note: "<p>Line 1: a comes before b, so <code>true</code>. Line 2: capital S and small s are <b>different</b> characters, so <code>false</code>. Line 3 is the surprise: <i>all</i> capital letters come before <i>all</i> small letters, so \"Zain\" is smaller than \"adam\". To compare names fairly, change both to the same case first with <code>.toLowerCase()</code>, as in line 4.</p>" },
    { t: "check", q: "What does this show?", code: c`const answer = "Riyadh";
console.log(answer.toLowerCase() === "riyadh");`, o: ["`true`", "`false`"], a: 0, e: "`.toLowerCase()` turns `\"Riyadh\"` into `\"riyadh\"`, which is exactly the same as the right side. This is how a quiz accepts an answer however it was typed." },
    { t: "h", text: "Boolean variables" },
    { t: "p", html: "<p>The answer to a comparison is a value, so you can keep it in a variable and use it later. Give boolean variables names that sound like a yes/no question: <code>isWeekend</code>, <code>hasTicket</code>, <code>canVote</code>.</p>" },
    { t: "code", code: c`const battery = 14;
const isLow = battery < 20;
const isCharging = false;
console.log("Low battery?", isLow);
console.log("Charging?", isCharging);` },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`const battery = 14;`, "A normal number variable: the phone has 14% battery."],
      [c`const isLow = battery < 20;`, "JavaScript first answers the question <code>battery &lt; 20</code> → <code>true</code>, then stores that answer in <code>isLow</code>. The <code>=</code> stores, the <code>&lt;</code> asks."],
      [c`const isCharging = false;`, "You can also write <code>true</code> or <code>false</code> directly. No quotes: <code>\"false\"</code> would be a string, not a boolean."],
      [c`console.log("Low battery?", isLow);`, "Shows <code>Low battery? true</code>. The name <code>isLow</code> tells the reader exactly what the value means."],
    ] },
    { t: "h", text: "AND, OR and NOT" },
    { t: "p", html: "<p>Real questions often have several parts: <i>you can enter if you have a ticket <b>and</b> you are on time; you can pay by cash <b>or</b> card; you may leave if the bell has <b>not</b> rung.</i> JavaScript has three <b>logical operators</b> for these words.</p>" },
    { t: "analogy", title: "AND is strict, OR is generous", html: "<p>Think of entering a football stadium. With <b>AND</b>, the guard needs <i>both</i> things: ticket and ID. One missing → no entry. With <b>OR</b>, the canteen accepts cash <i>or</i> card: <i>one</i> is enough. <b>NOT</b> simply flips the answer, like turning a \"yes\" into a \"no\".</p>" },
    { t: "code", code: c`const hasTicket = true;
const hasId = false;
console.log(hasTicket && hasId);  // AND: both must be true
console.log(hasTicket || hasId);  // OR: at least one true
console.log(!hasId);              // NOT: flips the value` },
    { t: "table", head: ["`a`", "`b`", "`a && b`", "`a || b`", "`!a`"], rows: [
      ["`true`", "`true`", "`true`", "`true`", "`false`"],
      ["`true`", "`false`", "`false`", "`true`", "`false`"],
      ["`false`", "`true`", "`false`", "`true`", "`true`"],
      ["`false`", "`false`", "`false`", "`false`", "`true`"],
    ] },
    { t: "p", html: "<p>This is called a <b>truth table</b>. Notice the pattern: <code>&amp;&amp;</code> is <code>true</code> in only <b>one</b> row (both true), and <code>||</code> is <code>false</code> in only <b>one</b> row (both false).</p>" },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`const isSunny = false;
const isWeekend = true;
console.log(isSunny || isWeekend);`, answers: ["true"], run: true, e: "`||` needs only **one** true side. `isWeekend` is `true`, so the whole answer is `true`.", hint: "OR is generous: one true is enough.", placeholder: "true or false" },
    { t: "h", text: "Combining conditions" },
    { t: "p", html: "<p>The most common use of <code>&amp;&amp;</code> is checking that a number is <b>between</b> two limits. A teenager is aged at least 13 <b>and</b> at most 19 — two full comparisons.</p>" },
    { t: "viz", code: c`const age = 16;
const atLeast13 = age >= 13;
const atMost19 = age <= 19;
const isTeen = atLeast13 && atMost19;
console.log("Teen?", isTeen);
console.log("Short version:", age >= 13 && age <= 19);`, before: "<p>Press <b>Visualize</b> and step through. Watch each boolean variable get its value, then see the two answers joined by <code>&amp;&amp;</code>. Then change <code>age</code> to 25 and step again.</p>" },
    { t: "lines", title: "Read it like a programmer", rows: [
      [c`age >= 13 && age <= 19`, "The comparisons run first, then <code>&amp;&amp;</code> joins the two answers: \"at least 13 <b>and</b> at most 19\"."],
      [c`age >= 13 || age <= 19`, "A classic bug: with OR <i>every</i> number passes. \"Between\" needs AND."],
      [c`!(age >= 13 && age <= 19)`, "Brackets first, then <code>!</code> flips it: <code>true</code> when the age is <b>not</b> a teen age."],
    ] },
    { t: "check", q: "A shop gives a discount to customers under 12 **or** aged 60 and over. Which expression is correct?", o: ["`age < 12 && age >= 60`", "`age < 12 || age >= 60`", "`12 > age >= 60`", "`age < 12 || >= 60`"], a: 1, e: "Nobody can be under 12 **and** 60 or older at the same time, so `&&` would always be `false`. You need OR, and each side must be a complete comparison with `age` in it.", hint: "Can one person be both under 12 and over 60?" },
    { t: "h", text: "Truthy and falsy values" },
    { t: "p", html: "<p><code>&amp;&amp;</code>, <code>||</code> and <code>!</code> also work with values that are not booleans. In those places JavaScript treats every value as either \"true-ish\" (<b>truthy</b>) or \"false-ish\" (<b>falsy</b>). Only <b>six</b> values are falsy; everything else is truthy. You can test any value with <code>Boolean()</code>.</p>" },
    { t: "code", code: c`console.log(Boolean(0), Boolean(""), Boolean(null));
console.log(Boolean(undefined), Boolean(NaN), Boolean(false));
console.log(Boolean(7), Boolean("hi"), Boolean("0"), Boolean(" "));`, note: "<p>The six falsy values are <code>0</code>, <code>\"\"</code> (empty text), <code>null</code>, <code>undefined</code>, <code>NaN</code> and <code>false</code>. Look at the last line: <code>\"0\"</code> and <code>\" \"</code> are <b>not</b> empty strings (they contain a character), so they are truthy.</p>" },
    { t: "turn", level: "Medium", q: "What does this show?", code: c`const name = "";
console.log(!name);`, answers: ["true"], run: true, e: "An empty string is falsy, so `!` flips it to `true`. Programs use `!name` to ask \"did the user type nothing?\"", hint: "Is `\"\"` truthy or falsy? Then `!` flips it.", placeholder: "true or false" },
    { t: "steps", title: "Can I join the school team?", problem: "<p>The coach asks you for a small program. A student may join the football team if they are <b>14 to 17 years old</b> and their mark in PE is <b>at least 70</b>. The program asks for the age and the PE mark and shows <code>Can join: true</code> or <code>Can join: false</code>.</p>",
      steps: [
        { html: "<p><b>Understand.</b> Two inputs, two rules, and both must be true — that means <code>&amp;&amp;</code>. The age rule is a \"between\" rule.</p>" },
        { html: "<p><b>Plan.</b> Read both numbers with <code>prompt()</code> and convert them with <code>Number()</code>, then build one boolean per rule.</p>", code: c`const age = Number(prompt("Your age?"));
const mark = Number(prompt("Your PE mark?"));` },
        { html: "<p><b>Build the rules.</b> One boolean per rule keeps it readable.</p>", code: c`const rightAge = age >= 14 && age <= 17;
const goodMark = mark >= 70;` },
        { html: "<p><b>Join and show.</b> The student can join only when both are true. Try 15 and 82 (true), then 18 and 90 (too old).</p>", code: c`const canJoin = rightAge && goodMark;
console.log("Can join:", canJoin);` },
      ],
      code: c`// Football team check
const age = Number(prompt("Your age?"));
const mark = Number(prompt("Your PE mark?"));
const rightAge = age >= 14 && age <= 17;
const goodMark = mark >= 70;
const canJoin = rightAge && goodMark;
console.log("Can join:", canJoin);`, stdin: "15\n82" },
    { t: "h", text: "Coming tomorrow" },
    { t: "p", html: "<p>Today your programs answered questions. Tomorrow they <b>act</b> on the answers with <code>if</code>. Here is a tiny preview — just read it, the details come on Day 9:</p>" },
    { t: "code", code: c`const battery = 14;
if (battery < 20) {
  console.log("Please charge your phone!");
}` },
  ],
  mistakes: [
    { title: "One = when you mean ===", html: "<code>=</code> <b>stores</b> a value; <code>===</code> <b>asks</b> whether two values are equal. Writing <code>=</code> inside a question changes your variable (or gives an error with <code>const</code>) instead of comparing.", wrong: c`let score = 7;
console.log(score = 10);`, right: c`let score = 7;
console.log(score === 10);` },
    { title: "Using == instead of ===", html: "<code>==</code> converts types secretly, so <code>\"\" == 0</code> and <code>\"5\" == 5</code> are both <code>true</code>. Always use <code>===</code> and <code>!==</code>.", wrong: c`console.log("" == 0);`, right: c`console.log("" === 0);` },
    { title: "Writing \"between\" like in maths", html: "In maths you write 13 ≤ age ≤ 19. In JavaScript <code>13 &lt;= age &lt;= 19</code> is always <code>true</code>: the first part gives <code>true</code> or <code>false</code>, which is then compared with 19. Write two full comparisons joined with <code>&amp;&amp;</code>.", wrong: c`const age = 40;
console.log(13 <= age <= 19);`, right: c`const age = 40;
console.log(age >= 13 && age <= 19);` },
    { title: "Comparing input without Number()", html: "<code>prompt()</code> always gives a string, and strings compare in dictionary order: <code>\"9\" &gt; \"10\"</code> is <code>true</code> because the character 9 comes after 1. Convert first.", wrong: c`console.log("9" > "10");`, right: c`console.log(Number("9") > Number("10"));` },
  ],
  tricks: [
    { title: "|| gives a default value", html: "<code>a || b</code> gives <code>a</code> if it is truthy, otherwise <code>b</code>. So if the user types nothing, you can fall back to a default name.", code: c`const typed = "";
const name = typed || "Guest";
console.log("Hello,", name);` },
    { title: "Read ! as \"not\"", html: "Good names plus <code>!</code> read like English: <code>!isOpen</code> is \"not open\". Prefer <code>!isOpen</code> to <code>isOpen === false</code>.", code: c`const isOpen = false;
console.log("Closed?", !isOpen);` },
    { title: "NaN is not equal to anything", html: "<code>Number(\"abc\")</code> gives <code>NaN</code>, and <code>NaN</code> is not even equal to itself! Use <code>Number.isNaN(x)</code> to ask \"is this not a number?\"", code: c`const n = Number("abc");
console.log(n === n);
console.log(Number.isNaN(n));` },
  ],
  practice: [
    { t: "try", title: "Make it yours", html: "<p>Change the numbers to your own: your age, your last maths mark, your phone battery. Run and read each answer. Then add one comparison of your own.</p>", code: c`const age = 15;
const mathMark = 88;
const battery = 35;
console.log("Teen?", age >= 13 && age <= 19);
console.log("Excellent in maths?", mathMark >= 90);
console.log("Need a charger?", battery < 20);` },
    { t: "predict", code: c`console.log(10 === 10.0);
console.log("10" === 10);
console.log(3 !== 4);`, explain: "<code>10</code> and <code>10.0</code> are the same number, so <code>true</code>. A string is never strictly equal to a number: <code>false</code>. 3 and 4 are different, so \"not equal\" is <code>true</code>." },
    { t: "turn", level: "Easy", q: "What does this show?", code: c`console.log(!(5 > 2));`, answers: ["false"], run: true, e: "`5 > 2` is `true`, and `!` flips it to `false`.", placeholder: "true or false" },
    { t: "predict", code: c`const a = true;
const b = false;
console.log(a && b, a || b, !a, !b);`, explain: "AND needs both → <code>false</code>. OR needs one → <code>true</code>. <code>!a</code> flips true → <code>false</code>, <code>!b</code> flips false → <code>true</code>." },
    { t: "parsons", title: "Weekend movie night", prompt: "Build a program that decides if there is a movie night: it must be the weekend <b>and</b> the homework must be done. The last line shows <code>Movie night: true</code>.", lines: [c`const isWeekend = true;`, c`const homeworkDone = true;`, c`const movieNight = isWeekend && homeworkDone;`, c`console.log("Movie night:", movieNight);`], distractors: [c`const movieNight = isWeekend || homeworkDone;`], explain: "Both conditions must be true, so the answer uses <code>&amp;&amp;</code>. A variable must be created before it is used, so the two inputs come first." },
    { t: "turn", level: "Hard", q: "What does this show?", code: c`console.log(Boolean("false"));`, answers: ["true"], run: true, e: "Tricky! `\"false\"` is a string with 5 letters, not the boolean `false`. Every non-empty string is truthy.", hint: "Look at the quotes. Is this the boolean or a piece of text?", placeholder: "true or false" },
    { t: "try", title: "Truthy or falsy lab", html: "<p>Guess first, then run. Add more values of your own: <code>-1</code>, <code>\"   \"</code>, <code>0.0</code>, <code>\"null\"</code>… Which ones surprise you?</p>", code: c`console.log("0 ->", Boolean(0));
console.log("'0' ->", Boolean("0"));
console.log("-1 ->", Boolean(-1));
console.log("'' ->", Boolean(""));` },
  ],
  exercises: [
    { id: "d8-adult", lvl: "seed", title: "Old enough?", prompt: "<p>Ask for an age with <code>prompt()</code>. Show <code>Adult: true</code> if the age is 18 or more, otherwise <code>Adult: false</code>.</p><pre class=\"code-static\">Input: 20\nAdult: true</pre>", starter: c`const age = Number(prompt("Your age?"));
// show Adult: true or Adult: false
`, tests: [{ stdin: "20", expected: "Adult: true" }, { stdin: "15", expected: "Adult: false" }, { stdin: "18", expected: "Adult: true" }],
      hint: "18 itself counts as adult, so use <code>&gt;=</code>. Then <code>console.log(\"Adult:\", ...)</code>.",
      solutions: [{ name: "Direct", code: c`const age = Number(prompt("Your age?"));
console.log("Adult:", age >= 18);`, note: "The comparison gives a boolean, and <code>console.log</code> shows it after the text." },
        { name: "Boolean variable", code: c`const age = Number(prompt("Your age?"));
const isAdult = age >= 18;
console.log("Adult:", isAdult);`, note: "A named boolean makes the meaning clear." }] },
    { id: "d8-same", lvl: "seed", title: "Same score?", prompt: "<p>Two friends type their scores in a game. Ask for both numbers and show <code>Same: true</code> if they are equal, otherwise <code>Same: false</code>.</p>", tests: [{ stdin: "40\n40", expected: "Same: true" }, { stdin: "40\n35", expected: "Same: false" }, { stdin: "7\n70", expected: "Same: false" }],
      hint: "Read two numbers with <code>Number(prompt(...))</code> and compare them with <code>===</code>.",
      solutions: [{ name: "===", code: c`const a = Number(prompt("Score 1?"));
const b = Number(prompt("Score 2?"));
console.log("Same:", a === b);`, note: "Always the strict <code>===</code>." }],
      twist: "Add a second line <code>Different: ...</code> using <code>!==</code>." },
    { id: "d8-teen", lvl: "star", title: "Teen check", prompt: "<p>Ask for an age and show <code>Teen: true</code> if the age is from 13 to 19 (both included), otherwise <code>Teen: false</code>.</p>", tests: [{ stdin: "13", expected: "Teen: true" }, { stdin: "19", expected: "Teen: true" }, { stdin: "12", expected: "Teen: false" }, { stdin: "20", expected: "Teen: false" }],
      hint: "\"Between\" needs two full comparisons joined by <code>&amp;&amp;</code>: <code>age &gt;= 13 &amp;&amp; age &lt;= 19</code>.",
      solutions: [{ name: "&& between", code: c`const age = Number(prompt("Your age?"));
console.log("Teen:", age >= 13 && age <= 19);`, note: "Both sides must be true." },
        { name: "Two booleans", code: c`const age = Number(prompt("Your age?"));
const atLeast13 = age >= 13;
const atMost19 = age <= 19;
console.log("Teen:", atLeast13 && atMost19);`, note: "Longer, but each rule has a name." }] },
    { id: "d8-free", lvl: "star", title: "Free museum entry", prompt: "<p>A museum is free for children <b>under 6</b> and for visitors aged <b>65 or more</b>. Ask for an age and show <code>Free: true</code> or <code>Free: false</code>.</p>", tests: [{ stdin: "4", expected: "Free: true" }, { stdin: "6", expected: "Free: false" }, { stdin: "65", expected: "Free: true" }, { stdin: "30", expected: "Free: false" }],
      hint: "One person cannot be under 6 <b>and</b> 65+ at once. Which logical operator means \"one of them is enough\"?",
      solutions: [{ name: "||", code: c`const age = Number(prompt("Your age?"));
console.log("Free:", age < 6 || age >= 65);`, note: "OR: one true side is enough." },
        { name: "NOT a paying age", code: c`const age = Number(prompt("Your age?"));
const pays = age >= 6 && age < 65;
console.log("Free:", !pays);`, note: "Describe who pays, then flip it with <code>!</code>." }] },
    { id: "d8-password", lvl: "star", title: "Is the password good?", prompt: "<p>Ask for a new password. It is good if it has <b>at least 8 characters</b> and it is <b>not</b> exactly <code>password123</code>. Show <code>Good: true</code> or <code>Good: false</code>.</p>", tests: [{ stdin: "tiger2026!", expected: "Good: true" }, { stdin: "abc", expected: "Good: false" }, { stdin: "password123", expected: "Good: false" }, { stdin: "12345678", expected: "Good: true" }],
      hint: "Use <code>.length</code> for the size and <code>!==</code> for \"not exactly\". Do not use <code>Number()</code> here — it is text.",
      solutions: [{ name: "Length && not equal", code: c`const pass = prompt("New password?");
console.log("Good:", pass.length >= 8 && pass !== "password123");`, note: "Two rules, both required: <code>&amp;&amp;</code>." },
        { name: "Named rules", code: c`const pass = prompt("New password?");
const longEnough = pass.length >= 8;
const notCommon = pass !== "password123";
console.log("Good:", longEnough && notCommon);`, note: "Each rule in its own boolean." }] },
    { id: "d8-leap", lvl: "fire", title: "Leap year", prompt: "<p>A year is a <b>leap year</b> (February has 29 days) if it can be divided by 4 but <b>not</b> by 100 — <b>or</b> if it can be divided by 400. Ask for a year and show <code>Leap: true</code> or <code>Leap: false</code>.</p><pre class=\"code-static\">2024 → Leap: true\n1900 → Leap: false\n2000 → Leap: true</pre>", tests: [{ stdin: "2024", expected: "Leap: true" }, { stdin: "1900", expected: "Leap: false" }, { stdin: "2000", expected: "Leap: true" }, { stdin: "2026", expected: "Leap: false" }],
      hint: "\"Can be divided by 4\" is <code>year % 4 === 0</code> (no remainder). Use brackets to group: <code>(rule A &amp;&amp; rule B) || rule C</code>.",
      solutions: [{ name: "One expression", code: c`const year = Number(prompt("Year?"));
const leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
console.log("Leap:", leap);`, note: "The brackets make the grouping clear to the reader." },
        { name: "Named parts", code: c`const year = Number(prompt("Year?"));
const by4 = year % 4 === 0;
const by100 = year % 100 === 0;
const by400 = year % 400 === 0;
console.log("Leap:", (by4 && !by100) || by400);`, note: "Three booleans, then one line of logic." }],
      twist: "Which years between 1896 and 1904 are leap years? Test them with your program." },
    { id: "d8-fix", lvl: "fire", debug: true, title: "Fix the mark checker", prompt: "<p>This program reads a mark out of 100. A mark of <b>50 or more</b> passes, a mark of <b>90 to 100</b> is excellent, and \"failed\" is the opposite of \"passed\". It has <b>three</b> logic bugs (no error messages — just wrong answers). For the input <code>50</code> it must show:</p><pre class=\"code-static\">Passed: true\nExcellent: false\nFailed: false</pre>",
      starter: c`const mark = Number(prompt("Mark out of 100?"));
const passed = mark > 50;
const excellent = mark >= 90 || mark <= 100;
const failed = passed;
console.log("Passed:", passed);
console.log("Excellent:", excellent);
console.log("Failed:", failed);`,
      tests: [{ stdin: "50", expected: "Passed: true\nExcellent: false\nFailed: false" }, { stdin: "95", expected: "Passed: true\nExcellent: true\nFailed: false" }, { stdin: "30", expected: "Passed: false\nExcellent: false\nFailed: true" }],
      hint: "Test the edge: is 50 a pass? Is 30 excellent with the current code? What is the opposite of <code>passed</code>?",
      solutions: [{ name: "Fixed", code: c`const mark = Number(prompt("Mark out of 100?"));
const passed = mark >= 50;
const excellent = mark >= 90 && mark <= 100;
const failed = !passed;
console.log("Passed:", passed);
console.log("Excellent:", excellent);
console.log("Failed:", failed);`, note: "Bug 1: 50 must pass, so <code>&gt;=</code>. Bug 2: \"between\" needs <code>&amp;&amp;</code> — with <code>||</code> every mark was excellent. Bug 3: the opposite is <code>!passed</code>." }] },
  ],
  quiz: [
    { q: "What does this show?", code: c`console.log(7 >= 7, 7 > 7);`, o: ["`true true`", "`true false`", "`false true`", "`false false`"], a: 1, e: "`>=` includes equal, `>` does not." },
    { q: "Which operator should you use to check that two values are equal?", o: ["`=`", "`==`", "`===`", "`=>`"], a: 2, e: "`=` stores a value, `==` converts types secretly, `===` compares value and type." },
    { q: "What does this show?", code: c`console.log(true && false || true);`, o: ["`true`", "`false`"], a: 0, e: "`&&` is done first: `true && false` is `false`. Then `false || true` is `true`." },
    { q: "Which of these values is **truthy**?", o: ["`0`", "`\"\"`", "`\"0\"`", "`NaN`"], a: 2, e: "`\"0\"` is a string with one character, so it is truthy. The others are falsy." },
    { q: "What does this show?", code: c`console.log("cat" < "Dog");`, o: ["`true`", "`false`"], a: 1, e: "All capital letters come before all small letters, so `\"Dog\"` is smaller than `\"cat\"`, and the answer is `false`." },
    { q: "How do you check that `x` is from 1 to 10?", o: ["`1 <= x <= 10`", "`x >= 1 || x <= 10`", "`x >= 1 && x <= 10`", "`x >= 1 && <= 10`"], a: 2, e: "Two full comparisons, both required, joined by `&&`." },
  ],
  puzzle: { title: "The logic chain", q: "<p>Without running it: what <b>exactly</b> does this program show? Type the output on one line.</p>", code: c`const a = 5;
const b = "5";
const c = a === Number(b);
const d = !c || a > 10;
console.log(c, d, c && !d);`, answers: ["true false true"], run: true, hint: "Work one line at a time. `Number(b)` turns the string into a number first.", e: "`Number(\"5\")` is `5`, so `c` is `true`. `!c` is `false` and `a > 10` is `false`, so `d` is `false`. Finally `c && !d` is `true && true` = `true`." },
  cards: [
    { f: "The six comparison operators?", b: "`>` `<` `>=` `<=` `===` `!==` — each one gives `true` or `false`." },
    { f: "Why `===` and not `==`?", b: "`==` converts types secretly (`0 == \"\"` is `true`). `===` checks value **and** type, so no surprises." },
    { f: "When is `a && b` true? When is `a || b` true?", b: "`&&`: only when **both** are true. `||`: when **at least one** is true." },
    { f: "The six falsy values?", b: "`0`, `\"\"`, `null`, `undefined`, `NaN`, `false`. Everything else is truthy." },
    { f: "How do you check \"x is between 13 and 19\"?", b: "`x >= 13 && x <= 19` — two full comparisons joined by `&&`." },
  ],
  remember: [
    "A comparison always answers with a **boolean**: `true` or `false`.",
    "`=` stores, `===` asks. Always use `===` and `!==`, never `==`.",
    "Strings compare in dictionary order, and capital letters come before small ones. Use `.toLowerCase()` to compare fairly.",
    "`&&` = both must be true, `||` = one is enough, `!` = flip.",
    "\"Between\" needs two full comparisons: `age >= 13 && age <= 19`.",
    "Falsy: `0`, `\"\"`, `null`, `undefined`, `NaN`, `false`. Everything else is truthy.",
  ],
};
})();