import json
import sys
import io
import contextlib
import ast
import traceback
import builtins
import time
import base64

# Patch input to prevent blocking
builtins.input = lambda prompt='': '0'

# Try to import matplotlib to capture plots
try:
    import matplotlib
    matplotlib.use('Agg') # Use non-interactive backend to prevent windows popping up
    import matplotlib.pyplot as plt
    has_matplotlib = True
except ImportError:
    has_matplotlib = False

file_path = 'c:/Users/91727/Desktop/ML-Career-Roadmap/webapp/src/data/tutorialData.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

print("Starting execution to capture textual AND visual outputs...")
start_time = time.time()

for notebook in data:
    env = {}
    for cell in notebook['cells']:
        if cell.get('type') == 'code':
            code = cell.get('content', '')
            
            # Clean up previously added comments from heuristic script
            lines = code.split('\n')
            clean_lines = []
            for line in lines:
                if line.startswith('# Execute ') or line.startswith('# Import ') or line.startswith('# Generate ') or line.startswith('# Inspect ') or line.startswith('# Calculate ') or line.startswith('# Initialize ') or line.startswith('# Define ') or line.startswith('# Output: ') or line.startswith('#         ') or line.startswith('# Console Output:') or line.startswith('# Numeric Value'):
                    continue
                clean_lines.append(line)
            
            code = '\n'.join(clean_lines).strip()
            if not code:
                continue

            output_str = ""
            img_b64 = None

            # Clear plots before running cell
            if has_matplotlib:
                plt.close('all')

            try:
                f_io = io.StringIO()
                with contextlib.redirect_stdout(f_io):
                    tree = ast.parse(code)
                    if len(tree.body) > 0 and isinstance(tree.body[-1], ast.Expr):
                        last_expr = tree.body.pop()
                        if tree.body:
                            exec(compile(tree, '<string>', 'exec'), env)
                        result = eval(compile(ast.Expression(last_expr.value), '<string>', 'eval'), env)
                        if result is not None:
                            if 'pandas.core.frame.DataFrame' in str(type(result)) or 'pandas.core.series.Series' in str(type(result)):
                                print(result)
                            else:
                                print(repr(result))
                    else:
                        exec(code, env)
                output_str = f_io.getvalue().strip()
                
                # Check for generated plots
                if has_matplotlib and plt.get_fignums():
                    buf = io.BytesIO()
                    plt.savefig(buf, format='png', bbox_inches='tight')
                    buf.seek(0)
                    img_b64 = base64.b64encode(buf.read()).decode('utf-8')
                    plt.close('all')

            except Exception as e:
                error_type = type(e).__name__
                if error_type in ['NameError', 'ModuleNotFoundError', 'ImportError']:
                    output_str = ""  # Hide messy unimported module errors from the tutorial UI
                else:
                    output_str = f"{error_type}: {str(e)}"

            final_code = code
            if output_str:
                if len(output_str) > 2000:
                    output_str = output_str[:2000] + "\n... [Output Truncated]"
                
                commented_output = "\n".join([f"# Output: {line}" if i==0 else f"#         {line}" for i, line in enumerate(output_str.split('\n'))])
                final_code = f"{code}\n\n{commented_output}"
            
            cell['content'] = final_code
            if img_b64:
                cell['image_output'] = f"data:image/png;base64,{img_b64}"
            elif 'image_output' in cell:
                # Remove if the cell no longer generates an image
                del cell['image_output']

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print(f"Successfully executed python logic and saved outputs in {time.time() - start_time:.2f} seconds.")
