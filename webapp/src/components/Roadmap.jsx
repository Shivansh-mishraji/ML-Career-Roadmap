import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Play } from 'lucide-react';
import { roadmapData } from '../data/roadmapData';

const Roadmap = () => {
  const [expandedLevel, setExpandedLevel] = useState(0);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Topic-Based ML Roadmap</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
          Learn at Your Own Pace, Master the Fundamentals. You only move to the next level when you have mastered the current one.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {roadmapData.map((levelData) => {
          const isExpanded = expandedLevel === levelData.level;
          return (
            <div key={levelData.level} className="glass-panel" style={{ overflow: 'hidden' }}>
              <div 
                onClick={() => setExpandedLevel(isExpanded ? null : levelData.level)}
                style={{
                  padding: '1.5rem 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  borderBottom: isExpanded ? '1px solid var(--glass-border)' : 'none',
                  background: isExpanded ? 'rgba(255,255,255,0.02)' : 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '40px', height: '40px',
                    borderRadius: '50%',
                    background: `${levelData.color}20`,
                    color: levelData.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold', fontSize: '1.2rem'
                  }}>
                    {levelData.level}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.3rem' }}>{levelData.title}</h3>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{levelData.subtitle}</p>
                  </div>
                </div>
                {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
              
              {isExpanded && (
                <div style={{ padding: '2rem', animation: 'fadeIn 0.3s ease' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    {levelData.topics.map((topic, tIdx) => (
                      <div key={tIdx} className="glass-card" style={{ padding: '1.5rem' }}>
                        <h4 style={{ color: levelData.color, marginBottom: '1rem', borderBottom: `1px solid ${levelData.color}40`, paddingBottom: '0.5rem' }}>
                          {topic.title}
                        </h4>
                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {topic.details.map((detail, dIdx) => (
                            <li key={dIdx}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: 'rgba(46, 204, 113, 0.05)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(46, 204, 113, 0.2)' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', marginBottom: '1rem' }}>
                      <Play size={18} /> Action Items & Verification
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {levelData.actionItems.map((action, aIdx) => (
                        <li key={aIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-primary)' }}>
                          <CheckCircle size={18} color="var(--success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <span dangerouslySetInnerHTML={{ __html: action.replace('Proof of Mastery:', '<strong>Proof of Mastery:</strong>') }}></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Roadmap;
