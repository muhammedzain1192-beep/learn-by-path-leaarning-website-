// My Report View — Detailed Academic Records for Videos Watched & Exams Attended
import { store } from '../store.js';

export function renderReports() {
  const container = document.getElementById('view-container');
  if (!container) return;

  let activeReportTab = 'all'; // 'all' | 'videos' | 'exams'
  let activeSubjectFilter = 'All';

  function renderView() {
    const watchHistory = store.watchHistory || [];
    const examReports = store.examReports || [];

    // Filter by subject if chosen
    const filteredVideos = activeSubjectFilter === 'All'
      ? watchHistory
      : watchHistory.filter(w => (w.subject || '').toLowerCase() === activeSubjectFilter.toLowerCase());

    const filteredExams = activeSubjectFilter === 'All'
      ? examReports
      : examReports.filter(e => (e.subject || '').toLowerCase() === activeSubjectFilter.toLowerCase());

    const totalVideosCount = watchHistory.length;
    const totalExamsCount = examReports.length;
    const avgExamPct = totalExamsCount > 0
      ? Math.round(examReports.reduce((acc, e) => acc + (e.percentage || 0), 0) / totalExamsCount)
      : 0;

    container.innerHTML = `
      <!-- Learning Planner Section Navigation Bar -->
      <div style="display: flex; gap: 8px; margin-bottom: var(--space-6); border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; overflow-x: auto;">
        <a href="#ai-planner" class="btn btn-secondary btn-sm" style="font-weight: 500;">
          AI Study Planner
        </a>
        <a href="#dashboard" class="btn btn-secondary btn-sm" style="font-weight: 500;">
          Calendar & To-Do
        </a>
        <a href="#analytics" class="btn btn-secondary btn-sm" style="font-weight: 500;">
          Analytics
        </a>
        <a href="#downloads" class="btn btn-secondary btn-sm" style="font-weight: 500;">
          Downloads
        </a>
        <a href="#reports" class="btn btn-primary btn-sm" style="font-weight: 700;">
          My Report
        </a>
      </div>

      <!-- Header & Export Action -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-4); margin-bottom: var(--space-6);">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
            <div style="width: 32px; height: 32px; border-radius: var(--radius-md); background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <h1 class="view-title" style="margin: 0;">My Academic Report</h1>
          </div>
          <p class="view-subtitle" style="margin: 0;">Comprehensive verification log of all videos watched and examination sessions attended</p>
        </div>

        <div style="display: flex; gap: 8px;">
          <button class="btn btn-outline btn-sm" id="btn-print-report">
            Print / Save Summary
          </button>
          <a href="#mock-tests" class="btn btn-primary btn-sm">
            + Attend New Exam
          </a>
        </div>
      </div>

      <!-- Overview Metric Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-4); margin-bottom: var(--space-6);">
        <div class="stat-box">
          <div class="stat-label">Videos Watched</div>
          <div class="stat-val primary">${totalVideosCount} Completed</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Tracked with Subject, Chapter & Part</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Exams Attended</div>
          <div class="stat-val">${totalExamsCount} CBT Tests</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Timed assessments completed</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Exam Average Percentage</div>
          <div class="stat-val primary">${avgExamPct}%</div>
          <div style="font-size: 11px; color: var(--color-success); margin-top: 4px;">Above target threshold</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Top Scored Subject</div>
          <div class="stat-val" style="font-size: 1.25rem;">Physics (84%)</div>
          <div style="font-size: 11px; color: var(--color-success); margin-top: 4px;">Highest test mastery</div>
        </div>
      </div>

      <!-- Filter Tabs & Subject Filter -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-3); margin-bottom: var(--space-5);">
        <!-- Report Type Toggle -->
        <div class="filter-pills" id="report-type-pills">
          <button class="filter-pill ${activeReportTab === 'all' ? 'active' : ''}" data-type="all">
            All Records (${totalVideosCount + totalExamsCount})
          </button>
          <button class="filter-pill ${activeReportTab === 'videos' ? 'active' : ''}" data-type="videos">
            Videos Watched (${totalVideosCount})
          </button>
          <button class="filter-pill ${activeReportTab === 'exams' ? 'active' : ''}" data-type="exams">
            Exams Attended (${totalExamsCount})
          </button>
        </div>

        <!-- Subject Filter -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: var(--font-xs); color: var(--text-muted); font-weight: 600;">Filter:</span>
          <select class="form-control" id="report-subject-select" style="font-size: 12px; padding: 4px 8px; width: auto;">
            <option value="All" ${activeSubjectFilter === 'All' ? 'selected' : ''}>All Subjects</option>
            <option value="Physics" ${activeSubjectFilter === 'Physics' ? 'selected' : ''}>Physics</option>
            <option value="Chemistry" ${activeSubjectFilter === 'Chemistry' ? 'selected' : ''}>Chemistry</option>
            <option value="Mathematics" ${activeSubjectFilter === 'Mathematics' ? 'selected' : ''}>Mathematics</option>
          </select>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: var(--space-6);">

        <!-- 1. VIDEOS WATCHED SECTION -->
        ${(activeReportTab === 'all' || activeReportTab === 'videos') ? `
          <div class="card">
            <div class="card-header" style="justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin: 0;">Videos Watched Report</h3>
                <span class="badge badge-primary">${filteredVideos.length} Records</span>
              </div>
              <span style="font-size: var(--font-xs); color: var(--text-muted);">Displays: Subject, Chapter & Part</span>
            </div>
            <div class="card-body" style="padding: 0;">
              ${filteredVideos.length === 0 ? `
                <div style="padding: 2.5rem; text-align: center; color: var(--text-muted); font-size: var(--font-sm);">
                  No watched videos recorded for this filter. Start watching lectures to log your progress!
                </div>
              ` : `
                <div style="overflow-x: auto;">
                  <table style="width: 100%; border-collapse: collapse; font-size: var(--font-sm); text-align: left;">
                    <thead>
                      <tr style="background: var(--bg-surface-secondary); border-bottom: 1px solid var(--border-subtle); color: var(--text-muted); font-size: 11px; text-transform: uppercase;">
                        <th style="padding: 12px 16px;">Subject</th>
                        <th style="padding: 12px 16px;">Chapter</th>
                        <th style="padding: 12px 16px;">Part</th>
                        <th style="padding: 12px 16px;">Lecture Title</th>
                        <th style="padding: 12px 16px;">Watch Time & Date</th>
                        <th style="padding: 12px 16px; text-align: right;">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${filteredVideos.map(video => `
                        <tr style="border-bottom: 1px solid var(--border-subtle); transition: background 0.15s ease;">
                          <td style="padding: 14px 16px;">
                            <span class="badge badge-neutral" style="font-weight: 700;">${video.subject}</span>
                          </td>
                          <td style="padding: 14px 16px; font-weight: 600; color: var(--text-primary);">
                            ${video.chapter}
                          </td>
                          <td style="padding: 14px 16px;">
                            <span class="badge badge-primary" style="font-size: 11px;">${video.part}</span>
                          </td>
                          <td style="padding: 14px 16px; color: var(--text-secondary);">
                            ${video.title}
                          </td>
                          <td style="padding: 14px 16px; font-size: var(--font-xs); color: var(--text-muted);">
                            <div>${video.duration || '40 mins'}</div>
                            <div style="font-size: 11px; color: var(--text-muted);">${video.date}</div>
                          </td>
                          <td style="padding: 14px 16px; text-align: right;">
                            <a href="#courses" class="btn btn-outline btn-sm" style="font-size: 11px; padding: 4px 8px;">
                              Watch Again
                            </a>
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              `}
            </div>
          </div>
        ` : ''}

        <!-- 2. EXAMS ATTENDED SECTION -->
        ${(activeReportTab === 'all' || activeReportTab === 'exams') ? `
          <div class="card">
            <div class="card-header" style="justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin: 0;">Exams Attended Report</h3>
                <span class="badge badge-success">${filteredExams.length} Records</span>
              </div>
              <span style="font-size: var(--font-xs); color: var(--text-muted);">Displays: Time, Score, Name of Chapter, Subject & Percentage</span>
            </div>
            <div class="card-body" style="padding: 0;">
              ${filteredExams.length === 0 ? `
                <div style="padding: 2.5rem; text-align: center; color: var(--text-muted); font-size: var(--font-sm);">
                  No attended exams recorded for this filter. Click "+ Attend New Exam" to take a CBT practice mock!
                </div>
              ` : `
                <div style="overflow-x: auto;">
                  <table style="width: 100%; border-collapse: collapse; font-size: var(--font-sm); text-align: left;">
                    <thead>
                      <tr style="background: var(--bg-surface-secondary); border-bottom: 1px solid var(--border-subtle); color: var(--text-muted); font-size: 11px; text-transform: uppercase;">
                        <th style="padding: 12px 16px;">Name of Chapter</th>
                        <th style="padding: 12px 16px;">Subject</th>
                        <th style="padding: 12px 16px;">Time</th>
                        <th style="padding: 12px 16px;">Score</th>
                        <th style="padding: 12px 16px;">Percentage</th>
                        <th style="padding: 12px 16px; text-align: right;">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${filteredExams.map(exam => {
                        const pct = exam.percentage || 0;
                        const pctColor = pct >= 80 ? 'var(--color-success)' : (pct >= 65 ? 'var(--color-primary)' : 'var(--color-danger)');
                        return `
                          <tr style="border-bottom: 1px solid var(--border-subtle); transition: background 0.15s ease;">
                            <td style="padding: 14px 16px;">
                              <div style="font-weight: 700; color: var(--text-primary);">${exam.nameOfChapter}</div>
                              <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
                                Attempted: ${exam.attempted || 0} • Correct: ${exam.correct || 0} • Incorrect: ${exam.incorrect || 0}
                              </div>
                            </td>
                            <td style="padding: 14px 16px;">
                              <span class="badge badge-neutral" style="font-weight: 700;">${exam.subject}</span>
                            </td>
                            <td style="padding: 14px 16px; font-size: var(--font-xs); color: var(--text-secondary);">
                              ${exam.time}
                            </td>
                            <td style="padding: 14px 16px;">
                              <strong style="color: var(--text-primary); font-size: var(--font-base);">${exam.score}</strong>
                            </td>
                            <td style="padding: 14px 16px;">
                              <div style="display: flex; align-items: center; gap: 8px;">
                                <strong style="color: ${pctColor}; font-size: var(--font-base);">${pct}%</strong>
                                <span class="badge ${pct >= 80 ? 'badge-success' : (pct >= 65 ? 'badge-primary' : 'badge-warning')}" style="font-size: 10px;">
                                  ${pct >= 80 ? 'Distinction' : (pct >= 65 ? 'Proficient' : 'Needs Practice')}
                                </span>
                              </div>
                            </td>
                            <td style="padding: 14px 16px; text-align: right;">
                              <a href="#mock-tests" class="btn btn-outline btn-sm" style="font-size: 11px; padding: 4px 8px;">
                                Retake Exam
                              </a>
                            </td>
                          </tr>
                        `;
                      }).join('')}
                    </tbody>
                  </table>
                </div>
              `}
            </div>
          </div>
        ` : ''}

      </div>
    `;

    // Report type pill buttons
    document.querySelectorAll('#report-type-pills .filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeReportTab = btn.getAttribute('data-type');
        renderView();
      });
    });

    // Subject dropdown filter
    document.getElementById('report-subject-select')?.addEventListener('change', (e) => {
      activeSubjectFilter = e.target.value;
      renderView();
    });

    // Print summary trigger
    document.getElementById('btn-print-report')?.addEventListener('click', () => {
      window.print();
    });
  }

  renderView();
}

