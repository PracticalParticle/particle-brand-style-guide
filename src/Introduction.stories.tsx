import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const Welcome: Story = {
  render: () => (
    <div className="p-6 sm:p-8 lg:p-12 max-w-6xl mx-auto space-y-12 min-h-screen w-full">
      {/* Hero Section */}
      <div className="space-y-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary">
            Particle Crypto Security LTD
          </h1>
          <p className="text-xl sm:text-2xl text-text-secondary font-medium">
            Design System & Style Guide
          </p>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            A comprehensive design system for building enterprise security applications. 
            Designed for <strong className="text-tertiary">BloxChain Protocol</strong> - 
            a compliance framework for regulated smart accounts.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-6 bg-bg-secondary rounded-lg border border-border text-center">
          <div className="text-3xl font-bold text-tertiary mb-2">20+</div>
          <div className="text-sm text-text-secondary">Components</div>
        </div>
        <div className="p-6 bg-bg-secondary rounded-lg border border-border text-center">
          <div className="text-3xl font-bold text-tertiary mb-2">100%</div>
          <div className="text-sm text-text-secondary">Accessible</div>
        </div>
        <div className="p-6 bg-bg-secondary rounded-lg border border-border text-center">
          <div className="text-3xl font-bold text-tertiary mb-2">WCAG</div>
          <div className="text-sm text-text-secondary">2.1 AA Compliant</div>
        </div>
      </div>

      {/* Design Principles */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-text-primary text-center">
          Design Principles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-bg-secondary rounded-lg border border-border">
            <div className="text-2xl mb-3">🔒</div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Enterprise Security Focus
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>• Strong visual hierarchy</li>
              <li>• Clear, unambiguous UI elements</li>
              <li>• Security-first color choices</li>
              <li>• High contrast for accessibility</li>
            </ul>
          </div>

          <div className="p-6 bg-bg-secondary rounded-lg border border-border">
            <div className="text-2xl mb-3">✨</div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Trust & Professionalism
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>• Clean, minimalistic design</li>
              <li>• Consistent spacing and typography</li>
              <li>• Professional color palette</li>
              <li>• Geometric triangle motifs</li>
            </ul>
          </div>

          <div className="p-6 bg-bg-secondary rounded-lg border border-border">
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Modern Technology
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>• Tech-forward aesthetic</li>
              <li>• Responsive design system</li>
              <li>• Data visualization ready</li>
              <li>• Performance optimized</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-text-primary text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🎨', title: 'Enterprise Blue Theme', desc: 'Professional color palette' },
            { icon: '🌓', title: 'Dark/Light Mode', desc: 'Full theme support' },
            { icon: '🔷', title: 'Triangle Patterns', desc: 'Geometric brand motifs' },
            { icon: '♿', title: 'WCAG 2.1 AA', desc: 'Accessibility compliant' },
            { icon: '📦', title: 'TypeScript', desc: 'Fully typed components' },
            { icon: '📱', title: 'Responsive', desc: 'Mobile-first design' },
            { icon: '🎯', title: 'Tailwind CSS', desc: 'Utility-first styling' },
            { icon: '⚡', title: 'Performance', desc: 'Optimized bundle size' },
            { icon: '🔧', title: 'Customizable', desc: 'Easy to extend' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="p-4 bg-bg-secondary rounded-lg border border-border">
              <div className="text-2xl mb-2">{icon}</div>
              <div className="font-semibold text-text-primary mb-1">{title}</div>
              <div className="text-sm text-text-secondary">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Getting Started */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-text-primary text-center">
          Getting Started
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-bg-secondary rounded-lg border border-border">
            <h3 className="font-semibold text-text-primary mb-4">Installation</h3>
            <div className="bg-bg-tertiary p-4 rounded-md">
              <code className="text-sm text-text-primary font-mono">
                npm install
              </code>
            </div>
          </div>
          <div className="p-6 bg-bg-secondary rounded-lg border border-border">
            <h3 className="font-semibold text-text-primary mb-4">Usage</h3>
            <div className="bg-bg-tertiary p-4 rounded-md">
              <code className="text-sm text-text-primary font-mono">
                import {'{'} Button {'}'} from '@/components'
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Component Categories */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-text-primary text-center">
          Component Library
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'Buttons', 'Cards', 'Inputs', 'Forms',
            'Navigation', 'Data Display', 'Feedback', 'Overlays',
            'Loading', 'Empty States', 'Badges', 'Alerts'
          ].map((name) => (
            <div key={name} className="p-4 bg-bg-secondary rounded-lg border border-border text-center">
              <div className="font-medium text-text-primary">{name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
}
