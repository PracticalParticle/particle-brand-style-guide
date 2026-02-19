import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost', 'outline', 'primary-gradient', 'secondary-gradient', 'link'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// ============================================
// BASIC VARIANTS
// ============================================

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Button',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
}

// ============================================
// GRADIENT VARIANTS
// ============================================

export const PrimaryGradient: Story = {
  args: {
    variant: 'primary-gradient',
    children: 'Gradient Button',
  },
}

export const SecondaryGradient: Story = {
  args: {
    variant: 'secondary-gradient',
    children: 'Secondary Gradient',
  },
}

export const AllGradients: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="primary-gradient">Primary Gradient</Button>
      <Button variant="primary-gradient" size="lg">Large Gradient</Button>
      <Button variant="secondary-gradient">Secondary Gradient</Button>
      <Button variant="secondary-gradient" size="lg">Large Secondary</Button>
    </div>
  ),
}

// ============================================
// SIZES
// ============================================

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4 items-center">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary-gradient" size="xs">XS Gradient</Button>
        <Button variant="primary-gradient" size="sm">SM Gradient</Button>
        <Button variant="primary-gradient" size="md">MD Gradient</Button>
        <Button variant="primary-gradient" size="lg">LG Gradient</Button>
        <Button variant="primary-gradient" size="xl">XL Gradient</Button>
      </div>
    </div>
  ),
}

// ============================================
// ICONS
// ============================================

export const WithLeftIcon: Story = {
  render: () => {
    const PlusIcon = () => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    )
    const DownloadIcon = () => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    )

    return (
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary" leftIcon={<PlusIcon />}>Add Item</Button>
        <Button variant="primary-gradient" leftIcon={<PlusIcon />}>Create New</Button>
        <Button variant="outline" leftIcon={<DownloadIcon />}>Download</Button>
      </div>
    )
  },
}

export const WithRightIcon: Story = {
  render: () => {
    const ArrowRightIcon = () => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    )

    return (
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary" rightIcon={<ArrowRightIcon />}>Continue</Button>
        <Button variant="primary-gradient" rightIcon={<ArrowRightIcon />}>Get Started</Button>
        <Button variant="link" rightIcon={<ArrowRightIcon />}>Learn More</Button>
      </div>
    )
  },
}

export const WithBothIcons: Story = {
  render: () => {
    const PlusIcon = () => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    )
    const ArrowRightIcon = () => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    )

    return (
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
          Add & Continue
        </Button>
        <Button variant="primary-gradient" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
          Create & Proceed
        </Button>
      </div>
    )
  },
}

export const IconOnly: Story = {
  render: () => {
    const EditIcon = () => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
    const TrashIcon = () => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    )
    const SettingsIcon = () => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )

    return (
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-sm font-medium mb-3 text-neutral-700 dark:text-neutral-300">Icon Only Variants</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" iconOnly aria-label="Edit">
              <EditIcon />
            </Button>
            <Button variant="outline" iconOnly aria-label="Settings">
              <SettingsIcon />
            </Button>
            <Button variant="ghost" iconOnly aria-label="More options">
              <SettingsIcon />
            </Button>
            <Button variant="danger" iconOnly aria-label="Delete">
              <TrashIcon />
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3 text-neutral-700 dark:text-neutral-300">Icon Only Sizes</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" iconOnly size="xs" aria-label="Small">
              <EditIcon />
            </Button>
            <Button variant="primary" iconOnly size="sm" aria-label="Small">
              <EditIcon />
            </Button>
            <Button variant="primary" iconOnly size="md" aria-label="Medium">
              <EditIcon />
            </Button>
            <Button variant="primary" iconOnly size="lg" aria-label="Large">
              <EditIcon />
            </Button>
            <Button variant="primary" iconOnly size="xl" aria-label="Extra Large">
              <EditIcon />
            </Button>
          </div>
        </div>
      </div>
    )
  },
}

// ============================================
// STATES
// ============================================

export const Loading: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    children: 'Loading...',
  },
}

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="primary" isLoading>Processing...</Button>
      <Button variant="primary-gradient" isLoading>Saving...</Button>
      <Button variant="outline" isLoading disabled>Disabled Loading</Button>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="primary" disabled>Disabled</Button>
      <Button variant="primary-gradient" disabled>Disabled Gradient</Button>
      <Button variant="outline" disabled>Disabled Outline</Button>
      <Button variant="ghost" disabled>Disabled Ghost</Button>
    </div>
  ),
}

// ============================================
// LAYOUTS
// ============================================

export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <Button variant="primary" fullWidth>Full Width Button</Button>
      <Button variant="primary-gradient" fullWidth>Full Width Gradient</Button>
      <Button variant="outline" fullWidth leftIcon={
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      }>
        Full Width with Icon
      </Button>
    </div>
  ),
}

// ============================================
// USE CASES
// ============================================

export const WebsiteCTAs: Story = {
  render: () => {
    const ArrowRightIcon = () => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    )

    return (
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary-gradient" size="lg" rightIcon={<ArrowRightIcon />}>
          Get Started
        </Button>
        <Button variant="outline" size="lg">
          Learn More
        </Button>
        <Button variant="link" size="lg">
          View Documentation
        </Button>
      </div>
    )
  },
}

export const AppActions: Story = {
  render: () => {
    const PlusIcon = () => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    )

    return (
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary" leftIcon={<PlusIcon />}>
          Create New
        </Button>
        <Button variant="ghost" size="sm">
          Cancel
        </Button>
        <Button variant="danger" size="sm">
          Delete
        </Button>
      </div>
    )
  },
}

export const FormButtons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="outline" type="button">
        Cancel
      </Button>
      <Button variant="ghost" type="reset">
        Reset
      </Button>
    </div>
  ),
}

export const CardActions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="primary-gradient" size="sm">
        View Details
      </Button>
      <Button variant="outline" size="sm">
        Edit
      </Button>
      <Button variant="ghost" size="sm">
        Share
      </Button>
    </div>
  ),
}

// ============================================
// ALL VARIANTS OVERVIEW
// ============================================

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="primary-gradient">Gradient</Button>
        <Button variant="secondary-gradient">Secondary Gradient</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  ),
}
