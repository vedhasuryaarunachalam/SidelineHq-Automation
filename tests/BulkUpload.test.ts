import { test, expect } from '@playwright/test';
import { BulkUploadPage } from '../pages/Bulkupload';
test.describe.skip('Bulk Upload Tests', () => {
    test('Navigate to Bulk Upload page', async ({ page }) => {
        const bulkUploadPage = new BulkUploadPage(page);
        await bulkUploadPage.navigateToBulkUpload();
    });
    test('Upload excel file', async ({ page }) => {

        const bulkUploadPage = new BulkUploadPage(page);

        await bulkUploadPage.navigateToBulkUpload();

        await bulkUploadPage.uploadExcelFile();

        await bulkUploadPage.verifyUploadResult();
    }
    );
});