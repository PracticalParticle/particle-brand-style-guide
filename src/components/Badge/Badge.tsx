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
  (
    {
      className,
      variant = 'default',
      size = 'md',
      children,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      'inline-flex items-center font-medium rounded-full',
      'transition-colors duration-[220ms]',
      'tracking-wide',
    ].join(' ')

    const variants = {
      // Brand — electric indigo
      default: 'bg-tertiary text-text-inverse',

      // Primary — deep navy / dark surface
      primary: [
        'bg-primary text-text-inverse',
        'dark:bg-bg-tertiary dark:text-text-primary dark:border dark:border-border',
      ].join(' '),

      // Status — tinted surfaces with bordered style
      success: [
        'bg-success-light text-success border border-success/20',
        'dark:bg-success/15 dark:text-success dark:border-success/25',
      ].join(' '),

      warning: [
        'bg-warning-light text-warning border border-warning/20',
        'dark:bg-warning/15 dark:text-warning dark:border-warning/25',
      ].join(' '),

      error: [
        'bg-error-light text-error border border-error/20',
        'dark:bg-error/15 dark:text-error dark:border-error/25',
      ].join(' '),

      info: [
        'bg-info-light text-info border border-info/20',
        'dark:bg-tertiary/15 dark:text-tertiary-on-dark dark:border-tertiary-on-dark/25',
      ].join(' '),

      // Outline — minimal ring
      outline: [
        'border border-border text-text-secondary bg-transparent',
        'dark:border-border dark:text-text-secondary',
      ].join(' '),
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-2.5 py-0.5 text-xs gap-1',
      lg: 'px-3 py-1 text-sm gap-1.5',
    }

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
