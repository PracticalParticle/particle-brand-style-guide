import type { Meta, StoryObj } from '@storybook/react'
import { Bento, type BentoItem } from './Bento'
import {
  Button,
  Badge,
  Input,
  Progress,
  CardHeader,
  CardTitle,
  CardContent,
  Avatar,
  Spinner,
  Alert,
  Skeleton,
  Tabs,
  TabsList,
  Tab,
  TabsPanels,
  TabPanel,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Checkbox,
  Radio,
  Switch,
  SegmentedControl,
  Rating,
  EmptyState,
  FileInput,
  Breadcrumbs,
  Logo,
} from '@/components'

const meta: Meta<typeof Bento> = {
  title: 'Components/Layout/Bento',
  component: Bento,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flexible grid layout component inspired by bento box design. Supports configurable columns, row/column spans, and any content type.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Number of columns in the grid',
    },
    gap: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Gap between grid items',
    },
  },
}

export default meta
type Story = StoryObj<typeof Bento>

// Example items for showcase
const showcaseItems: BentoItem[] = [
  {
    key: 'table',
    content: (
      <div className="min-w-0 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>TXN-01</TableCell>
              <TableCell>Alice</TableCell>
              <TableCell><Badge variant="success" size="sm">Done</Badge></TableCell>
              <TableCell>$1,200</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TXN-02</TableCell>
              <TableCell>Bob</TableCell>
              <TableCell><Badge variant="warning" size="sm">Pending</Badge></TableCell>
              <TableCell>$890</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TXN-03</TableCell>
              <TableCell>Carol</TableCell>
              <TableCell><Badge variant="default" size="sm">New</Badge></TableCell>
              <TableCell>$2,100</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    ),
    colSpan: 2,
    rowSpan: 2,
  },
  {
    key: 'form-controls',
    content: (
      <div>
        <p className="text-sm font-medium text-text-secondary mb-3">Form Controls</p>
        <div className="space-y-3">
          <Checkbox id="bento-cb" label="Option" />
          <Radio name="bento-radio" id="bento-r1" label="Option A" />
          <Radio name="bento-radio" id="bento-r2" label="Option B" defaultChecked />
          <Switch id="bento-sw" label="Toggle" defaultChecked />
        </div>
      </div>
    ),
    colSpan: 1,
    rowSpan: 1,
  },
  {
    key: 'buttons-badges',
    content: (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" size="sm">Primary</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
          <Button variant="outline" size="sm">Outline</Button>
        </div>
        <Input id="bento-email" placeholder="Email" fullWidth />
        <Progress value={65} aria-label="65 percent" size="sm" />
      </div>
    ),
    colSpan: 1,
    rowSpan: 2,
  },
  {
    key: 'tabs',
    content: (
      <Tabs value="overview" onChange={() => {}} size="sm" variant="pills">
        <TabsList>
          <Tab value="overview">Overview</Tab>
          <Tab value="details">Details</Tab>
        </TabsList>
        <TabsPanels>
          <TabPanel value="overview">
            <p className="text-sm text-text-secondary pt-2">Dashboard and data views.</p>
          </TabPanel>
          <TabPanel value="details">
            <p className="text-sm text-text-secondary pt-2">Filters and tables.</p>
          </TabPanel>
        </TabsPanels>
      </Tabs>
    ),
    colSpan: 1,
    rowSpan: 1,
  },
  {
    key: 'alert-skeleton',
    content: (
      <div className="space-y-3">
        <Alert variant="info" title="Loading">
          Fetching data…
        </Alert>
        <div className="space-y-2" aria-hidden>
          <Skeleton variant="text" width="70%" height={12} />
          <Skeleton variant="text" width="90%" height={12} />
        </div>
      </div>
    ),
    colSpan: 1,
    rowSpan: 1,
  },
  {
    key: 'avatar-spinner',
    content: (
      <div className="flex items-center gap-3">
        <Avatar size="md" name="Jane Doe" />
        <div>
          <p className="text-sm font-medium text-text-primary">Jane Doe</p>
          <div className="flex items-center gap-2 mt-1">
            <Spinner size="sm" variant="primary" aria-hidden />
            <span className="text-xs text-text-tertiary">Loading</span>
          </div>
        </div>
      </div>
    ),
    colSpan: 1,
    rowSpan: 1,
  },
  {
    key: 'segmented-control',
    content: (
      <div>
        <p className="text-sm font-medium text-text-secondary mb-3">Segments</p>
        <SegmentedControl
          options={[
            { value: 'a', label: 'One' },
            { value: 'b', label: 'Two' },
            { value: 'c', label: 'Three' },
          ]}
          value="a"
          onValueChange={() => {}}
          size="sm"
        />
      </div>
    ),
    colSpan: 1,
    rowSpan: 1,
  },
  {
    key: 'rating',
    content: (
      <div>
        <Rating value={4} readonly size="md" aria-label="4 of 5 stars" />
        <p className="text-sm text-text-tertiary mt-2">Customer Rating</p>
      </div>
    ),
    colSpan: 1,
    rowSpan: 1,
  },
  {
    key: 'breadcrumbs',
    content: (
      <Breadcrumbs
        items={[
          { label: 'Home' },
          { label: 'Products' },
          { label: 'Detail' },
        ]}
      />
    ),
    colSpan: 2,
    rowSpan: 1,
  },
  {
    key: 'logo',
    content: (
      <div className="flex items-center justify-center h-full">
        <Logo size="md" variant="default" role="img" aria-label="Logo" />
      </div>
    ),
    colSpan: 1,
    rowSpan: 1,
  },
  {
    key: 'empty-state',
    content: (
      <EmptyState size="sm" title="No items" description="Add something to get started" />
    ),
    colSpan: 1,
    rowSpan: 1,
  },
  {
    key: 'file-input',
    content: (
      <FileInput id="bento-file" placeholder="Drop file here" />
    ),
    colSpan: 1,
    rowSpan: 1,
  },
]

export const Default: Story = {
  args: {
    items: showcaseItems,
    columns: 4,
    gap: 'md',
  },
}

export const ThreeColumns: Story = {
  args: {
    items: showcaseItems,
    columns: 3,
    gap: 'md',
  },
}

export const TwoColumns: Story = {
  args: {
    items: showcaseItems,
    columns: 2,
    gap: 'lg',
  },
}

export const SixColumns: Story = {
  args: {
    items: showcaseItems,
    columns: 6,
    gap: 'sm',
  },
}

export const LargeGaps: Story = {
  args: {
    items: showcaseItems,
    columns: 4,
    gap: 'lg',
  },
}

export const SmallGaps: Story = {
  args: {
    items: showcaseItems,
    columns: 4,
    gap: 'sm',
  },
}

export const MixedContent: Story = {
  args: {
    items: [
      {
        key: 'image-placeholder',
        content: (
          <div className="w-full h-full bg-bg-tertiary rounded flex items-center justify-center">
            <p className="text-text-tertiary text-sm">Image Content</p>
          </div>
        ),
        colSpan: 2,
        rowSpan: 2,
        padding: 'none',
      },
      {
        key: 'data-card',
        content: (
          <div>
            <CardHeader>
              <CardTitle className="text-lg">Data Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Total Users</span>
                  <span className="text-sm font-medium">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Active</span>
                  <span className="text-sm font-medium">892</span>
                </div>
                <Progress value={72} aria-label="72 percent" className="mt-3" />
              </div>
            </CardContent>
          </div>
        ),
        colSpan: 2,
        rowSpan: 1,
      },
      {
        key: 'stats',
        content: (
          <div className="space-y-4">
            <div>
              <p className="text-xs text-text-tertiary mb-1">Revenue</p>
              <p className="text-2xl font-semibold">$12,345</p>
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Growth</p>
              <p className="text-lg font-medium text-success">+12.5%</p>
            </div>
          </div>
        ),
        colSpan: 1,
        rowSpan: 1,
      },
      {
        key: 'actions',
        content: (
          <div className="space-y-2">
            <Button variant="primary" size="sm" fullWidth>Primary Action</Button>
            <Button variant="outline" size="sm" fullWidth>Secondary</Button>
          </div>
        ),
        colSpan: 1,
        rowSpan: 1,
      },
    ],
    columns: 4,
    gap: 'md',
  },
}

export const ComponentShowcase: Story = {
  args: {
    items: showcaseItems,
    columns: 4,
    gap: 'md',
    minHeight: 200,
  },
  parameters: {
    layout: 'fullscreen',
  },
}
