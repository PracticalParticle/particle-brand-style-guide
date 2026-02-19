import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/utils/cn'

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  placement?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  disabled?: boolean
  className?: string
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  delay = 200,
  disabled = false,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (isVisible && tooltipRef.current && triggerRef.current) {
      const tooltip = tooltipRef.current
      const trigger = triggerRef.current
      const rect = trigger.getBoundingClientRect()
      
      let top = 0
      let left = 0

      switch (placement) {
        case 'top':
          top = rect.top - tooltip.offsetHeight - 8
          left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2
          break
        case 'bottom':
          top = rect.bottom + 8
          left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2
          break
        case 'left':
          top = rect.top + rect.height / 2 - tooltip.offsetHeight / 2
          left = rect.left - tooltip.offsetWidth - 8
          break
        case 'right':
          top = rect.top + rect.height / 2 - tooltip.offsetHeight / 2
          left = rect.right + 8
          break
      }

      setPosition({ top, left })
    }
  }, [isVisible, placement])

  const handleMouseEnter = () => {
    if (disabled) return
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      {React.cloneElement(children, {
        ref: triggerRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}
      {isVisible && !disabled && (
        <div
          ref={tooltipRef}
          className={cn(
            'fixed z-50 px-3 py-1.5 text-sm text-text-inverse bg-primary rounded-lg shadow-lg pointer-events-none',
            'animate-in fade-in-0 zoom-in-95 duration-200',
            className
          )}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          role="tooltip"
        >
          {content}
          <div
            className={cn(
              'absolute w-2 h-2 bg-primary rotate-45',
              placement === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2',
              placement === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2',
              placement === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2',
              placement === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2'
            )}
          />
        </div>
      )}
    </>
  )
}

Tooltip.displayName = 'Tooltip'
