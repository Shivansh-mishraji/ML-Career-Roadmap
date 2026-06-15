import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
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
import CustomCursor from './components/CustomCursor';
import './index.css';

/* ── Animated Background Canvas ── */
const BackgroundOrbs = () => (
  <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    {/* Primary orb — blue */}
    <div style={{
      position: 'absolute',
      top: '-10%', left: '-5%',
      width: '50vw', height: '50vw',
      background: 'radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 65%)',
      borderRadius: '50%',
      filter: 'blur(30px)',
      animation: 'float 18s ease-in-out infinite alternate',
    }} />
    {/* Secondary orb — violet */}
    <div style={{
      position: 'absolute',
      bottom: '-15%', right: '-10%',
      width: '60vw', height: '60vw',
      background: 'radial-gradient(circle, rgba(155,109,255,0.10) 0%, transparent 65%)',
      borderRadius: '50%',
      filter: 'blur(40px)',
      animation: 'float-reverse 22s ease-in-out infinite alternate',
    }} />
    {/* Tertiary orb — cyan accent */}
    <div style={{
      position: 'absolute',
      top: '40%', left: '35%',
      width: '30vw', height: '30vw',
      background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 65%)',
      borderRadius: '50%',
      filter: 'blur(20px)',
      animation: 'float 12s ease-in-out 3s infinite alternate',
    }} />
    {/* Grid overlay */}
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
      `,
      backgroundSize: '60px 60px',
      mask: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
    }} />
  </div>
);

/* ── Topbar User Profile Strip ── */
const TopBar = ({ userProfile, onReset }) => (
  <motion.div
    initial={{ opacity: 0, y: -12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.4 }}
    style={{
      position: 'fixed',
      top: '1rem',
      right: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      zIndex: 50,
    }}
  >
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.4rem 1rem',
      background: 'rgba(11, 11, 15, 0.8)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '999px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    }}>
      {/* Avatar */}
      <div style={{
        width: '26px', height: '26px', borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.7rem', fontWeight: 700, color: '#fff',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        {userProfile.name?.[0]?.toUpperCase()}
      </div>

      <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-primary)' }}>
        {userProfile.name}
      </span>

      <span style={{
        fontFamily: "'Geist Mono',monospace",
        fontSize: '0.65rem',
        padding: '0.15rem 0.5rem',
        borderRadius: '4px',
        background: 'rgba(79,142,247,0.12)',
        color: 'var(--brand-blue)',
        border: '1px solid rgba(79,142,247,0.25)',
        letterSpacing: '0.04em',
      }}>
        {userProfile.track?.toUpperCase()}
      </span>

      <span style={{
        fontFamily: "'Geist Mono',monospace",
        fontSize: '0.65rem',
        padding: '0.15rem 0.5rem',
        borderRadius: '4px',
        background: 'rgba(155,109,255,0.12)',
        color: 'var(--brand-violet)',
        border: '1px solid rgba(155,109,255,0.25)',
        letterSpacing: '0.04em',
      }}>
        {userProfile.timeline}
      </span>

      <button
        onClick={onReset}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          fontSize: '0.7rem',
          fontFamily: "'Geist Mono',monospace",
          padding: '0.1rem 0.3rem',
          borderRadius: '4px',
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => e.target.style.color = 'var(--danger)'}
        onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
      >
        ✕
      </button>
    </div>
  </motion.div>
);

/* ── Main App ── */
function App() {
  const [activeTab, setActiveTab] = useState('assessment');
  const [userProfile, setUserProfile] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [tutorialContext, setTutorialContext] = useState({ activeNotebookId: null });

  useEffect(() => {
    const savedProfile = localStorage.getItem('ml-user-profile');
    if (savedProfile) {
      try { setUserProfile(JSON.parse(savedProfile)); }
      catch (e) { console.error('Failed to parse profile'); }
    }
  }, []);

  const handleOnboardingComplete = (profileData) => {
    setUserProfile(profileData);
    localStorage.setItem('ml-user-profile', JSON.stringify(profileData));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'assessment':  return <SelfAssessment key="assessment" userProfile={userProfile} setActiveTab={setActiveTab} setTutorialContext={setTutorialContext} />;
      case 'roadmap':     return <Roadmap key="roadmap" userProfile={userProfile} setActiveTab={setActiveTab} setTutorialContext={setTutorialContext} />;
      case 'tutorials':   return <TutorialHub key="tutorials" initialNotebookId={tutorialContext.activeNotebookId} />;
      case 'flashcards':  return <Flashcards key="flashcards" onActivity={() => { const a = parseInt(localStorage.getItem('ml-activity') || '0'); localStorage.setItem('ml-activity', a + 1); }} />;
      case 'jobprep':     return <JobPrep key="jobprep" userProfile={userProfile} />;
      case 'ai':          return <AIAssistant key="ai" />;
      case 'resources':   return <ResourceHub key="resources" setActiveTab={setActiveTab} setTutorialContext={setTutorialContext} />;
      case 'projects':    return <ProjectGallery key="projects" />;
      case 'jobtracker':  return <JobTracker key="jobtracker" />;
      default:            return <SelfAssessment key="assessment" userProfile={userProfile} setActiveTab={setActiveTab} setTutorialContext={setTutorialContext} />;
    }
  };

  if (!userProfile) return <Onboarding onComplete={handleOnboardingComplete} />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', background: 'var(--bg-base)' }}>
      <CustomCursor />
      <BackgroundOrbs />

      <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); if (tab !== 'tutorials') setTutorialContext({ activeNotebookId: null }); }} />

      <TopBar
        userProfile={userProfile}
        onReset={() => { localStorage.removeItem('ml-user-profile'); setUserProfile(null); }}
      />

      <motion.main
        animate={{ marginLeft: sidebarWidth + 'px' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          flex: 1,
          padding: '4.5rem 3rem 3rem',
          minHeight: '100vh',
          zIndex: 10,
          position: 'relative',
          maxWidth: `calc(100vw - ${sidebarWidth}px)`,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </div>
  );
}

export default App;
