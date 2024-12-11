'use client';

import type { FC } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

export interface AddToCartButtonProps {
    productId: number;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ productId }) => {
    const handleClick = (): void => {
        // eslint-disable-next-line no-alert
        alert(`Add to cart clicked with id ${productId}`);
    };

    return (
        <Button size="small" startIcon={<AddIcon />} onClick={handleClick}>
            Add to cart
        </Button>
    );
};

export default AddToCartButton;
