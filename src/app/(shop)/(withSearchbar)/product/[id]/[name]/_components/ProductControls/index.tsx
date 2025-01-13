'use client';

import { useSearchParams } from 'next/navigation';

import type { FC } from 'react';

import type { GetProductByIdResponse } from '@/app/_api/products';

import type { ExtractSuccessData } from '@/utils/api';

import { currency } from '@/constants';
import { useProductsStore } from '@/providers/productsStoreProvider';
import { useUserStore } from '@/providers/userStoreProvider';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export interface ProductControlsProps {
    product: ExtractSuccessData<GetProductByIdResponse>['product'];
    reviews: ExtractSuccessData<GetProductByIdResponse>['reviews'];
}

const canDisableHiding =
    !!process.env.CI || process.env.NODE_ENV === 'development';

const ProductControls: FC<ProductControlsProps> = ({ product, reviews }) => {
    const userId = useUserStore(store => store.user?.id);
    const openReviewDialog = useProductsStore(store => store.openReviewDialog);
    const params = useSearchParams();

    const disableHiding =
        canDisableHiding && params.get('disableHiding') === 'true';

    const userHasRated =
        reviews.some(review => review.user_id === userId) && !disableHiding;

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
            p={2}
            borderRadius={4}
            bgcolor="background.paper"
            boxShadow={2}
        >
            <Box>
                <Box display="flex">
                    <Typography variant="h4" height="100%">
                        {Math.floor(product.price_per_unit)}
                    </Typography>
                    <Typography variant="body2" height="100%">
                        {Math.floor((product.price_per_unit % 1) * 100)}
                        {currency}
                    </Typography>
                </Box>
                <Typography variant="body1">
                    FREE shipping when you spend 50 {currency} or more
                </Typography>
            </Box>
            {typeof userId !== 'undefined' ? (
                <>
                    {userHasRated ? (
                        <Typography variant="body2" fontWeight="bold">
                            You have already rated this product
                        </Typography>
                    ) : (
                        <Box>
                            <Typography variant="h6">
                                Add your review
                            </Typography>
                            <Typography variant="body2">
                                Every feedback counts
                            </Typography>
                            <Rating
                                size="large"
                                onChange={(_, newValue) => {
                                    if (newValue) {
                                        openReviewDialog({
                                            productId: product.id,
                                            rating: newValue,
                                        });
                                    }
                                }}
                            />
                        </Box>
                    )}
                </>
            ) : (
                <Typography variant="body2">
                    Please log in to add a review.
                </Typography>
            )}
            <Box display="flex" flexDirection="column" gap={1}>
                {product.stock === 0 ? (
                    <Typography variant="h6" color="error">
                        Out of stock
                    </Typography>
                ) : (
                    <Typography variant="h6" color="success">
                        In stock
                    </Typography>
                )}
                <TextField
                    label="Quantity"
                    type="number"
                    variant="outlined"
                    size="small"
                    defaultValue={product.stock ? 1 : 0}
                    slotProps={{
                        htmlInput: {
                            min: product.stock ? 1 : 0,
                            max: product.stock,
                        },
                    }}
                    disabled={product.stock === 0}
                />
                <Button
                    variant="contained"
                    color="primary"
                    disabled={product.stock === 0}
                    onClick={() => alert('oida')}
                >
                    Add to cart
                </Button>
            </Box>
            <Typography variant="body2">Ships in 1-2 business days</Typography>
        </Box>
    );
};

export default ProductControls;
