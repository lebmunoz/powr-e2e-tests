import { test, expect } from '@playwright/test';

test('Check Powr pricing page availability', async ({ page }) => {
  await page.goto('https://www.powr.io/pricing')
  await page.locator('.Select-value').click();
  await page.getByLabel('Social Feed').getByText('Social Feed').click();
  await expect(page.getByRole('option', { name: 'Social Feed' })).toBeVisible();
  await page.locator('div:nth-child(3) > .toggle > .toggle__container > .toggle__switcher').click();
  await expect(page.getByRole('heading', { name: 'Free' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '$0' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Starter' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '$5' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Pro', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: '$13' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Business' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '$89' })).toBeVisible();
  await page.locator('div:nth-child(3) > .toggle > .toggle__container > .toggle__switcher').click();
  await expect(page.getByText('Annually', { exact: true }).nth(1)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Free' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '$0' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Starter' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '$4' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Pro', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: '$12' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Business' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '$80' })).toBeVisible();
});