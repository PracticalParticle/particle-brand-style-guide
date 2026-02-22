import { Button } from '@/components/Button'
import { DropdownMenu } from '@/components/DropdownMenu'
import { useTheme } from './ThemeContext'

const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
)

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const MonitorIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
)

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu
      sections={[
        {
          items: [
            { label: 'Light', icon: <SunIcon className="h-4 w-4" />, onClick: () => setTheme('light') },
            { label: 'Dark', icon: <MoonIcon className="h-4 w-4" />, onClick: () => setTheme('dark') },
            { label: 'System', icon: <MonitorIcon className="h-4 w-4" />, onClick: () => setTheme('system') },
          ],
        },
      ]}
    >
      <Button variant="secondary" size="sm" iconOnly aria-label="Toggle theme">
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </DropdownMenu>
  )
}
