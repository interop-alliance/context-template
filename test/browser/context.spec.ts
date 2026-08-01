import { test, expect } from '@playwright/test'

test('context module works in browser', async ({ page }) => {
  await page.goto('/test/index.html')
  const result = await page.evaluate(async () => {
    // This callback runs in the browser; '/src/index.ts' is a URL served by the
    // vite dev server, not a module path tsc can resolve from disk.
    // @ts-expect-error -- dev-server URL, resolved at runtime by vite
    const { contexts, CONTEXT_URL_V1 } = await import('/src/index.ts')
    return contexts.get(CONTEXT_URL_V1)
  })
  expect(result).toHaveProperty('@context')
})
