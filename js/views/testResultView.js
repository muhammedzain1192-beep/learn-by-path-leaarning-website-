// Test Result & Performance Scorecard View
import { store } from '../store.js';

export function renderTestResult(params) {
  const container = document.getElementById('view-container');
  if (!container) return;

  const attemptId = params && params[0];
  const attempts = store.testAttempts || [];
  const attempt = (attemptId ? attempts.find(a => a.id === attemptId) : null) || attempts[0];

  if (!attempt) {
    container.innerHTML = `
      <div class="greeting-banner" style="background-color: var(--color-primary-subtle); border-color: var(--color-primary-border);">
        <div>
          <span class="badge badge-primary" style="margin-bottom: 6px;">Official Performance Scorecard</span>
          <h1 style="font-size: var(--font-xl); font-weight: 800; color: var(--color-primary);">No Test Results Found</h1>
          <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-top: 4px;">You have not completed any mock tests yet.</p>
        </div>
        <div>
          <a href="#mock-tests" class="btn btn-primary btn-sm">Take a Mock Test →</a>
        </div>
      </div>
      <div class="card" style="padding: var(--space-8); text-align: center; margin-top: var(--space-6);">
        <p style="color: var(--text-secondary); margin-bottom: var(--space-4);">Complete a simulated Computer Based Test (CBT) to view detailed scorecards, percentile predictions, and subject breakdowns.</p>
        <a href="#mock-tests" class="btn btn-primary">Browse All Mock Tests</a>
      </div>
    `;
    return;
  }

  const weakTopics = Array.isArray(attempt.weakTopics) ? attempt.weakTopics : [];
  const subjectBreakdown = attempt.subjectBreakdown || {};
  const mistakesCount = (store.mistakes && store.mistakes.length) || 0;

  container.innerHTML = `
    <!-- Top Result Banner -->
    <div class="greeting-banner" style="background-color: var(--color-primary-subtle); border-color: var(--color-primary-border);">
      <div>
        <span class="badge badge-primary" style="margin-bottom: 6px;">Official Performance Scorecard</span>
        <h1 style="font-size: var(--font-xl); font-weight: 800; color: var(--color-primary);">${attempt.testTitle || 'Mock Examination'}</h1>
        <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-top: 4px;">Attempted on ${attempt.date || 'Recent'} • Simulated CBT Evaluation</p>
      </div>
      <div style="display: flex; gap: 8px;">
        <a href="#mock-tests" class="btn btn-secondary btn-sm">All Mock Tests</a>
        <a href="#analytics" class="btn btn-primary btn-sm">Full Analytics →</a>
      </div>
    </div>

    <!-- Core Score Overview Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-4); margin-bottom: var(--space-6);">
      <div class="stat-box" style="border-left: 4px solid var(--color-primary);">
        <div class="stat-label">Total Score</div>
        <div class="stat-val primary">${attempt.totalScore ?? 0} / ${attempt.maxScore ?? 0}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Predicted Percentile</div>
        <div class="stat-val primary">${attempt.percentile ?? 0}%ile</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Overall Accuracy</div>
        <div class="stat-val">${attempt.accuracy ?? 0}%</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Attempt Summary</div>
        <div style="font-size: var(--font-sm); margin-top: 4px; color: var(--text-secondary);">
          <span style="color: var(--color-success); font-weight: 700;">${attempt.correct ?? 0} Correct</span> • 
          <span style="color: var(--color-danger); font-weight: 700;">${attempt.incorrect ?? 0} Wrong</span> • 
          <span>${attempt.unattempted ?? 0} Left</span>
        </div>
      </div>
    </div>

    <!-- Two-column deep dive -->
    <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: var(--space-6); margin-bottom: var(--space-6);">
      <!-- Subject-wise performance -->
      <div class="card">
        <div class="card-header">
          <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary);">Subject Performance Breakdown</h3>
          <span style="font-size: var(--font-xs); color: var(--text-muted);">Scaled to 100 Marks each</span>
        </div>
        <div class="card-body">
          <div style="display: flex; flex-direction: column; gap: var(--space-4);">
            ${Object.keys(subjectBreakdown).length ? Object.entries(subjectBreakdown).map(([subj, stats]) => {
              const pct = stats.max > 0 ? Math.round((stats.score / stats.max) * 100) : 0;
              return `
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: var(--font-sm); font-weight: 600; margin-bottom: 4px;">
                    <span>${subj}</span>
                    <span style="color: var(--color-primary);">${stats.score} / ${stats.max} pts (${pct}%)</span>
                  </div>
                  <div class="progress-track" style="height: 8px;">
                    <div class="progress-fill" style="width: ${pct}%;"></div>
                  </div>
                  <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
                    ${stats.correct} correct, ${stats.incorrect} wrong, ${stats.attempted} attempted
                  </div>
                </div>
              `;
            }).join('') : `<p style="font-size: var(--font-xs); color: var(--text-muted);">No subject breakdown available.</p>`}
          </div>
        </div>
      </div>

      <!-- Weak topics & Recommended Revision -->
      <div class="card">
        <div class="card-header">
          <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary);">Actionable Insights</h3>
          <span class="badge badge-warning">Priority Fixes</span>
        </div>
        <div class="card-body">
          <h4 style="font-size: var(--font-xs); font-weight: 700; text-transform: uppercase; color: var(--color-danger); margin-bottom: 8px;">
            Identified Weak Topics
          </h4>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: var(--space-6);">
            ${weakTopics.length ? weakTopics.map(t => `
              <div style="padding: 8px 12px; background-color: var(--color-danger-bg); border: 1px solid var(--color-danger-border); border-radius: var(--radius-md); font-size: var(--font-xs); font-weight: 600; color: var(--color-danger);">
                ${t}
              </div>
            `).join('') : `<div style="font-size: var(--font-xs); color: var(--color-success); font-weight: 600;">No significant weak topics detected!</div>`}
          </div>

          <h4 style="font-size: var(--font-xs); font-weight: 700; text-transform: uppercase; color: var(--color-primary); margin-bottom: 8px;">
            Recommended Next Actions
          </h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <a href="#practice" class="btn btn-outline btn-sm" style="text-align: left; justify-content: flex-start;">
              Targeted Practice in Weak Areas →
            </a>
            <a href="#revision" class="btn btn-secondary btn-sm" style="text-align: left; justify-content: flex-start;">
              Add to Spaced Revision Schedule →
            </a>
            <a href="#mistake-book" class="btn btn-ghost btn-sm" style="text-align: left; justify-content: flex-start;">
              Review Mistake Book (${mistakesCount}) →
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}
