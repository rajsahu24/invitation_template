import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
const COLORS = ['#FFB3D9', '#C5B4E3', '#B4E7CE', '#FFD4B3', '#D4A574'];
const SHAPES = ['circle', 'square', 'triangle'];
interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  shape: string;
  rotation: number;
  scale: number;
  speed: number;
}
export function ConfettiAnimation() {
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    // Create initial particles
    const initialParticles = Array.from({
      length: 30
    }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20 - Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      speed: 2 + Math.random() * 3
    }));
    setParticles(initialParticles);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) =>
      <motion.div
        key={p.id}
        className="absolute"
        style={{
          left: `${p.x}%`,
          top: -20
        }}
        animate={{
          y: ['0vh', '120vh'],
          rotate: [p.rotation, p.rotation + 360],
          x: [0, (Math.random() - 0.5) * 100] // drift
        }}
        transition={{
          duration: 10 + Math.random() * 10,
          repeat: Infinity,
          ease: 'linear',
          delay: Math.random() * 10
        }}>

          <svg width="20" height="20" viewBox="0 0 20 20">
            {p.shape === 'circle' &&
          <circle cx="10" cy="10" r="8" fill={p.color} />
          }
            {p.shape === 'square' &&
          <rect x="4" y="4" width="12" height="12" fill={p.color} />
          }
            {p.shape === 'triangle' &&
          <path d="M10 2 L18 18 L2 18 Z" fill={p.color} />
          }
          </svg>
        </motion.div>
      )}
    </div>);

}