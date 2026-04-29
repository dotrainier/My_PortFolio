'use client';
import Cursor from '@/components/Cursor';
import Image from 'next/image';
import logo from '../../public/logo.svg';
import darkLogo from '../../public/dark-logo.svg';
import FloatingSyntax from '@/components/Backgrounds/FloatingSyntax';
import Navigation from '@/components/Navigation';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import { useTheme } from 'next-themes';
import { useRef, useEffect, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const landingSectionRef = useRef<HTMLDivElement | null>(null);
  const introTextRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  // True only on the client after hydration — no setState in effect needed
  const didMount = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  /* ── GSAP: hero text parallax out on scroll ── */
  useEffect(() => {
    gsap.to(introTextRef.current, {
      yPercent: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: landingSectionRef.current,
        start: '80% 75%',
        end: '95% 60%',
        scrub: 1,
      },
    });
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Stagger for hero sub-elements on load */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <main className='min-h-screen relative bg-zinc-50 dark:bg-black'>
      <Cursor />

      {/* ═══════════════════════════════
          HERO
      ═══════════════════════════════ */}
      <section ref={landingSectionRef} className='h-screen flex flex-col relative overflow-hidden'>
        {/* Nav */}
        <div className='px-4 py-4 flex justify-between relative z-30'>
          <div className='flex items-center gap-1.5' ref={ref}>
            <Image
              src={theme === 'dark' && didMount ? darkLogo : logo}
              alt='logo'
              width={20}
              height={20}
            />
            <div className='font-sans font-bold text-sm'>dotrainier</div>
          </div>
          <Navigation />
        </div>

        {/* Intro text — GSAP scrolls this out */}
        <div className='flex-1 flex xl:px-32 md:px-16 sm:px-8 px-6 mt-40 mx-auto flex-col font-nunito_sans font-bold text-left dark:text-white text-[#111110]'>
          <motion.div
            ref={introTextRef}
            className='relative'
            variants={container}
            initial='hidden'
            animate='show'
          >
            {/* Red left accent bar */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className='absolute -left-4 top-0 bottom-8 w-[3px] bg-[#f87171] origin-top'
            />

            <motion.div
              variants={item}
              className='lg:text-5xl sm:text-3xl text-2xl md:text-4xl xl:text-7xl'
            >
              I&apos;m Rainier,
            </motion.div>

            <motion.div
              variants={item}
              className='lg:text-5xl sm:text-3xl text-2xl md:text-4xl xl:text-7xl'
            >
              Software Dev
            </motion.div>

            <motion.div
              variants={item}
              className='font-normal static text-lg ml:absolute top-full ml:w-max mt-2'
            >
              <span className='text-gray-400 dark:text-gray-500'>{'<'}</span>
              <span className='text-red-400'>Bugs </span>
              <span className='text-gray-800 dark:text-gray-200'>
                hate me. Users love me. Problems? Just features waiting for my commit
              </span>
              <span className='text-gray-400 dark:text-gray-500'>{'/>'}</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Giant watermark */}
        <div
          className='
            z-10 font-nunito
            [text-shadow:1px_1px_0_rgba(17,17,16,0.15),-1px_1px_0_rgba(17,17,16,0.15),1px_-1px_0_rgba(17,17,16,0.15),-1px_-1px_0_rgba(17,17,16,0.15)]
            dark:[text-shadow:1px_1px_0_rgba(255,255,255,0.15),-1px_1px_0_rgba(255,255,255,0.15),1px_-1px_0_rgba(255,255,255,0.15),-1px_-1px_0_rgba(255,255,255,0.15)]
            text-zinc-50 dark:text-black font-bold
            lg:text-[380px] md:text-[300px] sm:text-[280px] text-[250px]
            absolute bottom-0 leading-75 -left-25
          '
        >
          dotrainier
        </div>

        <FloatingSyntax />
      </section>

      {/* ═══════════════════════════════
          REMAINING SECTIONS
          dark → light → dark → light
      ═══════════════════════════════ */}
      <About />
      <TechStack />
      <Projects />
      <Contact />
    </main>
  );
}
