
import { test } from '@playwright/test';
import { NonSerializedCheckoutPage } from '../pages/NonCheckoutEQ';

test.describe('Equipment Checkout Tests', () => {

    test('Checkout non-serialized equipment for multiple players successfully', async ({ page }) => {

        const checkoutPage = new NonSerializedCheckoutPage(page);

        await checkoutPage.navigate();

        await checkoutPage.checkoutEquipmentToMultiplePlayers();

    });
});