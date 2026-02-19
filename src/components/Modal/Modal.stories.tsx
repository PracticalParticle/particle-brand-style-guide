import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  ModalStepper,
} from './Modal'
import { Button } from '../Button'
import { Input, Textarea } from '../Input'
import { Checkbox } from '../Checkbox'
import { Skeleton } from '../Skeleton'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    variant: {
      control: 'select',
      options: ['default', 'confirmation', 'warning', 'danger', 'success', 'info'],
    },
    showCloseButton: {
      control: 'boolean',
    },
    closeOnOverlayClick: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

function DefaultStory() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
        <p>This is the modal content. You can put anything here. Default size is now lg for a comfortable width.</p>
      </Modal>
    </>
  )
}

export const Default: Story = {
  render: () => <DefaultStory />,
}

function WithSubComponentsStory() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>
            This is a description that provides additional context about the modal.
          </ModalDescription>
        </ModalHeader>
        <ModalContent>
          <p className="text-text-secondary">
            This is the main content area. You can add any content here including forms, images, or other components.
          </p>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export const WithSubComponents: Story = {
  render: () => <WithSubComponentsStory />,
}

function LoadingContentStory() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Loading...">
        <div className="space-y-4" aria-busy="true" aria-label="Loading">
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="100%" height={14} />
          <Skeleton variant="text" width="100%" height={14} />
          <Skeleton variant="text" width="70%" height={14} />
          <div className="flex gap-2 pt-4 justify-end">
            <Skeleton variant="rectangular" width={72} height={36} className="rounded-lg" />
            <Skeleton variant="rectangular" width={72} height={36} className="rounded-lg" />
          </div>
        </div>
      </Modal>
    </>
  )
}

export const LoadingContent: Story = {
  render: () => <LoadingContentStory />,
  parameters: {
    docs: {
      description: {
        story: 'Show skeleton content while modal body is loading (e.g. async form or details). Reduces perceived wait and layout shift.',
      },
    },
  },
}

function SizesStory() {
  const [openSize, setOpenSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(null)
  return (
    <>
      <div className="flex flex-col gap-4">
        <Button onClick={() => setOpenSize('sm')}>Small Modal</Button>
        <Button onClick={() => setOpenSize('md')}>Medium Modal</Button>
        <Button onClick={() => setOpenSize('lg')}>Large Modal</Button>
        <Button onClick={() => setOpenSize('xl')}>Extra Large Modal</Button>
      </div>
      {openSize && (
        <Modal
          isOpen={!!openSize}
          onClose={() => setOpenSize(null)}
          title={`${openSize.toUpperCase()} Modal`}
          size={openSize}
        >
          <p>This is a {openSize} sized modal.</p>
        </Modal>
      )}
    </>
  )
}

export const Sizes: Story = {
  render: () => <SizesStory />,
}

function WithoutCloseButtonStory() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Without Close Button"
        showCloseButton={false}
      >
        <p>This modal doesn't have a close button in the header.</p>
        <div className="mt-4">
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </Modal>
    </>
  )
}

export const WithoutCloseButton: Story = {
  render: () => <WithoutCloseButtonStory />,
}

function ConfirmationDialogStory() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button variant="danger" onClick={() => setIsOpen(true)}>Delete Item</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="sm"
        variant="confirmation"
        title="Confirm Deletion"
      >
        <ModalDescription>
          Are you sure you want to delete this item? This action cannot be undone.
        </ModalDescription>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => setIsOpen(false)}>Delete</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export const ConfirmationDialog: Story = {
  render: () => <ConfirmationDialogStory />,
}

function WarningStory() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Show warning</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Unsaved changes"
        variant="warning"
      >
        <ModalDescription>
          You have unsaved changes. If you leave now, your changes will be lost.
        </ModalDescription>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Stay</Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>Discard</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export const Warning: Story = {
  render: () => <WarningStory />,
}

function DangerStory() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button variant="danger" onClick={() => setIsOpen(true)}>Remove account</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Remove account"
        variant="danger"
        size="sm"
      >
        <ModalDescription>
          This will permanently remove your account and all data. This action cannot be undone.
        </ModalDescription>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => setIsOpen(false)}>Remove account</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export const Danger: Story = {
  render: () => <DangerStory />,
}

function SuccessStory() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Complete action</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Payment successful"
        variant="success"
        size="sm"
      >
        <ModalDescription>
          Your payment has been processed. You will receive a confirmation email shortly.
        </ModalDescription>
        <ModalFooter>
          <Button variant="primary" onClick={() => setIsOpen(false)}>Done</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export const Success: Story = {
  render: () => <SuccessStory />,
}

function InfoStory() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Learn more</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="New feature available"
        variant="info"
      >
        <ModalDescription>
          We&apos;ve added a new dashboard and reporting tools. Check the help center for a quick tour.
        </ModalDescription>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Later</Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>Take tour</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export const Info: Story = {
  render: () => <InfoStory />,
}

function StepperStory() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)
    const steps = ['Details', 'Review', 'Confirm']
    const openAndReset = () => {
      setStep(0)
      setIsOpen(true)
    }
  const close = () => {
    setIsOpen(false)
    setStep(0)
  }
  return (
    <>
      <Button onClick={openAndReset}>Start wizard</Button>
        <Modal isOpen={isOpen} onClose={close} title="Multi-step wizard" size="lg">
          <ModalStepper steps={steps} currentStep={step} />
          {step === 0 && (
            <>
              <p className="text-text-secondary mb-4">Enter your details below.</p>
              <div className="space-y-3">
                <Input label="Name" placeholder="Your name" fullWidth />
                <Input label="Email" type="email" placeholder="you@example.com" fullWidth />
              </div>
            </>
          )}
          {step === 1 && (
            <p className="text-text-secondary">Review your information before confirming.</p>
          )}
          {step === 2 && (
            <p className="text-text-secondary">You’re all set. Click Confirm to finish.</p>
          )}
          <ModalFooter>
            {step > 0 ? (
              <Button variant="outline" onClick={() => setStep((s) => s - 1)}>Back</Button>
            ) : (
              <span />
            )}
            <div className="flex-1" />
            {step < steps.length - 1 ? (
              <Button variant="primary" onClick={() => setStep((s) => s + 1)}>Next</Button>
            ) : (
              <Button variant="primary" onClick={close}>Confirm</Button>
            )}
          </ModalFooter>
      </Modal>
    </>
  )
}

export const Stepper: Story = {
  render: () => <StepperStory />,
}

function MarketingCookieStory() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>Cookie / consent style</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="We value your privacy"
        size="md"
        showCloseButton={false}
        closeOnOverlayClick={false}
      >
        <ModalDescription>
          We use cookies to improve your experience, personalize content, and analyze traffic.
          You can choose which categories you allow.
        </ModalDescription>
        <div className="mt-4 space-y-3">
          <Checkbox label="Essential" defaultChecked disabled />
          <Checkbox label="Analytics" defaultChecked />
          <Checkbox label="Marketing" />
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Reject optional</Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>Accept all</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export const MarketingCookie: Story = {
  render: () => <MarketingCookieStory />,
}

function FormModalStory() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create New Item" size="lg">
        <form className="space-y-4">
          <Input label="Name" placeholder="Enter name" fullWidth />
          <Textarea label="Description" placeholder="Enter description" rows={4} fullWidth />
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>Create</Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  )
}

export const FormModal: Story = {
  render: () => <FormModalStory />,
}

function NonDismissibleStory() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Non-Dismissible Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Important Notice"
        closeOnOverlayClick={false}
        closeOnEscape={false}
      >
        <p>This modal cannot be closed by clicking outside or pressing Escape.</p>
        <div className="mt-4">
          <Button onClick={() => setIsOpen(false)}>I Understand</Button>
        </div>
      </Modal>
    </>
  )
}

export const NonDismissible: Story = {
  render: () => <NonDismissibleStory />,
}

function FullWidthStory() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Full Width Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Full Width Modal"
        size="full"
      >
        <p>This modal takes up the full width with margins.</p>
      </Modal>
    </>
  )
}

export const FullWidth: Story = {
  render: () => <FullWidthStory />,
}
