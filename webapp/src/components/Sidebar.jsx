import React, { useState } from 'react';
import {
  Target, GitCommit, Folder, BrainCircuit,
  BotMessageSquare, LibraryBig, Briefcase,
  Video, ChevronRight, BookOpen, Cpu,
  ExternalLink, Link2, Mail, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import shivanshPhoto from '../assets/shivansh.jpg';

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
      { id: 'flashcards', label: 'Interview Engine', icon: BrainCircuit,   badge: null },
      { id: 'jobprep',    label: 'Mock Interviews',  icon: Video,          badge: null },
      { id: 'projects',   label: 'Project Gallery',  icon: Folder,         badge: null },
    ]
  },
  {
    label: 'Career',
    items: [
      { id: 'jobtracker', label: 'Career Pipeline',  icon: Briefcase,      badge: null },
      { id: 'resources',  label: 'Resource Hub',     icon: LibraryBig,     badge: null },
      { id: 'ai',         label: 'AI Assistant',     icon: BotMessageSquare, badge: 'AI' },
    ]
  }
];

/* ─── Developer Card ─── */
const DevCard = ({ collapsed }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        marginBottom: '0.75rem',
        padding: collapsed ? '0.75rem 0' : '0.9rem',
        borderRadius: '14px',
        background: hovered
          ? 'linear-gradient(145deg, rgba(79,142,247,0.1), rgba(155,109,255,0.06))'
          : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? 'rgba(79,142,247,0.25)' : 'rgba(255,255,255,0.05)'}`,
        transition: 'all 0.25s ease',
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative',
      }}
      onClick={() => window.open('https://resume-webpage-ashy.vercel.app/', '_blank')}
    >
      {/* Glow on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.6), transparent)',
            }}
          />
        )}
      </AnimatePresence>

      {collapsed ? (
        /* Collapsed state — just show avatar */
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #4F8EF7, #9B6DFF)',
            padding: '2px', flexShrink: 0,
          }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
              <img src={shivanshPhoto} alt="Shivansh" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
            </div>
          </div>
        </div>
      ) : (
        /* Expanded state — full card */
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.75rem' }}>
              {/* Avatar with gradient ring */}
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #4F8EF7, #9B6DFF)',
                padding: '2px',
                boxShadow: hovered ? '0 0 16px rgba(79,142,247,0.4)' : '0 0 8px rgba(79,142,247,0.2)',
                transition: 'box-shadow 0.25s',
              }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#111' }}>
                  <img
                    src={shivanshPhoto}
                    alt="Shivansh Mishra"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                  />
                </div>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700, fontSize: '0.82rem', color: '#fff',
                  letterSpacing: '-0.01em', marginBottom: '1px',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  Shivansh Mishra
                </p>
                <p className="mono" style={{ fontSize: '0.64rem', color: 'var(--brand-violet)', letterSpacing: '0.03em' }}>
                  ML Builder & AI Explorer
                </p>
              </div>

              <motion.div animate={{ rotate: hovered ? 45 : 0 }} transition={{ duration: 0.2 }}>
                <ExternalLink size={13} color={hovered ? 'var(--brand-blue)' : 'var(--text-muted)'} style={{ transition: 'color 0.2s' }} />
              </motion.div>
            </div>

            {/* Info chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.7rem' }}>
              {['B.Tech CSE', 'Cloud + ML', 'Lucknow 🇮🇳'].map(chip => (
                <span key={chip} className="mono" style={{
                  fontSize: '0.62rem', padding: '0.18rem 0.5rem',
                  borderRadius: '5px',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'var(--text-muted)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}>
                  {chip}
                </span>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.45rem' }}>
              {[
                { icon: Link2, url: 'https://github.com/shivansh-mishraji', label: 'GitHub' },
                { icon: Link2, url: 'https://www.linkedin.com/in/shivansh-mishra-132b97358', label: 'LinkedIn' },
                { icon: Mail,  url: 'mailto:shivanshmishraji90@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, url, label }) => (
                <motion.a
                  key={label}
                  href={url}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  whileHover={{ y: -2, backgroundColor: 'rgba(79,142,247,0.15)' }}
                  whileTap={{ scale: 0.95 }}
                  title={label}
                  style={{
                    width: '28px', height: '28px', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s',
                    textDecoration: 'none',
                  }}
                >
                  <Icon size={13} color="var(--text-muted)" />
                </motion.a>
              ))}

              <motion.a
                href="https://resume-webpage-ashy.vercel.app/"
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                whileHover={{ y: -2 }}
                style={{
                  flex: 1, height: '28px', borderRadius: '8px',
                  background: 'linear-gradient(135deg, rgba(79,142,247,0.2), rgba(155,109,255,0.15))',
                  border: '1px solid rgba(79,142,247,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
                  textDecoration: 'none',
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: '0.62rem',
                  color: 'var(--brand-blue)',
                  letterSpacing: '0.04em',
                }}
              >
                <Sparkles size={10} />
                Portfolio
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

/* ─── Main Sidebar ─── */
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
        background: 'rgba(7, 7, 11, 0.94)',
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        zIndex: 100,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ padding: collapsed ? '1.4rem 0' : '1.4rem 1.15rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <motion.div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', justifyContent: collapsed ? 'center' : 'flex-start' }}>
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
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
              >
                <p className="mono" style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff', letterSpacing: '-0.02em' }}>ML_HUB</p>
                <p className="mono" style={{ fontSize: '0.64rem', color: 'var(--brand-violet)', letterSpacing: '0.05em', marginTop: '-1px' }}>v4.0 // ELITE</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: collapsed ? '1rem 0' : '1rem 0.7rem' }}>
        {navSections.map((section, si) => (
          <div key={section.label} style={{ marginBottom: '1.5rem' }}>
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="section-label"
                  style={{ padding: '0 0.5rem', marginBottom: '0.35rem' }}
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
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    width: '100%',
                    padding: collapsed ? '0.65rem 0' : '0.58rem 0.65rem',
                    marginBottom: '2px',
                    background: isActive ? 'rgba(79, 142, 247, 0.09)' : 'transparent',
                    border: 'none', borderRadius: '10px', cursor: 'pointer',
                    textAlign: 'left', transition: 'background 0.15s ease',
                  }}
                >
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
                    style={{ color: isActive ? 'var(--brand-blue)' : 'var(--text-muted)', flexShrink: 0, transition: 'color 0.15s' }}
                  />

                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: '0.845rem',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? '#fff' : 'var(--text-secondary)',
                          flex: 1, transition: 'color 0.15s', whiteSpace: 'nowrap',
                        }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {item.badge && !collapsed && (
                    <span style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.06em',
                      padding: '0.1rem 0.42rem', borderRadius: '4px',
                      background: item.badge === 'AI'
                        ? 'linear-gradient(135deg, rgba(155,109,255,0.2), rgba(79,142,247,0.2))'
                        : 'rgba(52,211,153,0.14)',
                      color: item.badge === 'AI' ? 'var(--brand-violet)' : 'var(--success)',
                      border: `1px solid ${item.badge === 'AI' ? 'rgba(155,109,255,0.28)' : 'rgba(52,211,153,0.28)'}`,
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

      {/* Footer — Dev Card + Collapse */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: collapsed ? '0.75rem 0' : '0.75rem 0.7rem' }}>
        {/* Developer Card */}
        <DevCard collapsed={collapsed} />

        {/* Status pill */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              style={{
                marginBottom: '0.6rem',
                padding: '0.6rem 0.8rem',
                background: 'rgba(52, 211, 153, 0.05)',
                border: '1px solid rgba(52, 211, 153, 0.12)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: 'var(--success)',
                boxShadow: '0 0 6px var(--success)',
                display: 'inline-block', flexShrink: 0,
                animation: 'pulse-glow 2.5s infinite',
              }} />
              <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--success)' }}>SYSTEM_ONLINE</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse toggle */}
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          whileTap={{ scale: 0.96 }}
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-end',
            gap: '0.4rem', padding: '0.45rem 0.45rem',
            background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer',
          }}
        >
          <motion.div animate={{ rotate: collapsed ? 0 : 180 }} transition={{ duration: 0.25 }}>
            <ChevronRight size={14} color="var(--text-muted)" />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}
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
