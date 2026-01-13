/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          900: '#0c0c0e',
          800: '#131316',
          700: '#1a1a1f',
          600: '#232329',
          500: '#2d2d35',
          400: '#3d3d47',
        },
        text: {
          primary: '#f0f0f3',
          secondary: '#a0a0ab',
          muted: '#6b6b76',
        },
        accent: {
          DEFAULT: '#9d7bb0',
          light: '#b794c6',
          dark: '#7a5f8a',
          glow: 'rgba(157, 123, 176, 0.4)',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'typing': 'typing 3s steps(40) forwards',
        'blink': 'blink 1s step-end infinite',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'glitch-overlay': 'glitchOverlay 0.15s ease-in-out infinite',
        'scanline': 'scanline 0.1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(157, 123, 176, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(157, 123, 176, 0.4)' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)', filter: 'hue-rotate(0deg)' },
          '20%': { transform: 'translate(-4px, 4px)', filter: 'hue-rotate(90deg)' },
          '40%': { transform: 'translate(-4px, -4px)', filter: 'hue-rotate(180deg)' },
          '60%': { transform: 'translate(4px, 4px)', filter: 'hue-rotate(270deg)' },
          '80%': { transform: 'translate(4px, -4px)', filter: 'hue-rotate(360deg)' },
        },
        glitchOverlay: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '50%': { opacity: '0.8' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(157, 123, 176, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(157, 123, 176, 0.03) 1px, transparent 1px)',
        'dot-pattern': 'radial-gradient(rgba(157, 123, 176, 0.15) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid': '50px 50px',
        'dot': '20px 20px',
      },
    },
  },
  plugins: [],
}
