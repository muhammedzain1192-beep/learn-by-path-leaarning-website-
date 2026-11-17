// Previous Year Questions (PYQ) Vault organized by Exam, Year, Subject & Chapter
import { store } from '../store.js';

export function renderPYQ() {
  const container = document.getElementById('view-container');
  if (!container) return;

  let activeExam = 'JEE Main';
  let activeYear = 'All';

  function updateView() {
    const examsList = ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'MET', 'Kerala Plus Two'];
    const yearsList = ['All', '2025', '2024', '2023', '2022', '2021', '2020'];

    const pyqs = store.questions.filter(q => {
      const matchExam = q.exam.toLowerCase().includes(activeExam.toLowerCase());
      const matchYear = activeYear === 'All' || String(q.year) === activeYear;
      return matchExam && matchYear;
    });

    container.innerHTML = `
      <div class="view-header">
        <h1 class="view-title">Previous Year Questions (PYQs)</h1>
        <p class="view-subtitle">Official past papers categorized by exam pattern, year of release, and chapter</p>
      </div>

      <!-- Exam Selection Tabs -->
      <div class="tabs-nav">
        ${examsList.map(exam => `
          <button class="tab-btn ${activeExam === exam ? 'active' : ''}" data-exam="${exam}">
            ${exam}
          </button>
        `).join('')}
      </div>

      <!-- Year Filter Pills -->
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: var(--space-6); flex-wrap: wrap;">
        <span style="font-size: var(--font-xs); font-weight: 700; color: var(--text-secondary);">YEAR:</span>
        <div class="filter-pills">
          ${yearsList.map(year => `
            <button class="filter-pill ${activeYear === year ? 'active' : ''}" data-year="${year}">
              ${year}
            </button>
          `).join('')}
        </div>
        <div style="margin-left: auto; font-size: var(--font-xs); color: var(--text-muted);">
          Found <strong>${pyqs.length}</strong> official PYQs
        </div>
      </div>

      <!-- PYQ List Cards -->
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        ${pyqs.map((q, idx) => `
          <div class="card card-hover" style="padding: var(--space-5);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge badge-primary">${q.exam} ${q.year || ''}</span>
                <span class="badge badge-neutral">${q.subject}</span>
                <span style="font-size: var(--font-xs); font-weight: 700; color: var(--text-primary);">${q.chapter}</span>
              </div>
              <span class="badge badge-warning">${q.difficulty}</span>
            </div>

            <div style="font-size: var(--font-sm); font-weight: 500; color: var(--text-primary); margin: 8px 0 12px 0; line-height: 1.5;">
              ${q.question}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: var(--font-xs); color: var(--text-muted);">Core Concept: <strong>${q.concept}</strong></span>
              <a href="#practice" class="btn btn-primary btn-sm">Solve in Practice Mode →</a>
            </div>
          </div>
        `).join('')}

        ${!pyqs.length ? `
          <div class="empty-state">
            <div class="empty-state-title">No PYQs found for this filter</div>
            <div class="empty-state-desc">Try choosing "All" years or switching to another exam tab.</div>
          </div>
        ` : ''}
      </div>
    `;

    document.querySelectorAll('.tabs-nav .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeExam = btn.getAttribute('data-exam');
        updateView();
      });
    });

    document.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeYear = btn.getAttribute('data-year');
        updateView();
      });
    });
  }

  updateView();
}
