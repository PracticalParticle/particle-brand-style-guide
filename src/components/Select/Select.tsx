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

    const baseStyles = 'flex h-10 w-full rounded-md border bg-secondary px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-tertiary appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")] bg-[length:1em] bg-[right_0.75rem_center] bg-no-repeat pr-10 hover:border-hover'
    
    const borderStyles = hasError
      ? 'border-error focus:border-error focus:ring-error focus:ring-offset-0'
      : 'border-default focus:border-focus focus:ring-primary focus:ring-offset-0'

    return (
      <div className={cn('flex flex-col space-y-1.5', fullWidth && 'w-full', className)}>
        {label && (
          <label 
            htmlFor={selectId}
            className="text-sm font-medium text-text-primary"
          >
            {label}
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
          <p className="text-sm text-error">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-sm text-text-tertiary">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
