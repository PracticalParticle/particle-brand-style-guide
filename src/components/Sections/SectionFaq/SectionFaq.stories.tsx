import type { Meta, StoryObj } from '@storybook/react'
import { SectionFaq } from './SectionFaq'
import type { FaqItem } from './SectionFaq'

const faqItems: FaqItem[] = [
  {
    value: 'what-is',
    question: 'What is this product?',
    answer:
      'A short description of the product or service. Keep answers concise for the FAQ. Consumers replace this with their own content.',
  },
  {
    value: 'how-it-works',
    question: 'How does the main feature work?',
    answer:
      'Explain the primary capability in plain language. Authorized users can complete the flow; describe the steps at a high level.',
  },
  {
    value: 'support',
    question: 'Is there a free trial or support?',
    answer:
      'Yes. You can get started with a free tier. For custom needs, contact the team. Replace this with your own support and pricing details.',
  },
]

const meta: Meta<typeof SectionFaq> = {
  title: 'Sections/SectionFaq',
  component: SectionFaq,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['single', 'multiple'] },
    maxWidth: { control: 'select', options: ['sm', 'md', 'lg', 'full'] },
  },
}

export default meta
type Story = StoryObj<typeof SectionFaq>

export const Default: Story = {
  args: {
    title: 'Frequently asked questions',
    description: 'Use SectionFaq to wrap Accordion with a section header. Single or multiple panels open.',
    items: faqItems,
    type: 'single',
    showHeaderDivider: true,
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-6xl">
      <SectionFaq {...args} />
    </div>
  ),
}

export const MultipleOpen: Story = {
  ...Default,
  args: {
    ...Default.args,
    type: 'multiple',
  },
  render: Default.render,
}

export const WithBackgroundPattern: Story = {
  ...Default,
  args: {
    ...Default.args,
    withBackgroundPattern: true,
  },
  render: Default.render,
}

export const WithRichAnswer: Story = {
  args: {
    title: 'FAQ',
    description: 'Answers can include links and formatting.',
    items: [
      {
        value: 'docs',
        question: 'Where can I find documentation?',
        answer: (
          <>
            <p className="mb-2">
              Check the docs and guides for technical details.
            </p>
            <p className="text-text-tertiary text-xs">
              Links and custom React nodes are supported in the answer slot.
            </p>
          </>
        ),
      },
    ],
  },
  render: Default.render,
}
