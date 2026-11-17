// Reactive State Store for Z-Learn with LocalStorage Persistence
import { SEED_COURSES } from './data/seedCourses.js';
import { SEED_QUESTIONS } from './data/seedQuestions.js';
import { SEED_MOCK_TESTS } from './data/seedMockTests.js';
import { SEED_EXAMS } from './data/seedExams.js';

const STORAGE_KEYS = {
  USER: 'zlearn_user',
  COURSES: 'zlearn_courses',
  QUESTIONS: 'zlearn_questions',
  MOCK_TESTS: 'zlearn_mock_tests',
  EXAMS: 'zlearn_exams',
  PRACTICE_HISTORY: 'zlearn_practice_history',
  MISTAKES: 'zlearn_mistakes',
  BOOKMARKS: 'zlearn_bookmarks',
  REVISIONS: 'zlearn_revisions',
  PLANNER: 'zlearn_planner',
  TEST_ATTEMPTS: 'zlearn_test_attempts',
  SETTINGS: 'zlearn_settings',
  WATCH_HISTORY: 'zlearn_watch_history',
  DOWNLOADS: 'zlearn_downloads',
  EXAM_REPORTS: 'zlearn_exam_reports'
};

class Store {
  constructor() {
    this.subscribers = [];
    this.init();
  }

  init() {
    // 1. User profile
    const defaultUser = {
      name: "Muhammed Zain",
      email: "muhammedzain1192@gmail.com",
      greetingName: "Muhammed Zain",
      classLevel: "Class 12 / Dropper",
      targetExams: ["JEE Main", "JEE Advanced", "BITSAT", "Kerala Plus Two"],
      studyGoalMinutes: 360,
      stats: {
        studyTimeTodayHours: "4.2 hrs",
        questionsSolvedTotal: 148,
        averageAccuracyPercent: 78
      }
    };
    const loadedUser = this.load(STORAGE_KEYS.USER, null);
    if (!loadedUser) {
      this.user = defaultUser;
      this.save(STORAGE_KEYS.USER, this.user);
    } else {
      this.user = { 
        ...defaultUser, 
        ...loadedUser, 
        name: loadedUser.name && loadedUser.name !== "Zain" ? loadedUser.name : "Muhammed Zain",
        email: loadedUser.email || "muhammedzain1192@gmail.com"
      };
      this.save(STORAGE_KEYS.USER, this.user);
    }

    // 2. Courses — fresh slate without seeded chapters
    const storedCourses = this.load(STORAGE_KEYS.COURSES, null);
    if (!storedCourses || storedCourses.some(c => c.chapters && c.chapters.length > 0)) {
      this.courses = SEED_COURSES;
      this.save(STORAGE_KEYS.COURSES, this.courses);
    } else {
      this.courses = storedCourses;
    }

    // 3. Questions
    this.questions = this.load(STORAGE_KEYS.QUESTIONS, SEED_QUESTIONS);

    // 4. Mock Tests
    this.mockTests = this.load(STORAGE_KEYS.MOCK_TESTS, SEED_MOCK_TESTS);

    // 5. Exams Guides — always merge seed exams so newly added ones show up
    const storedExams = this.load(STORAGE_KEYS.EXAMS, []);
    const storedExamIds = new Set(storedExams.map(e => e.id));
    const newSeedExams = SEED_EXAMS.filter(e => !storedExamIds.has(e.id));
    this.exams = storedExams.length > 0 ? [...storedExams, ...newSeedExams] : SEED_EXAMS;
    if (newSeedExams.length > 0) this.save(STORAGE_KEYS.EXAMS, this.exams);


    // 6. Practice History
    this.practiceHistory = this.load(STORAGE_KEYS.PRACTICE_HISTORY, [
      {
        id: "ph-1",
        date: "2026-09-19",
        subject: "Physics",
        chapter: "Kinematics & Motion in 1D & 2D",
        total: 10,
        correct: 8,
        wrong: 2,
        accuracy: 80,
        timeSpent: "18 mins"
      },
      {
        id: "ph-2",
        date: "2026-09-18",
        subject: "Chemistry",
        chapter: "Chemical Bonding & Molecular Structure",
        total: 15,
        correct: 12,
        wrong: 3,
        accuracy: 80,
        timeSpent: "25 mins"
      },
      {
        id: "ph-3",
        date: "2026-09-16",
        subject: "Mathematics",
        chapter: "Straight Lines & Pair of Straight Lines",
        total: 12,
        correct: 8,
        wrong: 4,
        accuracy: 67,
        timeSpent: "28 mins"
      }
    ]);

    // 7. Mistake Book
    this.mistakes = this.load(STORAGE_KEYS.MISTAKES, [
      {
        id: "mstk-1",
        questionId: "q-phy-kin-02",
        subject: "Physics",
        chapter: "Kinematics",
        topic: "Relative Motion (River Swimmer)",
        questionSnippet: "A river flows with speed 3 km/h. Swimmer 5 km/h relative to water wishes to cross shortest path...",
        whyGotWrong: "Forgot that shortest path means drift = 0, so resultant velocity is sqrt(vm² - vr²) instead of simple addition.",
        correctConcept: "Shortest path crossing requires sin θ = vr / vm with respect to normal.",
        date: "2026-09-18",
        retryCount: 1
      },
      {
        id: "mstk-2",
        questionId: "q-math-lines-01",
        subject: "Mathematics",
        chapter: "Straight Lines",
        topic: "Parallel Lines Distance",
        questionSnippet: "Distance between parallel lines 3x + 4y - 9 = 0 and 6x + 8y + 15 = 0...",
        whyGotWrong: "Did not normalize coefficients of x and y before applying |C1 - C2| formula.",
        correctConcept: "Always make coefficients A and B identical in both equations first (multiply equation 1 by 2).",
        date: "2026-09-16",
        retryCount: 2
      }
    ]);

    // 8. Bookmarks
    this.bookmarks = this.load(STORAGE_KEYS.BOOKMARKS, [
      { type: "lecture", id: "lec-kin-05", title: "Analysis of Motion Graphs (s-t, v-t, a-t)", subject: "Physics", date: "2026-09-17" },
      { type: "question", id: "q-phy-kin-02", title: "River Swimmer Shortest Path Problem", subject: "Physics", date: "2026-09-18" },
      { type: "resource", id: "res-kin-formula", title: "Kinematics 1-Page Formula Cheatsheet", subject: "Physics", date: "2026-09-15" }
    ]);

    // 9. Revisions (Spaced Repetition)
    this.revisions = this.load(STORAGE_KEYS.REVISIONS, [
      {
        id: "rev-1",
        topic: "Kinematics Graphs & Relative Motion",
        subject: "Physics",
        chapter: "Kinematics",
        stage: 2, // Revision 2 Today
        status: "due_today",
        dueDate: "Today",
        nextDue: "In 4 days"
      },
      {
        id: "rev-2",
        topic: "VSEPR & Hybridization Exceptions",
        subject: "Chemistry",
        chapter: "Chemical Bonding",
        stage: 1,
        status: "due_today",
        dueDate: "Today",
        nextDue: "In 2 days"
      },
      {
        id: "rev-3",
        topic: "Distance between Parallel Lines & Foot of Perpendicular",
        subject: "Mathematics",
        chapter: "Straight Lines",
        stage: 3,
        status: "upcoming",
        dueDate: "Tomorrow",
        nextDue: "In 7 days"
      },
      {
        id: "rev-4",
        topic: "Gauss's Law 5-Mark Derivations",
        subject: "Physics",
        chapter: "Kerala Plus Two Electrostatics",
        stage: 4,
        status: "completed",
        dueDate: "Completed",
        nextDue: "Mastered"
      }
    ]);

    // 10. Study Planner Tasks — clean fresh slate
    const loadedPlanner = this.load(STORAGE_KEYS.PLANNER, []);
    if (!Array.isArray(loadedPlanner) || loadedPlanner.some(t => t.id && t.id.startsWith('pl-'))) {
      this.plannerTasks = [];
      this.save(STORAGE_KEYS.PLANNER, this.plannerTasks);
    } else {
      this.plannerTasks = loadedPlanner;
    }

    // 11. Test Attempts & Results
    this.testAttempts = this.load(STORAGE_KEYS.TEST_ATTEMPTS, [
      {
        id: "attempt-demo-1",
        testId: "mock-jee-main-01",
        testTitle: "JEE Main All India Ranker Full Mock 1",
        date: "2026-09-17",
        totalScore: 216,
        maxScore: 300,
        percentile: 98.4,
        accuracy: 82,
        attempted: 64,
        correct: 56,
        incorrect: 8,
        unattempted: 11,
        subjectBreakdown: {
          Physics: { score: 76, max: 100, attempted: 21, correct: 19, incorrect: 2 },
          Chemistry: { score: 82, max: 100, attempted: 23, correct: 21, incorrect: 2 },
          Mathematics: { score: 58, max: 100, attempted: 20, correct: 16, incorrect: 4 }
        },
        weakTopics: ["Relative Motion (Inclined planes)", "Parabola Tangents", "Thermodynamics Reversibility"],
        recommendedRevision: [
          { topic: "Parabola Tangency Conditions", subject: "Mathematics", action: "#courses" },
          { topic: "Relative Motion in 2D", subject: "Physics", action: "#practice" }
        ]
      }
    ]);

    // 12. Settings
    this.settings = this.load(STORAGE_KEYS.SETTINGS, {
      theme: "light",
      plusTwoMode: false,
      dailyReminder: true,
      autoPlayNext: true
    });

    // 13. Downloaded Videos (Offline Downloads Folder)
    this.downloads = this.load(STORAGE_KEYS.DOWNLOADS, [
      {
        id: "dl-1",
        title: "1D Kinematics Core Derivations & Graphs",
        subject: "Physics",
        chapter: "Kinematics & Motion",
        part: "Part 1",
        duration: "42 mins",
        quality: "1080p Full HD",
        size: "285 MB",
        downloadDate: "2026-10-26",
        videoUrl: "https://www.youtube.com/watch?v=ZM8ECw1yZ1Y"
      },
      {
        id: "dl-2",
        title: "VSEPR Geometry, Lone Pairs & Bond Angles",
        subject: "Chemistry",
        chapter: "Chemical Bonding",
        part: "Part 2",
        duration: "38 mins",
        quality: "720p HD",
        size: "195 MB",
        downloadDate: "2026-10-25",
        videoUrl: "https://www.youtube.com/watch?v=ZM8ECw1yZ1Y"
      },
      {
        id: "dl-3",
        title: "Calculus Derivatives & Rate of Change",
        subject: "Mathematics",
        chapter: "Differential Calculus",
        part: "Part 1",
        duration: "52 mins",
        quality: "1080p Full HD",
        size: "340 MB",
        downloadDate: "2026-10-24",
        videoUrl: "https://www.youtube.com/watch?v=ZM8ECw1yZ1Y"
      }
    ]);

    // 14. Watched Videos Report History
    this.watchHistory = this.load(STORAGE_KEYS.WATCH_HISTORY, [
      {
        id: "wh-1",
        title: "1D Kinematics Core Derivations",
        subject: "Physics",
        chapter: "Kinematics & Motion",
        part: "Part 1",
        duration: "42 mins",
        date: "2026-10-26 14:30",
        completed: true
      },
      {
        id: "wh-2",
        title: "VSEPR Geometry & Bond Angles",
        subject: "Chemistry",
        chapter: "Chemical Bonding & Molecular Structure",
        part: "Part 2",
        duration: "38 mins",
        date: "2026-10-25 11:15",
        completed: true
      },
      {
        id: "wh-3",
        title: "Standard Equations of Lines",
        subject: "Mathematics",
        chapter: "Straight Lines & Coordinate Systems",
        part: "Part 1",
        duration: "50 mins",
        date: "2026-10-24 16:45",
        completed: true
      },
      {
        id: "wh-4",
        title: "Friction & Pulley Constraints",
        subject: "Physics",
        chapter: "Laws of Motion & Friction",
        part: "Part 2",
        duration: "45 mins",
        date: "2026-10-23 10:20",
        completed: true
      }
    ]);

    // 15. Exam Attended Report History
    this.examReports = this.load(STORAGE_KEYS.EXAM_REPORTS, [
      {
        id: "er-1",
        nameOfChapter: "Kinematics & Projectile Motion",
        subject: "Physics",
        time: "45 mins (26 Oct 2026, 04:30 PM)",
        score: "84 / 100",
        rawScore: 84,
        maxScore: 100,
        percentage: 84,
        attempted: 24,
        correct: 21,
        incorrect: 3,
        date: "2026-10-26"
      },
      {
        id: "er-2",
        nameOfChapter: "Chemical Bonding & Molecular Structure",
        subject: "Chemistry",
        time: "40 mins (25 Oct 2026, 02:15 PM)",
        score: "76 / 100",
        rawScore: 76,
        maxScore: 100,
        percentage: 76,
        attempted: 22,
        correct: 19,
        incorrect: 3,
        date: "2026-10-25"
      },
      {
        id: "er-3",
        nameOfChapter: "Straight Lines & Pair of Straight Lines",
        subject: "Mathematics",
        time: "50 mins (24 Oct 2026, 06:00 PM)",
        score: "68 / 100",
        rawScore: 68,
        maxScore: 100,
        percentage: 68,
        attempted: 20,
        correct: 17,
        incorrect: 3,
        date: "2026-10-24"
      },
      {
        id: "er-4",
        nameOfChapter: "JEE Main All India Ranker Full Mock 1",
        subject: "Full Syllabus",
        time: "180 mins (22 Oct 2026, 09:00 AM)",
        score: "216 / 300",
        rawScore: 216,
        maxScore: 300,
        percentage: 72,
        attempted: 64,
        correct: 56,
        incorrect: 8,
        date: "2026-10-22"
      }
    ]);

    // Apply saved theme immediately
    document.documentElement.setAttribute('data-theme', this.settings.theme);
  }

  load(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.warn("Storage load failed for key", key, e);
      return fallback;
    }
  }

  save(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
      this.notify();
    } catch (e) {
      console.warn("Storage save failed for key", key, e);
    }
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  notify() {
    this.subscribers.forEach(fn => fn(this));
  }

  getTodayDateString() {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }

  // Dashboard focused helpers
  getDashboardData() {
    return {
      greeting: `Good morning, ${this.user.name}.`,
      subGreeting: "Ready to continue your preparation?",
      continueCard: {
        subject: "Physics",
        chapter: "Kinematics & Motion in 1D & 2D",
        lectureTitle: "Lecture 5 — Analysis of Motion Graphs (s-t, v-t, a-t, v-x)",
        progress: 68,
        courseId: "course-jee-11-phy",
        chapterId: "ch-phy-kinematics",
        lectureId: "lec-kin-05"
      },
      todayPlan: this.plannerTasks.slice(0, 3),
      quickStats: [
        { label: "Study Time Today", val: this.user.stats.studyTimeTodayHours, highlight: true },
        { label: "Questions Solved", val: this.user.stats.questionsSolvedTotal, highlight: false },
        { label: "Average Accuracy", val: `${this.user.stats.averageAccuracyPercent}%`, highlight: true }
      ],
      upcoming: {
        title: "JEE Main All India Ranker Full Mock 1",
        date: "Sunday, 09:00 AM",
        countdown: "In 2 days",
        testId: "mock-jee-main-01"
      }
    };
  }

  // YouTube Course Builder Methods
  addLecture(courseId, chapterId, lectureData) {
    const course = this.courses.find(c => c.id === courseId);
    if (!course) return false;
    const chapter = course.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return false;

    const newLec = {
      id: `lec-custom-${Date.now()}`,
      lectureNumber: chapter.lectures.length + 1,
      title: lectureData.title || "Untitled Lecture",
      teacher: lectureData.teacher || "Guest Educator",
      channel: lectureData.channel || "Curated Lecture",
      duration: lectureData.duration || "45 min",
      youtubeId: this.extractYouTubeId(lectureData.youtubeUrl),
      completed: false,
      notes: lectureData.notes || "",
      difficulty: lectureData.difficulty || "Medium"
    };

    chapter.lectures.push(newLec);
    chapter.lectureCount = chapter.lectures.length;
    this.save(STORAGE_KEYS.COURSES, this.courses);
    return true;
  }

  extractYouTubeId(url) {
    if (!url) return "dQw4w9WgXcQ";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  }

  markLectureComplete(courseId, chapterId, lectureId, completed = true) {
    const course = this.courses.find(c => c.id === courseId);
    if (!course) return;
    const chapter = course.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return;
    const lecture = chapter.lectures.find(l => l.id === lectureId);
    if (lecture) {
      lecture.completed = completed;
      // recalculate chapter progress
      const compCount = chapter.lectures.filter(l => l.completed).length;
      chapter.progress = Math.round((compCount / chapter.lectures.length) * 100);
      this.save(STORAGE_KEYS.COURSES, this.courses);
    }
  }

  // Practice & Question methods
  recordPracticeAttempt(data) {
    const record = {
      id: `ph-${Date.now()}`,
      date: this.getTodayDateString(),
      subject: data.subject || "Physics",
      chapter: data.chapter || "General",
      total: data.total || 1,
      correct: data.correct || 0,
      wrong: data.wrong || 0,
      accuracy: Math.round(((data.correct || 0) / (data.total || 1)) * 100),
      timeSpent: data.timeSpent || "2 mins"
    };
    this.practiceHistory.unshift(record);
    this.user.stats.questionsSolvedTotal += record.total;
    this.save(STORAGE_KEYS.PRACTICE_HISTORY, this.practiceHistory);
    this.save(STORAGE_KEYS.USER, this.user);
  }

  // Mistake Book
  addMistake(question, whyGotWrong) {
    const mistake = {
      id: `mstk-${Date.now()}`,
      questionId: question.id,
      subject: question.subject,
      chapter: question.chapter,
      topic: question.topic,
      questionSnippet: question.question.slice(0, 90) + "...",
      fullQuestion: question,
      whyGotWrong: whyGotWrong || "Conceptual misunderstanding or calculation error",
      correctConcept: question.concept,
      correctSolution: question.explanation,
      date: this.getTodayDateString(),
      retryCount: 0
    };
    this.mistakes.unshift(mistake);
    this.save(STORAGE_KEYS.MISTAKES, this.mistakes);
  }

  removeMistake(id) {
    this.mistakes = this.mistakes.filter(m => m.id !== id);
    this.save(STORAGE_KEYS.MISTAKES, this.mistakes);
  }

  // Bookmarks
  toggleBookmark(item) {
    const existingIndex = this.bookmarks.findIndex(b => b.id === item.id);
    if (existingIndex > -1) {
      this.bookmarks.splice(existingIndex, 1);
    } else {
      this.bookmarks.unshift({
        id: item.id,
        type: item.type || 'resource',
        title: item.title || item.question || 'Saved Item',
        subject: item.subject || 'General',
        date: this.getTodayDateString()
      });
    }
    this.save(STORAGE_KEYS.BOOKMARKS, this.bookmarks);
  }

  isBookmarked(id) {
    return this.bookmarks.some(b => b.id === id);
  }

  // Theme switcher
  toggleTheme() {
    this.settings.theme = this.settings.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.settings.theme);
    this.save(STORAGE_KEYS.SETTINGS, this.settings);
  }

  setPlusTwoMode(enabled) {
    this.settings.plusTwoMode = enabled;
    this.save(STORAGE_KEYS.SETTINGS, this.settings);
  }

  // Planner task toggling
  togglePlannerTask(taskId) {
    const task = this.plannerTasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.save(STORAGE_KEYS.PLANNER, this.plannerTasks);
    }
  }

  addPlannerTask(task) {
    this.plannerTasks.unshift({
      id: `task-${Date.now()}`,
      date: task.date || this.getTodayDateString(),
      title: task.title,
      type: task.type || 'practice',
      time: task.time || '10:00 AM',
      completed: false
    });
    this.save(STORAGE_KEYS.PLANNER, this.plannerTasks);
    this.notify();
  }

  deletePlannerTask(taskId) {
    this.plannerTasks = this.plannerTasks.filter(t => t.id !== taskId);
    this.save(STORAGE_KEYS.PLANNER, this.plannerTasks);
    this.notify();
  }

  // Smart study schedule generator
  generateSmartSchedule(examTarget, targetDate, dailyHours, weakTopics = []) {
    const topics = weakTopics.length ? weakTopics : ["Relative Motion & Kinematics", "Chemical Bonding VSEPR", "Coordinate Geometry Lines", "Newton's Laws & Friction"];
    const newTasks = [];
    topics.forEach((topic, idx) => {
      newTasks.push({
        id: `gen-${Date.now()}-${idx}a`,
        date: this.getTodayDateString(),
        title: `Priority Review: ${topic}`,
        type: 'revision',
        time: `${9 + idx * 2}:00 AM`,
        completed: false
      });
      newTasks.push({
        id: `gen-${Date.now()}-${idx}b`,
        date: this.getTodayDateString(),
        title: `Drill 15 PYQs: ${topic}`,
        type: 'practice',
        time: `${10 + idx * 2}:30 AM`,
        completed: false
      });
    });
    this.plannerTasks = [...newTasks, ...this.plannerTasks];
    this.save(STORAGE_KEYS.PLANNER, this.plannerTasks);
    return newTasks.length;
  }

  // Revision status changer
  advanceRevision(id) {
    const rev = this.revisions.find(r => r.id === id);
    if (rev) {
      if (rev.stage < 4) {
        rev.stage += 1;
        rev.status = rev.stage >= 4 ? 'completed' : 'upcoming';
        rev.dueDate = rev.stage >= 4 ? 'Completed' : 'In 7 days';
      }
      this.save(STORAGE_KEYS.REVISIONS, this.revisions);
    }
  }

  // Downloads Folder Management
  addDownload(item) {
    if (!item.id) item.id = `dl-${Date.now()}`;
    if (!item.downloadDate) item.downloadDate = this.getTodayDateString();
    if (!item.quality) item.quality = '1080p Full HD';
    if (!item.size) item.size = '250 MB';
    this.downloads = this.downloads.filter(d => d.id !== item.id && d.title !== item.title);
    this.downloads.unshift(item);
    this.save(STORAGE_KEYS.DOWNLOADS, this.downloads);
    this.notify();
    return item;
  }

  removeDownload(id) {
    this.downloads = this.downloads.filter(d => d.id !== id);
    this.save(STORAGE_KEYS.DOWNLOADS, this.downloads);
    this.notify();
  }

  isDownloaded(titleOrId) {
    return this.downloads.some(d => d.id === titleOrId || d.title === titleOrId);
  }

  // Watched Video Reporting
  recordVideoWatched({ title, subject, chapter, part, duration }) {
    const existingIdx = this.watchHistory.findIndex(w => w.title === title && w.chapter === chapter);
    const nowStr = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const record = {
      id: `wh-${Date.now()}`,
      title: title || 'Lecture Session',
      subject: subject || 'General',
      chapter: chapter || 'Chapter Topic',
      part: part || 'Part 1',
      duration: duration || '30 mins',
      date: nowStr,
      completed: true
    };
    if (existingIdx !== -1) {
      this.watchHistory[existingIdx] = record;
    } else {
      this.watchHistory.unshift(record);
    }
    this.save(STORAGE_KEYS.WATCH_HISTORY, this.watchHistory);
    this.notify();
  }

  // Exam Attended Reporting
  recordExamAttended({ nameOfChapter, subject, time, score, rawScore, maxScore, percentage, attempted, correct, incorrect }) {
    const record = {
      id: `er-${Date.now()}`,
      nameOfChapter: nameOfChapter || 'Practice CBT Mock',
      subject: subject || 'General',
      time: time || '45 mins',
      score: score || `${rawScore || 0} / ${maxScore || 100}`,
      rawScore: rawScore || 0,
      maxScore: maxScore || 100,
      percentage: percentage !== undefined ? percentage : Math.round(((rawScore || 0) / (maxScore || 100)) * 100),
      attempted: attempted || 0,
      correct: correct || 0,
      incorrect: incorrect || 0,
      date: this.getTodayDateString()
    };
    this.examReports.unshift(record);
    this.save(STORAGE_KEYS.EXAM_REPORTS, this.examReports);
    this.notify();
    return record;
  }

  // Save CBT test attempt
  saveTestAttempt(attempt) {
    this.testAttempts.unshift(attempt);
    this.save(STORAGE_KEYS.TEST_ATTEMPTS, this.testAttempts);

    // Also automatically register to My Report (Exams Attended)
    const scoreStr = `${attempt.totalScore} / ${attempt.maxScore}`;
    const pct = attempt.maxScore > 0 ? Math.round((attempt.totalScore / attempt.maxScore) * 100) : attempt.accuracy;
    const subjName = attempt.subjectBreakdown ? Object.keys(attempt.subjectBreakdown)[0] : 'Physics';
    this.recordExamAttended({
      nameOfChapter: attempt.testTitle,
      subject: subjName || 'Full Syllabus',
      time: `${attempt.timeSpent || '45 mins'} (${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})`,
      score: scoreStr,
      rawScore: attempt.totalScore,
      maxScore: attempt.maxScore,
      percentage: pct,
      attempted: attempt.attempted,
      correct: attempt.correct,
      incorrect: attempt.incorrect
    });
  }

  // Update User Profile
  updateUserProfile(data) {
    this.user = { ...this.user, ...data };
    this.save(STORAGE_KEYS.USER, this.user);
    this.notify();
  }

  // Reset to original demo defaults
  resetToDefaults() {
    localStorage.clear();
    this.init();
    this.notify();
  }
}

export const store = new Store();
