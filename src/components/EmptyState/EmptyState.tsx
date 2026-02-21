import React from 'react'
import { cn } from '@/utils/cn'

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  size = 'md',
  className,
  children,
  ...props
}) => {
  const defaultIcon = (
    <svg
      className="w-12 h-12 text-text-tertiary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
  )

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8',
        className
      )}
      {...props}
    >
      {icon && (
        <div className={cn('mb-4 text-text-tertiary', iconSizes[size])}>
          {icon}
        </div>
      )}
      {!icon && <div className={cn('mb-4', iconSizes[size])}>{defaultIcon}</div>}
      
      {title && (
        <h3
          className={cn(
            'font-semibold text-text-primary mb-2',
            titleSizes[size]
          )}
        >
          {title}
        </h3>
      )}
      
      {description && (
        <p className="text-sm text-text-secondary mb-4 max-w-md">
          {description}
        </p>
      )}
      
      {children && <div className="mb-4">{children}</div>}
      
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

EmptyState.displayName = 'EmptyState'
