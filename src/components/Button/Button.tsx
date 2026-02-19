import React from 'react'
import { cn } from '@/utils/cn'
import { Spinner } from '../Spinner'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 
    | 'primary' 
    | 'secondary' 
    | 'danger' 
    | 'ghost' 
    | 'outline'
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
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-base transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'
    
    const variants = {
      primary: 'bg-tertiary text-text-inverse hover:bg-tertiary-hover active:bg-tertiary-active active:scale-[0.97] active:shadow-sm focus-visible:ring-tertiary shadow-sm hover:shadow-md',
      secondary: 'bg-secondary text-text-primary hover:bg-tertiary-lighter active:bg-tertiary-light active:scale-[0.97] active:shadow-sm focus-visible:ring-tertiary shadow-sm hover:shadow-md',
      danger: 'border border-error text-error bg-transparent hover:bg-error-light/50 active:bg-error-light/70 active:scale-[0.97] focus-visible:ring-error',
      ghost: 'bg-transparent text-tertiary hover:bg-tertiary-lighter/50 active:bg-tertiary-light/70 active:scale-[0.97] focus-visible:ring-tertiary',
      outline: 'border border-tertiary text-tertiary bg-transparent hover:bg-tertiary-lighter/50 active:bg-tertiary-light/70 active:scale-[0.97] focus-visible:ring-tertiary',
      link: 'bg-transparent text-tertiary hover:text-tertiary-hover underline-offset-4 hover:underline p-0 h-auto active:text-tertiary-active focus-visible:ring-tertiary shadow-none',
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
          <Spinner
            variant={variant === 'primary' ? 'white' : 'primary'}
            size={size === 'xs' || size === 'sm' ? 'sm' : size === 'lg' || size === 'xl' ? 'lg' : 'md'}
          />
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
