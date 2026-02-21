import React from 'react'
import { cn } from '@/utils/cn'
import {
  LOGO_PATH_TOP,
  LOGO_PATH_BOTTOM,
  LOGO_ART_WIDTH,
  LOGO_ART_HEIGHT,
  LOGO_ART_CENTER_X,
  LOGO_ART_CENTER_Y,
} from '@/components/Logo/logoConstants'

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'white' | 'branded' | 'branded-white'
  className?: string
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  className,
  ...props
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  const brandedSizes = {
    sm: 'w-6 h-6',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  }

  const variants = {
    primary: 'text-tertiary dark:text-tertiary-on-dark',
    secondary: 'text-text-secondary',
    white: 'text-text-inverse',
    branded: 'text-tertiary dark:text-tertiary-on-dark',
    'branded-white': 'text-text-inverse',
  }

  if (variant === 'branded' || variant === 'branded-white') {
    return (
      <div
        className={cn('inline-flex shrink-0', className)}
        role="status"
        aria-label="Loading"
        {...props}
      >
        <svg
          className={cn('animate-spinner-branded-spin origin-center', brandedSizes[size])}
          viewBox={`0 0 ${LOGO_ART_WIDTH} ${LOGO_ART_HEIGHT}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <g transform={`translate(${LOGO_ART_CENTER_X},${LOGO_ART_CENTER_Y}) scale(0.65) translate(-${LOGO_ART_CENTER_X},-${LOGO_ART_CENTER_Y})`}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={LOGO_PATH_TOP}
              className={cn('fill-current animate-spinner-logo-left', variants[variant])}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={LOGO_PATH_BOTTOM}
              className={cn('fill-current animate-spinner-logo-right', variants[variant])}
            />
          </g>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <div
      className={cn('inline-block', className)}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <svg
        className={cn('animate-spinner-default', sizes[size], variants[variant])}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden
      >
        {/* Track: very subtle, enterprise-style */}
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="opacity-[0.08]"
        />
        {/* Head: single smooth arc, ~40% of circle */}
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="22 34.5"
          strokeDashoffset="0"
          className="opacity-90"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

Spinner.displayName = 'Spinner'
