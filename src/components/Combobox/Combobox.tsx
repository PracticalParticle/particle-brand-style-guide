import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/utils/cn'
import { Popover } from '@/components/Popover'

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

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string | null
  onValueChange?: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  fullWidth?: boolean
  /** Placeholder for the search input inside the panel. */
  searchPlaceholder?: string
  /** If no option matches search, show this message. */
  emptyMessage?: string
  className?: string
  id?: string
}

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value = null,
  onValueChange,
  placeholder = 'Select…',
  label = '',
  disabled = false,
  fullWidth = false,
  searchPlaceholder = 'Search…',
  emptyMessage = 'No results found.',
  className,
  id: providedId,
}) => {
  const id = providedId || `combobox-${Math.random().toString(36).slice(2, 9)}`
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const selected = options.find((o) => o.value === value)
  const filtered = query.trim()
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  const handleSelect = (optionValue: string) => {
    onValueChange?.(optionValue)
    setOpen(false)
  }

  const trigger = (
    <button
      type="button"
      id={id}
      aria-haspopup="listbox"
      aria-expanded={open}
      disabled={disabled}
      className={cn(
        'relative flex h-10 w-full items-center rounded-lg border border-border bg-bg-secondary px-3 py-2 pr-10 text-left text-sm text-text-primary',
        'hover:border-border-hover focus:outline-none focus:ring-2 focus:ring-border-focus/20 focus:ring-offset-0 focus:border-border-focus',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-bg-tertiary',
        fullWidth && 'w-full',
        !selected && !open && 'text-text-tertiary'
      )}
      onClick={() => setOpen((o) => !o)}
    >
      <span className="min-w-0 flex-1 truncate pr-6">{selected ? selected.label : placeholder}</span>
      <span
        className={cn(
          'pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-text-tertiary transition-transform',
          open && 'rotate-180'
        )}
        aria-hidden
      >
        <ChevronDownIcon className="w-5 h-5" />
      </span>
    </button>
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
      <ul role="listbox" className="py-1 overflow-auto flex-1">
        {filtered.length === 0 ? (
          <li className="px-3 py-4 text-sm text-text-tertiary text-center">{emptyMessage}</li>
        ) : (
          filtered.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              aria-disabled={opt.disabled}
              className={cn(
                'flex items-center gap-2 px-3 py-2 cursor-pointer text-sm text-text-primary transition-colors',
                value === opt.value && 'bg-bg-tertiary text-text-primary',
                value !== opt.value && 'hover:bg-bg-tertiary',
                opt.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
              )}
              onClick={() => !opt.disabled && handleSelect(opt.value)}
            >
              <span className="flex-1 truncate">{opt.label}</span>
              {value === opt.value && <CheckIcon className="w-4 h-4 shrink-0 text-primary" />}
            </li>
          ))
        )}
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

Combobox.displayName = 'Combobox'
