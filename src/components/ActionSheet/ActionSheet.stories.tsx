import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ActionSheet } from './ActionSheet'
import { Button } from '../Button'
import { Skeleton } from '../Skeleton'

const meta: Meta<typeof ActionSheet> = {
  title: 'Components/ActionSheet',
  component: ActionSheet,
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'mobile1' },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    cancelLabel: { control: 'text' },
    showHandle: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ActionSheet>

const shareIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
)
const copyIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)
const trashIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

export const Default: Story = {
  render: function DefaultActionSheet() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Action Sheet</Button>
        <ActionSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Choose an action"
          actions={[
            { label: 'Share', icon: shareIcon, onClick: () => console.log('Share') },
            { label: 'Copy link', icon: copyIcon, onClick: () => console.log('Copy') },
            { label: 'Delete', icon: trashIcon, variant: 'danger', onClick: () => console.log('Delete') },
          ]}
        />
      </>
    )
  },
}

export const WithDescriptions: Story = {
  render: function WithDescriptionsStory() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>Options</Button>
        <ActionSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Post options"
          actions={[
            { label: 'Save', description: 'Save to your collection', icon: copyIcon, onClick: () => {} },
            { label: 'Share', description: 'Share to social or copy link', icon: shareIcon, onClick: () => {} },
            { label: 'Report', description: 'Report this content', icon: trashIcon, variant: 'danger', onClick: () => {} },
          ]}
        />
      </>
    )
  },
}

export const NoTitleNoHandle: Story = {
  render: function NoTitleStory() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="ghost" onClick={() => setOpen(true)}>Quick actions</Button>
        <ActionSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          showHandle={false}
          actions={[
            { label: 'Edit', onClick: () => {} },
            { label: 'Duplicate', onClick: () => {} },
            { label: 'Archive', onClick: () => {} },
          ]}
        />
      </>
    )
  },
}

export const NoCancelButton: Story = {
  render: function NoCancelStory() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Confirm action</Button>
        <ActionSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Confirm delete"
          cancelLabel=""
          actions={[
            { label: 'Delete permanently', variant: 'danger', icon: trashIcon, onClick: () => setOpen(false) },
          ]}
        />
      </>
    )
  },
}

export const CustomContent: Story = {
  render: function CustomContentStory() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>View details</Button>
        <ActionSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Session details"
          actions={[]}
        >
          <div className="space-y-4 py-2 text-sm text-text-secondary">
            <p>Use the <code>children</code> prop to render custom content instead of the default action list.</p>
            <p>Good for confirmations, forms, or rich content in a mobile-friendly sheet.</p>
          </div>
        </ActionSheet>
      </>
    )
  },
}

export const Loading: Story = {
  render: function LoadingStory() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open (loading)</Button>
        <ActionSheet isOpen={open} onClose={() => setOpen(false)} title="Options" actions={[]}>
          <div className="space-y-0.5" aria-busy="true" aria-label="Loading">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3">
                <Skeleton variant="rectangular" width={24} height={24} className="rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="text" width="50%" height={16} />
                  <Skeleton variant="text" width="30%" height={12} />
                </div>
              </div>
            ))}
          </div>
        </ActionSheet>
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Show skeleton rows while action sheet options are loading (e.g. async list).',
      },
    },
  },
}
