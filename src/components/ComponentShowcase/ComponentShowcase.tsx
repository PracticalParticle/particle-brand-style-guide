import React from 'react'
import { cn } from '@/utils/cn'
import {
  Button,
  Card,
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

const shadowSm = '0 10px 25px -5px rgb(0 0 0 / 0.12), 0 4px 10px -4px rgb(0 0 0 / 0.08)'
const shadowMd = '0 14px 28px -8px rgb(0 0 0 / 0.12), 0 6px 12px -6px rgb(0 0 0 / 0.08)'
const shadowLg = '0 20px 40px -10px rgb(0 0 0 / 0.15), 0 8px 16px -8px rgb(0 0 0 / 0.1)'
const shadowXl = '0 24px 48px -12px rgb(0 0 0 / 0.18), 0 12px 24px -12px rgb(0 0 0 / 0.1)'
const shadow2xl = '0 28px 56px -14px rgb(0 0 0 / 0.2), 0 14px 28px -14px rgb(0 0 0 / 0.12)'

function StackCard({
  className,
  style,
  children,
  zIndex = 0,
}: {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
  zIndex?: number
}) {
  return (
    <div
      className={cn(
        'absolute rounded-lg border border-border bg-bg-secondary p-4 min-w-0 overflow-hidden',
        className
      )}
      style={{ boxShadow: style?.boxShadow ?? shadowMd, zIndex, ...style }}
      aria-hidden
    >
      {children}
    </div>
  )
}

export interface ComponentShowcaseProps {
  idPrefix?: string
  className?: string
}

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({
  idPrefix = 'showcase',
  className,
}) => {
  const [segValue, setSegValue] = React.useState<'a' | 'b' | 'c'>('a')
  return (
    <Card
      variant="outlined"
      padding="lg"
      className={cn('min-h-[800px] relative overflow-hidden', className)}
    >
      <div className="relative min-h-[740px] w-full min-w-0 overflow-hidden">
        {/* ═══════════════════════════════════════════════════════════════
            BACK LAYER (z 0–1): Large, receding, light shadow
        ═══════════════════════════════════════════════════════════════ */}
        {/* Large table – back, wide, subtle rotation */}
        <StackCard
          className="left-1/2 top-8 -translate-x-1/2 w-[92%] max-w-[420px] -rotate-[1.5deg]"
          style={{ boxShadow: shadowSm }}
          zIndex={0}
        >
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
        </StackCard>

        {/* Data view (search + table + pagination) – back-center, wide enough for pagination */}
        <StackCard
          className="left-1/2 top-[200px] -translate-x-1/2 w-[90%] min-w-[340px] max-w-[420px] rotate-[0.5deg]"
          style={{ boxShadow: shadowMd }}
          zIndex={1}
        >
          <div className="space-y-2 min-w-0 overflow-hidden">
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
            />
          </div>
        </StackCard>

        {/* ═══════════════════════════════════════════════════════════════
            MIDDLE LAYER (z 2–6): Medium size, main content blocks
        ═══════════════════════════════════════════════════════════════ */}
        {/* Tabs – middle-left */}
        <StackCard
          className="-left-2 top-[420px] w-full max-w-[240px] rotate-[1.5deg]"
          style={{ boxShadow: shadowLg }}
          zIndex={2}
        >
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
        </StackCard>

        {/* Accordion – middle center */}
        <StackCard
          className="left-1/2 top-[440px] -translate-x-1/2 w-full max-w-[260px] -rotate-[0.5deg]"
          style={{ boxShadow: shadow2xl }}
          zIndex={5}
        >
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
        </StackCard>

        {/* Alert + Skeleton – middle-right */}
        <StackCard
          className="-right-2 top-[400px] w-full max-w-[220px] rotate-[2deg]"
          style={{ boxShadow: shadowXl }}
          zIndex={3}
        >
          <Alert variant="info" title="Loading" className="mb-2">
            Fetching data…
          </Alert>
          <div className="space-y-2" aria-hidden>
            <Skeleton variant="text" width="70%" height={12} />
            <Skeleton variant="text" width="90%" height={12} />
          </div>
        </StackCard>

        {/* Form controls – middle left */}
        <StackCard
          className="left-2 top-[120px] w-full max-w-[200px] rotate-[1deg]"
          style={{ boxShadow: shadowMd }}
          zIndex={2}
        >
          <p className="text-xs font-medium text-text-secondary mb-2">Form controls</p>
          <div className="space-y-2">
            <Checkbox id={`${idPrefix}-cb`} label="Option" />
            <Radio name={`${idPrefix}-radio`} id={`${idPrefix}-r1`} label="A" />
            <Radio name={`${idPrefix}-radio`} id={`${idPrefix}-r2`} label="B" defaultChecked />
            <Switch id={`${idPrefix}-sw`} label="Toggle" defaultChecked />
          </div>
        </StackCard>

        {/* Buttons + Input + Progress – middle */}
        <StackCard
          className="left-[26%] top-[140px] w-full max-w-[220px] -rotate-[1deg]"
          style={{ boxShadow: shadowMd }}
          zIndex={3}
        >
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            <Button variant="primary" size="sm">Primary</Button>
            <Button variant="secondary" size="sm">Secondary</Button>
            <Button variant="outline" size="sm">Outline</Button>
          </div>
          <Input id={`${idPrefix}-email`} placeholder="Email" fullWidth className="mb-2" />
          <Progress value={65} className="max-w-full" aria-label="65 percent" size="sm" />
        </StackCard>

        {/* TablePagination – middle (wide enough for "X–Y of Z" + page size + buttons) */}
        <StackCard
          className="right-[18%] top-[130px] w-full min-w-[320px] max-w-[380px] -rotate-[1deg]"
          style={{ boxShadow: shadowMd }}
          zIndex={2}
        >
          <TablePagination
            page={1}
            totalPages={3}
            onPageChange={() => {}}
            pageSize={10}
            onPageSizeChange={() => {}}
            totalItems={12}
            pageSizeOptions={[5, 10, 25]}
          />
        </StackCard>

        {/* Card (CardHeader/CardContent) – middle right */}
        <StackCard
          className="right-2 top-[640px] w-full max-w-[200px] -rotate-[1deg] p-3"
          style={{ boxShadow: shadowLg }}
          zIndex={4}
        >
          <Card variant="outlined" padding="none" className="border-0 shadow-none p-0">
            <CardHeader className="mb-2">
              <CardTitle className="text-sm">Card title</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-text-secondary">
              Card content and description.
            </CardContent>
          </Card>
        </StackCard>

        {/* SegmentedControl – middle */}
        <StackCard
          className="left-[12%] top-[560px] w-full max-w-[220px] rotate-[2deg]"
          style={{ boxShadow: shadowMd }}
          zIndex={3}
        >
          <p className="text-xs font-medium text-text-secondary mb-2">Segments</p>
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
        </StackCard>

        {/* FileInput – middle */}
        <StackCard
          className="right-[8%] top-[620px] w-full max-w-[220px] rotate-[1deg]"
          style={{ boxShadow: shadowMd }}
          zIndex={3}
        >
          <FileInput id={`${idPrefix}-file`} placeholder="Drop file" className="min-w-0" />
        </StackCard>

        {/* EmptyState – middle */}
        <StackCard
          className="left-1/2 top-[680px] -translate-x-1/2 w-full max-w-[200px] rotate-[0.5deg]"
          style={{ boxShadow: shadowLg }}
          zIndex={4}
        >
          <EmptyState size="sm" title="No items" description="Add something" />
        </StackCard>

        {/* Stepper vertical – middle */}
        <StackCard
          className="left-2 top-[340px] w-fit max-w-[140px] p-3 -rotate-[2deg]"
          style={{ boxShadow: shadowMd }}
          zIndex={2}
        >
          <Stepper
            steps={['Step 1', 'Step 2']}
            currentStep={0}
            size="sm"
            variant="minimal"
            orientation="vertical"
          />
        </StackCard>

        {/* ═══════════════════════════════════════════════════════════════
            FRONT LAYER (z 7–14): Small, on top, stronger shadow
        ═══════════════════════════════════════════════════════════════ */}
        {/* Breadcrumbs – room for full path without clipping */}
        <StackCard
          className="-right-1 top-[120px] w-fit min-w-[260px] max-w-[320px] p-3 -rotate-[1.5deg]"
          style={{ boxShadow: shadowLg }}
          zIndex={10}
        >
          <Breadcrumbs
            items={[
              { label: 'Home' },
              { label: 'Products' },
              { label: 'Detail' },
            ]}
          />
        </StackCard>

        {/* FilterChip – small */}
        <StackCard
          className="right-[28%] top-[100px] w-fit max-w-[200px] p-2 -rotate-[1deg]"
          style={{ boxShadow: shadowMd }}
          zIndex={9}
        >
          <FilterChip label="Status" valueLabel="Active" onRemove={() => {}} />
        </StackCard>

        {/* Avatar + Spinner – small */}
        <StackCard
          className="-left-1 top-[340px] w-fit max-w-[180px] p-3 -rotate-[0.5deg]"
          style={{ boxShadow: shadowLg }}
          zIndex={11}
        >
          <div className="flex items-center gap-2">
            <Avatar size="sm" name="Jane Doe" />
            <div>
              <p className="text-xs font-medium text-text-primary">Jane Doe</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Spinner size="sm" variant="primary" aria-hidden />
                <span className="text-xs text-text-tertiary">Loading</span>
              </div>
            </div>
          </div>
        </StackCard>

        {/* Logo – small */}
        <StackCard
          className="left-1/2 top-[380px] -translate-x-1/2 w-fit max-w-[140px] p-3 rotate-[0.5deg]"
          style={{ boxShadow: shadowLg }}
          zIndex={12}
        >
          <Logo size="sm" variant="default" role="img" aria-label="Logo" className="mx-auto" />
        </StackCard>

        {/* Select – small */}
        <StackCard
          className="left-[8%] top-[320px] w-full max-w-[160px] rotate-[-1deg]"
          style={{ boxShadow: shadowMd }}
          zIndex={8}
        >
          <Select id={`${idPrefix}-select`} size="sm" className="w-full">
            <option value="">Choose…</option>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
          </Select>
        </StackCard>

        {/* Stepper horizontal – small */}
        <StackCard
          className="right-[14%] top-[340px] w-full max-w-[180px] -rotate-[1deg]"
          style={{ boxShadow: shadowMd }}
          zIndex={8}
        >
          <Stepper
            steps={['One', 'Two', 'Three']}
            currentStep={1}
            size="sm"
            variant="minimal"
            orientation="horizontal"
          />
        </StackCard>

        {/* Rating – small */}
        <StackCard
          className="right-2 top-[280px] w-fit max-w-[140px] p-3 -rotate-[2deg]"
          style={{ boxShadow: shadowLg }}
          zIndex={10}
        >
          <Rating value={4} readonly size="sm" aria-label="4 of 5 stars" />
          <p className="text-xs text-text-tertiary mt-1">Rating</p>
        </StackCard>

        {/* Tooltip + Button – small */}
        <StackCard
          className="left-[20%] top-[360px] w-fit max-w-[160px] p-3 -rotate-[1deg]"
          style={{ boxShadow: shadowLg }}
          zIndex={11}
        >
          <Tooltip content="Tooltip content" placement="top">
            <Button variant="outline" size="sm">Hover me</Button>
          </Tooltip>
        </StackCard>

        {/* Badges row – small */}
        <StackCard
          className="left-1/2 top-[120px] -translate-x-1/2 w-fit max-w-[220px] p-3 rotate-[0.5deg]"
          style={{ boxShadow: shadowXl }}
          zIndex={13}
        >
          <div className="flex flex-wrap gap-2">
            <Badge variant="error" size="sm">Error</Badge>
            <Badge variant="warning" size="sm">Warning</Badge>
            <Badge variant="info" size="sm">Info</Badge>
          </div>
        </StackCard>

        {/* Divider – small */}
        <StackCard
          className="left-2 top-[520px] w-fit max-w-[160px] p-3 rotate-[1deg]"
          style={{ boxShadow: shadowMd }}
          zIndex={9}
        >
          <p className="text-xs font-medium text-text-primary mb-2">Divider</p>
          <Divider variant="default" className="my-2" />
        </StackCard>

        {/* Alert success – small */}
        <StackCard
          className="right-[24%] top-[560px] w-fit max-w-[200px] p-3 rotate-[1deg]"
          style={{ boxShadow: shadowMd }}
          zIndex={9}
        >
          <Alert variant="success" title="Saved">Changes saved.</Alert>
        </StackCard>

        {/* FilterChip + Badge – small */}
        <StackCard
          className="left-1/2 top-[600px] -translate-x-1/2 w-fit max-w-[240px] p-3 rotate-[0.5deg]"
          style={{ boxShadow: shadowLg }}
          zIndex={10}
        >
          <div className="flex flex-wrap gap-2 items-center">
            <FilterChip label="Type" valueLabel="All" onRemove={() => {}} />
            <Badge variant="outline" size="sm">Filter</Badge>
          </div>
        </StackCard>

        {/* Modal / Toast – small */}
        <StackCard
          className="left-[18%] bottom-6 w-fit max-w-[160px] p-3 rotate-[-1deg]"
          style={{ boxShadow: shadowMd }}
          zIndex={12}
        >
          <p className="text-xs font-medium text-text-primary">Modal</p>
          <Button variant="outline" size="sm" className="mt-1">Open</Button>
        </StackCard>
        <StackCard
          className="right-[18%] bottom-8 w-fit max-w-[140px] p-3 rotate-[1deg]"
          style={{ boxShadow: shadowMd }}
          zIndex={11}
        >
          <p className="text-xs font-medium text-text-primary">Toast</p>
          <p className="text-xs text-text-tertiary mt-0.5">Notification</p>
        </StackCard>

        {/* Progress – small */}
        <StackCard
          className="-left-1 bottom-8 w-full max-w-[140px] p-3 -rotate-[1deg]"
          style={{ boxShadow: shadowLg }}
          zIndex={10}
        >
          <Progress value={80} size="sm" aria-label="80 percent" />
        </StackCard>

        {/* Skeleton block – small */}
        <StackCard
          className="right-2 bottom-6 w-fit max-w-[160px] p-3 -rotate-[1deg]"
          style={{ boxShadow: shadowMd }}
          zIndex={10}
        >
          <div className="space-y-2" aria-hidden>
            <Skeleton variant="text" width="80%" height={12} />
            <Skeleton variant="rectangular" height={28} className="rounded" />
          </div>
        </StackCard>

        {/* Action Button – small, front */}
        <StackCard
          className="-right-2 bottom-6 w-full max-w-[130px] p-3 rotate-[2deg]"
          style={{ boxShadow: shadow2xl }}
          zIndex={14}
        >
          <Button variant="primary" size="sm" fullWidth>Action</Button>
        </StackCard>

        {/* Primary/Success badges – small, front */}
        <StackCard
          className="left-1/2 bottom-6 -translate-x-1/2 w-fit max-w-[180px] p-3 rotate-[0.5deg]"
          style={{ boxShadow: shadowXl }}
          zIndex={13}
        >
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="primary" size="sm">Primary</Badge>
            <Badge variant="success" size="sm">Success</Badge>
          </div>
        </StackCard>
      </div>
    </Card>
  )
}

ComponentShowcase.displayName = 'ComponentShowcase'
