import { test, expect } from '@playwright/test';

const loginUrl = 'https://www.saucedemo.com/';
const validUsername = 'standard_user';
const validPassword = 'secret_sauce';

test.describe('Products Page', () => {

    test.beforeEach(async ({ page }) => {
        // Login before every test
        await page.goto(loginUrl);

        await page.getByPlaceholder('Username').fill(validUsername);
        await page.getByPlaceholder('Password').fill(validPassword);
        await page.getByRole('button', { name: 'Login' }).click();

        // Verify login was successful
        await expect(page).toHaveURL(/inventory/);
        await expect(page.getByText('Products')).toBeVisible();
    });

    // =========================
    // POSITIVE SCENARIOS
    // =========================

    test.describe('Positive Scenarios', () => {

        test('should display products page successfully', async ({ page }) => {

            await expect(page.getByText('Products')).toBeVisible();

            await expect(
                page.getByText('Sauce Labs Backpack')
            ).toBeVisible();

            await expect(
                page.getByText('Sauce Labs Bike Light')
            ).toBeVisible();
        });


        test('should display product price', async ({ page }) => {

            const backpack = page.getByText('Sauce Labs Backpack');

            await expect(backpack).toBeVisible();

            // Locate the price within the product container
            const product = backpack.locator('..');

            await expect(
                product.getByText('$29.99')
            ).toBeVisible();
        });


        test('should add Sauce Labs Backpack to cart', async ({ page }) => {

            await page
                .getByRole('button', { name: 'Add to cart' })
                .first()
                .click();

            // Cart should show 1 item
            await expect(
                page.locator('.shopping_cart_badge')
            ).toHaveText('1');
        });


        test('should open product details page', async ({ page }) => {

            await page
                .getByText('Sauce Labs Backpack')
                .click();

            await expect(page).toHaveURL(/inventory-item/);

            await expect(
                page.getByText('Sauce Labs Backpack')
            ).toBeVisible();

            await expect(
                page.getByText('$29.99')
            ).toBeVisible();
        });


        test('should add product from product details page', async ({ page }) => {

            await page
                .getByText('Sauce Labs Backpack')
                .click();

            await page
                .getByRole('button', { name: 'Add to cart' })
                .click();

            await expect(
                page.locator('.shopping_cart_badge')
            ).toHaveText('1');
        });


        test('should remove product from cart', async ({ page }) => {

            await page
                .getByRole('button', { name: 'Add to cart' })
                .first()
                .click();

            await expect(
                page.locator('.shopping_cart_badge')
            ).toHaveText('1');

            await page
                .getByRole('button', { name: 'Remove' })
                .first()
                .click();

            await expect(
                page.locator('.shopping_cart_badge')
            ).not.toBeVisible();
        });

    });


    // =========================
    // NEGATIVE / EDGE SCENARIOS
    // =========================

    test.describe('Negative and Edge Scenarios', () => {

        test('should not show cart badge when no product is added', async ({ page }) => {

            await expect(
                page.locator('.shopping_cart_badge')
            ).not.toBeVisible();
        });


        test('should not show Remove button before adding a product', async ({ page }) => {

            await expect(
                page.getByRole('button', { name: 'Remove' })
            ).not.toBeVisible();
        });


        test('should not open product details for an invalid product', async ({ page }) => {

            await expect(
                page.getByText('Invalid Product')
            ).not.toBeVisible();
        });


        test('should not allow access to products page after logout', async ({ page }) => {

            await page.getByRole('button', { name: 'Open Menu' }).click();

            await page.getByRole('link', { name: 'Logout' }).click();

            await expect(page).toHaveURL(loginUrl);

            await expect(
                page.getByPlaceholder('Username')
            ).toBeVisible();
        });

    });

});