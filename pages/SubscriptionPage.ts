import { Page, expect } from '@playwright/test';

export class SubscriptionPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToSubscriptionPage() {
        await this.page.goto(
            'https://marine-turquoise-coyote.rootquotient.revolte.io/subscription'
        );
    }

    async clickRenewSubscription() {
        await this.page
            .getByRole('button', {
                name: 'Renew Subscription'
            })
            .click();

    }
   async clickPayNow() {
        await this.page
            .getByRole('button', { name: 'Pay Now' })
            .click();
    }
    

    async verifyStripePaymentPage() {
        await this.page.waitForURL(/stripe\.com/);

        await expect(this.page).toHaveURL(
            /checkout\.stripe\.com/
        );

        await expect(
            this.page.getByText('Pay Now')
        ).toBeVisible();
    }
}
