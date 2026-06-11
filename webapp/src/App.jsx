import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SelfAssessment from './components/SelfAssessment';
import Roadmap from './components/Roadmap';
import ProjectGallery from './components/ProjectGallery';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('assessment');

  const renderContent = () => {
    switch (activeTab) {
      case 'assessment':
        return <SelfAssessment />;
      case 'roadmap':
        return <Roadmap />;
      case 'projects':
        return <ProjectGallery />;
      default:
        return <SelfAssessment />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ flex: 1, padding: '2rem 4rem', marginLeft: '250px', maxWidth: '1200px' }}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
