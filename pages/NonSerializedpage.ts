import { expect, Page } from '@playwright/test';
import { TestDataUtil } from '../utils/Randomdata';
import { CommonPage } from './CommonObj';


export class NonSerializedPage extends CommonPage {

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
    await this.page.getByText('ADD EQUIPMENT').click();
    await this.SuccessToast();
  }

  async CheckEquipment() {

    await this.page
      .getByRole('tab', { name: 'Non-Serialized' })
      .click();

    // Wait for table to load
    await expect(
      this.page.getByRole('tabpanel',{ name: 'Non-Serialized' })
    ).toBeVisible();

    
    const equipmentRow = this.page
      .getByRole('row')
      .filter({
        hasText: this.equipmentData.category
      });

    await expect(equipmentRow).toBeVisible();

    console.log(
      'Equipment "${this.equipmentData.category}" is visible in Non-Serialized table'
    );
  }
}