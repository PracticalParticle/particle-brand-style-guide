import React, { useId } from 'react'
import { cn } from '@/utils/cn'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/Accordion'

export interface FaqItem {
  /** Unique value for accordion state (e.g. slug or id) */
  value: string
  /** Question / trigger label */
  question: React.ReactNode
  /** Answer content */
  answer: React.ReactNode
}

export interface SectionFaqProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Section heading */
  title?: React.ReactNode
  /** Optional section-level description */
  description?: React.ReactNode
  /** FAQ items */
  items: FaqItem[]
  /** Allow multiple panels open at once */
  type?: 'single' | 'multiple'
  /** Use a solid muted background for the section */
  withBackgroundPattern?: boolean
  /** Show divider line between section header and FAQ */
  showHeaderDivider?: boolean
  /** Max width of the accordion content */
  maxWidth?: 'sm' | 'md' | 'lg' | 'full'
}

const maxWidthMap = {
  sm: 'max-w-2xl',
  md: 'max-w-3xl',
  lg: 'max-w-4xl',
  full: 'max-w-none',
} as const

export const SectionFaq: React.FC<SectionFaqProps> = ({
  title,
  description,
  items,
  type = 'single',
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
          <Accordion type={type}>
            {items.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger value={item.value}>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent value={item.value}>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

SectionFaq.displayName = 'SectionFaq'
