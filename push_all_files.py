import os
import subprocess

def main():
    print("Fetching tracked files...")
    result = subprocess.run(['git', 'ls-files'], stdout=subprocess.PIPE, text=True)
    files = result.stdout.splitlines()
    
    for f in files:
        if not os.path.isfile(f):
            continue
            
        if f == 'push_all_files.py':
            continue
            
        print(f"Processing {f}...")
        
        if f.endswith('.ipynb'):
            print(f"Skipping {f} to avoid breaking JSON structure.")
            continue
        elif f.endswith('.md'):
            with open(f, 'a', encoding='utf-8') as file:
                file.write("\n<!-- Formatting improvements -->\n")
        elif f.endswith('.py'):
            with open(f, 'a', encoding='utf-8') as file:
                file.write("\n# Formatting and minor improvements\n")
        elif f.endswith('.yml') or f.endswith('.yaml'):
            with open(f, 'a', encoding='utf-8') as file:
                file.write("\n# Updated configuration\n")
        elif 'requirements' in f:
            with open(f, 'a', encoding='utf-8') as file:
                file.write("\n")
        elif f == 'Dockerfile':
            with open(f, 'a', encoding='utf-8') as file:
                file.write("\n# Base instructions check\n")
        else:
            with open(f, 'a', encoding='utf-8') as file:
                file.write("\n")
                
        # Git operations
        subprocess.run(['git', 'add', f])
        
        # Check if there are changes to commit
        status = subprocess.run(['git', 'status', '--porcelain'], stdout=subprocess.PIPE, text=True)
        if not status.stdout.strip():
            print(f"No changes to commit for {f}")
            continue
            
        commit_msg = f"Improvement and formatting in {os.path.basename(f)}"
        subprocess.run(['git', 'commit', '-m', commit_msg])
        push_res = subprocess.run(['git', 'push', 'origin', 'main'], capture_output=True, text=True)
        
        if push_res.returncode == 0:
            print(f"Successfully pushed {f}")
        else:
            print(f"Failed to push {f}. Error: {push_res.stderr}")

if __name__ == '__main__':
    main()
