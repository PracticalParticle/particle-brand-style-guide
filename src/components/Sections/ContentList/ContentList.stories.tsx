import type { Meta, StoryObj } from '@storybook/react'
import { ContentList } from './ContentList'
import type { ContentListItem } from './ContentList'
import { Button } from '../../Button'

const LockIcon = () => (
  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)
const ShieldIcon = () => (
  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)
const PlugIcon = () => (
  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const defaultItems: ContentListItem[] = [
  {
    icon: <ShieldIcon />,
    title: 'Feature one',
    description:
      'A short description of the first capability. Use this pattern for product or documentation sections with optional icons and actions.',
  },
  {
    icon: <LockIcon />,
    title: 'Feature two',
    description:
      'Another capability with a clear label and body copy. ContentList supports optional icons, titles, descriptions, and a call-to-action per item.',
  },
  {
    icon: <PlugIcon />,
    title: 'Feature three',
    description:
      'Extend or customize the list with your own content. Each item can include an optional action button or link in the card footer.',
    action: (
      <Button variant="outline" size="sm">
        Learn more
      </Button>
    ),
  },
]

const meta: Meta<typeof ContentList> = {
  title: 'Sections/ContentList',
  component: ContentList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    cardVariant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'filled', 'glass', 'on-gradient'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    descriptionSize: { control: 'select', options: ['sm', 'md'] },
    maxWidth: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
  },
}

export default meta
type Story = StoryObj<typeof ContentList>

export const Default: Story = {
  args: {
    title: 'Key features',
    description:
      'Use ContentList for a single-column stacked layout. Each item is rendered as a card with optional icon, title, description, and action.',
    items: defaultItems,
    cardVariant: 'outlined',
    size: 'md',
    descriptionSize: 'md',
    showHeaderDivider: true,
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-6xl">
      <ContentList {...args} />
    </div>
  ),
}

export const CardVariantDefault: Story = {
  ...Default,
  args: { ...Default.args, cardVariant: 'default' },
  render: Default.render,
}

export const CardVariantElevated: Story = {
  ...Default,
  args: { ...Default.args, cardVariant: 'elevated' },
  render: Default.render,
}

export const CardVariantGlass: Story = {
  ...Default,
  args: { ...Default.args, cardVariant: 'glass' },
  render: Default.render,
}

export const CardVariantOnGradient: Story = {
  ...Default,
  args: { ...Default.args, cardVariant: 'on-gradient' },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-6xl rounded-lg bg-gradient-to-br from-bg-surface-muted to-bg-canvas p-6">
      <ContentList {...args} />
    </div>
  ),
}

export const WithBackgroundPattern: Story = {
  ...Default,
  args: {
    ...Default.args,
    withBackgroundPattern: true,
  },
  render: Default.render,
}

export const SizeLarge: Story = {
  ...Default,
  args: {
    ...Default.args,
    size: 'lg',
  },
  render: Default.render,
}

export const NoIcons: Story = {
  args: {
    title: 'Capabilities',
    description: 'A simple list without icons.',
    items: defaultItems.map(({ icon: _, ...rest }) => rest),
    cardVariant: 'outlined',
    size: 'md',
  },
  render: Default.render,
}

export const FullWidth: Story = {
  ...Default,
  args: {
    ...Default.args,
    maxWidth: 'full',
  },
  render: Default.render,
}
