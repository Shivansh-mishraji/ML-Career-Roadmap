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
