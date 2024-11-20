import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import type { FC, PropsWithChildren } from 'react';
import React from 'react';

import { pageDescription, pageName } from '@/constants';
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

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
    <html lang="en">
        <body className={`${interFont.variable}`}>
            <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline enableColorScheme />
                    {children}
                </ThemeProvider>
            </AppRouterCacheProvider>
        </body>
    </html>
);

export default RootLayout;
