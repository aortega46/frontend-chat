/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'gray-0': '#3C393F',
        'gray-1': '#252329',
        'gray-2': '#120F13',
        'gray-3': '#0B090C',
        'blue-0': '#2F80ED',
      },
    },
  },
  plugins: [],
}
