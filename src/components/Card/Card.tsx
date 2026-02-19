import React from 'react'
import { cn } from '@/utils/cn'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  interactive?: boolean
  children: React.ReactNode
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', interactive = false, children, ...props }, ref) => {
    const baseStyles = 'rounded-lg transition-all duration-200 border border-default'
    
    const variants = {
      default: 'bg-secondary shadow-sm text-text-primary',
      elevated: 'bg-secondary shadow-md text-text-primary',
      outlined: 'bg-secondary border-2 border-hover shadow-none text-text-primary',
      filled: 'bg-tertiary border-tertiary-active text-text-inverse',
    }

    const paddings = {
      none: 'p-0',
      sm: 'p-4 sm:p-5',
      md: 'p-5 sm:p-6 lg:p-6',
      lg: 'p-6 sm:p-8 lg:p-10',
    }

    const interactiveStyles = interactive
      ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
      : ''

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], interactiveStyles, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card sub-components
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 mb-4', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('text-2xl font-semibold leading-none tracking-tight text-inherit', className)}
        {...props}
      >
        {children}
      </h3>
    )
  }
)

CardTitle.displayName = 'CardTitle'

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-inherit opacity-90', className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)

CardDescription.displayName = 'CardDescription'

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardContent.displayName = 'CardContent'

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center mt-4 pt-4 border-t border-default', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'
