import tutorialData from '../data/tutorialData.json';

// Get notebooks for a specific roadmap level
export const getNotebooksByLevel = (level) => {
  return tutorialData.filter(nb => nb.roadmapLevel === level);
};

// Auto-generate flashcards from code snippets in notebooks
export const generateCodeDecks = () => {
  const decks = [
    { id: 'code_numpy', title: 'NumPy Coding Patterns', description: 'Auto-generated from Notebooks', questions: [] },
    { id: 'code_pandas', title: 'Pandas Data Manipulation', description: 'Auto-generated from Notebooks', questions: [] },
    { id: 'code_sklearn', title: 'Scikit-Learn ML Pipelines', description: 'Auto-generated from Notebooks', questions: [] },
    { id: 'code_viz', title: 'Data Visualization', description: 'Auto-generated from Notebooks', questions: [] }
  ];

  let numpyQ = 1;
  let pandasQ = 1;
  let sklearnQ = 1;
  let vizQ = 1;

  tutorialData.forEach(nb => {
    // Only extract from intermediate/advanced to avoid simple print statements
    if (nb.difficulty === 'beginner' && nb.module !== "02-Python-for-Data-Analysis-NumPy") return;

    nb.cells.forEach(cell => {
      if (cell.type === 'code' && cell.content.split('\\n').length > 1 && cell.content.split('\\n').length <= 10) {
        
        if (nb.tags.includes('numpy') && decks[0].questions.length < 15) {
          decks[0].questions.push({
            id: `numpy_q${numpyQ++}`,
            topic: nb.title,
            question: "What is the output or purpose of this code block?",
            answer: `**Code Implementation:**\\n\\n\`\`\`python\\n${cell.content}\\n\`\`\`\\n\\n*Review this pattern carefully.*`
          });
        } else if (nb.tags.includes('pandas') && decks[1].questions.length < 15) {
          decks[1].questions.push({
            id: `pandas_q${pandasQ++}`,
            topic: nb.title,
            question: "How do you achieve this Pandas operation?",
            answer: `**Canonical Implementation:**\\n\\n\`\`\`python\\n${cell.content}\\n\`\`\`\\n\\n*Standard data manipulation pattern.*`
          });
        } else if (nb.tags.includes('sklearn') && decks[2].questions.length < 15) {
          decks[2].questions.push({
            id: `sklearn_q${sklearnQ++}`,
            topic: nb.title,
            question: "What is the standard Scikit-Learn implementation for this model?",
            answer: `**Standard Sklearn API Usage:**\\n\\n\`\`\`python\\n${cell.content}\\n\`\`\`\\n\\n*Remember the fit/predict pattern.*`
          });
        } else if ((nb.tags.includes('matplotlib') || nb.tags.includes('seaborn')) && decks[3].questions.length < 15) {
          decks[3].questions.push({
            id: `viz_q${vizQ++}`,
            topic: nb.title,
            question: "How do you visualize this using Matplotlib/Seaborn?",
            answer: `**Visualization Snippet:**\\n\\n\`\`\`python\\n${cell.content}\\n\`\`\`\\n\\n*Ensure you understand the plotting syntax.*`
          });
        }
      }
    });
  });

  return decks.filter(d => d.questions.length > 0);
};

// Get recent history
export const getRecentNotebooks = () => {
  const history = JSON.parse(localStorage.getItem('ml-tutorial-history') || '[]');
  return history.map(id => tutorialData.find(nb => nb.id === id)).filter(Boolean).slice(0, 3);
};

// Record notebook access
export const recordNotebookAccess = (id) => {
  const history = JSON.parse(localStorage.getItem('ml-tutorial-history') || '[]');
  const newHistory = [id, ...history.filter(h => h !== id)].slice(0, 10);
  localStorage.setItem('ml-tutorial-history', JSON.stringify(newHistory));
};

// Progress tracking
export const markNotebookRead = (id) => {
  const progress = JSON.parse(localStorage.getItem('ml-tutorial-progress') || '{}');
  progress[id] = 'read';
  localStorage.setItem('ml-tutorial-progress', JSON.stringify(progress));
};

export const getNotebookProgress = () => {
  return JSON.parse(localStorage.getItem('ml-tutorial-progress') || '{}');
};
