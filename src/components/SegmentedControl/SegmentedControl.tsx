import React from 'react'
import { cn } from '@/utils/cn'

export interface SegmentedControlOption<T extends string = string> {
  value: T
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentedControlOption<T>[]
  value: T
  onValueChange: (value: T) => void
  /** Size. Default md. */
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
  className?: string
  name?: string
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onValueChange,
  size = 'md',
  disabled = false,
  fullWidth = false,
  className,
  name,
}: SegmentedControlProps<T>) {
  const sizeStyles = {
    sm: 'p-0.5 gap-0',
    md: 'p-1 gap-px',
    lg: 'p-1.5 gap-0.5',
  }

  const buttonSizeStyles = {
    sm: 'px-2.5 py-1 text-xs rounded-md',
    md: 'px-3 py-1.5 text-sm rounded-md',
    lg: 'px-4 py-2 text-sm rounded-lg',
  }

  return (
    <div
      role="group"
      aria-label={name}
      className={cn(
        'inline-flex rounded-lg border border-border bg-bg-tertiary p-1',
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {options.map((opt) => {
        const isSelected = value === opt.value
        const isDisabled = disabled || opt.disabled
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 font-medium transition-colors',
              buttonSizeStyles[size],
              isSelected
                ? 'bg-bg-secondary text-text-primary shadow-sm border border-primary'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50 border border-transparent',
              isDisabled && 'opacity-50 cursor-not-allowed'
            )}
            onClick={() => !isDisabled && onValueChange(opt.value)}
          >
            {opt.icon && <span className="shrink-0 [&>svg]:w-4 [&>svg]:h-4">{opt.icon}</span>}
            <span className="truncate">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}

SegmentedControl.displayName = 'SegmentedControl'
