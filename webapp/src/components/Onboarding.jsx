import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Briefcase, Rocket,
  Calendar, Compass, ArrowRight, User,
  Cpu, Sparkles, Clock
} from 'lucide-react';

/* Animated particle dots */
const Particle = ({ x, y, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0], y: [0, -40] }}
    transition={{ duration: 3, delay, repeat: Infinity, repeatDelay: Math.random() * 4 }}
    style={{
      position: 'absolute', left: `${x}%`, top: `${y}%`,
      width: 3, height: 3, borderRadius: '50%',
      background: Math.random() > 0.5 ? 'var(--brand-blue)' : 'var(--brand-violet)',
    }}
  />
);

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 5,
}));

/* Step indicator */
const StepDots = ({ current, total }) => (
  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '3rem' }}>
    {Array.from({ length: total }).map((_, i) => (
      <motion.div
        key={i}
        animate={{
          width: i === current - 1 ? '28px' : '8px',
          background: i === current - 1 ? 'var(--brand-blue)' : 'rgba(255,255,255,0.15)',
        }}
        transition={{ duration: 0.3 }}
        style={{ height: '6px', borderRadius: '3px' }}
      />
    ))}
  </div>
);

/* Selection card */
const SelectCard = ({ selected, onClick, color, icon: Icon, title, subtitle, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -4, scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    style={{
      position: 'relative',
      padding: '2.5rem 2rem',
      borderRadius: '20px',
      cursor: 'pointer',
      border: selected ? `1px solid ${color}` : '1px solid rgba(255,255,255,0.08)',
      background: selected
        ? `linear-gradient(145deg, ${color}14, ${color}06)`
        : 'rgba(14, 14, 20, 0.8)',
      backdropFilter: 'blur(20px)',
      boxShadow: selected
        ? `0 0 0 1px ${color}40, 0 20px 40px rgba(0,0,0,0.4), 0 0 40px ${color}12`
        : '0 4px 24px rgba(0,0,0,0.3)',
      transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
      overflow: 'hidden',
    }}
  >
    {/* Top highlight */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
      background: selected
        ? `linear-gradient(90deg, transparent, ${color}80, transparent)`
        : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
    }} />

    {/* Icon bubble */}
    <div style={{
      width: '52px', height: '52px', borderRadius: '14px', marginBottom: '1.5rem',
      background: `${color}18`,
      border: `1px solid ${color}30`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon size={26} color={color} />
    </div>

    <h3 style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '1.3rem', fontWeight: 700,
      color: selected ? '#fff' : 'var(--text-primary)',
      marginBottom: '0.6rem',
    }}>
      {title}
    </h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55 }}>{subtitle}</p>

    {selected && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        style={{
          position: 'absolute', top: '1rem', right: '1rem',
          width: '22px', height: '22px', borderRadius: '50%',
          background: color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
          <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    )}
  </motion.div>
);

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [track, setTrack] = useState(null);
  const [timeline, setTimeline] = useState(null);

  const handleComplete = () => {
    if (name && track && timeline) onComplete({ name, track, timeline });
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'var(--bg-base)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Animated background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {particles.map(p => <Particle key={p.id} x={p.x} y={p.y} delay={p.delay} />)}
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%',
          width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(79,142,247,0.10) 0%, transparent 60%)',
          borderRadius: '50%', filter: 'blur(40px)',
          animation: 'float 16s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-10%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(155,109,255,0.10) 0%, transparent 60%)',
          borderRadius: '50%', filter: 'blur(40px)',
          animation: 'float-reverse 20s ease-in-out infinite alternate',
        }} />
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '860px', padding: '2rem' }}>

        {/* Brand mark */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.5rem 1rem',
            background: 'rgba(11,11,15,0.8)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '999px',
            backdropFilter: 'blur(20px)',
          }}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '7px',
              background: 'linear-gradient(135deg, #4F8EF7, #9B6DFF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Cpu size={14} color="#fff" />
            </div>
            <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>ML_HUB — Career Intelligence Platform</span>
            <span style={{
              fontSize: '0.65rem', padding: '0.1rem 0.45rem',
              borderRadius: '4px', background: 'rgba(52,211,153,0.12)',
              color: 'var(--success)', border: '1px solid rgba(52,211,153,0.25)',
              fontFamily: "'Geist Mono', monospace",
            }}>v4.0</span>
          </div>
        </motion.div>

        <StepDots current={step} total={3} />

        <AnimatePresence mode="wait">
          {/* ── STEP 1 ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    marginBottom: '0.75rem',
                    lineHeight: 1.1,
                  }}
                >
                  <span className="gradient-text">Your AI-Powered</span>
                  <br />
                  <span className="gradient-accent">ML Career Roadmap</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto' }}
                >
                  Let's calibrate your personalized learning engine. First, what should we call you?
                </motion.p>
              </div>

              <div style={{ maxWidth: '420px', margin: '0 auto' }}>
                <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                  <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && name.trim()) setStep(2); }}
                    placeholder="Enter your name..."
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '1rem 1rem 1rem 3rem',
                      background: 'rgba(18,18,24,0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '14px',
                      color: 'var(--text-primary)',
                      fontSize: '1.1rem',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      outline: 'none',
                      backdropFilter: 'blur(16px)',
                      transition: 'all 0.2s',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'var(--brand-blue)'; e.target.style.boxShadow = '0 0 0 3px rgba(79,142,247,0.15)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                <motion.button
                  onClick={() => name.trim() && setStep(2)}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                    background: name.trim()
                      ? 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet))'
                      : 'rgba(255,255,255,0.05)',
                    color: name.trim() ? '#fff' : 'var(--text-muted)',
                    border: 'none', borderRadius: '14px', cursor: name.trim() ? 'pointer' : 'not-allowed',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600, fontSize: '1rem',
                    transition: 'all 0.2s',
                    boxShadow: name.trim() ? '0 8px 28px rgba(79,142,247,0.35)' : 'none',
                  }}
                >
                  Continue <ArrowRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.6rem' }}>
                  <span className="gradient-iris">Welcome, {name}.</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>What's your primary career objective?</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <SelectCard
                  selected={track === 'internship'}
                  onClick={() => { setTrack('internship'); setTimeout(() => setStep(3), 320); }}
                  color="#4F8EF7"
                  icon={GraduationCap}
                  title="Internship Track"
                  subtitle="Student or recent grad targeting internship roles. Focus on academic ML, core algorithms, and project portfolio."
                  delay={0.05}
                />
                <SelectCard
                  selected={track === 'fulltime'}
                  onClick={() => { setTrack('fulltime'); setTimeout(() => setStep(3), 320); }}
                  color="#9B6DFF"
                  icon={Briefcase}
                  title="Full-Time Track"
                  subtitle="Experienced engineer targeting senior ML/AI roles. Deep focus on production systems, MLOps, and system design."
                  delay={0.12}
                />
              </div>
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button onClick={() => setStep(1)} className="btn-ghost">← Back</button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.6rem' }}>
                  <span className="gradient-text">Set Your Horizon.</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>How much time until your target interviews?</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
                <SelectCard
                  selected={timeline === '1month'}
                  onClick={() => setTimeline('1month')}
                  color="#F87171"
                  icon={Rocket}
                  title="1-Month Sprint"
                  subtitle="High-yield triage. Memorize patterns, skip foundations."
                  delay={0.05}
                />
                <SelectCard
                  selected={timeline === '3-6mo'}
                  onClick={() => setTimeline('3-6mo')}
                  color="#4F8EF7"
                  icon={Calendar}
                  title="3–6 Months"
                  subtitle="Structured prep. Build one project, learn core algorithms."
                  delay={0.1}
                />
                <SelectCard
                  selected={timeline === '1year+'}
                  onClick={() => setTimeline('1year+')}
                  color="#34D399"
                  icon={Compass}
                  title="1+ Year"
                  subtitle="Deep foundational building. Core math and research-level depth."
                  delay={0.15}
                />
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => setStep(2)} className="btn-ghost">← Back</button>
                <motion.button
                  onClick={handleComplete}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    padding: '0.85rem 2rem',
                    background: timeline
                      ? 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet))'
                      : 'rgba(255,255,255,0.05)',
                    color: timeline ? '#fff' : 'var(--text-muted)',
                    border: 'none', borderRadius: '14px', cursor: timeline ? 'pointer' : 'not-allowed',
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontWeight: 700, fontSize: '1rem',
                    boxShadow: timeline ? '0 8px 32px rgba(79,142,247,0.4)' : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  <Sparkles size={18} />
                  Initialize Roadmap
                  <ArrowRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
