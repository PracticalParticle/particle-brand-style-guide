import React from 'react'
import { cn } from '@/utils/cn'

export interface StepperProps {
  /** Step labels in order */
  steps: string[]
  /** Current step index (0-based) */
  currentStep: number
  /** Optional descriptions per step (same length as steps). Shown in default variant when provided. */
  descriptions?: (string | undefined)[]
  /** Called when a step is clicked. When provided, steps are interactive (clickable). */
  onStepClick?: (index: number) => void
  /** Layout direction */
  orientation?: 'horizontal' | 'vertical'
  /** When true: vertical on small screens, horizontal on md+ */
  responsive?: boolean
  /** Compact (sm) or default (md) step size */
  size?: 'sm' | 'md'
  /** default = labels (and optional descriptions), minimal = indicators only */
  variant?: 'default' | 'minimal'
  className?: string
}

const CheckIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  descriptions,
  onStepClick,
  orientation = 'horizontal',
  responsive = false,
  size = 'md',
  variant = 'default',
  className,
}) => {
  if (!steps.length) return null

  const isVertical = orientation === 'vertical'
  const showLabels = variant === 'default'
  const circleSize = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm'

  const getStepState = (index: number) => {
    const isActive = index === currentStep
    const isCompleted = index < currentStep
    const isUpcoming = index > currentStep
    return { isActive, isCompleted, isUpcoming }
  }

  const circleClass = (index: number) => {
    const { isActive, isCompleted, isUpcoming } = getStepState(index)
    return cn(
      'rounded-full flex items-center justify-center font-semibold transition-colors flex-shrink-0',
      circleSize,
      textSize,
      isCompleted && 'bg-tertiary text-text-inverse',
      isActive &&
        'bg-tertiary text-text-inverse ring-2 ring-tertiary/30 ring-offset-2 ring-offset-secondary',
      isUpcoming && 'bg-border text-text-tertiary'
    )
  }

  const renderHorizontal = () => {
    // One row: each step is one flex item (circle + label in a column). Connector in a fixed-height band so line runs through circle centers.
    const isClickable = !!onStepClick
    const connectorBandHeight = size === 'sm' ? 'h-8' : 'h-10' // same as circle so line is at circle level

    return (
      <div className="flex w-full items-start">
        {steps.map((label, index) => {
          const { isActive } = getStepState(index)
          const description = descriptions?.[index]
          const isLast = index === steps.length - 1
          const stepEl = (
            <div
              className={cn(
                'flex flex-1 min-w-0 flex-col items-center text-center',
                isClickable && 'cursor-pointer'
              )}
              onClick={isClickable ? () => onStepClick(index) : undefined}
              onKeyDown={
                isClickable
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onStepClick(index)
                      }
                    }
                  : undefined
              }
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              aria-current={isActive ? 'step' : undefined}
              aria-label={isClickable ? `Go to step ${index + 1}: ${label}` : undefined}
            >
              <div className={cn(circleClass(index))}>
                {getStepState(index).isCompleted ? <CheckIcon /> : index + 1}
              </div>
              {showLabels && (
                <div className="mt-2 min-w-0 px-1">
                  <div
                    className={cn(
                      'font-medium break-words',
                      textSize,
                      isActive ? 'text-text-primary' : 'text-text-tertiary'
                    )}
                  >
                    {label}
                  </div>
                  {description && (
                    <div className={cn('text-text-tertiary mt-0.5 break-words', textSize)}>
                      {description}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
          return (
            <React.Fragment key={label}>
              {stepEl}
              {!isLast && (
                <div
                  className={cn(
                    'flex flex-1 min-w-4 flex-shrink items-center',
                    connectorBandHeight
                  )}
                  aria-hidden
                >
                  <div
                    className={cn(
                      'h-0.5 w-full rounded-full transition-colors',
                      index < currentStep ? 'bg-tertiary' : 'bg-border'
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    )
  }

  const renderVertical = () => {
    const connectorMinHeight = size === 'sm' ? 'min-h-4' : 'min-h-5'
    return (
      <div className="flex flex-col">
        {steps.map((label, index) => {
          const { isActive, isCompleted } = getStepState(index)
          const description = descriptions?.[index]
          const isLast = index === steps.length - 1
          const isClickable = !!onStepClick
          const circleEl = (
            <div
              className={cn(
                'relative z-10 flex-shrink-0',
                circleClass(index),
                isClickable && 'cursor-pointer'
              )}
              onClick={isClickable ? () => onStepClick(index) : undefined}
              onKeyDown={
                isClickable
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onStepClick(index)
                      }
                    }
                  : undefined
              }
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              aria-current={isActive ? 'step' : undefined}
              aria-label={isClickable ? `Go to step ${index + 1}: ${label}` : undefined}
            >
              {isCompleted ? <CheckIcon /> : index + 1}
            </div>
          )

          return (
            <div key={label} className="flex gap-4">
              {/* Left column: circle + connector line (flush, no gap) */}
              <div className="flex flex-shrink-0 flex-col items-center">
                {circleEl}
                {!isLast && (
                  <div
                    className={cn(
                      '-mt-px w-0.5 flex-1 min-w-0 rounded-full transition-colors',
                      connectorMinHeight,
                      index < currentStep ? 'bg-tertiary' : 'bg-border'
                    )}
                    aria-hidden
                  />
                )}
              </div>

              {showLabels && (
                <div
                  className={cn(
                    'pb-6 pt-0.5 min-w-0 flex-1',
                    isClickable && 'cursor-pointer'
                  )}
                  onClick={isClickable ? () => onStepClick(index) : undefined}
                  onKeyDown={
                    isClickable
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            onStepClick(index)
                          }
                        }
                      : undefined
                  }
                  role={isClickable ? 'button' : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                >
                  <div
                    className={cn(
                      'font-medium',
                      textSize,
                      isActive ? 'text-text-primary' : 'text-text-tertiary'
                    )}
                  >
                    {label}
                  </div>
                  {description && (
                    <div className={cn('text-text-tertiary mt-0.5', textSize)}>{description}</div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  if (responsive) {
    return (
      <nav aria-label={`Step ${currentStep + 1} of ${steps.length}`} className={className}>
        <div className="flex flex-col w-full md:hidden">{renderVertical()}</div>
        <div className="hidden w-full md:block">{renderHorizontal()}</div>
      </nav>
    )
  }

  const content = isVertical ? renderVertical() : renderHorizontal()
  return (
    <nav aria-label={`Step ${currentStep + 1} of ${steps.length}`} className={className}>
      {content}
    </nav>
  )
}

Stepper.displayName = 'Stepper'
