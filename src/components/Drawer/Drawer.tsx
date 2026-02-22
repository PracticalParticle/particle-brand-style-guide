import React, { useEffect, useCallback, useRef, useId } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/utils/cn'

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  /** Accessible label when title is omitted. */
  ariaLabel?: string
  /** Which side the drawer slides from. Default 'left'. */
  side?: 'left' | 'right'
  /** Close when tapping the backdrop. Default true. */
  closeOnBackdrop?: boolean
  /** Close on Escape. Default true. */
  closeOnEscape?: boolean
  /** Width as CSS value. Default 320px for left/right. */
  width?: string
  className?: string
  children: React.ReactNode
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  ariaLabel,
  side = 'left',
  closeOnBackdrop = true,
  closeOnEscape = true,
  width = '320px',
  className,
  children,
}) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<Element | null>(null)
  const titleId = useId()

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeOnEscape, handleEscape])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement
    } else {
      const trigger = triggerRef.current as HTMLElement | null
      trigger?.focus()
      triggerRef.current = null
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const panel = panelRef.current
    if (!panel) return

    const FOCUSABLE = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',')

    const handleTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return
      const first = focusable[0]!
      const last = focusable[focusable.length - 1]!
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    const firstFocusable = panel.querySelector<HTMLElement>(FOCUSABLE)
    firstFocusable?.focus()

    document.addEventListener('keydown', handleTrap)
    return () => document.removeEventListener('keydown', handleTrap)
  }, [isOpen])

  if (!isOpen) return null

  const handleBackdropClick = () => {
    if (closeOnBackdrop) onClose()
  }

  const isLeft = side === 'left'
  const content = (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-backdrop dark:bg-backdrop-dark backdrop-blur-sm transition-opacity"
        aria-hidden
        onClick={handleBackdropClick}
        role="presentation"
      />
      <div
        ref={panelRef}
        className={cn(
          'relative z-50 h-full flex flex-col shadow-2xl surface-glass animate-drawer-in-left',
          isLeft ? 'rounded-r-2xl' : 'rounded-l-2xl',
          className
        )}
        style={{
          width,
          [isLeft ? 'left' : 'right']: 0,
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title ? ariaLabel : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2
            id={titleId}
          >
            {title}
          </h2>
        )}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden p-4">
          {children}
        </div>
      </div>
    </div>
  )

  return typeof document !== 'undefined' ? createPortal(content, document.body) : content
}

Drawer.displayName = 'Drawer'
