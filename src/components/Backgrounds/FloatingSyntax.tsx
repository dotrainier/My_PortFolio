<<<<<<< HEAD
"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const positions = [100, 400, 700, 1000, 1300];

const FloatingSyntax: React.FC = () => {
    
    const [syntaxes, setSyntaxes] = useState<{id: number; positionX: number, syntax: string }[]>([]);
    const [allSyntaxIndex, setAllSyntaxIndex] = useState<number>(0);
   


    useEffect(() => {
        const syntax = ['</>', 'λ', '%', '<<', '~', ';'];
        const minSyntaxIndex = 0;
        const maxSyntaxIndex = syntax.length -1;

    
        const interval = setInterval(() => {    
            const randomSyntax = Math.floor(Math.random() * (maxSyntaxIndex - minSyntaxIndex + 1)) + minSyntaxIndex;
            const currentAvailablePosition  = allSyntaxIndex % positions.length;

            setSyntaxes((prevSyntaxes) => [
                ...prevSyntaxes,
                {id: Date.now(), positionX: positions[currentAvailablePosition], syntax: syntax[randomSyntax]}
            ])
            
        
            setAllSyntaxIndex((prev) => prev + 1);       
    }, 1100)

        return () => clearInterval(interval);   

    }, [allSyntaxIndex])


    const removeSyntaxById = (id: number) => {
        setSyntaxes((prevSyntaxes) => prevSyntaxes.filter((syntax) => syntax.id !== id));
    };
    

    const handleAnimationEnd = ( id: number) => {
        removeSyntaxById(id);
    }

    
    return (
        <div className="absolute inset-0 z-20">
            {
                syntaxes.map(({id, positionX, syntax}) => (
                 <motion.div
                 key={id}
                 initial={{ y: 0, scale: 1, opacity: 1 }}
                 animate={{
                   y: 250,          
                   rotate: [0, 360],  
                   scale: 0 ,
                   opacity: 0.8
                 }}
                 transition={{
                   y: { duration: 10, ease: "linear" },       
                   scale: { duration: 5, ease: "linear", delay: 5 },
                   opacity: { duration: 5, ease: "linear", delay: 5 },
                   rotate: { duration: 8, ease: "linear" }  ,
                 }}
                 
                 className="top-0 font-fira text-xl text-gray-500  absolute dark:text-[#4A90E2]"
                 style={{ left: positionX }}
                 onAnimationComplete={() => handleAnimationEnd(id)}
                 >
                    { syntax }
                 </motion.div>
                ))
            }
        </div>
    );
=======
'use client';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

/* ── Symbols that match the portfolio's code aesthetic ── */
const SYMBOLS = [
  '{}',
  '/>',
  '()',
  '=>',
  '[]',
  '/*',
  '*/',
  '&&',
  '||',
  '??',
  '!=',
  '++',
  '--',
  '::',
  '<%',
  '%>',
  '~~',
];

/* ── Three depth layers — far, mid, near ── */
const LAYERS = [
  { size: 11, durationMin: 14, durationMax: 20, opacity: 0.35, blur: 'blur-sm' },
  { size: 15, durationMin: 9, durationMax: 14, opacity: 0.55, blur: '' },
  { size: 20, durationMin: 6, durationMax: 10, opacity: 0.75, blur: '' },
] as const;

const SPAWN_INTERVAL = 550;

const getMaxItems = () => {
  if (typeof window === 'undefined') return 6;
  const w = window.innerWidth;
  if (w < 640) return 5;
  if (w < 1024) return 10;
  return 18;
};

type SyntaxItem = {
  id: string;
  x: number;
  symbol: string;
  layerIdx: number;
  duration: number;
  rotation: number;
  delay: number;
};

const FloatingSyntax: React.FC = () => {
  const [items, setItems] = useState<SyntaxItem[]>([]);
  const maxRef = useRef(getMaxItems());
  const counterRef = useRef(0);

  useEffect(() => {
    const onResize = () => {
      maxRef.current = getMaxItems();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        if (prev.length >= maxRef.current) return prev;

        const layerIdx = Math.floor(Math.random() * LAYERS.length);
        const layer = LAYERS[layerIdx];
        const duration =
          layer.durationMin + Math.random() * (layer.durationMax - layer.durationMin);

        const item: SyntaxItem = {
          id: `${Date.now()}-${counterRef.current++}`,
          x: Math.random() * 96,
          symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          layerIdx,
          duration,
          rotation: (Math.random() - 0.5) * 200,
          delay: Math.random() * 0.4,
        };
        return [...prev, item];
      });
    }, SPAWN_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const remove = (id: string) => setItems((prev) => prev.filter((s) => s.id !== id));

  return (
    <div className='absolute inset-0 z-20 overflow-hidden pointer-events-none'>
      {items.map((item) => {
        const layer = LAYERS[item.layerIdx];

        return (
          <motion.span
            key={item.id}
            className={`absolute top-0 font-fira font-semibold select-none ${layer.blur} ${
              item.layerIdx === 2
                ? 'text-[#f87171]' /* near — brand red */
                : 'text-zinc-800 dark:text-zinc-300' /* far/mid — visible on both modes */
            }`}
            style={{
              left: `${item.x}%`,
              fontSize: layer.size,
              opacity: layer.opacity,
            }}
            initial={{ y: -30, opacity: 0, rotate: 0, scale: 1 }}
            animate={{
              y: '110vh',
              opacity: [0, layer.opacity, layer.opacity, 0],
              rotate: item.rotation,
              scale: [1, 1, 0.6],
            }}
            transition={{
              y: { duration: item.duration, ease: 'linear', delay: item.delay },
              rotate: { duration: item.duration, ease: 'linear', delay: item.delay },
              scale: { duration: item.duration, ease: 'easeIn', delay: item.delay },
              opacity: {
                duration: item.duration,
                delay: item.delay,
                times: [0, 0.08, 0.78, 1],
              },
            }}
            onAnimationComplete={() => remove(item.id)}
          >
            {item.symbol}
          </motion.span>
        );
      })}
    </div>
  );
>>>>>>> origin/professional
};

export default FloatingSyntax;
