/* JS30 worker: runs student code away from the page, so a frozen program never freezes the lesson. */
importScripts("../assets/vendor/acorn/acorn.js", "engine.js");

self.onmessage = async (ev) => {
  const msg = ev.data;
  try {
    if (msg.type === "warmup") { self.postMessage({ id: msg.id, ok: true, result: "ready" }); return; }
    self.postMessage({ id: msg.id, status: "running" });
    let result;
    if (msg.type === "run") result = await JSEngine.execute(msg.code, { stdin: msg.stdin });
    else if (msg.type === "trace") result = await JSEngine.execute(msg.code, { stdin: msg.stdin, mode: "trace" });
    else if (msg.type === "test") result = await JSEngine.test(msg.code, msg.tests || []);
    self.postMessage({ id: msg.id, ok: true, result });
  } catch (e) {
    self.postMessage({ id: msg.id, ok: false, fatal: String(e && e.message ? e.message : e) });
  }
};
