import { expect, Page } from '@playwright/test';

export class CommonPage {

    constructor(protected page: Page) { }

    async clickAddButton() {

        const addButton = this.page
            .locator('[class*="addIconWrapper"]')
            .first();

        await expect(addButton).toBeVisible();

        await addButton.click({ timeout: 50000 });
    }

    async waitForNotificationsToClear() {

        const notification = this.page.locator('.ant-notification-notice');

        await notification.first().waitFor({
            state: 'hidden',
            timeout: 10000
        }).catch(() => { });
    }
    async navigate() {
        await this.page.goto(
            '/sports/1/equipment/serialized/available',
            {
                waitUntil: 'domcontentloaded'
            }
        );

        await this.waitForNotificationsToClear();
    }
    async SuccessToast() {

    const successMessage = this.page.getByText('Equipment Added');

    await expect(successMessage).toBeVisible({ timeout: 10000 });

    console.log('Equipment Added toast is visible');
}
}