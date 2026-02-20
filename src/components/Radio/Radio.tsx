import React from 'react'
import { cn } from '@/utils/cn'

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helperText?: string
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, helperText, id, disabled, ...props }, ref) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error

    return (
      <div className={cn('form-container', className)}>
        <div className="form-row">
          <label
            htmlFor={radioId}
            className={cn(
              'flex items-center gap-2 cursor-pointer',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            <span
              className={cn(
                'relative inline-flex cursor-pointer flex-shrink-0 select-none',
                disabled && 'cursor-not-allowed'
              )}
            >
              <input
                ref={ref}
                type="radio"
                id={radioId}
                disabled={disabled}
                className="sr-only peer"
                aria-invalid={hasError}
                aria-describedby={error ? `${radioId}-error` : helperText ? `${radioId}-helper` : undefined}
                {...props}
              />
              <span
                className={cn(
                  'inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  'border-border bg-bg-secondary dark:bg-bg-tertiary dark:border-border-hover',
                  'hover:border-border-hover',
                  'peer-focus:outline-none',
                  'peer-focus-visible:border-tertiary peer-focus-visible:ring-0 dark:peer-focus-visible:border-tertiary-on-dark',
                  'peer-active:scale-[0.97]',
                  'peer-checked:border-tertiary peer-checked:bg-tertiary peer-checked:[&>span]:scale-100 dark:peer-checked:border-tertiary dark:peer-checked:bg-tertiary',
                  'peer-disabled:pointer-events-none peer-disabled:hover:border-border peer-disabled:opacity-50',
                  hasError &&
                    'border-error peer-focus-visible:border-error peer-checked:border-error peer-checked:bg-error'
                )}
              >
                <span
                  className="h-2 w-2 scale-0 rounded-full bg-text-inverse transition-transform"
                  aria-hidden
                />
              </span>
            </span>
            {label && (
              <span className={cn(
                'form-label select-none',
                disabled && 'opacity-50'
              )}>
                {label}
              </span>
            )}
          </label>
        </div>
        {error && (
          <p id={`${radioId}-error`} className="form-error ml-6" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${radioId}-helper`} className="form-helper ml-6">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'
