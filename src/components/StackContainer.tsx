"use client"
import { useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useTheme } from "next-themes";

import Javascript from "@/assets/images/stacks/frontend/js.svg"
import Typescript from "@/assets/images/stacks/frontend/ts.svg"
import React from "@/assets/images/stacks/frontend/react.svg"
import NextJs from "@/assets/images/stacks/frontend/nextjs.svg"
import Tailwind from "@/assets/images/stacks/frontend/tailwind.svg"
import Framer from "@/assets/images/stacks/frontend/framer.svg"
import Zustand from "@/assets/images/stacks/frontend/zustand.svg"

import NodeJS from "@/assets/images/stacks/backend/nodejs.svg"
import PostgreSql from "@/assets/images/stacks/backend/postgre.svg"
import MySQL from "@/assets/images/stacks/backend/mySQL.svg"
import PHP from "@/assets/images/stacks/backend/php.svg"
import Python from "@/assets/images/stacks/backend/python.svg"

import ExpressJS from "@/assets/images/stacks/backend/expressjs.svg"


import Postman from "@/assets/images/stacks/tools/postman.svg"
import Netlify from "@/assets/images/stacks/tools/netlify.svg"
import Github from "@/assets/images/stacks/tools/github.svg"


import FramerDark from "@/assets/images/stacks/frontend/framer-dark.svg"
import GithubDark from "@/assets/images/stacks/tools/github-dark.svg"
import ExpressJsDark from "@/assets/images/stacks/backend/expressjs-dark.svg"
import NodeJsDark from "@/assets/images/stacks/backend/nodejs-dark.svg"
import PHPDark from "@/assets/images/stacks/backend/php-dark.svg"

const frontendStacks = [
    {
        icon: Javascript,
        iconDark: Javascript,
        name: "Javascript"
    },

    {
        icon: Typescript,
        iconDark: Typescript,
        name: "Typescript"
    },

    {
        icon: React,
        iconDark: React,
        name: "React"
    },

    {
        icon: NextJs,
        iconDark: NextJs,
        name: "NextJs"
    },

    {
        icon: Tailwind,
        iconDark: Tailwind,
        name: "Tailwind"
    },

    {
        icon: Framer,
        iconDark: FramerDark,
        name: "Framer"
    },

      {
        icon: Zustand,
        iconDark: Zustand,
        name: "Zustand",
    }
]

const backendendStacks = [
    {
        icon: NodeJS,
        iconDark: NodeJsDark,
        name: "NodeJS",
    },

    {
        icon: ExpressJS,
        iconDark: ExpressJsDark,
        name: "ExpressJS",
    },

    {
        icon: PostgreSql,
        iconDark: PostgreSql,
        name: "PostgreSql",
    },

    {
        icon: MySQL,
        iconDark: MySQL,
        name: "MySQL",
    },
    {
        icon: PHP,
        iconDark: PHPDark,
        name: "PHP",
    },
    {
        icon: Python,
        iconDark: Python,
        name: "Python",
    },
]


const toolStacks = [
    {
        icon: Postman,
        iconDark: Postman,
        name: "Postman"
    },

    {
        icon: Netlify,
        iconDark: Netlify,
        name: "Netlify"
    },

    {
        icon: Github,
        iconDark: GithubDark,
        name: "Github"
    },

]

gsap.registerPlugin(ScrollTrigger);
export default function StackContainer() {

    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false)


    useLayoutEffect(() => {
    const timer = setTimeout(() => {
        gsap.utils.toArray<HTMLElement>('.stack-container').forEach((container, i) => {
          
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top 65%',
                    end: 'bottom 70%',
                    toggleActions: "play none reverse none",
                    id: `container-${i}`
                }
            });

      
            tl.fromTo(container.querySelector('.stackName'), 
                { y: 40, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.5, 
                    ease: 'power2.out' 
                }
            );

            tl.fromTo(container.querySelectorAll('.stack'),
                { y: 40, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    stagger: 0.2, 
                    duration: 0.5, 
                    ease: 'power2.out' 
                },
                "+=0.1"
            );
        });

        ScrollTrigger.refresh();
    }, 50);

    return () => {
        clearTimeout(timer);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
    }, []);

    useEffect(() => setMounted(true), [])

    if (!mounted) {
    return <div className="h-[500px] w-full" /> 
    }

    return (
      <div className="font-nunito_sans xl:px-48 lg:px-40 md:px-20 sm:px-12 px-8  py-20" >
          <div className="text-lg font-bold text-neutral-800 mb-8 dark:text-zinc-50">MY STACK</div>
          <div  className="space-y-20">
            <div className="font-nunito_sans  grid grid-cols-12 stack-container">
                <div className="xl:text-4xl lg:text-3xl md:2xl: sm:text-xl text-neutral-700 dark:text-zinc-50 font-extrabold col-span-5 stackName">FRONTEND</div>
                <div className="lg:text-2xl md:text-xl text-sm font-medium flex gap-8 col-span-7 flex-wrap">
                    {
                        frontendStacks.map((stack) => (
                            <div key={stack.name} className="stack flex items-center gap-3  text-neutral-700 dark:text-zinc-50  font-bold font-nunito">
                                <div className="h-10 w-10 ">
                                    <Image src={(theme || 'light') === "dark" ? stack.iconDark : stack.icon} alt={stack.name} className="w-full h-full" width={60} height={60}/>
                                </div>
                                {stack.name}
                            </div>
                        ))
                    }
                </div>
            </div>

             <div className="font-nunito_sans grid grid-cols-12 stack-container">
                <div className="xl:text-4xl lg:text-3xl md:2xl: sm:text-xl text-neutral-700 dark:text-zinc-50 font-extrabold col-span-5 stackName">BACKEND</div>
                <div className="lg:text-2xl md:text-xl text-sm font-medium flex gap-8 col-span-7 flex-wrap">
                    {
                        backendendStacks.map((stack) => (
                            <div key={stack.name} className="stack flex items-center gap-3  text-neutral-700 dark:text-zinc-50 font-bold font-nunito">
                                <div className="h-10 w-10 ">
                                    <Image src={theme === "dark"  ? stack.iconDark : stack.icon} alt={stack.name} className="w-full h-full" width={60} height={60}/>
                                </div>
                                {stack.name}
                            </div>
                        ))
                    }
                </div>
            </div>

              <div className="font-nunito_sans grid grid-cols-12 stack-container">
                <div className="xl:text-4xl lg:text-3xl md:2xl: sm:text-xl text-neutral-700 dark:text-zinc-50 font-extrabold col-span-5 stackName">Tools</div>
                <div className="lg:text-2xl md:text-xl text-sm font-medium flex gap-8 col-span-7 flex-wrap">
                    {
                        toolStacks.map((stack) => (
                            <div key={stack.name} className="stack flex items-center gap-3  text-neutral-700 dark:text-zinc-50  font-bold font-nunito">
                                <div className="h-10 w-10 ">
                                    <Image  src={theme === "dark"  ? stack.iconDark : stack.icon}
                                    alt={stack.name} className="w-full h-full" width={60} height={60}/>
                                </div>
                                {stack.name}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
      </div>
    );
}