// Sidebar Component for Z-Learn with Collapsible & Mobile Drawer Support
import { store } from '../store.js';

export function renderSidebar(currentRoute) {
  const sidebarEl = document.getElementById('sidebar');
  if (!sidebarEl) return;

  const navItems = [
    { route: 'courses', label: 'Learn (Courses)', icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>' },
    { route: 'dashboard', label: 'Calendar & To-Do', icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
    { route: 'ai-planner', label: 'AI Study Planner', icon: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>' },
    { route: 'analytics', label: 'Analytics', icon: '<path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>' },
    { route: 'downloads', label: 'Downloads', icon: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>' },
    { route: 'reports', label: 'My Report', icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>' },
    { route: 'exams', label: 'Exams', icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
    { route: 'add-class', label: 'Add YouTube Class', icon: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>' }
  ];

  const bottomItems = [
    { route: 'profile', label: 'Profile', icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
    { route: 'settings', label: 'Settings', icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>' }
  ];

  sidebarEl.innerHTML = `
    <!-- Top Branding Logo -->
    <div style="padding: 1.25rem 1.25rem 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle);">
      <a href="#dashboard" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
        <img src="assets/logo.svg" alt="Z-Learn Logo" style="width: 32px; height: 32px; flex-shrink: 0;" />
        <span class="sidebar-brand-text" style="font-size: 1.15rem; font-weight: 800; color: var(--color-primary); letter-spacing: -0.03em;">Z-Learn</span>
      </a>
      <button id="sidebar-collapse-toggle" class="btn btn-ghost btn-sm" title="Toggle Sidebar" style="padding: 4px; border-radius: 6px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
    </div>

    <!-- Main Navigation List -->
    <div style="flex: 1; padding: 0.75rem 0.5rem; display: flex; flex-direction: column; gap: 2px;">
      ${navItems.map(item => {
        const isActive = currentRoute === item.route || (item.route === 'courses' && currentRoute === 'course') || (item.route === 'dashboard' && !currentRoute);
        return `
          <a href="#${item.route}" class="sidebar-link ${isActive ? 'active' : ''}" title="${item.label}" style="
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 12px;
            border-radius: var(--radius-md);
            font-size: var(--font-sm);
            font-weight: ${isActive ? '600' : '500'};
            color: ${isActive ? 'var(--color-primary)' : 'var(--text-secondary)'};
            background-color: ${isActive ? 'var(--color-primary-subtle)' : 'transparent'};
            text-decoration: none;
            transition: all var(--transition-fast);
          ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;">
              ${item.icon}
            </svg>
            <span class="sidebar-link-text">${item.label}</span>
          </a>
        `;
      }).join('')}
    </div>

    <!-- Bottom Secondary Navigation -->
    <div style="padding: 0.75rem 0.5rem; border-top: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 2px;">
      ${bottomItems.map(item => {
        const isActive = currentRoute === item.route;
        return `
          <a href="#${item.route}" class="sidebar-link ${isActive ? 'active' : ''}" title="${item.label}" style="
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 12px;
            border-radius: var(--radius-md);
            font-size: var(--font-sm);
            font-weight: ${isActive ? '600' : '500'};
            color: ${isActive ? 'var(--color-primary)' : 'var(--text-secondary)'};
            background-color: ${isActive ? 'var(--color-primary-subtle)' : 'transparent'};
            text-decoration: none;
            transition: all var(--transition-fast);
          ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;">
              ${item.icon}
            </svg>
            <span class="sidebar-link-text">${item.label}</span>
          </a>
        `;
      }).join('')}
    </div>
  `;

  // Attach toggle event
  const toggleBtn = document.getElementById('sidebar-collapse-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sidebarEl.classList.toggle('collapsed');
      const isCollapsed = sidebarEl.classList.contains('collapsed');
      document.querySelectorAll('.sidebar-link-text, .sidebar-brand-text').forEach(el => {
        el.style.display = isCollapsed ? 'none' : 'inline';
      });
    });
  }
}
