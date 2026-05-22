import { test, expect } from '@playwright/test';
import { BulkUploadPage } from '../pages/Bulkupload';
test.describe('Bulk Upload Tests', () => {
    test('Navigate to Bulk Upload page', async ({ page }) => {
        const bulkUploadPage = new BulkUploadPage(page);
        await bulkUploadPage.navigateToBulkUpload();
    });
    test('Upload excel file', async ({ page }) => {

        const bulkUploadPage = new BulkUploadPage(page);

        await bulkUploadPage.navigateToBulkUpload();

        await bulkUploadPage.uploadExcelFile();

        await bulkUploadPage.submitUpload();
        await bulkUploadPage.verifyUploadResult();
    }
    );
});