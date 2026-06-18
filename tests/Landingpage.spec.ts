import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/Landingpage';

test.describe('Landing Page Tests', () => {

});

test('Add equipment with all details filled', async ({ page }) => {

    const landingPage = new LandingPage(page);

    await landingPage.navigateToLandingPage();

    await landingPage.clickAddButton();

    console.log('Add button clicked');

    await landingPage.selectEquipmentType();

    console.log('Equipment type selected');

    await landingPage.fillEquipmentDetails();

    await expect(
        page.locator('.ant-notification-notice-title').last()
    ).toContainText('Equipment Added');

    console.log('Equipment Added Successfully');
});


test('Add equipment with only category and product id', async ({ page }) => {

    const landingPage = new LandingPage(page);

    await landingPage.navigateToLandingPage();

    await landingPage.clickAddButton();

    console.log('Add button clicked');

    await landingPage.selectEquipmentType();

    console.log('Equipment type selected');

    await landingPage.addOnlyMandatoryFields();

    console.log(' Mandatory fields entered');


    await expect(
        page.locator('.ant-notification-notice-title').last()
    ).toContainText('Equipment Added');

    console.log('Equipment Added Successfully');
});

test('Duplicate product id should show failure toast', async ({ page }) => {

    const landingPage = new LandingPage(page);

    await landingPage.navigateToLandingPage();

    // First equipment creation
    await landingPage.clickAddButton();
    await landingPage.selectEquipmentType();
    await landingPage.addOnlyMandatoryFields();

    await expect(
        page.locator('.ant-notification-notice-title').last()
    ).toContainText('Equipment Added');

    console.log('First Equipment Added');

    // Duplicate product ID
    await landingPage.clickAddButton();
    await landingPage.selectEquipmentType();
    await landingPage.addDuplicateProductId();

    await expect(
        page.getByText('Product ID already exists for this sport')
    ).toBeVisible();

    console.log('Duplicate Product ID validation displayed');
});

test('Close add equipment modal', async ({ page }) => {

    const landingPage = new LandingPage(page);

    await landingPage.navigateToLandingPage();

    await landingPage.clickAddButton();

    console.log('Add Equipment modal opened');

    await landingPage.closeModal();

    await expect(
        page.getByRole('button', { name: 'ADD EQUIPMENT' })
    ).not.toBeVisible();

    console.log(' Add Equipment modal closed ');
});
