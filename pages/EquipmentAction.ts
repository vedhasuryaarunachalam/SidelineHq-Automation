import { expect, Page, Locator } from '@playwright/test';

export class EquipmentActionsPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToEquipmentActionsPage() {

        await this.page.goto(
            '/sports/1/equipment/serialized/available',
            {
                waitUntil: 'domcontentloaded'
            }
        );
    }

    threeDotButton(): Locator {

        return this.page
            .getByRole('row')
            .nth(1)
            .getByRole('button')
            .last();
    }

    editOption(): Locator {
        return this.page
            .locator('.ant-dropdown:visible')
            .getByRole('menuitem', { name: 'Edit' });
    }

    archiveOption(): Locator {
        return this.page
            .locator('.ant-dropdown:visible')
            .getByRole('menuitem', { name: 'Archive' });
    }

    deleteOption(): Locator {
        return this.page
            .locator('.ant-dropdown:visible')
            .getByRole('menuitem', { name: 'Delete' });
    }

    async openDropdown() {
        await this.threeDotButton().click();

        await expect(this.editOption()).toBeVisible();
    }
    async clickEdit() {

        await this.openDropdown();

        await this.editOption().click();
    }

    async clickArchive() {

        await this.openDropdown();

        await this.archiveOption().click();
    }

    async clickDelete() {

        await this.openDropdown();

        await this.deleteOption().click();
    }
    async verifyEditFieldsArePrefilled() {

        await this.clickEdit();

        const dialog = this.page.getByRole('dialog', {
            name: /edit equipment details/i
        });

        await expect(dialog).toBeVisible();

        // Locators
        const categoryField = dialog.getByPlaceholder('Enter category');
        const productIdField = dialog.getByPlaceholder('Enter Product/ID');
        const brandField = dialog.getByPlaceholder('Enter brand');

        await expect(categoryField).not.toHaveValue('');
        await expect(productIdField).not.toHaveValue('');
        if (await brandField.inputValue() === '') {
            await brandField.fill('Updated Brand');
        }
        await categoryField.fill('Updated Helmet');
        await brandField.fill('Updated Brand');

        await dialog.getByRole('button', {
            name: /save changes/i
        }).click();

        await expect(
            this.page.getByText('Equipment updated')
        ).toBeVisible();
    }

}