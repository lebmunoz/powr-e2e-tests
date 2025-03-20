import { test as setup, expect, Browser, Page } from '@playwright/test';
import { chromium } from 'playwright-extra';
import StealthPlugin from "puppeteer-extra-plugin-stealth"

setup('setup login auth data', async ({}) => {
  chromium.use(StealthPlugin());
  const browser: Browser = await chromium.launch();
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  
  await page.goto('https://www.powr.io/signin');
  await page.locator('#sign_in_email').click();
  await page.locator('#sign_in_email').fill(process.env.USER as string);
  await page.locator('#sign_in_email').press('Tab');
  await page.locator('#new_sign_in_password').fill(process.env.PASS as string);
  await page.locator('#sign-in-submit').click();
  await expect(page.locator('.nav-logo')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'POWR Dashboard' })).toBeVisible();
  
  await page.context().storageState({path: '.auth/login.json'})
});