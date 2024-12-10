'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

import BaseModal from '@/components/common/BaseModal';

import { pageName } from '@/constants';
import { userPages } from '@/constants/navigation';
import { useUserStore } from '@/providers/userStoreProvider';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded';
import { alpha, lighten, styled } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const WelcomeListItemButton = styled(ListItemButton)(({ theme }) => ({
    backgroundColor: lighten(theme.palette.primary.light, 0.75),
    '&:hover': {
        backgroundColor: lighten(theme.palette.primary.light, 0.65),
    },
    '&:active': {
        backgroundColor: lighten(theme.palette.primary.light, 0.6),
    },
    '.MuiTouchRipple-child': {
        backgroundColor: alpha(theme.palette.primary.light, 0.6),
    },
    color: theme.palette.getContrastText(theme.palette.primary.light),
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius * 5,
    margin: theme.spacing(0.5, 0),
}));

const WelcomeModal: FC = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const userName = useUserStore(store => store.user?.display_name);

    const initialShowWelcomeModal = searchParams.get('welcome') !== null;

    const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(
        initialShowWelcomeModal,
    );

    useEffect(() => {
        if (initialShowWelcomeModal && searchParams.get('dev') === null) {
            // remove search param
            const params = new URLSearchParams(searchParams.toString());
            params.delete('welcome');

            router.push(`${pathname}?${params.toString()}`);
        }
    }, [initialShowWelcomeModal, pathname, router, searchParams]);

    return (
        <BaseModal
            open={showWelcomeModal}
            onClose={() => setShowWelcomeModal(false)}
            title={`Welcome to ${pageName}!`}
            testID="welcome-modal"
        >
            <Typography variant="body1" align="center">
                {userName ? `Welcome, ${userName}! ` : 'Welcome! '}
                We&#39;re glad you&#39;re here. What would you like to do?
            </Typography>
            <List>
                <ListItem disablePadding>
                    <WelcomeListItemButton
                        onClick={() => router.push(userPages.account)}
                    >
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Add your account details"
                            secondary="Name, Address, Billing Information"
                        />
                        <ListItemIcon>
                            <ArrowForwardRounded />
                        </ListItemIcon>
                    </WelcomeListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <WelcomeListItemButton
                        onClick={() => setShowWelcomeModal(false)}
                    >
                        <ListItemIcon>
                            <ShoppingCartRounded />
                        </ListItemIcon>
                        <ListItemText
                            primary="Go shopping"
                            secondary="Browse our products and make a purchase"
                        />
                        <ListItemIcon>
                            <ArrowForwardRounded />
                        </ListItemIcon>
                    </WelcomeListItemButton>
                </ListItem>
            </List>
        </BaseModal>
    );
};

export default WelcomeModal;
