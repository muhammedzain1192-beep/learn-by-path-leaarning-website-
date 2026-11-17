// Courses View — Displays My Courses catalog with search and direct access to course details
import { COURSES_CATALOG } from '../data/coursesCatalog.js';

export function renderCourses() {
  const container = document.getElementById('view-container');
  if (!container) return;

  let searchQuery = '';
  let sortOrder = 'default'; // 'default' | 'name' | 'chapters'

  function renderView() {
    // Filter courses
    let filteredCourses = COURSES_CATALOG.filter(c => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.subjects.some(s => s.name.toLowerCase().includes(q))
      );
    });

    // Sort courses
    if (sortOrder === 'name') {
      filteredCourses.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'chapters') {
      filteredCourses.sort((a, b) => b.totalChapters - a.totalChapters);
    }

    container.innerHTML = `
      <!-- Core Content: My Courses Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-5); flex-wrap: wrap; gap: var(--space-3);">
        <div>
          <h2 style="font-size: var(--font-xl); font-weight: 700; color: var(--text-primary); margin-bottom: 2px;">
            My Courses & Entrances
          </h2>
          <p style="font-size: var(--font-xs); color: var(--text-secondary);">
            Structured curriculums with subjects, video lectures, and practice question banks.
          </p>
        </div>

        <div style="display: flex; gap: var(--space-3); align-items: center;">
          <div style="position: relative;">
            <svg style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="course-catalog-search" value="${searchQuery}" placeholder="Search courses or subjects..." style="padding: 8px 12px 8px 36px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); background: var(--bg-input); color: var(--text-primary); width: 240px; font-size: var(--font-sm);" />
          </div>

          <button id="sort-order-btn" class="btn btn-outline btn-sm" style="display: flex; align-items: center; gap: 8px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
            <span>${sortOrder === 'default' ? 'Default Order' : (sortOrder === 'name' ? 'Alphabetical' : 'Most Chapters')}</span>
          </button>
        </div>
      </div>

      <!-- Courses Grid -->
      <div id="courses-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: var(--space-5);">
        ${filteredCourses.length === 0 ? `
          <div style="grid-column: 1 / -1; padding: 3rem; text-align: center; background: var(--bg-surface-secondary); border-radius: var(--radius-lg); border: 1px solid var(--border-default);">
            <p style="font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">No courses found matching "${searchQuery}"</p>
            <p style="font-size: var(--font-xs); color: var(--text-muted);">Try searching for "Physics", "VITEEE", "BITSAT", or "Plus One".</p>
            <button class="btn btn-secondary btn-sm" id="reset-course-search" style="margin-top: 12px;">Show All Courses</button>
          </div>
        ` : filteredCourses.map(course => `
          <div class="card card-hover" style="background: var(--bg-surface-secondary); border: 1px solid var(--border-default); border-radius: var(--radius-lg); overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; transition: all var(--transition-normal);">
            <!-- Banner Header -->
            <div style="height: 150px; background: ${course.gradient}; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center; color: white;">
              <h3 style="font-size: 22px; font-weight: 900; letter-spacing: -0.5px; line-height: 1.1; margin: 0; color: #FFFFFF;">
                ${course.title.replace('2027', '').trim()}
              </h3>
              <p style="font-size: 13px; font-weight: 700; opacity: 0.9; margin-top: 6px; color: ${course.accentColor || '#FCD34D'};">
                ${course.badge}
              </p>
            </div>

            <!-- Card Body Content -->
            <div style="padding: var(--space-4); flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h4 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin-bottom: 4px; line-height: 1.3;">
                  ${course.title}
                </h4>
                <p style="font-size: var(--font-xs); color: var(--text-muted); margin-bottom: 10px;">
                  ${course.totalChapters} chapters • ${course.totalContents} contents
                </p>

                <!-- Subject Pills Preview -->
                <div style="margin-bottom: 14px;">
                  <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px; letter-spacing: 0.04em;">
                    Included Subjects (${course.subjects.length}):
                  </div>
                  <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                    ${course.subjects.map(s => `
                      <span style="font-size: 10.5px; padding: 2px 7px; border-radius: var(--radius-sm); background: var(--bg-surface); border: 1px solid var(--border-subtle); color: var(--text-secondary); font-weight: 600;">
                        ${s.shortName || s.name}
                      </span>
                    `).join('')}
                  </div>
                </div>

                <!-- Progress Bar -->
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
                  <div style="flex: 1; height: 4px; background: var(--border-subtle); border-radius: 2px; overflow: hidden;">
                    <div style="width: ${course.progress || 0}%; height: 100%; background: var(--color-primary); border-radius: 2px;"></div>
                  </div>
                  <span style="font-size: var(--font-xs); font-weight: 600; color: var(--text-muted);">${course.progress || 0}% Completed</span>
                </div>
              </div>

              <!-- Go to Course CTA -->
              <a href="#course/${course.id}" class="btn btn-primary btn-sm" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px; font-weight: 700; text-decoration: none;">
                <span>Go to Course</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Event listeners
    const searchInput = document.getElementById('course-catalog-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderView();
        const reSearchInput = document.getElementById('course-catalog-search');
        if (reSearchInput) {
          reSearchInput.focus();
          reSearchInput.setSelectionRange(searchQuery.length, searchQuery.length);
        }
      });
    }

    const resetBtn = document.getElementById('reset-course-search');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        searchQuery = '';
        renderView();
      });
    }

    const sortBtn = document.getElementById('sort-order-btn');
    if (sortBtn) {
      sortBtn.addEventListener('click', () => {
        if (sortOrder === 'default') sortOrder = 'name';
        else if (sortOrder === 'name') sortOrder = 'chapters';
        else sortOrder = 'default';
        renderView();
      });
    }
  }

  renderView();
}
