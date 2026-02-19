import { useState } from 'react'
import { Button } from './components/Button'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <div className="min-h-screen bg-bg-primary transition-colors">
      <div className="max-w-6xl mx-auto p-8 space-y-12">
        {/* Header */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">
              Particle Crypto Security LTD
            </h1>
            <p className="text-lg text-text-secondary">
              BloxChain Protocol - Compliance Framework for Regulated Smart Accounts
            </p>
          </div>
          <Button onClick={toggleTheme} variant="outline">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </Button>
        </header>

        {/* Hero Section */}
        <section className="bg-bg-secondary rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-semibold text-text-primary mb-4">
            Design System & Style Guide
          </h2>
          <p className="text-text-secondary mb-6">
            A comprehensive design system for enterprise security applications, featuring 
            geometric triangle patterns, professional blue themes, and full dark/light mode support.
          </p>
          <div className="flex gap-4">
            <Button variant="primary">Get Started</Button>
            <Button variant="outline">View Components</Button>
          </div>
        </section>

        {/* Triangle Pattern Demo */}
        <section className="bg-bg-secondary rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-text-primary mb-4">
            Geometric Triangle Pattern
          </h3>
          <div className="triangle-pattern h-32 rounded-lg border-2 border-border"></div>
        </section>

        {/* Button Variants */}
        <section className="bg-bg-secondary rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-text-primary mb-6">
            Button Components
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="primary" isLoading>Loading</Button>
          </div>
        </section>

        {/* Color Palette */}
        <section className="bg-bg-secondary rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-text-primary mb-6">
            Color Palette
          </h3>
          <div className="grid grid-cols-5 gap-4">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
              <div key={shade} className="text-center">
                <div 
                  className={`h-20 rounded-lg mb-2 bg-primary-${shade}`}
                  style={{
                    backgroundColor: shade <= 400 
                      ? `hsl(${210 + shade * 0.5}, 100%, ${95 - shade * 0.05}%)`
                      : `hsl(${210 - (shade - 400) * 2}, 100%, ${50 - (shade - 400) * 0.05}%)`
                  }}
                ></div>
                <p className="text-xs text-text-secondary">{shade}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
