import { expect, test } from '@playwright/test';

test('ordering items should work', async ({ page, context }) => {
    const user = {
        email: `test+${Date.now()}+${context
            .browser()
            ?.browserType()
            .name()}@example.com`,
        displayName: `Test User${Date.now()}`,
        password: `password${Date.now()}`,
    };

    // all fields should not be empty
    expect(user.email).not.toBeNull();
    expect(user.displayName).not.toBeNull();
    expect(user.password).not.toBeNull();

    expect(user.email).not.toBe('');
    expect(user.displayName).not.toBe('');
    expect(user.password).not.toBe('');

    const reviewText = `This is a great product - ${Date.now()}`;

    await page.goto('http://localhost:3000/register');

    // assert the page title is correct
    await expect(page.title()).resolves.toContain('Register');

    // register form should be visible
    await expect(page.getByTestId('register-form')).toBeVisible();

    // email input should be visible
    await expect(page.getByTestId('email-input')).toBeVisible();

    // display name input should be visible
    await expect(page.getByTestId('display-name-input')).toBeVisible();

    // password input should be visible
    await expect(page.getByTestId('password-input')).toBeVisible();

    // password confirmation input should be visible
    await expect(page.getByTestId('password-confirmation-input')).toBeVisible();

    // submit button should be visible
    await expect(page.getByTestId('register-button')).toBeVisible();

    await expect(page.getByTestId('generic-error-message')).not.toBeVisible();

    await page.fill('[data-testid=email-input]', user.email);

    await page.fill('[data-testid=display-name-input]', user.displayName);

    await page.fill('[data-testid=password-input]', user.password);

    await page.fill('[data-testid=password-confirmation-input]', user.password);

    // make sure input fields are filled
    await expect(page.locator('[data-testid=email-input]')).toHaveValue(
        user.email,
    );

    await expect(page.locator('[data-testid=display-name-input]')).toHaveValue(
        user.displayName,
    );

    await expect(page.locator('[data-testid=password-input]')).toHaveValue(
        user.password,
    );

    await expect(
        page.locator('[data-testid=password-confirmation-input]'),
    ).toHaveValue(user.password);

    await page.click('[data-testid=register-button]');

    await page.waitForLoadState('networkidle');

    await page.waitForURL('http://localhost:3000/');

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

    expect(await productCards.count()).toBeGreaterThanOrEqual(3);

    const firstCard = productCards.first();

    const secondCard = productCards.nth(1);

    const thirdCard = productCards.nth(2);

    await expect(firstCard).toBeVisible();

    const addToCartButton = firstCard.locator(
        '[data-testid="add-to-cart-button"]',
    );

    await expect(addToCartButton).toBeVisible();

    await addToCartButton.click();

    // expect the mui badge 'cart-icon' to have text "3"
    await expect(page.locator('[data-testid="cart-icon"]').first()).toHaveText(
        '1',
    );

    await expect(secondCard).toBeVisible();

    const secondAddToCartButton = secondCard.locator(
        '[data-testid="add-to-cart-button"]',
    );

    await expect(secondAddToCartButton).toBeVisible();

    await secondAddToCartButton.click();

    // expect the mui badge 'cart-icon' to have text "3"
    await expect(page.locator('[data-testid="cart-icon"]').first()).toHaveText(
        '2',
    );

    await expect(thirdCard).toBeVisible();

    const thirdAddToCartButton = thirdCard.locator(
        '[data-testid="add-to-cart-button"]',
    );

    await expect(thirdAddToCartButton).toBeVisible();

    await thirdAddToCartButton.click();

    // expect the mui badge 'cart-icon' to have text "3"
    await expect(page.locator('[data-testid="cart-icon"]').first()).toHaveText(
        '3',
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

    // expect the mui badge 'cart-icon' to have text "5"
    await expect(page.locator('[data-testid="cart-icon"]').first()).toHaveText(
        '5',
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
    await page.fill('[data-testid="add-review-input"]', reviewText);

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

    // expect there to be at least one review. Search in 'reviews' for username and review text. 'reviews' is the container for all reviews
    const reviews = page.locator('[data-testid="reviews"]');

    await expect(reviews).toBeVisible();

    // there can be multiple reviews, so we need to find the correct one
    const userReviews = reviews.locator('[data-testid="user-review"]');

    // find the one review with the correct text
    const review = userReviews.locator(`:text("${reviewText}")`);

    await expect(review).toBeVisible();

    // expect review count to be 1
    await expect(review).toHaveCount(1);

    // find and click "cart-icon"
    const cartIcon = page.locator('[data-testid="cart-icon"]');

    await expect(cartIcon).toBeVisible();

    await cartIcon.click();

    // expect the URL to be correct (http://localhost:3000/cart)
    await expect(page).toHaveURL('http://localhost:3000/cart');

    // expect the cart to have 1 item
    const cartItems = page.locator('[data-testid^="cart-item-card-"]');
    await expect(cartItems).toHaveCount(3);

    const cartItem = cartItems.first();

    const quantity = cartItem
        .locator('[data-testid="cart-item-quantity"]')
        .first();

    // expect the quantity to be 3
    await expect(quantity).toHaveText('3');

    const secondCartItem = cartItems.nth(1);

    const secondQuantity = secondCartItem
        .locator('[data-testid="cart-item-quantity"]')
        .first();

    // expect the quantity to be 1
    await expect(secondQuantity).toHaveText('1');

    const thirdCartItem = cartItems.nth(2);

    const thirdQuantity = thirdCartItem
        .locator('[data-testid="cart-item-quantity"]')
        .first();

    // expect the quantity to be 1
    await expect(thirdQuantity).toHaveText('1');

    // get the testid attribute of the third cart item
    const thirdCartItemTestId = await thirdCartItem.getAttribute('data-testid');

    expect(thirdCartItemTestId).not.toBeNull();

    // click on the 2nd cart item's "remove" button
    const secondRemoveButton = secondCartItem.locator(
        '[data-testid="cart-item-remove"]',
    );

    await expect(secondRemoveButton).toBeVisible();

    await secondRemoveButton.click();

    // expect the cart to have 2 items
    await expect(cartItems).toHaveCount(2);

    // second cart item should still be visible
    await expect(secondCartItem).toBeVisible();

    // secondCartItem testid should match value from earlier
    const secondCartItemTestId =
        await secondCartItem.getAttribute('data-testid');

    expect(secondCartItemTestId).not.toBeNull();

    expect(secondCartItemTestId).toEqual(thirdCartItemTestId);

    // click on add button for the 3rd cart item
    const addButton = secondCartItem.locator('[data-testid="cart-item-add"]');

    await expect(addButton).toBeVisible();

    await addButton.click();

    const secondQuantityAfterAdd = secondCartItem
        .locator('[data-testid="cart-item-quantity"]')
        .first();

    // expect the quantity to be 2
    await expect(secondQuantityAfterAdd).toHaveText('2');

    // click on the 3rd cart item's "remove" button
    const removeButton = secondCartItem.locator(
        '[data-testid="cart-item-delete"]',
    );

    await expect(removeButton).toBeVisible();

    await removeButton.click();

    // expect the cart to have 1 item
    await expect(cartItems).toHaveCount(1);

    // press the "checkout" button
    const checkoutButton = page.locator('[data-testid="cart-checkout"]');

    await expect(checkoutButton).toBeVisible();

    await checkoutButton.click();

    // should redirect because no address saved
    await expect(page).toHaveURL(
        'http://localhost:3000/profile?hasAddresses=false',
    );

    // add an address
    const addressData = {
        name: 'Hans Muster',
        street: 'Musterstrasse 123',
        postal_code: '12345',
        city: 'Musterstadt',
        country: 'Musterland',
        state: 'Musterstate',
    };

    await page.fill('[data-testid="new-address-name"]', addressData.name);

    await page.fill('[data-testid="new-address-address"]', addressData.street);

    await page.fill(
        '[data-testid="new-address-postal-code"]',
        addressData.postal_code,
    );

    await page.fill('[data-testid="new-address-city"]', addressData.city);

    await page.fill('[data-testid="new-address-country"]', addressData.country);

    await page.fill('[data-testid="new-address-state"]', addressData.state);

    const saveAddressButton = page.locator(
        '[data-testid="save-address-button"]',
    );

    await expect(saveAddressButton).toBeVisible();

    await saveAddressButton.click();

    // no error should be shown
    await expect(
        page.locator('[data-testid="save-address-error"]'),
    ).not.toBeVisible();

    // loading spinner should be shown
    await expect(
        page.locator('[data-testid="save-address-loading"]'),
    ).toBeVisible();

    // wait for the loading spinner to disappear
    await page.waitForSelector('[data-testid="save-address-loading"]', {
        state: 'hidden',
    });

    // wait for page to reload
    await page.waitForTimeout(1000); // Not happy with this but it will work

    // expect the address to be saved
    const address = page.locator('[data-testid="user-address"]');

    expect(await address.count()).toBeGreaterThan(0);

    // go back to the checkout page
    await page.goto('http://localhost:3000/checkout', {
        waitUntil: 'networkidle',
    });

    // expect the URL to be correct (http://localhost:3000/checkout)
    await expect(page).toHaveURL('http://localhost:3000/checkout');

    // check if radio is checked
    const muiRadio = page.locator('[data-testid="checkout-address-0-radio"]');

    await expect(muiRadio).toBeVisible();

    const radio = muiRadio.locator('input');

    await expect(radio).toBeChecked();

    // press the "checkout" button
    const checkoutButton2 = page.locator('[data-testid="checkout-button"]');
    await expect(checkoutButton2).toBeVisible();

    await checkoutButton2.click();

    await page.waitForLoadState('networkidle');

    // expect the URL to be correct (http://localhost:3000/)
    await expect(page).toHaveURL('http://localhost:3000/');

    // go to orders page
    await page.goto('http://localhost:3000/orders', {
        waitUntil: 'networkidle',
    });

    // expect the URL to be correct (http://localhost:3000/orders)
    await expect(page).toHaveURL('http://localhost:3000/orders');

    // order-item should be visible
    const orderItem = page.locator('[data-testid="order-item"]');

    // should have count 1
    await expect(orderItem).toHaveCount(1);

    // order item should have the correct text
    await expect(orderItem).toBeVisible();
});
