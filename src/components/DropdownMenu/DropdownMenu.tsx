import React, { useState, useRef, useId } from 'react'
import { cn } from '@/utils/cn'
import { Popover } from '@/components/Popover'

export interface DropdownMenuItem {
  value?: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
  /** Red/destructive style. */
  variant?: 'default' | 'danger'
  onClick?: () => void
}

export interface DropdownMenuSection {
  label?: string
  items: DropdownMenuItem[]
}

export interface DropdownMenuProps {
  /** Menu sections (each with optional label and items). */
  sections: DropdownMenuSection[]
  /** Trigger element. Must accept ref and onClick (e.g. Button). */
  children: React.ReactElement
  /** Placement of the menu. Default bottom. */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** Called when an item is selected (value if any). */
  onSelect?: (value: string | undefined, item: DropdownMenuItem) => void
  className?: string
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  sections,
  children,
  placement = 'bottom',
  onSelect,
  className,
}) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  const handleItemClick = (item: DropdownMenuItem) => {
    if (item.disabled) return
    item.onClick?.()
    onSelect?.(item.value, item)
    setOpen(false)
  }

  // Focus first item when menu opens
  React.useEffect(() => {
    if (!open) return
    const first = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]:not([disabled])')
    first?.focus()
  }, [open])

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])') ?? []
    )
    if (items.length === 0) return
    const current = document.activeElement as HTMLElement
    const idx = items.indexOf(current)

    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); items[Math.min(items.length - 1, idx + 1)]?.focus(); return }
    if (e.key === 'ArrowUp') { e.preventDefault(); items[Math.max(0, idx - 1)]?.focus(); return }
    if (e.key === 'Home') { e.preventDefault(); items[0]?.focus(); return }
    if (e.key === 'End') { e.preventDefault(); items[items.length - 1]?.focus(); return }
    if (e.key === 'Tab') { setOpen(false) }
  }

  const content = (
    <div
      ref={menuRef}
      id={menuId}
      className={cn(
        'min-w-[10rem] rounded-lg border border-border bg-bg-secondary shadow-lg py-1',
        className
      )}
      role="menu"
      aria-orientation="vertical"
      onKeyDown={handleMenuKeyDown}
    >
      {sections.map((section, sectionIndex) => {
        const groupLabelId = `${menuId}-group-${sectionIndex}`
        return (
          <div key={sectionIndex} role="group" aria-labelledby={section.label ? groupLabelId : undefined}>
            {section.label && (
              <div id={groupLabelId} className="px-3 py-1.5 text-xs font-medium text-text-tertiary uppercase tracking-wider" aria-hidden="true">
                {section.label}
              </div>
            )}
            {section.items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className={cn(
                  'flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-text-primary transition-colors',
                  'hover:bg-bg-tertiary focus:bg-bg-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-tertiary/30 focus-visible:ring-inset',
                  item.disabled && 'opacity-50 cursor-not-allowed',
                  item.variant === 'danger' && 'text-error hover:bg-error-light/20 focus:bg-error-light/20 dark:hover:bg-error/20 dark:focus:bg-error/20'
                )}
                onClick={() => handleItemClick(item)}
              >
                {item.icon && (
                  <span className={cn('shrink-0', item.variant === 'danger' ? 'text-error' : 'text-text-tertiary')}>
                    {item.icon}
                  </span>
                )}
                <span className="flex-1 truncate">{item.label}</span>
              </button>
            ))}
          </div>
        )
      })}
    </div>
  )

  return (
    <Popover
      placement={placement}
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      content={content}
      className="p-0 min-w-0"
    >
      {children}
    </Popover>
  )
}

DropdownMenu.displayName = 'DropdownMenu'
