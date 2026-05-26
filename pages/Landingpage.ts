import { expect, Page } from '@playwright/test';
import { TestDataUtil } from '../utils/Randomdata';

export class LandingPage {

    constructor(private page: Page) { }

    equipmentData = TestDataUtil.equipmentData();

    async navigateToLandingPage() {
        await this.page.goto('/sports/1/equipment/serialized/available', {
            waitUntil: 'domcontentloaded'
        });

        // Wait for any post-navigation notifications to clear
        await this.page
            .locator('.ant-notification-notice')
            .waitFor({ state: 'hidden', timeout: 10000 })
            .catch(() => { });
    }

    async Addbutton() {
        // Wait for ALL notifications to disappear, not just the container
        await this.page
            .locator('.ant-notification-notice')
            .first()
            .waitFor({ state: 'hidden', timeout: 10000 })
            .catch(() => { });

        // Extra safety: force-dismiss any lingering notifications
        const notification = this.page.locator('.ant-notification-notice');
        if (await notification.count() > 0) {
            await notification
                .locator('.ant-notification-notice-close')
                .first()
                .click()
                .catch(() => { });

            await notification.first().waitFor({ state: 'hidden', timeout: 5000 }).catch(() => { });
        }

        const addButton = this.page
            .locator('[class*="addIconWrapper"]')
            .first();

        await expect(addButton).toBeVisible();

        // Use force:true as last resort if notification overlaps but button is stable
        await addButton.click({ timeout: 50000 });
    }

    async AddEquipment() {
        await this.page.getByRole('radio').first().click();

        await this.page
            .getByRole('button', { name: 'NEXT' })
            .click();

    }
    async AddEquipmentDetails() {

        await this.page
            .getByPlaceholder('Enter category')
            .fill(this.equipmentData.category);

        await this.page
            .getByPlaceholder('Enter Product/ID')
            .fill(this.equipmentData.productId);

        await this.page
            .getByPlaceholder('Enter brand')
            .fill(this.equipmentData.brand);

        await this.page
            .getByPlaceholder('Enter style')
            .fill(this.equipmentData.style);
    }


    async addOnlyMandatoryFields() {

        await this.page
            .getByPlaceholder('Enter category')
            .fill(this.equipmentData.category);

        await this.page
            .getByPlaceholder('Enter Product/ID')
            .fill(this.equipmentData.productId);
    }

    async addDuplicateProductId() {

        await this.page
            .getByPlaceholder('Enter category')
            .fill(`Helmet Duplicate`);

        // same product id 
        await this.page
            .getByPlaceholder('Enter Product/ID')
            .fill(this.equipmentData.productId);
    }

    async submitEquipment() {

        const addEquipmentButton = this.page.getByRole('button', {
            name: 'ADD EQUIPMENT'
        });

        await addEquipmentButton.click();



    }

    async closeModal() {

        await this.page
            .locator('.ant-modal-close')
            .click();
    }
}   