import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ── Neural Node Field ── */
function NeuralParticles({ count = 600 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.04;
    ref.current.rotation.x = Math.sin(t * 0.025) * 0.08;
    // Breathe scale
    const scale = 1 + Math.sin(t * 0.5) * 0.015;
    ref.current.scale.setScalar(scale);
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4D9FFF"
        size={0.055}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/* ── Secondary Violet Particles ── */
function VioletParticles({ count = 300 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 4 + Math.random() * 10;
      pos[i * 3]     = Math.cos(theta) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = Math.sin(theta) * r;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = -t * 0.06;
    ref.current.rotation.z = t * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#9B6DFF"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.45}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/* ── Cyan Ring Particles ── */
function CyanRing({ count = 150 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const r = 7 + Math.random() * 0.5;
      pos[i * 3]     = Math.cos(theta) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = Math.sin(theta) * r;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = Math.PI / 2 + t * 0.08;
    ref.current.rotation.z = t * 0.03;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00E5FF"
        size={0.07}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/* ── Camera drift + mouse parallax ── */
function CameraController() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Cinematic slow drone drift
    camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.015;
    camera.position.y += (mouse.current.y * 1.0 - camera.position.y) * 0.015;
    camera.position.z = 14 + Math.sin(t * 0.2) * 0.8;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ── Ambient Glow Lights ── */
function SceneLights() {
  const blueRef = useRef();
  const violetRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (blueRef.current) {
      blueRef.current.intensity = 0.6 + Math.sin(t * 0.7) * 0.2;
      blueRef.current.position.x = Math.sin(t * 0.3) * 5;
    }
    if (violetRef.current) {
      violetRef.current.intensity = 0.5 + Math.cos(t * 0.5) * 0.2;
      violetRef.current.position.y = Math.cos(t * 0.4) * 4;
    }
  });

  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight ref={blueRef} color="#4D9FFF" intensity={0.6} position={[-5, 3, 5]} />
      <pointLight ref={violetRef} color="#9B6DFF" intensity={0.5} position={[5, -3, 3]} />
      <pointLight color="#00E5FF" intensity={0.3} position={[0, 0, 8]} />
    </>
  );
}

/* ── CSS Fallback Background ── */
const CSSFallback = () => (
  <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    <div style={{
      position: 'absolute', top: '-15%', left: '-10%',
      width: '65vw', height: '65vw',
      background: 'radial-gradient(circle, rgba(77,159,255,0.14) 0%, transparent 65%)',
      borderRadius: '50%', filter: 'blur(40px)',
      animation: 'float 20s ease-in-out infinite alternate',
    }} />
    <div style={{
      position: 'absolute', bottom: '-20%', right: '-15%',
      width: '70vw', height: '70vw',
      background: 'radial-gradient(circle, rgba(155,109,255,0.12) 0%, transparent 65%)',
      borderRadius: '50%', filter: 'blur(50px)',
      animation: 'float-reverse 25s ease-in-out infinite alternate',
    }} />
    <div style={{
      position: 'absolute', top: '45%', left: '38%',
      width: '35vw', height: '35vw',
      background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 65%)',
      borderRadius: '50%', filter: 'blur(30px)',
      animation: 'float 14s ease-in-out 3s infinite alternate',
    }} />
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `linear-gradient(rgba(77,159,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(77,159,255,0.018) 1px, transparent 1px)`,
      backgroundSize: '64px 64px',
      mask: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
    }} />
  </div>
);

/* ── Main Exported Component ── */
const CinematicBackground = () => {
  const canvasRef = useRef(null);
  const hasWebGL = useMemo(() => {
    try {
      const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
      if (isMobile) return false;
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  }, []);

  if (!hasWebGL) return <CSSFallback />;

  return (
    <>
      {/* Three.js canvas — bottom layer */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'linear-gradient(135deg, #02020A 0%, #04040F 50%, #020208 100%)',
      }}>
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 0, 14], fov: 55 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          dpr={Math.min(window.devicePixelRatio, 1.5)}
          style={{ position: 'absolute', inset: 0 }}
        >
          <fog attach="fog" args={['#02020A', 12, 30]} />
          <SceneLights />
          <CameraController />
          <NeuralParticles count={150} />
          <VioletParticles count={80} />
          <CyanRing count={50} />
        </Canvas>

        {/* CSS gradient overlay for depth */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(2,2,10,0.6) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Subtle blue glow at top */}
        <div style={{
          position: 'absolute', top: 0, left: '20%', right: '20%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(77,159,255,0.4), transparent)',
          boxShadow: '0 0 40px 4px rgba(77,159,255,0.15)',
        }} />
      </div>

      {/* Grid overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(77,159,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(77,159,255,0.016) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
        mask: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 10%, transparent 100%)',
      }} />
    </>
  );
};

export default CinematicBackground;
