// Kerala Plus Two Dedicated Preparation Hub
import { store } from '../store.js';

export function renderPlusTwo() {
  const container = document.getElementById('view-container');
  if (!container) return;

  let activeWeightage = 'All'; // 'All' | '1-mark' | '2-mark' | '3-mark' | '5-mark'
  let activeSubject = 'Physics';

  function updateView() {
    container.innerHTML = `
      <div class="view-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="view-title">Kerala Plus Two Board Hub (DHSE)</h1>
            <span class="badge badge-accent">60/60 Target Score</span>
          </div>
          <p class="view-subtitle">Tailored preparation for Kerala Higher Secondary Board with SCERT derivations and weightage-wise question drills</p>
        </div>
        <a href="#test-room/mock-kerala-plus-two-01" class="btn btn-primary btn-sm">
          Launch Kerala Board Model Exam (60 Marks)
        </a>
      </div>

      <!-- Subject Selection Row -->
      <div class="filter-pills" id="plus-two-subjects" style="margin-bottom: var(--space-5);">
        ${['Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'English'].map(sub => `
          <button class="filter-pill ${activeSubject === sub ? 'active' : ''}" data-subject="${sub}">
            ${sub}
          </button>
        `).join('')}
      </div>

      <!-- Weightage-wise question filter tabs -->
      <div class="tabs-nav" id="weightage-tabs">
        ${['All', '1-mark', '2-mark', '3-mark', '5-mark'].map(w => `
          <button class="tab-btn ${activeWeightage === w ? 'active' : ''}" data-weightage="${w}">
            ${w === 'All' ? 'All Weightages' : `${w.replace('-', ' ')} Questions`}
          </button>
        `).join('')}
      </div>

      <!-- 3-Column Core Features Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-6); margin-bottom: var(--space-8);">
        <div class="card card-hover" style="border-left: 4px solid var(--color-primary);">
          <div class="card-body">
            <span class="badge badge-primary" style="margin-bottom: 6px;">SCERT Blueprint</span>
            <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">
              5-Mark Guaranteed Derivations
            </h3>
            <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-bottom: 12px;">
              Gauss's Law applications, Lens Maker's formula, Cyclotron principle, and Wheatstone bridge derivations.
            </p>
            <a href="#player/course-kerala-12/ch-kerala-electrostatics/lec-scert-01" class="btn btn-outline btn-sm">Watch Derivations →</a>
          </div>
        </div>

        <div class="card card-hover" style="border-left: 4px solid #D97706;">
          <div class="card-body">
            <span class="badge badge-warning" style="margin-bottom: 6px;">DHSE Previous Papers</span>
            <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">
              Official March Board Papers
            </h3>
            <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-bottom: 12px;">
              Solved papers from 2024, 2023, 2022, 2021 with official DHSE valuation schemes.
            </p>
            <a href="#pyq" class="btn btn-secondary btn-sm">Access Board PYQs →</a>
          </div>
        </div>

        <div class="card card-hover" style="border-left: 4px solid #059669;">
          <div class="card-body">
            <span class="badge badge-accent" style="margin-bottom: 6px;">Board Model Tests</span>
            <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">
              Timed Model Examinations
            </h3>
            <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-bottom: 12px;">
              2-hour full syllabus timed drills with Section A, B, C, D question patterns.
            </p>
            <a href="#test-room/mock-kerala-plus-two-01" class="btn btn-primary btn-sm">Start Timed Model →</a>
          </div>
        </div>
      </div>

      <!-- Plus Two Chapter Curriculum -->
      <div class="card">
        <div class="card-header">
          <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary);">
            Kerala Plus Two — ${activeSubject} Chapter Breakdown
          </h3>
          <span style="font-size: var(--font-xs); color: var(--text-muted);">SCERT Kerala Syllabus</span>
        </div>
        <div class="card-body">
          <div style="display: flex; flex-direction: column; gap: var(--space-4);">
            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-4); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h4 style="font-size: var(--font-sm); font-weight: 700; color: var(--text-primary);">1. Electric Charges & Fields</h4>
                <div style="font-size: var(--font-xs); color: var(--text-secondary);">Weightage: 6 Marks • Focus: Gauss's Law & Dipole derivations</div>
              </div>
              <a href="#practice" class="btn btn-outline btn-sm">Practice 1 & 2 Mark Questions</a>
            </div>

            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-4); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h4 style="font-size: var(--font-sm); font-weight: 700; color: var(--text-primary);">2. Electrostatic Potential & Capacitance</h4>
                <div style="font-size: var(--font-xs); color: var(--text-secondary);">Weightage: 5 Marks • Focus: Parallel Plate Capacitor with Dielectric</div>
              </div>
              <a href="#practice" class="btn btn-outline btn-sm">Practice 1 & 2 Mark Questions</a>
            </div>

            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-4); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h4 style="font-size: var(--font-sm); font-weight: 700; color: var(--text-primary);">3. Current Electricity</h4>
                <div style="font-size: var(--font-xs); color: var(--text-secondary);">Weightage: 7 Marks • Focus: Kirchhoff's Rules, Wheatstone & Meter Bridge</div>
              </div>
              <a href="#practice" class="btn btn-outline btn-sm">Practice 1 & 2 Mark Questions</a>
            </div>
          </div>
        </div>
      </div>
    `;

    document.querySelectorAll('#plus-two-subjects .filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeSubject = btn.getAttribute('data-subject');
        updateView();
      });
    });

    document.querySelectorAll('#weightage-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeWeightage = btn.getAttribute('data-weightage');
        updateView();
      });
    });
  }

  updateView();
}
