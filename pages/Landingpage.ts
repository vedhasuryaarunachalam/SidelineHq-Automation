import { expect, Page } from '@playwright/test';
import { TestDataUtil } from '../utils/Randomdata';
import { CommonPage } from './CommonObj';


export class LandingPage extends CommonPage {

    constructor(page: Page) {
        super(page);
    }


    equipmentData = TestDataUtil.equipmentData();
    async waitForNotificationsToClear() {

        const notification = this.page.locator('.ant-notification-notice');

        await notification
            .first()
            .waitFor({
                state: 'hidden',
                timeout: 10000
            })
            .catch(() => { });

        if (await notification.count() > 0) {

            await notification
                .locator('.ant-notification-notice-close')
                .first()
                .click()
                .catch(() => { });

            await notification
                .first()
                .waitFor({
                    state: 'hidden',
                    timeout: 5000
                })
                .catch(() => { });
        }
    }


    async navigateToLandingPage() {
        await this.navigate();
    }

   async Addbutton() {
    await this.clickAddButton();
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
        await this.page.locator('div[name="size"]').click();

        await this.page
            .locator('.ant-select-item-option-content').getByText('L', { exact: true })
            .click();
        await this.page
            .getByPlaceholder('Enter Location')
            .fill('Room A');
        await this.page
            .getByPlaceholder('Enter year')
            .fill('2026');
        await this.page.getByPlaceholder('Enter date').fill('2026-05-26');
        await this.page.getByPlaceholder('Enter Price').fill('102');
        await this.page.getByPlaceholder('Enter note').fill('Test Note');
        await this.page.getByText('ADD EQUIPMENT').click();
        await this.SuccessToast();
       


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