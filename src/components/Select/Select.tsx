import React from 'react'
import { cn } from '@/utils/cn'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
  leftIcon?: React.ReactNode
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    label, 
    error, 
    helperText, 
    leftIcon,
    fullWidth = false,
    id,
    children,
    ...props 
  }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error

    const baseStyles =
      'flex h-10 w-full rounded-md border bg-secondary px-3 py-2 text-sm text-text-primary transition-colors focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-secondary appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")] bg-[length:1em] bg-[right_0.75rem_center] bg-no-repeat pr-10 border-neutral-400 dark:border-neutral-500'

    const borderStyles = hasError
      ? 'border-error hover:border-error focus:border-error focus-visible:border-error'
      : 'hover:border-neutral-500 dark:hover:border-neutral-400 focus:border-focus focus-visible:border-focus'

    return (
      <div className={cn('flex flex-col space-y-1.5', fullWidth && 'w-full', className)}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium leading-tight text-text-primary"
          >
            {label}
            {props.required && <span className="text-error ml-1" aria-label="required">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none">
              {leftIcon}
            </div>
          )}
          <select
            ref={ref}
            id={selectId}
            aria-invalid={hasError}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            className={cn(
              baseStyles,
              borderStyles,
              leftIcon && 'pl-10'
            )}
            {...props}
          >
            {children}
          </select>
        </div>
        {error && (
          <p id={`${selectId}-error`} className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="text-sm text-text-tertiary">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
