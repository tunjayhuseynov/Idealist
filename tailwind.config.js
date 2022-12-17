/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  mode: 'jit',
  theme: {

    extend: {
      colors: {
        primary: '#f27a1a',
        secondary: '#333f48',
        primaryHover: '#e06f18',
      },
      keyframes: {
        navbarNotification: {
          '0%, 100%': {
            transform: 'translateY(-15%) translateX(-50%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateX(-50%)',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
      animation: {
        navbarNotification: 'navbarNotification 1.5s infinite',
      },
    },
  },
  plugins: [],
}
