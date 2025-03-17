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
