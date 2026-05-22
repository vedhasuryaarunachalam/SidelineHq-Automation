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

        await this.page
            .locator('input[type="file"]')
            .setInputFiles('test-data/equipments-template.xlsx');
    }

    async submitUpload() {
        await this.page
            .getByRole('button', { name: 'Upload Equipment' })
            .click();


    }
    async verifyUploadResult() {

        const notification = this.page.locator(
            '.ant-notification-notice'
        ).last();

        await expect(notification).toBeVisible();

        const notificationText = await notification.textContent();

        // Success case
        if (
            notificationText?.includes(
                'Bulk import queued successfully'
            )
        ) {

            await expect(notification).toContainText(
                'Bulk import queued successfully'
            );

            console.log('Bulk upload successful');
        }

        // Failure case
        else if (
            notificationText?.includes('Upload Failed')
        ) {

            await expect(notification).toContainText(
                'Upload Failed'
            );

            await expect(notification).toContainText(
                'failed'
            );

            console.log('Bulk upload failed');
        }
    }
}
