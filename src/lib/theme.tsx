export interface ThemeColors {
    name: string;
    background: string;
    text: string;
    primary: string;
    secondary: string;
    border: string;
  }
  
  export type ThemeName  = 'light' | 'dark' | 'forest';
  
  export interface Themes {
    [key: string]: ThemeColors;
  }
  
  
  export const themes: Themes = {
    light: {
      name: 'light',
      background: 'bg-white',
      text: 'text-gray-900',
      primary: 'bg-blue-600',
      secondary: 'bg-gray-200',
      border: 'border-gray-900',
    },
    dark: {
      name: 'dark',
      background: 'bg-gray-900',
      text: 'text-gray-100',
      primary: 'bg-blue-500',
      secondary: 'bg-gray-700',
      border: 'border-gray-100',
    },
    forest: {
      name: 'forest',
      background: 'bg-green-600',
      text: 'text-green-900',
      primary: 'bg-green-600',
      secondary: 'bg-green-200',
      border: 'border-green-900',
    },
    sunset: {
      name: 'sunset',
      background: 'bg-orange-500',
      text: 'text-red-900',
      primary: 'bg-red-600',
      secondary: 'bg-yellow-400',
      border: 'border-red-900',
    },
    ocean: {
      name: 'ocean',
      background: 'bg-blue-800',
      text: 'text-blue-200',
      primary: 'bg-blue-600',
      secondary: 'bg-cyan-500',
      border: 'border-blue-200',
    },
    midnight: {
      name: 'midnight',
      background: 'bg-black',
      text: 'text-gray-300',
      primary: 'bg-indigo-700',
      secondary: 'bg-gray-800',
      border: 'border-gray-300',
    },
    pastel: {
      name: 'pastel',
      background: 'bg-pink-200',
      text: 'text-purple-800',
      primary: 'bg-purple-400',
      secondary: 'bg-yellow-300',
      border: 'border-purple-800',
    },
    desert: {
      name: 'desert',
      background: 'bg-yellow-600',
      text: 'text-orange-800',
      primary: 'bg-orange-400',
      secondary: 'bg-yellow-300',
      border: 'border-orange-800',
    },
    
  };
  
  