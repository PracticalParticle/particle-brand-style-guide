#!/usr/bin/env node

/**
 * Accessibility Test Runner for Storybook
 * Tests all stories using axe-core via Storybook's test-runner
 * 
 * Usage:
 *   1. Start Storybook: npm run storybook
 *   2. In another terminal: npm run test:a11y
 */

import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function checkStorybookRunning() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:6006', (res) => {
      resolve(res.statusCode === 200)
    })
    req.on('error', () => resolve(false))
    req.setTimeout(2000, () => {
      req.destroy()
      resolve(false)
    })
  })
}

console.log('🧪 Running accessibility tests on all Storybook stories...\n')
console.log('📋 This will test all components for WCAG 2.1 AA compliance\n')

checkStorybookRunning().then(async (isRunning) => {
  if (!isRunning) {
    console.error('❌ Storybook is not running!')
    console.log('\n💡 Please start Storybook first:')
    console.log('   npm run storybook\n')
    console.log('   Then run this script in another terminal:')
    console.log('   npm run test:a11y\n')
    process.exit(1)
  }

  console.log('✅ Storybook is running on http://localhost:6006\n')
  
  // Check if Playwright browsers are installed
  try {
    execSync('npx playwright --version', { stdio: 'ignore' })
  } catch {
    console.log('⚠️  Playwright browsers may not be installed.')
    console.log('💡 Run: npx playwright install chromium\n')
  }
  
  console.log('🚀 Running accessibility tests on all stories...\n')
  console.log('📝 Including all stories: Introduction, Bento, and all component stories\n')
  
  try {
    // Explicitly test all stories - no exclusions
    // Using --verbose to see which stories are being tested
    // Not using --excludeTags to ensure nothing is filtered out
    execSync(
      'npx @storybook/test-runner --url http://localhost:6006 --testTimeout 60000 --verbose',
      {
        stdio: 'inherit',
        cwd: __dirname,
        env: {
          ...process.env,
          TEST_BROWSER: 'chromium',
        },
      }
    )
    
    console.log('\n✅ All accessibility tests completed successfully!')
  } catch (error) {
    if (error.status === 1) {
      console.error('\n❌ Some accessibility violations were found.')
      console.log('💡 Review the output above for details.')
    } else {
      console.error('\n❌ Test execution failed:', error.message)
    }
    process.exit(1)
  }
})
