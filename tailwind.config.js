/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'shika-pink':  '#E81B86',
        'shika-lime':  '#C6F000',
        'shika-red':   '#D81E2C',
        'shika-night': '#0A0A0C',
        'shika-amber': '#FF7A2A',
        'shika-cream': '#ECE3CF',
      },
      fontFamily: {
        anton:    ['Anton', 'sans-serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        spectral: ['Spectral', 'Georgia', 'serif'],
        oswald:   ['Oswald', 'sans-serif'],
        caveat:   ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
};
