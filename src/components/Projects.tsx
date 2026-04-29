'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Project = {
  num: string;
  title: string;
  year: string;
  type: string;
  desc: string;
  tags: string[];
  repo?: string;
  live?: string;
};

const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'Portfolio',
    year: '2025',
    type: 'Personal Site',
    desc: 'The site you are on. Built with Next.js 15, Tailwind CSS v4, GSAP scroll-parallax, Framer Motion particles, and full dark/light theming. Every pixel deliberate.',
    tags: ['Next.js', 'TypeScript', 'GSAP', 'Framer Motion', 'Tailwind CSS v4'],
    repo: 'https://github.com',
    live: '#',
  },
  {
    num: '02',
    title: 'Project Two',
    year: '2024',
    type: 'Web App',
    desc: 'Describe what this project does — the problem it solves, who uses it, and what makes it interesting technically. Replace this with your real project.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Express'],
    repo: 'https://github.com',
    live: '#',
  },
  {
    num: '03',
    title: 'Project Three',
    year: '2024',
    type: 'CLI Tool',
    desc: 'Describe what this project does — the problem it solves, who uses it, and what makes it interesting technically. Replace this with your real project.',
    tags: ['Python', 'SQLite', 'Click'],
    repo: 'https://github.com',
  },
  {
    num: '04',
    title: 'Project Four',
    year: '2024',
    type: 'API',
    desc: 'Describe what this project does — the problem it solves, who uses it, and what makes it interesting technically. Replace this with your real project.',
    tags: ['TypeScript', 'Express', 'MongoDB'],
    repo: 'https://github.com',
    live: '#',
  },
];

function ProjectRow({
  p,
  isOpen,
  onToggle,
}: {
  p: Project;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className='proj-row group' onClick={onToggle}>
      {/* Main row */}
      <div className='flex items-center gap-6 md:gap-10 px-0 py-6 md:py-8'>
        {/* Big number */}
        <span
          className='
            font-nunito_sans font-black text-5xl md:text-7xl xl:text-8xl
            text-zinc-200 dark:text-zinc-800
            group-hover:text-[#f87171]/20
            transition-colors duration-300
            leading-none select-none w-16 md:w-24 shrink-0 text-right
          '
        >
          {p.num}
        </span>

        {/* Title */}
        <h3
          className='
            font-nunito_sans font-black
            text-3xl md:text-5xl xl:text-6xl
            text-zinc-900 dark:text-white leading-none
            group-hover:text-[#f87171]
            transition-colors duration-300
            flex-1
          '
        >
          {p.title}
        </h3>

        {/* Meta — hidden on mobile */}
        <div className='hidden md:flex flex-col items-end gap-1 shrink-0'>
          <span className='font-fira text-xs text-zinc-400 dark:text-zinc-500 tracking-widest'>
            {p.year}
          </span>
          <span className='font-fira text-xs text-zinc-400 dark:text-zinc-600'>{p.type}</span>
        </div>

        {/* Arrow indicator */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className='shrink-0'
        >
          <svg
            className='w-6 h-6 text-zinc-400 dark:text-zinc-600 group-hover:text-[#f87171] transition-colors'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M12 4v16m8-8H4'
            />
          </svg>
        </motion.div>
      </div>

      {/* Expandable panel */}
      <div className={`proj-panel${isOpen ? ' open' : ''}`}>
        <div className='pb-8 pl-16 md:pl-24 grid md:grid-cols-2 gap-8 md:gap-16'>
          {/* Description */}
          <div>
            <p className='font-fira text-sm text-zinc-600 dark:text-zinc-400 leading-[1.85] mb-5'>
              {p.desc}
            </p>
            <div className='flex flex-wrap gap-2 mb-6'>
              {p.tags.map((t) => (
                <span key={t} className='tag'>
                  {t}
                </span>
              ))}
            </div>
            <div className='flex gap-4'>
              {p.repo && (
                <a
                  href={p.repo}
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={(e) => e.stopPropagation()}
                  className='u font-fira text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 transition-colors'
                >
                  <svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' />
                  </svg>
                  Source Code
                </a>
              )}
              {p.live && (
                <a
                  href={p.live}
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={(e) => e.stopPropagation()}
                  className='font-fira text-xs text-[#f87171] hover:text-[#fca5a5] flex items-center gap-2 transition-colors'
                >
                  Live Site
                  <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Image placeholder */}
          <div className='relative aspect-video rounded-sm overflow-hidden border border-zinc-200 dark:border-white/6 bg-zinc-100 dark:bg-zinc-900 max-w-sm'>
            <div
              className='absolute inset-0 opacity-20'
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg,transparent,transparent 8px,rgba(248,113,113,0.1) 8px,rgba(248,113,113,0.1) 9px)',
              }}
            />
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='font-fira text-xs text-zinc-400 dark:text-zinc-700'>
                {'// screenshot'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
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
      { threshold: 0.08 },
    );
    sectionRef.current?.querySelectorAll('.reveal,.reveal-x').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id='work'
      ref={sectionRef}
      className='relative bg-[#fafafa] dark:bg-[#09090b] overflow-hidden py-32 px-6 md:px-16 xl:px-32'
    >
      {/* Ghost watermark */}
      <span
        className='ghost ghost-light dark:ghost-dark text-[20vw] top-[-2vw] right-[-1vw]'
        aria-hidden='true'
      >
        WORK
      </span>

      {/* Section index */}
      <div className='reveal-x mb-16 flex items-center gap-4'>
        <span className='font-fira text-[#f87171] text-xs tracking-[0.2em] uppercase'>
          03 / work
        </span>
        <span className='red-rule flex-1' />
      </div>

      <div className='reveal mb-16' style={{ transitionDelay: '0.05s' }}>
        <h2 className='font-nunito_sans font-bold text-4xl md:text-6xl text-zinc-900 dark:text-white leading-tight'>
          Things I&apos;ve
          <br />
          <span className='text-[#f87171]'>Built.</span>
        </h2>
        <p className='font-fira text-xs text-zinc-400 dark:text-zinc-600 mt-4'>
          {'// click any project to expand'}
        </p>
      </div>

      {/* Project accordion */}
      <div className='reveal' style={{ transitionDelay: '0.12s' }}>
        {PROJECTS.map((p, i) => (
          <ProjectRow
            key={p.num}
            p={p}
            isOpen={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
          />
        ))}
      </div>

      {/* GitHub CTA */}
      <div className='reveal mt-16 flex items-center gap-6' style={{ transitionDelay: '0.2s' }}>
        <span className='font-fira text-xs text-zinc-400 dark:text-zinc-600'>
          {'// more on GitHub'}
        </span>
        <a
          href='https://github.com'
          target='_blank'
          rel='noopener noreferrer'
          className='
            font-fira text-xs px-5 py-2.5 rounded-sm
            border border-zinc-300 dark:border-zinc-700
            text-zinc-500 dark:text-zinc-400
            hover:border-[#f87171]/60 hover:text-[#f87171]
            transition-all duration-300 hover:-translate-y-0.5
            flex items-center gap-2
          '
        >
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' />
          </svg>
          github.com/dotrainier
        </a>
      </div>
    </section>
  );
}
