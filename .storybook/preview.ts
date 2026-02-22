import type { Preview } from '@storybook/react'
import React from 'react'
import '../src/styles/globals.css'

const customViewports = {
  mobile: {
    name: 'Mobile (xs)',
    styles: { width: '375px', height: '667px' },
    type: 'mobile' as const,
  },
  mobileLg: {
    name: 'Mobile (sm)',
    styles: { width: '640px', height: '960px' },
    type: 'mobile' as const,
  },
  tablet: {
    name: 'Tablet (md)',
    styles: { width: '768px', height: '1024px' },
    type: 'tablet' as const,
  },
  desktop: {
    name: 'Desktop (lg)',
    styles: { width: '1024px', height: '768px' },
    type: 'desktop' as const,
  },
  desktopLg: {
    name: 'Desktop (xl)',
    styles: { width: '1280px', height: '800px' },
    type: 'desktop' as const,
  },
}

const preview: Preview = {
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    viewport: {
      viewports: customViewports,
      defaultViewport: 'desktop',
    },
    docs: {
      toc: true,
      story: { inline: true },
    },
    backgrounds: {
      default: 'light',
      disable: true, // Disable Storybook's background addon - we handle it via theme
      values: [
        {
          name: 'light',
          value: 'rgb(var(--color-bg-primary))',
        },
        {
          name: 'dark',
          value: 'rgb(var(--color-bg-primary))',
        },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    // Prevent canvas from stretching story content (cards, badges, etc.) in individual story view.
    // Fullscreen stories (Table, DataView, etc.) are not wrapped.
    (Story, context) => {
      const layout = context.parameters.layout ?? 'centered'
      if (layout === 'fullscreen') {
        return React.createElement(Story)
      }
      return React.createElement('div', {
        className: 'story-canvas-root',
        style: {
          display: 'block',
          height: 'auto',
          minHeight: 0,
          width: '100%',
        },
      }, React.createElement(Story))
    },
    (Story, context) => {
      // Let stories that use ThemeProvider (e.g. ThemeToggle) control the theme themselves.
      // Otherwise the toolbar theme would overwrite the in-story toggle on every re-render.
      if (context.parameters.useThemeProvider) {
        return React.createElement(Story)
      }

      const theme = context.globals.theme || 'light'

      // Apply theme synchronously before first paint to avoid flash
      if (typeof document !== 'undefined') {
        const htmlEl = document.documentElement
        const bodyEl = document.body
        const isDark = theme === 'dark'
        if (isDark) {
          htmlEl.classList.add('dark')
          if (bodyEl) bodyEl.classList.add('dark')
        } else {
          htmlEl.classList.remove('dark')
          if (bodyEl) bodyEl.classList.remove('dark')
        }
      }

      const ThemeEffect = ({ themeValue }: { themeValue: string }) => {
        React.useEffect(() => {
          if (typeof document === 'undefined') return

          const currentIsDark = themeValue === 'dark'
          const htmlElement = document.documentElement
          const bodyElement = document.body

          if (currentIsDark) {
            htmlElement.classList.add('dark')
            bodyElement.classList.add('dark')
          } else {
            htmlElement.classList.remove('dark')
            bodyElement.classList.remove('dark')
          }

          localStorage.setItem('particle-theme', themeValue)

          const root = document.getElementById('storybook-root')
          const canvasContainer = root?.closest('.sbdocs-preview') as HTMLElement | null
          if (canvasContainer) {
            canvasContainer.style.backgroundColor = 'rgb(var(--color-bg-primary))'
          }
        }, [themeValue])

        return React.createElement(Story)
      }

      return React.createElement(ThemeEffect, { themeValue: theme })
    },
  ],
}

export default preview
