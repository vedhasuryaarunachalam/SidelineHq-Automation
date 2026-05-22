import { expect, Page } from '@playwright/test';
import { TestDataUtil } from '../utils/Randomdata';

export class NonSerializedPage {
  constructor(private page: Page) { }
  equipmentData = TestDataUtil.equipmentData();

  async navigateToLandingPage() {
    await this.page.goto('/sports/1/equipment/serialized/available', { waitUntil: 'domcontentloaded' });
  }

  async Addbutton() {

    await this.page
      .locator('[class*="addIconWrapper"]')
      .click();
  }

  async AddEquipment() {
    await this.page
      .locator('input[name="isSerialized"][value="false"]')
      .click();
    await expect(
      this.page.getByRole('radio', { name: /Non - Serialized/i })
    ).toBeChecked();

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
      .getByPlaceholder('Enter note')
      .fill('NonSerial Test Note');
  }

  async submitEquipment() {
    await this.page
      .getByRole('button', { name: 'ADD EQUIPMENT' })
      .click();

    await expect(
      this.page.locator('.ant-notification-notice-title')
    ).toHaveText('Equipment Added');

    await this.page.goto(
      '/sports/1/equipment/non-serialized',
      { waitUntil: 'domcontentloaded' }
    );

  }
}