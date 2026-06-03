# 🔥 2-Month Internship Preparation: The Portfolio Builder

**Target Audience:** You have 60 days until internship applications peak.
**Goal:** Build a robust portfolio that proves you can handle real-world messy data, understand model intuition, and deploy basic applications.

> [!IMPORTANT]
> **Mentor Reality Check:** With two months, you have time to understand *why* models make the decisions they do. You will learn Hyperparameter tuning, Cross-Validation, and basic Deep Learning. Your focus is building 2 end-to-end projects.

---

## 🗓️ Month 1: The Foundation (Data & Core ML)

### Weeks 1-2: Advanced EDA & Data Engineering
- **Focus:** Real-world data is messy. Learn to clean it efficiently.
- **Concepts:** Handling skewed distributions (log transforms), Outlier detection (Z-score, IQR), Feature Scaling (StandardScaler vs MinMaxScaler).
- **SQL:** Master Window Functions and CTEs.
- **Action Item:** Pick a complex dataset (e.g., Telco Customer Churn). Perform a full Exploratory Data Analysis. Create 5 visual insights using Seaborn/Plotly that answer specific business questions.

### Weeks 3-4: Classical Machine Learning & Tuning
- **Focus:** Building robust models, not just fitting them.
- **Algorithms:** Logistic Regression, SVMs, Random Forest, XGBoost.
- **Advanced Concepts:** K-Fold Cross-Validation, `GridSearchCV` / `RandomizedSearchCV` for hyperparameter tuning.
- **Action Item:** Complete **Project 1** from our [Real-Time Projects Guide](./REAL_TIME_PROJECTS.md) (e.g., Customer Churn Prediction). Implement robust cross-validation and handle class imbalance using SMOTE.

---

## 🗓️ Month 2: Deep Learning, APIs, and Polish

### Weeks 5-6: Intro to NLP and Deep Learning
- **Focus:** Moving beyond tabular data into unstructured data (text).
- **Concepts:** Neural Network basics (Forward/Backward pass intuition), Word Embeddings (TF-IDF, Word2Vec), Basics of Transformers.
- **Framework:** Learn the basics of PyTorch or use Hugging Face `transformers` library directly.
- **Action Item:** Complete **Project 2** (e.g., AI Resume Screener or Sentiment Analysis). Use Hugging Face to classify text.

### Week 7: Deployment (MLOps Basics)
- **Focus:** A model stuck in a notebook is useless to a business.
- **Concepts:** REST APIs, FastAPI, basic Docker containerization.
- **Action Item:** Follow our [MLOps Deployment Template](../interactive-projects/MLOPS_DEPLOYMENT_TEMPLATE.md) to wrap your Churn Prediction model in a FastAPI endpoint and containerize it.

### Week 8: The Job Hunt
- **Resume:** Format your resume to highlight your 2 completed, deployed projects. See [Mentor Tips](./MENTOR_TIPS_AND_NETWORKING.md).
- **Interview Prep:** Practice answering behavioral questions (STAR method). Practice explaining the mathematical intuition behind XGBoost and Logistic Regression.
- **Networking:** Send 5 cold emails per day to recruiters and data science managers.
