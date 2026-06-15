import { expect, Page } from '@playwright/test';
import { TestDataUtil } from '../utils/Randomdata';
import { CommonPage } from './CommonObj';

export class LandingPage extends CommonPage {

    constructor(page: Page) {
        super(page);
    }

    equipmentData = TestDataUtil.equipmentData();

    async navigateToLandingPage() {
        await this.navigate();
    }

    async clickAddButton() {
        await super.clickAddButton();
    }

    async selectEquipmentType() {

        await this.page
            .getByRole('radio')
            .first()
            .click();

        await this.page
            .getByRole('button', { name: 'NEXT' })
            .click();
    }

    async fillEquipmentDetails() {

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

        // Size dropdown
        await this.page
            .locator('div[name="size"] input.ant-select-input')
            .click();

        await this.page
            .locator('.ant-select-dropdown:visible .ant-select-item-option')
            .filter({ hasText: 'M' })
            .click();

        await expect(
            this.page.locator('.ant-select-dropdown:visible')
        ).toBeHidden();

        // Location
        const locationInput = this.page.getByPlaceholder('Enter location');

        await locationInput.fill('Room A');

        // Year picker
        await this.page
            .getByPlaceholder('Enter year')
            .fill('2026');



        // Date picker
        await this.page
            .getByPlaceholder('Enter date')
            .click();

        const datePicker = this.page.locator(
            '.ant-picker-cell.ant-picker-cell-in-view.ant-picker-cell-today'
        );

       const today = new Date().toISOString().split('T')[0];

await this.page
    .locator(`.ant-picker-cell[title="${today}"]`)
    .click();

        // Remaining fields
        await this.page
            .getByPlaceholder('Enter price')
            .fill('102');

        await this.page
            .getByPlaceholder('Enter notes')
            .fill('Test Note');

        // Submit
        await this.page
            .getByText('ADD EQUIPMENT')
            .click();

        await this.SuccessToast();
    }

    async addOnlyMandatoryFields() {

        await this.page
            .getByPlaceholder('Enter category')
            .fill(this.equipmentData.category);

        await this.page
            .getByPlaceholder('Enter Product/ID')
            .fill(this.equipmentData.productId);

        await this.page
            .getByText('ADD EQUIPMENT')
            .click();
    }

    async addDuplicateProductId() {

        const modal = this.page.getByRole('dialog', {
            name: 'Equipment Details',
        });

        await modal
            .getByPlaceholder('Enter category')
            .fill('Helmet Duplicate');

        await modal
            .getByPlaceholder('Enter Product/ID')
            .fill(this.equipmentData.productId);

        await modal
            .getByRole('button', { name: 'ADD EQUIPMENT' })
            .click();

        await expect(
            this.page.getByText(
                'Product ID already exists for this sport'
            )
        ).toBeVisible({
            timeout: 10000
        });

        await modal
            .getByRole('button', { name: /close/i })
            .click();
    }

    async closeModal() {

        await this.page
            .locator('.ant-modal-close')
            .click();
    }
}