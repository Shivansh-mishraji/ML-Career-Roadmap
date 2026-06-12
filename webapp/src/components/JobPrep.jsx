import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ChevronLeft, ChevronRight, Terminal, BrainCircuit, Users, Server, Briefcase, GraduationCap, Award, Rocket } from 'lucide-react';
import { companyLoops, internshipLoops } from '../data/jobPrepData';

const JobPrep = () => {
  const [selectedTrack, setSelectedTrack] = useState(null); // 'internship' | 'fulltime' | null
  const [activeCompany, setActiveCompany] = useState(null);
  const [activeRound, setActiveRound] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [expLevel, setExpLevel] = useState('mid'); // fresher, mid, senior

  const renderTrackSelector = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 className="gradient-text mono" style={{ fontSize: '3rem', marginBottom: '1rem' }}>// Choose_Your_Path</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '4rem' }}>
        Interview loops differ drastically based on your career stage. Are you looking to land an internship, or a full-time engineering role?
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Internship Card */}
        <motion.div 
          className="glass-card hover-glow"
          whileHover={{ scale: 1.05, borderColor: 'var(--accent-primary)' }}
          onClick={() => { setSelectedTrack('internship'); setExpLevel('fresher'); }}
          style={{ cursor: 'pointer', padding: '3rem 2rem', borderTop: '4px solid var(--accent-primary)' }}
        >
          <GraduationCap size={48} color="var(--accent-primary)" style={{ marginBottom: '1.5rem' }} />
          <h2 className="mono" style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Internship Track</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Focuses on Academic Potential, Project Deep-Dives, Mathematical Foundations, and core Data Structures. No massive System Design expected.
          </p>
        </motion.div>

        {/* Full-Time Card */}
        <motion.div 
          className="glass-card hover-glow"
          whileHover={{ scale: 1.05, borderColor: '#ea4335' }}
          onClick={() => setSelectedTrack('fulltime')}
          style={{ cursor: 'pointer', padding: '3rem 2rem', borderTop: '4px solid #ea4335' }}
        >
          <Briefcase size={48} color="#ea4335" style={{ marginBottom: '1.5rem' }} />
          <h2 className="mono" style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Full-Time Track</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Focuses on Production ML architectures, deep System Design (Scale, Latency), extreme optimization, and Behavioral Leadership.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );

  const currentLoops = selectedTrack === 'internship' ? internshipLoops : companyLoops;

  const renderDashboard = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <button 
        onClick={() => setSelectedTrack(null)}
        className="btn-outline"
        style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <ChevronLeft size={16} /> Change Track
      </button>

      <div style={{ marginBottom: '3rem' }}>
        <h1 className="gradient-text mono" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          // {selectedTrack === 'internship' ? 'Intern_Company_Profiles' : 'Target_Company_Profiles'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
          {selectedTrack === 'internship' 
            ? "Simulate the exact interview loop you'll face as a student applying for an internship."
            : "Select your target company to simulate their exact full-time interview loop, including coding constraints and system design paradigms."}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {currentLoops.map(company => (
          <motion.div 
            key={company.id} 
            className="glass-card hover-glow"
            whileHover={{ scale: 1.02, borderColor: company.color }}
            onClick={() => setActiveCompany(company)}
            style={{ cursor: 'pointer', borderTop: `4px solid ${company.color}` }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <Building2 size={28} color={company.color} />
              <h2 className="mono" style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0 }}>{company.company}</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>Role: {company.role}</p>
            <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>"{company.motto}"</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const getIconForType = (type) => {
    if (type.includes('Coding')) return <Terminal size={18} />;
    if (type.includes('System')) return <Server size={18} />;
    if (type.includes('Theory')) return <BrainCircuit size={18} />;
    return <Users size={18} />;
  };

  const getExpIcon = (level) => {
    if (level === 'fresher') return <GraduationCap size={16} />;
    if (level === 'mid') return <Briefcase size={16} />;
    return <Award size={16} />;
  }

  const renderCompanyLoop = () => {
    // Determine the questions to show based on the activeRound and selected experience level
    let currentQuestions = [];
    if (activeRound && activeRound.questions && activeRound.questions[expLevel]) {
      currentQuestions = activeRound.questions[expLevel];
    }

    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
        <button 
          onClick={() => { setActiveCompany(null); setActiveRound(null); setActiveQuestion(null); }}
          className="btn-outline"
          style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <ChevronLeft size={16} /> Back to Companies
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ marginBottom: '3rem', borderLeft: `4px solid ${activeCompany.color}`, paddingLeft: '1.5rem' }}>
            <h1 className="mono" style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{activeCompany.company} Interview Loop</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Target: {activeCompany.role}</p>
          </div>

          {/* Experience Toggle - Only show if Full-Time track */}
          {selectedTrack === 'fulltime' && (
            <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <button onClick={() => {setExpLevel('fresher'); setActiveQuestion(null);}} className={expLevel === 'fresher' ? 'btn-primary' : 'btn-ghost'} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', gap: '0.5rem' }}>
                <Rocket size={16} /> Fresher (0-2)
              </button>
              <button onClick={() => {setExpLevel('mid'); setActiveQuestion(null);}} className={expLevel === 'mid' ? 'btn-primary' : 'btn-ghost'} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', gap: '0.5rem' }}>
                <Briefcase size={16} /> Mid (3-5)
              </button>
              <button onClick={() => {setExpLevel('senior'); setActiveQuestion(null);}} className={expLevel === 'senior' ? 'btn-primary' : 'btn-ghost'} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', gap: '0.5rem' }}>
                <Award size={16} /> Senior (5+)
              </button>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Rounds Sidebar */}
          <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activeCompany.rounds.map(round => (
              <motion.div 
                key={round.id}
                className={`glass-card ${activeRound?.id === round.id ? 'active' : ''}`}
                onClick={() => { setActiveRound(round); setActiveQuestion(null); }}
                style={{ 
                  cursor: 'pointer', 
                  borderLeft: activeRound?.id === round.id ? `4px solid ${activeCompany.color}` : '1px solid var(--border-color)',
                  background: activeRound?.id === round.id ? 'var(--bg-tertiary)' : 'var(--bg-secondary)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="mono" style={{ color: activeCompany.color, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {getIconForType(round.type)} {round.type}
                  </span>
                </div>
                <h3 className="mono" style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{round.title}</h3>
              </motion.div>
            ))}
          </div>

          {/* Round Details */}
          <div style={{ flex: '2', minWidth: '400px' }}>
            {activeRound ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h2 className="gradient-text mono" style={{ margin: 0 }}>{activeRound.title}</h2>
                  <span className="mono" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-tertiary)', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {selectedTrack === 'internship' ? <GraduationCap size={16} /> : getExpIcon(expLevel)} 
                    {selectedTrack === 'internship' ? 'INTERN LEVEL' : `${expLevel.toUpperCase()} LEVEL`}
                  </span>
                </div>
                
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
                  <strong>Focus:</strong> {activeRound.focus}
                </p>

                <h3 className="mono" style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Mock Questions:</h3>
                
                {currentQuestions && currentQuestions.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {currentQuestions.map((q, idx) => (
                      <div key={idx} className="glass-card" onClick={() => setActiveQuestion(activeQuestion === idx ? null : idx)} style={{ cursor: 'pointer' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', margin: 0, paddingRight: '2rem' }}>{idx + 1}. {q.q}</p>
                          <ChevronRight size={18} style={{ color: 'var(--text-muted)', transform: activeQuestion === idx ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s' }} />
                        </div>
                        
                        <AnimatePresence>
                          {activeQuestion === idx && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--border-color)' }}>
                                <h4 style={{ color: 'var(--warning)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>Expected Answer Framework:</h4>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{q.hint}</p>
                                
                                {q.code && (
                                  <div style={{ marginTop: '1.5rem', background: '#0d1117', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', position: 'relative' }}>
                                    <span style={{ position: 'absolute', top: '0', right: '0', background: 'var(--border-color)', color: 'var(--text-muted)', padding: '0.2rem 0.5rem', fontSize: '0.7rem', borderBottomLeftRadius: '8px' }}>SOLUTION</span>
                                    <pre style={{ margin: 0, overflowX: 'auto' }}>
                                      <code style={{ color: '#c9d1d9', fontFamily: 'Fira Code', fontSize: '0.9rem' }}>
                                        {q.code}
                                      </code>
                                    </pre>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No questions available for this experience level yet.</p>
                )}
              </motion.div>
            ) : (
              <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Building2 size={48} style={{ opacity: 0.2, margin: '0 auto 1rem auto' }} />
                <p>Select a round from the timeline to view the mock questions and grading rubrics.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <AnimatePresence mode="wait">
        {!selectedTrack ? (
          <motion.div key="selector">
            {renderTrackSelector()}
          </motion.div>
        ) : !activeCompany ? (
          <motion.div key="dashboard">
            {renderDashboard()}
          </motion.div>
        ) : (
          <motion.div key="loop">
            {renderCompanyLoop()}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default JobPrep;
