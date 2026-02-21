import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from '.'
import { Button } from '../Button'

const meta: Meta<typeof ToastProvider> = {
  title: 'Components/Feedback/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Non-blocking notifications. Wrap your app with ToastProvider and call useToast() to show toasts. Optional title, variant, and duration.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider defaultDuration={5000} position="bottom-right">
        <Story />
      </ToastProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ToastProvider>

function DemoButtons() {
  const { addToast } = useToast()
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" onClick={() => addToast('Something happened.')}>
        Default toast
      </Button>
      <Button size="sm" variant="secondary" onClick={() => addToast('Saved successfully.', { variant: 'success' })}>
        Success
      </Button>
      <Button size="sm" variant="secondary" onClick={() => addToast('Please review your input.', { variant: 'warning' })}>
        Warning
      </Button>
      <Button size="sm" variant="danger" onClick={() => addToast('Something went wrong.', { variant: 'error' })}>
        Error
      </Button>
      <Button size="sm" variant="ghost" onClick={() => addToast('Tip: You can filter by date.', { variant: 'info' })}>
        Info
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          addToast('Your changes have been saved.', {
            title: 'Saved',
            variant: 'success',
            duration: 8000,
          })
        }
      >
        With title & longer duration
      </Button>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <p className="text-sm text-text-secondary mb-4">Click a button to show a toast.</p>
      <DemoButtons />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="p-4">
      <DemoButtons />
    </div>
  ),
}
