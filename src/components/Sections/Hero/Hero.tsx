import React from 'react'
import { cn } from '@/utils/cn'

export interface HeroProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Main headline */
  title: React.ReactNode
  /** Optional subhead or supporting line */
  subtitle?: React.ReactNode
  /** Optional badge or label above the title (e.g. "Now available", "Beta") */
  badge?: React.ReactNode
  /** Optional primary CTA */
  primaryAction?: React.ReactNode
  /** Optional secondary CTA (e.g. "Learn more") */
  secondaryAction?: React.ReactNode
  /** Optional visual: logo, illustration, or icon */
  visual?: React.ReactNode
  /** Size affects padding and typography scale */
  size?: 'sm' | 'md' | 'lg'
  /** Centered (default) or left-aligned content */
  align?: 'center' | 'left'
  /** Whether to use the gradient + pattern background (default) or a muted fill */
  variant?: 'gradient' | 'muted' | 'minimal'
  /** Use brand text gradient on title (display/marketing only) */
  titleGradient?: boolean
  /** Show subtle diagonal divider line at bottom of section */
  showDividerLine?: boolean
  children?: React.ReactNode
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  badge,
  primaryAction,
  secondaryAction,
  visual,
  size = 'md',
  align = 'center',
  variant = 'gradient',
  titleGradient = false,
  showDividerLine = false,
  className,
  children,
  ...props
}) => {
  const paddingY = {
    sm: 'py-10 sm:py-12',
    md: 'py-12 sm:py-16 lg:py-20',
    lg: 'py-16 sm:py-20 lg:py-24',
  }
  const titleSizes = {
    sm: 'text-display-lg',
    md: 'text-display-xl',
    lg: 'text-display-2xl',
  }
  const subtitleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  const isCenter = align === 'center'

  const wrapperClass = cn(
    'relative overflow-hidden rounded-card',
    paddingY[size],
    variant === 'gradient' && 'bg-gradient-hero triangle-pattern-hero texture-noise section-spotlight edge-highlight',
    variant === 'muted' && 'bg-bg-surface-muted/60 edge-highlight',
    variant === 'minimal' && 'bg-transparent',
    className
  )

  return (
    <section
      className={wrapperClass}
      aria-labelledby="hero-title"
      {...props}
    >
      {/* Same outer column as other sections: max-w-6xl + horizontal padding */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Inner content column: narrower for readability, centered or left within the 6xl strip */}
        <div
          className={cn(
            'max-w-3xl',
            isCenter ? 'mx-auto text-center' : 'mr-auto text-left'
          )}
        >
          {badge && (
            <div className={cn('mb-4 sm:mb-5', isCenter ? 'flex justify-center' : '')}>
              {badge}
            </div>
          )}
          {visual && (
            <div
              className={cn(
                'mb-6 sm:mb-8 flex items-center justify-center text-text-muted',
                isCenter ? 'mx-auto' : 'justify-start'
              )}
            >
              <span className="icon-well icon-well-lg">{visual}</span>
            </div>
          )}
          <h1
            id="hero-title"
            className={cn(
              'font-bold tracking-tight',
              titleGradient ? 'text-gradient-brand' : 'text-text-primary',
              titleSizes[size],
              isCenter ? '' : 'text-left'
            )}
          >
            {title}
          </h1>
        {subtitle && (
          <p
            className={cn(
              'mt-4 sm:mt-5 text-text-secondary font-medium',
              subtitleSizes[size],
              isCenter && 'max-w-2xl mx-auto'
            )}
          >
            {subtitle}
          </p>
        )}
        {(primaryAction || secondaryAction) && (
          <div
            className={cn(
              'mt-8 flex flex-wrap gap-3 sm:gap-4',
              isCenter ? 'justify-center' : 'justify-start'
            )}
          >
            {primaryAction}
            {secondaryAction}
          </div>
        )}
        {children && (
          <div className={cn('mt-8', isCenter ? 'mx-auto text-center' : '')}>
            {children}
          </div>
        )}
        </div>
      </div>
      {showDividerLine && (
        <div
          className="absolute bottom-0 left-0 right-0 h-px border-t border-border/60"
          aria-hidden
        />
      )}
    </section>
  )
}

Hero.displayName = 'Hero'
