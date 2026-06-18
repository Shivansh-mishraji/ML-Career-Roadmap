import React, { useState } from 'react';
import {
  Target, GitCommit, Folder, BrainCircuit,
  BotMessageSquare, LibraryBig, Briefcase,
  Video, ChevronRight, BookOpen, Cpu,
  ExternalLink, Link2, Mail, Sparkles,
  Atom, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import shivanshPhoto from '../assets/shivansh.jpg';

const navSections = [
  {
    label: 'Core',
    items: [
      { id: 'assessment', label: 'Command Center', icon: Target,         badge: null },
      { id: 'roadmap',    label: 'Skill Tree',     icon: GitCommit,      badge: null },
      { id: 'tutorials',  label: 'Tutorial Hub',   icon: BookOpen,       badge: 'NEW' },
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
        padding: collapsed ? '0.75rem 0' : '1rem',
        borderRadius: '16px',
        background: hovered
          ? 'linear-gradient(145deg, rgba(77,159,255,0.1), rgba(155,109,255,0.07))'
          : 'rgba(255,255,255,0.028)',
        border: `1px solid ${hovered ? 'rgba(77,159,255,0.3)' : 'rgba(255,255,255,0.05)'}`,
        transition: 'all 0.3s var(--ease-cinema)',
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: hovered ? '0 0 40px rgba(77,159,255,0.08)' : 'none',
      }}
      onClick={() => window.open('https://resume-webpage-ashy.vercel.app/', '_blank')}
    >
      {/* Top shimmer on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.7), rgba(77,159,255,0.5), transparent)',
              transformOrigin: 'left',
            }}
          />
        )}
      </AnimatePresence>

      {/* Holographic corner glow */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', top: -20, right: -20,
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(155,109,255,0.2), transparent 70%)',
              filter: 'blur(10px)', pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {collapsed ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #00E5FF, #4D9FFF, #9B6DFF)',
            padding: '2px', flexShrink: 0,
            boxShadow: hovered ? '0 0 20px rgba(0,229,255,0.4)' : '0 0 10px rgba(77,159,255,0.2)',
            transition: 'box-shadow 0.3s',
          }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#111' }}>
              <img src={shivanshPhoto} alt="Shivansh" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
            </div>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
              {/* Avatar */}
              <div style={{
                width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #00E5FF, #4D9FFF, #9B6DFF)',
                padding: '2.5px',
                boxShadow: hovered ? '0 0 20px rgba(0,229,255,0.5), 0 0 40px rgba(77,159,255,0.25)' : '0 0 10px rgba(77,159,255,0.25)',
                transition: 'box-shadow 0.3s',
              }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#111' }}>
                  <img src={shivanshPhoto} alt="Shivansh Mishra" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                </div>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800, fontSize: '0.84rem', color: '#fff',
                  letterSpacing: '-0.015em', marginBottom: '1px',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  Shivansh Mishra
                </p>
                <p style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: '0.63rem',
                  background: 'linear-gradient(90deg, #00E5FF, #9B6DFF)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text', letterSpacing: '0.03em',
                }}>
                  ML Builder & AI Explorer
                </p>
              </div>

              <motion.div animate={{ rotate: hovered ? 45 : 0 }} transition={{ duration: 0.25 }}>
                <ExternalLink size={13} color={hovered ? '#00E5FF' : 'var(--text-muted)'} style={{ transition: 'color 0.2s' }} />
              </motion.div>
            </div>

            {/* Info chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.75rem' }}>
              {[
                { label: 'B.Tech CSE', color: '#4D9FFF' },
                { label: 'Cloud + ML', color: '#9B6DFF' },
                { label: 'Lucknow 🇮🇳', color: '#00E5FF' },
              ].map(({ label, color }) => (
                <span key={label} style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: '0.61rem', padding: '0.18rem 0.5rem',
                  borderRadius: '5px',
                  background: `${color}10`,
                  color: hovered ? color : 'var(--text-muted)',
                  border: `1px solid ${hovered ? `${color}30` : 'rgba(255,255,255,0.07)'}`,
                  transition: 'all 0.3s',
                }}>
                  {label}
                </span>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {[
                { icon: Link2, url: 'https://github.com/shivansh-mishraji', label: 'GitHub', color: '#fff' },
                { icon: Link2, url: 'https://www.linkedin.com/in/shivansh-mishra-132b97358', label: 'LinkedIn', color: '#4D9FFF' },
                { icon: Mail, url: 'mailto:shivanshmishraji90@gmail.com', label: 'Email', color: '#FF5FA0' },
              ].map(({ icon: Icon, url, label, color }) => (
                <motion.a
                  key={label}
                  href={url}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  whileHover={{ y: -2, backgroundColor: `${color}18` }}
                  whileTap={{ scale: 0.93 }}
                  title={label}
                  style={{
                    width: '30px', height: '30px', borderRadius: '9px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.18s',
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
                  flex: 1, height: '30px', borderRadius: '9px',
                  background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(77,159,255,0.12), rgba(155,109,255,0.12))',
                  border: '1px solid rgba(0,229,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
                  textDecoration: 'none',
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: '0.6rem',
                  background2: 'linear-gradient(90deg, #00E5FF, #4D9FFF)',
                  color: '#00E5FF',
                  letterSpacing: '0.04em',
                  boxShadow: '0 0 16px rgba(0,229,255,0.1)',
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
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <motion.aside
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1, width: collapsed ? '72px' : '248px' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0, top: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(4, 4, 12, 0.95)',
        backdropFilter: 'blur(40px) saturate(200%)',
        WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        borderRight: '1px solid rgba(255,255,255,0.055)',
        zIndex: 100,
        overflow: 'hidden',
      }}
    >
      {/* Holographic top-edge glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3), rgba(77,159,255,0.4), rgba(155,109,255,0.3), transparent)',
        boxShadow: '0 0 20px rgba(77,159,255,0.15)',
      }} />

      {/* Subtle vertical glow inside sidebar */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '1px', height: '100%',
        background: 'linear-gradient(to bottom, rgba(77,159,255,0.15), transparent 40%, rgba(155,109,255,0.1) 80%, transparent)',
      }} />

      {/* ── Header ── */}
      <div style={{
        padding: collapsed ? '1.4rem 0' : '1.4rem 1.25rem',
        borderBottom: '1px solid rgba(255,255,255,0.045)',
        position: 'relative',
      }}>
        <motion.div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: collapsed ? 'center' : 'flex-start' }}>
          {/* Animated logo */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            style={{
              width: '36px', height: '36px', borderRadius: '11px', flexShrink: 0,
              background: 'linear-gradient(135deg, #00E5FF, #4D9FFF, #9B6DFF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,229,255,0.35), 0 0 40px rgba(77,159,255,0.15)',
            }}
          >
            <Atom size={19} color="#fff" />
          </motion.div>

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.22 }}
              >
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 900, fontSize: '1rem', letterSpacing: '-0.025em',
                  background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.8))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>ML_HUB</p>
                <p style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: '0.62rem', letterSpacing: '0.06em', marginTop: '-1px',
                  background: 'linear-gradient(90deg, #00E5FF, #9B6DFF)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>v5.0 // CINEMATIC</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Navigation ── */}
      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: collapsed ? '1rem 0' : '1rem 0.8rem' }}>
        {navSections.map((section, si) => (
          <div key={section.label} style={{ marginBottom: '1.6rem' }}>
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: '0.63rem', fontWeight: 500,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: 'var(--text-muted)', padding: '0 0.55rem', marginBottom: '0.4rem',
                  }}
                >
                  {section.label}
                </motion.p>
              )}
            </AnimatePresence>

            {section.items.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isHov = hoveredItem === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  onHoverStart={() => setHoveredItem(item.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (si * 3 + idx) * 0.045 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    position: 'relative',
                    display: 'flex', alignItems: 'center', gap: '0.65rem',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    width: '100%',
                    padding: collapsed ? '0.7rem 0' : '0.62rem 0.7rem',
                    marginBottom: '2px',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(0,229,255,0.07), rgba(77,159,255,0.07), rgba(155,109,255,0.05))'
                      : isHov ? 'rgba(255,255,255,0.04)' : 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.18s ease',
                    boxShadow: isActive ? 'inset 0 0 20px rgba(77,159,255,0.04)' : 'none',
                  }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      style={{
                        position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                        width: '3px', height: '60%',
                        background: 'linear-gradient(to bottom, #00E5FF, #4D9FFF, #9B6DFF)',
                        borderRadius: '0 3px 3px 0',
                        boxShadow: '0 0 14px rgba(0,229,255,0.8), 0 0 28px rgba(77,159,255,0.4)',
                      }}
                    />
                  )}

                  {/* Icon with glow on active */}
                  <motion.div
                    animate={{
                      y: isActive ? -1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ flexShrink: 0 }}
                  >
                    <Icon
                      size={17}
                      style={{
                        color: isActive ? '#00E5FF' : isHov ? 'var(--text-secondary)' : 'var(--text-muted)',
                        filter: isActive ? 'drop-shadow(0 0 6px rgba(0,229,255,0.6))' : 'none',
                        transition: 'color 0.18s, filter 0.18s',
                      }}
                    />
                  </motion.div>

                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: '0.855rem',
                          fontWeight: isActive ? 700 : 400,
                          color: isActive ? '#fff' : isHov ? 'var(--text-primary)' : 'var(--text-secondary)',
                          flex: 1, transition: 'color 0.18s', whiteSpace: 'nowrap',
                          background: isActive ? 'linear-gradient(90deg, #fff, rgba(255,255,255,0.8))' : 'none',
                          WebkitBackgroundClip: isActive ? 'text' : 'none',
                          WebkitTextFillColor: isActive ? 'transparent' : 'inherit',
                          backgroundClip: isActive ? 'text' : 'none',
                        }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {item.badge && !collapsed && (
                    <span style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.07em',
                      padding: '0.1rem 0.45rem', borderRadius: '5px',
                      background: item.badge === 'AI'
                        ? 'linear-gradient(135deg, rgba(155,109,255,0.25), rgba(77,159,255,0.2))'
                        : 'rgba(0,255,178,0.12)',
                      color: item.badge === 'AI' ? '#9B6DFF' : '#00FFB2',
                      border: `1px solid ${item.badge === 'AI' ? 'rgba(155,109,255,0.32)' : 'rgba(0,255,178,0.3)'}`,
                      boxShadow: item.badge === 'AI'
                        ? '0 0 10px rgba(155,109,255,0.2)'
                        : '0 0 10px rgba(0,255,178,0.15)',
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

      {/* ── Footer ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', padding: collapsed ? '0.75rem 0' : '0.75rem 0.8rem' }}>
        <DevCard collapsed={collapsed} />

        {/* Status pill */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              style={{
                marginBottom: '0.6rem',
                padding: '0.6rem 0.9rem',
                background: 'rgba(0,255,178,0.04)',
                border: '1px solid rgba(0,255,178,0.1)',
                borderRadius: '11px',
                display: 'flex', alignItems: 'center', gap: '0.55rem',
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: '#00FFB2',
                  boxShadow: '0 0 8px #00FFB2, 0 0 16px rgba(0,255,178,0.4)',
                  display: 'inline-block', flexShrink: 0,
                }}
              />
              <span style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: '0.67rem',
                background: 'linear-gradient(90deg, #00FFB2, #00E5FF)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>SYSTEM_ONLINE</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse toggle */}
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-end',
            gap: '0.4rem', padding: '0.45rem',
            background: 'transparent', border: 'none', borderRadius: '9px', cursor: 'pointer',
          }}
        >
          <motion.div animate={{ rotate: collapsed ? 0 : 180 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <ChevronRight size={14} color="var(--text-muted)" />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: '0.67rem', color: 'var(--text-muted)',
                }}
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
