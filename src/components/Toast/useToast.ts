import { createContext, useContext } from 'react'

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface ToastItem {
  id: string
  message: string
  title?: string
  variant: ToastVariant
  duration: number
  addedAt: number
}

export interface ToastOptions {
  title?: string
  variant?: ToastVariant
  duration?: number
}

type ToastContextValue = {
  toasts: ToastItem[]
  addToast: (message: string, options?: ToastOptions) => string
  removeToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
