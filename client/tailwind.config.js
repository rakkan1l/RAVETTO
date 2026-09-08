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
          teal: '#0D4F4A',
          'teal-dark': '#083834',
          'teal-light': '#14645E',
          mint: '#B8E0D2',
          'mint-subtle': '#EAF6F2',
          'mint-dark': '#8BC9B6',
          offwhite: '#F5F4EF',
          'offwhite-paper': '#EFECE4',
          text: '#172B2A',
          muted: '#617371',
          border: '#E2DFD6',
          'border-light': '#EDEAE3',
          chalk: '#1A2120',
        }
      },
      fontFamily: {
        sans: ['"Figtree"', '"Red Hat Display"', '"Poppins"', 'system-ui', '-apple-system', 'sans-serif'],
        figtree: ['"Figtree"', 'sans-serif'],
        redhat: ['"Red Hat Display"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
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
