'use client';
import ThemeSwitcher from './ThemeSwitcher';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '#',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth={1.8}
        strokeLinecap='round'
        strokeLinejoin='round'
        className='w-4 h-4'
      >
        <path d='M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z' />
        <path d='M9 21V12h6v9' />
      </svg>
    ),
  },
  {
    label: 'About',
    href: '#about',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth={1.8}
        strokeLinecap='round'
        strokeLinejoin='round'
        className='w-4 h-4'
      >
        <circle cx='12' cy='8' r='4' />
        <path d='M4 20c0-4 3.6-7 8-7s8 3 8 7' />
      </svg>
    ),
  },
  {
    label: 'Stack',
    href: '#stack',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth={1.8}
        strokeLinecap='round'
        strokeLinejoin='round'
        className='w-4 h-4'
      >
        <rect x='3' y='3' width='7' height='7' rx='1' />
        <rect x='14' y='3' width='7' height='7' rx='1' />
        <rect x='3' y='14' width='7' height='7' rx='1' />
        <rect x='14' y='14' width='7' height='7' rx='1' />
      </svg>
    ),
  },
  {
    label: 'Work',
    href: '#work',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth={1.8}
        strokeLinecap='round'
        strokeLinejoin='round'
        className='w-4 h-4'
      >
        <path d='M3 7h18M3 12h18M3 17h18' />
      </svg>
    ),
  },
  {
    label: 'Contact',
    href: '#contact',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth={1.8}
        strokeLinecap='round'
        strokeLinejoin='round'
        className='w-4 h-4'
      >
        <path d='M21 5H3a1 1 0 00-1 1v12a1 1 0 001 1h18a1 1 0 001-1V6a1 1 0 00-1-1z' />
        <path d='M3 6l9 7 9-7' />
      </svg>
    ),
  },
];

export default function Navigation() {
  const [active, setActive] = useState('Home');
  const [hovering, setHovering] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map(({ label, href }) => ({
      label,
      el: href === '#' ? null : document.querySelector(href),
    }));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const match = sections.find((s) => s.el === e.target);
            if (match) setActive(match.label);
          }
        });
      },
      { threshold: 0.4 },
    );

    sections.forEach(({ el }) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Vertical floating pill — right side ── */}
      <nav
        className={`
          fixed right-5 top-1/2 -translate-y-1/2 z-50
          flex flex-col items-center gap-1
          px-2 py-3 rounded-full
          bg-white/90 dark:bg-zinc-900/90
          backdrop-blur-md
          border border-zinc-200/80 dark:border-zinc-800/80
          shadow-sm
          transition-opacity duration-500
          ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        aria-label='Site navigation'
      >
        {NAV_ITEMS.map(({ label, href, icon }) => {
          const isActive = active === label;
          const isHovered = hovering === label;

          return (
            <div key={label} className='relative flex items-center'>
              {/* Tooltip label */}
              {isHovered && (
                <div
                  className='
                  absolute right-full mr-3
                  font-fira text-[11px] tracking-wide
                  bg-zinc-900 dark:bg-white
                  text-white dark:text-zinc-900
                  px-2.5 py-1 rounded-sm
                  whitespace-nowrap pointer-events-none
                  animate-in fade-in duration-150
                '
                >
                  {label}
                </div>
              )}

              <a
                href={href}
                onClick={() => setActive(label)}
                onMouseEnter={() => setHovering(label)}
                onMouseLeave={() => setHovering(null)}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  transition-all duration-200
                  ${
                    isActive
                      ? 'bg-[#f87171] text-white'
                      : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }
                `}
              >
                {icon}
              </a>
            </div>
          );
        })}

        {/* Divider */}
        <div className='w-4 h-px bg-zinc-200 dark:bg-zinc-800 my-1' />

        {/* Theme switcher */}
        <div className='w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200'>
          <ThemeSwitcher />
        </div>
      </nav>

      {/* ── Top bar — visible before scroll ── */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500
          ${scrolled ? 'opacity-0 pointer-events-none -translate-y-2' : 'opacity-100 translate-y-0'}
        `}
      >
        <div className='flex items-center justify-between px-6 py-4 md:px-16'>
          {/* Logo area — empty, handled by page.tsx */}
          <div />
          {/* Inline nav links */}
          <div className='flex items-center gap-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 rounded-full px-3 py-1.5 shadow-sm'>
            {NAV_ITEMS.filter((n) => n.label !== 'Home').map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className='font-fira text-[11px] tracking-wide px-3 py-1.5 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-150'
              >
                {label}
              </a>
            ))}
            <div className='w-px h-4 bg-zinc-200 dark:bg-zinc-700 mx-1' />
            <div className='px-1'>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
