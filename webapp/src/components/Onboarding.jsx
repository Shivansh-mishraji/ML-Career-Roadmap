import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, Rocket, Calendar, Compass, ArrowRight, User } from 'lucide-react';

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [track, setTrack] = useState(null); // 'internship' | 'fulltime'
  const [timeline, setTimeline] = useState(null); // '1month' | '3-6mo' | '1year+'

  const handleComplete = () => {
    if (name && track && timeline) {
      onComplete({ name, track, timeline });
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '20%', left: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0, opacity: 0.5 }} />
      
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', width: '100%', padding: '2rem' }}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="gradient-text mono" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>// Initialize_Profile</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Identify yourself to calibrate the agent.</p>
              </div>

              <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
                <div style={{ position: 'relative', marginBottom: '2rem' }}>
                  <User size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..." 
                    className="mono"
                    style={{ 
                      width: '100%', 
                      padding: '1rem 1rem 1rem 3rem', 
                      background: 'var(--bg-secondary)', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      fontSize: '1.2rem'
                    }} 
                    onKeyDown={(e) => { if(e.key === 'Enter' && name.trim()) setStep(2); }}
                    autoFocus
                  />
                </div>
                <button 
                  onClick={() => setStep(2)} 
                  disabled={!name.trim()}
                  className={name.trim() ? "btn-primary" : "btn-ghost"}
                  style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: name.trim() ? 1 : 0.5, cursor: name.trim() ? 'pointer' : 'not-allowed' }}
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="gradient-text mono" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>// Set_Target</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Welcome, {name}. What is your primary career target?</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Internship Card */}
                <motion.div 
                  className={`glass-card hover-glow ${track === 'internship' ? 'active' : ''}`}
                  whileHover={{ scale: 1.02, borderColor: 'var(--accent-primary)' }}
                  onClick={() => { setTrack('internship'); setTimeout(() => setStep(3), 300); }}
                  style={{ cursor: 'pointer', padding: '3rem 2rem', borderTop: track === 'internship' ? '4px solid var(--accent-primary)' : '1px solid var(--border-color)', background: track === 'internship' ? 'var(--bg-tertiary)' : 'var(--bg-secondary)' }}
                >
                  <GraduationCap size={48} color="var(--accent-primary)" style={{ marginBottom: '1.5rem' }} />
                  <h2 className="mono" style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Internship Track</h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    I am a student or recent grad looking for an internship. Focus on academic potential, math foundations, and core ML.
                  </p>
                </motion.div>

                {/* Full-Time Card */}
                <motion.div 
                  className={`glass-card hover-glow ${track === 'fulltime' ? 'active' : ''}`}
                  whileHover={{ scale: 1.02, borderColor: '#ea4335' }}
                  onClick={() => { setTrack('fulltime'); setTimeout(() => setStep(3), 300); }}
                  style={{ cursor: 'pointer', padding: '3rem 2rem', borderTop: track === 'fulltime' ? '4px solid #ea4335' : '1px solid var(--border-color)', background: track === 'fulltime' ? 'var(--bg-tertiary)' : 'var(--bg-secondary)' }}
                >
                  <Briefcase size={48} color="#ea4335" style={{ marginBottom: '1.5rem' }} />
                  <h2 className="mono" style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Full-Time Track</h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    I am seeking a full-time ML/AI role. Focus on production architectures, MLOps, System Design, and extreme optimization.
                  </p>
                </motion.div>
              </div>
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button onClick={() => setStep(1)} className="btn-outline">Back</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="gradient-text mono" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>// Set_Timeline</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>How much time do you have before your target interviews?</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
                <motion.div 
                  className={`glass-card hover-glow ${timeline === '1month' ? 'active' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setTimeline('1month')}
                  style={{ cursor: 'pointer', padding: '2rem', textAlign: 'center', borderTop: timeline === '1month' ? '4px solid #f43f5e' : '1px solid var(--border-color)', background: timeline === '1month' ? 'var(--bg-tertiary)' : 'var(--bg-secondary)' }}
                >
                  <Rocket size={40} color="#f43f5e" style={{ margin: '0 auto 1rem auto' }} />
                  <h3 className="mono" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>1 Month Crunch</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>High-yield triage. Skip foundations, memorize patterns.</p>
                </motion.div>

                <motion.div 
                  className={`glass-card hover-glow ${timeline === '3-6mo' ? 'active' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setTimeline('3-6mo')}
                  style={{ cursor: 'pointer', padding: '2rem', textAlign: 'center', borderTop: timeline === '3-6mo' ? '4px solid #3b82f6' : '1px solid var(--border-color)', background: timeline === '3-6mo' ? 'var(--bg-tertiary)' : 'var(--bg-secondary)' }}
                >
                  <Calendar size={40} color="#3b82f6" style={{ margin: '0 auto 1rem auto' }} />
                  <h3 className="mono" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>3-6 Months</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Structured prep. Build one project, learn algorithms.</p>
                </motion.div>

                <motion.div 
                  className={`glass-card hover-glow ${timeline === '1year+' ? 'active' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setTimeline('1year+')}
                  style={{ cursor: 'pointer', padding: '2rem', textAlign: 'center', borderTop: timeline === '1year+' ? '4px solid #10b981' : '1px solid var(--border-color)', background: timeline === '1year+' ? 'var(--bg-tertiary)' : 'var(--bg-secondary)' }}
                >
                  <Compass size={40} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
                  <h3 className="mono" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>1+ Years</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Deep foundational building. Core math & research.</p>
                </motion.div>
              </div>

              <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(2)} className="btn-outline">Back</button>
                <button 
                  onClick={handleComplete} 
                  disabled={!timeline}
                  className={timeline ? "btn-primary" : "btn-ghost"}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: timeline ? 1 : 0.5, cursor: timeline ? 'pointer' : 'not-allowed' }}
                >
                  Initialize Roadmap <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
