import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/utils/cn'

export interface PopoverProps {
  content: React.ReactNode
  children: React.ReactElement
  placement?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'click' | 'hover'
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

export const Popover: React.FC<PopoverProps> = ({
  content,
  children,
  placement = 'bottom',
  trigger = 'click',
  open: controlledOpen,
  onOpenChange,
  className,
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement>(null)

  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen

  useEffect(() => {
    if (isOpen && popoverRef.current && triggerRef.current) {
      const popover = popoverRef.current
      const trigger = triggerRef.current
      const rect = trigger.getBoundingClientRect()
      
      let top = 0
      let left = 0

      switch (placement) {
        case 'top':
          top = rect.top - popover.offsetHeight - 8
          left = rect.left + rect.width / 2 - popover.offsetWidth / 2
          break
        case 'bottom':
          top = rect.bottom + 8
          left = rect.left + rect.width / 2 - popover.offsetWidth / 2
          break
        case 'left':
          top = rect.top + rect.height / 2 - popover.offsetHeight / 2
          left = rect.left - popover.offsetWidth - 8
          break
        case 'right':
          top = rect.top + rect.height / 2 - popover.offsetHeight / 2
          left = rect.right + 8
          break
      }

      setPosition({ top, left })
    }
  }, [isOpen, placement])

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

  return (
    <>
      {React.cloneElement(children, {
        ref: triggerRef,
        onClick: trigger === 'click' ? handleToggle : undefined,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}
      {isOpen && (
        <div
          ref={popoverRef}
          className={cn(
            'fixed z-50 w-64 p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700',
            'animate-in fade-in-0 zoom-in-95 duration-200',
            className
          )}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          role="dialog"
        >
          {content}
        </div>
      )}
    </>
  )
}

Popover.displayName = 'Popover'
