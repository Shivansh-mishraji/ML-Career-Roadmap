import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { assessmentQuestions } from '../data/roadmapData';
import ProgressGraph from './ProgressGraph';

const SelfAssessment = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [activityCount, setActivityCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('ml-roadmap-assessment');
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
    const activity = parseInt(localStorage.getItem('ml-activity') || '0');
    const checkedCount = saved ? Object.keys(JSON.parse(saved)).filter(k => JSON.parse(saved)[k]).length : 0;
    setActivityCount(activity + checkedCount);
  }, []);

  const toggleItem = (level, idx) => {
    const key = `${level}-${idx}`;
    const newItems = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(newItems);
    localStorage.setItem('ml-roadmap-assessment', JSON.stringify(newItems));
    
    const activity = parseInt(localStorage.getItem('ml-activity') || '0');
    const checkedCount = Object.keys(newItems).filter(k => newItems[k]).length;
    setActivityCount(activity + checkedCount);
  };

  const getRecommendedLevel = () => {
    for (let i = 0; i < assessmentQuestions.length; i++) {
      const qCount = assessmentQuestions[i].questions.length;
      let allChecked = true;
      for (let j = 0; j < qCount; j++) {
        if (!checkedItems[`${i}-${j}`]) {
          allChecked = false;
          break;
        }
      }
      if (!allChecked) return i;
    }
    return 'READY_FOR_DEPLOYMENT';
  };

  const recLevel = getRecommendedLevel();

  // Calculate Radar Chart Data
  // We map the levels to broader ML skill domains
  const calculateDomainScore = (levelIndex) => {
    if (!assessmentQuestions[levelIndex]) return 0;
    const qCount = assessmentQuestions[levelIndex].questions.length;
    let score = 0;
    for (let j = 0; j < qCount; j++) {
      if (checkedItems[`${levelIndex}-${j}`]) score++;
    }
    return Math.round((score / qCount) * 100);
  };

  const radarData = [
    { subject: 'Foundations & Math', A: calculateDomainScore(0), fullMark: 100 },
    { subject: 'Classical ML', A: calculateDomainScore(1), fullMark: 100 },
    { subject: 'Deep Learning', A: calculateDomainScore(2), fullMark: 100 },
    { subject: 'MLOps & Systems', A: calculateDomainScore(4), fullMark: 100 }, // Level 4 is MLOps
    { subject: 'NLP / Vision', A: calculateDomainScore(3), fullMark: 100 }, // Level 3 is architectures
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel" style={{ padding: '0.5rem 1rem', border: '1px solid var(--accent-primary)' }}>
          <p className="mono" style={{ margin: 0, color: '#fff', fontSize: '0.85rem' }}>{`${payload[0].payload.subject}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div variants={itemVariants} style={{ marginBottom: '3rem' }}>
        <h1 className="gradient-text mono" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>// Self_Assessment</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
          Evaluate your current state. Stop at the first block where assertions fail.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 className="mono" style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Skill Matrix Radar</h3>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="var(--border-color)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'Fira Code' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Radar name="Skills" dataKey="A" stroke="var(--accent-primary)" fill="var(--accent-glow)" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
            <div>
              <h3 className="mono" style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>RECOMMENDED_ENTRY_POINT</h3>
              <p className="gradient-accent mono" style={{ fontSize: '2rem', fontWeight: '700', margin: '0.2rem 0 0 0' }}>
                {recLevel === 'READY_FOR_DEPLOYMENT' ? 'SYS.DEPLOY()' : `LEVEL_${recLevel}`}
              </p>
            </div>
            <Zap size={32} color="var(--accent-primary)" style={{ opacity: 0.5 }} />
          </div>
          <div style={{ flex: 1 }}>
            <ProgressGraph activeCount={activityCount} />
          </div>
        </motion.div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {assessmentQuestions.map((levelBlock) => (
          <motion.div variants={itemVariants} key={levelBlock.level} className="glass-panel" style={{ padding: '2rem' }}>
            <h3 className="mono" style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ 
                background: 'var(--bg-tertiary)', 
                color: 'var(--text-primary)', 
                border: '1px solid var(--border-color)',
                width: '32px', height: '32px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                borderRadius: 'var(--radius-sm)' 
              }}>
                {levelBlock.level}
              </span>
              Level_{levelBlock.level} Assertions
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {levelBlock.questions.map((q, idx) => {
                const key = `${levelBlock.level}-${idx}`;
                const isChecked = !!checkedItems[key];
                return (
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    key={idx} 
                    onClick={() => toggleItem(levelBlock.level, idx)}
                    style={{ 
                      display: 'flex', alignItems: 'flex-start', gap: '1rem',
                      padding: '1rem',
                      background: isChecked ? 'var(--success-glow)' : 'var(--bg-tertiary)',
                      border: `1px solid ${isChecked ? 'var(--success)' : 'var(--border-color)'}`,
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ color: isChecked ? 'var(--success)' : 'var(--text-muted)', marginTop: '2px' }}>
                      {isChecked ? <CheckSquare size={20} /> : <Square size={20} />}
                    </div>
                    <span style={{ color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {q}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SelfAssessment;
