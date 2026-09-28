import { test, expect } from '@playwright/test';

const loginUrl = 'https://www.saucedemo.com/';
const validUsername = 'standard_user';
const validPassword = 'secret_sauce';

test.describe('Cart - Multiple Items', () => {

    test.beforeEach(async ({ page }) => {

        // Navigate to login page
        await page.goto(loginUrl);

        // Login
        await page.getByPlaceholder('Username').fill(validUsername);
        await page.getByPlaceholder('Password').fill(validPassword);
        await page.getByRole('button', { name: 'Login' }).click();

        // Verify successful login
        await expect(page).toHaveURL(/inventory/);
        await expect(page.getByText('Products')).toBeVisible();
    });


    // =========================
    // POSITIVE SCENARIOS
    // =========================

    test.describe('Positive Scenarios', () => {

        test('should add two specific products to the cart', async ({ page }) => {

            // Find Backpack product card
            const backpackCard = page
                .locator('.inventory_item')
                .filter({ hasText: 'Sauce Labs Backpack' });

            // Add Backpack
            await backpackCard
                .getByRole('button', { name: 'Add to cart' })
                .click();


            // Find Bike Light product card
            const bikeLightCard = page
                .locator('.inventory_item')
                .filter({ hasText: 'Sauce Labs Bike Light' });

            // Add Bike Light
            await bikeLightCard
                .getByRole('button', { name: 'Add to cart' })
                .click();


            // Verify cart count
            await expect(
                page.locator('.shopping_cart_badge')
            ).toHaveText('2');
        });


        test('should display the selected products in the cart', async ({ page }) => {

            // Find Backpack
            const backpackCard = page
                .locator('.inventory_item')
                .filter({ hasText: 'Sauce Labs Backpack' });

            // Add Backpack
            await backpackCard
                .getByRole('button', { name: 'Add to cart' })
                .click();


            // Find Bike Light
            const bikeLightCard = page
                .locator('.inventory_item')
                .filter({ hasText: 'Sauce Labs Bike Light' });

            // Add Bike Light
            await bikeLightCard
                .getByRole('button', { name: 'Add to cart' })
                .click();


            // Open cart
            await page.locator('.shopping_cart_link').click();

            await expect(page).toHaveURL(/cart/);


            // Verify Backpack
            await expect(
                page.getByText('Sauce Labs Backpack')
            ).toBeVisible();

            // Verify Bike Light
            await expect(
                page.getByText('Sauce Labs Bike Light')
            ).toBeVisible();
        });


        test('should add three specific products to the cart', async ({ page }) => {

            // Add Backpack
            const backpackCard = page
                .locator('.inventory_item')
                .filter({ hasText: 'Sauce Labs Backpack' });

            await backpackCard
                .getByRole('button', { name: 'Add to cart' })
                .click();


            // Add Bike Light
            const bikeLightCard = page
                .locator('.inventory_item')
                .filter({ hasText: 'Sauce Labs Bike Light' });

            await bikeLightCard
                .getByRole('button', { name: 'Add to cart' })
                .click();


            // Add Bolt T-Shirt
            const boltTShirtCard = page
                .locator('.inventory_item')
                .filter({ hasText: 'Sauce Labs Bolt T-Shirt' });

            await boltTShirtCard
                .getByRole('button', { name: 'Add to cart' })
                .click();


            // Verify cart count
            await expect(
                page.locator('.shopping_cart_badge')
            ).toHaveText('3');
        });


        test('should remove one specific product while keeping other products', async ({ page }) => {

            // Add Backpack
            const backpackCard = page
                .locator('.inventory_item')
                .filter({ hasText: 'Sauce Labs Backpack' });

            await backpackCard
                .getByRole('button', { name: 'Add to cart' })
                .click();


            // Add Bike Light
            const bikeLightCard = page
                .locator('.inventory_item')
                .filter({ hasText: 'Sauce Labs Bike Light' });

            await bikeLightCard
                .getByRole('button', { name: 'Add to cart' })
                .click();


            // Add Bolt T-Shirt
            const boltTShirtCard = page
                .locator('.inventory_item')
                .filter({ hasText: 'Sauce Labs Bolt T-Shirt' });

            await boltTShirtCard
                .getByRole('button', { name: 'Add to cart' })
                .click();


            // Open cart
            await page.locator('.shopping_cart_link').click();


            // Find Backpack in cart
            const backpackCartItem = page
                .locator('.cart_item')
                .filter({ hasText: 'Sauce Labs Backpack' });

            // Remove Backpack
            await backpackCartItem
                .getByRole('button', { name: 'Remove' })
                .click();


            // Backpack should no longer be visible
            await expect(
                page.getByText('Sauce Labs Backpack')
            ).not.toBeVisible();


            // Other products should remain
            await expect(
                page.getByText('Sauce Labs Bike Light')
            ).toBeVisible();

            const boltTShirtCartItem = page
            .locator('.cart_item')
            .filter({ hasText: 'Sauce Labs Bolt T-Shirt' });

            await expect(boltTShirtCartItem).toBeVisible();


            // Cart count should be 2
            await expect(
                page.locator('.shopping_cart_badge')
            ).toHaveText('2');
        });


        test('should remove all selected products from the cart', async ({ page }) => {

            // Add Backpack
            const backpackCard = page
                .locator('.inventory_item')
                .filter({ hasText: 'Sauce Labs Backpack' });

            await backpackCard
                .getByRole('button', { name: 'Add to cart' })
                .click();


            // Add Bike Light
            const bikeLightCard = page
                .locator('.inventory_item')
                .filter({ hasText: 'Sauce Labs Bike Light' });

            await bikeLightCard
                .getByRole('button', { name: 'Add to cart' })
                .click();


            // Open cart
            await page.locator('.shopping_cart_link').click();


            // Remove Backpack
            const backpackCartItem = page
                .locator('.cart_item')
                .filter({ hasText: 'Sauce Labs Backpack' });

            await backpackCartItem
                .getByRole('button', { name: 'Remove' })
                .click();


            // Remove Bike Light
            const bikeLightCartItem = page
                .locator('.cart_item')
                .filter({ hasText: 'Sauce Labs Bike Light' });

            await bikeLightCartItem
                .getByRole('button', { name: 'Remove' })
                .click();


            // Cart should be empty
            await expect(
                page.locator('.shopping_cart_badge')
            ).not.toBeVisible();

            await expect(
                page.locator('.cart_item')
            ).toHaveCount(0);
        });

    });


    // =========================
    // NEGATIVE / EDGE SCENARIOS
    // =========================

    test.describe('Negative and Edge Scenarios', () => {

        test('should display an empty cart when no products are added', async ({ page }) => {

            // Open cart without adding any product
            await page.locator('.shopping_cart_link').click();

            await expect(page).toHaveURL(/cart/);

            // Cart should contain zero products
            await expect(
                page.locator('.cart_item')
            ).toHaveCount(0);
        });


        test('should not display cart badge when no products are added', async ({ page }) => {

            await expect(
                page.locator('.shopping_cart_badge')
            ).not.toBeVisible();
        });


        test('should not display a removed product in the cart', async ({ page }) => {

            // Add Backpack
            const backpackCard = page
                .locator('.inventory_item')
                .filter({ hasText: 'Sauce Labs Backpack' });

            await backpackCard
                .getByRole('button', { name: 'Add to cart' })
                .click();


            // Add Bike Light
            const bikeLightCard = page
                .locator('.inventory_item')
                .filter({ hasText: 'Sauce Labs Bike Light' });

            await bikeLightCard
                .getByRole('button', { name: 'Add to cart' })
                .click();


            // Open cart
            await page.locator('.shopping_cart_link').click();


            // Remove Backpack
            const backpackCartItem = page
                .locator('.cart_item')
                .filter({ hasText: 'Sauce Labs Backpack' });

            await backpackCartItem
                .getByRole('button', { name: 'Remove' })
                .click();


            // Backpack should not be visible
            await expect(
                page.getByText('Sauce Labs Backpack')
            ).not.toBeVisible();


            // Bike Light should still be visible
            await expect(
                page.getByText('Sauce Labs Bike Light')
            ).toBeVisible();
        });


        test('should show correct cart count after removing one specific product', async ({ page }) => {

            // Add Backpack
            const backpackCard = page
                .locator('.inventory_item')
                .filter({ hasText: 'Sauce Labs Backpack' });

            await backpackCard
                .getByRole('button', { name: 'Add to cart' })
                .click();


            // Add Bike Light
            const bikeLightCard = page
                .locator('.inventory_item')
                .filter({ hasText: 'Sauce Labs Bike Light' });

            await bikeLightCard
                .getByRole('button', { name: 'Add to cart' })
                .click();


            // Add Bolt T-Shirt
            const boltTShirtCard = page
                .locator('.inventory_item')
                .filter({ hasText: 'Sauce Labs Bolt T-Shirt' });

            await boltTShirtCard
                .getByRole('button', { name: 'Add to cart' })
                .click();


            // Open cart
            await page.locator('.shopping_cart_link').click();


            // Remove Backpack
            const backpackCartItem = page
                .locator('.cart_item')
                .filter({ hasText: 'Sauce Labs Backpack' });

            await backpackCartItem
                .getByRole('button', { name: 'Remove' })
                .click();


            // Cart count should now be 2
            await expect(
                page.locator('.shopping_cart_badge')
            ).toHaveText('2');
        });

    });

});