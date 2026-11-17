// My Learning View — Dedicated progress tracker for active courses
import { store } from '../store.js';

export function renderMyLearning() {
  const container = document.getElementById('view-container');
  if (!container) return;

  container.innerHTML = `
    <div class="view-header">
      <h1 class="view-title">My Learning</h1>
      <p class="view-subtitle">Track your enrolled courses, current chapters, and completion milestones</p>
    </div>

    <!-- Clean Slate State -->
    <div class="card" style="padding: 3rem 2rem; text-align: center; color: var(--text-secondary); background: var(--bg-surface-secondary); border: 2px dashed var(--border-default); border-radius: var(--radius-lg); margin-bottom: var(--space-8);">
      <h3 style="font-size: var(--font-lg); font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Your Learning Space is Ready</h3>
      <p style="font-size: var(--font-sm); color: var(--text-secondary); max-width: 480px; margin: 0 auto 20px auto;">
        All demo chapters and progress have been cleared. Select any course to add your chapters and track your curriculum.
      </p>
      <a href="#courses" class="btn btn-primary" style="padding: 10px 20px;">Browse Courses →</a>
    </div>
  `;
}
