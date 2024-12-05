'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import Logo from '@public/logo.png';

import MobileNavbar from '@/components/common/MobileNavbar';
import NavbarAvatar from '@/components/common/NavbarAvatar';
import NavButton from '@/components/common/NavButton';

import useIsMobile from '@/hooks/useIsMobile';

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
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const HideOnScroll: FC<Pick<SlideProps, 'children'>> = ({ children }) => {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};

const Navbar: FC = () => {
    const theme = useTheme();
    const isMobile = useIsMobile();
    const user = useUserStore(store => store.user);
    const doLogout = useUserStore(store => store.doLogout);

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const [userAnchorEl, setUserAnchorEl] = useState<HTMLElement | null>(null);

    const handleClickUser = (event: React.MouseEvent<HTMLElement>): void => {
        setUserAnchorEl(event.currentTarget);
    };

    const handleCloseUser = (): void => {
        setUserAnchorEl(null);
    };

    useEffect(() => {
        if (!isMobile) {
            setDrawerOpen(false);
        }
    }, [isMobile]);

    return (
        <HideOnScroll>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {isMobile ? (
                            <Box display="flex" alignItems="center" gap={1}>
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
                        ) : (
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={2}
                                flex={1}
                            >
                                <Link href={homeLink}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={1}
                                    >
                                        <NavbarAvatar>
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
                                                theme.palette.primary
                                                    .contrastText
                                            }
                                            fontWeight="bold"
                                        >
                                            {pageName}
                                        </Typography>
                                    </Box>
                                </Link>
                                <Divider orientation="vertical" flexItem />
                                <Stack direction="row" spacing={1} flex={1}>
                                    {navigation.map(
                                        ({ href, title, Icon, align }) => (
                                            <Link
                                                href={href}
                                                key={title}
                                                data-testid={`nav-${title.toLowerCase()}`}
                                                style={{
                                                    marginLeft:
                                                        align === 'right'
                                                            ? 'auto'
                                                            : undefined,
                                                }}
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
                                <Divider orientation="vertical" flexItem />
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                    marginLeft="auto"
                                >
                                    <NavbarAvatar
                                        src="/undraw_profile_picture.svg"
                                        radius={false}
                                        onClick={handleClickUser}
                                        style={{ cursor: 'pointer' }}
                                        data-testid="nav-user"
                                    />
                                    <Typography
                                        variant="body1"
                                        color={
                                            theme.palette.primary.contrastText
                                        }
                                        data-testid="nav-username"
                                    >
                                        {user?.display_name}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
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
                        href={userPages.login}
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
