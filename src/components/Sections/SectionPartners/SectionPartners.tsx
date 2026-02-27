import React, { useId } from 'react'
import { cn } from '@/utils/cn'
import { GeometricMeshBg } from '../ComingSoon/ComingSoon'

export interface PartnerBlock {
  /** Optional label above the block (e.g. "Supported by", "Security & Assurance") */
  label?: React.ReactNode
  /** Block content: logos, text, or custom React node */
  content: React.ReactNode
}

export interface SectionPartnersProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Section heading (h2) */
  title?: React.ReactNode
  /** Optional section-level description */
  description?: React.ReactNode
  /** Content blocks shown in a row (e.g. logo group, text block, text block) */
  blocks: PartnerBlock[]
  /** Text and block alignment */
  alignment?: 'left' | 'center'
  /** Background: mesh (GeometricMeshBg), muted, or minimal */
  variant?: 'mesh' | 'muted' | 'minimal'
  /** Show divider line between section header and blocks */
  showHeaderDivider?: boolean
}

export const SectionPartners: React.FC<SectionPartnersProps> = ({
  title,
  description,
  blocks,
  alignment = 'left',
  variant = 'mesh',
  showHeaderDivider = true,
  className,
  ...props
}) => {
  const headingId = useId()
  const isCenter = alignment === 'center'

  return (
    <section
      className={cn(
        'relative overflow-hidden py-12 sm:py-16',
        variant === 'mesh' && 'edge-highlight',
        variant === 'muted' && 'bg-bg-surface-muted',
        className
      )}
      aria-labelledby={title ? headingId : undefined}
      {...props}
    >
      {variant === 'mesh' && (
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
          <GeometricMeshBg />
        </div>
      )}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {(title || description) && (
          <div
            className={cn(
              'mb-10 sm:mb-12 max-w-3xl',
              isCenter ? 'text-center mx-auto' : 'text-left'
            )}
          >
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
                  variant === 'mesh' && 'dark:border-[rgb(255_255_255/0.12)]'
                )}
                aria-hidden
              />
            )}
          </div>
        )}
        <div
          className={cn(
            'flex flex-col gap-10 md:flex-row md:items-start md:gap-16',
            isCenter ? 'md:justify-center' : 'md:justify-start'
          )}
        >
          {blocks.map((block, index) => (
            <div
              key={index}
              className={cn(
                'min-w-0',
                isCenter ? 'text-center md:text-center' : 'text-left'
              )}
            >
              {block.label != null && block.label !== '' && (
                <p className="text-xs font-semibold tracking-wide text-text-tertiary uppercase mb-2">
                  {block.label}
                </p>
              )}
              <div className={cn(block.label != null && block.label !== '' && 'mt-0')}>
                {block.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

SectionPartners.displayName = 'SectionPartners'
