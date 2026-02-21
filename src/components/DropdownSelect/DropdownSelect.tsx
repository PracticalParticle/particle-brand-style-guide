import React, { useState, useRef, useId } from 'react'
import { cn } from '@/utils/cn'
import { Popover } from '@/components/Popover'

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export interface DropdownSelectOption {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface DropdownSelectOptionGroup {
  label: string
  options: DropdownSelectOption[]
}

export type DropdownSelectOptions = DropdownSelectOption[] | DropdownSelectOptionGroup[]

export interface DropdownSelectProps {
  /** Options or option groups. */
  options: DropdownSelectOptions
  value?: string | null
  onValueChange?: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  fullWidth?: boolean
  /** Size of the trigger. Default md. */
  size?: 'sm' | 'md' | 'lg'
  /** Custom trigger element. If provided, label/placeholder/size are ignored for rendering (accessibility still uses label). */
  trigger?: React.ReactNode
  className?: string
  /** Placement of the dropdown panel. Default bottom. */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  id?: string
}

const triggerSizeStyles = {
  sm: 'h-8 rounded-md px-2.5 pr-8 text-xs gap-1.5',
  md: 'h-10 rounded-lg px-3 pr-10 text-sm gap-2',
  lg: 'h-11 rounded-lg px-3.5 pr-11 text-base gap-2',
}

function flattenOptions(options: DropdownSelectOptions): DropdownSelectOption[] {
  return options.flatMap((item) =>
    'options' in item ? item.options : [item]
  )
}

function isOptionGroup(item: DropdownSelectOption | DropdownSelectOptionGroup): item is DropdownSelectOptionGroup {
  return 'options' in item && Array.isArray((item as DropdownSelectOptionGroup).options)
}

export const DropdownSelect = React.forwardRef<HTMLButtonElement, DropdownSelectProps>(
  (
    {
      options,
      value = null,
      onValueChange,
      placeholder = 'Select…',
      label,
      disabled = false,
      fullWidth = false,
      size = 'md',
      trigger: customTrigger,
      className,
      placement = 'bottom',
      id: providedId,
    },
    ref
  ) => {
    const generatedId = useId()
    const id = providedId || `dropdown-select-${generatedId}`
    const listboxId = `${id}-listbox`
    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number>(-1)
    const flatOptions = flattenOptions(options)
    const selected = flatOptions.find((o) => o.value === value)
    const listRef = useRef<HTMLUListElement>(null)

    const enabledFlat = flatOptions.filter((o) => !o.disabled)

    const handleSelect = (optionValue: string) => {
      onValueChange?.(optionValue)
      setOpen(false)
    }

    const getOptionId = (optValue: string) => `${id}-option-${optValue}`

    const handleListKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); return }
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(e.key)) return
      e.preventDefault()
      const currentEnabled = enabledFlat
      if (currentEnabled.length === 0) return
      const currentIdx = activeIndex < 0
        ? currentEnabled.findIndex((o) => o.value === value)
        : activeIndex
      let nextIdx = currentIdx
      if (e.key === 'ArrowDown') nextIdx = Math.min(currentEnabled.length - 1, currentIdx + 1)
      else if (e.key === 'ArrowUp') nextIdx = Math.max(0, currentIdx - 1)
      else if (e.key === 'Home') nextIdx = 0
      else if (e.key === 'End') nextIdx = currentEnabled.length - 1
      else if ((e.key === 'Enter' || e.key === ' ') && currentIdx >= 0) {
        handleSelect(currentEnabled[currentIdx]!.value)
        return
      }
      setActiveIndex(nextIdx)
      // Scroll active option into view
      const optEl = listRef.current?.querySelector<HTMLElement>(`[id="${getOptionId(currentEnabled[nextIdx]!.value)}"]`)
      optEl?.scrollIntoView({ block: 'nearest' })
    }

    const triggerButton = (
      <button
        ref={ref}
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={label ? `${id}-label` : undefined}
        aria-controls={open ? listboxId : undefined}
        disabled={disabled}
        className={cn(
          'relative flex w-full items-center rounded-lg border border-border bg-bg-secondary text-left text-text-primary transition-colors',
          'hover:border-border-hover focus:outline-none focus:ring-2 focus:ring-border-focus/20 focus:ring-offset-0 focus:border-border-focus',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-bg-tertiary',
          triggerSizeStyles[size],
          fullWidth && 'w-full',
          !selected && 'text-text-tertiary',
          className
        )}
      >
        <span className="min-w-0 flex-1 truncate pr-6">
          {selected ? selected.label : placeholder}
        </span>
        <span
          className={cn(
            'pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center justify-center text-text-tertiary transition-transform',
            size === 'sm' ? 'right-2.5' : 'right-3',
            open && 'rotate-180'
          )}
          aria-hidden
        >
          <ChevronDownIcon className={cn(size === 'sm' ? 'w-4 h-4' : 'w-5 h-5')} />
        </span>
      </button>
    )

    const activeOptionId = activeIndex >= 0 && enabledFlat[activeIndex]
      ? getOptionId(enabledFlat[activeIndex]!.value)
      : undefined

    const panelContent = (
      <ul
        ref={listRef}
        id={listboxId}
        role="listbox"
        aria-labelledby={label ? `${id}-label` : id}
        aria-activedescendant={activeOptionId}
        tabIndex={-1}
        className="py-1 max-h-[min(20rem,70vh)] overflow-auto outline-none"
        onKeyDown={handleListKeyDown}
      >
        {options.map((item, groupIndex) => {
          const groupLabelId = `${id}-group-${groupIndex}`
          if (isOptionGroup(item)) {
            return (
              <li key={groupIndex} role="group" aria-labelledby={groupLabelId} className="py-0">
                <div id={groupLabelId} className="px-3 py-1.5 text-xs font-medium text-text-tertiary uppercase tracking-wider">
                  {item.label}
                </div>
                {item.options.map((opt) => (
                  <OptionItem
                    key={opt.value}
                    option={opt}
                    optionId={getOptionId(opt.value)}
                    selected={value === opt.value}
                    active={activeIndex >= 0 && enabledFlat[activeIndex]?.value === opt.value}
                    onSelect={() => handleSelect(opt.value)}
                    onHover={() => setActiveIndex(enabledFlat.findIndex((o) => o.value === opt.value))}
                    size={size}
                  />
                ))}
              </li>
            )
          }
          return (
            <OptionItem
              key={item.value}
              option={item}
              optionId={getOptionId(item.value)}
              selected={value === item.value}
              active={activeIndex >= 0 && enabledFlat[activeIndex]?.value === item.value}
              onSelect={() => handleSelect(item.value)}
              onHover={() => setActiveIndex(enabledFlat.findIndex((o) => o.value === item.value))}
              size={size}
            />
          )
        })}
      </ul>
    )

    const wrappedContent = (
      <div className="min-w-[12rem] rounded-lg border border-border bg-bg-secondary shadow-lg py-1">
        {panelContent}
      </div>
    )

    // Inject required ARIA props into custom trigger
    const resolvedTrigger = customTrigger != null
      ? React.isValidElement(customTrigger)
        ? React.cloneElement(customTrigger as React.ReactElement, {
            id,
            'aria-haspopup': 'listbox',
            'aria-expanded': open,
            'aria-labelledby': label ? `${id}-label` : undefined,
            'aria-controls': open ? listboxId : undefined,
          })
        : <span>{customTrigger}</span>
      : triggerButton

    return (
      <div className={cn('form-container', fullWidth && 'w-full')}>
        {label && (
          <label id={`${id}-label`} htmlFor={id} className="form-label">
            {label}
          </label>
        )}
        <Popover
          placement={placement}
          trigger="click"
          open={open}
          onOpenChange={(o) => { setOpen(o); if (!o) setActiveIndex(-1) }}
          content={wrappedContent}
          className="p-0 min-w-0 max-w-[min(calc(100vw-2rem),20rem)]"
        >
          {resolvedTrigger}
        </Popover>
      </div>
    )
  }
)

DropdownSelect.displayName = 'DropdownSelect'

function OptionItem({
  option,
  optionId,
  selected,
  active,
  onSelect,
  onHover,
  size,
}: {
  option: DropdownSelectOption
  optionId: string
  selected: boolean
  active: boolean
  onSelect: () => void
  onHover: () => void
  size: 'sm' | 'md' | 'lg'
}) {
  const isDisabled = option.disabled
  return (
    <li
      id={optionId}
      role="option"
      aria-selected={selected}
      aria-disabled={isDisabled}
      className={cn(
        'flex items-center gap-2 px-3 py-2 cursor-pointer text-sm text-text-primary transition-colors',
        size === 'sm' && 'py-1.5 text-xs',
        size === 'lg' && 'py-2.5 text-base',
        (selected || active) && 'bg-bg-tertiary text-text-primary',
        !selected && !active && 'hover:bg-bg-tertiary',
        isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none'
      )}
      onClick={() => !isDisabled && onSelect()}
      onMouseEnter={() => !isDisabled && onHover()}
    >
      {option.icon && <span className="shrink-0 text-text-tertiary">{option.icon}</span>}
      <span className="flex-1 truncate">{option.label}</span>
      {selected && <CheckIcon className="w-4 h-4 shrink-0 text-primary" />}
    </li>
  )
}
