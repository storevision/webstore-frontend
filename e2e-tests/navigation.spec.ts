import { expect, test } from '@playwright/test';

test('should navigate to the about page', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // find element with the test-id "nav-about"
    const aboutButton = page.getByTestId('nav-about');

    await aboutButton.click();

    // assert the URL is correct
    await expect(page).toHaveURL('http://localhost:3000/about');

    // assert the 404 page is not visible
    await expect(page.getByText('404')).not.toBeVisible();

    // assert the page title is correct
    await expect(page.title()).resolves.toContain('About');
});

test('should navigate to the home page', async ({ page }) => {
    await page.goto('http://localhost:3000/about');

    // find element with the test-id "nav-home"
    const homeButton = page.getByTestId('nav-home');

    await homeButton.click();

    // assert the URL is correct
    await expect(page).toHaveURL('http://localhost:3000/');

    // assert the 404 page is not visible
    await expect(page.getByText('404')).not.toBeVisible();

    // assert the page title is correct
    await expect(page.title()).resolves.toContain('Home');
});
