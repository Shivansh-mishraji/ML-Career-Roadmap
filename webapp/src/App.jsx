import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SelfAssessment from './components/SelfAssessment';
import Roadmap from './components/Roadmap';
import ProjectGallery from './components/ProjectGallery';
import Flashcards from './components/Flashcards';
import AIAssistant from './components/AIAssistant';
import ResourceHub from './components/ResourceHub';
import JobTracker from './components/JobTracker';
import JobPrep from './components/JobPrep';
import Onboarding from './components/Onboarding';
import TutorialHub from './components/TutorialHub';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('assessment');
  const [userProfile, setUserProfile] = useState(null);
  const [tutorialContext, setTutorialContext] = useState({ activeNotebookId: null });
  
  // Load profile from local storage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('ml-user-profile');
    if (savedProfile) {
      try {
        setUserProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Failed to parse profile");
      }
    }
  }, []);

  const handleOnboardingComplete = (profileData) => {
    setUserProfile(profileData);
    localStorage.setItem('ml-user-profile', JSON.stringify(profileData));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'assessment': return <SelfAssessment key="assessment" userProfile={userProfile} setActiveTab={setActiveTab} setTutorialContext={setTutorialContext} />;
      case 'roadmap': return <Roadmap key="roadmap" userProfile={userProfile} setActiveTab={setActiveTab} setTutorialContext={setTutorialContext} />;
      case 'tutorials': return <TutorialHub key="tutorials" initialNotebookId={tutorialContext.activeNotebookId} />;
      case 'flashcards': return <Flashcards key="flashcards" onActivity={() => {
          const activity = parseInt(localStorage.getItem('ml-activity') || '0');
          localStorage.setItem('ml-activity', activity + 1);
        }} />;
      case 'jobprep': return <JobPrep key="jobprep" userProfile={userProfile} />;
      case 'ai': return <AIAssistant key="ai" />;
      case 'resources': return <ResourceHub key="resources" setActiveTab={setActiveTab} setTutorialContext={setTutorialContext} />;
      case 'projects': return <ProjectGallery key="projects" />;
      case 'jobs': return <JobTracker key="jobs" />;
      default: return <SelfAssessment key="assessment" userProfile={userProfile} setActiveTab={setActiveTab} setTutorialContext={setTutorialContext} />;
    }
  };

  // If no profile, force Onboarding Screen
  if (!userProfile) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Dynamic Background Elements */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0, animation: 'float 15s infinite alternate' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, var(--accent-glow-purple) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(50px)', zIndex: 0, animation: 'float-reverse 20s infinite alternate' }} />
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ flex: 1, padding: '3rem 4rem', marginLeft: '260px', maxWidth: '1200px', zIndex: 10, position: 'relative' }}>
        <div style={{ position: 'absolute', top: '1rem', right: '4rem', display: 'flex', gap: '1rem', alignItems: 'center', zIndex: 20 }}>
           <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '0.9rem', marginRight: '1rem' }}>
             Welcome, {userProfile.name}!
           </span>
           <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', background: 'var(--bg-secondary)', padding: '0.3rem 0.8rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
             Track: {userProfile.track.toUpperCase()}
           </span>
           <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', background: 'var(--bg-secondary)', padding: '0.3rem 0.8rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
             Timeline: {userProfile.timeline.toUpperCase()}
           </span>
           <button onClick={() => { localStorage.removeItem('ml-user-profile'); setUserProfile(null); }} className="btn-ghost" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>Reset Profile</button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ marginTop: '2rem' }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
