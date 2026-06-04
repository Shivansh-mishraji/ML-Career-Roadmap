"""
=================================================================
 🚀 File: preprocessing.py
 ✨ Purpose: Advanced Machine Learning Operations and Processing
 📅 Last Updated: 2026
=================================================================
"""

import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
import logging

logger = logging.getLogger(__name__)

class FeatureEngineer(BaseEstimator, TransformerMixin):
    """
    Custom transformer to engineer new features.
    Custom transformers in Scikit-Learn pipelines are extremely powerful because 
    they guarantee that transformations are applied consistently during training and inference.
    """
    # ==================================================
# Function Definition
# ==================================================
def __init__(self):
        pass

    # ==================================================
# Function Definition
# ==================================================
def fit(self, X, y=None):
        return self

    # ==================================================
# Function Definition
# ==================================================
def transform(self, X):
        X_copy = X.copy()
        
        # Example feature engineering: Create a feature that flags new customers
        if 'tenure' in X_copy.columns:
            X_copy['IsNewCustomer'] = (X_copy['tenure'] <= 12).astype(int)
            
        # Example feature engineering: Charges per tenure
        if 'TotalCharges' in X_copy.columns and 'tenure' in X_copy.columns:
            # Avoid division by zero
            X_copy['AvgMonthlyCharge'] = X_copy['TotalCharges'] / (X_copy['tenure'] + 1)
            
        return X_copy

# ==================================================
# Function Definition
# ==================================================
def get_data_preprocessor(numeric_features, categorical_features) -> ColumnTransformer:
    """
    Returns a Scikit-Learn ColumnTransformer pipeline.
    
    Why use a ColumnTransformer?
    1. Prevents Data Leakage (imputers fit only on training data).
    2. Makes deployment easy (one artifact handles all transformations).
    3. Handles different data types modularly.
    """
    logger.info("Building data preprocessor pipeline...")
    
    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')), # Handle missing values
        ('scaler', StandardScaler())                   # Standardize numerical features
    ])

    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
        ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False)) # handle_unknown='ignore' is crucial for production
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('cat', categorical_transformer, categorical_features)
        ],
        remainder='drop' # Drop columns not explicitly specified
    )

    return preprocessor

# ==================================================
# Function Definition
# ==================================================
def get_full_pipeline(numeric_features, categorical_features, model):
    """
    Combines feature engineering, preprocessing, and the model into a single pipeline.
    """
    preprocessor = get_data_preprocessor(numeric_features, categorical_features)
    
    pipeline = Pipeline(steps=[
        ('feature_engineer', FeatureEngineer()),
        ('preprocessor', preprocessor),
        ('model', model)
    ])
    
    return pipeline

# Formatting and minor improvements
