import React, { useId } from 'react'
import { cn } from '@/utils/cn'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/Card'

export type ContentListCardVariant =
  | 'default'
  | 'elevated'
  | 'outlined'
  | 'filled'
  | 'glass'
  | 'on-gradient'

export interface ContentListItem {
  /** Optional icon or illustration */
  icon?: React.ReactNode
  /** Item title */
  title: React.ReactNode
  /** Description or body copy */
  description?: React.ReactNode
  /** Optional action (e.g. Button, link) rendered in card footer */
  action?: React.ReactNode
}

export interface ContentListProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Section heading */
  title?: React.ReactNode
  /** Optional section-level description */
  description?: React.ReactNode
  /** List items (each rendered as a stacked card) */
  items?: ContentListItem[]
  /** Card variant for each item */
  cardVariant?: ContentListCardVariant
  /** Visual size of each card block */
  size?: 'sm' | 'md' | 'lg'
  /** Description text size: sm = text-sm, md = text-base (body-secondary) */
  descriptionSize?: 'sm' | 'md'
  /** Use a solid muted background for the section */
  withBackgroundPattern?: boolean
  /** Show divider line between section header and list */
  showHeaderDivider?: boolean
  /** Max width of the list content (default: max-w-3xl for readable line length) */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const maxWidthMap = {
  sm: 'max-w-2xl',
  md: 'max-w-3xl',
  lg: 'max-w-4xl',
  xl: 'max-w-5xl',
  full: 'max-w-none',
} as const

export const ContentList: React.FC<ContentListProps> = ({
  title,
  description,
  items = [],
  cardVariant = 'outlined',
  size = 'md',
  descriptionSize = 'md',
  withBackgroundPattern = false,
  showHeaderDivider = true,
  maxWidth = 'md',
  className,
  ...props
}) => {
  const headingId = useId()
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
  const iconWellSizes = { sm: 'icon-well-sm', md: 'icon-well-md', lg: 'icon-well-lg' }
  const cardPadding = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'
  const descClass =
    descriptionSize === 'md'
      ? 'text-body-secondary text-text-secondary leading-relaxed'
      : 'text-sm text-text-secondary leading-relaxed'

  return (
    <section
      className={cn(
        'relative',
        paddingY[size],
        withBackgroundPattern && 'bg-bg-surface-muted',
        className
      )}
      aria-labelledby={title ? headingId : undefined}
      {...props}
    >
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        {(title || description) && (
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            {title && (
              <h2
                id={headingId}
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
              <hr
                className={cn(
                  'mt-8 border-0 border-t border-border',
                  withBackgroundPattern && 'dark:border-[rgb(255_255_255/0.12)]'
                )}
                aria-hidden
              />
            )}
          </div>
        )}
        <div className={cn('flex flex-col', gap[size], maxWidthMap[maxWidth], 'mx-auto')}>
          {items.map((item, index) => (
            <Card
              key={index}
              variant={cardVariant}
              padding={cardPadding}
              className="w-full min-w-0 text-left"
            >
              {item.icon && (
                <div
                  className={cn(
                    'flex items-center justify-center text-text-muted mb-3 sm:mb-4',
                    iconSizes[size]
                  )}
                >
                  <span className={cn('icon-well', iconWellSizes[size])}>
                    {item.icon}
                  </span>
                </div>
              )}
              <CardHeader className={item.icon ? undefined : 'mb-0'}>
                <CardTitle className={cn('text-text-primary', titleSizes[size])}>
                  {item.title}
                </CardTitle>
              </CardHeader>
              {item.description && (
                <CardContent className="mt-2">
                  <p className={cn(descClass)}>{item.description}</p>
                </CardContent>
              )}
              {item.action && (
                <CardFooter className="mt-4 pt-4 border-t border-border flex-wrap justify-start sm:justify-end">
                  {item.action}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

ContentList.displayName = 'ContentList'
