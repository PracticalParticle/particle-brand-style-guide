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
    // One continuous line from first circle center to last circle center (steps are equal width).
    const isClickable = !!onStepClick
    const lineTop = size === 'sm' ? 'top-4' : 'top-5' // half of circle height
    const n = steps.length
    const lineInset = n > 0 ? `${100 / (2 * n)}%` : '50%' // center of first/last step column
    const completedPercent =
      n <= 1 ? 100 : (currentStep / (n - 1)) * 100
    const completedWidth = n <= 1 ? '100%' : `calc((100% - ${100 / n}%) * ${completedPercent} / 100)`

    return (
      <div className="relative flex w-full items-start">
        {/* Track from first circle center to last circle center */}
        <div
          className={cn(
            'absolute h-0.5 rounded-full bg-border',
            lineTop
          )}
          style={{ left: lineInset, right: lineInset }}
          aria-hidden
        />
        {/* Completed segment */}
        <div
          className={cn(
            'absolute h-0.5 rounded-full bg-tertiary transition-all duration-200',
            lineTop
          )}
          style={{ left: lineInset, width: completedWidth }}
          aria-hidden
        />
        {/* Steps on top of line */}
        {steps.map((label, index) => {
          const { isActive } = getStepState(index)
          const description = descriptions?.[index]
          const stepEl = (
            <div
              className={cn(
                'relative z-10 flex flex-1 min-w-0 flex-col items-center text-center',
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
          return <React.Fragment key={label}>{stepEl}</React.Fragment>
        })}
      </div>
    )
  }

  const renderVertical = () => {
    // One continuous vertical line behind the circles (no gaps). Line through circle centers.
    const lineOffset = size === 'sm' ? '1rem' : '1.25rem' // half of w-8 / w-10
    const completedPercent =
      steps.length <= 1 ? 100 : (currentStep / (steps.length - 1)) * 100

    return (
      <div className="relative flex flex-col">
        {/* Full-height track line (inactive) */}
        <div
          className="absolute w-0.5 rounded-full bg-border"
          style={{
            left: `calc(${lineOffset} - 1px)`,
            top: lineOffset,
            bottom: lineOffset,
          }}
          aria-hidden
        />
        {/* Completed segment on top of track */}
        <div
          className="absolute w-0.5 rounded-full bg-tertiary transition-all duration-200"
          style={{
            left: `calc(${lineOffset} - 1px)`,
            top: lineOffset,
            height: `calc(100% - 2 * ${lineOffset})`,
            clipPath: `inset(0 0 ${100 - completedPercent}% 0)`,
          }}
          aria-hidden
        />

        {steps.map((label, index) => {
          const { isActive, isCompleted } = getStepState(index)
          const description = descriptions?.[index]
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
              <div className="flex flex-shrink-0 flex-col items-center">
                {circleEl}
              </div>

              {showLabels && (
                <div
                  className={cn(
                    'pb-8 pt-0.5 min-w-0 flex-1',
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
