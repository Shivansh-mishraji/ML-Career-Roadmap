import React from 'react';
import { Terminal, Target, GitCommit, Folder, BrainCircuit, BotMessageSquare } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'assessment', label: 'Dashboard', icon: Target },
    { id: 'roadmap', label: 'Skill Pipeline', icon: GitCommit },
    { id: 'flashcards', label: 'Interview Engine', icon: BrainCircuit },
    { id: 'ai', label: 'AI RAG Guide', icon: BotMessageSquare },
    { id: 'projects', label: 'Architecture', icon: Folder },
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
      borderRight: '1px solid var(--border-color)',
      zIndex: 100
    }}>
      <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <h2 className="mono" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', fontSize: '1.3rem', color: '#fff' }}>
          <Terminal size={22} color="var(--accent-primary)" /> ML_HUB
        </h2>
        <p className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>v2.1.0 // AI_ENABLED</p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
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
                borderColor: isActive ? 'var(--border-hover)' : 'transparent',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                fontSize: '0.9rem'
              }}
            >
              <Icon size={18} color={isActive ? 'var(--accent-primary)' : 'currentColor'} />
              {item.label}
            </button>
          );
        })}
      </nav>
      
      <div style={{ marginTop: 'auto', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></div>
          <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>SYSTEM_ONLINE</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: '1.4' }}>
          Continuous integration required. Master topics sequentially.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
