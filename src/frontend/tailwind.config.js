/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        divine: {
          gold: '#D4AF37',
          cream: '#FFF8E7',
          brown: '#2C1810',
          scroll: '#8B7355',
        },
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'cinzel-decorative': ['Cinzel Decorative', 'cursive'],
        'cormorant': ['Cormorant Garamond', 'serif'],
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      minHeight: {
        'touch': '44px',
      },
      borderRadius: {
        'xl': '1rem',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 8s ease infinite',
      },
      backgroundImage: {
        'divine-pattern': "url('/images/divine-pattern.svg')",
        'greek-pattern': "url('/images/greek-pattern.svg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
