export const jobPrepData = {
  system_design: [
    {
      id: 'sd_1',
      title: 'Design a Real-Time Fraud Detection System',
      difficulty: 'Hard',
      scenario: 'You are tasked with designing an ML system for a major payment gateway that evaluates transactions for fraud within 50 milliseconds of the swipe.',
      requirements: [
        'Must handle 10,000 transactions per second (TPS).',
        'Latency budget is strictly < 50ms.',
        'Must integrate historical user data and live transaction data.'
      ],
      solution_framework: [
        '**1. Data Ingestion:** Use Apache Kafka or AWS Kinesis to ingest live streaming transaction events.',
        '**2. Feature Store (The Bottleneck Solver):** Since <50ms is required, you cannot query a standard SQL database for historical features (e.g., "how many times has this user swiped today?"). You must use an in-memory Feature Store like Redis to serve pre-computed offline features at ultra-low latency.',
        '**3. Streaming Engine:** Use Apache Flink or Spark Streaming to compute real-time sliding window features (e.g., "transactions in the last 10 minutes") and write them back to Redis.',
        '**4. Inference Service:** Deploy a compiled XGBoost or lightweight Neural Network using Triton Inference Server on Kubernetes. Do not use an LLM for this; tree ensembles are much faster and more interpretable.',
        '**5. Fallback Mechanism:** If the ML model times out (>40ms), the system must have a hardcoded rules engine (e.g., "if transaction > $10,000 in a new country, flag it") to ensure the payment doesn\'t hang.'
      ]
    },
    {
      id: 'sd_2',
      title: 'Design a Video Recommendation Engine (YouTube)',
      difficulty: 'Extreme',
      scenario: 'Design a recommendation system that serves personalized video suggestions to billions of users from a corpus of billions of videos.',
      requirements: [
        'Cannot rank all 1 billion videos for every user request (computationally impossible).',
        'Must adapt to immediate user behavior (e.g., if I start watching cat videos, recommend more immediately).',
        'Cold start problem for new videos must be addressed.'
      ],
      solution_framework: [
        '**1. Two-Tower Architecture (Candidate Generation):** Use a scalable Two-Tower Neural Network. Tower A embeds the User (watch history, demographics). Tower B embeds the Video (tags, watch time). Calculate the Dot Product between the two vectors to find the top 1,000 candidates. Serve via an Approximate Nearest Neighbor (ANN) index like FAISS.',
        '**2. Ranking Phase:** Pass the 1,000 candidates to a heavier model (e.g., a deep cross network or transformer) that scores them based on highly granular, real-time features (time of day, current session context).',
        '**3. Real-Time Context:** Use a continuous stream (Kafka) to update the User Embedding in real-time based on their current session.',
        '**4. Cold Start:** For newly uploaded videos lacking interaction data, rely heavily on Content-Based filtering (extracting features from the video\'s title, thumbnail, and audio transcript) to inject it into candidate pools.'
      ]
    }
  ],
  behavioral: [
    {
      id: 'bh_1',
      title: 'Handling Production Failures',
      category: 'Ownership & Accountability',
      question: 'Tell me about a time you deployed an ML model to production and it failed or degraded significantly. How did you handle it?',
      star_framework: {
        situation: 'Describe the model, its business impact, and the exact failure (e.g., "The model started misclassifying critical user inputs due to a sudden data drift").',
        task: 'Explain your responsibility (e.g., "I was the lead MLOps engineer responsible for the pipeline\'s health").',
        action: 'Detail the exact steps you took. "1. I immediately triggered an automated rollback to the previous stable version. 2. I pulled the logs from Grafana and identified that a newly introduced categorical variable was nulling out. 3. I implemented an emergency data validation check (Great Expectations) in the ingestion pipeline."',
        result: 'State the final business outcome. "The downtime was limited to 15 minutes. By adding the validation checks, we prevented the issue from ever happening again, increasing pipeline uptime by 15% that quarter."'
      }
    },
    {
      id: 'bh_2',
      title: 'Stakeholder Management',
      category: 'Communication',
      question: 'Tell me about a time you had to explain a complex machine learning concept to a non-technical stakeholder who was pushing back on your timeline.',
      star_framework: {
        situation: 'Describe the context (e.g., "The VP of Sales wanted the new churn prediction model deployed in 2 weeks, but we needed 4 weeks for proper hyperparameter tuning and A/B testing").',
        task: 'Your goal was to manage expectations without using confusing jargon.',
        action: 'Explain the analogy you used. "Instead of explaining ROC-AUC or Gradient Boosting, I compared it to building a high-performance engine. I explained that we had the parts, but if we didn\'t calibrate it (tuning) and test drive it (A/B testing), it might break down on the highway (production). I provided a phased rollout plan."',
        result: 'The outcome. "The VP understood the risk of a premature launch, granted the 4 weeks, and the eventual A/B test showed a 5% increase in retention without any major bugs."'
      }
    }
  ],
  coding: [
    {
      id: 'cd_1',
      title: 'Python: Implement a basic Data Loader from scratch',
      difficulty: 'Medium',
      question: 'Write a Python class `BatchGenerator` that takes a list of data, a batch size, and yields batches of data iteratively. It should optionally shuffle the data before yielding.',
      solution_code: `import random

class BatchGenerator:
    def __init__(self, data, batch_size, shuffle=False):
        self.data = data
        self.batch_size = batch_size
        self.shuffle = shuffle
        if self.shuffle:
            random.shuffle(self.data)
            
    def __iter__(self):
        for i in range(0, len(self.data), self.batch_size):
            yield self.data[i:i + self.batch_size]

# Usage
dataset = list(range(1, 11))
loader = BatchGenerator(dataset, batch_size=3, shuffle=True)

for batch in loader:
    print(batch)`
    },
    {
      id: 'cd_2',
      title: 'SQL: Find the Top 3 Highest Paid Employees per Department',
      difficulty: 'Hard',
      question: 'Given an `Employee` table (Id, Name, Salary, DepartmentId) and a `Department` table (Id, Name), write a SQL query to find employees who earn the top three salaries in each department.',
      solution_code: `WITH RankedSalaries AS (
    SELECT 
        d.Name AS Department,
        e.Name AS Employee,
        e.Salary,
        DENSE_RANK() OVER (
            PARTITION BY d.Id 
            ORDER BY e.Salary DESC
        ) as SalaryRank
    FROM Employee e
    JOIN Department d ON e.DepartmentId = d.Id
)
SELECT Department, Employee, Salary
FROM RankedSalaries
WHERE SalaryRank <= 3;

-- Key concept: DENSE_RANK() ensures that if two people 
-- tie for 1st, the next person is ranked 2nd (not 3rd).`
    }
  ]
};
