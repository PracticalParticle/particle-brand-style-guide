import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  id: 'components-alert',
  title: 'Components/Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'This is a default alert message.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    children: 'Your changes have been saved successfully.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Please review your input before proceeding.',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'Something went wrong. Please try again.',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'Here is some important information you should know.',
  },
}

function WithCloseButtonStory() {
  const [isOpen, setIsOpen] = useState(true)
  if (!isOpen) return <button onClick={() => setIsOpen(true)}>Show Alert</button>
  return (
    <Alert
      variant="info"
      title="Dismissible Alert"
      onClose={() => setIsOpen(false)}
    >
      Click the X button to close this alert.
    </Alert>
  )
}

export const WithCloseButton: Story = {
  render: () => <WithCloseButtonStory />,
}

export const WithoutTitle: Story = {
  args: {
    variant: 'success',
    children: 'This is an alert without a title.',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Alert variant="default" title="Default Alert">
        This is a default alert message.
      </Alert>
      <Alert variant="success" title="Success Alert">
        Operation completed successfully.
      </Alert>
      <Alert variant="warning" title="Warning Alert">
        Please be careful with this action.
      </Alert>
      <Alert variant="error" title="Error Alert">
        An error occurred while processing your request.
      </Alert>
      <Alert variant="info" title="Info Alert">
        Here is some useful information.
      </Alert>
    </div>
  ),
}

export const WithCustomIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Alert
        variant="success"
        title="Custom Icon"
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        }
      >
        This alert uses a custom icon.
      </Alert>
    </div>
  ),
}

function DismissibleAlertsStory() {
  const [alerts, setAlerts] = useState({
    success: true,
    warning: true,
    error: true,
    info: true,
  })
  return (
    <div className="flex flex-col gap-4 w-96">
      {alerts.success && (
        <Alert
          variant="success"
          title="Success"
          onClose={() => setAlerts({ ...alerts, success: false })}
        >
          This alert can be dismissed.
        </Alert>
      )}
      {alerts.warning && (
        <Alert
          variant="warning"
          title="Warning"
          onClose={() => setAlerts({ ...alerts, warning: false })}
        >
          This alert can be dismissed.
        </Alert>
      )}
      {alerts.error && (
        <Alert
          variant="error"
          title="Error"
          onClose={() => setAlerts({ ...alerts, error: false })}
        >
          This alert can be dismissed.
        </Alert>
      )}
      {alerts.info && (
        <Alert
          variant="info"
          title="Info"
          onClose={() => setAlerts({ ...alerts, info: false })}
        >
          This alert can be dismissed.
        </Alert>
      )}
      {!alerts.success && !alerts.warning && !alerts.error && !alerts.info && (
        <button
          onClick={() => setAlerts({ success: true, warning: true, error: true, info: true })}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg"
        >
          Reset All Alerts
        </button>
      )}
    </div>
  )
}

export const DismissibleAlerts: Story = {
  render: () => <DismissibleAlertsStory />,
}
