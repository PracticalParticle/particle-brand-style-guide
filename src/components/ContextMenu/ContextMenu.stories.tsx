import type { Meta, StoryObj } from '@storybook/react'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuCheckboxItem,
  ContextMenuShortcut,
} from './ContextMenu'

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/Overlay/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Right-click context menu. Wrap trigger area with ContextMenuTrigger; add items in ContextMenuContent.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ContextMenu>

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="flex h-32 w-64 items-center justify-center rounded-lg border border-border bg-bg-surface text-text-muted">
          Right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => {}}>Copy</ContextMenuItem>
        <ContextMenuItem onClick={() => {}}>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => {}}>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

export const WithLabelsAndShortcuts: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="flex h-32 w-64 items-center justify-center rounded-lg border border-border bg-bg-surface text-text-muted">
          Right-click for actions
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuItem onClick={() => {}}>
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => {}}>
          Paste
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>View</ContextMenuLabel>
        <ContextMenuCheckboxItem checked onCheckedChange={() => {}}>
          Show sidebar
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}
