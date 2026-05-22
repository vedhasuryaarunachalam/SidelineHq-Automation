import { expect, Page } from '@playwright/test';
import { TestDataUtil } from '../utils/Randomdata';

export class OnetimecheckoutPage {
    constructor(private page: Page) { }
    equipmentData = TestDataUtil.equipmentData();
    async navigateToLandingPage() {
        await this.page.goto('/sports/1/equipment/serialized/available', { waitUntil: 'domcontentloaded' });
    }

    async Addbutton() {
        await this.page
            .locator('[class*="addIconWrapper"]')
            .click();
    }

    async AddEquipment() {
        await this.page
            .locator('input[name="isSerialized"][value="false"]')
            .check();

        await this.page
            .getByRole('button', { name: 'NEXT' })
            .click();

    }
    async AddEquipmentDetails() {

        await this.page
            .getByPlaceholder('Enter category')
            .fill(this.equipmentData.category);
        await this.page
            .getByPlaceholder('Enter quantity')
            .fill('5');
        await this.page
            .locator('input[name="isOneTimeCheckout"]')
            .check();


    }
    async submitEquipment() {
        await this.page
            .getByRole('button', { name: 'ADD EQUIPMENT' })
            .click();
        await expect(
            this.page.locator('.ant-notification-notice-title')
                .filter({ hasText: 'Equipment Added' })
        ).toBeVisible({ timeout: 10000 });

        await this.page.goto(
            'https://marine-turquoise-coyote.rootquotient.revolte.io/sports/1/equipment/one-time-checkout'
        );



    }

}