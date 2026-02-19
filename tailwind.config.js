/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    { pattern: /^animate-logo-/, variants: [] },
    { pattern: /^animate-bg-/, variants: [] },
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // ============================================
        // THEME SYSTEM - CSS Variable Based Colors
        // ============================================
        
        // Background Theme Colors
        bg: {
          primary: 'rgb(var(--color-bg-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-bg-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-bg-tertiary) / <alpha-value>)',
        },
        
        // Text Theme Colors
        text: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-text-tertiary) / <alpha-value>)',
          inverse: 'rgb(var(--color-text-inverse) / <alpha-value>)',
        },
        
        // Border Theme Colors (use border-border, border-border-hover, border-border-focus)
        border: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
          hover: 'rgb(var(--color-border-hover) / <alpha-value>)',
          focus: 'rgb(var(--color-border-focus) / <alpha-value>)',
        },
        // Skeleton / loading placeholder - theme-aware, subtle (light & dark)
        skeleton: 'rgb(var(--color-skeleton) / <alpha-value>)',
        // Alias for design system: border-default, border-focus (single border color utilities)
        default: 'rgb(var(--color-border) / <alpha-value>)',
        focus: 'rgb(var(--color-border-focus) / <alpha-value>)',

        // Brand Colors - Using CSS Variables
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
          active: 'rgb(var(--color-primary-active) / <alpha-value>)',
          light: 'rgb(var(--color-primary-light) / <alpha-value>)',
          lighter: 'rgb(var(--color-primary-lighter) / <alpha-value>)',
          // Legacy support - map to CSS variables
          50: 'rgb(var(--color-primary-lighter) / <alpha-value>)',
          100: 'rgb(var(--color-primary-light) / <alpha-value>)',
          500: 'rgb(var(--color-primary) / <alpha-value>)',
          600: 'rgb(var(--color-primary-hover) / <alpha-value>)',
          700: 'rgb(var(--color-primary-active) / <alpha-value>)',
          900: 'rgb(0 0 0 / <alpha-value>)', // Near black
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
          hover: 'rgb(var(--color-secondary-hover) / <alpha-value>)',
          active: 'rgb(var(--color-secondary-active) / <alpha-value>)',
          light: 'rgb(var(--color-secondary-light) / <alpha-value>)',
          lighter: 'rgb(var(--color-secondary-lighter) / <alpha-value>)',
          // Legacy support
          50: 'rgb(var(--color-secondary-lighter) / <alpha-value>)',
          100: 'rgb(var(--color-secondary-light) / <alpha-value>)',
          500: 'rgb(var(--color-secondary) / <alpha-value>)',
          600: 'rgb(var(--color-secondary-hover) / <alpha-value>)',
          700: 'rgb(var(--color-secondary-active) / <alpha-value>)',
          900: 'rgb(255 255 255 / <alpha-value>)', // Pure white
        },
        tertiary: {
          DEFAULT: 'rgb(var(--color-tertiary) / <alpha-value>)',
          hover: 'rgb(var(--color-tertiary-hover) / <alpha-value>)',
          active: 'rgb(var(--color-tertiary-active) / <alpha-value>)',
          light: 'rgb(var(--color-tertiary-light) / <alpha-value>)',
          lighter: 'rgb(var(--color-tertiary-lighter) / <alpha-value>)',
          // Legacy support
          50: 'rgb(var(--color-tertiary-lighter) / <alpha-value>)',
          100: 'rgb(var(--color-tertiary-light) / <alpha-value>)',
          500: 'rgb(var(--color-tertiary) / <alpha-value>)',
          600: 'rgb(var(--color-tertiary-hover) / <alpha-value>)',
          700: 'rgb(var(--color-tertiary-active) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          hover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
          active: 'rgb(var(--color-accent-active) / <alpha-value>)',
          light: 'rgb(var(--color-accent-light) / <alpha-value>)',
          lighter: 'rgb(var(--color-accent-lighter) / <alpha-value>)',
          // Legacy support
          50: 'rgb(var(--color-accent-lighter) / <alpha-value>)',
          100: 'rgb(var(--color-accent-light) / <alpha-value>)',
          500: 'rgb(var(--color-accent) / <alpha-value>)',
          600: 'rgb(var(--color-accent-hover) / <alpha-value>)',
          700: 'rgb(var(--color-accent-active) / <alpha-value>)',
        },
        black: {
          DEFAULT: 'rgb(var(--color-black) / <alpha-value>)',
        },
        white: {
          DEFAULT: 'rgb(var(--color-white) / <alpha-value>)',
        },
        
        // Neutral Colors - Theme B: Regulated Finance
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#0B1220',
        },
        
        // Semantic Colors - Using CSS Variables
        success: {
          DEFAULT: 'rgb(var(--color-success) / <alpha-value>)',
          light: 'rgb(var(--color-success-light) / <alpha-value>)',
          50: 'rgb(var(--color-success-light) / <alpha-value>)',
          100: 'rgb(var(--color-success-light) / <alpha-value>)',
          500: 'rgb(var(--color-success) / <alpha-value>)',
          600: 'rgb(22 163 74 / <alpha-value>)',
          700: 'rgb(21 128 61 / <alpha-value>)',
        },
        error: {
          DEFAULT: 'rgb(var(--color-error) / <alpha-value>)',
          light: 'rgb(var(--color-error-light) / <alpha-value>)',
          50: 'rgb(var(--color-error-light) / <alpha-value>)',
          100: 'rgb(var(--color-error-light) / <alpha-value>)',
          500: 'rgb(var(--color-error) / <alpha-value>)',
          600: 'rgb(209 67 67 / <alpha-value>)',
          700: 'rgb(184 54 54 / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'rgb(var(--color-warning) / <alpha-value>)',
          light: 'rgb(var(--color-warning-light) / <alpha-value>)',
          50: 'rgb(var(--color-warning-light) / <alpha-value>)',
          100: 'rgb(var(--color-warning-light) / <alpha-value>)',
          500: 'rgb(var(--color-warning) / <alpha-value>)',
          600: 'rgb(217 119 6 / <alpha-value>)',
          700: 'rgb(180 83 9 / <alpha-value>)',
        },
        info: {
          DEFAULT: 'rgb(var(--color-info) / <alpha-value>)',
          light: 'rgb(var(--color-info-light) / <alpha-value>)',
          50: 'rgb(var(--color-info-light) / <alpha-value>)',
          100: 'rgb(var(--color-info-light) / <alpha-value>)',
          500: 'rgb(var(--color-info) / <alpha-value>)',
          600: 'rgb(37 99 235 / <alpha-value>)',
          700: 'rgb(29 78 216 / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
        sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
        base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.015em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.035em' }],
      },
      spacing: {
        0: '0',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem',
      },
      gap: {
        0.5: '0.125rem',
        1.5: '0.375rem',
        2.5: '0.625rem',
        3.5: '0.875rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
      },
      borderRadius: {
        none: '0',
        xs: '0.125rem',
        sm: '0.25rem',
        base: '0.375rem',
        md: '0.5rem',
        lg: '0.625rem',
        xl: '0.75rem',
        '2xl': '0.875rem',
        '3xl': '1rem',
        full: '9999px',
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(0, 1fr))',
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'glow-dark': '0 0 20px rgba(0, 102, 204, 0.3)',
        'glow-primary': '0 0 15px rgba(0, 102, 204, 0.2)',
        'glow-primary-lg': '0 0 30px rgba(0, 102, 204, 0.3)',
      },
      backgroundImage: {
        'triangle-pattern': 'linear-gradient(45deg, transparent 25%, rgba(0, 102, 204, 0.05) 25%), linear-gradient(-45deg, transparent 25%, rgba(0, 102, 204, 0.05) 25%), linear-gradient(45deg, rgba(0, 102, 204, 0.05) 75%, transparent 75%), linear-gradient(-45deg, rgba(0, 102, 204, 0.05) 75%, transparent 75%)',
        'triangle-pattern-dark': 'linear-gradient(45deg, transparent 25%, rgba(102, 178, 255, 0.1) 25%), linear-gradient(-45deg, transparent 25%, rgba(102, 178, 255, 0.1) 25%), linear-gradient(45deg, rgba(102, 178, 255, 0.1) 75%, transparent 75%), linear-gradient(-45deg, rgba(102, 178, 255, 0.1) 75%, transparent 75%)',
      },
      backgroundSize: {
        'triangle': '20px 20px',
      },
      backgroundPosition: {
        'triangle': '0 0, 0 10px, 10px -10px, -10px 0px',
      },
      ringOffsetColor: {
        DEFAULT: 'rgb(var(--color-bg-primary))',
        secondary: 'rgb(var(--color-bg-secondary))',
      },
      keyframes: {
        'popover-in-bottom': {
          '0%': { opacity: '0', transform: 'translateY(-8px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'popover-in-top': {
          '0%': { opacity: '0', transform: 'translateY(8px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'popover-in-left': {
          '0%': { opacity: '0', transform: 'translateX(8px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        'popover-in-right': {
          '0%': { opacity: '0', transform: 'translateX(-8px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        'sheet-in': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'sheet-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(100%)' },
        },
        wave: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        // Branded logo: sides (apart = outward) in first half, then one full spin in second half
        // Apart = each triangle moves outward (left one left, right one right)
        'spinner-logo-left': {
          '0%, 50%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(24%)' },
        },
        'spinner-logo-right': {
          '0%, 50%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-24%)' },
        },
        'spinner-branded-spin': {
          '0%, 50%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spinner-default': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        // Animated logos collection (Brand section)
        'logo-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'logo-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6%)' },
        },
        'logo-breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
        },
        'logo-reveal': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'logo-reveal-top': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'logo-reveal-bottom': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'logo-spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'logo-expand-left': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(20%)' },
        },
        'logo-expand-right': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-20%)' },
        },
        'logo-color-fade': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
        // Bounce / stumble / from-outside (enterprise, video intro)
        'logo-bounce': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '30%': { transform: 'translateY(-12%) scale(1.05)' },
          '50%': { transform: 'translateY(4%) scale(0.98)' },
          '70%': { transform: 'translateY(-4%) scale(1.02)' },
        },
        'logo-stumble': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-8%) rotate(-1.5deg)' },
          '50%': { transform: 'translateY(4%) rotate(1deg)' },
          '75%': { transform: 'translateY(-3%) rotate(-0.5deg)' },
        },
        'logo-fade-in-outside': {
          '0%': { opacity: '0', transform: 'scale(0.75) translateY(10%)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'logo-fade-in-outside-top': {
          '0%': { opacity: '0', transform: 'scale(0.8) translateY(-15%)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'logo-fade-in-outside-bottom': {
          '0%': { opacity: '0', transform: 'scale(0.8) translateY(15%)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'logo-scale-pop': {
          '0%': { opacity: '0', transform: 'scale(0.4)' },
          '70%': { transform: 'scale(1.08)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'logo-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'logo-slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'logo-hold-fade-out': {
          '0%, 70%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        // Background-only (logo static)
        'bg-shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'bg-pulse-subtle': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        'bg-geometric-rotate': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '100%': { transform: 'rotate(360deg) scale(1.1)' },
        },
        'bg-dots-pulse': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.05)' },
        },
      },
      animation: {
        'popover-bottom': 'popover-in-bottom 0.2s ease-out',
        'popover-top': 'popover-in-top 0.2s ease-out',
        'popover-left': 'popover-in-left 0.2s ease-out',
        'popover-right': 'popover-in-right 0.2s ease-out',
        'sheet-in': 'sheet-in 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
        'sheet-out': 'sheet-out 0.25s cubic-bezier(0.32, 0.72, 0, 1)',
        wave: 'wave 1.6s ease-in-out infinite',
        'spinner-logo-left': 'spinner-logo-left 3.2s ease-in-out infinite',
        'spinner-logo-right': 'spinner-logo-right 3.2s ease-in-out infinite',
        'spinner-branded-spin': 'spinner-branded-spin 3.2s linear infinite',
        'spinner-default': 'spinner-default 1.75s linear infinite',
        'logo-pulse': 'logo-pulse 2.2s ease-in-out infinite',
        'logo-float': 'logo-float 3s ease-in-out infinite',
        'logo-breathe': 'logo-breathe 2.5s ease-in-out infinite',
        'logo-reveal': 'logo-reveal 0.8s ease-out forwards',
        'logo-reveal-top': 'logo-reveal-top 0.5s ease-out forwards',
        'logo-reveal-bottom': 'logo-reveal-bottom 0.5s 0.15s ease-out forwards',
        'logo-spin-slow': 'logo-spin-slow 4s linear',
        'logo-expand-left': 'logo-expand-left 2.4s ease-in-out infinite',
        'logo-expand-right': 'logo-expand-right 2.4s ease-in-out infinite',
        'logo-color-fade': 'logo-color-fade 2.5s ease-in-out infinite',
        'logo-bounce': 'logo-bounce 1.8s ease-in-out infinite',
        'logo-stumble': 'logo-stumble 2s ease-in-out infinite',
        'logo-fade-in-outside': 'logo-fade-in-outside 0.9s ease-out forwards',
        'logo-fade-in-outside-top': 'logo-fade-in-outside-top 0.6s ease-out forwards',
        'logo-fade-in-outside-bottom': 'logo-fade-in-outside-bottom 0.6s 0.12s ease-out forwards',
        'logo-scale-pop': 'logo-scale-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'logo-scale-pop-bottom': 'logo-scale-pop 0.6s 0.1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'logo-slide-up': 'logo-slide-up 0.7s ease-out forwards',
        'logo-slide-down': 'logo-slide-down 0.7s ease-out forwards',
        'logo-hold-fade-out': 'logo-hold-fade-out 2.5s ease-in-out forwards',
        'bg-shimmer': 'bg-shimmer 4s linear infinite',
        'bg-pulse-subtle': 'bg-pulse-subtle 3s ease-in-out infinite',
        'bg-geometric-rotate': 'bg-geometric-rotate 20s linear infinite',
        'bg-dots-pulse': 'bg-dots-pulse 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
