import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import type { FC, PropsWithChildren } from 'react';
import React from 'react';

import { getCartItems } from '@/app/_api/cart';
import { getCategories } from '@/app/_api/categories';
import { getProducts } from '@/app/_api/products';
import { getUser, getUserSettings } from '@/app/_api/users';

import { pageDescription, pageName } from '@/constants';
import CartStoreProvider from '@/providers/CartStoreProvider';
import ProductsStoreProvider from '@/providers/ProductsStoreProvider';
import UserStoreProvider from '@/providers/UserStoreProvider';
import theme from '@/theme';

import './globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const interFont = Inter({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: {
        template: `%s | ${pageName}`,
        default: pageName,
    },
    description: pageDescription,
};

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
    const userResponse = await getUser();
    const user = userResponse?.success ? userResponse.data : undefined;

    const userSettingsResponse = await getUserSettings();
    const userSettings = userSettingsResponse?.success
        ? userSettingsResponse.data
        : undefined;

    const productsResponse = await getProducts();
    const products = productsResponse?.success
        ? productsResponse.data
        : undefined;

    const categoriesResponse = await getCategories();
    const categories = categoriesResponse?.success
        ? categoriesResponse.data
        : undefined;

    const cartResponse = await getCartItems();
    const cartItems = cartResponse?.success ? cartResponse.data : undefined;

    return (
        <html lang="en">
            <body className={`${interFont.variable}`}>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline enableColorScheme />
                        <UserStoreProvider userState={{ user, userSettings }}>
                            <ProductsStoreProvider
                                productsState={{ products, categories }}
                            >
                                <CartStoreProvider cartState={{ cartItems }}>
                                    {children}
                                </CartStoreProvider>
                            </ProductsStoreProvider>
                        </UserStoreProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
};

export default RootLayout;
