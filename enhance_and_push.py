import os
import subprocess
import re

def enhance_markdown(content, filename):
    # Add emojis to headers
    content = re.sub(r'^#\s+', '🚀 # ', content, flags=re.MULTILINE)
    content = re.sub(r'^##\s+', '✨ ## ', content, flags=re.MULTILINE)
    content = re.sub(r'^###\s+', '🔍 ### ', content, flags=re.MULTILINE)
    
    # Add a visual mermaid diagram based on the file name
    diagram = ""
    if "MLOPS" in filename.upper() or "ML_ENGINEERING" in filename.upper():
        diagram = """
> [!NOTE]
> **MLOps Pipeline Architecture**

```mermaid
graph LR
    A[Data Ingestion] --> B[Data Preprocessing]
    B --> C[Model Training]
    C --> D[Model Evaluation]
    D --> E[Model Registry]
    E --> F[Model Deployment]
    F --> G[Monitoring & Logging]
```
"""
    elif "DSA" in filename.upper() or "LEETCODE" in filename.upper():
        diagram = """
> [!TIP]
> **DSA Preparation Roadmap for ML**

```mermaid
graph TD
    A[Arrays & Strings] --> B[Hash Maps]
    B --> C[Trees & Graphs]
    C --> D[Dynamic Programming]
    D --> E[System Design]
```
"""
    else:
        diagram = """
> [!TIP]
> **Document Workflow**

```mermaid
graph LR
    A[Review Concepts] --> B[Implement]
    B --> C[Test]
    C --> D[Deploy]
```
"""
    
    # Insert diagram after the first header, or at the top if no header
    if '🚀 #' in content:
        parts = content.split('\n', 1)
        if len(parts) > 1:
            content = parts[0] + '\n' + diagram + '\n' + parts[1]
    else:
        content = diagram + '\n' + content
        
    # Append a structured footer
    footer = "\n\n---\n*🎯 **Pro Tip**: Consistency is key in Machine Learning. Keep building and exploring!*"
    return content + footer

def enhance_python(content, filename):
    header = f'"""\n=================================================================\n'
    header += f' 🚀 File: {os.path.basename(filename)}\n'
    header += f' ✨ Purpose: Advanced Machine Learning Operations and Processing\n'
    header += f' 📅 Last Updated: 2026\n'
    header += f'=================================================================\n"""\n\n'
    
    # Add some section dividers if not present
    content = re.sub(r'def ', '# ' + '='*50 + '\n# Function Definition\n# ' + '='*50 + '\ndef ', content)
    
    return header + content

def enhance_config(content, filename):
    header = f'# {"="*50}\n# 🛠️ Configuration for {os.path.basename(filename)}\n# Ensure all paths and dependencies are correctly set.\n# {"="*50}\n\n'
    return header + content

def main():
    print("Fetching tracked files...")
    result = subprocess.run(['git', 'ls-files'], stdout=subprocess.PIPE, text=True)
    files = result.stdout.splitlines()
    
    for f in files:
        if not os.path.isfile(f):
            continue
            
        if f == 'push_all_files.py' or f == 'enhance_and_push.py':
            continue
            
        print(f"Enhancing {f}...")
        
        try:
            with open(f, 'r', encoding='utf-8') as file:
                content = file.read()
        except:
            continue
            
        # Check if already enhanced to avoid double processing
        if "=================================================================" in content or "🚀 #" in content or "🛠️ Configuration" in content:
            print(f"Skipping {f} (already enhanced)")
            continue

        if f.endswith('.md'):
            content = enhance_markdown(content, f)
        elif f.endswith('.py'):
            content = enhance_python(content, f)
        elif f.endswith('.yml') or f.endswith('.yaml') or 'requirements' in f or 'Dockerfile' in f:
            content = enhance_config(content, f)
        elif f.endswith('.ipynb'):
            print(f"Skipping {f} (Jupyter notebook)")
            continue
            
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
            
        # Git operations
        subprocess.run(['git', 'add', f])
        
        status = subprocess.run(['git', 'status', '--porcelain'], stdout=subprocess.PIPE, text=True)
        if not status.stdout.strip():
            continue
            
        commit_msg = f"✨ Enhanced {os.path.basename(f)} with rich visuals and structure"
        subprocess.run(['git', 'commit', '-m', commit_msg])
        
        # Push to github
        print(f"Pushing {f} to GitHub...")
        push_res = subprocess.run(['git', 'push', 'origin', 'main'], capture_output=True, text=True)
        
        if push_res.returncode == 0:
            print(f"Successfully pushed {f}")
        else:
            print(f"Failed to push {f}. Error: {push_res.stderr}")

if __name__ == '__main__':
    main()
