import React, { useEffect, useRef, useState, useCallback } from 'react';

const TRAIL_LENGTH = 14;

const CustomCursor = () => {
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  
  if (isTouchDevice) {
    return null;
  }

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);
  const positions = useRef(Array(TRAIL_LENGTH).fill({ x: 0, y: 0 }));
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorColor, setCursorColor] = useState('#00E5FF');
  const [isHovering, setIsHovering] = useState(false);

  const updateCursorColor = useCallback((target) => {
    if (!target) return;
    if (target.closest('[data-cursor="danger"]') || target.closest('.danger-zone')) {
      setCursorColor('#FF4466');
    } else if (target.closest('[data-cursor="success"]') || target.closest('.success-zone')) {
      setCursorColor('#00FFB2');
    } else if (target.closest('button') || target.closest('a') || target.closest('[role="button"]')) {
      setCursorColor('#9B6DFF');
      setIsHovering(true);
      return;
    } else {
      setCursorColor('#00E5FF');
    }
    setIsHovering(false);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      updateCursorColor(e.target);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = (e) => {
      if (e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
        if (dotRef.current) dotRef.current.style.opacity = '0';
        if (ringRef.current) ringRef.current.style.opacity = '0';
      }
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [updateCursorColor]);

  useEffect(() => {
    const animate = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Snap dot to cursor
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px';
        dotRef.current.style.top = my + 'px';
      }

      // Smooth ring follows
      ring.current.x += (mx - ring.current.x) * 0.12;
      ring.current.y += (my - ring.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top = ring.current.y + 'px';
      }

      // Shift positions queue
      positions.current = [{ x: mx, y: my }, ...positions.current.slice(0, TRAIL_LENGTH - 1)];

      // Update trail
      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        const pos = positions.current[i] || { x: mx, y: my };
        const progress = (TRAIL_LENGTH - i) / TRAIL_LENGTH;
        el.style.left = pos.x + 'px';
        el.style.top = pos.y + 'px';
        el.style.opacity = (progress * 0.45).toString();
        const size = progress * 5;
        el.style.width = size + 'px';
        el.style.height = size + 'px';
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: isClicking ? '14px' : isHovering ? '10px' : '6px',
          height: isClicking ? '14px' : isHovering ? '10px' : '6px',
          background: cursorColor,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 10px ${cursorColor}, 0 0 24px ${cursorColor}80, 0 0 50px ${cursorColor}40`,
          mixBlendMode: 'screen',
          transition: 'width 0.15s ease, height 0.15s ease, background 0.2s ease, box-shadow 0.2s ease',
          willChange: 'transform, left, top',
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: isClicking ? '28px' : isHovering ? '56px' : '38px',
          height: isClicking ? '28px' : isHovering ? '56px' : '38px',
          border: `1.5px solid ${cursorColor}80`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999998,
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 12px ${cursorColor}30, inset 0 0 8px ${cursorColor}10`,
          background: isHovering ? `${cursorColor}06` : 'transparent',
          transition: 'width 0.25s var(--ease-out), height 0.25s var(--ease-out), border-color 0.2s, background 0.2s',
          willChange: 'transform, left, top',
        }}
      >
        {/* Inner crosshair for hover state */}
        {isHovering && (
          <>
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              width: '10px', height: '1px',
              background: `${cursorColor}60`,
              transform: 'translate(-50%, -50%)',
            }} />
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              width: '1px', height: '10px',
              background: `${cursorColor}60`,
              transform: 'translate(-50%, -50%)',
            }} />
          </>
        )}
      </div>

      {/* Particle trail */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={el => trailRefs.current[i] = el}
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '5px', height: '5px',
            background: i < 5 ? cursorColor : i < 10 ? '#9B6DFF' : '#FF5FA0',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 999995 - i,
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'screen',
            willChange: 'transform, left, top, opacity',
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
