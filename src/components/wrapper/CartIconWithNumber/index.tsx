'use client';

import type { FC } from 'react';

import { useCartStore } from '@/providers/CartStoreProvider';

import CartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Badge from '@mui/material/Badge';

const CartIconWithNumber: FC = () => {
    const cartItems = useCartStore(store =>
        store.cartItems?.reduce((acc, item) => acc + item.quantity, 0),
    );

    return (
        <Badge badgeContent={cartItems} color="secondary">
            <CartRoundedIcon />
        </Badge>
    );
};

export default CartIconWithNumber;
