import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardImage, CardAction } from './Card'
import { Button } from '../Button'
import { Badge } from '../Badge'
import { Skeleton } from '../Skeleton'
import {
  LightningIcon,
  LockIcon,
  DeviceIcon,
  StarIcon,
  HeartIcon,
  BellIcon,
  CheckIcon,
  InboxIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MoreOptionsIcon,
  ArrowRightIcon,
} from './icons'

const meta: Meta<typeof Card> = {
  title: 'Components/Surfaces/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**Variants:** `default` and `elevated` = subtle theme border + shadow for clear separation in light and dark. `outlined` = visible theme border, no shadow (best for forms, feature grids, empty states). `filled` = accent background, no border. Borders use theme tokens (`border-border`) that automatically adapt to light/dark mode.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'filled', 'glass', 'on-gradient'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    interactive: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    variant: 'default',
    padding: 'md',
    children: 'This is a default card with some content.',
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    children: 'This is an elevated card with more shadow.',
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    padding: 'md',
    children: 'This is an outlined card with a border.',
  },
}

export const Filled: Story = {
  args: {
    variant: 'filled',
    padding: 'md',
    children: 'This is a filled card with background color.',
  },
}

export const Interactive: Story = {
  args: {
    variant: 'default',
    padding: 'md',
    interactive: true,
    children: 'Hover over this card to see the interactive effect.',
  },
}

export const WithSubComponents: Story = {
  render: () => (
    <Card variant="default" padding="md" className="w-full max-w-md">
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
  ),
}

export const Loading: Story = {
  render: () => (
    <Card variant="default" padding="md" className="w-full max-w-md">
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
        story: 'Show this state while card content is loading. Uses Skeleton to mirror layout and reduce layout shift.',
      },
    },
  },
}

export const PaddingVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Card variant="outlined" padding="none" className="w-full">
        <div className="p-4 bg-secondary rounded-t-card text-text-primary">No padding (custom)</div>
      </Card>
      <Card variant="outlined" padding="sm" className="w-full">
        Small padding
      </Card>
      <Card variant="outlined" padding="md" className="w-full">
        Medium padding (default)
      </Card>
      <Card variant="outlined" padding="lg" className="w-full">
        Large padding
      </Card>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
      <Card variant="default" padding="md">
        <CardTitle>Default</CardTitle>
        <CardContent>Default card variant</CardContent>
      </Card>
      <Card variant="elevated" padding="md">
        <CardTitle>Elevated</CardTitle>
        <CardContent>Elevated card variant</CardContent>
      </Card>
      <Card variant="outlined" padding="md">
        <CardTitle>Outlined</CardTitle>
        <CardContent>Outlined card variant</CardContent>
      </Card>
      <Card variant="filled" padding="md">
        <CardTitle>Filled</CardTitle>
        <CardContent>Filled card variant</CardContent>
      </Card>
      <Card variant="glass" padding="md">
        <CardTitle>Glass</CardTitle>
        <CardContent>Glass card — backdrop blur, for overlays and hero sections.</CardContent>
      </Card>
      <Card variant="on-gradient" padding="md">
        <CardTitle>On gradient</CardTitle>
        <CardContent>On-gradient card — use on duotone backgrounds for readability.</CardContent>
      </Card>
    </div>
  ),
}

export const GlassOnDuotone: Story = {
  render: () => (
    <div className="bg-duotone-hero rounded-card p-8 min-h-[320px] w-full max-w-4xl">
      <h3 className="text-xl font-semibold text-text-primary mb-2">Glass card on duotone</h3>
      <p className="text-text-secondary text-sm mb-6">Use <code className="bg-bg-secondary/80 px-1 rounded">variant=&quot;glass&quot;</code> for a translucent surface with backdrop blur.</p>
      <Card variant="glass" padding="lg" className="max-w-md">
        <CardTitle>Glass variant</CardTitle>
        <CardDescription>This card sits on the duotone hero background. Backdrop blur and subtle border make it stand out.</CardDescription>
        <CardContent className="mt-2">
          <Button variant="primary" size="sm">Primary action</Button>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Glass card on bg-duotone-hero. Use for hero sections and marketing.' } },
  },
}

export const OnGradientOnDuotone: Story = {
  render: () => (
    <div className="bg-duotone-hero rounded-card p-8 min-h-[320px] w-full max-w-4xl">
      <h3 className="text-xl font-semibold text-text-primary mb-2">On-gradient card on duotone</h3>
      <p className="text-text-secondary text-sm mb-6">Use <code className="bg-bg-secondary/80 px-1 rounded">variant=&quot;on-gradient&quot;</code> for near-opaque content cards on gradient backgrounds.</p>
      <Card variant="on-gradient" padding="lg" className="max-w-md">
        <CardTitle>On-gradient variant</CardTitle>
        <CardDescription>Near-opaque surface with light blur — best for feature blocks and longer copy on duotone sections.</CardDescription>
        <CardContent className="mt-2">
          <Button variant="secondary" size="sm">Learn more</Button>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'On-gradient card on bg-duotone-hero. Use for feature blocks and marketing content.' } },
  },
}

export const GlassAndOnGradientComparison: Story = {
  render: () => (
    <div className="bg-duotone-hero rounded-card p-8 w-full max-w-4xl space-y-6">
      <h3 className="text-xl font-semibold text-text-primary">Cards on duotone — comparison</h3>
      <p className="text-text-secondary text-sm">Both variants work on <code className="bg-bg-secondary/80 px-1 rounded">bg-duotone-hero</code>. Glass is more translucent; on-gradient is more readable for dense content.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="glass" padding="lg">
          <CardTitle>Glass</CardTitle>
          <CardDescription>Translucent, backdrop blur. Short content and CTAs.</CardDescription>
          <CardFooter className="border-0 pt-2">
            <Button variant="primary" size="sm">Get started</Button>
          </CardFooter>
        </Card>
        <Card variant="on-gradient" padding="lg">
          <CardTitle>On gradient</CardTitle>
          <CardDescription>Near-opaque, strong shadow. Feature blocks and longer copy.</CardDescription>
          <CardFooter className="border-0 pt-2">
            <Button variant="secondary" size="sm">Learn more</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Side-by-side glass vs on-gradient on duotone background.' } },
  },
}

// ============================================
// PRODUCT CARDS
// ============================================

export const ProductCard: Story = {
  render: () => (
    <Card variant="default" padding="none" className="w-full max-w-xs sm:max-w-[20rem] overflow-hidden" interactive>
      <CardImage 
        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop" 
        alt="Product"
        aspectRatio="square"
      />
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1 min-h-0">
        <CardHeader>
          <div className="flex flex-col gap-2 xs:flex-row xs:items-start xs:justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg sm:text-xl">Wireless Headphones</CardTitle>
              <CardDescription>Premium sound quality</CardDescription>
            </div>
            <span className="text-2xl font-bold text-tertiary dark:text-tertiary-on-dark">$199</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-text-secondary mb-4">
            Experience crystal-clear audio with our premium wireless headphones. 
            Perfect for music lovers and professionals.
          </p>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="outline" size="sm">Wireless</Badge>
            <Badge variant="outline" size="sm">Noise Cancelling</Badge>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="primary" size="sm" className="flex-1">Add to Cart</Button>
          <Button variant="ghost" size="sm" iconOnly aria-label="Favorite">
            <HeartIcon className="w-4 h-4" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  ),
}

// ============================================
// FEATURE CARDS
// ============================================

export const FeatureCard: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl">
      {[
        { icon: LightningIcon, title: 'Fast Performance', desc: 'Lightning-fast load times and smooth interactions' },
        { icon: LockIcon, title: 'Secure by Default', desc: 'Enterprise-grade security built into every feature' },
        { icon: DeviceIcon, title: 'Responsive Design', desc: 'Works perfectly on all devices and screen sizes' },
      ].map((feature) => {
        const IconComponent = feature.icon
        return (
          <Card key={feature.title} variant="outlined" padding="lg" className="text-center">
            <div className="flex justify-center mb-4 text-tertiary">
              <IconComponent className="w-10 h-10" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.desc}</CardDescription>
            </CardContent>
          </Card>
        )
      })}
    </div>
  ),
}

// ============================================
// TESTIMONIAL CARDS
// ============================================

export const TestimonialCard: Story = {
  render: () => (
    <Card variant="default" padding="lg" className="w-full max-w-md">
      <CardContent className="mb-4">
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <StarIcon key={i} className="w-5 h-5 text-warning fill-current" />
          ))}
        </div>
        <p className="text-text-primary italic mb-4">
          "This product has completely transformed how we work. The quality is outstanding 
          and the support team is incredibly responsive."
        </p>
      </CardContent>
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <div className="w-12 h-12 rounded-full bg-tertiary-lighter flex items-center justify-center text-tertiary dark:text-tertiary-on-dark font-semibold">
          JD
        </div>
        <div>
          <div className="font-semibold text-text-primary">John Doe</div>
          <div className="text-sm text-text-secondary">CEO, Tech Company</div>
        </div>
      </div>
    </Card>
  ),
}

// ============================================
// STATS/METRICS CARDS
// ============================================

export const StatsCard: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
      {[
        { label: 'Total Users', value: '12.5K', change: '+12%', trend: 'up' },
        { label: 'Revenue', value: '$45.2K', change: '+8%', trend: 'up' },
        { label: 'Active Sessions', value: '1.2K', change: '-3%', trend: 'down' },
        { label: 'Conversion Rate', value: '3.4%', change: '+2.1%', trend: 'up' },
      ].map((stat) => (
        <Card key={stat.label} variant="elevated" padding="md">
          <CardContent>
            <div className="text-sm text-text-secondary mb-1">{stat.label}</div>
            <div className="text-xl sm:text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
            <div className={`text-xs flex items-center gap-1 ${
              stat.trend === 'up' ? 'text-success' : 'text-error'
            }`}>
              {stat.trend === 'up' ? (
                <ArrowUpIcon className="w-3 h-3" />
              ) : (
                <ArrowDownIcon className="w-3 h-3" />
              )}
              {stat.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}

// ============================================
// PROFILE/USER CARDS
// ============================================

export const ProfileCard: Story = {
  render: () => (
    <Card variant="default" padding="lg" className="w-full max-w-xs sm:max-w-[20rem] text-center">
      <div className="w-20 h-20 rounded-full bg-tertiary-lighter mx-auto mb-4 flex items-center justify-center text-tertiary dark:text-tertiary-on-dark text-2xl font-semibold">
        JD
      </div>
      <CardHeader>
        <CardTitle className="text-xl">John Doe</CardTitle>
        <CardDescription>Senior Product Designer</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-text-secondary mb-4">
          Passionate about creating beautiful and functional user experiences.
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <div>
            <div className="font-semibold text-text-primary">245</div>
            <div className="text-text-secondary">Projects</div>
          </div>
          <div>
            <div className="font-semibold text-text-primary">1.2K</div>
            <div className="text-text-secondary">Followers</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="primary" size="sm">Follow</Button>
        <Button variant="outline" size="sm">Message</Button>
      </CardFooter>
    </Card>
  ),
}

// ============================================
// ARTICLE/BLOG CARDS
// ============================================

export const ArticleCard: Story = {
  render: () => (
    <Card variant="default" padding="none" className="w-full max-w-md overflow-hidden" interactive>
      <CardImage 
        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=200&fit=crop" 
        alt="Article"
        aspectRatio="wide"
      />
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1 min-h-0">
        <CardHeader>
          <div className="flex items-center gap-2 text-xs text-text-tertiary mb-2">
            <span>Design</span>
            <span className="text-text-tertiary">•</span>
            <span>Mar 15, 2025</span>
          </div>
          <CardTitle className="text-lg sm:text-xl">10 Design Trends for 2025</CardTitle>
          <CardDescription>
            Discover the latest design trends that will shape digital experiences this year.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-text-secondary line-clamp-3">
            From minimalist interfaces to bold typography, explore the design trends 
            that are making waves in 2025...
          </p>
        </CardContent>
        <CardFooter className="justify-start">
          <Button variant="ghost" size="sm" rightIcon={<ArrowRightIcon className="w-4 h-4" />}>
            Read More
          </Button>
        </CardFooter>
      </div>
    </Card>
  ),
}

// ============================================
// PRICING CARDS
// ============================================

export const PricingCard: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="w-full p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl mx-auto">
        {[
          { name: 'Starter', price: '$9', popular: false },
          { name: 'Professional', price: '$29', popular: true },
          { name: 'Enterprise', price: '$99', popular: false },
        ].map((plan) => (
          <Card 
            key={plan.name} 
            variant={plan.popular ? 'filled' : 'outlined'} 
            padding="none"
            className={`w-full min-w-0 ${plan.popular ? 'ring-2 ring-tertiary' : ''}`}
          >
            <div className="w-full px-4 py-4 sm:px-5 sm:py-6 flex flex-col flex-1 min-h-0">
            {plan.popular && (
              <div className="flex justify-center mb-3 sm:mb-4">
                <Badge variant="outline" size="sm" className="border-text-inverse/50 text-text-inverse dark:border-text-inverse/50 dark:text-text-inverse">MOST POPULAR</Badge>
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-lg sm:text-2xl">{plan.name}</CardTitle>
              <div className="mt-3 sm:mt-4 flex flex-wrap items-baseline justify-center gap-x-1">
                <span className="text-2xl sm:text-4xl font-bold">{plan.price}</span>
                <span className={`text-sm sm:text-base ${plan.popular ? 'text-text-inverse/90' : 'text-text-secondary'}`}>/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className={`space-y-2 sm:space-y-3 mb-4 sm:mb-6 ${plan.popular ? 'text-text-inverse' : 'text-text-primary'}`}>
                {['Feature one', 'Feature two', 'Feature three', 'Feature four'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <CheckIcon className={`w-4 h-4 flex-shrink-0 ${plan.popular ? 'text-text-inverse' : 'text-tertiary'}`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant={plan.popular ? 'secondary' : 'outline'} 
                size="md"
                className="w-full min-h-11 sm:min-h-0"
              >
                Get Started
              </Button>
            </CardFooter>
          </div>
        </Card>
        ))}
      </div>
    </div>
  ),
}

// ============================================
// DASHBOARD CARDS
// ============================================

export const DashboardCard: Story = {
  render: () => (
    <Card variant="default" padding="md" className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex flex-row items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest updates and notifications</CardDescription>
          </div>
          <CardAction>
            <Button variant="ghost" size="sm">View All</Button>
          </CardAction>
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
                {item.user.split(' ').map(n => n[0]).join('')}
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
  ),
}

// ============================================
// MEDIA CARDS
// ============================================

export const MediaCard: Story = {
  render: () => (
    <Card variant="default" padding="none" className="w-full max-w-xs sm:max-w-[20rem] overflow-hidden" interactive>
      <CardImage 
        src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop" 
        alt="Video thumbnail"
        aspectRatio="video"
      />
      <div className="p-4 sm:p-5 md:p-6">
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
  ),
}

// ============================================
// NOTIFICATION CARDS
// ============================================

export const NotificationCard: Story = {
  render: () => (
    <Card variant="default" padding="md" className="w-full max-w-md">
      <div className="flex flex-row items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-text-inverse flex-shrink-0">
          <BellIcon className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between mb-1">
            <CardTitle className="text-base">New Message</CardTitle>
            <span className="text-xs text-text-tertiary">2m ago</span>
          </div>
          <CardDescription className="mb-2">
            You have a new message from Sarah Johnson
          </CardDescription>
          <CardContent className="p-0">
            <p className="text-sm text-text-secondary">
              "Hey, can we schedule a meeting for tomorrow?"
            </p>
          </CardContent>
          <CardFooter className="p-0 pt-3 border-0">
            <Button variant="ghost" size="sm">Dismiss</Button>
            <Button variant="primary" size="sm">Reply</Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  ),
}

// ============================================
// EMPTY STATE CARDS
// ============================================

export const EmptyStateCard: Story = {
  render: () => (
    <Card variant="outlined" padding="lg" className="w-full max-w-md text-center">
      <div className="flex justify-center mb-4 text-text-tertiary">
        <InboxIcon className="w-16 h-16" />
      </div>
      <CardHeader>
        <CardTitle>No Items Found</CardTitle>
        <CardDescription>
          You don't have any items yet. Get started by creating your first item.
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-center">
        <Button variant="primary" size="md">Create Item</Button>
      </CardFooter>
    </Card>
  ),
}

// ============================================
// CARD WITH HEADER ACTIONS
// ============================================

export const CardWithHeaderActions: Story = {
  render: () => (
    <Card variant="default" padding="md" className="w-full max-w-md">
      <CardHeader>
        <div className="flex flex-row items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle>Card with Actions</CardTitle>
            <CardDescription>This card has action buttons in the header</CardDescription>
          </div>
          <CardAction>
            <Button variant="ghost" size="sm" iconOnly aria-label="More options">
              <MoreOptionsIcon className="w-5 h-5" />
            </Button>
          </CardAction>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-text-secondary">
          This card demonstrates how to add action buttons or menus in the card header.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
}
