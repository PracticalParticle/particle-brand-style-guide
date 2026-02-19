/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
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
        
        // Border Theme Colors
        border: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
          hover: 'rgb(var(--color-border-hover) / <alpha-value>)',
          focus: 'rgb(var(--color-border-focus) / <alpha-value>)',
        },
        
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
    },
  },
  plugins: [],
}
