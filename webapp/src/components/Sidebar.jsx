import React, { useState } from 'react';
import {
  Target, GitCommit, Folder, BrainCircuit,
  BotMessageSquare, LibraryBig, Briefcase,
  Video, ChevronRight, BookOpen,
  ExternalLink, Link2, Mail, Sparkles,
  Atom
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
      whileTap={{ scale: 0.98 }}
      style={{
        marginBottom: '0.75rem',
        padding: collapsed ? '0.75rem 0' : '0.85rem',
        borderRadius: '16px',
        background: hovered ? 'rgba(77,159,255,0.08)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? 'rgba(77,159,255,0.3)' : 'rgba(255,255,255,0.05)'}`,
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: hovered ? 'inset 0 0 20px rgba(77,159,255,0.1), 0 8px 20px rgba(0,0,0,0.3)' : '0 4px 10px rgba(0,0,0,0.2)',
        overflow: 'hidden',
      }}
      onClick={() => window.open('https://resume-webpage-ashy.vercel.app/', '_blank')}
    >
      {/* Dynamic Background Glow */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', top: -30, right: -30,
              width: '100px', height: '100px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,229,255,0.15), transparent 70%)',
              filter: 'blur(15px)', pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {collapsed ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: hovered ? 'linear-gradient(135deg, #00E5FF, #9B6DFF)' : 'rgba(255,255,255,0.1)',
            padding: '2px',
            boxShadow: hovered ? '0 0 15px rgba(0,229,255,0.4)' : 'none',
            transition: 'all 0.3s',
          }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
              <img src={shivanshPhoto} alt="Shivansh" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
            </div>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
              {/* Avatar with Rotating Orbital Ring */}
              <div style={{ position: 'relative', width: '44px', height: '44px' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute', inset: -3, borderRadius: '50%',
                    border: '1px dashed rgba(0,229,255,0.4)',
                    display: hovered ? 'block' : 'none',
                  }}
                />
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00E5FF, #4D9FFF, #9B6DFF)',
                  padding: '2px', position: 'relative', zIndex: 2,
                }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#111' }}>
                    <img src={shivanshPhoto} alt="Shivansh Mishra" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800, fontSize: '0.9rem', color: '#fff',
                  letterSpacing: '-0.01em', marginBottom: '2px',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  Shivansh Mishra
                </p>
                <p style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: '0.65rem', color: '#4D9FFF', letterSpacing: '0.03em',
                  display: 'flex', alignItems: 'center', gap: '0.3rem'
                }}>
                  <Sparkles size={10} color="#00E5FF" /> ML Builder
                </p>
              </div>

              <motion.div animate={{ rotate: hovered ? 45 : 0, scale: hovered ? 1.1 : 1 }} transition={{ duration: 0.2 }}>
                <ExternalLink size={14} color={hovered ? '#00E5FF' : 'rgba(255,255,255,0.2)'} />
              </motion.div>
            </div>

            {/* Micro Social Bar */}
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {[
                { icon: Link2, url: 'https://github.com/shivansh-mishraji', label: 'GitHub', color: '#fff' },
                { icon: Link2, url: 'https://www.linkedin.com/in/shivansh-mishra-132b97358', label: 'LinkedIn', color: '#4D9FFF' },
                { icon: Mail, url: 'mailto:shivanshmishraji90@gmail.com', label: 'Email', color: '#9B6DFF' },
              ].map(({ icon: Icon, url, label, color }) => (
                <motion.a
                  key={label} href={url} target={label !== 'Email' ? '_blank' : undefined} rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  whileHover={{ y: -2, backgroundColor: `${color}20` }}
                  title={label}
                  style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', transition: 'all 0.2s',
                  }}
                >
                  <Icon size={14} color={hovered ? color : 'var(--text-muted)'} style={{ transition: 'color 0.2s' }} />
                </motion.a>
              ))}
              
              {/* Portfolio CTA */}
              <motion.a
                href="https://resume-webpage-ashy.vercel.app/" target="_blank" rel="noreferrer"
                onClick={e => e.stopPropagation()}
                whileHover={{ y: -2, filter: 'brightness(1.2)' }}
                style={{
                  flex: 1, height: '32px', borderRadius: '8px',
                  background: 'linear-gradient(90deg, rgba(0,229,255,0.1), rgba(155,109,255,0.1))',
                  border: '1px solid rgba(0,229,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                  textDecoration: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.7rem',
                  fontWeight: 700, color: '#00E5FF', letterSpacing: '0.02em',
                }}
              >
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
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1, width: collapsed ? '80px' : '260px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        height: '100vh', position: 'fixed', left: 0, top: 0,
        display: 'flex', flexDirection: 'column',
        background: 'rgba(2, 2, 8, 0.85)',
        backdropFilter: 'blur(40px) saturate(200%)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        zIndex: 100, overflow: 'hidden',
        boxShadow: '20px 0 60px rgba(0,0,0,0.5)',
      }}
    >
      {/* Ambient Edge Glow */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, right: 0, width: '1px',
        background: 'linear-gradient(to bottom, transparent, rgba(0,229,255,0.2), rgba(155,109,255,0.1), transparent)',
        boxShadow: '-5px 0 20px rgba(0,229,255,0.1)',
      }} />

      {/* ── Header ── */}
      <div style={{
        padding: collapsed ? '1.5rem 0' : '1.5rem 1.25rem',
        borderBottom: '1px solid rgba(255,255,255,0.03)',
        marginBottom: '1rem',
      }}>
        <motion.div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', justifyContent: collapsed ? 'center' : 'flex-start' }}>
          {/* Glowing Atom Logo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{
              width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
              background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(155,109,255,0.2))',
              border: '1px solid rgba(0,229,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0,229,255,0.2), inset 0 0 10px rgba(155,109,255,0.3)',
            }}
          >
            <Atom size={22} color="#00E5FF" style={{ filter: 'drop-shadow(0 0 5px rgba(0,229,255,0.8))' }} />
          </motion.div>

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.02em',
                  color: '#fff', marginBottom: '2px',
                }}>ML_HUB</p>
                <p style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: '0.6rem', letterSpacing: '0.15em',
                  color: '#00E5FF', textTransform: 'uppercase',
                }}>v5.0 Cinematic</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Navigation ── */}
      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: collapsed ? '0' : '0 1rem' }}>
        {navSections.map((section, si) => (
          <div key={section.label} style={{ marginBottom: '1.8rem' }}>
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.65rem', fontWeight: 800,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.3)', padding: '0 0.8rem', marginBottom: '0.6rem',
                  }}
                >
                  {section.label}
                </motion.p>
              )}
            </AnimatePresence>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
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
                    whileTap={{ scale: 0.96 }}
                    style={{
                      position: 'relative',
                      display: 'flex', alignItems: 'center', gap: '0.8rem',
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      width: '100%', padding: collapsed ? '0.8rem 0' : '0.8rem 1rem',
                      background: isActive ? 'rgba(77,159,255,0.15)' : isHov ? 'rgba(255,255,255,0.03)' : 'transparent',
                      border: `1px solid ${isActive ? 'rgba(0,229,255,0.3)' : 'transparent'}`,
                      borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                      transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
                      boxShadow: isActive ? '0 10px 20px rgba(0,0,0,0.2), inset 0 0 15px rgba(0,229,255,0.1)' : 'none',
                    }}
                  >
                    {/* Glowing Active Background Injector */}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-glow"
                        style={{
                          position: 'absolute', inset: 0, borderRadius: '12px',
                          background: 'linear-gradient(90deg, rgba(0,229,255,0.1), transparent)',
                          zIndex: 0,
                        }}
                      />
                    )}

                    <motion.div
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ duration: 0.2 }}
                      style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}
                    >
                      <Icon
                        size={18}
                        style={{
                          color: isActive ? '#00E5FF' : isHov ? '#fff' : 'rgba(255,255,255,0.5)',
                          filter: isActive ? 'drop-shadow(0 0 8px rgba(0,229,255,0.6))' : 'none',
                          transition: 'all 0.2s',
                        }}
                      />
                    </motion.div>

                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: '0.9rem', fontWeight: isActive ? 700 : 500,
                            color: isActive ? '#fff' : isHov ? '#fff' : 'rgba(255,255,255,0.6)',
                            flex: 1, transition: 'color 0.2s', whiteSpace: 'nowrap',
                            position: 'relative', zIndex: 1, letterSpacing: '-0.01em',
                          }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {item.badge && !collapsed && (
                      <span style={{
                        position: 'relative', zIndex: 1,
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.08em',
                        padding: '0.2rem 0.5rem', borderRadius: '6px',
                        background: item.badge === 'AI' ? 'rgba(155,109,255,0.15)' : 'rgba(0,255,178,0.1)',
                        color: item.badge === 'AI' ? '#C4A1FF' : '#00FFB2',
                        border: `1px solid ${item.badge === 'AI' ? 'rgba(155,109,255,0.4)' : 'rgba(0,255,178,0.4)'}`,
                        boxShadow: item.badge === 'AI' ? '0 0 10px rgba(155,109,255,0.2)' : '0 0 10px rgba(0,255,178,0.2)',
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div style={{ padding: collapsed ? '1rem 0' : '1rem', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <DevCard collapsed={collapsed} />

        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              style={{
                marginBottom: '0.8rem', padding: '0.7rem 1rem',
                background: 'rgba(0,255,178,0.05)', border: '1px solid rgba(0,255,178,0.2)',
                borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.6rem',
                boxShadow: 'inset 0 0 15px rgba(0,255,178,0.05)',
              }}
            >
              <motion.div
                animate={{ opacity: [1, 0.4, 1], scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  width: 8, height: 8, borderRadius: '50%', background: '#00FFB2',
                  boxShadow: '0 0 10px #00FFB2, 0 0 20px rgba(0,255,178,0.6)', flexShrink: 0,
                }}
              />
              <span style={{
                fontFamily: "'Geist Mono', monospace", fontSize: '0.7rem', fontWeight: 700,
                color: '#00FFB2', letterSpacing: '0.05em',
              }}>
                SYSTEM_ONLINE
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'center',
            gap: '0.5rem', padding: '0.6rem',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', 
            borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s',
          }}
        >
          <motion.div animate={{ rotate: collapsed ? 0 : 180 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <ChevronRight size={16} color="rgba(255,255,255,0.6)" />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}
              >
                Collapse Core System
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
