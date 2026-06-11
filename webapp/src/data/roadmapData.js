export const roadmapData = [
  {
    level: 0,
    title: 'Level 0: Python & Math Foundations',
    subtitle: 'The absolute prerequisites. Do not skip this if you are a beginner.',
    color: '#2ecc71', // Green
    topics: [
      {
        title: 'Python Programming Basics',
        details: [
          'Data Types & Structures: Strings, Lists, Tuples, Sets, Dictionaries.',
          'Control Flow: If/else, For loops, While loops, List Comprehensions.',
          'Functions & Modules: Lambda functions, *args, **kwargs, writing clean functions.',
          'Object-Oriented Programming (OOP): Classes, Objects, Inheritance, Methods.'
        ]
      },
      {
        title: 'Linear Algebra Review',
        details: [
          'Matrices and Vectors',
          'Addition, Scalar Multiplication, and Matrix-Vector Multiplication',
          'Properties of Matrix Multiplication, Inverse, and Transpose'
        ]
      },
      {
        title: 'Calculus & Probability Basics',
        details: [
          'Calculus: Derivatives, Chain Rule, Gradients.',
          'Probability: Mean, Median, Variance, Standard Deviation, Normal Distribution, Bayes Theorem.'
        ]
      }
    ],
    actionItems: [
      'Watch a 4-hour Python crash course.',
      'Watch 3Blue1Browns Essence of Linear Algebra series on YouTube.',
      'Proof of Mastery: Write a Python script that reads a text file, counts word frequencies, and prints the top 10 using a dictionary.'
    ]
  },
  {
    level: 1,
    title: 'Level 1: Data Manipulation & EDA',
    subtitle: 'Data Scientists spend 80% of their time here.',
    color: '#f1c40f', // Yellow
    topics: [
      {
        title: 'NumPy (Numerical Python)',
        details: [
          'Array Creation (1D, 2D, 3D Tensors).',
          'Indexing, Slicing, and Reshaping.',
          'Broadcasting and Vectorized Operations.',
          'Linear Algebra operations.'
        ]
      },
      {
        title: 'Pandas (Data Manipulation)',
        details: [
          'Series & DataFrames: Creation, reading CSVs/SQL.',
          'Data Cleaning: Handling Missing Values, Duplicates.',
          'Aggregations: groupby, pivot_table.',
          'Combining Data: Merging, Joining.'
        ]
      },
      {
        title: 'Data Visualization',
        details: [
          'Matplotlib: Object-oriented API, Line plots, Scatter plots.',
          'Seaborn: Box plots, Violin plots, Correlation Heatmaps.'
        ]
      },
      {
        title: 'SQL for Data Science',
        details: [
          'Basics: SELECT, WHERE, ORDER BY.',
          'Aggregations & Joins.',
          'Advanced: CTEs, Window Functions.'
        ]
      }
    ],
    actionItems: [
      'Complete Kaggle free Pandas and Data Visualization micro-courses.',
      'Proof of Mastery: Download the Titanic dataset, perform EDA, and create 5 distinct charts explaining survival.'
    ]
  },
  {
    level: 2,
    title: 'Level 2: Classical Machine Learning',
    subtitle: 'The core algorithms. Do not jump to Deep Learning before mastering these.',
    color: '#e67e22', // Orange
    topics: [
      {
        title: 'Linear Regression',
        details: [
          'Model Representation & Cost Function',
          'Gradient Descent',
          'Feature Scaling'
        ]
      },
      {
        title: 'Classification & Regularization',
        details: [
          'Logistic Regression',
          'Overfitting & Regularization'
        ]
      },
      {
        title: 'System Design & Best Practices',
        details: [
          'Train/Validation/Test Sets',
          'Bias vs Variance',
          'Precision vs Recall'
        ]
      },
      {
        title: 'Advanced Classifiers',
        details: [
          'Support Vector Machines (SVM)',
          'Clustering: K-Means',
          'Dimensionality Reduction (PCA)',
          'Recommender Systems'
        ]
      }
    ],
    actionItems: [
      'Follow the free Machine Learning course by Andrew Ng (Coursera).',
      'Proof of Mastery: Build an End-to-End model predicting House Prices or Customer Churn using Scikit-Learn Pipeline.'
    ]
  },
  {
    level: 3,
    title: 'Level 3: Deep Learning & AI',
    subtitle: 'For Computer Vision, Natural Language Processing, and Complex Patterns.',
    color: '#e74c3c', // Red
    topics: [
      {
        title: 'Neural Networks',
        details: [
          'Forward Propagation & Cost Function',
          'Backpropagation Algorithm'
        ]
      },
      {
        title: 'Deep Learning Frameworks (PyTorch)',
        details: [
          'Tensors and Autograd',
          'Custom Dataset and DataLoader',
          'Custom Training Loops'
        ]
      },
      {
        title: 'Computer Vision (CV)',
        details: [
          'CNNs, Padding, Max Pooling',
          'ResNet, VGG, Inception',
          'Transfer Learning'
        ]
      },
      {
        title: 'Natural Language Processing (NLP) & LLMs',
        details: [
          'Word Embeddings (Word2Vec)',
          'Sequence Models (RNNs, LSTMs)',
          'Transformers (Self-Attention)',
          'Generative AI & Prompt Engineering'
        ]
      }
    ],
    actionItems: [
      'Take the Fast.ai course "Practical Deep Learning for Coders".',
      'Watch Andrej Karpathy "Neural Networks: Zero to Hero".',
      'Proof of Mastery: Fine-tune a pre-trained Image Classification model or a HuggingFace Transformer model.'
    ]
  },
  {
    level: 4,
    title: 'Level 4: MLOps & Production Engineering',
    subtitle: 'The skills that get you hired as a Senior ML Engineer.',
    color: '#8e44ad', // Purple
    topics: [
      {
        title: 'Optimization & Large Scale ML',
        details: [
          'Stochastic Gradient Descent (SGD)',
          'Data Parallelism'
        ]
      },
      {
        title: 'Experiment Tracking & Versioning',
        details: [
          'Git & GitHub',
          'DVC (Data Version Control)',
          'MLflow / Weights & Biases'
        ]
      },
      {
        title: 'Model Serving & API Development',
        details: [
          'FastAPI',
          'Pydantic Validation',
          'Loading serialized models safely'
        ]
      },
      {
        title: 'Containerization & Orchestration',
        details: [
          'Docker & Docker Compose',
          'Multi-stage builds'
        ]
      },
      {
        title: 'CI/CD & Production Monitoring',
        details: [
          'GitHub Actions',
          'Monitoring (Evidently AI) for Data Drift'
        ]
      }
    ],
    actionItems: [
      'Study MLOps Reference Project.',
      'Proof of Mastery: Track a model with MLflow, wrap it in FastAPI, containerize with Docker, and set up a GitHub Action.'
    ]
  }
];

export const assessmentQuestions = [
  {
    level: 0,
    questions: [
      'I can write a Python class and understand the __init__ method.',
      'I can iterate over a dictionary using a for loop.',
      'I know how to mathematically calculate a matrix dot-product.'
    ]
  },
  {
    level: 1,
    questions: [
      'I can load a CSV file using Pandas and fill missing values using .fillna().',
      'I can perform a SQL-like GROUP BY operation in Pandas.',
      'I can plot a Correlation Heatmap using Seaborn.'
    ]
  },
  {
    level: 2,
    questions: [
      'I understand the exact difference between Precision, Recall, and ROC-AUC.',
      'I can write a Scikit-Learn Pipeline to scale data before training.',
      'I know how to use K-Fold Cross Validation to prevent overfitting.'
    ]
  },
  {
    level: 3,
    questions: [
      'I can write a custom Dataset and DataLoader class in PyTorch/TensorFlow.',
      'I understand how Backpropagation updates weights using the Chain Rule.',
      'I know what the "Self-Attention" mechanism is in a Transformer.'
    ]
  },
  {
    level: 4,
    questions: [
      'I can track my hyperparameter experiments using MLflow.',
      'I can write a Dockerfile to containerize a Python ML application.',
      'I can expose a trained model as a REST API using FastAPI.'
    ]
  }
];
