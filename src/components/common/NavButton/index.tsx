'use client';

import { usePathname } from 'next/navigation';

import type { FC } from 'react';
import React from 'react';

import type { NavigationItem } from '@/constants/navigation';

import { styled } from '@mui/material';
import Button from '@mui/material/Button';

export type NavButtonProps = Pick<NavigationItem, 'Icon' | 'title' | 'href'>;

const CustomButton = styled(Button, {
    shouldForwardProp: propName => propName !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
    borderRadius: theme.shape.borderRadius,

    // hover
    '&:hover': {
        backgroundColor: theme.palette.white.light,
        color: theme.palette.getContrastText(theme.palette.white.light),
    },

    ...(active
        ? {
              borderBottom: `2px solid ${theme.palette.primary.contrastText}`,
              borderColor: theme.palette.primary.contrastText,
              color: theme.palette.primary.contrastText,
              fontWeight: theme.typography.fontWeightBold,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
          }
        : {
              // styles for text
              color: theme.palette.primary.contrastText,
              fontWeight: theme.typography.fontWeightBold,
          }),
}));

const NavButton: FC<NavButtonProps> = ({ href, Icon, title }) => {
    const pathname = usePathname();

    return (
        <CustomButton
            variant="text"
            active={pathname === href}
            startIcon={Icon ? <Icon /> : undefined}
        >
            {title}
        </CustomButton>
    );
};

export default NavButton;
