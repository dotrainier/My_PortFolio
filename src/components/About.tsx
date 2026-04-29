'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import my_pic from '@/assets/images/my_pic.jpg';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    sectionRef.current?.querySelectorAll('.reveal,.reveal-x').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id='about'
      ref={sectionRef}
      className='relative bg-[#fafafa] dark:bg-[#09090b] overflow-hidden py-32 px-6 md:px-16 xl:px-32'
    >
      {/* Ghost watermark */}
      <span
        className='ghost ghost-light dark:ghost-dark text-[18vw] bottom-[-2vw] right-[-1vw] leading-none'
        aria-hidden='true'
      >
        ABOUT
      </span>

      {/* Section index */}
      <div className='reveal-x mb-20 flex items-center gap-4'>
        <span className='font-fira text-[#f87171] text-xs tracking-[0.2em] uppercase'>
          01 / about
        </span>
        <span className='red-rule flex-1' />
      </div>

      <div className='grid md:grid-cols-2 gap-16 md:gap-24 items-start'>
        {/* Left — photo + oversized quote */}
        <div className='reveal' style={{ transitionDelay: '0.05s' }}>
          {/* Photo placeholder */}
          <div className='relative'>
            <div
              className='
                relative w-full aspect-[3/4] max-w-[340px] rounded-sm overflow-hidden
                border border-zinc-200 dark:border-white/8 bg-zinc-100 dark:bg-zinc-900
              '
            >
              {/* hatch pattern */}

              <div className='absolute inset-0 flex flex-col items-center justify-center gap-3'>
                <Image src={my_pic} alt='my_pic' />
              </div>
              {/* Red corner accent */}
              <div
                className='absolute bottom-0 left-0 w-12 h-12'
                style={{ background: 'linear-gradient(135deg, transparent 50%, #f87171 50%)' }}
              />
            </div>

            {/* Floating location tag — overlaps photo bottom-right */}
            <div
              className='
                absolute -bottom-4 right-0
                font-fira text-xs px-3 py-2 rounded-sm
                bg-[#f87171] text-[#09090b] font-bold tracking-widest
              '
            >
              PH / PHILIPPINES
            </div>
          </div>

          {/* Oversized italic quote */}
          <blockquote
            className='
              mt-14 font-nunito_sans font-bold italic
              text-3xl md:text-4xl xl:text-5xl
              text-zinc-800/80 dark:text-white/80 leading-tight
              border-l-2 border-[#f87171] pl-6
            '
          >
            &ldquo;I don&apos;t just write&nbsp;code.
            <br />I write&nbsp;
            <span className='text-[#f87171]'>solutions.</span>&rdquo;
          </blockquote>
        </div>

        {/* Right — text + stats */}
        <div className='reveal' style={{ transitionDelay: '0.15s' }}>
          <h2 className='font-nunito_sans font-bold text-4xl md:text-5xl xl:text-6xl text-zinc-900 dark:text-white leading-tight mb-8'>
            Hey, I&apos;m
            <br />
            <span className='glitch text-[#f87171]' data-text='Rainier.'>
              Rainier.
            </span>
          </h2>

          <div className='space-y-5 font-fira text-sm leading-[1.85] text-zinc-600 dark:text-zinc-400'>
            <p>
              <span className='text-zinc-400 dark:text-zinc-700'>{'// '}</span>
              Self-taught software developer from the Philippines — started with CS50x and CS50P,
              fell deep into code, and never came back up.
            </p>
            <p>
              <span className='text-zinc-400 dark:text-zinc-700'>{'// '}</span>I care about the full
              stack: the logic underneath, the interface on top, and the tiny details most people
              scroll past.
            </p>
            <p>
              <span className='text-zinc-400 dark:text-zinc-700'>{'// '}</span>
              When I&apos;m not building, I&apos;m learning. When I&apos;m not learning, I&apos;m
              breaking things on purpose to understand why they work.
            </p>
          </div>

          {/* Stats */}
          <div className='mt-12 grid grid-cols-3 gap-px border border-zinc-200 dark:border-white/6 rounded-sm overflow-hidden'>
            {[
              { n: '2+', label: 'yrs\ncoding' },
              { n: '2', label: 'harvard\ncerts' },
              { n: '∞', label: 'bugs\nfixed' },
            ].map(({ n, label }) => (
              <div
                key={label}
                className='bg-zinc-100 dark:bg-white/[0.03] p-5 group hover:bg-zinc-200/60 dark:hover:bg-white/[0.07] transition-colors'
              >
                <div className='font-nunito_sans font-black text-4xl text-[#f87171] stat-number leading-none mb-2'>
                  {n}
                </div>
                <div className='font-fira text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight tracking-widest uppercase whitespace-pre-line'>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* CS50 certs */}
          <div className='mt-8 space-y-3'>
            {[
              { name: 'CS50x', full: 'Intro to Computer Science — Harvard / edX', year: '2024' },
              {
                name: 'CS50P',
                full: 'Intro to Programming with Python — Harvard / edX',
                year: '2024',
              },
            ].map((c) => (
              <div
                key={c.name}
                className='flex items-center justify-between px-4 py-3 border border-zinc-200 dark:border-white/8 rounded-sm hover:border-[#f87171]/40 transition-colors'
              >
                <div>
                  <span className='font-nunito_sans font-bold text-zinc-900 dark:text-white text-sm'>
                    {c.name}
                  </span>
                  <span className='font-fira text-xs text-zinc-500 ml-3'>{c.full}</span>
                </div>
                <span className='font-fira text-xs text-[#f87171] shrink-0 ml-4'>{c.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
