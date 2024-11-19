'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-inter)',
    },
    palette: {
        primary: {
            main: '#ff9006',
        },
        secondary: {
            main: '#2F4465',
        },
        white: {
            main: '#ffffff',
            light: '#f5f5f5',
            dark: '#e0e0e0',
            contrastText: '#000000',
        },
    },
});

export default theme;
