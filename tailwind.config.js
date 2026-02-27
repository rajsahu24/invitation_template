
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        royal: {
          purple: '#4B0082',
          deepPurple: '#2E0052',
          gold: '#D4AF37',
          goldLight: '#FFD700',
          goldDark: '#B8860B',
          emerald: '#059669',
          teal: '#008080',
          ruby: '#991B1B',
          sapphire: '#2563EB',
          cream: '#FDFBF7',
        },
        maroon: {
          DEFAULT: '#8B1538',
          light: '#A61B43',
          dark: '#660F29',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8D5A3',
          dark: '#B89628',
          pale: '#F5EDD8',
        },
        emerald: {
          DEFAULT: '#046A38',
        },
        brown: {
          DEFAULT: '#3E2723',
        },
        sage: {
          DEFAULT: '#E8EDE5',
          light: '#B5C4B5',
          dark: '#C5D1BF',
          pale: '#EEF2EE',
        },
        rose: {
          DEFAULT: '#D4A0A0',
          light: '#E8C4C4',
          dark: '#B88585',
        },
        forest: {
          DEFAULT: '#3D5A3D',
          light: '#5A7A5A',
        },
        champagne: '#F7F3EE',
        warmwhite: '#FDFAF6',
        cream: '#FDF8F4',
        charcoal: '#2C2C2C',
        stone: '#6B6560',
        parchment: '#F2EBE0',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        display: ['"Cinzel Decorative"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'royal-gradient': 'linear-gradient(to bottom right, #2E0052, #004d4d)',
        'gold-gradient': 'linear-gradient(to right, #B8860B, #FFD700, #B8860B)',
      }
    },
  },
  plugins: [],
}
