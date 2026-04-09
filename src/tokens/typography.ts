/**
 * Typography tokens for Particle Design System
 * Brand: strong hierarchy, body line-height ≥1.5, weights 400/500/600/700 only.
 */

export const typography = {
  fontFamily: {
    /** Inter — loaded in `globals.css` (Google Fonts) */
    sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    /** Roboto Mono — loaded in `globals.css` (Google Fonts); pairs with Inter */
    mono: ['Roboto Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
  },

  /* Scale: xs 12 → 4xl 36px; body ≥1.5 line-height; headings tighter */
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],   // 12px
    sm: ['0.875rem', { lineHeight: '1.5rem', letterSpacing: '0.01em' }],    // 14px
    base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],            // 16px
    lg: ['1.125rem', { lineHeight: '1.5rem', letterSpacing: '-0.01em' }],   // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.015em' }], // 20px
    '2xl': ['1.5rem', { lineHeight: '1.75rem', letterSpacing: '-0.02em' }], // 24px
    '3xl': ['1.875rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.25rem', letterSpacing: '-0.03em' }],// 36px
    '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.035em' }],      // 48px display
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    /* Avoid: 300 (too light), 800/900 (except marketing display) */
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const;

/** Emit a valid CSS `font-family` string (quotes families that contain spaces). */
export function fontFamilyToCssString(families: readonly string[]): string {
  return families.map((name) => (/\s/.test(name) ? `"${name}"` : name)).join(', ')
}

export type TypographyToken = typeof typography;
