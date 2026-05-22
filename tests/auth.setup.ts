import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page, browserName }) => {

  await page.goto('/login');

  await page.locator('#email').fill('vedhasurya018@gmail.com');

  await page.locator('#password').fill('Pass@123');

  await Promise.all([
    page.waitForURL('**/sports/1/equipment/serialized/available'),
    page.locator('button[type="submit"]').click(),
  ]);

  await expect(page).toHaveURL(
    'https://marine-turquoise-coyote.rootquotient.revolte.io/sports/1/equipment/serialized/available'
  );

  await page.context().storageState({
    path: `playwright/.auth/${browserName}.json`,
  });
});