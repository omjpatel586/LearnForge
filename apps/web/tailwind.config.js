/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './views/**/*.{ts,tsx}'],
  theme: {
    screens: {
      // Desktop Wide
      min2xl: '1536px',
      max2xl: { max: '1536px' },

      // Desktop
      minXl: '1280px',
      maxXl: { max: '1280px' },

      // Laptop
      minLg: '1024px',
      maxLg: { max: '1024px' },

      // Tablet
      minMd: '900px',
      maxMd: { max: '900px' },

      // Phablet
      minSmPlus: '750px',
      maxSmPlus: { max: '750px' },

      // Mobile Wide
      minSm: '640px',
      maxSm: { max: '640px' },

      // Mobile
      minXsPlus: '520px',
      maxXsPlus: { max: '520px' },

      // Mobile Compact
      minXs: '460px',
      maxXs: { max: '460px' },

      // Small Mobile
      min2xs: '400px',
      max2xs: { max: '400px' },

      // Tiny Mobile
      min3xs: '340px',
      max3xs: { max: '340px' },
    },
    extend: {
      colors: {
        primary: {
          dark: '#111827', // Surface
          light: '#ffffff', // Surface
        },
        secondary: {
          dark: '#818cf8', // Brand
          light: '#4f46e5', // Brand
        },
        secondaryHover: {
          dark: '#a5b4fc', // Brand Hover
          light: '#4338ca', // Brand Hover
        },
        secondarySoft: {
          dark: '#25234a', // Brand Soft
          light: '#eef2ff', // Brand Soft
        },
        body: {
          dark: '#090e1a', // Background
          light: '#f8fafc', // Background
        },
        card: {
          dark: '#111827', // Surface
          light: '#ffffff', // Surface
        },
        cardAlt: {
          dark: '#182235', // Surface Hover
          light: '#f1f5f9', // Surface Hover (derived)
        },
        text: {
          dark: '#f8fafc', // Primary
          light: '#111827', // Primary
        },
        textSecondary: {
          dark: '#94a3b8', // Secondary
          light: '#64748b', // Secondary
        },
        textMuted: {
          dark: '#64748b', // Muted (derived from Secondary ramp)
          light: '#94a3b8', // Muted (derived from Secondary ramp)
        },
        hover: {
          dark: '#182235', // Surface Hover
          light: '#f1f5f9', // Surface Hover (derived)
        },
        border: {
          dark: '#263449', // Border
          light: '#e2e8f0', // Border
        },
        borderStrong: {
          dark: '#33455f', // Border Hover (derived from Border)
          light: '#cbd5e1', // Border Hover (derived from Border)
        },
        code: {
          dark: '#0d1524', // Code
          light: '#f1f5f9', // Code
        },
        success: {
          dark: '#34d399', // Success
          light: '#10b981', // Success
        },
        skeleton: {
          dark: '#182235',
          light: '#e2e8f0',
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
