/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        tic: '#737373',
        drive: '#39B269',
        grey: {
          light: '#ECECEC',
        },
        green: {
          light: '#D4EEDE',
          inter: '39B269',
          dark: '#228E4D',
        },
      },
    },
  },
  plugins: [
    function ({addUtilities}) {
      const newUtilities = {
        '.elevation-1': {elevation: 1},
        '.elevation-2': {elevation: 2},
        '.elevation-3': {elevation: 3},
        '.elevation-4': {elevation: 4},
        '.elevation-5': {elevation: 5},
        '.elevation-6': {elevation: 6},
        '.elevation-8': {elevation: 8},
        '.elevation-10': {elevation: 10},
        '.elevation-12': {elevation: 12},
        '.elevation-16': {elevation: 16},
        '.elevation-24': {elevation: 24},
      };

      addUtilities(newUtilities);
    },
  ],
};
