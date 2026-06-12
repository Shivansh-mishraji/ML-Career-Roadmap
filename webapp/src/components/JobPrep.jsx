import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Users, Code, ChevronRight } from 'lucide-react';
import { jobPrepData } from '../data/jobPrepData';

const JobPrep = () => {
  const [activeMode, setActiveMode] = useState('system_design');
  const [activeItem, setActiveItem] = useState(null);

  const renderContent = () => {
    if (activeMode === 'system_design') {
      return (
        <div style={{ display: 'grid', gap: '2rem' }}>
          {jobPrepData.system_design.map(item => (
            <motion.div key={item.id} className="glass-card" onClick={() => setActiveItem(activeItem === item.id ? null : item.id)} style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="mono" style={{ color: 'var(--text-primary)', fontSize: '1.2rem' }}>{item.title}</h3>
                <span className="mono" style={{ color: item.difficulty === 'Extreme' ? 'var(--danger)' : 'var(--warning)', background: 'var(--bg-tertiary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                  {item.difficulty}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>{item.scenario}</p>
              
              <AnimatePresence>
                {activeItem === item.id && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden', marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                    <h4 className="gradient-text mono" style={{ marginBottom: '1rem' }}>Core Requirements:</h4>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                      {item.requirements.map((req, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{req}</li>)}
                    </ul>
                    
                    <h4 className="gradient-text mono" style={{ marginBottom: '1rem' }}>Solution Architecture:</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {item.solution_framework.map((step, i) => (
                        <div key={i} style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--accent-primary);">$1</strong>') }} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      );
    }

    if (activeMode === 'behavioral') {
      return (
        <div style={{ display: 'grid', gap: '2rem' }}>
          {jobPrepData.behavioral.map(item => (
            <motion.div key={item.id} className="glass-card" onClick={() => setActiveItem(activeItem === item.id ? null : item.id)} style={{ cursor: 'pointer', borderLeft: '4px solid var(--accent-secondary)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-secondary)', textTransform: 'uppercase', tracking: 'widest' }}>{item.category}</span>
              <h3 className="mono" style={{ color: 'var(--text-primary)', fontSize: '1.2rem', marginTop: '0.5rem', marginBottom: '1rem' }}>{item.title}</h3>
              <p style={{ color: '#fff', fontStyle: 'italic', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', borderLeft: '2px solid var(--border-color)' }}>
                "{item.question}"
              </p>
              
              <AnimatePresence>
                {activeItem === item.id && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden', marginTop: '2rem' }}>
                    <h4 className="mono" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>STAR Framework Answer:</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
                        <strong style={{ color: 'var(--accent-primary)', display: 'block', marginBottom: '0.5rem' }}>Situation:</strong>
                        <span style={{ color: 'var(--text-secondary)' }}>{item.star_framework.situation}</span>
                      </div>
                      <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
                        <strong style={{ color: 'var(--warning)', display: 'block', marginBottom: '0.5rem' }}>Task:</strong>
                        <span style={{ color: 'var(--text-secondary)' }}>{item.star_framework.task}</span>
                      </div>
                      <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
                        <strong style={{ color: 'var(--danger)', display: 'block', marginBottom: '0.5rem' }}>Action:</strong>
                        <span style={{ color: 'var(--text-secondary)' }}>{item.star_framework.action}</span>
                      </div>
                      <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
                        <strong style={{ color: 'var(--success)', display: 'block', marginBottom: '0.5rem' }}>Result:</strong>
                        <span style={{ color: 'var(--text-secondary)' }}>{item.star_framework.result}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      );
    }

    if (activeMode === 'coding') {
      return (
        <div style={{ display: 'grid', gap: '2rem' }}>
          {jobPrepData.coding.map(item => (
            <motion.div key={item.id} className="glass-card" onClick={() => setActiveItem(activeItem === item.id ? null : item.id)} style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="mono" style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>{item.title}</h3>
                <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.difficulty}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>{item.question}</p>
              
              <AnimatePresence>
                {activeItem === item.id && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden', marginTop: '2rem' }}>
                    <div style={{ background: '#0d1117', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', position: 'relative' }}>
                      <span style={{ position: 'absolute', top: '0', right: '0', background: 'var(--border-color)', color: 'var(--text-muted)', padding: '0.2rem 0.5rem', fontSize: '0.7rem', borderBottomLeftRadius: '8px' }}>SOLUTION</span>
                      <pre style={{ margin: 0, overflowX: 'auto' }}>
                        <code style={{ color: '#c9d1d9', fontFamily: 'Fira Code', fontSize: '0.9rem' }}>
                          {item.solution_code}
                        </code>
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      );
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="gradient-text mono" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>// Mock_Interviews</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
          Simulate real-world FAANG interviews. Practice System Design on the whiteboard, structure your Behavioral answers using STAR, and review essential Coding algorithms.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <button 
          onClick={() => { setActiveMode('system_design'); setActiveItem(null); }}
          className={activeMode === 'system_design' ? 'btn-primary' : 'btn-outline'}
          style={{ padding: '0.8rem 1.5rem' }}
        >
          <Server size={18} /> System Design
        </button>
        <button 
          onClick={() => { setActiveMode('behavioral'); setActiveItem(null); }}
          className={activeMode === 'behavioral' ? 'btn-primary' : 'btn-outline'}
          style={{ padding: '0.8rem 1.5rem' }}
        >
          <Users size={18} /> Behavioral (STAR)
        </button>
        <button 
          onClick={() => { setActiveMode('coding'); setActiveItem(null); }}
          className={activeMode === 'coding' ? 'btn-primary' : 'btn-outline'}
          style={{ padding: '0.8rem 1.5rem' }}
        >
          <Code size={18} /> Coding & SQL
        </button>
      </div>

      {/* Main Content Area */}
      {renderContent()}

    </motion.div>
  );
};

export default JobPrep;
