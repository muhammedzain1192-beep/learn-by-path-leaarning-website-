// Focused Lecture Player Page with YouTube embed, curriculum checklist, and notes
import { store } from '../store.js';
import { getCourseById } from '../data/coursesCatalog.js';

export function renderLecturePlayer(params) {
  const container = document.getElementById('view-container');
  if (!container) return;

  const [courseId, chapterId, lectureId] = params;

  // 1. Look in store.courses
  let course = store.courses.find(c => c.id === courseId);
  let chapter = course ? course.chapters.find(ch => ch.id === chapterId) : null;
  let allChapters = [];

  // 2. If not found or if from catalog, look in COURSES_CATALOG
  const catalogCourse = getCourseById(courseId);
  if (catalogCourse) {
    catalogCourse.subjects.forEach(sub => {
      if (sub.hasStreamToggle && sub.streams) {
        sub.streams.forEach(st => {
          if (st.chapters) allChapters.push(...st.chapters.map(ch => ({ ...ch, subjectName: `${sub.name} (${st.label})` })));
        });
      } else if (sub.chapters) {
        allChapters.push(...sub.chapters.map(ch => ({ ...ch, subjectName: sub.name })));
      }
    });

    if (!course) {
      course = {
        id: catalogCourse.id,
        subject: catalogCourse.title,
        title: catalogCourse.title,
        chapters: allChapters
      };
    }
  }

  if (!course) {
    course = store.courses[0];
  }

  chapter = (course && course.chapters ? course.chapters.find(ch => ch.id === chapterId) : null) || 
            allChapters.find(ch => ch.id === chapterId) || 
            (course && course.chapters ? course.chapters[0] : null) ||
            allChapters[0];

  const lectures = (chapter && chapter.lectures) ? chapter.lectures : [];
  const lectureIndex = lectures.findIndex(l => l.id === lectureId);
  const currentLecture = lectureIndex !== -1 ? lectures[lectureIndex] : (lectures[0] || {
    id: "lec-default",
    title: "Introduction to Concept",
    teacher: "Faculty Expert",
    channel: "Academic Hub",
    duration: "45 min",
    youtubeId: "dQw4w9WgXcQ",
    notes: "Review standard formulas and key theorems."
  });

  const prevLecture = lectureIndex > 0 ? lectures[lectureIndex - 1] : null;
  const nextLecture = lectureIndex < lectures.length - 1 ? lectures[lectureIndex + 1] : null;

  const isSaved = store.isBookmarked(currentLecture.id);
  const isDownloaded = store.isDownloaded ? (store.isDownloaded(currentLecture.title) || store.isDownloaded(currentLecture.id)) : false;

  // Auto record in watch history for My Report
  if (store.recordVideoWatched && currentLecture.title) {
    store.recordVideoWatched({
      title: currentLecture.title,
      subject: course.subject || course.title || 'Physics',
      chapter: chapter.title || 'Chapter Topic',
      part: `Lecture ${currentLecture.lectureNumber || 1}`,
      duration: currentLecture.duration || '45 mins'
    });
  }

  container.innerHTML = `
    <!-- Top breadcrumb navigation -->
    <div style="margin-bottom: var(--space-4); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
      <div style="font-size: var(--font-xs); color: var(--text-secondary);">
        <a href="#courses" style="color: var(--text-secondary);">Courses</a> / 
        <a href="#course/${course.id}" style="color: var(--color-primary); font-weight: 600; text-decoration: none;">${course.title || course.subject}</a> / 
        <span>${chapter.title}</span>
      </div>
      <a href="#course/${course.id}" class="btn btn-ghost btn-sm">← Back to Course</a>
    </div>

    <!-- Theatre Mode Layout -->
    <div class="lecture-theater-grid">
      <!-- Main Player Column -->
      <div>
        <!-- YouTube Embed Player -->
        <div class="video-container">
          <iframe 
            src="https://www.youtube-nocookie.com/embed/${currentLecture.youtubeId}?autoplay=0&rel=0&modestbranding=1" 
            title="${currentLecture.title}" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>

        <!-- Player Controls & Completion Toggle -->
        <div class="lecture-control-bar">
          <div style="display: flex; gap: 8px;">
            ${prevLecture ? `
              <a href="#player/${course.id}/${chapter.id}/${prevLecture.id}" class="btn btn-secondary btn-sm">
                ← Previous Lecture
              </a>
            ` : `<button class="btn btn-secondary btn-sm" disabled>← Previous</button>`}
            
            ${nextLecture ? `
              <a href="#player/${course.id}/${chapter.id}/${nextLecture.id}" class="btn btn-secondary btn-sm">
                Next Lecture →
              </a>
            ` : `<button class="btn btn-secondary btn-sm" disabled>Next →</button>`}
          </div>

          <div style="display: flex; gap: 8px; align-items: center;">
            <button id="download-lecture-btn" class="btn ${isDownloaded ? 'btn-secondary' : 'btn-outline'} btn-sm" title="Save video to offline downloads folder">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px; vertical-align: -2px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              ${isDownloaded ? 'Downloaded (In Folder)' : 'Download Video'}
            </button>

            <button id="toggle-bookmark-btn" class="btn btn-outline btn-sm">
              ${isSaved ? '★ Bookmarked' : '☆ Bookmark Lecture'}
            </button>

            <button id="toggle-complete-btn" class="btn ${currentLecture.completed ? 'btn-secondary' : 'btn-primary'} btn-sm">
              ${currentLecture.completed ? '✓ Completed' : 'Mark as Complete'}
            </button>
          </div>
        </div>

        <!-- Lecture Metadata & Notes -->
        <div class="card" style="margin-bottom: var(--space-6);">
          <div class="card-header">
            <div>
              <div style="font-size: var(--font-xs); font-weight: 700; color: var(--color-primary); margin-bottom: 2px;">
                LECTURE ${currentLecture.lectureNumber || 1} • ${currentLecture.difficulty || 'Medium'}
              </div>
              <h2 style="font-size: var(--font-lg); font-weight: 700; color: var(--text-primary); margin: 0;">
                ${currentLecture.title}
              </h2>
              <div style="font-size: var(--font-xs); color: var(--text-secondary); margin-top: 4px;">
                Educator: <strong>${currentLecture.teacher}</strong> • Channel: <strong>${currentLecture.channel}</strong> • Duration: ${currentLecture.duration}
              </div>
            </div>
          </div>
          <div class="card-body">
            <h4 style="font-size: var(--font-xs); font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">
              Key Formulas & Lecture Notes
            </h4>
            <div style="background-color: var(--bg-surface-secondary); padding: var(--space-4); border-radius: var(--radius-md); font-size: var(--font-sm); line-height: 1.6; border: 1px solid var(--border-subtle);">
              ${currentLecture.notes || "No notes recorded yet for this lecture."}
            </div>
          </div>
        </div>
      </div>

      <!-- Right Curriculum Sidebar (✓, ▶, ○) -->
      <div>
        <div class="curriculum-sidebar">
          <div class="curriculum-header">
            <span>Chapter Content</span>
            <span style="font-size: var(--font-xs); color: var(--color-primary); font-weight: 700;">${chapter.progress}% Done</span>
          </div>
          <div class="curriculum-items">
            ${(chapter.lectures || []).map((lec, idx) => {
              const isPlaying = lec.id === currentLecture.id;
              const isDone = lec.completed;
              return `
                <a href="#player/${course.id}/${chapter.id}/${lec.id}" class="curriculum-item ${isPlaying ? 'active' : ''}">
                  <span class="item-status-icon ${isDone ? 'completed' : (isPlaying ? 'playing' : 'pending')}">
                    ${isDone ? '✓' : (isPlaying ? '▶' : '○')}
                  </span>
                  <div style="flex: 1; min-width: 0;">
                    <div style="font-weight: ${isPlaying ? '700' : '500'}; color: ${isPlaying ? 'var(--color-primary)' : 'var(--text-primary)'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      ${String(idx + 1).padStart(2, '0')} ${lec.title}
                    </div>
                    <div style="font-size: 11px; color: var(--text-muted);">
                      ${lec.teacher} • ${lec.duration}
                    </div>
                  </div>
                </a>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Next in Learning Loop Card -->
        <div class="card" style="margin-top: var(--space-4); background: var(--bg-surface-secondary);">
          <div class="card-body" style="padding: var(--space-4);">
            <div style="font-size: var(--font-xs); font-weight: 700; color: var(--color-primary); margin-bottom: 4px;">Next in Learning Loop</div>
            <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-bottom: 12px;">
              Done with lectures? Consolidate with targeted question practice.
            </p>
            <a href="#practice" class="btn btn-outline btn-sm" style="width: 100%;">Solve Chapter Practice →</a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach completion button handler
  document.getElementById('toggle-complete-btn')?.addEventListener('click', () => {
    const newState = !currentLecture.completed;
    store.markLectureComplete(course.id, chapter.id, currentLecture.id, newState);
    window.dispatchEvent(new CustomEvent('show-toast', { 
      detail: { 
        message: newState ? "Marked as completed! Progress updated." : "Marked as incomplete.", 
        type: "success" 
      } 
    }));
    renderLecturePlayer(params);
  });

  // Attach bookmark toggle
  document.getElementById('toggle-bookmark-btn')?.addEventListener('click', () => {
    store.toggleBookmark({
      id: currentLecture.id,
      type: 'lecture',
      title: currentLecture.title,
      subject: course.subject
    });
    window.dispatchEvent(new CustomEvent('show-toast', { 
      detail: { 
        message: isSaved ? "Removed from bookmarks." : "Lecture bookmarked!", 
        type: "success" 
      } 
    }));
    renderLecturePlayer(params);
  });

  // Attach download video handler
  document.getElementById('download-lecture-btn')?.addEventListener('click', () => {
    if (isDownloaded) {
      window.location.hash = '#downloads';
      return;
    }
    store.addDownload({
      title: currentLecture.title,
      subject: course.subject || course.title || 'Physics',
      chapter: chapter.title || 'Chapter Topic',
      part: `Lecture ${currentLecture.lectureNumber || 1}`,
      duration: currentLecture.duration || '45 mins',
      quality: '1080p Full HD',
      size: '280 MB',
      videoUrl: `https://www.youtube.com/watch?v=${currentLecture.youtubeId || 'ZM8ECw1yZ1Y'}`
    });
    window.dispatchEvent(new CustomEvent('show-toast', { 
      detail: { 
        message: `Saved "${currentLecture.title}" to Downloads folder!`, 
        type: "success" 
      } 
    }));
    renderLecturePlayer(params);
  });
}
