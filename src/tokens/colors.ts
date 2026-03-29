/**
 * Color tokens for Particle Design System
 * Pure monochrome: black, white, off-neutrals only.
 * No chromatic accents. Hierarchy via contrast, elevation, typography.
 *
 * See docs/DESIGN_MANIFESTO.md.
 */

/** Light mode neutrals (clean enterprise palette) */
export const lightNeutrals = {
  /** App background — canvas */
  bgBase: '#F6F7F9',
  /** Cards, panels — surface */
  surface: '#FFFFFF',
  /** Hovers, subtle — surface-muted */
  depth1: '#F1F3F5',
  /** Borders */
  depth2: '#E5E7EB',
  textPrimary: '#0A0A0A',
  textMuted: '#525252', /* WCAG AA 4.5:1 on canvas/surface-muted */
  border: '#E5E7EB',
}

/** Dark mode neutrals */
export const darkNeutrals = {
  bgBase: '#0B0C0E',
  bgBaseAlt: '#14161A',
  surface: '#14161A',
  depth1: '#1B1E24',
  depth2: '#2A2F36',
  depth3: '#3A414A',
  textPrimary: '#FAFAFA',
  textMuted: '#6B7280',
  border: '#2A2F36',
}

/** Semantic theme: same tokens, remapped per mode (for CSS vars) */
export const lightTheme = {
  background: {
    primary: lightNeutrals.bgBase,
    secondary: lightNeutrals.surface,
    tertiary: lightNeutrals.depth1,
  },
  text: {
    primary: lightNeutrals.textPrimary,
    secondary: lightNeutrals.textMuted,
    muted: lightNeutrals.textMuted,
    inverse: '#FFFFFF',
  },
  border: {
    default: lightNeutrals.border,
    hover: '#D1D5DB',
    strong: '#9CA3AF',
  },
  /** Primary button: black block in light mode */
  buttonPrimary: {
    bg: '#0A0A0A',
    text: '#FFFFFF',
    hoverBg: '#141414',
    activeBg: '#1E1E1E',
  },
} as const

/**
 * Surfaces and accents for print/PDF export only (always light).
 * Centralizes hex values so {@link DocumentPreviewPage} print CSS stays aligned with neutrals.
 * Link blue is an intentional exception for readable hyperlinks in PDFs (body UI stays monochrome).
 */
export const lightPrintPalette = {
  paper: lightNeutrals.surface,
  /** Standard PDF/web link color */
  link: '#2563EB',
  codeBlockBg: '#F3F4F6',
  codeBlockBorder: lightNeutrals.border,
  cardBackground: '#FAFBFC',
  cardBorder: lightNeutrals.border,
  calloutBackground: '#F0F1F3',
  tableBorder: lightTheme.border.hover,
  tableHeaderBg: '#EEF0F3',
  tableRowStripe: '#FAFAFA',
  /** Inline code chip on callout background */
  inlineCodeOnCalloutBg: 'rgba(10, 10, 10, 0.06)',
} as const

export const darkTheme = {
  background: {
    primary: darkNeutrals.bgBase,
    secondary: darkNeutrals.surface,
    tertiary: darkNeutrals.depth1,
  },
  text: {
    primary: darkNeutrals.textPrimary,
    secondary: darkNeutrals.textMuted,
    muted: darkNeutrals.textMuted,
    inverse: '#050509',
  },
  border: {
    default: darkNeutrals.border,
    hover: darkNeutrals.depth3,
    strong: '#4B5563',
  },
  /** Primary button: white block in dark mode */
  buttonPrimary: {
    bg: '#FAFAFA',
    text: '#0A0A0A',
    hoverBg: '#F3F4F6',
    activeBg: '#E5E7EB',
  },
} as const

/** Semantic: success, error, warning, info (restrained, enterprise) */
export const semantic = {
  success: { main: '#166534', light: '#DCFCE7', darkMain: '#34D399', darkLight: '#064E3B' },
  error: { main: '#B91C1C', light: '#FEE2E2', darkMain: '#F87171', darkLight: '#4A0C0C' },
  warning: { main: '#B45309', light: '#FEF3C7', darkMain: '#FBBF24', darkLight: '#4A2209' },
  info: { main: '#374151', light: '#F3F4F6', darkMain: '#9CA3AF', darkLight: '#1F2937' },
} as const

/** Focus: 2px neutral ring (no brand color) */
export const focusRing = {
  light: '0 0 0 2px rgba(0, 0, 0, 0.6)',
  dark: '0 0 0 2px rgba(255, 255, 255, 0.7)',
} as const

export type LightTheme = typeof lightTheme
export type DarkTheme = typeof darkTheme
