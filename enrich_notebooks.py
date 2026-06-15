import os
import json
import glob
import re

SOURCE_DIR = r"C:\Users\91727\Desktop\DS_ML_Tutorial_NoteBooks_Jupyter\Python_DS_ML_Bootcamp-master"
TARGET_DATA_FILE = r"C:\Users\91727\Desktop\ML-Career-Roadmap\webapp\src\data\tutorialData.json"
TARGET_INDEX_FILE = r"C:\Users\91727\Desktop\ML-Career-Roadmap\webapp\src\data\codeSnippetIndex.json"

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

ROADMAP_LEVEL_MAP = {
    "01-Python-Crash-Course": 0,
    "02-Python-for-Data-Analysis-NumPy": 2,
    "03-Python-for-Data-Analysis-Pandas": 2,
    "05-Data-Visualization-with-Matplotlib": 3,
    "11-Linear-Regression": 4,
    "13-Logistic-Regression": 4,
    "14-K-Nearest-Neighbors": 4,
    "15-Decision-Trees-and-Random-Forests": 4,
    "16-Support-Vector-Machines": 4,
    "17-K-Means-Clustering": 4,
    "20-Natural-Language-Processing": 6,
    "22-Deep Learning": 5
}

def clean_content(source_list):
    if not source_list:
        return ""
    return "".join(source_list).strip()

def enrich_notebooks():
    tutorials = []
    code_snippet_index = {}

    for module in MODULES_TO_PARSE:
        module_path = os.path.join(SOURCE_DIR, module)
        if not os.path.exists(module_path):
            continue

        notebook_files = sorted(glob.glob(os.path.join(module_path, "*.ipynb")))

        for nb_file in notebook_files:
            if any(x in nb_file for x in ["Solutions", "Exercises", "Project"]):
                continue

            notebook_name = os.path.splitext(os.path.basename(nb_file))[0]
            
            try:
                with open(nb_file, 'r', encoding='utf-8') as f:
                    nb_data = json.load(f)
            except Exception as e:
                continue

            parsed_cells = []
            code_cell_count = 0
            key_terms = set()
            
            for cell in nb_data.get("cells", []):
                cell_type = cell.get("cell_type")
                content = clean_content(cell.get("source", []))

                if not content:
                    continue

                if cell_type == "markdown":
                    content = re.sub(r'<img[^>]+>', '', content)
                    parsed_cells.append({"type": "markdown", "content": content})
                elif cell_type == "code":
                    parsed_cells.append({"type": "code", "content": content})
                    code_cell_count += 1
                    
                    # Very basic term extraction for tags
                    if "import pandas" in content or "pd." in content: key_terms.add("pandas")
                    if "import numpy" in content or "np." in content: key_terms.add("numpy")
                    if "sklearn" in content: key_terms.add("sklearn")
                    if "matplotlib" in content or "plt." in content: key_terms.add("matplotlib")
                    if "seaborn" in content or "sns." in content: key_terms.add("seaborn")
                    if "Sequential" in content or "keras" in content or "tensorflow" in content: key_terms.add("deep-learning")

                    # Basic snippet mapping based on module name
                    concept_key = module.split('-')[-1].lower()
                    if concept_key not in code_snippet_index and len(content.split('\n')) > 3 and "import" in content:
                        code_snippet_index[concept_key] = content

            if parsed_cells:
                # Calculate difficulty
                diff = "beginner"
                if code_cell_count > 30: diff = "advanced"
                elif code_cell_count > 15: diff = "intermediate"

                tutorials.append({
                    "id": f"{module}-{notebook_name}".replace(" ", "-").lower(),
                    "module": module,
                    "title": notebook_name,
                    "roadmapLevel": ROADMAP_LEVEL_MAP.get(module, 0),
                    "tags": list(key_terms),
                    "difficulty": diff,
                    "estimatedReadMins": max(3, code_cell_count // 2),
                    "cells": parsed_cells
                })

    os.makedirs(os.path.dirname(TARGET_DATA_FILE), exist_ok=True)

    with open(TARGET_DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(tutorials, f, indent=2, ensure_ascii=False)
        
    with open(TARGET_INDEX_FILE, 'w', encoding='utf-8') as f:
        json.dump(code_snippet_index, f, indent=2, ensure_ascii=False)

    print(f"Enriched {len(tutorials)} notebooks.")

if __name__ == "__main__":
    enrich_notebooks()
