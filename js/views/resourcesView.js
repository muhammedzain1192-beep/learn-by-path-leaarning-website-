// Resources Hub View — Formula Sheets, Revision Notes, and Academic Handouts
import { store } from '../store.js';

export function renderResources() {
  const container = document.getElementById('view-container');
  if (!container) return;

  const resourcesList = [
    {
      id: "res-1",
      category: "Formula Sheets",
      title: "Complete Kinematics & Mechanics 1-Page Formula Sheet",
      subject: "Physics",
      format: "PDF",
      size: "2.4 MB",
      description: "Concise formula handbook containing 1D/2D motion, projectile relations, relative velocity, and Newton's laws equations."
    },
    {
      id: "res-2",
      category: "Formula Sheets",
      title: "Chemical Bonding & Molecular Shapes Chart",
      subject: "Chemistry",
      format: "PDF",
      size: "1.8 MB",
      description: "Quick reference card showing VSEPR shapes, bond angles, hybridization tables, and MOT electronic configurations."
    },
    {
      id: "res-3",
      category: "Notes",
      title: "Coordinate Geometry Short Revision Handbook",
      subject: "Mathematics",
      format: "PDF",
      size: "3.1 MB",
      description: "Straight lines, circles, parabola, ellipse, and hyperbola key properties, conditions of tangency, and normal formulas."
    },
    {
      id: "res-4",
      category: "Reference Material",
      title: "Kerala Plus Two Physics 5-Mark Derivations Master Sheet",
      subject: "Physics",
      format: "PDF",
      size: "1.2 MB",
      description: "Handwritten official step-marking derivations for Gauss's Law, Lens Maker's formula, and galvanometer sensitivity."
    },
    {
      id: "res-5",
      category: "Study Materials",
      title: "NTA JEE Main 2024 Question Distribution Matrix",
      subject: "General",
      format: "PDF",
      size: "850 KB",
      description: "Detailed topic-by-topic weightage and trend analysis across all 10 shifts of JEE Main January and April sessions."
    }
  ];

  let activeCategory = 'All';

  function updateView() {
    const categories = ['All', 'Formula Sheets', 'Notes', 'Reference Material', 'Study Materials'];
    const filtered = resourcesList.filter(r => activeCategory === 'All' || r.category === activeCategory);

    container.innerHTML = `
      <div class="view-header">
        <h1 class="view-title">Study Resources & Materials</h1>
        <p class="view-subtitle">High-yield revision notes, formula sheets, and blueprints organized by subject</p>
      </div>

      <!-- Categories Navigation -->
      <div class="tabs-nav">
        ${categories.map(cat => `
          <button class="tab-btn ${activeCategory === cat ? 'active' : ''}" data-cat="${cat}">
            ${cat}
          </button>
        `).join('')}
      </div>

      <!-- Resources Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-6);">
        ${filtered.map(res => `
          <div class="card card-hover">
            <div class="card-header" style="background-color: var(--bg-surface-secondary);">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge badge-primary">${res.subject}</span>
                <span class="badge badge-neutral">${res.category}</span>
              </div>
              <span class="badge badge-accent">${res.format}</span>
            </div>
            <div class="card-body">
              <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                ${res.title}
              </h3>
              <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.5;">
                ${res.description}
              </p>
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: var(--font-xs); color: var(--text-muted);">
                <span>File Size: ${res.size}</span>
                <button class="btn btn-outline btn-sm download-resource-btn" data-title="${res.title}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  <span>Download Resource</span>
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    document.querySelectorAll('.tabs-nav .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-cat');
        updateView();
      });
    });

    document.querySelectorAll('.download-resource-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-title');
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: `Downloading "${title}"...`, type: "info" } }));
      });
    });
  }

  updateView();
}
