import React, { createContext, useContext, useId, useCallback, useRef, useLayoutEffect, useState } from 'react'
import { cn } from '@/utils/cn'

type TabsContextValue = {
  value: string
  onChange: (value: string) => void
  orientation: 'horizontal' | 'vertical'
  variant: 'line' | 'pills'
  size: 'sm' | 'md' | 'lg'
  tabIdPrefix: string
  panelIdPrefix: string
  getTabId: (value: string) => string
  getPanelId: (value: string) => string
  registerTab: (value: string, el: HTMLButtonElement | null) => void
  tabRefs: React.MutableRefObject<Map<string, HTMLButtonElement>>
}

const TabsContext = createContext<TabsContextValue | null>(null)

/** Sanitize a tab value for use in element IDs (no spaces or invalid chars for aria-controls/labels). */
function sanitizeIdSegment(value: string): string {
  return value.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9_-]/g, '_') || 'tab'
}

function useTabs() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs components must be used within a Tabs root')
  return ctx
}

export interface TabsProps {
  value: string
  onChange: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  variant?: 'line' | 'pills'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({
  value,
  onChange,
  orientation = 'horizontal',
  variant = 'line',
  size = 'md',
  children,
  className,
}) => {
  const idBase = useId().replace(/:/g, '')
  const tabIdPrefix = `tabs-${idBase}-tab`
  const panelIdPrefix = `tabs-${idBase}-panel`
  const getTabId = useCallback((v: string) => `${tabIdPrefix}-${sanitizeIdSegment(v)}`, [tabIdPrefix])
  const getPanelId = useCallback((v: string) => `${panelIdPrefix}-${sanitizeIdSegment(v)}`, [panelIdPrefix])

  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const registerTab = useCallback((v: string, el: HTMLButtonElement | null) => {
    if (el) tabRefs.current.set(v, el)
    else tabRefs.current.delete(v)
  }, [])

  const ctx: TabsContextValue = {
    value,
    onChange,
    orientation,
    variant,
    size,
    tabIdPrefix,
    panelIdPrefix,
    getTabId,
    getPanelId,
    registerTab,
    tabRefs,
  }
  const isVertical = orientation === 'vertical'
  return (
    <TabsContext.Provider value={ctx}>
      <div
        className={cn(
          'w-full',
          isVertical ? 'flex flex-row gap-4' : 'flex flex-col',
          className
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function getTabValuesFromChildren(children: React.ReactNode): string[] {
  const values: string[] = []
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === Tab && child.props?.value != null) {
      values.push(String(child.props.value))
    }
  })
  return values
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, onKeyDown, ...props }, ref) => {
    const ctx = useTabs()
    const { value: selectedValue, onChange, orientation, variant } = ctx
    const isVertical = orientation === 'vertical'
    const values = getTabValuesFromChildren(children)

    // Animated indicator state
    const listRef = useRef<HTMLDivElement | null>(null)
    const [indicator, setIndicator] = useState<{ left: number; width: number; top: number; height: number } | null>(null)

    // Merge forwarded ref with our listRef
    const setRef = (el: HTMLDivElement | null) => {
      listRef.current = el
      if (typeof ref === 'function') ref(el)
      else if (ref) ref.current = el
    }

    // Measure the active tab position on value change
    useLayoutEffect(() => {
      const list = listRef.current
      if (!list) return
      const activeTab = list.querySelector<HTMLButtonElement>('[aria-selected="true"]')
      if (!activeTab) return
      const listRect = list.getBoundingClientRect()
      const tabRect = activeTab.getBoundingClientRect()
      setIndicator({
        left:   tabRect.left - listRect.left,
        width:  tabRect.width,
        top:    tabRect.top - listRect.top,
        height: tabRect.height,
      })
    }, [selectedValue, variant])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (values.length === 0) { onKeyDown?.(e); return }
      const { tabRefs: refs } = ctx
      const i = values.indexOf(selectedValue)
      let next: number | null = null
      if (orientation === 'horizontal') {
        if (e.key === 'ArrowLeft') next = i - 1
        else if (e.key === 'ArrowRight') next = i + 1
      } else {
        if (e.key === 'ArrowUp') next = i - 1
        else if (e.key === 'ArrowDown') next = i + 1
      }
      if (e.key === 'Home') next = 0
      if (e.key === 'End') next = values.length - 1
      if (next !== null) {
        e.preventDefault()
        const clamped = Math.max(0, Math.min(next, values.length - 1))
        const nextValue = values[clamped]!
        onChange(nextValue)
        // Move DOM focus to the newly selected tab
        refs.current.get(nextValue)?.focus()
      }
      onKeyDown?.(e)
    }

    return (
      <div
        ref={setRef}
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          'flex shrink-0 relative',
          isVertical ? 'flex-col' : 'flex-row',
          variant === 'line' && !isVertical && 'border-b border-border',
          variant === 'pills' && 'gap-1 p-1 bg-bg-tertiary rounded-control w-fit',
          className
        )}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Animated sliding indicator */}
        {indicator && variant === 'pills' && (
          <span
            aria-hidden
            className="absolute rounded-inset bg-bg-secondary shadow-sm pointer-events-none z-0"
            style={{
              left:       indicator.left,
              width:      indicator.width,
              top:        indicator.top,
              height:     indicator.height,
              transition: 'left 220ms cubic-bezier(0.16,1,0.3,1), width 220ms cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        )}
        {children}
      </div>
    )
  }
)
TabsList.displayName = 'TabsList'

export interface TabProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
  children: React.ReactNode
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ value, className, children, onClick, ...props }, ref) => {
    const { value: selectedValue, onChange, getTabId, getPanelId, variant, size, registerTab } = useTabs()
    const isSelected = selectedValue === value

    const setRef = useCallback((el: HTMLButtonElement | null) => {
      registerTab(value, el)
      if (typeof ref === 'function') ref(el)
      else if (ref) ref.current = el
    }, [value, registerTab, ref])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      onChange(value)
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-5 py-2.5 text-base',
    }

    return (
      <button
        ref={setRef}
        type="button"
        role="tab"
        id={getTabId(value)}
        aria-selected={isSelected}
        aria-controls={getPanelId(value)}
        tabIndex={isSelected ? 0 : -1}
        className={cn(
          'relative z-10 font-medium transition-colors duration-brand ease-brand',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
          'shrink-0 select-none',
          variant === 'line' && [
            'rounded-none border-b-2 border-transparent -mb-px min-h-[2.25rem] box-border',
            isSelected
              ? 'border-tertiary dark:border-tertiary-on-dark text-tertiary dark:text-tertiary-on-dark'
              : 'text-text-secondary hover:text-text-primary hover:border-border-hover',
          ],
          variant === 'pills' && [
            'rounded-inset',
            isSelected
              ? 'text-text-primary'
              : 'text-text-secondary hover:text-text-primary',
          ],
          sizeStyles[size],
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Tab.displayName = 'Tab'

export interface TabsPanelsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const TabsPanels = React.forwardRef<HTMLDivElement, TabsPanelsProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 min-w-0', className)} {...props}>
      {children}
    </div>
  )
)
TabsPanels.displayName = 'TabsPanels'

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  children: React.ReactNode
}

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, className, children, ...props }, ref) => {
    const { value: selectedValue, getTabId, getPanelId } = useTabs()
    const isSelected = selectedValue === value
    if (!isSelected) return null
    return (
      <div
        ref={ref}
        role="tabpanel"
        id={getPanelId(value)}
        aria-labelledby={getTabId(value)}
        tabIndex={0}
        className={cn('py-4', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabPanel.displayName = 'TabPanel'
