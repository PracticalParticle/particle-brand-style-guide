import React from 'react'
import { cn } from '@/utils/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  /** Optional aria-label for short text badges to improve accessibility */
  'aria-label'?: string
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, 'aria-label': ariaLabel, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors'
    
    const variants = {
      default: 'bg-tertiary text-text-inverse',
      primary: 'bg-primary text-text-inverse',
      success: 'bg-success-light text-success dark:text-text-inverse',
      warning: 'bg-warning-light text-warning dark:text-text-inverse',
      error: 'bg-error-light text-error dark:text-text-inverse',
      info: 'bg-info-light text-info dark:text-text-inverse',
      outline: 'border-2 border-border text-text-secondary',
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    }

    // If aria-label is provided, use role="img" to make it accessible
    // Otherwise, rely on text content which is already accessible
    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        role={ariaLabel ? 'img' : undefined}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
