#!/usr/bin/env node
/* JS30 lesson checker (developer tool, not loaded by the site).
   Usage: node tools/check-lessons.js [day ...]
   1. Checks the shape of every js/days/dayNN.js (block types, answers, unique ids).
   2. Runs every example, worked example and exercise solution with the same engine the site uses
      (js/engine.js) and reports errors and failed tests.
   3. Answer keys: a quick check / quiz question / "your turn" with code whose answer is shown as `value`
      is run, and the real output must equal the marked answer (skip with noRun: true).
   Web exercises (web: true) are tested in a real browser by tools/smoke.py. */
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
global.window = global;
const E = require(path.join(root, "js/engine.js"));
const T = s => String(s ?? "").replace(/\{\{name\}\}/g, "Sara");
const BLOCKS = new Set(["p", "h", "tip", "analogy", "static", "table", "code", "viz", "try", "mistake", "predict", "parsons", "lines", "check", "steps", "turn", "web", "webtry"]);
const days = process.argv.slice(2).map(Number).filter(Boolean);
const list = days.length ? days : Array.from({ length: 30 }, (_, i) => i + 1);
const problems = [], jobs = [];
const bad = (d, where, msg) => problems.push(`Day ${d} ${where}: ${msg}`);
const norm = s => String(s).replace(/\r/g, "").split("\n").map(l => l.replace(/\s+$/, "")).join("\n").replace(/\n+$/, "");
const bt = s => { const m = /^`([^`]*)`$/.exec(String(s).trim()); return m ? m[1] : null; };
const htmlScripts = html => { const out = []; String(html).replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (a, attrs, code) => { if (!/\bsrc\s*=/.test(attrs)) out.push(code); }); return out; };
const words = html => String(html || "").replace(/<pre[\s\S]*?<\/pre>/g, " ").replace(/<code>[\s\S]*?<\/code>/g, " x ").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

function answerJob(d, w, code, expected, kind) {
  jobs.push({ d, w, kind: "answer", code: T(code), expected: T(expected), what: kind });
}

for (const d of list) {
  const f = path.join(root, "js/days", `day${String(d).padStart(2, "0")}.js`);
  try { global.DAYS = global.DAYS || {}; eval(fs.readFileSync(f, "utf8")); } catch (e) { bad(d, "file", "does not load: " + e.message); continue; }
  const D = DAYS[d];
  if (!D) { bad(d, "file", "DAYS[" + d + "] missing"); continue; }
  let learnWords = 0;
  const blocks = (arr, sec) => (arr || []).forEach((b, k) => {
    const w = `${sec}[${k}]`;
    if (!BLOCKS.has(b.t)) return bad(d, w, `unknown block type "${b.t}"`);
    if (sec === "learn") learnWords += words(b.html) + words(b.before) + words(b.note) + words(b.problem) + (b.steps || []).reduce((a, s) => a + words(s.html), 0) + (b.rows || []).reduce((a, r) => a + words(r[1]), 0);
    if (["code", "viz", "try"].includes(b.t)) {
      if (!b.code) return bad(d, w, "no code");
      jobs.push({ d, w, kind: "run", code: T(b.code), stdin: T(b.stdin || ""), mayFail: !!b.error });
    }
    if (["web", "webtry"].includes(b.t)) {
      if (!b.code) return bad(d, w, "no code");
      htmlScripts(T(b.code)).forEach((s, j) => { try { E.parse(s); } catch (e) { bad(d, w, `script ${j + 1} syntax error: ${e.message}`); } });
    }
    if (b.t === "predict") jobs.push({ d, w, kind: "run", code: T(b.code), stdin: T(b.stdin || ""), mayFail: true });
    if (b.t === "check") {
      if (!Array.isArray(b.o) || b.o.length < 2) bad(d, w, "check needs 2+ options");
      else if (!(b.a >= 0 && b.a < b.o.length)) bad(d, w, "check answer index out of range");
      if (!b.q) bad(d, w, "check has no question");
      if (!b.e) bad(d, w, "check has no explanation");
      if (b.code && !b.noRun && Array.isArray(b.o) && b.o.every(o => bt(o) !== null)) answerJob(d, w, b.code, bt(b.o[b.a]), "check");
    }
    if (b.t === "turn") {
      if (!b.q) bad(d, w, "turn has no question");
      if (!Array.isArray(b.answers) || !b.answers.length) bad(d, w, "turn needs answers: [...]");
      if (!b.e) bad(d, w, "turn has no explanation");
      if (b.run && b.code) answerJob(d, w, b.code, b.answers[0], "turn");
    }
    if (b.t === "steps") {
      if (!Array.isArray(b.steps) || b.steps.length < 2) bad(d, w, "worked example needs 2+ steps");
      if (b.code && !b.web) jobs.push({ d, w, kind: "run", code: T(b.code), stdin: T(b.stdin || ""), mayFail: false });
      if (b.code && b.web) htmlScripts(T(b.code)).forEach((s, j) => { try { E.parse(s); } catch (e) { bad(d, w, `script ${j + 1} syntax error: ${e.message}`); } });
    }
    if (b.t === "lines" && (!Array.isArray(b.rows) || !b.rows.every(r => Array.isArray(r) && r.length === 2))) bad(d, w, "lines rows must be [code, explanation] pairs");
    if (b.t === "parsons" && !(b.lines && b.lines.length > 1)) bad(d, w, "parsons needs lines");
    if (b.t === "parsons" && b.lines && new Set(b.lines.map(String)).size !== b.lines.length) bad(d, w, "parsons lines must all be different (identical lines cannot be checked)");
    if (b.t === "table" && !(b.head && b.rows)) bad(d, w, "table needs head and rows");
  });
  blocks(D.learn, "learn"); blocks(D.practice, "practice"); blocks(D.extra, "extra");
  (D.tricks || []).forEach((t, k) => { if (t.code) jobs.push({ d, w: `tricks[${k}]`, kind: "run", code: T(t.code), stdin: "", mayFail: !!t.error }); });
  (D.mistakes || []).forEach((m, k) => { if (!m.wrong || !m.right) bad(d, `mistakes[${k}]`, "needs wrong and right"); });
  (D.quiz || []).forEach((q, k) => {
    if (!(q.a >= 0 && q.a < q.o.length)) bad(d, `quiz[${k}]`, "answer index out of range");
    if (q.code && !q.noRun && q.o.every(o => bt(o) !== null)) answerJob(d, `quiz[${k}]`, q.code, bt(q.o[q.a]), "quiz");
  });
  if (D.puzzle && D.puzzle.o && !(D.puzzle.a >= 0 && D.puzzle.a < D.puzzle.o.length)) bad(d, "puzzle", "answer index out of range");
  if (D.puzzle && !D.puzzle.o && !(D.puzzle.answers && D.puzzle.answers.length)) bad(d, "puzzle", "needs o/a or answers");
  if (D.puzzle && D.puzzle.code && D.puzzle.answers && D.puzzle.run) answerJob(d, "puzzle", D.puzzle.code, D.puzzle.answers[0], "puzzle");
  if (D.remember && !(Array.isArray(D.remember) && D.remember.length)) bad(d, "remember", "must be a non-empty list");
  (D.cards || []).forEach((c, k) => { if (!c.f || !c.b) bad(d, `cards[${k}]`, "needs f and b"); });
  const ids = new Set();
  (D.exercises || []).forEach((ex, k) => {
    if (!ex.id) bad(d, `exercises[${k}]`, "no id");
    if (ids.has(ex.id)) bad(d, `exercises[${k}]`, `duplicate id "${ex.id}"`); ids.add(ex.id);
    if (!["seed", "star", "fire"].includes(ex.lvl)) bad(d, `exercises[${k}]`, `lvl must be seed / star / fire`);
    if (!ex.tests || !ex.tests.length) return bad(d, `exercises[${k}]`, "no tests");
    if (!(ex.solutions || []).length) bad(d, `exercises[${k}]`, "no solutions");
    if (ex.web) {
      ex.tests.forEach((t, j) => { if (!("expected" in t)) bad(d, `exercise "${ex.id}" test ${j + 1}`, "needs expected"); if (t.check && t.check !== "@console") { try { new Function("return (" + t.check + ")"); } catch (e) { bad(d, `exercise "${ex.id}" test ${j + 1}`, "check is not a valid expression: " + e.message); } } });
      (ex.solutions || []).forEach(s => htmlScripts(T(s.code)).forEach((c, j) => { try { E.parse(c); } catch (e) { bad(d, `exercise "${ex.id}" solution "${s.name}"`, `script ${j + 1} syntax error: ${e.message}`); } }));
      return;
    }
    const tests = ex.tests.map(t => ({ stdin: T(t.stdin || ""), expected: T(t.expected || ""), after: t.after ? T(t.after) : undefined }));
    (ex.solutions || []).forEach(s => jobs.push({ d, w: `exercise "${ex.id}" solution "${s.name}"`, kind: "test", code: T(s.code), tests, partial: !!s.partial }));
    if (ex.starter && !ex.debug) jobs.push({ d, w: `exercise "${ex.id}" starter`, kind: "starter", code: T(ex.starter), tests });
  });
  if (D.learn && ["lesson"].includes((D.kind || "lesson")) && process.env.WORDS) console.log(`Day ${d}: ~${learnWords} words in learn`);
}

(async () => {
  for (const job of jobs) {
    try {
      if (job.kind === "run") {
        const r = await E.execute(job.code, { stdin: job.stdin });
        if (r.error && !job.mayFail) bad(job.d, job.w, `${r.error.type}: ${r.error.msg} (line ${r.error.line})`);
      } else if (job.kind === "answer") {
        const r = await E.execute(job.code, {});
        const got = E.outputOf(r.segs) + (r.error ? `${r.error.type}: ${r.error.msg}` : "");
        const want = job.expected.replace(/\\n/g, "\n");
        if (norm(got) !== norm(want) && norm(got).replace(/\n/g, " ") !== norm(want)) bad(job.d, job.w, `${job.what} answer is marked ${JSON.stringify(job.expected)} but the code prints ${JSON.stringify(norm(got))}`);
      } else if (job.kind === "starter") {
        const r = await E.execute(job.code, { stdin: job.tests[0].stdin || "", after: job.tests[0].after });
        if (r.error && r.error.type === "SyntaxError") bad(job.d, job.w, "starter code has a syntax error: " + r.error.msg);
      } else {
        const res = await E.test(job.code, job.tests);
        let msg = null;
        res.forEach((x, k) => {
          if (msg) return;
          if (x.error) msg = `test ${k + 1} error ${x.error.type}: ${x.error.msg} (line ${x.error.line})`;
          else if (norm(x.got) !== norm(job.tests[k].expected)) msg = `test ${k + 1} expected ${JSON.stringify(norm(job.tests[k].expected).slice(0, 90))} got ${JSON.stringify(norm(x.got).slice(0, 90))}`;
        });
        if (msg && !job.partial) bad(job.d, job.w, msg);
      }
    } catch (e) { bad(job.d, job.w, "checker crashed: " + e.message); }
  }
  console.log(`Checked ${list.length} day(s), ran ${jobs.length} programs.`);
  if (problems.length) { console.log(problems.join("\n")); console.log(`${problems.length} problem(s).`); process.exit(1); }
  console.log("All good.");
})();
