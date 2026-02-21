import React from 'react'
import { cn } from '@/utils/cn'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helperText?: string
}

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M2 6l3 3 5-6" />
  </svg>
)

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, helperText, id, disabled, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error

    return (
      <div className={cn('form-container', className)}>
        <div className="form-row">
          <label
            htmlFor={checkboxId}
            className={cn(
              'flex items-center gap-2 cursor-pointer min-h-[44px] py-1',
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
                type="checkbox"
                id={checkboxId}
                disabled={disabled}
                className="sr-only peer"
                aria-invalid={hasError}
                aria-describedby={error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined}
                {...props}
              />
              <span
                className={cn(
                  'inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-inset border-2',
                  'transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                  'border-border bg-bg-secondary dark:bg-bg-secondary dark:border-border',
                  'hover:border-border-hover',
                  'peer-focus:outline-none',
                  'peer-focus-visible:border-tertiary peer-focus-visible:shadow-[0_0_0_3px_rgb(var(--color-border-focus)/0.18)]',
                  'dark:peer-focus-visible:border-tertiary-on-dark',
                  'peer-active:scale-[0.95]',
                  'peer-checked:border-tertiary peer-checked:bg-tertiary peer-checked:text-text-inverse peer-checked:[&>svg]:opacity-100',
                  'peer-disabled:pointer-events-none peer-disabled:hover:border-border peer-disabled:opacity-40',
                  hasError &&
                    'border-error peer-focus-visible:border-error peer-checked:border-error peer-checked:bg-error'
                )}
              >
                <CheckIcon className="h-2.5 w-2.5 shrink-0 opacity-0" />
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
          <p id={`${checkboxId}-error`} className="form-error ml-6" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${checkboxId}-helper`} className="form-helper ml-6">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
