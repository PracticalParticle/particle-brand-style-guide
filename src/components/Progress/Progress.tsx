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
      md: 'h-2',
      lg: 'h-3',
    }

    const barVariants = {
      default: 'bg-tertiary dark:bg-tertiary',
      success: 'bg-success dark:bg-success',
      warning: 'bg-warning dark:bg-warning',
      error: 'bg-error dark:bg-error',
    }

    const label = showLabel ? (max === 100 ? `${Math.round(pct)}%` : `${clamped}/${max}`) : undefined
    const labelAlignClass =
      labelPosition === 'left' ? 'justify-start' : labelPosition === 'center' ? 'justify-center' : 'justify-end'

    return (
      <div ref={ref} className={cn('w-full min-w-[12rem]', className)} {...props}>
        {showLabel && label != null && (
          <div className={cn('flex mb-1', labelAlignClass)}>
            <span className="text-sm font-medium text-text-secondary">{label}</span>
          </div>
        )}
        <div
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={ariaLabel}
          className={cn('w-full min-w-[12rem] overflow-hidden rounded-full bg-bg-tertiary dark:bg-white/15 border border-border', sizeClasses[size])}
        >
          <div
            className={cn('h-full rounded-full transition-[width] duration-300 ease-out', barVariants[variant])}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'
