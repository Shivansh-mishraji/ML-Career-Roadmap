# ==================================================
# 🛠️ Configuration for Dockerfile
# Ensure all paths and dependencies are correctly set.
# ==================================================

# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy requirements and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY src/ src/

# Expose port for FastAPI
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "src.serve_model:app", "--host", "0.0.0.0", "--port", "8000"]
 