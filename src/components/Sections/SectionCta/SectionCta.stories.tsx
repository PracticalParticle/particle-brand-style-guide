import type { Meta, StoryObj } from '@storybook/react'
import { SectionCta } from './SectionCta'
import { Button } from '../../Button'

const meta: Meta<typeof SectionCta> = {
  title: 'Sections/SectionCta',
  component: SectionCta,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['gradient', 'muted', 'minimal'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof SectionCta>

export const Default: Story = {
  args: {
    title: 'Ready to get started?',
    description: 'Request access or talk to our team about your use case.',
    action: <Button variant="primary">Request access</Button>,
    secondaryAction: <Button variant="secondary">Contact sales</Button>,
    variant: 'gradient',
    size: 'md',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-3xl">
      <SectionCta {...args} />
    </div>
  ),
}

export const Muted: Story = {
  args: {
    title: 'Join the waitlist',
    description: 'We’ll notify you when regulated token analytics are available.',
    action: <Button variant="primary">Notify me</Button>,
    variant: 'muted',
    size: 'md',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-3xl">
      <SectionCta {...args} />
    </div>
  ),
}

export const Minimal: Story = {
  args: {
    title: 'Need help?',
    action: <Button variant="outline">View documentation</Button>,
    variant: 'minimal',
    size: 'sm',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-2xl">
      <SectionCta {...args} />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-3xl">
      <SectionCta
        title="Small CTA"
        action={<Button variant="primary">Go</Button>}
        variant="muted"
        size="sm"
      />
      <SectionCta
        title="Medium CTA"
        description="Default size for most pages."
        action={<Button variant="primary">Continue</Button>}
        variant="muted"
        size="md"
      />
      <SectionCta
        title="Large CTA"
        description="More emphasis for key conversion points."
        action={<Button variant="primary">Get started</Button>}
        secondaryAction={<Button variant="ghost">Learn more</Button>}
        variant="muted"
        size="lg"
      />
    </div>
  ),
}
