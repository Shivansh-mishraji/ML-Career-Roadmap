from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mlflow.pyfunc
import logging
import uvicorn
import numpy as np

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="MLOps Model Serving API")

# Global model variable
model = None

class PredictionRequest(BaseModel):
    """Schema for incoming prediction data"""
    features: list[float]

@app.on_event("startup")
def load_model():
    """
    Loads the latest production model directly from MLflow Model Registry.
    This enables seamless model updates without code changes!
    """
    global model
    try:
        # Connect to MLflow server
        mlflow.set_tracking_uri("http://localhost:5000")
        
        # Load the latest 'Production' version of the registered model
        # In a real environment, you'd specify the stage (Production/Staging)
        model_name = "BreastCancerClassifier"
        model_uri = f"models:/{model_name}/latest"
        
        logger.info(f"Attempting to load model from: {model_uri}")
        model = mlflow.pyfunc.load_model(model_uri)
        logger.info("Successfully loaded model from MLflow Registry!")
    except Exception as e:
        logger.warning(f"Failed to load model from MLflow: {e}. (Is MLflow running?)")
        # In a real scenario, this might crash the pod, but for reference, we just log a warning

@app.post("/predict")
def predict(request: PredictionRequest):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Check MLflow server.")
    
    try:
        # MLflow pyfunc expects pandas DataFrame or numpy arrays
        data = np.array([request.features])
        prediction = model.predict(data)
        
        return {
            "prediction": int(prediction[0])
        }
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        raise HTTPException(status_code=400, detail="Error during prediction. Check feature count.")

@app.get("/health")
def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("src.serve_model:app", host="0.0.0.0", port=8000)
