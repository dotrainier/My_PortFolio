'use client';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Evenly distributed across the full viewport width (in %)
const POSITIONS = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95];
const SYNTAXES = ['</>', 'λ', '%', '<<', '~', ';'];
const ANIMATION_DURATION = 10;
const SPAWN_INTERVAL = 1100;

const getMaxItems = () => {
  if (typeof window === 'undefined') return 5;
  const w = window.innerWidth;
  if (w < 640) return 4;   // mobile
  if (w < 1024) return 8;  // tablet
  return 15;               // desktop
};

type SyntaxItem = { id: string; positionX: number; syntax: string };

const FloatingSyntax: React.FC = () => {
  const [syntaxes, setSyntaxes] = useState<SyntaxItem[]>([]);
  const maxItemsRef = useRef(getMaxItems());
  const idCounterRef = useRef(0);

  // Update max items on resize
  useEffect(() => {
    const onResize = () => { maxItemsRef.current = getMaxItems(); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSyntaxes((prev) => {
        if (prev.length >= maxItemsRef.current) return prev;

        const positionX = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
        const syntax = SYNTAXES[Math.floor(Math.random() * SYNTAXES.length)];
        const id = `${Date.now()}-${idCounterRef.current++}`;

        return [...prev, { id, positionX, syntax }];
      });
    }, SPAWN_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const handleAnimationComplete = (id: string) => {
    setSyntaxes((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className='absolute inset-0 z-20 overflow-hidden pointer-events-none'>
      {syntaxes.map(({ id, positionX, syntax }) => (
        <motion.div
          key={id}
          initial={{ y: -10, scale: 1, opacity: 0.9, rotate: 0 }}
          animate={{ y: 300, scale: 0, opacity: 0, rotate: 360 }}
          transition={{
            y: { duration: ANIMATION_DURATION, ease: 'linear' },
            rotate: { duration: 8, ease: 'linear' },
            scale: { duration: 5, ease: 'linear', delay: 5 },
            opacity: { duration: 5, ease: 'linear', delay: 5 },
          }}
          className='top-0 font-fira text-xl text-gray-500 absolute dark:text-[#4A90E2]'
          style={{ left: `${positionX}vw` }}
          onAnimationComplete={() => handleAnimationComplete(id)}
        >
          {syntax}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingSyntax;
