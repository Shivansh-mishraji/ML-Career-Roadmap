export const companyLoops = [
  {
    id: 'google',
    company: 'Google',
    role: 'Machine Learning Engineer',
    motto: 'Focus on "Dual Competency" (DSA + ML Theory)',
    color: '#ea4335',
    rounds: [
      {
        id: 'g_r1',
        title: 'Round 1: Technical Phone Screen',
        type: 'Coding (DSA)',
        focus: 'Standard Data Structures & Algorithms. You must write bug-free code quickly.',
        questions: {
          fresher: [
            {
              q: '(Easy) Two Sum: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
              hint: 'Use a Hash Map to store the numbers you have seen so far. Look up `target - current_number` in O(1) time.',
              code: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        if target - num in seen:
            return [seen[target - num], i]
        seen[num] = i`
            }
          ],
          mid: [
            {
              q: '(Medium) Merge Intervals: Given an array of intervals, merge all overlapping intervals.',
              hint: 'Sort the intervals by their start time first. Then iterate and maintain a `merged` array, checking if the current interval overlaps with the last one in `merged`.',
              code: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = []
    for interval in intervals:
        if not merged or merged[-1][1] < interval[0]:
            merged.append(interval)
        else:
            merged[-1][1] = max(merged[-1][1], interval[1])
    return merged`
            }
          ],
          senior: [
            {
              q: '(Hard) Alien Dictionary: Given a sorted dictionary of an alien language, find the order of characters.',
              hint: 'This is a Topological Sort problem. Build a directed graph where an edge exists from char A to char B if A comes before B in the alien alphabet. Then use Kahn\'s algorithm or DFS.',
              code: null
            }
          ]
        }
      },
      {
        id: 'g_r2',
        title: 'Round 2: ML Theory & Fundamentals',
        type: 'Theory',
        focus: 'Deep mathematical understanding of ML algorithms, loss functions, and tradeoffs.',
        questions: {
          fresher: [
            {
              q: 'Explain the difference between L1 and L2 regularization mathematically.',
              hint: 'L1 adds the absolute value of the weights (encourages sparsity/zeros). L2 adds the squared value of the weights (discourages large weights but rarely zeroes them out).',
              code: null
            }
          ],
          mid: [
            {
              q: 'Derive the gradient update rule for Logistic Regression using Binary Cross-Entropy loss.',
              hint: 'Start with the BCE formula: `L = -[y*log(p) + (1-y)*log(1-p)]` where `p = sigmoid(wx+b)`. Apply the chain rule. The elegant result is simply `(p - y) * x`.',
              code: null
            }
          ],
          senior: [
            {
              q: 'How does the Hessian matrix inform second-order optimization methods like Newton\'s Method in ML?',
              hint: 'The Hessian provides curvature information. While Gradient Descent uses a fixed learning rate (first-order), Newton\'s Method multiplies the inverse Hessian by the gradient to take massive, curvature-aware steps directly to the minimum.',
              code: null
            }
          ]
        }
      },
      {
        id: 'g_r3',
        title: 'Round 3: ML System Design',
        type: 'System Design',
        focus: 'End-to-end design of Google-scale ML systems.',
        questions: {
          fresher: [
            {
              q: 'Design a simple image classification API.',
              hint: 'Focus on the serving aspect. Mention using Flask/FastAPI, receiving base64 images, doing basic normalization, passing it through a pre-trained ResNet, and returning the JSON label.',
              code: null
            }
          ],
          mid: [
            {
              q: 'Design the recommendation system for Google Play Store app suggestions.',
              hint: 'Use a Two-Tower architecture for Candidate Generation (User Tower and App Tower) to retrieve top 500 apps via FAISS. Then, use a heavier Deep Cross Network (DCN) for the Ranking phase.',
              code: null
            }
          ],
          senior: [
            {
              q: 'Design the backend for YouTube\'s real-time video transcoding and content-moderation ML pipeline.',
              hint: 'Focus on extreme scale. The video is split into 5-second chunks. A Kafka stream distributes chunks to a massive worker pool. ML models (NSFW detection) run concurrently on chunks.',
              code: null
            }
          ]
        }
      },
      {
        id: 'g_r4',
        title: 'Round 4: Googleyness & Leadership',
        type: 'Behavioral',
        focus: 'Assessing cultural fit, handling ambiguity, and navigating conflicts.',
        questions: {
          fresher: [
            {
              q: 'Tell me about a time you worked on a team project and someone was not pulling their weight.',
              hint: 'Focus on empathy and communication. You didn\'t just complain to the professor/manager; you reached out to them to find out what was blocking them.',
              code: null
            }
          ],
          mid: [
            {
              q: 'Tell me about a time you had to navigate a highly ambiguous project with no clear direction from leadership.',
              hint: 'Use the STAR method. Focus on how you proactively broke the ambiguity down into measurable milestones, built a quick prototype to gather data, and forced a decision.',
              code: null
            }
          ],
          senior: [
            {
              q: 'Tell me about a time you had to kill a project that your team had invested months of work into.',
              hint: 'Senior leaders must know when to cut losses. Explain how you recognized the sunk-cost fallacy, gathered hard data proving the ROI was negative, and carefully communicated the pivot.',
              code: null
            }
          ]
        }
      }
    ]
  },
  {
    id: 'meta',
    company: 'Meta',
    role: 'Machine Learning Engineer',
    motto: 'Move Fast. Heavy focus on RecSys and Speed Coding.',
    color: '#1877f2',
    rounds: [
      {
        id: 'm_r1',
        title: 'Round 1: Speed Coding (DSA)',
        type: 'Coding (DSA)',
        focus: 'Meta expects you to solve TWO Medium/Hard LeetCode questions flawlessly within 40 minutes.',
        questions: {
          fresher: [
            {
              q: 'Valid Palindrome II: Given a string s, return true if the s can be palindrome after deleting at most one character.',
              hint: 'Use two pointers from both ends. When a mismatch occurs, check if the string becomes a palindrome by skipping the left character OR the right character.',
              code: null
            }
          ],
          mid: [
            {
              q: 'Subarray Sum Equals K: Find the total number of continuous subarrays whose sum equals to `k`.',
              hint: 'Use a Hash Map to store the cumulative sum frequencies.',
              code: `def subarraySum(nums, k):
    count = 0
    curr_sum = 0
    prefix_sums = {0: 1} # Base case
    for num in nums:
        curr_sum += num
        if curr_sum - k in prefix_sums:
            count += prefix_sums[curr_sum - k]
        prefix_sums[curr_sum] = prefix_sums.get(curr_sum, 0) + 1
    return count`
            }
          ],
          senior: [
            {
              q: 'Merge K Sorted Lists: You are given an array of k linked-lists, each linked-list is sorted in ascending order.',
              hint: 'Use a Min-Heap (Priority Queue). Push the head of each list into the heap. Pop the smallest, append to result, and push the next node from that list into the heap.',
              code: null
            }
          ]
        }
      },
      {
        id: 'm_r2',
        title: 'Round 2: Machine Learning Design',
        type: 'System Design',
        focus: 'Usually focused on News Feed ranking, Ad CTR prediction, or Instagram Reels recommendations.',
        questions: {
          fresher: [
            {
              q: 'How would you evaluate if a new ML model for the News Feed is better than the old one?',
              hint: 'Discuss Offline metrics (ROC-AUC, Log-Loss on a holdout set) and crucially, Online metrics (A/B testing, measuring Click-Through Rate and Time Spent on Feed).',
              code: null
            }
          ],
          mid: [
            {
              q: 'Design the Instagram Reels recommendation engine.',
              hint: 'The core challenge is the sheer volume of continuous scrolling. You need a fast retrieval step (collaborative filtering/embeddings) and a heavy ranking step.',
              code: null
            }
          ],
          senior: [
            {
              q: 'Architect a privacy-preserving Ad Click-Through-Rate (CTR) prediction pipeline.',
              hint: 'Discuss differential privacy, federated learning, and strict data-retention policies. Architect the feature store to separate PII from ML features.',
              code: null
            }
          ]
        }
      }
    ]
  }
];

export const internshipLoops = [
  {
    id: 'google_intern',
    company: 'Google',
    role: 'SWE Intern (Machine Learning)',
    motto: 'Focus on Academic Potential and Mathematical Rigor',
    color: '#ea4335',
    rounds: [
      {
        id: 'gi_r1',
        title: 'Round 1: Data Structures & Math Basics',
        type: 'Coding (DSA)',
        focus: 'Google intern interviews focus heavily on arrays, strings, and hash maps, as well as basic linear algebra logic.',
        questions: {
          fresher: [
            {
              q: '(Easy) Matrix Transpose: Write a function to compute the transpose of a 2D array without using NumPy.',
              hint: 'Iterate with a nested loop: `transposed[j][i] = matrix[i][j]`. Make sure to initialize the transposed matrix with the correct reversed dimensions.',
              code: `def transpose(matrix):
    rows = len(matrix)
    cols = len(matrix[0])
    transposed = [[0] * rows for _ in range(cols)]
    
    for i in range(rows):
        for j in range(cols):
            transposed[j][i] = matrix[i][j]
            
    return transposed`
            },
            {
              q: '(Easy) Valid Anagram: Given two strings s and t, return true if t is an anagram of s.',
              hint: 'Use a Hash Map or an array of size 26 to count the frequencies of characters in both strings. If the counts match perfectly, it is an anagram.',
              code: null
            }
          ],
          mid: [], senior: []
        }
      },
      {
        id: 'gi_r2',
        title: 'Round 2: Project Deep Dive',
        type: 'Theory',
        focus: 'Interns aren\'t expected to know System Design. Instead, you must fiercely defend a university project.',
        questions: {
          fresher: [
            {
              q: 'Walk me through the hardest Machine Learning project on your resume. Why did you choose the specific algorithm you used?',
              hint: 'Be honest. If you used Random Forest, explain *why* (e.g., "The dataset was tabular and highly non-linear, and Random Forest requires less hyperparameter tuning than an SVM"). Do NOT say "because I saw it in a tutorial".',
              code: null
            },
            {
              q: 'In that project, what was your baseline model, and how much did your final model improve over it?',
              hint: 'Interviewers love baselines. Always mention starting with a trivial baseline (like always predicting the majority class) or a simple Logistic Regression before jumping to Deep Learning.',
              code: null
            }
          ],
          mid: [], senior: []
        }
      }
    ]
  },
  {
    id: 'meta_intern',
    company: 'Meta',
    role: 'Data Science / ML Intern',
    motto: 'SQL, Statistics, and Product Sense',
    color: '#1877f2',
    rounds: [
      {
        id: 'mi_r1',
        title: 'Round 1: SQL and Data Manipulation',
        type: 'Coding (DSA)',
        focus: 'Meta heavily tests SQL JOINs, GROUP BYs, and basic data cleaning using Pandas.',
        questions: {
          fresher: [
            {
              q: 'SQL: Write a query to find the percentage of users who logged in on two consecutive days.',
              hint: 'Use a LEFT JOIN on the same table where `t1.user_id = t2.user_id AND t2.date = t1.date + 1`. Then divide the count of matches by the total distinct users.',
              code: null
            },
            {
              q: 'Pandas: How do you handle missing values in a dataframe containing continuous user engagement scores?',
              hint: 'Explain the difference between dropping the rows (`dropna()`), filling with the mean/median (`fillna()`), or using a forward-fill method if it\'s time-series data.',
              code: null
            }
          ],
          mid: [], senior: []
        }
      },
      {
        id: 'mi_r2',
        title: 'Round 2: Product Sense & Applied Probability',
        type: 'System Design',
        focus: 'No architecture diagrams. Meta wants to know if you understand HOW machine learning affects the product.',
        questions: {
          fresher: [
            {
              q: 'If we notice that engagement on Instagram Stories has dropped by 5% overnight, how would you investigate if the new ML Ranking algorithm caused it?',
              hint: 'Structure your answer: 1. Verify the data (is the logging broken?). 2. Check external factors (is there a global outage or holiday?). 3. Isolate the A/B test groups (did the control group also drop?).',
              code: null
            },
            {
              q: 'You have a biased coin. How can you use it to generate a perfectly fair 50/50 outcome?',
              hint: 'Toss the coin twice. If it comes up Heads-Tails, call it Heads. If it comes up Tails-Heads, call it Tails. If it comes up Heads-Heads or Tails-Tails, discard and flip again. The probability of HT and TH is exactly equal regardless of the bias.',
              code: null
            }
          ],
          mid: [], senior: []
        }
      }
    ]
  }
];

export const timelineStrategies = {
  internship: {
    '1month': { title: "CRUNCH TIME", strategy: "Skip building heavy new projects. Memorize the Top 50 LeetCode patterns for Arrays and Strings. Practice answering 'Tell me about your project' using the STAR method out loud 10 times. Polish your resume to pass ATS parsers." },
    '3-6mo': { title: "FOCUSED SPRINT", strategy: "Dedicate 50% of your time to Data Structures (Hash Maps, Trees). Dedicate the other 50% to building ONE high-quality, end-to-end Machine Learning project (e.g., training a custom classifier and deploying it as a basic web app) to talk about." },
    '1year+': { title: "FOUNDATION BUILDING", strategy: "Do not grind LeetCode yet. Focus deeply on your core CS classes. Master Linear Algebra, Probability, and basic Calculus. Join a university research lab or a competitive programming club to build long-term intuition." }
  },
  fulltime: {
    '1month': { title: "CRUNCH TIME", strategy: "Triage your weaknesses. If your coding is weak, grind LeetCode Mediums. If your system design is weak, read the 'Machine Learning System Design Interview' book cover-to-cover. Prepare 3 versatile behavioral stories that can answer ANY leadership question." },
    '3-6mo': { title: "FOCUSED SPRINT", strategy: "Adopt a structured schedule: 2 hours of algorithmic coding daily, 1 hour of ML theory (loss functions, derivations), and 1 hour of System Design case studies (RecSys, Search, Ad Click). Participate in Kaggle to sharpen modeling speed." },
  }
};

export const quantLoops = [
  {
    id: 'jane_street',
    company: 'Jane Street / Citadel',
    role: 'Quantitative Researcher / ML Engineer',
    motto: 'Probability, C++ Low-Latency, and Brainteasers',
    color: '#10b981',
    rounds: [
      {
        id: 'q_r1',
        title: 'Round 1: Probability & Mental Math',
        type: 'Theory',
        focus: 'Rapid-fire mental math and complex expected value probability questions.',
        questions: {
          fresher: [
            {
              q: 'You have a 100-sided die. You can roll it as many times as you want. You get paid the face value of your last roll in dollars. It costs $1 to roll the die. What is your optimal strategy?',
              hint: 'Calculate the expected value. If you roll once, EV is $50.5. Since it costs $1, net EV is $49.5. The optimal stopping rule is to stop when your current roll is strictly greater than the expected value of continuing.',
              code: null
            }
          ],
          mid: [
            {
              q: 'Two players are playing a game with a fair coin. Player A wins if HTH appears. Player B wins if HHT appears. Who has the higher probability of winning?',
              hint: 'Calculate the absorbing Markov chain transition probabilities or use Martingale theory. Player B (HHT) has a significant advantage because if HH appears, B is guaranteed to win eventually without A ever getting HTH.',
              code: null
            }
          ],
          senior: [
            {
              q: 'Derive the Black-Scholes PDE using Ito\'s Lemma.',
              hint: 'Construct a risk-free portfolio consisting of one option and a short position in delta shares of the underlying stock. Apply Ito\'s Lemma to expand the option price, set the drift of the portfolio equal to the risk-free rate, and eliminate the stochastic term.',
              code: null
            }
          ]
        }
      },
      {
        id: 'q_r2',
        title: 'Round 2: Low Latency Systems (C++)',
        type: 'System Design',
        focus: 'Designing trading systems with microsecond latency requirements.',
        questions: {
          fresher: [
            {
              q: 'Explain the difference between a `std::vector` and `std::list` in C++. When would you use one over the other in a trading system?',
              hint: 'Vector is contiguous in memory, leading to excellent cache locality (crucial for latency). List is a doubly-linked list with terrible cache locality. Always default to Vector in trading unless you need O(1) insertions in the middle of massive datasets.',
              code: null
            }
          ],
          mid: [
            {
              q: 'Design an order book data structure that supports O(1) lookups, O(1) insertions, and O(1) cancellations.',
              hint: 'Use a combination of a Hash Map (for O(1) lookup by Order ID) and a Doubly-Linked List (to maintain the time-priority of orders at a specific price level), with an array or balanced BST to track price levels.',
              code: null
            }
          ],
          senior: [
            {
              q: 'How would you architect a zero-allocation, lock-free messaging queue for IPC between a market data feed handler and a trading strategy?',
              hint: 'Discuss using a circular ring buffer in shared memory. Use atomic variables (std::atomic) with memory_order_acquire and memory_order_release to ensure lock-free thread synchronization without system calls.',
              code: null
            }
          ]
        }
      }
    ]
  }
];

export const startupLoops = [
  {
    id: 'openai',
    company: 'OpenAI / Anthropic',
    role: 'Member of Technical Staff (MTS)',
    motto: 'Build From Scratch. Heavy CUDA and LLM Architecture.',
    color: '#8b5cf6',
    rounds: [
      {
        id: 's_r1',
        title: 'Round 1: PyTorch & Autograd Internals',
        type: 'Coding (DSA)',
        focus: 'Implementing deep learning primitives entirely from scratch without using high-level framework wrappers.',
        questions: {
          fresher: [
            {
              q: 'Write the forward and backward pass for a single Linear Layer (Dense Layer) in Python using only NumPy.',
              hint: 'Forward: `Y = XW + b`. Backward: `dW = X.T @ dY`, `db = sum(dY)`, `dX = dY @ W.T`. Be careful with matrix dimensions and batch sizes.',
              code: `import numpy as np
def forward(X, W, b):
    return np.dot(X, W) + b

def backward(X, W, dY):
    dW = np.dot(X.T, dY)
    db = np.sum(dY, axis=0)
    dX = np.dot(dY, W.T)
    return dX, dW, db`
            }
          ],
          mid: [
            {
              q: 'Implement Multi-Head Self-Attention from scratch.',
              hint: 'Project inputs into Q, K, V. Compute `softmax((Q @ K.T) / sqrt(d_k)) @ V`. Remember to handle the masking logic if it is causal attention.',
              code: null
            }
          ],
          senior: [
            {
              q: 'Write a custom CUDA kernel in C++ for fused GeLU activation to reduce GPU memory bandwidth usage.',
              hint: 'Standard GeLU in PyTorch does multiple read/writes to global memory. A fused kernel reads the input once, computes the math in fast thread registers, and writes once. Discuss thread block sizes and coalesced memory access.',
              code: null
            }
          ]
        }
      },
      {
        id: 's_r2',
        title: 'Round 2: Massive Scale Training',
        type: 'System Design',
        focus: 'Designing systems to train 100B+ parameter models across thousands of GPUs.',
        questions: {
          fresher: [
            {
              q: 'What is Gradient Accumulation and when do you use it?',
              hint: 'When the model is too large to fit a decent batch size in GPU memory, you do multiple forward/backward passes and accumulate the gradients before calling `optimizer.step()`, simulating a larger effective batch size.',
              code: null
            }
          ],
          mid: [
            {
              q: 'Explain the difference between Data Parallelism, Tensor Parallelism, and Pipeline Parallelism.',
              hint: 'Data: replicate model, split data. Tensor: split individual matrix operations across GPUs (requires heavy communication). Pipeline: put different layers on different GPUs (can cause pipeline bubbles).',
              code: null
            }
          ],
          senior: [
            {
              q: 'You are training a 500B parameter model on 10,000 GPUs. Nodes are failing randomly every few hours. How do you design the checkpointing system?',
              hint: 'Standard PyTorch saving will crash the network or take hours. You need asynchronous checkpointing directly to high-bandwidth NVMe storage on the nodes, then slowly upload to object storage. Discuss ZeRO stage 3 partitioned states.',
              code: null
            }
          ]
        }
      }
    ]
  }
];

export const quantInternshipLoops = [
  {
    id: 'jane_street_intern',
    company: 'Jane Street / Citadel',
    role: 'Quantitative Trading / SWE Intern',
    motto: 'Heavy Probability, Mental Math, and Algorithms',
    color: '#10b981',
    rounds: [
      {
        id: 'qi_r1',
        title: 'Round 1: Probability & Brainteasers',
        type: 'Theory',
        focus: 'Mental math speed and statistical puzzle solving.',
        questions: {
          fresher: [
            {
              q: 'You have two ropes. Each rope takes exactly 60 minutes to burn, but they burn at inconsistent rates. How do you measure exactly 45 minutes?',
              hint: 'Light both ends of Rope A, and one end of Rope B. Rope A burns out completely in 30 minutes. At that exact moment, light the other end of Rope B. Rope B will burn out exactly 15 minutes later. 30 + 15 = 45.',
              code: null
            },
            {
              q: 'Expected Value: You roll a fair 6-sided die. You can choose to keep the value, or re-roll it once. What is the expected value of your optimal strategy?',
              hint: 'If you roll once, the EV is 3.5. Therefore, you should only re-roll if your first roll is 1, 2, or 3. The EV of rolling 4, 5, or 6 is (4+5+6)/3 = 5. The probability of keeping is 1/2. The overall EV is (1/2)*5 + (1/2)*3.5 = 4.25.',
              code: null
            }
          ],
          mid: [], senior: []
        }
      },
      {
        id: 'qi_r2',
        title: 'Round 2: Algorithmic Optimization',
        type: 'Coding (DSA)',
        focus: 'Standard DSA, but heavily scrutinized for optimal time and space complexity.',
        questions: {
          fresher: [
            {
              q: '(Medium) Best Time to Buy and Sell Stock with Cooldown: Find the maximum profit you can achieve with a 1-day cooldown after selling.',
              hint: 'Use Dynamic Programming with State Machines. You have three states: Held, Sold, and Reset. Transition between them for each day.',
              code: null
            }
          ],
          mid: [], senior: []
        }
      }
    ]
  }
];

export const startupInternshipLoops = [
  {
    id: 'openai_intern',
    company: 'OpenAI / Anthropic',
    role: 'Research / ML Engineering Intern',
    motto: 'PyTorch Internals and Research Implementation',
    color: '#8b5cf6',
    rounds: [
      {
        id: 'si_r1',
        title: 'Round 1: ML Fundamentals & Code',
        type: 'Coding (DSA)',
        focus: 'Coding deep learning primitives and array manipulations.',
        questions: {
          fresher: [
            {
              q: 'Implement 2D Max Pooling from scratch using NumPy.',
              hint: 'Iterate over the image dimensions with the given stride and kernel size, slicing the array and taking `np.max()`. Make sure to handle edge cases where the image size isn\'t perfectly divisible by the stride.',
              code: null
            },
            {
              q: 'Explain what happens mathematically when you apply Softmax with a very high temperature parameter vs a very low temperature.',
              hint: 'High temperature (T > 1) pushes the output distribution closer to uniform (more random, higher entropy). Low temperature (T < 1) sharpens the distribution, making it closer to one-hot encoding (greedy/deterministic).',
              code: null
            }
          ],
          mid: [], senior: []
        }
      },
      {
        id: 'si_r2',
        title: 'Round 2: Literature & Research Deep-Dive',
        type: 'Theory',
        focus: 'Can you read and implement a paper? Discussing modern LLM architectures.',
        questions: {
          fresher: [
            {
              q: 'Explain the core innovation of the "Attention Is All You Need" paper over previous RNN/LSTM models.',
              hint: 'RNNs process tokens sequentially, creating a bottleneck that prevents parallelization and causes gradient vanishing over long contexts. Transformers use Self-Attention to process all tokens simultaneously, drastically improving training efficiency and long-range dependency modeling.',
              code: null
            }
          ],
          mid: [], senior: []
        }
      }
    ]
  }
];
