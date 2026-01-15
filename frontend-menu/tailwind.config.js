/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '480px',      // Extra small devices
      'sm': '640px',      // Small devices (landscape phones)
      'md': '768px',      // Medium devices (tablets)
      'lg': '1024px',     // Large devices (desktops)
      'xl': '1280px',     // Extra large devices
      '2xl': '1536px',    // 2X Extra large devices
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem', 
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'zoom-in': 'zoomIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
}