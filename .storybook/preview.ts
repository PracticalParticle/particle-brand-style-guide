import type { Preview } from '@storybook/react'
import React from 'react'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
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
    (Story, context) => {
      const theme = context.globals.theme || 'light'
      const isDark = theme === 'dark'
      
      // Use a ref to check parent container after mount
      const Wrapper = () => {
        const wrapperRef = React.useRef<HTMLDivElement>(null)
        
        React.useEffect(() => {
          if (typeof document === 'undefined') return
          
          const currentIsDark = theme === 'dark'
          
          // Check if we're inside a docs container
          const isInDocs = wrapperRef.current?.closest('.sbdocs-wrapper') !== null
          
          if (isInDocs) {
            // In docs mode: theme the entire canvas/preview area
            const canvasContainer = wrapperRef.current?.closest('.sbdocs-preview') as HTMLElement
            if (canvasContainer) {
              if (currentIsDark) {
                canvasContainer.classList.add('dark')
              } else {
                canvasContainer.classList.remove('dark')
              }
              // Apply background to the entire canvas
              canvasContainer.style.backgroundColor = 'rgb(var(--color-bg-primary))'
            }
          } else {
            // In story mode: theme the entire page
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
          // Component re-renders when theme changes via Storybook context, so no deps needed
        })
        
        return React.createElement(
          'div',
          {
            ref: wrapperRef,
            className: isDark ? 'dark' : '',
            style: {
              backgroundColor: 'rgb(var(--color-bg-primary))',
              minHeight: '100vh',
              width: '100%',
              padding: 0,
            },
          },
          React.createElement(Story)
        )
      }
      
      return React.createElement(Wrapper)
    },
  ],
}

export default preview
