import { useEffect, useRef } from 'react';

/**
 * CustomCursor — Awwwards-level magnetic cursor
 * - Dot: snaps instantly to mouse
 * - Ring: lags behind with spring physics
 * - Enlarges on interactive elements
 * - Hides when leaving window
 */
const CustomCursor = () => {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const pos      = useRef({ x: 0, y: 0 });
  const ring     = useRef({ x: 0, y: 0 });
  const rafId    = useRef(null);
  const visible  = useRef(false);

  useEffect(() => {
    const dot  = dotRef.current;
    const rng  = ringRef.current;
    if (!dot || !rng) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        ring.current = { ...pos.current };
        visible.current = true;
        dot.style.opacity  = '1';
        rng.style.opacity  = '1';
      }
      dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
    };

    const onLeave = () => {
      dot.style.opacity = '0';
      rng.style.opacity = '0';
      visible.current = false;
    };

    const onEnter = () => {
      dot.style.opacity = '1';
      rng.style.opacity = '1';
      visible.current = true;
    };

    // Check if hovering an interactive element
    const onOver = (e) => {
      const el = e.target;
      const isInteractive = el.matches('a, button, [role="button"], input, textarea, select, label, [data-magnetic]');
      if (isInteractive) {
        dot.style.width  = '14px';
        dot.style.height = '14px';
        dot.style.background = 'var(--brand-violet)';
        dot.style.boxShadow  = '0 0 12px var(--brand-violet), 0 0 24px rgba(165,120,255,0.5)';
        rng.style.width  = '56px';
        rng.style.height = '56px';
        rng.style.borderColor = 'rgba(165,120,255,0.8)';
        rng.style.background  = 'rgba(165,120,255,0.05)';
      } else {
        dot.style.width  = '8px';
        dot.style.height = '8px';
        dot.style.background = 'var(--brand-blue)';
        dot.style.boxShadow  = '0 0 10px var(--brand-blue), 0 0 20px rgba(91,155,255,0.5)';
        rng.style.width  = '36px';
        rng.style.height = '36px';
        rng.style.borderColor = 'rgba(91,155,255,0.5)';
        rng.style.background  = 'transparent';
      }
    };

    // Spring physics loop for the ring
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      rng.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove,     { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('mouseover',  onOver,    { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '8px', height: '8px',
          background: 'var(--brand-blue)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          willChange: 'transform',
          transition: 'width 0.18s, height 0.18s, background 0.18s, box-shadow 0.18s',
          boxShadow: '0 0 10px var(--brand-blue), 0 0 20px rgba(91,155,255,0.5)',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '36px', height: '36px',
          border: '1.5px solid rgba(91,155,255,0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          willChange: 'transform',
          transition: 'width 0.3s var(--ease-out), height 0.3s var(--ease-out), border-color 0.2s, background 0.2s',
        }}
      />
    </>
  );
};

export default CustomCursor;
