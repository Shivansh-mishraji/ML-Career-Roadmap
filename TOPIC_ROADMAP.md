<div align="center">

# 🧠 The Topic-Based ML Roadmap
### *Learn at Your Own Pace, Master the Fundamentals*

</div>

Every student learns at a different speed. Rigid "1-month" or "3-month" schedules often cause burnout or boredom. This roadmap is strictly **Topic-Based**. You only move to the next level when you have mastered the current one. 

Use the **Self-Assessment** in the main README to figure out exactly which Level you should start at.

---

## 🟢 Level 0: Python & Math Foundations
*The absolute prerequisites. Do not skip this if you are a beginner.*

### What you need to know:
*   **Python Basics:** Variables, Data Types, Loops, Functions, Classes (OOP), and List Comprehensions.
*   **Calculus Basics:** Derivatives, Gradients (understanding *why* things optimize).
*   **Probability:** Mean, Median, Variance, Standard Deviation, Normal Distribution.
*   **Linear Algebra Review (Andrew Ng - Week 1)**
    *   Matrices and Vectors
    *   Addition, Scalar Multiplication, and Matrix-Vector Multiplication
    *   Properties of Matrix Multiplication, Inverse, and Transpose

### Action Items & Verification:
- [ ] Watch a 4-hour Python crash course (e.g., Programming with Mosh or FreeCodeCamp).
- [ ] Watch 3Blue1Brown's "Essence of Linear Algebra" series on YouTube.
- **Proof of Mastery:** You can write a Python script that reads a text file, counts the frequency of each word, and prints the top 10 most common words using a dictionary.

---

## 🟡 Level 1: Data Manipulation & EDA
*Data Scientists spend 80% of their time here.*

### What you need to know:
*   **NumPy:** Arrays, Broadcasting, Vectorized operations.
*   **Pandas:** DataFrames, Filtering, GroupBy, Merging, Handling Missing Data.
*   **Visualization:** Matplotlib & Seaborn (Bar charts, Scatter plots, Histograms, Correlation Heatmaps).
*   **SQL Basics:** SELECT, JOIN, GROUP BY, WHERE.

### Action Items & Verification:
- [ ] Complete Kaggle's free "Pandas" and "Data Visualization" micro-courses.
- **Proof of Mastery:** Download the "Titanic" dataset from Kaggle. Perform Exploratory Data Analysis (EDA) in a Jupyter Notebook. Create 5 distinct charts that explain survival demographics.

---

## 🟠 Level 2: Classical Machine Learning
*The core algorithms. Do not jump to Deep Learning before mastering these.*

### Core Topics (Andrew Ng Syllabus Integration):
<details open>
<summary><b>1. Introduction & Linear Regression (Weeks 1-2)</b></summary>

*   What is Machine Learning? (Supervised vs Unsupervised)
*   Model Representation & Cost Function
*   Gradient Descent (Intuition and Linear Regression implementation)
*   Multivariate Features & Polynomial Regression
*   Feature Scaling & Learning Rate Adjustment
*   Normal Equation
</details>

<details open>
<summary><b>2. Classification & Regularization (Week 3)</b></summary>

*   **Logistic Regression:** Decision Boundaries, Cost Function, Multi-class (One-vs-All)
*   **Regularization:** The problem of Overfitting, Regularized Linear/Logistic Regression
</details>

<details open>
<summary><b>3. System Design & Best Practices (Week 6)</b></summary>

*   Evaluating a Hypothesis (Train/Validation/Test Sets)
*   Diagnosing Bias vs. Variance
*   Learning Curves
*   Error Analysis & Metrics for Skewed Classes (Precision vs Recall)
</details>

<details open>
<summary><b>4. Advanced Classifiers & Unsupervised Learning (Weeks 7-9)</b></summary>

*   **Support Vector Machines (SVM):** Large Margin Intuition, Kernels
*   **Clustering:** K-Means Algorithm, Random Initialization, Choosing Cluster Count
*   **Dimensionality Reduction (PCA):** Data Compression & Visualization
*   **Anomaly Detection:** Gaussian Distribution, Algorithm Evaluation
*   **Recommender Systems:** Content-Based, Collaborative Filtering, Matrix Factorization
</details>

### Action Items & Verification:
- [ ] Follow the free "Machine Learning" course by Andrew Ng (Coursera).
- [ ] Read the official Scikit-Learn documentation tutorials.
- **Proof of Mastery:** Build an End-to-End model predicting House Prices or Customer Churn. Use Scikit-Learn `Pipeline` and `ColumnTransformer` to handle missing data and categorical encoding.

---

## 🔴 Level 3: Deep Learning & AI
*For Computer Vision, Natural Language Processing, and Complex Patterns.*

### What you need to know:
*   **Frameworks:** PyTorch (Industry Standard) or TensorFlow/Keras.
*   **Neural Networks: Representation & Learning (Andrew Ng - Weeks 4-5)**
    *   Non-linear Hypotheses & Neurons
    *   Forward Propagation & Cost Function
    *   Backpropagation Algorithm & Gradient Checking
    *   Random Initialization
*   **Computer Vision (CV):** Convolutional Neural Networks (CNNs), ResNet, Transfer Learning.
*   **Natural Language Processing (NLP):** Tokenization, Word Embeddings, RNNs/LSTMs, and **Transformers** (Attention mechanism, BERT, GPT basics).

### Action Items & Verification:
- [ ] Take the Fast.ai course "Practical Deep Learning for Coders".
- [ ] Watch Andrej Karpathy's "Neural Networks: Zero to Hero" series on YouTube.
- **Proof of Mastery:** Fine-tune a pre-trained Image Classification model (like ResNet50) to classify images, OR fine-tune a HuggingFace Transformer model for sentiment analysis.

---

## ⚫ Level 4: MLOps & Production Engineering
*The skills that get you hired as a Senior ML Engineer for ₹15L - ₹25L.*

### What you need to know:
*   **Large Scale Machine Learning (Andrew Ng - Week 10)**
    *   Stochastic Gradient Descent & Mini-Batch
    *   Online Learning & Data Parallelism (MapReduce)
*   **Version Control:** Git, GitHub, and DVC (Data Version Control).
*   **Experiment Tracking:** MLflow or Weights & Biases (W&B).
*   **Serving Models:** Building REST APIs using FastAPI or Flask.
*   **Containerization:** Docker (writing a `Dockerfile`, running containers).
*   **CI/CD:** GitHub Actions (automating tests when pushing code).
*   **Monitoring:** Detecting Data Drift in production using Evidently AI.

### Action Items & Verification:
- [ ] Study our very own **[MLOps Reference Project](../mlops-reference-project/README.md)**.
- [ ] Study our **[ML Engineering Reference Project](../ml-engineer-reference-project/README.md)**.
- **Proof of Mastery:** Take the model you built in Level 2 or 3. Track its training with MLflow. Wrap it in a FastAPI endpoint. Write a Dockerfile for it. Push it to GitHub and set up an Action that runs `pytest` on your code.

---

## 🔗 Top Recommended Open Source References
Use these world-class GitHub repositories alongside the roadmap to accelerate your learning:
*   🌟 [fengdu78/Coursera-ML-AndrewNg-Notes](https://github.com/fengdu78/Coursera-ML-AndrewNg-Notes) - Comprehensive translated notes.
*   🌟 [kaleko/CourseraML](https://github.com/kaleko/CourseraML) - Python implementations of assignments.
*   🌟 [Yorko/mlcourse.ai](https://github.com/Yorko/mlcourse.ai) - Incredible open ML course.
*   🌟 [dair-ai/ML-YouTube-Courses](https://github.com/dair-ai/ML-YouTube-Courses) - Curated directory of ML video courses.
*   🌟 [ashishtele/Quick-Notes-for-ML-DS](https://github.com/ashishtele/Quick-Notes-for-ML-DS) - High-quality quick reference notes.
*   🌟 [prathimacode-hub/ML-ProjectKart](https://github.com/prathimacode-hub/ML-ProjectKart) - Massive collection of ML projects.

> **Note on Study Groups:** If studying with the Chinese-speaking community, join ML QQ group: `955171419` *(Do not join multiple groups to leave space for others!)*.

---

## ⏭️ Next Steps

Once you complete **Level 4**, you are fully prepared for ML Engineering interviews. 
*   Review the [ML Concepts Interview Guide](../interview-prep/ML_CONCEPTS_INTERVIEW_GUIDE.md).
*   Practice coding questions in the [DSA for ML Guide](../dsa-guide/DSA_PREPARATION_FOR_ML.md).
*   Apply for jobs!
