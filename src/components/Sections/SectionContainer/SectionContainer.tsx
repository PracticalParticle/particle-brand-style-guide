import React from 'react'
import { cn } from '@/utils/cn'

export interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max width: narrow (prose), default, wide, full */
  maxWidth?: 'narrow' | 'default' | 'wide' | 'full'
  /** Horizontal padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const maxWidthClasses = {
  narrow: 'max-w-2xl',
  default: 'max-w-4xl',
  wide: 'max-w-6xl',
  full: 'max-w-full',
}

const paddingClasses = {
  none: 'px-0',
  sm: 'px-4 sm:px-5',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-6 sm:px-8 lg:px-12',
}

/**
 * Wrapper for section content. Use in your app to get consistent max-width and
 * horizontal padding. Sections (Hero, Features, etc.) already include internal
 * padding; use SectionContainer when you want to constrain or center a group
 * of sections or custom content.
 */
export const SectionContainer: React.FC<SectionContainerProps> = ({
  maxWidth = 'default',
  padding = 'md',
  className,
  children,
  ...props
}) => (
  <div
    className={cn('mx-auto w-full', maxWidthClasses[maxWidth], paddingClasses[padding], className)}
    {...props}
  >
    {children}
  </div>
)

SectionContainer.displayName = 'SectionContainer'
