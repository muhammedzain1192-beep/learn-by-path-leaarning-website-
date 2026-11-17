// Header Component for Z-Learn
import { store } from '../store.js';

export function renderHeader() {
  const headerEl = document.getElementById('header');
  if (!headerEl) return;

  headerEl.innerHTML = `
    <!-- Left Section: Mobile Menu & Breadcrumbs / Title -->
    <div style="display: flex; align-items: center; gap: 1rem;">
      <button id="mobile-menu-btn" class="btn btn-ghost btn-sm" style="display: none; padding: 6px;" title="Open Menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      
      <!-- Global Search Quick Trigger -->
      <button id="global-search-trigger" class="btn btn-secondary btn-sm" style="
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 260px;
        justify-content: space-between;
        background: var(--bg-surface-secondary);
        border: 1px solid var(--border-default);
        color: var(--text-secondary);
      ">
        <span style="display: flex; align-items: center; gap: 6px;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span>Search courses, PYQs, topics...</span>
        </span>
        <kbd style="font-size: 11px; padding: 2px 6px; background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 4px; font-family: var(--font-mono);">Ctrl K</kbd>
      </button>
    </div>

    <!-- Right Section: Quick Actions & Profile -->
    <div style="display: flex; align-items: center; gap: 12px;">
      <!-- Quick Build Course Button -->
      <button id="quick-add-lecture-btn" class="btn btn-outline btn-sm" style="display: flex; align-items: center; gap: 6px;">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <span>Add Lecture</span>
      </button>

      <!-- Plus Two Fast Mode Switcher -->
      <a href="#plus-two" class="badge badge-primary" style="text-decoration: none; cursor: pointer; padding: 5px 10px;">
        Kerala Plus Two Hub
      </a>

      <!-- Dark Mode Switcher -->
      <button id="theme-toggle-btn" class="btn btn-ghost btn-sm btn-icon-only" title="Toggle Light/Dark Theme">
        <svg id="theme-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          ${store.settings.theme === 'dark' 
            ? '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>' 
            : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
          }
        </svg>
      </button>

      <!-- User Avatar / Profile Quick Link -->
      <a href="#profile" style="display: flex; align-items: center; gap: 8px; text-decoration: none;">
        <div style="width: 34px; height: 34px; border-radius: var(--radius-full); background: var(--color-primary-subtle); border: 2px solid var(--color-primary-border); display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--color-primary); font-size: 13px;">
          Z
        </div>
        <span style="font-size: var(--font-sm); font-weight: 600; color: var(--text-primary); display: none; @media (min-width: 900px){ display: inline; }">Zain</span>
      </a>
    </div>
  `;

  // Attach events
  document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
    store.toggleTheme();
    renderHeader();
  });

  document.getElementById('global-search-trigger')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-search-modal'));
  });

  document.getElementById('quick-add-lecture-btn')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-add-lecture-modal'));
  });

  // Mobile menu button
  const mobileBtn = document.getElementById('mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.style.display = window.innerWidth <= 768 ? 'inline-flex' : 'none';
    mobileBtn.addEventListener('click', () => {
      document.getElementById('sidebar')?.classList.toggle('open');
      document.querySelector('.sidebar-backdrop')?.classList.toggle('active');
    });
  }
}
