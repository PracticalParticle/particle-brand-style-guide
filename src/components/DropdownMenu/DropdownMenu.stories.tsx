import type { Meta, StoryObj } from '@storybook/react'
import { DropdownMenu } from './DropdownMenu'
import { Button } from '@/components/Button'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Selection/DropdownMenu',
  component: DropdownMenu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)
const DuplicateIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)
const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4m1 4h4m-4 0h4" />
  </svg>
)
const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

export const Default: Story = {
  args: {
    sections: [
      {
        items: [
          { label: 'Edit', icon: <EditIcon />, onClick: () => console.log('Edit') },
          { label: 'Duplicate', icon: <DuplicateIcon />, onClick: () => console.log('Duplicate') },
          { label: 'Delete', icon: <TrashIcon />, variant: 'danger', onClick: () => console.log('Delete') },
        ],
      },
    ],
    children: <Button variant="outline" rightIcon={<ChevronDownIcon />}>Actions</Button>,
  },
}

export const WithSections: Story = {
  args: {
    sections: [
      {
        label: 'Create',
        items: [
          { label: 'New document', onClick: () => {} },
          { label: 'New folder', onClick: () => {} },
        ],
      },
      {
        label: 'Open',
        items: [
          { label: 'Recent', onClick: () => {} },
          { label: 'From URL…', onClick: () => {} },
        ],
      },
      {
        items: [
          { label: 'Settings', onClick: () => {} },
          { label: 'Log out', variant: 'danger', onClick: () => {} },
        ],
      },
    ],
    children: <Button variant="ghost">Open menu</Button>,
  },
}

export const WithDisabledItem: Story = {
  args: {
    sections: [
      {
        items: [
          { label: 'Save', icon: <EditIcon />, onClick: () => {} },
          { label: 'Save as…', disabled: true, onClick: () => {} },
          { label: 'Delete', icon: <TrashIcon />, variant: 'danger', onClick: () => {} },
        ],
      },
    ],
    children: <Button variant="secondary">File</Button>,
  },
}

export const PlacementTop: Story = {
  args: {
    placement: 'top',
    sections: [{ items: [{ label: 'Option A' }, { label: 'Option B' }, { label: 'Option C' }] }],
    children: <Button variant="outline">Open above</Button>,
  },
}
