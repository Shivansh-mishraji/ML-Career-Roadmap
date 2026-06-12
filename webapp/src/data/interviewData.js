export const interviewDecks = [
  {
    id: 'ml_fundamentals',
    title: 'Machine Learning Fundamentals',
    description: 'Core concepts, Bias-Variance, Evaluation Metrics, and Classical Algorithms.',
    questions: [
      {
        id: 'ml_1',
        topic: 'Bias-Variance Tradeoff',
        question: 'Explain the Bias-Variance tradeoff and how it relates to model complexity.',
        answer: '• **Bias:** Error from erroneous assumptions in the learning algorithm (High bias can cause underfitting).\n• **Variance:** Error from sensitivity to small fluctuations in the training set (High variance can cause overfitting).\n• **Tradeoff:** As model complexity increases, bias decreases and variance increases. The goal is to find the sweet spot that minimizes total error.'
      },
      {
        id: 'ml_2',
        topic: 'Regularization',
        question: 'What is the difference between L1 (Lasso) and L2 (Ridge) regularization?',
        answer: '• **L1 Regularization (Lasso):** Adds the absolute value of magnitude of coefficient as penalty term. It can shrink some coefficients to zero, effectively performing feature selection.\n• **L2 Regularization (Ridge):** Adds squared magnitude of coefficient as penalty term. It shrinks coefficients evenly but does not set them to zero.\n• **Use case:** Use L1 for sparse models; use L2 to prevent multicollinearity.'
      },
      {
        id: 'ml_3',
        topic: 'Evaluation Metrics',
        question: 'When would you use ROC-AUC over Precision-Recall AUC?',
        answer: '• **ROC-AUC:** Plots True Positive Rate vs False Positive Rate. Best used when the classes are relatively balanced and you care equally about positive and negative classes.\n• **PR-AUC:** Plots Precision vs Recall. Best used for **highly imbalanced datasets** where the minority positive class is much more important (e.g., fraud detection).'
      },
      {
        id: 'ml_4',
        topic: 'Tree Ensembles',
        question: 'How does Gradient Boosting differ from Random Forest?',
        answer: '• **Random Forest (Bagging):** Builds multiple independent decision trees in parallel on bootstrapped subsets of data and averages their predictions. Reduces variance.\n• **Gradient Boosting (Boosting):** Builds trees sequentially, where each new tree tries to correct the residual errors of the previous sequence of trees. Reduces bias primarily.'
      }
    ]
  },
  {
    id: 'dl_nlp',
    title: 'Deep Learning & NLP',
    description: 'Neural Networks, Backpropagation, CNNs, and classic NLP architectures.',
    questions: [
      {
        id: 'dl_1',
        topic: 'Backpropagation',
        question: 'How does the vanishing gradient problem occur and how can it be mitigated?',
        answer: '• **Cause:** In deep networks using sigmoid/tanh activations, gradients are multiplied many times during backprop (Chain Rule). Since these derivatives are < 1, the gradient shrinks exponentially, halting learning in early layers.\n• **Mitigation:** Use ReLU (derivative is 1 for positive inputs), Batch Normalization, and Residual Connections (ResNets).'
      },
      {
        id: 'dl_2',
        topic: 'Batch Normalization',
        question: 'What does Batch Normalization do during training vs inference?',
        answer: '• **Training:** Normalizes the activations of a layer based on the mean and variance of the *current mini-batch*.\n• **Inference:** Uses the *running average* of the mean and variance computed during the entire training phase, ensuring deterministic outputs.'
      },
      {
        id: 'dl_3',
        topic: 'Attention Mechanism',
        question: 'Explain how Self-Attention works in a Transformer.',
        answer: '• Self-attention computes a representation of a sequence by relating different positions of the *same* sequence.\n• It creates **Query (Q), Key (K), and Value (V)** matrices. \n• Score = `softmax((Q * K^T) / sqrt(d_k)) * V`. This allows the model to weigh the importance of every word in the context window relative to the current word.'
      }
    ]
  },
  {
    id: 'genai_llms',
    title: 'Generative AI & LLMs',
    description: 'Transformers, RAG, KV Caching, LoRA, and Prompt Engineering.',
    questions: [
      {
        id: 'llm_1',
        topic: 'KV Cache',
        question: 'What is KV Caching in LLM inference and why is it important?',
        answer: '• **Concept:** During autoregressive generation, the LLM generates one token at a time. Instead of recomputing the Key (K) and Value (V) tensors for all previous tokens in the context, we cache them.\n• **Importance:** It drastically reduces computational complexity from O(N^2) to O(N) per step, heavily reducing latency.'
      },
      {
        id: 'llm_2',
        topic: 'PEFT (LoRA)',
        question: 'Explain how LoRA (Low-Rank Adaptation) works for fine-tuning.',
        answer: '• **Concept:** Instead of updating all billions of parameters in an LLM, LoRA freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture.\n• **Benefit:** Reduces the number of trainable parameters by 10,000x and GPU memory requirement by 3x, while maintaining comparable performance to full fine-tuning.'
      },
      {
        id: 'llm_3',
        topic: 'RAG Optimization',
        question: 'How would you handle retrieving irrelevant context in a naive RAG pipeline?',
        answer: '• **Chunking:** Optimize chunk size and overlap.\n• **Reranking:** Use a Cross-Encoder (like Cohere Rerank) to score and re-order the initial fast vector search results.\n• **Query Expansion/HyDE:** Rewrite the user query to generate a hypothetical answer, then embed that answer to find similar semantic chunks in the vector DB.'
      }
    ]
  },
  {
    id: 'mlops_sysdesign',
    title: 'MLOps & System Design',
    description: 'Model deployment, scaling, CI/CD, and drift monitoring.',
    questions: [
      {
        id: 'ops_1',
        topic: 'Data Drift vs Concept Drift',
        question: 'What is the difference between Data Drift and Concept Drift?',
        answer: '• **Data Drift (Feature Drift):** The statistical distribution of the input features (X) changes over time (e.g., users get older on average).\n• **Concept Drift:** The relationship between features (X) and the target variable (y) changes (e.g., what constituted "spam" in 2010 is different from "spam" in 2024).\n• **Solution:** Both require model retraining, but concept drift requires fresh ground-truth labels.'
      },
      {
        id: 'ops_2',
        topic: 'Model Serving',
        question: 'When designing a model serving system, when would you choose Batch Inference over Real-Time Inference?',
        answer: '• **Batch Inference:** High throughput, high latency. Used when predictions can be precomputed offline on a schedule (e.g., generating daily Netflix recommendations). Much cheaper.\n• **Real-Time Inference:** Low latency. Used when predictions depend on live context that cannot be precomputed (e.g., credit card fraud detection at checkout). Requires high availability APIs (FastAPI/Triton).'
      },
      {
        id: 'ops_3',
        topic: 'Feature Stores',
        question: 'What problem does a Feature Store solve in MLOps?',
        answer: '• **Training-Serving Skew:** Ensures the exact same code is used to calculate features during offline batch training and online real-time inference.\n• **Reusability:** Acts as a centralized repository for curated features, preventing different teams from rewriting the same data pipelines.'
      }
    ]
  }
];
