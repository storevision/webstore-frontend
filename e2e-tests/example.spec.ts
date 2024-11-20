import { expect, test } from '@playwright/test';

test('should navigate to the about page', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // find element with the test-id "nav-about"
    const aboutButton = page.getByTestId('nav-about');

    await aboutButton.click();

    // assert the URL is correct
    await expect(page).toHaveURL('http://localhost:3000/about');
});
