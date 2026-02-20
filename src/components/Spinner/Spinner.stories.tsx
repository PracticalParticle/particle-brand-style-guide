import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from './Spinner'

const meta: Meta<typeof Spinner> = {
  title: 'Components/Feedback/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'white', 'branded', 'branded-white'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'primary',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-xs text-neutral-600 dark:text-neutral-400">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-xs text-neutral-600 dark:text-neutral-400">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-xs text-neutral-600 dark:text-neutral-400">Large</span>
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Spinner variant="primary" />
        <span>Primary</span>
      </div>
      <div className="flex items-center gap-4">
        <Spinner variant="secondary" />
        <span>Secondary</span>
      </div>
      <div className="flex items-center gap-4 p-4 bg-primary-500 rounded-lg">
        <Spinner variant="white" />
        <span className="text-white">White</span>
      </div>
      <div className="flex items-center gap-4">
        <Spinner variant="branded" />
        <span>Branded (logo triangles)</span>
      </div>
      <div className="flex items-center gap-4 p-4 bg-primary-500 rounded-lg">
        <Spinner variant="branded-white" />
        <span className="text-white">Branded white (e.g. on primary button)</span>
      </div>
    </div>
  ),
}

export const Branded: Story = {
  args: {
    variant: 'branded',
    size: 'md',
  },
  render: (args) => (
    <div className="flex flex-col items-center gap-8">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Sides (apart → together), then one full spin when connected; repeats
      </p>
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <Spinner {...args} size="sm" />
          <span className="text-xs text-neutral-600 dark:text-neutral-400">Small</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Spinner {...args} size="md" />
          <span className="text-xs text-neutral-600 dark:text-neutral-400">Medium</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Spinner {...args} size="lg" />
          <span className="text-xs text-neutral-600 dark:text-neutral-400">Large</span>
        </div>
      </div>
    </div>
  ),
}

export const InButton: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <button className="px-4 py-2 bg-primary-500 text-white rounded-lg flex items-center gap-2">
        <Spinner size="sm" variant="white" />
        Loading...
      </button>
      <button className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg flex items-center gap-2" disabled>
        <Spinner size="sm" variant="primary" />
        Processing
      </button>
      <button className="px-4 py-2 border border-primary rounded-lg flex items-center gap-2" disabled>
        <Spinner size="sm" variant="branded" />
        Branded
      </button>
    </div>
  ),
}
