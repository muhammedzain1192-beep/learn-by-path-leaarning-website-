// Analytics View — Comprehensive Overall & Subject-by-Subject Academic Analytics
import { store } from '../store.js';

export function renderAnalytics() {
  const container = document.getElementById('view-container');
  if (!container) return;

  const totalStudyHours = 142;
  const questionsSolved = store.user.stats.questionsSolvedTotal || 148;
  const accuracy = store.user.stats.averageAccuracyPercent || 78;
  const lecturesCompleted = store.watchHistory ? store.watchHistory.length : 4;
  const examsAttended = store.examReports ? store.examReports.length : 4;

  const weekDays = [
    { day: "Mon", hours: 4.5, height: 75 },
    { day: "Tue", hours: 5.2, height: 86 },
    { day: "Wed", hours: 6.0, height: 100 },
    { day: "Thu", hours: 3.8, height: 63 },
    { day: "Fri", hours: 5.5, height: 91 },
    { day: "Sat", hours: 7.2, height: 120 },
    { day: "Sun", hours: 6.5, height: 108 }
  ];

  const subjectsData = {
    Physics: {
      studyHours: "48.5 hrs",
      lecturesWatched: 24,
      practiceAccuracy: 82,
      examAverage: 80,
      strongTopics: [
        { name: "1D Kinematics & Calculus Derivatives", score: "94%" },
        { name: "Gauss's Theorem & Flux Derivations", score: "91%" },
        { name: "Work, Energy & Conservative Forces", score: "88%" }
      ],
      weakTopics: [
        { name: "Relative Motion (2D River Swimmer)", score: "48%" },
        { name: "Two-Block Friction Systems", score: "54%" }
      ],
      chapters: [
        { name: "Kinematics & Motion in 1D & 2D", mastery: 85 },
        { name: "Laws of Motion & Friction", mastery: 65 },
        { name: "Work, Energy & Power", mastery: 88 },
        { name: "Electrostatics & Potential", mastery: 90 }
      ]
    },
    Chemistry: {
      studyHours: "42.0 hrs",
      lecturesWatched: 21,
      practiceAccuracy: 79,
      examAverage: 76,
      strongTopics: [
        { name: "Periodic Table Trends & Ionization", score: "89%" },
        { name: "VSEPR Molecular Geometry", score: "86%" },
        { name: "Chemical Thermodynamics Reversibility", score: "82%" }
      ],
      weakTopics: [
        { name: "Coordination Compounds Isomerism", score: "52%" },
        { name: "Ionic Equilibrium Buffer Calculations", score: "56%" }
      ],
      chapters: [
        { name: "Chemical Bonding & Molecular Structure", mastery: 84 },
        { name: "Thermodynamics & Thermochemistry", mastery: 72 },
        { name: "Periodic Classification of Elements", mastery: 89 },
        { name: "Solutions & Colligative Properties", mastery: 78 }
      ]
    },
    Mathematics: {
      studyHours: "51.5 hrs",
      lecturesWatched: 26,
      practiceAccuracy: 68,
      examAverage: 68,
      strongTopics: [
        { name: "Matrices, Determinants & System of Equations", score: "88%" },
        { name: "Limits, Continuity & Differentiability", score: "85%" },
        { name: "Vector Algebra & Dot/Cross Products", score: "82%" }
      ],
      weakTopics: [
        { name: "Definite Integrals as Limit of Sum", score: "52%" },
        { name: "Parabola Tangency & Normal Locus", score: "58%" }
      ],
      chapters: [
        { name: "Straight Lines & Pair of Straight Lines", mastery: 70 },
        { name: "Conic Sections (Parabola, Ellipse, Hyperbola)", mastery: 62 },
        { name: "Differential Calculus & Derivatives", mastery: 78 },
        { name: "Integral Calculus & Areas", mastery: 64 }
      ]
    },
    "Kerala Plus Two": {
      studyHours: "28.0 hrs",
      lecturesWatched: 18,
      practiceAccuracy: 91,
      examAverage: 92,
      strongTopics: [
        { name: "Electric Field 5-Mark Derivations", score: "96%" },
        { name: "Wave Optics Huygens Wavefront Construction", score: "92%" },
        { name: "Organic Conversion Schemes", score: "89%" }
      ],
      weakTopics: [
        { name: "Electromagnetic Induction AC Generator", score: "72%" }
      ],
      chapters: [
        { name: "Plus Two Physics Core Board Derivations", mastery: 94 },
        { name: "Plus Two Chemistry Name Reactions", mastery: 88 },
        { name: "Plus Two Mathematics Calculus Mastery", mastery: 90 }
      ]
    }
  };

  let activeSubjectTab = "All";

  function renderContent() {
    container.innerHTML = `
      <!-- Learning Planner Section Navigation Bar -->
      <div style="display: flex; gap: 8px; margin-bottom: var(--space-6); border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; overflow-x: auto;">
        <a href="#ai-planner" class="btn btn-secondary btn-sm" style="font-weight: 500;">
          AI Study Planner
        </a>
        <a href="#dashboard" class="btn btn-secondary btn-sm" style="font-weight: 500;">
          Calendar & To-Do
        </a>
        <a href="#analytics" class="btn btn-primary btn-sm" style="font-weight: 700;">
          Analytics
        </a>
        <a href="#downloads" class="btn btn-secondary btn-sm" style="font-weight: 500;">
          Downloads
        </a>
        <a href="#reports" class="btn btn-secondary btn-sm" style="font-weight: 500;">
          My Report
        </a>
      </div>

      <!-- Header -->
      <div class="view-header" style="margin-bottom: var(--space-6);">
        <h1 class="view-title">Academic Analytics & Performance</h1>
        <p class="view-subtitle">Detailed subject-by-subject analytics, overall examination performance, and chapter mastery tracking</p>
      </div>

      <!-- 1. Overall Performance Metric Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-4); margin-bottom: var(--space-6);">
        <div class="stat-box">
          <div class="stat-label">Total Study Time</div>
          <div class="stat-val primary">${totalStudyHours} hrs</div>
          <div style="font-size: 11px; color: var(--color-success); margin-top: 4px;">Overall engagement across all subjects</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Overall Accuracy</div>
          <div class="stat-val primary">${accuracy}%</div>
          <div style="font-size: 11px; color: var(--color-success); margin-top: 4px;">Based on ${questionsSolved} questions solved</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Exams Attended</div>
          <div class="stat-val">${examsAttended}</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">76.5% average CBT exam score</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Videos Watched</div>
          <div class="stat-val">${lecturesCompleted}</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Recorded in study history</div>
        </div>
      </div>

      <!-- 2. Study Velocity & Overall Subject Comparison -->
      <div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: var(--space-6); margin-bottom: var(--space-6);">
        <!-- Weekly Study Time Chart -->
        <div class="card">
          <div class="card-header">
            <div>
              <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin: 0;">Weekly Study Velocity</h3>
              <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-top: 2px;">Daily active study hours (Mon–Sun)</p>
            </div>
            <span style="font-size: var(--font-xs); font-weight: 700; color: var(--color-primary);">38.7 hrs this week</span>
          </div>
          <div class="card-body">
            <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 160px; padding: 10px 10px 0 10px; border-bottom: 1px solid var(--border-subtle);">
              ${weekDays.map(item => `
                <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; width: 38px;">
                  <span style="font-size: 11px; font-weight: 600; color: var(--text-secondary);">${item.hours}h</span>
                  <div style="
                    width: 24px;
                    height: ${item.height}px;
                    background-color: var(--color-primary);
                    border-radius: 4px 4px 0 0;
                    transition: height 0.3s ease;
                  "></div>
                  <span style="font-size: var(--font-xs); font-weight: 600; color: var(--text-muted); margin-top: 4px;">${item.day}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Overall Performance by Subject -->
        <div class="card">
          <div class="card-header">
            <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin: 0;">Overall Performance by Subject</h3>
            <span style="font-size: var(--font-xs); color: var(--text-muted);">Accuracy Benchmark</span>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: var(--space-4); justify-content: center;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: var(--font-sm); margin-bottom: 4px;">
                <span style="font-weight: 600;">Physics (Mechanics & Waves)</span>
                <strong style="color: var(--color-primary);">82%</strong>
              </div>
              <div class="progress-track"><div class="progress-fill" style="width: 82%;"></div></div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; font-size: var(--font-sm); margin-bottom: 4px;">
                <span style="font-weight: 600;">Chemistry (Inorganic & Physical)</span>
                <strong style="color: var(--color-primary);">79%</strong>
              </div>
              <div class="progress-track"><div class="progress-fill" style="width: 79%;"></div></div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; font-size: var(--font-sm); margin-bottom: 4px;">
                <span style="font-weight: 600;">Mathematics (Calculus & Coordinate Geometry)</span>
                <strong style="color: var(--color-primary);">68%</strong>
              </div>
              <div class="progress-track"><div class="progress-fill" style="width: 68%;"></div></div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; font-size: var(--font-sm); margin-bottom: 4px;">
                <span style="font-weight: 600;">Kerala Plus Two Board Modules</span>
                <strong style="color: var(--color-primary);">91%</strong>
              </div>
              <div class="progress-track"><div class="progress-fill" style="width: 91%;"></div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Subject-Specific Deep Dive Analytics Section -->
      <div class="card" style="margin-bottom: var(--space-6);">
        <div class="card-header" style="flex-direction: column; align-items: flex-start; gap: 12px;">
          <div>
            <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin: 0;">Each Subject Analytics</h3>
            <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-top: 2px;">Select a subject to inspect watch hours, chapter masteries, exam averages, and strong/weak concepts</p>
          </div>

          <!-- Subject Selector Tabs -->
          <div class="filter-pills" id="subject-analytics-pills">
            ${['All', 'Physics', 'Chemistry', 'Mathematics', 'Kerala Plus Two'].map(sub => `
              <button class="filter-pill ${activeSubjectTab === sub ? 'active' : ''}" data-subject="${sub}">
                ${sub === 'All' ? 'All Subjects' : sub}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="card-body">
          <div style="display: flex; flex-direction: column; gap: var(--space-6);">
            ${Object.keys(subjectsData)
              .filter(subKey => activeSubjectTab === 'All' || activeSubjectTab === subKey)
              .map(subKey => {
                const sub = subjectsData[subKey];
                return `
                  <div style="background: var(--bg-surface-secondary); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: var(--space-5);">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: var(--space-4);">
                      <div>
                        <h4 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin: 0;">${subKey} Analytics</h4>
                        <span style="font-size: var(--font-xs); color: var(--text-secondary);">${sub.studyHours} Total Time • ${sub.lecturesWatched} Lectures Watched</span>
                      </div>
                      <div style="display: flex; gap: 8px;">
                        <span class="badge badge-primary">Practice Accuracy: ${sub.practiceAccuracy}%</span>
                        <span class="badge badge-success">Exam Avg: ${sub.examAverage}%</span>
                      </div>
                    </div>

                    <!-- Chapters Mastery Grid -->
                    <div style="margin-bottom: var(--space-4);">
                      <div style="font-size: var(--font-xs); font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">Chapter Masteries</div>
                      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-3);">
                        ${sub.chapters.map(ch => `
                          <div style="background: var(--bg-surface); padding: 10px 14px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                            <div style="display: flex; justify-content: space-between; font-size: var(--font-xs); font-weight: 600; margin-bottom: 4px;">
                              <span style="color: var(--text-primary);">${ch.name}</span>
                              <span style="color: var(--color-primary);">${ch.mastery}%</span>
                            </div>
                            <div class="progress-track"><div class="progress-fill" style="width: ${ch.mastery}%;"></div></div>
                          </div>
                        `).join('')}
                      </div>
                    </div>

                    <!-- Strong & Weak Topics -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
                      <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-md); border-left: 3px solid var(--color-success);">
                        <div style="font-size: 11px; font-weight: 700; color: var(--color-success); text-transform: uppercase; margin-bottom: 6px;">Strong Topics (>80%)</div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                          ${sub.strongTopics.map(t => `
                            <div style="display: flex; justify-content: space-between; font-size: var(--font-xs); color: var(--text-secondary);">
                              <span>${t.name}</span>
                              <strong style="color: var(--color-success);">${t.score}</strong>
                            </div>
                          `).join('')}
                        </div>
                      </div>

                      <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-md); border-left: 3px solid var(--color-danger);">
                        <div style="font-size: 11px; font-weight: 700; color: var(--color-danger); text-transform: uppercase; margin-bottom: 6px;">Weak Topics (Priority Fix)</div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                          ${sub.weakTopics.map(t => `
                            <div style="display: flex; justify-content: space-between; font-size: var(--font-xs); color: var(--text-secondary);">
                              <span>${t.name}</span>
                              <strong style="color: var(--color-danger);">${t.score}</strong>
                            </div>
                          `).join('')}
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
          </div>
        </div>
      </div>
    `;

    // Subject switcher pills
    document.querySelectorAll('#subject-analytics-pills .filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeSubjectTab = btn.getAttribute('data-subject');
        renderContent();
      });
    });
  }

  renderContent();
}
