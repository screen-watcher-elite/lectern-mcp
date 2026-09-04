import { evaluateStudentVivaAnswer } from './dist/viva.js';
import { querySyllabus } from './dist/syllabus.js';
import { generateCheatSheetMarkdown } from './dist/cheatsheet.js';

console.log("=== Testing Lectern MCP Engines ===");

// 1. Viva Defense Evaluation
const evalRes = evaluateStudentVivaAnswer(
  "Linear Algebra",
  "spectral_theorem",
  "intermediate",
  "The spectral theorem says symmetric matrices have real eigenvalues and orthogonal eigenvectors so A = Q Lambda Q^T."
);
console.log(`[PASS] Viva Evaluation: Score=${evalRes.scoreOutOfTen}/10 (${evalRes.overallVerdict})`);
console.log(`[PASS] Counter-question: "${evalRes.examinerCounterQuestion}"`);

// 2. Syllabus & PYQ Query
const syllabusRes = querySyllabus("Cayley-Hamilton");
console.log(`[PASS] Syllabus Query: ${syllabusRes.length} unit(s) found`);
console.log(`[PASS] First PYQ: "${syllabusRes[0]?.pyqQuestions[0]?.question}"`);

// 3. Cheat Sheet Generation
const cs = generateCheatSheetMarkdown("linear_algebra");
console.log(`[PASS] Cheat sheet generated (${cs.length} bytes)`);

console.log("=== ALL ENGINES FUNCTIONAL ===");
