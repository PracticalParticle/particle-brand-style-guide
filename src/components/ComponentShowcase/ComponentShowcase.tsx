import React from 'react'
import { cn } from '@/utils/cn'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  Badge,
  Input,
  Alert,
  Progress,
  Tabs,
  TabsList,
  Tab,
  TabsPanels,
  TabPanel,
  Avatar,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Checkbox,
  Radio,
  Switch,
  Breadcrumbs,
  Divider,
  Stepper,
  EmptyState,
  FileInput,
  SegmentedControl,
  Tooltip,
  Logo,
  Select,
} from '@/components'
import { OrdersTablePreview } from '@/components/DataView/OrdersTablePreview'

export interface ComponentShowcaseProps {
  idPrefix?: string
  className?: string
}

/** Wrapper for each app preview: canvas background so nested cards/surfaces are visible */
function AppPanel({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'w-full min-w-0 rounded-card border border-border bg-bg-primary overflow-visible',
        'flex flex-col items-stretch',
        className
      )}
    >
      <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wide px-4 sm:px-6 pt-4 pb-2 border-b border-border">
        {title}
      </h2>
      <div className="p-4 sm:p-6 flex flex-col gap-4 min-w-0">{children}</div>
    </section>
  )
}

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({
  idPrefix = 'showcase',
  className,
}) => {
  const [segValue, setSegValue] = React.useState<'a' | 'b' | 'c'>('a')

  return (
    <div className={cn('w-full min-w-0 flex flex-col gap-6 sm:gap-8', className)}>
      {/* From: Data View / TableView story — responsive orders table */}
      <AppPanel title="Data View — Orders table">
        <OrdersTablePreview showModal={false} />
      </AppPanel>

      {/* From: Card stories — DashboardCard, MediaCard, WithSubComponents */}
      <AppPanel title="Cards">
        <div className="flex flex-wrap gap-4 items-stretch">
          <Card variant="default" padding="md" className="w-full max-w-2xl min-w-0 flex-1">
            <CardHeader>
              <div className="flex flex-row items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest updates and notifications</CardDescription>
                </div>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'New comment', time: '2 minutes ago', user: 'John Doe' },
                  { action: 'File uploaded', time: '1 hour ago', user: 'Jane Smith' },
                  { action: 'Task completed', time: '3 hours ago', user: 'Bob Wilson' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                    <div className="w-8 h-8 rounded-full bg-tertiary-lighter flex items-center justify-center text-tertiary dark:text-tertiary-on-dark text-xs font-semibold flex-shrink-0">
                      {item.user.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-text-primary">{item.action}</div>
                      <div className="text-xs text-text-tertiary">{item.user} • {item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card variant="default" padding="none" className="w-full max-w-xs sm:max-w-[20rem] overflow-hidden flex-1 min-w-0" interactive>
            <CardImage
              src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop"
              alt="Video thumbnail"
              aspectRatio="video"
            />
            <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1 min-h-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <CardTitle className="text-lg min-w-0 flex-1">Video Title</CardTitle>
                <Badge variant="outline" size="sm">12:34</Badge>
              </div>
              <CardDescription className="mb-3 text-text-tertiary">
                Channel Name • 1.2M views • 2 days ago
              </CardDescription>
              <CardContent>
                <p className="text-sm text-text-secondary line-clamp-2">
                  Video description goes here. This is a sample description for a media card.
                </p>
              </CardContent>
            </div>
          </Card>
          <Card variant="default" padding="md" className="w-full max-w-md flex-1 min-w-0">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>This is a card description that provides additional context.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">
                This is the main content area of the card. You can put any content here.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">Cancel</Button>
              <Button variant="primary" size="sm">Action</Button>
            </CardFooter>
          </Card>
        </div>
      </AppPanel>

      {/* From: Input, Select, Checkbox, Radio, Switch, FileInput stories */}
      <AppPanel title="Form controls">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <div className="space-y-3 sm:col-span-2">
            <Input id={`${idPrefix}-name`} label="Full name" placeholder="Full name" fullWidth />
            <Input id={`${idPrefix}-email`} label="Email" placeholder="Email" type="email" fullWidth />
          </div>
          <div className="space-y-3">
            <Select
              id={`${idPrefix}-role`}
              size="sm"
              className="w-full"
              aria-label="Role"
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </Select>
            <FileInput id={`${idPrefix}-avatar`} label="Avatar" placeholder="Upload avatar" />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-medium text-text-primary">Notifications</p>
            <Checkbox id={`${idPrefix}-notify-email`} label="Email" defaultChecked />
            <Checkbox id={`${idPrefix}-notify-push`} label="Push" />
            <Radio name={`${idPrefix}-freq`} id={`${idPrefix}-freq-daily`} label="Daily digest" />
            <Radio name={`${idPrefix}-freq`} id={`${idPrefix}-freq-weekly`} label="Weekly" defaultChecked />
            <Switch id={`${idPrefix}-dark`} label="Dark mode" defaultChecked />
          </div>
        </div>
        <Divider className="my-2" />
        <div className="flex flex-wrap gap-2 justify-end">
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Save changes</Button>
        </div>
      </AppPanel>

      {/* From: Breadcrumbs, Tabs, Alert, Stepper stories */}
      <AppPanel title="Navigation & feedback">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Projects', href: '#' },
            { label: 'Settings' },
          ]}
        />
        <Tabs value="overview" onChange={() => {}} size="sm" variant="pills">
          <TabsList>
            <Tab value="overview">Overview</Tab>
            <Tab value="details">Details</Tab>
            <Tab value="activity">Activity</Tab>
          </TabsList>
          <TabsPanels>
            <TabPanel value="overview">
              <div className="space-y-3 pt-3">
                <Alert variant="info" title="Tip">
                  Use tabs for secondary navigation within a section.
                </Alert>
                <Progress value={60} size="sm" aria-label="60 percent" />
                <Stepper
                  steps={['Create', 'Review', 'Publish']}
                  currentStep={1}
                  size="sm"
                  variant="minimal"
                  orientation="horizontal"
                />
              </div>
            </TabPanel>
            <TabPanel value="details">
              <p className="text-sm text-text-secondary pt-2">Details content.</p>
            </TabPanel>
            <TabPanel value="activity">
              <p className="text-sm text-text-secondary pt-2">Activity log.</p>
            </TabPanel>
          </TabsPanels>
        </Tabs>
      </AppPanel>

      {/* From: Avatar, SegmentedControl, Tooltip, Logo, EmptyState, Accordion stories */}
      <AppPanel title="Empty state & accordion">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 p-3 rounded-card bg-bg-tertiary/50 min-w-0">
            <Avatar src="" alt="" fallback="JD" size="lg" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">Jane Doe</p>
              <p className="text-xs text-text-secondary truncate">jane@example.com</p>
            </div>
            <Button variant="secondary" size="sm" className="shrink-0">Edit</Button>
          </div>
          <SegmentedControl
            value={segValue}
            onValueChange={(v) => setSegValue(v as 'a' | 'b' | 'c')}
            options={[
              { value: 'a', label: 'List' },
              { value: 'b', label: 'Grid' },
              { value: 'c', label: 'Map' },
            ]}
          />
          <Tooltip content="Show help" placement="top">
            <Button variant="ghost" size="sm">Help</Button>
          </Tooltip>
          <Logo variant="default" size={24} />
        </div>
        <EmptyState
          title="No documents yet"
          description="Upload a file or create from template to get started."
          action={<Button variant="primary" size="sm">Upload file</Button>}
        />
        <Accordion type="single" defaultValue="a" className="border border-border rounded-card overflow-hidden max-w-xl">
          <AccordionItem value="a">
            <AccordionTrigger value="a">Section A</AccordionTrigger>
            <AccordionContent value="a">Content for section A.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger value="b">Section B</AccordionTrigger>
            <AccordionContent value="b">Content for section B.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </AppPanel>
    </div>
  )
}

ComponentShowcase.displayName = 'ComponentShowcase'
