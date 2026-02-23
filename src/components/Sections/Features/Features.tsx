import React from 'react'
import { cn } from '@/utils/cn'

export interface FeatureItem {
  /** Optional icon or illustration */
  icon?: React.ReactNode
  /** Feature title */
  title: React.ReactNode
  /** Short description */
  description?: React.ReactNode
}

export interface FeaturesProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Section heading */
  title?: React.ReactNode
  /** Optional section-level description */
  description?: React.ReactNode
  /** List of features (used when no children provided) */
  items?: FeatureItem[]
  /** Custom content instead of items (e.g. custom cards) */
  children?: React.ReactNode
  /** Number of columns on larger screens */
  columns?: 2 | 3 | 4
  /** Card style: each feature in a card, or list (bordered, minimal) */
  variant?: 'cards' | 'list' | 'minimal'
  /** Visual size of each feature block */
  size?: 'sm' | 'md' | 'lg'
  /** Use a solid muted background for the section (accessible, no gradient) */
  withBackgroundPattern?: boolean
  /** Show divider line between section header and grid */
  showHeaderDivider?: boolean
}

export const Features: React.FC<FeaturesProps> = ({
  title,
  description,
  items = [],
  children,
  columns = 3,
  variant = 'cards',
  size = 'md',
  withBackgroundPattern = false,
  showHeaderDivider = true,
  className,
  ...props
}) => {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }
  const paddingY = {
    sm: 'py-8',
    md: 'py-10 sm:py-12',
    lg: 'py-12 sm:py-16',
  }
  const gap = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  }
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }
  const titleSizes = {
    sm: 'text-base font-semibold',
    md: 'text-lg font-semibold',
    lg: 'text-xl font-semibold',
  }

  const cardClass =
    variant === 'cards'
      ? 'rounded-card bg-bg-secondary edge-highlight border border-border shadow-subtle p-5 sm:p-6 transition-shadow duration-normal hover:shadow-elevated dark:hover:shadow-elevated-dark'
      : variant === 'list'
        ? 'rounded-card border border-border p-5 sm:p-6 bg-bg-surface hover:bg-bg-surface-muted/50 transition-colors duration-normal'
        : 'p-2'

  const iconWellSizes = { sm: 'icon-well-sm', md: 'icon-well-md', lg: 'icon-well-lg' }

  const featureContent = (item: FeatureItem, index: number) => (
    <div key={index} className={cn('flex flex-col text-left', cardClass)}>
      {item.icon ? (
        <div
          className={cn(
            'flex items-center justify-center text-text-muted mb-3 sm:mb-4',
            iconSizes[size]
          )}
        >
          <span className={cn('icon-well', iconWellSizes[size])}>{item.icon}</span>
        </div>
      ) : null}
      <h3 className={cn('text-text-primary', titleSizes[size])}>
        {item.title}
      </h3>
      {item.description ? (
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          {item.description}
        </p>
      ) : null}
    </div>
  )

  return (
    <section
      className={cn(
        'relative',
        paddingY[size],
        withBackgroundPattern && 'bg-bg-surface-muted',
        className
      )}
      aria-labelledby={title ? 'features-heading' : undefined}
      {...props}
    >
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        {(title || description) && (
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            {title && (
              <h2
                id="features-heading"
                className="text-heading-2 text-text-primary"
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-body-secondary text-text-secondary">
                {description}
              </p>
            )}
            {showHeaderDivider && (
              <hr className="mt-8 border-0 border-t border-border" aria-hidden />
            )}
          </div>
        )}
        {children ? (
          <div className={cn('grid', gridCols[columns], gap[size])}>
            {children}
          </div>
        ) : (
          <div className={cn('grid', gridCols[columns], gap[size])}>
            {items.map((item, index) => featureContent(item, index))}
          </div>
        )}
      </div>
    </section>
  )
}

Features.displayName = 'Features'
