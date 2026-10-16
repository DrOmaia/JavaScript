# JS30 — Learn JavaScript in 30 Days

[![Open the course](https://img.shields.io/badge/Open%20the%20course-dromaia.github.io%2FJavaScript-F2D21B?style=for-the-badge)](https://dromaia.github.io/JavaScript/)

**A free, 30-day JavaScript course for beginners that runs entirely in the browser.** No installation, no account:
open the link and write real JavaScript on Day 1. By Day 30 you build your own interactive web app.

👉 **Start here: <https://dromaia.github.io/JavaScript/>**

---

## What you get every day

- A short explanation with runnable examples and a **live code editor**
- A step-by-step **visualizer** that shows each variable in its box as the code runs
- Quick checks and **"Your turn"** questions (type the answer, then check or reveal)
- Guided practice: predict the output, put the lines in order, break things on purpose
- **Auto-checked problems** (🌱 ⭐ 🔥) with several model solutions
- A quiz, a puzzle, spaced-repetition review cards and a place for your notes
- **Points, levels and badges** to keep you going

Plus a free **playground** (JavaScript or a full web page), a **glossary**, printable **weekly cheat sheets**,
and a personal **certificate** after Day 30.

## The 30-day plan

| Week | Theme | Topics |
| --- | --- | --- |
| 1 | First steps | `console.log`, variables and naming rules, data types, numbers and operators, `++`/`--`, strings and template literals |
| 2 | Decisions and loops | comparisons and logic, `if`/`else`, `switch`, `while`, `for`, a number guessing game |
| 3 | Functions, arrays and objects | functions, arrow functions and scope, arrays, `map`/`filter`/`find`, objects, a grades manager |
| 4 | JavaScript and HTML | HTML and `<script>`, the DOM, events, inputs and forms, creating elements and timers, a quiz page |
| Days 29–30 | Capstone | a calculator, a quiz game or a to-do list web app — then the certificate |

Suggested pace: about an hour a day — five lesson days, one review-and-project day and one rest day each week.
Weeks 1 and 4 follow the school chapter *Introduction to Web Programming with HTML & JavaScript*; the rest goes further.

## How it works

- Student code runs in a Web Worker (console programs) or a sandboxed preview frame (web pages). Infinite loops are
  stopped automatically, and errors are explained in plain English.
- Progress, code and notes are saved in the student's own browser. Nothing is sent to a server.
- The whole site is static HTML, CSS and JavaScript, published with GitHub Pages.

## For developers

```bash
node tools/check-lessons.js        # runs every example, answer key and solution of the 30 days
pip install playwright && python3 tools/smoke.py   # opens every page in Chromium, tests web exercises
```

How lessons are written: [`docs/lesson-style.md`](docs/lesson-style.md).

---

Created by [Dr. Omaia Al-Omari](https://dromaia.github.io/). Libraries: CodeMirror 5 and Acorn (MIT).
