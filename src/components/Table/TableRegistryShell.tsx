import React from 'react'
import { cn } from '@/utils/cn'
import { tableRegistryShellClassName } from './tableRegistryTokens'

export interface TableRegistryShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * Wraps a {@link TableToolbar} `variant="registry"` and a {@link Table} with `containerVariant="registry"`
 * so they read as one rounded card with a clean separator between toolbar and table.
 */
export const TableRegistryShell = React.forwardRef<HTMLDivElement, TableRegistryShellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(tableRegistryShellClassName, className)} {...props}>
        {children}
      </div>
    )
  }
)

TableRegistryShell.displayName = 'TableRegistryShell'
