/**
 * app.js - Main Application Controller for DS Lab Portal
 * Handles routing, UI state, rendering, modals, file uploads, and database synchronization.
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Database
  await window.db.init();

  // Navigation Links
  const navLinks = document.querySelectorAll('.nav-link');
  const pageViews = document.querySelectorAll('.page-view');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-links-menu');

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  // -------------------------------------------------------------
  // Router
  // -------------------------------------------------------------
  function navigateTo(hash) {
    const route = hash ? hash.replace('#/', '').toLowerCase() : 'home';
    const validRoutes = ['home', 'executions', 'tools', 'profile'];
    const activeRoute = validRoutes.includes(route) ? route : 'home';

    // Update active nav class
    navLinks.forEach((link) => {
      if (link.getAttribute('data-view') === activeRoute) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile menu on navigate
    if (navMenu) navMenu.classList.remove('show');

    // Show active view
    pageViews.forEach((view) => {
      if (view.id === `${activeRoute}-view`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Render corresponding view data
    switch (activeRoute) {
      case 'home':
        renderHomeView();
        break;
      case 'executions':
        renderExecutionsView();
        break;
      case 'tools':
        renderToolsView();
        break;
      case 'profile':
        renderProfileView();
        break;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('hashchange', () => navigateTo(window.location.hash));
  navigateTo(window.location.hash);

  // -------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------
  function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  function getStatusClass(status) {
    switch (status) {
      case 'Completed':
        return 'status-completed';
      case 'In Progress':
        return 'status-inprogress';
      default:
        return 'status-pending';
    }
  }

  // -------------------------------------------------------------
  // 1. Home View Renderer
  // -------------------------------------------------------------
  async function renderHomeView() {
    const experiments = await window.db.getExperiments();
    const completedCount = experiments.filter(e => e.status === 'Completed').length;
    const totalCount = experiments.length;
    const pct = Math.round((completedCount / totalCount) * 100);

    const progressCountEl = document.getElementById('home-progress-count');
    const progressPctEl = document.getElementById('home-progress-percent');
    if (progressCountEl) progressCountEl.textContent = `${completedCount} / ${totalCount}`;
    if (progressPctEl) progressPctEl.textContent = `${pct}% Overall Completion`;

    const summaryTableBody = document.getElementById('home-experiments-summary-rows');
    if (!summaryTableBody) return;

    summaryTableBody.innerHTML = '';
    experiments.forEach((exp) => {
      const tr = document.createElement('tr');
      const toolsNames = exp.tools.map(t => t.name).join(', ');

      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--accent);">Exp ${exp.id}</td>
        <td>
          <strong style="color: var(--primary-dark);">${exp.title}</strong>
        </td>
        <td>
          <span style="font-size: 0.85rem; color: var(--text-secondary);">${toolsNames}</span>
        </td>
        <td>
          <span class="status-pill ${getStatusClass(exp.status)}">${exp.status}</span>
        </td>
        <td>
          <button class="btn btn-sm btn-secondary" onclick="window.viewExperimentOutput(${exp.id})">
            View Output
          </button>
        </td>
      `;
      summaryTableBody.appendChild(tr);
    });
  }

  // -------------------------------------------------------------
  // 2. Lab Executions View Renderer
  // -------------------------------------------------------------
  let currentFilter = 'all';

  async function renderExecutionsView() {
    const container = document.getElementById('experiments-list-container');
    if (!container) return;

    const experiments = await window.db.getExperiments();
    const filtered = experiments.filter(exp => {
      if (currentFilter === 'all') return true;
      return exp.status === currentFilter;
    });

    container.innerHTML = '';

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="background: #fff; padding: 3rem; text-align: center; border: 1px solid var(--border); border-radius: var(--radius-md);">
          <p style="color: var(--text-muted); font-size: 1rem;">No experiments found under "${currentFilter}".</p>
        </div>
      `;
      return;
    }

    filtered.forEach((exp) => {
      const card = document.createElement('div');
      card.className = 'exp-card';

      const toolsBadges = exp.tools
        .map(t => `<span class="exp-tool-badge">${t.name}</span>`)
        .join('');

      const hasOutput = exp.outputPreview && exp.outputPreview.length > 0;
      const outputFilenameDisplay = exp.outputName
        ? `<span class="exp-output-filename">${exp.outputName}</span>`
        : `<span style="font-style: italic; color: var(--text-muted);">No file attached</span>`;

      card.innerHTML = `
        <div class="exp-header">
          <div class="exp-title-box">
            <span class="exp-num-badge">Experiment ${exp.id}</span>
            <div>
              <h3 class="exp-title">${exp.title}</h3>
              <p class="exp-desc">${exp.desc}</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <select class="form-select" style="padding: 0.25rem 0.5rem; font-size: 0.8rem; width: auto;" onchange="window.handleStatusChange(${exp.id}, this.value)">
              <option value="Completed" ${exp.status === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="In Progress" ${exp.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Pending" ${exp.status === 'Pending' ? 'selected' : ''}>Pending</option>
            </select>
            <span class="status-pill ${getStatusClass(exp.status)}">${exp.status}</span>
          </div>
        </div>

        <div class="exp-tools-row">
          <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Tools Used:</span>
          ${toolsBadges}
        </div>

        <div class="exp-footer">
          <div class="exp-output-meta">
            <span>Output:</span>
            ${outputFilenameDisplay}
            ${exp.date ? `<span>• Date: ${exp.date}</span>` : ''}
          </div>
          <div class="exp-actions">
            ${hasOutput ? `
              <button class="btn btn-sm btn-secondary" onclick="window.viewExperimentOutput(${exp.id})">
                👁️ View Output
              </button>
            ` : ''}
            <button class="btn btn-sm btn-primary" onclick="window.openUploadModal(${exp.id})">
              📤 Upload Output
            </button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Filter Buttons
  const filterBtns = document.querySelectorAll('#status-filter-group .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderExecutionsView();
    });
  });

  // Global handler for quick status changer
  window.handleStatusChange = async (id, newStatus) => {
    await window.db.updateExperiment(id, { status: newStatus });
    showToast(`Experiment ${id} status updated to ${newStatus}`);
    renderExecutionsView();
    renderHomeView();
    renderProfileView();
  };

  // -------------------------------------------------------------
  // 3. Tools View Renderer (Heading: Experiment Tools Used)
  // -------------------------------------------------------------
  async function renderToolsView(filterQuery = '') {
    const container = document.getElementById('tools-list-container');
    if (!container) return;

    const experiments = await window.db.getExperiments();
    const query = filterQuery.toLowerCase().trim();

    const filtered = experiments.filter(exp => {
      if (!query) return true;
      const titleMatch = exp.title.toLowerCase().includes(query);
      const toolsMatch = exp.tools.some(t => 
        t.name.toLowerCase().includes(query) || 
        t.purpose.toLowerCase().includes(query)
      );
      return titleMatch || toolsMatch;
    });

    container.innerHTML = '';

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="background: #fff; padding: 2.5rem; text-align: center; border: 1px solid var(--border); border-radius: var(--radius-md);">
          <p style="color: var(--text-muted);">No tools match your query "${filterQuery}".</p>
        </div>
      `;
      return;
    }

    filtered.forEach((exp) => {
      const card = document.createElement('div');
      card.className = 'tools-exp-card';

      const toolItems = exp.tools.map(tool => `
        <div class="tool-item-box">
          <div class="tool-item-name">${tool.name}</div>
          <div class="tool-item-purpose">${tool.purpose}</div>
        </div>
      `).join('');

      card.innerHTML = `
        <div class="tools-exp-header">
          <span class="tools-exp-num">Exp ${exp.id}</span>
          <h3 class="tools-exp-name">${exp.title}</h3>
        </div>
        <div class="tools-list-inner">
          ${toolItems}
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Search Input for Tools Page
  const toolsSearchInput = document.getElementById('tools-search-input');
  if (toolsSearchInput) {
    toolsSearchInput.addEventListener('input', (e) => {
      renderToolsView(e.target.value);
    });
  }

  // -------------------------------------------------------------
  // 4. Profile View Renderer
  // -------------------------------------------------------------
  async function renderProfileView() {
    const profile = await window.db.getProfile();
    const experiments = await window.db.getExperiments();

    // Populate Student Profile Details
    const nameEl = document.getElementById('profile-display-name');
    const rollEl = document.getElementById('profile-display-roll');
    const secEl = document.getElementById('profile-display-section');
    const branchEl = document.getElementById('profile-display-branch');
    const mentorEl = document.getElementById('profile-display-mentor');
    const photoEl = document.getElementById('profile-display-photo');
    const githubEl = document.getElementById('profile-display-github');
    const linkedinEl = document.getElementById('profile-display-linkedin');
    const skillsContainer = document.getElementById('profile-display-skills');

    if (nameEl) nameEl.textContent = profile.name || 'D.S.Prudhvi Raj';
    if (rollEl) rollEl.textContent = `Roll No: ${profile.rollNo || '24102A030017'}`;
    if (secEl) secEl.textContent = profile.section || 'DS-1';
    if (branchEl) branchEl.textContent = profile.branch || 'DS';
    if (mentorEl) mentorEl.textContent = profile.assistantProfessor || 'Bosubabu';

    if (photoEl) {
      photoEl.src = profile.photo || (typeof SampleOutputs !== 'undefined' ? SampleOutputs.defaultAvatar : '');
    }

    if (githubEl) {
      githubEl.href = profile.github || '#';
      githubEl.textContent = profile.github ? profile.github.replace('https://', '') : 'Not provided';
    }

    if (linkedinEl) {
      linkedinEl.href = profile.linkedin || '#';
      linkedinEl.textContent = profile.linkedin ? profile.linkedin.replace('https://', '') : 'Not provided';
    }

    // Skills Badges
    if (skillsContainer) {
      skillsContainer.innerHTML = '';
      const skillsArray = Array.isArray(profile.skills)
        ? profile.skills
        : (profile.skills ? profile.skills.split(',').map(s => s.trim()) : []);

      skillsArray.forEach(skill => {
        if (!skill) return;
        const chip = document.createElement('span');
        chip.className = 'skill-chip';
        chip.textContent = skill;
        skillsContainer.appendChild(chip);
      });
    }

    // Dynamic Lab Progress
    const completedCount = experiments.filter(e => e.status === 'Completed').length;
    const inProgressCount = experiments.filter(e => e.status === 'In Progress').length;
    const pendingCount = experiments.filter(e => e.status === 'Pending').length;
    const totalCount = experiments.length;
    const pct = Math.round((completedCount / totalCount) * 100);

    const fractionEl = document.getElementById('profile-progress-fraction');
    const barEl = document.getElementById('profile-progress-bar');
    const subtextEl = document.getElementById('profile-progress-subtext');

    if (fractionEl) fractionEl.textContent = `${completedCount} / ${totalCount} Experiments (${pct}%)`;
    if (barEl) barEl.style.width = `${pct}%`;
    if (subtextEl) {
      subtextEl.textContent = `${completedCount} Completed • ${inProgressCount} In Progress • ${pendingCount} Pending`;
    }
  }

  // -------------------------------------------------------------
  // Modals & User Actions
  // -------------------------------------------------------------

  // Close modal buttons handler
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove('active');
    });
  });

  // Close modals on overlay backdrop click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  // Open Edit Profile Modal
  const btnOpenEditProfile = document.getElementById('btn-open-edit-profile');
  const editProfileModal = document.getElementById('edit-profile-modal');
  const editProfileForm = document.getElementById('edit-profile-form');

  if (btnOpenEditProfile && editProfileModal) {
    btnOpenEditProfile.addEventListener('click', async () => {
      const profile = await window.db.getProfile();
      document.getElementById('edit-name').value = profile.name || '';
      document.getElementById('edit-roll').value = profile.rollNo || '';
      document.getElementById('edit-section').value = profile.section || '';
      document.getElementById('edit-branch').value = profile.branch || '';
      document.getElementById('edit-mentor').value = profile.assistantProfessor || '';
      document.getElementById('edit-github').value = profile.github || '';
      document.getElementById('edit-linkedin').value = profile.linkedin || '';
      document.getElementById('edit-photo-url').value = (profile.photo && profile.photo.startsWith('http')) ? profile.photo : '';

      const skillsStr = Array.isArray(profile.skills) ? profile.skills.join(', ') : (profile.skills || '');
      document.getElementById('edit-skills').value = skillsStr;

      editProfileModal.classList.add('active');
    });
  }

  // Handle Edit Profile Form Submit
  if (editProfileForm) {
    editProfileForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('edit-name').value.trim();
      const rollNo = document.getElementById('edit-roll').value.trim();
      const section = document.getElementById('edit-section').value.trim();
      const branch = document.getElementById('edit-branch').value.trim();
      const assistantProfessor = document.getElementById('edit-mentor').value.trim();
      const github = document.getElementById('edit-github').value.trim();
      const linkedin = document.getElementById('edit-linkedin').value.trim();
      const skillsRaw = document.getElementById('edit-skills').value.trim();
      const photoUrl = document.getElementById('edit-photo-url').value.trim();
      const photoFileInput = document.getElementById('edit-photo-file');

      const skills = skillsRaw ? skillsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

      let photoData = null;
      if (photoFileInput.files && photoFileInput.files[0]) {
        photoData = await readFileAsDataUrl(photoFileInput.files[0]);
      } else if (photoUrl) {
        photoData = photoUrl;
      }

      const updates = {
        name,
        rollNo,
        section,
        branch,
        assistantProfessor,
        github,
        linkedin,
        skills
      };

      if (photoData) {
        updates.photo = photoData;
      }

      await window.db.updateProfile(updates);
      editProfileModal.classList.remove('active');
      showToast('Profile updated and saved to database successfully!');
      renderProfileView();
    });
  }

  // View Experiment Output Modal
  window.viewExperimentOutput = async (id) => {
    const exp = await window.db.getExperiment(id);
    if (!exp) return;

    const modal = document.getElementById('view-output-modal');
    const titleEl = document.getElementById('view-modal-title');
    const imgEl = document.getElementById('view-modal-image');
    const metaEl = document.getElementById('view-modal-meta');

    titleEl.textContent = `Experiment ${exp.id}: Output Preview`;
    if (exp.outputPreview) {
      imgEl.src = exp.outputPreview;
      imgEl.style.display = 'block';
    } else {
      imgEl.style.display = 'none';
    }

    const toolsList = exp.tools.map(t => t.name).join(', ');

    metaEl.innerHTML = `
      <div style="font-weight: 700; color: var(--primary-dark); margin-bottom: 0.35rem;">${exp.title}</div>
      <div style="margin-bottom: 0.35rem; color: var(--text-secondary);"><strong>Tools:</strong> ${toolsList}</div>
      <div style="margin-bottom: 0.35rem; color: var(--text-secondary);"><strong>Status:</strong> <span class="status-pill ${getStatusClass(exp.status)}">${exp.status}</span></div>
      ${exp.outputName ? `<div style="margin-bottom: 0.35rem; color: var(--text-secondary);"><strong>File:</strong> <code>${exp.outputName}</code></div>` : ''}
      ${exp.date ? `<div style="margin-bottom: 0.35rem; color: var(--text-secondary);"><strong>Execution Date:</strong> ${exp.date}</div>` : ''}
      <div style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid var(--border); color: var(--text-main);">
        <strong>Execution Remarks / Findings:</strong><br>
        ${exp.outputNotes || 'All verification criteria met. Code executed successfully without warnings.'}
      </div>
    `;

    modal.classList.add('active');
  };

  // Open Upload Output Modal
  window.openUploadModal = async (id) => {
    const exp = await window.db.getExperiment(id);
    if (!exp) return;

    const modal = document.getElementById('upload-output-modal');
    const titleEl = document.getElementById('upload-modal-title');
    const idInput = document.getElementById('upload-exp-id');
    const statusSelect = document.getElementById('upload-status-select');
    const notesInput = document.getElementById('upload-notes');
    const fileInput = document.getElementById('upload-file-input');

    titleEl.textContent = `Upload Output: Experiment ${exp.id}`;
    idInput.value = exp.id;
    statusSelect.value = exp.status;
    notesInput.value = exp.outputNotes || '';
    fileInput.value = '';

    modal.classList.add('active');
  };

  // Handle Upload Output Form Submit
  const uploadForm = document.getElementById('upload-output-form');
  if (uploadForm) {
    uploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const expId = Number(document.getElementById('upload-exp-id').value);
      const fileInput = document.getElementById('upload-file-input');
      const statusSelect = document.getElementById('upload-status-select').value;
      const notes = document.getElementById('upload-notes').value.trim();

      if (!fileInput.files || fileInput.files.length === 0) {
        alert('Please choose a file to upload.');
        return;
      }

      const file = fileInput.files[0];
      const fileDataUrl = await readFileAsDataUrl(file);

      await window.db.uploadExperimentOutput(expId, fileDataUrl, file.name, notes, statusSelect);

      document.getElementById('upload-output-modal').classList.remove('active');
      showToast(`Output for Experiment ${expId} saved to database!`);

      // Refresh all views
      renderExecutionsView();
      renderHomeView();
      renderProfileView();
    });
  }

  // File to Data URL Helper
  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }
});
