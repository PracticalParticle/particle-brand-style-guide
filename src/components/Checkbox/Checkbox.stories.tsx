import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Checkbox allows users to select one or more options. Uses design system tokens: border-default, accent-primary, focus ring, and semantic text/error colors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text next to the checkbox' },
    error: { control: 'text', description: 'Error message (shows below, uses error color)' },
    helperText: { control: 'text', description: 'Helper text below the checkbox' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
}

export const Checked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    defaultChecked: true,
  },
}

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Standalone checkbox',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Enable notifications',
    helperText: 'You will receive email notifications',
  },
}

export const WithError: Story = {
  args: {
    label: 'I agree to the terms',
    error: 'You must agree to the terms',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    defaultChecked: true,
    disabled: true,
  },
}

export const Indeterminate: Story = {
  render: function IndeterminateStory() {
    const setIndeterminate = (el: HTMLInputElement | null) => {
      if (el) el.indeterminate = true
    }
    return (
      <div className="space-y-3">
        <Checkbox label="Select all" ref={setIndeterminate} />
        <Checkbox label="Item 1" />
        <Checkbox label="Item 2" defaultChecked />
        <Checkbox label="Item 3" />
      </div>
    )
  },
}

export const Multiple: Story = {
  render: () => (
    <div className="space-y-3">
      <Checkbox label="Option 1" />
      <Checkbox label="Option 2" defaultChecked />
      <Checkbox label="Option 3" />
      <Checkbox label="Option 4" disabled />
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-x-12 gap-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-secondary">Unchecked</h3>
        <Checkbox label="Default" />
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-secondary">Checked</h3>
        <Checkbox label="Checked" defaultChecked />
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-secondary">With helper</h3>
        <Checkbox label="With helper" helperText="Helper text" />
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-secondary">Error</h3>
        <Checkbox label="With error" error="Required" />
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-secondary">Disabled</h3>
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled checked" defaultChecked disabled />
      </div>
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <form className="w-full max-w-md space-y-4 rounded-lg border border-default/30 bg-secondary p-6">
      <h3 className="text-lg font-semibold text-text-primary">Preferences</h3>
      <Checkbox label="Email notifications" defaultChecked />
      <Checkbox label="SMS notifications" helperText="Standard carrier rates may apply" />
      <Checkbox label="I agree to the terms of service" error="You must agree to continue" />
      <div className="pt-2">
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-text-inverse hover:bg-primary-hover"
        >
          Save
        </button>
      </div>
    </form>
  ),
}
