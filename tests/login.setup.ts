import { test as setup, expect } from '@playwright/test';

setup('setup login auth data', async ({ page }) => {
  await page.goto('https://www.powr.io/signin');
  await page.locator('#sign_in_email').click();
  await page.locator('#sign_in_email').fill(process.env.USER as string);
  await page.locator('#sign_in_email').press('Tab');
  await page.locator('#new_sign_in_password').fill(process.env.PASS as string);
  await expect(page.locator('#sign_in_email')).toHaveValue('le.bmunoz+user1@gmail.com');
  await expect(page.locator('#new_sign_in_password')).toHaveValue('Test@1234');
  await page.locator('#sign-in-submit').click();
  await expect(page.locator('.nav-logo')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'POWR Dashboard' })).toBeVisible();
  
  await page.context().storageState({path: '.auth/login.json'})
});