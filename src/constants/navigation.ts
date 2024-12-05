import type { LinkProps } from 'next/link';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import type SvgIcon from '@mui/material/SvgIcon';

export interface NavigationItem {
    title: string;
    href: LinkProps['href'];
    props?: Omit<LinkProps, 'href'>;
    align?: 'left' | 'right';
    Icon?: typeof SvgIcon;
}

export type Navigation = NavigationItem[];

const navigation: Navigation = [
    {
        title: 'Home',
        href: '/',
        Icon: HomeRoundedIcon,
    },
    {
        title: 'About',
        href: '/about',
    },
    {
        title: 'Cart',
        href: '/cart',
        Icon: CartRoundedIcon,
        align: 'right',
    },
];

export const homeLink = navigation[0].href as string;

export const userPages = {
    login: '/login',
    register: '/register',
} as const;

export default navigation;
