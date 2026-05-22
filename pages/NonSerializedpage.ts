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
      .locator("//span[contains(@class,'_addIconWrapper_1vr2h_44')]")
      .click();
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
      .getByPlaceholder('Enter note')
      .fill('NonSerial Test Note');

  }
  async submitEquipment() {
    await this.page
      .getByRole('button', { name: 'ADD EQUIPMENT' })
      .click();
    await this.page.goto(
      'https://marine-turquoise-coyote.rootquotient.revolte.io/sports/1/equipment/non-serialized'
    );

    // Verify equipment exists
    await expect(
      this.page.getByRole('cell', { name: this.equipmentData.category })
    ).toBeVisible();


  }
}