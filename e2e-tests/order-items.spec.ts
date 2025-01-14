import { expect, test } from '@playwright/test';

test('ordering items should work', async ({ page, context }) => {
    const user = {
        email: `test+${Date.now()}+${context.browser()?.browserType().name()}@example.com`,
        displayName: `Test User${Date.now()}`,
        password: `password${Date.now()}`,
    };

    await page.goto('http://localhost:3000/register');

    await page.fill('[data-testid=email-input]', user.email);

    await page.fill('[data-testid=display-name-input]', user.displayName);

    await page.fill('[data-testid=password-input]', user.password);

    await page.fill('[data-testid=password-confirmation-input]', user.password);

    await page.click('[data-testid=register-button]');

    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL('http://localhost:3000/');

    await expect(page.getByTestId('welcome-modal')).toBeVisible();

    await page.reload({
        waitUntil: 'networkidle',
    });

    const desktopRow = page.locator('[data-testid="product-slider-desktop"]');

    expect(await desktopRow.count()).toBeGreaterThan(0);

    const firstRow = desktopRow.first();

    await expect(firstRow).toBeVisible();

    // '[data-testid^="product-card-"]'
    const productCards = firstRow
        .locator('.slick-active')
        .locator('[data-testid^="product-card-"]');

    expect(await productCards.count()).toBeGreaterThan(0);

    const firstCard = productCards.first();

    await expect(firstCard).toBeVisible();

    const addToCartButton = firstCard.locator(
        '[data-testid="add-to-cart-button"]',
    );

    await expect(addToCartButton).toBeVisible();

    await addToCartButton.click();

    // expect the mui badge 'cart-icon' to have text "1"
    await expect(page.locator('[data-testid="cart-icon"]').first()).toHaveText(
        '1',
    );

    // find and click "learn-more-button"
    const learnMoreButton = firstCard.locator(
        '[data-testid="learn-more-button"]',
    );

    await expect(learnMoreButton).toBeVisible();

    await learnMoreButton.click();

    // assert the URL is correct (http://localhost:3000/product/<id>/<name>)
    await page.waitForURL(/http:\/\/localhost:3000\/product\/\d+\/.+/);

    // set quantity to 2
    await page.fill('[data-testid="quantity-input"]', '2');

    // find and click "add-to-cart-button"
    const productPageAddToCartButton = page.locator(
        '[data-testid="add-to-cart-button"]',
    );

    await expect(productPageAddToCartButton).toBeVisible();

    await productPageAddToCartButton.click();

    // expect the mui badge 'cart-icon' to have text "3"
    await expect(page.locator('[data-testid="cart-icon"]').first()).toHaveText(
        '3',
    );

    // add a review. component is a mui rating component
    // set rating to 4
    const rating = page.locator('[data-testid="rating"]');
    await expect(rating).toBeVisible();

    // get the 4th star (the 4th label-element)
    const fourthStar = rating.locator('label').nth(3);

    await expect(fourthStar).toBeVisible();

    await fourthStar.click();

    // expect a rating modal to be visible
    await expect(
        page.locator('[data-testid="add-review-modal"]'),
    ).toBeVisible();

    // set review to "This is a great product"
    await page.fill(
        '[data-testid="add-review-input"]',
        'This is a great product',
    );

    // find and click "submit-review-button"
    const submitReviewButton = page.locator(
        '[data-testid="add-review-submit"]',
    );

    await expect(submitReviewButton).toBeVisible();

    await submitReviewButton.click();

    // expect the review modal to be hidden
    await expect(
        page.locator('[data-testid="add-review-modal"]'),
    ).not.toBeVisible();
});
