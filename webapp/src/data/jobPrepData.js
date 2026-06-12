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
    },
    {
      id: 'sd_3',
      title: 'Design a Distributed Web Crawler for NLP Data',
      difficulty: 'Medium',
      scenario: 'Your LLM team needs to scrape and process 10 billion web pages to create a pre-training dataset similar to Common Crawl.',
      requirements: [
        'Must be distributed across hundreds of nodes.',
        'Must respect robots.txt and rate limits.',
        'Must handle deduplication at massive scale.'
      ],
      solution_framework: [
        '**1. URL Frontier (Queue):** Use a distributed queue like Apache Kafka or RabbitMQ to hold the list of URLs to be crawled. Partition the queue by domain to easily manage rate limiting per domain.',
        '**2. Worker Nodes:** Hundreds of stateless worker nodes pull URLs, fetch the HTML, and parse out new links. They push new links back to the URL Frontier.',
        '**3. Rate Limiting:** Workers check a centralized Redis cache to ensure the target domain hasn\'t been crawled too frequently in the last X seconds.',
        '**4. Deduplication (SimHash/MinHash):** Exact text matching is too slow for 10 billion pages. Use Locality-Sensitive Hashing (LSH) algorithms like MinHash to detect near-duplicate pages efficiently and discard them before saving to storage.',
        '**5. Storage:** Save the raw HTML to an Object Store (AWS S3). Run batch Apache Spark jobs overnight to strip HTML tags and extract clean text.'
      ]
    },
    {
      id: 'sd_4',
      title: 'Design a Ride-Matching System (Uber/Lyft)',
      difficulty: 'Hard',
      scenario: 'Design the backend system that pairs a rider with the nearest driver within seconds, minimizing wait time and dead mileage.',
      requirements: [
        'Real-time tracking of millions of drivers.',
        'Dispatching must happen in < 3 seconds.',
        'Surge pricing model must be integrated.'
      ],
      solution_framework: [
        '**1. Geospatial Indexing (Core Component):** You cannot scan a SQL table of all drivers. Divide the world into hexagonal grids using Uber\'s H3 or Google\'s S2 geometry library. Index active drivers into these hex grids using Redis Geo or a specialized geospatial DB like PostGIS.',
        '**2. Location Updates:** Drivers ping their GPS location every 3 seconds. Handle this massive write throughput using Kafka, which then updates the in-memory geospatial index.',
        '**3. Matching Algorithm:** When a rider requests a car, query the geospatial index for the 10 closest drivers. Send these pairs to an ML Ranking Service (XGBoost) that scores them based on ETA, traffic conditions, and driver acceptance probability.',
        '**4. Surge Pricing:** A separate Flink stream processes the ratio of (Riders Opening App) vs (Available Drivers) in a specific hex grid. If the ratio exceeds a threshold, it triggers a price multiplier.'
      ]
    },
    {
      id: 'sd_5',
      title: 'Design an Enterprise LLM RAG Pipeline',
      difficulty: 'Hard',
      scenario: 'Design a system that allows employees to ask natural language questions over 5 million internal confidential PDF documents securely.',
      requirements: [
        'High accuracy (minimal hallucination).',
        'Document-level access control (users can only query documents they have permission to see).',
        'Continuous ingestion of new PDFs.'
      ],
      solution_framework: [
        '**1. Ingestion & Chunking:** When a PDF is uploaded to S3, trigger an event. Extract text via OCR (if needed). Use Semantic Chunking (splitting by sentence/paragraph meaning rather than character count) to preserve context.',
        '**2. Embedding & Vector DB:** Pass chunks through an embedding model (e.g., text-embedding-3). Store the vectors in a Vector DB (Pinecone/Milvus) alongside metadata (Document ID, Access Control Tags).',
        '**3. Access Control (Crucial):** When an employee queries the system, the Vector DB search must include a metadata filter (`access_level <= user_level`). This ensures restricted documents are never even retrieved by the vector search.',
        '**4. Advanced Retrieval (HyDE & Reranking):** Implement a Cross-Encoder Reranker. The Vector DB retrieves the top 20 chunks incredibly fast. The heavier Cross-Encoder reranks them to find the top 3 most relevant chunks to feed to the LLM.',
        '**5. LLM Synthesis:** Feed the top 3 chunks + the user query into the LLM prompt. Include a strict system instruction: "Answer ONLY using the provided context. If the answer is not in the context, say \'I don\'t know\'."'
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
    },
    {
      id: 'bh_3',
      title: 'Disagreeing with a Technical Decision',
      category: 'Conflict Resolution',
      question: 'Tell me about a time you strongly disagreed with a Senior Engineer or Manager regarding an architectural choice. How did you resolve it?',
      star_framework: {
        situation: 'The context. "The lead engineer wanted to use a massive LLM for a simple classification task because it was trendy, but I knew it would cause severe latency and cost issues."',
        task: 'Your goal was to advocate for the right tool for the job without causing friction.',
        action: 'Focus on data-driven persuasion. "Instead of just arguing, I spent 4 hours over the weekend building a quick prototype using a much smaller XGBoost model. I benchmarked both models on latency, cloud cost, and accuracy. I presented the dashboard in our next sync, showing XGBoost was 50x cheaper, 100x faster, and only 2% less accurate."',
        result: 'The outcome. "Seeing the hard data, the lead engineer agreed to use the XGBoost model. We saved an estimated $10,000/month in compute costs while hitting all latency SLAs."'
      }
    },
    {
      id: 'bh_4',
      title: 'Working with Dirty Data',
      category: 'Grit & Problem Solving',
      question: 'Describe a project where you were handed an extremely messy or incomplete dataset. How did you salvage it to build a working model?',
      star_framework: {
        situation: 'The context. "I was tasked with building a customer LTV model, but the legacy CRM data was missing 40% of the target variables and had corrupted timestamps."',
        task: 'You needed to clean the data and establish a baseline model despite the chaos.',
        action: 'Detail the engineering. "I didn\'t just drop the rows. 1. I wrote a script to cross-reference billing logs to reconstruct the missing timestamps. 2. For the missing target variables, I used a semi-supervised learning approach (Label Propagation) to estimate the missing labels based on similar user clusters. 3. I heavily documented the assumptions made."',
        result: 'The outcome. "We launched a V1 model that was 65% accurate, which was vastly better than the previous heuristic approach. The documentation also forced the data engineering team to finally fix the root ingestion bug."'
      }
    },
    {
      id: 'bh_5',
      title: 'Prioritizing Technical Debt',
      category: 'Engineering Maturity',
      question: 'Tell me about a time you had to balance delivering a new ML feature against paying down significant MLOps technical debt.',
      star_framework: {
        situation: 'The context. "Product Management wanted 3 new features added to the Recommendation API, but our CI/CD pipeline was so brittle that deployments took 4 hours and failed frequently."',
        task: 'You needed to satisfy business needs while fixing the critical infrastructure.',
        action: 'The compromise. "I proposed a 70/30 split to the Product Manager. I committed to delivering the highest-priority feature first, but strictly time-boxed 30% of my sprint to migrating our deployment scripts to GitHub Actions and adding Docker caching."',
        result: 'The outcome. "We shipped the core feature on time. By the next sprint, the CI/CD migration reduced deployment times from 4 hours to 15 minutes, allowing us to ship the remaining features twice as fast."'
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
    },
    {
      id: 'cd_3',
      title: 'Python: Compute Intersection Over Union (IoU)',
      difficulty: 'Medium',
      question: 'In Object Detection, IoU is a critical metric. Write a Python function `calculate_iou(boxA, boxB)` where boxes are formatted as `[x_min, y_min, x_max, y_max]`.',
      solution_code: `def calculate_iou(boxA, boxB):
    # Determine the coordinates of the intersection rectangle
    xA = max(boxA[0], boxB[0])
    yA = max(boxA[1], boxB[1])
    xB = min(boxA[2], boxB[2])
    yB = min(boxA[3], boxB[3])

    # Compute the area of intersection rectangle
    interArea = max(0, xB - xA) * max(0, yB - yA)

    # Compute the area of both bounding boxes
    boxAArea = (boxA[2] - boxA[0]) * (boxA[3] - boxA[1])
    boxBArea = (boxB[2] - boxB[0]) * (boxB[3] - boxB[1])

    # Compute the intersection over union
    # iou = intersection_area / (boxA_area + boxB_area - intersection_area)
    iou = interArea / float(boxAArea + boxBArea - interArea)

    return iou

# Example Usage
# box: [x_min, y_min, x_max, y_max]
box1 = [50, 50, 150, 150]
box2 = [100, 100, 200, 200]
print(f"IoU: {calculate_iou(box1, box2):.4f}")`
    },
    {
      id: 'cd_4',
      title: 'Python: Sliding Window Average (O(N) Time)',
      difficulty: 'Easy',
      question: 'Given an array of integers and an integer `k`, compute the moving average of all contiguous subarrays of size `k` in O(N) time.',
      solution_code: `def moving_average(arr, k):
    if not arr or k <= 0 or k > len(arr):
        return []

    averages = []
    # Compute the sum of the first window
    window_sum = sum(arr[:k])
    averages.append(window_sum / k)

    # Slide the window across the array
    for i in range(k, len(arr)):
        # Add the new element, subtract the element that left the window
        window_sum = window_sum + arr[i] - arr[i - k]
        averages.append(window_sum / k)

    return averages

# Usage
arr = [1, 3, 2, 6, -1, 4, 1, 8, 2]
k = 3
print(moving_average(arr, k))`
    },
    {
      id: 'cd_5',
      title: 'SQL: Rolling 7-Day Active Users',
      difficulty: 'Extreme',
      question: 'Given a `UserLogins` table (UserId, LoginDate), write a query to calculate the number of unique users who logged in within the rolling 7-day period for each date.',
      solution_code: `WITH UniqueDailyLogins AS (
    -- Deduplicate so we only have 1 row per user per day
    SELECT DISTINCT UserId, LoginDate
    FROM UserLogins
)
SELECT 
    a.LoginDate as CurrentDate,
    COUNT(DISTINCT b.UserId) as Rolling_7_Day_Active_Users
FROM UniqueDailyLogins a
-- Join the table to itself to look back 6 days
JOIN UniqueDailyLogins b 
    ON b.LoginDate BETWEEN DATE_SUB(a.LoginDate, INTERVAL 6 DAY) 
    AND a.LoginDate
GROUP BY a.LoginDate
ORDER BY a.LoginDate;

-- Note: This requires a self-join because standard window 
-- functions cannot COUNT(DISTINCT) over a rolling frame in most dialects.`
    }
  ]
};
