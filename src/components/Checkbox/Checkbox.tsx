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
      <div className={cn('flex flex-col space-y-1.5', className)}>
        <div className="flex items-center gap-2">
          <label
            htmlFor={checkboxId}
            className={cn(
              'relative inline-flex cursor-pointer flex-shrink-0 select-none',
              disabled && 'cursor-not-allowed opacity-50'
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
                'inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm border-2 transition-colors',
                'border-neutral-300 bg-secondary dark:border-neutral-500 dark:bg-secondary',
                'hover:border-neutral-400 dark:hover:border-neutral-400',
                'peer-focus:outline-none',
                'peer-focus-visible:border-primary peer-focus-visible:ring-0',
                'peer-active:scale-[0.97]',
                'peer-checked:border-primary peer-checked:bg-primary peer-checked:text-text-inverse peer-checked:[&>svg]:opacity-100',
                'peer-disabled:pointer-events-none peer-disabled:hover:border-neutral-300 peer-disabled:dark:hover:border-neutral-500 peer-disabled:opacity-50',
                hasError &&
                  'border-error peer-focus-visible:border-error peer-checked:border-error peer-checked:bg-error'
              )}
            >
              <CheckIcon className="h-2.5 w-2.5 shrink-0 opacity-0" />
            </span>
          </label>
          {label && (
            <label
              htmlFor={checkboxId}
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
          <p id={`${checkboxId}-error`} className="text-sm text-error ml-6" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${checkboxId}-helper`} className="text-sm text-text-tertiary ml-6">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
