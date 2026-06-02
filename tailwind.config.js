/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink:    '#14110f',
        ink2:   '#1b1815',
        ink3:   '#23201c',
        ink4:   '#2c2823',
        stone:  '#3a322c',
        stoneLt:'#4a4039',
        copper: '#b5673c',
        copperLt: '#d59873',
        copperDk: '#8f4f2d',
        cream:  '#f3ead9',
        cream2: '#e6dcc9',
        muted:  '#b3a797',
        muted2: '#8a7e70',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Outfit', 'sans-serif'],
      },
      maxWidth: { content: '1280px', prose: '680px' },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.2, 0.7, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
