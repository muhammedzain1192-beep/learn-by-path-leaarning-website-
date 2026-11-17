// Seed Mock Tests Data for Z-Learn
export const SEED_MOCK_TESTS = [
  {
    id: "mock-jee-main-01",
    title: "JEE Main All India Ranker Full Mock 1",
    exam: "JEE Main",
    durationMinutes: 180,
    totalQuestions: 75,
    maxMarks: 300,
    markingScheme: "+4 for correct, -1 for incorrect",
    difficulty: "Medium-Hard",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    sections: [
      { name: "Physics", questionsCount: 25 },
      { name: "Chemistry", questionsCount: 25 },
      { name: "Mathematics", questionsCount: 25 }
    ],
    description: "Full syllabus exam strictly modeled on NTA 2024-2025 question distribution and difficulty curve.",
    questionIds: [
      "q-phy-kin-01", "q-phy-kin-03", "q-phy-nlm-01", "q-chem-bond-01", "q-chem-bond-02", "q-math-lines-01"
    ]
  },
  {
    id: "mock-jee-adv-01",
    title: "JEE Advanced Target Top 100 Paper 1",
    exam: "JEE Advanced",
    durationMinutes: 180,
    totalQuestions: 54,
    maxMarks: 180,
    markingScheme: "+3 for single choice, +4 for multi-correct (-2 for wrong)",
    difficulty: "JEE Advanced",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    sections: [
      { name: "Physics", questionsCount: 18 },
      { name: "Chemistry", questionsCount: 18 },
      { name: "Mathematics", questionsCount: 18 }
    ],
    description: "Deep conceptual multi-concept problems testing calculus in mechanics and molecular orbital theory.",
    questionIds: [
      "q-phy-kin-02", "q-chem-bond-01", "q-math-conic-01"
    ]
  },
  {
    id: "mock-bitsat-01",
    title: "BITSAT Speed & Accuracy Drill 1",
    exam: "BITSAT",
    durationMinutes: 180,
    totalQuestions: 130,
    maxMarks: 390,
    markingScheme: "+3 for correct, -1 for incorrect",
    difficulty: "Medium",
    subjects: ["Physics", "Chemistry", "Mathematics", "English & Logical Reasoning"],
    sections: [
      { name: "Physics", questionsCount: 30 },
      { name: "Chemistry", questionsCount: 30 },
      { name: "Mathematics", questionsCount: 40 },
      { name: "English & LR", questionsCount: 30 }
    ],
    description: "High speed assessment focusing on quick formula recall and computational accuracy.",
    questionIds: [
      "q-phy-kin-03", "q-chem-bond-02", "q-math-lines-01"
    ]
  },
  {
    id: "mock-viteee-01",
    title: "VITEEE Comprehensive Practice Test",
    exam: "VITEEE",
    durationMinutes: 150,
    totalQuestions: 125,
    maxMarks: 125,
    markingScheme: "+1 for correct, 0 for incorrect (No negative marking)",
    difficulty: "Medium",
    subjects: ["Physics", "Chemistry", "Mathematics", "English", "Aptitude"],
    description: "Standard Vellore Institute of Technology pattern covering fundamental NCERT topics.",
    questionIds: [
      "q-chem-bond-02", "q-phy-kin-03", "q-math-lines-01"
    ]
  },
  {
    id: "mock-met-01",
    title: "MET (Manipal Entrance Test) Mock 1",
    exam: "MET",
    durationMinutes: 120,
    totalQuestions: 60,
    maxMarks: 240,
    markingScheme: "+4 for correct, -1 for incorrect",
    difficulty: "Medium",
    subjects: ["Physics", "Chemistry", "Mathematics", "English"],
    description: "MAHE examination layout with balanced conceptual and analytical numerical questions.",
    questionIds: [
      "q-phy-kin-01", "q-chem-bond-01", "q-math-lines-01"
    ]
  },
  {
    id: "mock-kerala-plus-two-01",
    title: "Kerala Plus Two Model Examination (SCERT)",
    exam: "Kerala Plus Two",
    durationMinutes: 120,
    totalQuestions: 30,
    maxMarks: 60,
    markingScheme: "Section A (1 Mark), Section B (2 Marks), Section C (3 Marks), Section D (5 Marks)",
    difficulty: "Standard Board Level",
    subjects: ["Physics"],
    description: "Official DHSE Kerala board pattern with step-marking criteria and derivation requirements.",
    questionIds: [
      "q-kerala-scert-01", "q-kerala-scert-02"
    ]
  }
];
