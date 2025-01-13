'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { FC } from 'react';

import type { Product } from '@/types';

import AddToCartButton from '@/components/products/AddToCartButton';

import { formatMoney } from '@/utils/helpers';

import { productPage } from '@/constants/navigation';

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
    const router = useRouter();

    return (
        <Box height="100%" padding={0.5}>
            <Card
                sx={{
                    borderRadius: 6,
                    backgroundColor: lighten(theme.palette.primary.light, 0.9),
                }}
                elevation={2}
                data-testid={`product-card-${product.id}`}
            >
                <CardMedia sx={{ height: 140 }} title={product.name}>
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <Image
                            src={product.image_url}
                            alt={product.name}
                            placeholder="blur"
                            blurDataURL={`data:image/jpeg;base64,${product.blurred_image}`}
                            sizes="(max-width: 600px) 100vw, 600px"
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                </CardMedia>
                <CardContent>
                    <Typography variant="h5" noWrap>
                        {product.name}
                    </Typography>
                    <Typography variant="body1" noWrap>
                        {product.description}
                    </Typography>
                    <Typography variant="h6">
                        {formatMoney(product.price_per_unit)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        startIcon={<InfoIcon />}
                        onClick={() =>
                            router.push(productPage(product.id, product.name))
                        }
                    >
                        Learn More
                    </Button>
                    <AddToCartButton productId={product.id} />
                </CardActions>
            </Card>
        </Box>
    );
};

export default ProductCard;
