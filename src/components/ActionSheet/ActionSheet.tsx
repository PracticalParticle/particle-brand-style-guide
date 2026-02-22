import React, { useEffect, useCallback, useRef, useId } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/utils/cn'
import { Button } from '@/components/Button'

export interface ActionSheetItemProps {
  label: string
  description?: string
  icon?: React.ReactNode
  onClick?: () => void
  variant?: 'default' | 'danger'
  disabled?: boolean
}

export interface ActionSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  /** Accessible label when title is omitted. One of title or ariaLabel should be provided. */
  ariaLabel?: string
  /** List of actions. Omit or pass [] when using children for custom content. */
  actions?: ActionSheetItemProps[]
  /** Cancel button label. Set to empty to hide. */
  cancelLabel?: string
  /** Show handle bar at top (common on mobile). Default true. */
  showHandle?: boolean
  /** Close when tapping the backdrop. Default true. */
  closeOnBackdrop?: boolean
  /** Close on Escape. Default true. */
  closeOnEscape?: boolean
  /** Max height as CSS value. Content scrolls when exceeded. Default 85vh. */
  maxHeight?: string
  className?: string
  children?: React.ReactNode
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  onClose,
  title,
  ariaLabel,
  actions = [],
  cancelLabel = 'Cancel',
  showHandle = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  maxHeight = '85vh',
  className,
  children,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null)
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

  // Preserve existing body overflow
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  // Capture trigger element and restore focus on close
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement
    } else {
      const trigger = triggerRef.current as HTMLElement | null
      trigger?.focus()
      triggerRef.current = null
    }
  }, [isOpen])

  // Focus trap: keep Tab/Shift+Tab within the sheet
  useEffect(() => {
    if (!isOpen) return
    const sheet = sheetRef.current
    if (!sheet) return

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
      const focusable = Array.from(sheet.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return
      const first = focusable[0]!
      const last = focusable[focusable.length - 1]!
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }

    // Move focus into the sheet
    const firstFocusable = sheet.querySelector<HTMLElement>(FOCUSABLE)
    firstFocusable?.focus()

    document.addEventListener('keydown', handleTrap)
    return () => document.removeEventListener('keydown', handleTrap)
  }, [isOpen])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdrop && e.target === e.currentTarget) onClose()
  }

  const content = (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end sm:items-center sm:justify-center sm:p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="fixed inset-0 bg-backdrop dark:bg-backdrop-dark backdrop-blur-sm transition-opacity"
        aria-hidden
      />
      <div
        ref={sheetRef}
        className={cn(
          'relative z-50 w-full rounded-t-2xl sm:rounded-2xl shadow-2xl surface-glass',
          'flex flex-col max-h-[85vh] sm:max-h-[min(85vh,32rem)]',
          'animate-sheet-in',
          className
        )}
        style={{ maxHeight }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title ? ariaLabel : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {showHandle && (
          <div className="flex justify-center pt-3 pb-1 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-default/60" aria-hidden />
          </div>
        )}
        {title && (
          <h2
            id={titleId}
            className="px-4 pt-2 pb-3 text-center text-lg font-semibold text-text-primary sm:pt-4 sm:px-6"
          >
            {title}
          </h2>
        )}
        <div className="overflow-y-auto overscroll-contain flex-1 px-2 pb-2 sm:px-4 sm:pb-4">
          {children ?? (
            <div className="space-y-0.5">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  type="button"
                  variant={action.variant === 'danger' ? 'danger' : 'ghost'}
                  fullWidth
                  disabled={action.disabled}
                  onClick={() => {
                    action.onClick?.()
                    onClose()
                  }}
                  leftIcon={
                    action.icon ? (
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-current">
                        {action.icon}
                      </span>
                    ) : undefined
                  }
                  className={cn(
                    'justify-start gap-3 rounded-xl px-4 py-3 text-left h-auto min-h-0',
                    action.variant === 'danger'
                      ? 'text-error hover:bg-error-light/20 active:bg-error-light/30'
                      : 'text-text-primary hover:bg-default/30 active:bg-default/50'
                  )}
                >
                  <span className="flex-1 min-w-0 text-left">
                    <span className="block font-medium">{action.label}</span>
                    {action.description && (
                      <span className="block text-sm text-text-tertiary mt-0.5">
                        {action.description}
                      </span>
                    )}
                  </span>
                </Button>
              ))}
            </div>
          )}
        </div>
        {cancelLabel && (
          <div className="p-2 sm:p-4 pt-0 border-t border-default/20">
            <Button
              type="button"
              variant="ghost"
              fullWidth
              onClick={onClose}
              className="py-3 rounded-xl font-medium bg-default/30 hover:bg-default/50 active:bg-default/70"
            >
              {cancelLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  return typeof document !== 'undefined' ? createPortal(content, document.body) : content
}

ActionSheet.displayName = 'ActionSheet'
