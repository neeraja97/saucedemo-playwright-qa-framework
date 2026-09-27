import { test, expect } from '@playwright/test';

const loginUrl = 'https://www.saucedemo.com/';
const validUsername = 'standard_user';
const validPassword = 'secret_sauce';

test.describe('Login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(loginUrl);
    });

    // =========================
    // Positive Scenarios
    // =========================

    test.describe('Positive Scenarios', () => {

        test('should login successfully with valid credentials', async ({ page }) => {
            await page.getByPlaceholder('Username').fill(validUsername);
            await page.getByPlaceholder('Password').fill(validPassword);

            await page.getByRole('button', { name: 'Login' }).click();

            await expect(page).toHaveURL(/inventory/);
            await expect(
                page.getByText('Products')
            ).toBeVisible();
        });

        test('should login successfully with problem user', async ({ page }) => {
            await page.getByPlaceholder('Username').fill('problem_user');
            await page.getByPlaceholder('Password').fill(validPassword);

            await page.getByRole('button', { name: 'Login' }).click();

            await expect(page).toHaveURL(/inventory/);
            await expect(
                page.getByText('Products')
            ).toBeVisible();
        });

        test('should login successfully with performance glitch user', async ({ page }) => {
            await page.getByPlaceholder('Username').fill('performance_glitch_user');
            await page.getByPlaceholder('Password').fill(validPassword);

            await page.getByRole('button', { name: 'Login' }).click();

            await expect(page).toHaveURL(/inventory/);
            await expect(
                page.getByText('Products')
            ).toBeVisible();
        });

    });

    // =========================
    // Negative Scenarios
    // =========================

    test.describe('Negative Scenarios', () => {

        test('should reject invalid username', async ({ page }) => {
            await page.getByPlaceholder('Username').fill('invalid_user');
            await page.getByPlaceholder('Password').fill(validPassword);

            await page.getByRole('button', { name: 'Login' }).click();

            await expect(page).toHaveURL(loginUrl);
            await expect(
                page.getByText('Username and password do not match any user in this service')
            ).toBeVisible();
        });

        test('should reject invalid password', async ({ page }) => {
            await page.getByPlaceholder('Username').fill(validUsername);
            await page.getByPlaceholder('Password').fill('wrong_password');

            await page.getByRole('button', { name: 'Login' }).click();

            await expect(page).toHaveURL(loginUrl);
            await expect(
                page.getByText('Username and password do not match any user in this service')
            ).toBeVisible();
        });

        test('should reject invalid username and password', async ({ page }) => {
            await page.getByPlaceholder('Username').fill('invalid_user');
            await page.getByPlaceholder('Password').fill('wrong_password');

            await page.getByRole('button', { name: 'Login' }).click();

            await expect(page).toHaveURL(loginUrl);
            await expect(
                page.getByText('Username and password do not match any user in this service')
            ).toBeVisible();
        });

        test('should require username when username is empty', async ({ page }) => {
            await page.getByPlaceholder('Password').fill(validPassword);

            await page.getByRole('button', { name: 'Login' }).click();

            await expect(
                page.getByText('Epic sadface: Username is required')
            ).toBeVisible();
        });

        test('should require password when password is empty', async ({ page }) => {
            await page.getByPlaceholder('Username').fill(validUsername);

            await page.getByRole('button', { name: 'Login' }).click();

            await expect(
                page.getByText('Epic sadface: Password is required')
            ).toBeVisible();
        });

        test('should reject locked out user', async ({ page }) => {
            await page.getByPlaceholder('Username').fill('locked_out_user');
            await page.getByPlaceholder('Password').fill(validPassword);

            await page.getByRole('button', { name: 'Login' }).click();

            await expect(page).toHaveURL(loginUrl);
            await expect(
                page.getByText('Epic sadface: Sorry, this user has been locked out.')
            ).toBeVisible();
        });

    });

});