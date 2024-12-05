'use client';

import { pagePrimaryColor, pageSecondaryColor } from '@/constants';

import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
    typography: {
        fontFamily: 'var(--font-inter)',
    },
    palette: {
        primary: {
            main: pagePrimaryColor,
        },
        secondary: {
            main: pageSecondaryColor,
        },
        white: {
            main: '#ffffff',
            light: '#f5f5f5',
            dark: '#e0e0e0',
            contrastText: '#000000',
        },
        black: {
            main: '#000000',
            light: '#212121',
            dark: '#000000',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
    },
});

const theme = createTheme(
    {
        components: {
            MuiButton: {
                styleOverrides: {
                    root: { borderRadius: baseTheme.shape.borderRadius * 2 },
                },
            },
            MuiFilledInput: {
                styleOverrides: {
                    root: {
                        borderTopLeftRadius: baseTheme.shape.borderRadius * 2,
                        borderTopRightRadius: baseTheme.shape.borderRadius * 2,
                    },
                },
            },
        },
    },
    baseTheme,
);

export default theme;
