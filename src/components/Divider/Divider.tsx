import React from 'react'
import { cn } from '@/utils/cn'

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Horizontal (default) or vertical. Vertical requires a flex parent with height. */
  orientation?: 'horizontal' | 'vertical'
  /** Visual weight: subtle (default), default, strong */
  variant?: 'subtle' | 'default' | 'strong'
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation = 'horizontal', variant = 'default', ...props }, ref) => {
    const base = 'border-0 border-solid shrink-0'
    const orientationStyles =
      orientation === 'horizontal'
        ? 'w-full border-t'
        : 'h-full border-l self-stretch min-h-6'
    const variants = {
      subtle: 'border-border/70',
      default: 'border-border',
      strong: 'border-text-secondary',
    }
    return (
      <hr
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(base, orientationStyles, variants[variant], className)}
        {...props}
      />
    )
  }
)

Divider.displayName = 'Divider'
