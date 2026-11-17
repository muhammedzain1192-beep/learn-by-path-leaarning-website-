// Mistake Book View — In-depth analysis of errors and conceptual blindspots
import { store } from '../store.js';

export function renderMistakeBook() {
  const container = document.getElementById('view-container');
  if (!container) return;

  let activeCategory = 'All';

  function updateView() {
    const mistakes = store.mistakes.filter(m => activeCategory === 'All' || m.subject === activeCategory);

    // Calculate frequently wrong topics
    const topicFrequency = {};
    store.mistakes.forEach(m => {
      topicFrequency[m.topic] = (topicFrequency[m.topic] || 0) + 1;
    });
    const frequentTopics = Object.entries(topicFrequency).sort((a, b) => b[1] - a[1]);

    container.innerHTML = `
      <div class="view-header">
        <h1 class="view-title">Mistake Book</h1>
        <p class="view-subtitle">Turn your weaknesses into strengths by analyzing why an error occurred and re-testing</p>
      </div>

      <!-- Frequently Wrong Topics Alert Banner -->
      <div class="frequently-wrong-container">
        <div style="display: flex; align-items: center; gap: 8px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-warning);"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span style="font-weight: 700; font-size: var(--font-sm); color: #92400E;">Frequently Wrong Topics (Needs Urgent Revision)</span>
        </div>
        <p style="font-size: var(--font-xs); color: #92400E; margin-top: 4px;">
          The system detected repetitive mistakes in these specific topics during practice and mock tests:
        </p>
        <div class="wrong-topic-tags">
          ${frequentTopics.map(([topic, count]) => `
            <span class="badge badge-warning" style="padding: 4px 10px; font-size: 11px;">
              ${topic} (${count} errors)
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="tabs-nav">
        ${['All', 'Physics', 'Chemistry', 'Mathematics'].map(cat => `
          <button class="tab-btn ${activeCategory === cat ? 'active' : ''}" data-cat="${cat}">
            ${cat === 'All' ? 'All Subjects' : cat} (${store.mistakes.filter(m => cat === 'All' || m.subject === cat).length})
          </button>
        `).join('')}
      </div>

      <!-- Mistake List -->
      ${!mistakes.length ? `
        <div class="empty-state">
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          <div class="empty-state-title">No mistakes logged in this category!</div>
          <div class="empty-state-desc">When you solve questions and mark an incorrect option, it will automatically be cataloged here for revision.</div>
          <a href="#practice" class="btn btn-primary btn-sm">Solve Questions Now</a>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${mistakes.map(m => `
            <div class="mistake-card">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div style="display: flex; gap: 8px; align-items: center;">
                  <span class="badge badge-danger">${m.subject}</span>
                  <span style="font-size: var(--font-xs); font-weight: 700; color: var(--text-primary);">${m.chapter}</span>
                  <span style="font-size: var(--font-xs); color: var(--text-muted);">• ${m.topic}</span>
                </div>
                <span style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">${m.date}</span>
              </div>

              <!-- Question snippet -->
              <div style="font-weight: 600; font-size: var(--font-sm); color: var(--text-primary); margin-bottom: 12px; background: var(--bg-surface-secondary); padding: 10px 14px; border-radius: var(--radius-md);">
                ${m.questionSnippet}
              </div>

              <!-- Why I got it wrong -->
              <div style="margin-bottom: 8px; font-size: var(--font-xs);">
                <strong style="color: var(--color-danger);">Why I Got It Wrong:</strong>
                <span style="color: var(--text-secondary); margin-left: 4px;">${m.whyGotWrong}</span>
              </div>

              <!-- Correct Concept -->
              <div style="margin-bottom: 12px; font-size: var(--font-xs);">
                <strong style="color: var(--color-primary);">Correct Core Concept:</strong>
                <span style="color: var(--text-secondary); margin-left: 4px;">${m.correctConcept}</span>
              </div>

              <!-- Actions row -->
              <div style="display: flex; justify-content: space-between; align-items: center; pt-2; border-top: 1px solid var(--border-subtle); padding-top: 10px;">
                <div style="font-size: 11px; color: var(--text-muted);">
                  Retried <strong>${m.retryCount || 0}</strong> times
                </div>
                <div style="display: flex; gap: 8px;">
                  <button class="btn btn-secondary btn-sm retry-btn" data-id="${m.id}">
                    Retry Question
                  </button>
                  <button class="btn btn-ghost btn-sm remove-btn" data-id="${m.id}" title="Remove when mastered">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    `;

    // Category button clicks
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-cat');
        updateView();
      });
    });

    // Remove mistake
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        store.removeMistake(id);
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: "Item removed from Mistake Book.", type: "info" } }));
        updateView();
      });
    });

    // Retry action
    document.querySelectorAll('.retry-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        location.hash = '#practice';
      });
    });
  }

  updateView();
}
