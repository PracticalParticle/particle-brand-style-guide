import React, { useId } from 'react'
import { cn } from '@/utils/cn'

export interface StatItem {
  /** Primary value (number or short string) */
  value: React.ReactNode
  /** Label or description below the value */
  label: React.ReactNode
}

export interface SectionStatsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Section heading */
  title?: React.ReactNode
  /** Optional section-level description */
  description?: React.ReactNode
  /** Stats to display (value + label per item) */
  items: StatItem[]
  /** Number of columns on larger screens (1–4) */
  columns?: 2 | 3 | 4
  /** Use bordered cells */
  bordered?: boolean
  /** Use a solid muted background for the section */
  withBackgroundPattern?: boolean
  /** Show divider line between section header and stats grid */
  showHeaderDivider?: boolean
}

export const SectionStats: React.FC<SectionStatsProps> = ({
  title,
  description,
  items,
  columns = 4,
  bordered = false,
  withBackgroundPattern = false,
  showHeaderDivider = true,
  className,
  ...props
}) => {
  const headingId = useId()
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }
  const cellClass = bordered
    ? 'rounded-card border border-border bg-bg-secondary p-5 sm:p-6 text-center'
    : 'text-center p-2 sm:p-4'

  return (
    <section
      className={cn(
        'relative py-10 sm:py-12',
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
              <h2 id={headingId} className="text-heading-2 text-text-primary">
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
        <div
          className={cn(
            'grid grid-cols-1 gap-4 sm:gap-6',
            gridCols[columns]
          )}
          role="list"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(cellClass)}
              role="listitem"
            >
              <div className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight">
                {item.value}
              </div>
              <div className="mt-1 text-sm text-text-secondary">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

SectionStats.displayName = 'SectionStats'
