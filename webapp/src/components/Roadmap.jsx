import React, { useState } from 'react';
import { CheckCircle, Play, ChevronRight, Terminal } from 'lucide-react';
import { roadmapData } from '../data/roadmapData';

const Roadmap = () => {
  const [activeNode, setActiveNode] = useState(0);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="gradient-text mono" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>// Skill_Tree_Pipeline</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
          Data flow from foundations to production architecture.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Pipeline Nodes Sidebar */}
        <div style={{ position: 'relative', paddingLeft: '1rem', minWidth: '250px' }}>
          <div className="pipeline-connector"></div>
          
          {roadmapData.map((levelData, idx) => {
            const isActive = activeNode === idx;
            return (
              <div 
                key={levelData.level} 
                className="pipeline-node"
                onClick={() => setActiveNode(idx)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  marginBottom: '2.5rem',
                  cursor: 'pointer',
                  opacity: isActive ? 1 : 0.6,
                  transition: 'all 0.3s'
                }}
              >
                <div style={{
                  width: '24px', height: '24px',
                  borderRadius: '50%',
                  background: isActive ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                  border: `2px solid ${isActive ? 'var(--accent-glow)' : 'var(--border-color)'}`,
                  boxShadow: isActive ? '0 0 15px var(--accent-primary)' : 'none',
                  zIndex: 2,
                  position: 'relative',
                  left: '-12px'
                }} />
                <div>
                  <h4 className="mono" style={{ color: isActive ? '#fff' : 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
                    LEVEL_{levelData.level}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{levelData.title.split(':')[0]}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Node Detail View */}
        <div style={{ flex: 1 }}>
          {roadmapData[activeNode] && (
            <div className="glass-panel animate-fade-in" style={{ padding: '2rem' }}>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                <h2 className="mono" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                  <Terminal size={24} color="var(--accent-primary)" />
                  {roadmapData[activeNode].title}
                </h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>{roadmapData[activeNode].subtitle}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {roadmapData[activeNode].topics.map((topic, tIdx) => (
                  <div key={tIdx} className="glass-card" style={{ padding: '1.5rem' }}>
                    <h4 className="mono" style={{ color: 'var(--accent-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <ChevronRight size={16} /> {topic.title}
                    </h4>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.95rem' }}>
                      {topic.details.map((detail, dIdx) => (
                        <li key={dIdx} style={{ listStyleType: 'square' }}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--success)' }}>
                <h4 className="mono" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', marginBottom: '1rem' }}>
                  <Play size={18} /> Compilation & Verification
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {roadmapData[activeNode].actionItems.map((action, aIdx) => (
                    <li key={aIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-primary)' }}>
                      <CheckCircle size={18} color="var(--success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.95rem', lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: action.replace('Proof of Mastery:', '<strong class="mono" style="color: var(--text-primary);">[Proof of Mastery]</strong>') }}></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
