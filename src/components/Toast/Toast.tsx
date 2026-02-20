import React, { useCallback, useRef, useState } from 'react'
import { cn } from '@/utils/cn'
import { ToastContext, type ToastItem, type ToastOptions, type ToastVariant } from './useToast'

let idCounter = 0
function generateId() {
  return `toast-${Date.now()}-${++idCounter}`
}

export interface ToastProviderProps {
  children: React.ReactNode
  /** Default duration in ms (0 = no auto-dismiss). */
  defaultDuration?: number
  /** Position of the toast container. */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'bottom-center'
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultDuration = 5000,
  position = 'bottom-right',
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const timeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const removeToast = useCallback((id: string) => {
    const t = timeoutsRef.current.get(id)
    if (t) {
      clearTimeout(t)
      timeoutsRef.current.delete(id)
    }
    setToasts((prev) => prev.filter((x) => x.id !== id))
  }, [])

  const addToast = useCallback(
    (message: string, options?: ToastOptions): string => {
      const id = generateId()
      const variant = options?.variant ?? 'default'
      const duration = options?.duration ?? defaultDuration
      const item: ToastItem = {
        id,
        message,
        title: options?.title,
        variant,
        duration,
        addedAt: Date.now(),
      }
      setToasts((prev) => [...prev, item])
      if (duration > 0) {
        const t = setTimeout(() => removeToast(id), duration)
        timeoutsRef.current.set(id, t)
      }
      return id
    },
    [defaultDuration, removeToast]
  )

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div
        className={cn('fixed z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none', positionClasses[position])}
        role="region"
        aria-label="Notifications"
      >
        <div className="flex flex-col gap-2 pointer-events-auto">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} item={toast} onDismiss={() => removeToast(toast.id)} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  )
}

const variantStyles: Record<ToastVariant, string> = {
  default:
    'bg-bg-secondary border border-border text-text-primary shadow-xl ring-1 ring-border/5',
  success:
    'bg-success-light border border-success text-success dark:text-text-inverse',
  warning:
    'bg-warning-light border border-warning text-warning dark:text-text-inverse',
  error:
    'bg-error-light border border-error text-error dark:text-text-inverse',
  info:
    'bg-info-light border border-info text-info dark:text-text-inverse',
}

const defaultIcons: Record<ToastVariant, React.ReactNode> = {
  success: (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  default: (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

function ToastItem({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-lg p-4 shadow-xl backdrop-blur-sm',
        variantStyles[item.variant]
      )}
    >
      <div className="shrink-0 mt-0.5">{defaultIcons[item.variant]}</div>
      <div className="flex-1 min-w-0">
        {item.title && <p className="font-semibold text-sm mb-0.5">{item.title}</p>}
        <p className="text-sm">{item.message}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 p-1 rounded hover:bg-bg-tertiary/50 transition-colors opacity-70 hover:opacity-100"
        aria-label="Dismiss notification"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
