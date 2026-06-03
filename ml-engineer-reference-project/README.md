<div align="center">

# ⚙️ ML Engineer Reference Project
### *Customer Churn Prediction Pipeline*

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)

**A Blueprint for Production-Ready Machine Learning**

</div>

## 🎯 **Why Does This Project Exist?**

Most ML beginners write all their code in a single, massive Jupyter Notebook (`.ipynb`). They load data, clean it, train a model, and print accuracy. 

**This is NOT how Machine Learning works in the real world.**

In industry, Machine Learning Engineers build **Pipelines**. We need code that is reproducible, scalable, deployable, and free from data leakage. 

This project serves as a **Reference Architecture** for students to understand how a Senior ML Engineer structures a classic tabular project (Customer Churn) for production.

---

## 📂 **Project Architecture**

```text
ml-engineer-reference-project/
│
├── data/
│   └── raw/                       # Raw data downloaded via script
├── models/                        # Saved joblib/pickle pipeline artifacts
├── notebooks/                     
│   └── 01_exploratory_data_analysis.ipynb  # EDA only! No production code here.
├── src/                           # The core Python package
│   ├── __init__.py
│   ├── data_ingestion.py          # Script to fetch/generate data
│   ├── preprocessing.py           # Scikit-Learn Pipelines & Custom Transformers
│   ├── train.py                   # Connects data -> pipeline -> model -> save
│   ├── evaluate.py                # Loads model and evaluates on test set
│   └── inference.py               # FastAPI script to serve the model
├── requirements.txt
└── README.md                      # You are here
```

---

## 💡 **How to Run This Project**

Open your terminal in this directory and follow these steps:

1. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Ingest Data:**
   *(In a real project, this might hit an API or SQL database. Here it generates synthetic data).*
   ```bash
   python -m src.data_ingestion
   ```

3. **Train the Model & Build Pipeline:**
   *(This saves the robust pipeline artifact to `models/churn_pipeline.pkl`)*
   ```bash
   python -m src.train
   ```

4. **Evaluate the Model:**
   ```bash
   python -m src.evaluate
   ```

5. **Deploy as an API (Inference):**
   ```bash
   uvicorn src.inference:app --reload
   ```
   *Now go to `http://127.0.0.1:8000/docs` in your browser to test the API!*

---

## 🎤 **Interview Guide: Why We Did It This Way**

If you use this architecture for your portfolio projects, interviewers will be highly impressed. Here is how to explain your choices:

### 1. "Why didn't you just use a Jupyter Notebook?"
> "Notebooks are great for EDA, but they are hard to version control (Git), hard to test, and encourage out-of-order execution. I moved my production logic into modular Python scripts in the `src/` directory to make it maintainable and deployable."

### 2. "Why did you use `ColumnTransformer` and Scikit-Learn `Pipeline`?"
> "To prevent **Data Leakage**. If I use `fit_transform` on the whole dataset before splitting, the mean/variance of the test set leaks into the training set. By using a Pipeline, the scalers and imputers only `fit` on the training data. Furthermore, deploying is easier because I just save one `.pkl` file that handles both preprocessing and prediction."

### 3. "How do you handle API inference?"
> "I built a FastAPI endpoint (`src/inference.py`). It uses Pydantic to validate the incoming JSON schema so the API doesn't crash on bad data. The endpoint simply converts the JSON to a DataFrame and passes it into the saved Pipeline, which automatically applies the exact same transformations used during training."

---

## 🔗 **Open Source Reference Projects for Inspiration**

Want to see how companies and top engineers build large-scale ML systems? Study these open-source repositories to level up your MLOps and System Design skills:

### **1. End-to-End MLOps & Pipelines**
*   **[GCP MLOps Architecture](https://github.com/GoogleCloudPlatform/mlops-with-vertex-ai)**: Google's official reference for building MLOps pipelines.
*   **[Made With ML (by Goku Mohandas)](https://github.com/GokuMohandas/Made-With-ML)**: One of the best end-to-end tutorials on GitHub covering everything from coding to deploying an ML application with best practices.
*   **[ZenML - Open Source MLOps Framework](https://github.com/zenml-io/zenml)**: Look at their `examples/` directory to see how real-world ML pipelines are orchestrated.

### **2. Deployment & Serving (Docker/FastAPI)**
*   **[BentoML](https://github.com/bentoml/BentoML)**: An amazing open-source framework for model serving. Look at their examples to see how models are containerized.
*   **[Cortex (Now deprecated, but great code reference)](https://github.com/cortexlabs/cortex)**: Good reference for deploying ML models on Kubernetes.
*   **[FastAPI ML Deployment Example](https://github.com/tiangolo/fastapi-machine-learning)**: A simple template by the creator of FastAPI showing how to serve ML models.

### **3. Large Scale Open Source AI Projects**
*   **[Hugging Face Transformers](https://github.com/huggingface/transformers)**: Read their source code to understand how world-class ML libraries are structured.
*   **[Ray (by Anyscale)](https://github.com/ray-project/ray)**: The industry standard for scaling ML workloads. Check their `doc/source/serve/` examples for model serving at scale.

> **💡 Senior Engineer Advice:** *Don't just copy code. Read the source code of these repositories. Look at how they handle errors, how they write unit tests, and how they configure their Dockerfiles.*
