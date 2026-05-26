import { test, expect } from '@playwright/test';
import { OnetimecheckoutPage } from '../pages/Onetimecheckoutpage';
test.describe('One-Time Checkout Equipment Tests', () => {
  test('Add One-Time Checkout equipment with all details filled', async ({ page }) => {
    const onetimecheckoutPage = new OnetimecheckoutPage(page);
    await onetimecheckoutPage.navigateToLandingPage();
    await onetimecheckoutPage.Addbutton();
    await onetimecheckoutPage.AddEquipment();
    await onetimecheckoutPage.AddEquipmentDetails();
    await onetimecheckoutPage.CheckEquipment();
  });
});