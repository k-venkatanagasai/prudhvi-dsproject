/**
 * db.js - Persistent Database Module for DS Lab Portal
 * Uses IndexedDB with transparent LocalStorage sync and fallback.
 * Ensures user profile details and lab executions/outputs persist across refreshes,
 * reloads, and browser sessions.
 */

const DB_NAME = 'DSLabPortalDB';
const DB_VERSION = 1;
const STORAGE_KEY_PROFILE = 'ds_portal_profile_v1';
const STORAGE_KEY_EXPERIMENTS = 'ds_portal_experiments_v1';

// Initial Seed Data matching exact user specifications
const defaultProfile = {
  name: "D.S.Prudhvi Raj",
  rollNo: "24102A030017",
  section: "DS-1",
  branch: "DS",
  assistantProfessor: "Bosubabu",
  github: "https://github.com/prudhviraj",
  linkedin: "https://linkedin.com/in/prudhviraj",
  skills: [
    "Python",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "Seaborn",
    "Scikit-Learn",
    "Data Analysis",
    "Machine Learning",
    "SQL",
    "Statistical Modeling"
  ],
  photo: (typeof SampleOutputs !== 'undefined' && SampleOutputs.defaultAvatar) ? SampleOutputs.defaultAvatar : ""
};

const defaultExperiments = [
  {
    id: 1,
    title: "Introduction to Python for Data Science and Array Computing with NumPy",
    desc: "Basic syntax, vectorized multidimensional array creation, slicing, indexing, broadcasting, and matrix operations with NumPy.",
    status: "Completed",
    tools: [
      { name: "Python", purpose: "Core programming language for writing scripts and numerical calculations." },
      { name: "NumPy", purpose: "Fast N-dimensional array processing, vectorization, and linear algebra routines." }
    ],
    outputName: "exp1_numpy_matrix_ops.png",
    outputPreview: (typeof SampleOutputs !== 'undefined') ? SampleOutputs.exp1 : "",
    outputNotes: "Executed successfully. Matrix multiplication, dot products, and broadcast shape verification passed with 0 errors.",
    date: "2026-09-05"
  },
  {
    id: 2,
    title: "Data Ingestion, Cleaning and Manipulation using Pandas",
    desc: "Importing tabular data (CSV/Excel), identifying missing records, median imputation, data filtering, and groupby aggregations.",
    status: "Completed",
    tools: [
      { name: "Python", purpose: "Execution environment for end-to-end data transformation pipelines." },
      { name: "Pandas", purpose: "DataFrame structures, time series manipulation, and high-performance tabular aggregations." }
    ],
    outputName: "exp2_pandas_cleaning_summary.png",
    outputPreview: (typeof SampleOutputs !== 'undefined') ? SampleOutputs.exp2 : "",
    outputNotes: "Handled 142 missing entries; eliminated 18 duplicate rows; generated clean normalized student dataset.",
    date: "2026-09-12"
  },
  {
    id: 3,
    title: "Exploratory Data Analysis & Visualizations using Matplotlib & Seaborn",
    desc: "Creating univariate and bivariate visualizations including histograms, scatter diagrams, boxplots, and correlation heatmaps.",
    status: "Completed",
    tools: [
      { name: "Python", purpose: "Scripting and automated plot generation." },
      { name: "Matplotlib", purpose: "Fundamental 2D plotting library for publication-quality figures and axes styling." },
      { name: "Seaborn", purpose: "Statistical data visualization built on Matplotlib with integrated color palettes and heatmaps." }
    ],
    outputName: "exp3_eda_correlation_heatmap.png",
    outputPreview: (typeof SampleOutputs !== 'undefined') ? SampleOutputs.exp3 : "",
    outputNotes: "Plotted 5-feature correlation matrix and distribution density plots for academic faculty review.",
    date: "2026-09-19"
  },
  {
    id: 4,
    title: "Statistical Analysis and Hypothesis Testing with SciPy",
    desc: "Evaluating population parameters using one-sample and two-sample t-tests, Chi-Square independence test, and p-value validation.",
    status: "Completed",
    tools: [
      { name: "Python", purpose: "Scripting statistical test pipelines." },
      { name: "SciPy (scipy.stats)", purpose: "Scientific computing routines for continuous probability distributions and hypothesis tests." },
      { name: "Statsmodels", purpose: "Statistical modeling and comprehensive summary tables." }
    ],
    outputName: "exp4_hypothesis_ttest_results.png",
    outputPreview: (typeof SampleOutputs !== 'undefined') ? SampleOutputs.exp4 : "",
    outputNotes: "Two-sample t-test yielded t-stat = 3.42, p-value = 0.00084. Null hypothesis rejected at 5% significance level.",
    date: "2026-09-26"
  },
  {
    id: 5,
    title: "Data Preprocessing and Feature Engineering (Scaling, Encoding, Imputation)",
    desc: "Normalizing continuous features with StandardScaler/MinMaxScaler, categorical encoding using OneHotEncoder, and train-test splitting.",
    status: "Completed",
    tools: [
      { name: "Python", purpose: "Execution runtime." },
      { name: "Scikit-Learn", purpose: "Standardized preprocessing transformers (StandardScaler, OneHotEncoder) and data validation pipelines." },
      { name: "NumPy", purpose: "Efficient in-memory numerical arrays for transformed data." }
    ],
    outputName: "exp5_feature_scaling_comparison.png",
    outputPreview: (typeof SampleOutputs !== 'undefined') ? SampleOutputs.exp5 : "",
    outputNotes: "Scaled 8 continuous variables; transformed 3 categorical columns into sparse binary vectors.",
    date: "2026-10-03"
  },
  {
    id: 6,
    title: "Linear and Polynomial Regression for Predictive Modeling",
    desc: "Implementing Ordinary Least Squares (OLS) regression, computing MSE and R² metrics, and visualizing residual errors.",
    status: "Completed",
    tools: [
      { name: "Python", purpose: "Model training and evaluation driver." },
      { name: "Scikit-Learn", purpose: "LinearRegression estimator and regression evaluation metrics." },
      { name: "Matplotlib", purpose: "Visualizing regression best-fit lines and residual scatter plots." }
    ],
    outputName: "exp6_linear_regression_fit.png",
    outputPreview: (typeof SampleOutputs !== 'undefined') ? SampleOutputs.exp6 : "",
    outputNotes: "Model achieved R² = 0.892 and RMSE = 2.14 on test split (80-20 partition).",
    date: "2026-10-10"
  },
  {
    id: 7,
    title: "Classification Modeling using Logistic Regression and Decision Trees",
    desc: "Training classification algorithms, plotting confusion matrices, ROC-AUC curves, and computing precision, recall, and F1-score.",
    status: "Completed",
    tools: [
      { name: "Python", purpose: "Training workflow orchestration." },
      { name: "Scikit-Learn", purpose: "DecisionTreeClassifier, LogisticRegression, confusion_matrix, and classification_report." },
      { name: "Seaborn", purpose: "Visualizing annotated confusion matrix heatmap." }
    ],
    outputName: "exp7_confusion_matrix_roc.png",
    outputPreview: (typeof SampleOutputs !== 'undefined') ? SampleOutputs.exp7 : "",
    outputNotes: "Overall accuracy: 93.4%. Precision: 0.92, Recall: 0.94, F1-Score: 0.93.",
    date: "2026-10-17"
  },
  {
    id: 8,
    title: "Clustering and Unsupervised Pattern Discovery with K-Means",
    desc: "Unsupervised clustering on unlabeled data, computing inertia across k=1..10 to determine optimal clusters via Elbow Method, and cluster visualization.",
    status: "Completed",
    tools: [
      { name: "Python", purpose: "Algorithmic computation and pipeline coordination." },
      { name: "Scikit-Learn", purpose: "KMeans clustering implementation with k-means++ centroid initialization." },
      { name: "Matplotlib", purpose: "Elbow curve plot and 2D cluster scatter with cluster centers." }
    ],
    outputName: "exp8_kmeans_elbow_clusters.png",
    outputPreview: (typeof SampleOutputs !== 'undefined') ? SampleOutputs.exp8 : "",
    outputNotes: "Elbow point identified at k=3; silhouette score computed at 0.68.",
    date: "2026-10-24"
  },
  {
    id: 9,
    title: "Dimensionality Reduction using Principal Component Analysis (PCA)",
    desc: "Decomposing high-dimensional feature spaces into principal components, measuring explained variance ratio, and visualizing 2D projection.",
    status: "In Progress",
    tools: [
      { name: "Python", purpose: "Scientific workflow." },
      { name: "Scikit-Learn", purpose: "PCA transformer for singular value decomposition." },
      { name: "NumPy", purpose: "Eigenvalue and eigenvector inspection." },
      { name: "Matplotlib", purpose: "Scree plot and 2D PC1 vs PC2 projection." }
    ],
    outputName: "exp9_pca_scree_plot.png",
    outputPreview: (typeof SampleOutputs !== 'undefined') ? SampleOutputs.exp9 : "",
    outputNotes: "Top 2 principal components capture 84.7% of total variance. Scree plot generated; 3D projection pending.",
    date: "2026-10-28"
  },
  {
    id: 10,
    title: "End-to-End Model Evaluation, Validation and Performance Reporting",
    desc: "Implementing K-Fold cross-validation, hyperparameter tuning using GridSearchCV, pipeline serialization with Joblib, and generating a lab report.",
    status: "Pending",
    tools: [
      { name: "Python", purpose: "Complete pipeline orchestration." },
      { name: "Scikit-Learn", purpose: "GridSearchCV, StratifiedKFold, and Pipeline construction." },
      { name: "Joblib", purpose: "Dumping and loading serialized model estimators (.joblib / .pkl)." }
    ],
    outputName: "",
    outputPreview: "",
    outputNotes: "Pipeline script authored. Running 5-fold cross-validation grid search for hyperparameter optimization.",
    date: "2026-10-29"
  }
];

class DSLabDatabase {
  constructor() {
    this.db = null;
    this.isInitialized = false;
  }

  async init() {
    if (this.isInitialized) return;

    return new Promise((resolve) => {
      // First ensure localStorage has baseline data
      if (!localStorage.getItem(STORAGE_KEY_PROFILE)) {
        localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(defaultProfile));
      }
      if (!localStorage.getItem(STORAGE_KEY_EXPERIMENTS)) {
        localStorage.setItem(STORAGE_KEY_EXPERIMENTS, JSON.stringify(defaultExperiments));
      }

      if (!window.indexedDB) {
        console.warn('IndexedDB not supported, using LocalStorage fallback.');
        this.isInitialized = true;
        resolve(true);
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('profile')) {
          db.createObjectStore('profile', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('experiments')) {
          db.createObjectStore('experiments', { keyPath: 'id' });
        }
      };

      request.onsuccess = async (event) => {
        this.db = event.target.result;
        await this._seedIndexedDB();
        this.isInitialized = true;
        resolve(true);
      };

      request.onerror = (event) => {
        console.error('IndexedDB error, falling back to LocalStorage:', event.target.error);
        this.isInitialized = true;
        resolve(true);
      };
    });
  }

  async _seedIndexedDB() {
    return new Promise((resolve) => {
      if (!this.db) {
        resolve();
        return;
      }
      const tx = this.db.transaction(['profile', 'experiments'], 'readwrite');
      const profileStore = tx.objectStore('profile');
      const expStore = tx.objectStore('experiments');

      const countRequest = profileStore.count();
      countRequest.onsuccess = () => {
        if (countRequest.result === 0) {
          const profileData = JSON.parse(localStorage.getItem(STORAGE_KEY_PROFILE) || JSON.stringify(defaultProfile));
          profileStore.put({ id: 'current_user', ...profileData });
        }
      };

      const expCount = expStore.count();
      expCount.onsuccess = () => {
        if (expCount.result === 0) {
          const expData = JSON.parse(localStorage.getItem(STORAGE_KEY_EXPERIMENTS) || JSON.stringify(defaultExperiments));
          expData.forEach((exp) => expStore.put(exp));
        }
      };

      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  }

  async getProfile() {
    await this.init();
    return new Promise((resolve) => {
      if (this.db) {
        try {
          const tx = this.db.transaction('profile', 'readonly');
          const store = tx.objectStore('profile');
          const req = store.get('current_user');
          req.onsuccess = () => {
            if (req.result) {
              const { id, ...profile } = req.result;
              resolve(profile);
              return;
            }
            resolve(this._getProfileFromLocalStorage());
          };
          req.onerror = () => resolve(this._getProfileFromLocalStorage());
        } catch (e) {
          resolve(this._getProfileFromLocalStorage());
        }
      } else {
        resolve(this._getProfileFromLocalStorage());
      }
    });
  }

  _getProfileFromLocalStorage() {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
    return raw ? JSON.parse(raw) : { ...defaultProfile };
  }

  async updateProfile(updatedData) {
    await this.init();
    // 1. Sync to LocalStorage
    const current = await this.getProfile();
    const merged = { ...current, ...updatedData };
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(merged));

    // 2. Sync to IndexedDB
    if (this.db) {
      try {
        const tx = this.db.transaction('profile', 'readwrite');
        const store = tx.objectStore('profile');
        store.put({ id: 'current_user', ...merged });
      } catch (e) {
        console.warn('Could not update profile in IndexedDB, LocalStorage updated.', e);
      }
    }

    return merged;
  }

  async getExperiments() {
    await this.init();
    return new Promise((resolve) => {
      if (this.db) {
        try {
          const tx = this.db.transaction('experiments', 'readonly');
          const store = tx.objectStore('experiments');
          const req = store.getAll();
          req.onsuccess = () => {
            if (req.result && req.result.length > 0) {
              resolve(req.result.sort((a, b) => a.id - b.id));
              return;
            }
            resolve(this._getExperimentsFromLocalStorage());
          };
          req.onerror = () => resolve(this._getExperimentsFromLocalStorage());
        } catch (e) {
          resolve(this._getExperimentsFromLocalStorage());
        }
      } else {
        resolve(this._getExperimentsFromLocalStorage());
      }
    });
  }

  _getExperimentsFromLocalStorage() {
    const raw = localStorage.getItem(STORAGE_KEY_EXPERIMENTS);
    if (!raw) return [...defaultExperiments];
    try {
      const parsed = JSON.parse(raw);
      return parsed.sort((a, b) => a.id - b.id);
    } catch (e) {
      return [...defaultExperiments];
    }
  }

  async getExperiment(id) {
    const all = await this.getExperiments();
    return all.find((item) => item.id === Number(id)) || null;
  }

  async updateExperiment(id, partial) {
    await this.init();
    const experiments = await this.getExperiments();
    const index = experiments.findIndex((exp) => exp.id === Number(id));
    if (index === -1) return null;

    experiments[index] = { ...experiments[index], ...partial };
    localStorage.setItem(STORAGE_KEY_EXPERIMENTS, JSON.stringify(experiments));

    if (this.db) {
      try {
        const tx = this.db.transaction('experiments', 'readwrite');
        const store = tx.objectStore('experiments');
        store.put(experiments[index]);
      } catch (e) {
        console.warn('Could not update experiment in IndexedDB, LocalStorage updated.', e);
      }
    }

    return experiments[index];
  }

  async uploadExperimentOutput(id, fileDataUrl, fileName, notes, newStatus) {
    const updates = {
      outputPreview: fileDataUrl,
      outputName: fileName,
      outputNotes: notes || "Output uploaded and verified by student.",
      date: new Date().toISOString().split('T')[0]
    };
    if (newStatus) {
      updates.status = newStatus;
    }
    return await this.updateExperiment(id, updates);
  }

  async resetToDefaults() {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(defaultProfile));
    localStorage.setItem(STORAGE_KEY_EXPERIMENTS, JSON.stringify(defaultExperiments));

    if (this.db) {
      try {
        const tx = this.db.transaction(['profile', 'experiments'], 'readwrite');
        const pStore = tx.objectStore('profile');
        const eStore = tx.objectStore('experiments');
        pStore.clear();
        eStore.clear();
        pStore.put({ id: 'current_user', ...defaultProfile });
        defaultExperiments.forEach((exp) => eStore.put(exp));
      } catch (e) {
        console.warn('Failed clearing IndexedDB', e);
      }
    }
    return true;
  }
}

// Global database instance
window.db = new DSLabDatabase();
