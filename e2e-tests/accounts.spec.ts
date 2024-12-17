import { expect, test } from '@playwright/test';

test('should navigate to the login page', async ({ page, context }) => {
    const user = {
        email: `test+${Date.now()}+${context.browser()?.browserType().name()}@example.com`,
        displayName: `Test User${Date.now()}`,
        password: `password${Date.now()}`,
    };

    await page.goto('http://localhost:3000');

    await expect(page.getByTestId('nav-user-menu')).not.toBeVisible();

    // find element with the test-id "nav-user"
    const accountsButton = page.getByTestId('nav-user-desktop');

    await expect(accountsButton).toBeVisible();

    await accountsButton.click();

    // menu should be visible
    await expect(page.getByTestId('nav-user-menu')).toBeVisible();

    // find element with the test-id "nav-login"
    const loginButton = page.getByTestId('nav-login');

    await loginButton.click();

    // assert the URL is correct
    await expect(page).toHaveURL('http://localhost:3000/login?redirect=%2F');

    // assert the 404 page is not visible
    await expect(page.getByText('404')).not.toBeVisible();

    // assert the page title is correct
    await expect(page.title()).resolves.toContain('Login');

    // navigate to the register page
    const registerButton = page.getByTestId('register-button');

    await registerButton.click();

    // assert the URL is correct
    await expect(page).toHaveURL('http://localhost:3000/register?redirect=%2F');

    // assert the 404 page is not visible
    await expect(page.getByText('404')).not.toBeVisible();

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

    /* console.warn(
        'Cookies2',
        await context.cookies(),
        context.browser()?.browserType().name(),
    ); */

    // error message should not be visible
    await expect(page.getByTestId('generic-error-message')).not.toBeVisible();

    // fill in email incorrect email
    await page.fill('[data-testid=email-input]', 'foo');

    // fill in display name
    await page.fill('[data-testid=display-name-input]', user.displayName);

    // fill in password
    await page.fill('[data-testid=password-input]', user.password);

    // fill in password confirmation
    await page.fill('[data-testid=password-confirmation-input]', user.password);

    // submit the form
    await page.click('[data-testid=register-button]');

    // assert the error message is not empty
    /*
    await expect(page.getByTestId('email-error')).toBeVisible();

    await expect(page.getByTestId('email-error')).toHaveText(
        'Please enter a valid email address.',
    );
    */
    // above does not work because input[type=email] does not allow invalid email addresses
    // instead, check if email field is focused
    await expect(page.getByTestId('email-input')).toBeFocused();

    // fill in correct email
    await page.fill('[data-testid=email-input]', user.email);

    // fill in password with less than 8 characters
    await page.fill('[data-testid=password-input]', 'pass');

    // fill in password confirmation
    await page.fill('[data-testid=password-confirmation-input]', 'pass');

    // submit the form
    await page.click('[data-testid=register-button]');

    // assert the error message is not empty
    await expect(page.getByTestId('password-error')).toBeVisible();

    await expect(page.getByTestId('password-error')).toHaveText(
        'Password must be at least 8 characters long.',
    );

    // fill in correct password
    await page.fill('[data-testid=password-input]', user.password);

    // fill in password confirmation
    await page.fill('[data-testid=password-confirmation-input]', user.password);

    // submit the form
    await page.click('[data-testid=register-button]');

    // assert the URL is correct
    await expect(page).toHaveURL('http://localhost:3000/');

    /* console.warn(
        'Cookies1',
        await context.cookies(),
        context.browser()?.browserType().name(),
    ); */

    // assert that the welcome modal is visible
    await expect(page.getByTestId('welcome-modal')).toBeVisible();

    // assert that the welcome modal has the correct text
    await expect(page.getByTestId('welcome-modal')).toContainText(
        `Welcome, ${user.displayName}!`,
    );

    // close the welcome modal
    await page.click('[data-testid=welcome-modal-close]');

    // assert that the username is visible
    await expect(page.getByTestId('nav-username')).toBeVisible();

    await expect(page.getByTestId('nav-username')).toHaveText(
        `Hello, ${user.displayName}`,
    );

    // reload the page
    await page.reload();

    /* console.warn(
        'Cookies3',
        await context.cookies(),
        context.browser()?.browserType().name(),
    ); */

    // assert that the username is still visible
    await expect(page.getByTestId('nav-username')).toBeVisible();

    await expect(page.getByTestId('nav-username')).toHaveText(
        `Hello, ${user.displayName}`,
    );

    // find element with the test-id "nav-user"
    const userButton = page.getByTestId('nav-user-desktop');

    await userButton.click();

    // menu should be visible
    await expect(page.getByTestId('nav-user-menu')).toBeVisible();

    // find element with the test-id "nav-logout"
    const logoutButton = page.getByTestId('nav-logout');

    await logoutButton.click();

    // assert the URL is correct
    await expect(page).toHaveURL('http://localhost:3000/');

    // assert the 404 page is not visible
    await expect(page.getByText('404')).not.toBeVisible();

    // assert the page title is correct
    await expect(page.title()).resolves.toContain('Home');

    await expect(page.getByTestId('nav-username')).toBeVisible();
    await expect(page.getByTestId('nav-username')).toHaveText('Hello, User');

    // find element with the test-id "nav-user"
    const accountsButton2 = page.getByTestId('nav-user-desktop');

    await expect(accountsButton2).toBeVisible();

    await accountsButton2.click();

    // menu should be visible
    await expect(page.getByTestId('nav-user-menu')).toBeVisible();

    // find element with the test-id "nav-login"
    const loginButton2 = page.getByTestId('nav-login');

    await loginButton2.click();

    // assert the URL is correct
    await expect(page).toHaveURL('http://localhost:3000/login?redirect=%2F');

    // login form should be visible
    await expect(page.getByTestId('login-form')).toBeVisible();

    // email input should be visible
    await expect(page.getByTestId('email-input')).toBeVisible();

    // password input should be visible
    await expect(page.getByTestId('password-input')).toBeVisible();

    // keep logged in checkbox should be visible
    await expect(page.getByTestId('keep-logged-in-checkbox')).toBeVisible();

    // submit button should be visible
    await expect(page.getByTestId('login-button')).toBeVisible();

    // error message should not be visible
    await expect(page.getByTestId('error-message')).not.toBeVisible();

    // fill in incorrect email
    await page.fill('[data-testid=email-input]', 'foo');

    // fill in password
    await page.fill('[data-testid=password-input]', user.password);

    // submit the form
    await page.click('[data-testid=login-button]');

    // assert the error message is not empty
    /*
    await expect(page.getByTestId('email-error')).toBeVisible();

    await expect(page.getByTestId('email-message')).toHaveText(
        'Invalid email or password.',
    );
    */
    // above does not work because input[type=email] does not allow invalid email addresses
    // instead, check if email field is focused
    await expect(page.getByTestId('email-input')).toBeFocused();

    // fill in valid but non-existing email
    await page.fill(
        '[data-testid=email-input]',
        `foo+${Date.now()}@example.com`,
    );

    // submit the form
    await page.click('[data-testid=login-button]');

    // assert the error message is not empty
    await expect(page.getByTestId('error-message')).toBeVisible();

    await expect(page.getByTestId('error-message')).toHaveText(
        'Invalid email or password.',
    );

    // fill in correct email
    await page.fill('[data-testid=email-input]', user.email);

    // submit the form
    await page.click('[data-testid=login-button]');

    // assert the error message is empty
    await expect(page.getByTestId('error-message')).not.toBeVisible();

    // assert the URL is correct
    await expect(page).toHaveURL('http://localhost:3000/');

    // username should be visible
    await expect(page.getByTestId('nav-username')).toBeVisible();

    await expect(page.getByTestId('nav-username')).toHaveText(
        `Hello, ${user.displayName}`,
    );
});
