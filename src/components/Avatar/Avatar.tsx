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

type AvatarPropsWithSrc = {
  src: string
  /** Alt text is required when src is provided. */
  alt: string
}

type AvatarPropsWithoutSrc = {
  src?: null
  alt?: string
}

export type AvatarProps = React.HTMLAttributes<HTMLDivElement> & (AvatarPropsWithSrc | AvatarPropsWithoutSrc) & {
  /** Name used to generate initials when src is missing or fails to load. */
  name?: string
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Shape */
  shape?: 'circle' | 'rounded'
  /** Optional custom fallback (e.g. icon or element). When not provided, initials from name or "?" are used. */
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

    React.useEffect(() => {
      setImgFailed(false)
    }, [src])

    const showImg = Boolean(src && !imgFailed)

    // Prefer explicit fallback, then children (rendered directly), then name initials, then "?"
    const displayFallback: React.ReactNode =
      fallback ?? (children ?? (name ? getInitials(name) : '?'))

    // Accessible name: alt, name, or fallback text when it's a string (so screen readers get an alternative when showing fallback)
    const ariaLabel =
      alt || name || (typeof displayFallback === 'string' ? displayFallback : undefined)

    return (
      <div
        ref={ref}
        role="img"
        aria-label={ariaLabel}
        className={cn(
          'inline-flex items-center justify-center font-medium shrink-0 overflow-hidden',
          'bg-tertiary-lighter border border-border',
          'text-tertiary dark:text-tertiary-on-dark',
          'transition-colors duration-[220ms]',
          shape === 'circle' && 'rounded-full',
          shape === 'rounded' && 'rounded-xl',
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
          <span className="select-none" aria-hidden={!!ariaLabel}>
            {displayFallback}
          </span>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'
