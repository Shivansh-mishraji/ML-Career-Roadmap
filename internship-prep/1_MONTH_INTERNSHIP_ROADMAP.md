# 🚀 1-Month Internship Preparation: The Survival Guide

**Target Audience:** You have an internship interview or application deadline in 30 days.
**Goal:** Pass the technical screen, build 1-2 impactful projects, and optimize your resume.

> [!WARNING]
> **Mentor Reality Check:** You do not have time to learn the deep math behind algorithms or build models from scratch. You must focus on *Applied Machine Learning*. Learn the APIs, learn how to talk about trade-offs, and build projects that look good on a resume.

---

## 🗓️ Week 1: Data Wrangling & SQL (The Essentials)
*Interns spend 80% of their time cleaning data. If you can't write a SQL query or clean a pandas DataFrame, you won't pass the first round.*

- **Python (Pandas & NumPy):** Focus on vectorization. Do not write `for` loops. Learn `groupby`, `merge`, `loc/iloc`, and handling `NaN` values.
- **SQL:** Learn `SELECT`, `JOIN`, `GROUP BY`, and **Window Functions**.
- **Action Item:** Complete 15 LeetCode SQL problems (Easy/Medium).
- **Resource:** [Kaggle Pandas Course](https://www.kaggle.com/learn/pandas) (Takes 4 hours).

## 🗓️ Week 2: Applied Machine Learning (Scikit-Learn)
*Do not write algorithms from scratch. Use Scikit-Learn.*

- **Core Algorithms to Know:** Linear/Logistic Regression, Random Forest, and XGBoost.
- **Concepts to Master:** Train/Test split, Cross-Validation, Overfitting vs. Underfitting, Bias-Variance Tradeoff.
- **Metrics:** Know when to use Accuracy vs. F1-Score vs. ROC-AUC.
- **Action Item:** Take the Titanic or Housing dataset, clean it, train an XGBoost model, and evaluate it using a confusion matrix.
- **Resource:** [StatQuest on YouTube](https://www.youtube.com/user/joshstarmer) (Watch Random Forest and XGBoost videos).

## 🗓️ Week 3: High-ROI Project Building
*You need a project that stands out. Standard classification projects won't cut it. Build something with GenAI or NLP.*

- **Focus:** Build an API-driven project. Recruiters love GenAI.
- **Project Goal:** Build a Retrieval-Augmented Generation (RAG) app where a user can chat with a PDF.
- **Action Item:** Follow our [RAG_LLM_TEMPLATE](../interactive-projects/RAG_LLM_TEMPLATE.md). It uses Streamlit and LangChain. 
- **Deliverable:** Push this project to GitHub with a clean, well-documented `README.md`. Record a 1-minute video demo of it working.

## 🗓️ Week 4: Interview Prep & Resume Polish
*Your code doesn't matter if your resume doesn't pass the 6-second HR screen.*

- **Resume:** Update your resume using the format in our [Mentor Networking Tips](./MENTOR_TIPS_AND_NETWORKING.md). Focus on *Impact* (e.g., "Deployed a RAG app handling 50+ document queries").
- **Cold Emailing:** Do not just apply on portals. Find Engineering Managers or Data Science Leads on LinkedIn and send them a link to your 1-minute video demo.
- **Mock Interviews:** Practice explaining your project. "I chose ChromaDB because...", "I used LangChain to chunk the text because..."

> [!TIP]
> **The Secret:** In a 1-month crunch, execution beats perfection. A deployed Streamlit app that is slightly buggy is 100x better than a perfect Jupyter Notebook that no one can see.
