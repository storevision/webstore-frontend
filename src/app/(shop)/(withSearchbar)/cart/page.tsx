import type { Metadata, NextPage } from 'next';
import { redirect } from 'next/navigation';

import { getCartItems } from '@/app/_api/cart';
import CartItem from '@/app/(shop)/(withSearchbar)/cart/_components/CartItem';

import { formatMoney } from '@/utils/helpers';

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = {
    title: 'Cart',
};

const CartPage: NextPage = async () => {
    const cartItemsResponse = await getCartItems();

    if (!cartItemsResponse.success) {
        redirect('/shop');
    }

    const { data: cartItems } = cartItemsResponse;

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.product.price_per_unit * item.quantity,
        0,
    );

    return (
        <Box
            marginBottom={1}
            padding={2}
            borderRadius={4}
            color="primary.contrastText"
            bgcolor="white.main"
            data-testid="product-category"
        >
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Typography variant="h1">Cart</Typography>
                <Button
                    endIcon={<ShoppingCartCheckoutIcon />}
                    variant="contained"
                    color="primary"
                >
                    Checkout ({formatMoney(totalPrice)})
                </Button>
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
                {cartItems.map(item => (
                    <CartItem
                        initialData={item}
                        key={`cart-item-${item.product.id}`}
                    />
                ))}
                {cartItems.length === 0 ? (
                    <Typography variant="h6" textAlign="center">
                        Your cart is empty!
                    </Typography>
                ) : null}
            </Box>
        </Box>
    );
};

export default CartPage;
