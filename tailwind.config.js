/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'clio-gold': '#B7791F',
        'clio-gold-light': '#D69E2E',
        'clio-parchment': '#FDF6E3',
        'clio-column': '#E2E8F0',
        'divine-white': '#FFFBF5',
        'scroll-brown': '#8B4513',
        'wisdom-blue': '#1E3A8A',
        'divine-pattern': '#FDF6E3',
        'scroll-texture': '#FFFBF2',
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'cormorant': ['Cormorant Garamond', 'serif']
      },
      backgroundImage: {
        'marble-pattern': "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"'%3E%3Cg fill=\"%23B7791F\" fill-opacity=\"0.05\"'%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z\"'%3E%3C/path%3E%3C/g%3E%3C/svg%3E')",
        'divine-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"'%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"'%3E%3Cg fill=\"%23B7791F\" fill-opacity=\"0.05\"'%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        'scroll-texture': "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"'%3E%3Cg fill=\"%23B7791F\" fill-opacity=\"0.03\" fill-rule=\"evenodd\"'%3E%3Cpath d=\"M0 40L40 0H20L0 20M40 40V20L20 40\"'%3E%3C/path%3E%3C/g%3E%3C/svg%3E')",
        'wisdom-aura': 'radial-gradient(circle at center, rgba(183, 121, 31, 0.1), transparent 70%)',
      },
      boxShadow: {
        'scroll': '0 4px 6px -1px rgba(183, 121, 31, 0.1), 0 2px 4px -1px rgba(183, 121, 31, 0.06)',
        'divine': '0 0 30px rgba(183, 121, 31, 0.2)',
        'wisdom': '0 0 25px rgba(183, 121, 31, 0.15)',
        'golden-glow': '0 0 15px rgba(183, 121, 31, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'unfurl': 'unfurl 1.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(183, 121, 31, 0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(183, 121, 31, 0.4)' },
        },
        unfurl: {
          '0%': { transform: 'scale(0.8) rotate(-10deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
