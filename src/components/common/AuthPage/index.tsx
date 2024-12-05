'use client';

import Image from 'next/image';

import type { FC } from 'react';
import React from 'react';

import Logo from '@public/logo.png';

import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: theme.palette.background.default,
}));

const ComponentBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius * 8,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
        width: '100%',
        minHeight: '50%',
    },
    [theme.breakpoints.up('md')]: {
        width: '50%',
        minHeight: '75%',
    },
    [theme.breakpoints.up('lg')]: {
        width: '25%',
        minHeight: '50%',
    },
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.background.paper,
}));

export const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    width: '100%',
}));

export interface AuthPageProps {
    children: React.ReactNode;
    title: string;
}

const AuthPage: FC<AuthPageProps> = ({ children, title }) => (
    <StyledBox>
        <ComponentBox>
            <Image
                src={Logo}
                alt="Logo"
                loading="lazy"
                width={100}
                height={100}
            />
            <Typography
                variant="h5"
                component="h1"
                color="textPrimary"
                gutterBottom
            >
                {title}
            </Typography>
            <Divider flexItem sx={{ marginBottom: 2 }} />
            {children}
        </ComponentBox>
    </StyledBox>
);

export default AuthPage;
