// Settings View — Theme preferences, study configuration, and data backup
import { store } from '../store.js';

export function renderSettings() {
  const container = document.getElementById('view-container');
  if (!container) return;

  container.innerHTML = `
    <div class="view-header">
      <h1 class="view-title">Settings & Preferences</h1>
      <p class="view-subtitle">Manage appearance themes, study modes, notifications, and local data persistence</p>
    </div>

    <div style="max-width: 800px; display: flex; flex-direction: column; gap: var(--space-6);">
      <!-- 1. Appearance Section -->
      <div class="card">
        <div class="card-header">
          <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary);">Appearance & Theme</h3>
          <span class="badge badge-primary">Deep Green Identity</span>
        </div>
        <div class="card-body">
          <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-bottom: var(--space-4);">
            Z-Learn retains its deep emerald signature accent across all themes for eye comfort during long study nights.
          </p>
          <div style="display: flex; gap: var(--space-4);">
            <button class="btn ${store.settings.theme === 'light' ? 'btn-primary' : 'btn-secondary'} btn-sm theme-btn" data-theme="light">
              Light Mode (Default)
            </button>
            <button class="btn ${store.settings.theme === 'dark' ? 'btn-primary' : 'btn-secondary'} btn-sm theme-btn" data-theme="dark">
              Dark Mode (Night Study)
            </button>
          </div>
        </div>
      </div>

      <!-- 2. Study Preferences -->
      <div class="card">
        <div class="card-header">
          <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary);">Study Preferences</h3>
        </div>
        <div class="card-body" style="display: flex; flex-direction: column; gap: var(--space-4);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 600; font-size: var(--font-sm); color: var(--text-primary);">Auto-play Next Lecture in Curriculum</div>
              <div style="font-size: var(--font-xs); color: var(--text-secondary);">Seamlessly transition to next video in chapter list</div>
            </div>
            <input type="checkbox" checked style="width: 20px; height: 20px; accent-color: var(--color-primary);" />
          </div>

          <div style="border-top: 1px solid var(--border-subtle); padding-top: var(--space-4); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 600; font-size: var(--font-sm); color: var(--text-primary);">Kerala Plus Two Board Quick Access</div>
              <div style="font-size: var(--font-xs); color: var(--text-secondary);">Show dedicated Plus Two banner in top navigation header</div>
            </div>
            <input type="checkbox" checked style="width: 20px; height: 20px; accent-color: var(--color-primary);" />
          </div>
        </div>
      </div>

      <!-- 3. Local Data Management -->
      <div class="card">
        <div class="card-header">
          <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary);">Data Storage & Reset</h3>
          <span class="badge badge-neutral">Local Browser Storage</span>
        </div>
        <div class="card-body">
          <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.5;">
            All your lecture progress, custom added YouTube videos, mistake book entries, and CBT test results are safely stored in your browser's persistent storage.
          </p>

          <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" id="export-data-btn">
              Export Progress Backup (JSON)
            </button>
            <button class="btn btn-danger btn-sm" id="reset-defaults-btn">
              Reset All Progress to Seed Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Theme buttons
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      if (theme !== store.settings.theme) {
        store.toggleTheme();
        renderSettings();
      }
    });
  });

  // Export Data
  document.getElementById('export-data-btn')?.addEventListener('click', () => {
    const backup = {
      user: store.user,
      courses: store.courses,
      mistakes: store.mistakes,
      bookmarks: store.bookmarks,
      testAttempts: store.testAttempts
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zlearn-backup-${store.getTodayDateString()}.json`;
    a.click();
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: "Backup downloaded successfully!", type: "success" } }));
  });

  // Reset to defaults
  document.getElementById('reset-defaults-btn')?.addEventListener('click', () => {
    if (confirm("Reset all custom progress and restore initial seed data?")) {
      store.resetToDefaults();
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: "Reset to default demo state.", type: "info" } }));
      location.hash = "#dashboard";
    }
  });
}
