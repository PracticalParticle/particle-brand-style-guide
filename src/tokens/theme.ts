/**
 * Theme System - CSS Variable Based
 * Professional theme setup using CSS variables for dynamic theming
 * 
 * This system provides:
 * - Background colors (primary, secondary, tertiary)
 * - Text colors (primary, secondary, tertiary, inverse)
 * - Border colors (default, hover, focus)
 * - Brand colors (primary, secondary)
 * - Semantic colors (success, warning, error, info)
 * 
 * All colors are defined as CSS variables in globals.css
 * and can be accessed via Tailwind classes or CSS variables directly
 */

export const theme = {
  /**
   * Background Colors
   * Usage: Use bg-primary, bg-secondary, bg-tertiary Tailwind classes
   */
  background: {
    primary: 'var(--color-bg-primary)',
    secondary: 'var(--color-bg-secondary)',
    tertiary: 'var(--color-bg-tertiary)',
  },

  /**
   * Text Colors
   * Usage: Use text-primary, text-secondary, text-tertiary, text-inverse Tailwind classes
   */
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    tertiary: 'var(--color-text-tertiary)',
    inverse: 'var(--color-text-inverse)',
  },

  /**
   * Border Colors
   * Usage: Use border, border-hover, border-focus Tailwind classes
   */
  border: {
    default: 'var(--color-border)',
    hover: 'var(--color-border-hover)',
    focus: 'var(--color-border-focus)',
  },

  /**
   * Brand Colors
   * Usage: Use primary, primary-hover, primary-active Tailwind classes
   */
  brand: {
    primary: 'var(--color-primary)',
    primaryHover: 'var(--color-primary-hover)',
    primaryActive: 'var(--color-primary-active)',
    primaryLight: 'var(--color-primary-light)',
    primaryLighter: 'var(--color-primary-lighter)',
    secondary: 'var(--color-secondary)',
    secondaryHover: 'var(--color-secondary-hover)',
    secondaryActive: 'var(--color-secondary-active)',
    secondaryLight: 'var(--color-secondary-light)',
    secondaryLighter: 'var(--color-secondary-lighter)',
    tertiary: 'var(--color-tertiary)',
    tertiaryHover: 'var(--color-tertiary-hover)',
    tertiaryActive: 'var(--color-tertiary-active)',
    tertiaryLight: 'var(--color-tertiary-light)',
    tertiaryLighter: 'var(--color-tertiary-lighter)',
    accent: 'var(--color-accent)',
    accentHover: 'var(--color-accent-hover)',
    accentActive: 'var(--color-accent-active)',
    accentLight: 'var(--color-accent-light)',
    accentLighter: 'var(--color-accent-lighter)',
    black: 'var(--color-black)',
    white: 'var(--color-white)',
  },

  /**
   * Semantic Colors
   * Usage: Use success, warning, error, info Tailwind classes
   */
  semantic: {
    success: 'var(--color-success)',
    successLight: 'var(--color-success-light)',
    warning: 'var(--color-warning)',
    warningLight: 'var(--color-warning-light)',
    error: 'var(--color-error)',
    errorLight: 'var(--color-error-light)',
    info: 'var(--color-info)',
    infoLight: 'var(--color-info-light)',
  },
} as const;

export type Theme = typeof theme;

/**
 * Helper function to get CSS variable value
 * Usage: const primaryColor = getThemeVar('--color-primary')
 */
export function getThemeVar(variable: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

/**
 * Helper function to set CSS variable value
 * Usage: setThemeVar('--color-primary', '0 102 204')
 */
export function setThemeVar(variable: string, value: string): void {
  if (typeof document === 'undefined') return;
  document.documentElement.style.setProperty(variable, value);
}

/**
 * Get RGB color from CSS variable
 * Usage: const rgb = getThemeColor('--color-primary') // returns 'rgb(0, 102, 204)'
 */
export function getThemeColor(variable: string): string {
  const value = getThemeVar(variable);
  if (!value) return '';
  return `rgb(${value})`;
}
