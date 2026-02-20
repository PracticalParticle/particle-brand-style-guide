import React from 'react'
import { cn } from '@/utils/cn'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Value between 0 and 100 (or 0–max if max is set). */
  value: number
  /** Optional maximum (default 100). */
  max?: number
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'error'
  /** Bar height */
  size?: 'sm' | 'md' | 'lg'
  /** When true, show percentage label (or value/max). */
  showLabel?: boolean
  /** Label position when showLabel is true. */
  labelPosition?: 'left' | 'center' | 'right'
  /** When true, show a shimmer animation on the fill bar (for active/in-progress states). */
  animated?: boolean
  /** Accessible label for the progress bar. */
  'aria-label'?: string
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      variant = 'default',
      size = 'md',
      showLabel = false,
      labelPosition = 'right',
      animated = false,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const clamped = Math.max(0, Math.min(value, max))
    const pct = max > 0 ? (clamped / max) * 100 : 0

    const sizeClasses = {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-3.5',
    }

    const barColors = {
      default: 'bg-tertiary',
      success: 'bg-success',
      warning: 'bg-warning',
      error:   'bg-error',
    }

    // Shimmer overlay: gradient swept across the bar
    const shimmerStyle = animated
      ? {
          backgroundImage:
            'linear-gradient(90deg, transparent 0%, rgb(255 255 255 / 0.18) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }
      : {}

    const label =
      showLabel
        ? max === 100
          ? `${Math.round(pct)}%`
          : `${clamped}/${max}`
        : undefined

    const labelAlignClass =
      labelPosition === 'left'
        ? 'justify-start'
        : labelPosition === 'center'
          ? 'justify-center'
          : 'justify-end'

    const defaultAriaLabel =
      ariaLabel ||
      (max === 100 ? `${Math.round(pct)}% complete` : `${clamped} of ${max} complete`)

    return (
      <div ref={ref} className={cn('w-full min-w-[12rem]', className)} {...props}>
        {showLabel && label != null && (
          <div className={cn('flex mb-1.5', labelAlignClass)}>
            <span className="text-xs font-medium tabular-nums text-text-secondary">
              {label}
            </span>
          </div>
        )}
        <div
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={defaultAriaLabel}
          className={cn(
            'w-full overflow-hidden rounded-pill bg-bg-tertiary border border-border',
            sizeClasses[size]
          )}
        >
          <div
            className={cn(
              'h-full rounded-pill transition-[width] duration-slow ease-brand overflow-hidden',
              barColors[variant],
              animated && 'animate-progress-shimmer'
            )}
            style={{ width: `${pct}%`, ...shimmerStyle }}
          />
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'
