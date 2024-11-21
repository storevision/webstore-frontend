'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { FC } from 'react';

import Logo from '@public/logo.png';

import NavbarAvatar from '@/components/common/NavbarAvatar';

import { pageName } from '@/constants';
import navigation from '@/constants/navigation';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export interface MobileNavbarProps {
    open: boolean;
    onClose: () => void;
}

const MobileNavbar: FC<MobileNavbarProps> = ({ open, onClose }) => {
    const theme = useTheme();

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
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
                    <NavbarAvatar>
                        <Image
                            src={Logo}
                            alt="Logo"
                            loading="lazy"
                            width={100}
                            height={100}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </NavbarAvatar>
                    <Typography
                        variant="h6"
                        align="center"
                        color={theme.palette.primary.contrastText}
                    >
                        {pageName}
                    </Typography>
                </Box>
                <List>
                    {navigation.map(({ Icon, href, title }) => (
                        <Link href={href} key={title}>
                            <ListItem key={title} disablePadding>
                                <ListItemButton onClick={onClose}>
                                    {Icon ? (
                                        <ListItemIcon>
                                            <Icon />
                                        </ListItemIcon>
                                    ) : null}
                                    <ListItemText primary={title} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default MobileNavbar;
