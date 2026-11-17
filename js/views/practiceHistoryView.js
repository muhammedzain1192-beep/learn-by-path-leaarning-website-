// Practice History — Dedicated attempt log and performance audit
import { store } from '../store.js';

export function renderPracticeHistory() {
  const container = document.getElementById('view-container');
  if (!container) return;

  const history = store.practiceHistory;

  container.innerHTML = `
    <div class="view-header" style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h1 class="view-title">Practice History</h1>
        <p class="view-subtitle">Chronological record of question sessions, accuracy trends, and pace</p>
      </div>
      <a href="#practice" class="btn btn-primary btn-sm">Start New Practice Session</a>
    </div>

    <!-- Summary metrics row -->
    <div class="quick-stats-row" style="margin-bottom: var(--space-6);">
      <div class="stat-box">
        <div class="stat-label">Total Practice Sessions</div>
        <div class="stat-val primary">${history.length}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Total Questions Solved</div>
        <div class="stat-val">${history.reduce((acc, h) => acc + h.total, 0)}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Average Session Accuracy</div>
        <div class="stat-val primary">
          ${history.length ? Math.round(history.reduce((acc, h) => acc + h.accuracy, 0) / history.length) : 0}%
        </div>
      </div>
    </div>

    <!-- History Table -->
    <div class="card">
      <div class="card-header">
        <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary);">Session Logs</h3>
        <span style="font-size: var(--font-xs); color: var(--text-secondary);">${history.length} records logged</span>
      </div>

      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: var(--font-sm);">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-subtle); background-color: var(--bg-surface-secondary); color: var(--text-secondary); font-size: var(--font-xs); text-transform: uppercase;">
              <th style="padding: 12px 16px;">Date</th>
              <th style="padding: 12px 16px;">Subject</th>
              <th style="padding: 12px 16px;">Chapter</th>
              <th style="padding: 12px 16px;">Questions</th>
              <th style="padding: 12px 16px;">Correct</th>
              <th style="padding: 12px 16px;">Wrong</th>
              <th style="padding: 12px 16px;">Accuracy</th>
              <th style="padding: 12px 16px;">Time</th>
              <th style="padding: 12px 16px; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${history.map(item => `
              <tr style="border-bottom: 1px solid var(--border-subtle); transition: background var(--transition-fast);" onmouseover="this.style.backgroundColor='var(--bg-surface-hover)'" onmouseout="this.style.backgroundColor='transparent'">
                <td style="padding: 12px 16px; font-family: var(--font-mono); font-size: var(--font-xs); color: var(--text-muted);">${item.date}</td>
                <td style="padding: 12px 16px; font-weight: 600; color: var(--color-primary);">${item.subject}</td>
                <td style="padding: 12px 16px; color: var(--text-primary); font-weight: 500;">${item.chapter}</td>
                <td style="padding: 12px 16px; font-weight: 700;">${item.total}</td>
                <td style="padding: 12px 16px; color: var(--color-success); font-weight: 700;">${item.correct}</td>
                <td style="padding: 12px 16px; color: var(--color-danger); font-weight: 700;">${item.wrong}</td>
                <td style="padding: 12px 16px;">
                  <span class="badge ${item.accuracy >= 75 ? 'badge-accent' : (item.accuracy >= 50 ? 'badge-warning' : 'badge-danger')}">
                    ${item.accuracy}%
                  </span>
                </td>
                <td style="padding: 12px 16px; color: var(--text-secondary); font-size: var(--font-xs);">${item.timeSpent}</td>
                <td style="padding: 12px 16px; text-align: right;">
                  <a href="#practice" class="btn btn-ghost btn-sm" style="font-size: var(--font-xs);">Re-practice →</a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
