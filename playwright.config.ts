import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    baseURL: 'https://marine-turquoise-coyote.rootquotient.revolte.io/',

    viewport: {
      width: 1920,
      height: 1080,
    },

    trace: 'on-first-retry',
  },
      

  projects: [
    {
      name: 'setup-chromium',
      testMatch: /auth\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/chromium.json',
      },
      dependencies: ['setup-chromium'],
    },

    {
      name: 'setup-firefox',
      testMatch: /auth\.setup\.ts/,
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/firefox.json',
      },
      dependencies: ['setup-firefox'],
    },

    {
      name: 'setup-webkit',
      testMatch: /auth\.setup\.ts/,
      use: {
        ...devices['Desktop Safari'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/webkit.json',
      },
      dependencies: ['setup-webkit'],
    },
  ],
});