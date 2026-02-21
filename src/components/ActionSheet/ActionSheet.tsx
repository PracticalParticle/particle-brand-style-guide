import React, { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/utils/cn'

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
  /** List of actions. Use 3+ for typical action sheet pattern. */
  actions: ActionSheetItemProps[]
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
  actions,
  cancelLabel = 'Cancel',
  showHandle = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  maxHeight = '85vh',
  className,
  children,
}) => {
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
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
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
        className={cn(
          'relative z-50 w-full rounded-t-2xl sm:rounded-2xl shadow-2xl surface-glass',
          'flex flex-col max-h-[85vh] sm:max-h-[min(85vh,32rem)]',
          'animate-sheet-in',
          className
        )}
        style={{ maxHeight }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'action-sheet-title' : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {showHandle && (
          <div className="flex justify-center pt-3 pb-1 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-default/60" aria-hidden />
          </div>
        )}
        {title && (
          <h2
            id="action-sheet-title"
            className="px-4 pt-2 pb-3 text-center text-lg font-semibold text-text-primary sm:pt-4 sm:px-6"
          >
            {title}
          </h2>
        )}
        <div className="overflow-y-auto overscroll-contain flex-1 px-2 pb-2 sm:px-4 sm:pb-4">
          {children ?? (
            <div className="space-y-0.5">
              {actions.map((action, index) => (
                <button
                  key={index}
                  type="button"
                  disabled={action.disabled}
                  onClick={() => {
                    action.onClick?.()
                    onClose()
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
                    action.variant === 'danger'
                      ? 'text-error hover:bg-error-light/20 active:bg-error-light/30'
                      : 'text-text-primary hover:bg-default/30 active:bg-default/50',
                    action.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
                  )}
                >
                  {action.icon && (
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-current">
                      {action.icon}
                    </span>
                  )}
                  <span className="flex-1 min-w-0">
                    <span className="block font-medium">{action.label}</span>
                    {action.description && (
                      <span className="block text-sm text-text-tertiary mt-0.5">
                        {action.description}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        {cancelLabel && (
          <div className="p-2 sm:p-4 pt-0 border-t border-default/20">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                'w-full py-3 rounded-xl font-medium text-text-primary',
                'bg-default/30 hover:bg-default/50 active:bg-default/70',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary'
              )}
            >
              {cancelLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  )

  return typeof document !== 'undefined' ? createPortal(content, document.body) : content
}

ActionSheet.displayName = 'ActionSheet'
