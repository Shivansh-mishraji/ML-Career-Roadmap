import os
import pandas as pd
import joblib
from sklearn.metrics import classification_report, roc_auc_score, confusion_matrix
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def evaluate_model(data_path: str, model_path: str):
    """
    Evaluates the saved pipeline on a holdout set (for demonstration, using the full set, 
    but in reality this would be a separate validation/test set).
    """
    logger.info(f"Loading data from {data_path}")
    df = pd.read_csv(data_path)
    
    TARGET = 'Churn'
    X = df.drop(columns=[TARGET, 'customerID'])
    y = df[TARGET].map({'Yes': 1, 'No': 0})
    
    logger.info(f"Loading model pipeline from {model_path}")
    pipeline = joblib.load(model_path)
    
    logger.info("Generating predictions...")
    y_pred = pipeline.predict(X)
    y_proba = pipeline.predict_proba(X)[:, 1]
    
    logger.info("\n" + "="*40 + "\nMODEL EVALUATION REPORT\n" + "="*40)
    
    logger.info("\nClassification Report:\n" + classification_report(y, y_pred))
    
    roc_auc = roc_auc_score(y, y_proba)
    logger.info(f"ROC AUC Score: {roc_auc:.4f}")
    
    cm = confusion_matrix(y, y_pred)
    logger.info(f"Confusion Matrix:\n{cm}")
    logger.info("="*40)

if __name__ == "__main__":
    data_file = os.path.join(os.path.dirname(__file__), "../data/raw/churn_data.csv")
    model_file = os.path.join(os.path.dirname(__file__), "../models/churn_pipeline.pkl")
    
    if not os.path.exists(model_file):
        logger.error("Model file not found. Please run train.py first.")
    else:
        evaluate_model(data_file, model_file)

# Formatting and minor improvements
