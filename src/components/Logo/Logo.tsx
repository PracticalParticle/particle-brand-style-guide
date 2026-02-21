import React from 'react'
import { cn } from '@/utils/cn'
import { LOGO_ASPECT_RATIO } from './logoConstants'
import logoSvgRaw from './logo.svg?raw'

export { LOGO_ASPECT_RATIO }

export interface LogoProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Visual style: default (theme-aware), dark (charcoal on light bgs), light (white on dark bgs), tertiary (brand blue). Applied via currentColor; no width/height overrides. */
  variant?: 'default' | 'dark' | 'light' | 'tertiary'
  /** Preset size (Tailwind width class only; SVG scales with container). */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 16 | 24 | 32 | 48 | 64 | 128 | 256
  className?: string
}

const sizeMap: Record<string, string> = {
  xs: 'w-10',
  sm: 'w-16',
  md: 'w-24',
  lg: 'w-32',
  xl: 'w-40',
  '2xl': 'w-52',
  16: 'w-4',
  24: 'w-6',
  32: 'w-8',
  48: 'w-12',
  64: 'w-16',
  128: 'w-32',
  256: 'w-64',
}

/** Variant → Tailwind color (logo.svg uses currentColor). Monochrome only; tertiary = brand primary. */
const colorClassByVariant: Record<string, string> = {
  light: 'text-white',
  tertiary: 'text-btn-primary',
  dark: 'text-primary',
  default: 'text-text-primary',
}

/** logo.svg with class and aria-hidden; color comes from wrapper currentColor. */
const LOGO_SVG_WITH_CLASS = logoSvgRaw.replace(
  '<svg ',
  '<svg class="block w-full h-auto" aria-hidden="true" '
)

/**
 * Logo: single source logo.svg. Color via wrapper currentColor; scales with size class. No overrides.
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  size = 'md',
  className,
  style,
  ...props
}) => {
  const sizeClass = sizeMap[String(size)] ?? 'w-24'
  const colorClass = colorClassByVariant[variant] ?? colorClassByVariant.default

  return (
    <span
      className={cn('inline-block shrink-0', sizeClass, colorClass, className)}
      style={{
        aspectRatio: LOGO_ASPECT_RATIO,
        ...style,
      }}
      {...props}
    >
      <span dangerouslySetInnerHTML={{ __html: LOGO_SVG_WITH_CLASS }} />
    </span>
  )
}

Logo.displayName = 'Logo'
