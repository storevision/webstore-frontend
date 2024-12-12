'use client';

import { pagePrimaryColor, pageSecondaryColor } from '@/constants';

import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
    cssVariables: true,
    typography: {
        fontFamily: 'var(--font-inter)',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 700,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 700,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 700,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 700,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 700,
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 400,
            letterSpacing: 'normal',
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            letterSpacing: 'normal',
        },
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
            MuiContainer: {
                // change widths
                styleOverrides: {
                    maxWidthLg: {
                        '@media (min-width: 1280px)': {
                            maxWidth: '1280px',
                        },
                    },
                },
            },
        },
    },
    baseTheme,
);

export default theme;
