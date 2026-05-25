import { expect, Page } from '@playwright/test';

export class NonSerializedCheckoutPage {

    constructor(private page: Page) { }

    async navigate() {

        await this.page.goto(
            'https://marine-turquoise-coyote.rootquotient.revolte.io/sports/1/equipment/non-serialized?sortColumn=status&sortBy=asc',
            { waitUntil: 'domcontentloaded' }
        );


    }

    async checkoutEquipmentToMultiplePlayers() {

        await this.page
            .getByRole('button', { name: 'Check Out' })
            .first()
            .click();

        const dialog = this.page.getByRole('dialog', {
            name: 'Check-Out Equipment'
        });

        const combobox = dialog.getByRole('combobox');

        await combobox.click();

        const options = this.page.locator(
            '.ant-select-dropdown:not(.ant-select-dropdown-hidden) ' +
            '.ant-select-item-option:not(.ant-select-item-option-selected)'
        );

        // select first 4 available options
        for (let i = 0; i < 4; i++) {

            await expect(options.first()).toBeVisible();

            await options.first().click();
        }

        await this.page.keyboard.press('Escape');

        await dialog
            .getByRole('button', { name: 'CHECK OUT NOW' })
            .click();
    }
}