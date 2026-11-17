// Bookmarks View — Dedicated repository for all saved items
import { store } from '../store.js';

export function renderBookmarks() {
  const container = document.getElementById('view-container');
  if (!container) return;

  let activeTab = 'All';

  function updateView() {
    const tabs = ['All', 'lecture', 'question', 'resource'];
    const bookmarks = store.bookmarks.filter(b => activeTab === 'All' || b.type === activeTab);

    container.innerHTML = `
      <div class="view-header">
        <h1 class="view-title">Saved Bookmarks</h1>
        <p class="view-subtitle">Quick access to bookmarked video lectures, tricky questions, and formula sheets</p>
      </div>

      <!-- Bookmark Filter Tabs -->
      <div class="tabs-nav">
        ${tabs.map(tab => `
          <button class="tab-btn ${activeTab === tab ? 'active' : ''}" data-tab="${tab}">
            ${tab === 'All' ? 'All Bookmarks' : (tab.charAt(0).toUpperCase() + tab.slice(1) + 's')} 
            (${store.bookmarks.filter(b => tab === 'All' || b.type === tab).length})
          </button>
        `).join('')}
      </div>

      <!-- Bookmarks List -->
      ${!bookmarks.length ? `
        <div class="empty-state">
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          <div class="empty-state-title">No bookmarks saved yet</div>
          <div class="empty-state-desc">Click the bookmark icon on any lecture or question to pin it here for quick reference.</div>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${bookmarks.map(item => `
            <div class="card card-hover" style="padding: var(--space-4) var(--space-5);">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span class="badge ${item.type === 'lecture' ? 'badge-primary' : (item.type === 'question' ? 'badge-warning' : 'badge-neutral')}" style="text-transform: capitalize;">
                    ${item.type}
                  </span>
                  <div>
                    <h4 style="font-size: var(--font-sm); font-weight: 700; color: var(--text-primary); margin-bottom: 2px;">
                      ${item.title}
                    </h4>
                    <div style="font-size: var(--font-xs); color: var(--text-muted);">
                      ${item.subject} • Saved on ${item.date}
                    </div>
                  </div>
                </div>

                <div style="display: flex; gap: 8px;">
                  <a href="${item.type === 'lecture' ? '#courses' : '#practice'}" class="btn btn-outline btn-sm">
                    Open Item →
                  </a>
                  <button class="btn btn-ghost btn-sm remove-bookmark-btn" data-id="${item.id}" title="Remove Bookmark">
                    ✕
                  </button>
                </div>
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

    document.querySelectorAll('.remove-bookmark-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        store.toggleBookmark({ id });
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: "Bookmark removed.", type: "info" } }));
        updateView();
      });
    });
  }

  updateView();
}
