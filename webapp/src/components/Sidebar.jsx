import React from 'react';
import { Rocket, Target, Map, Code, BookOpen } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'assessment', label: 'Self Assessment', icon: Target },
    { id: 'roadmap', label: 'Topic Roadmap', icon: Map },
    { id: 'projects', label: 'Project Gallery', icon: Code },
  ];

  return (
    <aside style={{
      width: '250px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      background: 'rgba(25, 28, 41, 0.8)',
      backdropFilter: 'blur(12px)',
      borderRight: '1px solid var(--glass-border)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2 className="gradient-text" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
          <Rocket size={24} /> ML Roadmap
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>From Beginner to Expert</p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                background: isActive ? 'rgba(67, 97, 238, 0.15)' : 'transparent',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                fontWeight: isActive ? 600 : 400
              }}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
      
      <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', fontSize: '0.85rem' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={16} /> <b>Tip:</b>
        </p>
        <p style={{ color: 'var(--text-muted)' }}>Stop learning by timelines. Focus on topic mastery.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
