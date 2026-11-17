// Study Planner View — Interactive Calendar & Smart Schedule Generator
import { store } from '../store.js';

export function renderStudyPlanner() {
  const container = document.getElementById('view-container');
  if (!container) return;

  let activeViewMode = 'Day'; // 'Day' | 'Week' | 'Month'

  function updateView() {
    const tasks = store.plannerTasks;

    container.innerHTML = `
      <!-- Learning Planner Section Navigation Bar -->
      <div style="display: flex; gap: 8px; margin-bottom: var(--space-6); border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; overflow-x: auto;">
        <a href="#ai-planner" class="btn btn-secondary btn-sm" style="font-weight: 500;">
          AI Study Planner
        </a>
        <a href="#dashboard" class="btn btn-secondary btn-sm" style="font-weight: 500;">
          Calendar & To-Do
        </a>
        <a href="#analytics" class="btn btn-secondary btn-sm" style="font-weight: 500;">
          Analytics
        </a>
        <a href="#downloads" class="btn btn-secondary btn-sm" style="font-weight: 500;">
          Downloads
        </a>
        <a href="#reports" class="btn btn-secondary btn-sm" style="font-weight: 500;">
          My Report
        </a>
      </div>

      <div class="view-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h1 class="view-title">Study Planner & Calendar</h1>
          <p class="view-subtitle">Organize daily study routines, target practice sessions, and mock test schedules</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" id="open-smart-planner-btn">
            Smart Plan Generator
          </button>
          <button class="btn btn-primary btn-sm" id="add-manual-task-btn">
            + Add Task
          </button>
        </div>
      </div>

      <!-- View Selector (Day, Week, Month) -->
      <div class="calendar-view-header">
        <div class="filter-pills" id="planner-view-pills">
          ${['Day', 'Week', 'Month'].map(mode => `
            <button class="filter-pill ${activeViewMode === mode ? 'active' : ''}" data-mode="${mode}">
              ${mode} View
            </button>
          `).join('')}
        </div>
        <div style="font-size: var(--font-sm); font-weight: 700; color: var(--color-primary);">
          ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
      </div>

      <!-- Daily View Content -->
      ${activeViewMode === 'Day' ? `
        <div class="card">
          <div class="card-header">
            <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary);">Today's Scheduled Sessions</h3>
            <span class="badge badge-primary">${tasks.length} Total Tasks</span>
          </div>
          <div class="card-body">
            ${tasks.length === 0 ? `
              <div style="padding: 2.5rem; text-align: center; color: var(--text-secondary); background: var(--bg-surface-secondary); border: 1.5px dashed var(--border-default); border-radius: var(--radius-md);">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 10px auto;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <h4 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">No Tasks Scheduled</h4>
                <p style="font-size: var(--font-xs); color: var(--text-muted); margin-bottom: 14px;">Your planner is fresh and ready. Click "+ Add Task" to schedule your first study task.</p>
                <button class="btn btn-primary btn-sm" id="empty-add-manual-btn">+ Add First Task</button>
              </div>
            ` : `
              <div class="task-list">
                ${tasks.map(task => `
                  <div class="task-item">
                    <div class="task-left">
                      <div class="task-check ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                        ${task.completed ? '✓' : ''}
                      </div>
                      <div>
                        <div style="font-weight: 600; font-size: var(--font-sm); text-decoration: ${task.completed ? 'line-through' : 'none'}; color: ${task.completed ? 'var(--text-muted)' : 'var(--text-primary)'};">
                          ${task.title}
                        </div>
                        <div style="font-size: var(--font-xs); color: var(--text-muted);">
                          ${task.time} • <span class="badge ${task.type === 'test' ? 'badge-warning' : 'badge-neutral'}">${task.type}</span>
                        </div>
                      </div>
                    </div>
                    <button class="btn btn-ghost btn-sm remove-task-btn" data-task-id="${task.id}" style="color: var(--text-muted);">✕</button>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>
      ` : `
        <!-- 7-Day Calendar Grid for Week / Month -->
        <div class="calendar-grid">
          ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => `
            <div class="calendar-day-cell" style="background-color: var(--bg-surface-secondary); min-height: auto; padding: 8px 12px; font-weight: 700; font-size: 11px; color: var(--text-muted); text-align: center;">
              ${day}
            </div>
          `).join('')}
          ${[15, 16, 17, 18, 19, 20, 21].map(d => `
            <div class="calendar-day-cell">
              <div class="calendar-day-header">${d} ${new Date().toLocaleDateString('en-US', { month: 'short' })}</div>
            </div>
          `).join('')}
        </div>
      `}
    `;

    // View mode pills
    document.querySelectorAll('#planner-view-pills .filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeViewMode = btn.getAttribute('data-mode');
        updateView();
      });
    });

    // Task completion toggles
    document.querySelectorAll('.task-check').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-task-id');
        store.togglePlannerTask(id);
        updateView();
      });
    });

    // Smart Planner Generator Trigger
    document.getElementById('open-smart-planner-btn')?.addEventListener('click', () => {
      openSmartPlannerModal();
    });

    // Add Manual Task Trigger
    const handleAddManual = () => {
      const title = prompt("Enter task title (e.g. 'Chemistry: Thermodynamics 20 PYQs'):");
      if (title) {
        store.addPlannerTask({ title, type: 'practice', time: '02:00 PM' });
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: "Task added to your study schedule!", type: "success" } }));
        updateView();
      }
    };
    document.getElementById('add-manual-task-btn')?.addEventListener('click', handleAddManual);
    document.getElementById('empty-add-manual-btn')?.addEventListener('click', handleAddManual);
  }

  function openSmartPlannerModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div>
            <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary);">Smart Study Plan Generator</h3>
            <p style="font-size: var(--font-xs); color: var(--text-secondary);">Automate your preparation schedule based on exam deadlines</p>
          </div>
          <button class="btn btn-ghost btn-sm" id="close-smart-modal">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Target Examination</label>
            <select class="form-control" id="sp-exam">
              <option value="JEE Main">JEE Main 2027 (Session 1)</option>
              <option value="JEE Advanced">JEE Advanced 2027</option>
              <option value="BITSAT">BITSAT 2027</option>
              <option value="Kerala Plus Two">Kerala Plus Two Board 2027</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Daily Available Study Hours</label>
            <input type="number" class="form-control" id="sp-hours" value="6" min="2" max="14" />
          </div>
          <div class="form-group">
            <label class="form-label">Key Weak Topics to Prioritize</label>
            <input type="text" class="form-control" id="sp-weak" value="Relative Motion, VSEPR Theory, Conic Sections" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="cancel-smart-btn">Cancel</button>
          <button class="btn btn-primary" id="generate-smart-plan-btn">Generate & Apply Schedule</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#close-smart-modal')?.addEventListener('click', () => modal.remove());
    modal.querySelector('#cancel-smart-btn')?.addEventListener('click', () => modal.remove());
    modal.querySelector('#generate-smart-plan-btn')?.addEventListener('click', () => {
      const exam = modal.querySelector('#sp-exam').value;
      const hours = modal.querySelector('#sp-hours').value;
      const weak = modal.querySelector('#sp-weak').value.split(',').map(s => s.trim());
      const count = store.generateSmartSchedule(exam, null, hours, weak);
      modal.remove();
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: `Generated ${count} targeted study sessions!`, type: "success" } }));
      updateView();
    });
  }

  updateView();
}
