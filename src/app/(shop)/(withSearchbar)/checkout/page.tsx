import type { Metadata, NextPage } from 'next';
import { redirect } from 'next/navigation';

import { getCartItems } from '@/app/_api/cart';
import { getUserSettings } from '@/app/_api/users';
import CheckoutForm from '@/app/(shop)/(withSearchbar)/checkout/_components/CheckoutForm';

import { homeLink, userPages } from '@/constants/navigation';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = {
    title: 'Checkout',
};

const CheckoutPage: NextPage = async () => {
    const cartItemsResponse = await getCartItems();

    const userSettingsResponse = await getUserSettings();

    if (!cartItemsResponse.success || !userSettingsResponse?.success) {
        redirect(homeLink);
    }

    const { data: cartItems } = cartItemsResponse;

    const { data: userSettings } = userSettingsResponse;

    if (cartItems.length === 0) {
        redirect(homeLink);
    }

    if (
        !userSettings ||
        !userSettings.addresses ||
        userSettings.addresses.length === 0
    ) {
        redirect(`${userPages.profile}?hasAddresses=false`);
    }

    return (
        <Box>
            <Typography variant="h1" mb={2}>
                Checkout
            </Typography>
            <CheckoutForm cartItems={cartItems} userSettings={userSettings} />
        </Box>
    );
};

export default CheckoutPage;
