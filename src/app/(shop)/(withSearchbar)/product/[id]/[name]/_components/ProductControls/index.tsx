import type { FC } from 'react';

import type { GetProductByIdResponse } from '@/app/_api/products';

import type { ExtractSuccessData } from '@/utils/api';

import { currency } from '@/constants';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export interface ProductControlsProps {
    product: ExtractSuccessData<GetProductByIdResponse>;
}

const ProductControls: FC<ProductControlsProps> = ({ product }) => (
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
            >
                Add to cart
            </Button>
        </Box>
        <Typography variant="body2">Ships in 1-2 business days</Typography>
    </Box>
);

export default ProductControls;
