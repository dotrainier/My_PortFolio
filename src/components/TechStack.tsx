'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Skills data ─── */
const SKILLS = {
  languages: ['Python', 'TypeScript', 'JavaScript', 'C', 'HTML', 'CSS'],
  frameworks: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'Framer Motion', 'GSAP'],
  databases: ['PostgreSQL', 'SQLite', 'MongoDB'],
  tools: ['Git', 'GitHub', 'VS Code', 'Figma', 'Linux'],
};

const STARTER_CHIPS = [
  'How did you learn to code?',
  "What's your main stack?",
  'Are you available for hire?',
];

/* ─── Types ─── */
type Message = { role: 'user' | 'assistant'; text: string };

/* ─── AI Chat Card ─── */
function AskMeCard() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hey! I'm Rainier 😊 Ask me anything — about my work, skills, or how I got into coding.",
    },
  ]);
  const [chips, setChips] = useState(STARTER_CHIPS);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: data.response ?? 'Hmm, something went wrong. Try again!' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Hmm, something went wrong. Try again!' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleChip(chip: string) {
    setChips((prev) => prev.filter((c) => c !== chip));
    sendMessage(chip);
  }

  return (
    <div className='rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0d0d0d] flex flex-col'>
      {/* Header */}
      <div className='flex items-center gap-3 px-5 py-4 border-b border-zinc-100 dark:border-zinc-800'>
        <div className='w-9 h-9 rounded-full bg-[#f87171] flex items-center justify-center font-bold text-sm text-[#09090b] flex-shrink-0'>
          R
        </div>
        <div>
          <p className='font-nunito_sans font-bold text-sm text-zinc-900 dark:text-white leading-none'>
            Rainier
          </p>
          <p className='font-fira text-[10px] text-zinc-400 dark:text-zinc-600 mt-0.5'>
            Software Developer
          </p>
        </div>
        <div className='ml-auto flex items-center gap-1.5'>
          <span className='w-1.5 h-1.5 rounded-full bg-emerald-400' />
          <span className='font-fira text-[10px] text-emerald-500 dark:text-emerald-400'>
            online
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className='flex flex-col gap-3 px-5 py-4 min-h-[200px] max-h-[300px] overflow-y-auto'>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[88%] px-3 py-2 rounded-lg font-fira text-xs leading-relaxed ${
              m.role === 'user'
                ? 'self-end bg-[#f87171] text-[#09090b] rounded-br-sm'
                : 'self-start bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 rounded-bl-sm'
            }`}
          >
            {m.text}
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className='self-start bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg rounded-bl-sm px-4 py-3 flex gap-1.5 items-center'>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className='w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600'
                style={{ animation: `chatbounce 1.2s ${i * 0.2}s infinite` }}
              />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestion chips */}
      {chips.length > 0 && (
        <div className='flex flex-wrap gap-2 px-5 pb-3'>
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => handleChip(chip)}
              className='font-fira text-[11px] px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-500 hover:border-[#f87171]/60 hover:text-[#f87171] transition-all duration-150'
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <div className='flex gap-2 px-4 py-3 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50'>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          placeholder='Ask something...'
          disabled={loading}
          className='flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm px-3 py-2 font-fira text-xs text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-700 outline-none focus:border-[#f87171]/50 transition-colors disabled:opacity-50'
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          className='bg-[#f87171] hover:bg-[#fca5a5] disabled:opacity-40 rounded-sm w-9 h-9 flex items-center justify-center transition-colors flex-shrink-0'
        >
          <svg className='w-4 h-4 fill-[#09090b]' viewBox='0 0 24 24'>
            <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Scramble pill ─── */
const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFabcdef0123456789';

function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iterRef = useRef(0);

  const scramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    iterRef.current = 0;
    intervalRef.current = setInterval(() => {
      iterRef.current += 0.5;
      setDisplay(
        text
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' ';
            if (idx < iterRef.current) return text[idx];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(''),
      );
      if (iterRef.current >= text.length) {
        clearInterval(intervalRef.current!);
        setDisplay(text);
      }
    }, 28);
  }, [text]);

  return (
    <span
      className='font-fira text-sm text-zinc-600 dark:text-zinc-300 group-hover:text-[#f87171] cursor-default transition-colors duration-150'
      onMouseEnter={scramble}
    >
      {display}
    </span>
  );
}

/* ─── Main section ─── */
export default function TechStack() {
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
      id='stack'
      ref={sectionRef}
      className='relative noise bg-[#fafafa] dark:bg-zinc-950 overflow-hidden py-32 px-6 md:px-16 xl:px-32'
    >
      {/* Ghost watermark */}
      <span
        className='ghost ghost-light dark:ghost-dark text-[22vw] bottom-[-3vw] left-[-1vw]'
        aria-hidden='true'
      >
        STACK
      </span>

      {/* Section index */}
      <div className='reveal-x mb-20 flex items-center gap-4'>
        <span className='font-fira text-[#f87171] text-xs tracking-[0.2em] uppercase'>
          02 / stack
        </span>
        <span className='red-rule flex-1' />
      </div>

      <div className='grid lg:grid-cols-2 gap-16 lg:gap-24 items-start'>
        {/* LEFT — AI chat card */}
        <div className='reveal' style={{ transitionDelay: '0.05s' }}>
          <h2 className='font-nunito_sans font-bold text-4xl md:text-5xl xl:text-6xl text-zinc-900 dark:text-white leading-tight mb-3'>
            What I<br />
            <span className='text-[#f87171]'>Build With</span>
          </h2>
          <p className='font-fira text-xs text-zinc-400 dark:text-zinc-600 mb-8'>
            <span className='text-zinc-300 dark:text-zinc-700'>{'// '}</span>
            ask me anything
          </p>
          <AskMeCard />
        </div>

        {/* RIGHT — scramble skill grid */}
        <div className='reveal' style={{ transitionDelay: '0.15s' }}>
          <p className='font-fira text-xs text-zinc-400 dark:text-zinc-600 mb-10 mt-0 lg:mt-[88px]'>
            <span className='text-zinc-300 dark:text-zinc-700'>{'// '}</span>
            hover any skill to scramble
          </p>

          {(Object.entries(SKILLS) as [string, string[]][]).map(([cat, items]) => (
            <div key={cat} className='mb-7'>
              <div className='flex items-center gap-3 mb-3'>
                <span className='inline-block w-4 h-px bg-[#f87171] opacity-60' />
                <span className='font-fira text-[10px] text-zinc-400 dark:text-zinc-600 tracking-[0.22em] uppercase'>
                  {cat}
                </span>
              </div>
              <div className='flex flex-wrap gap-2'>
                {items.map((skill) => (
                  <div
                    key={skill}
                    className='group border border-zinc-200 dark:border-zinc-800 hover:border-[#f87171]/60 hover:bg-[#f87171]/5 rounded-sm px-3 py-1.5 transition-all duration-200 hover:-translate-y-0.5'
                  >
                    <ScrambleText text={skill} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bounce keyframes for typing dots */}
      <style>{`
        @keyframes chatbounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </section>
  );
}
