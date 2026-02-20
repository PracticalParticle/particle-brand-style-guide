import React from 'react'
import { cn } from '@/utils/cn'

/** Logo aspect ratio (viewBox width / height) for consistent scaling */
export const LOGO_ASPECT_RATIO = 92 / 70

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  /** Visual style: default (theme), dark (for light bgs), light (for dark bgs), tertiary (brand blue) */
  variant?: 'default' | 'dark' | 'light' | 'tertiary'
  /** Preset sizes for UI; use pixel sizes (e.g. 32, 64) for exact px output (favicon, social). */
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

export const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const fillColor =
    variant === 'light'
      ? 'fill-text-inverse'
      : variant === 'tertiary'
        ? 'fill-tertiary'
        : variant === 'dark'
          ? 'fill-primary'
          : 'fill-primary dark:fill-text-inverse'

  const sizeClass = sizeMap[String(size)] ?? 'w-24'
  const isPixelSize = typeof size === 'number'
  const widthPx = isPixelSize ? size : undefined
  const heightPx = isPixelSize ? Math.round(size / LOGO_ASPECT_RATIO) : undefined

  return (
    <svg
      {...(isPixelSize && widthPx != null && heightPx != null
        ? { width: widthPx, height: heightPx }
        : {})}
      viewBox="0 0 92 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('aspect-[92/70] shrink-0', sizeClass, fillColor, className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58.0121 4.88998L61.1256 0.695557L64.2391 4.88999L79.9978 26.12H73.7709L61.1256 9.08441L40.3915 37.0172H81.8597L77.4823 31.12H83.7093L88.0867 37.0172L91.7981 42.0172H85.5712H36.6801H30.4531L34.1646 37.0172L58.0121 4.88998Z"
        className={fillColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.7859 65.1965L30.6725 69.3909L27.559 65.1965L11.8001 43.9663H18.0271L30.6725 61.0021L51.4066 33.0693H9.93837L14.3156 38.9663H8.08869L3.71143 33.0693L0 28.0693H6.22694H55.118H61.345L57.6335 33.0693L33.7859 65.1965Z"
        className={fillColor}
      />
    </svg>
  )
}

Logo.displayName = 'Logo'
