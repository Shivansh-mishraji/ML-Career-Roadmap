import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, Code, ChevronRight, CheckCircle, ExternalLink, Play } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import tutorialData from '../data/tutorialData.json';
import { recordNotebookAccess, markNotebookRead, getNotebookProgress } from '../utils/tutorialUtils';

const TutorialHub = ({ initialNotebookId }) => {
  const [activeNotebook, setActiveNotebook] = useState(null);
  const [progress, setProgress] = useState(getNotebookProgress());
  const [expandedLevels, setExpandedLevels] = useState([0, 2, 3, 4, 5, 6]);

  // Group notebooks by roadmap level
  const groupedTutorials = useMemo(() => {
    const groups = {};
    tutorialData.forEach(nb => {
      if (!groups[nb.roadmapLevel]) groups[nb.roadmapLevel] = [];
      groups[nb.roadmapLevel].push(nb);
    });
    return groups;
  }, []);

  useEffect(() => {
    if (initialNotebookId) {
      const nb = tutorialData.find(n => n.id === initialNotebookId);
      if (nb) handleSelectNotebook(nb);
    }
  }, [initialNotebookId]);

  const handleSelectNotebook = (nb) => {
    setActiveNotebook(nb);
    recordNotebookAccess(nb.id);
  };

  const handleMarkComplete = () => {
    if (activeNotebook) {
      markNotebookRead(activeNotebook.id);
      setProgress(getNotebookProgress());
    }
  };

  const toggleLevel = (level) => {
    if (expandedLevels.includes(level)) {
      setExpandedLevels(expandedLevels.filter(l => l !== level));
    } else {
      setExpandedLevels([...expandedLevels, level]);
    }
  };

  const renderSidebar = () => (
    <div style={{ width: '320px', borderRight: '1px solid var(--border-color)', height: '100%', overflowY: 'auto', paddingRight: '1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="gradient-text mono" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <BookOpen size={24} color="var(--accent-primary)" /> Library
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Execute code. Parse theory. Master algorithms.</p>
      </div>

      {Object.keys(groupedTutorials).sort((a, b) => Number(a) - Number(b)).map(level => (
        <div key={level} style={{ marginBottom: '1.5rem' }}>
          <button 
            onClick={() => toggleLevel(Number(level))}
            style={{ width: '100%', background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}
          >
            <h4 className="mono" style={{ fontSize: '1rem', margin: 0 }}>LEVEL_{level} DATA</h4>
            <ChevronRight size={18} style={{ transform: expandedLevels.includes(Number(level)) ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
          
          <AnimatePresence>
            {expandedLevels.includes(Number(level)) && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 'auto', opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden', marginTop: '0.5rem' }}
              >
                {groupedTutorials[level].map(nb => {
                  const isRead = progress[nb.id] === 'read';
                  const isActive = activeNotebook?.id === nb.id;
                  
                  return (
                    <motion.div 
                      key={nb.id}
                      whileHover={{ x: 5 }}
                      onClick={() => handleSelectNotebook(nb)}
                      style={{ 
                        padding: '0.75rem 1rem', 
                        margin: '0.5rem 0',
                        borderRadius: 'var(--radius-sm)',
                        background: isActive ? 'var(--bg-tertiary)' : 'transparent',
                        borderLeft: `2px solid ${isActive ? 'var(--accent-primary)' : 'transparent'}`,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: isActive ? '#fff' : 'var(--text-primary)', fontSize: '0.9rem', fontWeight: isActive ? 600 : 400 }}>{nb.title.replace(/^[0-9]+-/, '')}</span>
                        {isRead && <CheckCircle size={14} color="var(--success)" />}
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={12} /> {nb.estimatedReadMins}m</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Code size={12} /> {nb.difficulty}</span>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    if (!activeNotebook) return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        <BookOpen size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
        <p className="mono">Awaiting file selection...</p>
      </div>
    );

    return (
      <motion.div 
        key={activeNotebook.id}
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        style={{ flex: 1, paddingLeft: '2rem', height: '100%', overflowY: 'auto' }}
      >
        <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {activeNotebook.tags.map(tag => (
              <span key={tag} className="mono" style={{ background: 'var(--bg-tertiary)', color: 'var(--accent-primary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', border: '1px solid var(--border-hover)' }}>
                #{tag}
              </span>
            ))}
          </div>
          <h1 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '0.5rem', fontFamily: 'Space Grotesk' }}>{activeNotebook.title}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> {activeNotebook.estimatedReadMins} min read</span>
            <a href={`https://colab.research.google.com/github/Pierian-Data/Complete-Python-3-Bootcamp/blob/master/${activeNotebook.module}/${activeNotebook.title}.ipynb`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--warning)', background: 'rgba(245, 158, 11, 0.1)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)' }}>
              <Play size={14} /> Open in Colab <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="notebook-content">
          {activeNotebook.cells.map((cell, idx) => {
            if (cell.type === 'markdown') {
              return (
                <div key={idx} style={{ color: 'var(--text-primary)', lineHeight: '1.7', marginBottom: '1.5rem', fontSize: '1.05rem' }} dangerouslySetInnerHTML={{ __html: cell.content.replace(/# (.+)/g, '<h2 style="margin-top: 2rem; margin-bottom: 1rem; color: #fff;">$1</h2>').replace(/## (.+)/g, '<h3 style="margin-top: 1.5rem; margin-bottom: 0.75rem; color: #e2e8f0;">$1</h3>') }} />
              );
            }
            if (cell.type === 'code') {
              return (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  key={idx} 
                  className="code-cell" 
                  style={{ marginBottom: '2rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                >
                  <div style={{ background: '#1e1e1e', padding: '0.5rem 1rem', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono" style={{ color: '#8b5cf6', fontSize: '0.8rem' }}>Python</span>
                    <button onClick={() => navigator.clipboard.writeText(cell.content)} className="btn-ghost mono" style={{ fontSize: '0.75rem', color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}>Copy</button>
                  </div>
                  <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1.5rem', fontSize: '0.95rem' }}>
                    {cell.content}
                  </SyntaxHighlighter>
                </motion.div>
              );
            }
            return null;
          })}
        </div>

        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center', paddingBottom: '4rem' }}>
          <button onClick={handleMarkComplete} className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            {progress[activeNotebook.id] === 'read' ? <><CheckCircle size={20} /> Module Verified</> : 'Verify Completion'}
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', height: 'calc(100vh - 120px)' }}>
      {renderSidebar()}
      {renderContent()}
    </div>
  );
};

export default TutorialHub;
