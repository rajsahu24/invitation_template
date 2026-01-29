
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
          DEFAULT: '#D4AF37',
          light: '#F4D06F',
          dark: '#B89628',
        },
        emerald: {
          DEFAULT: '#046A38',
        },
        cream: {
          DEFAULT: '#FFF8F0',
        },
        brown: {
          DEFAULT: '#3E2723',
        }
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
