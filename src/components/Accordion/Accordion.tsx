import React, { createContext, useContext, useId } from 'react'
import { cn } from '@/utils/cn'

type AccordionContextValue = {
  type: 'single' | 'multiple'
  value: string | string[]
  onChange: (value: string | string[]) => void
  idPrefix: string
  getTriggerId: (value: string) => string
  getPanelId: (value: string) => string
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

function useAccordion() {
  const ctx = useContext(AccordionContext)
  if (!ctx) throw new Error('Accordion components must be used within Accordion')
  return ctx
}

export interface AccordionProps {
  type?: 'single' | 'multiple'
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  defaultValue?: string | string[]
  children: React.ReactNode
  className?: string
}

export const Accordion: React.FC<AccordionProps> = ({
  type = 'single',
  value: controlledValue,
  onChange,
  defaultValue,
  children,
  className,
}) => {
  const [uncontrolledValue, setUncontrolled] = React.useState<string | string[]>(
    defaultValue ?? (type === 'single' ? '' : [])
  )
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue
  const idBase = useId().replace(/:/g, '')
  const idPrefix = `accordion-${idBase}`

  const getTriggerId = (v: string) => `${idPrefix}-trigger-${v}`
  const getPanelId = (v: string) => `${idPrefix}-panel-${v}`

  const handleChange = React.useCallback(
    (next: string | string[]) => {
      if (!isControlled) setUncontrolled(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )

  const ctx: AccordionContextValue = {
    type,
    value,
    onChange: handleChange,
    idPrefix,
    getTriggerId,
    getPanelId,
  }

  return (
    <AccordionContext.Provider value={ctx}>
      <div className={cn('w-full min-w-0 rounded-lg border border-border overflow-hidden bg-bg-secondary', className)} data-accordion>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export interface AccordionItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ value, children, className }) => (
  <div className={cn('w-full min-w-0 border-b border-border last:border-b-0', className)} data-accordion-item data-value={value}>
    {children}
  </div>
)

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  children: React.ReactNode
}

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ value, className, children, onClick, ...props }, ref) => {
    const { type, value: accordionValue, onChange, getTriggerId, getPanelId } = useAccordion()
    const isOpen =
      type === 'single'
        ? accordionValue === value
        : Array.isArray(accordionValue) && accordionValue.includes(value)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (type === 'single') {
        onChange(isOpen ? '' : value)
      } else {
        const arr = Array.isArray(accordionValue) ? [...accordionValue] : []
        const i = arr.indexOf(value)
        if (i === -1) arr.push(value)
        else arr.splice(i, 1)
        onChange(arr)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        id={getTriggerId(value)}
        aria-expanded={isOpen}
        aria-controls={getPanelId(value)}
        className={cn(
          'w-full min-w-0 flex items-center justify-between gap-2 py-3 px-4 text-left font-medium text-text-primary hover:bg-bg-tertiary/50 hover:text-tertiary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:ring-inset',
          isOpen && 'bg-bg-tertiary/30',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="min-w-0 truncate">{children}</span>
        <span className="shrink-0 w-5 h-5 flex items-center justify-center transition-transform duration-200" aria-hidden style={{ transform: isOpen ? 'rotate(180deg)' : undefined }}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
    )
  }
)
AccordionTrigger.displayName = 'AccordionTrigger'

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  children: React.ReactNode
}

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const { value: accordionValue, getTriggerId, getPanelId, type } = useAccordion()
    const isOpen =
      type === 'single'
        ? accordionValue === value
        : Array.isArray(accordionValue) && accordionValue.includes(value)

    if (!isOpen) return null

    return (
      <div
        ref={ref}
        id={getPanelId(value)}
        role="region"
        aria-labelledby={getTriggerId(value)}
        className={cn('w-full min-w-0 px-4 pb-4 pt-0 text-sm text-text-secondary bg-bg-tertiary/20', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
AccordionContent.displayName = 'AccordionContent'
