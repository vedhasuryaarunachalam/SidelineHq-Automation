import { expect, Page } from '@playwright/test';
import { TestDataUtil } from '../utils/Randomdata';

export class LandingPage {

    constructor(private page: Page) { }

    equipmentData = TestDataUtil.equipmentData();

    async navigateToLandingPage() {
        await this.page.goto('/sports/1/equipment/serialized/available', { waitUntil: 'domcontentloaded' });
    }

    async Addbutton() {
         await this.page
    .locator('.ant-notification-notice')
    .waitFor({ state: 'hidden' });
        await this.page
            .locator("//span[contains(@class,'_addIconWrapper_1vr2h_44')]")
            .click({timeout: 10000});
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

        await this.page
            .getByRole('button', { name: 'ADD EQUIPMENT' })
            .click();

    }

    async closeModal() {

        await this.page
            .locator('.ant-modal-close')
            .click();
    }
}