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
      <div className={cn('flex flex-col space-y-1.5', className)}>
        <div className="flex items-center gap-2">
          <label
            htmlFor={radioId}
            className={cn(
              'relative inline-flex cursor-pointer flex-shrink-0 select-none',
              disabled && 'cursor-not-allowed opacity-50'
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
                'border-neutral-300 bg-secondary dark:border-neutral-500 dark:bg-secondary',
                'hover:border-neutral-400 dark:hover:border-neutral-400',
                'peer-focus:outline-none',
                'peer-focus-visible:border-primary peer-focus-visible:ring-0',
                'peer-active:scale-[0.97]',
                'peer-checked:border-primary peer-checked:bg-primary peer-checked:[&>span]:scale-100',
                'peer-disabled:pointer-events-none peer-disabled:hover:border-neutral-300 peer-disabled:dark:hover:border-neutral-500 peer-disabled:opacity-50',
                hasError &&
                  'border-error peer-focus-visible:border-error peer-checked:border-error peer-checked:bg-error'
              )}
            >
              <span
                className="h-2 w-2 scale-0 rounded-full bg-text-inverse transition-transform"
                aria-hidden
              />
            </span>
          </label>
          {label && (
            <label
              htmlFor={radioId}
              className={cn(
                'text-sm font-medium leading-tight text-text-primary cursor-pointer select-none',
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p id={`${radioId}-error`} className="text-sm text-error ml-6" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${radioId}-helper`} className="text-sm text-text-tertiary ml-6">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'
