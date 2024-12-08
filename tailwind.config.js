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
        drive: '#00BF63',
        grey: {
          light: '#ECECEC',
        },
        green: {
          light: '#D4EEDE',
        },
      },
    },
  },
  plugins: [],
};
