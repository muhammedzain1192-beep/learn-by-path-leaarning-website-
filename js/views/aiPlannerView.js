// AI Study Planner View — Minimalist & Intelligent Assistant
import { store } from '../store.js';

export function renderAIPlanner() {
  const container = document.getElementById('view-container');
  if (!container) return;

  const tasks = store.plannerTasks || [];
  const pendingCount = tasks.filter(t => !t.completed).length;

  container.innerHTML = `
    <div style="max-width: 820px; margin: 0 auto;">

      <!-- Learning Planner Section Navigation Bar -->
      <div style="display: flex; gap: 8px; margin-bottom: var(--space-6); border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; overflow-x: auto;">
        <a href="#ai-planner" class="btn btn-primary btn-sm" style="font-weight: 700;">
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

      <!-- Header -->
      <div style="margin-bottom: var(--space-6);">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 4px;">
          <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #6366F1, #8B5CF6); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </div>
          <div>
            <h1 style="font-size: var(--font-xl); font-weight: 800; color: var(--text-primary); margin: 0;">AI Study Planner</h1>
            <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-top: 2px;">Smart planner ready to schedule your newly entered chapters and tasks</p>
          </div>
        </div>
      </div>

      <!-- Search & Input Bar with Dropdown Suggestions -->
      <div style="position: relative; margin-bottom: var(--space-6);" id="ai-search-wrapper">
        <div style="display: flex; gap: 10px; background: var(--bg-surface-secondary); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 10px 14px; align-items: center; transition: border-color var(--transition-fast);">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" style="flex-shrink: 0;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input id="ai-planner-input" type="text" autocomplete="off" placeholder="Ask AI Planner... (Click to see suggested prompts)" style="flex: 1; border: none; background: transparent; color: var(--text-primary); font-size: var(--font-sm); outline: none;" />
          <button id="ai-planner-send" style="width: 36px; height: 36px; border-radius: var(--radius-md); background: var(--color-primary); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0;" title="Send">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>

        <!-- Suggestion Dropdown (Appears on clicking search bar) -->
        <div id="ai-suggestions-dropdown" style="display: none; position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 100; background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); padding: 6px; overflow: hidden;">
          <div style="padding: 6px 12px 6px 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; border-bottom: 1px solid var(--border-subtle); margin-bottom: 4px;">
            Suggested Prompts
          </div>
          <button type="button" class="ai-dropdown-option" data-prompt="How should I structure my fresh study schedule for my exams?" style="width: 100%; text-align: left; padding: 10px 12px; border-radius: var(--radius-md); border: none; background: transparent; color: var(--text-primary); font-size: var(--font-sm); font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: background 0.15s ease;">
            <span>Fresh Study Routine</span>
            <span style="font-size: 11px; color: var(--text-muted); font-family: monospace;">Select ↵</span>
          </button>
          <button type="button" class="ai-dropdown-option" data-prompt="Recommend an optimal weekly study split between theory and practice questions" style="width: 100%; text-align: left; padding: 10px 12px; border-radius: var(--radius-md); border: none; background: transparent; color: var(--text-primary); font-size: var(--font-sm); font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: background 0.15s ease;">
            <span>Weekly Split Advice</span>
            <span style="font-size: 11px; color: var(--text-muted); font-family: monospace;">Select ↵</span>
          </button>
          <button type="button" class="ai-dropdown-option" data-prompt="How many hours should I study each day for JEE / entrance exams?" style="width: 100%; text-align: left; padding: 10px 12px; border-radius: var(--radius-md); border: none; background: transparent; color: var(--text-primary); font-size: var(--font-sm); font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: background 0.15s ease;">
            <span>Daily Hours Target</span>
            <span style="font-size: 11px; color: var(--text-muted); font-family: monospace;">Select ↵</span>
          </button>
          <button type="button" class="ai-dropdown-option" data-prompt="What is the best way to organize new chapters in Z-Learn?" style="width: 100%; text-align: left; padding: 10px 12px; border-radius: var(--radius-md); border: none; background: transparent; color: var(--text-primary); font-size: var(--font-sm); font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: background 0.15s ease;">
            <span>Curriculum Tips</span>
            <span style="font-size: 11px; color: var(--text-muted); font-family: monospace;">Select ↵</span>
          </button>
        </div>
      </div>

      <!-- AI Response Area -->
      <div id="ai-response-area" style="display: flex; flex-direction: column; gap: var(--space-4);">

        <!-- Default Clean State -->
        <div id="ai-default-state">
          <!-- Fresh Slate Status Card -->
          <div class="card" style="background: var(--bg-surface-secondary); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: var(--space-5); margin-bottom: var(--space-4);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: var(--space-4);">
              <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--color-success);"></div>
              <div>
                <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin: 0;">Study Schedule Status</h3>
                <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-top: 2px;">Your planner is fresh and ready for new data</p>
              </div>
              <span class="badge badge-success" style="margin-left: auto;">Clean Slate</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); margin-bottom: var(--space-5);">
              <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px; text-align: center;">
                <div style="font-size: 24px; font-weight: 800; color: var(--color-success);">${pendingCount}</div>
                <div style="font-size: var(--font-xs); color: var(--text-secondary);">Active Tasks</div>
              </div>
              <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px; text-align: center;">
                <div style="font-size: 24px; font-weight: 800; color: var(--color-primary);">0h</div>
                <div style="font-size: var(--font-xs); color: var(--text-secondary);">Backlog Hours</div>
              </div>
              <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px; text-align: center;">
                <div style="font-size: 24px; font-weight: 800; color: var(--color-info);">100%</div>
                <div style="font-size: var(--font-xs); color: var(--text-secondary);">Schedule Health</div>
              </div>
            </div>

            <div style="font-size: var(--font-sm); color: var(--text-secondary); line-height: 1.8;">
              <p>• <strong style="color: var(--text-primary);">Status:</strong> All previous cluttered dummy data has been removed.</p>
              <p>• <strong style="color: var(--text-primary);">Next Step:</strong> As you enter your chapters and to-do tasks, the AI will automatically optimize your study intervals, spaced revisions, and mock test schedules.</p>
              <p>• <strong style="color: var(--text-primary);">Need advice?</strong> Click the search bar above to select suggested prompts or type any study planning question.</p>
            </div>
          </div>

          <!-- Quick Starter Tips Card -->
          <div class="card" style="background: var(--bg-surface-secondary); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: var(--space-5);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: var(--space-3);">
              <h3 style="font-size: var(--font-sm); font-weight: 700; color: var(--text-primary); margin: 0;">Recommended Next Steps</h3>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <span style="font-size: var(--font-xs); font-weight: 600; color: var(--text-primary);">1. Add your upcoming chapters in courses</span>
                <a href="#courses" class="btn btn-outline btn-sm" style="font-size: 11px;">Go to Courses →</a>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <span style="font-size: var(--font-xs); font-weight: 600; color: var(--text-primary);">2. Plan today's focused to-dos</span>
                <a href="#dashboard" class="btn btn-outline btn-sm" style="font-size: 11px;">Go to To-Do →</a>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Chat Response Area -->
        <div id="ai-chat-messages" style="display: flex; flex-direction: column; gap: var(--space-3);"></div>

      </div>
    </div>
  `;

  // Dropdown interactivity
  const searchInput = document.getElementById('ai-planner-input');
  const dropdown = document.getElementById('ai-suggestions-dropdown');

  const openDropdown = () => {
    if (dropdown) dropdown.style.display = 'block';
  };

  const closeDropdown = () => {
    if (dropdown) dropdown.style.display = 'none';
  };

  searchInput?.addEventListener('focus', openDropdown);
  searchInput?.addEventListener('click', (e) => {
    e.stopPropagation();
    openDropdown();
  });

  // Suggestion item hover styling
  document.querySelectorAll('.ai-dropdown-option').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.backgroundColor = 'var(--bg-surface-secondary)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.backgroundColor = 'transparent';
    });

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const prompt = btn.getAttribute('data-prompt');
      if (searchInput) {
        searchInput.value = prompt;
      }
      closeDropdown();
      handleAISend();
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    const searchWrapper = document.getElementById('ai-search-wrapper');
    if (searchWrapper && !searchWrapper.contains(e.target)) {
      closeDropdown();
    }
  });

  // Send button logic
  document.getElementById('ai-planner-send')?.addEventListener('click', () => {
    closeDropdown();
    handleAISend();
  });

  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      closeDropdown();
      handleAISend();
    } else if (e.key === 'Escape') {
      closeDropdown();
    }
  });

  function handleAISend() {
    const input = document.getElementById('ai-planner-input');
    const chatArea = document.getElementById('ai-chat-messages');
    const userText = input?.value.trim();
    if (!userText) return;

    if (input) input.value = '';
    const defState = document.getElementById('ai-default-state');
    if (defState) defState.style.display = 'none';

    // User bubble
    const userBubble = document.createElement('div');
    userBubble.style.cssText = 'display: flex; justify-content: flex-end;';
    userBubble.innerHTML = `<div style="background: var(--color-primary); color: white; padding: 10px 14px; border-radius: 16px 16px 4px 16px; max-width: 75%; font-size: var(--font-sm); font-weight: 500;">${userText}</div>`;
    chatArea.appendChild(userBubble);

    // AI typing indicator
    const typingBubble = document.createElement('div');
    typingBubble.id = 'ai-typing';
    typingBubble.style.cssText = 'display: flex; align-items: center; gap: 10px;';
    typingBubble.innerHTML = `
      <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #6366F1, #8B5CF6); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
      </div>
      <div style="background: var(--bg-surface-secondary); border: 1px solid var(--border-subtle); padding: 10px 14px; border-radius: 4px 16px 16px 16px; font-size: var(--font-sm); color: var(--text-secondary);">
        <span class="ai-thinking">AI is thinking</span>
        <span class="ai-dots">...</span>
      </div>`;
    chatArea.appendChild(typingBubble);
    chatArea.scrollTop = chatArea.scrollHeight;

    // Generate AI response without emojis
    setTimeout(() => {
      typingBubble.remove();
      const aiResponse = generateAIResponse(userText);
      const aiBubble = document.createElement('div');
      aiBubble.style.cssText = 'display: flex; align-items: flex-start; gap: 10px;';
      aiBubble.innerHTML = `
        <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #6366F1, #8B5CF6); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 4px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        </div>
        <div style="background: var(--bg-surface-secondary); border: 1px solid var(--border-subtle); padding: 14px 16px; border-radius: 4px 16px 16px 16px; max-width: 80%; font-size: var(--font-sm); color: var(--text-primary); line-height: 1.8;">
          ${aiResponse}
        </div>`;
      chatArea.appendChild(aiBubble);
      chatArea.scrollTop = chatArea.scrollHeight;
    }, 600);
  }

  function generateAIResponse(query) {
    const q = query.toLowerCase();
    if (q.includes('fresh') || q.includes('routine') || q.includes('start')) {
      return `<strong>Fresh Study Framework</strong><br>
      Since you are starting with a clean slate, here is the recommended 3-block routine:<br><br>
      • <strong>Block 1 — Concept Theory (60–90 min):</strong> Watch video lecture or study textbook derivations.<br>
      • <strong>Block 2 — Unassisted Practice (60 min):</strong> Solve 15–20 questions without looking at solutions.<br>
      • <strong>Block 3 — Error Analysis (30 min):</strong> Note mistakes and formula gaps.<br><br>
      Start by adding your first chapter in <a href="#courses" style="color: var(--color-primary); font-weight: 600;">Courses</a> and setting 1–2 to-dos for today in <a href="#dashboard" style="color: var(--color-primary); font-weight: 600;">To-Do</a>.`;
    } else if (q.includes('split') || q.includes('week') || q.includes('weekly')) {
      return `<strong>Recommended Weekly Split</strong><br>
      • <strong>Monday & Tuesday:</strong> High-focus subject (e.g. Physics / Calculus)<br>
      • <strong>Wednesday & Thursday:</strong> Moderate subject (e.g. Chemistry)<br>
      • <strong>Friday:</strong> Mixed problem-solving drills<br>
      • <strong>Saturday:</strong> CBT Mock Test or timed section test<br>
      • <strong>Sunday:</strong> Weekly review & spaced revision<br><br>
      Aim for <strong>60% Practice Questions</strong> and <strong>40% Concept Theory</strong>.`;
    } else if (q.includes('hours') || q.includes('time') || q.includes('daily')) {
      return `<strong>Target Study Hours Guideline</strong><br>
      • <strong>School / College Days:</strong> 4 – 5 hours of self-study (2 sessions of 2 hours).<br>
      • <strong>Holidays / Weekends:</strong> 6 – 8 hours across 3 sessions with pomodoro breaks.<br><br>
      Consistency beats marathons: studying 4 hours every single day yields 28 quality hours weekly without burnout.`;
    } else if (q.includes('curriculum') || q.includes('chapter') || q.includes('organize')) {
      return `<strong>Curriculum Organization Tips</strong><br>
      1. Go to any Course in the <strong>Learn</strong> section.<br>
      2. Click <strong>+ Add Chapter</strong> to enter your chapter title and key topics.<br>
      3. Use <strong>+ Add Lecture</strong> to link YouTube lectures directly into that chapter.<br>
      4. Track completion chapter by chapter as you finish drills.`;
    } else {
      return `<strong>AI Study Assistant</strong><br><br>
      Your workspace is clean and ready. Whenever you add new chapters or to-do items, I can:<br>
      • Automatically organize your daily study timetable.<br>
      • Suggest spaced repetition intervals for revisions.<br>
      • Recommend practice tests based on your progress.<br><br>
      What would you like to plan first?`;
    }
  }
}
