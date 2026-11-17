// Profile View — Clean student profile & target examinations
import { store } from '../store.js';

export function renderProfile() {
  const container = document.getElementById('view-container');
  if (!container) return;

  function renderView() {
    const user = store.user;
    const initials = user.name
      ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      : 'MZ';

    container.innerHTML = `
      <div class="view-header">
        <h1 class="view-title">Student Profile</h1>
        <p class="view-subtitle">Your preparation credentials, target entrance milestones, and academic statistics</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: var(--space-6); align-items: start;">
        <!-- Profile Card -->
        <div class="card" style="text-align: center; padding: var(--space-6);">
          <div style="width: 80px; height: 80px; border-radius: var(--radius-full); background-color: var(--color-primary-subtle); border: 3px solid var(--color-primary-border); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 800; color: var(--color-primary); margin: 0 auto var(--space-4) auto; letter-spacing: 1px;">
            ${initials}
          </div>
          <h2 style="font-size: var(--font-lg); font-weight: 800; color: var(--text-primary); margin-bottom: 2px;">
            ${user.name}
          </h2>
          <div style="font-size: var(--font-xs); color: var(--text-secondary); margin-bottom: 4px; word-break: break-all;">
            <a href="mailto:${user.email || 'muhammedzain1192@gmail.com'}" style="color: var(--text-secondary); text-decoration: none;">
              ${user.email || 'muhammedzain1192@gmail.com'}
            </a>
          </div>
          <div style="font-size: var(--font-xs); color: var(--color-primary); font-weight: 600; margin-bottom: var(--space-4);">
            ${user.classLevel || 'Class 12 / Dropper'}
          </div>

          <div style="border-top: 1px solid var(--border-subtle); padding-top: var(--space-4); display: flex; flex-direction: column; gap: 8px; text-align: left; font-size: var(--font-xs);">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-muted);">Daily Study Target:</span>
              <strong>${(user.studyGoalMinutes || 360) / 60} Hours / day</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-muted);">Streak:</span>
              <strong style="color: var(--color-success);">14 Days Active</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-muted);">Status:</span>
              <span class="badge badge-success" style="font-size: 10px;">Active Aspirant</span>
            </div>
          </div>

          <button id="open-edit-profile-btn" class="btn btn-outline btn-sm" style="width: 100%; margin-top: var(--space-5);">
            Edit Profile Credentials
          </button>
        </div>

        <!-- Target Exams & Summary -->
        <div style="display: flex; flex-direction: column; gap: var(--space-6);">
          <div class="card">
            <div class="card-header">
              <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary);">Target Examinations</h3>
              <span class="badge badge-primary">${(user.targetExams || []).length} Selected</span>
            </div>
            <div class="card-body">
              <div style="display: flex; flex-wrap: wrap; gap: var(--space-3);">
                ${(user.targetExams || []).map(ex => `
                  <div style="background: var(--bg-surface-secondary); border: 1px solid var(--border-subtle); padding: 10px 16px; border-radius: var(--radius-md); font-size: var(--font-sm); font-weight: 600; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                    <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--color-primary);"></span>
                    <span>${ex}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Enrolled Course Masteries -->
          <div class="card">
            <div class="card-header">
              <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary);">Active Enrolled Curriculums</h3>
              <a href="#courses" style="font-size: var(--font-xs); font-weight: 600;">Browse Catalog →</a>
            </div>
            <div class="card-body">
              <div style="display: flex; flex-direction: column; gap: var(--space-4);">
                ${store.courses.map(c => `
                  <div>
                    <div style="display: flex; justify-content: space-between; font-size: var(--font-sm); font-weight: 600; margin-bottom: 4px;">
                      <span>${c.title}</span>
                      <span style="color: var(--color-primary);">${c.progress}%</span>
                    </div>
                    <div class="progress-track"><div class="progress-fill" style="width: ${c.progress}%;"></div></div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('open-edit-profile-btn')?.addEventListener('click', () => {
      openEditProfileModal();
    });
  }

  function openEditProfileModal() {
    const user = store.user;
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content" onclick="event.stopPropagation()" style="max-width: 480px;">
        <div class="modal-header">
          <div>
            <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin: 0;">Edit Student Profile</h3>
            <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-top: 2px;">Update your personal student credentials</p>
          </div>
          <button class="btn btn-ghost btn-sm" id="close-profile-modal">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-control" id="edit-user-name" value="${user.name || 'Muhammed Zain'}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-control" id="edit-user-email" value="${user.email || 'muhammedzain1192@gmail.com'}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Academic Level</label>
            <input type="text" class="form-control" id="edit-user-class" value="${user.classLevel || 'Class 12 / Dropper'}" />
          </div>
          <div class="form-group">
            <label class="form-label">Daily Study Target (Hours)</label>
            <input type="number" class="form-control" id="edit-user-hours" value="${(user.studyGoalMinutes || 360) / 60}" min="1" max="16" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="cancel-profile-btn">Cancel</button>
          <button class="btn btn-primary" id="save-profile-btn">Save Changes</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => modal.remove();
    modal.querySelector('#close-profile-modal')?.addEventListener('click', closeModal);
    modal.querySelector('#cancel-profile-btn')?.addEventListener('click', closeModal);

    modal.querySelector('#save-profile-btn')?.addEventListener('click', () => {
      const name = modal.querySelector('#edit-user-name').value.trim() || 'Muhammed Zain';
      const email = modal.querySelector('#edit-user-email').value.trim() || 'muhammedzain1192@gmail.com';
      const classLevel = modal.querySelector('#edit-user-class').value.trim() || 'Class 12 / Dropper';
      const hours = parseInt(modal.querySelector('#edit-user-hours').value) || 6;

      store.updateUserProfile({
        name,
        email,
        greetingName: name.split(' ')[0] || name,
        classLevel,
        studyGoalMinutes: hours * 60
      });

      closeModal();
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: "Profile updated successfully!", type: "success" } }));
      renderView();
    });
  }

  renderView();
}
