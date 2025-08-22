/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'milk-white': '#fefefe',
        'milk-cream': '#faf7f0',
        'milk-blue': '#e3f2fd',
        'dairy-brown': '#8d6e63',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 