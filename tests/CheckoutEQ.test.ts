// tests/CheckoutEquipment.spec.ts

import { test } from '@playwright/test';
import { CheckoutEquipmentPage } from '../pages/CheckoutEQ';

test.describe('Equipment Checkout Tests', () => {

    test('Checkout equipment successfully', async ({ page }) => {

        const checkoutPage = new CheckoutEquipmentPage(page);

        await checkoutPage.navigate();

        await checkoutPage.clickCheckoutButton();

        await checkoutPage.selectPlayer();

        await checkoutPage.clickCheckoutNow();

        await checkoutPage.verifyEquipmentAssignedToast();
    });

});