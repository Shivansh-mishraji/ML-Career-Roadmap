import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, Code, ChevronRight, CheckCircle, ExternalLink, Play, Sparkles, Terminal, Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import tutorialData from '../data/tutorialData.json';
import { recordNotebookAccess, markNotebookRead, getNotebookProgress } from '../utils/tutorialUtils';

/* ── Cinematic Empty State Orb ── */
const HolographicOrb = () => (
  <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute', inset: 0,
        border: '1px dashed rgba(0,229,255,0.4)', borderRadius: '50%',
        boxShadow: '0 0 20px rgba(0,229,255,0.1)',
      }}
    />
    <motion.div
      animate={{ rotate: -360, scale: [1, 1.05, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute', inset: '15px',
        border: '2px solid rgba(155,109,255,0.3)', borderRadius: '50%',
        boxShadow: 'inset 0 0 15px rgba(155,109,255,0.2)',
      }}
    />
    <BookOpen size={36} color="rgba(77,159,255,0.8)" style={{ filter: 'drop-shadow(0 0 10px rgba(77,159,255,0.5))' }} />
  </div>
);

const TutorialHub = ({ initialNotebookId }) => {
  const [activeNotebook, setActiveNotebook] = useState(null);
  const [progress, setProgress] = useState(getNotebookProgress());
  const [expandedLevels, setExpandedLevels] = useState([0, 2, 3, 4, 5, 6]);

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

  /* ── 1. Library Sidebar ── */
  const renderSidebar = () => (
    <div style={{
      width: '340px', height: '100%', overflowY: 'auto',
      padding: '1.5rem 1.5rem 1.5rem 0',
      borderRight: '1px solid rgba(255,255,255,0.05)',
      display: 'flex', flexDirection: 'column', gap: '1rem',
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.4rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #00E5FF, #4D9FFF, #9B6DFF)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', letterSpacing: '-0.02em',
        }}>
          <BookOpen size={22} color="#00E5FF" /> Library
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
          Execute code. Parse theory. Master algorithms.
        </p>
      </div>

      {Object.keys(groupedTutorials).sort((a, b) => Number(a) - Number(b)).map(level => (
        <div key={level} style={{ marginBottom: '0.5rem' }}>
          <button
            onClick={() => toggleLevel(Number(level))}
            style={{
              width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              color: 'var(--text-primary)', cursor: 'pointer', padding: '0.8rem 1rem',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
          >
            <h4 style={{ fontFamily: "'Geist Mono', monospace", fontSize: '0.8rem', letterSpacing: '0.08em', margin: 0, color: '#4D9FFF' }}>
              LEVEL_{level} DATA
            </h4>
            <ChevronRight size={16} style={{ transform: expandedLevels.includes(Number(level)) ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }} />
          </button>

          <AnimatePresence>
            {expandedLevels.includes(Number(level)) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ padding: '0.5rem 0 0.5rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {groupedTutorials[level].map(nb => {
                    const isRead = progress[nb.id] === 'read';
                    const isActive = activeNotebook?.id === nb.id;

                    return (
                      <motion.div
                        key={nb.id}
                        whileHover={{ x: 4, backgroundColor: isActive ? 'rgba(77,159,255,0.12)' : 'rgba(255,255,255,0.04)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectNotebook(nb)}
                        style={{
                          padding: '0.8rem 1rem',
                          borderRadius: '10px',
                          background: isActive ? 'rgba(77,159,255,0.1)' : 'transparent',
                          borderLeft: `2px solid ${isActive ? '#00E5FF' : 'transparent'}`,
                          cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.35rem',
                          boxShadow: isActive ? 'inset 0 0 20px rgba(0,229,255,0.05)' : 'none',
                          transition: 'background 0.2s, border-color 0.2s',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <span style={{
                            color: isActive ? '#fff' : 'var(--text-primary)',
                            fontSize: '0.88rem', fontWeight: isActive ? 600 : 400,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            lineHeight: 1.4,
                          }}>
                            {nb.title.replace(/^[0-9]+-/, '')}
                          </span>
                          {isRead && <CheckCircle size={15} color="#00FFB2" style={{ flexShrink: 0, filter: 'drop-shadow(0 0 6px rgba(0,255,178,0.5))' }} />}
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: "'Geist Mono', monospace" }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: isActive ? '#4D9FFF' : 'inherit' }}><Clock size={11} /> {nb.estimatedReadMins}m</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: isActive ? '#9B6DFF' : 'inherit' }}><Code size={11} /> {nb.difficulty.toLowerCase()}</span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );

  /* ── 2. Empty State ── */
  const renderEmptyState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
    >
      <HolographicOrb />
      <h3 style={{ fontFamily: "'Geist Mono', monospace", fontSize: '1rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
        SYSTEM STANDBY
      </h3>
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        Awaiting datalink file selection...
      </p>
    </motion.div>
  );

  /* ── 3. Notebook Content ── */
  const renderContent = () => {
    if (!activeNotebook) return renderEmptyState();

    return (
      <motion.div
        key={activeNotebook.id}
        initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ flex: 1, padding: '0 2rem', height: '100%', overflowY: 'auto' }}
      >
        {/* Header Block */}
        <div style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '2.5rem', marginBottom: '2.5rem',
          position: 'relative',
        }}>
          {/* Holographic Header Glow */}
          <div style={{
            position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent)',
            boxShadow: '0 0 20px rgba(0,229,255,0.3)',
          }} />

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap', paddingTop: '1rem' }}>
            {activeNotebook.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: "'Geist Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.05em',
                background: 'rgba(0,229,255,0.06)', color: '#00E5FF',
                padding: '0.25rem 0.65rem', borderRadius: '6px', border: '1px solid rgba(0,229,255,0.15)',
              }}>
                #{tag}
              </span>
            ))}
          </div>

          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.03em', lineHeight: 1.1,
          }}>
            {activeNotebook.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: "'Geist Mono', monospace" }}>
              <Clock size={15} color="#4D9FFF" /> {activeNotebook.estimatedReadMins} min runtime
            </span>
            <a
              href={`https://colab.research.google.com/github/Pierian-Data/Complete-Python-3-Bootcamp/blob/master/${activeNotebook.module}/${activeNotebook.title}.ipynb`}
              target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                color: '#FFB200', background: 'rgba(255, 178, 0, 0.08)',
                padding: '0.45rem 1rem', borderRadius: '8px', border: '1px solid rgba(255, 178, 0, 0.2)',
                fontSize: '0.8rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 178, 0, 0.15)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(255,178,0,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 178, 0, 0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <Play size={14} /> Execute in Colab <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Notebook Cells */}
        <div style={{ maxWidth: '840px' }}>
          {activeNotebook.cells.map((cell, idx) => {
            if (cell.type === 'markdown') {
              return (
                <div key={idx} style={{ color: 'var(--text-primary)', lineHeight: '1.8', marginBottom: '2rem', fontSize: '1.05rem', fontFamily: "'Inter', sans-serif" }}
                  dangerouslySetInnerHTML={{
                    __html: cell.content
                      .replace(/# (.+)/g, '<h2 style="font-family: \'Plus Jakarta Sans\', sans-serif; font-weight: 800; font-size: 1.8rem; margin: 2.5rem 0 1.25rem; color: #fff; letter-spacing: -0.02em;">$1</h2>')
                      .replace(/## (.+)/g, '<h3 style="font-family: \'Plus Jakarta Sans\', sans-serif; font-weight: 700; font-size: 1.4rem; margin: 2rem 0 1rem; color: #e2e8f0; letter-spacing: -0.01em;">$1</h3>')
                      .replace(/`(.*?)`/g, '<code style="font-family: \'Geist Mono\', monospace; font-size: 0.85em; background: rgba(255,255,255,0.08); padding: 0.15rem 0.4rem; border-radius: 4px; color: #00E5FF;">$1</code>')
                  }} />
              );
            }
            if (cell.type === 'code') {
              return (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  key={idx}
                  style={{
                    marginBottom: '2.5rem', borderRadius: '12px', overflow: 'hidden',
                    border: '1px solid rgba(155,109,255,0.2)',
                    background: 'rgba(4,4,14,0.6)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.4), inset 0 0 20px rgba(155,109,255,0.03)',
                  }}
                >
                  {/* Code Header */}
                  <div style={{
                    background: 'rgba(0,0,0,0.4)', padding: '0.6rem 1.2rem',
                    borderBottom: '1px solid rgba(155,109,255,0.15)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9B6DFF', fontFamily: "'Geist Mono', monospace", fontSize: '0.75rem' }}>
                      <Terminal size={13} /> Python Block
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(cell.content)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                        fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: "'Geist Mono', monospace",
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        padding: '0.3rem 0.6rem', borderRadius: '5px', cursor: 'pointer', transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                    >
                      <Copy size={11} /> Copy
                    </button>
                  </div>
                  {/* Code Syntax Highlighting */}
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'linear-gradient(to bottom, #9B6DFF, transparent)' }} />
                    <SyntaxHighlighter
                      language="python"
                      style={vscDarkPlus}
                      customStyle={{ margin: 0, padding: '1.5rem', fontSize: '0.9rem', background: 'transparent' }}
                      codeTagProps={{ style: { fontFamily: "'Geist Mono', monospace" } }}
                    >
                      {cell.content}
                    </SyntaxHighlighter>
                  </div>
                </motion.div>
              );
            }
            return null;
          })}
        </div>

        {/* Verification Footer */}
        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'center', paddingBottom: '5rem' }}>
          <motion.button
            onClick={handleMarkComplete}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '1.2rem 2.5rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              background: progress[activeNotebook.id] === 'read'
                ? 'rgba(0,255,178,0.1)'
                : 'linear-gradient(135deg, #00E5FF, #4D9FFF, #9B6DFF)',
              color: progress[activeNotebook.id] === 'read' ? '#00FFB2' : '#fff',
              border: progress[activeNotebook.id] === 'read' ? '1px solid rgba(0,255,178,0.3)' : 'none',
              borderRadius: '16px', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.05rem',
              boxShadow: progress[activeNotebook.id] === 'read'
                ? '0 0 20px rgba(0,255,178,0.15)'
                : '0 10px 30px rgba(77,159,255,0.3), 0 0 0 1px rgba(77,159,255,0.2)',
              transition: 'all 0.3s var(--ease-cinema)',
            }}
          >
            {progress[activeNotebook.id] === 'read' ? (
              <><CheckCircle size={22} style={{ filter: 'drop-shadow(0 0 4px rgba(0,255,178,0.5))' }} /> Checkpoint Verified</>
            ) : (
              <><Sparkles size={22} /> Verify Module Completion</>
            )}
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <div style={{
      display: 'flex', height: 'calc(100vh - 8rem)',
      background: 'rgba(4,4,12,0.6)', backdropFilter: 'blur(30px)',
      border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px',
      overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
    }}>
      {renderSidebar()}
      {renderContent()}
    </div>
  );
};

export default TutorialHub;
