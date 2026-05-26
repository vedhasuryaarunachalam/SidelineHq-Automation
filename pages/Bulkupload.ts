import { expect, Page } from '@playwright/test';

export class BulkUploadPage {

    constructor(private page: Page) { }

    async navigateToBulkUpload() {
        await this.page.goto(
            '/sports/1/equipment/serialized/available',
            { waitUntil: 'domcontentloaded' }
        );
        const notices = this.page.locator('.ant-notification-notice-close');
        const count = await notices.count();
        for (let i = 0; i < count; i++) {
            await notices.nth(i).click().catch(() => { });
        }


        await this.page
            .locator('.ant-notification-notice')
            .waitFor({ state: 'hidden', timeout: 5000 })
            .catch(() => { });

        await this.page
            .getByRole('button', { name: 'Bulk Upload' })
            .click();
        await expect(
            this.page.getByRole('dialog', { name: /bulk upload equipment/i })
        ).toBeVisible();
    }
    async uploadExcelFile() {
        const filePath = 'test-data/equipments-template.xlsx';

        const dialog = this.page.getByRole('dialog', {
            name: /bulk upload equipment/i
        });

        await expect(dialog).toBeVisible();

        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            dialog.getByRole('button', { name: /upload xls file/i }).click()
        ]);

        await fileChooser.setFiles(filePath);

        // Wait until uploaded filename appears in modal
        await expect(
            dialog.getByText('equipments-template.xlsx')
        ).toBeVisible();

        const uploadButton = dialog.getByRole('button', {
            name: /upload equipment/i
        });

        // Firefox needs extra stabilization here
        await expect(uploadButton).toBeEnabled();

        // Wait for loading state to disappear if present
        await expect(
            uploadButton.locator('img[alt="loading"]')
        ).toHaveCount(0);

        await uploadButton.click();
    }
    async verifyUploadResult() {

        const notification = this.page
            .locator('.ant-notification-notice')
            .first();

        await expect(notification).toBeVisible({
            timeout: 15000
        });

        await expect(notification).toContainText(
            /Bulk import queued successfully|Upload Failed/
        );

        const text = await notification.innerText();

        if (text.includes('Upload Failed')) {
            throw new Error(`Bulk upload failed: ${text}`);
        }

        console.log('Bulk upload successful');
    }
}