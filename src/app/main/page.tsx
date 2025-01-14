'use client';
import localFont from 'next/font/local'

const jersey15 = localFont({
  src: '../../../public/fonts/Jersey15-Regular.ttf', 
})

import { useTheme } from '../theme';
import Link from 'next/link';

const Main = () => {

  const { currentTheme } = useTheme();

  return (
  
          <div className={ `h-full flex items-center justify-center  w-screen ${currentTheme.background} ${jersey15.className} `}>
          <div className={`space-y-10 w-96 h-96 flex flex-col items-center justify-center rounded-2xl ${currentTheme.secondary} `}>
          <h1 className={`text-5xl  ${currentTheme.text}`} >Player Mode</h1>
          
          <Link href="main/solo" className={`text-3xl hover:underline  ${currentTheme.text}`} >Solo Player</Link>
          <Link href="main/multiplayer"className= {`text-3xl hover:underline ${currentTheme.text}`} >Multiplayer Player</Link>
          <Link href="main/multiplayer"className= {`text-3xl hover:underline ${currentTheme.text}`} > Pratice Mode</Link>
      </div>
      </div>
  );
};

export default Main;


  