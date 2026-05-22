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
            '.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item-option'
        );

        // select first 4 players
        for (let i = 0; i < 4; i++) {

            const option = options.nth(i);

            await expect(option).toBeVisible();

            await option.click();
        }

        // close dropdown
        await this.page.keyboard.press('Escape');

        await expect(
            this.page.locator('.ant-select-dropdown')
        ).toBeHidden();

        const checkoutNowBtn = dialog.getByRole('button', {
            name: 'CHECK OUT NOW'
        });

        await checkoutNowBtn.click();
    }
}