/**
 * Local Lecture Notes Indexer & Search Engine
 * Traverses course directories, parses markdown & LaTeX notes,
 * and extracts mathematical definitions, theorems, and key references.
 */

import fs from "node:fs";
import path from "node:path";

export interface NoteSnippet {
  filePath: string;
  fileName: string;
  heading: string;
  snippet: string;
  formulas: string[];
}

export function indexLocalNotes(dirPath: string, keyword?: string): NoteSnippet[] {
  const snippets: NoteSnippet[] = [];
  if (!fs.existsSync(dirPath)) {
    return snippets;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      snippets.push(...indexLocalNotes(fullPath, keyword));
    } else if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".txt") || entry.name.endsWith(".tex"))) {
      try {
        const content = fs.readFileSync(fullPath, "utf-8");
        const lines = content.split("\n");

        let currentHeading = "General Notes";
        const accumulatedLines: string[] = [];

        for (const line of lines) {
          if (line.startsWith("#") || line.startsWith("##") || line.startsWith("###")) {
            if (accumulatedLines.length > 0) {
              const text = accumulatedLines.join("\n");
              if (!keyword || text.toLowerCase().includes(keyword.toLowerCase())) {
                snippets.push({
                  filePath: fullPath,
                  fileName: entry.name,
                  heading: currentHeading,
                  snippet: text.slice(0, 300) + (text.length > 300 ? "..." : ""),
                  formulas: extractLatexFormulas(text)
                });
              }
              accumulatedLines.length = 0;
            }
            currentHeading = line.replace(/^[#\s]+/, "").trim();
          } else {
            accumulatedLines.push(line);
          }
        }

        if (accumulatedLines.length > 0) {
          const text = accumulatedLines.join("\n");
          if (!keyword || text.toLowerCase().includes(keyword.toLowerCase())) {
            snippets.push({
              filePath: fullPath,
              fileName: entry.name,
              heading: currentHeading,
              snippet: text.slice(0, 300) + (text.length > 300 ? "..." : ""),
              formulas: extractLatexFormulas(text)
            });
          }
        }
      } catch (err) {
        // Skip unreadable files
      }
    }
  }

  return snippets;
}

function extractLatexFormulas(text: string): string[] {
  const formulas: string[] = [];
  const mathRegex = /\$\$([\s\S]*?)\$\$|\$([^$\n]+)\$/g;
  let match: RegExpExecArray | null;

  while ((match = mathRegex.exec(text)) !== null) {
    const formula = match[1] || match[2];
    if (formula && formula.trim().length > 2) {
      formulas.push(formula.trim());
    }
    if (formulas.length >= 5) break;
  }

  return formulas;
}
