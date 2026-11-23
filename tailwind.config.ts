import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{vue,ts}', './nuxt.config.ts'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#3f7a3d',
          dark: '#2c572c',
          soft: '#e7efe1',
        },
        paper: '#ffffff',
        surface: '#f5f8f1',
        ink: '#1e261c',
        muted: '#68725f',
        line: '#dde4d5',
      },
      borderRadius: {
        card: '16px',
      },
      fontFamily: {
        display: ['var(--font-display)'],
      },
    },
  },
} satisfies Config
