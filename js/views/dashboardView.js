// Calendar & To-Do View (Dashboard)
import { store } from '../store.js';

export function renderDashboard() {
  const container = document.getElementById('view-container');
  if (!container) return;

  function render() {
    const tasks = store.plannerTasks || [];
    const pendingTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    container.innerHTML = `
      <!-- Learning Planner Section Navigation Bar -->
      <div style="display: flex; gap: 8px; margin-bottom: var(--space-6); border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; overflow-x: auto;">
        <a href="#ai-planner" class="btn btn-secondary btn-sm" style="font-weight: 500;">
          AI Study Planner
        </a>
        <a href="#dashboard" class="btn btn-primary btn-sm" style="font-weight: 700;">
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

      <!-- Top Personalised Section: Todo & Calendar -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6); margin-bottom: var(--space-8);">
        
        <!-- Todo List -->
        <div class="card" style="background: var(--bg-surface-secondary); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: var(--space-5);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <h3 style="font-size: var(--font-md); font-weight: 700; color: var(--text-primary); margin: 0;">Planned To-Do</h3>
              <span class="badge badge-primary">${tasks.length}</span>
            </div>
            <button id="open-add-task-btn" class="btn btn-ghost btn-sm" style="color: var(--color-primary); font-weight: 600;">+ Add Task</button>
          </div>

          <div id="todo-tasks-list" style="display: flex; flex-direction: column; gap: 10px;">
            ${tasks.length === 0 ? `
              <div style="padding: 2.25rem 1.5rem; text-align: center; border: 1.5px dashed var(--border-default); border-radius: var(--radius-md); background: var(--bg-surface);">
                <div style="font-weight: 700; font-size: var(--font-sm); color: var(--text-primary); margin-bottom: 4px;">No To-Do Tasks Yet</div>
                <div style="font-size: var(--font-xs); color: var(--text-muted); margin-bottom: 14px;">Your to-do list is clean. Enter new study tasks freshly!</div>
                <button id="empty-add-task-btn" class="btn btn-primary btn-sm">+ Add Your First Task</button>
              </div>
            ` : tasks.map(task => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); transition: all var(--transition-fast);">
                <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0;">
                  <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--color-primary); cursor: pointer;" />
                  <span style="font-size: var(--font-sm); font-weight: 500; text-decoration: ${task.completed ? 'line-through' : 'none'}; color: ${task.completed ? 'var(--text-muted)' : 'var(--text-primary)'}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${task.title}
                  </span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; margin-left: 10px;">
                  <span class="badge ${task.completed ? 'badge-neutral' : 'badge-primary'}" style="font-size: 11px;">${task.time || 'Today'}</span>
                  <button class="btn btn-ghost btn-sm delete-task-btn" data-id="${task.id}" title="Delete Task" style="padding: 2px 6px; color: var(--text-muted); font-size: 13px;">✕</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Calendar / Upcoming Schedule Snippet -->
        <div class="card" style="background: var(--bg-surface-secondary); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: var(--space-5);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
            <h3 style="font-size: var(--font-md); font-weight: 700; color: var(--text-primary); margin: 0;">Upcoming Schedule</h3>
            <a href="#study-planner" style="font-size: var(--font-xs); font-weight: 600; color: var(--color-primary); text-decoration: none;">Full Planner →</a>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${pendingTasks.length === 0 ? `
              <div style="padding: 2.25rem 1.5rem; text-align: center; border: 1.5px dashed var(--border-default); border-radius: var(--radius-md); background: var(--bg-surface);">
                <div style="font-weight: 700; font-size: var(--font-sm); color: var(--text-primary); margin-bottom: 4px;">Schedule Clear</div>
                <div style="font-size: var(--font-xs); color: var(--text-muted);">No upcoming tasks scheduled for today.</div>
              </div>
            ` : pendingTasks.slice(0, 3).map((task, idx) => `
              <div style="display: flex; align-items: center; gap: 16px;">
                <div style="background: var(--color-primary-subtle); color: var(--color-primary); padding: 8px 12px; border-radius: var(--radius-md); text-align: center; min-width: 60px;">
                  <div style="font-size: var(--font-xs); font-weight: 700; text-transform: uppercase;">Task</div>
                  <div style="font-size: var(--font-lg); font-weight: 800;">${idx + 1}</div>
                </div>
                <div style="flex: 1; min-width: 0;">
                  <div style="font-size: var(--font-sm); font-weight: 700; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${task.title}
                  </div>
                  <div style="font-size: var(--font-xs); color: var(--text-secondary);">${task.time || 'Scheduled'}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Add Task Modal Container -->
      <div id="add-task-modal-wrapper"></div>
    `;

    // Bind event handlers
    const openModal = () => showAddTaskModal();
    document.getElementById('open-add-task-btn')?.addEventListener('click', openModal);
    document.getElementById('empty-add-task-btn')?.addEventListener('click', openModal);

    // Toggle task
    document.querySelectorAll('.task-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const id = cb.getAttribute('data-id');
        store.togglePlannerTask(id);
        render();
      });
    });

    // Delete task
    document.querySelectorAll('.delete-task-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        store.deletePlannerTask(id);
        render();
      });
    });
  }

  function showAddTaskModal() {
    const modalWrapper = document.getElementById('add-task-modal-wrapper');
    if (!modalWrapper) return;

    modalWrapper.innerHTML = `
      <div class="modal-overlay" id="task-modal-overlay" style="display: flex; align-items: center; justify-content: center;">
        <div class="modal-content" style="max-width: 440px; width: 100%;" onclick="event.stopPropagation()">
          <div class="modal-header">
            <div>
              <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin: 0;">Add To-Do Task</h3>
              <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-top: 2px;">Plan your next study session or revision goal</p>
            </div>
            <button class="btn btn-ghost btn-sm" id="close-task-modal">✕</button>
          </div>

          <form id="new-task-form" class="modal-body" style="display: flex; flex-direction: column; gap: 14px; padding: 1.25rem;">
            <div>
              <label style="display: block; font-size: var(--font-xs); font-weight: 600; color: var(--text-secondary); margin-bottom: 4px;">Task Description *</label>
              <input type="text" id="task-title-input" class="form-control" placeholder="e.g. Complete Kinematics Chapter 1 notes" required autofocus style="width: 100%; padding: 10px 12px; font-size: var(--font-sm); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); background: var(--bg-input); color: var(--text-primary);" />
            </div>

            <div>
              <label style="display: block; font-size: var(--font-xs); font-weight: 600; color: var(--text-secondary); margin-bottom: 4px;">Time / Tag</label>
              <input type="text" id="task-time-input" class="form-control" placeholder="e.g. Today 5:00 PM or Tomorrow" value="Today 5:00 PM" style="width: 100%; padding: 10px 12px; font-size: var(--font-sm); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); background: var(--bg-input); color: var(--text-primary);" />
            </div>

            <div>
              <label style="display: block; font-size: var(--font-xs); font-weight: 600; color: var(--text-secondary); margin-bottom: 4px;">Category</label>
              <select id="task-type-select" style="width: 100%; padding: 10px 12px; font-size: var(--font-sm); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); background: var(--bg-input); color: var(--text-primary);">
                <option value="practice">Practice Questions</option>
                <option value="study">Theory / Study</option>
                <option value="revision">Revision</option>
                <option value="test">Mock Test</option>
              </select>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px;">
              <button type="button" class="btn btn-secondary btn-sm" id="cancel-task-modal">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm">Save Task</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const closeModal = () => { modalWrapper.innerHTML = ''; };
    document.getElementById('close-task-modal')?.addEventListener('click', closeModal);
    document.getElementById('cancel-task-modal')?.addEventListener('click', closeModal);
    document.getElementById('task-modal-overlay')?.addEventListener('click', closeModal);

    document.getElementById('new-task-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('task-title-input')?.value.trim();
      const time = document.getElementById('task-time-input')?.value.trim() || 'Today';
      const type = document.getElementById('task-type-select')?.value || 'practice';

      if (title) {
        store.addPlannerTask({ title, time, type });
        closeModal();
        render();
      }
    });
  }

  render();
}
