import React from 'react'
import { cn } from '@/utils/cn'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** When true, appends a visible required indicator (*) for accessibility. */
  required?: boolean
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label ref={ref} className={cn('form-label', className)} {...props}>
      {children}
      {required && (
        <span className="text-text-primary ml-1 font-semibold" aria-label="required">
          *
        </span>
      )}
    </label>
  )
)

Label.displayName = 'Label'
