import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Popover } from './Popover'
import { Button } from '../Button'

const meta: Meta<typeof Popover> = {
  title: 'Components/Surfaces/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover'],
    },
    collisionPadding: { control: 'boolean' },
    usePortal: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  args: {
    placement: 'bottom',
    content: (
      <div>
        <h3 className="font-semibold mb-2 text-text-primary">Popover Title</h3>
        <p className="text-sm text-text-secondary">
          This is a popover with some content. Click outside to close.
        </p>
      </div>
    ),
    children: <Button>Open Popover</Button>,
  },
}

export const DefaultBottom: Story = {
  args: {
    ...Default.args,
    placement: 'bottom',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default placement is bottom; animation slides up from below the trigger.',
      },
    },
  },
}

export const Placements: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-center p-16">
      <Popover
        content={<div className="p-2">Top popover</div>}
        placement="top"
      >
        <Button>Top</Button>
      </Popover>
      <div className="flex gap-8">
        <Popover
          content={<div className="p-2">Left popover</div>}
          placement="left"
        >
          <Button>Left</Button>
        </Popover>
        <Popover
          content={<div className="p-2">Right popover</div>}
          placement="right"
        >
          <Button>Right</Button>
        </Popover>
      </div>
      <Popover
        content={<div className="p-2">Bottom popover</div>}
        placement="bottom"
      >
        <Button>Bottom</Button>
      </Popover>
    </div>
  ),
}

export const HoverTrigger: Story = {
  args: {
    trigger: 'hover',
    content: (
      <div>
        <h3 className="font-semibold mb-2 text-text-primary">Hover Popover</h3>
        <p className="text-sm text-text-secondary">
          This popover opens on hover.
        </p>
      </div>
    ),
    children: <Button>Hover me</Button>,
  },
}

export const MenuStyle: Story = {
  render: () => (
    <Popover
      placement="bottom"
      content={
        <div className="py-1 min-w-[10rem]">
          <button type="button" className="w-full text-left px-3 py-2 text-sm text-text-primary hover:bg-default/40 rounded-md">
            Edit
          </button>
          <button type="button" className="w-full text-left px-3 py-2 text-sm text-text-primary hover:bg-default/40 rounded-md">
            Duplicate
          </button>
          <button type="button" className="w-full text-left px-3 py-2 text-sm text-text-primary hover:bg-default/40 rounded-md">
            Share
          </button>
          <hr className="my-1 border-default" />
          <button type="button" className="w-full text-left px-3 py-2 text-sm text-error hover:bg-error-light/20 rounded-md">
            Delete
          </button>
        </div>
      }
    >
      <Button variant="outline">Menu</Button>
    </Popover>
  ),
  parameters: {
    docs: { description: { story: 'Dropdown-style menu for SaaS / app UIs.' } },
  },
}

export const NotificationStyle: Story = {
  render: () => (
    <Popover
      placement="bottom"
      content={
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center flex-shrink-0">
              <span className="text-tertiary text-sm font-semibold">1</span>
            </div>
            <div>
              <p className="font-medium text-text-primary text-sm">New comment</p>
              <p className="text-xs text-text-secondary">Someone replied to your post.</p>
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <Button size="sm" variant="primary">Reply</Button>
            <Button size="sm" variant="ghost">Dismiss</Button>
          </div>
        </div>
      }
    >
      <Button variant="ghost" size="sm">Notifications</Button>
    </Popover>
  ),
  parameters: {
    docs: { description: { story: 'Rich notification or card-style popover for social/dashboard.' } },
  },
}

export const SocialShare: Story = {
  render: () => (
    <Popover
      placement="top"
      content={
        <div className="flex gap-2">
          <button type="button" className="p-2 rounded-lg hover:bg-default/40" aria-label="Share on Twitter">
            <span className="text-lg">𝕏</span>
          </button>
          <button type="button" className="p-2 rounded-lg hover:bg-default/40" aria-label="Share on LinkedIn">
            <span className="text-lg font-semibold text-tertiary">in</span>
          </button>
          <button type="button" className="p-2 rounded-lg hover:bg-default/40" aria-label="Copy link">
            <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      }
    >
      <Button variant="outline" size="sm">Share</Button>
    </Popover>
  ),
  parameters: {
    docs: { description: { story: 'Compact share options for social/media.' } },
  },
}

export const CollisionFlips: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-center p-16">
      <p className="text-sm text-text-secondary">Resize the viewport or scroll. Popover flips to stay on screen.</p>
      <Popover
        placement="bottom"
        collisionPadding
        content={
          <div className="p-2">
            <p className="text-sm">I flip to top if there&apos;s no room below.</p>
          </div>
        }
      >
        <Button>Near bottom (collision padding on)</Button>
      </Popover>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'With collisionPadding, placement flips (e.g. bottom → top) when there is not enough space.' } },
  },
}

export const WithForm: Story = {
  args: {
    content: (
      <div className="space-y-3">
        <h3 className="font-semibold">Settings</h3>
        <div className="space-y-2">
          <label className="block text-sm">
            <input type="checkbox" className="mr-2" />
            Option 1
          </label>
          <label className="block text-sm">
            <input type="checkbox" className="mr-2" />
            Option 2
          </label>
        </div>
        <Button variant="primary" size="sm" className="w-full">
          Apply
        </Button>
      </div>
    ),
    children: <Button variant="outline">Settings</Button>,
  },
}

function ControlledStory() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col gap-4 items-center">
      <Popover
        open={open}
        onOpenChange={setOpen}
        content={
          <div>
            <p className="mb-2 text-text-secondary">This is a controlled popover.</p>
            <Button size="sm" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        }
      >
        <Button onClick={() => setOpen(!open)}>
          {open ? 'Close Popover' : 'Open Popover'}
        </Button>
      </Popover>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledStory />,
}

export const MobileFriendly: Story = {
  args: {
    placement: 'bottom',
    maxWidthMobile: 280,
    content: (
      <div>
        <h3 className="font-semibold mb-2 text-text-primary">Mobile-friendly</h3>
        <p className="text-sm text-text-secondary">
          On small viewports the popover is constrained and stays within the screen. Use ActionSheet for 3+ actions on mobile.
        </p>
      </div>
    ),
    children: <Button>Open (try mobile viewport)</Button>,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: { description: { story: 'Popover uses maxWidthMobile and viewport collision. For many actions on mobile, prefer the ActionSheet component.' } },
  },
}
