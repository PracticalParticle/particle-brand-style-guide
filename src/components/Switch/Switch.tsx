import React from 'react'
import { cn } from '@/utils/cn'

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helperText?: string
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error

    return (
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-center gap-3">
          <label
            htmlFor={switchId}
            className="relative inline-flex items-center cursor-pointer"
          >
            <input
              ref={ref}
              type="checkbox"
              id={switchId}
              className="sr-only peer"
              {...props}
            />
            <div
              className={cn(
                "w-11 h-6 bg-tertiary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-0 rounded-full peer",
                "peer-checked:after:translate-x-full peer-checked:after:border-white",
                "after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-default after:border after:rounded-full after:h-5 after:w-5 after:transition-all",
                "peer-checked:bg-primary",
                hasError && "border-error peer-checked:bg-error",
                className
              )}
            />
          </label>
          {label && (
            <label
              htmlFor={switchId}
              className="text-sm font-medium text-text-primary cursor-pointer"
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p className="text-sm text-error">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-sm text-text-tertiary">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Switch.displayName = 'Switch'
