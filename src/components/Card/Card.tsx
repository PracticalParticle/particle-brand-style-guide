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
    const baseStyles = 'rounded-lg transition-all duration-200 bg-secondary text-text-primary min-w-0 w-full'
    
    // Per-variant: default/elevated = borderless (shadow); dark mode uses subtle border + shadow for separation
    // outlined = thin border in both modes; filled = borderless accent
    const variants = {
      default:
        'shadow-sm dark:shadow-[0_1px_2px_rgba(0,0,0,0.4)] dark:border dark:border-white/[0.06]',
      elevated:
        'shadow-md dark:shadow-[0_4px_12px_rgba(0,0,0,0.4)] dark:border dark:border-white/[0.08]',
      outlined:
        'border border-default/25 shadow-none dark:border-white/10',
      filled:
        'bg-tertiary text-text-inverse shadow-sm dark:border-0 dark:shadow-[0_1px_2px_rgba(0,0,0,0.3)]',
    }

    const paddings = {
      none: 'p-0',
      sm: 'p-4 sm:p-5',
      md: 'p-4 sm:p-5 md:p-6',
      lg: 'p-5 sm:p-6 md:p-8 lg:p-8',
    }

    const interactiveStyles = interactive
      ? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2 focus:ring-offset-secondary dark:hover:shadow-lg dark:focus:ring-offset-secondary'
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
        className={cn('flex flex-col space-y-1 mb-4 sm:mb-6', className)}
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
        className={cn('text-lg font-semibold leading-tight tracking-tight text-text-primary sm:text-xl', className)}
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
        className={cn('text-sm leading-relaxed text-text-secondary', className)}
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
        className={cn('text-text-primary', className)}
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
        className={cn(
          'flex flex-wrap items-center gap-2 sm:gap-3 mt-4 pt-4 sm:mt-6 sm:pt-6 border-t border-default/15 dark:border-white/[0.08]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto'
}

export const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  ({ className, src, alt, aspectRatio = 'auto', ...props }, ref) => {
    const aspectRatios = {
      square: 'aspect-square',
      video: 'aspect-video',
      wide: 'aspect-[21/9]',
      auto: '',
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(
          'w-full max-w-full h-auto object-cover rounded-t-lg',
          aspectRatios[aspectRatio],
          className
        )}
        {...props}
      />
    )
  }
)

CardImage.displayName = 'CardImage'

export interface CardActionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardAction = React.forwardRef<HTMLDivElement, CardActionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-shrink-0 items-center gap-2', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardAction.displayName = 'CardAction'
