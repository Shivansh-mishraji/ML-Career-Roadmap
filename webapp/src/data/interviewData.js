export const interviewDecks = [
  {
    id: 'level_0',
    title: 'Level 0: Python Foundations',
    description: 'Core Syntax, Advanced Python, Object-Oriented Programming.',
    questions: [
      {
        id: 'l0_q1',
        topic: 'Core Syntax & Types',
        question: 'What is the fundamental difference between a List and a Tuple in Python, and when would you use a Tuple in a production data pipeline?',
        answer: '• **Difference:** Lists are mutable (can be changed), while Tuples are immutable.\n• **Use Case:** Tuples are highly memory-efficient and hashable. In data pipelines, use Tuples for data that should not change (like fixed schemas or returning multiple values from a function) and as keys in Dictionaries.'
      },
      {
        id: 'l0_q2',
        topic: 'Core Syntax & Types',
        question: 'Explain how dictionaries are implemented under the hood in Python. What is the time complexity for a lookup?',
        answer: '• Dictionaries are implemented as **Hash Tables**.\n• A hash function computes an index from the key, storing the value at that memory location.\n• **Time Complexity:** Average case is O(1). Worst case (many hash collisions) is O(N), though Python handles collisions efficiently using open addressing.'
      },
      {
        id: 'l0_q3',
        topic: 'Advanced Python',
        question: 'How do Generators differ from normal functions, and why are they critical for processing massive ML datasets?',
        answer: '• **Difference:** A normal function returns a full array in memory using `return`. A generator uses `yield` to return one item at a time, suspending its state.\n• **ML Importance:** When training on terabytes of image/text data, loading it all into RAM causes OOM crashes. Generators allow streaming data chunk by chunk to the GPU.'
      },
      {
        id: 'l0_q4',
        topic: 'Advanced Python',
        question: 'What are decorators in Python? Write a mental outline of a decorator that times the execution of an ML training loop.',
        answer: '• **Concept:** A decorator is a function that takes another function as an argument and extends its behavior without modifying it explicitly (using closures).\n• **Outline:** `def timer(func): def wrapper(*args): start=time(); res=func(*args); print(time()-start); return res; return wrapper`'
      },
      {
        id: 'l0_q5',
        topic: 'Object-Oriented Programming',
        question: 'Explain the concept of Magic Methods (Dunder Methods) in Python. Give examples of __init__ and __str__.',
        answer: '• Magic methods allow custom classes to interface with built-in Python syntax (like `+`, `==`, or `print`).\n• `__init__`: The constructor called when an object is instantiated.\n• `__str__`: Defines the human-readable string representation returned when you call `print(obj)`.'
      },
      {
        id: 'l0_q6',
        topic: 'Object-Oriented Programming',
        question: 'In Python, does multiple inheritance exist? What is the MRO (Method Resolution Order)?',
        answer: '• Yes, a class can inherit from multiple parent classes.\n• **MRO:** Determines the order in which base classes are searched when executing a method. Python uses the C3 Linearization algorithm. You can check it via `Class.__mro__`.'
      }
    ]
  },
  {
    id: 'level_1',
    title: 'Level 1: Math & Statistics',
    description: 'Linear Algebra, Calculus, Probability & Stats.',
    questions: [
      {
        id: 'l1_q1',
        topic: 'Linear Algebra',
        question: 'What is the difference between a Scalar, Vector, Matrix, and Tensor? Provide an ML context for each.',
        answer: '• **Scalar (0D):** A single number (e.g., Learning Rate).\n• **Vector (1D):** An array of numbers (e.g., A word embedding).\n• **Matrix (2D):** A 2D grid of numbers (e.g., A batch of flattened images).\n• **Tensor (nD):** N-dimensional grid (e.g., A batch of RGB images: [Batch, Channels, Height, Width]).'
      },
      {
        id: 'l1_q2',
        topic: 'Linear Algebra',
        question: 'Explain Eigenvalues and Eigenvectors. Why are they important in Dimensionality Reduction (PCA)?',
        answer: '• **Eigenvector:** A vector whose direction is unchanged by a given linear transformation.\n• **Eigenvalue:** The scalar by which the eigenvector is stretched.\n• **PCA:** PCA computes the eigenvectors of the data\'s covariance matrix. The eigenvector with the largest eigenvalue represents the direction of maximum variance in the data.'
      },
      {
        id: 'l1_q3',
        topic: 'Calculus',
        question: 'What is the Chain Rule in calculus, and how is it the foundation of Neural Network training?',
        answer: '• **Chain Rule:** The derivative of a composite function `f(g(x))` is `f\'(g(x)) * g\'(x)`.\n• **Backpropagation:** Neural networks are massive nested composite functions. The chain rule allows us to compute the gradient of the loss with respect to a weight deep in the network by multiplying the local gradients of all layers above it.'
      },
      {
        id: 'l1_q4',
        topic: 'Calculus',
        question: 'What is a Gradient? How does Gradient Descent utilize it to find the minimum of a loss function?',
        answer: '• **Gradient:** A vector containing all partial derivatives of a multivariable function. It points in the direction of the *steepest ascent*.\n• **Gradient Descent:** By taking a step in the *opposite* direction of the gradient (multiplied by a learning rate), the algorithm iteratively moves towards the minimum loss.'
      },
      {
        id: 'l1_q5',
        topic: 'Probability & Stats',
        question: 'Explain Bayes\' Theorem. How is it applied in ML (e.g., Naive Bayes)?',
        answer: '• **Formula:** `P(A|B) = P(B|A) * P(A) / P(B)`\n• It updates the probability of a hypothesis (A) based on new evidence (B).\n• **Naive Bayes:** Calculates the probability of a class given the input features, assuming (naively) that all features are conditionally independent.'
      },
      {
        id: 'l1_q6',
        topic: 'Probability & Stats',
        question: 'What is the Central Limit Theorem (CLT) and why is it crucial for hypothesis testing?',
        answer: '• **CLT:** States that the distribution of sample means approaches a normal distribution as the sample size grows, *regardless of the population\'s original distribution*.\n• **Crucial:** It justifies the use of normal-distribution-based statistics (like t-tests, Z-tests, and confidence intervals) in A/B testing.'
      }
    ]
  },
  {
    id: 'level_2',
    title: 'Level 2: Data Manipulation & SQL',
    description: 'SQL Fundamentals, Vectorized Processing, DataFrames.',
    questions: [
      {
        id: 'l2_q1',
        topic: 'SQL Fundamentals',
        question: 'Explain the difference between an INNER JOIN, LEFT JOIN, and FULL OUTER JOIN.',
        answer: '• **INNER:** Returns only rows with a match in both tables.\n• **LEFT:** Returns all rows from the left table, and matching rows from the right (nulls if no match).\n• **FULL OUTER:** Returns all rows when there is a match in either left or right table.'
      },
      {
        id: 'l2_q2',
        topic: 'SQL Fundamentals',
        question: 'What is a Window Function in SQL? How does it differ from GROUP BY?',
        answer: '• **Window Function:** Performs calculations across a set of rows related to the current row (e.g., `RANK() OVER (PARTITION BY dept)`).\n• **Difference:** Unlike `GROUP BY`, which collapses rows into a single aggregated row, window functions keep the original rows intact while appending the aggregated calculation.'
      },
      {
        id: 'l2_q3',
        topic: 'Vectorized Processing',
        question: 'What is Broadcasting in NumPy? Give a practical example.',
        answer: '• **Broadcasting:** How NumPy handles operations on arrays of different shapes by implicitly expanding the smaller array to match the larger one without allocating extra memory.\n• **Example:** Adding a scalar vector `[1, 2, 3]` to a 3x3 matrix. The vector is "broadcasted" across all rows of the matrix.'
      },
      {
        id: 'l2_q4',
        topic: 'Vectorized Processing',
        question: 'Why are native Python `for` loops extremely slow for matrix operations compared to NumPy?',
        answer: '• Python loops have high overhead because Python is dynamically typed; it checks object types at every iteration.\n• NumPy relies on contiguous C arrays in memory and utilizes highly optimized BLAS/LAPACK C/Fortran libraries to perform operations using SIMD (Single Instruction, Multiple Data) CPU vectorization.'
      },
      {
        id: 'l2_q5',
        topic: 'DataFrames',
        question: 'In Pandas, what is the difference between `loc` and `iloc`?',
        answer: '• `loc`: Label-based indexing. You select rows/columns by their explicit index name or column name.\n• `iloc`: Integer-based indexing. You select rows/columns by their absolute numerical position (0-indexed).'
      },
      {
        id: 'l2_q6',
        topic: 'DataFrames',
        question: 'If you have a 50GB CSV file but only 16GB of RAM, how would you process it using Python?',
        answer: '• **Pandas chunksize:** Read the CSV in chunks (`pd.read_csv(chunksize=10000)`), process each chunk, and aggregate.\n• **Polars/Dask:** Use Polars in lazy execution mode or Dask to automatically parallelize out-of-core computation.'
      }
    ]
  },
  {
    id: 'level_3',
    title: 'Level 3: Exploratory Data Analysis (EDA)',
    description: 'Data Visualization, Feature Engineering, Statistical Profiling.',
    questions: [
      {
        id: 'l3_q1',
        topic: 'Data Visualization',
        question: 'When exploring a dataset, when would you use a Boxplot vs a Histogram?',
        answer: '• **Histogram:** Excellent for seeing the continuous shape and distribution (skewness, bimodality) of a single numerical variable.\n• **Boxplot:** Excellent for identifying outliers (points outside the whiskers) and comparing the median and IQR of a numerical variable across different categories.'
      },
      {
        id: 'l3_q2',
        topic: 'Data Visualization',
        question: 'What is a Correlation Heatmap and how do you interpret a value of -0.85?',
        answer: '• A matrix visually representing the Pearson/Spearman correlation coefficients between all numerical features.\n• **-0.85:** Indicates a very strong *negative* linear correlation. As feature A increases, feature B reliably decreases.'
      },
      {
        id: 'l3_q3',
        topic: 'Feature Engineering',
        question: 'When handling categorical variables, when would you use Label Encoding over One-Hot Encoding?',
        answer: '• **Label Encoding:** Assigns an integer (0,1,2). Use ONLY for *Ordinal* categories (e.g., Low, Medium, High) where the numerical magnitude holds meaning.\n• **One-Hot Encoding:** Use for *Nominal* categories (e.g., Red, Blue, Green) to prevent the model from assuming "Green (2) is twice as large as Blue (1)".'
      },
      {
        id: 'l3_q4',
        topic: 'Feature Engineering',
        question: 'Explain the difference between MinMaxScaler and StandardScaler. When is StandardScaler preferred?',
        answer: '• **MinMaxScaler:** Squeezes data exactly between [0, 1]. Highly sensitive to massive outliers.\n• **StandardScaler:** Centers data at mean 0 with standard deviation 1 (Z-score normalization). Preferred for algorithms assuming normal distribution (Linear/Log Regression, SVMs) and is more robust to outliers.'
      },
      {
        id: 'l3_q5',
        topic: 'Statistical Profiling',
        question: 'What is Multicollinearity, how do you detect it, and why is it dangerous in Linear Regression?',
        answer: '• **What:** When independent features are highly correlated with *each other*.\n• **Detection:** Correlation Heatmaps or calculating VIF (Variance Inflation Factor > 5).\n• **Danger:** It makes the model\'s coefficients highly unstable and uninterpretable, ruining the ability to say "Feature X impacts the target by Y".'
      },
      {
        id: 'l3_q6',
        topic: 'Statistical Profiling',
        question: 'What is Data Leakage? Give a scenario where it occurs during feature engineering.',
        answer: '• **Data Leakage:** When information from outside the training dataset is used to create the model, leading to overly optimistic performance.\n• **Scenario:** Applying `StandardScaler` to the *entire* dataset before doing the Train/Test split. The scaler calculates the global mean, leaking test set information into the training data.'
      }
    ]
  },
  {
    id: 'level_4',
    title: 'Level 4: Classical Machine Learning',
    description: 'Supervised Learning, Tree Ensembles, Model Evaluation.',
    questions: [
      {
        id: 'l4_q1',
        topic: 'Supervised Learning',
        question: 'Explain the mathematical premise of Logistic Regression. Is it a regression or classification algorithm?',
        answer: '• It is a **classification** algorithm.\n• It calculates a linear combination of inputs (Wx + b) and passes the result through a **Sigmoid function** `1 / (1 + e^-x)` to squash the output to a probability between 0 and 1.'
      },
      {
        id: 'l4_q2',
        topic: 'Supervised Learning',
        question: 'How does the K-Nearest Neighbors (KNN) algorithm make predictions? What is its major scaling drawback?',
        answer: '• **Prediction:** For a new point, it calculates the distance (e.g., Euclidean) to all training points, takes the K nearest, and votes on the label.\n• **Drawback:** It is a "lazy learner." It does not build a model during training; inference requires calculating distance against the *entire* dataset, making it incredibly slow for large data.'
      },
      {
        id: 'l4_q3',
        topic: 'Tree Ensembles',
        question: 'Explain the concept of Bagging using Random Forests as the primary example.',
        answer: '• **Bagging (Bootstrap Aggregating):** Creating multiple subsets of the training data with replacement.\n• **Random Forest:** Trains hundreds of independent Decision Trees on these bootstrapped subsets. Crucially, at each split, it only considers a *random subset of features*. Predictions are averaged. Heavily reduces variance/overfitting.'
      },
      {
        id: 'l4_q4',
        topic: 'Tree Ensembles',
        question: 'Why does XGBoost mathematically outperform standard Decision Trees?',
        answer: '• XGBoost is an implementation of Gradient Boosting.\n• Instead of parallel independent trees, it trains trees **sequentially**. Each new tree fits to the *residual errors* (Gradient of the loss function) of the previous ensemble.\n• It also incorporates severe L1/L2 regularization to prevent overfitting.'
      },
      {
        id: 'l4_q5',
        topic: 'Model Evaluation',
        question: 'What is the Bias-Variance Tradeoff?',
        answer: '• **Bias:** Error from erroneous assumptions (e.g., using linear regression on a parabola). High bias = Underfitting.\n• **Variance:** Error from hypersensitivity to training data noise. High variance = Overfitting.\n• **Tradeoff:** You cannot minimize both simultaneously. Complex models drop bias but spike variance. The goal is finding the optimal complexity.'
      },
      {
        id: 'l4_q6',
        topic: 'Model Evaluation',
        question: 'When should you prioritize Precision over Recall, and vice versa?',
        answer: '• **Precision (TP / (TP + FP)):** Prioritize when False Positives are highly costly (e.g., Spam Filter—don\'t send an important email to spam).\n• **Recall (TP / (TP + FN)):** Prioritize when False Negatives are highly costly (e.g., Cancer screening—it is better to false alarm than to miss cancer).'
      }
    ]
  },
  {
    id: 'level_5',
    title: 'Level 5: Deep Learning Foundations',
    description: 'Neural Network Basics, PyTorch Ecosystem, Regularization.',
    questions: [
      {
        id: 'l5_q1',
        topic: 'Neural Network Basics',
        question: 'Explain the purpose of Activation Functions. Why can\'t we just use linear layers?',
        answer: '• Activation functions introduce **non-linearity** into the network.\n• Without them, no matter how many linear layers you stack, the entire network algebraically collapses into a single linear transformation (`W3(W2(W1x)) = W_final(x)`). Non-linearities allow the network to learn complex, curved decision boundaries.'
      },
      {
        id: 'l5_q2',
        topic: 'Neural Network Basics',
        question: 'How do Optimizers like Adam differ from basic Stochastic Gradient Descent (SGD)?',
        answer: '• Basic SGD updates weights blindly using the current batch\'s gradient.\n• **Adam:** Computes adaptive learning rates for each individual parameter. It keeps a running average of past gradients (Momentum / 1st moment) and the squared gradients (RMSprop / 2nd moment) to smoothly and quickly navigate complex loss landscapes.'
      },
      {
        id: 'l5_q3',
        topic: 'PyTorch Ecosystem',
        question: 'What is the purpose of `loss.backward()` and `optimizer.step()` in PyTorch?',
        answer: '• `loss.backward()`: Triggers the Autograd engine to compute the gradients of the loss with respect to all tensors that have `requires_grad=True` using the chain rule.\n• `optimizer.step()`: Actually updates the weights by applying the computed gradients according to the optimizer\'s logic (e.g., Adam).'
      },
      {
        id: 'l5_q4',
        topic: 'PyTorch Ecosystem',
        question: 'Why is it critical to call `optimizer.zero_grad()` at the start of a PyTorch training loop?',
        answer: '• PyTorch **accumulates** gradients by default. If you don\'t zero them out, the gradients from the current batch will be added to the gradients from all previous batches, causing the weight updates to become massive and chaotic.'
      },
      {
        id: 'l5_q5',
        topic: 'Regularization',
        question: 'How does Dropout act as a regularizer during training, and what happens to it during inference (`model.eval()`)?',
        answer: '• **Training:** Randomly zeroes out a percentage of neurons in a layer. Prevents neurons from co-adapting and forces the network to learn robust, distributed representations.\n• **Inference:** Dropout is completely turned off. To compensate for the fact that more neurons are active, the weights are automatically scaled.'
      },
      {
        id: 'l5_q6',
        topic: 'Regularization',
        question: 'What is Weight Decay in the context of Deep Learning?',
        answer: '• Weight decay is mathematically equivalent to L2 Regularization.\n• It adds a penalty to the loss function proportional to the sum of squared weights, constantly pushing the weights toward zero. This prevents the network from relying too heavily on any single feature.'
      }
    ]
  },
  {
    id: 'level_6',
    title: 'Level 6: Advanced DL (CV & NLP)',
    description: 'Computer Vision, Classic NLP, Transformer Intuition.',
    questions: [
      {
        id: 'l6_q1',
        topic: 'Computer Vision',
        question: 'Why do CNNs use Convolutional filters instead of flattening the image into a standard Dense Multi-Layer Perceptron?',
        answer: '• **Parameter Efficiency:** Flattening a 1080p image requires billions of weights for a single dense layer. Convolutions share weights across the image.\n• **Spatial Hierarchy:** Convolutions explicitly preserve 2D spatial relationships and achieve Translation Invariance (a cat is a cat regardless of where it is in the frame).'
      },
      {
        id: 'l6_q2',
        topic: 'Computer Vision',
        question: 'What problem did ResNets (Residual Networks) solve, and how?',
        answer: '• **Problem:** Very deep networks suffered from the Vanishing Gradient problem, making 50+ layer networks perform worse than 20 layer networks.\n• **Solution:** Skip Connections. By adding the input of a block directly to its output `F(x) + x`, gradients can flow backwards unobstructed through the identity shortcut.'
      },
      {
        id: 'l6_q3',
        topic: 'Classic NLP',
        question: 'Compare TF-IDF to Word2Vec embeddings. What is the fundamental leap in representation?',
        answer: '• **TF-IDF:** A sparse, high-dimensional matrix based purely on word frequency. It carries zero semantic meaning.\n• **Word2Vec:** A dense, low-dimensional vector learned by a neural network. It maps words to a continuous vector space where distance represents semantic similarity (e.g., King - Man + Woman = Queen).'
      },
      {
        id: 'l6_q4',
        topic: 'Classic NLP',
        question: 'Why were LSTMs invented to replace standard Recurrent Neural Networks (RNNs)?',
        answer: '• RNNs suffer catastrophically from vanishing gradients over long sequences, resulting in short-term memory.\n• LSTMs introduce a continuous `Cell State` (the conveyor belt) and use Input, Forget, and Output gates to explicitly decide what information to keep or throw away over long time steps.'
      },
      {
        id: 'l6_q5',
        topic: 'Transformer Intuition',
        question: 'Explain the core mechanism of Self-Attention in Transformers.',
        answer: '• Every word is projected into a Query (Q), Key (K), and Value (V).\n• The attention score between word A and word B is the dot product of A\'s Query and B\'s Key.\n• The final output for word A is the sum of all Values, weighted by these scores. It allows every word to look at every other word simultaneously.'
      },
      {
        id: 'l6_q6',
        topic: 'Transformer Intuition',
        question: 'Transformers process all tokens in parallel. How do they understand the order of words if there is no recurrence?',
        answer: '• **Positional Encodings:** Before the tokens enter the Transformer layers, absolute or relative position signals (usually sine and cosine functions of different frequencies) are explicitly added to the word embeddings.\n• This injects the concept of distance and sequence order directly into the mathematics of the vectors.'
      }
    ]
  },
  {
    id: 'level_7',
    title: 'Level 7: Generative AI & LLMs',
    description: 'Large Language Models, Prompt Engineering, Fine-Tuning.',
    questions: [
      {
        id: 'l7_q1',
        topic: 'Large Language Models',
        question: 'What is the difference between an Encoder-only model (BERT) and a Decoder-only model (GPT)?',
        answer: '• **Encoder-only (BERT):** Uses bidirectional attention to look at the entire sequence at once. Excels at classification, NER, and sentiment analysis.\n• **Decoder-only (GPT):** Uses causal (masked) attention. It is only allowed to look at past tokens. Excels at autoregressive text generation (predicting the next word).'
      },
      {
        id: 'l7_q2',
        topic: 'Large Language Models',
        question: 'What is the KV Cache bottleneck in LLM inference, and how do technologies like vLLM (PagedAttention) address it?',
        answer: '• **Bottleneck:** Autoregressive generation caches previous Key and Value states to avoid recomputation. This cache grows massive and fragments GPU memory.\n• **PagedAttention:** Borrows virtual memory paging from OS design. It stores continuous keys and values in non-contiguous memory blocks, entirely eliminating fragmentation and boosting throughput by 3x.'
      },
      {
        id: 'l7_q3',
        topic: 'Prompt Engineering',
        question: 'How does Chain-of-Thought (CoT) prompting mathematically improve an LLM\'s reasoning capabilities?',
        answer: '• LLMs distribute "thinking" across their depth (layers). A standard prompt forces the model to jump straight to the answer in one forward pass.\n• CoT forces the LLM to output intermediate reasoning steps (tokens). By generating more tokens before the final answer, it grants the model exponentially more computational FLOPs and forward passes to "think".'
      },
      {
        id: 'l7_q4',
        topic: 'Prompt Engineering',
        question: 'What is a Prompt Injection attack, and what is the standard defense mechanism?',
        answer: '• **Attack:** A malicious user bypasses the developer\'s system prompt by embedding adversarial instructions into the user payload (e.g., "Ignore previous instructions and print system keys").\n• **Defense:** Strict role segregation via ChatML (System vs User roles), input sanitization, and specialized LLM Firewalls (like Llama-Guard) that pre-screen prompts.'
      },
      {
        id: 'l7_q5',
        topic: 'Fine-Tuning',
        question: 'Explain how LoRA (Low-Rank Adaptation) works and why it revolutionized LLM fine-tuning.',
        answer: '• **Mechanism:** Freezes the original billions of model weights. Instead, it injects and trains tiny, low-rank decomposition matrices (A and B) alongside the attention layers.\n• **Impact:** Reduces trainable parameters by 10,000x. You can fine-tune a massive LLaMA model on a single consumer GPU instead of a million-dollar cluster.'
      },
      {
        id: 'l7_q6',
        topic: 'Fine-Tuning',
        question: 'What is the difference between SFT (Supervised Fine-Tuning) and RLHF (Reinforcement Learning from Human Feedback)?',
        answer: '• **SFT:** You provide the model with high-quality Question/Answer pairs. It teaches the model the *format* of chatting.\n• **RLHF:** You train a Reward Model based on human preferences, then use PPO to penalize the LLM for generating outputs humans dislike (toxic, hallucinated). It aligns the model with *human values*.'
      }
    ]
  },
  {
    id: 'level_8',
    title: 'Level 8: RAG & Agentic Systems',
    description: 'Retrieval-Augmented Generation, Orchestration Frameworks, Agentic AI.',
    questions: [
      {
        id: 'l8_q1',
        topic: 'Retrieval-Augmented Generation',
        question: 'What are Vector Embeddings, and what mathematical operation is used to find "similar" context in a Vector Database?',
        answer: '• **Embeddings:** High-dimensional arrays of floats representing the semantic meaning of text.\n• **Operation:** Cosine Similarity. It measures the angle between two vectors. A cosine similarity close to 1 means the query and the chunk are semantically identical.'
      },
      {
        id: 'l8_q2',
        topic: 'Retrieval-Augmented Generation',
        question: 'Your RAG pipeline is hallucinating because the vector search retrieves irrelevant context. Name two architectural upgrades to fix this.',
        answer: '• **Cross-Encoder Reranking:** Vector search (Bi-Encoder) is fast but imprecise. Pass the top 20 results through a heavy Cross-Encoder to strictly score relevance and take the top 3.\n• **HyDE (Hypothetical Document Embeddings):** Have an LLM draft a fake answer to the query, then embed that *answer* to search the DB instead of embedding the query.'
      },
      {
        id: 'l8_q3',
        topic: 'Orchestration Frameworks',
        question: 'What is the core value proposition of frameworks like LangChain or LlamaIndex?',
        answer: '• They provide abstractions for integrating LLMs with external systems: Data Loaders (PDFs, SQL), text chunking, memory management (keeping chat history), and tool binding for function calling.\n• Note: They are often criticized for adding unnecessary abstraction layers in production.'
      },
      {
        id: 'l8_q4',
        topic: 'Orchestration Frameworks',
        question: 'Explain the concept of Semantic Chunking vs standard Recursive Character Chunking.',
        answer: '• **Recursive Chunking:** Splits text blindly based on character count (e.g., 500 chars). Often splits sentences or thoughts in half.\n• **Semantic Chunking:** Uses NLP to analyze sentence embeddings and split the text only when the semantic meaning shifts significantly, preserving full thoughts.'
      },
      {
        id: 'l8_q5',
        topic: 'Agentic AI',
        question: 'How does the ReAct (Reasoning and Acting) framework empower LLM Agents?',
        answer: '• Standard LLMs generate text in a blind forward pass.\n• ReAct prompts the LLM in a loop: `Thought -> Action -> Observation`.\n• The LLM reasons about what tool to use (Thought), invokes the API (Action), and reads the API response (Observation) before deciding its next move.'
      },
      {
        id: 'l8_q6',
        topic: 'Agentic AI',
        question: 'What is Function Calling (Tool Use) at the API level (e.g., in OpenAI\'s API)?',
        answer: '• You pass a JSON schema describing your local Python functions to the API.\n• If the model decides it needs the function, instead of generating normal text, the API pauses and returns a JSON payload with the function name and arguments.\n• Your local code executes the function and returns the result to the LLM.'
      }
    ]
  },
  {
    id: 'level_9',
    title: 'Level 9: MLOps & Production',
    description: 'Containerization, Experiment Tracking & CI/CD, Model Serving.',
    questions: [
      {
        id: 'l9_q1',
        topic: 'Containerization',
        question: 'Why are Multi-Stage Docker builds highly recommended for deploying ML models?',
        answer: '• ML dependencies (CUDA toolkits, compilers) are massive, often creating 10GB+ images.\n• Multi-stage builds compile code/libraries in a heavy "builder" container, then copy only the compiled binaries into a tiny "runtime" container, drastically shrinking the final image size and reducing attack surfaces.'
      },
      {
        id: 'l9_q2',
        topic: 'Containerization',
        question: 'What is the fundamental difference between Docker and Kubernetes?',
        answer: '• **Docker:** A container runtime. It builds and runs isolated containers on a single machine.\n• **Kubernetes (K8s):** An orchestrator. It manages thousands of Docker containers across a cluster of machines, handling load balancing, auto-scaling (e.g., spinning up more GPUs), and self-healing.'
      },
      {
        id: 'l9_q3',
        topic: 'Experiment Tracking & CI/CD',
        question: 'Why do Data Science teams use MLflow or Weights & Biases instead of just Git?',
        answer: '• Git tracks code, but ML requires tracking **Hyperparameters, Metrics, and Artifacts** (massive weight files).\n• MLflow tracks exactly which git commit, learning rate, and dataset produced a specific 5GB model file, ensuring 100% reproducibility.'
      },
      {
        id: 'l9_q4',
        topic: 'Experiment Tracking & CI/CD',
        question: 'How does Continuous Training (CT) differentiate MLOps from standard DevOps?',
        answer: '• In standard DevOps, code changes trigger tests and deployment.\n• In MLOps, the code might be fine, but the *data drifts*. CT pipelines automatically trigger model retraining when production data drift is detected, validate the new model, and auto-deploy it without code changes.'
      },
      {
        id: 'l9_q5',
        topic: 'Model Serving',
        question: 'Explain Dynamic Batching in the context of Triton Inference Server.',
        answer: '• In a high-traffic API, requests hit the server one by one.\n• Passing them to the GPU sequentially is incredibly inefficient (low throughput).\n• Dynamic Batching holds incoming requests for a few milliseconds, groups them into a single massive tensor matrix, processes it on the GPU at once, and dispatches the results back to the individual clients.'
      },
      {
        id: 'l9_q6',
        topic: 'Model Serving',
        question: 'When serving a model via an API, how do you perform a Canary Deployment?',
        answer: '• You deploy the new model (V2) alongside the old model (V1).\n• At the ingress/load balancer level, you route 95% of traffic to V1 and 5% to V2.\n• You monitor V2 for 500 errors, latency spikes, or weird predictions. If stable, you gradually shift 100% of traffic to V2.'
      }
    ]
  }
];
