import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import type { FC, PropsWithChildren } from 'react';
import React from 'react';

import { getCategories } from '@/app/_api/categories';
import { getProducts } from '@/app/_api/products';
import { getUser } from '@/app/_api/users';

import { pageDescription, pageName } from '@/constants';
import { ProductsStoreProvider } from '@/providers/productsStoreProvider';
import { UserStoreProvider } from '@/providers/userStoreProvider';
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

    const productsResponse = await getProducts();
    const products = productsResponse?.success
        ? productsResponse.data
        : undefined;

    const categoriesResponse = await getCategories();
    const categories = categoriesResponse?.success
        ? categoriesResponse.data
        : undefined;

    return (
        <html lang="en">
            <body className={`${interFont.variable}`}>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline enableColorScheme />
                        <UserStoreProvider userState={{ user }}>
                            <ProductsStoreProvider
                                productsState={{ products, categories }}
                            >
                                {children}
                            </ProductsStoreProvider>
                        </UserStoreProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
};

export default RootLayout;
