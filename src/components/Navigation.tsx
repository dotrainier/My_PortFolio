import ThemeSwitcher from './ThemeSwitcher';
import { PhHouseDuotone, SolarUserBoldDuotone, SiGridDuotone } from './NavigationIcons';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

export default function Navigation() {
  const { theme } = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [didMount, setDidMount] = useState(false);

  return (
    <div
      ref={(div) => setDidMount(!!div?.isConnected)}
      className='rounded-full shadow-md flex items-center py-1.5 px-1.5 gap-1 font-sans text-sm fixed top-4 left-1/2 -translate-x-1/2 z-30 bg-white dark:bg-gray-900'
    >
      <div
        className={`rounded-full  w-9 h-9 flex items-center justify-center border border-transparent transition-colors
        ${theme === 'light' && didMount ? 'hover:bg-gray-200 hover:border-gray-300' : 'hover:bg-gray-700 hover:border-gray-600'}
        `}
      >
        <PhHouseDuotone className='w-4.5' />
      </div>

      {/* lines */}
      <div className='w-0.5 self-stretch flex items-center'>
        <div className='w-full h-[50%] bg-gray-200'></div>
      </div>

      <div>
        <div
          className={`rounded-full p-2 border border-transparent flex items-center justify-between gap-2.5 transition-colors 
              ${theme === 'light' && didMount ? 'hover:bg-gray-200 hover:border-gray-300' : 'hover:bg-gray-700 hover:border-gray-600'}
            `}
        >
          <SolarUserBoldDuotone className='w-4.5' />
          <span className='leading-4.5'> About </span>
        </div>
      </div>

      <div>
        <div
          className={`rounded-full p-2 border border-transparent flex items-center justify-between gap-2.5 transition-colors 
              ${theme === 'light' && didMount ? 'hover:bg-gray-200 hover:border-gray-300' : 'hover:bg-gray-700 hover:border-gray-600'}
            `}
        >
          <SiGridDuotone className='w-4.5' />
          <span className='leading-4.5'> Work </span>
        </div>
      </div>

      {/* lines */}
      <div className='w-0.5 self-stretch flex items-center'>
        <div className='w-full h-[50%] bg-gray-200'></div>
      </div>

      <div
        className={`rounded-full  w-9 h-9 flex items-center justify-center border border-transparent transition-colors
        ${theme === 'light' && didMount ? 'hover:bg-gray-200 hover:border-gray-300' : 'hover:bg-gray-700 hover:border-gray-600'}
        `}
      >
        <ThemeSwitcher />
      </div>
    </div>
  );
}
