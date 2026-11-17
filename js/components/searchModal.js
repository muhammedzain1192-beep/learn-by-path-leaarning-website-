// Global Search Modal Component with Category Grouping & Instant Jump
import { store } from '../store.js';
import { COURSES_CATALOG } from '../data/coursesCatalog.js';

export function initSearchModal() {
  let modalContainer = document.getElementById('search-modal-container');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'search-modal-container';
    document.body.appendChild(modalContainer);
  }

  // Listen for keyboard shortcut Ctrl+K / Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openModal();
    }
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  window.addEventListener('open-search-modal', openModal);

  function openModal() {
    modalContainer.innerHTML = `
      <div class="modal-overlay" id="search-modal-overlay">
        <div class="modal-content search-modal-box" onclick="event.stopPropagation()">
          <div class="search-input-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--text-muted); margin-right: 12px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="global-search-input" placeholder="Type to search lectures, questions, PYQs, exams..." autofocus />
            <button class="btn btn-ghost btn-sm" id="close-search-modal" style="padding: 4px;">✕</button>
          </div>
          <div class="search-results-list" id="search-results-box">
            <div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: var(--font-sm);">
              Search by topic, chapter (e.g. "Kinematics", "Bonding", "Gauss"), or exam.
            </div>
          </div>
        </div>
      </div>
    `;

    const input = document.getElementById('global-search-input');
    const resultsBox = document.getElementById('search-results-box');
    input?.focus();

    document.getElementById('search-modal-overlay')?.addEventListener('click', closeModal);
    document.getElementById('close-search-modal')?.addEventListener('click', closeModal);

    input?.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        resultsBox.innerHTML = `
          <div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: var(--font-sm);">
            Search by topic, chapter (e.g. "Kinematics", "Bonding", "Gauss"), or exam.
          </div>
        `;
        return;
      }
      renderResults(q, resultsBox);
    });
  }

  function closeModal() {
    modalContainer.innerHTML = '';
  }

  function renderResults(query, container) {
    // 1. Courses
    const matchingCourses = COURSES_CATALOG.filter(c => 
      c.title.toLowerCase().includes(query) ||
      c.subtitle.toLowerCase().includes(query) ||
      c.subjects.some(s => s.name.toLowerCase().includes(query))
    );

    // 2. Lectures
    const matchingLectures = [];
    store.courses.forEach(course => {
      course.chapters.forEach(chap => {
        chap.lectures.forEach(lec => {
          if (lec.title.toLowerCase().includes(query) || 
              chap.title.toLowerCase().includes(query) || 
              lec.teacher.toLowerCase().includes(query)) {
            matchingLectures.push({ ...lec, chapterTitle: chap.title, courseId: course.id, chapterId: chap.id });
          }
        });
      });
    });

    // 3. Questions & PYQs
    const matchingQuestions = store.questions.filter(q => 
      q.question.toLowerCase().includes(query) || 
      q.chapter.toLowerCase().includes(query) || 
      q.concept.toLowerCase().includes(query) ||
      q.exam.toLowerCase().includes(query)
    );

    // 4. Exams
    const matchingExams = store.exams.filter(ex => 
      ex.name.toLowerCase().includes(query) || 
      ex.fullName.toLowerCase().includes(query)
    );

    if (!matchingCourses.length && !matchingLectures.length && !matchingQuestions.length && !matchingExams.length) {
      container.innerHTML = `
        <div style="padding: 2.5rem; text-align: center; color: var(--text-secondary);">
          <p style="font-weight: 600; margin-bottom: 4px;">No results found for "${query}"</p>
          <p style="font-size: var(--font-xs); color: var(--text-muted);">Try searching for "VITEEE", "BITSAT", "Physics", or "SAT".</p>
        </div>
      `;
      return;
    }

    let html = '';

    if (matchingCourses.length) {
      html += `
        <div class="search-group-title">Courses (${matchingCourses.length})</div>
        ${matchingCourses.map(course => `
          <div class="search-result-item" onclick="location.hash='#course/${course.id}'; document.getElementById('search-modal-container').innerHTML=''">
            <div>
              <div style="font-size: var(--font-sm); font-weight: 700; color: var(--text-primary);">${course.icon} ${course.title}</div>
              <div style="font-size: var(--font-xs); color: var(--text-muted);">${course.badge} • ${course.subjects.map(s => s.name).join(', ')}</div>
            </div>
            <span class="badge badge-primary">Open Course →</span>
          </div>
        `).join('')}
      `;
    }

    if (matchingLectures.length) {
      html += `
        <div class="search-group-title">Lectures (${matchingLectures.length})</div>
        ${matchingLectures.slice(0, 5).map(lec => `
          <div class="search-result-item" onclick="location.hash='#player/${lec.courseId}/${lec.chapterId}/${lec.id}'; document.getElementById('search-modal-container').innerHTML=''">
            <div>
              <div style="font-size: var(--font-sm); font-weight: 600; color: var(--text-primary);">${lec.title}</div>
              <div style="font-size: var(--font-xs); color: var(--text-muted);">${lec.chapterTitle} • ${lec.teacher} (${lec.channel})</div>
            </div>
            <span class="badge badge-primary">${lec.duration}</span>
          </div>
        `).join('')}
      `;
    }

    if (matchingQuestions.length) {
      html += `
        <div class="search-group-title" style="margin-top: 12px;">Questions & PYQs (${matchingQuestions.length})</div>
        ${matchingQuestions.slice(0, 4).map(q => `
          <div class="search-result-item" onclick="location.hash='#practice'; document.getElementById('search-modal-container').innerHTML=''">
            <div style="flex: 1; padding-right: 10px;">
              <div style="font-size: var(--font-sm); font-weight: 500; color: var(--text-primary);">${q.question.slice(0, 80)}...</div>
              <div style="font-size: var(--font-xs); color: var(--text-muted);">${q.exam} ${q.year || ''} • ${q.subject} • ${q.concept}</div>
            </div>
            <span class="badge badge-neutral">${q.difficulty}</span>
          </div>
        `).join('')}
      `;
    }

    if (matchingExams.length) {
      html += `
        <div class="search-group-title" style="margin-top: 12px;">Exams (${matchingExams.length})</div>
        ${matchingExams.map(ex => `
          <div class="search-result-item" onclick="location.hash='#exams'; document.getElementById('search-modal-container').innerHTML=''">
            <div>
              <div style="font-size: var(--font-sm); font-weight: 600; color: var(--text-primary);">${ex.name} — ${ex.fullName}</div>
              <div style="font-size: var(--font-xs); color: var(--text-muted);">Updated ${ex.lastUpdated}</div>
            </div>
            <span class="badge badge-accent">View Guide</span>
          </div>
        `).join('')}
      `;
    }

    container.innerHTML = html;
  }
}
