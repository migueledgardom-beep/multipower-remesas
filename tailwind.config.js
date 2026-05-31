/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black: '#0a0a0a',
        deep: '#111111',
        card: '#181818',
        border: '#2a2a2a',
        gold: '#F5C842',
        amber: '#E8A020',
        fire: '#FF6B1A',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
