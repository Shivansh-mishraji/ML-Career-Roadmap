import React, { useState, useEffect } from 'react';
import { RefreshCcw, ThumbsUp, ThumbsDown, Code, ArrowLeft, BrainCircuit, Play } from 'lucide-react';
import { interviewDecks } from '../data/interviewData';
import { motion, AnimatePresence } from 'framer-motion';

const Flashcards = ({ onActivity }) => {
  const [activeDeck, setActiveDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState({});

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('ml-interview-progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const selectDeck = (deckId) => {
    const deck = interviewDecks.find(d => d.id === deckId);
    if (deck) {
      // Shuffle cards for study session
      const shuffled = [...deck.questions].sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setActiveDeck(deck);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  const handleNext = (difficulty) => {
    // Save progress logic (Hard = 0, Medium = 1, Easy = 2)
    const currentCard = cards[currentIndex];
    const score = difficulty === 'Easy' ? 2 : difficulty === 'Medium' ? 1 : 0;
    
    const newProgress = { ...progress, [currentCard.id]: Math.max(score, progress[currentCard.id] || 0) };
    setProgress(newProgress);
    localStorage.setItem('ml-interview-progress', JSON.stringify(newProgress));

    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // End of deck
        setActiveDeck(null); // Return to menu
      }
    }, 200);

    if (onActivity) onActivity();
  };

  const getDeckMastery = (deckId) => {
    const deck = interviewDecks.find(d => d.id === deckId);
    if (!deck) return 0;
    const totalPossible = deck.questions.length * 2; // 2 points max per question
    const currentScore = deck.questions.reduce((acc, q) => acc + (progress[q.id] || 0), 0);
    return Math.round((currentScore / totalPossible) * 100) || 0;
  };

  // Format answer text to handle bullet points and bolding
  const formatAnswer = (text) => {
    return text.split('\n').map((line, i) => {
      // Very basic markdown parser for bolding
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--text-primary);">$1</strong>');
      return (
        <p key={i} style={{ marginBottom: '0.75rem', fontSize: '1rem', color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    });
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Deck Selection Menu */}
      {!activeDeck && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h1 className="gradient-text mono" style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <BrainCircuit size={36} color="var(--accent-primary)" /> // Interview_Engine
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              FAANG-level ML & MLOps system design and theory questions.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {interviewDecks.map(deck => {
              const mastery = getDeckMastery(deck.id);
              return (
                <div key={deck.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 className="mono" style={{ color: 'var(--text-primary)', fontSize: '1.2rem' }}>{deck.title}</h3>
                    <span className="mono" style={{ color: mastery === 100 ? 'var(--success)' : 'var(--accent-primary)', fontSize: '0.85rem', background: 'var(--bg-secondary)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                      {mastery}% Mastered
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>{deck.description}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{deck.questions.length} Questions</span>
                    <button onClick={() => selectDeck(deck.id)} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
                      <Play size={16} /> Start Protocol
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Active Study Session */}
      {activeDeck && cards.length > 0 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <button onClick={() => setActiveDeck(null)} className="btn-outline" style={{ border: 'none', padding: '0.5rem' }}>
              <ArrowLeft size={20} /> Back to Hub
            </button>
            <span className="mono" style={{ color: 'var(--text-muted)' }}>
              Card {currentIndex + 1} of {cards.length}
            </span>
          </div>

          <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)} style={{ cursor: 'pointer', marginBottom: '3rem', minHeight: '400px' }}>
            <div className="flip-card-inner">
              <div className="flip-card-front" style={{ padding: '3rem' }}>
                <span className="mono" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', fontSize: '0.85rem', color: 'var(--accent-primary)', background: 'var(--bg-tertiary)', padding: '0.3rem 0.8rem', borderRadius: '4px' }}>
                  {activeDeck.title}
                </span>
                
                <Code size={40} color="var(--border-hover)" style={{ marginBottom: '1.5rem' }} />
                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 500 }}>{cards[currentIndex].topic}</h2>
                <p style={{ color: 'var(--text-primary)', fontSize: '1.3rem', lineHeight: '1.5', maxWidth: '80%' }}>{cards[currentIndex].question}</p>
                
                <div style={{ position: 'absolute', bottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <RefreshCcw size={14} /> Click to reveal answer
                </div>
              </div>
              
              <div className="flip-card-back" style={{ padding: '3rem', alignItems: 'flex-start', textAlign: 'left', overflowY: 'auto' }}>
                <h3 className="mono gradient-text" style={{ marginBottom: '1.5rem', fontSize: '1.1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', width: '100%' }}>System Response:</h3>
                <div style={{ width: '100%' }}>
                  {formatAnswer(cards[currentIndex].answer)}
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isFlipped && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                <button onClick={(e) => { e.stopPropagation(); handleNext('Hard'); }} className="btn-outline" style={{ borderColor: 'var(--danger)', color: 'var(--danger)', width: '120px', justifyContent: 'center' }}>
                  <ThumbsDown size={18} /> Hard
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleNext('Medium'); }} className="btn-outline" style={{ borderColor: 'var(--warning)', color: 'var(--warning)', width: '120px', justifyContent: 'center' }}>
                  <RefreshCcw size={18} /> Medium
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleNext('Easy'); }} className="btn-outline" style={{ borderColor: 'var(--success)', color: 'var(--success)', width: '120px', justifyContent: 'center' }}>
                  <ThumbsUp size={18} /> Easy
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default Flashcards;
