
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
        dark: '#1A0A2E',
        gold: '#FFD700',
        magenta: '#FF007F',
        marigold: '#FF8C00',
        cream: '#FFF8F4',
        champagne: '#F7F3EE',
        warmwhite: '#FDFAF6',
        cream: '#FDF8F4',
        charcoal: '#2C2C2C',
        stone: '#6B6560',
        parchment: '#F2EBE0',
        'holi-pink': '#FF1493',
        'holi-yellow': '#FFD700',
        'holi-blue': '#4169E1',
        'holi-green': '#32CD32',
        'holi-orange': '#FF6B35',
        'holi-purple': '#9B59B6',
        'holi-red': '#FF4500',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        display: ['"Cinzel Decorative"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        heading: ['"Baloo 2"', 'cursive'],
        body: ['"Quicksand"', 'sans-serif'],
        display: ['"Bungee Shade"', 'cursive'],
      },
      backgroundImage: {
        'royal-gradient': 'linear-gradient(to bottom right, #2E0052, #004d4d)',
        'gold-gradient': 'linear-gradient(to right, #B8860B, #FFD700, #B8860B)',
      },
            animation: {
        'gradient-shift': 'gradientShift 15s ease infinite',
        'powder-burst': 'powderBurst 2s ease-out infinite',
        'bounce-custom': 'bounceCustom 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'splatter': 'splatter 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
            keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        powderBurst: {
          '0%': { transform: 'scale(1)', opacity: '1', filter: 'drop-shadow(0 0 0px rgba(255, 20, 147, 0))' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9', filter: 'drop-shadow(0 0 20px rgba(255, 20, 147, 0.8))' },
          '100%': { transform: 'scale(1)', opacity: '1', filter: 'drop-shadow(0 0 0px rgba(255, 20, 147, 0))' },
        },
        bounceCustom: {
          '0%, 100%': { transform: 'translateY(-5%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        splatter: {
          '0%': { transform: 'scale(0) rotate(-45deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
