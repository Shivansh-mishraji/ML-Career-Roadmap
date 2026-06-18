import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  GraduationCap, Briefcase, Rocket, Calendar,
  Compass, ArrowRight, User, Cpu, Sparkles,
  Brain, Code2, Layers, ChevronRight, Check,
  Zap, Clock, Target, TrendingUp, Play, Star,
  Shield, Award, Flame, Atom
} from 'lucide-react';
import TiltCard from './TiltCard';

/* ─── Animated Orb ─── */
const Orb = ({ x, y, size, color, delay, duration }) => (
  <motion.div
    animate={{ x: [0, 35, -25, 0], y: [0, -45, 22, 0], scale: [1, 1.12, 0.94, 1] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    style={{
      position: 'absolute', left: `${x}%`, top: `${y}%`,
      width: size, height: size, borderRadius: '50%',
      background: color, filter: 'blur(70px)', opacity: 0.4,
      pointerEvents: 'none',
    }}
  />
);

/* ─── Cinematic Particle ─── */
const CinemaParticle = ({ x, y, delay, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 0, scale: 0 }}
    animate={{ opacity: [0, 0.9, 0], y: [0, -60, -100], scale: [0, 1, 0.5] }}
    transition={{ duration: 4, delay, repeat: Infinity, repeatDelay: Math.random() * 8 + 2 }}
    style={{
      position: 'absolute', left: `${x}%`, top: `${y}%`,
      width: Math.random() > 0.6 ? 3 : 2,
      height: Math.random() > 0.6 ? 3 : 2,
      borderRadius: '50%',
      background: color,
      boxShadow: `0 0 6px ${color}, 0 0 12px ${color}60`,
    }}
  />
);

const particles = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 8,
  color: ['#00E5FF', '#4D9FFF', '#9B6DFF', '#FF5FA0', '#00FFB2'][Math.floor(Math.random() * 5)],
}));

/* ─── Scramble Text Hook ─── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
function useScramble(text, active, speed = 30) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  const iterRef = useRef(0);

  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    iterRef.current = 0;
    const interval = setInterval(() => {
      setDisplay(text.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (i < iterRef.current) return text[i];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(''));
      iterRef.current += 0.4;
      if (iterRef.current >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, active, speed]);

  return display;
}

/* ─── Step Progress Dots ─── */
const StepDots = ({ current, total }) => (
  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
    {Array.from({ length: total }).map((_, i) => (
      <motion.div
        key={i}
        animate={{
          width: i === current - 1 ? 36 : 8,
          background: i < current - 1
            ? '#00FFB2'
            : i === current - 1
              ? 'linear-gradient(90deg, #00E5FF, #4D9FFF, #9B6DFF)'
              : 'rgba(255,255,255,0.1)',
          opacity: i > current - 1 ? 0.4 : 1,
          boxShadow: i === current - 1 ? '0 0 12px rgba(77,159,255,0.6)' : 'none',
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: 6, borderRadius: 6 }}
      />
    ))}
  </div>
);

/* ─── Step Label ─── */
const StepLabel = ({ step, total, label }) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    style={{ textAlign: 'center', marginBottom: '2rem' }}
  >
    <span style={{
      fontFamily: "'Geist Mono', monospace",
      fontSize: '0.68rem', letterSpacing: '0.14em',
      color: '#00E5FF',
      background: 'rgba(0,229,255,0.08)',
      border: '1px solid rgba(0,229,255,0.2)',
      borderRadius: 999, padding: '0.25rem 1rem',
      boxShadow: '0 0 20px rgba(0,229,255,0.1)',
    }}>
      STEP {step} / {total} — {label}
    </span>
  </motion.div>
);

/* ─── Track Card ─── */
const TrackCard = ({ selected, onClick, color, gradient, glowColor, icon: Icon, title, subtitle, tags, stats, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 32, rotateX: -15 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -8, transition: { duration: 0.25 } }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    style={{ width: '100%', perspective: '1000px' }}
  >
    <div
      style={{
        position: 'relative',
        padding: '2.5rem 2.25rem',
        borderRadius: '24px',
        cursor: 'pointer',
        border: selected ? `1.5px solid ${color}` : '1px solid rgba(255,255,255,0.07)',
        background: selected
          ? `linear-gradient(145deg, ${color}14, ${color}06, rgba(6,6,16,0.96))`
          : 'rgba(10, 10, 22, 0.88)',
        backdropFilter: 'blur(28px)',
        boxShadow: selected
          ? `0 0 0 1px ${color}40, 0 30px 60px rgba(0,0,0,0.5), 0 0 80px ${color}12`
          : '0 8px 40px rgba(0,0,0,0.35)',
        transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Top shimmer line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: selected
          ? `linear-gradient(90deg, transparent, ${color}, rgba(0,229,255,0.8), ${color}, transparent)`
          : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
        boxShadow: selected ? `0 0 20px ${color}80` : 'none',
        transition: 'all 0.4s',
      }} />

      {/* Holographic background orb */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute', top: '-40%', right: '-25%',
            width: '220px', height: '220px', borderRadius: '50%',
            background: `radial-gradient(circle, ${color}20, transparent 70%)`,
            filter: 'blur(30px)', pointerEvents: 'none',
          }}
        />
      )}

      {/* Corner decoration */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: '80px', height: '80px',
        background: selected
          ? `radial-gradient(circle at bottom left, ${color}10, transparent 70%)`
          : 'transparent',
        pointerEvents: 'none',
        transition: 'all 0.4s',
      }} />

      {/* Icon */}
      <motion.div
        animate={{ rotate: selected ? [0, -5, 5, 0] : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'relative',
          width: '60px', height: '60px', borderRadius: '18px', marginBottom: '1.6rem',
          background: selected ? `${color}20` : 'rgba(255,255,255,0.06)',
          border: `1px solid ${selected ? `${color}40` : 'rgba(255,255,255,0.08)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: selected ? `0 0 30px ${color}30` : 'none',
          transition: 'all 0.35s',
        }}
      >
        <Icon size={28} color={selected ? color : 'rgba(255,255,255,0.4)'} />
        {selected && (
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            style={{
              position: 'absolute', inset: -2, borderRadius: 20,
              border: `1.5px solid ${color}50`,
              animation: 'depthPulse 2s ease infinite',
            }}
          />
        )}
      </motion.div>

      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '1.3rem', fontWeight: 800,
        color: selected ? '#fff' : 'var(--text-primary)',
        marginBottom: '0.6rem', letterSpacing: '-0.025em',
      }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
        {subtitle}
      </p>

      {/* Stats row */}
      {stats && (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: '1.05rem', fontWeight: 700,
                color: selected ? color : 'var(--text-primary)',
                lineHeight: 1,
              }}>
                {s.value}
              </p>
              <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: '0.67rem', padding: '0.22rem 0.6rem',
            borderRadius: '6px',
            background: selected ? `${color}18` : 'rgba(255,255,255,0.04)',
            color: selected ? color : 'var(--text-muted)',
            border: `1px solid ${selected ? `${color}35` : 'rgba(255,255,255,0.07)'}`,
            transition: 'all 0.3s',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Checkmark */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 30 }}
            style={{
              position: 'absolute', top: '1.4rem', right: '1.4rem',
              width: '30px', height: '30px', borderRadius: '50%',
              background: gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 16px ${color}60, 0 0 30px ${color}30`,
            }}
          >
            <Check size={16} color="#fff" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

/* ─── Timeline Card ─── */
const TimelineCard = ({ selected, onClick, color, icon: Icon, title, subtitle, tagline, intensity, bullets, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6, transition: { duration: 0.22 } }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    style={{ width: '100%' }}
  >
    <div
      style={{
        position: 'relative',
        padding: '2.25rem 1.75rem',
        borderRadius: '22px',
        cursor: 'pointer',
        border: selected ? `1.5px solid ${color}` : '1px solid rgba(255,255,255,0.07)',
        background: selected
          ? `linear-gradient(160deg, ${color}14, rgba(6,6,16,0.97))`
          : 'rgba(10,10,22,0.88)',
        backdropFilter: 'blur(24px)',
        boxShadow: selected
          ? `0 0 0 1px ${color}35, 0 24px 48px rgba(0,0,0,0.45), 0 0 60px ${color}10`
          : '0 6px 28px rgba(0,0,0,0.28)',
        transition: 'all 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
        overflow: 'hidden', textAlign: 'center',
        width: '100%',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: selected ? color : 'transparent',
        boxShadow: selected ? `0 0 16px ${color}, 0 0 30px ${color}60` : 'none',
        transition: 'all 0.35s',
      }} />

      {/* Intensity bars */}
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '1.5rem' }}>
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            animate={{
              height: `${16 + i * 10}px`,
              background: i <= intensity ? color : 'rgba(255,255,255,0.07)',
              boxShadow: i <= intensity ? `0 0 10px ${color}70` : 'none',
            }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            style={{ width: '7px', borderRadius: '4px' }}
          />
        ))}
      </div>

      <div style={{
        width: '52px', height: '52px', borderRadius: '16px', margin: '0 auto 1.2rem',
        background: `${color}18`, border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: selected ? `0 0 24px ${color}30` : 'none',
        transition: 'all 0.35s',
      }}>
        <Icon size={26} color={color} />
      </div>

      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '1.1rem', fontWeight: 800,
        color: selected ? '#fff' : 'var(--text-primary)',
        marginBottom: '0.5rem', letterSpacing: '-0.025em',
      }}>
        {title}
      </h3>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.83rem', lineHeight: 1.6, marginBottom: '1rem' }}>
        {subtitle}
      </p>

      {bullets && selected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          style={{ marginBottom: '1rem', textAlign: 'left' }}
        >
          {bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: color, flexShrink: 0 }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{b}</span>
            </div>
          ))}
        </motion.div>
      )}

      <span style={{
        fontFamily: "'Geist Mono', monospace",
        fontSize: '0.68rem', letterSpacing: '0.06em',
        padding: '0.25rem 0.75rem', borderRadius: 999,
        background: `${color}18`, color: color,
        border: `1px solid ${color}30`,
        boxShadow: selected ? `0 0 12px ${color}30` : 'none',
        transition: 'all 0.3s',
      }}>
        {tagline}
      </span>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
            style={{
              position: 'absolute', top: '1.1rem', right: '1.1rem',
              width: '24px', height: '24px', borderRadius: '50%',
              background: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 2px 10px ${color}70`,
            }}
          >
            <Check size={13} color="#fff" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

/* ─── Cinematic Word ─── */
const CinemaWord = ({ word, delay }) => {
  const letters = word.split('');
  return (
    <span style={{ display: 'inline-flex', overflow: 'hidden' }}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ y: '120%', opacity: 0, rotateX: -80 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{
            delay: delay + i * 0.04,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block', transformOrigin: 'bottom', perspective: '400px' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

/* ── MAIN COMPONENT ── */
const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [track, setTrack] = useState(null);
  const [timeline, setTimeline] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [showLensFlare, setShowLensFlare] = useState(true);
  const inputRef = useRef(null);
  const scrambledTitle = useScramble('ML CAREER ROADMAP', step === 1, 40);

  useEffect(() => {
    const t = setTimeout(() => setShowLensFlare(false), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (step === 1) setTimeout(() => inputRef.current?.focus(), 500);
  }, [step]);

  const handleComplete = () => {
    if (name && track && timeline) onComplete({ name, track, timeline });
  };

  const pageVariants = {
    enter: { opacity: 0, y: 32, filter: 'blur(8px)', scale: 0.97 },
    center: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -22, filter: 'blur(6px)', scale: 1.02, transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } },
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200, overflow: 'hidden',
      background: '#02020A',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>

      {/* ── Cinematic Lens Flare ── */}
      <AnimatePresence>
        {showLensFlare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            style={{
              position: 'absolute', inset: 0, zIndex: 999,
              background: 'radial-gradient(circle at 50% 50%, rgba(77,159,255,0.6) 0%, rgba(155,109,255,0.3) 30%, transparent 70%)',
              pointerEvents: 'none',
              mixBlendMode: 'screen',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Animated Background ── */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Orb x={-15} y={-15} size="70vw" color="radial-gradient(circle, rgba(77,159,255,0.25), transparent 65%)" delay={0} duration={18} />
        <Orb x={55} y={45} size="55vw" color="radial-gradient(circle, rgba(155,109,255,0.2), transparent 65%)" delay={2} duration={22} />
        <Orb x={25} y={65} size="35vw" color="radial-gradient(circle, rgba(0,229,255,0.15), transparent 65%)" delay={1} duration={14} />
        <Orb x={70} y={10} size="25vw" color="radial-gradient(circle, rgba(255,95,160,0.1), transparent 65%)" delay={3} duration={16} />

        {particles.map(p => <CinemaParticle key={p.id} {...p} />)}

        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(77,159,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(77,159,255,0.022) 1px, transparent 1px)`,
          backgroundSize: '58px 58px',
          mask: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 15%, transparent 100%)',
        }} />
      </div>

      {/* ── Vignette ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(2,2,10,0.65) 100%)',
      }} />

      {/* ── Card Container ── */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '960px', padding: '1.5rem 2rem' }}>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.55rem 1.25rem',
            background: 'rgba(8,8,18,0.9)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '999px', backdropFilter: 'blur(28px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 0 60px rgba(77,159,255,0.04)',
          }}>
            {/* Animated logo */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '28px', height: '28px', borderRadius: '9px', flexShrink: 0,
                background: 'linear-gradient(135deg, #00E5FF, #4D9FFF, #9B6DFF)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 14px rgba(0,229,255,0.4)',
              }}
            >
              <Atom size={15} color="#fff" />
            </motion.div>
            <span style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: '0.8rem', color: 'var(--text-secondary)', letterSpacing: '0.04em',
            }}>
              ML_HUB — AI Career Intelligence Platform
            </span>
            <span style={{
              fontSize: '0.62rem', padding: '0.13rem 0.5rem', borderRadius: '5px',
              background: 'rgba(0,255,178,0.1)', color: 'var(--success)',
              border: '1px solid rgba(0,255,178,0.22)',
              fontFamily: "'Geist Mono', monospace", letterSpacing: '0.04em',
              boxShadow: '0 0 12px rgba(0,255,178,0.15)',
            }}>v5.0</span>
          </div>
        </motion.div>

        {/* Step Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center', marginBottom: '2.5rem' }}
        >
          <StepDots current={step} total={3} />
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ──────────────── STEP 1: Identity ──────────────── */}
          {step === 1 && (
            <motion.div key="step1" variants={pageVariants} initial="enter" animate="center" exit="exit">
              <StepLabel step={1} total={3} label="IDENTITY" />

              <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <div style={{ overflow: 'hidden', marginBottom: '0.8rem', perspective: '800px' }}>
                  <motion.h1
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
                      fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.06,
                      marginBottom: '0.5rem',
                    }}
                  >
                    <span style={{
                      background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      display: 'block',
                    }}>
                      Your AI-Powered
                    </span>
                    <span style={{
                      background: 'linear-gradient(135deg, #00E5FF 0%, #4D9FFF 30%, #9B6DFF 65%, #FF5FA0 100%)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text', backgroundSize: '200% 200%',
                      animation: 'cinemaColorShift 4s ease infinite',
                      display: 'block',
                    }}>
                      ML Career Roadmap
                    </span>
                  </motion.h1>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}
                >
                  A personalized engine that adapts to{' '}
                  <em style={{ color: '#00E5FF', fontStyle: 'normal', fontWeight: 600 }}>
                    your pace, goal, and timeline.
                  </em>
                  <br />Let's start with your name.
                </motion.p>
              </div>

              {/* Feature pills */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}
              >
                {[
                  { icon: Brain, label: 'Adaptive Path', color: '#4D9FFF' },
                  { icon: Target, label: 'Personalized', color: '#9B6DFF' },
                  { icon: TrendingUp, label: 'Track Progress', color: '#00E5FF' },
                  { icon: Shield, label: 'AI-Powered', color: '#FF5FA0' },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.35rem 0.8rem',
                    background: `${color}10`,
                    border: `1px solid ${color}25`,
                    borderRadius: 999,
                    color: 'var(--text-secondary)', fontSize: '0.78rem',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                    <Icon size={13} color={color} />
                    {label}
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{ maxWidth: '460px', margin: '0 auto' }}
              >
                {/* Name input */}
                <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                  <User
                    size={18} color={inputFocused ? '#00E5FF' : 'var(--text-muted)'}
                    style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', transition: 'color 0.2s' }}
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
                      padding: '1.1rem 1.2rem 1.1rem 3.2rem',
                      background: inputFocused ? 'rgba(12,12,26,0.95)' : 'rgba(10,10,22,0.9)',
                      border: inputFocused ? '1.5px solid #00E5FF' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                      color: 'var(--text-primary)',
                      fontSize: '1.15rem',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      outline: 'none',
                      backdropFilter: 'blur(24px)',
                      transition: 'all 0.28s var(--ease-cinema)',
                      boxShadow: inputFocused
                        ? '0 0 0 3px rgba(0,229,255,0.12), 0 0 40px rgba(0,229,255,0.08), 0 10px 30px rgba(0,0,0,0.35)'
                        : '0 4px 24px rgba(0,0,0,0.3)',
                    }}
                  />
                  {name && (
                    <motion.div
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                      style={{
                        position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)',
                        width: '2px', height: '22px',
                        background: 'linear-gradient(to bottom, #00E5FF, #4D9FFF)',
                        borderRadius: '1px',
                        boxShadow: '0 0 8px rgba(0,229,255,0.5)',
                      }}
                    />
                  )}
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={() => name.trim() && setStep(2)}
                  whileHover={name.trim() ? { y: -3, scale: 1.01 } : {}}
                  whileTap={name.trim() ? { scale: 0.97 } : {}}
                  style={{
                    width: '100%', padding: '1.1rem',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.7rem',
                    background: name.trim()
                      ? 'linear-gradient(135deg, #00E5FF, #4D9FFF, #9B6DFF)'
                      : 'rgba(255,255,255,0.04)',
                    backgroundSize: '200% 200%',
                    animation: name.trim() ? 'cinemaColorShift 3s ease infinite' : 'none',
                    color: name.trim() ? '#fff' : 'var(--text-muted)',
                    border: name.trim() ? 'none' : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '16px',
                    cursor: name.trim() ? 'pointer' : 'not-allowed',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.015em',
                    boxShadow: name.trim()
                      ? '0 10px 36px rgba(77,159,255,0.4), 0 0 0 1px rgba(77,159,255,0.2), 0 0 80px rgba(0,229,255,0.1)'
                      : 'none',
                    transition: 'all 0.28s var(--ease-cinema)',
                  }}
                >
                  Begin Your Journey <ArrowRight size={20} />
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* ──────────────── STEP 2: Track ──────────────── */}
          {step === 2 && (
            <motion.div key="step2" variants={pageVariants} initial="enter" animate="center" exit="exit">
              <StepLabel step={2} total={3} label="CAREER TARGET" />

              <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
                <motion.h1
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '0.7rem' }}
                >
                  <span style={{
                    background: 'linear-gradient(135deg, #00E5FF, #4D9FFF, #9B6DFF)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    backgroundSize: '200% 200%', animation: 'cinemaColorShift 4s ease infinite',
                  }}>
                    Welcome, {name}.
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                  style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.65 }}
                >
                  Which career path are you targeting?
                  <br />This shapes every question, project, and depth focus.
                </motion.p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem', marginBottom: '2rem' }}>
                <TrackCard
                  selected={track === 'internship'}
                  onClick={() => { setTrack('internship'); setTimeout(() => setStep(3), 400); }}
                  color="#4D9FFF"
                  gradient="linear-gradient(135deg, #00E5FF, #4D9FFF)"
                  glowColor="rgba(77,159,255,0.4)"
                  icon={GraduationCap}
                  title="Internship Track"
                  subtitle="Students and recent grads targeting their first ML / Data Science internship. Core algorithms, portfolio projects, and academic depth."
                  tags={['Core ML', 'Python', 'Statistics', 'Projects', 'LeetCode']}
                  stats={[{ value: '12', label: 'TOPICS' }, { value: '8+', label: 'PROJECTS' }, { value: '200+', label: 'QUESTIONS' }]}
                  delay={0.05}
                />
                <TrackCard
                  selected={track === 'fulltime'}
                  onClick={() => { setTrack('fulltime'); setTimeout(() => setStep(3), 400); }}
                  color="#9B6DFF"
                  gradient="linear-gradient(135deg, #9B6DFF, #FF5FA0)"
                  glowColor="rgba(155,109,255,0.4)"
                  icon={Briefcase}
                  title="Full-Time Track"
                  subtitle="Engineers targeting senior ML / AI roles at top companies. Deep focus on production architecture, MLOps, system design, and distributed systems."
                  tags={['MLOps', 'System Design', 'LLMs', 'Production', 'Architecture']}
                  stats={[{ value: '18', label: 'TOPICS' }, { value: '12+', label: 'PROJECTS' }, { value: '400+', label: 'QUESTIONS' }]}
                  delay={0.14}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <button onClick={() => setStep(1)} className="btn-ghost" style={{ fontSize: '0.85rem' }}>
                  ← Back
                </button>
              </div>
            </motion.div>
          )}

          {/* ──────────────── STEP 3: Timeline ──────────────── */}
          {step === 3 && (
            <motion.div key="step3" variants={pageVariants} initial="enter" animate="center" exit="exit">
              <StepLabel step={3} total={3} label="TIMELINE" />

              <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
                <motion.h1
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '0.7rem' }}
                >
                  <span style={{
                    background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>
                    Set Your Horizon.
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}
                  style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.65 }}
                >
                  How long until your target interviews?
                  <br />This calibrates study intensity and topic prioritization.
                </motion.p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <TimelineCard
                  selected={timeline === '1month'}
                  onClick={() => setTimeline('1month')}
                  color="#FF4466"
                  icon={Flame}
                  title="1-Month Sprint"
                  subtitle="High-yield triage. Memorize patterns, grind top questions."
                  tagline="🔥 MAX INTENSITY"
                  intensity={3}
                  bullets={['Skip foundations', 'Top 50 ML questions', 'Daily mock interviews']}
                  delay={0.06}
                />
                <TimelineCard
                  selected={timeline === '3-6mo'}
                  onClick={() => setTimeline('3-6mo')}
                  color="#4D9FFF"
                  icon={Calendar}
                  title="3–6 Months"
                  subtitle="Structured build. Learn core, ship projects, ace mocks."
                  tagline="⚡ BALANCED"
                  intensity={2}
                  bullets={['Full curriculum', 'One portfolio project', 'Weekly mock sessions']}
                  delay={0.12}
                />
                <TimelineCard
                  selected={timeline === '1year+'}
                  onClick={() => setTimeline('1year+')}
                  color="#00FFB2"
                  icon={Compass}
                  title="1+ Year"
                  subtitle="Deep foundations. Master math, build research-grade projects."
                  tagline="🏗️ DEEP BUILD"
                  intensity={1}
                  bullets={['Full math foundations', 'Research-grade projects', 'Publication-ready work']}
                  delay={0.18}
                />
              </div>

              {/* Summary */}
              <AnimatePresence>
                {timeline && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    style={{
                      marginBottom: '1.75rem',
                      padding: '1.1rem 1.75rem',
                      background: 'rgba(77,159,255,0.07)',
                      border: '1px solid rgba(77,159,255,0.2)',
                      borderRadius: '16px',
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      boxShadow: '0 0 40px rgba(77,159,255,0.05)',
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles size={20} color="var(--brand-blue)" style={{ flexShrink: 0 }} />
                    </motion.div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                      <span style={{ color: '#fff', fontWeight: 700 }}>{name}</span>
                      {' '}— {track === 'internship' ? 'Internship' : 'Full-Time'} track,{' '}
                      {timeline === '1month' ? '1 month sprint' : timeline === '3-6mo' ? '3–6 month plan' : '1+ year deep dive'}.{' '}
                      <span style={{ color: '#00E5FF', fontWeight: 600 }}>Your personalized roadmap is ready. 🚀</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => setStep(2)} className="btn-ghost" style={{ fontSize: '0.85rem' }}>← Back</button>
                <motion.button
                  onClick={handleComplete}
                  whileHover={timeline ? { y: -3, scale: 1.02 } : {}}
                  whileTap={timeline ? { scale: 0.97 } : {}}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.7rem',
                    padding: '1.05rem 2.5rem',
                    background: timeline
                      ? 'linear-gradient(135deg, #00E5FF, #4D9FFF, #9B6DFF, #FF5FA0)'
                      : 'rgba(255,255,255,0.04)',
                    backgroundSize: '300% 300%',
                    animation: timeline ? 'cinemaColorShift 3s ease infinite' : 'none',
                    color: timeline ? '#fff' : 'var(--text-muted)',
                    border: timeline ? 'none' : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '16px',
                    cursor: timeline ? 'pointer' : 'not-allowed',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.015em',
                    boxShadow: timeline
                      ? '0 14px 42px rgba(77,159,255,0.45), 0 0 0 1px rgba(77,159,255,0.25), 0 0 100px rgba(0,229,255,0.12)'
                      : 'none',
                    transition: 'all 0.28s var(--ease-cinema)',
                  }}
                >
                  <motion.div
                    animate={timeline ? { rotate: [0, 360] } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles size={20} />
                  </motion.div>
                  Launch My Roadmap
                  <ArrowRight size={20} />
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
