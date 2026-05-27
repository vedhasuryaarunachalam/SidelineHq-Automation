import { expect, Page } from '@playwright/test';

export class CommonPage {

    constructor(protected page: Page) { }

    async clickAddButton() {

    await this.waitForNotificationsToClear();

    const addButton = this.page
        .locator('[class*="addIconWrapper"]')
        .first();

    await expect(addButton).toBeVisible({
        timeout: 15000
    });

    await expect(addButton).toBeEnabled();

    await addButton.click();
}

    async waitForNotificationsToClear() {

        const notification = this.page.locator('.ant-notification-notice').first();

        if (await notification.isVisible().catch(() => false)) {
            try {
                await notification.waitFor({
                    state: 'hidden',
                    timeout: 10000,
                });
            } catch {
                // If notification is still visible after 10s, close it manually
                const closeButton = notification.locator(
                    '.ant-notification-notice-close'
                );

                if (await closeButton.isVisible().catch(() => false)) {
                    await closeButton.click();
                }
            }
        }
    }
    async navigate() {

    await this.page.goto(
        '/sports/1/equipment/serialized/available',
        {
            waitUntil: 'networkidle'
        }
    );

    await this.waitForNotificationsToClear();
}
    async SuccessToast() {

        const successMessage = this.page.getByText('Equipment Added');

        await expect(
            this.page.locator('.ant-notification-notice')
        ).toContainText('Equipment Added');
        console.log('Equipment Added toast is visible');
    }
}