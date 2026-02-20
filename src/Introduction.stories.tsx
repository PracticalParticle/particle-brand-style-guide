import type { Meta, StoryObj } from '@storybook/react'
import React, { useEffect, useRef, useState } from 'react'
import {
  Card,
  Divider,
  Spinner,
  Logo,
  ComponentShowcase,
} from '@/components'

type A11yResult = {
  passes: number
  violations: number
  incomplete: number
  inProgress: boolean
  error?: string
}

function AccessibilityAudit({ targetRef }: { targetRef: React.RefObject<HTMLDivElement | null> }) {
  const [result, setResult] = useState<A11yResult>({
    passes: 0,
    violations: 0,
    incomplete: 0,
    inProgress: true,
  })

  useEffect(() => {
    if (!targetRef?.current) return
    let cancelled = false

    async function runAxe() {
      try {
        const axe = (await import('axe-core')).default
        axe.run(targetRef.current!, { resultTypes: ['violations', 'passes', 'incomplete'] }, (err, results) => {
          if (cancelled) return
          if (err) {
            setResult((r) => ({ ...r, inProgress: false, error: err.message }))
            return
          }
          setResult({
            passes: results?.passes?.length ?? 0,
            violations: results?.violations?.length ?? 0,
            incomplete: results?.incomplete?.length ?? 0,
            inProgress: false,
          })
        })
      } catch {
        if (!cancelled) {
          setResult((r) => ({
            ...r,
            inProgress: false,
            error: 'axe-core not available',
          }))
        }
      }
    }

    const t = setTimeout(runAxe, 500)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [targetRef])

  if (result.error) {
    return (
      <p className="text-sm text-text-secondary">
        Open the <strong>Accessibility</strong> tab in the panel below for real-time audit results.
      </p>
    )
  }

  if (result.inProgress) {
    return (
      <div className="flex items-center gap-2 text-text-secondary">
        <Spinner size="sm" variant="primary" aria-hidden />
        <span className="text-sm">Running accessibility audit…</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" role="status" aria-label="Accessibility audit results">
      <div className="p-3 rounded-lg border border-border bg-bg-secondary">
        <div className="text-2xl font-bold text-text-primary" aria-hidden>{result.passes}</div>
        <div className="text-xs font-medium text-text-secondary">Passed</div>
        <span className="sr-only">{result.passes} checks passed</span>
      </div>
      <div className="p-3 rounded-lg border border-border bg-bg-secondary">
        <div className="text-2xl font-bold text-text-primary" aria-hidden>{result.violations}</div>
        <div className="text-xs font-medium text-text-secondary">Violations</div>
        <span className="sr-only">{result.violations} violations found</span>
      </div>
      <div className="p-3 rounded-lg border border-border bg-bg-secondary">
        <div className="text-2xl font-bold text-text-primary" aria-hidden>{result.incomplete}</div>
        <div className="text-xs font-medium text-text-secondary">Review</div>
        <span className="sr-only">{result.incomplete} need review</span>
      </div>
      <div className="p-3 rounded-lg border border-border bg-bg-tertiary flex items-center justify-center">
        <span className="text-xs font-medium text-text-secondary text-center">WCAG 2.1 AA</span>
      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
    a11y: {
      config: {},
      options: {},
    },
  },
}

export default meta
type Story = StoryObj

export const Welcome: Story = {
  render: function IntroductionStory() {
    const auditRef = useRef<HTMLDivElement>(null)

    return (
      <div ref={auditRef} className="p-6 sm:p-8 lg:p-12 max-w-5xl mx-auto space-y-12 min-h-screen w-full">
        {/* Hero – professional brand with logos */}
        <header className="text-center space-y-8">
          <div className="flex flex-col items-center gap-6">
            <Logo
              size="xl"
              variant="default"
              role="img"
              aria-label="Particle Crypto Security LTD logo"
              className="shrink-0"
            />
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
                Particle Crypto Security LTD
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary font-medium">
                Design System & Style Guide
              </p>
            </div>
          </div>
          <p className="text-base text-text-secondary max-w-2xl mx-auto">
            A comprehensive design system for enterprise security applications. Built for{' '}
            <strong className="text-text-primary">BloxChain Protocol</strong> — compliance framework
            for regulated smart accounts.
          </p>
        </header>

        <Divider variant="default" />

        {/* Brand */}
        <section className="space-y-4" aria-labelledby="brand-heading">
          <h2 id="brand-heading" className="text-2xl font-bold text-text-primary">
            Brand
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="outlined" padding="md" className="flex flex-col md:flex-row md:items-start gap-4">
              <Logo size="md" variant="default" role="img" aria-label="Particle logo" className="shrink-0" />
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Particle Crypto Security LTD</h3>
                <p className="text-sm text-text-secondary">
                  We build secure, compliant infrastructure for digital assets. This design system
                  keeps our product and company UI consistent — from dashboards to marketing and docs.
                </p>
              </div>
            </Card>
            <Card variant="outlined" padding="md">
              <h3 className="font-semibold text-text-primary mb-2">BloxChain Protocol</h3>
              <p className="text-sm text-text-secondary">
                Our compliance framework for regulated smart accounts: audit trails, access
                controls, and regulatory alignment for institutions and enterprises.
              </p>
            </Card>
          </div>
          <p className="text-sm text-text-tertiary">
            Use the <strong>Brand</strong> section in the sidebar for Logo, Animated Logos,
            Favicon, and Social & Open Graph specs.
          </p>
        </section>

        <Divider variant="default" />

        {/* Accessibility – real results, high-contrast display */}
        <section className="space-y-4" aria-labelledby="a11y-heading">
          <h2 id="a11y-heading" className="text-2xl font-bold text-text-primary">
            Accessibility
          </h2>
          <p className="text-text-secondary max-w-2xl">
            This page is audited with axe-core. Results below are from a real run on this story.
            For full details, use the <strong>Accessibility</strong> tab in the Storybook panel.
          </p>
          <AccessibilityAudit targetRef={auditRef} />
          <p className="text-sm text-text-tertiary">
            We target WCAG 2.1 AA: sufficient contrast, focus indicators, keyboard navigation,
            and semantic HTML across all components.
          </p>
        </section>

        <Divider variant="default" />

        {/* Component Preview – shared showcase (image-like section) */}
        <section className="space-y-6" aria-labelledby="preview-heading">
          <h2 id="preview-heading" className="text-2xl font-bold text-text-primary text-center">
            Component Preview
          </h2>
          <p className="text-text-secondary text-center max-w-2xl mx-auto">
            A scattered overview of UI components from the design system — table, tabs, forms,
            alerts, accordion, avatar, rating, and more.
          </p>
          <ComponentShowcase idPrefix="intro" />
        </section>

        <Divider variant="default" />

        {/* Design principles */}
        <section className="space-y-6" aria-labelledby="principles-heading">
          <h2 id="principles-heading" className="text-2xl font-bold text-text-primary text-center">
            Design Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="outlined" padding="md">
              <div className="text-2xl mb-3" aria-hidden>🔒</div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Enterprise Security Focus
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary list-disc list-inside">
                <li>Strong visual hierarchy</li>
                <li>Clear, unambiguous UI elements</li>
                <li>Security-first color choices</li>
                <li>High contrast for accessibility</li>
              </ul>
            </Card>
            <Card variant="outlined" padding="md">
              <div className="text-2xl mb-3" aria-hidden>✨</div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Trust & Professionalism
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary list-disc list-inside">
                <li>Clean, minimalistic design</li>
                <li>Consistent spacing and typography</li>
                <li>Professional color palette</li>
                <li>Brand-aligned visuals</li>
              </ul>
            </Card>
            <Card variant="outlined" padding="md">
              <div className="text-2xl mb-3" aria-hidden>⚡</div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Modern Technology
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary list-disc list-inside">
                <li>Tech-forward aesthetic</li>
                <li>Responsive design system</li>
                <li>Data visualization ready</li>
                <li>Performance optimized</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Key features */}
        <section className="space-y-6" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-2xl font-bold text-text-primary text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🎨', title: 'Enterprise theme', desc: 'Professional color palette' },
              { icon: '🌓', title: 'Dark/Light mode', desc: 'Full theme support' },
              { icon: '🏢', title: 'Brand assets', desc: 'Logo, favicon, social & OG' },
              { icon: '♿', title: 'WCAG 2.1 AA', desc: 'Accessibility compliant' },
              { icon: '📦', title: 'TypeScript', desc: 'Fully typed components' },
              { icon: '📱', title: 'Responsive', desc: 'Mobile-first design' },
              { icon: '🎯', title: 'Tailwind CSS', desc: 'Utility-first styling' },
              { icon: '⚡', title: 'Performance', desc: 'Optimized bundle size' },
              { icon: '🔧', title: 'Customizable', desc: 'Easy to extend' },
            ].map(({ icon, title, desc }) => (
              <Card key={title} variant="outlined" padding="md">
                <div className="text-2xl mb-2" aria-hidden>{icon}</div>
                <div className="font-semibold text-text-primary mb-1">{title}</div>
                <div className="text-sm text-text-secondary">{desc}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* Getting started */}
        <section className="space-y-6" aria-labelledby="getting-started-heading">
          <h2 id="getting-started-heading" className="text-2xl font-bold text-text-primary text-center">
            Getting Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="outlined" padding="md">
              <h3 className="font-semibold text-text-primary mb-4">Installation</h3>
              <div className="bg-bg-tertiary p-4 rounded-md">
                <code className="text-sm text-text-primary font-mono">npm install</code>
              </div>
            </Card>
            <Card variant="outlined" padding="md">
              <h3 className="font-semibold text-text-primary mb-4">Usage</h3>
              <div className="bg-bg-tertiary p-4 rounded-md">
                <code className="text-sm text-text-primary font-mono break-all">
                  import {'{'} Button {'}'} from &apos;@/components&apos;
                </code>
              </div>
            </Card>
          </div>
        </section>

        {/* Quick stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6" aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">Overview</h2>
          <Card variant="outlined" padding="md" className="text-center">
            <div className="text-3xl font-bold text-text-primary mb-2">30+</div>
            <div className="text-sm text-text-secondary">Components</div>
          </Card>
          <Card variant="outlined" padding="md" className="text-center">
            <div className="text-3xl font-bold text-text-primary mb-2">100%</div>
            <div className="text-sm text-text-secondary">Accessible</div>
          </Card>
          <Card variant="outlined" padding="md" className="text-center">
            <div className="text-3xl font-bold text-text-primary mb-2">WCAG</div>
            <div className="text-sm text-text-secondary">2.1 AA Compliant</div>
          </Card>
        </section>
      </div>
    )
  },
}
