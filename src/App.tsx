import { useState } from 'react'
import {
  Button,
  Card,
  Badge,
  Divider,
  ComponentShowcase,
} from './components'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const themeColors = [
    { name: 'Primary', class: 'bg-primary' },
    { name: 'Secondary', class: 'bg-secondary' },
    { name: 'Tertiary', class: 'bg-tertiary' },
    { name: 'Success', class: 'bg-success' },
    { name: 'Warning', class: 'bg-warning' },
    { name: 'Error', class: 'bg-error' },
    { name: 'Info', class: 'bg-info' },
    { name: 'Bg primary', class: 'bg-bg-primary border border-border' },
    { name: 'Bg secondary', class: 'bg-bg-secondary border border-border' },
  ] as const

  return (
    <div className="min-h-screen bg-bg-primary transition-colors">
      <div className="max-w-6xl mx-auto p-6 sm:p-8 space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
              Particle Crypto Security LTD
            </h1>
            <p className="text-base sm:text-lg text-text-secondary">
              BloxChain Protocol — Compliance Framework for Regulated Smart Accounts
            </p>
          </div>
          <Button onClick={toggleTheme} variant="outline" size="md">
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </Button>
        </header>

        <Divider variant="default" />

        {/* Brand & Hero */}
        <Card variant="elevated" padding="lg">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="primary">Design System</Badge>
            <Badge variant="info">WCAG 2.1 AA</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary mb-4">
            Design System & Style Guide
          </h2>
          <p className="text-text-secondary mb-6 max-w-2xl">
            A comprehensive design system for enterprise security applications. Professional
            themes, full dark/light mode, and accessible components for product and
            marketing.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Get Started</Button>
            <Button
              variant="outline"
              onClick={() => window.open('http://localhost:6006', '_blank', 'noopener,noreferrer')}
            >
              View in Storybook
            </Button>
          </div>
        </Card>

        {/* Brand information */}
        <Card variant="outlined" padding="lg">
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            About the brand
          </h3>
          <p className="text-text-secondary mb-4">
            <strong className="text-text-primary">Particle Crypto Security LTD</strong> builds
            secure, compliant infrastructure for digital assets. This style guide powers
            consistent UI across our products and company presence.
          </p>
          <p className="text-text-secondary mb-4">
            <strong className="text-tertiary">BloxChain Protocol</strong> is our compliance
            framework for regulated smart accounts — designed for institutions and
            enterprises that require audit trails, access controls, and regulatory alignment.
          </p>
          <p className="text-sm text-text-tertiary">
            Use the components and tokens in this design system for apps, dashboards,
            marketing pages, and documentation to keep the Particle and BloxChain brand
            consistent everywhere.
          </p>
        </Card>

        {/* Component showcase – shared image-like section */}
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            Components
          </h3>
          <p className="text-text-secondary mb-4 text-sm max-w-2xl">
            A scattered preview of the design system — table, tabs, forms, alerts, accordion,
            avatar, rating, and more.
          </p>
          <ComponentShowcase idPrefix="app" />
        </div>

        {/* Color palette – design tokens */}
        <Card variant="outlined" padding="lg">
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Theme Colors
          </h3>
          <p className="text-text-secondary mb-4 text-sm">
            Design tokens used across the style guide (CSS variables).
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {themeColors.map(({ name, class: bgClass }) => (
              <div key={name} className="text-center">
                <div
                  className={`h-20 rounded-lg mb-2 ${bgClass}`}
                  title={name}
                  aria-hidden
                />
                <p className="text-xs text-text-secondary">{name}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default App
