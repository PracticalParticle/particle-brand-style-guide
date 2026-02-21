import React from 'react'
import { cn } from '@/utils/cn'
import { Spinner } from '../Spinner'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'ghost'
    | 'outline'
    | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  iconOnly?: boolean
  fullWidth?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      disabled,
      leftIcon,
      rightIcon,
      iconOnly = false,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      'inline-flex items-center justify-center font-medium rounded-control',
      'transition-all duration-normal ease-out',
      'focus-ring',
      'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none disabled:shadow-none',
      'select-none',
    ].join(' ')

    const variants = {
      /* Primary: black block (light) / white block (dark) + edge highlight */
      primary: [
        'bg-btn-primary text-text-inverse shadow-sm edge-highlight',
        'hover:bg-btn-primary-hover hover:-translate-y-px hover:shadow',
        'active:bg-btn-primary-active active:translate-y-0 active:shadow-sm',
      ].join(' '),

      /* Secondary: outline, fill on hover */
      secondary: [
        'bg-transparent border border-border text-text-primary',
        'hover:bg-bg-tertiary hover:border-border-hover hover:-translate-y-px hover:shadow-sm',
        'active:translate-y-0 active:shadow-none active:bg-bg-tertiary',
      ].join(' '),

      /* Danger: semantic error colors — use for destructive actions */
      danger: [
        'bg-error-light text-error border border-error/30',
        'hover:bg-error/10 hover:border-error/50 hover:shadow-sm',
        'active:bg-error/15 active:scale-[0.98]',
        'dark:bg-error/15 dark:text-error dark:border-error/25',
        'dark:hover:bg-error/25 dark:hover:border-error/40',
      ].join(' '),

      /* Ghost: transparent, fill on hover */
      ghost: [
        'bg-transparent text-text-primary',
        'hover:bg-bg-tertiary active:bg-bg-tertiary active:scale-[0.98]',
      ].join(' '),

      /* Outline: 1px border, light fill on hover */
      outline: [
        'border border-border text-text-primary bg-transparent',
        'hover:border-border-hover hover:bg-bg-tertiary hover:-translate-y-px',
        'active:translate-y-0 active:bg-bg-tertiary',
      ].join(' '),

      /* Link: text only */
      link: [
        'bg-transparent text-text-primary underline-offset-4 hover:underline',
        'p-0 h-auto shadow-none rounded-none',
      ].join(' '),
    }

    const sizes = {
      xs: iconOnly ? 'p-1.5' : 'px-2.5 py-1 text-xs gap-1 tracking-wide',
      sm: iconOnly ? 'p-2' : 'px-3 py-1.5 text-sm gap-1.5 tracking-wide',
      md: iconOnly ? 'p-2.5' : 'px-4 py-2 text-sm gap-2 tracking-wide min-h-[40px]',
      lg: iconOnly ? 'p-3' : 'px-5 py-2.5 text-base gap-2.5 min-h-[44px]',
      xl: iconOnly ? 'p-4' : 'px-7 py-3 text-base gap-3',
    }

    const iconSizes = {
      xs: 'w-3 h-3',
      sm: 'w-3.5 h-3.5',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
      xl: 'w-5 h-5',
    }

    const showChildren = !iconOnly && children

    // Derive a text label for screen readers when children is a string
    const srLabel = typeof children === 'string' ? children : undefined

    // Compute aria-label: for icon-only buttons use srLabel; loading state
    // will render a sr-only span instead, so don't double-up
    const computedAriaLabel = iconOnly ? (props['aria-label'] ?? srLabel) : props['aria-label']

    const { 'aria-label': _ariaLabel, type = 'button', ...restProps } = props

    return (
      <button
        ref={ref}
        type={type}
        data-variant={variant}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          iconOnly && 'aspect-square',
          className
        )}
        disabled={disabled || isLoading}
        aria-label={computedAriaLabel}
        {...restProps}
      >
        {isLoading ? (
          <>
            <Spinner
              variant={variant === 'primary' ? 'white' : 'primary'}
              size={
                size === 'xs' || size === 'sm'
                  ? 'sm'
                  : size === 'lg' || size === 'xl'
                    ? 'lg'
                    : 'md'
              }
              aria-hidden="true"
            />
            {/* Announce label to screen readers while visually showing spinner */}
            {srLabel && !computedAriaLabel && (
              <span className="sr-only">{srLabel}</span>
            )}
          </>
        ) : (
          <>
            {leftIcon && (
              <span
                className={cn('flex-shrink-0', iconSizes[size])}
                aria-hidden="true"
              >
                {leftIcon}
              </span>
            )}
            {showChildren && <span>{children}</span>}
            {rightIcon && (
              <span
                className={cn('flex-shrink-0', iconSizes[size])}
                aria-hidden="true"
              >
                {rightIcon}
              </span>
            )}
            {iconOnly && !leftIcon && !rightIcon && children}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
