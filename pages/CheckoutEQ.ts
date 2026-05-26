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

        const dialog = this.page.getByRole('dialog', {
            name: 'Check-Out Equipment'
        });

        await dialog
            .getByRole('button', { name: 'CHECK OUT NOW' })
            .click();

    }

    async verifyEquipmentAssignedToast() {

        const toast = this.page.getByText('Equipment Assigned');

        await expect(toast).toHaveText('Equipment Assigned', { timeout: 20000 });
    }
}




