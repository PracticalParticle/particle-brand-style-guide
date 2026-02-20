import React from 'react'
import { cn } from '@/utils/cn'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled' | 'glass' | 'on-gradient'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  interactive?: boolean
  children: React.ReactNode
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      interactive = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      'rounded-card transition-all duration-normal ease-out',
      'bg-bg-secondary text-text-primary min-w-0 w-full break-words',
      'flex flex-col min-h-0',
    ].join(' ')

    const variants = {
      /* Default: subtle shadow only, no border */
      default: 'shadow-subtle border-0',

      /* Outlined: border only, no shadow */
      outlined: 'border border-border shadow-none bg-bg-secondary',

      /* Elevated: clearly raised with stronger shadow */
      elevated: [
        'border-0 shadow-elevated',
        'dark:shadow-[0_8px_30px_rgba(0,0,0,0.25),0_2px_8px_rgba(0,0,0,0.15)]',
      ].join(' '),

      /* Filled: solid block; all text inverse for visibility. Buttons get inverse context in all modes. */
      filled: [
        'border-0 bg-btn-primary text-text-inverse shadow-elevated',
        '[&_.card-title]:!text-text-inverse [&_.card-description]:!text-white/90',
        '[&_p]:text-white/90',
        /* All buttons: force inverse text so they’re visible on the card in light and dark */
        '[&_button]:!text-text-inverse',
        /* Primary: inverse block (white in light, black in dark) */
        '[&_button[data-variant="primary"]]:!bg-text-inverse [&_button[data-variant="primary"]]:!text-btn-primary',
        '[&_button[data-variant="primary"]:hover]:!bg-text-inverse/90 [&_button[data-variant="primary"]:hover]:!text-btn-primary',
        '[&_button[data-variant="primary"]:active]:!bg-text-inverse/80',
        /* Secondary: transparent, inverse border + text, subtle fill on hover */
        '[&_button[data-variant="secondary"]]:!border [&_button[data-variant="secondary"]]:!border-text-inverse/70 [&_button[data-variant="secondary"]]:!bg-transparent',
        '[&_button[data-variant="secondary"]:hover]:!border-text-inverse [&_button[data-variant="secondary"]:hover]:!bg-white/15 dark:[&_button[data-variant="secondary"]:hover]:!bg-black/15',
        /* Outline: same as secondary for filled context */
        '[&_button[data-variant="outline"]]:!border [&_button[data-variant="outline"]]:!border-text-inverse/70 [&_button[data-variant="outline"]]:!bg-transparent',
        '[&_button[data-variant="outline"]:hover]:!border-text-inverse [&_button[data-variant="outline"]:hover]:!bg-white/15 dark:[&_button[data-variant="outline"]:hover]:!bg-black/15',
        /* Ghost / link: inverse text, subtle fill on hover */
        '[&_button[data-variant="ghost"]]:hover:!bg-white/15 dark:[&_button[data-variant="ghost"]]:hover:!bg-black/15',
        '[&_button[data-variant="link"]]:hover:!bg-transparent',
        /* Danger: keep semantic color but ensure text visible; optional override if needed */
        '[&_button[data-variant="danger"]]:!text-text-inverse [&_button[data-variant="danger"]]:!border-text-inverse/70',
      ].join(' '),

      /* Glass: translucent + backdrop blur */
      glass: [
        'bg-white/70 dark:bg-bg-secondary/50 backdrop-blur-xl border border-border/60 shadow-subtle',
      ].join(' '),

      /* On-gradient: near-opaque surface for use on gradient backgrounds */
      'on-gradient': [
        'bg-bg-secondary/95 dark:bg-bg-secondary/90 backdrop-blur-sm border border-border shadow-elevated',
      ].join(' '),
    }

    const paddings = {
      none: 'p-0',
      sm: 'p-4 sm:p-5',
      md: 'p-5 sm:p-6',
      lg: 'p-6 sm:p-8',
    }

    const interactiveStyles = interactive
      ? [
          'cursor-pointer',
          'hover:shadow-elevated hover:-translate-y-0.5',
          'focus-ring',
        ].join(' ')
      : ''

    return (
      <div
        ref={ref}
        data-glass={variant === 'glass' || variant === 'on-gradient' ? '' : undefined}
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          interactiveStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1 mb-4 sm:mb-5', className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardHeader.displayName = 'CardHeader'

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3 ref={ref} className={cn('card-title', className)} {...props}>
      {children}
    </h3>
  )
)
CardTitle.displayName = 'CardTitle'

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm leading-relaxed text-text-secondary card-description', className)}
    {...props}
  >
    {children}
  </p>
))
CardDescription.displayName = 'CardDescription'

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 min-h-0', className)} {...props}>
      {children}
    </div>
  )
)
CardContent.displayName = 'CardContent'

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-wrap items-center justify-end gap-2 sm:gap-3 mt-4 pt-4 sm:mt-5 sm:pt-5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
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
          'w-full max-w-full h-auto object-cover rounded-t-card',
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
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-shrink-0 items-center gap-2', className)} {...props}>
      {children}
    </div>
  )
)
CardAction.displayName = 'CardAction'
