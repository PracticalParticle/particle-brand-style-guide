import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from './Footer'

const meta: Meta<typeof Footer> = {
  title: 'Components/Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Site footer with copyright, inline links, and optional columns. Use in apps and marketing sites. Styled with design tokens only.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'wide'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Footer>

const defaultLinks = [
  { label: 'Whitepaper', href: 'https://example.com/whitepaper', external: true },
  { label: 'X (Twitter)', href: 'https://x.com/example', external: true },
  { label: 'GitHub', href: 'https://github.com/example', external: true },
  { label: 'Terms & Conditions', href: '/legal/terms' },
  { label: 'Privacy Policy', href: '/legal/privacy' },
]

export const Default: Story = {
  args: {
    copyright: (
      <>
        © 2025 Company Name. Built on{' '}
        <a href="https://example.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
          Protocol
        </a>
        .
      </>
    ),
    links: defaultLinks,
    variant: 'default',
  },
}

export const Minimal: Story = {
  args: {
    copyright: '© 2025 Company Name. All rights reserved.',
    links: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
    ],
    variant: 'minimal',
  },
}

export const WithColumns: Story = {
  args: {
    copyright: '© 2025 Company Name.',
    variant: 'default',
    columns: [
      {
        heading: 'Product',
        links: [
          { label: 'Features', href: '/#features' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'Docs', href: 'https://docs.example.com', external: true },
        ],
      },
      {
        heading: 'Legal',
        links: [
          { label: 'Terms', href: '/legal/terms' },
          { label: 'Privacy', href: '/legal/privacy' },
        ],
      },
      {
        heading: 'Social',
        links: [
          { label: 'Twitter', href: 'https://x.com/example', external: true },
          { label: 'GitHub', href: 'https://github.com/example', external: true },
          { label: 'LinkedIn', href: 'https://linkedin.com/company/example', external: true },
        ],
      },
    ],
    links: defaultLinks,
  },
}

export const Wide: Story = {
  args: {
    ...Default.args,
    variant: 'wide',
  },
}
