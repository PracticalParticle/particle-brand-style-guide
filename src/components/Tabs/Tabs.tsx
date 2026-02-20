import React, { createContext, useContext, useId, useCallback } from 'react'
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
}

const TabsContext = createContext<TabsContextValue | null>(null)

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
  const getTabId = useCallback((v: string) => `${tabIdPrefix}-${v}`, [tabIdPrefix])
  const getPanelId = useCallback((v: string) => `${panelIdPrefix}-${v}`, [panelIdPrefix])
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
    const { value: selectedValue, onChange, orientation, variant } = useTabs()
    const isVertical = orientation === 'vertical'
    const values = getTabValuesFromChildren(children)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (values.length === 0) {
        onKeyDown?.(e)
        return
      }
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
        onChange(values[clamped]!)
      }
      onKeyDown?.(e)
    }
    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          'flex shrink-0',
          isVertical ? 'flex-col' : 'flex-row',
          variant === 'line' && !isVertical && 'border-b border-border rounded-t-lg overflow-hidden',
          variant === 'pills' && 'gap-1 p-1 bg-bg-tertiary rounded-lg w-fit',
          className
        )}
        onKeyDown={handleKeyDown}
        {...props}
      >
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
    const { value: selectedValue, onChange, getTabId, getPanelId, variant, size } = useTabs()
    const isSelected = selectedValue === value
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
        ref={ref}
        type="button"
        role="tab"
        id={getTabId(value)}
        aria-selected={isSelected}
        aria-controls={getPanelId(value)}
        tabIndex={isSelected ? 0 : -1}
        className={cn(
          'font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:ring-offset-2 shrink-0',
          variant === 'line' && 'rounded-none border-b-2 border-transparent -mb-px min-h-[2.25rem] box-border',
          variant === 'line' && (isSelected ? 'border-tertiary text-tertiary' : 'text-text-secondary hover:text-text-primary'),
          variant === 'pills' && 'rounded-base',
          variant === 'pills' && (isSelected ? 'bg-bg-secondary text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50'),
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

