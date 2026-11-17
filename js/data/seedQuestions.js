// Seed Questions & PYQ Repository for Z-Learn
export const SEED_QUESTIONS = [
  {
    id: "q-phy-kin-01",
    exam: "JEE Main",
    year: 2024,
    subject: "Physics",
    chapter: "Kinematics & Motion in 1D & 2D",
    topic: "Displacement-Time and Velocity-Time Graphs",
    difficulty: "Medium",
    type: "Single Choice",
    question: "A particle starts from rest at t = 0 and moves along the x-axis with an acceleration a(t) = 6t - 4 m/s². If at t = 2 s the velocity is 4 m/s and position x = 2 m, what is the position of the particle at t = 4 s?",
    options: [
      "x = 34 m",
      "x = 42 m",
      "x = 28 m",
      "x = 18 m"
    ],
    correctIndex: 0,
    explanation: "Acceleration a = dv/dt = 6t - 4.\nIntegrating: v(t) = 3t² - 4t + C1.\nGiven v(2) = 4 m/s: 3(4) - 4(2) + C1 = 4 => 12 - 8 + C1 = 4 => C1 = 0.\nSo v(t) = 3t² - 4t.\nNow, dx/dt = 3t² - 4t => x(t) = t³ - 2t² + C2.\nGiven x(2) = 2: (2)³ - 2(2)² + C2 = 2 => 8 - 8 + C2 = 2 => C2 = 2.\nThus, x(t) = t³ - 2t² + 2.\nAt t = 4 s: x(4) = 4³ - 2(4)² + 2 = 64 - 32 + 2 = 34 m.",
    concept: "Variable Acceleration Integration",
    avgTime: "90s"
  },
  {
    id: "q-phy-kin-02",
    exam: "JEE Advanced",
    year: 2023,
    subject: "Physics",
    chapter: "Kinematics & Motion in 1D & 2D",
    topic: "Relative Motion in 1D & 2D",
    difficulty: "JEE Advanced",
    type: "Single Choice",
    question: "A river flows with a constant speed v_r = 3 km/h. A swimmer capable of swimming at v_m = 5 km/h relative to water wishes to cross the river along the shortest possible path. If the river width is 1 km, what is the time taken to cross?",
    options: [
      "12 minutes",
      "15 minutes",
      "20 minutes",
      "10 minutes"
    ],
    correctIndex: 1,
    explanation: "For the shortest path, the resultant velocity vector of the swimmer must be strictly perpendicular to the river banks (drift = 0).\nResultant speed v = sqrt(v_m² - v_r²) = sqrt(5² - 3²) = sqrt(25 - 9) = 4 km/h.\nTime taken = width / v = 1 km / (4 km/h) = 0.25 hours = 15 minutes.",
    concept: "Zero Drift River Crossing",
    avgTime: "110s"
  },
  {
    id: "q-phy-kin-03",
    exam: "BITSAT",
    year: 2024,
    subject: "Physics",
    chapter: "Kinematics & Motion in 1D & 2D",
    topic: "Projectile Motion on Horizontal & Inclined Planes",
    difficulty: "Easy",
    type: "Single Choice",
    question: "A projectile is thrown with an initial speed of 20 m/s at an angle of 30° with the horizontal. Taking g = 10 m/s², the maximum height attained by the projectile is:",
    options: [
      "5 m",
      "10 m",
      "15 m",
      "20 m"
    ],
    correctIndex: 0,
    explanation: "Maximum height H = (u² * sin²θ) / (2g).\nHere u = 20 m/s, θ = 30°, sin(30°) = 0.5.\nH = (20² * 0.5²) / (2 * 10) = (400 * 0.25) / 20 = 100 / 20 = 5 meters.",
    concept: "Standard Projectile Maximum Height",
    avgTime: "45s"
  },
  {
    id: "q-phy-nlm-01",
    exam: "JEE Main",
    year: 2025,
    subject: "Physics",
    chapter: "Newton's Laws of Motion & Friction",
    topic: "Friction in Two-Block Systems",
    difficulty: "Medium",
    type: "Single Choice",
    question: "A block of mass 2 kg rests on a rough horizontal floor with coefficient of static friction μ_s = 0.4 and kinetic friction μ_k = 0.3. A horizontal force of 6 N is applied to the block. Taking g = 10 m/s², the friction force acting on the block is:",
    options: [
      "8 N",
      "6 N",
      "6.8 N",
      "0 N"
    ],
    correctIndex: 1,
    explanation: "Normal reaction N = mg = 2 * 10 = 20 N.\nMaximum static friction f_s,max = μ_s * N = 0.4 * 20 = 8 N.\nSince the applied horizontal force F = 6 N is LESS than f_s,max (8 N), the block does NOT move.\nStatic friction is a self-adjusting force equal to the applied force: f = 6 N.",
    concept: "Self-Adjusting Static Friction",
    avgTime: "60s"
  },
  {
    id: "q-chem-bond-01",
    exam: "JEE Main",
    year: 2024,
    subject: "Chemistry",
    chapter: "Chemical Bonding & Molecular Structure",
    topic: "Molecular Orbital Theory (MOT)",
    difficulty: "Medium",
    type: "Single Choice",
    question: "According to Molecular Orbital Theory (MOT), which of the following species is paramagnetic and has a bond order of 2.5?",
    options: [
      "N2+",
      "O2",
      "C2",
      "N2"
    ],
    correctIndex: 0,
    explanation: "N2 has 14 electrons. N2+ has 13 electrons.\nConfiguration for 13 electrons: σ1s² σ*1s² σ2s² σ*2s² (π2px² = π2py²) σ2pz¹.\nBond Order = (Nb - Na)/2 = (9 - 4)/2 = 5/2 = 2.5.\nBecause there is one unpaired electron in σ2pz, N2+ is paramagnetic.",
    concept: "Molecular Orbital Theory Bond Order",
    avgTime: "75s"
  },
  {
    id: "q-chem-bond-02",
    exam: "VITEEE",
    year: 2024,
    subject: "Chemistry",
    chapter: "Chemical Bonding & Molecular Structure",
    topic: "VSEPR Theory & Geometry",
    difficulty: "Easy",
    type: "Single Choice",
    question: "The geometry and hybridization of xenon in XeF4 according to VSEPR theory are respectively:",
    options: [
      "Square planar, sp³d²",
      "Tetrahedral, sp³",
      "Octahedral, sp³d²",
      "See-saw, sp³d"
    ],
    correctIndex: 0,
    explanation: "Xe has 8 valence electrons. In XeF4, it forms 4 single bonds with F and has 2 lone pairs.\nSteric Number = 4 bond pairs + 2 lone pairs = 6 (sp³d² hybridization, octahedral electron geometry).\nDue to 2 lone pairs occupying axial positions to minimize repulsion, the molecular shape is Square Planar.",
    concept: "VSEPR Geometry with Lone Pairs",
    avgTime: "40s"
  },
  {
    id: "q-math-lines-01",
    exam: "JEE Main",
    year: 2024,
    subject: "Mathematics",
    chapter: "Straight Lines & Pair of Straight Lines",
    topic: "Distance between parallel lines, Foot of perpendicular",
    difficulty: "Medium",
    type: "Single Choice",
    question: "The distance between the parallel lines 3x + 4y - 9 = 0 and 6x + 8y + 15 = 0 is:",
    options: [
      "3.3 units",
      "2.4 units",
      "3.6 units",
      "1.8 units"
    ],
    correctIndex: 0,
    explanation: "Multiply the first line by 2: 6x + 8y - 18 = 0.\nSecond line is 6x + 8y + 15 = 0.\nDistance between parallel lines Ax + By + C1 = 0 and Ax + By + C2 = 0 is |C1 - C2| / sqrt(A² + B²).\nDistance = |-18 - 15| / sqrt(6² + 8²) = |-33| / 10 = 3.3 units.",
    concept: "Distance Between Parallel Lines Formula",
    avgTime: "60s"
  },
  {
    id: "q-math-conic-01",
    exam: "JEE Advanced",
    year: 2023,
    subject: "Mathematics",
    chapter: "Circles & Parabola Masterclass",
    topic: "Condition of Tangency & Normal",
    difficulty: "JEE Advanced",
    type: "Single Choice",
    question: "If the line y = mx + 1 is tangent to the parabola y² = 4x, then the value of m is:",
    options: [
      "1",
      "-1",
      "2",
      "1/2"
    ],
    correctIndex: 0,
    explanation: "Standard condition for the line y = mx + c to be tangent to the parabola y² = 4ax is c = a / m.\nHere, 4a = 4 => a = 1.\nThe line is y = mx + 1 => c = 1.\nTherefore, 1 = 1 / m => m = 1.",
    concept: "Condition of Tangency for Parabola",
    avgTime: "80s"
  },
  {
    id: "q-kerala-scert-01",
    exam: "Kerala Plus Two",
    year: 2024,
    subject: "Physics",
    chapter: "Electric Charges & Fields (SCERT Chapter 1)",
    topic: "Gauss's Theorem & Applications",
    difficulty: "Easy",
    type: "Single Choice",
    question: "The SI unit of electric flux is:",
    options: [
      "N m² C⁻¹ (or V m)",
      "N C⁻¹",
      "V m⁻¹",
      "C m²"
    ],
    correctIndex: 0,
    explanation: "Electric flux Φ = E * A * cos(θ).\nUnit of E is N/C or V/m. Unit of area A is m².\nHence unit of flux is (N/C) * m² = N m² C⁻¹ or (V/m) * m² = V m.",
    concept: "Electric Flux Units & Dimensions (Kerala SCERT 1-Mark)",
    avgTime: "30s"
  },
  {
    id: "q-kerala-scert-02",
    exam: "Kerala Plus Two",
    year: 2024,
    subject: "Physics",
    chapter: "Current Electricity & Kirchhoff's Laws (SCERT Chapter 3)",
    topic: "Wheatstone Bridge Principle",
    difficulty: "Medium",
    type: "Single Choice",
    question: "In a balanced Wheatstone bridge, the four arms have resistances P = 10 Ω, Q = 20 Ω, R = 15 Ω, and S = ? Ω. The value of unknown resistance S is:",
    options: [
      "30 Ω",
      "25 Ω",
      "40 Ω",
      "15 Ω"
    ],
    correctIndex: 0,
    explanation: "Under balanced condition of Wheatstone bridge: P / Q = R / S.\n10 / 20 = 15 / S => 1 / 2 = 15 / S => S = 30 Ω.",
    concept: "Wheatstone Bridge Balanced Condition (Kerala SCERT 2-Mark)",
    avgTime: "35s"
  }
];
