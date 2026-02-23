import React from 'react'
import { cn } from '@/utils/cn'
import { Badge } from '@/components/Badge'

export interface ComingSoonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Main heading; defaults to "Coming soon" */
  title?: React.ReactNode
  /** Supporting copy below the title */
  description?: React.ReactNode
  /** Optional primary CTA */
  primaryAction?: React.ReactNode
  /** Optional secondary CTA */
  secondaryAction?: React.ReactNode
  /**
   * Visual style (all use solid backgrounds for WCAG contrast):
   * - `gradient`: solid surface with subtle logo shapes (landing page)
   * - `muted`: soft surface
   * - `minimal`: no background
   */
  variant?: 'gradient' | 'muted' | 'minimal'
  /** Size: padding and typography scale */
  size?: 'sm' | 'md' | 'lg'
  /** Badge/chip above the title. Defaults to "Coming soon" when not provided. Pass null to hide. */
  badge?: React.ReactNode
  /** Use brand text gradient on title */
  titleGradient?: boolean
  /** Show subtle divider line at bottom */
  showDividerLine?: boolean
  /** Optional logo/mark rendered directly above the content block, visually attached to the section */
  logo?: React.ReactNode
  /** Extra content below actions */
  children?: React.ReactNode
}

/** Subtle logo triangle shapes for Coming Soon section background (theme-aware) */
const LogoShapesBg: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="184"
    height="145"
    viewBox="0 0 184 145"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M154.835 5.50982L164.913 0.515925L166.766 11.6095L176.141 67.7591L164.211 61.6595L156.688 16.6034L89.5761 49.8605L169.024 90.4807L166.42 74.8836L178.35 80.9833L180.954 96.5803L183.162 109.804L171.232 103.705L77.5631 55.8136L65.6329 49.7139L77.6461 43.761L154.835 5.50982Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.03191"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M44.604 77.5569L42.7085 82.6045L38.4258 79.329L16.7489 62.75L22.927 60.9779L40.3212 74.2814L52.9437 40.667L11.8005 52.4681L17.8218 57.0733L11.6436 58.8454L5.6223 54.2402L0.517081 50.3355L6.69518 48.5635L55.2031 34.65L61.3813 32.8779L59.1218 38.895L44.604 77.5569Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.03191"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M78.0453 90.6265L82.4609 84.6376L86.8765 90.6265L109.226 120.939H100.395L82.4609 96.6154L53.0557 136.498H111.866L105.658 128.078H114.489L120.697 136.498L125.961 143.638H117.13H47.7921H38.9609L44.2246 136.498L78.0453 90.6265Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.03191"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title = 'Coming soon',
  description,
  primaryAction,
  secondaryAction,
  variant = 'gradient',
  size = 'md',
  badge,
  titleGradient = false,
  showDividerLine = false,
  logo,
  className,
  children,
  ...props
}) => {
  const paddingY = {
    sm: 'py-14 sm:py-16',
    md: 'py-20 sm:py-24 lg:py-28',
    lg: 'py-24 sm:py-28 lg:py-32',
  }
  const paddingX = 'px-4 sm:px-6 lg:px-8'
  const titleSizes = {
    sm: 'text-display-lg',
    md: 'text-display-xl',
    lg: 'text-display-2xl',
  }
  const subtitleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  const badgeContent =
    badge !== undefined ? badge : <Badge variant="outline">Coming soon</Badge>

  const wrapperClass = cn(
    'relative overflow-hidden rounded-card',
    paddingY[size],
    paddingX,
    variant === 'gradient' && 'bg-bg-surface-muted edge-highlight',
    variant === 'muted' && 'bg-bg-surface-muted/80 edge-highlight',
    variant === 'minimal' && 'bg-transparent',
    className
  )

  return (
    <section
      className={wrapperClass}
      aria-labelledby="coming-soon-title"
      {...props}
    >
      {/* Subtle logo-shape background (gradient variant only) */}
      {variant === 'gradient' && (
        <div
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-card"
          aria-hidden
        >
          <div className="absolute -top-12 right-0 w-40 sm:w-48 opacity-[0.055] text-text-primary transform translate-x-1/4">
            <LogoShapesBg className="w-full h-auto" />
          </div>
          <div className="absolute bottom-0 -left-16 w-36 sm:w-44 opacity-[0.045] text-text-primary transform -translate-x-1/4 rotate-180">
            <LogoShapesBg className="w-full h-auto" />
          </div>
          <div className="absolute top-1/2 left-0 w-32 sm:w-40 opacity-[0.035] text-text-primary transform -translate-y-1/2 -translate-x-1/3">
            <LogoShapesBg className="w-full h-auto" />
          </div>
        </div>
      )}

      <div className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {logo != null && (
            <div className="mb-5 sm:mb-6 flex justify-center" aria-hidden>
              {logo}
            </div>
          )}
          {badgeContent != null && (
            <div className="mb-5 sm:mb-6 flex justify-center">
              {badgeContent}
            </div>
          )}
          <h1
            id="coming-soon-title"
            className={cn(
              'font-bold tracking-tight text-text-primary leading-tight',
              titleGradient && 'text-gradient-brand',
              titleSizes[size]
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                'mt-4 sm:mt-5 text-text-secondary max-w-2xl mx-auto leading-relaxed',
                subtitleSizes[size]
              )}
            >
              {description}
            </p>
          )}
          {(primaryAction || secondaryAction) && (
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 justify-center">
              {primaryAction}
              {secondaryAction}
            </div>
          )}
          {children && <div className="mt-8 sm:mt-10">{children}</div>}
        </div>
      </div>
      {showDividerLine && (
        <div
          className="absolute bottom-0 left-0 right-0 h-px border-t border-border/60"
          aria-hidden
        />
      )}
    </section>
  )
}

ComingSoon.displayName = 'ComingSoon'
