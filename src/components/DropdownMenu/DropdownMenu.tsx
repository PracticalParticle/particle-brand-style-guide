import React, { useState } from 'react'
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

  const handleItemClick = (item: DropdownMenuItem) => {
    if (item.disabled) return
    item.onClick?.()
    onSelect?.(item.value, item)
    setOpen(false)
  }

  const content = (
    <div
      className={cn(
        'min-w-[10rem] rounded-lg border border-border bg-bg-secondary shadow-lg py-1',
        className
      )}
      role="menu"
    >
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} role="group">
          {section.label && (
            <div className="px-3 py-1.5 text-xs font-medium text-text-tertiary uppercase tracking-wider">
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
                'hover:bg-bg-tertiary focus:bg-bg-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-inset',
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
      ))}
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
