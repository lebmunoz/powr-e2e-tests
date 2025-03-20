import { test, expect } from '@playwright/test';

test('Check Powr pricing page availability', async ({ page }) => {
  // Go to Pricing page and select the app Social Feed
  await page.goto('https://www.powr.io/pricing')
  await page.locator('.Select-value').click();
  await page.getByLabel('Social Feed').getByText('Social Feed').click();
  await expect(page.getByRole('option', { name: 'Social Feed' })).toBeVisible();
  await expect(async () => {
    await expect(page.getByRole('heading', { name: 'Social Feed' })).toBeVisible();
  }).toPass();
  test.slow();
  // Toggle prices to Monthly
  await page.locator('div:nth-child(3) > .toggle > .toggle__container > .toggle__switcher').click();

  // Perform price verifications for option "Monthly"
  await expect(page.getByText('Free$0Get Started').nth(2)).toMatchAriaSnapshot(`
    - heading "Free" [level=3]
    - heading "$0" [level=4]
    - button "Get Started"
  `);
  
  await expect(page.getByText('Starter$5.49 /moBilled').nth(2)).toBeVisible();
  await expect(page.getByText('Starter$5.49 /moBilled').nth(2)).toMatchAriaSnapshot(`
    - heading "Starter" [level=3]
    - heading "$5" [level=4]
    - heading ".49 /mo" [level=4]
    - text: Billed monthly
    - button "Select Plan"
  `);
  
  await expect(page.locator('div').filter({ hasText: /^Pro\$13\.49 \/moBilled monthlySelect PlanPopular$/ }).nth(2)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Pro\$13\.49 \/moBilled monthlySelect PlanPopular$/ }).nth(2)).toMatchAriaSnapshot(`
    - heading "Pro" [level=3]
    - heading "$13" [level=4]
    - heading ".49 /mo" [level=4]
    - text: Billed monthly
    - button "Select Plan"
    - text: Popular
  `);

  await expect(page.getByText('Business$89.99 /moBilled').nth(2)).toBeVisible();
  await expect(page.getByText('Business$89.99 /moBilled').nth(2)).toMatchAriaSnapshot(`
    - heading "Business" [level=3]
    - heading "$89" [level=4]
    - heading ".99 /mo" [level=4]
    - text: Billed monthly
    - button "Select Plan"
  `);

  // Toggle prices to Annually
  await page.locator('div:nth-child(3) > .toggle > .toggle__container > .toggle__switcher').click();

  // Perform price verifications for option "Annually"
  await expect(page.getByText('Free$0Get Started').nth(2)).toMatchAriaSnapshot(`
    - heading "Free" [level=3]
    - heading "$0" [level=4]
    - button "Get Started"
  `);

  await expect(page.getByText('Starter$5.49/mo$3.29 /').nth(1)).toBeVisible();
  await expect(page.getByText('Starter$5.49/mo$3.29 /').nth(1)).toMatchAriaSnapshot(`
    - heading "Starter" [level=3]
    - text: $5.49/mo
    - heading "$3" [level=4]
    - heading ".29 /mo" [level=4]
    - text: Billed annually
    - button "Select Plan"
  `);

  await expect(page.locator('div').filter({ hasText: /^Pro\$13\.49\/mo\$8\.09 \/moBilled annuallySelect PlanPopular$/ }).nth(2)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Pro\$13\.49\/mo\$8\.09 \/moBilled annuallySelect PlanPopular$/ }).nth(2)).toMatchAriaSnapshot(`
    - heading "Pro" [level=3]
    - text: $13.49/mo
    - heading "$8" [level=4]
    - heading ".09 /mo" [level=4]
    - text: Billed annually
    - button "Select Plan"
    - text: Popular
  `);
  await expect(page.getByText('Business$89.99/mo$53.99 /').nth(1)).toBeVisible();
  await expect(page.getByText('Business$89.99/mo$53.99 /').nth(1)).toMatchAriaSnapshot(`
    - heading "Business" [level=3]
    - text: $89.99/mo
    - heading "$53" [level=4]
    - heading ".99 /mo" [level=4]
    - text: Billed annually
    - button "Select Plan"
  `);
});

test('Add a Form Builder, change BG color and validate', async ({ page }) => {
  // Go to logged page and add a new Form Builder
  await page.goto('https://www.powr.io/users/me');
  await page.getByRole('link', { name: 'My Apps' }).click();
  await page.getByRole('button', { name: 'Create New App' }).click();
  await expect(page.getByRole('heading', { name: 'Form Builder' }).first()).toBeVisible();

  // Prepare to have the new page popping up next after the click
  const page1Promise = page.waitForEvent('popup');
  await page.locator('.app-card__action-items > a').first().click();
  const page1 = await page1Promise;

  // Select the "Start from scratch" template and perform the actions to change the background color
  await expect(async () => {
    await expect(page1.getByRole('button', { name: 'Start from scratch' })).toBeVisible({ timeout: 40_000 });
  }).toPass();
  await page1.getByRole('button', { name: 'Start from scratch' }).click();
  await expect(page1.getByText('Design')).toBeVisible();
  await page1.getByText('Design').click();
  await expect(page1.getByText('Background & Border')).toBeVisible();
  await page1.getByText('Background & Border').click();
  await expect(page1.locator('.swatch').first()).toBeVisible();
  await page1.locator('.swatch').first().click();
  await page1.getByRole('textbox').first().fill('#E3F2FD')
  await expect(page1.locator('.current-color > div:nth-child(2)')).toHaveCSS('background-color', 'rgb(227, 242, 253)')
  await expect(async () => {
    await expect(page1.getByRole('button', { name: 'OK' })).toBeVisible();
    await page1.getByRole('button', { name: 'OK' }).click();
  }).toPass();
  await expect(page1.locator('div.formBuilder.formBuilder-v2.formElementsModule.js-form-container.enter_ani_none.none')).toHaveCSS('background-color', 'rgb(227, 242, 253)')


  // Publish the app
  await page1.getByRole('button', { name: 'Publish' }).click();
  await page1.getByText('Share App').click();
  await expect(page1.getByRole('heading', { name: 'Share a link to your Form' })).toBeVisible({ timeout: 40_000 });
  await page1.getByRole('button', { name: 'Copy Link' }).click();

  // Workaround to copy and store the link to the app on a variable
  let getURL = await page1.locator('#publish-navigation-container').getByRole('textbox').ariaSnapshot()
  let pageURL = getURL.split(': ');
  pageURL.shift();
  getURL = pageURL.join(': ');
  
  // Open a new page and access the app from the generated link
  const page2 = await page.context().newPage();
  await page2.bringToFront();
  await page2.goto(getURL);

  // Perform the page validations and close
  await expect(page2.getByRole('heading', { name: 'My Custom Form' })).toBeVisible();
  await expect(page2.locator('#appView')).toBeVisible();
  await expect(page2.locator('div.formBuilder.formBuilder-v2.formElementsModule.js-form-container.enter_ani_none.none')).toHaveCSS('background-color', 'rgb(227, 242, 253)')
  await expect(page2.getByText('My Custom Form Email Address')).toBeVisible();
  await page2.close();
  
  // From the publishing page, go back to the editor
  await page1.locator('.publish-uber-panel > i').click();
  await page1.locator('.signed-in-menu').click();
  test.slow();

  // Go to main dashboard on a new page
  const page3Promise = page1.waitForEvent('popup');
  await page1.getByRole('link', { name: 'My Apps' }).click();
  const page3 = await page3Promise;

  // Delete the Form Builder app to avoid buildup on account
  await page3.locator('div').filter({ hasText: /^Untitled Form BuilderForm BuilderFree$/ }).locator('i').click();
  page3.once('dialog', dialog => {
    dialog.accept().catch(() => {});
  });
  await page3.getByText('Delete').click();
  await expect(page3.locator('.nav-logo')).toBeVisible();
  await expect(page3.getByRole('heading', { name: 'You don\'t have any apps yet.' })).toBeVisible({ timeout: 40_000 });
});
