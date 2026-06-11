import React, { useState } from 'react';
import { RefreshCcw, ThumbsUp, ThumbsDown, Code } from 'lucide-react';
import { roadmapData } from '../data/roadmapData';

const generateFlashcards = () => {
  let cards = [];
  roadmapData.forEach(level => {
    level.topics.forEach(topic => {
      topic.details.forEach(detail => {
        cards.push({
          level: level.level,
          topic: topic.title,
          question: detail.split(':')[0] || detail,
          answer: detail.includes(':') ? detail.split(':')[1].trim() : "Core concept from " + topic.title
        });
      });
    });
  });
  // Shuffle cards
  return cards.sort(() => Math.random() - 0.5);
};

const Flashcards = ({ onActivity }) => {
  const [cards] = useState(generateFlashcards());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
    if (onActivity) onActivity();
  };

  const currentCard = cards[currentIndex];

  if (!currentCard) return null;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 className="gradient-text mono" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>// Interview Engine</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Spaced repetition for core ML concepts.</p>
      </div>

      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)} style={{ cursor: 'pointer', marginBottom: '2rem' }}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <span style={{ position: 'absolute', top: '1rem', left: '1rem', fontSize: '0.8rem', color: 'var(--accent-primary)', fontFamily: 'Fira Code' }}>
              Level {currentCard.level}
            </span>
            <span style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'Fira Code' }}>
              [{currentIndex + 1} / {cards.length}]
            </span>
            <Code size={32} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{currentCard.topic}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{currentCard.question}</p>
            <p style={{ position: 'absolute', bottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Click to flip</p>
          </div>
          
          <div className="flip-card-back">
            <h3 className="gradient-text" style={{ marginBottom: '1rem' }}>Definition / Answer:</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>{currentCard.answer}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="btn-outline" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>
          <ThumbsDown size={18} /> Hard
        </button>
        <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="btn-outline" style={{ borderColor: 'var(--warning)', color: 'var(--warning)' }}>
          <RefreshCcw size={18} /> Medium
        </button>
        <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="btn-outline" style={{ borderColor: 'var(--success)', color: 'var(--success)' }}>
          <ThumbsUp size={18} /> Easy
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
