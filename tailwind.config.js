/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brown: {
          10: '#F9F6F2',
          20: '#F4EDE4',
          30: '#EEE4D7',
          40: '#E9DBCA',
          50: '#CDAD87',
          100: '#C7A479',
          200: '#C29B6C',
          300: '#BC925F',
          400: '#B68951',
          500: '#ae8048',
          600: '#A07643',
          700: '#946D3E',
          800: '#886439',
          900: '#7B5B34'
        },
        blue: {
          500: '#4875AD'
        },
        main: {
          400: '#24273b',
          500: '#151728'
        }
      }
    }
  },
  plugins: []
}
