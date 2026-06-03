# 30-Day ML/AI Learning Schedule with Resources

**Target:** High-paying ML roles (₹15L+)  
**Daily Commitment:** 4.5-5 hours  
**Total Hours:** ~140 hours

---

## **WEEK 1: Python Data Science Stack Foundation** (Days 1-7)

### **Day 1: NumPy Fundamentals**

**Morning (2h): Learning**
- Watch: [NumPy Tutorial for Data Science](https://www.youtube.com/watch?v=QUT1VHiUKKQ) (Real Python)
- Read: [NumPy Documentation - Arrays](https://numpy.org/doc/stable/reference/arrays.html)
- Focus: Arrays, shapes, indexing, slicing, operations

**Afternoon (3h): Hands-On Coding**
```python
# Create from scratch (NO COPY-PASTE):
# 1. Create arrays with different methods
# 2. Practice indexing and slicing
# 3. Perform vectorized operations
# 4. Create functions for common operations
```

**Resources:**
- Real Python: https://realpython.com/numpy-tutorial/
- NumPy Docs: https://numpy.org/
- Interactive: DataCamp NumPy Basics (free tier)

**GitHub Commit:** `day-01-numpy-fundamentals.ipynb`

---

### **Day 2: Pandas Basics + Titanic EDA Start**

**Morning (2h): Learning**
- Watch: [Pandas in 10 Minutes](https://www.youtube.com/watch?v=DyIVIx5tnRM) (Corey Schafer)
- Read: [Pandas Documentation - Getting Started](https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_what_is_pandas.html)
- Focus: DataFrames, read_csv, head, info, describe, basic filtering

**Afternoon (5h): Build Titanic EDA**
```python
# Step 1: Load Titanic dataset
import pandas as pd
df = pd.read_csv('titanic.csv')

# Step 2: Initial exploration
print(df.head())
print(df.info())
print(df.describe())
print(df.isnull().sum())

# Step 3: Start visualizations (next day)
```

**Dataset:** https://www.kaggle.com/datasets/titanic

**Resources:**
- Pandas Official Tutorial: https://pandas.pydata.org/docs/
- DataCamp Pandas Intro (free)
- Real Python Pandas: https://realpython.com/learning-paths/data-science-python/

**GitHub Commit:** `day-02-titanic-eda-start.ipynb`

---

### **Day 3: Data Cleaning & Preprocessing**

**Morning (2h): Learning**
- Video: [Data Cleaning with Pandas](https://www.youtube.com/watch?v=iDxpSQoXcSo)
- Focus: Missing values, duplicates, data types, normalization

**Afternoon (5h): Clean Titanic Dataset**
```python
# 1. Handle missing values
df['Age'].fillna(df['Age'].median(), inplace=True)
df['Embarked'].fillna(df['Embarked'].mode()[0], inplace=True)

# 2. Remove duplicates
df = df.drop_duplicates()

# 3. Outlier detection (IQR method)
Q1 = df['Fare'].quantile(0.25)
Q3 = df['Fare'].quantile(0.75)
IQR = Q3 - Q1
outliers = df[(df['Fare'] < Q1 - 1.5*IQR) | (df['Fare'] > Q3 + 1.5*IQR)]

# 4. Feature encoding
df['Sex'] = df['Sex'].map({'male': 1, 'female': 0})
```

**Resources:**
- Kaggle: "Data Cleaning Techniques" notebook
- Real Python: https://realpython.com/python-data-cleaning/

**GitHub Commit:** `day-03-data-cleaning.ipynb`

---

### **Day 4: Data Visualization Masterclass**

**Morning (2h): Learning**
- Video: [Complete Matplotlib/Seaborn Tutorial](https://www.youtube.com/watch?v=Ercd-Ss7sIE)
- Focus: Line, bar, scatter, histogram, heatmap, box plots

**Afternoon (5h): Create 10+ Visualizations**
```python
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Distribution plots
plt.hist(df['Age'], bins=30)
sns.kdeplot(data=df, x='Fare')

# 2. Categorical relationships
sns.barplot(data=df, x='Sex', y='Survived')

# 3. Correlations
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')

# 4. Pair plots for relationships
sns.pairplot(df[['Age', 'Fare', 'Survived']])
```

**Resources:**
- Matplotlib Docs: https://matplotlib.org/
- Seaborn Tutorial: https://seaborn.pydata.org/tutorial.html
- Real Python: https://realpython.com/python-matplotlib-guide/

**GitHub Commit:** `day-04-visualizations.ipynb`

---

### **Day 5: Statistical Analysis**

**Morning (2h): Learning**
- Video: [Statistics for Data Science](https://www.youtube.com/watch?v=xxpc-SQ5BIw)
- Focus: Mean, median, std dev, distributions, correlations, hypothesis testing

**Afternoon (4h): Apply to Titanic**
```python
# 1. Descriptive statistics
print(df['Age'].describe())
print(df['Fare'].skew(), df['Fare'].kurtosis())

# 2. Correlations
df[['Age', 'Fare', 'Survived']].corr()

# 3. T-tests (does age differ by survival?)
from scipy import stats
age_survived = df[df['Survived']==1]['Age']
age_died = df[df['Survived']==0]['Age']
t_stat, p_value = stats.ttest_ind(age_survived, age_died)
print(f"T-stat: {t_stat}, P-value: {p_value}")

# 4. Chi-square test (categorical independence)
from scipy.stats import chi2_contingency
contingency = pd.crosstab(df['Sex'], df['Survived'])
chi2, p, dof, expected = chi2_contingency(contingency)
```

**Resources:**
- Real Python: https://realpython.com/statistics-python/
- SciPy Docs: https://docs.scipy.org/

**GitHub Commit:** `day-05-statistical-analysis.ipynb`

---

### **Day 6: Feature Engineering**

**Morning (2h): Learning**
- Video: [Feature Engineering for ML](https://www.youtube.com/watch?v=wFGEWHaXjHE)
- Focus: Creating new features, domain knowledge application

**Afternoon (4h): Engineer Features**
```python
# 1. Extract from existing features
df['Title'] = df['Name'].str.extract(' ([A-Za-z]+)\.')[0]
df['Family_size'] = df['SibSp'] + df['Parch'] + 1
df['Is_alone'] = (df['Family_size'] == 1).astype(int)

# 2. Binning continuous variables
df['Age_group'] = pd.cut(df['Age'], bins=[0, 12, 18, 35, 60, 100], 
                          labels=['Child', 'Teen', 'Adult', 'Middle', 'Senior'])

# 3. Polynomial features
from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(df[['Age', 'Fare']])

# 4. Feature importance analysis
# (will do properly in Week 2 with models)
```

**Resources:**
- Kaggle Feature Engineering: https://kaggle.com/competitions
- Real Python: https://realpython.com/feature-engineering-for-machine-learning/

**GitHub Commit:** `day-06-feature-engineering.ipynb`

---

### **Day 7: Week 1 Polish & Review**

**Full Day: Preparation for Week 2**
- [ ] Clean all notebooks (remove old outputs)
- [ ] Add markdown comments explaining findings
- [ ] Create comprehensive README for titanic-eda project
- [ ] Document all visualizations and insights
- [ ] Push all Day 1-6 work to GitHub

**README should include:**
- Problem statement
- Dataset overview
- Key findings from EDA
- Features engineered
- Next steps (modeling in Week 2)

**GitHub Commit:** `week-1-complete-titanic-eda/`

---

## **WEEK 2: Machine Learning Fundamentals** (Days 8-14)

### **Day 8-9: Regression Models**

**Day 8 - Learning (2h)**
- Video: [Linear Regression Explained](https://www.youtube.com/watch?v=E4MfCWpEIWE)
- Video: [Ridge and Lasso Regression](https://www.youtube.com/watch?v=Q81RR3yKn30)
- Focus: Math behind linear regression, regularization (L1/L2)

**Day 8-9 - Hands-On (6h)**
```python
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error

# Data preparation
X = df[['Age', 'Fare', 'Family_size']].fillna(df.mean())
y = df['Survived']  # or some continuous target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 1. Linear Regression
lr = LinearRegression()
lr.fit(X_train, y_train)
y_pred = lr.predict(X_test)
print(f"R²: {r2_score(y_test, y_pred)}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred))}")

# 2. Ridge Regression (L2)
ridge = Ridge(alpha=1.0)
ridge.fit(X_train, y_train)
scores_ridge = cross_val_score(ridge, X_train, y_train, cv=5)
print(f"Ridge CV Score: {scores_ridge.mean()}")

# 3. Lasso Regression (L1)
lasso = Lasso(alpha=0.1)
lasso.fit(X_train, y_train)
print(f"Lasso features selected: {np.sum(lasso.coef_ != 0)}")
```

**Resources:**
- StatQuest Linear Regression: https://www.youtube.com/watch?v=PwFGJjlmhXA
- Scikit-learn: https://scikit-learn.org/stable/modules/linear_model.html

**GitHub Commit:** `day-08-09-regression-models.ipynb`

---

### **Day 10-11: Classification Models**

**Day 10 - Learning (2h)**
- Video: [Logistic Regression](https://www.youtube.com/watch?v=yIYKR4sgAyU)
- Video: [Decision Trees](https://www.youtube.com/watch?v=7VeUAPZLd5Y)
- Video: [Random Forest](https://www.youtube.com/watch?v=J4Wdy0Wc_xQ)

**Day 10-11 - Hands-On (6h)**
```python
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score

# Binary classification (Titanic survival)
X = df[['Age', 'Fare', 'Sex_encoded', 'Family_size']].fillna(df.mean())
y = df['Survived']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 1. Logistic Regression
lr_clf = LogisticRegression(random_state=42)
lr_clf.fit(X_train, y_train)
y_pred_lr = lr_clf.predict(X_test)
print(f"Logistic Regression F1: {f1_score(y_test, y_pred_lr)}")

# 2. Decision Tree
dt = DecisionTreeClassifier(max_depth=5, random_state=42)
dt.fit(X_train, y_train)
y_pred_dt = dt.predict(X_test)
print(f"Decision Tree F1: {f1_score(y_test, y_pred_dt)}")

# 3. Random Forest
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
y_pred_rf = rf.predict(X_test)
print(f"Random Forest F1: {f1_score(y_test, y_pred_rf)}")

# Feature importance
print(rf.feature_importances_)
```

**Resources:**
- StatQuest Playlist: https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDsmQ3ObrsSKT
- Scikit-learn Classification: https://scikit-learn.org/stable/supervised_learning.html

**GitHub Commit:** `day-10-11-classification-models.ipynb`

---

### **Day 12: Model Evaluation & Validation**

**Morning (2h): Learning**
- Video: [Train-Test Split & Cross Validation](https://www.youtube.com/watch?v=fSyB_IWW_BI)
- Video: [Classification Metrics](https://www.youtube.com/watch?v=6aL1yWBaBQE)
- Focus: Precision, Recall, F1, Confusion Matrix, ROC-AUC

**Afternoon (4h): Implement Evaluation**
```python
from sklearn.model_selection import cross_validate, learning_curve
from sklearn.metrics import roc_curve, auc, roc_auc_score
import matplotlib.pyplot as plt

# 1. Cross-validation
scores = cross_validate(rf, X_train, y_train, cv=5, 
                        scoring=['accuracy', 'precision', 'recall', 'f1'])
print(f"CV Accuracy: {scores['test_accuracy'].mean()}")

# 2. Learning curves (detect overfitting)
train_sizes, train_scores, val_scores = learning_curve(rf, X_train, y_train, cv=5)
plt.plot(train_sizes, train_scores.mean(axis=1), label='Training')
plt.plot(train_sizes, val_scores.mean(axis=1), label='Validation')
plt.xlabel('Training Set Size')
plt.ylabel('Score')
plt.legend()
plt.show()

# 3. ROC-AUC curve
y_pred_proba = rf.predict_proba(X_test)[:, 1]
fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
plt.plot(fpr, tpr, label=f'AUC = {auc(fpr, tpr):.2f}')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.legend()
plt.show()

# 4. Confusion matrix
cm = confusion_matrix(y_test, y_pred_rf)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.show()
```

**Resources:**
- Scikit-learn Metrics: https://scikit-learn.org/stable/modules/model_evaluation.html

**GitHub Commit:** `day-12-model-evaluation.ipynb`

---

### **Day 13: Hyperparameter Tuning**

**Morning (2h): Learning**
- Video: [GridSearchCV & RandomizedSearchCV](https://www.youtube.com/watch?v=Gol_qPmb9KA)
- Focus: Hyperparameter tuning strategies

**Afternoon (4h): Implement Tuning**
```python
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV

# 1. GridSearchCV for Random Forest
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [5, 10, 15, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

grid_search = GridSearchCV(RandomForestClassifier(random_state=42), 
                           param_grid, cv=5, n_jobs=-1, verbose=1)
grid_search.fit(X_train, y_train)

print(f"Best Parameters: {grid_search.best_params_}")
print(f"Best Score: {grid_search.best_score_}")

# 2. Use best model
best_rf = grid_search.best_estimator_
y_pred_best = best_rf.predict(X_test)
print(f"Test F1: {f1_score(y_test, y_pred_best)}")

# 3. RandomizedSearchCV (faster for large parameter spaces)
param_dist = {
    'n_estimators': [50, 100, 200, 300],
    'max_depth': [5, 10, 15, 20, None],
    'learning_rate': [0.01, 0.05, 0.1]
}

random_search = RandomizedSearchCV(RandomForestClassifier(), 
                                   param_dist, n_iter=20, cv=5, n_jobs=-1)
random_search.fit(X_train, y_train)
```

**Resources:**
- Scikit-learn: https://scikit-learn.org/stable/modules/grid_search.html

**GitHub Commit:** `day-13-hyperparameter-tuning.ipynb`

---

### **Day 14: Week 2 Capstone & Polish**

**Full Day: Complete ML Project**
```python
# 1. Train 5+ models
# 2. Compare all models
# 3. Select best model
# 4. Final evaluation on test set
# 5. Save trained model
```

**Create comparison table:**
```python
results_df = pd.DataFrame({
    'Model': ['Linear Regression', 'Logistic Regression', 'Decision Tree', 'Random Forest', 'XGBoost'],
    'Accuracy': [0.75, 0.82, 0.81, 0.86, 0.88],
    'Precision': [0.72, 0.81, 0.80, 0.85, 0.87],
    'Recall': [0.68, 0.79, 0.78, 0.83, 0.85],
    'F1': [0.70, 0.80, 0.79, 0.84, 0.86]
})
```

**Save model:**
```python
import pickle
pickle.dump(best_rf, open('models/best_model.pkl', 'wb'))
```

**GitHub Commit:** `week-2-complete-ml-project/`

---

## **WEEK 3: Advanced ML + Deep Learning** (Days 15-21)

### **Day 15: XGBoost & Ensemble Methods**

**Resources:**
- StatQuest XGBoost: https://www.youtube.com/watch?v=8b1JEDvenQY
- Kaggle XGBoost Tutorial: https://www.kaggle.com/learn/intro-to-machine-learning

**Code:**
```python
from xgboost import XGBClassifier
from sklearn.ensemble import GradientBoostingClassifier, VotingClassifier

# XGBoost
xgb = XGBClassifier(n_estimators=100, max_depth=5, learning_rate=0.1, random_state=42)
xgb.fit(X_train, y_train)

# Gradient Boosting
gb = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=5)
gb.fit(X_train, y_train)

# Voting Ensemble (combine multiple models)
voting = VotingClassifier(
    estimators=[('rf', RandomForestClassifier()), ('xgb', XGBClassifier()), ('gb', GradientBoostingClassifier())],
    voting='soft'
)
voting.fit(X_train, y_train)
```

**GitHub Commit:** `day-15-ensemble-methods.ipynb`

---

### **Day 16-17: Kaggle Competition (3 days)**

**Task:** Submit to active Kaggle competition

**Resources:**
- Browse competitions: https://kaggle.com/competitions
- Recommended: "Titanic", "House Prices", "Credit Card Fraud Detection"

**Process:**
```
1. Understand problem
2. EDA + visualization
3. Feature engineering
4. Train multiple models
5. Ensemble & optimize
6. Submit predictions
```

**GitHub Commit:** `kaggle-competition-submission/`

---

### **Day 18: Neural Networks Basics (MNIST)**

**Resources:**
- TensorFlow/Keras Intro: https://www.tensorflow.org/tutorials
- Video: [Neural Networks from Scratch](https://www.youtube.com/watch?v=aircAruvnKk)

**Code:**
```python
import tensorflow as tf
from tensorflow import keras
import numpy as np

# Load MNIST
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()

# Normalize
X_train, X_test = X_train / 255.0, X_test / 255.0

# Build model
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(X_train, y_train, epochs=10, batch_size=32, validation_split=0.1)
model.evaluate(X_test, y_test)
```

**GitHub Commit:** `day-18-mnist-neural-network.ipynb`

---

### **Day 19: Convolutional Neural Networks (CNNs)**

**Resources:**
- CNN Explained: https://www.youtube.com/watch?v=YRhxdVk_sIs
- TensorFlow CNN: https://www.tensorflow.org/tutorials/images/cnn

**Code:**
```python
# CIFAR-10 CNN
model = keras.Sequential([
    keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)),
    keras.layers.MaxPooling2D((2, 2)),
    keras.layers.Conv2D(64, (3, 3), activation='relu'),
    keras.layers.MaxPooling2D((2, 2)),
    keras.layers.Conv2D(64, (3, 3), activation='relu'),
    keras.layers.Flatten(),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dropout(0.5),
    keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# Train
model.fit(X_train, y_train, epochs=10, batch_size=64, validation_split=0.1)
```

**GitHub Commit:** `day-19-cifar10-cnn.ipynb`

---

### **Day 20: Transfer Learning**

**Resources:**
- Transfer Learning: https://www.tensorflow.org/tutorials/images/transfer_learning

**Code:**
```python
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Load pre-trained ResNet50
base_model = ResNet50(weights='imagenet', include_top=False)

# Freeze base model
base_model.trainable = False

# Add custom top layers
model = keras.Sequential([
    base_model,
    GlobalAveragePooling2D(),
    Dense(256, activation='relu'),
    Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(X_train, y_train, epochs=5, batch_size=32)
```

**GitHub Commit:** `day-20-transfer-learning.ipynb`

---

### **Day 21: Week 3 Review**

- Polish all notebooks
- Check Kaggle competition ranking
- Prepare for Week 4 capstone

**GitHub Commit:** `week-3-advanced-ml-complete/`

---

## **WEEK 4: Capstone + Interview Prep** (Days 22-30)

### **Days 22-24: End-to-End ML Project**

**Project:** Complete ML system with:
- Data pipeline
- Model training
- Evaluation
- API/deployment

**GitHub Commit:** `capstone-project-complete/`

---

### **Day 25: ML Concepts Interview Prep**

Study 10 key concepts with code examples (see interview-prep folder).

---

### **Day 26: DSA + LeetCode**

- 5 Easy problems
- 5 Medium problems
- SQL basics

---

### **Day 27: SQL Fundamentals**

- SELECT, WHERE, JOIN
- GROUP BY, HAVING
- Subqueries

---

### **Day 28: Mock Interview**

- Record yourself explaining projects
- Practice answering tough questions

---

### **Day 29: GitHub Polish**

- Update all READMEs
- Optimize portfolio
- Final push

---

### **Day 30: Review & Next Steps**

- Reflect on learning
- Plan follow-up (Deep Learning, NLP, or ML Engineering)
- Start applying to roles!

---

## **Learning Resources Summary**

| Resource | Type | Cost | Quality |
|----------|------|------|---------|
| Real Python | Articles + Tutorials | Paid (worth it) | ⭐⭐⭐⭐⭐ |
| StatQuest | YouTube Videos | Free | ⭐⭐⭐⭐⭐ |
| Kaggle | Datasets + Competitions | Free | ⭐⭐⭐⭐⭐ |
| DataCamp | Interactive | Freemium | ⭐⭐⭐⭐ |
| TensorFlow Docs | Official Docs | Free | ⭐⭐⭐⭐⭐ |
| Fast.ai | Practical DL | Free | ⭐⭐⭐⭐⭐ |
| Coursera | Structured Courses | Paid/Free Audit | ⭐⭐⭐⭐ |

---

## **Tips for Success**

1. **Type EVERYTHING manually** (no copy-paste from tutorials)
2. **Commit to GitHub DAILY** (shows consistency)
3. **Focus on understanding**, not just code
4. **Document your learnings** (README explanations)
5. **Build in public** (tweet/blog progress)
6. **Debug yourself** (Google + StackOverflow before asking)
7. **Review previous day** (first 30 mins of each day)

---

**Next:** Move to 2-month and 3-month roadmaps for deeper specialization!
