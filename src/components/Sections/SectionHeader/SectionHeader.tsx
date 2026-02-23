import React from 'react'
import { cn } from '@/utils/cn'

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Section title */
  title: React.ReactNode
  /** Optional subtitle or description */
  subtitle?: React.ReactNode
  /** Text alignment */
  alignment?: 'left' | 'center' | 'right'
  /** Optional id for the heading (for aria-labelledby on parent section) */
  id?: string
  /** Optional content after title/subtitle (e.g. actions) */
  children?: React.ReactNode
}

const alignmentMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const

/**
 * Reusable section header: title + optional subtitle. Use above Features, VideoSection,
 * ContactSection, or any content block. Styled with design tokens.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  alignment = 'center',
  id,
  className,
  children,
  ...props
}) => {
  const align = alignmentMap[alignment]
  return (
    <div
      className={cn('mb-10 sm:mb-12 max-w-3xl', align, className)}
      {...props}
    >
      <h2 id={id} className={cn('text-heading-2 text-text-primary', align)}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 text-body-secondary text-text-secondary', align)}>
          {subtitle}
        </p>
      )}
      {children && <div className={cn('mt-6', align)}>{children}</div>}
    </div>
  )
}

SectionHeader.displayName = 'SectionHeader'
