import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  GraduationCap, Briefcase, Rocket, Calendar,
  Compass, ArrowRight, User, Cpu, Sparkles,
  Brain, Code2, Layers, ChevronRight, Check,
  Zap, Clock, Target, TrendingUp
} from 'lucide-react';
import TiltCard from './TiltCard';

/* ─── Floating Orb ─── */
const Orb = ({ x, y, size, color, delay, duration }) => (
  <motion.div
    animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    style={{
      position: 'absolute', left: `${x}%`, top: `${y}%`,
      width: size, height: size, borderRadius: '50%',
      background: color, filter: 'blur(60px)', opacity: 0.35,
      pointerEvents: 'none',
    }}
  />
);

/* ─── Floating particle ─── */
const Particle = ({ x, y, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 0 }}
    animate={{ opacity: [0, 0.7, 0], y: [-0, -50, -80] }}
    transition={{ duration: 3.5, delay, repeat: Infinity, repeatDelay: Math.random() * 6 }}
    style={{
      position: 'absolute', left: `${x}%`, top: `${y}%`,
      width: Math.random() > 0.5 ? 3 : 2,
      height: Math.random() > 0.5 ? 3 : 2,
      borderRadius: '50%',
      background: Math.random() > 0.6 ? 'var(--brand-blue)' : Math.random() > 0.5 ? 'var(--brand-violet)' : 'var(--brand-cyan)',
    }}
  />
);

const particles = Array.from({ length: 28 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100, delay: Math.random() * 7,
}));

/* ─── Progress dots ─── */
const StepDots = ({ current, total }) => (
  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
    {Array.from({ length: total }).map((_, i) => (
      <motion.div
        key={i}
        animate={{
          width: i === current - 1 ? 32 : 8,
          background: i < current - 1
            ? 'var(--success)'
            : i === current - 1
              ? 'var(--brand-blue)'
              : 'rgba(255,255,255,0.12)',
          opacity: i > current - 1 ? 0.5 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: 6, borderRadius: 6 }}
      />
    ))}
  </div>
);

/* ─── Step Label ─── */
const StepLabel = ({ step, total, label }) => (
  <motion.div
    initial={{ opacity: 0, y: -6 }}
    animate={{ opacity: 1, y: 0 }}
    style={{ textAlign: 'center', marginBottom: '2rem' }}
  >
    <span className="mono" style={{
      fontSize: '0.7rem', letterSpacing: '0.12em',
      color: 'var(--brand-blue)',
      background: 'rgba(79,142,247,0.1)',
      border: '1px solid rgba(79,142,247,0.2)',
      borderRadius: 999, padding: '0.25rem 0.9rem',
    }}>
      STEP {step} / {total} — {label}
    </span>
  </motion.div>
);

/* ─── Track Card ─── */
const TrackCard = ({ selected, onClick, color, gradient, icon: Icon, title, subtitle, tags, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6, transition: { duration: 0.2 } }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    style={{ width: '100%' }}
  >
    <TiltCard intensity={12} className="tilt-card" style={{ width: '100%' }}>
      <div
        style={{
          position: 'relative',
          padding: '2.25rem 2rem',
          borderRadius: '22px',
          cursor: 'pointer',
          border: selected ? `1.5px solid ${color}` : '1px solid rgba(255,255,255,0.07)',
          background: selected
            ? `linear-gradient(145deg, ${color}12, ${color}05, rgba(8,8,12,0.9))`
            : 'rgba(14, 14, 20, 0.85)',
          backdropFilter: 'blur(24px)',
          boxShadow: selected
            ? `0 0 0 1px ${color}35, 0 24px 48px rgba(0,0,0,0.45), 0 0 60px ${color}10`
            : '0 4px 32px rgba(0,0,0,0.3)',
          transition: 'all 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
          overflow: 'hidden',
          width: '100%',
          height: '100%'
        }}
      >
    {/* Top shimmer */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
      background: selected
        ? `linear-gradient(90deg, transparent, ${color}90, transparent)`
        : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
    }} />
    {/* Background gradient blob */}
    {selected && (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{
          position: 'absolute', top: '-30%', right: '-20%',
          width: '180px', height: '180px', borderRadius: '50%',
          background: `radial-gradient(circle, ${color}18, transparent 70%)`,
          filter: 'blur(20px)', pointerEvents: 'none',
        }}
      />
    )}

    {/* Icon */}
    <div style={{
      position: 'relative',
      width: '54px', height: '54px', borderRadius: '16px', marginBottom: '1.4rem',
      background: `${color}15`, border: `1px solid ${color}28`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon size={26} color={color} />
    </div>

    <h3 style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '1.2rem', fontWeight: 700,
      color: selected ? '#fff' : 'var(--text-primary)',
      marginBottom: '0.5rem', letterSpacing: '-0.02em',
    }}>
      {title}
    </h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.855rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
      {subtitle}
    </p>

    {/* Tags */}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
      {tags.map(tag => (
        <span key={tag} className="mono" style={{
          fontSize: '0.67rem', padding: '0.2rem 0.55rem',
          borderRadius: '5px',
          background: selected ? `${color}15` : 'rgba(255,255,255,0.04)',
          color: selected ? color : 'var(--text-muted)',
          border: `1px solid ${selected ? `${color}30` : 'rgba(255,255,255,0.07)'}`,
        }}>
          {tag}
        </span>
      ))}
    </div>

    {/* Checkmark */}
    <AnimatePresence>
      {selected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          style={{
            position: 'absolute', top: '1.2rem', right: '1.2rem',
            width: '26px', height: '26px', borderRadius: '50%',
            background: gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 12px ${color}50`,
          }}
        >
          <Check size={14} color="#fff" strokeWidth={3} />
        </motion.div>
      )}
    </AnimatePresence>
      </div>
    </TiltCard>
  </motion.div>
);

/* ─── Timeline Card ─── */
const TimelineCard = ({ selected, onClick, color, icon: Icon, title, subtitle, tagline, intensity, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    style={{ width: '100%' }}
  >
    <TiltCard intensity={12} className="tilt-card" style={{ width: '100%' }}>
      <div
        style={{
          position: 'relative',
          padding: '2rem 1.75rem',
          borderRadius: '20px',
          cursor: 'pointer',
          border: selected ? `1.5px solid ${color}` : '1px solid rgba(255,255,255,0.07)',
          background: selected
            ? `linear-gradient(160deg, ${color}12, rgba(8,8,12,0.95))`
            : 'rgba(14,14,20,0.85)',
          backdropFilter: 'blur(20px)',
          boxShadow: selected
            ? `0 0 0 1px ${color}30, 0 20px 40px rgba(0,0,0,0.4), 0 0 40px ${color}08`
            : '0 4px 24px rgba(0,0,0,0.25)',
          transition: 'all 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
          overflow: 'hidden', textAlign: 'center',
          width: '100%',
          height: '100%'
        }}
      >
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
      background: selected ? color : 'transparent',
      boxShadow: selected ? `0 0 12px ${color}` : 'none',
      transition: 'all 0.3s',
    }} />

    {/* Intensity bars */}
    <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', marginBottom: '1.25rem' }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{
          width: '6px', height: `${14 + i * 8}px`,
          borderRadius: '3px',
          background: i <= intensity
            ? color
            : 'rgba(255,255,255,0.08)',
          boxShadow: i <= intensity ? `0 0 8px ${color}60` : 'none',
          transition: 'all 0.3s',
        }} />
      ))}
    </div>

    <div style={{
      width: '48px', height: '48px', borderRadius: '14px', margin: '0 auto 1rem',
      background: `${color}18`, border: `1px solid ${color}28`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon size={24} color={color} />
    </div>

    <h3 style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '1.05rem', fontWeight: 700,
      color: selected ? '#fff' : 'var(--text-primary)',
      marginBottom: '0.4rem', letterSpacing: '-0.02em',
    }}>
      {title}
    </h3>

    <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.55, marginBottom: '0.85rem' }}>
      {subtitle}
    </p>

    <span className="mono" style={{
      fontSize: '0.68rem', letterSpacing: '0.04em',
      padding: '0.22rem 0.65rem', borderRadius: 999,
      background: `${color}14`, color: color,
      border: `1px solid ${color}28`,
    }}>
      {tagline}
    </span>

    <AnimatePresence>
      {selected && (
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
          style={{
            position: 'absolute', top: '0.9rem', right: '0.9rem',
            width: '22px', height: '22px', borderRadius: '50%',
            background: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 2px 8px ${color}60`,
          }}
        >
          <Check size={12} color="#fff" strokeWidth={3} />
        </motion.div>
      )}
    </AnimatePresence>
      </div>
    </TiltCard>
  </motion.div>
);

/* ── MAIN COMPONENT ── */
const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [track, setTrack] = useState(null);
  const [timeline, setTimeline] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (step === 1) setTimeout(() => inputRef.current?.focus(), 400);
  }, [step]);

  const handleComplete = () => {
    if (name && track && timeline) onComplete({ name, track, timeline });
  };

  const pageVariants = {
    enter: { opacity: 0, y: 28, filter: 'blur(6px)' },
    center: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -18, filter: 'blur(4px)', transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200, overflow: 'hidden',
      background: '#050507',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Animated background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Orb x={-10} y={-10} size="60vw" color="radial-gradient(circle, rgba(79,142,247,0.22), transparent 65%)" delay={0} duration={16} />
        <Orb x={60} y={50} size="50vw" color="radial-gradient(circle, rgba(155,109,255,0.18), transparent 65%)" delay={2} duration={20} />
        <Orb x={30} y={70} size="30vw" color="radial-gradient(circle, rgba(34,211,238,0.12), transparent 65%)" delay={1} duration={12} />
        {particles.map(p => <Particle key={p.id} x={p.x} y={p.y} delay={p.delay} />)}
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
          mask: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
        }} />
      </div>

      {/* Card container */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '900px', padding: '1.5rem 2rem' }}>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.45rem 1.1rem',
            background: 'rgba(11,11,15,0.85)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: '999px', backdropFilter: 'blur(24px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
          }}>
            <div style={{
              width: '26px', height: '26px', borderRadius: '8px', flexShrink: 0,
              background: 'linear-gradient(135deg, #4F8EF7, #9B6DFF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(79,142,247,0.4)',
            }}>
              <Cpu size={14} color="#fff" />
            </div>
            <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>
              ML_HUB — AI Career Intelligence Platform
            </span>
            <span style={{
              fontSize: '0.62rem', padding: '0.12rem 0.48rem', borderRadius: '5px',
              background: 'rgba(52,211,153,0.12)', color: 'var(--success)',
              border: '1px solid rgba(52,211,153,0.25)',
              fontFamily: "'Geist Mono', monospace", letterSpacing: '0.04em',
            }}>v4.0</span>
          </div>
        </motion.div>

        {/* Steps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center', marginBottom: '2.25rem' }}>
          <StepDots current={step} total={3} />
        </div>

        <AnimatePresence mode="wait">
          {/* ──────── STEP 1: Name ──────── */}
          {step === 1 && (
            <motion.div key="step1" variants={pageVariants} initial="enter" animate="center" exit="exit">
              <StepLabel step={1} total={3} label="IDENTITY" />

              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <motion.h1
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
                    fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.08,
                    marginBottom: '1rem',
                  }}
                >
                  <span className="gradient-text">Your AI-Powered</span>
                  <br />
                  <span style={{
                    background: 'linear-gradient(135deg, #4F8EF7 0%, #9B6DFF 50%, #22D3EE 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    ML Career Roadmap
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '460px', margin: '0 auto', lineHeight: 1.65 }}
                >
                  A personalized engine that adapts to <em style={{ color: 'var(--brand-cyan)', fontStyle: 'normal', fontWeight: 500 }}>your pace, goal, and timeline.</em>
                  <br />Let's start with your name.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                style={{ maxWidth: '440px', margin: '0 auto' }}
              >
                {/* Input */}
                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                  <User
                    size={18} color={inputFocused ? 'var(--brand-blue)' : 'var(--text-muted)'}
                    style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', transition: 'color 0.2s' }}
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && name.trim()) setStep(2); }}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    placeholder="Enter your name..."
                    style={{
                      width: '100%',
                      padding: '1.05rem 1.1rem 1.05rem 3.1rem',
                      background: 'rgba(16,16,22,0.9)',
                      border: inputFocused ? '1.5px solid var(--brand-blue)' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '14px',
                      color: 'var(--text-primary)',
                      fontSize: '1.15rem',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      outline: 'none',
                      backdropFilter: 'blur(20px)',
                      transition: 'all 0.22s',
                      boxShadow: inputFocused ? '0 0 0 3px rgba(79,142,247,0.15), 0 8px 24px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.25)',
                    }}
                  />
                  {/* Cursor blink when has text */}
                  {name && (
                    <motion.div
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                      style={{
                        position: 'absolute', right: '1.1rem', top: '50%', transform: 'translateY(-50%)',
                        width: '2px', height: '20px', background: 'var(--brand-blue)', borderRadius: '1px',
                      }}
                    />
                  )}
                </div>

                {/* Feature bullets */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.75rem' }}>
                  {[
                    { icon: Brain, label: 'Adaptive Path' },
                    { icon: Target, label: 'Personalized' },
                    { icon: TrendingUp, label: 'Track Progress' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                      <Icon size={13} color="var(--brand-blue)" />
                      {label}
                    </div>
                  ))}
                </div>

                <motion.button
                  onClick={() => name.trim() && setStep(2)}
                  whileHover={name.trim() ? { y: -2, scale: 1.01 } : {}}
                  whileTap={name.trim() ? { scale: 0.98 } : {}}
                  style={{
                    width: '100%', padding: '1.05rem',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.6rem',
                    background: name.trim()
                      ? 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet))'
                      : 'rgba(255,255,255,0.04)',
                    color: name.trim() ? '#fff' : 'var(--text-muted)',
                    border: name.trim() ? 'none' : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '14px',
                    cursor: name.trim() ? 'pointer' : 'not-allowed',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.01em',
                    boxShadow: name.trim() ? '0 8px 28px rgba(79,142,247,0.35), 0 0 0 1px rgba(79,142,247,0.2)' : 'none',
                    transition: 'all 0.22s',
                  }}
                >
                  Get Started <ArrowRight size={18} />
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* ──────── STEP 2: Track ──────── */}
          {step === 2 && (
            <motion.div key="step2" variants={pageVariants} initial="enter" animate="center" exit="exit">
              <StepLabel step={2} total={3} label="CAREER TARGET" />

              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.035em', marginBottom: '0.6rem' }}
                >
                  <span style={{
                    background: 'linear-gradient(135deg, #22D3EE, #4F8EF7, #9B6DFF)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>
                    Welcome, {name}.
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                  style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}
                >
                  Which career path are you targeting? This shapes everything — <br />
                  the questions, projects, and depth we focus on.
                </motion.p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <TrackCard
                  selected={track === 'internship'}
                  onClick={() => { setTrack('internship'); setTimeout(() => setStep(3), 350); }}
                  color="#4F8EF7"
                  gradient="linear-gradient(135deg, #4F8EF7, #22D3EE)"
                  icon={GraduationCap}
                  title="Internship Track"
                  subtitle="Students and recent grads targeting their first ML/Data Science internship. Focus on core algorithms, portfolio projects, and academic depth."
                  tags={['Core ML', 'Python', 'Statistics', 'Projects', 'LeetCode']}
                  delay={0.05}
                />
                <TrackCard
                  selected={track === 'fulltime'}
                  onClick={() => { setTrack('fulltime'); setTimeout(() => setStep(3), 350); }}
                  color="#9B6DFF"
                  gradient="linear-gradient(135deg, #9B6DFF, #F472B6)"
                  icon={Briefcase}
                  title="Full-Time Track"
                  subtitle="Engineers targeting senior ML/AI roles at top companies. Deep focus on production architecture, MLOps, system design, and distributed systems."
                  tags={['MLOps', 'System Design', 'LLMs', 'Production', 'Architecture']}
                  delay={0.12}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <button onClick={() => setStep(1)} className="btn-ghost" style={{ fontSize: '0.85rem' }}>
                  ← Back
                </button>
              </div>
            </motion.div>
          )}

          {/* ──────── STEP 3: Timeline ──────── */}
          {step === 3 && (
            <motion.div key="step3" variants={pageVariants} initial="enter" animate="center" exit="exit">
              <StepLabel step={3} total={3} label="TIMELINE" />

              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.035em', marginBottom: '0.6rem' }}
                >
                  <span className="gradient-text">Set Your Horizon.</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                  style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}
                >
                  How long until your target interviews? <br />
                  This calibrates your study intensity and topic prioritization.
                </motion.p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <TimelineCard
                  selected={timeline === '1month'}
                  onClick={() => setTimeline('1month')}
                  color="#F87171"
                  icon={Rocket}
                  title="1-Month Sprint"
                  subtitle="High-yield triage. Skip foundations, memorize patterns, grind top questions."
                  tagline="🔥 MAX INTENSITY"
                  intensity={3}
                  delay={0.05}
                />
                <TimelineCard
                  selected={timeline === '3-6mo'}
                  onClick={() => setTimeline('3-6mo')}
                  color="#4F8EF7"
                  icon={Calendar}
                  title="3–6 Months"
                  subtitle="Structured build. Learn core algorithms, ship one project, ace mock interviews."
                  tagline="⚡ BALANCED"
                  intensity={2}
                  delay={0.10}
                />
                <TimelineCard
                  selected={timeline === '1year+'}
                  onClick={() => setTimeline('1year+')}
                  color="#34D399"
                  icon={Compass}
                  title="1+ Year"
                  subtitle="Deep foundations. Master the math, build research-grade projects, go elite."
                  tagline="🏗️ DEEP BUILD"
                  intensity={1}
                  delay={0.15}
                />
              </div>

              {/* Summary preview when all selected */}
              <AnimatePresence>
                {timeline && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    style={{
                      marginBottom: '1.5rem',
                      padding: '1rem 1.5rem',
                      background: 'rgba(79,142,247,0.07)',
                      border: '1px solid rgba(79,142,247,0.2)',
                      borderRadius: '14px',
                      display: 'flex', alignItems: 'center', gap: '1rem',
                    }}
                  >
                    <Sparkles size={18} color="var(--brand-blue)" style={{ flexShrink: 0 }} />
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                      <span style={{ color: '#fff', fontWeight: 600 }}>{name}</span>
                      {' '}— {track === 'internship' ? 'Internship' : 'Full-Time'} track, {timeline === '1month' ? '1 month sprint' : timeline === '3-6mo' ? '3–6 month plan' : '1+ year deep dive'}.
                      {' '}<span style={{ color: 'var(--brand-blue)' }}>Your roadmap is ready to generate.</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => setStep(2)} className="btn-ghost" style={{ fontSize: '0.85rem' }}>← Back</button>
                <motion.button
                  onClick={handleComplete}
                  whileHover={timeline ? { y: -2, scale: 1.02 } : {}}
                  whileTap={timeline ? { scale: 0.98 } : {}}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.65rem',
                    padding: '0.95rem 2.25rem',
                    background: timeline
                      ? 'linear-gradient(135deg, var(--brand-blue), var(--brand-violet))'
                      : 'rgba(255,255,255,0.04)',
                    color: timeline ? '#fff' : 'var(--text-muted)',
                    border: timeline ? 'none' : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '14px',
                    cursor: timeline ? 'pointer' : 'not-allowed',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.01em',
                    boxShadow: timeline ? '0 10px 36px rgba(79,142,247,0.4), 0 0 0 1px rgba(79,142,247,0.2)' : 'none',
                    transition: 'all 0.22s',
                  }}
                >
                  <Sparkles size={18} />
                  Initialize My Roadmap
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
