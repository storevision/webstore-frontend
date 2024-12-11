import type { LinkProps } from 'next/link';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
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
        Icon: InfoRoundedIcon,
    },
    {
        title: 'Cart',
        href: '/cart',
        Icon: CartRoundedIcon,
        align: 'right',
    },
];

export const homeLink = navigation[0].href as string;

export const homeWithWelcome = `${homeLink}?welcome`;

export const searchPageGeneric = '/search';
export const searchPage = (query: string): string =>
    searchPageGeneric + (query ? `?q=${encodeURIComponent(query)}` : '');

export const productPageGeneric = '/product/[id]/[name]';
export const productPage = (id: number, name: string): string =>
    productPageGeneric
        .replace('[id]', id.toString())
        .replace('[name]', name.replace(/ /g, '-').toLowerCase());
export const isProductPage = (path: string): boolean =>
    /^\/product\/\d+\/[a-z0-9-]+$/i.test(path);

export const categoryPageGeneric = '/category/[id]/[name]';
export const categoryPage = (id: number, name: string): string =>
    categoryPageGeneric
        .replace('[id]', id.toString())
        .replace('[name]', name.replace(/ /g, '-').toLowerCase());
export const isCategoryPage = (path: string): boolean =>
    /^\/category\/\d+\/[a-z0-9-]+$/i.test(path);

export const userPages = {
    login: '/login',
    register: '/register',
    account: '/account',
} as const;

export default navigation;
