import { expect, test } from '@playwright/test';

// TODO: Add tests for...
//  - if sliders work
//  - if user is able to go to product page
//  - if user is able to go to category page
//  - if user is able to add items to the cart

test('home page should have products', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const categoriesLocator = page.locator('[data-testid="product-category"]');

    const categories = await categoriesLocator.count();

    expect(categories).toBeGreaterThanOrEqual(0);

    // for each category, expect it to have at products
    for await (const index of Array.from({ length: categories }, (_, i) => i)) {
        expect(index).toBeGreaterThanOrEqual(0);

        const category = categoriesLocator.nth(index);

        expect(category).not.toBeNull();

        // expect category to have a name in format of "Products in: {category}" data-testid="category-name"
        const categoryName = await category
            .locator('[data-testid="category-name"]')
            .textContent({ timeout: 3000 });

        console.log({ categoryName });

        expect(categoryName).toContain('Products in:');

        const desktopRow = category.locator(
            '[data-testid="product-slider-desktop"]',
        );

        expect(desktopRow).not.toBeNull();

        const mobileRow = category.locator(
            '[data-testid="product-slider-mobile"]',
        );

        expect(mobileRow).not.toBeNull();

        // cards have a testid in the format of "product-card-{product_id}"
        const desktopProducts = desktopRow.locator(
            '[data-testid^="product-card-"]',
        );

        const mobileProducts = mobileRow.locator(
            '[data-testid^="product-card-"]',
        );

        // console.log all the data-testids from desktop rows
        const desktopProductsList = await desktopProducts.all();

        const mobileProductsList = await mobileProducts.all();

        const desktopProductIds = await Promise.all(
            desktopProductsList.map(async product =>
                product.getAttribute('data-testid'),
            ),
        );

        const mobileProductIds = await Promise.all(
            mobileProductsList.map(async product =>
                product.getAttribute('data-testid'),
            ),
        );

        const deduplicatedDesktopProductIds = Array.from(
            new Set(desktopProductIds),
        );

        const deduplicatedMobileProductIds = Array.from(
            new Set(mobileProductIds),
        );

        const desktopProductsCount = deduplicatedDesktopProductIds.length;

        const mobileProductsCount = deduplicatedMobileProductIds.length;

        expect(desktopProductsCount).toBe(mobileProductsCount);
    }
});
