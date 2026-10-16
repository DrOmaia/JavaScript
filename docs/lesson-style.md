# JS30 lesson style guide

How every day file (`js/days/dayNN.js`) is written. **Day 1 (`js/days/day01.js`) is the model for console
lessons and Day 22 (`js/days/day22.js`) is the model for web lessons: read the right one in full before writing.**
Goal: every lesson teaches as slowly and clearly as Day 1 — the student never meets an idea without a reason,
an example, an explanation of the example, and a quick check.

Audience: a grade-10 student (about 15), a complete beginner, and any other beginner. The school book chapter
"Introduction to Web Programming with HTML & JavaScript" (Intro to JavaScript; JavaScript and HTML) is covered by
Weeks 1 and 4; the rest goes further. **All content is original** — never copy text from a book or another site.
English only, simple (about B1), friendly, second person ("you"). Use `{{name}}` now and then (it becomes the
student's name). No Arabic.

## The teaching pattern for every idea (each `h` section of `learn`)

1. **`h`** — a short heading.
2. **`p` — why**: what problem does this idea solve? 2–4 sentences, a real situation from a student's life.
3. **`analogy`** — an everyday picture of the idea (at least 2 per lesson).
4. **`code`** — a small example (3–8 lines) with **one** new idea. Use `before` to say what to look at and
   `note` to explain the result. Never a block that shows six new things at once — split it.
5. **`lines`** — read the key example line by line ("Read it like a programmer").
6. **`check`** (multiple choice) or **`turn`** ("Your turn": type a short answer, like the class slides) — one quick
   question so the student proves they understood before moving on.

Also in every lesson day:
- **`steps`** — at least one worked example: a realistic problem solved in 3–6 steps
  (understand → plan → build piece by piece → full program), with the full runnable `code` at the end.
- **`viz`** — at least one in console lessons, where watching the code run step by step helps (loops, functions).
- **`table`** — a summary table when there are several methods / operators.

## Size targets

| Part | Lesson day | Review day (6, 13, 20, 27) | Rest day (7, 14, 21, 28) | Capstone (29, 30) |
| --- | --- | --- | --- | --- |
| Words of explanation in `learn` (not counting code) | 600–1000 | week recap 350+ | 300–600 | plan + milestones |
| `check` + `turn` in `learn` | 5–7 (at least 2 `turn`) | 1 per lesson of the week | 3–5 (self-check of the week) | 2–3 |
| `lines` | 2+ | – | – | – |
| `steps` | 1–2 | 1 | – | 1 |
| `analogy` | 2+ | – | – | – |
| `practice` items (`try`/`webtry`, `predict`, `parsons`, `turn`) | 6–8 | 4–6 | – | – |
| `mistakes` / `tricks` | 4 / 3 | – | – | – |
| `exercises` | 7 (2 🌱 seed, 3 ⭐ star, 2 🔥 fire; one 🔥 is a `debug` exercise) | 5–7 incl. the project | – | 3 tracks × 3–4 milestones |
| `quiz` / `cards` / `remember` | 5–6 / 5 / 5–6 bullets | same | – / – / 6–8 | 4 / 3 / 4–6 |
| `puzzle` | 1 | 1 | – | – |

Review days start `learn` with a **Week recap**: for each lesson of the week a heading, 2–3 sentences, a tiny
example and a `check` or `turn`; then the project (worked through in `steps`, and as exercises).
Rest days: no new syntax; a short story or idea (history of JS, debugging, how the web works…), a light optional plan
(review deck, notes), and self-check questions about the week.

## Writing

- Examples from a teenager's life: marks, timetables, riyals, football, games, a school canteen, Riyadh weather,
  a phone battery, a playlist.
- Build on earlier days only (never use an idea before the day that teaches it — see the curriculum in
  `js/curriculum.js` and the scope list given to you).
- Modern JavaScript: `let` / `const` (mention `var` only as "old style"), `===` (explain `==` once on Day 8),
  semicolons at the end of statements, 2-space indentation, double quotes for strings, template literals from Day 5.
- Console lessons use only plain JavaScript (no DOM). `prompt()` works: the answers come from the **Input** box.
  A code block that calls `prompt()` needs a `stdin` field (one line per answer) and exercises give it per test.
  `alert(x)` shows `[alert] x` in the output. Avoid `Math.random()` in anything that is checked (tests, `predict`,
  `turn` with `run: true`, checks with code); it is fine in `code` / `try` examples.
- A code block that fails on purpose gets `error: true` and a `note` that says the error is expected.
- Console output looks like Chrome's console: `console.log([1, "a"])` shows `[1, 'a']`,
  `console.log({name: "Sara", age: 16})` shows `{name: 'Sara', age: 16}`; strings at the top level show without quotes;
  several values are joined by one space. Run your code with the checker — it uses the same engine as the site — and
  copy the real output into tests and answers.
- Strict mode is on: a variable must be created with `let` / `const` before it is used.

## Code inside day files: the `c` helper

Every day file starts with:

```js
window.DAYS = window.DAYS || {};
(function () {
// c`...` = code exactly as written. In code, write ¦ for a backtick and #{ for ${ (see docs/lesson-style.md).
const c = (s, ...v) => String.raw(s, ...v).replace(/¦/g, "`").replace(/#\{/g, "${");
DAYS[NN] = { ... };
})();
```

Code goes inside ``c`...` ``, written exactly as the student sees it (real line breaks, `\n` stays `\n`).
Because ``c`...` `` is itself a template literal, **inside it write `¦` instead of a backtick and `#{` instead of
`${`**. Example: ``c`console.log(¦Hi #{name}!¦);` `` is shown as ``console.log(`Hi ${name}!`);``.

## Block reference

Fields shown in **md** take plain text with `` `code` `` and `**bold**` (no HTML; a backtick inside them is
impossible, so write template literals there as e.g. "a template string with backticks"). Fields shown in **html**
take HTML (`<p>`, `<code>`, `<b>`, `<ul>`; escape `<` as `&lt;` when you mean the character).

```js
{ t: "h", text: "Heading" }
{ t: "p", html: "<p>…</p>" }
{ t: "analogy", title: "An array is like a train", html: "<p>…</p>" }
{ t: "code", code: c`…`, stdin: "5\n7", before: "<p>…</p>", note: "<p>…</p>", error: false, noViz: false }
{ t: "viz", code: c`…`, before: "<p>…</p>" }                      // shows the Visualize hint
{ t: "lines", title: "Read it like a programmer", rows: [[c`let total = 0;`, "html explanation"], …] }
{ t: "check", q: "md question", code: c`optional code`, o: ["md", "md", "md"], a: 1, e: "md why", hint: "md shown after a wrong answer" }
{ t: "turn", level: "Easy", q: "md question", code: c`optional`, answers: ["number"], e: "md why", hint: "md", placeholder: "e.g. string", run: true, oneWord: false }
{ t: "steps", title: "Average of marks", problem: "<p>html</p>", steps: [{ html: "<p>Step</p>", code: c`optional` }, …], code: c`full program`, stdin: "optional", web: false }
{ t: "table", head: ["md", "md"], rows: [["md", "md"]] }
{ t: "static", code: c`code shown, not runnable` }
{ t: "tip", title: "…", html: "…", code: c`optional` }
// practice only:
{ t: "try", title: "Make it yours", html: "<p>…</p>", code: c`…`, stdin: "optional" }   // editor saved for the student
{ t: "predict", code: c`…`, stdin: "optional", explain: "<p>html</p>" }
{ t: "parsons", title: "…", prompt: "html", lines: [c`line 1`, c`line 2`], distractors: [c`wrong line`], explain: "html" }
// web (Week 4, and anywhere a page is needed):
{ t: "web", title: "file.html", code: c`<!DOCTYPE html>…`, before: "html", note: "html", height: 220 }
{ t: "webtry", title: "…", html: "<p>…</p>", code: c`…` }
```

Answer keys are verified automatically: a `check` / quiz question **with `code`** whose options are all written as
`` `value` `` is run, and its output must equal the marked option (`\n` between lines is written as a real line
break, or the lines are joined by one space). Add `noRun: true` only when the question is about something other
than the output. A `turn` with `run: true` is run and must print `answers[0]`. Parsons lines must all be different
(add a short comment to make two identical lines different).

`turn` answers are compared ignoring case, extra spaces, a final `;` and the kind of quotes. Give every reasonable
spelling in `answers` (e.g. `["string", "'string'"]`).

Day-level fields: `title, intro (html), goals[md], learn[], mistakes[{title, html, wrong, right}], tricks[{title,
html, code?}], practice[], exercises[], quiz[{q, code?, o, a, e}], puzzle, cards[{f, b}], remember[md]`.

### Exercises

```js
{ id: "unique-id", lvl: "seed" | "star" | "fire", debug: true?, title: "…", prompt: "<p>html</p>",
  starter: c`optional starting code`, hint: "html",
  tests: [{ stdin: "answers for prompt()", expected: "exact output", after: c`optional code run after the student's code` }],
  solutions: [{ name: "Short name", code: c`…`, note: "html" }, …],   // 1–3 different correct ways
  twist: "html shown after solving (optional)" }
```

- `expected` is compared after trimming trailing spaces and final empty lines.
- To test a function, use `after`: the student's code runs, then `after` runs in the same scope, and **only the
  output of `after` is compared** (e.g. `after: c`console.log(add(2, 3));``, `expected: "5"`). Use 2–4 tests with
  different values so a hard-coded answer fails.
- A `debug` exercise gives broken code in `starter`; the student fixes it.

**Web exercises** (`web: true`) are an HTML page; each test opens a fresh copy of the page, runs `before` (async
JavaScript inside the page), waits 40 ms, then evaluates `check` (a JavaScript expression) and compares its text with
`expected`. `check: "@console"` compares everything the page logged. Helpers available in `before` / `check`:
`$(sel)` (querySelector), `click(sel)`, `type(sel, value)` (sets the value and fires input + change),
`press(key, sel?)` (keydown + keyup), `text(sel)` (trimmed textContent), `count(sel)`, `style(sel, prop)`
(computed style), `await wait(ms)`, `output()` (console text). `stdin` answers `prompt()`.
Give each test a short `desc` ("clicking +1 twice shows 2").

```js
{ id: "counter", lvl: "star", web: true, title: "…", prompt: "<p>…</p>", starter: c`<button id="add">+1</button>…`,
  tests: [{ before: "click('#add'); click('#add');", check: "text('#count')", expected: "2", desc: "two clicks show 2" }],
  solutions: [{ name: "…", code: c`<!DOCTYPE html>…` }], height: 220 }
```

## Check before you finish

```bash
node --check js/days/dayNN.js
node tools/check-lessons.js NN      # runs every example and solution — must say "All good."
python3 tools/smoke.py NN           # opens the page in Chromium, runs web solutions — must say "all good"
```
Also run each `check` and `predict` snippet yourself (the checker verifies most of them) so the answer marked correct
really is correct.
