import type { LinkProps } from 'next/link';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import type SvgIcon from '@mui/material/SvgIcon';

export interface NavigationItem {
    title: string;
    href: LinkProps['href'];
    icon?: typeof SvgIcon;
    props?: Omit<LinkProps, 'href'>;
}

export type Navigation = NavigationItem[];

const navigation: Navigation = [
    {
        title: 'Home',
        href: '/',
        icon: HomeRoundedIcon,
    },
    {
        title: 'About',
        href: '/about',
    },
];

export default navigation;
