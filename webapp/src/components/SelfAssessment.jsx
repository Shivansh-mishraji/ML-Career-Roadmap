import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { assessmentQuestions } from '../data/roadmapData';

const SelfAssessment = () => {
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('ml-roadmap-assessment');
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  const toggleItem = (level, idx) => {
    const key = `${level}-${idx}`;
    const newItems = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(newItems);
    localStorage.setItem('ml-roadmap-assessment', JSON.stringify(newItems));
  };

  const getRecommendedLevel = () => {
    for (let i = 0; i < assessmentQuestions.length; i++) {
      const qCount = assessmentQuestions[i].questions.length;
      let allChecked = true;
      for (let j = 0; j < qCount; j++) {
        if (!checkedItems[`${i}-${j}`]) {
          allChecked = false;
          break;
        }
      }
      if (!allChecked) return i;
    }
    return 'Done!';
  };

  const recLevel = getRecommendedLevel();

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Where should you start?</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
          Most roadmaps tell you to "learn ML in 30 days." This is flawed. Check the boxes below honestly.
          Stop at the first Level where you cannot confidently check ALL the boxes. That is your exact starting point.
        </p>
      </div>

      <div className="glass-card" style={{ marginBottom: '3rem', borderLeft: '4px solid var(--accent-primary)' }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Recommended Starting Level:</h3>
        <p className="gradient-text" style={{ fontSize: '2rem', fontWeight: '700', margin: '0.5rem 0 0 0' }}>
          {recLevel === 'Done!' ? 'You are ready for Senior Roles!' : `Level ${recLevel}`}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {assessmentQuestions.map((levelBlock) => (
          <div key={levelBlock.level} className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ 
                background: 'var(--accent-glow)', 
                color: 'var(--accent-primary)', 
                width: '32px', height: '32px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                borderRadius: '50%' 
              }}>
                {levelBlock.level}
              </span>
              Level {levelBlock.level}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {levelBlock.questions.map((q, idx) => {
                const key = `${levelBlock.level}-${idx}`;
                const isChecked = !!checkedItems[key];
                return (
                  <div 
                    key={idx} 
                    onClick={() => toggleItem(levelBlock.level, idx)}
                    style={{ 
                      display: 'flex', alignItems: 'flex-start', gap: '1rem',
                      padding: '1rem',
                      background: isChecked ? 'rgba(46, 204, 113, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${isChecked ? 'rgba(46, 204, 113, 0.3)' : 'var(--glass-border)'}`,
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ color: isChecked ? 'var(--success)' : 'var(--text-muted)', marginTop: '2px' }}>
                      {isChecked ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                    </div>
                    <span style={{ color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {q}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelfAssessment;
