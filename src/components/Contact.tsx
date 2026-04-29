'use client';
import { useEffect, useRef, useState } from 'react';

const EMAIL = 'rainier@example.com'; // ← replace with your real email

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/dotrainier',
    icon: (
      <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com',
    icon: (
      <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.737-8.845L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id='contact'
      ref={sectionRef}
      className='relative noise bg-[#fafafa] dark:bg-zinc-950 overflow-hidden py-32 px-6 md:px-16 xl:px-32'
    >
      {/* Ghost watermark — bottom, massive */}
      <span
        className='ghost ghost-light dark:ghost-dark text-[14vw] bottom-[-1.5vw] left-[-0.5vw]'
        aria-hidden='true'
        style={{ letterSpacing: '-0.04em' }}
      >
        HIT ME UP
      </span>

      {/* Section index */}
      <div className='reveal-x mb-20 flex items-center gap-4'>
        <span className='font-fira text-[#f87171] text-xs tracking-[0.2em] uppercase'>
          04 / contact
        </span>
        <span className='red-rule flex-1' />
      </div>

      {/* Main headline */}
      <div className='reveal mb-16' style={{ transitionDelay: '0.05s' }}>
        <h2 className='font-nunito_sans font-black text-5xl md:text-7xl xl:text-8xl text-zinc-900 dark:text-white leading-[0.9] tracking-tight'>
          Let&apos;s build
          <br />
          <span className='text-[#f87171]'>something</span>
          <br />
          together.
        </h2>
      </div>

      {/* Sub-copy */}
      <div className='reveal mb-16 max-w-lg' style={{ transitionDelay: '0.1s' }}>
        <p className='font-fira text-sm text-zinc-500 dark:text-zinc-400 leading-[1.85]'>
          Available for full-time roles, freelance projects, and meaningful collabs. If you&apos;re
          building something interesting — I&apos;d like to hear about it.
        </p>
      </div>

      {/* Email — the main CTA, big and clickable */}
      <div className='reveal mb-6' style={{ transitionDelay: '0.15s' }}>
        <p className='font-fira text-[10px] text-zinc-400 dark:text-zinc-600 tracking-[0.25em] uppercase mb-3'>
          email
        </p>
        <div className='flex flex-wrap items-center gap-4'>
          <a
            href={`mailto:${EMAIL}`}
            className='
              font-nunito_sans font-bold
              text-2xl md:text-4xl xl:text-5xl
              text-zinc-800 dark:text-zinc-200
              hover:text-[#f87171] dark:hover:text-[#f87171]
              transition-colors duration-200
              u
            '
          >
            {EMAIL}
          </a>
          <button
            onClick={handleCopy}
            className={`
              font-fira text-xs px-3 py-2 rounded-sm border transition-all duration-300 shrink-0
              ${
                copied
                  ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-400'
                  : 'border-zinc-300 dark:border-zinc-700 text-zinc-400 hover:border-[#f87171]/50 hover:text-[#f87171]'
              }
            `}
          >
            {copied ? '✓ copied' : 'copy'}
          </button>
        </div>
      </div>

      {/* Primary CTA button */}
      <div className='reveal mb-20' style={{ transitionDelay: '0.2s' }}>
        <a
          href={`mailto:${EMAIL}`}
          className='
            inline-flex items-center gap-3
            font-nunito_sans font-bold text-sm
            px-8 py-4 rounded-sm
            bg-[#09090b] dark:bg-white
            text-white dark:text-[#09090b]
            hover:bg-[#f87171] dark:hover:bg-[#f87171] dark:hover:text-white
            transition-all duration-300
            hover:-translate-y-0.5
          '
        >
          Send a message
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17 8l4 4m0 0l-4 4m4-4H3'
            />
          </svg>
        </a>
      </div>

      {/* Socials row */}
      <div className='reveal flex flex-wrap gap-3 mb-24' style={{ transitionDelay: '0.25s' }}>
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target='_blank'
            rel='noopener noreferrer'
            className='
              flex items-center gap-2.5
              font-fira text-xs
              px-4 py-2.5 rounded-sm
              border border-zinc-200 dark:border-zinc-800
              text-zinc-500 dark:text-zinc-500
              hover:border-[#f87171]/50 hover:text-[#f87171]
              transition-all duration-200
            '
          >
            {s.icon}
            {s.label}
          </a>
        ))}
      </div>

      {/* Footer */}
      <div
        className='reveal border-t border-zinc-200 dark:border-zinc-800 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2'
        style={{ transitionDelay: '0.3s' }}
      >
        <span className='font-fira text-xs text-zinc-400 dark:text-zinc-600'>
          © {new Date().getFullYear()} dotrainier — designed &amp; built by Rainier
        </span>
        <span className='font-fira text-xs text-zinc-300 dark:text-zinc-700'>
          {'<made with Next.js + Tailwind CSS v4 />'}
        </span>
      </div>
    </section>
  );
}
