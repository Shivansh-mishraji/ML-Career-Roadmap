import React, { useState } from 'react';
import {
  Target, GitCommit, Folder, BrainCircuit,
  BotMessageSquare, LibraryBig, Briefcase,
  Video, ChevronRight, Zap, BookOpen, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navSections = [
  {
    label: 'Core',
    items: [
      { id: 'assessment', label: 'Command Center', icon: Target,       badge: null },
      { id: 'roadmap',    label: 'Skill Tree',     icon: GitCommit,    badge: null },
      { id: 'tutorials',  label: 'Tutorial Hub',   icon: BookOpen,     badge: 'NEW' },
    ]
  },
  {
    label: 'Practice',
    items: [
      { id: 'flashcards', label: 'Interview Engine', icon: BrainCircuit, badge: null },
      { id: 'jobprep',    label: 'Mock Interviews',  icon: Video,        badge: null },
      { id: 'projects',   label: 'Project Gallery',  icon: Folder,       badge: null },
    ]
  },
  {
    label: 'Career',
    items: [
      { id: 'jobtracker', label: 'Career Pipeline', icon: Briefcase,      badge: null },
      { id: 'resources',  label: 'Resource Hub',    icon: LibraryBig,     badge: null },
      { id: 'ai',         label: 'AI Assistant',    icon: BotMessageSquare, badge: 'AI' },
    ]
  }
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1, width: collapsed ? '72px' : '240px' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0, top: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(8, 8, 12, 0.92)',
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        zIndex: 100,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ padding: collapsed ? '1.5rem 0' : '1.5rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: collapsed ? 'center' : 'flex-start' }}
          whileHover={{ scale: 1.01 }}
        >
          {/* Logo mark */}
          <div style={{
            width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
            background: 'linear-gradient(135deg, #4F8EF7, #9B6DFF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(79,142,247,0.35)',
          }}>
            <Cpu size={18} color="#fff" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
              >
                <p style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 600, fontSize: '0.95rem', color: '#fff', letterSpacing: '-0.02em' }}>ML_HUB</p>
                <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: '0.65rem', color: 'var(--brand-violet)', letterSpacing: '0.05em', marginTop: '-2px' }}>v4.0 // ELITE</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: collapsed ? '1rem 0' : '1rem 0.75rem' }}>
        {navSections.map((section, si) => (
          <div key={section.label} style={{ marginBottom: '1.5rem' }}>
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="section-label"
                  style={{ padding: '0 0.5rem', marginBottom: '0.4rem' }}
                >
                  {section.label}
                </motion.p>
              )}
            </AnimatePresence>

            {section.items.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (si * 3 + idx) * 0.04 }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    width: '100%',
                    padding: collapsed ? '0.65rem 0' : '0.6rem 0.7rem',
                    marginBottom: '2px',
                    background: isActive ? 'rgba(79, 142, 247, 0.1)' : 'transparent',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.15s ease',
                  }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      style={{
                        position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                        width: '3px', height: '55%',
                        background: 'linear-gradient(to bottom, var(--brand-blue), var(--brand-violet))',
                        borderRadius: '0 3px 3px 0',
                        boxShadow: '0 0 12px rgba(79,142,247,0.6)',
                      }}
                    />
                  )}

                  <Icon
                    size={17}
                    style={{
                      color: isActive ? 'var(--brand-blue)' : 'var(--text-muted)',
                      flexShrink: 0,
                      transition: 'color 0.15s ease',
                    }}
                  />

                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: '0.845rem',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? '#fff' : 'var(--text-secondary)',
                          flex: 1,
                          transition: 'color 0.15s ease',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Badge */}
                  {item.badge && !collapsed && (
                    <span style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '4px',
                      background: item.badge === 'AI'
                        ? 'linear-gradient(135deg, rgba(155,109,255,0.2), rgba(79,142,247,0.2))'
                        : 'rgba(52,211,153,0.15)',
                      color: item.badge === 'AI' ? 'var(--brand-violet)' : 'var(--success)',
                      border: `1px solid ${item.badge === 'AI' ? 'rgba(155,109,255,0.3)' : 'rgba(52,211,153,0.3)'}`,
                    }}>
                      {item.badge}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Collapse Toggle + Status */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: collapsed ? '1rem 0' : '1rem 0.75rem' }}>
        {/* System Status */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                marginBottom: '0.75rem',
                padding: '0.75rem 0.85rem',
                background: 'rgba(52, 211, 153, 0.05)',
                border: '1px solid rgba(52, 211, 153, 0.15)',
                borderRadius: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 6px var(--success)', display: 'inline-block', animation: 'pulse-glow 2s infinite' }} />
                <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--success)' }}>SYSTEM_ONLINE</span>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                All modules active. Study mode engaged.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse button */}
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          whileTap={{ scale: 0.96 }}
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-end',
            gap: '0.4rem',
            padding: '0.5rem 0.5rem',
            background: 'transparent',
            border: 'none', borderRadius: '8px', cursor: 'pointer',
          }}
        >
          <motion.div animate={{ rotate: collapsed ? 0 : 180 }} transition={{ duration: 0.25 }}>
            <ChevronRight size={15} color="var(--text-muted)" />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ fontFamily: "'Geist Mono',monospace", fontSize: '0.7rem', color: 'var(--text-muted)' }}
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
