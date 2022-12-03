/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      '128': '32rem'
    },
  },
  plugins: [
    require("@thoughtbot/tailwindcss-aria-attributes"),
  ],
}
