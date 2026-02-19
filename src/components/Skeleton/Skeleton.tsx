import React from 'react'
import { cn } from '@/utils/cn'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'none'
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
  className,
  style,
  ...props
}) => {
  const baseStyles = 'bg-tertiary'
  
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  const animations = {
    pulse: 'animate-pulse',
    wave: 'animate-[wave_1.6s_ease-in-out_infinite]',
    none: '',
  }

  const customStyle = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    ...style,
  }

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        animations[animation],
        className
      )}
      style={customStyle}
      {...props}
    />
  )
}

Skeleton.displayName = 'Skeleton'
