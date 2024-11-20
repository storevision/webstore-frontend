'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { FC } from 'react';
import React, { useState } from 'react';

import Logo from '@public/logo.png';

import { pageName } from '@/constants';
import navigation, { homeLink } from '@/constants/navigation';

import MenuIcon from '@mui/icons-material/Menu';
import type { SlideProps } from '@mui/material';
import {
    styled,
    useMediaQuery,
    useScrollTrigger,
    useTheme,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const NavButton = styled(Button)(({ theme }) => ({
    // styles for outlined
    borderWidth: 2,
    borderRadius: theme.shape.borderRadius,

    '&.MuiButton-outlined': {
        borderColor: theme.palette.primary.contrastText,
        color: theme.palette.primary.contrastText,
        fontWeight: theme.typography.fontWeightBold,
    },
    // styles for text
    '&.MuiButton-text': {
        color: theme.palette.primary.contrastText,
        fontWeight: theme.typography.fontWeightBold,
    },

    // hover
    '&:hover': {
        backgroundColor: theme.palette.white.light,
        color: theme.palette.getContrastText(theme.palette.white.light),
    },
}));

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
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const pathname = usePathname();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseNavMenu = (): void => {
        setAnchorEl(null);
    };

    return (
        <HideOnScroll>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {isMobile ? (
                            <Box display="flex" alignItems="center" gap={1}>
                                <IconButton
                                    onClick={handleOpenNavMenu}
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
                            <Box display="flex" alignItems="center" gap={2}>
                                <Link href={homeLink}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={1}
                                    >
                                        <Avatar>
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
                                        </Avatar>
                                        <Typography
                                            variant="h6"
                                            color={
                                                theme.palette.primary
                                                    .contrastText
                                            }
                                        >
                                            {pageName}
                                        </Typography>
                                    </Box>
                                </Link>
                                <Divider orientation="vertical" flexItem />
                                <Stack direction="row" spacing={1}>
                                    {navigation.map(item => (
                                        <Link href={item.href} key={item.title}>
                                            <NavButton
                                                variant={
                                                    pathname === item.href
                                                        ? 'outlined'
                                                        : 'text'
                                                }
                                            >
                                                {item.title}
                                            </NavButton>
                                        </Link>
                                    ))}
                                </Stack>
                            </Box>
                        )}
                    </Toolbar>
                </Container>
                <Drawer
                    anchor="left"
                    open={Boolean(anchorEl)}
                    onClose={handleCloseNavMenu}
                >
                    <Box sx={{ width: 250 }} role="presentation">
                        <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            gap={3}
                            width="100%"
                            padding={1}
                            bgcolor={theme.palette.primary.main}
                            boxShadow={theme.shadows[3]}
                        >
                            <Avatar>
                                <Image
                                    src={Logo}
                                    alt="Logo"
                                    loading="lazy"
                                    width={100}
                                    height={100}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </Avatar>
                            <Typography
                                variant="h6"
                                align="center"
                                color={theme.palette.primary.contrastText}
                            >
                                {pageName}
                            </Typography>
                        </Box>
                        <List>
                            {navigation.map(item => (
                                <Link href={item.href} key={item.title}>
                                    <ListItem key={item.title} disablePadding>
                                        <ListItemButton
                                            onClick={handleCloseNavMenu}
                                        >
                                            {item.icon ? (
                                                <ListItemIcon>
                                                    <item.icon />
                                                </ListItemIcon>
                                            ) : null}
                                            <ListItemText
                                                primary={item.title}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </AppBar>
        </HideOnScroll>
    );
};

export default Navbar;
