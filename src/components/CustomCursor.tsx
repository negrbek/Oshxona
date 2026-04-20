import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  color: string;
}

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const trailRef = useRef<{ x: number, y: number, id: number }[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Update trail
      const newPos = { x: e.clientX, y: e.clientY, id: counter.current++ };
      trailRef.current = [newPos, ...trailRef.current.slice(0, 10)];
      setTrail([...trailRef.current]);

      // Check if hovering over food
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('[data-food-hover]')) {
        createParticles(e.clientX, e.clientY);
      }
    };

    const createParticles = (x: number, y: number) => {
      const colors = ['#D4AF37', '#ffffff', '#2D1B14'];
      const newParticles = Array.from({ length: 2 }).map(() => ({
        id: Math.random(),
        startX: x,
        startY: y,
        targetX: x + (Math.random() - 0.5) * 60,
        targetY: y + (Math.random() - 0.5) * 60 + 30,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      setParticles(prev => [...prev.slice(-15), ...newParticles]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* SVG filter for heatwave distortion */}
      <svg className="hidden">
        <defs>
          <filter id="heat">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="2" result="noise">
              <animate attributeName="baseFrequency" values="0.01 0.05;0.01 0.1;0.01 0.05" dur="3s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
          </filter>
        </defs>
      </svg>

      <div className="hidden cursor-none pointer-events-none md:block">
        {/* Main Cursor Dot */}
        <motion.div
          className="fixed top-0 left-0 w-4 h-4 bg-gold rounded-full z-[10000] mix-blend-difference"
          animate={{ x: mousePos.x - 8, y: mousePos.y - 8 }}
          transition={{ type: 'spring', damping: 20, stiffness: 400, mass: 0.2 }}
        />

        {/* Liquid Trail */}
        {trail.map((pos, index) => (
          <motion.div
            key={pos.id}
            className="fixed top-0 left-0 bg-gold/30 rounded-full z-[9999]"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ 
              x: pos.x - 4, 
              y: pos.y - 4,
              scale: 1 - index * 0.08,
              opacity: 0.6 - index * 0.05
            }}
            transition={{ duration: 0.2 }}
            style={{ width: 8, height: 8 }}
          />
        ))}

        {/* Particles (Spices) */}
        <AnimatePresence mode="popLayout">
          {particles.map(p => (
            <motion.div
              key={p.id}
              className="fixed top-0 left-0 w-1 h-1 rounded-full z-[9998]"
              initial={{ x: p.startX, y: p.startY, opacity: 1, scale: 1 }}
              animate={{ 
                x: p.targetX, 
                y: p.targetY,
                opacity: 0,
                scale: 0.2
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ backgroundColor: p.color }}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
