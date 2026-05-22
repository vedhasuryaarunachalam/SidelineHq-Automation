import { test, expect } from '@playwright/test';
import { NonSerializedPage } from '../pages/NonSerializedpage';
test.describe('Non-Serialized Equipment Tests', () => {
    test('Add Non-Serialized equipment with all details filled', async ({ page }) => {
        const nonSerializedPage = new NonSerializedPage(page);
        await nonSerializedPage.navigateToLandingPage();
        await nonSerializedPage.Addbutton();
        await nonSerializedPage.AddEquipment();
        await nonSerializedPage.AddEquipmentDetails();
        await nonSerializedPage.submitEquipment();
    });
});