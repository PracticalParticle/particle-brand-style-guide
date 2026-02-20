import React from 'react'
import { cn } from '@/utils/cn'

/** Logo triangle paths (same as Logo component) for branded spinner */
const LOGO_TOP_TRIANGLE =
  'M58.0121 4.88998L61.1256 0.695557L64.2391 4.88999L79.9978 26.12H73.7709L61.1256 9.08441L40.3915 37.0172H81.8597L77.4823 31.12H83.7093L88.0867 37.0172L91.7981 42.0172H85.5712H36.6801H30.4531L34.1646 37.0172L58.0121 4.88998Z'
const LOGO_BOTTOM_TRIANGLE =
  'M33.7859 65.1965L30.6725 69.3909L27.559 65.1965L11.8001 43.9663H18.0271L30.6725 61.0021L51.4066 33.0693H9.93837L14.3156 38.9663H8.08869L3.71143 33.0693L0 28.0693H6.22694H55.118H61.345L57.6335 33.0693L33.7859 65.1965Z'

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
          viewBox="0 0 92 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* Scale and center so expanded state doesn't crop (viewBox center 46,35) */}
          <g transform="translate(46,35) scale(0.65) translate(-46,-35)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={LOGO_TOP_TRIANGLE}
              className={cn('fill-current animate-spinner-logo-left', variants[variant])}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={LOGO_BOTTOM_TRIANGLE}
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
