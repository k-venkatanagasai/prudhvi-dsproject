// Sample realistic SVG plots for Data Science Lab experiments
// Encoded as clean SVG data URIs so they load instantly without external network requests

const SampleOutputs = {
  // Exp 1: Matrix Operations
  exp1: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
    <rect width="600" height="340" fill="%230f172a" rx="8"/>
    <text x="30" y="40" fill="%2338bdf8" font-family="monospace" font-size="16" font-weight="bold">>>> import numpy as np</text>
    <text x="30" y="70" fill="%2394a3b8" font-family="monospace" font-size="14"># Vectorized Array Creation &amp; Broadcasting</text>
    <text x="30" y="100" fill="%23f8fafc" font-family="monospace" font-size="14">A = np.array([[2, 4, 6], [1, 3, 5], [7, 8, 9]])</text>
    <text x="30" y="130" fill="%23f8fafc" font-family="monospace" font-size="14">B = np.array([[1, 0, 2], [0, 1, 1], [1, 2, 0]])</text>
    <text x="30" y="160" fill="%2338bdf8" font-family="monospace" font-size="14">>>> np.dot(A, B)</text>
    <text x="30" y="195" fill="%2334d399" font-family="monospace" font-size="14">array([[ 8, 16,  8],</text>
    <text x="30" y="220" fill="%2334d399" font-family="monospace" font-size="14">       [ 6, 13,  5],</text>
    <text x="30" y="245" fill="%2334d399" font-family="monospace" font-size="14">       [16, 26, 22]])</text>
    <text x="30" y="280" fill="%2338bdf8" font-family="monospace" font-size="14">>>> np.linalg.det(A) = -12.000000000000002</text>
    <text x="30" y="310" fill="%2322c55e" font-family="monospace" font-size="13">✓ Status: Execution Successful | NumPy v1.26.4 | CPU time: 0.003s</text>
  </svg>`,

  // Exp 2: Pandas Data Cleaning
  exp2: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
    <rect width="600" height="340" fill="%230f172a" rx="8"/>
    <text x="25" y="35" fill="%2338bdf8" font-family="monospace" font-size="15" font-weight="bold">>>> df.info() &amp; Data Pipeline Summary</text>
    <rect x="25" y="55" width="550" height="230" fill="%231e293b" rx="6" stroke="%23334155"/>
    <text x="40" y="85" fill="%23e2e8f0" font-family="monospace" font-size="13">Dataset: student_performance_raw.csv (5000 rows × 8 cols)</text>
    <text x="40" y="115" fill="%23f59e0b" font-family="monospace" font-size="13">• Null entries detected in 'Study_Hours': 142 (Imputed with median)</text>
    <text x="40" y="145" fill="%23f59e0b" font-family="monospace" font-size="13">• Duplicate records removed: 18 rows</text>
    <text x="40" y="175" fill="%2338bdf8" font-family="monospace" font-size="13">• Categorical column 'Parental_Edu': Label Encoded [0..3]</text>
    <text x="40" y="205" fill="%23e2e8f0" font-family="monospace" font-size="13">Final clean dataset shape: (4982, 8) | Memory usage: 311.5 KB</text>
    <text x="40" y="240" fill="%2334d399" font-family="monospace" font-size="14">Aggregation: df.groupby('Section')['Final_Score'].mean()</text>
    <text x="40" y="265" fill="%23a7f3d0" font-family="monospace" font-size="13">DS-1: 86.4 | DS-2: 83.1 | DS-3: 81.7 (All values verified)</text>
    <text x="25" y="315" fill="%2322c55e" font-family="monospace" font-size="13">✓ Status: Data Cleaning &amp; Transformations Passed (0 missing)</text>
  </svg>`,

  // Exp 3: Correlation Heatmap
  exp3: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
    <rect width="600" height="340" fill="%23ffffff" rx="8" stroke="%23e2e8f0"/>
    <text x="30" y="35" fill="%230f172a" font-family="sans-serif" font-size="16" font-weight="bold">Feature Correlation Matrix Heatmap (Seaborn)</text>
    
    <!-- Heatmap Cells -->
    <rect x="80" y="60" width="80" height="45" fill="%231e3a8a"/>
    <rect x="160" y="60" width="80" height="45" fill="%233b82f6"/>
    <rect x="240" y="60" width="80" height="45" fill="%2393c5fd"/>
    <rect x="320" y="60" width="80" height="45" fill="%23bfdbfe"/>
    <rect x="400" y="60" width="80" height="45" fill="%231e40af"/>

    <rect x="80" y="105" width="80" height="45" fill="%233b82f6"/>
    <rect x="160" y="105" width="80" height="45" fill="%231e3a8a"/>
    <rect x="240" y="105" width="80" height="45" fill="%2360a5fa"/>
    <rect x="320" y="105" width="80" height="45" fill="%23dbeafe"/>
    <rect x="400" y="105" width="80" height="45" fill="%232563eb"/>

    <rect x="80" y="150" width="80" height="45" fill="%2393c5fd"/>
    <rect x="160" y="150" width="80" height="45" fill="%2360a5fa"/>
    <rect x="240" y="150" width="80" height="45" fill="%231e3a8a"/>
    <rect x="320" y="150" width="80" height="45" fill="%23eff6ff"/>
    <rect x="400" y="150" width="80" height="45" fill="%233b82f6"/>

    <rect x="80" y="195" width="80" height="45" fill="%23bfdbfe"/>
    <rect x="160" y="195" width="80" height="45" fill="%23dbeafe"/>
    <rect x="240" y="195" width="80" height="45" fill="%23eff6ff"/>
    <rect x="320" y="195" width="80" height="45" fill="%231e3a8a"/>
    <rect x="400" y="195" width="80" height="45" fill="%2393c5fd"/>

    <rect x="80" y="240" width="80" height="45" fill="%231e40af"/>
    <rect x="160" y="240" width="80" height="45" fill="%232563eb"/>
    <rect x="240" y="240" width="80" height="45" fill="%233b82f6"/>
    <rect x="320" y="240" width="80" height="45" fill="%2393c5fd"/>
    <rect x="400" y="240" width="80" height="45" fill="%231e3a8a"/>

    <!-- Values in cells -->
    <text x="120" y="88" fill="%23ffffff" font-family="sans-serif" font-size="12" text-anchor="middle">1.00</text>
    <text x="200" y="88" fill="%23ffffff" font-family="sans-serif" font-size="12" text-anchor="middle">0.78</text>
    <text x="280" y="88" fill="%231e293b" font-family="sans-serif" font-size="12" text-anchor="middle">0.45</text>
    <text x="360" y="88" fill="%231e293b" font-family="sans-serif" font-size="12" text-anchor="middle">0.21</text>
    <text x="440" y="88" fill="%23ffffff" font-family="sans-serif" font-size="12" text-anchor="middle">0.89</text>

    <!-- Labels -->
    <text x="120" y="305" fill="%2364748b" font-family="sans-serif" font-size="11" text-anchor="middle">StudyHrs</text>
    <text x="200" y="305" fill="%2364748b" font-family="sans-serif" font-size="11" text-anchor="middle">Attend</text>
    <text x="280" y="305" fill="%2364748b" font-family="sans-serif" font-size="11" text-anchor="middle">PriorGPA</text>
    <text x="360" y="305" fill="%2364748b" font-family="sans-serif" font-size="11" text-anchor="middle">SleepHrs</text>
    <text x="440" y="305" fill="%2364748b" font-family="sans-serif" font-size="11" text-anchor="middle">Score</text>
    <text x="30" y="328" fill="%2310b981" font-family="sans-serif" font-size="12" font-weight="600">Generated using sns.heatmap(annot=True, cmap='Blues')</text>
  </svg>`,

  // Exp 4: Hypothesis Testing
  exp4: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
    <rect width="600" height="340" fill="%230f172a" rx="8"/>
    <text x="30" y="35" fill="%2338bdf8" font-family="monospace" font-size="15" font-weight="bold">scipy.stats.ttest_ind(sample_A, sample_B)</text>
    <rect x="30" y="55" width="540" height="180" fill="%231e293b" rx="6" stroke="%23334155"/>
    <text x="50" y="85" fill="%23e2e8f0" font-family="monospace" font-size="13">Hypothesis Testing: Student Performance comparison</text>
    <text x="50" y="115" fill="%2394a3b8" font-family="monospace" font-size="13">H0: μ1 = μ2 (No significant difference between cohorts)</text>
    <text x="50" y="145" fill="%2394a3b8" font-family="monospace" font-size="13">H1: μ1 ≠ μ2 (Significant difference exists)</text>
    <text x="50" y="180" fill="%2338bdf8" font-family="monospace" font-size="14">Calculated t-statistic : 3.4218</text>
    <text x="50" y="210" fill="%2334d399" font-family="monospace" font-size="14">Calculated p-value     : 0.00084  (&lt; α = 0.05)</text>
    <rect x="30" y="250" width="540" height="60" fill="%23064e3b" rx="6" stroke="%23059669"/>
    <text x="50" y="285" fill="%236ee7b7" font-family="monospace" font-size="14" font-weight="bold">Decision: Reject H0 at 95% Confidence Level (statistically significant)</text>
  </svg>`,

  // Exp 5: Feature Scaling
  exp5: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
    <rect width="600" height="340" fill="%23ffffff" rx="8" stroke="%23e2e8f0"/>
    <text x="30" y="35" fill="%230f172a" font-family="sans-serif" font-size="16" font-weight="bold">StandardScaler &amp; MinMaxScaler Transformation</text>
    <!-- Before Scaling -->
    <rect x="40" y="60" width="240" height="220" fill="%23f8fafc" rx="6" stroke="%23cbd5e1"/>
    <text x="55" y="85" fill="%23334155" font-family="sans-serif" font-size="14" font-weight="bold">Original Raw Features</text>
    <text x="55" y="115" fill="%2364748b" font-family="monospace" font-size="12">Income: μ=$65,400, σ=$18,200</text>
    <text x="55" y="140" fill="%2364748b" font-family="monospace" font-size="12">Age:    μ=34.2 yrs, σ=8.5 yrs</text>
    <text x="55" y="165" fill="%2364748b" font-family="monospace" font-size="12">Exp:    μ=6.1 yrs,  σ=3.2 yrs</text>
    <text x="55" y="210" fill="%23ef4444" font-family="sans-serif" font-size="12">High scale disparity causes</text>
    <text x="55" y="230" fill="%23ef4444" font-family="sans-serif" font-size="12">gradient descent divergence</text>
    <!-- After Scaling -->
    <rect x="320" y="60" width="240" height="220" fill="%23eff6ff" rx="6" stroke="%2393c5fd"/>
    <text x="335" y="85" fill="%231e40af" font-family="sans-serif" font-size="14" font-weight="bold">StandardScaler (z = (x-μ)/σ)</text>
    <text x="335" y="115" fill="%231e3a8a" font-family="monospace" font-size="12">Scaled_Income: μ=0.00, σ=1.00</text>
    <text x="335" y="140" fill="%231e3a8a" font-family="monospace" font-size="12">Scaled_Age:    μ=0.00, σ=1.00</text>
    <text x="335" y="165" fill="%231e3a8a" font-family="monospace" font-size="12">Scaled_Exp:    μ=0.00, σ=1.00</text>
    <text x="335" y="210" fill="%23059669" font-family="sans-serif" font-size="12">Uniform zero mean &amp; unit variance</text>
    <text x="335" y="230" fill="%23059669" font-family="sans-serif" font-size="12">Ensures balanced feature weights</text>
    <text x="30" y="315" fill="%232563eb" font-family="sans-serif" font-size="13" font-weight="600">Processed using sklearn.preprocessing.StandardScaler()</text>
  </svg>`,

  // Exp 6: Linear Regression Fit
  exp6: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
    <rect width="600" height="340" fill="%23ffffff" rx="8" stroke="%23e2e8f0"/>
    <text x="30" y="35" fill="%230f172a" font-family="sans-serif" font-size="16" font-weight="bold">Linear Regression Fit (Study Hours vs Exam Score)</text>
    <!-- Axes -->
    <line x1="70" y1="280" x2="540" y2="280" stroke="%2394a3b8" stroke-width="2"/>
    <line x1="70" y1="60" x2="70" y2="280" stroke="%2394a3b8" stroke-width="2"/>
    <!-- Grid -->
    <line x1="70" y1="225" x2="540" y2="225" stroke="%23f1f5f9" stroke-width="1"/>
    <line x1="70" y1="170" x2="540" y2="170" stroke="%23f1f5f9" stroke-width="1"/>
    <line x1="70" y1="115" x2="540" y2="115" stroke="%23f1f5f9" stroke-width="1"/>
    <!-- Scatter points -->
    <circle cx="100" cy="255" r="4" fill="%233b82f6"/>
    <circle cx="130" cy="240" r="4" fill="%233b82f6"/>
    <circle cx="170" cy="230" r="4" fill="%233b82f6"/>
    <circle cx="210" cy="195" r="4" fill="%233b82f6"/>
    <circle cx="260" cy="185" r="4" fill="%233b82f6"/>
    <circle cx="300" cy="160" r="4" fill="%233b82f6"/>
    <circle cx="340" cy="140" r="4" fill="%233b82f6"/>
    <circle cx="390" cy="130" r="4" fill="%233b82f6"/>
    <circle cx="430" cy="105" r="4" fill="%233b82f6"/>
    <circle cx="480" cy="85" r="4" fill="%233b82f6"/>
    <!-- Regression Best Fit Line -->
    <line x1="80" y1="265" x2="510" y2="75" stroke="%23ef4444" stroke-width="3"/>
    <!-- Metrics card -->
    <rect x="360" y="210" width="180" height="60" fill="%23f8fafc" rx="4" stroke="%23cbd5e1"/>
    <text x="375" y="232" fill="%230f172a" font-family="monospace" font-size="12" font-weight="bold">R² Score: 0.892</text>
    <text x="375" y="252" fill="%23475569" font-family="monospace" font-size="11">y = 6.42x + 38.15</text>
    <text x="70" y="305" fill="%2364748b" font-family="sans-serif" font-size="11">Study Hours (Independent X)</text>
    <text x="450" y="305" fill="%2364748b" font-family="sans-serif" font-size="11">Exam Score (Y)</text>
  </svg>`,

  // Exp 7: Confusion Matrix
  exp7: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
    <rect width="600" height="340" fill="%23ffffff" rx="8" stroke="%23e2e8f0"/>
    <text x="30" y="35" fill="%230f172a" font-family="sans-serif" font-size="16" font-weight="bold">Classification Confusion Matrix (Decision Tree)</text>
    <!-- Matrix Box -->
    <rect x="120" y="70" width="150" height="90" fill="%2310b981" rx="4"/>
    <text x="195" y="115" fill="%23ffffff" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">TP = 462</text>
    <text x="195" y="135" fill="%23ecfdf5" font-family="sans-serif" font-size="12" text-anchor="middle">True Positive</text>

    <rect x="290" y="70" width="150" height="90" fill="%23fee2e2" rx="4"/>
    <text x="365" y="115" fill="%23b91c1c" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">FN = 28</text>
    <text x="365" y="135" fill="%237f1d1d" font-family="sans-serif" font-size="12" text-anchor="middle">False Negative</text>

    <rect x="120" y="175" width="150" height="90" fill="%23fef3c7" rx="4"/>
    <text x="195" y="220" fill="%23b45309" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">FP = 38</text>
    <text x="195" y="240" fill="%2378350f" font-family="sans-serif" font-size="12" text-anchor="middle">False Positive</text>

    <rect x="290" y="175" width="150" height="90" fill="%232563eb" rx="4"/>
    <text x="365" y="220" fill="%23ffffff" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">TN = 472</text>
    <text x="365" y="240" fill="%23eff6ff" font-family="sans-serif" font-size="12" text-anchor="middle">True Negative</text>

    <!-- Metrics line -->
    <text x="30" y="305" fill="%230f172a" font-family="monospace" font-size="13" font-weight="bold">Accuracy: 93.4% | Precision: 92.4% | Recall: 94.3% | F1: 93.3%</text>
  </svg>`,

  // Exp 8: K-Means Clustering
  exp8: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
    <rect width="600" height="340" fill="%23ffffff" rx="8" stroke="%23e2e8f0"/>
    <text x="30" y="35" fill="%230f172a" font-family="sans-serif" font-size="16" font-weight="bold">K-Means 2D Clusters &amp; Centroids (k=3)</text>
    <!-- Cluster 1 (Blue) -->
    <circle cx="150" cy="120" r="5" fill="%232563eb"/>
    <circle cx="140" cy="140" r="5" fill="%232563eb"/>
    <circle cx="170" cy="110" r="5" fill="%232563eb"/>
    <circle cx="180" cy="130" r="5" fill="%232563eb"/>
    <circle cx="160" cy="150" r="5" fill="%232563eb"/>
    <!-- Centroid 1 -->
    <rect x="155" y="125" width="12" height="12" fill="%23dc2626" transform="rotate(45 161 131)"/>

    <!-- Cluster 2 (Green) -->
    <circle cx="350" cy="90" r="5" fill="%2310b981"/>
    <circle cx="340" cy="110" r="5" fill="%2310b981"/>
    <circle cx="370" cy="80" r="5" fill="%2310b981"/>
    <circle cx="390" cy="100" r="5" fill="%2310b981"/>
    <circle cx="360" cy="120" r="5" fill="%2310b981"/>
    <!-- Centroid 2 -->
    <rect x="355" y="95" width="12" height="12" fill="%23dc2626" transform="rotate(45 361 101)"/>

    <!-- Cluster 3 (Purple) -->
    <circle cx="260" cy="240" r="5" fill="%238b5cf6"/>
    <circle cx="250" cy="260" r="5" fill="%238b5cf6"/>
    <circle cx="280" cy="230" r="5" fill="%238b5cf6"/>
    <circle cx="290" cy="250" r="5" fill="%238b5cf6"/>
    <circle cx="270" cy="270" r="5" fill="%238b5cf6"/>
    <!-- Centroid 3 -->
    <rect x="265" y="245" width="12" height="12" fill="%23dc2626" transform="rotate(45 271 251)"/>

    <!-- Legend -->
    <circle cx="480" cy="130" r="5" fill="%232563eb"/>
    <text x="495" y="134" fill="%23475569" font-family="sans-serif" font-size="12">Cluster 0 (High Perf)</text>
    <circle cx="480" cy="160" r="5" fill="%2310b981"/>
    <text x="495" y="164" fill="%23475569" font-family="sans-serif" font-size="12">Cluster 1 (Moderate)</text>
    <circle cx="480" cy="190" r="5" fill="%238b5cf6"/>
    <text x="495" y="194" fill="%23475569" font-family="sans-serif" font-size="12">Cluster 2 (Low Perf)</text>
    <rect x="475" y="215" width="10" height="10" fill="%23dc2626" transform="rotate(45 480 220)"/>
    <text x="495" y="224" fill="%23dc2626" font-family="sans-serif" font-size="12" font-weight="bold">Centroids</text>

    <text x="30" y="315" fill="%2364748b" font-family="sans-serif" font-size="13">Elbow inertia criterion reached optimal bend at k=3 (Silhouette: 0.68)</text>
  </svg>`,

  // Exp 9: PCA Explained Variance
  exp9: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
    <rect width="600" height="340" fill="%230f172a" rx="8"/>
    <text x="30" y="35" fill="%2338bdf8" font-family="monospace" font-size="15" font-weight="bold">PCA(n_components=2) Explained Variance Ratio</text>
    <rect x="30" y="60" width="540" height="190" fill="%231e293b" rx="6" stroke="%23334155"/>
    <!-- Bars -->
    <rect x="60" y="90" width="180" height="35" fill="%233b82f6" rx="3"/>
    <text x="250" y="112" fill="%23e2e8f0" font-family="monospace" font-size="13">PC 1: 58.4% Variance</text>

    <rect x="60" y="140" width="90" height="35" fill="%2360a5fa" rx="3"/>
    <text x="160" y="162" fill="%23e2e8f0" font-family="monospace" font-size="13">PC 2: 26.3% Variance</text>

    <rect x="60" y="190" width="270" height="35" fill="%2310b981" rx="3"/>
    <text x="340" y="212" fill="%23a7f3d0" font-family="monospace" font-size="13" font-weight="bold">Cumulative 2-Component Variance: 84.7%</text>

    <text x="30" y="285" fill="%2394a3b8" font-family="monospace" font-size="13">Original Dimensions: 14 features → Reduced Dimensions: 2 features</text>
    <text x="30" y="310" fill="%23f59e0b" font-family="monospace" font-size="13">⚡ Status: In Progress | 2D projection completed; 3D scree plot pending</text>
  </svg>`,

  // Default avatar SVG
  defaultAvatar: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%232563eb" />
        <stop offset="100%" stop-color="%231d4ed8" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="100" fill="url(%23grad)"/>
    <circle cx="100" cy="75" r="38" fill="%23ffffff" fill-opacity="0.95"/>
    <path d="M40,165 C40,125 70,118 100,118 C130,118 160,125 160,165 Z" fill="%23ffffff" fill-opacity="0.95"/>
    <text x="100" y="192" fill="%23ffffff" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle" letter-spacing="1">DS STUDENT</text>
  </svg>`
};
