'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

import Logo from '@public/logo.png';

import MobileNavbar from '@/components/common/MobileNavbar';
import NavbarAvatar from '@/components/common/NavbarAvatar';
import NavButton from '@/components/common/NavButton';

import { pageName } from '@/constants';
import navigation, { homeLink } from '@/constants/navigation';

import MenuIcon from '@mui/icons-material/Menu';
import type { SlideProps } from '@mui/material';
import { useMediaQuery, useScrollTrigger, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useIsMobile from '@/hooks/useIsMobile';

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

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

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
                            </Box>
                        )}
                    </Toolbar>
                </Container>
                <MobileNavbar
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                />
            </AppBar>
        </HideOnScroll>
    );
};

export default Navbar;
