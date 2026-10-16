/* JS30 runner: talks to the worker and restarts it if a program never stops */
(function () {
  let worker = null, seq = 0;
  const pending = new Map();
  const listeners = new Set();
  let state = "cold"; // cold | ready

  function setState(s) { state = s; listeners.forEach(fn => fn(s)); }

  function spawn() {
    worker = new Worker("js/worker.js");
    worker.onmessage = (ev) => {
      const m = ev.data, p = pending.get(m.id);
      if (!p) return;
      if (m.status) { p.onStatus && p.onStatus(m.status); if (m.status === "running") p.arm(); return; }
      pending.delete(m.id); clearTimeout(p.timer);
      if (state !== "ready") setState("ready");
      // every run gets a clean worker, so one program can never change the next one
      if (m.result !== "ready" && !pending.size) { worker.terminate(); worker = null; spawn(); }
      m.ok ? p.resolve(m.result) : p.reject(new Error(m.fatal || "The code runner stopped unexpectedly."));
    };
    worker.onerror = () => {
      pending.forEach(p => p.reject(new Error("The code runner could not start. Please reload the page.")));
      pending.clear();
    };
  }

  function kill() {
    if (worker) worker.terminate();
    worker = null;
    pending.forEach(p => { clearTimeout(p.timer); p.resolve({ timeout: true }); });
    pending.clear();
    setState("cold");
  }

  function call(msg, { timeout = 6000, onStatus } = {}) {
    if (!worker) spawn();
    const id = ++seq;
    return new Promise((resolve, reject) => {
      const p = { resolve, reject, onStatus, timer: null };
      p.arm = () => { clearTimeout(p.timer); p.timer = setTimeout(() => { pending.delete(id); kill(); resolve({ timeout: true }); }, timeout); };
      pending.set(id, p);
      worker.postMessage(Object.assign({ id }, msg));
    });
  }

  window.JSRunner = {
    get state() { return state; },
    onState(fn) { listeners.add(fn); fn(state); },
    warmup() { return call({ type: "warmup" }); },
    run(code, stdin, opts) { return call({ type: "run", code, stdin }, opts); },
    test(code, tests, opts) { return call({ type: "test", code, tests }, Object.assign({ timeout: 10000 }, opts)); },
    trace(code, stdin, opts) { return call({ type: "trace", code, stdin }, opts); },
  };
})();
