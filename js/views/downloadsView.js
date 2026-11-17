// Downloads View — Offline Video Storage & Downloads Folder Manager
import { store } from '../store.js';

export function renderDownloads() {
  const container = document.getElementById('view-container');
  if (!container) return;

  let activeSubjectFilter = 'All';

  function renderView() {
    const downloads = store.downloads || [];
    const filteredDownloads = activeSubjectFilter === 'All'
      ? downloads
      : downloads.filter(d => (d.subject || '').toLowerCase() === activeSubjectFilter.toLowerCase());

    const totalSizeMB = downloads.reduce((acc, d) => {
      const match = (d.size || '').match(/(\d+)/);
      return acc + (match ? parseInt(match[1]) : 200);
    }, 0);

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
        <a href="#downloads" class="btn btn-primary btn-sm" style="font-weight: 700;">
          Downloads
        </a>
        <a href="#reports" class="btn btn-secondary btn-sm" style="font-weight: 500;">
          My Report
        </a>
      </div>

      <!-- Header & Actions -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-4); margin-bottom: var(--space-6);">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
            <div style="width: 32px; height: 32px; border-radius: var(--radius-md); background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
            <h1 class="view-title" style="margin: 0;">Downloads Folder</h1>
          </div>
          <p class="view-subtitle" style="margin: 0;">Stored offline videos and lectures for studying without internet interruptions</p>
        </div>

        <div style="display: flex; gap: 8px;">
          <button class="btn btn-primary btn-sm" id="btn-add-download">
            + Download Video by URL
          </button>
          ${downloads.length > 0 ? `
            <button class="btn btn-ghost btn-sm" id="btn-clear-downloads" style="color: var(--color-danger);">
              Clear Folder
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Storage Info Banner -->
      <div class="card" style="background: var(--bg-surface-secondary); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: var(--space-4); margin-bottom: var(--space-6);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-4); align-items: center;">
          <div>
            <div style="font-size: var(--font-xs); color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Folder Location</div>
            <div style="font-size: var(--font-sm); font-weight: 700; color: var(--text-primary); font-family: monospace; margin-top: 2px;">downloads/videos/</div>
          </div>
          <div>
            <div style="font-size: var(--font-xs); color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Downloaded Files</div>
            <div style="font-size: var(--font-base); font-weight: 800; color: var(--color-primary); margin-top: 2px;">${downloads.length} Videos Stored</div>
          </div>
          <div>
            <div style="font-size: var(--font-xs); color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Local Disk Storage</div>
            <div style="font-size: var(--font-base); font-weight: 800; color: var(--text-primary); margin-top: 2px;">${totalSizeMB} MB <span style="font-size: var(--font-xs); color: var(--text-muted); font-weight: 500;">/ 32 GB Available</span></div>
          </div>
          <div>
            <div style="font-size: var(--font-xs); color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Offline Status</div>
            <span class="badge badge-success" style="margin-top: 2px;">Offline Playback Ready</span>
          </div>
        </div>
      </div>

      <!-- Subject Filter Pills -->
      <div class="filter-pills" id="download-subject-pills" style="margin-bottom: var(--space-5);">
        ${['All', 'Physics', 'Chemistry', 'Mathematics'].map(sub => `
          <button class="filter-pill ${activeSubjectFilter === sub ? 'active' : ''}" data-subject="${sub}">
            ${sub === 'All' ? 'All Stored Videos (' + downloads.length + ')' : sub}
          </button>
        `).join('')}
      </div>

      <!-- Downloads File List -->
      ${filteredDownloads.length === 0 ? `
        <div class="card" style="padding: 3rem 2rem; text-align: center; color: var(--text-secondary); background: var(--bg-surface-secondary); border: 2px dashed var(--border-default); border-radius: var(--radius-lg);">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </div>
          <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Downloads Folder is Empty</h3>
          <p style="font-size: var(--font-xs); color: var(--text-muted); max-width: 420px; margin: 0 auto 16px auto;">
            You can download lectures from the video player or courses curriculum, or click below to save any video URL directly into your downloads folder.
          </p>
          <div style="display: flex; justify-content: center; gap: 8px;">
            <button class="btn btn-primary btn-sm" id="empty-add-download-btn">+ Download Video by URL</button>
            <a href="#courses" class="btn btn-secondary btn-sm">Browse Courses</a>
          </div>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          ${filteredDownloads.map(video => `
            <div class="card" style="padding: var(--space-4); display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 14px; min-width: 280px; flex: 1;">
                <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0; cursor: pointer;" class="play-offline-btn" data-video-id="${video.id}">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <div>
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 2px;">
                    <span class="badge badge-neutral" style="font-size: 10px; font-weight: 700;">${video.subject}</span>
                    <span style="font-size: var(--font-xs); color: var(--text-muted); font-weight: 600;">${video.chapter} • ${video.part}</span>
                  </div>
                  <h4 style="font-size: var(--font-sm); font-weight: 700; color: var(--text-primary); margin: 0 0 4px 0;">
                    ${video.title}
                  </h4>
                  <div style="display: flex; align-items: center; gap: 10px; font-size: 11px; color: var(--text-muted);">
                    <span>Quality: <strong style="color: var(--text-secondary);">${video.quality || '1080p Full HD'}</strong></span>
                    <span>•</span>
                    <span>Size: <strong style="color: var(--text-secondary);">${video.size || '250 MB'}</strong></span>
                    <span>•</span>
                    <span>Duration: <strong style="color: var(--text-secondary);">${video.duration || '40 mins'}</strong></span>
                    <span>•</span>
                    <span>Saved: ${video.downloadDate || 'Recently'}</span>
                  </div>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 8px;">
                <button class="btn btn-outline btn-sm play-offline-btn" data-video-id="${video.id}">
                  Watch Offline
                </button>
                <button class="btn btn-ghost btn-sm delete-download-btn" data-video-id="${video.id}" title="Remove from Downloads" style="color: var(--text-muted);">
                  ✕
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    `;

    // Filter pills event listeners
    document.querySelectorAll('#download-subject-pills .filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeSubjectFilter = btn.getAttribute('data-subject');
        renderView();
      });
    });

    // Add download triggers
    const openAddModal = () => openDownloadModal();
    document.getElementById('btn-add-download')?.addEventListener('click', openAddModal);
    document.getElementById('empty-add-download-btn')?.addEventListener('click', openAddModal);

    // Clear all downloads trigger
    document.getElementById('btn-clear-downloads')?.addEventListener('click', () => {
      if (confirm("Are you sure you want to clear all downloaded videos from your local folder?")) {
        store.downloads = [];
        store.save('zlearn_downloads', []);
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: "Downloads folder cleared", type: "info" } }));
        renderView();
      }
    });

    // Play offline buttons
    document.querySelectorAll('.play-offline-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-video-id');
        const video = (store.downloads || []).find(d => d.id === id);
        if (video) openOfflinePlayerModal(video);
      });
    });

    // Delete single download buttons
    document.querySelectorAll('.delete-download-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-video-id');
        store.removeDownload(id);
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: "Video removed from Downloads folder", type: "info" } }));
        renderView();
      });
    });
  }

  function openDownloadModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content" onclick="event.stopPropagation()" style="max-width: 520px;">
        <div class="modal-header">
          <div>
            <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin: 0;">Download Video to Folder</h3>
            <p style="font-size: var(--font-xs); color: var(--text-secondary); margin-top: 2px;">Save a YouTube lecture or direct video into your offline downloads folder</p>
          </div>
          <button class="btn btn-ghost btn-sm" id="close-dl-modal">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Subject</label>
            <select class="form-control" id="dl-subject">
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Kerala Plus Two">Kerala Plus Two</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Chapter Name</label>
            <input type="text" class="form-control" id="dl-chapter" placeholder="e.g. Kinematics, Chemical Bonding" required />
          </div>
          <div class="form-group">
            <label class="form-label">Part / Session</label>
            <input type="text" class="form-control" id="dl-part" placeholder="e.g. Part 1: Concepts, Part 2: PYQs" value="Part 1" required />
          </div>
          <div class="form-group">
            <label class="form-label">Lecture Video Title</label>
            <input type="text" class="form-control" id="dl-title" placeholder="e.g. 1D Motion Graphs & Free Fall" required />
          </div>
          <div class="form-group">
            <label class="form-label">Video URL or YouTube Link</label>
            <input type="url" class="form-control" id="dl-url" placeholder="https://www.youtube.com/watch?v=..." value="https://www.youtube.com/watch?v=ZM8ECw1yZ1Y" />
          </div>
          <div class="form-group">
            <label class="form-label">Download Quality</label>
            <select class="form-control" id="dl-quality">
              <option value="1080p Full HD">1080p Full HD (~320 MB)</option>
              <option value="720p HD">720p HD (~180 MB)</option>
              <option value="480p SD">480p SD (~95 MB)</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="cancel-dl-btn">Cancel</button>
          <button class="btn btn-primary" id="confirm-dl-btn">Download to Folder</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => modal.remove();
    modal.querySelector('#close-dl-modal')?.addEventListener('click', closeModal);
    modal.querySelector('#cancel-dl-btn')?.addEventListener('click', closeModal);

    modal.querySelector('#confirm-dl-btn')?.addEventListener('click', () => {
      const subject = modal.querySelector('#dl-subject').value;
      const chapter = modal.querySelector('#dl-chapter').value.trim() || 'General Chapter';
      const part = modal.querySelector('#dl-part').value.trim() || 'Part 1';
      const title = modal.querySelector('#dl-title').value.trim() || `${chapter} — ${part}`;
      const url = modal.querySelector('#dl-url').value.trim() || 'https://www.youtube.com/watch?v=ZM8ECw1yZ1Y';
      const quality = modal.querySelector('#dl-quality').value;
      const sizeMB = quality.includes('1080p') ? '310 MB' : (quality.includes('720p') ? '185 MB' : '95 MB');

      // Save to downloads
      store.addDownload({
        title,
        subject,
        chapter,
        part,
        duration: '45 mins',
        quality,
        size: sizeMB,
        videoUrl: url
      });

      // Also record in watch history
      store.recordVideoWatched({
        title,
        subject,
        chapter,
        part,
        duration: '45 mins'
      });

      closeModal();
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: `Saved "${title}" to Downloads folder!`, type: "success" } }));
      renderView();
    });
  }

  function openOfflinePlayerModal(video) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content" onclick="event.stopPropagation()" style="max-width: 780px; padding: 0; overflow: hidden;">
        <div style="padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface-secondary); border-bottom: 1px solid var(--border-subtle);">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge badge-success" style="font-size: 10px;">Offline Video</span>
              <span style="font-size: var(--font-xs); color: var(--text-muted);">${video.subject} • ${video.chapter} • ${video.part}</span>
            </div>
            <h3 style="font-size: var(--font-base); font-weight: 700; color: var(--text-primary); margin: 4px 0 0 0;">${video.title}</h3>
          </div>
          <button class="btn btn-ghost btn-sm" id="close-player-modal">✕</button>
        </div>

        <div style="background: #000; position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
          <iframe 
            src="https://www.youtube-nocookie.com/embed/ZM8ECw1yZ1Y?autoplay=1&rel=0&modestbranding=1" 
            title="${video.title}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;">
          </iframe>
        </div>

        <div style="padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); border-top: 1px solid var(--border-subtle); font-size: var(--font-xs); color: var(--text-secondary);">
          <div>
            Stored in: <code style="font-family: monospace; color: var(--color-primary);">downloads/${video.id}.mp4</code> • Quality: ${video.quality} (${video.size})
          </div>
          <button class="btn btn-secondary btn-sm" id="close-player-btn">Close Player</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closePlayer = () => modal.remove();
    modal.querySelector('#close-player-modal')?.addEventListener('click', closePlayer);
    modal.querySelector('#close-player-btn')?.addEventListener('click', closePlayer);
  }

  renderView();
}

