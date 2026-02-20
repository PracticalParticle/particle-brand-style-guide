/**
 * Logo export and download utilities.
 * Uses design system primary (charcoal) and white for light variant.
 */

/** 
 * Brand colors only (primary charcoal, white, tertiary corporate blue)
 * 
 * IMPORTANT: These hex values must match the CSS variables in globals.css:
 * - LIGHT_FILL matches --color-white: #FFFFFF
 * - DARK_FILL matches --color-primary (light mode): #0A0A0A
 * - TERTIARY_FILL matches --color-tertiary (light mode): #1F4ED8
 * 
 * These are used for SVG exports/downloads, so they must be static hex values.
 * If theme colors change in globals.css, update these constants accordingly.
 */
const LIGHT_FILL = '#FFFFFF'
const DARK_FILL = '#0A0A0A'     // --color-primary (light mode)
const TERTIARY_FILL = '#1F4ED8' // --color-tertiary (corporate blue)

const LOGO_SVG_PATH =
  '<path fill-rule="evenodd" clip-rule="evenodd" d="M58.0121 4.88998L61.1256 0.695557L64.2391 4.88999L79.9978 26.12H73.7709L61.1256 9.08441L40.3915 37.0172H81.8597L77.4823 31.12H83.7093L88.0867 37.0172L91.7981 42.0172H85.5712H36.6801H30.4531L34.1646 37.0172L58.0121 4.88998Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M33.7859 65.1965L30.6725 69.3909L27.559 65.1965L11.8001 43.9663H18.0271L30.6725 61.0021L51.4066 33.0693H9.93837L14.3156 38.9663H8.08869L3.71143 33.0693L0 28.0693H6.22694H55.118H61.345L57.6335 33.0693L33.7859 65.1965Z"/>'

export type LogoExportVariant = 'dark' | 'light' | 'tertiary'

const FILL_BY_VARIANT: Record<LogoExportVariant, string> = {
  dark: DARK_FILL,
  light: LIGHT_FILL,
  tertiary: TERTIARY_FILL,
}

/**
 * Returns a full SVG string for the logo (for download or external use).
 * Uses brand colors only: primary (charcoal), white, tertiary (corporate blue).
 */
export function getLogoSvgString(
  variant: LogoExportVariant = 'dark',
  widthPx: number = 92,
  heightPx: number = 70
): string {
  const fill = FILL_BY_VARIANT[variant] ?? DARK_FILL
  const pathsWithFill = LOGO_SVG_PATH.replace(/\/>/g, ` fill="${fill}"/>`)
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${widthPx}" height="${heightPx}" viewBox="0 0 92 70" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${pathsWithFill}
</svg>`
}

/**
 * Triggers download of the logo as an SVG file.
 */
export function downloadLogoSvg(
  variant: LogoExportVariant = 'dark',
  widthPx: number = 92,
  heightPx: number = 70,
  filename?: string
): void {
  const svg = getLogoSvgString(variant, widthPx, heightPx)
  const name = filename ?? `particle-logo-${variant}-${widthPx}x${heightPx}.svg`
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
}

/** Standard export sizes for different use cases (width in px). */
export const LOGO_EXPORT_SIZES = {
  favicon: 32,
  faviconLarge: 64,
  social: 128,
  socialLarge: 256,
  header: 120,
  hero: 200,
} as const
