/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f3f0e7',
        ink: {
          DEFAULT: '#191611',
          soft: '#615a4e'
        },
        accent: '#b5341c'
      },
      fontFamily: {
        apfel: ['"Apfel Grotezk"', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      }
    }
  },
  plugins: []
}
