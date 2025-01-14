import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Light Theme
    'bg-white',
    'text-gray-900',
    'bg-blue-600',
    'bg-gray-200',
    'border-gray-900',
    'border-blue-600',
    'border-gray-200',

    // Dark Theme
    'bg-gray-900',
    'text-gray-100',
    'bg-blue-500',
    'bg-gray-700',
    'border-gray-100',
    'border-blue-500',
    'border-gray-700',

    // Forest Theme
    'bg-green-600',
    'text-green-900',
    'bg-green-500',
    'bg-green-200',
    'border-green-600',
    'border-green-900',
    'border-green-500',
    'border-green-200',

    // Sunset Theme
    'bg-orange-500',
    'text-red-900',
    'bg-red-600',
    'bg-yellow-400',
    'border-orange-500',
    'border-red-900',
    'border-red-600',
    'border-yellow-400',

    // Ocean Theme
    'bg-blue-800',
    'text-blue-200',
    'bg-blue-600',
    'bg-cyan-500',
    'border-blue-800',
    'border-blue-200',
    'border-blue-600',
    'border-cyan-500',

    // Midnight Theme
    'bg-black',
    'text-gray-300',
    'bg-indigo-700',
    'bg-gray-800',
    'border-black',
    'border-gray-300',
    'border-indigo-700',
    'border-gray-800',

    // Pastel Theme
    'bg-pink-200',
    'text-purple-800',
    'bg-purple-400',
    'bg-yellow-300',
    'border-pink-200',
    'border-purple-800',
    'border-purple-400',
    'border-yellow-300',

    // Desert Theme
    'bg-yellow-600',
    'text-orange-800',
    'bg-orange-400',
    'bg-yellow-300',
    'border-yellow-600',
    'border-orange-800',
    'border-orange-400',
    'border-yellow-300',
  ],

  theme: {
    extend: {
		fontFamily: {
			jersey: ['var(--font-jersey)', 'serif'],
      mono: ['var(--font-courier-prime)', 'Courier Prime', 'monospace'],
		  },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
