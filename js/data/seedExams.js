// Seed Exams Information Guides for Z-Learn
export const SEED_EXAMS = [
  {
    id: "exam-jee-main",
    name: "JEE Main",
    fullName: "Joint Entrance Examination (Main)",
    conductedBy: "National Testing Agency (NTA)",
    frequency: "Twice a year (Session 1: Jan/Feb, Session 2: Apr)",
    lastUpdated: "September 2026",
    overview: "JEE Main is the premier entrance test for admission to undergraduate engineering programs at NITs, IIITs, CFTIs, and acts as the screening eligibility test for JEE Advanced.",
    eligibility: "Candidates who passed 10+2 in the current year or preceding two years with Physics, Mathematics, and Chemistry/Biotech. No age limit, but 75% aggregate criteria in 12th board apply for NIT/IIIT admissions.",
    examPattern: "Computer Based Test (CBT) with 75 questions to be answered out of 90 (30 questions each in Physics, Chemistry, Maths, with 20 MCQs and 5 out of 10 Numerical Value questions). Total Marks: 300.",
    markingScheme: "+4 for each correct response; -1 for each incorrect response (applicable to both MCQs and Numerical Value questions).",
    syllabus: [
      "Physics: Mechanics, Waves, Thermodynamics, Electrodynamics, Optics, Modern Physics",
      "Chemistry: Physical Chemistry, Inorganic Coordination & Periodic Trends, Organic Reaction Mechanisms",
      "Mathematics: Calculus, Coordinate Geometry, Vectors & 3D Geometry, Algebra, Trigonometry"
    ]
  },
  {
    id: "exam-jee-adv",
    name: "JEE Advanced",
    fullName: "Joint Entrance Examination (Advanced)",
    conductedBy: "One of the 7 zonal IITs under JAB guidance",
    frequency: "Once a year (May/June)",
    lastUpdated: "September 2026",
    overview: "The sole gateway for admission to the prestigious Indian Institutes of Technology (IITs). Renowned globally for rigorous conceptual depth and multi-concept problem solving.",
    eligibility: "Must be among the top 2,50,000 successful candidates in B.E./B.Tech. of JEE Main. Maximum 2 attempts in two consecutive years.",
    examPattern: "Two mandatory papers (Paper 1 & Paper 2) of 3 hours each on the same day. Includes single-correct, multi-correct with partial marking, numerical integer types, and stem matching.",
    markingScheme: "Varies per section; typical multi-correct: +4 full marks, partial marking (+1, +2, +3), negative marking (-2 for incorrect choice).",
    syllabus: [
      "Physics: Rigorous mechanics including rotational dynamics, thermodynamics, rotational frame, advanced wave optics",
      "Chemistry: In-depth reaction intermediates, stereochemistry, crystal field theory, chemical kinetics & thermodynamics",
      "Mathematics: Advanced calculus, differential equations, vectors & geometry, complex numbers, probability distributions"
    ]
  },
  {
    id: "exam-bitsat",
    name: "BITSAT",
    fullName: "Birla Institute of Technology and Science Admission Test",
    conductedBy: "BITS Pilani",
    frequency: "Twice a year (Session 1 & Session 2)",
    lastUpdated: "September 2026",
    overview: "Computer-based online entrance exam for admission to Integrated First Degree programmes at BITS campuses in Pilani, Goa, and Hyderabad.",
    eligibility: "Minimum 75% aggregate marks in Physics, Chemistry, and Mathematics in 12th examination, with at least 60% in each individual subject.",
    examPattern: "130 questions in 3 hours: Physics (30), Chemistry (30), Mathematics (40), English Proficiency (10), Logical Reasoning (20). Total Marks: 390. Bonus 12 questions unlocked if all 130 attempted without skipping back.",
    markingScheme: "+3 for each correct response; -1 for each incorrect response. No marks for unattempted questions.",
    syllabus: [
      "NCERT Class 11 and 12 syllabus across Physics, Chemistry, Mathematics with emphasis on calculation speed and accuracy.",
      "English & Logical Reasoning: Vocabulary, Grammar, Reading Comprehension, Series Completion, Pattern Analysis."
    ]
  },
  {
    id: "exam-viteee",
    name: "VITEEE",
    fullName: "Vellore Institute of Technology Engineering Entrance Examination",
    conductedBy: "VIT University",
    frequency: "Once a year (April)",
    lastUpdated: "September 2026",
    overview: "Common entrance examination for B.Tech degrees across VIT campuses (Vellore, Chennai, AP, Bhopal).",
    eligibility: "Minimum aggregate of 60% in Physics, Chemistry, and Mathematics in the qualifying 10+2 examination.",
    examPattern: "125 questions in 2 hours 30 minutes: Maths (40), Physics (35), Chemistry (35), Aptitude (10), English (5). Total Marks: 125.",
    markingScheme: "+1 for correct answer; NO negative marking.",
    syllabus: [
      "Comprehensive Class 11 and 12 CBSE / State Board syllabus with focus on standard concepts and formulas."
    ]
  },
  {
    id: "exam-met",
    name: "MET",
    fullName: "Manipal Entrance Test",
    conductedBy: "Manipal Academy of Higher Education (MAHE)",
    frequency: "Twice a year",
    lastUpdated: "September 2026",
    overview: "Entrance exam for admission to B.Tech programs at Manipal Institute of Technology (MIT Manipal, MIT Bengaluru, etc.).",
    eligibility: "Pass in 10+2 with Physics, Mathematics, and English as compulsory subjects with at least 50% marks in PCM combined.",
    examPattern: "60 questions in 120 minutes (MCQs and Numerical Answer Types). Total Marks: 240. Merit list combines MET score (50%) and 12th Board marks (50%).",
    markingScheme: "+4 for correct MCQ, -1 for wrong MCQ; +4 for correct NAT, 0 for wrong NAT.",
    syllabus: ["Standard Class 11 and 12 Physics, Chemistry, Mathematics, and General English."]
  },
  {
    id: "exam-kerala-plus-two",
    name: "Kerala Plus Two",
    fullName: "Kerala Higher Secondary Board Examination (DHSE)",
    conductedBy: "Directorate of Higher Secondary Education, Kerala",
    frequency: "Annual Public Board Exam (March)",
    lastUpdated: "September 2026",
    overview: "Official state higher secondary board examination determining eligibility for state engineering counseling (KEAM) and university admissions.",
    eligibility: "Regular enrollment in Kerala Higher Secondary School (Science stream with Physics, Chemistry, Maths/Biology/Computer Science).",
    examPattern: "Subject papers of 60 marks theory + 40 marks Continuous Evaluation / Practical. Question structure includes 1-mark, 2-mark, 3-mark, 4-mark, and 5-mark derivation questions with internal choice.",
    markingScheme: "Step-marking scheme based on official SCERT answer keys. Derivations, circuit diagrams, and unit specifications carry designated marks.",
    syllabus: [
      "SCERT Kerala Physics, Chemistry, and Mathematics textbooks with all chapters, terminal exercises, and derivations."
    ]
  },
  {
    id: "exam-sat",
    name: "SAT",
    fullName: "Scholastic Assessment Test",
    conductedBy: "College Board (USA)",
    frequency: "7 times a year (globally)",
    lastUpdated: "September 2026",
    overview: "The SAT is a standardized college admission test widely accepted by US universities and many international institutions. It assesses reading, writing, and mathematical reasoning skills essential for college-level academic work.",
    eligibility: "No formal eligibility restriction. Typically taken by students in grades 10–12. No age limit. International students can appear at authorized test centers.",
    examPattern: "Digital SAT (since 2024): 2 sections — Reading & Writing (54 questions, 64 min) and Math (44 questions, 70 min). Total time: ~2 hours 14 minutes. Adaptive format — Module 2 difficulty adjusts based on Module 1 performance.",
    markingScheme: "Score range: 400–1600 (800 per section). No negative marking. Unanswered questions do not penalize the score. Scores are scaled using an equating process.",
    syllabus: [
      "Reading & Writing: Craft and Structure, Information & Ideas, Standard English Conventions, Expression of Ideas",
      "Math: Algebra, Advanced Math, Problem Solving & Data Analysis, Geometry & Trigonometry",
      "Calculator permitted throughout the Math section (Desmos built-in)"
    ]
  }
];
