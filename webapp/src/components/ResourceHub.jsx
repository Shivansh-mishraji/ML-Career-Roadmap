import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, BookOpen, Cloud, ArrowRight, Search, Clock, Code, PlayCircle } from 'lucide-react';
import { getRecentNotebooks } from '../utils/tutorialUtils';

const resources = [
  {
    category: 'Datasets & APIs',
    icon: Database,
    items: [
      { name: 'Kaggle Datasets', url: 'https://www.kaggle.com/datasets', desc: 'The largest community of data scientists and machine learning engineers.' },
      { name: 'Hugging Face Datasets', url: 'https://huggingface.co/datasets', desc: 'Over 100,000 ready-to-use datasets for NLP, Vision, and Audio.' },
      { name: 'Google Dataset Search', url: 'https://datasetsearch.research.google.com/', desc: 'Search engine specifically for discovering datasets across the web.' },
    ]
  },
  {
    category: 'Models & Pre-trained Weights',
    icon: Cpu,
    items: [
      { name: 'Hugging Face Model Hub', url: 'https://huggingface.co/models', desc: 'State-of-the-art open-source machine learning models.' },
      { name: 'TensorFlow Hub', url: 'https://tfhub.dev/', desc: 'Repository of trained machine learning models ready for fine-tuning.' },
      { name: 'Papers with Code', url: 'https://paperswithcode.com/', desc: 'The latest ML research papers bundled with their implementation code.' },
    ]
  },
  {
    category: 'Free GPU Compute',
    icon: Cloud,
    items: [
      { name: 'Google Colab', url: 'https://colab.research.google.com/', desc: 'Free Jupyter notebook environment that runs entirely in the cloud with free GPUs.' },
      { name: 'Kaggle Notebooks', url: 'https://www.kaggle.com/code', desc: 'No-setup, customizable, Jupyter Notebooks environment with free GPUs & TPUs.' },
      { name: 'Lightning AI Studios', url: 'https://lightning.ai/', desc: 'Code, train and deploy models seamlessly in the browser.' },
    ]
  },
  {
    category: 'Documentation & Cheatsheets',
    icon: BookOpen,
    items: [
      { name: 'PyTorch Docs', url: 'https://pytorch.org/docs/stable/index.html', desc: 'Official PyTorch documentation and tutorials.' },
      { name: 'Scikit-Learn User Guide', url: 'https://scikit-learn.org/stable/user_guide.html', desc: 'Comprehensive guide for classical machine learning.' },
      { name: 'MLOps Tools Landscape', url: 'https://landscape.lfai.foundation/', desc: 'The official landscape of the ML infrastructure ecosystem.' },
    ]
  }
];

const ResourceHub = ({ setActiveTab, setTutorialContext }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentNotebooks, setRecentNotebooks] = useState([]);

  useEffect(() => {
    setRecentNotebooks(getRecentNotebooks());
  }, []);

  const filteredResources = resources.map(category => {
    const filteredItems = category.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...category, items: filteredItems };
  }).filter(category => category.items.length > 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div variants={itemVariants} style={{ marginBottom: '3rem' }}>
        <h1 className="gradient-text mono" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>// Data_Science_Hub</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
          Curated tools, APIs, datasets, and infrastructure essential for modern ML workflows. Don't build from scratch.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1rem', marginBottom: '3rem', maxWidth: '600px' }}>
        <Search size={20} color="var(--text-muted)" style={{ marginLeft: '0.5rem', alignSelf: 'center' }} />
        <input 
          type="text" 
          placeholder="Search for 'GPU', 'Datasets', 'PyTorch'..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '1rem', fontFamily: 'Inter' }}
        />
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Practice Notebooks Section */}
        {recentNotebooks.length > 0 && (
          <motion.div variants={itemVariants}>
            <h2 className="mono" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <div style={{ padding: '0.5rem', background: 'var(--accent-glow)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-primary)' }}>
                <PlayCircle size={20} color="var(--accent-primary)" />
              </div>
              Continue Practice (Tutorial Hub)
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {recentNotebooks.map(nb => (
                <motion.div 
                  key={nb.id}
                  whileHover={{ scale: 1.03, y: -5 }}
                  onClick={() => {
                    if (setTutorialContext && setActiveTab) {
                      setTutorialContext({ activeNotebookId: nb.id });
                      setActiveTab('tutorials');
                    }
                  }}
                  className="glass-card-premium"
                  style={{ padding: '1.25rem', cursor: 'pointer', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                >
                  <h5 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>{nb.title.replace(/^[0-9]+-/, '')}</h5>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {nb.estimatedReadMins}m</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Code size={14} /> {nb.difficulty}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                    {nb.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="mono" style={{ background: 'var(--bg-tertiary)', color: 'var(--accent-primary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem' }}>#{tag}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {filteredResources.map((category, idx) => {
          const Icon = category.icon;
          return (
            <motion.div key={idx} variants={itemVariants}>
              <h2 className="mono" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <div style={{ padding: '0.5rem', background: 'var(--accent-glow)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-primary)' }}>
                  <Icon size={20} color="var(--accent-primary)" />
                </div>
                {category.category}
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {category.items.map((item, itemIdx) => (
                  <motion.a 
                    href={item.url} 
                    target="_blank" 
                    rel="noreferrer"
                    key={itemIdx} 
                    className="glass-card" 
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', color: 'inherit' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h3 className="mono gradient-accent" style={{ fontSize: '1.1rem', margin: 0 }}>{item.name}</h3>
                      <ArrowRight size={16} color="var(--text-muted)" />
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1, margin: 0 }}>{item.desc}</p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  );
};

export default ResourceHub;
