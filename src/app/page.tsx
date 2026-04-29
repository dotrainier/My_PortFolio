<<<<<<< HEAD
"use client"
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Cursor from "@/components/Cursor";
import ChatButton from "@/components/ChatButton";
import Image from "next/image";
import logo from '../../public/logo.svg'
import darkLogo from '../../public/dark-logo.svg'
import FloatingSyntax from "@/components/Backgrounds/FloatingSyntax";
import ScreenLoader from "@/components/ScreenLoader";
import { useTheme } from "next-themes";
import { useRef, useEffect, useState} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import myPic from "@/assets/images/my_pic.jpg"
import StackContainer from "@/components/StackContainer";
import ProjectContainer from "@/components/ProjectsContainer";

gsap.registerPlugin(ScrollTrigger);


export default function Home() {
  const landingSectionRef = useRef<HTMLDivElement | null>(null);
  const aboutSectionRef = useRef<HTMLDivElement | null>(null)


  const introTextRef = useRef<HTMLDivElement | null>(null);
  const aboutTextRef = useRef<HTMLDivElement | null>(null)
  const aboutPicRef = useRef<HTMLDivElement |null>(null)

  const {theme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {

      gsap.set([aboutPicRef.current, aboutTextRef.current], {
        yPercent: 50
      });

    gsap.to(introTextRef.current, {
      yPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: landingSectionRef.current,
        start: "80% 75%", 
        end: "95% 60%",   
        scrub: 1,
      }
    });

    gsap.to(aboutTextRef.current, {
      yPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: aboutSectionRef.current,
        start: "10% 80%", 
        end: "60% 60%",   
        scrub:1,
      }  
    });

    gsap.to(aboutPicRef.current, {
      yPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: aboutSectionRef.current,
        start: "10% 80%", 
        end: "60% 60%",   
        scrub:1,
      }  
    });


  
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, [])

  useEffect(() => {
    const containers = gsap.utils.toArray(".stack-container");

    containers.forEach(container => {
      if (container instanceof HTMLElement) {
        gsap.from(container.children, {
          y: 20,
          opacity: 0,
          stagger: 0.2,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    setMounted(true);
=======
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
>>>>>>> origin/professional
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
<<<<<<< HEAD
  }, []); 


  
  return (
   <>
    
   <main  className="min-h-screen relative bg-zinc-50 dark:bg-black">
      <Cursor/>
      <section  ref={landingSectionRef} className="h-screen flex flex-col relative overflow-hidden">
         <ScreenLoader />
        <div className="px-4 py-4 flex justify-between">
          <div className="flex items-center gap-1.5">
              <Image src={( theme === 'dark' && mounted ) ? darkLogo : logo} alt="logo" width={20} height={20}/>
              <div className="font-sans font-bold">dotrainier</div>
          </div>
          <ThemeSwitcher></ThemeSwitcher>
        </div>
        <div className="flex-1 flex  mt-40 mx-auto flex-col font-nunito_sans font-bold text-left dark:text-white text-[#111110] ">
          <div ref={introTextRef} className="relative " >
            <div   className="text-7xl">I&apos;m Rainier,</div>
            <div className=" text-7xl">Software Dev</div>
            <div className="font-normal text-lg absolute top-full w-max"> 
                <span className="inline-flex items-center gap-1">
                  <span className="text-gray-400 dark:text-gray-500">
                  {'<'}
                  </span>
                  <span className="text-red-400">Bugs</span>
                  <span className="text-gray-800 dark:text-gray-200">hate me. Users love me. Problems? Just features waiting for my commit</span>
                  <span className="text-gray-400 dark:text-gray-500">
                    {'/>'}
                  </span>
                </span>  
            </div>
          </div>
        </div>

        <div className="z-10 font-nunito 
        [text-shadow:_1px_1px_0_rgba(17,17,16,0.15),_-1px_1px_0_rgba(17,17,16,0.15),_1px_-1px_0_rgba(17,17,16,0.15),_-1px_-1px_0_rgba(17,17,16,0.15)]
        dark:[text-shadow:_1px_1px_0_rgba(255,255,255,0.15),_-1px_1px_0_rgba(255,255,255,0.15),_1px_-1px_0_rgba(255,255,255,0.15),_-1px_-1px_0_rgba(255,255,255,0.15)]
         text-zinc-50 dark:text-black font-bold text-[380px] absolute bottom-0 leading-[300px] -left-[100px]">dotrainier</div>
        <ChatButton/>
        <FloatingSyntax/>
      </section> 

    <section className="px-32 mt-40 py-4 space-y-2 text-gray-700 dark:text-zinc-50 box-border ">
        <div>This is me.</div>
        <div className="h-[1px] bg-gray-700"></div>

        <div className="flex  px-48  py-16 gap-28 justify-center" ref={aboutSectionRef}>
          <div className="h-max w-max relative rounded-md shadow-md shrink-0" ref={aboutPicRef}>
              <div className="absolute inset-0 bg-white border-r-2 border-b-2 border-r-blue-400 border-b-blue-400 rounded-[inherit]"></div>
              <Image  src={myPic} alt="pic"  className="h-auto w-72 aspect-auto z-10 hover:rotate-0 transition-transform  ease-in-out duration-300 rotate-[3deg] relative rounded-[inherit]"/>
          </div>

          <div className="font-nunito_sans space-y-4 w-[600px]" ref={aboutTextRef}>
              <div>Passionate about crafting seamless, high-performance web applications with a strong focus on user experience. Skilled in modern frontend technologies like React and Next.js, coupled with robust backend development using Node.js and Express.js. Experienced in multiple programming languages, including Python, PHP, C++, and Java, with a solid foundation in software engineering principles.</div>
              <div>Driven by a commitment to continuous learning and innovation, I thrive on solving complex problems and delivering efficient, scalable solutions. Dedicated to writing clean, maintainable code and staying ahead of industry trends to build impactful digital experiences.</div>
          </div>
      </div>
    </section>

   

    <section className="font-nunito_sans px-48  py-20 ">
        <StackContainer />
    </section>

    <section className="font-nunito_sans px-48 min-h-screen py-16 ">
        <ProjectContainer />
    </section>

   </main>
   </>
=======
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
>>>>>>> origin/professional
  );
}
