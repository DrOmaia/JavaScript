/* JS30 core: storage, profile, points, theme, navigation */
(function () {
  const KEY = "js30.v1";
  const blank = () => ({ profile: null, days: {}, cards: {}, streak: { last: null, count: 0 }, theme: null, code: {}, notes: {}, cardXp: 0 });

  const isObj = x => x && typeof x === "object" && !Array.isArray(x);
  const cleanName = s => String(s || "").trim().replace(/["'`\\{}<>$&]/g, "").slice(0, 24);
  // keep only the shapes the site expects, so a damaged or hand-edited backup cannot break the pages
  function normalize(d) {
    const st = blank();
    if (!isObj(d)) return st;
    ["days", "cards", "code", "notes"].forEach(k => { if (isObj(d[k])) st[k] = d[k]; });
    Object.keys(st.days).forEach(k => { if (!isObj(st.days[k])) delete st.days[k]; });
    Object.keys(st.cards).forEach(k => { const c = st.cards[k]; if (!isObj(c) || typeof c.due !== "string") delete st.cards[k]; });
    if (isObj(d.streak)) st.streak = { last: typeof d.streak.last === "string" ? d.streak.last : null, count: +d.streak.count || 0, best: +d.streak.best || 0 };
    if (isObj(d.profile) && cleanName(d.profile.name)) st.profile = { name: cleanName(d.profile.name), avatar: typeof d.profile.avatar === "string" ? d.profile.avatar.slice(0, 8) : "🦊", goal: String(d.profile.goal || "school"), started: typeof d.profile.started === "string" ? d.profile.started : null };
    if (d.theme === "dark" || d.theme === "light") st.theme = d.theme;
    st.cardXp = +d.cardXp || 0;
    ["capstone", "completedOn"].forEach(k => { if (typeof d[k] === "string") st[k] = d[k]; });
    return st;
  }
  function load() {
    try { return normalize(JSON.parse(localStorage.getItem(KEY) || "{}")); }
    catch (e) { return blank(); }
  }
  let state = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  const pad = n => String(n).padStart(2, "0");
  const iso = d => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  const today = () => iso(new Date());
  const addDays = (s, n) => { const d = new Date(s + "T00:00:00"); d.setDate(d.getDate() + n); return iso(d); };

  function esc(s) { return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

  // Personalization: {{name}}
  function T(str) {
    if (str == null) return "";
    const p = state.profile || {};
    const name = (p.name || "Student").trim();
    return String(str).replace(/\{\{name\}\}/g, name);
  }

  function day(n) {
    const d = state.days[n] || (state.days[n] = {});
    const def = { ex: {}, quiz: null, puzzle: false, done: false, visited: false, parsons: {}, predict: {}, checks: {}, turns: {} };
    Object.keys(def).forEach(k => { if (d[k] === undefined) d[k] = def[k]; });
    return d;
  }

  function touchStreak() {
    const t = today(), s = state.streak;
    if (s.last === t) return;
    s.count = s.last === addDays(t, -1) ? s.count + 1 : 1;
    s.last = t;
    s.best = Math.max(s.best || 0, s.count);
    save();
  }

  // ---------- Points (XP) and levels: always computed from what was done, never stored twice
  const EX_XP = { seed: 10, star: 15, fire: 25 };
  function xp() {
    let x = state.cardXp || 0;
    Object.values(state.days).forEach(d => {
      Object.values(d.ex || {}).forEach(v => { x += typeof v === "number" ? v : 10; });
      x += 5 * Object.values(d.checks || {}).filter(Boolean).length;
      x += 5 * Object.values(d.turns || {}).filter(Boolean).length;
      x += 5 * Object.values(d.predict || {}).filter(Boolean).length;
      x += 10 * Object.values(d.parsons || {}).filter(Boolean).length;
      if (d.quiz) x += 4 * d.quiz.score;
      if (d.puzzle) x += 10;
      if (d.done) x += 30;
    });
    return x;
  }
  const LEVELS = ["Newbie", "Explorer", "Builder", "Debugger", "Coder", "Problem Solver", "Developer", "Web Maker", "JS Ninja", "JS Master"];
  function level(x) {
    if (x == null) x = xp();
    const n = Math.floor(Math.sqrt(x / 40)) + 1;            // level n starts at 40*(n-1)^2 points
    const from = 40 * (n - 1) * (n - 1), to = 40 * n * n;
    return { n, name: LEVELS[Math.min(n, LEVELS.length) - 1], from, to, pct: Math.round(100 * (x - from) / (to - from)) };
  }
  function badges() {
    const days = state.days, done = n => days[n] && days[n].done;
    const solved = Object.values(days).reduce((a, d) => a + Object.keys(d.ex || {}).length, 0);
    const perfect = Object.values(days).some(d => d.quiz && d.quiz.score === d.quiz.total);
    const weekDone = w => [0, 1, 2, 3, 4, 5].every(k => done(7 * (w - 1) + 1 + k));
    return [
      { icon: "👋", name: "Hello, World", got: !!done(1), how: "Finish Day 1" },
      { icon: "🧩", name: "10 problems", got: solved >= 10, how: "Solve 10 problems" },
      { icon: "🔥", name: "3-day streak", got: (state.streak.best || state.streak.count) >= 3, how: "Code 3 days in a row" },
      { icon: "🏆", name: "Perfect quiz", got: perfect, how: "Get every quiz answer right" },
      { icon: "🔁", name: "Loop master", got: weekDone(2), how: "Finish Week 2" },
      { icon: "🧰", name: "Function pro", got: weekDone(3), how: "Finish Week 3" },
      { icon: "🌐", name: "Web maker", got: weekDone(4), how: "Finish Week 4" },
      { icon: "🎓", name: "JS30 graduate", got: !!done(30), how: "Finish Day 30" },
    ];
  }
  function addXpToast(points, why) {
    if (!points) return;
    const lvBefore = level(xp() - points).n, lv = level();
    toast(`+${points} points${why ? " · " + why : ""}`);
    if (lv.n > lvBefore) setTimeout(() => toast(`Level up! You are now level ${lv.n}: ${lv.name} 🎉`), 900);
  }

  // Spaced repetition (Leitner): box 1..5, intervals in days
  const INTERVALS = [0, 1, 2, 4, 8, 16];
  function addCards(dayN, cards) {
    (cards || []).forEach((c, i) => {
      const id = dayN + ":" + i;
      if (!state.cards[id]) state.cards[id] = { box: 1, due: addDays(today(), 1) };
    });
    save();
  }
  function dueCards() {
    const t = today();
    return Object.entries(state.cards).filter(([, v]) => v.due <= t).map(([k]) => k);
  }
  function gradeCard(id, knew) {
    const c = state.cards[id]; if (!c) return;
    c.box = knew ? Math.min(5, c.box + 1) : 1;
    c.due = addDays(today(), INTERVALS[c.box]);
    if (knew) state.cardXp = (state.cardXp || 0) + 2;
    save();
  }

  // Theme
  function applyTheme() {
    const th = state.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", th);
  }
  function toggleTheme() {
    const cur = document.documentElement.getAttribute("data-theme");
    state.theme = cur === "dark" ? "light" : "dark"; save(); applyTheme();
  }
  applyTheme();

  function toast(msg) {
    const t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), 2600);
  }

  // Top bar
  function renderTopbar(active) {
    const bar = document.createElement("header");
    bar.className = "topbar no-print";
    const due = dueCards().length;
    const av = (state.profile && state.profile.avatar) || "🦊";
    const lv = level();
    bar.innerHTML = `<div class="wrap">
      <a class="logo" href="index.html" aria-label="JS30 home"><span class="mark">JS</span>JS30</a>
      <nav class="nav" aria-label="Main">
        <a href="index.html" class="${active === "home" ? "active" : ""}">Journey</a>
        <a href="review.html" class="${active === "review" ? "active" : ""}">Review${due ? `<span class="badge">${due}</span>` : ""}</a>
        <a href="playground.html" class="hide-sm ${active === "playground" ? "active" : ""}">Playground</a>
        <a href="glossary.html" class="hide-sm ${active === "glossary" ? "active" : ""}">Glossary</a>
        <span class="lv-pill" title="Your level and points">Lv ${lv.n}</span>
        <button type="button" id="themeBtn" aria-label="Toggle dark mode" title="Dark / light"><svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" style="vertical-align:-3px"><path fill="currentColor" d="M21 14.5A8.5 8.5 0 0 1 9.5 3a8.5 8.5 0 1 0 11.5 11.5Z"/></svg></button>
        <button type="button" class="avatar-btn" id="profileBtn" aria-label="Edit profile" title="Your profile">${esc(av)}</button>
      </nav></div>`;
    document.body.prepend(bar);
    bar.querySelector("#themeBtn").onclick = toggleTheme;
    bar.querySelector("#profileBtn").onclick = () => welcome(true);
  }

  const REPO_URL = "https://github.com/dromaia/JavaScript";
  const STAR_SVG = '<svg aria-hidden="true" viewBox="0 0 16 16" width="15" height="15"><path fill="currentColor" d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>';

  function renderFooter() {
    const f = document.createElement("footer");
    f.className = "footer";
    f.innerHTML = `<div class="wrap">JavaScript runs right in your browser. Your progress is saved in this browser only. <a href="setup.html">Help &amp; backup</a> <a class="gh-star" href="${REPO_URL}" target="_blank" rel="noopener" aria-label="Star JS30 on GitHub (opens in a new tab)">${STAR_SVG}Star on GitHub</a></div>`;
    document.body.appendChild(f);
  }

  const AVATARS = ["🦊", "🚀", "🐱", "🎧", "🐼", "🌙", "⚡", "🎮", "🧠", "🦁", "🐢", "🌟"];
  const GOALS = [
    ["school", "Do great in my computer class"],
    ["games", "Build my own games and websites"],
    ["future", "Prepare for university and a tech future"],
    ["fun", "Just for fun"],
  ];

  function welcome(editing) {
    const p = state.profile || { name: "", avatar: "🦊", goal: "school" };
    const bg = document.createElement("div");
    bg.className = "modal-bg";
    bg.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="wTitle">
      <h2 id="wTitle">${editing ? "Your profile" : "Welcome to JS30"}</h2>
      <p class="muted">${editing ? "Change how JS30 talks to you." : "30 days, about an hour a day, from zero to real JavaScript and your own web pages. First, tell us your name. You will be the hero of every lesson."}</p>
      <div class="field"><label for="wName">Your first name</label><input id="wName" maxlength="24" autocomplete="given-name" value="${esc(p.name)}" placeholder="e.g. Hassan"></div>
      <div class="field"><label>Pick your avatar</label><div class="avatars" id="wAv">${AVATARS.map(a => `<button type="button" data-v="${a}" aria-label="avatar ${a}">${a}</button>`).join("")}</div></div>
      <div class="field"><label for="wGoal">Your main goal</label><select id="wGoal">${GOALS.map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select></div>
      <p id="wErr" class="t-fail" style="display:none"></p>
      <div style="display:flex;gap:8px;margin-top:16px">
        <button class="btn btn-primary" id="wSave" type="button">${editing ? "Save profile" : "Start my journey"}</button>
        ${editing ? `<button class="btn btn-ghost" id="wCancel" type="button">Cancel</button>` : ""}
      </div></div>`;
    document.body.appendChild(bg);
    let avatar = p.avatar;
    const setOn = (wrap, v) => wrap.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.v === v));
    const aW = bg.querySelector("#wAv");
    setOn(aW, avatar);
    bg.querySelector("#wGoal").value = p.goal || "school";
    aW.onclick = e => { const b = e.target.closest("button"); if (b) { avatar = b.dataset.v; setOn(aW, avatar); } };
    const cancel = bg.querySelector("#wCancel"); if (cancel) cancel.onclick = () => bg.remove();
    bg.querySelector("#wName").focus();
    const go = () => {
      const name = cleanName(bg.querySelector("#wName").value);
      const err = bg.querySelector("#wErr");
      if (!name) { err.textContent = "Please write your name."; err.style.display = "block"; return; }
      state.profile = { name, avatar, goal: bg.querySelector("#wGoal").value, started: (state.profile && state.profile.started) || today() };
      save();
      location.reload();
    };
    bg.querySelector("#wSave").onclick = go;
    bg.querySelector("#wName").onkeydown = e => { if (e.key === "Enter") go(); };
  }

  function requireProfile() { if (!state.profile) welcome(false); }

  window.JS30 = {
    get state() { return state; }, save, esc, T, day, today, addDays, xp, level, badges, addXpToast, EX_XP,
    REPO_URL, STAR_SVG, touchStreak, addCards, dueCards, gradeCard, toast, renderTopbar, renderFooter, welcome, requireProfile, toggleTheme,
    reset() { if (confirm("Delete all your progress, code and notes in this browser?")) { localStorage.removeItem(KEY); location.href = "index.html"; } },
    exportData() { return JSON.stringify(state, null, 2); },
    importData(txt) { const d = JSON.parse(txt); if (!isObj(d) || !isObj(d.days)) throw new Error("not a backup"); state = normalize(d); save(); },
  };
})();
