"""
=================================================================
 🚀 File: inference.py
 ✨ Purpose: Advanced Machine Learning Operations and Processing
 📅 Last Updated: 2026
=================================================================
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import os
import logging
import uvicorn

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Customer Churn Prediction API",
    description="An API that predicts the probability of a telecom customer churning.",
    version="1.0.0"
)

# Global variable to hold the model pipeline
pipeline = None

class CustomerData(BaseModel):
    """
    Pydantic model to enforce input data validation.
    This is crucial in production to prevent schema drift errors.
    """
    gender: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    tenure: int
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float

@app.on_event("startup")
# ==================================================
# Function Definition
# ==================================================
def load_model():
    """Loads the model when the API server starts up."""
    global pipeline
    model_path = os.path.join(os.path.dirname(__file__), "../models/churn_pipeline.pkl")
    try:
        pipeline = joblib.load(model_path)
        logger.info("Model pipeline loaded successfully.")
    except Exception as e:
        logger.error(f"Failed to load model: {e}")
        # In a real scenario, you might want the app to fail to start if it can't load the model

@app.post("/predict")
# ==================================================
# Function Definition
# ==================================================
def predict_churn(customer: CustomerData):
    """
    Endpoint to predict customer churn probability.
    """
    if pipeline is None:
        raise HTTPException(status_code=503, detail="Model is currently unavailable.")
    
    # Convert the incoming JSON payload into a pandas DataFrame (1 row)
    # The ColumnTransformer in our pipeline expects a DataFrame
    input_data = pd.DataFrame([customer.dict()])
    
    try:
        # We pass the raw data directly into the pipeline! 
        # The pipeline handles missing values, scaling, one-hot encoding, etc. automatically.
        prediction = pipeline.predict(input_data)[0]
        probability = pipeline.predict_proba(input_data)[0][1]
        
        return {
            "churn_prediction": int(prediction),
            "churn_probability": float(probability),
            "risk_status": "High Risk" if probability > 0.6 else "Low Risk"
        }
    except Exception as e:
        logger.error(f"Error during prediction: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during prediction.")

@app.get("/health")
# ==================================================
# Function Definition
# ==================================================
def health_check():
    """Simple health check endpoint."""
    return {"status": "healthy", "model_loaded": pipeline is not None}

if __name__ == "__main__":
    # To run this script locally: `python -m src.inference`
    # Or using uvicorn: `uvicorn src.inference:app --reload`
    uvicorn.run("src.inference:app", host="0.0.0.0", port=8000, reload=True)

# Formatting and minor improvements
