// Mock Tests Catalog View
import { store } from '../store.js';

export function renderMockTests() {
  const container = document.getElementById('view-container');
  if (!container) return;

  const tests = store.mockTests;

  container.innerHTML = `
    <div class="view-header">
      <h1 class="view-title">Mock Tests</h1>
      <p class="view-subtitle">Full-length Computer Based Test (CBT) simulations adhering strictly to official NTA/Board patterns</p>
    </div>

    <!-- Exam Guidelines Banner -->
    <div style="background-color: var(--bg-surface-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: var(--space-4) var(--space-6); margin-bottom: var(--space-6); display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-primary); flex-shrink: 0;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <span style="font-size: var(--font-sm); color: var(--text-secondary);">
          Tests run in distraction-free CBT mode. Timer runs continuously, answers are auto-saved, and full analytics generate immediately upon submission.
        </span>
      </div>
      <a href="#analytics" class="btn btn-ghost btn-sm" style="white-space: nowrap;">Past Scorecards →</a>
    </div>

    <!-- Mock Test Cards Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: var(--space-6);">
      ${tests.map(test => `
        <div class="card card-hover">
          <div class="card-header" style="background-color: var(--bg-surface-secondary);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge badge-primary">${test.exam}</span>
              <span class="badge badge-warning">${test.difficulty}</span>
            </div>
            <span style="font-size: var(--font-xs); font-family: var(--font-mono); color: var(--text-muted);">${test.durationMinutes} mins</span>
          </div>

          <div class="card-body">
            <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
              ${test.title}
            </h3>
            <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.5;">
              ${test.description}
            </p>

            <!-- Test Parameters Grid -->
            <div style="background-color: var(--bg-surface-secondary); border-radius: var(--radius-md); padding: var(--space-3) var(--space-4); margin-bottom: var(--space-4); display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: var(--font-xs);">
              <div>
                <span style="color: var(--text-muted);">Questions:</span>
                <strong style="color: var(--text-primary); display: block;">${test.totalQuestions} Questions</strong>
              </div>
              <div>
                <span style="color: var(--text-muted);">Max Marks:</span>
                <strong style="color: var(--text-primary); display: block;">${test.maxMarks} Marks</strong>
              </div>
              <div style="grid-column: span 2;">
                <span style="color: var(--text-muted);">Marking Scheme:</span>
                <span style="color: var(--color-primary); font-weight: 600; display: block;">${test.markingScheme}</span>
              </div>
            </div>

            <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: var(--space-4);">
              ${test.subjects.map(s => `<span class="badge badge-neutral">${s}</span>`).join('')}
            </div>

            <a href="#test-room/${test.id}" class="btn btn-primary" style="width: 100%;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>Start Test (CBT Hall)</span>
            </a>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
