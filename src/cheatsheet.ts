/**
 * Academic Formula Cheat Sheet Synthesizer
 * Formats high-density, exam-ready formula reference sheets in Markdown or LaTeX.
 */

export interface CheatSheetSection {
  title: string;
  items: { concept: string; formula: string; note: string }[];
}

export const CANONICAL_CHEATSHEETS: Record<string, CheatSheetSection[]> = {
  linear_algebra: [
    {
      title: "Fundamental Matrix Invariants",
      items: [
        { concept: "Trace", formula: "tr(A) = \\sum_{i=1}^n a_{ii} = \\sum_{i=1}^n \\lambda_i", note: "Sum of diagonal elements equals sum of eigenvalues. Invariant under similarity A = P B P⁻¹." },
        { concept: "Determinant", formula: "\\det(A) = \\prod_{i=1}^n \\lambda_i", note: "Product of all eigenvalues. Signed volume scaling factor. det(AB) = det(A)det(B)." },
        { concept: "Characteristic Eq.", formula: "\\det(A - \\lambda I) = 0", note: "For 2x2: \\lambda^2 - tr(A)\\lambda + det(A) = 0. Discriminant \\Delta = tr^2 - 4det." },
        { concept: "Invertibility", formula: "A^{-1} \\text{ exists} \\iff \\det(A) \\ne 0 \\iff \\text{rank}(A) = n", note: "Non-singular matrix with trivial kernel Null(A) = {0}." }
      ]
    },
    {
      title: "Subspaces & Orthogonality",
      items: [
        { concept: "Rank-Nullity", formula: "\\text{rank}(A) + \\text{nullity}(A) = n", note: "dim(Col A) + dim(Null A) = total number of columns." },
        { concept: "Dot Product", formula: "u \\cdot v = u^T v = \\|u\\| \\|v\\| \\cos \\theta", note: "u \\perp v \\iff u^T v = 0. Cauchy-Schwarz: |u^T v| \\le \\|u\\| \\|v\\|." },
        { concept: "Projection", formula: "\\text{proj}_u(v) = \\frac{u^T v}{\\|u\\|^2} u", note: "Decomposes v = v_{\\parallel} + v_{\\perp} where v_{\\perp} = v - \\text{proj}_u(v)." },
        { concept: "Gram-Schmidt", formula: "u_k = v_k - \\sum_{j=1}^{k-1} \\frac{u_j^T v_k}{u_j^T u_j} u_j", note: "Constructs pairwise orthonormal basis e_k = u_k / \\|u_k\\|. Basis for QR decomposition." }
      ]
    },
    {
      title: "Matrix Decompositions",
      items: [
        { concept: "Diagonalization", formula: "A = P D P^{-1}", note: "Columns of P are linearly independent eigenvectors; D = diag(\\lambda_1, \\dots, \\lambda_n)." },
        { concept: "Spectral Theorem", formula: "A = Q \\Lambda Q^T \\; (A = A^T)", note: "Real symmetric matrices have real eigenvalues and orthonormal eigenvectors (Q^T Q = I)." },
        { concept: "SVD", formula: "A = U \\Sigma V^T", note: "Exists for ANY m x n matrix. \\sigma_i = \\sqrt{\\lambda_i(A^T A)}. Unit sphere maps to ellipse." },
        { concept: "Cayley-Hamilton", formula: "p(A) = 0", note: "Every square matrix satisfies its own characteristic equation. Useful for computing A⁻¹ and Aᵏ." }
      ]
    }
  ],

  optimization: [
    {
      title: "Multivariate Calculus & Curvature",
      items: [
        { concept: "Gradient", formula: "\\nabla f(x) = \\left[ \\frac{\\partial f}{\\partial x_1}, \\dots, \\frac{\\partial f}{\\partial x_d} \\right]^T", note: "Points in direction of steepest ascent. Orthogonal to level curves / surfaces." },
        { concept: "Hessian Matrix", formula: "H_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j} \\in \\mathbb{R}^{d \\times d}", note: "Symmetric matrix of second derivatives. Eigenvalues represent principal curvatures." },
        { concept: "Critical Points", formula: "\\nabla f(x^*) = 0", note: "Local Min: H ≻ 0 (all \\lambda_i > 0). Local Max: H ≺ 0 (all \\lambda_i < 0). Saddle: H indefinite." },
        { concept: "Condition Number", formula: "\\kappa = \\frac{\\lambda_{\\max}}{\\lambda_{\\min}}", note: "Measures ravine anisotropy. High \\kappa creates severe gradient descent oscillations." }
      ]
    },
    {
      title: "First-Order Optimization Algorithms",
      items: [
        { concept: "Standard SGD", formula: "x_{t+1} = x_t - \\alpha \\nabla f(x_t)", note: "Step size bounded by \\alpha < 2 / \\lambda_{\\max} for convergence on quadratics." },
        { concept: "Polyak Momentum", formula: "v_t = \\beta v_{t-1} + \\alpha \\nabla f(x_t), \\quad x_{t+1} = x_t - v_t", note: "Dampens high-frequency transverse oscillations and accelerates along flat ravines." },
        { concept: "Adam", formula: "m_t = \\beta_1 m_{t-1} + (1-\\beta_1)g, \\quad v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g^2", note: "Bias-corrected first moment (velocity) and second moment (per-parameter adaptive scale)." }
      ]
    }
  ]
};

export function generateCheatSheetMarkdown(subject: string): string {
  const normalized = subject.toLowerCase().replace(/[-\s]/g, "_");
  const sections = CANONICAL_CHEATSHEETS[normalized] || CANONICAL_CHEATSHEETS["linear_algebra"];

  let md = `# 🎓 Academic Cheat Sheet: ${subject.toUpperCase()}\n`;
  md += `> High-yield formula sheet & exam invariants for FY B.Tech AI & ML.\n\n`;

  sections.forEach(sec => {
    md += `## 📌 ${sec.title}\n\n`;
    md += `| Concept | Formula | Key Exam Note |\n`;
    md += `|---|---|---|\n`;
    sec.items.forEach(item => {
      md += `| **${item.concept}** | \`$${item.formula}$\` | ${item.note} |\n`;
    });
    md += `\n`;
  });

  return md;
}
