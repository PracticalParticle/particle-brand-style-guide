import type { Meta, StoryObj } from '@storybook/react'
import { ComingSoon } from './ComingSoon'
import { Button } from '../../Button'
import { Badge } from '../../Badge'

const meta: Meta<typeof ComingSoon> = {
  title: 'Sections/ComingSoon',
  component: ComingSoon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['gradient', 'muted', 'minimal'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof ComingSoon>

export const Default: Story = {
  args: {
    title: 'Coming soon',
    description: 'This feature is in the works. We’ll share updates when it’s ready.',
    variant: 'gradient',
    size: 'md',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-4xl">
      <ComingSoon {...args} />
    </div>
  ),
}

export const MutedVariant: Story = {
  args: {
    variant: 'muted',
    title: 'Coming soon',
    description: 'New reporting and analytics are on the way. Stay tuned.',
    size: 'md',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-4xl">
      <ComingSoon {...args} />
    </div>
  ),
}

export const MinimalVariant: Story = {
  args: {
    variant: 'minimal',
    title: 'Coming soon',
    description: 'Compact placeholder for inline or tight layouts.',
    size: 'sm',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-2xl">
      <ComingSoon {...args} />
    </div>
  ),
}

export const WithBadgeAndActions: Story = {
  args: {
    variant: 'gradient',
    title: 'Regulated token analytics',
    description: 'Charts, compliance metrics, and audit trails will be available here.',
    badge: <Badge variant="outline">Q2 2025</Badge>,
    primaryAction: <Button variant="primary">Notify me</Button>,
    secondaryAction: <Button variant="outline">Back</Button>,
    size: 'md',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-4xl">
      <ComingSoon {...args} />
    </div>
  ),
}

export const WithGradientTitleAndDivider: Story = {
  args: {
    variant: 'gradient',
    title: 'Coming soon',
    description: "We're building something great. Check back soon.",
    titleGradient: true,
    showDividerLine: true,
    primaryAction: <Button variant="primary">Get updates</Button>,
    secondaryAction: <Button variant="outline">Learn more</Button>,
    size: 'md',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-4xl">
      <ComingSoon {...args} />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-12 w-full max-w-4xl">
      <ComingSoon
        variant="muted"
        size="sm"
        title="Coming soon"
        description="Small size for compact areas."
      />
      <ComingSoon
        variant="muted"
        size="md"
        title="Coming soon"
        description="Default size for most use cases."
      />
      <ComingSoon
        variant="muted"
        size="lg"
        title="Coming soon"
        description="Larger size for focus sections."
      />
    </div>
  ),
}

export const FullWidthSection: Story = {
  render: () => (
    <div className="w-full min-w-[320px]">
      <ComingSoon
        variant="gradient"
        size="lg"
        title="We're building something new"
        description="This page is under development. Sign up to be notified when it launches."
        primaryAction={<Button variant="primary">Get notified</Button>}
        secondaryAction={<Button variant="outline">Back to home</Button>}
      />
    </div>
  ),
}
