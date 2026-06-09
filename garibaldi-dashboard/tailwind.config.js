/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Mission-control dark surfaces
        base:   '#0a0c0e', // app background
        panel:  '#121619', // card surface
        panel2: '#1a2026', // raised surface
        line:   '#262d33', // hairline borders
        line2:  '#333c44',

        // Text
        hi:     '#f2f5f4', // primary text
        mid:    '#aab4bb', // secondary text
        lo:     '#6b757c', // tertiary / labels

        // Risk band signal colors (high contrast, outdoor-readable)
        go:     '#37b56b', // green  — low risk
        caution:'#e6b13e', // yellow — moderate
        warn:   '#e07e2c', // orange — elevated
        stop:   '#e2473d', // red    — no-go

        // Accent for data
        ice:    '#5bb6d6', // cold / freezing data
        sky:    '#6f93b8',
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { app: '560px' },
    },
  },
  plugins: [],
}
