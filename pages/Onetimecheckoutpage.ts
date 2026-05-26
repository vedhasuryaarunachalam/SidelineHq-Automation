import { expect, Page } from '@playwright/test';
import { TestDataUtil } from '../utils/Randomdata';
import { CommonPage } from './CommonObj';

export class OnetimecheckoutPage extends CommonPage {

    constructor(page: Page) {
        super(page);
    }

    equipmentData = TestDataUtil.equipmentData();
    async navigateToLandingPage() {
        await this.navigate();
    }

    async Addbutton() {
        await this.clickAddButton();
    }

    async AddEquipment() {
        await this.page
            .locator('input[name="isSerialized"][value="false"]')
            .check();

        await this.page
            .getByRole('button', { name: 'NEXT' })
            .click();

    }
    async AddEquipmentDetails() {   

        await this.page
            .getByPlaceholder('Enter category')
            .fill(this.equipmentData.category);
        await this.page
            .getByPlaceholder('Enter quantity')
            .fill('5');
        await this.page
            .locator('input[name="isOneTimeCheckout"]')
            .check();
        await this.page.getByText('ADD EQUIPMENT').click();
        await this.SuccessToast();


    }
     async CheckEquipment() {

    await this.page
      .getByRole('tab', { name: 'One-Time Checkout' })
      .click();

    // Wait for table to load
    await expect(
      this.page.getByRole('tabpanel',{ name: 'One-Time Checkout' })
    ).toBeVisible();

    const equipmentRow = this.page
      .getByRole('row')
      .filter({
        hasText: this.equipmentData.category
      });

    await expect(equipmentRow).toBeVisible();

    console.log(
      'Equipment "${this.equipmentData.category}" is visible in One-Time Checkout table'
    );
  }

}