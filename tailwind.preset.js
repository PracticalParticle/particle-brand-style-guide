/** Tailwind preset for @particle-crypto/style-guide - theme only, no content/plugins */
/** @type {import('tailwindcss').Config} */
export default {
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
        
        // Background Theme Colors (clean: canvas / surface / surface-muted / elevated)
        bg: {
          canvas: 'rgb(var(--color-bg-canvas) / <alpha-value>)',
          surface: 'rgb(var(--color-bg-surface) / <alpha-value>)',
          'surface-muted': 'rgb(var(--color-bg-surface-muted) / <alpha-value>)',
          elevated: 'rgb(var(--color-bg-elevated) / <alpha-value>)',
          // Legacy (same values)
          primary: 'rgb(var(--color-bg-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-bg-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-bg-tertiary) / <alpha-value>)',
        },
        
        // Text Theme Colors
        text: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-text-tertiary) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
          inverse: 'rgb(var(--color-text-inverse) / <alpha-value>)',
        },
        
        // Border (clean: default / subtle / strong / focus / table). "border" alias for border-border.
        border: {
          DEFAULT: 'rgb(var(--color-border-default) / <alpha-value>)',
          default: 'rgb(var(--color-border-default) / <alpha-value>)',
          border: 'rgb(var(--color-border-default) / <alpha-value>)',
          subtle: 'rgb(var(--color-border-subtle) / <alpha-value>)',
          strong: 'rgb(var(--color-border-strong) / <alpha-value>)',
          table: 'rgb(var(--color-border-table) / <alpha-value>)',
          focus: 'rgb(var(--color-border-focus) / <alpha-value>)',
          hover: 'rgb(var(--color-border-hover) / <alpha-value>)',
        },
        // Skeleton / loading placeholder - theme-aware
        skeleton: 'rgb(var(--color-skeleton) / <alpha-value>)',

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
        /* Brand (monochrome): primary = black/white block; no blue */
        brand: {
          primary: 'rgb(var(--color-brand-primary) / <alpha-value>)',
          'primary-hover': 'rgb(var(--color-brand-primary-hover) / <alpha-value>)',
          'primary-active': 'rgb(var(--color-brand-primary-active) / <alpha-value>)',
          inverse: 'rgb(var(--color-brand-inverse) / <alpha-value>)',
        },
        /* Primary button: uses brand (black light / white dark) */
        btn: {
          primary: 'rgb(var(--color-btn-primary) / <alpha-value>)',
          'primary-hover': 'rgb(var(--color-btn-primary-hover) / <alpha-value>)',
          'primary-active': 'rgb(var(--color-btn-primary-active) / <alpha-value>)',
        },
        /* Alias for compatibility: tertiary = primary button in monochrome */
        tertiary: {
          DEFAULT: 'rgb(var(--color-tertiary) / <alpha-value>)',
          hover: 'rgb(var(--color-tertiary-hover) / <alpha-value>)',
          active: 'rgb(var(--color-tertiary-active) / <alpha-value>)',
          'on-dark': 'rgb(var(--color-tertiary-on-dark) / <alpha-value>)',
          light: 'rgb(var(--color-tertiary-light) / <alpha-value>)',
          lighter: 'rgb(var(--color-tertiary-lighter) / <alpha-value>)',
        },
        black: {
          DEFAULT: 'rgb(var(--color-black) / <alpha-value>)',
        },
        white: {
          DEFAULT: 'rgb(var(--color-white) / <alpha-value>)',
        },
        
        // Backdrop for modals and overlays
        backdrop: {
          DEFAULT: 'rgb(var(--color-backdrop) / var(--color-backdrop-opacity-light))',
          dark: 'rgb(var(--color-backdrop) / var(--color-backdrop-opacity-dark))',
        },
        
        /* Neutral scale — monochrome palette */
        neutral: {
          0:   '#FFFFFF',
          50:  '#F5F5F7',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#050509',
        },

        /* Semantic (neutral in monochrome — use with icon + text) */
        success: {
          DEFAULT: 'rgb(var(--color-success) / <alpha-value>)',
          light: 'rgb(var(--color-success-light) / <alpha-value>)',
          foreground: 'rgb(var(--color-text-inverse) / <alpha-value>)',
        },
        error: {
          DEFAULT: 'rgb(var(--color-error) / <alpha-value>)',
          light: 'rgb(var(--color-error-light) / <alpha-value>)',
        },
        /* Alias for destructive actions (same as error; foreground for text on destructive bg) */
        destructive: {
          DEFAULT: 'rgb(var(--color-error) / <alpha-value>)',
          foreground: 'rgb(var(--color-text-inverse) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'rgb(var(--color-warning) / <alpha-value>)',
          light: 'rgb(var(--color-warning-light) / <alpha-value>)',
        },
        info: {
          DEFAULT: 'rgb(var(--color-info) / <alpha-value>)',
          light: 'rgb(var(--color-info-light) / <alpha-value>)',
        },

        /* Alias for compatibility: muted = surface-muted (cards, bars, subtle bg) */
        muted: {
          DEFAULT: 'rgb(var(--color-bg-surface-muted) / <alpha-value>)',
          foreground: 'rgb(var(--color-text-muted) / <alpha-value>)',
        },
        /* Alias for compatibility: background = canvas (page/surface behind cards) */
        background: 'rgb(var(--color-bg-canvas) / <alpha-value>)',

        // ── Highlight / emphasis ─────────────────────────────────────
        highlight: {
          DEFAULT: 'rgb(var(--color-highlight) / <alpha-value>)',
          text:    'rgb(var(--color-highlight-text) / <alpha-value>)',
        },

        // ── Data visualization (6-color, color-blind safe) ───────────
        data: {
          1: 'rgb(var(--color-data-1) / <alpha-value>)',
          2: 'rgb(var(--color-data-2) / <alpha-value>)',
          3: 'rgb(var(--color-data-3) / <alpha-value>)',
          4: 'rgb(var(--color-data-4) / <alpha-value>)',
          5: 'rgb(var(--color-data-5) / <alpha-value>)',
          6: 'rgb(var(--color-data-6) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Roboto Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      /* Type scale: xs 12 → 4xl 36px; body line-height ≥1.5; headings tighter */
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],   /* 12px */
        sm: ['0.875rem', { lineHeight: '1.5rem', letterSpacing: '0.01em' }],     /* 14px, body ≥1.5 */
        base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],            /* 16px */
        lg: ['1.125rem', { lineHeight: '1.5rem', letterSpacing: '-0.01em' }],   /* 18px */
        xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.015em' }],  /* 20px */
        '2xl': ['1.5rem', { lineHeight: '1.75rem', letterSpacing: '-0.02em' }],  /* 24px, heading tight */
        '3xl': ['1.875rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],  /* 30px */
        '4xl': ['2.25rem', { lineHeight: '2.25rem', letterSpacing: '-0.03em' }], /* 36px */
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.035em' }],       /* 48px display */
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
        structural: 'var(--radius-structural, 2px)',  /* nav, sidebar, table headers — sharp, system-level */
        inset:      'var(--radius-inset, 4px)',
        control:    'var(--radius-control, 6px)',
        card:       'var(--radius-base, 10px)',
        overlay:    'var(--radius-overlay, 12px)',    /* modals, drawers — floating */
        pill:       'var(--radius-pill, 9999px)',
        none:  '0',
        xs:    '0.125rem',
        sm:    '0.25rem',
        base:  '0.375rem',
        md:    '0.5rem',
        lg:    '0.625rem',
        xl:    '0.75rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
        full:  '9999px',
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
      /* Floating UI stack: modal shell + toasts at `modal`; popovers/menus/tooltips above modals at `overlay`. */
      zIndex: {
        modal: 100,
        overlay: 110,
      },
      boxShadow: {
        subtle:   '0 1px 2px rgb(var(--color-shadow) / 0.04)',
        elevated: '0 8px 30px rgb(var(--color-shadow) / 0.08), 0 2px 8px rgb(var(--color-shadow) / 0.04)',
        'elevated-strong': '0 12px 40px rgb(var(--color-shadow) / 0.12), 0 4px 12px rgb(var(--color-shadow) / 0.06)',
        sm:    '0 1px 2px 0 rgb(var(--color-shadow) / 0.06)',
        base:  '0 1px 3px 0 rgb(var(--color-shadow) / 0.1), 0 1px 2px -1px rgb(var(--color-shadow) / 0.06)',
        md:    '0 4px 6px -1px rgb(var(--color-shadow) / 0.08), 0 2px 4px -2px rgb(var(--color-shadow) / 0.04)',
        lg:    '0 10px 24px -4px rgb(var(--color-shadow) / 0.12), 0 4px 8px -4px rgb(var(--color-shadow) / 0.06)',
        xl:    '0 20px 40px -8px rgb(var(--color-shadow) / 0.16), 0 8px 16px -4px rgb(var(--color-shadow) / 0.08)',
        '2xl': '0 32px 64px -12px rgb(var(--color-shadow) / 0.28)',
        inner: 'inset 0 2px 4px 0 rgb(var(--color-shadow) / 0.06)',
        'glow-dark': '0 0 0 1px rgb(var(--color-border)), 0 4px 24px rgb(var(--color-text-primary) / 0.08)',
        'elevated-dark': '0 8px 30px rgb(var(--color-shadow) / 0.25), 0 2px 8px rgb(var(--color-shadow) / 0.15)',
        /* Modal: clearly floating — deep shadow in light, rim+ambient in dark */
        'modal': '0 0 0 1px rgb(var(--color-shadow) / 0.06), 0 4px 16px rgb(var(--color-shadow) / 0.10), 0 24px 64px rgb(var(--color-shadow) / 0.16)',
        'modal-dark': '0 0 0 1px rgb(255 255 255 / 0.07), inset 0 1px 0 0 rgb(255 255 255 / 0.07), 0 4px 48px rgb(0 0 0 / 0.65)',
        /* Card featured: stronger presence for highlighted cards */
        'card-featured': '0 4px 16px rgb(var(--color-shadow) / 0.10), 0 1px 4px rgb(var(--color-shadow) / 0.06)',
      },
      /* Glass blur and saturate: used via CSS vars in .surface-glass / .card-glass */
      backdropBlur: {
        glass: 'var(--glass-blur, 18px)',
      },
      backdropSaturate: {
        glass: 'var(--glass-saturate, 1.6)',
      },
      backgroundImage: {
        'triangle-pattern': 'linear-gradient(45deg, transparent 25%, rgb(var(--color-text-primary) / var(--triangle-opacity, 0.03)) 25%), linear-gradient(-45deg, transparent 25%, rgb(var(--color-text-primary) / var(--triangle-opacity, 0.03)) 25%), linear-gradient(45deg, rgb(var(--color-text-primary) / var(--triangle-opacity, 0.03)) 75%, transparent 75%), linear-gradient(-45deg, rgb(var(--color-text-primary) / var(--triangle-opacity, 0.03)) 75%, transparent 75%)',
        'gradient-brand': 'linear-gradient(180deg, rgb(var(--color-border) / 0.15) 0%, transparent 60%)',
        'gradient-hero':  'linear-gradient(180deg, rgb(var(--color-border) / 0.12) 0%, transparent 60%)',
        'gradient-canvas': 'linear-gradient(180deg, rgb(var(--color-bg-canvas)) 0%, rgb(var(--color-bg-surface-muted) / 0.05) 50%, rgb(var(--color-bg-canvas)) 100%)',
      },
      /* Layer opacities: use as bg-bg-surface/95 or with opacity-*; vars in globals */
      opacity: {
        'layer-overlay': 'var(--layer-surface-overlay)',
        'layer-soft': 'var(--layer-surface-soft)',
        'layer-muted': 'var(--layer-muted-overlay)',
      },
      transitionTimingFunction: {
        // Phase 7: modern SaaS standard
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        'brand':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'enter':  'cubic-bezier(0, 0, 0.2, 1)',
        'exit':   'cubic-bezier(0.4, 0, 1, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        'instant': '0ms',
        'fast':    '120ms',   /* Phase 7 */
        'normal':  '180ms',
        'brand':   '180ms',
        'slow':    '280ms',
        'slower':  '500ms',
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
        background: 'rgb(var(--color-bg-canvas))',
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
        'drawer-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'drawer-out-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'drawer-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'drawer-out-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
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
        // Progress bar shimmer
        'progress-shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
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
        'drawer-in-left': 'drawer-in-left 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
        'drawer-out-left': 'drawer-out-left 0.25s cubic-bezier(0.32, 0.72, 0, 1)',
        'drawer-in-right': 'drawer-in-right 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
        'drawer-out-right': 'drawer-out-right 0.25s cubic-bezier(0.32, 0.72, 0, 1)',
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
        'progress-shimmer': 'progress-shimmer 1.8s ease-in-out infinite',
        'bg-shimmer': 'bg-shimmer 4s linear infinite',
        'bg-pulse-subtle': 'bg-pulse-subtle 3s ease-in-out infinite',
        'bg-geometric-rotate': 'bg-geometric-rotate 20s linear infinite',
        'bg-dots-pulse': 'bg-dots-pulse 2.5s ease-in-out infinite',
      },
    },
  },
}