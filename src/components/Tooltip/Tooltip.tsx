import React, { useState, useRef, useLayoutEffect, useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/utils/cn'

const TOOLTIP_GAP = 8
const VIEWPORT_PADDING = 12

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export type TooltipVariant = 'default' | 'light' | 'subtle'

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  placement?: TooltipPlacement
  /** Flip placement when there's not enough space. Default true. */
  collisionPadding?: boolean
  delay?: number
  disabled?: boolean
  /** Visual style: default (dark), light (surface), subtle (muted). */
  variant?: TooltipVariant
  /** Show arrow pointing to trigger. Default true. */
  showArrow?: boolean
  /** Render in portal (document.body). Default true. */
  usePortal?: boolean
  /** Max width; content wraps. Default 240px. */
  maxWidth?: number | string
  className?: string
}

const placementAnimations: Record<TooltipPlacement, string> = {
  top: 'animate-popover-top',
  bottom: 'animate-popover-bottom',
  left: 'animate-popover-left',
  right: 'animate-popover-right',
}

/* Variants: shadow only (no border) so box and arrow look unified – see globals.css */
const variantStyles: Record<TooltipVariant, string> = {
  default: 'bg-bg-secondary text-text-primary shadow-lg',
  light: 'bg-bg-secondary text-text-primary shadow-xl',
  subtle: 'bg-bg-tertiary/[var(--tooltip-subtle-opacity)] text-text-primary shadow-lg',
}

const arrowVariantStyles: Record<TooltipVariant, string> = {
  default: 'bg-bg-secondary',
  light: 'bg-bg-secondary',
  subtle: 'bg-bg-tertiary/[var(--tooltip-subtle-opacity)]',
}

function getViewportRect() {
  return {
    top: 0,
    left: 0,
    right: typeof window !== 'undefined' ? window.innerWidth : 1024,
    bottom: typeof window !== 'undefined' ? window.innerHeight : 768,
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  }
}

function computePosition(
  triggerRect: DOMRect,
  tooltipWidth: number,
  tooltipHeight: number,
  preferred: TooltipPlacement,
  padding: number
): { top: number; left: number; placement: TooltipPlacement } {
  const vp = getViewportRect()
  const vpTop = vp.top + padding
  const vpBottom = vp.bottom - padding
  const vpLeft = vp.left + padding
  const vpRight = vp.right - padding

  let placement = preferred
  let top = 0
  let left = 0

  const triggerCenterX = triggerRect.left + triggerRect.width / 2
  const triggerCenterY = triggerRect.top + triggerRect.height / 2

  const tryPlacement = (p: TooltipPlacement) => {
    switch (p) {
      case 'top':
        top = triggerRect.top - tooltipHeight - TOOLTIP_GAP
        left = triggerCenterX - tooltipWidth / 2
        break
      case 'bottom':
        top = triggerRect.bottom + TOOLTIP_GAP
        left = triggerCenterX - tooltipWidth / 2
        break
      case 'left':
        top = triggerCenterY - tooltipHeight / 2
        left = triggerRect.left - tooltipWidth - TOOLTIP_GAP
        break
      case 'right':
        top = triggerCenterY - tooltipHeight / 2
        left = triggerRect.right + TOOLTIP_GAP
        break
    }
  }

  tryPlacement(placement)

  if (placement === 'bottom' && top + tooltipHeight > vpBottom && triggerRect.top - tooltipHeight - TOOLTIP_GAP >= vpTop) {
    placement = 'top'
    tryPlacement('top')
  } else if (placement === 'top' && top < vpTop && triggerRect.bottom + TOOLTIP_GAP + tooltipHeight <= vpBottom) {
    placement = 'bottom'
    tryPlacement('bottom')
  } else if (placement === 'right' && left + tooltipWidth > vpRight && triggerRect.left - tooltipWidth - TOOLTIP_GAP >= vpLeft) {
    placement = 'left'
    tryPlacement('left')
  } else if (placement === 'left' && left < vpLeft && triggerRect.right + TOOLTIP_GAP + tooltipWidth <= vpRight) {
    placement = 'right'
    tryPlacement('right')
  }

  left = Math.max(vpLeft, Math.min(vpRight - tooltipWidth, left))
  top = Math.max(vpTop, Math.min(vpBottom - tooltipHeight, top))

  return { top, left, placement }
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  collisionPadding = true,
  delay = 200,
  disabled = false,
  variant = 'default',
  showArrow = true,
  usePortal = true,
  maxWidth = 240,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null)
  const [effectivePlacement, setEffectivePlacement] = useState<TooltipPlacement>(placement)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement>(null)
  const tooltipId = useId()

  useLayoutEffect(() => {
    if (!isVisible || !tooltipRef.current || !triggerRef.current) {
      setPosition(null)
      return
    }
    const tooltipEl = tooltipRef.current
    const triggerEl = triggerRef.current
    const triggerRect = triggerEl.getBoundingClientRect()
    const padding = collisionPadding ? VIEWPORT_PADDING : 0
    const result = computePosition(
      triggerRect,
      tooltipEl.offsetWidth,
      tooltipEl.offsetHeight,
      placement,
      padding
    )
    setPosition({ top: result.top, left: result.left })
    setEffectivePlacement(result.placement)
  }, [isVisible, placement, collisionPadding])

  const show = () => {
    if (disabled) return
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay)
  }

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsVisible(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const maxWidthStyle = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth

  const tooltipContent = isVisible && !disabled && (
    <div
      ref={tooltipRef}
      id={tooltipId}
      className={cn(
        'fixed z-50 text-sm pointer-events-none',
        'px-[var(--tooltip-padding-x)] py-[var(--tooltip-padding-y)]',
        'rounded-[var(--tooltip-radius)]',
        'max-w-[min(calc(100vw-2rem),var(--tooltip-max-width))]',
        variantStyles[variant],
        placementAnimations[effectivePlacement],
        className
      )}
      style={{
        top: position ? `${position.top}px` : '-9999px',
        left: position ? `${position.left}px` : '-9999px',
        visibility: position ? 'visible' : 'hidden',
        ...(maxWidth !== 240 ? { ['--tooltip-max-width' as string]: maxWidthStyle } : {}),
      }}
      role="tooltip"
    >
      {content}
      {showArrow && (
        <div
          className={cn(
            'absolute rotate-45 w-[var(--tooltip-arrow-size)] h-[var(--tooltip-arrow-size)]',
            arrowVariantStyles[variant],
            effectivePlacement === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2',
            effectivePlacement === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2',
            effectivePlacement === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2',
            effectivePlacement === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2'
          )}
          aria-hidden
        />
      )}
    </div>
  )

  // Compose existing trigger props with our handlers/ref
  const childProps = children.props as Record<string, unknown>
  const existingOnMouseEnter = childProps.onMouseEnter as React.MouseEventHandler | undefined
  const existingOnMouseLeave = childProps.onMouseLeave as React.MouseEventHandler | undefined
  const existingOnFocus = childProps.onFocus as React.FocusEventHandler | undefined
  const existingOnBlur = childProps.onBlur as React.FocusEventHandler | undefined
  const existingRef = (children as React.ReactElement & { ref?: React.Ref<unknown> }).ref

  const mergeRefs = (...refs: React.Ref<unknown>[]) => (node: unknown) => {
    refs.forEach((r) => {
      if (!r) return
      if (typeof r === 'function') r(node)
      else (r as React.MutableRefObject<unknown>).current = node
    })
  }

  return (
    <>
      {React.cloneElement(children, {
        ref: mergeRefs(triggerRef as React.Ref<unknown>, existingRef as React.Ref<unknown>),
        onMouseEnter: (e: React.MouseEvent) => { existingOnMouseEnter?.(e); show() },
        onMouseLeave: (e: React.MouseEvent) => { existingOnMouseLeave?.(e); hide() },
        onFocus: (e: React.FocusEvent) => { existingOnFocus?.(e); show() },
        onBlur: (e: React.FocusEvent) => { existingOnBlur?.(e); hide() },
        'aria-describedby': isVisible ? tooltipId : undefined,
      })}
      {usePortal && typeof document !== 'undefined'
        ? createPortal(tooltipContent, document.body)
        : tooltipContent}
    </>
  )
}

Tooltip.displayName = 'Tooltip'
