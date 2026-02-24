import type { Meta, StoryObj } from '@storybook/react'
import { MediaSection } from './MediaSection'

const meta: Meta<typeof MediaSection> = {
  title: 'Sections/MediaSection',
  component: MediaSection,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    alignment: { control: 'select', options: ['left', 'center', 'right'] },
    maxWidth: { control: 'select', options: ['md', 'lg', 'xl', 'full'] },
  },
}

export default meta
type Story = StoryObj<typeof MediaSection>

export const Default: Story = {
  args: {
    title: 'Watch the overview',
    subtitle: 'A quick introduction to the platform.',
    alignment: 'center',
    maxWidth: 'xl',
    children: (
      <div className="aspect-video w-full bg-bg-surface-muted flex items-center justify-center text-text-muted text-sm">
        Video or embed placeholder
      </div>
    ),
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-4xl">
      <MediaSection {...args} />
    </div>
  ),
}

export const WithNarrowMedia: Story = {
  args: {
    title: 'Product demo',
    subtitle: 'See how it works.',
    maxWidth: 'md',
    children: (
      <div className="aspect-video w-full bg-bg-surface-muted flex items-center justify-center text-text-muted text-sm">
        Embed area
      </div>
    ),
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-3xl">
      <MediaSection {...args} />
    </div>
  ),
}
