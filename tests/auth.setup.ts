import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
    await page.goto('/login');

    await page.locator('input[id="email"]').fill('vedhasurya018@gmail.com');
    await page.locator('input[id="password"]').fill('Pass@123');

    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL('/sports/1/equipment/serialized/available');

    await page.context().storageState({
        path: 'auth.json'
    });
});