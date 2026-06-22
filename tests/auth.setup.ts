import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page, browserName }) => {

  await page.goto('/login');

  await page.locator('input[id="email"]').fill('testuat@yopmail.com');

  await page.locator('input[id="password"]').fill('Pass@123');

  await Promise.all([
    page.waitForURL('https://magnetic-tan-crawdad.sidelinehq.revolte.io/sports/1/equipment/serialized/available'),
    page.getByRole('button', { name: 'Login' }).click(),
  ]);

  await expect(page).toHaveURL(
    'https://magnetic-tan-crawdad.sidelinehq.revolte.io/sports/1/equipment/serialized/available'
  );

  await page.context().storageState({
    path: `playwright/.auth/${browserName}.json`,
  });
});