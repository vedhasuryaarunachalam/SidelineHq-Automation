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
        await this.page.locator('div[name="size"] input.ant-select-input').click();

        await this.page
            .locator('.ant-select-dropdown:visible .ant-select-item-option')
            .filter({ hasText: 'M' })
            .click();
        await this.page.getByPlaceholder('Enter location').fill('Room A');

        const yearPicker = this.page.locator('.ant-picker-dropdown:visible');

        await this.page.getByPlaceholder('Enter year').click();

        await yearPicker.getByText('2026', { exact: true }).click();
        await this.page.getByPlaceholder('Enter date').click();

        const datePicker = this.page.locator('.ant-picker-dropdown:visible');

        // Select only current month date cells
        await datePicker
            .locator('.ant-picker-cell-in-view')
            .getByText('26', { exact: true })
            .click();

        await this.page.getByPlaceholder('Enter price').fill('102');

        await this.page.getByPlaceholder('Enter notes').fill('Test Note');
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
        await this.page.getByText('ADD EQUIPMENT').click();
    }

    async addDuplicateProductId() {

        const duplicateProductId = this.equipmentData.productId;

        const modal = this.page.getByRole('dialog', {
            name: 'Equipment Details'
        });

        await expect(modal).toBeVisible();

        await modal
            .getByPlaceholder('Enter category')
            .fill('Helmet Duplicate');

        const productIdInput = modal.getByPlaceholder('Enter Product/ID');

        await expect(productIdInput).toBeVisible();
        await expect(productIdInput).toBeEditable();

        // enter SAME product id again
        await productIdInput.fill(duplicateProductId);

        await modal
            .getByRole('button', { name: 'ADD EQUIPMENT' })
            .click();

        await expect(
            this.page.getByText('Product ID already exists for this sport')
        ).toBeVisible();
    }



    async closeModal() {

        await this.page
            .locator('.ant-modal-close')
            .click();
    }
}   