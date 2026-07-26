<div align="center">

> [!NOTE]
> **MLOps Pipeline Architecture**

```mermaid
graph LR
    A[Data Ingestion] --> B[Data Preprocessing]
    B --> C[Model Training]
    C --> D[Model Evaluation]
    D --> E[Model Registry]
    E --> F[Model Deployment]
    F --> G[Monitoring & Logging]
```


🚀 # 🚀 MLOps Reference Architecture
🔍 ### *From Git Commits to Kubernetes Deployments*

![MLflow](https://img.shields.io/badge/mlflow-%23d9ead3.svg?style=for-the-badge&logo=mlflow&logoColor=blue)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)

**A Blueprint for Deploying, Automating, and Monitoring Machine Learning Models**

</div>

✨ ## 🎯 **Why Does This Project Exist?**

Data Scientists build models. **Machine Learning Engineers put them into production.** 

If you want a high-paying ML Engineering role, you must understand **MLOps (Machine Learning Operations)**. This repository is a skeleton reference showing exactly how a Senior ML Engineer structures a project for automated training, deployment, and monitoring.

---

✨ ## 🏗️ **The Architecture Explained (Basic to Advanced)**

🔍 ### **Level 1 (Basic): Tracking Experiments & Data**
When working on ML, you run hundreds of experiments (changing `max_depth`, `learning_rate`, etc.). Without tracking, you will forget which parameters gave the best accuracy.

*   **Tool Used:** **[MLflow](https://mlflow.org/)** (`src/train_with_mlflow.py`)
*   **What it does:** It automatically logs your hyperparameters, metrics (Accuracy, ROC), and saves the actual `.pkl` model file into a Model Registry.
*   **Data Versioning:** We use **[DVC](https://dvc.org/)** (`data/`). Git is terrible at handling large files (like 50GB CSVs). DVC tracks the data changes while saving the actual files in S3/GCP buckets.

🔍 ### **Level 2 (Intermediate): Containerization & Serving**
You trained a great model. Now what? You can't just email a `.pkl` file to the frontend team.

*   **Tool Used:** **FastAPI + Docker** (`src/serve_model.py`, `Dockerfile`, `docker-compose.yml`)
*   **What it does:** We wrap the model in a REST API using FastAPI. Then, we put that API inside a Docker container. Docker guarantees that if the API runs on your laptop, it will run exactly the same way on AWS/GCP without "dependency hell".
*   *Notice in `serve_model.py` we load the model directly from the MLflow Registry, meaning we don't even need to commit `.pkl` files to Git!*

🔍 ### **Level 3 (Advanced): CI/CD & Monitoring**
How do we update the model automatically when new data arrives? How do we know if the model is failing in production?

*   **Tool Used (CI/CD):** **GitHub Actions** (`.github/workflows/ml-ci-cd.yml`)
*   **What it does:** Every time you push code, GitHub automatically runs unit tests (Pytest) and checks code quality (Flake8). If it passes, it builds a new Docker image and pushes it to DockerHub.
*   **Tool Used (Monitoring):** **Evidently AI** (`monitoring/drift_detection.py`)
*   **What it does:** Models degrade over time (Data Drift). For example, a model trained on 2019 housing prices will fail in 2024. Evidently AI compares production data against training data and generates a dashboard alerting you if the data has shifted.

---

✨ ## 💻 **How to Run This Locally**

You can spin up this entire MLOps environment on your machine using Docker Compose.

1. **Install Docker** (if you haven't already).
2. **Spin up the stack:**
   ```bash
   docker-compose up --build
   ```
   *This starts the MLflow tracking server and the FastAPI model server.*
3. **Train and Track:**
   Open a new terminal and run:
   ```bash
   pip install -r requirements.txt
   python -m src.train_with_mlflow
   ```
4. **View MLflow UI:**
   Open `http://localhost:5000` in your browser. You will see your experiments, metrics, and registered models!
5. **Check for Data Drift:**
   ```bash
   python -m monitoring.drift_detection
   ```
   *This will generate a `drift_report.html` file in your root folder. Open it in Chrome to see the monitoring dashboard!*

---

✨ ## 🎤 **Interview Guide: MLOps Questions**

Study this project to nail these common ML Engineering interview questions:

**1. "How do you handle deploying updated models without downtime?"**
> "I use a Model Registry like MLflow. The API (FastAPI) is programmed to fetch the model tagged 'Production' on startup or via polling. When a new model is trained and vetted, I promote it to 'Production' in MLflow, and the API gracefully reloads the new artifact."

**2. "How do you test Machine Learning code in CI/CD?"**
> "I use GitHub Actions. Normal software tests logic, but for ML, we must also test data. I write unit tests to ensure the incoming data schema matches what the model expects, and I run tests to ensure the model's output doesn't drop below a baseline metric."

**3. "What happens if the model's performance degrades in production?"**
> "I implement Data Drift monitoring using tools like Evidently AI. If the statistical distribution of incoming live data diverges significantly from the training data, an alert is triggered in Grafana/Slack, prompting us to retrain the model on fresh data."


---
*🎯 **Pro Tip**: Consistency is key in Machine Learning. Keep building and exploring!* 
---

_Last updated: July 26, 2026_
