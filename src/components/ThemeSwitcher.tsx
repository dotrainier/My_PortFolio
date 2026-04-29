<<<<<<< HEAD
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CloudMoon,  CloudSun} from "lucide-react";
import { motion } from "framer-motion";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

 
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg border-[#E5E6EB] shadow-sm border dark:border-white/30 cursor-pointer z-50"
    >
      {theme === "dark" ? 
      <motion.span
      key="light-icon"
      initial = {{ opacity: 0, scale: 0 }}
      animate = {{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      >
         <CloudSun  strokeWidth={1.5} size={20}/> 
      </motion.span>
      : 
      <motion.span
      key="dark-icon"
      initial = {{ opacity: 0, scale: 0 }}
      animate = {{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      >
        <CloudMoon strokeWidth={1.5} size={20}/>
      </motion.span>
      }
      
      
    </button>
  );
}

export default ThemeSwitcher
=======
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { CloudMoon, CloudSun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const ref = useRef<HTMLButtonElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setDidMount] = useState(false);

  useEffect(() => {
    const divRef = ref.current;
    const didMnt = !!divRef;

    setDidMount(didMnt);
  }, []);

  return (
    <button
      ref={ref}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='cursor-pointer z-50 '
    >
      {theme === 'dark' ? (
        <motion.span
          key='light-icon'
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CloudSun strokeWidth={1.5} size={18} />
        </motion.span>
      ) : (
        <motion.span
          key='dark-icon'
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CloudMoon strokeWidth={1.5} size={18} />
        </motion.span>
      )}
    </button>
  );
};

export default ThemeSwitcher;
>>>>>>> origin/professional
