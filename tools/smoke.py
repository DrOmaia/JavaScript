"""JS30 browser smoke test (developer tool).
Usage: python3 tools/smoke.py [day ...]   (needs: pip install playwright; Chromium)
For every day page: fails on page errors and sideways scrolling (1280 px and 390 px wide),
tries a quick check and a worked example, and runs every solution of every web exercise
through the page's own test runner (JSWeb.runTests). Saves a few screenshots in tools/shots/."""
import functools, http.server, json, os, sys, threading
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "tools", "shots")
os.makedirs(OUT, exist_ok=True)
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Quiet, directory=ROOT))
threading.Thread(target=srv.serve_forever, daemon=True).start()
BASE = f"http://127.0.0.1:{srv.server_port}"
DAYS = [int(a) for a in sys.argv[1:]] or list(range(1, 31))
STATE = json.dumps({"profile": {"name": "Sara", "avatar": "🦊"}})
SHOTS = {1, 9, 18, 22, 24, 29}
fails = []
exe = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=exe if os.path.exists(exe) else None)
    for w in (1280, 390):
        ctx = b.new_context(viewport={"width": w, "height": 900})
        ctx.add_init_script(f"if (window === window.top) localStorage.setItem('js30.v1', {json.dumps(STATE)})")
        ctx.route("**/upload.wikimedia.org/**", lambda r: r.abort())
        for d in DAYS:
            pg = ctx.new_page()
            errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            pg.goto(f"{BASE}/lesson.html?day={d}")
            try:
                pg.wait_for_selector("#learn", timeout=10000)
            except Exception:
                fails.append(f"day {d} @{w}: lesson did not render {errs[:2]}"); pg.close(); continue
            n = {k: pg.locator(s).count() for k, s in [("check", ".callout.check"), ("turn", ".callout.turn"), ("steps", ".callout.worked"), ("web", ".webbox"), ("ex", ".exercise")]}
            if w == 1280:
                if n["steps"]:
                    wk = pg.locator(".callout.worked").first
                    wk.locator("[data-w=all]").click()
                    if wk.locator(".wsteps li").count() < 2: fails.append(f"day {d}: worked example did not reveal")
                if n["check"]:
                    ck = pg.locator(".callout.check").first
                    ck.locator(".opt").first.click()
                    if not ck.locator(".explain").inner_text().strip(): fails.append(f"day {d}: check gave no feedback")
                # web exercises: run every solution through the real test runner
                res = pg.evaluate("""async (d) => {
                  const D = DAYS[d], out = [];
                  for (const ex of (D.exercises || []).filter(e => e.web)) {
                    for (const s of ex.solutions || []) {
                      const r = await JSWeb.runTests(JS30.T(s.code), ex.tests);
                      r.forEach((x, k) => { const want = JS30.T(ex.tests[k].expected);
                        if (x.error || JSErrors.norm(x.got) !== JSErrors.norm(want)) out.push(`exercise ${ex.id} solution "${s.name}" test ${k + 1}: ` + (x.error ? x.error.type + ': ' + x.error.msg : 'expected ' + JSON.stringify(want) + ' got ' + JSON.stringify(x.got))); });
                    }
                  }
                  return out;
                }""", d)
                fails.extend(f"day {d}: {r}" for r in res)
            pg.wait_for_timeout(300)
            sw = pg.evaluate("document.documentElement.scrollWidth")
            if sw > w + 1: fails.append(f"day {d} @{w}: page scrolls sideways ({sw}px)")
            if errs: fails.append(f"day {d} @{w}: page errors {errs[:2]}")
            if w == 1280: print(f"day {d:2}: " + "  ".join(f"{k} {v}" for k, v in n.items()))
            if d in SHOTS:
                pg.screenshot(path=os.path.join(OUT, f"day{d:02}_{w}.png"))
                if n["web"]:
                    pg.locator(".webbox:visible").first.scroll_into_view_if_needed(); pg.wait_for_timeout(500)
                    pg.screenshot(path=os.path.join(OUT, f"day{d:02}_{w}_web.png"))
            pg.close()
        for page in ["index.html", "playground.html", "review.html", "glossary.html", "cheatsheet.html?week=1", "notes.html", "setup.html", "certificate.html"]:
            pg = ctx.new_page(); errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            pg.goto(f"{BASE}/{page}"); pg.wait_for_timeout(500)
            sw = pg.evaluate("document.documentElement.scrollWidth")
            if sw > w + 1: fails.append(f"{page} @{w}: page scrolls sideways ({sw}px)")
            if errs: fails.append(f"{page} @{w}: page errors {errs[:2]}")
            if page in ("index.html", "playground.html"): pg.screenshot(path=os.path.join(OUT, f"{page.split('.')[0]}_{w}.png"))
            pg.close()
        ctx.close()
    b.close()
print("\n".join(fails) or "Smoke test: all good.")
sys.exit(1 if fails else 0)
