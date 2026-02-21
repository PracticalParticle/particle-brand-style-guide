import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Data display/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Expandable sections with keyboard support. Use type="single" for one open at a time or type="multiple" for several. Controlled or uncontrolled via value/onChange or defaultValue.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Single: Story = {
  render: () => (
    <Accordion type="single" defaultValue="a" className="w-full min-w-[20rem] max-w-md">
      <AccordionItem value="a">
        <AccordionTrigger value="a">Section A</AccordionTrigger>
        <AccordionContent value="a">
          Content for section A. Use focus and Enter/Space to expand or collapse.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger value="b">Section B</AccordionTrigger>
        <AccordionContent value="b">Content for section B.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger value="c">Section C</AccordionTrigger>
        <AccordionContent value="c">Content for section C.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['a']} className="w-full min-w-[20rem] max-w-md">
      <AccordionItem value="a">
        <AccordionTrigger value="a">FAQ 1</AccordionTrigger>
        <AccordionContent value="a">Answer to the first question.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger value="b">FAQ 2</AccordionTrigger>
        <AccordionContent value="b">Answer to the second question.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger value="c">FAQ 3</AccordionTrigger>
        <AccordionContent value="c">Answer to the third question.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const AllCollapsed: Story = {
  render: () => (
    <Accordion type="single" className="w-full min-w-[20rem] max-w-md">
      <AccordionItem value="one">
        <AccordionTrigger value="one">Overview</AccordionTrigger>
        <AccordionContent value="one">Overview content here.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionTrigger value="two">Details</AccordionTrigger>
        <AccordionContent value="two">Details content here.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
