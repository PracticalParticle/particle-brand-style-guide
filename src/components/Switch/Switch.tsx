import React from 'react'
import { cn } from '@/utils/cn'

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helperText?: string
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error

    return (
      <div className="form-container">
        <div className="form-row">
          <label
            htmlFor={switchId}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="relative inline-flex items-center">
              <input
                ref={ref}
                type="checkbox"
                id={switchId}
                className="sr-only peer"
                aria-invalid={hasError}
                aria-describedby={error ? `${switchId}-error` : helperText ? `${switchId}-helper` : undefined}
                {...props}
              />
              <div
                className={cn(
                  'relative w-11 h-6 shrink-0 rounded-full bg-border',
                  'transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                  'peer-focus:outline-none',
                  'peer-focus-visible:ring-2 peer-focus-visible:ring-border-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg-primary',
                  'peer-checked:bg-tertiary peer-checked:after:translate-x-full',
                  'after:content-[""] after:absolute after:top-[2px] after:left-[2px]',
                  'after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm',
                  'dark:peer-checked:after:bg-bg-canvas dark:peer-checked:after:shadow-md',
                  'after:transition-[transform,background-color] after:duration-[220ms]',
                  hasError && 'peer-checked:bg-error',
                  className
                )}
              />
            </span>
            {label && (
              <span className="form-label select-none">
                {label}
              </span>
            )}
          </label>
        </div>
        {error && (
          <p id={`${switchId}-error`} className="form-error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${switchId}-helper`} className="form-helper">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Switch.displayName = 'Switch'
