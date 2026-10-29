# DS Lab Portal - Data Science Laboratory

A clean, modern, student-project appropriate, and professor-friendly **DS Lab Portal** website built with standard web technologies (HTML5, CSS3, JavaScript) and persistent browser storage (IndexedDB + LocalStorage sync).

---

## 🚀 Features Overview

### 1. Top Navigation
Contains the exact required navigation structure:
* **Home**
* **Lab Executions**
* **Tools**
* **Profile**

### 2. Home Page
* **DS Lab Portal Title** & academic banner
* Short professional description
* Simple welcome/intro section with overall lab progress (Completed / Total)
* Clean cards with subtle hover effects (Lab Experiments, Tools Used, Student Profile)
* Summary table of all 10 laboratory experiments

### 3. Lab Executions Page
* Clean card and list layout displaying all **10 experiments**
* For each experiment:
  * Experiment number (Exp 1 to Exp 10)
  * Experiment title & detailed description
  * Execution status badge (Completed, In Progress, Pending)
  * Inline status dropdown for quick status updates
  * Output filename, execution date, and notes
  * **View Output** button with high-resolution output modal preview
  * **Upload Output** button supporting image/file uploads directly into the database
* Status filter toolbar: Filter by **All (10)**, **Completed**, **In Progress**, or **Pending**

### 4. Tools Page (Heading: `Experiment Tools Used`)
* Dedicated tools catalog beside Lab Executions
* Displays tools, software, and libraries used for every experiment:
  * **Experiment 1** → Python, NumPy
  * **Experiment 2** → Python, Pandas
  * **Experiment 3** → Python, Matplotlib, Seaborn
  * **Experiment 4** → Python, SciPy (scipy.stats), Statsmodels
  * **Experiment 5** → Python, Scikit-Learn (preprocessing), NumPy
  * **Experiment 6** → Python, Scikit-Learn (linear_model), Matplotlib
  * **Experiment 7** → Python, Scikit-Learn (tree, metrics), Seaborn
  * **Experiment 8** → Python, Scikit-Learn (cluster), Matplotlib
  * **Experiment 9** → Python, Scikit-Learn (decomposition), NumPy, Matplotlib
  * **Experiment 10** → Python, Scikit-Learn (model_selection, pipeline), Joblib
* Shows the short purpose of each tool in academic language that is easy for a professor to evaluate.
* Interactive real-time search box to filter tools or libraries.

### 5. Profile Page
* Clean, professional student profile card displaying:
  * **Profile Photo** (customizable via URL or direct image upload)
  * **Name**: `D.S.Prudhvi Raj`
  * **Roll No**: `24102A030017`
  * **Section**: `DS-1`
  * **Branch**: `DS`
  * **Assistant Professor**: `Bosubabu`
  * **GitHub**: `https://github.com/prudhviraj`
  * **LinkedIn**: `https://linkedin.com/in/prudhviraj`
  * **Skills**: `Python`, `NumPy`, `Pandas`, `Matplotlib`, `Seaborn`, `Scikit-Learn`, `Data Analysis`, `Machine Learning`, `SQL`, `Statistical Modeling`
  * **Lab Progress**: Completed / Total experiments counter, dynamic percentage, and visual progress bar.

### 6. Edit Profile Modal
* **Edit Profile** button opens a clean modal.
* Editable fields:
  * Photo (file upload or URL)
  * Name
  * Roll No
  * Section
  * Branch
  * Assistant Professor
  * GitHub URL
  * LinkedIn URL
  * Skills (comma-separated badges)
* Changes are written immediately to **IndexedDB + LocalStorage**, persisting across refreshes, reloads, and re-logins.

### 7. Database Architecture
* Uses **IndexedDB** (`DSLabPortalDB` v1) with dual-write fallback to `LocalStorage`.
* Schema stores:
  * `profile`: Student identity, links, photo, and skills
  * `experiments`: All 10 experiments, status, output preview data (data URLs/SVGs), file names, execution notes, and dates.
* Zero external server dependencies required—opens and functions reliably in any standard web browser.

---

## 📂 Project Structure

```
ds-lab-portal/
├── index.html           # Main semantic HTML structure & modals
├── styles.css           # Clean, professional academic stylesheet
├── db.js                # IndexedDB + LocalStorage persistent database module
├── app.js               # Application router, event listeners, UI renderers
├── sample-outputs.js    # Embedded SVG data URIs for sample experiment outputs
└── README.md            # Documentation and instructions
```

---

## 🌐 How to Open & Run

1. **Directly in Browser**:
   * Double-click `index.html` or open it in Google Chrome, Microsoft Edge, or Firefox.
   * Everything runs client-side with full database persistence out of the box.

2. **Using a Local Web Server** (Optional):
   * Run with Python: `python -m http.server 8000`
   * Run with Node/npx: `npx serve .`
   * Run with PowerShell:
     ```powershell
     Start-Process "msedge.exe" "C:\Users\HP\.gemini\antigravity\scratch\ds-lab-portal\index.html"
     ```

---

## 💡 Setting Active Workspace in Antigravity

To set this directory as your active workspace in Antigravity:
1. Go to **File** > **Open Folder...** (or press `Ctrl+K Ctrl+O`).
2. Select:
   `C:\Users\HP\.gemini\antigravity\scratch\ds-lab-portal`
3. Click **Select Folder**.
