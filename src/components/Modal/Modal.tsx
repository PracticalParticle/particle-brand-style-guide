import React, { useEffect, useRef, useId } from 'react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/Button'
import { Stepper } from '@/components/Stepper'

export type ModalVariant = 'default' | 'confirmation' | 'warning' | 'danger' | 'success' | 'info'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Semantic variant: use for alertdialog role on destructive flows. No decorative icons. */
  variant?: ModalVariant
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'lg',
  variant = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<Element | null>(null)
  const titleId = useId()

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeOnEscape, onClose])

  // Preserve existing body overflow
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  // Capture trigger and restore focus on close
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement
    } else {
      const trigger = triggerRef.current as HTMLElement | null
      trigger?.focus()
      triggerRef.current = null
    }
  }, [isOpen])

  // Focus trap
  useEffect(() => {
    if (!isOpen) return
    const dialog = dialogRef.current
    if (!dialog) return

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
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return
      const first = focusable[0]!
      const last = focusable[focusable.length - 1]!
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }

    // Move initial focus into the dialog
    const firstFocusable = dialog.querySelector<HTMLElement>(FOCUSABLE)
    firstFocusable?.focus()

    document.addEventListener('keydown', handleTrap)
    return () => document.removeEventListener('keydown', handleTrap)
  }, [isOpen])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-md min-w-[18rem]',
    md: 'max-w-lg min-w-[20rem]',
    lg: 'max-w-2xl min-w-[24rem]',
    xl: 'max-w-4xl min-w-[28rem]',
    full: 'max-w-full mx-4 min-w-0',
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  const isAlertDialog = variant === 'danger' || variant === 'confirmation'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={handleOverlayClick}
    >
      {/* Backdrop — neutral overlay, minimal blur */}
      <div
        className="fixed inset-0 bg-backdrop dark:bg-backdrop-dark backdrop-blur-[2px] transition-opacity"
        aria-hidden
      />
      
      {/* Modal — glass surface (tokens: --glass-bg-opacity, --glass-blur) */}
      <div
        ref={dialogRef}
        className={cn(
          'relative z-50 w-full flex flex-col',
          'rounded-overlay surface-glass',
          'shadow-modal dark:shadow-modal-dark',
          'min-h-[12rem] max-h-[90vh]',
          'transform transition-all',
          sizes[size]
        )}
        role={isAlertDialog ? 'alertdialog' : 'dialog'}
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
      >
        {/* Header — transparent so glass surface shows through; border separates from content */}
        {(title || showCloseButton) && (
          <div
            className={cn(
              'flex items-center justify-between gap-4 shrink-0',
              'px-5 py-4 sm:px-6 rounded-t-overlay',
              'border-b border-border'
            )}
          >
            {title && (
              <h2
                id={titleId}
                className="text-lg font-semibold tracking-tight text-text-primary truncate"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                iconOnly
                onClick={onClose}
                aria-label="Close"
                className="ml-auto flex-shrink-0 focus-visible:ring-offset-bg-primary text-text-tertiary hover:text-text-primary"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            )}
          </div>
        )}

        {/* Content — scrollable, inherits glass background from parent */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 min-h-0 text-text-primary">
          {children}
        </div>
      </div>
    </div>
  )
}

// Modal sub-components for better composition
export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-1 mb-4', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ModalHeader.displayName = 'ModalHeader'

export interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn('text-lg font-semibold leading-tight tracking-tight text-text-primary', className)}
        {...props}
      >
        {children}
      </h2>
    )
  }
)

ModalTitle.displayName = 'ModalTitle'

export interface ModalDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export const ModalDescription = React.forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-text-secondary mt-1', className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)

ModalDescription.displayName = 'ModalDescription'

export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-text-primary text-sm leading-relaxed', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ModalContent.displayName = 'ModalContent'

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3',
          'mt-6 pt-5',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ModalFooter.displayName = 'ModalFooter'

export interface ModalStepperProps {
  steps: string[]
  currentStep: number
  /** Vertical on small screens, horizontal on md+ when true */
  responsive?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export const ModalStepper: React.FC<ModalStepperProps> = ({
  steps,
  currentStep,
  responsive = true,
  size = 'md',
  className,
}) => (
  <div className={cn('mb-6', className)}>
    <Stepper
      steps={steps}
      currentStep={currentStep}
      orientation="horizontal"
      responsive={responsive}
      size={size}
    />
  </div>
)

ModalStepper.displayName = 'ModalStepper'
