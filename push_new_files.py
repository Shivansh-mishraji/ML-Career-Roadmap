import logging

logger = logging.getLogger(__name__)

"""
Push New Files module.
Part of the ML-Career-Roadmap package.
"""

import os
import subprocess

def main():
    print("Adding all new files...")
    # Add all files to staging
    subprocess.run(['git', 'add', '.'])

    # Get all staged files
    result = subprocess.run(['git', 'status', '--porcelain'], stdout=subprocess.PIPE, text=True)
    lines = result.stdout.splitlines()

    if not lines:
        print("No files to commit.")
        return

    print(f"Found {len(lines)} files to commit and push one by one.")

    # Unstage everything first so we can add them one by one
    subprocess.run(['git', 'reset'])

    for line in lines:
        if not line:
            continue
        # Status format is like "A  path/to/file" or " M path/to/file"
        # The file path starts from index 3
        file_path = line[3:].strip()

        # Handle renames e.g. "R  old -> new"
        if " -> " in file_path:
            file_path = file_path.split(" -> ")[1]

        print(f"\nProcessing {file_path}...")

        # Add, commit, push
        subprocess.run(['git', 'add', file_path])

        # Commit
        file_basename = os.path.basename(file_path)
        commit_msg = f"feat: Integrate AI & Redesign for {file_basename}"
        subprocess.run(['git', 'commit', '-m', commit_msg])

        # Push
        push_result = subprocess.run(['git', 'push', 'origin', 'main'], capture_output=True, text=True)
        if push_res.returncode == 0:
            print(f"Successfully pushed {file_path}")
        else:
            print(f"Failed to push {file_path}. Error: {push_res.stderr}")

if __name__ == '__main__':
    main()
