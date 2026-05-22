import { expect, Page } from '@playwright/test';

export class CheckoutEquipmentPage {

    constructor(private page: Page) { }

    async navigate() {

        await this.page.goto(
            '/sports/1/equipment/serialized/available',
            { waitUntil: 'domcontentloaded' }
        );

    }

    async clickCheckoutButton() {

        await this.page
            .getByRole('button', { name: 'Check Out' })
            .first()
            .click();
    }

    async selectPlayer() {

        const dialog = this.page.getByRole('dialog', {
            name: 'Check-Out Equipment'
        });

        await dialog.getByRole('combobox').click();

        const options = this.page.locator(
            '.ant-select-dropdown .ant-select-item-option'
        );

        await expect(options.nth(1)).toBeVisible();

        await options.nth(1).click();
    }


    async clickCheckoutNow() {

        await this.page
            .getByRole('button', {
                name: 'CHECK OUT NOW'
            })
            .click();
    }

    async verifyEquipmentAssignedToast() {
        await expect(
            this.page.locator('.ant-notification-notice-title', {
                hasText: 'Equipment Assigned'
            })
        ).toBeVisible();
    }
    async navigateToNonserializedEquipment() {
        await this.page.getByRole('tab', {
            name: 'Non-Serialized'
        }).click();

    }




}