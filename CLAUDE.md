# Lectern MCP — Project Guidelines for Claude Code

> Architectural conventions, curriculum standards, and viva examination guidelines for Claude Code when maintaining or extending **Lectern MCP**.

---

## 🧭 Project Mission & Overview

**Lectern MCP** is an active-recall university viva defense simulator, course syllabus mapper, and previous year question (PYQ) bank engine for Claude Code and Antigravity. Built for undergraduate engineering students in Artificial Intelligence & Machine Learning (Walchand College of Engineering).

It equips Claude Code with tools to:
1. Conduct oral viva defense sessions with rigor scoring, hand-waving detection, and drill-down counter-questions (`generate_viva_defense`).
2. Query syllabus learning objectives, textbook references, and 5/10-mark PYQs (`query_syllabus_pyq`).
3. Synthesize high-density formula reference sheets across Linear Algebra and Optimization (`synthesize_cheat_sheet`).
4. Traverse and index local course notes (`index_lecture_notes`).
5. Diagnose conceptual misconceptions with concrete geometric explanations and counter-examples (`evaluate_conceptual_gap`).

---

## 🏗️ Architecture & File Structure

```
lectern-mcp/
├── CLAUDE.md             # Project guidelines and memory for Claude Code
├── .claude/              # Claude Code project settings and memory
│   ├── settings.json     # Permitted tools and environment settings
│   └── project_context.md# High-level architecture memory & syllabus notes
├── src/
│   ├── index.ts          # McpServer initialization & tool handlers (Stdio transport)
│   ├── viva.ts           # Viva evaluation engine, hand-waving detector & counter-questions
│   ├── syllabus.ts       # Engineering syllabus database & PYQ bank
│   ├── cheatsheet.ts     # Formula cheat sheet synthesis
│   └── notes_indexer.ts  # Local markdown/LaTeX course note parser
├── dist/                 # Compiled JavaScript output
├── test-run.js           # Verification test suite
├── package.json          # Dependencies & build scripts
├── tsconfig.json         # NodeNext TypeScript configuration
└── README.md             # Public documentation & tool catalog
```

---

## 🎓 Academic Rigor & Viva Guidelines

1. **Precision Over Generalities**: When auditing student viva responses, never accept hand-wavy phrasing (e.g. 'it just scales space'). Demand explicit conditions (e.g. 'for real symmetric matrices', 'when the kernel has dimension $\ge 1$').
2. **Pedagogical Counter-Questions**: A good viva examiner probes the boundary conditions where the student's intuition breaks down. Always provide at least one challenging follow-up question.
3. **Curriculum Alignment**: Maintain alignment with standard engineering syllabi (Gilbert Strang for Linear Algebra, Boyd for Convex Optimization, Goodfellow/Bishop for Machine Learning).
