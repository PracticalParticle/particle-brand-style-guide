import React from 'react'
import { cn } from '@/utils/cn'

export interface SectionCtaProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Short headline (e.g. "Ready to get started?") */
  title: React.ReactNode
  /** Optional supporting line */
  description?: React.ReactNode
  /** Primary CTA (e.g. Button) */
  action: React.ReactNode
  /** Optional secondary action (link or button) */
  secondaryAction?: React.ReactNode
  /** Background: gradient (default), muted, or minimal */
  variant?: 'gradient' | 'muted' | 'minimal'
  /** Size affects padding and typography */
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}

export const SectionCta: React.FC<SectionCtaProps> = ({
  title,
  description,
  action,
  secondaryAction,
  variant = 'gradient',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const paddingY = {
    sm: 'py-8',
    md: 'py-10 sm:py-12',
    lg: 'py-12 sm:py-16',
  }
  const paddingX = 'px-4 sm:px-6 lg:px-8'
  const titleSizes = {
    sm: 'text-heading-4',
    md: 'text-heading-3',
    lg: 'text-heading-2',
  }

  const wrapperClass = cn(
    'relative rounded-card text-center',
    paddingY[size],
    paddingX,
    variant === 'gradient' && 'bg-gradient-hero triangle-pattern-hero texture-noise section-spotlight edge-highlight',
    variant === 'muted' && 'bg-bg-surface-muted/60 edge-highlight',
    variant === 'minimal' && 'bg-transparent',
    className
  )

  return (
    <section
      className={wrapperClass}
      aria-labelledby="section-cta-title"
      {...props}
    >
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2
          id="section-cta-title"
          className={cn('text-text-primary font-semibold', titleSizes[size])}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-body-secondary text-text-secondary">
            {description}
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {action}
          {secondaryAction}
        </div>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  )
}

SectionCta.displayName = 'SectionCta'
