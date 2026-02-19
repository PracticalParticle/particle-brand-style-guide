import React from 'react'
import { cn } from '@/utils/cn'

export interface RatingProps {
  /** Current value (0 to max). */
  value?: number
  /** Max stars. Default 5. */
  max?: number
  /** Callback when value changes. */
  onChange?: (value: number) => void
  /** Disable interaction. */
  disabled?: boolean
  /** Read-only (no hover/click). */
  readonly?: boolean
  /** Size of stars. */
  size?: 'sm' | 'md' | 'lg'
  /** Optional label. */
  label?: string
  /** Error message. */
  error?: string
  /** Helper text. */
  helperText?: string
  className?: string
  /** Accessibility: aria-label for the group. */
  'aria-label'?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-7 h-7',
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value = 0,
      max = 5,
      onChange,
      disabled = false,
      readonly = false,
      size = 'md',
      label,
      error,
      helperText,
      className,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const [hover, setHover] = React.useState<number | null>(null)
    const ratingId = React.useId()
    const displayValue = hover !== null ? hover : value
    const isInteractive = !disabled && !readonly && typeof onChange === 'function'

    const handleClick = (i: number) => {
      if (isInteractive) onChange?.(i)
    }

    const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
      if (!isInteractive) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onChange?.(i)
      }
    }

    return (
      <div ref={ref} className={cn('flex flex-col space-y-1.5', className)}>
        {label && (
          <label id={`${ratingId}-label`} className="text-sm font-medium leading-tight text-text-primary">
            {label}
          </label>
        )}
        <div
          role="group"
          aria-label={ariaLabel ?? label ?? 'Rating'}
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-invalid={!!error}
          aria-describedby={error ? `${ratingId}-error` : helperText ? `${ratingId}-helper` : undefined}
          onMouseLeave={() => isInteractive && setHover(null)}
          className="inline-flex items-center gap-0.5"
        >
          {Array.from({ length: max }, (_, i) => {
            const starValue = i + 1
            const filled = starValue <= displayValue
            const content = <StarIcon filled={filled} className={sizeClasses[size]} />
            if (isInteractive) {
              return (
                <button
                  key={starValue}
                  type="button"
                  aria-label={`${starValue} ${starValue === 1 ? 'star' : 'stars'}`}
                  aria-pressed={value === starValue}
                  onClick={() => handleClick(starValue)}
                  onKeyDown={(e) => handleKeyDown(e, starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  className={cn(
                    'inline-flex shrink-0 cursor-pointer rounded p-0.5 transition-colors focus:outline-none focus-visible:ring-0',
                    'border border-transparent focus-visible:border focus-visible:border-focus hover:opacity-90 active:scale-95',
                    sizeClasses[size]
                  )}
                >
                  {content}
                </button>
              )
            }
            return (
              <span key={starValue} className={cn('inline-flex shrink-0', sizeClasses[size])}>
                {content}
              </span>
            )
          })}
        </div>
        {error && (
          <p id={`${ratingId}-error`} className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${ratingId}-helper`} className="text-sm text-text-tertiary">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Rating.displayName = 'Rating'

function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  const path = 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
  return (
    <svg
      className={cn(className, filled ? 'text-tertiary' : 'text-neutral-300 dark:text-neutral-600')}
      viewBox="0 0 20 20"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={1.5}
      aria-hidden
    >
      <path d={path} />
    </svg>
  )
}
