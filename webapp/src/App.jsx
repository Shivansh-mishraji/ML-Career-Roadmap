import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SelfAssessment from './components/SelfAssessment';
import Roadmap from './components/Roadmap';
import ProjectGallery from './components/ProjectGallery';
import Flashcards from './components/Flashcards';
import AIAssistant from './components/AIAssistant';
import ResourceHub from './components/ResourceHub';
import JobTracker from './components/JobTracker';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('assessment');

  const renderContent = () => {
    switch (activeTab) {
      case 'assessment': return <SelfAssessment key="assessment" />;
      case 'roadmap': return <Roadmap key="roadmap" />;
      case 'flashcards': return <Flashcards key="flashcards" onActivity={() => {
          const activity = parseInt(localStorage.getItem('ml-activity') || '0');
          localStorage.setItem('ml-activity', activity + 1);
        }} />;
      case 'ai': return <AIAssistant key="ai" />;
      case 'resources': return <ResourceHub key="resources" />;
      case 'projects': return <ProjectGallery key="projects" />;
      case 'jobs': return <JobTracker key="jobs" />;
      default: return <SelfAssessment key="assessment" />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Dynamic Background Elements */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0, animation: 'float 15s infinite alternate' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, var(--accent-glow-purple) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(50px)', zIndex: 0, animation: 'float-reverse 20s infinite alternate' }} />
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ flex: 1, padding: '3rem 4rem', marginLeft: '260px', maxWidth: '1200px', zIndex: 10, position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
