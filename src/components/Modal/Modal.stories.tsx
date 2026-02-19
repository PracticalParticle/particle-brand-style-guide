import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter } from './Modal'
import { Button } from '../Button'

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

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
          <p>This is the modal content. You can put anything here.</p>
        </Modal>
      </>
    )
  },
}

export const WithSubComponents: Story = {
  render: () => {
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
            <p className="text-neutral-700 dark:text-neutral-300">
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
  },
}

export const Sizes: Story = {
  render: () => {
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
  },
}

export const WithoutCloseButton: Story = {
  render: () => {
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
  },
}

export const ConfirmationDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>Delete Item</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
          <ModalHeader>
            <ModalTitle>Confirm Deletion</ModalTitle>
            <ModalDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setIsOpen(false)}>Delete</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  },
}

export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create New Item" size="lg">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
                placeholder="Enter description"
                rows={4}
              />
            </div>
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>Create</Button>
            </ModalFooter>
          </form>
        </Modal>
      </>
    )
  },
}

export const NonDismissible: Story = {
  render: () => {
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
  },
}

export const FullWidth: Story = {
  render: () => {
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
  },
}
