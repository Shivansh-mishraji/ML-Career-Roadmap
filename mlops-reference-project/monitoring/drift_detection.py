"""
=================================================================
 🚀 File: drift_detection.py
 ✨ Purpose: Advanced Machine Learning Operations and Processing
 📅 Last Updated: 2026
=================================================================
"""

import pandas as pd
import numpy as np
from sklearn.datasets import load_breast_cancer
from evidently.report import Report
from evidently.metric_preset import DataDriftPreset
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ==================================================
# Function Definition
# ==================================================
def generate_drift_report():
    """
    Simulates checking for Data Drift in production using Evidently AI.
    """
    logger.info("Loading reference and current data...")
    
    # 1. Load Reference Data (e.g., from training)
    data = load_breast_cancer(as_frame=True)
    reference_df = data.frame
    
    # 2. Simulate "Current" Production Data (with artificial drift)
    # We multiply some features by a random factor to simulate distribution drift over time
    current_df = reference_df.copy()
    current_df['mean radius'] = current_df['mean radius'] * np.random.uniform(1.2, 1.5, size=len(current_df))
    current_df['mean texture'] = current_df['mean texture'] * np.random.uniform(0.5, 0.8, size=len(current_df))

    # 3. Create Evidently Report
    logger.info("Generating Data Drift Report...")
    drift_report = Report(metrics=[DataDriftPreset()])
    
    # Run the report
    drift_report.run(reference_data=reference_df, current_data=current_df)
    
    # 4. Save the HTML report
    output_path = "drift_report.html"
    drift_report.save_html(output_path)
    
    logger.info(f"Drift Report successfully generated and saved to '{output_path}'.")
    logger.info("In a real MLOps pipeline, if drift is detected, we trigger an alert or retrain pipeline!")

if __name__ == "__main__":
    generate_drift_report()
 