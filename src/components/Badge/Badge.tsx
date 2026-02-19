import React from 'react'
import { cn } from '@/utils/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors'
    
    const variants = {
      default: 'bg-tertiary text-text-inverse',
      primary: 'bg-primary text-text-inverse',
      success: 'bg-success-light text-success dark:bg-success/30 dark:text-success',
      warning: 'bg-warning-light text-warning dark:bg-warning/30 dark:text-warning',
      error: 'bg-error-light text-error dark:bg-error/30 dark:text-error',
      info: 'bg-info-light text-info dark:bg-info/30 dark:text-info',
      outline: 'border-2 border-border text-text-secondary',
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    }

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
