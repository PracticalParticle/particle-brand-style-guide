import React from 'react'
import { cn } from '@/utils/cn'
import { SectionHeader } from '../SectionHeader'

export interface MediaSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Section title (e.g. "Watch the overview") */
  title: React.ReactNode
  /** Optional subtitle */
  subtitle?: React.ReactNode
  /** Header alignment */
  alignment?: 'left' | 'center' | 'right'
  /** Media content: iframe, video, image, or custom element */
  children: React.ReactNode
  /** Max width of the media container */
  maxWidth?: 'md' | 'lg' | 'xl' | 'full'
}

const maxWidthClasses = {
  md: 'max-w-3xl',
  lg: 'max-w-4xl',
  xl: 'max-w-5xl',
  full: 'max-w-full',
}

/**
 * Section with a header (title + subtitle) and a media area below. Use for video embeds,
 * screenshots, or any focal media. Concept from landing layouts; styled with design tokens.
 */
export const MediaSection: React.FC<MediaSectionProps> = ({
  title,
  subtitle,
  alignment = 'center',
  children,
  maxWidth = 'xl',
  className,
  ...props
}) => (
  <section
    className={cn('py-12 sm:py-16 px-4 sm:px-6 lg:px-8', className)}
    aria-labelledby="media-section-title"
    {...props}
  >
    <div className="mx-auto w-full max-w-6xl">
      <SectionHeader
        id="media-section-title"
        title={title}
        subtitle={subtitle}
        alignment={alignment}
        className={alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : ''}
      />
      <div
        className={cn(
          'mx-auto rounded-card overflow-hidden border border-border bg-bg-surface shadow-subtle',
          maxWidthClasses[maxWidth]
        )}
      >
        {children}
      </div>
    </div>
  </section>
)

MediaSection.displayName = 'MediaSection'
