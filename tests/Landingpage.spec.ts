import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/Landingpage';

test.describe('Landing Page Tests', () => {

    test('Add equipment with all details filled', async ({ page }) => {

        const landingPage = new LandingPage(page);

        await landingPage.navigateToLandingPage();

        await landingPage.Addbutton();

        await landingPage.AddEquipment();

        await landingPage.AddEquipmentDetails();

        await landingPage.submitEquipment();


    });

    test('Add equipment with only category and product id', async ({ page }) => {

        const landingPage = new LandingPage(page);

        await landingPage.navigateToLandingPage();

        await landingPage.Addbutton();

        await landingPage.AddEquipment();

        await landingPage.addOnlyMandatoryFields();

        await landingPage.submitEquipment();


    });

    test('Duplicate product id should show failure toast', async ({ page }) => {

        const landingPage = new LandingPage(page);

        await landingPage.navigateToLandingPage();

        // First equipment creation
        await landingPage.Addbutton();
        await landingPage.AddEquipment();
        await landingPage.addOnlyMandatoryFields();
        await landingPage.submitEquipment();

        await expect(
            page.locator('.ant-notification-notice-title').last()
        ).toContainText('Equipment Added');

        // Duplicate product ID
        await landingPage.Addbutton();
        await landingPage.AddEquipment();

        await landingPage.addDuplicateProductId();
        await landingPage.submitEquipment();

        await expect(
            page.locator('.ant-notification-notice-title')
        ).toContainText('Product ID already exists for this sport');
    });

    test('Close add equipment modal', async ({ page }) => {

        const landingPage = new LandingPage(page);

        await landingPage.navigateToLandingPage();

        await landingPage.Addbutton();

        await landingPage.closeModal();

        await expect(
            page.getByRole('button', { name: 'ADD EQUIPMENT' })
        ).not.toBeVisible();
    });

});