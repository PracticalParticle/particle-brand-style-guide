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
    const baseStyles = 'relative rounded-lg border p-4 transition-colors'
    
    const variants = {
      default: 'bg-neutral-50 border-neutral-200 text-neutral-900 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-50',
      success: 'bg-success-50 border-success-100 text-success-700 dark:bg-success-700/20 dark:border-success-700 dark:text-success-100',
      warning: 'bg-warning-50 border-warning-100 text-warning-700 dark:bg-warning-700/20 dark:border-warning-700 dark:text-warning-100',
      error: 'bg-error-50 border-error-100 text-error-700 dark:bg-error-700/20 dark:border-error-700 dark:text-error-100',
      info: 'bg-info-50 border-info-100 text-info-700 dark:bg-info-700/20 dark:border-info-700 dark:text-info-100',
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
              <h4 className="font-semibold mb-1">
                {title}
              </h4>
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
