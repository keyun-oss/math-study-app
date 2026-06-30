/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#4caf58',
        'primary-dark': '#388e3c',
        'sky-light': '#e3f2fd',
        'sky-mid': '#90caf9',
        cream: '#fff8e1',
        coral: '#ffab91',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
};