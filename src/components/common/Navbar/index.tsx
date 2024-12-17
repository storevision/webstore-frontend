'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import Logo from '@public/logo.png';

import MobileNavbar from '@/components/common/MobileNavbar';
import NavbarAvatar from '@/components/common/NavbarAvatar';
import NavButton from '@/components/common/NavButton';
import ProductSearchbar from '@/components/common/ProductSearchbar';

import useIsMobile from '@/hooks/useIsMobile';
import useMobileBreakpoint from '@/hooks/useMobileBreakpoint';

import { pageName } from '@/constants';
import navigation, { homeLink, userPages } from '@/constants/navigation';
import { useUserStore } from '@/providers/userStoreProvider';

import ProfileIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import type { SlideProps } from '@mui/material';
import { useScrollTrigger, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const HideOnScroll: FC<
    Pick<SlideProps, 'children'> & { disabled?: boolean }
> = ({ children, disabled = false }) => {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={disabled || !trigger}>
            {children}
        </Slide>
    );
};

export interface NavbarProps {
    withSearch?: boolean;
}

const leftNavigation = navigation.filter(({ align }) => align !== 'right');
const rightNavigation = navigation.filter(({ align }) => align === 'right');

const Navbar: FC<NavbarProps> = ({ withSearch }) => {
    const theme = useTheme();
    const isMobileCheck = useIsMobile();
    const mobileBreakpoint = useMobileBreakpoint();
    const user = useUserStore(store => store.user);
    const doLogout = useUserStore(store => store.doLogout);
    const pathname = usePathname();

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const [userAnchorEl, setUserAnchorEl] = useState<HTMLElement | null>(null);

    const handleClickUser = (event: React.MouseEvent<HTMLElement>): void => {
        setUserAnchorEl(event.currentTarget);
    };

    const handleCloseUser = (): void => {
        setUserAnchorEl(null);
    };

    useEffect(() => {
        if (!isMobileCheck) {
            setDrawerOpen(false);
        }
    }, [isMobileCheck]);

    return (
        <HideOnScroll disabled>
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box
                            sx={{
                                display: 'none',
                                [mobileBreakpoint]: {
                                    display: 'flex',
                                },
                            }}
                            alignItems="center"
                            justifyContent="space-between"
                            flex={1}
                        >
                            <Box
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                gap={1}
                            >
                                <IconButton
                                    onClick={() => setDrawerOpen(true)}
                                    style={{
                                        color: theme.palette.primary
                                            .contrastText,
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography
                                    variant="h6"
                                    color={theme.palette.primary.contrastText}
                                >
                                    {pageName}
                                </Typography>
                            </Box>
                            <Box>
                                {user?.picture_data_url?.length ? (
                                    <NavbarAvatar
                                        src={user.picture_data_url}
                                        radius={false}
                                        onClick={handleClickUser}
                                        style={{ cursor: 'pointer' }}
                                        data-testid="nav-user"
                                    />
                                ) : (
                                    <NavbarAvatar
                                        src="/undraw_profile_picture.svg"
                                        radius={false}
                                        padding={0}
                                        onClick={handleClickUser}
                                        style={{ cursor: 'pointer' }}
                                        data-testid="nav-user"
                                    />
                                )}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                [mobileBreakpoint]: {
                                    display: 'none',
                                },
                            }}
                            alignItems="center"
                            gap={2}
                            flex={1}
                        >
                            <Link href={homeLink}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <NavbarAvatar padding={0}>
                                        <Image
                                            src={Logo}
                                            alt="Logo"
                                            loading="lazy"
                                            width={100}
                                            height={100}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                        />
                                    </NavbarAvatar>
                                    <Typography
                                        variant="h6"
                                        color={
                                            theme.palette.primary.contrastText
                                        }
                                        fontWeight="bold"
                                    >
                                        {pageName}
                                    </Typography>
                                </Box>
                            </Link>
                            <Box
                                display="flex"
                                flex={1}
                                justifyContent="space-between"
                                alignItems="center"
                                gap={3}
                            >
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    flex="0 1 auto"
                                >
                                    {leftNavigation.map(
                                        ({ href, title, Icon }) => (
                                            <Link
                                                href={href}
                                                key={title}
                                                data-testid={`nav-${title.toLowerCase()}`}
                                            >
                                                <NavButton
                                                    Icon={Icon}
                                                    title={title}
                                                    href={href}
                                                />
                                            </Link>
                                        ),
                                    )}
                                </Stack>
                                {withSearch ? (
                                    <Box flex="1 1 auto" marginY={1}>
                                        <ProductSearchbar
                                            fullWidth
                                            disableSpacing
                                            zIndex={theme.zIndex.appBar + 1}
                                        />
                                    </Box>
                                ) : null}
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    justifyContent="flex-end"
                                    flex="0 1 auto"
                                >
                                    {rightNavigation.map(
                                        ({ href, title, Icon }) => (
                                            <Link
                                                href={href}
                                                key={title}
                                                data-testid={`nav-${title.toLowerCase()}`}
                                            >
                                                <NavButton
                                                    Icon={Icon}
                                                    title={title}
                                                    href={href}
                                                />
                                            </Link>
                                        ),
                                    )}
                                </Stack>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                marginLeft="auto"
                            >
                                {user?.picture_data_url?.length ? (
                                    <NavbarAvatar
                                        src={user.picture_data_url}
                                        radius={false}
                                        onClick={handleClickUser}
                                        style={{ cursor: 'pointer' }}
                                        data-testid="nav-user"
                                    />
                                ) : (
                                    <NavbarAvatar
                                        src="/undraw_profile_picture.svg"
                                        radius={false}
                                        padding={0}
                                        onClick={handleClickUser}
                                        style={{ cursor: 'pointer' }}
                                        data-testid="nav-user"
                                    />
                                )}
                                {/* Doing padding like this for alignment is bad but i am lazy */}
                                <Box pt={0.5}>
                                    <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                        lineHeight={1}
                                        color={
                                            theme.palette.primary.contrastText
                                        }
                                        data-testid="nav-username"
                                    >
                                        Hello, {user?.display_name || 'User'}
                                    </Typography>
                                    {user ? (
                                        <Typography
                                            variant="body2"
                                            color={
                                                theme.palette.primary
                                                    .contrastText
                                            }
                                            data-testid="nav-email"
                                        >
                                            Account
                                        </Typography>
                                    ) : null}
                                </Box>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
                <MobileNavbar
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                />
                <Menu
                    open={Boolean(userAnchorEl)}
                    anchorEl={userAnchorEl}
                    onClose={handleCloseUser}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    style={{ marginTop: 4 }}
                    data-testid="nav-user-menu"
                    slotProps={{
                        paper: {
                            sx: {
                                minWidth: {
                                    xs: 120,
                                    sm: 200,
                                },
                            },
                        },
                    }}
                >
                    <MenuItem
                        style={{ display: !user ? 'none' : undefined }}
                        data-testid="nav-profile"
                    >
                        <ListItemIcon>
                            <ProfileIcon />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            doLogout().then(() => handleCloseUser());
                        }}
                        style={{ display: !user ? 'none' : undefined }}
                        data-testid="nav-logout"
                    >
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                    <Link
                        href={{
                            pathname: userPages.login,
                            query: { redirect: pathname },
                        }}
                        style={{ display: user ? 'none' : undefined }}
                        data-testid="nav-login"
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <ProfileIcon />
                            </ListItemIcon>
                            <ListItemText>Login</ListItemText>
                        </MenuItem>
                    </Link>
                </Menu>
            </AppBar>
        </HideOnScroll>
    );
};

export default Navbar;
