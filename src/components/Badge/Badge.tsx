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
      default: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-100',
      primary: 'bg-primary-100 text-primary-700 dark:bg-primary-700/30 dark:text-primary-100',
      success: 'bg-success-100 text-success-700 dark:bg-success-700/30 dark:text-success-100',
      warning: 'bg-warning-100 text-warning-700 dark:bg-warning-700/30 dark:text-warning-100',
      error: 'bg-error-100 text-error-700 dark:bg-error-700/30 dark:text-error-100',
      info: 'bg-info-100 text-info-700 dark:bg-info-700/30 dark:text-info-100',
      outline: 'border-2 border-neutral-300 text-neutral-700 dark:border-neutral-500 dark:text-neutral-300',
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
