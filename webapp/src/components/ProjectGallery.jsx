import React from 'react';
import { Globe, Folder, Database, Workflow } from 'lucide-react';

const ProjectGallery = () => {
  const projects = [
    {
      title: 'SYS.ARCH: ML Engineer',
      type: 'ARCHITECTURE_BLUEPRINT',
      description: 'Stop writing giant Jupyter Notebooks. Learn how to write modular .py scripts, structured src/ folders, and Scikit-Learn Pipelines.',
      level: 'LEVEL_2 & 4',
      tags: ['Scikit-Learn', 'Pipelines', 'OOP'],
      path: '../ml-engineer-reference-project',
      icon: Database
    },
    {
      title: 'SYS.ARCH: MLOps',
      type: 'PRODUCTION_BLUEPRINT',
      description: 'Learn Docker, MLflow tracking, and CI/CD. Use it as a direct template for your own final year or portfolio projects.',
      level: 'LEVEL_4',
      tags: ['Docker', 'MLflow', 'CI/CD'],
      path: '../mlops-reference-project',
      icon: Workflow
    },
    {
      title: 'GEN.IDEA: Real-Time Projects',
      type: 'IDEA_GENERATOR',
      description: 'Pick an idea from this list when you need to build your portfolio. Contains practical implementations.',
      level: 'ALL_LEVELS',
      tags: ['Portfolio', 'Ideas'],
      path: '../internship-prep',
      icon: Folder
    }
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="gradient-text mono" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>// Architecture_Blueprints</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
          Real world architecture blueprints and project templates. Do not guess how to structure your repositories.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {projects.map((proj, idx) => {
          const Icon = proj.icon;
          return (
            <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span className="mono" style={{ background: 'var(--bg-secondary)', color: 'var(--accent-primary)', border: '1px solid var(--border-color)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: '600' }}>
                  [{proj.type}]
                </span>
                <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{proj.level}</span>
              </div>
              
              <h3 className="mono" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icon size={20} color="var(--text-muted)" /> {proj.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1, fontSize: '0.95rem' }}>{proj.description}</p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {proj.tags.map(tag => (
                  <span key={tag} className="mono" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', border: '1px solid var(--border-color)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <a href={proj.path} className="btn-outline" style={{ justifyContent: 'center', width: '100%' }}>
                <Folder size={16} /> Open Directory
              </a>
            </div>
          )
        })}
      </div>
      
      <div className="glass-panel" style={{ marginTop: '3rem', padding: '2.5rem', textAlign: 'center', borderLeft: '4px solid var(--accent-secondary)' }}>
        <h3 className="mono gradient-text" style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Deploy.to(GitHub)</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
          Push every project you build to your own GitHub. A working deployment link is worth more than a certificate. Make sure to document your code.
        </p>
        <button className="btn-primary">
          <Globe size={18} /> Open Repository Guidelines
        </button>
      </div>
    </div>
  );
};

export default ProjectGallery;
