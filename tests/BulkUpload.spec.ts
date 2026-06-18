import { test } from '@playwright/test';
import { BulkUploadPage } from '../pages/Bulkupload';

test.describe('Bulk Upload Tests', () => {

    test('Navigate to Bulk Upload page', async ({ page }) => {

        const bulkUploadPage = new BulkUploadPage(page);

        await bulkUploadPage.navigateToBulkUpload();
    });

    test('Upload excel file successfully', async ({ page }) => {

        const bulkUploadPage = new BulkUploadPage(page);

        await bulkUploadPage.navigateToBulkUpload();

        await bulkUploadPage.uploadExcelFile();


        // Verify uploaded excel data
        await bulkUploadPage.verifyUploadedEquipment('50');

        console.log('Bulk upload test completed successfully');
    });

});