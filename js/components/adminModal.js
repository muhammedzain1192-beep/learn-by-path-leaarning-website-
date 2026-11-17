// YouTube Course Builder & Add Lecture Modal Component
import { store } from '../store.js';

export function initAdminModal() {
  let modalContainer = document.getElementById('admin-modal-container');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'admin-modal-container';
    document.body.appendChild(modalContainer);
  }

  const ADMIN_PASSWORD = 'ppjims';

  window.addEventListener('open-add-lecture-modal', () => {
    // Show password prompt overlay
    let pwContainer = document.getElementById('admin-pw-container');
    if (!pwContainer) {
      pwContainer = document.createElement('div');
      pwContainer.id = 'admin-pw-container';
      document.body.appendChild(pwContainer);
    }

    pwContainer.innerHTML = `
      <div class="modal-overlay" id="admin-pw-overlay" style="z-index: 9999;">
        <div class="modal-content" style="max-width: 380px; text-align: center;" onclick="event.stopPropagation()">
          <div class="modal-header" style="justify-content: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
            <div>
              <div style="width:48px;height:48px;border-radius:var(--radius-full);background:var(--color-primary-subtle);border:2px solid var(--color-primary-border);display:flex;align-items:center;justify-content:center;margin:0 auto 0.75rem;">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <h3 style="font-size: var(--font-lg); font-weight: 700; color: var(--text-primary);">Admin Access</h3>
              <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-top: 4px;">Enter the admin password to continue</p>
            </div>
          </div>
          <div class="modal-body" style="padding-top: 1.25rem;">
            <div class="form-group">
              <input type="password" class="form-control" id="admin-pw-input" placeholder="Enter password..." autofocus style="text-align:center;letter-spacing:0.15em;font-size:var(--font-md);" />
            </div>
            <p id="admin-pw-error" style="display:none; color:#ef4444; font-size:var(--font-xs); margin-top:0.5rem;">Incorrect password. Try again.</p>
          </div>
          <div class="modal-footer" style="justify-content: center; gap: 0.75rem;">
            <button class="btn btn-secondary btn-sm" id="admin-pw-cancel">Cancel</button>
            <button class="btn btn-primary btn-sm" id="admin-pw-submit">Unlock</button>
          </div>
        </div>
      </div>
    `;

    const input = document.getElementById('admin-pw-input');
    const errorEl = document.getElementById('admin-pw-error');

    const closePw = () => { pwContainer.innerHTML = ''; };

    const tryUnlock = () => {
      if (input.value === ADMIN_PASSWORD) {
        closePw();
        openModal();
      } else {
        errorEl.style.display = 'block';
        input.value = '';
        input.focus();
      }
    };

    document.getElementById('admin-pw-overlay')?.addEventListener('click', closePw);
    document.getElementById('admin-pw-cancel')?.addEventListener('click', closePw);
    document.getElementById('admin-pw-submit')?.addEventListener('click', tryUnlock);
    input?.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryUnlock(); });
  });


  function openModal() {
    const courses = store.courses;
    const defaultCourse = courses[0];

    modalContainer.innerHTML = `
      <div class="modal-overlay" id="admin-modal-overlay">
        <div class="modal-content lg" onclick="event.stopPropagation()">
          <div class="modal-header">
            <div>
              <h3 style="font-size: var(--font-lg); font-weight: 700; color: var(--text-primary);">YouTube Course Builder — Add Lecture</h3>
              <p style="font-size: var(--font-xs); color: var(--text-secondary);">Organize any YouTube lecture into your structured curriculum</p>
            </div>
            <button class="btn btn-ghost btn-sm" id="close-admin-modal">✕</button>
          </div>
          
          <form id="add-lecture-form" class="modal-body">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group" style="grid-column: span 2;">
                <label class="form-label">YouTube Video URL or Video ID *</label>
                <input type="text" class="form-control" id="lec-url" placeholder="https://www.youtube.com/watch?v=... or ID" required />
              </div>

              <div class="form-group" style="grid-column: span 2;">
                <label class="form-label">Lecture Title *</label>
                <input type="text" class="form-control" id="lec-title" placeholder="e.g. Relative Motion in 2D — River Swimmer Problems" required />
              </div>

              <div class="form-group">
                <label class="form-label">Teacher / Educator</label>
                <input type="text" class="form-control" id="lec-teacher" placeholder="e.g. Ashish Arora, Mohit Tyagi" />
              </div>

              <div class="form-group">
                <label class="form-label">Channel Name</label>
                <input type="text" class="form-control" id="lec-channel" placeholder="e.g. Physics Galaxy, Competishun" />
              </div>

              <div class="form-group">
                <label class="form-label">Target Course & Subject *</label>
                <select class="form-control" id="lec-course-select">
                  ${courses.map(c => `<option value="${c.id}">${c.exam} • ${c.subject} (${c.classLevel})</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Target Chapter *</label>
                <select class="form-control" id="lec-chapter-select">
                  ${defaultCourse.chapters.map(ch => `<option value="${ch.id}">${ch.title}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Duration (minutes)</label>
                <input type="text" class="form-control" id="lec-duration" placeholder="e.g. 52 min" value="45 min" />
              </div>

              <div class="form-group">
                <label class="form-label">Difficulty Level</label>
                <select class="form-control" id="lec-difficulty">
                  <option value="Easy">Easy (Board / Basic)</option>
                  <option value="Medium" selected>Medium (JEE Main / BITSAT)</option>
                  <option value="Hard">Hard (JEE Main Deep)</option>
                  <option value="JEE Advanced">JEE Advanced (Multi-Concept)</option>
                </select>
              </div>

              <div class="form-group" style="grid-column: span 2;">
                <label class="form-label">Important Formula / Notes / Prerequisites</label>
                <textarea class="form-control" id="lec-notes" rows="2" placeholder="Key concepts, equations, or timestamps..."></textarea>
              </div>
            </div>

            <div class="modal-footer" style="padding-left: 0; padding-right: 0; margin-top: 1rem; border-top: none;">
              <button type="button" class="btn btn-secondary" id="cancel-admin-modal">Cancel</button>
              <button type="submit" class="btn btn-primary">Save & Add to Course</button>
            </div>
          </form>
        </div>
      </div>
    `;

    // Dynamic chapter updater based on course select
    const courseSelect = document.getElementById('lec-course-select');
    const chapterSelect = document.getElementById('lec-chapter-select');

    courseSelect?.addEventListener('change', (e) => {
      const selectedCourse = courses.find(c => c.id === e.target.value);
      if (selectedCourse && chapterSelect) {
        chapterSelect.innerHTML = selectedCourse.chapters.map(ch => `<option value="${ch.id}">${ch.title}</option>`).join('');
      }
    });

    document.getElementById('admin-modal-overlay')?.addEventListener('click', closeModal);
    document.getElementById('close-admin-modal')?.addEventListener('click', closeModal);
    document.getElementById('cancel-admin-modal')?.addEventListener('click', closeModal);

    // Handle form submit
    document.getElementById('add-lecture-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const courseId = courseSelect.value;
      const chapterId = chapterSelect.value;
      const url = document.getElementById('lec-url').value;
      const title = document.getElementById('lec-title').value;
      const teacher = document.getElementById('lec-teacher').value;
      const channel = document.getElementById('lec-channel').value;
      const duration = document.getElementById('lec-duration').value;
      const difficulty = document.getElementById('lec-difficulty').value;
      const notes = document.getElementById('lec-notes').value;

      const ok = store.addLecture(courseId, chapterId, {
        youtubeUrl: url,
        title,
        teacher,
        channel,
        duration,
        difficulty,
        notes
      });

      if (ok) {
        closeModal();
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: `Lecture "${title}" added successfully!`, type: 'success' } }));
        // Refresh current view if relevant
        if (location.hash.startsWith('#courses')) {
          window.dispatchEvent(new HashChangeEvent('hashchange'));
        }
      }
    });
  }

  function closeModal() {
    modalContainer.innerHTML = '';
  }
}
