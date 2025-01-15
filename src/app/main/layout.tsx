// components/Layout.tsx
"use client";

import localFont from 'next/font/local'

const jersey15 = localFont({
  src: '../../../public/fonts/Jersey15-Regular.ttf', // Adjust the path based on your font file location

})

import { Courier_Prime } from 'next/font/google';

 const courierPrime = Courier_Prime({
  weight: '700',
  subsets: ['latin'],
});


import React from "react";
import {  Keyboard } from '@mui/icons-material';
import { useTheme } from "../theme";
import ThemeChanger from "./themeChange";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTheme } = useTheme();
  return (
    <div className="h-screen">
      <div className={`flex flex-row w-full items-center justify-between  p-5  h-[8%] ${currentTheme.background}`}>
      <div className="flex space-x-8 items-center"> 
        <Keyboard sx={{ fontSize: 45 }} className={` text-xl ${currentTheme.text}`}  />
        <p className={`${currentTheme.text} text-4xl ${jersey15.className}`} >NAME NOT YET DECIDED</p>
      </div>
      <ThemeChanger></ThemeChanger>
      </div> 
  
      <div className="h-[92%]">{children}</div>
    </div>
  );
};

export default Layout;
