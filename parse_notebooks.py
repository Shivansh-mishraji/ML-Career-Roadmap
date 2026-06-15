import os
import json
import glob

# Configuration
SOURCE_DIR = r"C:\Users\91727\Desktop\DS_ML_Tutorial_NoteBooks_Jupyter\Python_DS_ML_Bootcamp-master"
TARGET_FILE = r"C:\Users\91727\Desktop\ML-Career-Roadmap\webapp\src\data\tutorialData.json"

# List of modules we want to extract
MODULES_TO_PARSE = [
    "01-Python-Crash-Course",
    "02-Python-for-Data-Analysis-NumPy",
    "03-Python-for-Data-Analysis-Pandas",
    "05-Data-Visualization-with-Matplotlib",
    "11-Linear-Regression",
    "13-Logistic-Regression",
    "14-K-Nearest-Neighbors",
    "15-Decision-Trees-and-Random-Forests",
    "16-Support-Vector-Machines",
    "17-K-Means-Clustering",
    "20-Natural-Language-Processing",
    "22-Deep Learning"
]

def clean_content(source_list):
    """Joins a list of source strings and strips unnecessary newlines."""
    if not source_list:
        return ""
    return "".join(source_list).strip()

def parse_notebooks():
    tutorials = []

    for module in MODULES_TO_PARSE:
        module_path = os.path.join(SOURCE_DIR, module)
        if not os.path.exists(module_path):
            print(f"Warning: Module path does not exist: {module_path}")
            continue

        # Find all .ipynb files in the module
        notebook_files = glob.glob(os.path.join(module_path, "*.ipynb"))
        
        # Sort them so they appear in a logical order
        notebook_files.sort()

        for nb_file in notebook_files:
            # Skip solutions or project exercises to keep the tutorial hub focused on concepts
            if "Solutions" in nb_file or "Exercises" in nb_file or "Project" in nb_file:
                continue

            notebook_name = os.path.splitext(os.path.basename(nb_file))[0]
            print(f"Parsing: {module} / {notebook_name}")

            try:
                with open(nb_file, 'r', encoding='utf-8') as f:
                    nb_data = json.load(f)
            except Exception as e:
                print(f"Error reading {nb_file}: {e}")
                continue

            parsed_cells = []
            
            for cell in nb_data.get("cells", []):
                cell_type = cell.get("cell_type")
                source = cell.get("source", [])
                content = clean_content(source)

                # Skip empty cells
                if not content:
                    continue

                if cell_type == "markdown":
                    # Remove HTML img tags as they usually point to local images we won't host
                    import re
                    content = re.sub(r'<img[^>]+>', '', content)
                    parsed_cells.append({"type": "markdown", "content": content})
                elif cell_type == "code":
                    parsed_cells.append({"type": "code", "content": content})

            # Only add if we found valid cells
            if parsed_cells:
                tutorials.append({
                    "id": f"{module}-{notebook_name}".replace(" ", "-").lower(),
                    "module": module,
                    "title": notebook_name,
                    "cells": parsed_cells
                })

    # Ensure target directory exists
    os.makedirs(os.path.dirname(TARGET_FILE), exist_ok=True)

    with open(TARGET_FILE, 'w', encoding='utf-8') as f:
        json.dump(tutorials, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully generated tutorial data at {TARGET_FILE} with {len(tutorials)} notebooks.")

if __name__ == "__main__":
    parse_notebooks()
