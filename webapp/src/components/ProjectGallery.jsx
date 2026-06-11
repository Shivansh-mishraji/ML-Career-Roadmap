import React from 'react';
import { Globe, Folder } from 'lucide-react';

const ProjectGallery = () => {
  const projects = [
    {
      title: 'ML Engineer Reference Project',
      type: 'Architecture Blueprint',
      description: 'Stop writing giant Jupyter Notebooks. Learn how to write modular .py scripts, structured src/ folders, and Scikit-Learn Pipelines.',
      level: 'Levels 2 & 4',
      tags: ['Scikit-Learn', 'Pipelines', 'OOP'],
      path: '../ml-engineer-reference-project'
    },
    {
      title: 'MLOps Reference Architecture',
      type: 'Production Blueprint',
      description: 'Learn Docker, MLflow tracking, and CI/CD. Use it as a direct template for your own final year or portfolio projects.',
      level: 'Level 4',
      tags: ['Docker', 'MLflow', 'CI/CD'],
      path: '../mlops-reference-project'
    },
    {
      title: 'Real-Time Projects List',
      type: 'Idea Generator',
      description: 'Pick an idea from this list when you need to build your portfolio. Contains practical implementations.',
      level: 'All Levels',
      tags: ['Portfolio', 'Ideas'],
      path: '../internship-prep'
    }
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Project Gallery</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
          Real world architecture blueprints and project ideas. Do not guess how to structure your folders. Use these as templates.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {projects.map((proj, idx) => (
          <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span style={{ background: 'rgba(67, 97, 238, 0.1)', color: 'var(--accent-primary)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
                {proj.type}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{proj.level}</span>
            </div>
            
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.4rem' }}>{proj.title}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>{proj.description}</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {proj.tags.map(tag => (
                <span key={tag} style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', border: '1px solid var(--glass-border)' }}>
                  {tag}
                </span>
              ))}
            </div>
            
            <a href={proj.path} className="btn-outline" style={{ justifyContent: 'center', width: '100%' }}>
              <Folder size={18} /> View Repository Folder
            </a>
          </div>
        ))}
      </div>
      
      <div className="glass-panel" style={{ marginTop: '3rem', padding: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(67, 97, 238, 0.05), rgba(114, 9, 183, 0.05))' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Build a Public Portfolio</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
          Push every project you build to your own GitHub. A working link is worth more than a certificate. Make sure to document your code and use these templates!
        </p>
        <button className="btn-primary">
          <Globe size={18} /> Open GitHub Guide
        </button>
      </div>
    </div>
  );
};

export default ProjectGallery;
