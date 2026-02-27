import type { Meta, StoryObj } from '@storybook/react'
import { SectionLogos } from './SectionLogos'
import type { LogoItem } from './SectionLogos'

/**
 * Placeholder logos for Storybook. Replace with your own image paths in consuming apps.
 */
const placeholderLogos: LogoItem[] = [
  { src: 'https://via.placeholder.com/120x32?text=Partner+A', alt: 'Partner A', whiteBg: true },
  { src: 'https://via.placeholder.com/100x28?text=Partner+B', alt: 'Partner B' },
  { src: 'https://via.placeholder.com/140x36?text=Partner+C', alt: 'Partner C', whiteBg: true },
]

const meta: Meta<typeof SectionLogos> = {
  title: 'Sections/SectionLogos',
  component: SectionLogos,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    logoHeight: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof SectionLogos>

export const Default: Story = {
  args: {
    title: 'Partners',
    description: 'Use SectionLogos for a logo strip. Optional links and white-background containers.',
    items: placeholderLogos,
    logoHeight: 'md',
    showHeaderDivider: true,
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-6xl">
      <SectionLogos {...args} />
    </div>
  ),
}

export const WithLinks: Story = {
  args: {
    title: 'Partners',
    items: placeholderLogos.map((logo, i) => ({
      ...logo,
      href: i === 0 ? 'https://example.com' : undefined,
    })),
  },
  render: Default.render,
}

export const WithBackgroundPattern: Story = {
  ...Default,
  args: {
    ...Default.args,
    withBackgroundPattern: true,
  },
  render: Default.render,
}

export const LogoHeightSmall: Story = {
  ...Default,
  args: {
    ...Default.args,
    logoHeight: 'sm',
  },
  render: Default.render,
}

export const LogoHeightLarge: Story = {
  ...Default,
  args: {
    ...Default.args,
    logoHeight: 'lg',
  },
  render: Default.render,
}
