"""
=================================================================
 🚀 File: data_ingestion.py
 ✨ Purpose: Advanced Machine Learning Operations and Processing
 📅 Last Updated: 2026
=================================================================
"""

import os
import pandas as pd
import numpy as np
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ==================================================
# Function Definition
# ==================================================
def generate_mock_churn_data(n_samples: int = 5000) -> pd.DataFrame:
    """
    Generates a synthetic Telecom Customer Churn dataset for reference purposes.
    In a real project, this script would connect to a SQL database or download from an S3 bucket.
    """
    np.random.seed(42)
    
    data = {
        'customerID': [f'CUST_{i:04d}' for i in range(n_samples)],
        'gender': np.random.choice(['Male', 'Female'], n_samples),
        'SeniorCitizen': np.random.choice([0, 1], n_samples, p=[0.85, 0.15]),
        'Partner': np.random.choice(['Yes', 'No'], n_samples),
        'Dependents': np.random.choice(['Yes', 'No'], n_samples),
        'tenure': np.random.randint(0, 73, n_samples),
        'PhoneService': np.random.choice(['Yes', 'No'], n_samples, p=[0.9, 0.1]),
        'MultipleLines': np.random.choice(['No phone service', 'No', 'Yes'], n_samples),
        'InternetService': np.random.choice(['DSL', 'Fiber optic', 'No'], n_samples, p=[0.35, 0.45, 0.20]),
        'OnlineSecurity': np.random.choice(['No', 'Yes', 'No internet service'], n_samples),
        'OnlineBackup': np.random.choice(['No', 'Yes', 'No internet service'], n_samples),
        'DeviceProtection': np.random.choice(['No', 'Yes', 'No internet service'], n_samples),
        'TechSupport': np.random.choice(['No', 'Yes', 'No internet service'], n_samples),
        'Contract': np.random.choice(['Month-to-month', 'One year', 'Two year'], n_samples, p=[0.55, 0.2, 0.25]),
        'PaperlessBilling': np.random.choice(['Yes', 'No'], n_samples),
        'PaymentMethod': np.random.choice(['Electronic check', 'Mailed check', 'Bank transfer (automatic)', 'Credit card (automatic)'], n_samples),
        'MonthlyCharges': np.random.uniform(18.0, 120.0, n_samples),
    }
    
    # Introduce some logic for TotalCharges and Churn
    df = pd.DataFrame(data)
    df['TotalCharges'] = df['tenure'] * df['MonthlyCharges'] + np.random.normal(0, 50, n_samples)
    df['TotalCharges'] = df['TotalCharges'].clip(lower=0) # No negative charges
    
    # Create logic for Churn based on tenure, contract, and monthly charges
    churn_prob = np.zeros(n_samples)
    churn_prob += np.where(df['Contract'] == 'Month-to-month', 0.4, 0.05)
    churn_prob += np.where(df['tenure'] < 12, 0.3, 0.0)
    churn_prob += np.where(df['MonthlyCharges'] > 80, 0.2, 0.0)
    churn_prob += np.where(df['InternetService'] == 'Fiber optic', 0.1, 0.0)
    
    # Normalize probabilities to be between 0 and 1
    churn_prob = churn_prob / churn_prob.max()
    
    # Add some random noise
    churn_prob = np.clip(churn_prob + np.random.normal(0, 0.1, n_samples), 0, 1)
    
    df['Churn'] = (churn_prob > 0.6).astype(int).map({1: 'Yes', 0: 'No'})
    
    return df

# ==================================================
# Function Definition
# ==================================================
def ingest_data(output_dir: str = "data/raw"):
    """
    Ingests data and saves it to the specified raw directory.
    """
    logger.info("Starting data ingestion process...")
    
    # Ensure directory exists
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    file_path = os.path.join(output_dir, "churn_data.csv")
    
    # Generate and save data
    df = generate_mock_churn_data()
    df.to_csv(file_path, index=False)
    
    logger.info(f"Successfully ingested {len(df)} records.")
    logger.info(f"Data saved to {file_path}")

if __name__ == "__main__":
    # If we run this script directly, it will ingest the data
    ingest_data(output_dir=os.path.join(os.path.dirname(__file__), "../data/raw"))

# Formatting and minor improvements
 