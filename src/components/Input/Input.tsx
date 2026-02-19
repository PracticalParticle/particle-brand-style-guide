import React from 'react'
import { cn } from '@/utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    label, 
    error, 
    helperText, 
    leftIcon, 
    rightIcon, 
    fullWidth = false,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error
    const hasIcon = !!leftIcon || !!rightIcon

    const baseStyles = 'flex h-10 w-full rounded-md border bg-secondary px-3 py-2 text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-tertiary'
    
    const borderStyles = hasError
      ? 'border-error focus:border-error focus:ring-error focus:ring-offset-0'
      : 'border-default focus:border-focus focus:ring-primary focus:ring-offset-0 hover:border-hover'

    const iconPadding = {
      left: leftIcon ? 'pl-10' : '',
      right: rightIcon ? 'pr-10' : '',
    }

    return (
      <div className={cn('flex flex-col space-y-1.5', fullWidth && 'w-full', className)}>
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary"
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
          <input
            ref={ref}
            id={inputId}
            aria-invalid={hasError}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={cn(
              baseStyles,
              borderStyles,
              iconPadding.left,
              iconPadding.right,
              hasIcon && 'pl-10',
              rightIcon && 'pr-10'
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">
              {rightIcon}
            </div>
          )}
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

Input.displayName = 'Input'

// Textarea component
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    label, 
    error, 
    helperText, 
    fullWidth = false,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error

    const baseStyles = 'flex min-h-[80px] w-full rounded-md border bg-secondary px-3 py-2 text-sm transition-all duration-200 placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-tertiary'
    
    const borderStyles = hasError
      ? 'border-error focus:border-error focus:ring-error focus:ring-offset-0'
      : 'border-default focus:border-focus focus:ring-primary focus:ring-offset-0 hover:border-hover'

    return (
      <div className={cn('flex flex-col space-y-1.5', fullWidth && 'w-full', className)}>
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary"
          >
            {label}
            {props.required && <span className="text-error ml-1" aria-label="required">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={hasError}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className={cn(baseStyles, borderStyles)}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-sm text-text-tertiary">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
