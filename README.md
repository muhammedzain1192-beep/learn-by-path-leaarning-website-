# Z-Learn — Modern Academic Learning Platform

> A lightweight, privacy-focused academic learning and revision platform designed for competitive exam aspirants (JEE Main, JEE Advanced, BITSAT) and state board examinations (Kerala Plus Two).

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-brightgreen)](https://pages.github.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-ES_Modules-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

---

## Overview

**Z-Learn** transforms fragmented online lecture videos and practice problems into a distraction-free, structured curriculum. Built with vanilla modern web technologies, it features an intelligent study planner, deep subject analytics, offline video management, computer-based mock tests (CBT), and comprehensive academic progress reporting.

Everything runs entirely client-side using `localStorage`, requiring zero backend infrastructure or external build tools.

---

## Key Features

### 1. Structured Learning & Curriculum Management
- **Course & Subject Hierarchy**: Seamlessly navigate subjects across Physics, Chemistry, Mathematics, and Kerala Plus Two modules.
- **Custom Chapter Creator**: Add custom chapters, assign parts, and structure YouTube lecture links into a guided syllabus.
- **Theatre Mode Video Player**: Clean, distraction-free player with notes, bookmarks, previous/next lecture navigation, and completion tracking.

### 2. AI Study Planner & Dynamic Calendar
- **Interactive Planner**: Focus-triggered study prompt suggestions (Fresh Study Routine, Weekly Split Advice, Daily Hours Target, Curriculum Tips).
- **Automated Schedule Generator**: Generates targeted daily revision and PYQ drill schedules tailored to your examination date and available study hours.
- **Calendar & Daily To-Dos**: Track tasks across Day, Week, and Month views with one-click completion toggles.

### 3. Comprehensive Academic Analytics
- **Overall Velocity & Benchmarks**: Real-time stats on total study hours, average accuracy percentage, CBT exams attended, and lectures completed.
- **Weekly Study Velocity**: Mon–Sun study hour distribution visualization.
- **Subject-by-Subject Analytics**: Filter across Physics, Chemistry, Mathematics, and Kerala Plus Two to inspect:
  - Total study hours and lectures watched per subject.
  - Granular chapter mastery progress bars.
  - Highlighted strong topics (>80% accuracy) and priority weak topics.

### 4. Offline Downloads Folder
- **Video Storage Manager**: Local offline video management simulating a dedicated `downloads/videos/` directory with storage tracking.
- **Direct Download Action**: One-click download button in the lecture player and chapter list to store videos in 1080p Full HD, 720p HD, or 480p SD.
- **Download by URL**: Add any YouTube or external video stream directly to your offline downloads folder.
- **Offline Playback**: Integrated offline modal video player for studying without network distractions.

### 5. My Academic Report
- **Videos Watched Log**: Tracks subject, chapter, lecture part, duration, and exact timestamp for every session watched.
- **Exams Attended Log**: Records examination name, subject, test time, score, and percentage with automatic performance tier badges (*Distinction*, *Proficient*, *Needs Practice*).
- **Print / PDF Ready**: Instant printable summary for progress reviews and revision tracking.

### 6. CBT Mock Test Hall & Practice Modules
- **Real-Exam Interface**: Authentic Computer-Based Test (CBT) simulation with countdown timer, question palette (Answered, Marked for Review, Unvisited), and instant score calculation.
- **Spaced Revision & Mistake Book**: Dedicated logs to track conceptual errors, why an answer was missed, and automated revision scheduling.

---

## Tech Stack & Architecture

- **Frontend**: Pure HTML5, Modern CSS (Custom Properties / Design Tokens), Vanilla JavaScript (ES6 Modules).
- **State Management**: Reactive centralized store (`store.js`) with persistent browser `localStorage`.
- **Styling**: Responsive dual-mode UI (Light Mode & Dark Mode Night Study) with an emerald accent aesthetic and zero third-party CSS frameworks.
- **Dependencies**: Zero runtime dependencies. No npm installs or build steps required.

---

## Quick Start / Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/z-learn.git
   cd z-learn
   ```

2. **Run locally**:
   - **Using PowerShell**:
     ```powershell
     powershell -ExecutionPolicy Bypass -File .\server.ps1
     ```
     Then open `http://localhost:3000/` in your browser.
   - **Using Python**:
     ```bash
     python -m http.server 3000
     ```
   - **Or VS Code Live Server**: Right-click `index.html` and select **"Open with Live Server"**.

---

## Deploying to GitHub Pages

Because **Z-Learn** is a static client-side web application, it can be hosted on GitHub Pages for free in seconds:

1. Push this repository to GitHub.
2. In your repository, go to **Settings** → **Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**.
5. Your platform will be live at `https://<your-username>.github.io/<repo-name>/`.

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

