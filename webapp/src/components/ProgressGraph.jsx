import React from 'react';

const ProgressGraph = ({ activeCount = 0 }) => {
  // Generate 52 columns of 7 days
  const weeks = 52;
  const days = 7;
  const totalSquares = weeks * days;
  
  // We'll fill the first 'activeCount' squares with green, the rest gray.
  // Actually, to make it look like a real graph, we'll randomize a bit 
  // but keep the most recent ones based on activeCount.
  
  const generateGrid = () => {
    let grid = [];
    let filled = 0;
    
    // To simulate a progress graph, let's just make random squares light up 
    // based on how many tasks they've completed.
    for (let i = 0; i < totalSquares; i++) {
      // Just a simple visual mock - normally this would map to actual dates
      let intensity = 0;
      if (filled < activeCount && Math.random() > 0.5) {
        intensity = Math.floor(Math.random() * 3) + 1;
        filled++;
      } else if (filled < activeCount && i > totalSquares - activeCount * 2) {
        intensity = Math.floor(Math.random() * 4);
        if (intensity > 0) filled++;
      }
      grid.push(intensity);
    }
    return grid;
  };

  const grid = generateGrid();

  const getColor = (intensity) => {
    switch(intensity) {
      case 1: return 'rgba(16, 185, 129, 0.4)';
      case 2: return 'rgba(16, 185, 129, 0.7)';
      case 3: return 'rgba(16, 185, 129, 1)';
      default: return 'var(--bg-secondary)';
    }
  };

  return (
    <div className="glass-card-premium" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
        <div>
          <h3 className="mono" style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Activity Engine</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activeCount} contributions in the last year</p>
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${weeks}, 1fr)`, 
        gridTemplateRows: `repeat(${days}, 1fr)`,
        gap: '3px',
        overflowX: 'auto',
        paddingBottom: '0.5rem'
      }}>
        {grid.map((intensity, idx) => (
          <div 
            key={idx} 
            style={{ 
              width: '10px', 
              height: '10px', 
              backgroundColor: getColor(intensity),
              borderRadius: '2px',
              border: intensity === 0 ? '1px solid rgba(255,255,255,0.05)' : 'none'
            }} 
            title={intensity > 0 ? 'Activity recorded' : 'No activity'}
          />
        ))}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <span>Less</span>
        <div style={{ width: '10px', height: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: '2px' }}></div>
        <div style={{ width: '10px', height: '10px', backgroundColor: 'rgba(16, 185, 129, 0.4)', borderRadius: '2px' }}></div>
        <div style={{ width: '10px', height: '10px', backgroundColor: 'rgba(16, 185, 129, 0.7)', borderRadius: '2px' }}></div>
        <div style={{ width: '10px', height: '10px', backgroundColor: 'rgba(16, 185, 129, 1)', borderRadius: '2px' }}></div>
        <span>More</span>
      </div>
    </div>
  );
};

export default ProgressGraph;
