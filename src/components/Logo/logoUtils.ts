/**
 * Logo export and download. Uses the canonical logo.svg; substitutes color only (no width overrides in app).
 */
import logoSvgRaw from './logo.svg?raw'
import { LOGO_VIEWBOX_WIDTH, LOGO_VIEWBOX_HEIGHT } from './logoConstants'

/**
 * Brand colors for export (hex). Match globals.css:
 * - DARK_FILL = --color-primary (light mode)
 * - LIGHT_FILL = --color-white
 * - TERTIARY_FILL = --color-tertiary (light mode)
 */
const LIGHT_FILL = '#FFFFFF'
const DARK_FILL = '#0A0A0A'
const TERTIARY_FILL = '#1F4ED8'

export type LogoExportVariant = 'dark' | 'light' | 'tertiary'

const FILL_BY_VARIANT: Record<LogoExportVariant, string> = {
  dark: DARK_FILL,
  light: LIGHT_FILL,
  tertiary: TERTIARY_FILL,
}

/**
 * Returns the logo SVG string with currentColor replaced by the variant hex.
 * Optional width/height only set on the exported string (for file download); app never overrides width.
 */
export function getLogoSvgString(
  variant: LogoExportVariant = 'dark',
  widthPx?: number,
  heightPx?: number
): string {
  const fill = FILL_BY_VARIANT[variant] ?? DARK_FILL
  let svg = logoSvgRaw.replace(/currentColor/g, fill)
  if (widthPx != null && heightPx != null) {
    svg = svg.replace('<svg viewBox', `<svg width="${widthPx}" height="${heightPx}" viewBox`)
  }
  return svg
}

/**
 * Triggers download of the logo as an SVG file (same source as logo.svg).
 */
export function downloadLogoSvg(
  variant: LogoExportVariant = 'dark',
  widthPx: number = LOGO_VIEWBOX_WIDTH,
  heightPx: number = LOGO_VIEWBOX_HEIGHT,
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

export const LOGO_EXPORT_SIZES = {
  favicon: 32,
  faviconLarge: 64,
  social: 128,
  socialLarge: 256,
  header: 120,
  hero: 200,
} as const
