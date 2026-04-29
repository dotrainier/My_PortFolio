import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function ScreenLoader() {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaderDone, setIsLoaderDone] = useState<boolean>(false);
  const [isDoneAll, setIsDoneAll] = useState<boolean>(false);
<<<<<<< HEAD
  const word = "dotrainier.";
=======
  const word = 'dotrainier.';
>>>>>>> origin/professional

  const columns = Array(10).fill(null);

  useEffect(() => {
<<<<<<< HEAD
    if(!isDoneAll){
      document.body.classList.add('no-scroll');
    }else{
=======
    if (!isDoneAll) {
      document.body.classList.add('no-scroll');
    } else {
>>>>>>> origin/professional
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
<<<<<<< HEAD
  }, [isDoneAll])

  useEffect(() => {
    if(isLoaderDone){
      gsap.set(columnsRef.current, {
      scaleY: 1,
      transformOrigin: "bottom center"
    });

    gsap.to(columnsRef.current, {
      scaleY: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.inOut",
      delay: 0.5 
    });

    gsap.to(lettersRef.current, {
    opacity: 0,
    duration: .5,
    ease: "power2.out",
    delay: 0.8,
    onComplete: () => {
      setIsDoneAll(true)
    }
    });
    }
  
  }, [isLoaderDone]);


  
=======
  }, [isDoneAll]);

  useEffect(() => {
    if (isLoaderDone) {
      gsap.set(columnsRef.current, {
        scaleY: 1,
        transformOrigin: 'bottom center',
      });

      gsap.to(columnsRef.current, {
        scaleY: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.inOut',
        delay: 0.5,
      });

      gsap.to(lettersRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.8,
        onComplete: () => {
          setIsDoneAll(true);
        },
      });
    }
  }, [isLoaderDone]);

>>>>>>> origin/professional
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      lettersRef.current,
<<<<<<< HEAD
      { scaleY: 0, transformOrigin: "bottom" },
      {
        scaleY: 1,
        duration: 0.3,
        ease: "power3.out",
        stagger: 0.1,
        onComplete: () => {
           setIsLoaderDone(true)
        }
      }
    );

    return () => { tl.kill(); };
  }, []);


  return (
    <div 
=======
      { scaleY: 0, transformOrigin: 'bottom' },
      {
        scaleY: 1,
        duration: 0.3,
        ease: 'power3.out',
        stagger: 0.1,
        onComplete: () => {
          setIsLoaderDone(true);
        },
      },
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
>>>>>>> origin/professional
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        zIndex: 1000,
<<<<<<< HEAD
        pointerEvents: 'none' 
=======
        pointerEvents: 'none',
>>>>>>> origin/professional
      }}
    >
      {columns.map((_, index) => (
        <div
          key={index}
<<<<<<< HEAD
          ref={el => { columnsRef.current[index] = el; }}
=======
          ref={(el) => {
            columnsRef.current[index] = el;
          }}
>>>>>>> origin/professional
          className='bg-zinc-100 dark:bg-neutral-900'
          style={{
            flex: 1,
            height: '100%',
<<<<<<< HEAD
            transform: 'scaleY(1)'
=======
            transform: 'scaleY(1)',
>>>>>>> origin/professional
          }}
        />
      ))}

<<<<<<< HEAD
      <div className='absolute left-1/2 top-1/2 -translate-1/2 text-slate-800 dark:text-zinc-50 text-7xl uppercase font-inter font-bold'> 
          {word.split("").map((letter, i) => (
=======
      <div className='absolute left-1/2 top-1/2 -translate-1/2 text-slate-800 dark:text-zinc-50 lg:text-7xl md:text-6xl sm:text-5xl text-3xl uppercase font-inter font-bold'>
        {word.split('').map((letter, i) => (
>>>>>>> origin/professional
          <span
            key={i}
            ref={(el) => {
              lettersRef.current[i] = el;
            }}
<<<<<<< HEAD
            className="inline-block origin-bottom"
=======
            className='inline-block origin-bottom'
>>>>>>> origin/professional
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
<<<<<<< HEAD
};
=======
}
>>>>>>> origin/professional
