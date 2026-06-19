import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Loader2 } from 'lucide-react';
import Sidebar from './components/Sidebar';
import CustomCursor from './components/CustomCursor';
// CinematicBackground is lazy loaded below
import Onboarding from './components/Onboarding';
import './index.css';

// Lazy load heavy components to drastically reduce initial loading time
const SelfAssessment = lazy(() => import('./components/SelfAssessment'));
const Roadmap = lazy(() => import('./components/Roadmap'));
const ProjectGallery = lazy(() => import('./components/ProjectGallery'));
const Flashcards = lazy(() => import('./components/Flashcards'));
const AIAssistant = lazy(() => import('./components/AIAssistant'));
const ResourceHub = lazy(() => import('./components/ResourceHub'));
const JobTracker = lazy(() => import('./components/JobTracker'));
const JobPrep = lazy(() => import('./components/JobPrep'));
const TutorialHub = lazy(() => import('./components/TutorialHub'));
const FounderProfile = lazy(() => import('./components/FounderProfile'));
const CinematicBackground = lazy(() => import('./components/CinematicBackground'));

/* ── Cinematic Vignette ── */
const Vignette = () => (
  <div className="hide-on-mobile" style={{
    position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9996,
    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(2,2,10,0.55) 100%)',
  }} />
);

/* ── Holographic TopBar ── */
const TopBar = ({ userProfile, onReset, isMobile, onToggleSidebar }) => (
  <motion.div
    initial={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    style={{
      position: 'fixed',
      top: '1rem',
      right: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      gap: '0.75rem',
      zIndex: 101, // Higher than sidebar overlay if needed
    }}
  >
    {isMobile && (
      <button
        onClick={onToggleSidebar}
        style={{
          background: 'rgba(4, 4, 14, 0.88)',
          backdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '12px',
          padding: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        }}
      >
        <Menu size={20} color="#fff" />
      </button>
    )}

    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.55rem',
      padding: '0.45rem 1rem',
      background: 'rgba(4, 4, 14, 0.88)',
      backdropFilter: 'blur(28px)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '999px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 0 60px rgba(77,159,255,0.04)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3), rgba(77,159,255,0.3), rgba(155,109,255,0.2), transparent)',
      }} />

      {/* Avatar */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #00E5FF, #4D9FFF, #9B6DFF, #FF5FA0)',
          backgroundSize: '200% 200%',
          animation: 'cinemaColorShift 3s ease infinite',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.72rem', fontWeight: 800, color: '#fff',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          boxShadow: '0 0 12px rgba(0,229,255,0.4), 0 0 24px rgba(77,159,255,0.2)',
        }}
      >
        {userProfile.name?.[0]?.toUpperCase()}
      </motion.div>

      <span style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.84rem', fontWeight: 600,
        color: 'var(--text-primary)',
      }}>
        {userProfile.name}
      </span>

      {!isMobile && (
        <>
          <span style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: '0.64rem',
            padding: '0.16rem 0.52rem',
            borderRadius: '5px',
            background: 'rgba(0,229,255,0.1)',
            color: '#00E5FF',
            border: '1px solid rgba(0,229,255,0.22)',
            letterSpacing: '0.04em',
            boxShadow: '0 0 10px rgba(0,229,255,0.12)',
          }}>
            {userProfile.track?.toUpperCase()}
          </span>

          <span style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: '0.64rem',
            padding: '0.16rem 0.52rem',
            borderRadius: '5px',
            background: 'rgba(155,109,255,0.1)',
            color: '#9B6DFF',
            border: '1px solid rgba(155,109,255,0.22)',
            letterSpacing: '0.04em',
          }}>
            {userProfile.timeline}
          </span>
        </>
      )}

      <button
        onClick={onReset}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          fontSize: '0.72rem',
          fontFamily: "'Geist Mono', monospace",
          padding: '0.1rem 0.35rem',
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

/* ── 3D Page Transition Variants ── */
const cinemaVariants = {
  initial: {
    opacity: 0,
    y: 18,
    scale: 0.99,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 1.01,
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1],
    },
  },
};

/* ── Main App ── */
function App() {
  const [activeTab, setActiveTab] = useState('assessment');
  const [userProfile, setUserProfile] = useState(null);
  const [tutorialContext, setTutorialContext] = useState({ activeNotebookId: null });
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      case 'founder':     return <FounderProfile key="founder" />;
      default:            return <SelfAssessment key="assessment" userProfile={userProfile} setActiveTab={setActiveTab} setTutorialContext={setTutorialContext} />;
    }
  };

  const renderAppContent = () => {
    if (!userProfile) {
      return <Onboarding onComplete={handleOnboardingComplete} />;
    }
    return (
      <>
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab !== 'tutorials') setTutorialContext({ activeNotebookId: null });
            if (isMobile) setSidebarOpen(false);
          }}
          isMobile={isMobile}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* User profile topbar */}
        <TopBar
          userProfile={userProfile}
          onReset={() => {
            localStorage.removeItem('ml-user-profile');
            setUserProfile(null);
          }}
          isMobile={isMobile}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main content with cinematic page transitions */}
        <motion.main
          animate={{ marginLeft: isMobile ? 0 : '260px' }} // Sidebar width is ~260px on desktop
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flex: 1,
            padding: isMobile ? '5rem 1rem 1.5rem' : '4.5rem 3rem 3rem',
            minHeight: '100vh',
            zIndex: 10,
            position: 'relative',
            maxWidth: isMobile ? '100vw' : 'calc(100vw - 260px)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={{
                initial: { opacity: 0, y: isMobile ? 0 : 18, scale: isMobile ? 1 : 0.99 },
                animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
                exit: { opacity: 0, y: isMobile ? 0 : -12, scale: isMobile ? 1 : 1.01, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }
              }}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={
                <div style={{ display: 'flex', height: '50vh', alignItems: 'center', justifyContent: 'center' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <Loader2 size={32} color="var(--accent-primary)" />
                  </motion.div>
                </div>
              }>
                {renderContent()}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </motion.main>
      </>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', background: 'var(--bg-base)' }}>
      <CustomCursor />

      {/* 3D Cinematic Background (Hidden on mobile to prevent Android Chrome WebGL corruption) */}
      <div className="hide-on-mobile">
        <Suspense fallback={null}>
          <CinematicBackground />
        </Suspense>
      </div>

      {/* Vignette overlay */}
      <Vignette />

      {renderAppContent()}
    </div>
  );
}

export default App;
