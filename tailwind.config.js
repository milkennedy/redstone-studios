/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep charcoal — primary / dark sections / text on light
        ink:    '#111315',
        ink2:   '#171a1d',
        ink3:   '#1f2429',
        // Off-white — primary light surface
        paper:  '#F7F6F2',
        paper2: '#efece4',
        paper3: '#e6e2d8',
        // Hairlines
        line:   '#e1ddd2',
        lineDk: '#2b3035',
        // Accents — used sparingly
        forest:   '#2E5E4E',
        forestDk: '#244c3f',
        forestLt: '#3c7563',
        copper:   '#B26E3A',
        river:    '#355C7D',
        // Text
        muted:    '#5b635f',  // on light
        muted2:   '#8a918c',  // on light, lighter
        paperMut: '#b7bcb6',  // on dark
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { content: '1200px', prose: '660px' },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
