import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#711224',
        'brand-beige': '#F6F2E9',
        'brand-gold': '#D4AF37',
      },
      fontFamily: {
        sans: ['Lato', 'ui-sans-serif', 'system-ui'],
        serif: ['Playfair Display', 'ui-serif', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
