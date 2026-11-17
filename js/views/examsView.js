// Exams Hub View — Official Eligibility, Syllabus & Strategy for Target Exams
import { store } from '../store.js';

export function renderExams() {
  const container = document.getElementById('view-container');
  if (!container) return;

  let selectedExamId = store.exams[0].id;

  function updateView() {
    const selectedExam = store.exams.find(e => e.id === selectedExamId) || store.exams[0];

    container.innerHTML = `
      <div class="view-header">
        <h1 class="view-title">Target Examinations Hub</h1>
        <p class="view-subtitle">Official blueprints, eligibility criteria, and targeted resource links for engineering entrances & boards</p>
      </div>

      <!-- Exam Selection Cards / Horizontal Tabs -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: var(--space-3); margin-bottom: var(--space-6);">
        ${store.exams.map(exam => `
          <button class="card card-hover" style="
            padding: var(--space-4);
            text-align: left;
            cursor: pointer;
            border-color: ${selectedExamId === exam.id ? 'var(--color-primary)' : 'var(--border-subtle)'};
            background-color: ${selectedExamId === exam.id ? 'var(--color-primary-subtle)' : 'var(--bg-surface)'};
          " data-exam-select="${exam.id}">
            <div style="font-size: var(--font-sm); font-weight: 700; color: ${selectedExamId === exam.id ? 'var(--color-primary)' : 'var(--text-primary)'};">
              ${exam.name}
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
              ${exam.fullName.slice(0, 24)}...
            </div>
          </button>
        `).join('')}
      </div>

      <!-- Detailed Exam Dossier -->
      <div class="card" style="border: 1px solid var(--border-default);">
        <div class="card-header" style="background-color: var(--bg-surface-secondary); flex-wrap: wrap; gap: 1rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h2 style="font-size: var(--font-lg); font-weight: 800; color: var(--text-primary);">${selectedExam.name}</h2>
              <span class="badge badge-accent">Last Updated: ${selectedExam.lastUpdated}</span>
            </div>
            <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-top: 2px;">
              ${selectedExam.fullName} • Conducted by ${selectedExam.conductedBy}
            </p>
          </div>

          <div style="display: flex; gap: 8px;">
            <a href="#mock-tests" class="btn btn-primary btn-sm">Take ${selectedExam.name} Mock Test</a>
            <a href="#pyq" class="btn btn-secondary btn-sm">View PYQs</a>
          </div>
        </div>

        <div class="card-body" style="display: flex; flex-direction: column; gap: var(--space-6);">
          <!-- Overview -->
          <div>
            <h4 style="font-size: var(--font-xs); font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">Overview</h4>
            <p style="font-size: var(--font-sm); color: var(--text-primary); line-height: 1.6;">${selectedExam.overview}</p>
          </div>

          <!-- Eligibility & Criteria -->
          <div>
            <h4 style="font-size: var(--font-xs); font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">Eligibility & Qualifying Criteria</h4>
            <div style="background-color: var(--bg-surface-secondary); padding: var(--space-4); border-radius: var(--radius-md); font-size: var(--font-sm); color: var(--text-primary); line-height: 1.5; border-left: 3px solid var(--color-primary);">
              ${selectedExam.eligibility}
            </div>
          </div>

          <!-- Exam Pattern & Marking Scheme -->
          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: var(--space-4);">
            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-4);">
              <h4 style="font-size: var(--font-xs); font-weight: 700; text-transform: uppercase; color: var(--color-primary); margin-bottom: 4px;">Exam Pattern (CBT)</h4>
              <p style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${selectedExam.examPattern}</p>
            </div>
            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-4);">
              <h4 style="font-size: var(--font-xs); font-weight: 700; text-transform: uppercase; color: var(--color-primary); margin-bottom: 4px;">Marking Scheme</h4>
              <p style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${selectedExam.markingScheme}</p>
            </div>
          </div>

          <!-- Syllabus Highlights -->
          <div>
            <h4 style="font-size: var(--font-xs); font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">Key Syllabus Blueprint</h4>
            <ul style="padding-left: 1.2rem; font-size: var(--font-sm); color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
              ${selectedExam.syllabus.map(s => `<li>${s}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;

    document.querySelectorAll('[data-exam-select]').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedExamId = btn.getAttribute('data-exam-select');
        updateView();
      });
    });
  }

  updateView();
}
