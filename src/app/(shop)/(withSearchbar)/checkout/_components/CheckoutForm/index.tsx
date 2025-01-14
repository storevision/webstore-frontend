'use client';

import { useRouter } from 'next/navigation';

import type { FC } from 'react';
import { useState } from 'react';

import type { ExtendedCartItem, UserSettings } from '@/types';

import { formatMoney } from '@/utils/helpers';

import { homeLink } from '@/constants/navigation';
import { useCartStore } from '@/providers/CartStoreProvider';

import PayIcon from '@mui/icons-material/Payment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';

export interface CheckoutFormProps {
    userSettings: UserSettings;
    cartItems: ExtendedCartItem[];
}

const CheckoutForm: FC<CheckoutFormProps> = ({ userSettings, cartItems }) => {
    const doCheckout = useCartStore(store => store.doCheckout);
    const router = useRouter();

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.product.price_per_unit * item.quantity,
        0,
    );

    const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(0);

    const [error, setError] = useState<string | null>(null);

    const handleCheckout = async (): Promise<void> => {
        const address = userSettings.addresses.at(selectedAddressIndex);

        if (!address) {
            setError('Please select an address');
            return;
        }

        const response = await doCheckout({
            address,
        });

        if (!response.success) {
            setError(response.error);
        }

        router.push(homeLink);
    };

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            {error ? (
                <Box bgcolor="error.light" p={1} borderRadius={2}>
                    <Typography color="error">{error}</Typography>
                </Box>
            ) : null}
            <Paper sx={{ padding: 2, borderRadius: 4 }}>
                <Typography variant="h6">Address</Typography>
                <List>
                    {userSettings.addresses.map((address, index) => (
                        <ListItem
                            key={`checkout-address-${index}`}
                            disablePadding
                        >
                            <ListItemButton
                                sx={{ borderRadius: 2 }}
                                onClick={() => setSelectedAddressIndex(index)}
                                data-testid={`checkout-address-${index}`}
                                data-index={index}
                            >
                                <Radio
                                    sx={{ mr: 1 }}
                                    onChange={() =>
                                        setSelectedAddressIndex(index)
                                    }
                                    checked={selectedAddressIndex === index}
                                    data-testid={`checkout-address-${index}-radio`}
                                />
                                <ListItemText
                                    primary={address.name}
                                    secondary={`${address.address}, ${address.postal_code} ${address.city}, ${address.state}, ${address.country}`}
                                    data-testid={`checkout-address-${index}-text`}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Paper sx={{ padding: 2, borderRadius: 4 }}>
                <Typography variant="h6">Products from cart</Typography>
                <List>
                    {cartItems.map(({ product, quantity }) => (
                        <ListItem key={product.id} disablePadding>
                            <ListItemText
                                primary={`${product.name} × ${quantity}`}
                                secondary={`Single price: ${formatMoney(product.price_per_unit)}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Box>
                <Button
                    onClick={handleCheckout}
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<PayIcon />}
                    data-testid="checkout-button"
                >
                    Give us your money! ({formatMoney(totalPrice)})
                </Button>
            </Box>
        </Box>
    );
};

export default CheckoutForm;
