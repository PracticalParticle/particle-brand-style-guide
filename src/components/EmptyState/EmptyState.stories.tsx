import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from './EmptyState'
import { Button } from '../Button'

const meta: Meta<typeof EmptyState> = {
  title: 'Components/Data display/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    title: 'No items found',
    description: 'There are no items to display at this time.',
  },
}

export const WithAction: Story = {
  args: {
    title: 'No data available',
    description: 'Get started by creating your first item.',
    action: <Button variant="primary">Create Item</Button>,
  },
}

export const WithCustomIcon: Story = {
  args: {
    title: 'No results',
    description: 'Try adjusting your search or filters.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-12">
      <EmptyState
        size="sm"
        title="Small Empty State"
        description="This is a small empty state."
      />
      <EmptyState
        size="md"
        title="Medium Empty State"
        description="This is a medium empty state."
      />
      <EmptyState
        size="lg"
        title="Large Empty State"
        description="This is a large empty state."
      />
    </div>
  ),
}

export const DifferentScenarios: Story = {
  render: () => (
    <div className="space-y-8">
      <EmptyState
        title="No projects"
        description="You haven't created any projects yet."
        action={<Button variant="primary">Create Project</Button>}
      />
      <EmptyState
        title="No notifications"
        description="You're all caught up!"
        icon={
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
      <EmptyState
        title="Error loading data"
        description="Something went wrong. Please try again."
        action={<Button variant="outline">Retry</Button>}
        icon={
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        }
      />
    </div>
  ),
}
