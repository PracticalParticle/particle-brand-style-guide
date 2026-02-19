import React from 'react'
import { cn } from '@/utils/cn'

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helperText?: string
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error

    return (
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-start gap-2">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className={cn(
              'h-4 w-4 border-default',
              'text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0',
              'disabled:cursor-not-allowed disabled:opacity-50',
              hasError && 'border-error',
              className
            )}
            {...props}
          />
          {label && (
            <label
              htmlFor={radioId}
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

Radio.displayName = 'Radio'
