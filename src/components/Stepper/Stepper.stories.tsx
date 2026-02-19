import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Stepper } from './Stepper'
import { Button } from '../Button'
import { Card } from '../Card'

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minWidth: 800, width: '100%', maxWidth: 960 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    responsive: { control: 'boolean' },
    size: { control: 'radio', options: ['sm', 'md'] },
    variant: { control: 'radio', options: ['default', 'minimal'] },
    currentStep: { control: { type: 'number', min: 0 } },
  },
}

export default meta
type Story = StoryObj<typeof Stepper>

const steps3 = ['Details', 'Review', 'Confirm']
const steps5 = ['Account', 'Profile', 'Plan', 'Billing', 'Done']
const stepsOnboarding = ['Sign up', 'Verify email', 'Company profile', 'Invite team', 'Go live']
const descriptionsOnboarding = [
  'Create your account',
  'Check your inbox',
  'Tell us about your company',
  'Add teammates (optional)',
  'You’re ready to use the product',
]

/** Default horizontal stepper with labels. */
export const Default: Story = {
  args: {
    steps: steps3,
    currentStep: 1,
    orientation: 'horizontal',
    variant: 'default',
  },
}

/** Vertical layout with one continuous line through step centers. */
export const Vertical: Story = {
  args: {
    steps: steps3,
    currentStep: 1,
    orientation: 'vertical',
  },
}

/** Minimal: step indicators only, no labels. */
export const Minimal: Story = {
  args: {
    steps: steps5,
    currentStep: 2,
    orientation: 'horizontal',
    variant: 'minimal',
  },
}

/** With optional descriptions per step. */
export const WithDescriptions: Story = {
  args: {
    steps: stepsOnboarding,
    currentStep: 2,
    descriptions: descriptionsOnboarding,
    orientation: 'horizontal',
  },
}

/** Vertical with descriptions. */
export const VerticalWithDescriptions: Story = {
  args: {
    steps: stepsOnboarding,
    currentStep: 1,
    descriptions: descriptionsOnboarding,
    orientation: 'vertical',
  },
}

/** Responsive: vertical on small screens, horizontal on md+. */
export const Responsive: Story = {
  args: {
    steps: steps3,
    currentStep: 1,
    responsive: true,
  },
}

/** Click any step (circle or label) to jump to that step. Pass `onStepClick` to enable. */
export const ClickableSteps: Story = {
  render: function ClickableStepsStory() {
    const [currentStep, setCurrentStep] = useState(1)
    return (
      <Card className="p-6 w-full max-w-xl space-y-4">
        <Stepper
          steps={steps3}
          currentStep={currentStep}
          orientation="horizontal"
          onStepClick={setCurrentStep}
        />
        <p className="text-sm text-text-tertiary">
          Click a step to jump to it. Current: step {currentStep + 1}.
        </p>
      </Card>
    )
  },
}

/** Previous/Next buttons to move between steps. */
export const WithButtons: Story = {
  render: function WithButtonsStory() {
    const [currentStep, setCurrentStep] = useState(1)
    return (
      <Card className="p-6 w-full max-w-xl space-y-6">
        <Stepper steps={steps3} currentStep={currentStep} orientation="horizontal" />
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setCurrentStep((s) => Math.min(steps3.length - 1, s + 1))}
          >
            Next
          </Button>
        </div>
      </Card>
    )
  },
}
