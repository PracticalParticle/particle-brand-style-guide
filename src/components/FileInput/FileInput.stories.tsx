import type { Meta, StoryObj } from '@storybook/react'
import { FileInput } from './FileInput'

const meta: Meta<typeof FileInput> = {
  title: 'Components/Forms/FileInput',
  component: FileInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'File upload with drag-and-drop. Uses design system borders and focus ring.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof FileInput>

export const Default: Story = {
  args: {
    label: 'Upload file',
    placeholder: 'Choose file or drag and drop',
    fullWidth: true,
  },
}

export const WithAccept: Story = {
  args: {
    label: 'Upload image',
    accept: 'image/*',
    placeholder: 'PNG, JPG, GIF up to 10MB',
    fullWidth: true,
    helperText: 'Accepted: images only',
  },
}

export const Multiple: Story = {
  args: {
    label: 'Upload files',
    multiple: true,
    placeholder: 'Choose files or drag and drop',
    fullWidth: true,
    helperText: 'You can select multiple files',
  },
}

export const WithError: Story = {
  args: {
    label: 'Required file',
    fullWidth: true,
    error: 'Please upload a file',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    fullWidth: true,
  },
}

export const Documents: Story = {
  args: {
    label: 'Document',
    accept: '.pdf,.doc,.docx',
    placeholder: 'PDF or Word documents',
    fullWidth: true,
  },
}
