import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import loginData from '../test-data/login.json';
test.use({
    storageState: { cookies: [], origins: [] },
});
test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
    });

    test('Login with Valid creds', async ({ page }) => {
        await loginPage.login(loginData.validUser.username, loginData.validUser.password);
        const equipmentText = page.locator('text=Equipment Management');

        await expect(equipmentText).toBeVisible();

        console.log('Equipment Management is visible');

    });

   /* test('Login with Invalid Password', async ({ page }) => {
        await loginPage.login(loginData.validUser.username, loginData.invalidUser.password);
        await expect(page).toHaveURL(loginData.invalidUser.check);
        console.log('Invalid password validation passed');

    });*/




});
