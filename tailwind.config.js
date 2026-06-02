/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink:    '#181614',
        ink2:   '#211d1a',
        ink3:   '#2a2521',
        stone:  '#3a322c',
        copper: '#b5673c',
        copperLt: '#d59873',
        cream:  '#f3ead9',
        cream2: '#e6dcc9',
        muted:  '#b3a797',
        muted2: '#8a7e70',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Outfit', 'sans-serif'],
      },
      maxWidth: { content: '1240px' },
    },
  },
  plugins: [],
}
