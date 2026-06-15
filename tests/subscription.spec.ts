import { test, expect } from '@playwright/test';
import { SubscriptionPage } from '../pages/SubscriptionPage';
import { StripePaymentPage } from '../pages/StripePaymentPage';

test('Verify subscription payment using Stripe', async ({ page }) => {

    const subscriptionPage = new SubscriptionPage(page);

    await subscriptionPage.navigateToSubscriptionPage();

    await subscriptionPage.clickRenewSubscription();

    await subscriptionPage.clickPayNow();

    // Wait for Stripe checkout navigation
    await page.waitForURL(/checkout\.stripe\.com/);

    // Stripe page object
    const stripePaymentPage = new StripePaymentPage(page);

    // Complete payment
    await stripePaymentPage.makePayment();
});

