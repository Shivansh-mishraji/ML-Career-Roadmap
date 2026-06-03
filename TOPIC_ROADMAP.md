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
*   **Linear Algebra:** Vectors, Matrices, Dot Products, Matrix Multiplication.
*   **Calculus Basics:** Derivatives, Gradients (understanding *why* things optimize, no need to solve complex equations by hand).
*   **Probability:** Mean, Median, Variance, Standard Deviation, Normal Distribution.

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
*   **SQL Basics:** SELECT, JOIN, GROUP BY, WHERE (to extract data from databases).

### Action Items & Verification:
- [ ] Complete Kaggle's free "Pandas" and "Data Visualization" micro-courses.
- **Proof of Mastery:** Download the "Titanic" dataset from Kaggle. Perform Exploratory Data Analysis (EDA) in a Jupyter Notebook. Create 5 distinct charts that explain which demographics were most likely to survive.

---

## 🟠 Level 2: Classical Machine Learning
*The core algorithms. Do not jump to Deep Learning before mastering these.*

### What you need to know:
*   **Supervised Learning (Regression):** Linear Regression, Ridge, Lasso.
*   **Supervised Learning (Classification):** Logistic Regression, Decision Trees, Random Forests, XGBoost.
*   **Unsupervised Learning:** K-Means Clustering, PCA (Dimensionality Reduction).
*   **Evaluation Metrics:** Accuracy, Precision, Recall, F1-Score, ROC-AUC, RMSE, MAE.
*   **Model Validation:** Train/Test splits, K-Fold Cross Validation, preventing Overfitting.

### Action Items & Verification:
- [ ] Follow the free "Machine Learning" course by Andrew Ng (Coursera).
- [ ] For a **granular, step-by-step checklist** of what to study in this level (including the exact 19-chapter syllabus and top GitHub references), read the **[Detailed Classical ML Syllabus](./learning-resources/CLASSICAL_ML_SYLLABUS.md)**.
- [ ] Read the official Scikit-Learn documentation tutorials.
- **Proof of Mastery:** Build a complete End-to-End model predicting House Prices or Customer Churn. It must use Scikit-Learn `Pipeline` and `ColumnTransformer` to handle missing data and categorical encoding.

---

## 🔴 Level 3: Deep Learning & AI
*For Computer Vision, Natural Language Processing, and Complex Patterns.*

### What you need to know:
*   **Frameworks:** PyTorch (Industry Standard) or TensorFlow/Keras.
*   **Neural Network Basics:** Perceptrons, Activation Functions (ReLU, Sigmoid), Backpropagation, Gradient Descent, Loss Functions.
*   **Computer Vision (CV):** Convolutional Neural Networks (CNNs), ResNet, Transfer Learning.
*   **Natural Language Processing (NLP):** Tokenization, Word Embeddings, RNNs/LSTMs, and **Transformers** (Attention mechanism, BERT, GPT basics).

### Action Items & Verification:
- [ ] Take the Fast.ai course "Practical Deep Learning for Coders".
- [ ] Watch Andrej Karpathy's "Neural Networks: Zero to Hero" series on YouTube.
- **Proof of Mastery:** Fine-tune a pre-trained Image Classification model (like ResNet50) to classify images of dogs vs. cats, OR fine-tune a HuggingFace Transformer model to perform sentiment analysis on movie reviews.

---

## ⚫ Level 4: MLOps & Production Engineering
*The skills that get you hired as a Senior ML Engineer for ₹15L - ₹25L.*

### What you need to know:
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

## ⏭️ Next Steps

Once you complete **Level 4**, you are fully prepared for ML Engineering interviews. 
*   Review the [ML Concepts Interview Guide](../interview-prep/ML_CONCEPTS_INTERVIEW_GUIDE.md).
*   Practice coding questions in the [DSA for ML Guide](../dsa-guide/DSA_PREPARATION_FOR_ML.md).
*   Apply for jobs!
