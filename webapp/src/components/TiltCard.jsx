import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * TiltCard — A 3D interactive card component (inspired by Stripe/Vercel)
 * Adds smooth 3D rotation based on mouse position.
 */
const TiltCard = ({ children, style = {}, className = '', intensity = 10 }) => {
  const ref = useRef(null);
  
  // Motion values for X and Y coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Transform coordinates into degrees (e.g. -10 to 10 deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the card's center (normalized from -0.5 to 0.5)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1400,
        ...style
      }}
      className={className}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default TiltCard;
