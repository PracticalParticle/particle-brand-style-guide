import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {
    variant: 'rectangular',
    width: 200,
    height: 20,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Skeleton variant="text" width="100%" height={20} />
      <Skeleton variant="rectangular" width="100%" height={100} />
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="80%" height={16} />
          <Skeleton variant="text" width="60%" height={16} />
        </div>
      </div>
    </div>
  ),
}

export const Animations: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Pulse (default)</p>
        <Skeleton variant="rectangular" width="100%" height={40} animation="pulse" />
      </div>
      <div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Wave</p>
        <Skeleton variant="rectangular" width="100%" height={40} animation="wave" />
      </div>
      <div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">None</p>
        <Skeleton variant="rectangular" width="100%" height={40} animation="none" />
      </div>
    </div>
  ),
}

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-96 p-6 border border-neutral-200 dark:border-neutral-700 rounded-lg space-y-4">
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton variant="text" width="80%" height={24} />
      <Skeleton variant="text" width="100%" height={16} />
      <Skeleton variant="text" width="60%" height={16} />
      <div className="flex gap-2">
        <Skeleton variant="rectangular" width={80} height={32} />
        <Skeleton variant="rectangular" width={80} height={32} />
      </div>
    </div>
  ),
}

export const ListSkeleton: Story = {
  render: () => (
    <div className="w-96 space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="70%" height={16} />
            <Skeleton variant="text" width="50%" height={14} />
          </div>
        </div>
      ))}
    </div>
  ),
}
