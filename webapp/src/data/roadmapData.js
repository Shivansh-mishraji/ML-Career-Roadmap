export const roadmapData = [
  {
    level: 0,
    title: 'Level 0: Python Foundations',
    subtitle: 'The syntax and data structures of the AI world.',
    color: '#1abc9c', // Teal
    topics: [
      {
        title: 'Core Syntax & Types',
        details: ['Variables, Strings, Lists, Tuples, Sets, Dictionaries', 'Control Flow (If, For, While)']
      },
      {
        title: 'Advanced Python',
        details: ['List/Dict Comprehensions, Lambda, map/filter', '*args, **kwargs, Decorators, Generators']
      },
      {
        title: 'Object-Oriented Programming',
        details: ['Classes, Objects, Inheritance, Magic Methods (__init__, __str__)']
      }
    ],
    actionItems: ['Write a CLI app using OOP principles.', 'Master list comprehensions and generators for memory efficiency.']
  },
  {
    level: 1,
    title: 'Level 1: Math & Statistics',
    subtitle: 'The theoretical backbone of algorithms.',
    color: '#2ecc71', // Green
    topics: [
      {
        title: 'Linear Algebra',
        details: ['Vectors, Matrices, Tensors, Dot Products', 'Eigenvalues, Eigenvectors, Dimensionality Reduction']
      },
      {
        title: 'Calculus',
        details: ['Derivatives, Partial Derivatives, Chain Rule', 'Gradients and Optimization landscapes']
      },
      {
        title: 'Probability & Stats',
        details: ['Distributions (Normal, Poisson), Bayes Theorem', 'Mean, Variance, Standard Deviation, Hypothesis Testing']
      }
    ],
    actionItems: ['Implement a Matrix multiplication function from scratch.', 'Solve basic probability questions using Bayes Theorem.']
  },
  {
    level: 2,
    title: 'Level 2: Data Manipulation & SQL',
    subtitle: 'Extracting and cleaning the fuel for your models.',
    color: '#f1c40f', // Yellow
    topics: [
      {
        title: 'SQL Fundamentals',
        details: ['SELECT, WHERE, JOINs, GROUP BY', 'Window Functions, CTEs (Common Table Expressions)']
      },
      {
        title: 'Vectorized Processing',
        details: ['NumPy arrays, Broadcasting, Indexing', 'Matrix operations in NumPy']
      },
      {
        title: 'DataFrames',
        details: ['Pandas: merge, join, fillna, groupby', 'Polars: lazy evaluation and multithreading basics']
      }
    ],
    actionItems: ['Solve complex SQL queries on LeetCode/StrataScratch.', 'Clean a messy dataset using Pandas/Polars.']
  },
  {
    level: 3,
    title: 'Level 3: Exploratory Data Analysis (EDA)',
    subtitle: 'Finding patterns before training any model.',
    color: '#e67e22', // Orange
    topics: [
      {
        title: 'Data Visualization',
        details: ['Matplotlib & Seaborn: Heatmaps, Boxplots', 'Plotly: Interactive charts and dashboards']
      },
      {
        title: 'Feature Engineering',
        details: ['Handling Outliers, Imputation techniques', 'One-Hot Encoding, Label Encoding, Scaling (MinMax, StandardScaler)']
      },
      {
        title: 'Statistical Profiling',
        details: ['Correlation matrices, identifying collinearity', 'Pandas Profiling / ydata-profiling']
      }
    ],
    actionItems: ['Perform EDA on the Titanic dataset.', 'Create an interactive Plotly dashboard.']
  },
  {
    level: 4,
    title: 'Level 4: Classical Machine Learning',
    subtitle: 'Scikit-Learn, Regression, and Tree-based models.',
    color: '#e74c3c', // Red
    topics: [
      {
        title: 'Supervised Learning',
        details: ['Linear Regression, Logistic Regression', 'Support Vector Machines (SVM), K-Nearest Neighbors (KNN)']
      },
      {
        title: 'Tree Ensembles',
        details: ['Decision Trees, Random Forests', 'Gradient Boosting: XGBoost, LightGBM, CatBoost']
      },
      {
        title: 'Model Evaluation',
        details: ['Cross-Validation, Bias-Variance Tradeoff', 'Metrics: Precision, Recall, F1, ROC-AUC, Log Loss']
      }
    ],
    actionItems: ['Build a Scikit-Learn Pipeline.', 'Tune an XGBoost model using Optuna.']
  },
  {
    level: 5,
    title: 'Level 5: Deep Learning Foundations',
    subtitle: 'Neural Networks and the PyTorch framework.',
    color: '#9b59b6', // Purple
    topics: [
      {
        title: 'Neural Network Basics',
        details: ['Multi-Layer Perceptrons (MLPs), Activation Functions (ReLU, GELU)', 'Backpropagation, Optimizers (Adam, SGD)']
      },
      {
        title: 'PyTorch Ecosystem',
        details: ['Tensors, Autograd, nn.Module', 'Custom Datasets and DataLoaders']
      },
      {
        title: 'Regularization',
        details: ['Dropout, Batch Normalization, Weight Decay']
      }
    ],
    actionItems: ['Write a custom PyTorch training loop from scratch.', 'Train a simple MLP on MNIST.']
  },
  {
    level: 6,
    title: 'Level 6: Advanced DL (CV & NLP)',
    subtitle: 'Processing unstructured data like images and text.',
    color: '#8e44ad', // Dark Purple
    topics: [
      {
        title: 'Computer Vision',
        details: ['Convolutional Neural Networks (CNNs), Pooling, Strides', 'ResNet, EfficientNet, Transfer Learning']
      },
      {
        title: 'Classic NLP',
        details: ['Tokenization, TF-IDF, Word2Vec, FastText', 'RNNs, LSTMs, GRUs']
      },
      {
        title: 'Transformer Intuition',
        details: ['Self-Attention mechanism, Positional Encoding']
      }
    ],
    actionItems: ['Fine-tune a ResNet model for image classification.', 'Implement a basic Self-Attention block in PyTorch.']
  },
  {
    level: 7,
    title: 'Level 7: Generative AI & LLMs',
    subtitle: 'The modern era of AI. Transformers and HuggingFace.',
    color: '#2980b9', // Blue
    topics: [
      {
        title: 'Large Language Models',
        details: ['Decoder-only architectures (GPT, LLaMA, Mistral)', 'HuggingFace Transformers library']
      },
      {
        title: 'Prompt Engineering',
        details: ['Few-shot prompting, Chain-of-Thought (CoT)', 'System prompts vs User prompts']
      },
      {
        title: 'Fine-Tuning',
        details: ['Parameter-Efficient Fine-Tuning (PEFT): LoRA, QLoRA', 'Instruction Tuning, RLHF basics']
      }
    ],
    actionItems: ['Download an open-source LLM via HuggingFace and generate text.', 'Fine-tune a small model using QLoRA.']
  },
  {
    level: 8,
    title: 'Level 8: RAG & Agentic Systems',
    subtitle: 'Connecting LLMs to external data and tools.',
    color: '#3498db', // Light Blue
    topics: [
      {
        title: 'Retrieval-Augmented Generation',
        details: ['Vector Embeddings (OpenAI, BGE)', 'Vector Databases (Pinecone, Qdrant, ChromaDB)', 'Chunking strategies, Semantic Search']
      },
      {
        title: 'Orchestration Frameworks',
        details: ['LangChain, LlamaIndex']
      },
      {
        title: 'Agentic AI',
        details: ['ReAct framework, Function Calling / Tool Use', 'Multi-Agent systems (AutoGen, CrewAI)']
      }
    ],
    actionItems: ['Build a RAG pipeline that answers questions over a PDF document.', 'Create an agent that can execute Python code.']
  },
  {
    level: 9,
    title: 'Level 9: MLOps & Production',
    subtitle: 'Deploying, scaling, and monitoring AI in the real world.',
    color: '#34495e', // Dark Blue/Grey
    topics: [
      {
        title: 'Containerization',
        details: ['Docker, Docker Compose, Multi-stage builds']
      },
      {
        title: 'Experiment Tracking & CI/CD',
        details: ['MLflow, Weights & Biases', 'GitHub Actions for ML']
      },
      {
        title: 'Model Serving',
        details: ['FastAPI, Ray Serve', 'vLLM (PagedAttention), Text Generation Inference (TGI)']
      }
    ],
    actionItems: ['Containerize a FastAPI model endpoint using Docker.', 'Serve an LLM efficiently using vLLM.']
  }
];

export const assessmentQuestions = [
  {
    level: 0,
    questions: [
      'I can implement a custom Python decorator and generator.',
      'I can use list comprehensions instead of standard loops for filtering data.',
      'I understand OOP inheritance and the __init__ magic method.'
    ]
  },
  {
    level: 1,
    questions: [
      'I can trace partial derivatives manually for a simple function.',
      'I understand Bayes Theorem and its applications.',
      'I know the difference between an Eigenvalue and an Eigenvector.'
    ]
  },
  {
    level: 2,
    questions: [
      'I can write a SQL query using CTEs and Window Functions.',
      'I can optimize a slow Pandas operation using vectorization.',
      'I understand broadcasting in NumPy.'
    ]
  },
  {
    level: 3,
    questions: [
      'I can identify collinearity using a Seaborn correlation heatmap.',
      'I know when to use StandardScaler vs MinMaxScaler.',
      'I can handle categorical variables using One-Hot Encoding safely.'
    ]
  },
  {
    level: 4,
    questions: [
      'I know when to use Log Loss vs ROC-AUC for imbalanced classification.',
      'I can build a Scikit-Learn Pipeline that includes custom transformers.',
      'I can tune an XGBoost model using GridSearch or Optuna.'
    ]
  },
  {
    level: 5,
    questions: [
      'I can write a custom PyTorch nn.Module from scratch.',
      'I understand how Backpropagation updates weights using the Chain Rule.',
      'I know the purpose of Batch Normalization.'
    ]
  },
  {
    level: 6,
    questions: [
      'I understand how Convolutional strides and padding affect output shapes.',
      'I can explain the difference between Word2Vec and TF-IDF.',
      'I know what the "Self-Attention" mechanism is conceptually.'
    ]
  },
  {
    level: 7,
    questions: [
      'I can load an open-source model using the HuggingFace Transformers library.',
      'I understand what PEFT and LoRA do.',
      'I can write a Chain-of-Thought (CoT) prompt.'
    ]
  },
  {
    level: 8,
    questions: [
      'I can build a Retrieval-Augmented Generation (RAG) pipeline.',
      'I understand the difference between ReAct prompting and Function Calling.',
      'I can use a Vector Database to perform semantic search.'
    ]
  },
  {
    level: 9,
    questions: [
      'I can containerize an ML service securely using a multi-stage Dockerfile.',
      'I know how to serve an LLM efficiently using vLLM.',
      'I can track my hyperparameter experiments using MLflow.'
    ]
  }
];
