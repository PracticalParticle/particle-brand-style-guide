import type { Meta, StoryObj } from '@storybook/react'
import { Hero } from './Hero'
import { Button } from '../../Button'
import { Badge } from '../../Badge'
import { Logo } from '../../Logo'

const meta: Meta<typeof Hero> = {
  title: 'Sections/Hero',
  component: Hero,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    align: { control: 'select', options: ['center', 'left'] },
    variant: { control: 'select', options: ['gradient', 'muted', 'minimal'] },
  },
}

export default meta
type Story = StoryObj<typeof Hero>

export const Default: Story = {
  args: {
    title: 'Secure, compliant infrastructure for digital assets',
    subtitle: 'BloxChain Protocol — governance and control for regulated smart accounts on public blockchains.',
    primaryAction: <Button variant="primary">Get started</Button>,
    secondaryAction: <Button variant="secondary">Learn more</Button>,
    size: 'md',
    variant: 'gradient',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-4xl">
      <Hero {...args} />
    </div>
  ),
}

export const WithBadgeAndLogo: Story = {
  args: {
    badge: <Badge variant="outline">Now available</Badge>,
    title: 'Particle Crypto Security LTD',
    subtitle: 'Design system & style guide for enterprise security applications.',
    visual: <Logo size="xl" variant="default" aria-hidden className="w-16 h-16 sm:w-20 sm:h-20" />,
    primaryAction: <Button variant="primary">View components</Button>,
    secondaryAction: <Button variant="outline">Documentation</Button>,
    size: 'md',
    variant: 'gradient',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-4xl">
      <Hero {...args} />
    </div>
  ),
}

export const LeftAligned: Story = {
  args: {
    title: 'Built for institutions that need control',
    subtitle: 'Identity at the account layer. Enforceable interventions. Full audit trail.',
    align: 'left',
    primaryAction: <Button variant="primary">Request access</Button>,
    secondaryAction: <Button variant="ghost">Read the whitepaper</Button>,
    size: 'md',
    variant: 'gradient',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-4xl">
      <Hero {...args} />
    </div>
  ),
}

export const MutedVariant: Story = {
  args: {
    title: 'Compliance by architecture',
    subtitle: 'One governed layer for multiple token types under a consistent compliance model.',
    primaryAction: <Button variant="primary">Explore</Button>,
    size: 'sm',
    variant: 'muted',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-3xl">
      <Hero {...args} />
    </div>
  ),
}

export const Minimal: Story = {
  args: {
    title: 'Minimal hero',
    subtitle: 'No background treatment — for use on custom layouts or colored canvases.',
    variant: 'minimal',
    size: 'sm',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-2xl">
      <Hero {...args} />
    </div>
  ),
}

export const WithGradientTitleAndDivider: Story = {
  args: {
    title: 'Secure, compliant infrastructure',
    subtitle: 'BloxChain Protocol — governance and control for regulated smart accounts.',
    titleGradient: true,
    showDividerLine: true,
    primaryAction: <Button variant="primary">Get started</Button>,
    secondaryAction: <Button variant="outline">Learn more</Button>,
    size: 'md',
    variant: 'gradient',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-4xl">
      <Hero {...args} />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-12 w-full max-w-4xl">
      <Hero
        size="sm"
        title="Small hero"
        subtitle="Compact for dense pages or secondary sections."
        variant="muted"
      />
      <Hero
        size="md"
        title="Medium hero"
        subtitle="Default for most landing or product headers."
        variant="muted"
      />
      <Hero
        size="lg"
        title="Large hero"
        subtitle="Maximum impact for homepage or campaign sections."
        variant="muted"
      />
    </div>
  ),
}
