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

test('Add a Form Builder, change BG color and validate', async ({ page }) => {
  await page.goto('https://www.powr.io/users/me');
  await page.getByRole('link', { name: 'My Apps' }).click();
  await page.getByRole('button', { name: 'Create New App' }).click();
  await expect(page.getByRole('heading', { name: 'Form Builder' }).first()).toBeVisible();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('.app-card__action-items > a').first().click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Start from scratch' }).click();
  await page1.getByText('Design').click();
  await expect(page1.getByText('Background & Border')).toBeVisible();
  await page1.getByText('Background & Border').click();
  await page1.locator('.swatch').first().click();
  await page1.getByRole('textbox').first().fill('#E3F2FD')
  await expect(page1.locator('.current-color > div:nth-child(2)')).toHaveCSS('background-color', 'rgb(227, 242, 253)')
  await page1.getByRole('button', { name: 'OK' }).click();
  await expect(page1.locator('div.formBuilder.formBuilder-v2.formElementsModule.js-form-container.enter_ani_none.none')).toHaveCSS('background-color', 'rgb(227, 242, 253)')
  await page1.getByRole('button', { name: 'Publish' }).click();
  await page1.getByText('Share App').click();
  await expect(page1.getByRole('heading', { name: 'Share a link to your Form' })).toBeVisible({ timeout: 20_000 });
  await page1.getByRole('button', { name: 'Copy Link' }).click();
  let getURL = await page1.locator('#publish-navigation-container').getByRole('textbox').ariaSnapshot()
  
  let pageURL = getURL.split(': ');
  pageURL.shift();
  getURL = pageURL.join(': ');
  
  const page2 = await page.context().newPage();
  await page2.bringToFront();
  await page2.goto(getURL);
  await expect(page2.getByRole('heading', { name: 'My Custom Form' })).toBeVisible();
  await expect(page2.locator('#appView')).toBeVisible();
  await expect(page2.locator('div.formBuilder.formBuilder-v2.formElementsModule.js-form-container.enter_ani_none.none')).toHaveCSS('background-color', 'rgb(227, 242, 253)')
  await expect(page2.getByText('My Custom Form Email Address')).toBeVisible();
  await page2.close();
  
  await page1.locator('.publish-uber-panel > i').click();
  await page1.locator('.signed-in-menu').click();
  test.slow();
  const page3Promise = page1.waitForEvent('popup');
  await page1.getByRole('link', { name: 'My Apps' }).click();
  const page3 = await page3Promise;
  await page3.locator('div').filter({ hasText: /^Untitled Form BuilderForm BuilderFree$/ }).locator('i').click();
  page3.once('dialog', dialog => {
    dialog.accept().catch(() => {});
  });
  await page3.getByText('Delete').click();
  await expect(page3.locator('.nav-logo')).toBeVisible();
  await expect(page3.getByRole('heading', { name: 'You don\'t have any apps yet.' })).toBeVisible({ timeout: 40_000 });
});
