import { test, expect } from '@playwright/test';
import { NonSerializedPage } from '../pages/NonSerializedpage';

test.describe('Non-Serialized Equipment Tests', () => {


    test('Add Non-Serialized equipment with all details filled', async ({ page }) => {

        const nonSerializedPage = new NonSerializedPage(page);

        await nonSerializedPage.navigateToLandingPage();

        await expect(page).toHaveURL(/\/sports\//);
        console.log(' Navigated to Non-Serialized page');

        await nonSerializedPage.Addbutton();
        console.log('Add button clicked');

        await nonSerializedPage.AddEquipment();
        console.log('Equipment type selected');

        await nonSerializedPage.AddEquipmentDetails();
        console.log('Equipment details entered');

        await nonSerializedPage.CheckEquipment();

        await expect(
            page.locator('.ant-notification-notice-title').last()
        ).toContainText('Equipment Added');

        console.log(' Non-Serialized Equipment Added Successfully');
    });

});