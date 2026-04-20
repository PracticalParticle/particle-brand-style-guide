import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/utils/cn'

const POPOVER_GAP = 8
const VIEWPORT_PADDING = 12
const MOBILE_BREAKPOINT = 640

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface PopoverProps {
  content: React.ReactNode
  children: React.ReactElement
  placement?: PopoverPlacement
  /** When true, flips placement if there's not enough space (e.g. bottom → top). Default true. */
  collisionPadding?: boolean
  trigger?: 'click' | 'hover'
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  /** Render popover in a portal (document.body). Recommended for correct z-index and overflow. Default true. */
  usePortal?: boolean
  /** Max width on small screens so popover doesn't overflow. Default 280px. */
  maxWidthMobile?: number | string
}

const placementAnimations: Record<PopoverPlacement, string> = {
  top: 'animate-popover-top',
  bottom: 'animate-popover-bottom',
  left: 'animate-popover-left',
  right: 'animate-popover-right',
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
  popoverWidth: number,
  popoverHeight: number,
  preferred: PopoverPlacement,
  padding: number
): { top: number; left: number; placement: PopoverPlacement } {
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

  const tryPlacement = (p: PopoverPlacement) => {
    switch (p) {
      case 'top':
        top = triggerRect.top - popoverHeight - POPOVER_GAP
        left = triggerCenterX - popoverWidth / 2
        break
      case 'bottom':
        top = triggerRect.bottom + POPOVER_GAP
        left = triggerCenterX - popoverWidth / 2
        break
      case 'left':
        top = triggerCenterY - popoverHeight / 2
        left = triggerRect.left - popoverWidth - POPOVER_GAP
        break
      case 'right':
        top = triggerCenterY - popoverHeight / 2
        left = triggerRect.right + POPOVER_GAP
        break
    }
  }

  tryPlacement(placement)

  // Flip to opposite if out of viewport (only flip on same axis: top<->bottom, left<->right)
  if (placement === 'bottom' && top + popoverHeight > vpBottom && triggerRect.top - popoverHeight - POPOVER_GAP >= vpTop) {
    placement = 'top'
    tryPlacement('top')
  } else if (placement === 'top' && top < vpTop && triggerRect.bottom + POPOVER_GAP + popoverHeight <= vpBottom) {
    placement = 'bottom'
    tryPlacement('bottom')
  } else if (placement === 'right' && left + popoverWidth > vpRight && triggerRect.left - popoverWidth - POPOVER_GAP >= vpLeft) {
    placement = 'left'
    tryPlacement('left')
  } else if (placement === 'left' && left < vpLeft && triggerRect.right + POPOVER_GAP + popoverWidth <= vpRight) {
    placement = 'right'
    tryPlacement('right')
  }

  // Clamp to viewport
  left = Math.max(vpLeft, Math.min(vpRight - popoverWidth, left))
  top = Math.max(vpTop, Math.min(vpBottom - popoverHeight, top))

  return { top, left, placement }
}

export const Popover: React.FC<PopoverProps> = ({
  content,
  children,
  placement = 'bottom',
  collisionPadding = true,
  trigger = 'click',
  open: controlledOpen,
  onOpenChange,
  className,
  usePortal = true,
  maxWidthMobile = 280,
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null)
  const [effectivePlacement, setEffectivePlacement] = useState<PopoverPlacement>(placement)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement>(null)

  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen

  useLayoutEffect(() => {
    if (!isOpen || !popoverRef.current || !triggerRef.current) {
      setPosition(null)
      return
    }
    const popoverEl = popoverRef.current
    const triggerEl = triggerRef.current
    const triggerRect = triggerEl.getBoundingClientRect()
    const padding = collisionPadding ? VIEWPORT_PADDING : 0
    const result = computePosition(
      triggerRect,
      popoverEl.offsetWidth,
      popoverEl.offsetHeight,
      placement,
      padding
    )
    setPosition({ top: result.top, left: result.left })
    setEffectivePlacement(result.placement)
  }, [isOpen, placement, collisionPadding])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        if (isControlled) {
          onOpenChange?.(false)
        } else {
          setInternalOpen(false)
        }
      }
    }

    if (isOpen && trigger === 'click') {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, trigger, isControlled, onOpenChange])

  const handleToggle = () => {
    const newOpen = !isOpen
    if (isControlled) {
      onOpenChange?.(newOpen)
    } else {
      setInternalOpen(newOpen)
    }
  }

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      if (isControlled) {
        onOpenChange?.(true)
      } else {
        setInternalOpen(true)
      }
    }
  }

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      if (isControlled) {
        onOpenChange?.(false)
      } else {
        setInternalOpen(false)
      }
    }
  }

  const maxWidth =
    typeof maxWidthMobile === 'number' ? `${maxWidthMobile}px` : maxWidthMobile

  const popoverContent = isOpen && (
    <div
      ref={popoverRef}
      className={cn(
        'fixed z-[90] p-4 rounded-lg shadow-xl',
        'bg-bg-secondary border border-border text-text-primary',
        'min-w-[10rem] max-w-[min(calc(100vw-2rem),20rem)]',
        'sm:max-w-[20rem]',
        placementAnimations[effectivePlacement],
        className
      )}
      style={{
        top: position ? `${position.top}px` : '-9999px',
        left: position ? `${position.left}px` : '-9999px',
        visibility: position ? 'visible' : 'hidden',
        maxWidth: typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT ? maxWidth : undefined,
      }}
      role="dialog"
      aria-modal="false"
    >
      {content}
    </div>
  )

  const isFragment = React.isValidElement(children) && children.type === React.Fragment
  const child = React.isValidElement(children) ? children : null
  const triggerProps = {
    ref: triggerRef,
    onClick: (e: React.MouseEvent) => {
      (child?.props as { onClick?: (e: React.MouseEvent) => void })?.onClick?.(e)
      if (trigger === 'click') handleToggle()
    },
    onMouseEnter: (e: React.MouseEvent) => {
      (child?.props as { onMouseEnter?: (e: React.MouseEvent) => void })?.onMouseEnter?.(e)
      handleMouseEnter()
    },
    onMouseLeave: (e: React.MouseEvent) => {
      (child?.props as { onMouseLeave?: (e: React.MouseEvent) => void })?.onMouseLeave?.(e)
      handleMouseLeave()
    },
  }
  const triggerNode = isFragment ? (
    <span className="inline-block" {...triggerProps}>
      {children}
    </span>
  ) : (
    React.isValidElement(children) ? React.cloneElement(children, triggerProps) : <span className="inline-block" {...triggerProps}>{children}</span>
  )

  return (
    <>
      {triggerNode}
      {usePortal && typeof document !== 'undefined'
        ? createPortal(popoverContent, document.body)
        : popoverContent}
    </>
  )
}

Popover.displayName = 'Popover'
