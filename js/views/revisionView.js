// Spaced Repetition Revision Tracker View
import { store } from '../store.js';

export function renderRevision() {
  const container = document.getElementById('view-container');
  if (!container) return;

  let activeTab = 'due_today'; // 'due_today' | 'upcoming' | 'completed'

  function updateView() {
    const revisions = store.revisions.filter(r => r.status === activeTab);

    container.innerHTML = `
      <div class="view-header">
        <h1 class="view-title">Spaced Repetition & Revision</h1>
        <p class="view-subtitle">Scientific spaced intervals (Day 1 → Day 3 → Day 7 → Day 21) preventing memory decay</p>
      </div>

      <!-- Revision Status Tabs -->
      <div class="tabs-nav">
        <button class="tab-btn ${activeTab === 'due_today' ? 'active' : ''}" data-tab="due_today">
          Due Today (${store.revisions.filter(r => r.status === 'due_today').length})
        </button>
        <button class="tab-btn ${activeTab === 'upcoming' ? 'active' : ''}" data-tab="upcoming">
          Upcoming (${store.revisions.filter(r => r.status === 'upcoming').length})
        </button>
        <button class="tab-btn ${activeTab === 'completed' ? 'active' : ''}" data-tab="completed">
          Completed Masteries (${store.revisions.filter(r => r.status === 'completed').length})
        </button>
      </div>

      <!-- Revision Items List -->
      ${!revisions.length ? `
        <div class="empty-state">
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
          <div class="empty-state-title">No revision sessions in this category</div>
          <div class="empty-state-desc">You are all caught up for today! Great job staying ahead of forgetting curves.</div>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${revisions.map(item => `
            <div class="card card-hover" style="padding: var(--space-5);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                  <span class="badge badge-primary" style="margin-bottom: 4px;">${item.subject}</span>
                  <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin-top: 4px;">
                    ${item.topic}
                  </h3>
                  <div style="font-size: var(--font-xs); color: var(--text-muted);">${item.chapter}</div>
                </div>
                <div style="text-align: right;">
                  <span class="badge ${item.status === 'due_today' ? 'badge-warning' : 'badge-neutral'}">
                    ${item.dueDate}
                  </span>
                  <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Next: ${item.nextDue}</div>
                </div>
              </div>

              <!-- Spaced Repetition Progression Timeline (Stages 1 to 4) -->
              <div style="margin: var(--space-4) 0; background-color: var(--bg-surface-secondary); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <div style="font-size: var(--font-xs); font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">
                  Spaced Repetition Stages:
                </div>
                <div style="display: flex; align-items: center; gap: 8px; font-size: var(--font-xs);">
                  <span style="color: var(--color-success); font-weight: 600;">✓ Learned</span>
                  <span style="color: var(--text-muted);">→</span>
                  <span style="color: ${item.stage >= 1 ? 'var(--color-success)' : 'var(--text-muted)'}; font-weight: ${item.stage === 1 ? '700' : '500'};">
                    ${item.stage >= 1 ? '✓' : '○'} Revision 1
                  </span>
                  <span style="color: var(--text-muted);">→</span>
                  <span style="color: ${item.stage >= 2 ? (item.stage === 2 && item.status === 'due_today' ? 'var(--color-primary)' : 'var(--color-success)') : 'var(--text-muted)'}; font-weight: ${item.stage === 2 ? '700' : '500'};">
                    ${item.stage >= 2 ? '✓' : '○'} Revision 2 ${item.stage === 2 && item.status === 'due_today' ? '(Today)' : ''}
                  </span>
                  <span style="color: var(--text-muted);">→</span>
                  <span style="color: ${item.stage >= 3 ? 'var(--color-success)' : 'var(--text-muted)'}; font-weight: ${item.stage === 3 ? '700' : '500'};">
                    ${item.stage >= 3 ? '✓' : '○'} Revision 3
                  </span>
                  <span style="color: var(--text-muted);">→</span>
                  <span style="color: ${item.stage >= 4 ? 'var(--color-success)' : 'var(--text-muted)'}; font-weight: ${item.stage === 4 ? '700' : '500'};">
                    ${item.stage >= 4 ? '✓' : '○'} Revision 4 (Mastered)
                  </span>
                </div>
              </div>

              <!-- Action Bar -->
              <div style="display: flex; justify-content: flex-end; gap: 8px;">
                ${item.stage < 4 ? `
                  <button class="btn btn-primary btn-sm advance-rev-btn" data-id="${item.id}">
                    ✓ Complete This Revision Stage
                  </button>
                ` : `
                  <span class="badge badge-accent" style="padding: 6px 12px;">Topic Fully Mastered</span>
                `}
                <a href="#practice" class="btn btn-secondary btn-sm">Solve 5 Review Questions</a>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    `;

    document.querySelectorAll('.tabs-nav .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        updateView();
      });
    });

    document.querySelectorAll('.advance-rev-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        store.advanceRevision(id);
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: "Revision completed! Advanced to next cycle.", type: "success" } }));
        updateView();
      });
    });
  }

  updateView();
}
