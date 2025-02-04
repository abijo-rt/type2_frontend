// themeContext.tsx
'use client'

import { ThemeColors, ThemeName, themes } from '@/lib/theme';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: ThemeName;
  currentTheme: ThemeColors;
  changeTheme: (theme: ThemeName) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeName>('forest');
  const [currentTheme, setCurrTheme] = useState<ThemeColors>(themes['forest']);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeName;
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
      setCurrTheme(themes[savedTheme]);
    } else {
      setTheme('dark');
      setCurrTheme(themes['dark']);
    }
  }, []); 

  const changeTheme = (newTheme: ThemeName) => {
    console.log('Changing theme to:', newTheme);
    if (themes[newTheme]) {
      setTheme(newTheme);
      setCurrTheme(themes[newTheme]);
      localStorage.setItem('theme', newTheme);
      console.log('Updated theme:', newTheme);
      console.log('Updated currentTheme:', themes[newTheme]);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  // console.log(context)
  return context;
}
