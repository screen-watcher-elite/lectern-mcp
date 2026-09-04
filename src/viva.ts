/**
 * Viva Examiner & Defense Simulation Engine
 * Evaluates student answers with academic rigor, flags hand-waving,
 * generates tough examiner counter-questions, and provides gold-standard model answers.
 */

export interface VivaScenario {
  id: string;
  subject: string;
  topic: string;
  initialQuestion: string;
  expectedConcepts: string[];
  commonMistakes: string[];
  followUpCounterQuestions: string[];
  goldStandardAnswer: string;
}

export interface VivaEvaluation {
  scoreOutOfTen: number;
  overallVerdict: "Distinction / Master" | "Proficient Pass" | "Needs Rigor" | "Flawed / Misconception";
  conceptualAccuracy: string;
  missingKeyTerms: string[];
  handWavingFlags: string[];
  examinerCounterQuestion: string;
  goldStandardAnswer: string;
  pedagogicalTip: string;
}

export const CANONICAL_VIVA_TOPICS: Record<string, VivaScenario> = {
  spectral_theorem: {
    id: "spectral_theorem",
    subject: "Linear Algebra",
    topic: "Spectral Theorem for Symmetric Matrices",
    initialQuestion: "State the Spectral Theorem for real symmetric matrices and explain why its eigenvectors are orthogonal.",
    expectedConcepts: [
      "Real symmetric matrix ($A = A^T$)",
      "All eigenvalues are purely real",
      "Exists an orthonormal basis of eigenvectors ($A = Q \\Lambda Q^T$)",
      "Eigenvectors from distinct eigenvalues are strictly orthogonal"
    ],
    commonMistakes: [
      "Assuming any diagonalizable matrix has orthogonal eigenvectors (only normal/symmetric matrices guarantee this).",
      "Forgetting that eigenvalues can have multiplicity greater than 1, requiring Gram-Schmidt within the eigenspace.",
      "Stating that the eigenvalues must be positive (symmetric matrices can have negative eigenvalues unless positive definite)."
    ],
    followUpCounterQuestions: [
      "If two eigenvalues are equal (algebraic multiplicity 2), does the spectral theorem still guarantee two orthogonal eigenvectors, or could the matrix be defective?",
      "Suppose a matrix has all real eigenvalues and an orthonormal basis of eigenvectors. Does that prove it must be symmetric?"
    ],
    goldStandardAnswer: "The Spectral Theorem states that any real symmetric matrix $A \\in \\mathbb{R}^{n \\times n}$ can be factorized as $A = Q \\Lambda Q^T$, where $\\Lambda$ is a diagonal matrix of real eigenvalues and $Q$ is an orthogonal matrix ($Q^T Q = I$) whose columns form an orthonormal basis of $\\mathbb{R}^n$. If $\\lambda_1 \\ne \\lambda_2$ with $A v_1 = \\lambda_1 v_1$ and $A v_2 = \\lambda_2 v_2$, then $\\lambda_1 (v_1^T v_2) = (A v_1)^T v_2 = v_1^T A^T v_2 = v_1^T A v_2 = \\lambda_2 (v_1^T v_2)$. Since $\\lambda_1 \\ne \\lambda_2$, we must have $v_1^T v_2 = 0$ strictly."
  },

  determinant_and_kernel: {
    id: "determinant_and_kernel",
    subject: "Linear Algebra",
    topic: "Determinant Singularity & Nullspace Collapse",
    initialQuestion: "Geometrically and algebraically, what happens when det(A) = 0 for an n x n matrix? Does the linear system Ax = b have any solutions?",
    expectedConcepts: [
      "Signed volume scaling factor is zero",
      "Rank < n, Nullity >= 1 by Rank-Nullity Theorem",
      "Columns of A are linearly dependent",
      "Ax = b has NO solutions if b is outside Col(A), but INFINITE solutions if b in Col(A)"
    ],
    commonMistakes: [
      "Asserting that Ax = b has 'no solution' blanketly (it has infinitely many solutions if b lies in the column space).",
      "Failing to mention the dimension of the nullspace (kernel).",
      "Assuming a singular matrix must have all zero entries."
    ],
    followUpCounterQuestions: [
      "If det(A) = 0, what is the geometric structure of the solution set to the homogeneous system Ax = 0?",
      "Can a singular matrix have a non-zero eigenvalue? Give a concrete 2x2 example."
    ],
    goldStandardAnswer: "When $\\det(A) = 0$, the linear transformation collapses the $n$-dimensional space into a lower-dimensional subspace (hyperplane, line, or point), meaning the volume scaling factor is zero. By the Rank-Nullity Theorem, $\\text{rank}(A) < n$ and $\\text{nullity}(A) \\ge 1$, so the matrix is non-invertible. Regarding $Ax = b$: if $b \\notin \\text{Col}(A)$, there are zero solutions (inconsistent). If $b \\in \\text{Col}(A)$, there are infinitely many solutions, forming an affine subspace $x_p + \\text{Null}(A)$."
  },

  gradient_descent_and_hessian: {
    id: "gradient_descent_and_hessian",
    subject: "Optimization",
    topic: "Hessian Curvature & Pathological Ravines",
    initialQuestion: "Why does standard Gradient Descent oscillate violently in narrow ravines, and how does Momentum or the Hessian matrix resolve this?",
    expectedConcepts: [
      "High condition number $\\kappa = \\lambda_{\\max} / \\lambda_{\\min} \\gg 1$",
      "Eigenvalues of Hessian represent principal curvatures",
      "Steep walls produce large perpendicular gradients that overshoot",
      "Momentum accumulates velocity along flat direction while canceling oscillations"
    ],
    commonMistakes: [
      "Simply saying 'the learning rate is too large' without explaining anisotropic curvature.",
      "Not connecting the ravine geometry to the eigenvalues of the Hessian matrix.",
      "Confusing ill-conditioning with local minima."
    ],
    followUpCounterQuestions: [
      "How does Newton's second-order optimization method use the inverse Hessian $H^{-1}$ to take a direct step to the minimum in a quadratic bowl?",
      "Why don't we use exact Newton's method everywhere in modern deep learning if it eliminates ravine oscillation?"
    ],
    goldStandardAnswer: "A ravine occurs when the Hessian matrix $\\nabla^2 L$ has an ill-conditioned spectrum: one very large eigenvalue $\\lambda_1$ (steep valley walls) and a tiny eigenvalue $\\lambda_2$ (shallow bottom). Standard gradient descent moves along $-\\nabla L$, which is dominated by the steep direction, causing violent bouncing across the walls unless the learning rate $\\alpha < 2/\\lambda_{\\max}$, which then makes progress along the valley path excruciatingly slow. Momentum addresses this by tracking an exponentially decaying velocity $v_t = \\beta v_{t-1} + \\alpha \\nabla L$: the opposing oscillations along the steep axis cancel out, while consistent gradients along the valley accumulate."
  },

  backpropagation_chain_rule: {
    id: "backpropagation_chain_rule",
    subject: "Deep Learning",
    topic: "Reverse-Mode Automatic Differentiation & VJPs",
    initialQuestion: "Explain how Backpropagation applies the chain rule. Why do deep learning frameworks compute Vector-Jacobian Products (VJPs) rather than full Jacobians?",
    expectedConcepts: [
      "Reverse topological traversal of computation DAG",
      "Scalar loss $L$ seeded with upstream gradient $\\partial L / \\partial L = 1$",
      "VJPs compute $v^T J$ in $O(n)$ time without materializing $m \\times n$ matrix",
      "Memory savings: avoiding $O(mn)$ memory allocation for intermediate layers"
    ],
    commonMistakes: [
      "Thinking backprop computes numerical finite differences.",
      "Confusing forward-mode autodiff (Jacobian-Vector Products) with reverse-mode (Vector-Jacobian Products).",
      "Claiming that the full Jacobian is computed and then multiplied."
    ],
    followUpCounterQuestions: [
      "In a neural network with 1,000,000 parameters and a scalar loss $L \\in \\mathbb{R}$, how many forward/backward passes would be required to compute the gradient with Forward-Mode Autodiff vs Reverse-Mode?",
      "Where does backpropagation cache intermediate activations, and what happens to memory during training vs inference?"
    ],
    goldStandardAnswer: "Backpropagation is reverse-mode automatic differentiation on a scalar loss $L$. It seeds the output with $\\frac{\\partial L}{\\partial L} = 1$ and sweeps backwards along the DAG using the multivariable chain rule $\\frac{\\partial L}{\\partial x} = J^T \\frac{\\partial L}{\\partial y}$. Crucially, frameworks never instantiate the full $m \\times n$ Jacobian matrix $J$; instead, they compute the Vector-Jacobian Product (VJP) $v^T J$, which directly returns the gradient vector in a single adjoint pass. For a scalar output with $P$ parameters, reverse-mode computes all $P$ derivatives in $O(1)$ backward pass, whereas forward-mode would require $P$ separate passes."
  }
};

export function evaluateStudentVivaAnswer(
  subject: string,
  topic: string,
  difficulty: "introductory" | "intermediate" | "examiner_trap",
  studentAnswer: string
): VivaEvaluation {
  const normalizedTopic = topic.toLowerCase().trim().replace(/[-\s]/g, "_");
  const scenario = CANONICAL_VIVA_TOPICS[normalizedTopic] || Object.values(CANONICAL_VIVA_TOPICS)[0];

  const lowerAns = studentAnswer.toLowerCase();
  const missingTerms: string[] = [];
  const handWaving: string[] = [];

  // Check expected keywords
  let matches = 0;
  scenario.expectedConcepts.forEach(concept => {
    const words = concept.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ").filter(w => w.length > 4);
    const hasWord = words.some(w => lowerAns.includes(w));
    if (hasWord) {
      matches++;
    } else {
      missingTerms.push(concept);
    }
  });

  // Detect vague hand-waving phrases
  const handWavingPhrases = [
    "basically",
    "kind of",
    "sort of",
    "something like",
    "it just turns into",
    "does some math",
    "obviously",
    "everyone knows"
  ];
  handWavingPhrases.forEach(phrase => {
    if (lowerAns.includes(phrase)) {
      handWaving.push(`Casual/imprecise phrase detected: "${phrase}". State the mathematical theorem directly.`);
    }
  });

  if (studentAnswer.length < 50) {
    handWaving.push("Answer is too brief for an engineering viva. Must include explicit conditions, symbols, and geometric meaning.");
  }

  // Calculate score
  let score = Math.round((matches / Math.max(scenario.expectedConcepts.length, 1)) * 10);
  if (handWaving.length > 0) score = Math.max(1, score - handWaving.length);
  if (difficulty === "examiner_trap") score = Math.max(1, score - 1);

  let verdict: VivaEvaluation["overallVerdict"] = "Needs Rigor";
  if (score >= 9) verdict = "Distinction / Master";
  else if (score >= 7) verdict = "Proficient Pass";
  else if (score < 4) verdict = "Flawed / Misconception";

  const counterQ = scenario.followUpCounterQuestions[
    Math.floor(Math.random() * scenario.followUpCounterQuestions.length)
  ];

  return {
    scoreOutOfTen: Math.min(10, Math.max(1, score)),
    overallVerdict: verdict,
    conceptualAccuracy: `${matches} of ${scenario.expectedConcepts.length} core theoretical concepts articulated.`,
    missingKeyTerms: missingTerms,
    handWavingFlags: handWaving,
    examinerCounterQuestion: counterQ,
    goldStandardAnswer: scenario.goldStandardAnswer,
    pedagogicalTip: "In university oral examinations, begin by stating the exact hypothesis (e.g. 'Given a real symmetric matrix...'), followed by the algebraic statement, and conclude with the geometric interpretation."
  };
}
