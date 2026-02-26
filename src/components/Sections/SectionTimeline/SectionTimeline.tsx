import React, { useId } from 'react'
import { cn } from '@/utils/cn'

export interface TimelineItem {
  /** Optional step number or icon */
  step?: React.ReactNode
  /** Step title */
  title: React.ReactNode
  /** Step description */
  description?: React.ReactNode
}

export interface SectionTimelineProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Section heading */
  title?: React.ReactNode
  /** Optional section-level description */
  description?: React.ReactNode
  /** Timeline steps */
  items: TimelineItem[]
  /** Show vertical connector line between steps */
  showConnector?: boolean
  /** Use a solid muted background for the section */
  withBackgroundPattern?: boolean
  /** Show divider line between section header and timeline */
  showHeaderDivider?: boolean
  /** Max width of the timeline content */
  maxWidth?: 'sm' | 'md' | 'lg' | 'full'
}

const maxWidthMap = {
  sm: 'max-w-2xl',
  md: 'max-w-3xl',
  lg: 'max-w-4xl',
  full: 'max-w-none',
} as const

export const SectionTimeline: React.FC<SectionTimelineProps> = ({
  title,
  description,
  items,
  showConnector = true,
  withBackgroundPattern = false,
  showHeaderDivider = true,
  maxWidth = 'md',
  className,
  ...props
}) => {
  const headingId = useId()

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
        <div className={cn(maxWidthMap[maxWidth], 'mx-auto')}>
          <ol className="relative space-y-0">
            {items.map((item, index) => (
              <li
                key={index}
                className={cn(
                  'relative flex gap-4 sm:gap-6 pb-10 last:pb-0',
                  showConnector && index < items.length - 1 && 'before:absolute before:left-3 sm:before:left-5 before:top-6 sm:before:top-10 before:bottom-0 before:w-px before:bg-border'
                )}
              >
                <div className="flex h-6 w-6 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border-2 border-border bg-bg-secondary text-sm font-semibold text-text-primary">
                  {item.step ?? index + 1}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="text-lg font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-body-secondary text-text-secondary">
                      {item.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

SectionTimeline.displayName = 'SectionTimeline'
