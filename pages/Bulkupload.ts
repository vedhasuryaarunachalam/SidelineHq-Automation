import { expect, Page } from '@playwright/test';
export class BulkUploadPage {

    constructor(private page: Page) { }

    async navigateToBulkUpload() {
        await this.page.goto(
            '/sports/1/equipment/serialized/available',
            { waitUntil: 'domcontentloaded' }
        );

        await this.page.getByRole('button', { name: 'Bulk Upload' }).click();
    }

    async uploadExcelFile() {

        const filePath = 'test-data/equipments-template.xlsx';

        // WebKit: use locator-based file input approach
        const fileInput = this.page.locator('input[type="file"]');

        const isWebKit = this.page.context().browser()?.browserType().name() === 'webkit';

        if (isWebKit) {
            // In WebKit, directly set files on the hidden input without triggering filechooser
            await this.page.getByRole('button', { name: 'UPLOAD XLS FILE' }).click();
            await fileInput.waitFor({ state: 'attached', timeout: 10000 });
            await fileInput.setInputFiles(filePath);
        } else {
            const [fileChooser] = await Promise.all([
                this.page.waitForEvent('filechooser'),
                this.page.getByRole('button', {
                    name: 'UPLOAD XLS FILE'
                }).click()
            ]);

            await fileChooser.setFiles(filePath);
        }


    }

    async submitUpload() {
        const uploadButton = this.page.getByRole('button', {
            name: /upload equipment/i
        });

        await expect(uploadButton).toBeVisible({ timeout: 10000 });

        await uploadButton.click();


    }
    async verifyUploadResult() {

        const notification = this.page.locator('.ant-notification-notice').first();

        await expect(notification).toBeVisible({ timeout: 15000 });

        const text = await notification.innerText();

        if (text.includes('Bulk import queued successfully')) {
            await expect(notification).toContainText(
                'Bulk import queued successfully'
            );
            console.log('Bulk upload successful');
        } else if (text.includes('Upload Failed')) {
            await expect(notification).toContainText(
                '0 uploaded, 15 failed'
            );

            throw new Error(`Bulk upload failed: ${text}`);
        } else {
            throw new Error(`Unexpected notification: ${text}`);
        }
    }
}
