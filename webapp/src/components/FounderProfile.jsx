import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Link2, Mail, MapPin, Briefcase, GraduationCap, Code2, Sparkles, Cpu, Target } from 'lucide-react';
import shivanshPhoto from '../assets/shivansh.jpg';

const FounderProfile = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        padding: '2rem',
        position: 'relative',
      }}
    >
      {/* Background ambient glow specific to Founder page */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, rgba(155,109,255,0.05) 40%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <motion.div
        className="responsive-card founder-card"
        style={{
          width: '100%',
          maxWidth: '900px',
          background: 'rgba(4, 4, 12, 0.6)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '30px',
          padding: '4rem',
          display: 'flex',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.02)',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Cinematic Shimmer */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.5), rgba(155,109,255,0.5), transparent)',
        }} />

        {/* Left Column: Image & Core Info */}
        <div className="founder-left-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              position: 'relative',
              width: '240px',
              height: '240px',
              marginBottom: '2rem',
            }}
          >
            {/* Spinning Aura */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: -8, borderRadius: '50%',
                background: 'conic-gradient(from 0deg, transparent, rgba(0,229,255,0.8), transparent, rgba(155,109,255,0.8), transparent)',
                filter: 'blur(10px)',
                opacity: 0.7,
              }}
            />
            {/* Image Container */}
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%', position: 'relative', zIndex: 2,
              background: 'linear-gradient(135deg, #00E5FF, #9B6DFF)', padding: '4px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#111',
              }}>
                <img 
                  src={shivanshPhoto} 
                  alt="Shivansh Mishra" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%' }} 
                />
              </div>
            </div>
          </motion.div>

          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '2.2rem', fontWeight: 900,
            color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.5rem', textAlign: 'center',
          }}>
            Shivansh Mishra
          </h1>
          <p style={{
            fontFamily: "'Geist Mono', monospace", fontSize: '1rem',
            background: 'linear-gradient(90deg, #00E5FF, #9B6DFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            fontWeight: 700, marginBottom: '2rem', textAlign: 'center',
          }}>
            <Sparkles size={14} color="#00E5FF" style={{ display: 'inline', marginRight: '6px' }} />
            ML Builder & Architect
          </p>

          <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center' }}>
            {[
              { icon: Link2, url: 'https://github.com/shivansh-mishraji', color: '#fff' },
              { icon: Link2, url: 'https://www.linkedin.com/in/shivansh-mishra-132b97358', color: '#0077b5' },
              { icon: Mail, url: 'mailto:shivanshmishraji90@gmail.com', color: '#EA4335' },
            ].map((social, i) => (
              <motion.a
                key={i} href={social.url} target="_blank" rel="noreferrer"
                whileHover={{ y: -5, scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                style={{
                  width: '46px', height: '46px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
              >
                <social.icon size={20} color={social.color} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Column: Details & Bio */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{
            background: 'rgba(0,229,255,0.03)', border: '1px solid rgba(0,229,255,0.1)',
            padding: '1.5rem', borderRadius: '20px', marginBottom: '2rem',
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.8, marginBottom: 0,
            }}>
              I'm a passionate Machine Learning Engineer and Full-Stack Developer dedicated to building 
              intelligent, scalable systems. With a strong foundation in Cloud Architecture and deep learning, 
              I created this platform to democratize ML education and help aspiring engineers navigate the complexities of AI.
            </p>
          </div>

          <div className="founder-grid" style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { icon: GraduationCap, label: 'Education', value: 'B.Tech CSE' },
              { icon: MapPin, label: 'Location', value: 'Lucknow, India' },
              { icon: Cpu, label: 'Expertise', value: 'Machine Learning' },
              { icon: Code2, label: 'Tech Stack', value: 'Python, SQL, C' },
            ].map((detail, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: 'rgba(155,109,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(155,109,255,0.2)',
                }}>
                  <detail.icon size={18} color="#9B6DFF" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '2px', textTransform: 'uppercase' }}>
                    {detail.label}
                  </p>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.95rem', color: '#fff', fontWeight: 700 }}>
                    {detail.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <motion.a
            href="https://resume-webpage-ashy.vercel.app/" target="_blank" rel="noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%', padding: '1.2rem', borderRadius: '16px',
              background: 'linear-gradient(90deg, rgba(0,229,255,0.15), rgba(155,109,255,0.15))',
              border: '1px solid rgba(0,229,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem',
              textDecoration: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.1rem',
              fontWeight: 800, color: '#fff', boxShadow: '0 10px 30px rgba(0,229,255,0.15)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transform: 'translateX(-100%)', animation: 'shimmer 3s infinite',
            }} />
            <Target size={20} color="#00E5FF" />
            View Full Portfolio
          </motion.a>
        </div>
      </motion.div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.div>
  );
};

export default FounderProfile;
