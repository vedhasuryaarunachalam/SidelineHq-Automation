import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page, browserName }) => {

  await page.goto('/login');

  await page.locator('#email').fill('yes@yopmail.com');

  await page.locator('#password').fill('Pass@123');

  await Promise.all([
    page.waitForURL('https://marine-turquoise-coyote.rootquotient.revolte.io/sports/1/equipment/serialized/available'),
    page.getByRole('button', { name: 'Login' }).click(),
  ]);

  await expect(page).toHaveURL(
    'https://marine-turquoise-coyote.rootquotient.revolte.io/sports/1/equipment/serialized/available'
  );

  await page.context().storageState({
    path: `playwright/.auth/${browserName}.json`,
  });
});