import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Zap, ChevronRight, Award, Crosshair, BookOpen } from 'lucide-react';
// Framer motion stripped from this component to prevent mobile GPU crashes
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { assessmentQuestions, roadmapData } from '../data/roadmapData';
import { getNotebooksByLevel } from '../utils/tutorialUtils';
import ProgressGraph from './ProgressGraph';
import TiltCard from './TiltCard';

const SelfAssessment = ({ userProfile, setActiveTab, setTutorialContext }) => {
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

  // Radar Chart Data Calculation
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
    { subject: 'Python', A: calculateDomainScore(0), fullMark: 100 },
    { subject: 'Math/Stats', A: calculateDomainScore(1), fullMark: 100 },
    { subject: 'Data/SQL', A: calculateDomainScore(2), fullMark: 100 },
    { subject: 'EDA', A: calculateDomainScore(3), fullMark: 100 },
    { subject: 'Classical ML', A: calculateDomainScore(4), fullMark: 100 },
    { subject: 'DL Basics', A: calculateDomainScore(5), fullMark: 100 },
    { subject: 'CV & NLP', A: calculateDomainScore(6), fullMark: 100 },
    { subject: 'LLMs', A: calculateDomainScore(7), fullMark: 100 },
    { subject: 'Agentic/RAG', A: calculateDomainScore(8), fullMark: 100 },
    { subject: 'MLOps', A: calculateDomainScore(9), fullMark: 100 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card-premium" style={{ padding: '0.5rem 1rem', border: '1px solid var(--accent-primary)' }}>
          <p className="mono" style={{ margin: 0, color: '#fff', fontSize: '0.85rem' }}>{`${payload[0].payload.subject}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };



  // Dynamic Content Generation
  const getNextObjectives = () => {
    if (recLevel === 'READY_FOR_DEPLOYMENT') return [];
    return assessmentQuestions[recLevel].questions.filter((_, idx) => !checkedItems[`${recLevel}-${idx}`]);
  };

  const getMasteredSkills = () => {
    const mastered = [];
    assessmentQuestions.forEach((block) => {
      block.questions.forEach((q, idx) => {
        if (checkedItems[`${block.level}-${idx}`]) {
          mastered.push({ level: block.level, q });
        }
      });
    });
    return mastered.reverse().slice(0, 5); // Last 5 mastered
  };

  return (
    <div className="fade-in-up">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="gradient-text mono" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>// Command_Center</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
          Your personalized ML operations dashboard. Track progress, find bottlenecks, and get your next learning directives.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {/* Radar Chart */}
        <TiltCard className="glass-card-premium" intensity={8} style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className="mono" style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Crosshair size={18} color="var(--accent-primary)" /> Skill Matrix Radar
          </h3>
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
        </TiltCard>
        
        {/* Dynamic Recommender */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'space-between', flex: 1 }}>
            <div>
              <h3 className="mono" style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>RECOMMENDED_ENTRY_POINT</h3>
              <p className="gradient-accent mono" style={{ fontSize: '2rem', fontWeight: '700', margin: '0.2rem 0 0 0' }}>
                {recLevel === 'READY_FOR_DEPLOYMENT' ? 'SYS.DEPLOY()' : `LEVEL_${recLevel}`}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                {recLevel !== 'READY_FOR_DEPLOYMENT' && roadmapData[recLevel]?.title}
              </p>
            </div>
            <Zap size={32} color="var(--accent-primary)" style={{ opacity: 0.5 }} />
          </div>
          
          <TiltCard className="glass-card" intensity={6} style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
            <h3 className="mono" style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ChevronRight size={18} color="var(--warning)" /> Next Objectives
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', flex: 1 }}>
              {getNextObjectives().length > 0 ? (
                getNextObjectives().map((obj, i) => (
                  <div key={i} style={{ background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: '4px', borderLeft: '2px solid var(--warning)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {obj}
                  </div>
                ))
              ) : (
                <div style={{ color: 'var(--success)', fontSize: '0.9rem' }}>All current level objectives met. Proceed to next module.</div>
              )}
            </div>
          </TiltCard>
        </div>

        {/* Mastered Log & Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem', flex: 1 }}>
             <h3 className="mono" style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} color="var(--success)" /> Recently Mastered
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {getMasteredSkills().length > 0 ? (
                getMasteredSkills().map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--success)' }}>✔</span>
                    <span><span style={{ color: 'var(--text-secondary)' }}>[L{item.level}]</span> {item.q}</span>
                  </div>
                ))
              ) : (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No skills mastered yet. Start ticking off mastery checks below!</div>
              )}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <ProgressGraph activeCount={activityCount} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <h2 className="mono" style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          Mastery Checklists
        </h2>
        {assessmentQuestions.map((levelBlock, index) => {
          const isInternshipSkip = userProfile?.track === 'internship' && index >= 7; // Skip Level 7, 8, 9

          return (
            <div key={levelBlock.level} className={`glass-panel ${isInternshipSkip ? 'skipped' : ''}`} style={{ padding: '2rem', border: recLevel === levelBlock.level && !isInternshipSkip ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)', opacity: isInternshipSkip ? 0.4 : 1 }}>
              <h3 className="mono" style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', wordBreak: 'break-word', fontSize: '1.2rem' }}>
                <span style={{ 
                  background: recLevel === levelBlock.level && !isInternshipSkip ? 'var(--accent-glow)' : 'var(--bg-tertiary)', 
                  color: recLevel === levelBlock.level && !isInternshipSkip ? 'var(--accent-primary)' : 'var(--text-primary)', 
                  border: `1px solid ${recLevel === levelBlock.level && !isInternshipSkip ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  width: '32px', height: '32px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  borderRadius: 'var(--radius-sm)' 
                }}>
                  {levelBlock.level}
                </span>
                Level_{levelBlock.level} Mastery Checks
                {isInternshipSkip && <span style={{ fontSize: '0.7rem', background: 'var(--warning)', color: '#000', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 'bold', marginLeft: 'auto' }}>SKIPPED FOR INTERNS</span>}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {levelBlock.questions.map((q, idx) => {
                  const key = `${levelBlock.level}-${idx}`;
                  const isChecked = !!checkedItems[key];
                  return (
                    <div 
                      key={idx} 
                      onClick={() => { if(!isInternshipSkip) toggleItem(levelBlock.level, idx); }}
                      className="question-item"
                      style={{ 
                        display: 'flex', alignItems: 'flex-start', gap: '1rem',
                        padding: '1rem',
                        background: isChecked ? 'var(--success-glow)' : 'var(--bg-tertiary)',
                        border: `1px solid ${isChecked ? 'var(--success)' : 'var(--border-color)'}`,
                        borderRadius: 'var(--radius-sm)',
                        cursor: isInternshipSkip ? 'not-allowed' : 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <div style={{ color: isChecked ? 'var(--success)' : 'var(--text-muted)', marginTop: '2px' }}>
                        {isChecked ? <CheckSquare size={20} /> : <Square size={20} />}
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span style={{ color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                          {q}
                        </span>
                        
                        {!isChecked && getNotebooksByLevel(levelBlock.level).length > 0 && (
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (setTutorialContext && setActiveTab) {
                                setTutorialContext({ activeNotebookId: getNotebooksByLevel(levelBlock.level)[0].id });
                                setActiveTab('tutorials');
                              }
                            }}
                            className="mono"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-primary)', fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '4px', width: 'fit-content' }}
                          >
                            <BookOpen size={12} /> VERIFY WITH PRACTICE
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelfAssessment;
