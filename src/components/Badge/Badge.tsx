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
      'transition-colors [transition-duration:220ms]',
      'tracking-wide',
    ].join(' ')

    const variants = {
      // Brand — electric indigo
      default: 'bg-tertiary text-text-inverse',

      // Primary — dark surface in dark mode, bg-primary in light.
      // `border border-transparent` matches outline chip box model so toggling filter state does not jump or “double” borders.
      primary: [
        'bg-primary text-text-inverse border border-transparent',
        'dark:bg-bg-tertiary dark:text-text-primary dark:border-border',
      ].join(' '),  // bg-primary → bg-bg-tertiary in dark (different token, needs explicit override)

      // Status — tinted surfaces with bordered style.
      // text-* and border-* use CSS vars that already adapt per mode — no dark: duplicate needed.
      // Only background overrides dark mode (different formula: opacity vs solid-light).
      success: [
        'bg-success-light text-success border border-success/20',
        'dark:bg-success/15',
      ].join(' '),

      warning: [
        'bg-warning-light text-warning border border-warning/20',
        'dark:bg-warning/15',
      ].join(' '),

      error: [
        'bg-error-light text-error border border-error/20',
        'dark:bg-error/15',
      ].join(' '),

      info: [
        'bg-info-light text-info border border-info/20',
        'dark:bg-tertiary/15',
      ].join(' '),

      // Outline — minimal ring. text-text-secondary already adapts via CSS var.
      outline: 'border border-border text-text-secondary bg-transparent',
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
