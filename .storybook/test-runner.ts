import type { TestRunnerConfig } from '@storybook/test-runner'
import AxeBuilder from '@axe-core/playwright'

/** Format axe violations for error output (with optional theme label). */
function formatViolations(
  violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations'],
  theme: string
) {
  return violations.map((violation) => ({
    theme,
    id: violation.id,
    impact: violation.impact,
    description: violation.description,
    help: violation.help,
    helpUrl: violation.helpUrl,
    nodes: violation.nodes.length,
    nodeDetails: violation.nodes.map((node) => ({
      html: node.html,
      target: node.target,
      failureSummary: node.failureSummary,
      ...(violation.id === 'color-contrast' || violation.id === 'color-contrast-enhanced'
        ? {
            contrastRatio: node.any?.[0]?.data?.contrastRatio,
            expectedContrastRatio: node.any?.[0]?.data?.expectedContrastRatio,
            foregroundColor: node.any?.[0]?.data?.fgColor,
            backgroundColor: node.any?.[0]?.data?.bgColor,
            fontSize: node.any?.[0]?.data?.fontSize,
            fontWeight: node.any?.[0]?.data?.fontWeight,
          }
        : {}),
    })),
  }))
}

/**
 * Accessibility test-runner runs axe in both light and dark theme.
 * Storybook’s default when loading a story is light (toolbar globals.theme = 'light').
 * Without switching to dark, color-contrast violations in dark mode (e.g. tertiary text
 * on dark backgrounds) are never detected. We therefore run axe once in light, then
 * add .dark to document, run axe again, and merge violations so both themes are covered.
 */
const config: TestRunnerConfig = {
  async preVisit(_page, context) {
    console.log(`Testing: ${context.title}`)
  },

  async postVisit(page, context) {
    await page.waitForTimeout(500)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(300)

    const runAxe = () =>
      new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .withRules(['color-contrast'])
        .analyze()

    // 1) Run axe in current (light) theme — toolbar default is light and test-runner doesn’t set theme
    const lightResults = await runAxe()
    const lightViolations = formatViolations(lightResults.violations, 'light')

    // 2) Switch to dark theme (same as Storybook preview decorator) so color-contrast is checked in both themes
    await page.evaluate(() => {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
      // Force a style recalculation to ensure CSS custom properties are fully resolved
      // before axe-core samples computed colors (avoids false positives from stale CSS var values)
      void document.documentElement.offsetHeight
    })
    // Wait long enough for: CSS transitions (200ms max) + custom property propagation + paint
    await page.waitForTimeout(1200)

    const darkResults = await runAxe()
    const darkViolations = formatViolations(darkResults.violations, 'dark')

    // 3) Restore light so the next story starts in default state
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
    })

    const allViolations = [...lightViolations, ...darkViolations]
    if (allViolations.length > 0) {
      throw new Error(
        `Accessibility violations in ${context.title} (light and dark):\n${JSON.stringify(allViolations, null, 2)}`
      )
    }
  },
}

export default config
