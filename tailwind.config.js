/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/*.html`],
  theme: {
    extend: {},
  },
  plugins: [],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui:{
    themes : ['fantasy'],
  },
};

