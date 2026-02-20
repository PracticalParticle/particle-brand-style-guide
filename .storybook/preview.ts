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
      const theme = context.globals.theme || 'light'

      const ThemeEffect = ({ themeValue }: { themeValue: string }) => {
        React.useEffect(() => {
          if (typeof document === 'undefined') return

          const currentIsDark = themeValue === 'dark'

          // Check if we're inside a docs container
          const root = document.getElementById('storybook-root')
          const isInDocs = root?.closest('.sbdocs-wrapper') !== null

          if (isInDocs) {
            const canvasContainer = root?.closest('.sbdocs-preview') as HTMLElement
            if (canvasContainer) {
              if (currentIsDark) canvasContainer.classList.add('dark')
              else canvasContainer.classList.remove('dark')
              canvasContainer.style.backgroundColor = 'rgb(var(--color-bg-primary))'
            }
          } else {
            const htmlElement = document.documentElement
            const bodyElement = document.body
            if (currentIsDark) {
              htmlElement.classList.add('dark')
              bodyElement.classList.add('dark')
            } else {
              htmlElement.classList.remove('dark')
              bodyElement.classList.remove('dark')
            }
          }
        }, [themeValue])

        return React.createElement(Story)
      }

      return React.createElement(ThemeEffect, { themeValue: theme })
    },
  ],
}

export default preview
