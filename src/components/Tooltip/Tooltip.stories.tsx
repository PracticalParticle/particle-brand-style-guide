import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from '../Button'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Surfaces/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    variant: {
      control: 'select',
      options: ['default', 'light', 'subtle'],
    },
    delay: { control: 'number' },
    showArrow: { control: 'boolean' },
    collisionPadding: { control: 'boolean' },
    usePortal: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
    placement: 'top',
  },
}

export const Placements: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-center p-16">
      <Tooltip content="Top tooltip" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <div className="flex gap-8">
        <Tooltip content="Left tooltip" placement="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" placement="right">
          <Button>Right</Button>
        </Tooltip>
      </div>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
    </div>
  ),
}

export const VariantDefault: Story = {
  args: {
    variant: 'default',
    content: 'Default tooltip — uses theme surface (bg-bg-secondary) so it matches light/dark theme.',
    children: <Button>Default</Button>,
  },
  parameters: {
    docs: { description: { story: 'Uses theme tokens: bg-bg-secondary, text-text-primary, border-default.' } },
  },
}

export const VariantLight: Story = {
  args: {
    variant: 'light',
    content: 'Light tooltip — surface style with border for cards and panels.',
    children: <Button variant="outline">Light</Button>,
  },
  parameters: {
    docs: { description: { story: 'Uses theme tokens: bg-bg-secondary, text-text-primary, border-default.' } },
  },
}

export const VariantSubtle: Story = {
  args: {
    variant: 'subtle',
    content: 'Subtle tooltip — muted background for low emphasis.',
    children: <Button variant="ghost">Subtle</Button>,
  },
  parameters: {
    docs: { description: { story: 'Uses theme tokens: bg-bg-tertiary with --tooltip-subtle-opacity; works in light and dark.' } },
  },
}

export const WithRichContent: Story = {
  args: {
    content: (
      <div>
        <div className="font-semibold mb-1 opacity-95">Tooltip Title</div>
        <div className="text-xs opacity-90">
          This tooltip contains rich content with multiple lines. Use for short help or descriptions.
        </div>
      </div>
    ),
    children: <Button>Rich Content</Button>,
    maxWidth: 220,
  },
}

export const WithIcon: Story = {
  render: () => (
    <Tooltip
      content={
        <span className="inline-flex items-center gap-2">
          <svg className="w-4 h-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Save your changes before leaving
        </span>
      }
    >
      <Button variant="outline" size="sm">Save</Button>
    </Tooltip>
  ),
  parameters: {
    docs: { description: { story: 'Tooltip with leading icon for hints and validation.' } },
  },
}

export const Compact: Story = {
  args: {
    content: 'Copied!',
    children: <Button variant="ghost" size="sm">Copy</Button>,
    maxWidth: 80,
  },
  parameters: {
    docs: { description: { story: 'Short, single-word feedback (e.g. after copy action).' } },
  },
}

export const CustomDelay: Story = {
  args: {
    content: 'Appears after 500ms',
    children: <Button variant="outline">Slow trigger</Button>,
    delay: 500,
  },
}

export const NoArrow: Story = {
  args: {
    content: 'Tooltip without arrow',
    children: <Button variant="ghost">No arrow</Button>,
    showArrow: false,
  },
}

export const OnDifferentElements: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <Tooltip content="Button tooltip">
        <Button>Button</Button>
      </Tooltip>
      <Tooltip content="Link tooltip">
        <a href="#" className="text-tertiary dark:text-tertiary-on-dark hover:underline font-medium">
          Link
        </a>
      </Tooltip>
      <Tooltip content="Icon tooltip">
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-default/40 transition-colors"
          aria-label="Info"
        >
          <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Tooltips work on any focusable/hoverable child. Use design tokens (text-tertiary, hover:bg-default/40).' } },
  },
}

export const Disabled: Story = {
  args: {
    content: 'This tooltip is disabled',
    disabled: true,
    children: <Button>Disabled Tooltip</Button>,
  },
}

export const CollisionFlips: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-center p-16">
      <p className="text-sm text-text-tertiary">Resize or scroll. Tooltip flips to stay on screen.</p>
      <Tooltip content="I flip to top if there's no room below" placement="bottom" collisionPadding>
        <Button>Near bottom</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'With collisionPadding, placement flips when there is not enough space.' } },
  },
}
