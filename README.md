# Lectern MCP Server 🎓📖

[![MCP](https://img.shields.io/badge/MCP-Standard-blue.svg)](https://modelcontextprotocol.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Apache_2.0-green.svg)](LICENSE)

An active-recall university viva defense simulator, course syllabus mapper, and previous year question (PYQ) bank engine for Claude Code and Antigravity. Built for undergraduate engineering students in Artificial Intelligence & Machine Learning.

---

## ✨ Capabilities & Tool Catalog

### 1. `generate_viva_defense`
Simulates realistic university oral examination defense sessions:
- Assesses student answers for mathematical rigor (1-10 scoring).
- Flags hand-waving and casual/imprecise approximations.
- Identifies missing technical terms and boundary hypotheses.
- Generates tough follow-up counter-questions examiners ask during oral presentations.
- Provides the gold-standard model response.

### 2. `query_syllabus_pyq`
Retrieves university course unit objectives, recurring Previous Year Questions (PYQs), textbook references (Gilbert Strang, Hoffman-Kunze, Sheldon Axler, Stephen Boyd, Ian Goodfellow), and solution hints.

### 3. `synthesize_cheat_sheet`
Generates high-density, printable / markdown formula reference cards covering fundamental invariants, definitions, and theorems across Linear Algebra and Optimization.

### 4. `index_lecture_notes`
Traverses local directories of study notes (`.md`, `.txt`, `.tex`), extracts mathematical definitions, theorems, and LaTeX formulas for instant keyword retrieval.

### 5. `evaluate_conceptual_gap`
Diagnoses theoretical misconceptions with concrete geometric explanations and mathematical counter-examples (e.g. why distinct real eigenvalues do not guarantee orthogonal eigenvectors unless the matrix is symmetric).

---

## 🚀 Quickstart & Installation

```bash
# Clone or navigate to the repository
cd lectern-mcp

# Install dependencies
npm install

# Build TypeScript
npm run build
```

### Configure with Claude Code / Antigravity MCP

Add to your `mcp_config.json` (or `.agents/mcp_config.json`):

```json
{
  "mcpServers": {
    "lectern": {
      "command": "node",
      "args": ["C:/(your-selected-folder)/browser-vision-mcp/dist/index.js"]
    }
  }
}
```

---

## 👨‍💻 Author
**Ashutosh** ([@screen-watcher-elite](https://github.com/screen-watcher-elite))  
Walchand College of Engineering (WCE), Sangli • B.Tech AI & Machine Learning
