import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'
import { Card, CardHeader, CardContent, CardFooter } from '../Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../Table'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {
    variant: 'rectangular',
    width: 200,
    height: 20,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Skeleton variant="text" width="100%" height={20} />
      <Skeleton variant="rectangular" width="100%" height={100} />
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="80%" height={16} />
          <Skeleton variant="text" width="60%" height={16} />
        </div>
      </div>
    </div>
  ),
}

export const Animations: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Pulse (default)</p>
        <Skeleton variant="rectangular" width="100%" height={40} animation="pulse" />
      </div>
      <div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Wave</p>
        <Skeleton variant="rectangular" width="100%" height={40} animation="wave" />
      </div>
      <div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">None</p>
        <Skeleton variant="rectangular" width="100%" height={40} animation="none" />
      </div>
    </div>
  ),
}

export const CardSkeleton: Story = {
  render: () => (
    <Card variant="default" padding="md" className="w-96">
      <Skeleton variant="rectangular" width="100%" height={160} className="rounded-lg mb-4" />
      <CardHeader>
        <Skeleton variant="text" width="80%" height={24} />
        <Skeleton variant="text" width="100%" height={16} />
        <Skeleton variant="text" width="60%" height={16} />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton variant="text" width="100%" height={14} />
        <Skeleton variant="text" width="90%" height={14} />
      </CardContent>
      <CardFooter>
        <Skeleton variant="rectangular" width={80} height={32} className="rounded-lg" />
        <Skeleton variant="rectangular" width={80} height={32} className="rounded-lg" />
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use inside Card for loading state. Mirrors Card layout to avoid layout shift when content loads.',
      },
    },
  },
}

export const ListSkeleton: Story = {
  render: () => (
    <div className="w-96 space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="70%" height={16} />
            <Skeleton variant="text" width="50%" height={14} />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use for list or feed loading states (e.g. activity lists, user lists).',
      },
    },
  },
}

export const TableSkeleton: Story = {
  render: () => (
    <Table className="min-w-[32rem]">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5].map((i) => (
          <TableRow key={i}>
            <TableCell><Skeleton variant="text" width="80%" height={16} /></TableCell>
            <TableCell><Skeleton variant="text" width="90%" height={16} /></TableCell>
            <TableCell><Skeleton variant="text" width="40%" height={16} /></TableCell>
            <TableCell><Skeleton variant="rectangular" width={64} height={22} className="rounded-md" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use when table data is loading. Keep real column headers; skeleton rows reduce perceived wait.',
      },
    },
  },
}

export const ModalContentSkeleton: Story = {
  render: () => (
    <div className="rounded-xl border border-border bg-bg-secondary p-6 shadow-lg max-w-md" aria-hidden>
      <div className="space-y-4">
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="100%" height={14} />
        <Skeleton variant="text" width="100%" height={14} />
        <Skeleton variant="text" width="70%" height={14} />
        <div className="flex gap-2 pt-4 justify-end">
          <Skeleton variant="rectangular" width={72} height={36} className="rounded-lg" />
          <Skeleton variant="rectangular" width={72} height={36} className="rounded-lg" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use when modal content is loading (e.g. async form or details). Rendered here in a card-style container; in app, use inside Modal while content loads.',
      },
    },
  },
}

export const ActionSheetListSkeleton: Story = {
  render: () => (
    <div className="rounded-t-2xl border border-t border-border bg-bg-secondary p-4 max-w-sm mx-auto" aria-hidden>
      <div className="space-y-0.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3">
            <Skeleton variant="rectangular" width={24} height={24} className="rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width="50%" height={16} />
              <Skeleton variant="text" width="30%" height={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use when action sheet options are loading (e.g. async list). Rendered here in a sheet-style container; in app, use inside ActionSheet while options load.',
      },
    },
  },
}
