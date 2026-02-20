import React from 'react'
import { cn } from '@/utils/cn'
import {
  Button,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Input,
  Alert,
  Spinner,
  Progress,
  Tabs,
  TabsList,
  Tab,
  TabsPanels,
  TabPanel,
  Avatar,
  Skeleton,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TablePagination,
  Checkbox,
  Radio,
  Switch,
  Breadcrumbs,
  Rating,
  Divider,
  Stepper,
  EmptyState,
  FileInput,
  SegmentedControl,
  Tooltip,
  Logo,
  Select,
  FilterChip,
} from '@/components'
import { Bento, type BentoItem } from '@/components/Bento'

export interface ComponentShowcaseProps {
  idPrefix?: string
  className?: string
}

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({
  idPrefix = 'showcase',
  className,
}) => {
  const [segValue, setSegValue] = React.useState<'a' | 'b' | 'c'>('a')

  const bentoItems: BentoItem[] = [
    // Large table - responsive: full width on mobile, 2 cols on md+, 2 rows
    {
      key: 'table-large',
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
              <TableRow>
                <TableCell>TXN-04</TableCell>
                <TableCell>David</TableCell>
                <TableCell><Badge variant="success" size="sm">Done</Badge></TableCell>
                <TableCell>$560</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ),
      colSpan: { base: 1, sm: 2, md: 2, lg: 2 },
      rowSpan: { base: 1, md: 2 },
      padding: 'md',
    },
    // Data view with search, table, and pagination - responsive: full width on mobile, 2 cols on md+
    {
      key: 'data-view',
      content: (
        <div className="space-y-3 min-w-0 overflow-hidden">
          <div className="flex gap-2 min-w-0">
            <Input id={`${idPrefix}-search`} placeholder="Search…" className="min-w-0 flex-1" />
            <Button variant="primary" size="sm" className="shrink-0">Add</Button>
          </div>
          <div className="min-w-0 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">ID</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-xs">1</TableCell>
                  <TableCell><Badge variant="success" size="sm">Done</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-xs">2</TableCell>
                  <TableCell><Badge variant="warning" size="sm">Pending</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <TablePagination
            page={1}
            totalPages={1}
            onPageChange={() => {}}
            pageSize={5}
            onPageSizeChange={() => {}}
            totalItems={2}
            pageSizeOptions={[5, 10]}
            aria-label="Data view pagination"
            idPrefix={`${idPrefix}-data-view`}
          />
        </div>
      ),
      colSpan: { base: 1, sm: 2, md: 2, lg: 2 },
      rowSpan: { base: 1, md: 2 },
      padding: 'md',
    },
    // Form controls
    {
      key: 'form-controls',
      content: (
        <div>
          <p className="text-sm font-medium text-text-secondary mb-3">Form Controls</p>
          <div className="space-y-3">
            <Checkbox id={`${idPrefix}-cb`} label="Option" />
            <Radio name={`${idPrefix}-radio`} id={`${idPrefix}-r1`} label="A" />
            <Radio name={`${idPrefix}-radio`} id={`${idPrefix}-r2`} label="B" defaultChecked />
            <Switch id={`${idPrefix}-sw`} label="Toggle" defaultChecked />
          </div>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // Buttons, badges, input, progress - responsive: 1 col on mobile, 1-2 on larger screens
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
          <Input id={`${idPrefix}-email`} placeholder="Email" fullWidth />
          <Progress value={65} aria-label="65 percent" size="sm" />
        </div>
      ),
      colSpan: { base: 1, sm: 1, md: 1, lg: 1 },
      rowSpan: { base: 1, md: 2 },
      padding: 'md',
    },
    // Tabs
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
      padding: 'md',
    },
    // Accordion
    {
      key: 'accordion',
      content: (
        <Accordion defaultValue="a">
          <AccordionItem value="a">
            <AccordionTrigger value="a">Section A</AccordionTrigger>
            <AccordionContent value="a">
              <span className="text-xs text-text-tertiary">Content for section A.</span>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger value="b">Section B</AccordionTrigger>
            <AccordionContent value="b">
              <span className="text-xs text-text-tertiary">Content for section B.</span>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // Alert + Skeleton
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
      padding: 'md',
    },
    // Table pagination - responsive: full width on mobile, 2 cols on md+
    {
      key: 'table-pagination',
      content: (
        <TablePagination
          page={1}
          totalPages={3}
          onPageChange={() => {}}
          pageSize={10}
          onPageSizeChange={() => {}}
          totalItems={12}
          pageSizeOptions={[5, 10, 25]}
          aria-label="Table pagination"
          idPrefix={`${idPrefix}-table`}
        />
      ),
      colSpan: { base: 1, sm: 2, md: 2, lg: 2 },
      rowSpan: 1,
      padding: 'md',
    },
    // Card with header and content
    {
      key: 'card-header-content',
      content: (
        <div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Card Title</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-text-secondary">
            Card content and description.
          </CardContent>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // Segmented control
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
            value={segValue}
            onValueChange={(v) => setSegValue(v as 'a' | 'b' | 'c')}
            size="sm"
          />
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // File input
    {
      key: 'file-input',
      content: (
        <FileInput id={`${idPrefix}-file`} placeholder="Drop file" />
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // Empty state
    {
      key: 'empty-state',
      content: (
        <EmptyState size="sm" title="No items" description="Add something" />
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // Stepper vertical
    {
      key: 'stepper-vertical',
      content: (
        <Stepper
          steps={['Step 1', 'Step 2']}
          currentStep={0}
          size="sm"
          variant="minimal"
          orientation="vertical"
        />
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // Breadcrumbs - responsive: full width on mobile, 2 cols on md+
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
      colSpan: { base: 1, sm: 2, md: 2, lg: 2 },
      rowSpan: 1,
      padding: 'md',
    },
    // Filter chip
    {
      key: 'filter-chip',
      content: (
        <FilterChip label="Status" valueLabel="Active" onRemove={() => {}} />
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // Avatar + Spinner
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
      padding: 'md',
    },
    // Logo
    {
      key: 'logo',
      content: (
        <div className="flex items-center justify-center h-full">
          <Logo size="md" variant="default" role="img" aria-label="Logo" />
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // Select
    {
      key: 'select',
      content: (
        <Select id={`${idPrefix}-select`} size="sm" className="w-full" aria-label="Choose an option">
          <option value="">Choose…</option>
          <option value="a">Option A</option>
          <option value="b">Option B</option>
        </Select>
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // Stepper horizontal
    {
      key: 'stepper-horizontal',
      content: (
        <Stepper
          steps={['One', 'Two', 'Three']}
          currentStep={1}
          size="sm"
          variant="minimal"
          orientation="horizontal"
        />
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // Rating
    {
      key: 'rating',
      content: (
        <div>
          <Rating value={4} readonly size="md" aria-label="4 of 5 stars" />
          <p className="text-sm text-text-tertiary mt-2">Rating</p>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // Tooltip + Button
    {
      key: 'tooltip-button',
      content: (
        <Tooltip content="Tooltip content" placement="top">
          <Button variant="outline" size="sm">Hover me</Button>
        </Tooltip>
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // Badges row - responsive: full width on mobile, 2 cols on md+
    {
      key: 'badges-row',
      content: (
        <div className="flex flex-wrap gap-2">
          <Badge variant="error" size="sm">Error</Badge>
          <Badge variant="warning" size="sm">Warning</Badge>
          <Badge variant="info" size="sm">Info</Badge>
        </div>
      ),
      colSpan: { base: 1, sm: 2, md: 2, lg: 2 },
      rowSpan: 1,
      padding: 'md',
    },
    // Divider
    {
      key: 'divider',
      content: (
        <div>
          <p className="text-sm font-medium text-text-primary mb-2">Divider</p>
          <Divider variant="default" className="my-2" />
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // Alert success
    {
      key: 'alert-success',
      content: (
        <Alert variant="success" title="Saved">Changes saved.</Alert>
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // Filter chip + Badge - responsive: full width on mobile, 2 cols on md+
    {
      key: 'filter-chip-badge',
      content: (
        <div className="flex flex-wrap gap-2 items-center">
          <FilterChip label="Type" valueLabel="All" onRemove={() => {}} />
          <Badge variant="outline" size="sm">Filter</Badge>
        </div>
      ),
      colSpan: { base: 1, sm: 2, md: 2, lg: 2 },
      rowSpan: 1,
      padding: 'md',
    },
    // Progress
    {
      key: 'progress',
      content: (
        <div>
          <p className="text-sm font-medium text-text-secondary mb-2">Progress</p>
          <Progress value={80} size="sm" aria-label="80 percent" />
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // Skeleton block
    {
      key: 'skeleton-block',
      content: (
        <div className="space-y-2" aria-hidden>
          <Skeleton variant="text" width="80%" height={12} />
          <Skeleton variant="rectangular" height={28} className="rounded" />
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // Action button
    {
      key: 'action-button',
      content: (
        <Button variant="primary" size="sm" fullWidth>Action</Button>
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
    // Primary/Success badges
    {
      key: 'primary-success-badges',
      content: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="primary" size="sm">Primary</Badge>
          <Badge variant="success" size="sm">Success</Badge>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      padding: 'md',
    },
  ]

  return (
    <div className={cn('w-full min-w-0', className)}>
      <Bento
        items={bentoItems}
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        gap="md"
        minHeight={200}
      />
    </div>
  )
}

ComponentShowcase.displayName = 'ComponentShowcase'
