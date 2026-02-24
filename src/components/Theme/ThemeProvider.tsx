import { useCallback, useEffect, useState } from 'react'
import { ThemeProviderContext, type Theme, type ThemeProviderProps } from './ThemeContext'

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (typeof localStorage !== 'undefined' ? (localStorage.getItem(storageKey) as Theme) : null) || defaultTheme
  )

  useEffect(() => {
    const root = typeof document !== 'undefined' ? document.documentElement : null
    if (!root) return

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme =
        typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const setTheme = useCallback(
    (next: Theme) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(storageKey, next)
      }
      setThemeState(next)
    },
    [storageKey]
  )

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
