'use client';

import type { FC } from 'react';

import { useCartStore } from '@/providers/CartStoreProvider';
import { useUserStore } from '@/providers/UserStoreProvider';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

export interface AddToCartButtonProps {
    productId: number;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ productId }) => {
    const addToCart = useCartStore(store => store.addProductToCart);
    const userLoggedIn = useUserStore(
        store => typeof store.user?.id !== 'undefined',
    );

    const handleClick = async (): Promise<void> => {
        await addToCart(productId, 1);
    };

    if (!userLoggedIn) {
        return null;
    }

    return (
        <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={handleClick}
            data-testid="add-to-cart-button"
        >
            Add to cart
        </Button>
    );
};

export default AddToCartButton;
