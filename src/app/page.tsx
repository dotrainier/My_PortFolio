'use client';
import Cursor from '@/components/Cursor';
import Image from 'next/image';
import logo from '../../public/logo.svg';
import darkLogo from '../../public/dark-logo.svg';
import FloatingSyntax from '@/components/Backgrounds/FloatingSyntax';
import Navigation from '@/components/Navigation';
import ScreenLoader from '@/components/ScreenLoader';
import { useTheme } from 'next-themes';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const landingSectionRef = useRef<HTMLDivElement | null>(null);
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);

  const introTextRef = useRef<HTMLDivElement | null>(null);
  const aboutTextRef = useRef<HTMLDivElement | null>(null);
  const aboutPicRef = useRef<HTMLDivElement | null>(null);

  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    const divRef = ref.current;
    const didMnt = !!divRef;

    setDidMount(didMnt);
  }, []);

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

    gsap.fromTo(
      aboutTextRef.current,
      {
        yPercent: 50,
      },
      {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: '10% 80%',
          end: '60% 60%',
          scrub: 1,
        },
      },
    );

    gsap.fromTo(
      aboutPicRef.current,
      {
        yPercent: 50,
      },
      {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: '10% 80%',
          end: '60% 60%',
          scrub: 1,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const containers = gsap.utils.toArray('.stack-container');

    containers.forEach((container) => {
      if (container instanceof HTMLElement) {
        gsap.from(container.children, {
          y: 20,
          opacity: 0,
          stagger: 0.2,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
          },
        });
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className='min-h-screen relative bg-zinc-50 dark:bg-black'>
        <Cursor />
        <section
          ref={landingSectionRef}
          className='h-screen flex flex-col relative overflow-hidden'
        >
          {/* <ScreenLoader /> */}
          <div className='px-4 py-4 flex justify-between'>
            <div className='flex items-center gap-1.5' ref={ref}>
              <Image
                src={theme === 'dark' && didMount ? darkLogo : logo}
                alt='logo'
                width={20}
                height={20}
              />
              <div className='font-sans font-bold'>dotrainier</div>
            </div>
            <Navigation />
          </div>
          <div className='flex-1 flex xl:px-32 md:px-16 sm:px-8 px-6  mt-40 mx-auto flex-col font-nunito_sans font-bold text-left dark:text-white text-[#111110] '>
            <div ref={introTextRef} className='relative '>
              <div className='lg:text-5xl sm:text-3xl text-2xl md:text-4xl xl:text-7xl'>
                I&apos;m Rainier,
              </div>
              <div className='lg:text-5xl sm:text-3xl text-2xl md:text-4xl xl:text-7xl'>
                Software Dev
              </div>
              <div className='font-normal static text-lg ml:absolute top-full ml:w-max'>
                <span className='text-gray-400 dark:text-gray-500'>{'<'}</span>
                <span className='text-red-400'>Bugs </span>
                <span className='text-gray-800 dark:text-gray-200'>
                  hate me. Users love me. Problems? Just features waiting for my commit
                </span>
                <span className='text-gray-400 dark:text-gray-500'>{'/>'}</span>
              </div>
            </div>
          </div>

          <div
            className='z-10 font-nunito 
        [text-shadow:1px_1px_0_rgba(17,17,16,0.15),-1px_1px_0_rgba(17,17,16,0.15),1px_-1px_0_rgba(17,17,16,0.15),-1px_-1px_0_rgba(17,17,16,0.15)]
        dark:[text-shadow:1px_1px_0_rgba(255,255,255,0.15),-1px_1px_0_rgba(255,255,255,0.15),1px_-1px_0_rgba(255,255,255,0.15),-1px_-1px_0_rgba(255,255,255,0.15)]
         text-zinc-50 dark:text-black font-bold lg:text-[380px] md:text-[300px] sm:text-[280px] text-[250px] absolute bottom-0 leading-75 -left-25'
          >
            dotrainier
          </div>
          <FloatingSyntax />
        </section>
      </main>
    </>
  );
}
