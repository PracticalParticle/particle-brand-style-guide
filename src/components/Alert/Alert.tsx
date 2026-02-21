import React from 'react'
import { cn } from '@/utils/cn'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  title?: string
  children: React.ReactNode
  onClose?: () => void
  icon?: React.ReactNode
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', title, children, onClose, icon, ...props }, ref) => {
    const baseStyles = [
      'relative rounded-card border p-4',
      'transition-all duration-[220ms]',
    ].join(' ')

    const variants = {
      default: [
        'bg-tertiary border-tertiary-active text-text-inverse',
        'dark:shadow-glow-brand/50',
      ].join(' '),
      success: [
        'bg-success-light border-success/30 text-success',
        'dark:bg-success/12 dark:border-success/25 dark:text-success',
      ].join(' '),
      warning: [
        'bg-warning-light border-warning/30 text-warning',
        'dark:bg-warning/12 dark:border-warning/25 dark:text-warning',
      ].join(' '),
      error: [
        'bg-error-light border-error/30 text-error',
        'dark:bg-error/12 dark:border-error/25 dark:text-error',
      ].join(' '),
      info: [
        'bg-info-light border-info/30 text-info',
        'dark:bg-tertiary/12 dark:border-tertiary-on-dark/25 dark:text-tertiary-on-dark',
      ].join(' '),
    }

    const defaultIcons = {
      success: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      warning: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      error: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      info: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      default: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    }

    const displayIcon = icon || defaultIcons[variant]

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        role="alert"
        {...props}
      >
        <div className="flex items-start gap-3">
          {displayIcon && (
            <div className="flex-shrink-0 mt-0.5">
              {displayIcon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            {title && (
              <div className="font-semibold mb-1">
                {title}
              </div>
            )}
            <div className="text-sm">
              {children}
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="flex-shrink-0 ml-2 text-current opacity-50 hover:opacity-100 transition-opacity"
              aria-label="Close alert"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    )
  }
)

Alert.displayName = 'Alert'
