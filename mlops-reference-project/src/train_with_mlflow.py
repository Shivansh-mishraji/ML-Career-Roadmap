"""
=================================================================
 🚀 File: train_with_mlflow.py
 ✨ Purpose: Advanced Machine Learning Operations and Processing
 📅 Last Updated: 2026
=================================================================
"""

import mlflow
import mlflow.sklearn
from sklearn.datasets import load_breast_cancer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ==================================================
# Function Definition
# ==================================================
def train():
    """
    Trains a model and tracks hyperparameters, metrics, and artifacts using MLflow.
    """
    # 1. Connect to MLflow tracking server (locally or remote)
    # If running locally without a server, it creates an 'mlruns' folder.
    mlflow.set_tracking_uri("http://localhost:5000") # Assuming local docker-compose server
    mlflow.set_experiment("Breast_Cancer_Classification")

    # Load sample dataset
    data = load_breast_cancer()
    X_train, X_test, y_train, y_test = train_test_split(data.data, data.target, test_size=0.2, random_state=42)

    # Define Hyperparameters
    n_estimators = 100
    max_depth = 5

    # 2. Start an MLflow Run
    with mlflow.start_run(run_name="RandomForest_Run"):
        logger.info(f"Training with n_estimators={n_estimators}, max_depth={max_depth}")
        
        # Log Hyperparameters
        mlflow.log_param("n_estimators", n_estimators)
        mlflow.log_param("max_depth", max_depth)

        # Train model
        model = RandomForestClassifier(n_estimators=n_estimators, max_depth=max_depth, random_state=42)
        model.fit(X_train, y_train)

        # Evaluate model
        predictions = model.predict(X_test)
        accuracy = accuracy_score(y_test, predictions)
        precision = precision_score(y_test, predictions)

        logger.info(f"Accuracy: {accuracy:.4f}")
        
        # Log Metrics
        mlflow.log_metric("accuracy", accuracy)
        mlflow.log_metric("precision", precision)

        # 3. Log the Model to MLflow Model Registry
        # This saves the model as an artifact, and optionally registers it for serving
        mlflow.sklearn.log_model(
            sk_model=model,
            artifact_path="random_forest_model",
            registered_model_name="BreastCancerClassifier"
        )
        logger.info("Model successfully tracked in MLflow!")

if __name__ == "__main__":
    try:
        train()
    except Exception as e:
        logger.error(f"Failed to connect to MLflow or train: {e}. Is MLflow running?")
