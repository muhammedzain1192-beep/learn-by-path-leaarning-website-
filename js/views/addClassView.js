// Add Class View — Allows uploading/adding a class from a YouTube link
export function renderAddClass() {
  const container = document.getElementById('view-container');
  if (!container) return;

  container.innerHTML = `
    <div style="max-width: 600px; margin: 0 auto; padding-top: var(--space-8);">
      <h2 style="font-size: var(--font-xl); font-weight: 700; color: var(--text-primary); margin-bottom: var(--space-2);">Add YouTube Class</h2>
      <p style="font-size: var(--font-sm); color: var(--text-secondary); margin-bottom: var(--space-6);">Paste a YouTube link below to automatically import the class into your courses.</p>
      
      <div class="card" style="background: var(--bg-surface-secondary); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: var(--space-6);">
        
        <div style="margin-bottom: var(--space-5);">
          <label style="display: block; font-size: var(--font-sm); font-weight: 600; color: var(--text-primary); margin-bottom: 8px;">YouTube Video Link</label>
          <input type="text" id="youtube-link-input" placeholder="e.g. https://www.youtube.com/watch?v=..." style="width: 100%; padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); background: var(--bg-input); color: var(--text-primary); font-size: var(--font-base);" />
        </div>

        <div style="margin-bottom: var(--space-6);">
          <label style="display: block; font-size: var(--font-sm); font-weight: 600; color: var(--text-primary); margin-bottom: 8px;">Assign to Course</label>
          <select id="course-select" style="width: 100%; padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); background: var(--bg-input); color: var(--text-primary); font-size: var(--font-base);">
            <option>Long Term Plus One 2027</option>
            <option>Long Term Plus Two 2027</option>
            <option>BITSAT</option>
            <option>VITEEE</option>
            <option>SAT</option>
          </select>
        </div>

        <button id="import-class-btn" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: var(--font-base); font-weight: 700;">
          Import Class
        </button>

        <!-- Status Area -->
        <div id="import-status" style="margin-top: var(--space-4); display: none; padding: 12px; border-radius: var(--radius-md); font-size: var(--font-sm); font-weight: 600;"></div>
      </div>
    </div>
  `;

  document.getElementById('import-class-btn').addEventListener('click', () => {
    const link = document.getElementById('youtube-link-input').value;
    const statusEl = document.getElementById('import-status');
    
    if (!link.includes('youtube.com/') && !link.includes('youtu.be/')) {
      statusEl.style.display = 'block';
      statusEl.style.backgroundColor = 'var(--color-danger-bg)';
      statusEl.style.color = 'var(--color-danger)';
      statusEl.style.border = '1px solid var(--color-danger-border)';
      statusEl.textContent = 'Please enter a valid YouTube link.';
      return;
    }

    statusEl.style.display = 'block';
    statusEl.style.backgroundColor = 'var(--color-info-bg)';
    statusEl.style.color = 'var(--color-info)';
    statusEl.style.border = '1px solid var(--color-info-border)';
    statusEl.textContent = 'Importing video data...';

    // Simulate API call and success
    setTimeout(() => {
      statusEl.style.backgroundColor = 'var(--color-success-bg)';
      statusEl.style.color = 'var(--color-success)';
      statusEl.style.border = '1px solid var(--color-success-border)';
      statusEl.textContent = 'Class successfully added to your course!';
      document.getElementById('youtube-link-input').value = '';
    }, 1500);
  });
}
