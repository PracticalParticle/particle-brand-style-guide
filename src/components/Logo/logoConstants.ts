/**
 * Logo geometry for animation, export, and aspect ratio.
 * Canonical source: logo.svg. Logo.tsx and logoUtils use logo.svg directly; this file provides
 * path data and dimensions for AnimatedLogos, Spinner, and LOGO_ASPECT_RATIO. Keep in sync with logo.svg.
 */

/** Art bounds (0,0 to 92,70 in logo.svg before the translate(12,12) padding). */
export const LOGO_ART_WIDTH = 92
export const LOGO_ART_HEIGHT = 70

/** Padding in logo.svg (translate on inner g). Must match logo.svg. */
export const LOGO_PADDING = 12

/** ViewBox of logo.svg (art + padding each side). */
export const LOGO_VIEWBOX_WIDTH = LOGO_ART_WIDTH + LOGO_PADDING * 2
export const LOGO_VIEWBOX_HEIGHT = LOGO_ART_HEIGHT + LOGO_PADDING * 2

/** Aspect ratio (viewBox width / height). Use for layout; do not override logo width/height in app. */
export const LOGO_ASPECT_RATIO = LOGO_VIEWBOX_WIDTH / LOGO_VIEWBOX_HEIGHT

/** Center of the logo art (for scale-from-center in animations). */
export const LOGO_ART_CENTER_X = LOGO_ART_WIDTH / 2
export const LOGO_ART_CENTER_Y = LOGO_ART_HEIGHT / 2

/** Stroke width in logo.svg (viewBox units). Keep in sync with logo.svg for AnimatedLogos. */
export const LOGO_STROKE_WIDTH = 1

/** Path d (top triangle). Must match logo.svg. */
export const LOGO_PATH_TOP =
  'M58.0121 4.88998L61.1256 0.695557L64.2391 4.88999L79.9978 26.12H73.7709L61.1256 9.08441L40.3915 37.0172H81.8597L77.4823 31.12H83.7093L88.0867 37.0172L91.7981 42.0172H85.5712H36.6801H30.4531L34.1646 37.0172L58.0121 4.88998Z'

/** Path d (bottom triangle). Must match logo.svg. */
export const LOGO_PATH_BOTTOM =
  'M33.7859 65.1965L30.6725 69.3909L27.559 65.1965L11.8001 43.9663H18.0271L30.6725 61.0021L51.4066 33.0693H9.93837L14.3156 38.9663H8.08869L3.71143 33.0693L0 28.0693H6.22694H55.118H61.345L57.6335 33.0693L33.7859 65.1965Z'
