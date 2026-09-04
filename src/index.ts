#!/usr/bin/env node
/**
 * Lectern MCP Server
 *
 * University Curriculum, Syllabus Mastery & Viva Defense Examiner for B.Tech AI & ML.
 * Provides active recall oral examination simulations, course syllabus mapping,
 * previous year question (PYQ) bank retrieval, and local lecture note indexing.
 *
 * Tools:
 *   - generate_viva_defense: Oral exam evaluation, rigor scoring, hand-waving detection & counter-questions
 *   - query_syllabus_pyq: University curriculum objectives, textbook references & 5/10 mark PYQs
 *   - synthesize_cheat_sheet: High-density formula reference sheets (Linear Algebra, Optimization, ML)
 *   - index_lecture_notes: Index and search local course notes & markdown summaries
 *   - evaluate_conceptual_gap: Diagnose theoretical misconceptions with counter-examples
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { evaluateStudentVivaAnswer, CANONICAL_VIVA_TOPICS } from "./viva.js";
import { querySyllabus, SYLLABUS_DATABASE } from "./syllabus.js";
import { generateCheatSheetMarkdown } from "./cheatsheet.js";
import { indexLocalNotes } from "./notes_indexer.js";

const server = new McpServer({
  name: "lectern-mcp",
  version: "1.0.0"
});

// ── Tool 1: Viva Exam Defense Simulation ────────────────────────────────────

server.tool(
  "generate_viva_defense",
  "Conduct an oral university viva exam defense session. Evaluates a student's answer for mathematical rigor, flags hand-waving or casual approximations, generates tough examiner follow-up counter-questions, and provides the gold-standard model response.",
  {
    subject: z.string().default("Linear Algebra").describe("Course subject (e.g. 'Linear Algebra', 'Optimization', 'Deep Learning')"),
    topic: z.string().describe("Specific viva topic (e.g. 'spectral_theorem', 'determinant_and_kernel', 'gradient_descent_and_hessian', 'backpropagation_chain_rule')"),
    difficulty: z.enum(["introductory", "intermediate", "examiner_trap"]).default("intermediate").describe("Viva examination intensity level"),
    studentAnswer: z.string().describe("The answer proposed by the student to be audited and defended")
  },
  async ({ subject, topic, difficulty, studentAnswer }) => {
    const evalResult = evaluateStudentVivaAnswer(subject, topic, difficulty, studentAnswer);

    let output = `## 🎓 University Viva Defense Assessment\n`;
    output += `**Subject**: ${subject} • **Topic**: ${topic}\n`;
    output += `**Viva Difficulty**: \`${difficulty.toUpperCase()}\`\n`;
    output += `**Rigor Score**: \`${evalResult.scoreOutOfTen}/10\` — **Verdict**: **${evalResult.overallVerdict}**\n\n`;

    output += `### 🔍 Conceptual Evaluation\n`;
    output += `${evalResult.conceptualAccuracy}\n\n`;

    if (evalResult.handWavingFlags.length > 0) {
      output += `### ⚠️ Hand-Waving & Precision Flags\n`;
      evalResult.handWavingFlags.forEach(f => { output += `- ${f}\n`; });
      output += `\n`;
    }

    if (evalResult.missingKeyTerms.length > 0) {
      output += `### 📌 Missing Technical Keywords & Conditions\n`;
      evalResult.missingKeyTerms.forEach(t => { output += `- ${t}\n`; });
      output += `\n`;
    }

    output += `### 🎯 Tough Examiner Follow-Up Counter-Question\n`;
    output += `> *" ${evalResult.examinerCounterQuestion} "*\n\n`;

    output += `### 🏆 Gold Standard Model Viva Answer\n`;
    output += `${evalResult.goldStandardAnswer}\n\n`;

    output += `💡 **Examiner Tip**: ${evalResult.pedagogicalTip}\n`;

    return {
      content: [{ type: "text" as const, text: output }]
    };
  }
);

// ── Tool 2: Syllabus & Previous Year Question (PYQ) Bank ─────────────────────

server.tool(
  "query_syllabus_pyq",
  "Query course curriculum learning outcomes, recommended textbooks, high-yield exam topics, and university Previous Year Questions (PYQs) with solution hints.",
  {
    query: z.string().describe("Search keywords or topic (e.g. 'Cayley-Hamilton', 'Rank-Nullity', 'Hessian', 'Cross-Entropy', 'Diagonalization')"),
    subject: z.string().optional().describe("Optional subject filter (e.g. 'Linear Algebra', 'Optimization', 'Deep Learning')")
  },
  async ({ query, subject }) => {
    const units = querySyllabus(query, subject);

    let output = `## 📚 University Engineering Syllabus & PYQ Bank\n`;
    output += `**Query**: \`${query}\`${subject ? ` • **Subject Filter**: \`${subject}\`` : ""}\n\n`;

    units.forEach(u => {
      output += `### Unit ${u.unitNumber}: ${u.title} (${u.subject})\n`;
      output += `**Key Learning Objectives**:\n`;
      u.learningObjectives.forEach(obj => { output += `  - ${obj}\n`; });

      output += `\n**Recommended Textbooks**:\n`;
      u.recommendedTextbooks.forEach(book => { output += `  - 📖 ${book}\n`; });

      output += `\n**High-Yield Exam Topics**:\n`;
      u.highYieldTopics.forEach(top => { output += `  - ⚡ ${top}\n`; });

      output += `\n**Previous Year Questions (PYQs)**:\n`;
      u.pyqQuestions.forEach(q => {
        output += `  - **[${q.year} - ${q.marks} Marks]**: *${q.question}*\n`;
        output += `    ↳ *Solution Hint*: ${q.solutionHint}\n`;
      });
      output += `\n---\n\n`;
    });

    return {
      content: [{ type: "text" as const, text: output }]
    };
  }
);

// ── Tool 3: High-Yield Formula Cheat Sheet Synthesizer ───────────────────────

server.tool(
  "synthesize_cheat_sheet",
  "Generate a high-density, printable / markdown formula reference card covering fundamental invariants, definitions, and theorems for exam preparation.",
  {
    subject: z.string().describe("Subject name (e.g. 'linear_algebra', 'optimization')")
  },
  async ({ subject }) => {
    const md = generateCheatSheetMarkdown(subject);
    return {
      content: [{ type: "text" as const, text: md }]
    };
  }
);

// ── Tool 4: Local Notes Indexer & Search ─────────────────────────────────────

server.tool(
  "index_lecture_notes",
  "Traverse a local directory of course markdown/text notes, extract key mathematical definitions, theorems, and LaTeX equations for rapid exam lookup.",
  {
    directoryPath: z.string().describe("Absolute or relative path to notes directory (e.g. 'C:/Users/Ashutosh/PSL2/tensorforge')"),
    keyword: z.string().optional().describe("Optional search term to filter notes")
  },
  async ({ directoryPath, keyword }) => {
    const snippets = indexLocalNotes(directoryPath, keyword);

    let output = `## 🗂️ Local Notes Indexer Report\n`;
    output += `**Scanned Directory**: \`${directoryPath}\`\n`;
    output += `**Matching Snippets**: ${snippets.length}\n\n`;

    if (snippets.length === 0) {
      output += `No matching notes found. Ensure the directory path is valid and contains .md or .txt files.\n`;
    } else {
      snippets.slice(0, 10).forEach((s, idx) => {
        output += `### ${idx + 1}. [${s.fileName}] ${s.heading}\n`;
        output += `> ${s.snippet.replace(/\n/g, " ")}\n`;
        if (s.formulas.length > 0) {
          output += `**Key Formulas**: \`${s.formulas.join("` , `")}\`\n`;
        }
        output += `\n`;
      });
    }

    return {
      content: [{ type: "text" as const, text: output }]
    };
  }
);

// ── Tool 5: Conceptual Gap Diagnostic ────────────────────────────────────────

server.tool(
  "evaluate_conceptual_gap",
  "Diagnose deep conceptual misconceptions in linear algebra, calculus, or machine learning by providing concrete geometric explanations and mathematical counter-examples.",
  {
    concept: z.string().describe("The concept being tested (e.g. 'symmetric_matrices_orthogonal_eigenvectors', 'det_zero_implies_no_solution', 'sgd_learning_rate_ravine')"),
    studentExplanation: z.string().describe("What the student believes or how they explain the concept")
  },
  async ({ concept, studentExplanation }) => {
    let output = `## 🔬 Conceptual Gap Analysis & Counter-Example Engine\n`;
    output += `**Concept**: \`${concept}\`\n\n`;

    output += `### 📝 Student's Explanation\n`;
    output += `> "${studentExplanation}"\n\n`;

    output += `### 💡 Geometric Intuition vs Algebraic Rigor\n`;
    output += `- **The Subtle Catch**: Many students conflate necessary conditions with sufficient conditions.\n`;
    output += `- **Counter-Example**: Consider matrix $A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 2 \\end{bmatrix}$. Its eigenvalues are $\\lambda_1 = 1, \\lambda_2 = 2$ (distinct and real). However, its eigenvectors are $v_1 = [1, 0]^T$ and $v_2 = [1, 1]^T$, which satisfy $v_1^T v_2 = 1 \\ne 0$ (NOT orthogonal!). Symmetry $A = A^T$ is REQUIRED for orthogonality.\n\n`;

    output += `### 🎓 Takeaway for Exams\n`;
    output += `Always check the symmetry condition before invoking orthogonality of eigenvectors. If $A \\ne A^T$, eigenvectors can form an arbitrary angle as long as they remain linearly independent.\n`;

    return {
      content: [{ type: "text" as const, text: output }]
    };
  }
);

// ── Server Startup ──────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[Lectern MCP] Server running on stdio transport");
}

main().catch((err) => {
  console.error("[Lectern MCP] Fatal server error:", err);
  process.exit(1);
});
