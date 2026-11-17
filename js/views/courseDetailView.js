import { COURSES_CATALOG, getCourseById, saveCustomChapter, deleteCustomChapter } from '../data/coursesCatalog.js';
import { store } from '../store.js';

export function renderCourseDetail(params = []) {
  const container = document.getElementById('view-container');
  if (!container) return;

  const [courseIdentifier, initialSubjectId, initialStreamId] = params;
  const course = getCourseById(courseIdentifier);

  // Determine active subject
  let activeSubjectId = initialSubjectId;
  let activeSubject = course.subjects.find(s => s.id === activeSubjectId);
  if (!activeSubject) {
    activeSubject = course.subjects[0];
    activeSubjectId = activeSubject.id;
  }

  // Determine active stream for dual-track subjects (Maths vs Biology in VITEEE & BITSAT)
  let activeStreamId = initialStreamId || 'maths';
  let activeChapterFilter = '';

  function renderView() {
    // If the subject has stream toggle, get the current stream's chapters
    let displayChapters = [];
    let currentStream = null;

    if (activeSubject.hasStreamToggle && activeSubject.streams) {
      currentStream = activeSubject.streams.find(st => st.id === activeStreamId) || activeSubject.streams[0];
      displayChapters = currentStream.chapters || [];
    } else {
      displayChapters = activeSubject.chapters || [];
    }

    // Filter chapters if search query exists
    if (activeChapterFilter.trim()) {
      const q = activeChapterFilter.toLowerCase();
      displayChapters = displayChapters.filter(ch => 
        ch.title.toLowerCase().includes(q) ||
        (ch.topics && ch.topics.some(t => t.toLowerCase().includes(q)))
      );
    }

    container.innerHTML = `
      <!-- Top Breadcrumb & Action Row -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); flex-wrap: wrap; gap: var(--space-2);">
        <div style="display: flex; align-items: center; gap: 8px; font-size: var(--font-xs); color: var(--text-secondary);">
          <a href="#courses" style="color: var(--color-primary); font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 4px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            All Courses
          </a>
          <span>/</span>
          <span style="color: var(--text-primary); font-weight: 600;">${course.title}</span>
        </div>

        <div style="display: flex; gap: var(--space-2);">
          <a href="#courses" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Courses
          </a>
          <a href="#practice" class="btn btn-outline btn-sm">Practice PYQs</a>
          <a href="#mock-tests" class="btn btn-primary btn-sm">Mock Test Hall</a>
        </div>
      </div>

      <!-- Course Hero Banner -->
      <div class="course-detail-hero" style="background: ${course.gradient};">
        <div class="course-hero-content">
          <div class="course-badge-pill">
            <span>${course.badge}</span>
          </div>

          <h1 style="font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 8px; line-height: 1.2;">
            ${course.title}
          </h1>

          <p style="font-size: var(--font-base); max-width: 780px; opacity: 0.92; line-height: 1.5; margin-bottom: var(--space-4);">
            ${course.description}
          </p>

          <!-- Quick Stats Row -->
          <div class="course-stats-row">
            <div class="course-stat-chip">
              <span><strong>${course.subjects.length}</strong> Subjects</span>
            </div>
            <div class="course-stat-chip">
              <span><strong>${course.totalChapters}</strong> Chapters</span>
            </div>
            <div class="course-stat-chip">
              <span><strong>${course.totalContents}</strong> Structured Lessons</span>
            </div>
            <div class="course-stat-chip" style="background: rgba(16, 185, 129, 0.25); border-color: rgba(16, 185, 129, 0.4);">
              <span><strong>Free & Unlocked</strong></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Subject Selection Section Header -->
      <div style="margin-bottom: var(--space-4); display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: var(--space-2);">
        <div>
          <h2 style="font-size: var(--font-lg); font-weight: 700; color: var(--text-primary); margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
            <span>Choose Subject</span>
            <span class="badge badge-primary">${course.subjects.length} Options Available</span>
          </h2>
          <p style="font-size: var(--font-xs); color: var(--text-secondary);">
            Select a subject to view its structured chapters, video lectures, and practice modules.
          </p>
        </div>

        <div style="font-size: var(--font-xs); color: var(--text-muted);">
          Active: <strong style="color: var(--color-primary);">${activeSubject.name}</strong>
        </div>
      </div>

      <!-- Subject Options Interactive Cards Grid -->
      <div class="subjects-selection-grid" id="subjects-container">
        ${course.subjects.map(subject => {
          const isActive = subject.id === activeSubjectId;
          return `
            <div class="subject-option-card ${isActive ? 'active' : ''}" 
                 data-subject-id="${subject.id}" 
                 style="--subject-color: ${subject.color};">
              <div>
                <div class="subject-card-header">
                  <div class="subject-icon-box" style="background-color: ${subject.bgLight || 'var(--bg-surface)'}; color: ${subject.color}; display: flex; align-items: center; justify-content: center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                  </div>
                  <span class="badge ${isActive ? 'badge-primary' : 'badge-neutral'}">
                    ${isActive ? 'Selected' : `${subject.totalChapters} Ch.`}
                  </span>
                </div>

                <div class="subject-name-title">${subject.name}</div>
                <div class="subject-weightage-badge">${subject.weightage || `${subject.totalLectures || 20} Lectures`}</div>
                
                <p style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.4; margin-bottom: var(--space-3);">
                  ${subject.description || 'Structured concept lessons and question banks.'}
                </p>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">
                  <span>Progress</span>
                  <span style="color: var(--color-primary);">${subject.totalQuestions || 100}+ Practice Qs</span>
                </div>
                <div style="width: 100%; height: 4px; background: var(--border-subtle); border-radius: 2px; overflow: hidden;">
                  <div style="width: ${isActive ? '60%' : '15%'}; height: 100%; background: ${subject.color}; border-radius: 2px;"></div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Stream Switcher (If Selected Subject has Dual Track like Maths / Biology for VITEEE or BITSAT) -->
      ${activeSubject.hasStreamToggle && activeSubject.streams ? `
        <div class="stream-toggle-wrap">
          <div>
            <div style="font-size: var(--font-sm); font-weight: 700; color: var(--text-primary); margin-bottom: 2px;">
              Stream Track Selection
            </div>
            <div style="font-size: var(--font-xs); color: var(--text-secondary);">
              ${course.id === '4' ? 'VITEEE allows candidates to choose Mathematics (Engineering) or Biology (Bio-stream).' : 'BITSAT allows candidates to take Mathematics (B.E.) or Biology (B.Pharm).'}
            </div>
          </div>

          <div class="stream-toggle-buttons">
            ${activeSubject.streams.map(st => `
              <button class="stream-toggle-btn ${st.id === activeStreamId ? 'active' : ''}" data-stream-id="${st.id}">
                <span>${st.icon}</span>
                <span>${st.label}</span>
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Active Subject Curriculum Section -->
      <div style="margin-top: var(--space-6);">
        <!-- Curriculum Header Bar with Search -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-5); flex-wrap: wrap; gap: var(--space-3);">
          <div>
            <h3 style="font-size: var(--font-md); font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
              <span>${currentStream ? currentStream.label : activeSubject.name} Curriculum</span>
              <span class="badge badge-accent">${displayChapters.length} Chapters</span>
            </h3>
            <p style="font-size: var(--font-xs); color: var(--text-secondary);">
              Detailed chapters, video lectures, and practice drills. Click any lecture to open in the player.
            </p>
          </div>

          <div style="display: flex; gap: var(--space-2); align-items: center; flex-wrap: wrap;">
            <div style="position: relative;">
              <svg style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--text-muted);" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="chapter-search-input" value="${activeChapterFilter}" placeholder="Search chapters or topics..." style="padding: 7px 12px 7px 32px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); background: var(--bg-input); color: var(--text-primary); font-size: var(--font-xs); width: 190px;" />
            </div>
            <button id="add-chapter-top-btn" class="btn btn-primary btn-sm">+ Add Chapter</button>
            <button id="expand-all-btn" class="btn btn-secondary btn-sm">Expand All</button>
          </div>
        </div>

        <!-- Chapters List -->
        <div id="chapters-list-container">
          ${displayChapters.length === 0 ? `
            <div class="card" style="padding: 3rem 2rem; text-align: center; color: var(--text-secondary); background: var(--bg-surface-secondary); border: 2px dashed var(--border-default); border-radius: var(--radius-lg); margin-top: 1rem;">
              <h4 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">
                ${activeChapterFilter ? `No chapters matching "${activeChapterFilter}"` : 'No Chapters in this Subject Yet'}
              </h4>
              <p style="font-size: var(--font-xs); color: var(--text-muted); max-width: 440px; margin: 0 auto 16px auto;">
                ${activeChapterFilter ? 'Try clearing your search keyword.' : 'All demo chapters have been cleared. Enter your own chapters freshly to organize this course!'}
              </p>
              ${activeChapterFilter ? `
                <button class="btn btn-secondary btn-sm" id="clear-search-btn">Clear Search</button>
              ` : `
                <button class="btn btn-primary btn-sm" id="empty-add-chapter-btn">+ Add First Chapter</button>
              `}
            </div>
          ` : displayChapters.map((chapter, chIdx) => `
            <div class="chapter-accordion-card" id="chapter-${chapter.id}">
              <!-- Accordion Header -->
              <div class="chapter-accordion-header" data-toggle-chapter="${chapter.id}">
                <div style="display: flex; align-items: center; gap: 14px; flex: 1;">
                  <div style="width: 32px; height: 32px; border-radius: var(--radius-md); background: var(--bg-surface-secondary); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; font-size: var(--font-xs); font-weight: 700; color: var(--color-primary);">
                    ${chIdx + 1}
                  </div>
                  <div>
                    <h4 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin-bottom: 2px;">
                      ${chapter.title}
                    </h4>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: var(--font-xs); color: var(--text-muted); flex-wrap: wrap;">
                      <span>${chapter.lectureCount || (chapter.lectures ? chapter.lectures.length : 1)} Lectures</span>
                      <span>•</span>
                      <span>${chapter.questionCount || 40} Practice Questions</span>
                      <span>•</span>
                      <span>${chapter.pyqCount || 20} PYQs</span>
                    </div>
                  </div>
                </div>

                <div style="display: flex; align-items: center; gap: 10px;">
                  <div style="display: flex; align-items: center; gap: 6px; font-size: var(--font-xs); font-weight: 600; color: var(--color-primary);">
                    <div style="width: 60px; height: 4px; background: var(--border-subtle); border-radius: 2px; overflow: hidden;">
                      <div style="width: ${chapter.progress || 0}%; height: 100%; background: var(--color-primary); border-radius: 2px;"></div>
                    </div>
                    <span>${chapter.progress || 0}%</span>
                  </div>
                  <button class="btn btn-ghost btn-sm delete-chapter-btn" data-chapter-id="${chapter.id}" title="Delete Chapter" style="padding: 2px 6px; color: var(--text-muted); font-size: 13px;" onclick="event.stopPropagation()">✕</button>
                  <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transition: transform var(--transition-fast);"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>

              <!-- Accordion Body: Topic Chips & Lectures -->
              <div class="chapter-lectures-container" id="body-${chapter.id}">
                <!-- Topic Chips -->
                ${chapter.topics && chapter.topics.length ? `
                  <div style="margin-bottom: var(--space-2);">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">Key Topics Covered</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                      ${chapter.topics.map(topic => `
                        <span style="font-size: 11px; padding: 3px 8px; border-radius: var(--radius-sm); background: var(--bg-surface); border: 1px solid var(--border-subtle); color: var(--text-secondary);">
                          ${topic}
                        </span>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}

                <!-- Lectures List -->
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${(chapter.lectures || []).map((lec, lecIdx) => `
                    <div class="lecture-row-card">
                      <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
                        <div class="lecture-index-circle">
                          ${lec.lectureNumber || lecIdx + 1}
                        </div>
                        <div>
                          <div style="font-size: var(--font-sm); font-weight: 700; color: var(--text-primary); margin-bottom: 2px;">
                            ${lec.title}
                          </div>
                          <div style="font-size: var(--font-xs); color: var(--text-muted); display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                            <span>Educator: <strong>${lec.teacher}</strong> (${lec.channel})</span>
                            <span>•</span>
                            <span>Duration: ${lec.duration}</span>
                            <span>•</span>
                            <span class="badge ${lec.difficulty === 'Easy' ? 'badge-neutral' : (lec.difficulty === 'Hard' ? 'badge-danger' : 'badge-primary')}" style="padding: 1px 6px; font-size: 10px;">
                              ${lec.difficulty || 'Medium'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div style="display: flex; gap: 8px; align-items: center;">
                        <button class="btn btn-outline btn-sm dl-lecture-btn" data-lec-title="${lec.title}" data-lec-dur="${lec.duration || '40 mins'}" data-ch-title="${chapter.title}" title="Download video to Downloads folder" style="padding: 4px 8px;">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        </button>
                        <a href="#player/${course.id}/${chapter.id}/${lec.id}" class="btn btn-primary btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          Watch Lecture
                        </a>
                        <a href="#practice" class="btn btn-secondary btn-sm" title="Practice questions from this chapter">
                          Practice
                        </a>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Subject Bottom Quick Hub -->
        <div style="margin-top: var(--space-8); display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-5);">
          <!-- Formula & Revision Notes Card -->
          <div class="card" style="background: var(--bg-surface-secondary); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: var(--space-5);">
            <div style="font-size: var(--font-xs); font-weight: 700; color: var(--color-primary); margin-bottom: 4px; text-transform: uppercase;">
              Formula Sheet & Revision
            </div>
            <h4 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
              ${activeSubject.name} High-Yield Formula Guide
            </h4>
            <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.5;">
              Condensed key formulas, standard approximations, and critical derivation shortcuts for fast revision before tests.
            </p>
            <a href="#revision" class="btn btn-outline btn-sm">Open Formula Sheet →</a>
          </div>

          <!-- Practice Drill Card -->
          <div class="card" style="background: var(--bg-surface-secondary); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: var(--space-5);">
            <div style="font-size: var(--font-xs); font-weight: 700; color: var(--color-accent); margin-bottom: 4px; text-transform: uppercase;">
              Question Drills
            </div>
            <h4 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
              ${activeSubject.name} Level-Wise Practice
            </h4>
            <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.5;">
              Solve single-choice questions, previous years questions (PYQs), and timed flash quizzes for ${activeSubject.name}.
            </p>
            <a href="#practice" class="btn btn-secondary btn-sm">Launch Practice Drill →</a>
          </div>

          <!-- Add Class Card -->
          <div class="card" style="background: var(--bg-surface-secondary); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: var(--space-5);">
            <div style="font-size: var(--font-xs); font-weight: 700; color: #818CF8; margin-bottom: 4px; text-transform: uppercase;">
              Custom Lectures
            </div>
            <h4 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
              Add YouTube Class to ${course.title}
            </h4>
            <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.5;">
              Found a great YouTube lecture? Paste its URL to automatically index it into this course's curriculum.
            </p>
            <a href="#add-class" class="btn btn-primary btn-sm">+ Add YouTube Video</a>
          </div>
        </div>
      </div>
    `;

    // Attach Event Listeners
    setupEventListeners();
  }

  function setupEventListeners() {
    // 1. Subject card selection
    document.querySelectorAll('.subject-option-card').forEach(card => {
      card.addEventListener('click', () => {
        const sid = card.getAttribute('data-subject-id');
        if (sid && sid !== activeSubjectId) {
          activeSubjectId = sid;
          activeSubject = course.subjects.find(s => s.id === sid) || course.subjects[0];
          activeChapterFilter = '';
          // Update URL hash to reflect chosen subject without reloading
          window.location.hash = `#course/${course.id}/${activeSubjectId}`;
          renderView();
        }
      });
    });

    // 2. Stream Toggle buttons (Maths vs Biology)
    document.querySelectorAll('.stream-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const stid = btn.getAttribute('data-stream-id');
        if (stid && stid !== activeStreamId) {
          activeStreamId = stid;
          renderView();
        }
      });
    });

    // 3. Chapter Accordion toggles
    document.querySelectorAll('[data-toggle-chapter]').forEach(header => {
      header.addEventListener('click', () => {
        const chId = header.getAttribute('data-toggle-chapter');
        const bodyEl = document.getElementById(`body-${chId}`);
        const chevron = header.querySelector('.chevron-icon');
        if (bodyEl) {
          const isCollapsed = bodyEl.style.display === 'none';
          bodyEl.style.display = isCollapsed ? 'flex' : 'none';
          if (chevron) {
            chevron.style.transform = isCollapsed ? 'rotate(0deg)' : 'rotate(-90deg)';
          }
        }
      });
    });

    // 4. Chapter Search input
    const searchInput = document.getElementById('chapter-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        activeChapterFilter = e.target.value;
        renderView();
        // Keep focus and cursor in search input after re-render
        const newSearchInput = document.getElementById('chapter-search-input');
        if (newSearchInput) {
          newSearchInput.focus();
          newSearchInput.setSelectionRange(activeChapterFilter.length, activeChapterFilter.length);
        }
      });
    }

    // 5. Clear Search button
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        activeChapterFilter = '';
        renderView();
      });
    }

    // 6. Expand / Collapse All
    const expandAllBtn = document.getElementById('expand-all-btn');
    if (expandAllBtn) {
      let isAllExpanded = true;
      expandAllBtn.addEventListener('click', () => {
        isAllExpanded = !isAllExpanded;
        expandAllBtn.textContent = isAllExpanded ? 'Collapse All' : 'Expand All';
        document.querySelectorAll('.chapter-lectures-container').forEach(body => {
          body.style.display = isAllExpanded ? 'flex' : 'none';
        });
        document.querySelectorAll('.chevron-icon').forEach(ch => {
          ch.style.transform = isAllExpanded ? 'rotate(0deg)' : 'rotate(-90deg)';
        });
      });
    }

    // 7. Add Chapter Modal triggers
    document.getElementById('add-chapter-top-btn')?.addEventListener('click', () => showAddChapterModal());
    document.getElementById('empty-add-chapter-btn')?.addEventListener('click', () => showAddChapterModal());

    // 8. Delete Chapter triggers
    document.querySelectorAll('.delete-chapter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const chId = btn.getAttribute('data-chapter-id');
        if (chId && confirm("Delete this chapter?")) {
          deleteCustomChapter(course.id, activeSubject.id, activeSubject.hasStreamToggle ? activeStreamId : null, chId);
          renderView();
        }
      });
    });

    // 9. Download lecture triggers
    document.querySelectorAll('.dl-lecture-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const title = btn.getAttribute('data-lec-title');
        const dur = btn.getAttribute('data-lec-dur');
        const chTitle = btn.getAttribute('data-ch-title');
        store.addDownload({
          title: title || 'Curriculum Lecture',
          subject: activeSubject.name || course.title,
          chapter: chTitle || 'Course Chapter',
          part: 'Lecture Video',
          duration: dur || '45 mins',
          quality: '1080p Full HD',
          size: '280 MB',
          videoUrl: 'https://www.youtube.com/watch?v=ZM8ECw1yZ1Y'
        });
        window.dispatchEvent(new CustomEvent('show-toast', { 
          detail: { 
            message: `Saved "${title}" to Downloads folder!`, 
            type: "success" 
          } 
        }));
      });
    });
  }

  function showAddChapterModal() {
    let modalWrapper = document.getElementById('add-chapter-modal-wrapper');
    if (!modalWrapper) {
      modalWrapper = document.createElement('div');
      modalWrapper.id = 'add-chapter-modal-wrapper';
      document.body.appendChild(modalWrapper);
    }

    modalWrapper.innerHTML = `
      <div class="modal-overlay" id="chapter-modal-overlay" style="display: flex; align-items: center; justify-content: center; z-index: 10000;">
        <div class="modal-content" style="max-width: 480px; width: 100%;" onclick="event.stopPropagation()">
          <div class="modal-header">
            <div>
              <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin: 0;">Add New Chapter</h3>
              <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-top: 2px;">
                Adding to <strong>${activeSubject.name}</strong> (${course.title})
              </p>
            </div>
            <button class="btn btn-ghost btn-sm" id="close-chapter-modal">✕</button>
          </div>

          <form id="new-chapter-form" class="modal-body" style="display: flex; flex-direction: column; gap: 14px; padding: 1.25rem;">
            <div>
              <label style="display: block; font-size: var(--font-xs); font-weight: 600; color: var(--text-secondary); margin-bottom: 4px;">Chapter Title *</label>
              <input type="text" id="chapter-title-input" class="form-control" placeholder="e.g. Kinematics & Motion in 1D & 2D" required autofocus style="width: 100%; padding: 10px 12px; font-size: var(--font-sm); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); background: var(--bg-input); color: var(--text-primary);" />
            </div>

            <div>
              <label style="display: block; font-size: var(--font-xs); font-weight: 600; color: var(--text-secondary); margin-bottom: 4px;">Topics / Subtopics (comma separated)</label>
              <input type="text" id="chapter-topics-input" class="form-control" placeholder="e.g. Vectors, Relative Velocity, Projectile Motion" style="width: 100%; padding: 10px 12px; font-size: var(--font-sm); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); background: var(--bg-input); color: var(--text-primary);" />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div>
                <label style="display: block; font-size: var(--font-xs); font-weight: 600; color: var(--text-secondary); margin-bottom: 4px;">Practice Questions</label>
                <input type="number" id="chapter-q-input" class="form-control" value="25" min="0" style="width: 100%; padding: 10px 12px; font-size: var(--font-sm); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); background: var(--bg-input); color: var(--text-primary);" />
              </div>
              <div>
                <label style="display: block; font-size: var(--font-xs); font-weight: 600; color: var(--text-secondary); margin-bottom: 4px;">PYQs</label>
                <input type="number" id="chapter-pyq-input" class="form-control" value="15" min="0" style="width: 100%; padding: 10px 12px; font-size: var(--font-sm); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); background: var(--bg-input); color: var(--text-primary);" />
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px;">
              <button type="button" class="btn btn-secondary btn-sm" id="cancel-chapter-modal">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm">Add Chapter</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const closeModal = () => { modalWrapper.innerHTML = ''; };
    document.getElementById('close-chapter-modal')?.addEventListener('click', closeModal);
    document.getElementById('cancel-chapter-modal')?.addEventListener('click', closeModal);
    document.getElementById('chapter-modal-overlay')?.addEventListener('click', closeModal);

    document.getElementById('new-chapter-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('chapter-title-input')?.value.trim();
      const topicsRaw = document.getElementById('chapter-topics-input')?.value.trim();
      const questionCount = document.getElementById('chapter-q-input')?.value || 20;
      const pyqCount = document.getElementById('chapter-pyq-input')?.value || 10;

      if (title) {
        saveCustomChapter(
          course.id,
          activeSubject.id,
          activeSubject.hasStreamToggle ? activeStreamId : null,
          {
            title,
            topics: topicsRaw ? topicsRaw.split(',').map(s => s.trim()).filter(Boolean) : [],
            questionCount,
            pyqCount
          }
        );
        closeModal();
        renderView();
      }
    });
  }

  // Initial render
  renderView();
}
