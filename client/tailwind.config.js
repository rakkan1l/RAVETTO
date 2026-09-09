/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ravetto: {
          // New Warm Fashion Editorial Palette
          cream: '#FDFCF5',
          olive: '#879E57',
          'olive-dark': '#728848',
          'olive-light': '#9CB36D',
          brown: '#5C4033',
          'brown-dark': '#483126',
          'brown-light': '#745444',
          berry: '#C93A5C',
          'berry-light': '#F6EBF0',
          warmgrey: '#8C7E7E',
          'warmgrey-light': '#A59A9A',
          border: '#EADBCC',
          'border-subtle': 'rgba(92, 64, 51, 0.08)',
          card: '#FFFFFF',
          'card-warm': '#F9F8F1',

          // Preserved semantic aliases for backward compatibility
          teal: '#879E57', // Aliased to Olive for seamless CTA compatibility
          'teal-dark': '#728848',
          'teal-light': '#9CB36D',
          mint: '#879E57',
          'mint-subtle': '#F2F5EC',
          'mint-dark': '#728848',
          offwhite: '#FDFCF5',
          'offwhite-paper': '#F7F6EE',
          text: '#5C4033', // Aliased to Chocolate Brown
          muted: '#8C7E7E', // Aliased to Warm Grey
          chalk: '#483126',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
        editorial: ['"Outfit"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest: '0.2em',
        'extra-wide': '0.25em',
        editorial: '0.08em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 450ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
