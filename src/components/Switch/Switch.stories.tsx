import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
}

export const Checked: Story = {
  args: {
    label: 'Dark mode',
    defaultChecked: true,
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Auto-save',
    helperText: 'Automatically save your changes',
  },
}

export const WithError: Story = {
  args: {
    label: 'Enable feature',
    error: 'This feature is required',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled switch',
    disabled: true,
  },
}

export const Multiple: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Email notifications" defaultChecked />
      <Switch label="Push notifications" />
      <Switch label="SMS notifications" />
      <Switch label="Disabled option" disabled />
    </div>
  ),
}
