import React from 'react'
import { cn } from '@/utils/cn'

function getInitials(name: string, maxWords = 2): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, maxWords)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image URL. When missing, fallback (initials or children) is shown. */
  src?: string | null
  /** Alt text for the image (required when src is provided for accessibility). */
  alt?: string
  /** Name used to generate initials when src is missing or fails to load. */
  name?: string
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Shape */
  shape?: 'circle' | 'rounded'
  /** Optional custom fallback (e.g. icon). When not provided, initials from name or "?" are used. */
  fallback?: React.ReactNode
}

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
  '2xl': 'w-20 h-20 text-xl',
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      name,
      size = 'md',
      shape = 'circle',
      fallback,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [imgFailed, setImgFailed] = React.useState(false)
    const showImg = Boolean(src && !imgFailed)
    const initials = name ? getInitials(name) : (children ? String(children).slice(0, 2).toUpperCase() : '?')
    const displayFallback = fallback ?? initials

    return (
      <div
        ref={ref}
        role="img"
        aria-label={alt || name || undefined}
        className={cn(
          'inline-flex items-center justify-center font-medium shrink-0 overflow-hidden bg-tertiary-lighter text-tertiary border border-border',
          shape === 'circle' && 'rounded-full',
          shape === 'rounded' && 'rounded-lg',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {showImg ? (
          <img
            src={src!}
            alt={alt}
            className={cn('w-full h-full object-cover', shape === 'circle' && 'rounded-full', shape === 'rounded' && 'rounded-lg')}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="select-none" aria-hidden>
            {displayFallback}
          </span>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'
