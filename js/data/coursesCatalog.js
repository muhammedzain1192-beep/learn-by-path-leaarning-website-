// Course Catalog Data for Z-Learn
// Clean, minimal curriculums & subjects ready for fresh user-entered chapters

const STORAGE_KEY_CHAPTERS = 'zlearn_custom_chapters';

function loadCustomChapters() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CHAPTERS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function persistCustomChapters(data) {
  try {
    localStorage.setItem(STORAGE_KEY_CHAPTERS, JSON.stringify(data));
  } catch (e) {}
}

export const BASE_CATALOG = [
  // 1. Long Term Plus One 2027
  {
    id: "1",
    slug: "plus-one-2027",
    aliases: ["plus-one", "plus-one-2027", "1", "course-jee-11"],
    title: "Long Term Plus One 2027",
    subtitle: "Class 11 Foundation & Comprehensive Entrance Preparation",
    badge: "Class 11 • Target 2027",
    examType: "Plus One Long Term (JEE Main & Advanced, Board)",
    gradient: "linear-gradient(135deg, #1A365D, #2B6CB0)",
    accentColor: "#38BDF8",
    totalChapters: 0,
    totalContents: 0,
    progress: 0,
    description: "Rigorous 2-year foundation curriculum covering Class 11 Physics, Chemistry, and Mathematics. Create your own structured chapters, video lectures, and practice drills.",
    subjects: [
      {
        id: "physics",
        name: "Physics",
        color: "#38BDF8",
        bgLight: "rgba(56, 189, 248, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "33.3%",
        description: "Mechanics, Properties of Bulk Matter, Oscillations, Waves, and Thermodynamics with problem-solving focus.",
        chapters: []
      },
      {
        id: "chemistry",
        name: "Chemistry",
        color: "#34D399",
        bgLight: "rgba(52, 211, 153, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "33.3%",
        description: "Physical, Inorganic, and Organic foundations: Chemical Bonding, Thermodynamics, Equilibrium, Periodic Table, and GOC.",
        chapters: []
      },
      {
        id: "mathematics",
        name: "Mathematics",
        color: "#FBBF24",
        bgLight: "rgba(251, 191, 36, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "33.3%",
        description: "Coordinate Geometry, Algebra, Trigonometry, and Foundations of Calculus with JEE Advanced rigor.",
        chapters: []
      }
    ]
  },

  // 2. Long Term Plus Two 2027
  {
    id: "2",
    slug: "plus-two-2027",
    aliases: ["plus-two", "plus-two-2027", "2", "course-jee-12"],
    title: "Long Term Plus Two 2027",
    subtitle: "Class 12 Advanced Entrance & Board Synchronization",
    badge: "Class 12 • Target 2027",
    examType: "Plus Two Long Term (JEE Main & Advanced, Board)",
    gradient: "linear-gradient(135deg, #0F766E, #0D9488)",
    accentColor: "#2DD4BF",
    totalChapters: 0,
    totalContents: 0,
    progress: 0,
    description: "Intensive Class 12 preparation balancing board derivations and high-percentile entrance question solving across Physics, Chemistry, and Mathematics.",
    subjects: [
      {
        id: "physics",
        name: "Physics",
        color: "#2DD4BF",
        bgLight: "rgba(45, 212, 191, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "33.3%",
        description: "Electromagnetism, Wave Optics, Modern Physics, and Semiconductors.",
        chapters: []
      },
      {
        id: "chemistry",
        name: "Chemistry",
        color: "#A78BFA",
        bgLight: "rgba(167, 139, 250, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "33.3%",
        description: "Electrochemistry, Chemical Kinetics, Coordination Compounds, Haloalkanes, and Carbonyls.",
        chapters: []
      },
      {
        id: "mathematics",
        name: "Mathematics",
        color: "#F472B6",
        bgLight: "rgba(244, 114, 182, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "33.3%",
        description: "Differential & Integral Calculus, Vectors & 3D Geometry, Matrices, and Probability.",
        chapters: []
      }
    ]
  },

  // 3. Crash Course JEE Main
  {
    id: "3",
    slug: "crash-jee-main",
    aliases: ["crash", "crash-jee", "3", "crash-course"],
    title: "Crash Course JEE Main 2026/2027",
    subtitle: "Rapid 90-Day Rank Booster with High-Yield Topics",
    badge: "Fast-Track • JEE Main Boost",
    examType: "Targeted Rapid Revision & PYQ Drills",
    gradient: "linear-gradient(135deg, #7C2D12, #C2410C)",
    accentColor: "#FB923C",
    totalChapters: 0,
    totalContents: 0,
    progress: 0,
    description: "Condensed high-yield formulas, one-shot masterclasses, and PYQ drills to maximize JEE percentile.",
    subjects: [
      {
        id: "physics",
        name: "Physics",
        color: "#FB923C",
        bgLight: "rgba(251, 146, 60, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "33.3%",
        description: "High-scoring topics: Modern Physics, Current Electricity, Kinematics, Heat & Thermodynamics.",
        chapters: []
      },
      {
        id: "chemistry",
        name: "Chemistry",
        color: "#34D399",
        bgLight: "rgba(52, 211, 153, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "33.3%",
        description: "Quick revision of Organic Named Reactions, Coordination Compounds, and Solutions.",
        chapters: []
      },
      {
        id: "mathematics",
        name: "Mathematics",
        color: "#38BDF8",
        bgLight: "rgba(56, 189, 248, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "33.3%",
        description: "Matrices & Determinants, Vector 3D, Sequence & Series, and Definite Integrals.",
        chapters: []
      }
    ]
  },

  // 4. BITSAT
  {
    id: "4",
    slug: "bitsat-2027",
    aliases: ["bitsat", "bitsat-2027", "4"],
    title: "BITSAT 2026/2027 Comprehensive",
    subtitle: "Speed, Accuracy, English Proficiency & Logical Reasoning Mastery",
    badge: "Speed & Aptitude • 130 Questions Hall",
    examType: "BITSAT (Pilani, Goa, Hyderabad)",
    gradient: "linear-gradient(135deg, #1E1B4B, #4338CA)",
    accentColor: "#818CF8",
    totalChapters: 0,
    totalContents: 0,
    progress: 0,
    description: "Complete preparation for BITSAT computer-based entrance covering PCM/PCB along with English Proficiency & Logical Reasoning.",
    subjects: [
      {
        id: "physics",
        name: "Physics",
        color: "#818CF8",
        bgLight: "rgba(129, 140, 248, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "30 Questions",
        description: "Direct formula application and speed drills.",
        chapters: []
      },
      {
        id: "chemistry",
        name: "Chemistry",
        color: "#34D399",
        bgLight: "rgba(52, 211, 153, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "30 Questions",
        description: "NCERT-line based questions and quick physical chemistry calculations.",
        chapters: []
      },
      {
        id: "maths-bio",
        name: "Maths / Biology",
        shortName: "Math / Bio",
        color: "#FBBF24",
        bgLight: "rgba(251, 191, 36, 0.12)",
        hasStreamToggle: true,
        streams: [
          { id: "maths", label: "Mathematics (B.E.)", chapters: [] },
          { id: "biology", label: "Biology (B.Pharm)", chapters: [] }
        ],
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "40 Questions",
        description: "Stream-specific modules for engineering or pharmacy candidates.",
        chapters: []
      },
      {
        id: "english-lr",
        name: "English & Reasoning",
        shortName: "Eng & LR",
        color: "#EC4899",
        bgLight: "rgba(236, 72, 153, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "30 Questions (10 Eng + 20 LR)",
        description: "Vocabulary, grammar, reading comprehension, and logical series.",
        chapters: []
      }
    ]
  },

  // 5. VITEEE
  {
    id: "5",
    slug: "viteee-2027",
    aliases: ["viteee", "viteee-2027", "5"],
    title: "VITEEE 2026/2027 Target Rank",
    subtitle: "Speed Accuracy Drills for Vellore & Chennai Campuses",
    badge: "125 Questions • No Negative Marking",
    examType: "VITEEE Entrance Exam",
    gradient: "linear-gradient(135deg, #064E3B, #047857)",
    accentColor: "#34D399",
    totalChapters: 0,
    totalContents: 0,
    progress: 0,
    description: "Curriculum tailored for VITEEE's 125-question format with full coverage of Maths/Biology, Physics, Chemistry, English, and Aptitude.",
    subjects: [
      {
        id: "maths-bio",
        name: "Maths / Biology",
        shortName: "Math / Bio",
        color: "#34D399",
        bgLight: "rgba(52, 211, 153, 0.12)",
        hasStreamToggle: true,
        streams: [
          { id: "maths", label: "Mathematics (40 Qs)", chapters: [] },
          { id: "biology", label: "Biology (40 Qs)", chapters: [] }
        ],
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "40 Questions",
        description: "Core discipline preparation for engineering and bio-engineering tracks.",
        chapters: []
      },
      {
        id: "physics",
        name: "Physics",
        color: "#38BDF8",
        bgLight: "rgba(56, 189, 248, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "35 Questions",
        description: "Concepts and numerical drills aligned with VIT syllabus.",
        chapters: []
      },
      {
        id: "chemistry",
        name: "Chemistry",
        color: "#FBBF24",
        bgLight: "rgba(251, 191, 36, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "35 Questions",
        description: "Physical, Inorganic, and Organic question banks.",
        chapters: []
      },
      {
        id: "aptitude",
        name: "Aptitude",
        color: "#A78BFA",
        bgLight: "rgba(167, 139, 250, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "10 Questions",
        description: "Data interpretation, syllogisms, and number sequences.",
        chapters: []
      },
      {
        id: "english",
        name: "English",
        color: "#F472B6",
        bgLight: "rgba(244, 114, 182, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "5 Questions",
        description: "Comprehension passage and sentence correction.",
        chapters: []
      }
    ]
  },

  // 6. MET
  {
    id: "6",
    slug: "met-2027",
    aliases: ["met", "met-2027", "6", "manipal"],
    title: "MET 2026/2027 (Manipal Entrance)",
    subtitle: "Manipal Academy of Higher Education B.Tech Entrance Prep",
    badge: "MAHE • 60 Questions Speed Test",
    examType: "MET (Manipal B.Tech)",
    gradient: "linear-gradient(135deg, #831843, #BE185D)",
    accentColor: "#F472B6",
    totalChapters: 0,
    totalContents: 0,
    progress: 0,
    description: "Dedicated curriculum for Manipal Entrance Test (MET) covering Physics, Chemistry, Mathematics, and English.",
    subjects: [
      {
        id: "mathematics",
        name: "Mathematics",
        color: "#F472B6",
        bgLight: "rgba(244, 114, 182, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "20 Questions",
        description: "Calculus, coordinate geometry, and trigonometry.",
        chapters: []
      },
      {
        id: "physics",
        name: "Physics",
        color: "#38BDF8",
        bgLight: "rgba(56, 189, 248, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "15 Questions",
        description: "Mechanics, electrodynamics, and modern physics.",
        chapters: []
      },
      {
        id: "chemistry",
        name: "Chemistry",
        color: "#34D399",
        bgLight: "rgba(52, 211, 153, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "15 Questions",
        description: "Fundamental physical, organic, and inorganic chemistry.",
        chapters: []
      },
      {
        id: "english",
        name: "English",
        color: "#FBBF24",
        bgLight: "rgba(251, 191, 36, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "10 Questions",
        description: "Grammar, syntax, vocabulary, and sentence construction.",
        chapters: []
      }
    ]
  },

  // 7. Kerala Plus Two Board
  {
    id: "7",
    slug: "kerala-plus-two",
    aliases: ["kerala", "kerala-plus-two", "plus-two-board", "7", "scert"],
    title: "Kerala Plus Two Board Exam Special",
    subtitle: "DHSE SCERT Textbook Derivations, 5-Mark Questions & Model Papers",
    badge: "DHSE Board • Kerala Plus Two",
    examType: "Kerala Higher Secondary Board (DHSE)",
    gradient: "linear-gradient(135deg, #14532D, #16A34A)",
    accentColor: "#4ADE80",
    totalChapters: 0,
    totalContents: 0,
    progress: 0,
    description: "Focused curriculum for Kerala State Higher Secondary examinations with SCERT textbook derivations and board pattern questions.",
    subjects: [
      {
        id: "physics",
        name: "Physics",
        color: "#4ADE80",
        bgLight: "rgba(74, 222, 128, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "60 Marks Theory",
        description: "All 14 SCERT chapters with complete 5-mark derivations and circuit diagrams.",
        chapters: []
      },
      {
        id: "chemistry",
        name: "Chemistry",
        color: "#FBBF24",
        bgLight: "rgba(251, 191, 36, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "60 Marks Theory",
        description: "Organic conversions, mechanisms, and numerical problems.",
        chapters: []
      },
      {
        id: "mathematics",
        name: "Mathematics",
        color: "#38BDF8",
        bgLight: "rgba(56, 189, 248, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "80 Marks Theory",
        description: "Calculus, 3D Geometry, Linear Programming, and Probability derivations.",
        chapters: []
      }
    ]
  },

  // 8. Digital SAT
  {
    id: "8",
    slug: "sat-2027",
    aliases: ["sat", "sat-2027", "8", "digital-sat"],
    title: "Digital SAT 2026/2027 Prep",
    subtitle: "Target 1500+ with Adaptive Bluebook Practice & Desmos Strategies",
    badge: "College Board • Digital SAT 1600",
    examType: "Digital SAT (College Board)",
    gradient: "linear-gradient(135deg, #312E81, #4F46E5)",
    accentColor: "#A5B4FC",
    totalChapters: 0,
    totalContents: 0,
    progress: 0,
    description: "Full preparation for the Digital SAT covering Reading & Writing modules and Math with Desmos mastery.",
    subjects: [
      {
        id: "reading-writing",
        name: "Reading & Writing",
        shortName: "RW",
        color: "#A5B4FC",
        bgLight: "rgba(165, 180, 252, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "54 Questions • 2 Modules (800 Score)",
        description: "Craft and Structure, Information and Ideas, and Standard English Conventions.",
        chapters: []
      },
      {
        id: "math",
        name: "Math",
        shortName: "Math",
        color: "#38BDF8",
        bgLight: "rgba(56, 189, 248, 0.12)",
        totalChapters: 0,
        totalLectures: 0,
        totalQuestions: 0,
        weightage: "44 Questions • 2 Modules (800 Score)",
        description: "Algebra, Advanced Math, Problem-Solving and Data Analysis, and Geometry with Desmos.",
        chapters: []
      }
    ]
  }
];

function applyCustomChapters(catalog) {
  const customData = loadCustomChapters();
  catalog.forEach(course => {
    let courseChapterCount = 0;
    let courseContentCount = 0;

    course.subjects.forEach(subject => {
      const key = `${course.id}_${subject.id}`;
      const savedChapters = customData[key] || [];

      if (subject.hasStreamToggle && subject.streams) {
        subject.streams.forEach(st => {
          const streamKey = `${course.id}_${subject.id}_${st.id}`;
          const streamChapters = customData[streamKey] || [];
          st.chapters = streamChapters;
          courseChapterCount += streamChapters.length;
          streamChapters.forEach(ch => {
            courseContentCount += (ch.lectures ? ch.lectures.length : 0) + (ch.questionCount || 0);
          });
        });
        subject.chapters = subject.streams[0]?.chapters || [];
      } else {
        subject.chapters = savedChapters;
        courseChapterCount += savedChapters.length;
        savedChapters.forEach(ch => {
          courseContentCount += (ch.lectures ? ch.lectures.length : 0) + (ch.questionCount || 0);
        });
      }
      subject.totalChapters = subject.chapters.length;
    });

    course.totalChapters = courseChapterCount;
    course.totalContents = courseContentCount;
  });
}

// Global active catalog with custom chapters merged
export const COURSES_CATALOG = JSON.parse(JSON.stringify(BASE_CATALOG));
applyCustomChapters(COURSES_CATALOG);

// Helper to look up a course by any ID, slug, or search term
export function getCourseById(identifier) {
  if (!identifier) return COURSES_CATALOG[0];
  const query = String(identifier).trim().toLowerCase();

  const found = COURSES_CATALOG.find(c => 
    c.id.toLowerCase() === query ||
    c.slug.toLowerCase() === query ||
    (c.aliases && c.aliases.some(a => a.toLowerCase() === query)) ||
    c.title.toLowerCase().includes(query)
  );

  return found || COURSES_CATALOG[0];
}

// Add a new custom chapter to a subject
export function saveCustomChapter(courseId, subjectId, streamId, chapterData) {
  const customData = loadCustomChapters();
  const key = streamId ? `${courseId}_${subjectId}_${streamId}` : `${courseId}_${subjectId}`;
  if (!customData[key]) {
    customData[key] = [];
  }

  const newChapter = {
    id: `ch-user-${Date.now()}`,
    title: chapterData.title || "Untitled Chapter",
    topics: Array.isArray(chapterData.topics) ? chapterData.topics : (chapterData.topics ? chapterData.topics.split(',').map(t => t.trim()).filter(Boolean) : []),
    lectureCount: Number(chapterData.lectureCount) || 0,
    questionCount: Number(chapterData.questionCount) || 20,
    pyqCount: Number(chapterData.pyqCount) || 10,
    progress: 0,
    lectures: chapterData.lectures || []
  };

  customData[key].push(newChapter);
  persistCustomChapters(customData);
  applyCustomChapters(COURSES_CATALOG);
  return newChapter;
}

// Delete a custom chapter
export function deleteCustomChapter(courseId, subjectId, streamId, chapterId) {
  const customData = loadCustomChapters();
  const key = streamId ? `${courseId}_${subjectId}_${streamId}` : `${courseId}_${subjectId}`;
  if (customData[key]) {
    customData[key] = customData[key].filter(ch => ch.id !== chapterId);
    persistCustomChapters(customData);
    applyCustomChapters(COURSES_CATALOG);
    return true;
  }
  return false;
}
