import React, { useId } from 'react'
import { cn } from '@/utils/cn'

export interface LogoItem {
  /** Image source URL */
  src: string
  /** Alt text (required for accessibility) */
  alt: string
  /** Optional href (makes the logo a link) */
  href?: string
  /** Use a light/white background container for the logo (e.g. dark logos on light bg) */
  whiteBg?: boolean
}

export interface SectionLogosProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Section heading or label (e.g. "Trusted by", "Partners") */
  title?: React.ReactNode
  /** Optional section-level description */
  description?: React.ReactNode
  /** Logo items */
  items: LogoItem[]
  /** Max height of each logo image (default h-8) */
  logoHeight?: 'sm' | 'md' | 'lg'
  /** Use a solid muted background for the section */
  withBackgroundPattern?: boolean
  /** Show divider line between section header and logos */
  showHeaderDivider?: boolean
}

const logoHeightMap = {
  sm: 'h-6 max-h-6',
  md: 'h-8 sm:h-9 max-h-9',
  lg: 'h-10 sm:h-12 max-h-12',
} as const

export const SectionLogos: React.FC<SectionLogosProps> = ({
  title,
  description,
  items,
  logoHeight = 'md',
  withBackgroundPattern = false,
  showHeaderDivider = true,
  className,
  ...props
}) => {
  const headingId = useId()
  const imgClass = cn('w-auto object-contain', logoHeightMap[logoHeight])

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
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            {title && (
              <p
                id={headingId}
                className="text-xs font-semibold tracking-wide text-text-tertiary uppercase"
              >
                {title}
              </p>
            )}
            {description && (
              <p className="mt-2 text-body-secondary text-text-secondary">
                {description}
              </p>
            )}
            {showHeaderDivider && (
              <hr
                className={cn(
                  'mt-6 border-0 border-t border-border',
                  withBackgroundPattern && 'dark:border-[rgb(255_255_255/0.12)]'
                )}
                aria-hidden
              />
            )}
          </div>
        )}
        <div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10"
          role="list"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                'flex items-center justify-center shrink-0',
                item.whiteBg &&
                  'rounded-md bg-white px-4 py-2.5 border border-border'
              )}
              role="listitem"
            >
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring rounded"
                  aria-label={item.alt}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className={imgClass}
                    loading="lazy"
                  />
                </a>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className={imgClass}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

SectionLogos.displayName = 'SectionLogos'
