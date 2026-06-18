import { expect, Page } from '@playwright/test';

export class BulkUploadPage {

    constructor(private page: Page) { }

    async navigateToBulkUpload() {

        await this.page.goto(
            '/sports/1/equipment/serialized/available',
            {
                waitUntil: 'domcontentloaded'
            }
        );

        await this.page
            .getByRole('button', { name: 'Bulk Upload' })
            .click();

        await expect(
            this.page.getByRole('dialog', {
                name: /bulk upload equipment/i
            })
        ).toBeVisible();
    }

    async uploadExcelFile() {

        const filePath = 'test-data/files/equipments-template.xlsx';

        const dialog = this.page.getByRole('dialog', {
            name: /bulk upload equipment/i
        });

        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),

            dialog
                .getByRole('button', {
                    name: /upload xls file/i
                })
                .click()
        ]);

        await fileChooser.setFiles(filePath);

        await expect(
            dialog.getByText('equipments-template.xlsx')
        ).toBeVisible();

        await dialog
            .getByRole('button', {
                name: /upload equipment/i
            })
            .click();
    }



    async verifyUploadedEquipment(productId: string) {

        // Search equipment
        await this.page
            .getByPlaceholder('Search by ID ,EQ')
            .fill(productId);

        // Locate matching table row
        const row = this.page.locator('table tr').filter({
            hasText: productId
        });

        // Verify row is visible
        await expect(row).toBeVisible();

        const rowText = await row.first().innerText();

        console.log(`Uploaded equipment found in table: ${rowText}`);
    }
}