/**
 * University Engineering Curriculum & Previous Year Questions (PYQ) Database
 * Covers B.Tech AI & ML First-Year / Core Coursework:
 * - Linear Algebra & Vector Spaces
 * - Multivariable Calculus & Optimization
 * - Foundations of Machine Learning & Deep Learning
 * - Data Structures & Algorithmic Complexity
 */

export interface SyllabusUnit {
  unitId: string;
  subject: string;
  unitNumber: number;
  title: string;
  learningObjectives: string[];
  recommendedTextbooks: string[];
  highYieldTopics: string[];
  pyqQuestions: {
    marks: 4 | 5 | 8 | 10;
    year: string;
    question: string;
    solutionHint: string;
  }[];
}

export const SYLLABUS_DATABASE: Record<string, SyllabusUnit> = {
  matrices_and_systems: {
    unitId: "matrices_and_systems",
    subject: "Linear Algebra",
    unitNumber: 1,
    title: "Matrices, Linear Transformations & Systems of Equations",
    learningObjectives: [
      "Understand elementary row operations and Gaussian elimination",
      "Compute row reduced echelon form (RREF) and determine system consistency",
      "Determine matrix rank, nullity, and basis for column and null spaces",
      "Represent linear maps geometrically in ℝ² and ℝ³"
    ],
    recommendedTextbooks: [
      "Gilbert Strang, 'Introduction to Linear Algebra', 5th Ed.",
      "Hoffman & Kunze, 'Linear Algebra', PHI Learning",
      "Sheldon Axler, 'Linear Algebra Done Right', Springer"
    ],
    highYieldTopics: [
      "Rank-Nullity Theorem: dim(Col A) + dim(Null A) = n",
      "System consistency test via augmented matrix [A | b]",
      "Invertibility criteria: det(A) ≠ 0, full rank, trivial nullspace",
      "LU Decomposition and Gaussian elimination complexity O(n³)"
    ],
    pyqQuestions: [
      {
        marks: 5,
        year: "WCE-2023",
        question: "State and prove the Rank-Nullity Theorem for a linear transformation T: V -> W where dim(V) = n.",
        solutionHint: "Construct basis for Null(T) with dimension k, extend to basis of V with (n - k) vectors, show their images form a basis for Range(T)."
      },
      {
        marks: 8,
        year: "WCE-2024",
        question: "Investigate for what values of λ and μ the system x + y + z = 6, x + 2y + 3z = 10, x + 2y + λz = μ has: (i) no solution, (ii) unique solution, (iii) infinite solutions.",
        solutionHint: "Row reduce augmented matrix to upper triangular form; evaluate det and consistency when λ = 3 and μ = 10."
      }
    ]
  },

  eigenvalues_and_diagonalization: {
    unitId: "eigenvalues_and_diagonalization",
    subject: "Linear Algebra",
    unitNumber: 2,
    title: "Eigensystems, Diagonalization & Cayley-Hamilton Theorem",
    learningObjectives: [
      "Solve the characteristic equation det(A - λI) = 0 for eigenvalues and eigenvectors",
      "Distinguish algebraic multiplicity (AM) vs geometric multiplicity (GM)",
      "Verify matrix diagonalizability (A = PDP⁻¹) and defective matrices",
      "Apply Cayley-Hamilton theorem to evaluate high matrix powers and inverses"
    ],
    recommendedTextbooks: [
      "Gilbert Strang, 'Linear Algebra and Its Applications'",
      "Erwin Kreyszig, 'Advanced Engineering Mathematics', Wiley"
    ],
    highYieldTopics: [
      "Characteristic polynomial: λ² - tr(A)λ + det(A) = 0 for 2x2",
      "Diagonalizability condition: AM = GM for all eigenvalues",
      "Cayley-Hamilton Theorem: p(A) = 0 and computation of A⁻¹",
      "Spectral Theorem: Symmetric A has real eigenvalues and orthogonal eigenvectors"
    ],
    pyqQuestions: [
      {
        marks: 5,
        year: "WCE-2022",
        question: "State Cayley-Hamilton Theorem and use it to find A⁻¹ for matrix A = [[2, 1], [1, 2]].",
        solutionHint: "Find characteristic equation λ² - 4λ + 3 = 0, substitute A: A² - 4A + 3I = 0, multiply by A⁻¹ to get A⁻¹ = (4I - A)/3."
      },
      {
        marks: 10,
        year: "WCE-2024",
        question: "Diagonalize matrix A = [[1, 6, 1], [1, 2, 0], [0, 0, 3]]. Hence compute A⁸.",
        solutionHint: "Find eigenvalues λ = 3, 4, -1. Compute corresponding eigenvectors to form modal matrix P; then A⁸ = P D⁸ P⁻¹."
      }
    ]
  },

  optimization_and_gradients: {
    unitId: "optimization_and_gradients",
    subject: "Optimization & Machine Learning",
    unitNumber: 3,
    title: "Multivariate Optimization, Hessians & Gradient Methods",
    learningObjectives: [
      "Compute gradients and Hessian curvature matrices for multivariate loss functions",
      "Classify critical points (local minimum, maximum, saddle point) using eigenvalues of Hessian",
      "Understand first-order vs second-order optimization methods (SGD, Momentum, RMSprop, Adam, Newton-Raphson)",
      "Analyze condition number κ and convergence rates on ill-conditioned ravines"
    ],
    recommendedTextbooks: [
      "Stephen Boyd, Lieven Vandenberghe, 'Convex Optimization', Cambridge University Press",
      "Ian Goodfellow, Yoshua Bengio, 'Deep Learning', MIT Press",
      "Jorge Nocedal, Stephen Wright, 'Numerical Optimization', Springer"
    ],
    highYieldTopics: [
      "First-order KKT necessary optimality condition: ∇f(x*) = 0",
      "Second-order sufficiency condition: ∇²f(x*) ≻ 0 (Positive Definite)",
      "Saddle points: Hessian with indefinite spectrum (λ₁ > 0, λ₂ < 0)",
      "Condition number κ = λ_max / λ_min and zig-zagging in ill-conditioned ravines",
      "Adam optimizer update formulas: m_t / (1 - β₁ᵗ) and v_t / (1 - β₂ᵗ)"
    ],
    pyqQuestions: [
      {
        marks: 5,
        year: "WCE-2023",
        question: "Derive the gradient and Hessian matrix for the bivariate function f(x, y) = x³ - 3x + y² - 4y. Classify all critical points.",
        solutionHint: "∇f = [3x² - 3, 2y - 4]^T = [0, 0] gives points (1, 2) and (-1, 2). Hessian is [[6x, 0], [0, 2]]. Check det and eigenvalues: (1, 2) is local min; (-1, 2) is saddle."
      },
      {
        marks: 8,
        year: "WCE-2024",
        question: "Explain the convergence pathology of standard Gradient Descent on ill-conditioned quadratic surfaces. How does Polyak Momentum alleviate oscillation?",
        solutionHint: "Show that step size is bounded by 2/λ_max, making progress along λ_min direction slow. Explain velocity accumulation along consistent gradients and cancellation along oscillating gradients."
      }
    ]
  },

  autodiff_and_backprop: {
    unitId: "autodiff_and_backprop",
    subject: "Deep Learning Foundations",
    unitNumber: 4,
    title: "Computational Graphs & Reverse-Mode Automatic Differentiation",
    learningObjectives: [
      "Trace computation as a Directed Acyclic Graph (DAG)",
      "Differentiate between Numerical, Symbolic, and Automatic Differentiation",
      "Derive reverse-mode backpropagation for standard neural network layers (Dense, Softmax, MSE)",
      "Analyze vector-Jacobian products (VJPs) and memory complexity"
    ],
    recommendedTextbooks: [
      "Ian Goodfellow, 'Deep Learning', MIT Press (Chapter 6: Deep Feedforward Networks)",
      "Christopher Bishop, 'Pattern Recognition and Machine Learning', Springer"
    ],
    highYieldTopics: [
      "Chain rule in reverse topological order: ∂L/∂x = J^T (∂L/∂y)",
      "Dense Layer gradients: ∂L/∂W = δ x^T, ∂L/∂x = W^T δ",
      "Softmax + Cross-Entropy unified gradient: ∇_z L = p - y",
      "Time complexity O(N) backward pass vs O(P·N) forward-mode autodiff"
    ],
    pyqQuestions: [
      {
        marks: 10,
        year: "WCE-2024",
        question: "Derive the gradient of the Cross-Entropy loss with respect to input logits z for a multi-class softmax classifier. Explain why this simplification is numerically elegant.",
        solutionHint: "Express loss L = -∑ y_k ln(p_k). Differentiate wrt z_i using Kronecker delta ∂p_k/∂z_i = p_k(δ_ki - p_i). Sum over k with ∑ y_k = 1 to obtain ∂L/∂z_i = p_i - y_i."
      }
    ]
  }
};

export function querySyllabus(query: string, subjectFilter?: string): SyllabusUnit[] {
  const q = query.toLowerCase().trim();
  const results: SyllabusUnit[] = [];

  for (const unit of Object.values(SYLLABUS_DATABASE)) {
    if (subjectFilter && !unit.subject.toLowerCase().includes(subjectFilter.toLowerCase())) {
      continue;
    }

    const matchesTitle = unit.title.toLowerCase().includes(q);
    const matchesTopics = unit.highYieldTopics.some(t => t.toLowerCase().includes(q));
    const matchesPyq = unit.pyqQuestions.some(p => p.question.toLowerCase().includes(q) || p.solutionHint.toLowerCase().includes(q));

    if (!q || matchesTitle || matchesTopics || matchesPyq) {
      results.push(unit);
    }
  }

  return results.length > 0 ? results : Object.values(SYLLABUS_DATABASE);
}
