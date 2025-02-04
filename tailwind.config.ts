import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Light Theme
    'bg-white', 'text-gray-900', 'bg-blue-600', 'bg-gray-200', 'border-gray-900',
    'bg-gray-900', 'text-gray-100', 'bg-blue-500', 'bg-gray-700', 'border-gray-100',
    'bg-green-600', 'text-green-900', 'bg-green-600', 'bg-green-200', 'border-green-900',
    'bg-orange-500', 'text-red-900', 'bg-red-600', 'bg-yellow-400', 'border-red-900',
    'bg-blue-800', 'text-blue-200', 'bg-blue-600', 'bg-cyan-500', 'border-blue-200',
    'bg-black', 'text-gray-300', 'bg-indigo-700', 'bg-gray-800', 'border-gray-300',
    'bg-pink-200', 'text-purple-800', 'bg-purple-400', 'bg-yellow-300', 'border-purple-800',
    'bg-yellow-600', 'text-orange-800', 'bg-orange-400', 'bg-yellow-300', 'border-orange-800',
    'bg-purple-100', 'text-purple-900', 'bg-purple-500', 'bg-purple-200', 'border-purple-700',
    'bg-orange-300', 'text-red-700', 'bg-red-500', 'bg-orange-500', 'border-red-700',
    'bg-green-500', 'text-green-100', 'bg-green-700', 'bg-green-300', 'border-green-900',
    'bg-yellow-200', 'text-pink-700', 'bg-pink-500', 'bg-orange-300', 'border-pink-700',
    'bg-indigo-800', 'text-pink-200', 'bg-purple-600', 'bg-indigo-600', 'border-pink-300',
    'bg-pink-400', 'text-red-900', 'bg-red-600', 'bg-pink-300', 'border-red-700',
    'bg-blue-300', 'text-gray-800', 'bg-blue-500', 'bg-cyan-400', 'border-gray-700',
    'bg-brown-500', 'text-yellow-200', 'bg-brown-700', 'bg-yellow-400', 'border-brown-800',
    'bg-orange-400', 'text-red-900', 'bg-orange-500', 'bg-yellow-300', 'border-orange-700',
    'bg-black', 'text-neon-green', 'bg-neon-pink', 'bg-neon-yellow', 'border-neon-blue',
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
