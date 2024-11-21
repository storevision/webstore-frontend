'use client';

import type { FC } from 'react';

import type { Product } from '@/types';

import { currency } from '@/constants';

import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import { lighten, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export interface ProductCardProps {
    product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const theme = useTheme();

    return (
        <Box height="100%" padding={0.5}>
            <Card
                sx={{
                    borderRadius: 6,
                    backgroundColor: lighten(theme.palette.primary.light, 0.9),
                }}
                elevation={2}
            >
                <CardMedia
                    sx={{ height: 140 }}
                    image={product.image_url}
                    title={product.name}
                />
                <CardContent>
                    <Typography variant="h5" noWrap>
                        {product.name}
                    </Typography>
                    <Typography variant="body1" noWrap>
                        {product.description}
                    </Typography>
                    <Typography variant="h6">
                        {product.price_per_unit} {currency}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" startIcon={<InfoIcon />}>
                        Learn More
                    </Button>
                    <Button size="small" startIcon={<AddIcon />}>
                        Add to cart
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default ProductCard;
