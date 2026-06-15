import React, { useState, useEffect } from 'react';
import { CheckCircle, Play, ChevronRight, Terminal, Lock, Unlock, BookOpen, Clock, Code } from 'lucide-react';
import { roadmapData, assessmentQuestions } from '../data/roadmapData';
import { getNotebooksByLevel } from '../utils/tutorialUtils';
import { motion, AnimatePresence } from 'framer-motion';

const Roadmap = ({ userProfile, setActiveTab, setTutorialContext }) => {
  const [activeNode, setActiveNode] = useState(0);
  const [unlockedLevel, setUnlockedLevel] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('ml-roadmap-assessment');
    let maxUnlocked = 0;
    if (saved) {
      const checkedItems = JSON.parse(saved);
      for (let i = 0; i < assessmentQuestions.length; i++) {
        const qCount = assessmentQuestions[i].questions.length;
        let allChecked = true;
        for (let j = 0; j < qCount; j++) {
          if (!checkedItems[`${i}-${j}`]) {
            allChecked = false;
            break;
          }
        }
        if (allChecked) {
          maxUnlocked = i + 1;
        } else {
          break; // Stop at first incomplete level
        }
      }
    }
    setUnlockedLevel(Math.min(maxUnlocked, roadmapData.length - 1));
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="gradient-text mono" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>// Skill_Tree_Pipeline</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
          Data flow from foundations to production architecture. Modules unlock sequentially as you complete mastery checks in the Command Center.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Pipeline Nodes Sidebar */}
        <div style={{ position: 'relative', paddingLeft: '1.5rem', minWidth: '280px' }}>
          {/* Background Connector */}
          <div style={{
            position: 'absolute',
            left: '36px',
            top: '20px',
            bottom: '20px',
            width: '2px',
            background: 'var(--border-color)',
            zIndex: 0
          }}></div>
          
          {/* Active Glowing Connector */}
          <div style={{
            position: 'absolute',
            left: '36px',
            top: '20px',
            height: `${(unlockedLevel / (roadmapData.length - 1)) * 100}%`,
            width: '2px',
            background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary))',
            boxShadow: '0 0 10px var(--accent-primary)',
            zIndex: 1,
            transition: 'height 1s ease-in-out'
          }}></div>
          
          {roadmapData.map((levelData, idx) => {
            const isInternshipSkip = userProfile?.track === 'internship' && idx >= 7; // Skip MLOps, LLMs, Advanced SysDesign for interns
            const isActive = activeNode === idx;
            const isUnlocked = idx <= unlockedLevel || isInternshipSkip;
            
            return (
              <motion.div 
                whileHover={{ x: isUnlocked && !isInternshipSkip ? 5 : 0 }}
                key={levelData.level} 
                className={`pipeline-node ${isInternshipSkip ? 'skipped' : ''}`}
                onClick={() => { if (isUnlocked && !isInternshipSkip) setActiveNode(idx); }}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.2rem', 
                  marginBottom: '3rem',
                  cursor: isInternshipSkip ? 'not-allowed' : (isUnlocked ? 'pointer' : 'not-allowed'),
                  opacity: isInternshipSkip ? 0.3 : (isUnlocked ? 1 : 0.4),
                  transition: 'all 0.3s'
                }}
              >
                <div style={{
                  width: '28px', height: '28px',
                  borderRadius: '50%',
                  background: isActive ? 'var(--accent-primary)' : (isUnlocked ? 'var(--bg-tertiary)' : 'var(--bg-primary)'),
                  border: `2px solid ${isActive ? 'var(--accent-glow)' : (isUnlocked ? 'var(--accent-primary)' : 'var(--border-color)')}`,
                  boxShadow: isActive ? '0 0 15px var(--accent-primary)' : 'none',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isActive ? '#fff' : (isUnlocked ? 'var(--accent-primary)' : 'var(--text-muted)')
                }}>
                  {isInternshipSkip ? <Lock size={12} /> : (isUnlocked ? <CheckCircle size={14} /> : <Lock size={12} />)}
                </div>
                <div>
                  <h4 className="mono" style={{ color: isActive ? '#fff' : (isUnlocked && !isInternshipSkip ? 'var(--text-primary)' : 'var(--text-muted)'), margin: 0, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    LEVEL_{levelData.level}
                    {!isUnlocked && !isInternshipSkip && <span style={{ fontSize: '0.7rem', background: 'var(--bg-tertiary)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>LOCKED</span>}
                    {isInternshipSkip && <span style={{ fontSize: '0.7rem', background: 'var(--warning)', color: '#000', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 'bold' }}>SKIP FOR INTERNS</span>}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{levelData.title.split(':')[1]?.trim() || levelData.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Active Node Detail View */}
        <div style={{ flex: 1 }}>
          <AnimatePresence mode="wait">
            {roadmapData[activeNode] && (
              <motion.div 
                key={activeNode}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-panel" 
                style={{ padding: '2.5rem', borderTop: `4px solid ${roadmapData[activeNode].color || 'var(--accent-primary)'}` }}
              >
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                  <h2 className="mono" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', fontSize: '1.8rem' }}>
                    <Terminal size={28} color={roadmapData[activeNode].color || "var(--accent-primary)"} />
                    {roadmapData[activeNode].title}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', fontSize: '1.1rem' }}>{roadmapData[activeNode].subtitle}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  {roadmapData[activeNode].topics.map((topic, tIdx) => (
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      key={tIdx} className="glass-card" style={{ padding: '1.5rem', borderLeft: `2px solid ${roadmapData[activeNode].color || 'var(--accent-primary)'}` }}>
                      <h4 className="mono" style={{ color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.05rem' }}>
                        <ChevronRight size={18} color={roadmapData[activeNode].color || "var(--accent-primary)"} /> {topic.title}
                      </h4>
                      <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                        {topic.details.map((detail, dIdx) => (
                          <li key={dIdx} style={{ listStyleType: 'square' }}>{detail}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                <div style={{ background: 'var(--bg-tertiary)', padding: '2rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--success)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                  <h4 className="mono" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', marginBottom: '1.2rem', fontSize: '1.1rem' }}>
                    <Play size={20} /> Compilation & Verification Requirements
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {roadmapData[activeNode].actionItems.map((action, aIdx) => (
                      <li key={aIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', color: 'var(--text-primary)' }}>
                        <CheckCircle size={20} color="var(--success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span style={{ fontSize: '1rem', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: action.replace('Proof of Mastery:', '<strong class="mono" style="color: var(--warning); font-size: 0.9rem">[PROOF_OF_MASTERY]</strong>') }}></span>
                      </li>
                    ))}
                  </ul>
                </div>

                {getNotebooksByLevel(roadmapData[activeNode].level).length > 0 && (
                  <div style={{ marginTop: '2.5rem' }}>
                    <h4 className="mono" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                      <BookOpen size={24} color="var(--accent-primary)" /> Learn This Level
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                      {getNotebooksByLevel(roadmapData[activeNode].level).map(nb => (
                        <motion.div 
                          key={nb.id}
                          whileHover={{ scale: 1.03, y: -5 }}
                          onClick={() => {
                            if (setTutorialContext && setActiveTab) {
                              setTutorialContext({ activeNotebookId: nb.id });
                              setActiveTab('tutorials');
                            }
                          }}
                          className="glass-card"
                          style={{ padding: '1.25rem', cursor: 'pointer', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                        >
                          <h5 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>{nb.title.replace(/^[0-9]+-/, '')}</h5>
                          <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {nb.estimatedReadMins}m</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Code size={14} /> {nb.difficulty}</span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                            {nb.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="mono" style={{ background: 'var(--bg-tertiary)', color: 'var(--accent-primary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem' }}>#{tag}</span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Roadmap;
