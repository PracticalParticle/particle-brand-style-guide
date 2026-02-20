import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './Progress'

const meta: Meta<typeof Progress> = {
  title: 'Components/Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['default', 'success', 'warning', 'error'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    labelPosition: { control: 'radio', options: ['left', 'center', 'right'] },
  },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: { value: 60 },
  decorators: [
    (Story) => (
      <div className="w-full min-w-[16rem] max-w-md">
        <Story />
      </div>
    ),
  ],
}

export const WithLabel: Story = {
  args: { value: 75, showLabel: true },
  decorators: [
    (Story) => (
      <div className="w-full min-w-[16rem] max-w-md">
        <Story />
      </div>
    ),
  ],
}

export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-6 w-full min-w-[16rem] max-w-md">
      <div>
        <p className="text-xs text-text-secondary mb-2">Label right (default)</p>
        <Progress value={65} showLabel labelPosition="right" />
      </div>
      <div>
        <p className="text-xs text-text-secondary mb-2">Label left</p>
        <Progress value={40} showLabel labelPosition="left" />
      </div>
      <div>
        <p className="text-xs text-text-secondary mb-2">Label center</p>
        <Progress value={80} showLabel labelPosition="center" />
      </div>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Label can be aligned left, center, or right.' } },
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-full min-w-[16rem] max-w-md">
      <Progress value={70} variant="default" showLabel />
      <Progress value={70} variant="success" showLabel />
      <Progress value={70} variant="warning" showLabel />
      <Progress value={70} variant="error" showLabel />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-full min-w-[16rem] max-w-md">
      <div>
        <p className="text-xs text-text-secondary mb-2">Small</p>
        <Progress value={50} size="sm" />
      </div>
      <div>
        <p className="text-xs text-text-secondary mb-2">Medium</p>
        <Progress value={50} size="md" />
      </div>
      <div>
        <p className="text-xs text-text-secondary mb-2">Large</p>
        <Progress value={50} size="lg" />
      </div>
    </div>
  ),
}

export const CustomMax: Story = {
  args: { value: 3, max: 5, showLabel: true },
  decorators: [
    (Story) => (
      <div className="w-full min-w-[16rem] max-w-md">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: { description: { story: 'Use max for step-based progress (e.g. 3 of 5).' } },
  },
}
