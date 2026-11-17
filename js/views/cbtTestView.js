// Authentic Computer Based Test (CBT) Interface
import { store } from '../store.js';

let testTimerInterval = null;

export function renderCBTTest(params) {
  const container = document.getElementById('view-container');
  if (!container) return;

  const testId = params[0] || store.mockTests[0].id;
  const test = store.mockTests.find(t => t.id === testId) || store.mockTests[0];

  // Hides regular sidebar & header
  document.body.classList.add('cbt-mode');

  // Load questions for this test
  const testQuestions = test.questionIds.map(qid => store.questions.find(q => q.id === qid)).filter(Boolean);
  if (!testQuestions.length) {
    testQuestions.push(...store.questions.slice(0, 5));
  }

  let currentIdx = 0;
  // Status dictionary: { [idx]: { selected: null|number, status: 'not_visited'|'not_answered'|'answered'|'marked' } }
  const questionStates = {};
  testQuestions.forEach((_, i) => {
    questionStates[i] = { selected: null, status: i === 0 ? 'not_answered' : 'not_visited' };
  });

  let remainingSeconds = test.durationMinutes * 60;

  function updatePaletteCounts() {
    let answered = 0, notAnswered = 0, marked = 0, notVisited = 0;
    Object.values(questionStates).forEach(st => {
      if (st.status === 'answered') answered++;
      else if (st.status === 'not_answered') notAnswered++;
      else if (st.status === 'marked') marked++;
      else notVisited++;
    });
    return { answered, notAnswered, marked, notVisited };
  }

  function formatTimer(secs) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function renderView() {
    const q = testQuestions[currentIdx];
    const currentState = questionStates[currentIdx];
    const counts = updatePaletteCounts();

    container.innerHTML = `
      <div class="cbt-container">
        <!-- CBT Top Exam Navigation -->
        <header class="cbt-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span class="badge badge-primary">${test.exam}</span>
            <span class="cbt-exam-name">${test.title}</span>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <div class="cbt-timer-box">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Time Left: <strong id="cbt-timer-display">${formatTimer(remainingSeconds)}</strong></span>
            </div>
            <button class="btn btn-danger btn-sm" id="cbt-submit-btn">
              Submit Test
            </button>
          </div>
        </header>

        <!-- CBT Main Workspace -->
        <div class="cbt-body">
          <!-- Question Pane -->
          <div class="cbt-question-area">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid #E5E7EB; padding-bottom: 8px;">
              <span style="font-weight: 700; font-size: var(--font-base); color: #111827;">
                Question ${currentIdx + 1} of ${testQuestions.length}
              </span>
              <div style="font-size: var(--font-xs); color: #4B5563;">
                Subject: <strong>${q.subject}</strong> • Marks: <strong style="color: #059669;">+4</strong>, <strong style="color: #DC2626;">-1</strong>
              </div>
            </div>

            <!-- Question Statement -->
            <div style="font-size: 1.05rem; font-weight: 500; color: #1F2937; margin-bottom: 1.5rem; line-height: 1.6;">
              ${q.question}
            </div>

            <!-- Options (A, B, C, D) -->
            <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 2rem;">
              ${q.options.map((opt, optIdx) => {
                const label = String.fromCharCode(65 + optIdx);
                const isChecked = currentState.selected === optIdx;
                return `
                  <label style="
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    border: 1px solid ${isChecked ? '#0A5C36' : '#D1D5DB'};
                    background-color: ${isChecked ? '#EDF7F1' : '#FFFFFF'};
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.15s ease;
                  ">
                    <input type="radio" name="cbt-option" value="${optIdx}" ${isChecked ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: #0A5C36;" />
                    <span style="font-weight: 700; width: 22px; color: #4B5563;">(${label})</span>
                    <span style="font-size: var(--font-sm); color: #111827;">${opt}</span>
                  </label>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Right Sidebar: Question Palette & Legend -->
          <div class="cbt-sidebar">
            <h4 style="font-size: var(--font-xs); font-weight: 700; text-transform: uppercase; color: #6B7280; margin-bottom: 12px;">
              Question Status Palette
            </h4>

            <!-- Legend -->
            <div class="cbt-status-legend">
              <div class="legend-item">
                <span class="palette-pill status-answered">${counts.answered}</span>
                <span>Answered</span>
              </div>
              <div class="legend-item">
                <span class="palette-pill status-not-answered">${counts.notAnswered}</span>
                <span>Not Answered</span>
              </div>
              <div class="legend-item">
                <span class="palette-pill status-marked">${counts.marked}</span>
                <span>Marked for Review</span>
              </div>
              <div class="legend-item">
                <span class="palette-pill status-not-visited">${counts.notVisited}</span>
                <span>Not Visited</span>
              </div>
            </div>

            <!-- Grid of all question numbers -->
            <div class="palette-grid">
              ${testQuestions.map((_, i) => {
                const st = questionStates[i];
                let statusClass = `status-${st.status.replace('_', '-')}`;
                if (i === currentIdx) statusClass += ' current';
                return `
                  <button class="palette-pill ${statusClass}" data-q-jump="${i}">
                    ${i + 1}
                  </button>
                `;
              }).join('')}
            </div>

            <div style="margin-top: auto; padding: 12px; background: #EEF2F6; border-radius: 8px; font-size: 11px; color: #4B5563;">
              <strong>Note:</strong> Questions marked for review will be evaluated according to official exam rules.
            </div>
          </div>
        </div>

        <!-- CBT Footer Action Bar -->
        <footer class="cbt-footer">
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" id="cbt-prev-btn" ${currentIdx === 0 ? 'disabled' : ''}>
              ← Previous
            </button>
            <button class="btn btn-ghost btn-sm" id="cbt-clear-btn">
              Clear Response
            </button>
          </div>

          <div style="display: flex; gap: 8px;">
            <button class="btn btn-outline btn-sm" id="cbt-mark-review-btn">
              Mark for Review & Next
            </button>
            <button class="btn btn-primary btn-sm" id="cbt-save-next-btn">
              Save & Next →
            </button>
          </div>
        </footer>
      </div>
    `;

    // Attach option changes
    document.querySelectorAll('input[name="cbt-option"]').forEach(input => {
      input.addEventListener('change', (e) => {
        questionStates[currentIdx].selected = parseInt(e.target.value);
      });
    });

    // Save & Next
    document.getElementById('cbt-save-next-btn')?.addEventListener('click', () => {
      const selected = questionStates[currentIdx].selected;
      questionStates[currentIdx].status = selected !== null ? 'answered' : 'not_answered';
      if (currentIdx < testQuestions.length - 1) {
        currentIdx++;
        if (questionStates[currentIdx].status === 'not_visited') {
          questionStates[currentIdx].status = 'not_answered';
        }
      }
      renderView();
    });

    // Mark for Review & Next
    document.getElementById('cbt-mark-review-btn')?.addEventListener('click', () => {
      questionStates[currentIdx].status = 'marked';
      if (currentIdx < testQuestions.length - 1) {
        currentIdx++;
        if (questionStates[currentIdx].status === 'not_visited') {
          questionStates[currentIdx].status = 'not_answered';
        }
      }
      renderView();
    });

    // Clear Response
    document.getElementById('cbt-clear-btn')?.addEventListener('click', () => {
      questionStates[currentIdx].selected = null;
      questionStates[currentIdx].status = 'not_answered';
      renderView();
    });

    // Previous
    document.getElementById('cbt-prev-btn')?.addEventListener('click', () => {
      if (currentIdx > 0) {
        currentIdx--;
        renderView();
      }
    });

    // Palette direct jumps
    document.querySelectorAll('[data-q-jump]').forEach(btn => {
      btn.addEventListener('click', () => {
        const jumpIdx = parseInt(btn.getAttribute('data-q-jump'));
        currentIdx = jumpIdx;
        if (questionStates[currentIdx].status === 'not_visited') {
          questionStates[currentIdx].status = 'not_answered';
        }
        renderView();
      });
    });

    // Submit test handler
    document.getElementById('cbt-submit-btn')?.addEventListener('click', () => {
      if (confirm("Are you sure you want to submit the examination now? You cannot make further changes.")) {
        finishTest();
      }
    });
  }

  function finishTest() {
    if (testTimerInterval) clearInterval(testTimerInterval);
    document.body.classList.remove('cbt-mode');

    // Calculate score
    let correct = 0, wrong = 0, unattempted = 0;
    testQuestions.forEach((q, i) => {
      const st = questionStates[i];
      if (st.selected === null) {
        unattempted++;
      } else if (st.selected === q.correctIndex) {
        correct++;
      } else {
        wrong++;
      }
    });

    const score = (correct * 4) - (wrong * 1);
    const attempted = correct + wrong;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    const percentile = Math.min(99.9, Math.max(70, Math.round((accuracy + 18) * 10) / 10));

    const attemptRecord = {
      id: `attempt-${Date.now()}`,
      testId: test.id,
      testTitle: test.title,
      date: store.getTodayDateString(),
      totalScore: Math.max(0, score),
      maxScore: testQuestions.length * 4,
      percentile,
      accuracy,
      attempted,
      correct,
      incorrect: wrong,
      unattempted,
      subjectBreakdown: {
        Physics: { score: Math.max(0, correct * 4), max: testQuestions.length * 4, attempted, correct, incorrect: wrong }
      },
      weakTopics: wrong > 0 ? ["Kinematics Graphs", "Relative River Crossing"] : [],
      recommendedRevision: [
        { topic: "Relative Motion in 2D", subject: "Physics", action: "#courses" }
      ]
    };

    store.saveTestAttempt(attemptRecord);
    location.hash = `#test-result/${attemptRecord.id}`;
  }

  // Live countdown timer
  if (testTimerInterval) clearInterval(testTimerInterval);
  testTimerInterval = setInterval(() => {
    remainingSeconds--;
    const timerDisplay = document.getElementById('cbt-timer-display');
    if (timerDisplay) {
      timerDisplay.textContent = formatTimer(remainingSeconds);
    }
    if (remainingSeconds <= 0) {
      clearInterval(testTimerInterval);
      alert("Time is up! Your examination will now be automatically submitted.");
      finishTest();
    }
  }, 1000);

  renderView();
}
