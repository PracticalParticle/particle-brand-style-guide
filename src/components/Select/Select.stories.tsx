import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    fullWidth: true,
    children: (
      <>
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
      </>
    ),
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Payment Method',
    helperText: 'Select your preferred payment method',
    fullWidth: true,
    children: (
      <>
        <option value="">Select payment method</option>
        <option value="credit">Credit Card</option>
        <option value="debit">Debit Card</option>
        <option value="paypal">PayPal</option>
        <option value="bank">Bank Transfer</option>
      </>
    ),
  },
}

export const WithError: Story = {
  args: {
    label: 'Region',
    error: 'Please select a region',
    fullWidth: true,
    children: (
      <>
        <option value="">Select a region</option>
        <option value="north">North</option>
        <option value="south">South</option>
        <option value="east">East</option>
        <option value="west">West</option>
      </>
    ),
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Language',
    fullWidth: true,
    leftIcon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    children: (
      <>
        <option value="">Select language</option>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
      </>
    ),
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    disabled: true,
    fullWidth: true,
    children: (
      <>
        <option value="">Select an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </>
    ),
  },
}
