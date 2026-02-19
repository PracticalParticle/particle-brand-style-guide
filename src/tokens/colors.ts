/**
 * Color tokens for Particle Crypto Security LTD Design System
 * Theme B — Regulated Finance (More Conservative)
 * 
 * Brand Colors:
 * 1. Primary Charcoal Black (#0A0A0A) - Dominant brand color
 * 2. Corporate Blue (#1F4ED8) - Primary actions, buttons, links
 * 3. Soft Tech Accent (#38BDF8) - Minimal highlights
 * 4. Black (#000000) - Pure black
 * 5. White (#FFFFFF) - Pure white
 * 
 * Semantic Colors:
 * - Success Green (#22C55E) - Positive feedback
 * - Error Red (#E85D5D) - Errors & destructive actions
 * - Warning Amber (#F59E0B) - Warnings
 * - Info Blue (#3B82F6) - Informational
 * 
 * See docs/COLOR_GUIDELINES.md for detailed usage instructions
 */

export const colors = {
  /**
   * Primary Brand Color - Charcoal Black
   * Usage: Primary brand color, headers, dark sections
   * Main color: primary-500 (#0A0A0A)
   * Theme B: Regulated Finance - Conservative, institutional, charcoal black
   */
  primary: {
    50: '#E5E5E5', // Very light gray
    100: '#CCCCCC', // Light gray
    200: '#999999', // Medium-light gray
    300: '#666666', // Medium gray
    400: '#333333', // Medium-dark gray
    500: '#0A0A0A', // Main brand color - Charcoal Black
    600: '#080808', // Darker charcoal
    700: '#060606', // Very dark charcoal
    800: '#040404', // Near black charcoal
    900: '#020202', // Deepest charcoal
  },

  /**
   * Secondary Accent Color - Off-White
   * Usage: Secondary actions, supporting UI elements
   * Main color: secondary-500 (#F1F5F9)
   * In dark mode: becomes navy (#0A2540)
   */
  secondary: {
    50: '#FFFFFF', // Pure white
    100: '#F8FAFC', // Very light gray
    200: '#F1F5F9', // Light gray (Theme B background)
    300: '#E2E8F0', // Medium-light gray
    400: '#CBD5E1', // Medium gray (Theme B border)
    500: '#F1F5F9', // Main background color
    600: '#E2E8F0', // Slightly darker
    700: '#CBD5E1', // Medium gray
    900: '#FFFFFF', // Pure white
  },

  /**
   * Tertiary Brand Color - Corporate Blue
   * Usage: Primary actions, buttons, links, CTAs
   * Main color: tertiary-500 (#1F4ED8)
   * Theme B: Corporate Blue for professional actions
   */
  tertiary: {
    50: '#E0E7FF', // Very light blue
    100: '#B8C9FF', // Light blue
    200: '#8FA8FF', // Lighter corporate blue
    300: '#6687FF', // Medium-light corporate blue
    400: '#3D66FF', // Medium corporate blue
    500: '#1F4ED8', // Corporate Blue - Primary actions
    600: '#1A42C0', // Darker corporate blue for hover
    700: '#1536A8', // Darker corporate blue for active
    800: '#0F2A90', // Very dark corporate blue
    900: '#0A1E78', // Deepest corporate blue
  },

  /**
   * Black - Pure Black
   * Usage: High contrast text, dark elements
   */
  black: '#000000',

  /**
   * White - Pure White
   * Usage: High contrast backgrounds, light elements
   */
  white: '#FFFFFF',

  /**
   * Neutral Colors - Structure & Hierarchy
   * Usage: Backgrounds, text, borders, dividers
   * Theme B: Regulated Finance palette
   * Light mode: Use 50-200 for backgrounds, 700-900 for text
   * Dark mode: Use 950-800 for backgrounds, 50-300 for text
   */
  neutral: {
    50: '#F8FAFC', // Very light background
    100: '#F1F5F9', // Theme B background
    200: '#E2E8F0', // Light border
    300: '#CBD5E1', // Theme B border
    400: '#94A3B8', // Medium gray for placeholders/icons
    500: '#64748B', // Medium gray
    600: '#475569', // Medium-dark gray
    700: '#334155', // Theme B secondary text
    800: '#1E293B', // Dark gray
    900: '#0F172A', // Very dark gray
    950: '#0B1220', // Theme B dark text
  },

  /**
   * Success Color - Positive Feedback
   * Usage: Success messages, completed states
   * Main color: success-500 (#22C55E)
   */
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
  },

  /**
   * Error Color - Professional & Muted
   * Usage: Errors, destructive actions, critical alerts
   * Main color: error-500 (#E85D5D) - Less aggressive, professional for SaaS
   */
  error: {
    50: '#FEF7F7',
    100: '#FEE8E8',
    500: '#E85D5D',
    600: '#D14343',
    700: '#B83636',
  },

  /**
   * Warning Color
   * Usage: Warnings, caution states, pending actions
   * Main color: warning-500 (#F59E0B)
   */
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
  },

  /**
   * Info Color
   * Usage: Informational messages, tips, neutral feedback
   * Main color: info-500 (#3B82F6)
   */
  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
  },

  /**
   * Accent Color - Soft Tech Accent
   * Usage: Minimal highlights, subtle accents
   * Theme B: Soft Tech Accent (#38BDF8) - Use sparingly
   */
  accent: {
    50: '#ECFEFF', // Very light cyan
    100: '#CFFAFE', // Light cyan
    200: '#A5F3FC', // Lighter tech accent
    300: '#67E8F9', // Medium-light tech accent
    400: '#22D3EE', // Medium tech accent
    500: '#38BDF8', // Soft Tech Accent - Minimal highlights
    600: '#0EA5E9', // Darker tech accent
    700: '#0284C7', // Dark tech accent
    800: '#0369A1', // Very dark tech accent
    900: '#075985', // Deepest tech accent
  },
} as const;

// Light theme colors - Theme B: Regulated Finance
export const lightTheme = {
  background: {
    primary: colors.neutral[100], // #F1F5F9 - Theme B background
    secondary: '#FFFFFF',
    tertiary: colors.neutral[50], // #F8FAFC
  },
  text: {
    primary: colors.neutral[950], // #0B1220 - Theme B dark text
    secondary: colors.neutral[700], // #334155 - Theme B secondary text
    tertiary: colors.neutral[500], // #64748B
    inverse: '#FFFFFF',
  },
  border: {
    default: colors.neutral[300], // #CBD5E1 - Theme B border
    hover: colors.neutral[400], // #94A3B8
    focus: colors.tertiary[500], // #1F4ED8 - Corporate Blue
  },
};

// Dark theme colors - Theme B: Regulated Finance
export const darkTheme = {
  background: {
    primary: '#0A0A0A', // Charcoal Black
    secondary: '#141414', // Slightly lighter charcoal
    tertiary: '#1E1E1E', // Medium charcoal
  },
  text: {
    primary: colors.neutral[50], // #F8FAFC - Light text
    secondary: colors.neutral[300], // #CBD5E1
    tertiary: colors.neutral[500], // #64748B
    inverse: colors.neutral[900], // #0F172A
  },
  border: {
    default: '#282828', // Charcoal borders
    hover: '#323232', // Lighter charcoal borders
    focus: colors.tertiary[500], // Corporate Blue focus
  },
};

export type ColorToken = typeof colors;
export type LightTheme = typeof lightTheme;
export type DarkTheme = typeof darkTheme;
