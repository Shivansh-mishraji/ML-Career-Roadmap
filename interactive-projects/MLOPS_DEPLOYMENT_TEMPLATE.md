🚀 # ⚙️ Interactive Template: Deploying an ML Model (FastAPI + Docker)

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


Building a model in a Jupyter Notebook is data science. Serving that model as an API in a Docker container is **ML Engineering**. This project bridges that massive gap and is highly valued by employers.

✨ ## 🎯 The Goal
Take a trained Scikit-Learn model, wrap it in a REST API using FastAPI, and containerize the whole application using Docker so it can be deployed anywhere (AWS, GCP, Render).

---

✨ ## 🛠️ Prerequisites

```bash
pip install fastapi uvicorn scikit-learn pandas pydantic
```
*You must also install [Docker Desktop](https://www.docker.com/products/docker-desktop/) on your machine.*

---

✨ ## 💻 Step-by-Step Code Walkthrough

🔍 ### 1. Project Structure
```text
ml-deployment/
├── model/
│   └── trained_model.pkl    # Your saved Scikit-Learn model
├── app.py                   # The FastAPI application
├── Dockerfile               # Instructions to build the container
└── requirements.txt         # Project dependencies
```

🔍 ### 2. The Model (Pre-requisite)
Assume you already trained a model (e.g., a Churn predictor) and saved it using `joblib` or `pickle`.
```python
import joblib
🚀 # ... training code ...
joblib.dump(clf, 'model/trained_model.pkl')
```

🔍 ### 3. The API (`app.py`)
This is how we expose the model to the internet.

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd

🚀 # 1. Initialize the FastAPI app
app = FastAPI(title="Customer Churn Prediction API", version="1.0")

🚀 # 2. Load the trained model (done once at startup)
🚀 # In a real production system, you might load this from an S3 bucket
try:
    model = joblib.load("model/trained_model.pkl")
except Exception as e:
    model = None
    print(f"Error loading model: {e}")

🚀 # 3. Define the Input Data Schema using Pydantic
🚀 # This ensures the API only accepts the correct data types.
class CustomerData(BaseModel):
    tenure: int
    MonthlyCharges: float
    Contract_Type: int # e.g., 0 for Month-to-Month, 1 for One Year

🚀 # 4. Define the Prediction Endpoint
@app.post("/predict")
def predict_churn(data: CustomerData):
    if model is None:
        raise HTTPException(status_code=500, detail="Model is not loaded.")
    
    # Convert incoming JSON data into a format the model expects (DataFrame)
    input_df = pd.DataFrame([data.dict()])
    
    # Make prediction
    prediction = model.predict(input_df)
    probability = model.predict_proba(input_df)[0][1] # Probability of class 1 (Churn)
    
    # Return JSON response
    return {
        "churn_prediction": int(prediction[0]),
        "churn_probability": float(probability),
        "status": "success"
    }

🚀 # 5. Define a Health Check Endpoint (Standard practice for MLOps)
@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": model is not None}
```

🔍 ### 4. Containerizing (`Dockerfile`)
A Dockerfile tells Docker exactly how to build an isolated environment for your app.

Create a file named exactly `Dockerfile` (no extension):

```dockerfile
🚀 # 1. Start from an official lightweight Python image
FROM python:3.9-slim

🚀 # 2. Set the working directory inside the container
WORKDIR /app

🚀 # 3. Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

🚀 # 4. Copy the rest of the application code
COPY . .

🚀 # 5. Expose the port FastAPI runs on
EXPOSE 8000

🚀 # 6. Command to run the application using Uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

Create a `requirements.txt`:
```text
fastapi==0.104.1
uvicorn==0.24.0.post1
scikit-learn==1.3.2
pandas==2.1.3
pydantic==2.5.2
joblib==1.3.2
```

---

✨ ## 🚀 How to Run It

🔍 ### Option A: Run Locally (Without Docker)
Great for testing while developing.
```bash
uvicorn app:app --reload
```
Go to `http://localhost:8000/docs` in your browser. FastAPI automatically generates a beautiful interactive UI (Swagger) where you can test your endpoint!

🔍 ### Option B: Run via Docker (The MLOps Way)
1. **Build the image** (this takes a minute):
   ```bash
   docker build -t churn-api .
   ```
2. **Run the container**:
   ```bash
   docker run -p 8000:8000 churn-api
   ```
You now have a production-ready containerized ML API running on your machine. You can push this image to a cloud provider, and it will run exactly the same way.

---

✨ ## 🧠 Interview Talking Points

**Say this in an interview:**
> "I realized that training a model is only half the battle, so I focused on the deployment pipeline. I wrapped my Scikit-Learn model in a FastAPI REST interface, utilizing Pydantic for strict input validation to prevent data drift errors at inference time. Finally, I containerized the service using Docker, ensuring that the environment is reproducible and ready for orchestration via Kubernetes or deployment to a service like AWS ECS."

<!-- Formatting improvements -->


---
*🎯 **Pro Tip**: Consistency is key in Machine Learning. Keep building and exploring!*