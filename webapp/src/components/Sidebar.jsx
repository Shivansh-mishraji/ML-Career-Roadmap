import React from 'react';
import { Terminal, Target, GitCommit, Folder, BrainCircuit, BotMessageSquare, LibraryBig, Briefcase, Video } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'assessment', label: 'Command Center', icon: Target },
    { id: 'roadmap', label: 'Skill Tree', icon: GitCommit },
    { id: 'projects', label: 'Project Gallery', icon: Folder },
    { id: 'flashcards', label: 'Interview Engine', icon: BrainCircuit },
    { id: 'jobprep', label: 'Mock Interviews', icon: Video },
    { id: 'jobtracker', label: 'Career Pipeline', icon: Briefcase },
    { id: 'resources', label: 'Resource Hub', icon: LibraryBig },
    { id: 'ai', label: 'AI Assistant', icon: BotMessageSquare },
  ];

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      background: 'var(--bg-secondary)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid var(--border-color)',
      zIndex: 100
    }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}
      >
        <h2 className="mono" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', fontSize: '1.3rem', color: '#fff' }}>
          <Terminal size={22} color="var(--accent-primary)" /> ML_HUB
        </h2>
        <p className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)' }}>v3.0.0 // ANTI-DULL</p>
      </motion.div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.98 }}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="mono"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                background: isActive ? 'var(--bg-tertiary)' : 'transparent',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: isActive ? 'var(--accent-glow)' : 'transparent',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'color 0.2s, background-color 0.2s',
                fontSize: '0.9rem'
              }}
            >
              <Icon size={18} color={isActive ? 'var(--accent-primary)' : 'currentColor'} />
              {item.label}
            </motion.button>
          );
        })}
      </nav>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: 'auto', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }}></div>
          <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>SYSTEM_ONLINE</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: '1.4' }}>
          Continuous integration required. Master topics sequentially.
        </p>
      </motion.div>
    </aside>
  );
};

export default Sidebar;
