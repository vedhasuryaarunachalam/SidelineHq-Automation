import { test, expect } from '@playwright/test';

import { EquipmentActionsPage } from '../pages/EquipmentAction';

test.describe('Equipment Dropdown Actions', () => {

    let equipmentActionsPage: EquipmentActionsPage;

    test.beforeEach(async ({ page }) => {

        equipmentActionsPage =
            new EquipmentActionsPage(page);

        await equipmentActionsPage
            .navigateToEquipmentActionsPage();
    });

    test('Verify Edit dropdown action', async ({ page }) => {

        await equipmentActionsPage.clickEdit();

        await expect(
            page.locator('.ant-modal')
        ).toBeVisible();
    });

    test('Verify Archive dropdown action', async ({ page }) => {

        await equipmentActionsPage.clickArchive();

        await expect(
            page.getByRole('heading', {
                name: 'Archive Equipment?'
            })
        ).toBeVisible();
    });

    test('Verify Delete dropdown action', async ({ page }) => {

        await equipmentActionsPage.clickDelete();

        await expect(
            page.getByRole('heading', {
                name: 'Delete Equipment?'
            })
        ).toBeVisible();

        await expect(
            page.getByRole('button', {
                name: 'Yes, Delete'
            })
        ).toBeVisible();
    });
    test('Verify Edit action', async () => {

        await equipmentActionsPage.verifyEditFieldsArePrefilled();

    });

});