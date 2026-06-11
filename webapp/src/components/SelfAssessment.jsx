import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Zap } from 'lucide-react';
import { assessmentQuestions } from '../data/roadmapData';
import ProgressGraph from './ProgressGraph';

const SelfAssessment = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [activityCount, setActivityCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('ml-roadmap-assessment');
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
    const activity = parseInt(localStorage.getItem('ml-activity') || '0');
    // Calculate total active count: checked items + flashcard activity
    const checkedCount = saved ? Object.keys(JSON.parse(saved)).filter(k => JSON.parse(saved)[k]).length : 0;
    setActivityCount(activity + checkedCount);
  }, []);

  const toggleItem = (level, idx) => {
    const key = `${level}-${idx}`;
    const newItems = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(newItems);
    localStorage.setItem('ml-roadmap-assessment', JSON.stringify(newItems));
    
    // Update activity
    const activity = parseInt(localStorage.getItem('ml-activity') || '0');
    const checkedCount = Object.keys(newItems).filter(k => newItems[k]).length;
    setActivityCount(activity + checkedCount);
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
    return 'READY_FOR_DEPLOYMENT';
  };

  const recLevel = getRecommendedLevel();

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="gradient-text mono" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>// Self_Assessment</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
          Evaluate your current state. Stop at the first block where assertions fail.
        </p>
      </div>

      <ProgressGraph activeCount={activityCount} />

      <div className="glass-card" style={{ marginBottom: '3rem', borderLeft: '4px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 className="mono" style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>RECOMMENDED_ENTRY_POINT</h3>
          <p className="gradient-accent mono" style={{ fontSize: '2rem', fontWeight: '700', margin: '0.2rem 0 0 0' }}>
            {recLevel === 'READY_FOR_DEPLOYMENT' ? 'SYS.DEPLOY_SENIOR()' : `LEVEL_${recLevel}`}
          </p>
        </div>
        <Zap size={32} color="var(--accent-primary)" style={{ opacity: 0.5 }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {assessmentQuestions.map((levelBlock) => (
          <div key={levelBlock.level} className="glass-panel" style={{ padding: '2rem' }}>
            <h3 className="mono" style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ 
                background: 'var(--bg-tertiary)', 
                color: 'var(--text-primary)', 
                border: '1px solid var(--border-color)',
                width: '32px', height: '32px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                borderRadius: 'var(--radius-sm)' 
              }}>
                {levelBlock.level}
              </span>
              Level_{levelBlock.level} Assertions
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
                      background: isChecked ? 'var(--success-bg)' : 'var(--bg-tertiary)',
                      border: `1px solid ${isChecked ? 'var(--success)' : 'var(--border-color)'}`,
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ color: isChecked ? 'var(--success)' : 'var(--text-muted)', marginTop: '2px' }}>
                      {isChecked ? <CheckSquare size={20} /> : <Square size={20} />}
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
