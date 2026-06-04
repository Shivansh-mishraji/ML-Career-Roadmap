# 🧠 Interactive Template: Build a Multi-Modal RAG Assistant

Retrieval-Augmented Generation (RAG) is the most sought-after skill in Generative AI right now. This template will guide you through building a real-time, interactive chat application that can answer questions based on your own PDF documents.

## 🎯 The Goal
Build a Streamlit web app where a user can upload a PDF and ask an LLM questions about the document's content.

---

## 🛠️ Prerequisites
Make sure your environment is set up.

```bash
# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install required libraries
pip install streamlit langchain langchain-openai pypdf chromadb tiktoken
```

> [!NOTE]
> You will need an OpenAI API key for this specific template. You can replace `ChatOpenAI` and `OpenAIEmbeddings` with HuggingFace alternatives (like `Ollama` for local LLMs) if you want a free, offline version.

---

## 💻 Step-by-Step Code Walkthrough

### 1. Project Structure
Create a new folder for this project and set up the following files:
```text
rag-assistant/
├── app.py           # The Streamlit application
├── .env             # Your API keys (NEVER commit this to GitHub)
├── requirements.txt # Project dependencies
└── README.md        # Your project explanation
```

### 2. The Core Application (`app.py`)

Create `app.py` and copy this code. We've added extensive comments so you understand *why* each line exists.

```python
import streamlit as st
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
import os
import tempfile

# ---------------------------------------------------------
# 1. Configuration & Setup
# ---------------------------------------------------------
st.set_page_config(page_title="RAG PDF Assistant", layout="wide")
st.title("📚 Chat with your PDF (RAG Pipeline)")

# Sidebar for API Key input (better than hardcoding for portfolio projects!)
api_key = st.sidebar.text_input("Enter OpenAI API Key", type="password")
os.environ["OPENAI_API_KEY"] = api_key

# ---------------------------------------------------------
# 2. File Upload & Processing
# ---------------------------------------------------------
uploaded_file = st.file_uploader("Upload a PDF document", type="pdf")

if uploaded_file and api_key:
    # We need to save the uploaded file temporarily so PyPDFLoader can read it
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
        tmp_file.write(uploaded_file.getvalue())
        tmp_file_path = tmp_file.name

    with st.spinner("Processing document... (Reading, Chunking, Embedding)"):
        # A. Load the Document
        loader = PyPDFLoader(tmp_file_path)
        documents = loader.load()

        # B. Chunking the Text
        # LLMs have context limits. We split the document into smaller chunks.
        # overlap=200 ensures we don't cut off a sentence right in the middle of a thought.
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000, 
            chunk_overlap=200
        )
        chunks = text_splitter.split_documents(documents)

        # C. Embeddings & Vector Database
        # Convert text chunks into numbers (vectors) and store them in ChromaDB
        embeddings = OpenAIEmbeddings()
        vectorstore = Chroma.from_documents(chunks, embeddings)

        # D. The Retriever
        # This object will handle searching the vector database for the most relevant chunks
        retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

        # E. The LLM Chain
        # Connect the LLM with our retriever
        llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff", # "stuff" means stuff all retrieved chunks into the prompt
            retriever=retriever
        )

    st.success("Document processed and stored in Vector Database!")
    
    # ---------------------------------------------------------
    # 3. Interactive Chat Interface
    # ---------------------------------------------------------
    st.markdown("### Ask a Question")
    user_question = st.text_input("E.g., What is the main conclusion of this report?")

    if user_question:
        with st.spinner("Thinking..."):
            # Run the query through our RAG chain
            response = qa_chain.run(user_question)
            
            st.markdown("#### Answer:")
            st.info(response)

elif not api_key:
    st.warning("Please enter your OpenAI API key in the sidebar to begin.")
```

---

## 🚀 How to Run It

1. Open your terminal in the `rag-assistant` folder.
2. Run the Streamlit app:
   ```bash
   streamlit run app.py
   ```
3. A browser window will automatically open. Upload a PDF (like a research paper or your resume) and start asking questions!

---

## 🧠 Interview Talking Points (How to talk about this project)

When an interviewer asks about this project, do **not** just say "I used LangChain."

**Say this instead:**
> "I built an end-to-end Retrieval-Augmented Generation system. I handled document ingestion and implemented a `RecursiveCharacterTextSplitter` to optimize the context window for the LLM. I used ChromaDB for vector storage because of its low-latency local retrieval. The biggest challenge was finding the right chunk overlap size to maintain semantic meaning across paragraphs without overflowing the LLM's context limit."

This shows you understand the *engineering trade-offs*, not just the API calls.

<!-- Formatting improvements -->
