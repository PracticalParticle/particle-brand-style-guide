import { cn } from '@/utils/cn'

/** Outer shell: toolbar + table as one rounded card (whitelist / registry pattern). */
export const tableRegistryShellClassName =
  'overflow-hidden rounded-3xl border border-border-subtle bg-bg-primary shadow-sm min-w-0 flex flex-col'

/** Toolbar strip inside the shell — muted band + single hairline separator above the table. */
export const tableRegistryToolbarStripClassName =
  'w-full border-b border-border-subtle bg-bg-secondary/50 px-5 py-5 sm:px-6'

/**
 * Search field styling aligned with the original allowlist workspace (rounded-2xl pill on primary bg).
 * Applied to `SearchInput`’s outer wrapper (`Input` form-container).
 */
export const tableRegistrySearchInputClassName = cn(
  'min-w-0 [&_input]:min-h-[48px] [&_input]:rounded-2xl [&_input]:border-border-subtle [&_input]:bg-bg-primary',
  '[&_input]:py-3 [&_input]:pl-12 [&_input]:pr-4 [&_input]:text-sm [&_input]:font-medium [&_input]:shadow-sm',
  '[&_input]:transition [&_input]:placeholder:text-text-muted',
  'focus-within:[&_input]:border-brand-primary focus-within:[&_input]:outline-none',
  'focus-within:[&_input]:ring-4 focus-within:[&_input]:ring-brand-primary/10'
)

/**
 * Toolbar `Select` (role filter, status, sort) next to pill search — same 48px height and visual weight.
 */
export const tableToolbarSelectMatchSearchClassName = cn(
  '[&_select]:h-12 [&_select]:min-h-[48px] [&_select]:rounded-2xl [&_select]:border [&_select]:border-border-subtle [&_select]:bg-bg-primary',
  '[&_select]:px-3 [&_select]:py-2.5 [&_select]:text-sm [&_select]:font-medium [&_select]:shadow-sm',
  '[&_select]:transition-colors'
)
