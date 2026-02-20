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

    const baseStyles =
      'flex h-10 w-full rounded-md border bg-bg-secondary px-3 py-2 text-sm text-text-primary transition-colors placeholder:text-text-tertiary placeholder:opacity-100 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-bg-tertiary file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-primary border-border'

    const borderStyles = hasError
      ? 'border-error hover:border-error focus:border-error focus-visible:border-error'
      : 'hover:border-border-hover focus:border-border-focus focus-visible:border-border-focus'

    const iconPadding = {
      left: leftIcon ? 'pl-10' : '',
      right: rightIcon ? 'pr-10' : '',
    }

    return (
      <div className={cn('form-container', fullWidth && 'w-full', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="form-label"
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
            className={cn(baseStyles, borderStyles, iconPadding.left, iconPadding.right)}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="form-error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="form-helper-tertiary">
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

    const baseStyles =
      'flex min-h-[80px] w-full rounded-md border bg-bg-secondary px-3 py-2 text-sm text-text-primary transition-colors placeholder:text-text-tertiary placeholder:opacity-100 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-bg-tertiary resize-y border-border'

    const borderStyles = hasError
      ? 'border-error hover:border-error focus:border-error focus-visible:border-error'
      : 'hover:border-border-hover focus:border-border-focus focus-visible:border-border-focus'

    return (
      <div className={cn('form-container', fullWidth && 'w-full', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="form-label"
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
          <p id={`${inputId}-error`} className="form-error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="form-helper-tertiary">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

export interface SearchInputProps extends Omit<InputProps, 'type'> {
  /** Show search icon on the left. Default true. */
  showIcon?: boolean
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ showIcon = true, leftIcon, fullWidth, ...props }, ref) => (
    <Input
      ref={ref}
      type="search"
      leftIcon={leftIcon ?? (showIcon ? <SearchIcon /> : undefined)}
      fullWidth={fullWidth}
      autoComplete="off"
      {...props}
    />
  )
)

SearchInput.displayName = 'SearchInput'
