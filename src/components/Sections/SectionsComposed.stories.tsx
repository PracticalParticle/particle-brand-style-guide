import type { Meta, StoryObj } from '@storybook/react'
import {
  SectionContainer,
  Hero,
  Features,
  SectionCta,
  ComingSoon,
  SectionHeader,
  MediaSection,
  Button,
  Badge,
  Logo,
} from '../index'
import type { FeatureItem } from './Features'

const LockIcon = () => (
  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)
const ChartIcon = () => (
  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)
const ShieldIcon = () => (
  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const featureItems: FeatureItem[] = [
  { icon: <LockIcon />, title: 'Identity at the account layer', description: 'KYC/AML enforced so only compliant actors move regulated value.' },
  { icon: <ChartIcon />, title: 'Full audit trail', description: 'Chain plus policy and logs. Supervisors get visibility.' },
  { icon: <ShieldIcon />, title: 'Enforceable interventions', description: 'Freeze, pause, or redeem on court order — policy-based and auditable.' },
]

const meta: Meta = {
  title: 'Sections/Landing page',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Compose sections with `SectionContainer` for a full landing layout. Import styles: `@particle-crypto/style-guide/styles.css`.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const FullPageExample: Story = {
  render: () => (
    <div className="min-h-screen bg-bg-canvas">
      <SectionContainer maxWidth="wide" padding="lg" className="space-y-12 sm:space-y-16 py-10 sm:py-14">
        <Hero
          badge={<Badge variant="outline">Now available</Badge>}
          title="Secure, compliant infrastructure for digital assets"
          subtitle="BloxChain Protocol — governance and control for regulated smart accounts on public blockchains."
          visual={<Logo size="xl" variant="default" aria-hidden className="w-16 h-16 sm:w-20 sm:h-20" />}
          primaryAction={<Button variant="primary">Get started</Button>}
          secondaryAction={<Button variant="secondary">Learn more</Button>}
          size="md"
          variant="gradient"
          titleGradient
          showDividerLine
        />

        <Features
          title="What the protocol delivers"
          description="Three pillars underpin supervisory acceptance and institutional use."
          items={featureItems}
          columns={3}
          variant="cards"
          size="md"
          withBackgroundPattern
          showHeaderDivider
        />

        <SectionCta
          title="Ready to get started?"
          description="Request access or talk to our team about your use case."
          action={<Button variant="primary">Request access</Button>}
          secondaryAction={<Button variant="secondary">Contact sales</Button>}
          variant="gradient"
          size="md"
        />

        <MediaSection
          title="Watch the overview"
          subtitle="A quick introduction to the platform."
          maxWidth="xl"
        >
          <div className="aspect-video w-full bg-bg-surface-muted flex items-center justify-center text-text-muted text-sm">
            Video or embed
          </div>
        </MediaSection>

        <ComingSoon
          variant="gradient"
          size="md"
          title="Regulated token analytics"
          description="Charts, compliance metrics, and audit trails will be available here."
          badge={<Badge variant="outline">Coming soon</Badge>}
          primaryAction={<Button variant="secondary">Notify me</Button>}
        />
      </SectionContainer>
    </div>
  ),
}

export const WithSectionHeaderAndMedia: Story = {
  render: () => (
    <div className="min-h-screen bg-bg-canvas py-12">
      <SectionContainer maxWidth="wide" padding="lg" className="space-y-16">
        <SectionHeader
          title="Connect with us"
          subtitle="Ready to get started? Our team is here to help."
          alignment="center"
        >
          <Button variant="primary">Contact</Button>
        </SectionHeader>
        <MediaSection
          title="Watch the overview"
          subtitle="A quick introduction."
          maxWidth="xl"
        >
          <div className="aspect-video w-full bg-bg-surface-muted flex items-center justify-center text-text-muted">
            Video embed placeholder
          </div>
        </MediaSection>
      </SectionContainer>
    </div>
  ),
}
