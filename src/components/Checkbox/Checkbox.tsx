import React from 'react'
import { cn } from '@/utils/cn'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helperText?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error

    return (
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-start gap-2">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(
              'h-4 w-4 rounded border-default',
              'text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0',
              'disabled:cursor-not-allowed disabled:opacity-50',
              hasError && 'border-error',
              className
            )}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium text-text-primary cursor-pointer"
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p className="text-sm text-error ml-6">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-sm text-text-tertiary ml-6">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
