import React from 'react'
import { cn } from '@/utils/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 
    | 'primary' 
    | 'secondary' 
    | 'danger' 
    | 'ghost' 
    | 'outline'
    | 'primary-gradient'
    | 'secondary-gradient'
    | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  iconOnly?: boolean
  fullWidth?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading, 
    disabled,
    leftIcon,
    rightIcon,
    iconOnly = false,
    fullWidth = false,
    children, 
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]'
    
    const variants = {
      primary: 'bg-primary text-inverse hover:bg-primary-hover active:bg-primary-active focus:ring-primary shadow-sm hover:shadow-md',
      secondary: 'bg-secondary text-inverse hover:bg-secondary-hover active:bg-secondary-active focus:ring-secondary shadow-sm hover:shadow-md',
      danger: 'bg-error text-inverse hover:bg-error-600 active:bg-error-700 focus:ring-error shadow-sm hover:shadow-md',
      ghost: 'bg-transparent text-primary hover:bg-primary-lighter/50 active:bg-primary-light/50 focus:ring-primary',
      outline: 'border border-primary text-primary bg-transparent hover:bg-primary-lighter/50 active:bg-primary-light/50 focus:ring-primary',
      'primary-gradient': 'bg-gradient-to-r from-primary to-primary-hover text-inverse hover:from-primary-hover hover:to-primary-active active:from-primary-active active:to-primary-900 focus:ring-primary shadow-md hover:shadow-lg',
      'secondary-gradient': 'bg-gradient-to-r from-secondary to-secondary-hover text-inverse hover:from-secondary-hover hover:to-secondary-active active:from-secondary-active active:to-secondary-900 focus:ring-secondary shadow-md hover:shadow-lg',
      link: 'bg-transparent text-primary hover:text-primary-hover underline-offset-4 hover:underline p-0 h-auto focus:ring-primary shadow-none',
    }

    const sizes = {
      xs: iconOnly ? 'p-1.5' : 'px-2 py-1 text-xs gap-1',
      sm: iconOnly ? 'p-2' : 'px-3 py-1.5 text-sm gap-1.5',
      md: iconOnly ? 'p-2.5' : 'px-4 py-2 text-sm gap-2',
      lg: iconOnly ? 'p-3' : 'px-5 py-2.5 text-base gap-2.5',
      xl: iconOnly ? 'p-4' : 'px-6 py-3 text-lg gap-3',
    }

    const iconSizes = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
      xl: 'w-6 h-6',
    }

    const showChildren = !iconOnly && children

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles, 
          variants[variant], 
          sizes[size],
          fullWidth && 'w-full',
          iconOnly && 'aspect-square',
          className
        )}
        disabled={disabled || isLoading}
        aria-label={iconOnly && typeof children === 'string' ? children : undefined}
        {...props}
      >
        {isLoading ? (
          <svg 
            className={cn('animate-spin', iconSizes[size])} 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          <>
            {leftIcon && (
              <span className={cn('flex-shrink-0', iconSizes[size])} aria-hidden="true">
                {leftIcon}
              </span>
            )}
            {showChildren && <span>{children}</span>}
            {rightIcon && (
              <span className={cn('flex-shrink-0', iconSizes[size])} aria-hidden="true">
                {rightIcon}
              </span>
            )}
            {iconOnly && !leftIcon && !rightIcon && children}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
