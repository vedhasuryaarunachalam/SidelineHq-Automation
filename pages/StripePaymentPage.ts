import { Page } from '@playwright/test';

export class StripePaymentPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async makePayment() {

        // Email
        await this.page
            .getByRole('textbox', { name: 'Email' })
            .fill('testuser@gmail.com');

        // Card Number
        await this.page
            .getByRole('textbox', { name: 'Card number' })
            .fill('4242424242424242');

        // Expiry
        await this.page
            .getByRole('textbox', { name: 'Expiration' })
            .fill('12/30');

        // CVC
        await this.page
            .getByRole('textbox', { name: 'CVC' })
            .fill('123');

        // Cardholder Name
        await this.page
            .getByRole('textbox', {
                name: 'Cardholder name'
            })
            .fill('Test User');

        // Pay button
        await this.page
            .getByRole('button', { name: 'Pay' })
            .click();
    }
}
