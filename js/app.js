// Main Application Router & Controller for Z-Learn
import { store } from './store.js';
import { renderSidebar } from './components/sidebar.js';
import { renderHeader } from './components/header.js';
import { initSearchModal } from './components/searchModal.js';
import { initAdminModal } from './components/adminModal.js';

// Views
import { renderDashboard } from './views/dashboardView.js';
import { renderMyLearning } from './views/myLearningView.js';
import { renderCourses } from './views/coursesView.js';
import { renderLecturePlayer } from './views/lecturePlayerView.js';
import { renderPractice } from './views/practiceView.js';
import { renderPracticeHistory } from './views/practiceHistoryView.js';
import { renderMistakeBook } from './views/mistakeBookView.js';
import { renderPYQ } from './views/pyqView.js';
import { renderMockTests } from './views/mockTestsView.js';
import { renderCBTTest } from './views/cbtTestView.js';
import { renderTestResult } from './views/testResultView.js';
import { renderAnalytics } from './views/analyticsView.js';
import { renderStudyPlanner } from './views/studyPlannerView.js';
import { renderRevision } from './views/revisionView.js';
import { renderExams } from './views/examsView.js';
import { renderPlusTwo } from './views/plusTwoView.js';
import { renderResources } from './views/resourcesView.js';
import { renderBookmarks } from './views/bookmarksView.js';
import { renderProfile } from './views/profileView.js';
import { renderSettings } from './views/settingsView.js';
import { renderAIPlanner } from './views/aiPlannerView.js';
import { renderAddClass } from './views/addClassView.js';
import { renderCourseDetail } from './views/courseDetailView.js';
import { renderDownloads } from './views/downloadsView.js';
import { renderReports } from './views/reportsView.js';

class App {
  constructor() {
    this.currentRoute = '';
    this.init();
  }

  init() {
    // 1. Setup shell components
    renderHeader();
    initSearchModal();
    initAdminModal();
    this.setupToastContainer();

    // 2. Setup hash routing
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());

    // 3. Close mobile sidebar when clicking backdrop
    document.querySelector('.sidebar-backdrop')?.addEventListener('click', () => {
      document.getElementById('sidebar')?.classList.remove('open');
      document.querySelector('.sidebar-backdrop')?.classList.remove('active');
    });

    // 4. Listen for toast notifications
    window.addEventListener('show-toast', (e) => {
      this.showToast(e.detail.message, e.detail.type || 'info');
    });

    // 5. Subscribe to store changes to re-render header/sidebar if needed
    store.subscribe(() => {
      // Re-render sidebar or headers if user changes
    });

    this.handleRoute();
  }

  setupToastContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span style="font-size: 14px; font-weight: 700; color: var(--color-primary);">●</span>
      <span style="flex: 1;">${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 3000);
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'dashboard';
    const parts = hash.split('/');
    const route = parts[0];
    const params = parts.slice(1);

    this.currentRoute = route;

    // Reset CBT mode if leaving CBT exam hall
    if (route !== 'test-room') {
      document.body.classList.remove('cbt-mode');
    }

    // Close mobile drawer on navigation
    document.getElementById('sidebar')?.classList.remove('open');
    document.querySelector('.sidebar-backdrop')?.classList.remove('active');

    // Update Sidebar active links
    renderSidebar(route === 'course' ? 'courses' : route);

    // Update Bottom Nav active states
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      const itemRoute = item.getAttribute('href')?.slice(1);
      if (itemRoute === route || (itemRoute === 'courses' && route === 'course')) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Scroll to top
    window.scrollTo(0, 0);

    // Route dispatch
    switch (route) {
      case 'dashboard':
        renderDashboard();
        break;
      case 'my-learning':
        renderMyLearning();
        break;
      case 'courses':
        renderCourses();
        break;
      case 'course':
        renderCourseDetail(params);
        break;
      case 'player':
        renderLecturePlayer(params);
        break;
      case 'practice':
        renderPractice();
        break;
      case 'practice-history':
        renderPracticeHistory();
        break;
      case 'mistake-book':
        renderMistakeBook();
        break;
      case 'pyq':
        renderPYQ();
        break;
      case 'mock-tests':
        renderMockTests();
        break;
      case 'test-room':
        renderCBTTest(params);
        break;
      case 'test-result':
        renderTestResult(params);
        break;
      case 'analytics':
        renderAnalytics();
        break;
      case 'study-planner':
        renderStudyPlanner();
        break;
      case 'revision':
        renderRevision();
        break;
      case 'exams':
        renderExams();
        break;
      case 'plus-two':
        renderPlusTwo();
        break;
      case 'resources':
        renderResources();
        break;
      case 'bookmarks':
        renderBookmarks();
        break;
      case 'profile':
        renderProfile();
        break;
      case 'settings':
        renderSettings();
        break;
      case 'ai-planner':
        renderAIPlanner();
        break;
      case 'downloads':
        renderDownloads();
        break;
      case 'reports':
      case 'my-report':
        renderReports();
        break;
      case 'add-class':
        renderAddClass();
        break;
      default:
        renderDashboard();
        break;
    }
  }
}

// Initialize Application
new App();
