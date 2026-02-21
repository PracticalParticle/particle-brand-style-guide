import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/utils/cn'
import { Popover } from '@/components/Popover'
import { Badge } from '@/components/Badge'

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export interface MultiSelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  fullWidth?: boolean
  /** Max chips to show in trigger before "+N more". Default 3. */
  maxChips?: number
  /** Search placeholder inside panel. */
  searchPlaceholder?: string
  className?: string
  id?: string
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value = [],
  onValueChange,
  placeholder = 'Select…',
  label = '',
  disabled = false,
  fullWidth = false,
  maxChips = 3,
  searchPlaceholder = 'Search…',
  className,
  id: providedId,
}) => {
  const id = providedId || `multi-select-${Math.random().toString(36).slice(2, 9)}`
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const selectedOptions = options.filter((o) => value.includes(o.value))
  const filtered =
    query.trim() === ''
      ? options
      : options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  const toggle = (optionValue: string) => {
    const next = value.includes(optionValue) ? value.filter((v) => v !== optionValue) : [...value, optionValue]
    onValueChange?.(next)
  }

  const removeOne = (optionValue: string) => {
    onValueChange?.(value.filter((v) => v !== optionValue))
  }

  const triggerLabel =
    selectedOptions.length === 0
      ? placeholder
      : selectedOptions.length <= maxChips
        ? selectedOptions.map((o) => o.label).join(', ')
        : `${selectedOptions.length} selected`

  const trigger = (
    <div
      className={cn(
        'relative flex min-h-10 w-full items-center rounded-lg border border-border bg-bg-secondary px-3 py-2 pr-10 text-left text-sm',
        'hover:border-border-hover',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-bg-tertiary',
        fullWidth && 'w-full'
      )}
    >
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        className={cn(
          'absolute inset-0 w-full h-full rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus/20 focus:ring-offset-0',
          'disabled:cursor-not-allowed',
          selectedOptions.length === 0 && 'cursor-pointer'
        )}
        onClick={() => selectedOptions.length === 0 && setOpen((o) => !o)}
        aria-label={selectedOptions.length === 0 ? placeholder || 'Select options' : `${selectedOptions.length} selected, click to change`}
      />
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5 overflow-hidden pr-6 relative z-10">
        {selectedOptions.length === 0 ? (
          <span className={cn('text-text-tertiary pointer-events-none')}>
            {triggerLabel}
          </span>
        ) : selectedOptions.length <= maxChips ? (
          selectedOptions.map((o) => (
            <span key={o.value} className="inline-flex items-center gap-0.5 shrink-0 pr-0.5 px-2 py-0.5 text-xs font-medium rounded-full border-2 border-border text-text-secondary pointer-events-auto">
              <span className="truncate max-w-[8rem]">{o.label}</span>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  removeOne(o.value)
                }}
                aria-label={`Remove ${o.label}`}
                className="shrink-0 rounded p-0.5 hover:bg-bg-tertiary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary"
              >
                <XIcon className="w-3 h-3" />
              </button>
            </span>
          ))
        ) : (
          <>
            {selectedOptions.slice(0, maxChips).map((o) => (
              <Badge key={o.value} variant="outline" size="sm" className="shrink-0 pointer-events-auto">
                {o.label}
              </Badge>
            ))}
            <span className="text-text-secondary text-xs pointer-events-auto">+{selectedOptions.length - maxChips} more</span>
          </>
        )}
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((o) => !o)
        }}
        className={cn(
          'pointer-events-auto absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-text-tertiary transition-transform z-20',
          'focus:outline-none focus:ring-2 focus:ring-border-focus/20 focus:ring-offset-0 rounded',
          open && 'rotate-180'
        )}
        aria-label="Toggle dropdown"
        aria-hidden={false}
      >
        <ChevronDownIcon className="w-5 h-5" />
      </button>
    </div>
  )

  const panelContent = (
    <div className="flex flex-col min-w-[14rem] max-h-[20rem]">
      <div className="p-2 border-b border-border">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className={cn(
            'w-full rounded-md border border-border bg-bg-secondary px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary',
            'focus:outline-none focus:ring-2 focus:ring-border-focus/20 focus:border-border-focus'
          )}
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        />
      </div>
      <ul role="listbox" aria-multiselectable className="py-1 overflow-auto flex-1">
        {filtered.map((opt) => {
          const isSelected = value.includes(opt.value)
          return (
            <li
              key={opt.value}
              role="option"
              aria-selected={isSelected}
              aria-disabled={opt.disabled}
              className={cn(
                'flex items-center gap-2 px-3 py-2 cursor-pointer text-sm text-text-primary transition-colors',
                isSelected && 'bg-bg-tertiary',
                !isSelected && 'hover:bg-bg-tertiary',
                opt.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
              )}
              onClick={() => !opt.disabled && toggle(opt.value)}
            >
              <span className="flex-1 truncate">{opt.label}</span>
              {isSelected && <CheckIcon className="w-4 h-4 shrink-0 text-primary" />}
            </li>
          )
        })}
      </ul>
    </div>
  )

  const wrappedContent = (
    <div className="rounded-lg border border-border bg-bg-secondary shadow-lg overflow-hidden">
      {panelContent}
    </div>
  )

  return (
    <div className={cn('form-container', fullWidth && 'w-full', className)}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <Popover
        placement="bottom"
        trigger="click"
        open={open}
        onOpenChange={setOpen}
        content={wrappedContent}
        className="p-0 min-w-0"
      >
        {trigger}
      </Popover>
    </div>
  )
}

MultiSelect.displayName = 'MultiSelect'
