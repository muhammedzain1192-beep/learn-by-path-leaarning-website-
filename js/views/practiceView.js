// Practice Section & Interactive Question Solving Engine
import { store } from '../store.js';

export function renderPractice() {
  const container = document.getElementById('view-container');
  if (!container) return;

  let activeTab = 'Topic';
  let activeSubject = 'All';
  let activeDifficulty = 'All';
  let currentIndex = 0;
  let selectedOption = null;
  let submitted = false;
  let startTime = Date.now();

  function getFilteredQuestions() {
    return store.questions.filter(q => {
      const matchSubject = activeSubject === 'All' || q.subject === activeSubject;
      const matchDiff = activeDifficulty === 'All' || q.difficulty === activeDifficulty;
      return matchSubject && matchDiff;
    });
  }

  function updateView() {
    const questionsList = getFilteredQuestions();
    const currentQ = questionsList[currentIndex] || questionsList[0];

    container.innerHTML = `
      <div class="view-header">
        <h1 class="view-title">Question Practice</h1>
        <p class="view-subtitle">Distraction-free question solving engine with instant step-by-step verification</p>
      </div>

      <!-- Practice Navigation Tabs -->
      <div class="tabs-nav" id="practice-tabs">
        ${['Topic', 'Chapter', 'Exam', 'Weak Areas', 'Daily Practice'].map(tab => `
          <button class="tab-btn ${activeTab === tab ? 'active' : ''}" data-tab="${tab}">
            ${tab} Practice
          </button>
        `).join('')}
        <a href="#mistake-book" class="tab-btn" style="text-decoration: none;">Mistake Book (${store.mistakes.length})</a>
        <a href="#practice-history" class="tab-btn" style="text-decoration: none;">Practice History →</a>
      </div>

      <!-- Filter Controls -->
      <div style="display: flex; gap: var(--space-4); margin-bottom: var(--space-6); flex-wrap: wrap; align-items: center;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: var(--font-xs); font-weight: 700; color: var(--text-secondary);">SUBJECT:</span>
          <select class="form-control" id="filter-subject" style="width: auto; padding: 4px 10px; font-size: var(--font-xs);">
            <option value="All" ${activeSubject === 'All' ? 'selected' : ''}>All Subjects</option>
            <option value="Physics" ${activeSubject === 'Physics' ? 'selected' : ''}>Physics</option>
            <option value="Chemistry" ${activeSubject === 'Chemistry' ? 'selected' : ''}>Chemistry</option>
            <option value="Mathematics" ${activeSubject === 'Mathematics' ? 'selected' : ''}>Mathematics</option>
          </select>
        </div>

        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: var(--font-xs); font-weight: 700; color: var(--text-secondary);">DIFFICULTY:</span>
          <select class="form-control" id="filter-difficulty" style="width: auto; padding: 4px 10px; font-size: var(--font-xs);">
            <option value="All" ${activeDifficulty === 'All' ? 'selected' : ''}>All Levels</option>
            <option value="Easy" ${activeDifficulty === 'Easy' ? 'selected' : ''}>Easy</option>
            <option value="Medium" ${activeDifficulty === 'Medium' ? 'selected' : ''}>Medium</option>
            <option value="JEE Advanced" ${activeDifficulty === 'JEE Advanced' ? 'selected' : ''}>JEE Advanced</option>
          </select>
        </div>

        <div style="margin-left: auto; font-size: var(--font-xs); color: var(--text-muted);">
          Question <strong>${currentIndex + 1}</strong> of <strong>${questionsList.length}</strong>
        </div>
      </div>

      <!-- Question Solving Interface -->
      ${!currentQ ? `
        <div class="empty-state">
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <div class="empty-state-title">No questions found for this filter</div>
          <div class="empty-state-desc">Try resetting your subject or difficulty filters.</div>
          <button class="btn btn-primary btn-sm" id="reset-filters">Reset Filters</button>
        </div>
      ` : `
        <div class="question-pane">
          <!-- Question Meta Row -->
          <div class="question-meta-row">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge badge-primary">Q ${currentIndex + 1}</span>
              <span class="badge badge-neutral">${currentQ.subject}</span>
              <span class="badge badge-neutral">${currentQ.exam} ${currentQ.year || ''}</span>
              <span class="badge badge-warning">${currentQ.difficulty}</span>
            </div>
            <div style="font-size: var(--font-xs); font-family: var(--font-mono); color: var(--text-muted);">
              Avg Time: ${currentQ.avgTime || '60s'}
            </div>
          </div>

          <!-- Question Content Statement -->
          <div class="question-text">
            ${currentQ.question}
          </div>

          <!-- Options List (A, B, C, D) -->
          <div class="options-list">
            ${currentQ.options.map((opt, optIdx) => {
              const label = String.fromCharCode(65 + optIdx);
              let optionClass = "";
              if (selectedOption === optIdx) optionClass += " selected";
              if (submitted) {
                if (optIdx === currentQ.correctIndex) optionClass += " correct-reveal";
                else if (selectedOption === optIdx && optIdx !== currentQ.correctIndex) optionClass += " wrong-reveal";
              }

              return `
                <div class="option-btn ${optionClass}" data-opt-idx="${optIdx}">
                  <span class="option-label">${label}</span>
                  <span style="flex: 1;">${opt}</span>
                  ${submitted && optIdx === currentQ.correctIndex ? '<span style="color: var(--color-success); font-weight: 700;">✓ Correct</span>' : ''}
                  ${submitted && selectedOption === optIdx && optIdx !== currentQ.correctIndex ? '<span style="color: var(--color-danger); font-weight: 700;">✗ Wrong</span>' : ''}
                </div>
              `;
            }).join('')}
          </div>

          <!-- Submit / Action Footer -->
          <div style="display: flex; justify-content: space-between; align-items: center; pt-4;">
            <div>
              ${!submitted ? `
                <button class="btn btn-primary" id="submit-answer-btn" ${selectedOption === null ? 'disabled' : ''}>
                  Submit Answer
                </button>
              ` : `
                <button class="btn btn-primary" id="next-question-btn">
                  Next Question →
                </button>
              `}
            </div>

            <div style="display: flex; gap: 8px;">
              <button class="btn btn-ghost btn-sm" id="save-question-btn">
                ★ Save Question
              </button>
              ${submitted && selectedOption !== currentQ.correctIndex ? `
                <button class="btn btn-danger btn-sm" id="add-mistake-btn">
                  + Add to Mistake Book
                </button>
              ` : ''}
            </div>
          </div>

          <!-- Explanation Box (Appears after submission) -->
          ${submitted ? `
            <div class="explanation-card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 700; color: ${selectedOption === currentQ.correctIndex ? 'var(--color-success)' : 'var(--color-danger)'}; font-size: var(--font-sm);">
                  ${selectedOption === currentQ.correctIndex ? '✓ Correct Answer' : '✗ Incorrect Response'}
                </span>
                <span class="badge badge-primary">Concept: ${currentQ.concept}</span>
              </div>
              <div style="font-size: var(--font-sm); line-height: 1.6; white-space: pre-line; color: var(--text-primary);">
                ${currentQ.explanation}
              </div>
            </div>
          ` : ''}
        </div>
      `}
    `;

    // Attach option clicks
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (submitted) return;
        selectedOption = parseInt(btn.getAttribute('data-opt-idx'));
        updateView();
      });
    });

    // Attach submit button
    document.getElementById('submit-answer-btn')?.addEventListener('click', () => {
      if (selectedOption === null) return;
      submitted = true;
      const isCorrect = selectedOption === currentQ.correctIndex;
      const timeSpentSec = Math.round((Date.now() - startTime) / 1000);
      
      // Record practice attempt
      store.recordPracticeAttempt({
        subject: currentQ.subject,
        chapter: currentQ.chapter,
        total: 1,
        correct: isCorrect ? 1 : 0,
        wrong: isCorrect ? 0 : 1,
        timeSpent: `${timeSpentSec}s`
      });

      // Auto-add to mistake book if wrong
      if (!isCorrect) {
        store.addMistake(currentQ, "Failed during practice session");
      }

      updateView();
    });

    // Attach next question
    document.getElementById('next-question-btn')?.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % questionsList.length;
      selectedOption = null;
      submitted = false;
      startTime = Date.now();
      updateView();
    });

    // Attach filter changes
    document.getElementById('filter-subject')?.addEventListener('change', (e) => {
      activeSubject = e.target.value;
      currentIndex = 0;
      selectedOption = null;
      submitted = false;
      updateView();
    });

    document.getElementById('filter-difficulty')?.addEventListener('change', (e) => {
      activeDifficulty = e.target.value;
      currentIndex = 0;
      selectedOption = null;
      submitted = false;
      updateView();
    });

    // Bookmark question
    document.getElementById('save-question-btn')?.addEventListener('click', () => {
      store.toggleBookmark({
        id: currentQ.id,
        type: 'question',
        title: currentQ.question.slice(0, 70),
        subject: currentQ.subject
      });
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: "Question saved to Bookmarks!", type: "success" } }));
    });

    // Explicit Add to Mistake Book
    document.getElementById('add-mistake-btn')?.addEventListener('click', () => {
      store.addMistake(currentQ, "Marked manually for conceptual review");
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: "Added to Mistake Book for spaced revision.", type: "success" } }));
    });
  }

  updateView();
}
