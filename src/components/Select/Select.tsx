import React from 'react'
import { cn } from '@/utils/cn'

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  /** Size of the select. Default md. */
  size?: SelectSize
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({
    className,
    label,
    error,
    helperText,
    leftIcon,
    fullWidth = false,
    size = 'md',
    id,
    children,
    ...props
  }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error

    const sizeStyles: Record<SelectSize, string> = {
      sm: 'h-8 rounded-control px-2.5 pr-8 text-xs leading-none py-[10px]',
      md: 'h-10 rounded-control px-3 pr-10 text-sm leading-none py-[13px]',
      lg: 'h-11 rounded-control px-3.5 pr-11 text-base leading-none py-[14px]',
    }

    const baseStyles = [
      'flex w-full min-h-0 border appearance-none items-center box-border',
      'bg-bg-secondary text-text-primary',
      'transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
      'focus:outline-none focus:ring-0',
      'disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-bg-tertiary',
      sizeStyles[size],
    ].join(' ')

    const borderStyles = hasError
      ? 'border-error hover:border-error focus:border-error focus:shadow-[0_0_0_3px_rgb(var(--color-error)/0.12)]'
      : 'border-border hover:border-border-hover focus:border-border-focus focus:shadow-[0_0_0_3px_rgb(var(--color-border-focus)/0.15)]'

    return (
      <div className={cn('form-container', fullWidth && 'w-full', className)}>
        {label && (
          <label
            htmlFor={selectId}
            className="form-label"
          >
            {label}
            {props.required && <span className="text-error ml-1" aria-label="required">*</span>}
          </label>
        )}
        <div className="relative w-full">
          {leftIcon && (
            <div
              className={cn(
                'absolute top-1/2 z-10 -translate-y-1/2 text-text-tertiary pointer-events-none',
                size === 'sm' ? 'left-2.5' : size === 'lg' ? 'left-3.5' : 'left-3'
              )}
            >
              {leftIcon}
            </div>
          )}
          <select
            ref={ref}
            id={selectId}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
            }
            className={cn(
              baseStyles,
              borderStyles,
              leftIcon && (size === 'sm' ? 'pl-8' : size === 'lg' ? 'pl-11' : 'pl-10')
            )}
            {...props}
          >
            {children}
          </select>
          <div
            className={cn(
              'absolute top-1/2 flex -translate-y-1/2 items-center justify-center pointer-events-none text-text-tertiary',
              size === 'sm' && 'right-2.5 h-4 w-4',
              size === 'md' && 'right-3 h-5 w-5',
              size === 'lg' && 'right-3.5 h-5 w-5'
            )}
            aria-hidden
          >
            <ChevronDownIcon
              className={cn(
                size === 'sm' && 'w-4 h-4',
                size === 'md' && 'w-5 h-5',
                size === 'lg' && 'w-5 h-5'
              )}
            />
          </div>
        </div>
        {error && (
          <p id={`${selectId}-error`} className="form-error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="form-helper">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
