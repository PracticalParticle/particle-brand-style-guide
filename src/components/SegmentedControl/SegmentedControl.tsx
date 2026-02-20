import React, { useRef, useLayoutEffect, useState } from 'react'
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
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  const [thumb, setThumb] = useState<{ left: number; width: number } | null>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    const activeBtn = buttonRefs.current.get(value)
    if (!container || !activeBtn) return
    const cRect = container.getBoundingClientRect()
    const bRect = activeBtn.getBoundingClientRect()
    setThumb({ left: bRect.left - cRect.left, width: bRect.width })
  }, [value, size, fullWidth])

  const containerPad = { sm: 'p-0.5', md: 'p-1', lg: 'p-1.5' }[size]

  const buttonSize = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-sm',
  }[size]

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label={name}
      className={cn(
        'relative inline-flex rounded-control border border-border bg-bg-tertiary',
        containerPad,
        fullWidth && 'w-full',
        className
      )}
    >
      {/* Sliding pill thumb */}
      {thumb && (
        <span
          aria-hidden
          className="absolute top-1 bottom-1 rounded-inset bg-bg-secondary shadow-sm pointer-events-none z-0"
          style={{
            left:       thumb.left,
            width:      thumb.width,
            transition: 'left 220ms cubic-bezier(0.16,1,0.3,1), width 220ms cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      )}

      {options.map((opt) => {
        const isSelected = value === opt.value
        const isDisabled = disabled || opt.disabled
        return (
          <button
            key={opt.value}
            ref={(el) => {
              if (el) buttonRefs.current.set(opt.value, el)
              else buttonRefs.current.delete(opt.value)
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            className={cn(
              'relative z-10 flex flex-1 items-center justify-center gap-1.5',
              'font-medium rounded-inset select-none',
              'transition-colors duration-brand ease-brand',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-1 focus-visible:ring-offset-bg-tertiary',
              buttonSize,
              isSelected
                ? 'text-text-primary'
                : 'text-text-secondary hover:text-text-primary',
              isDisabled && 'opacity-40 cursor-not-allowed pointer-events-none'
            )}
            onClick={() => !isDisabled && onValueChange(opt.value)}
          >
            {opt.icon && (
              <span className="shrink-0 [&>svg]:w-4 [&>svg]:h-4" aria-hidden>
                {opt.icon}
              </span>
            )}
            <span className="truncate">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}

SegmentedControl.displayName = 'SegmentedControl'
