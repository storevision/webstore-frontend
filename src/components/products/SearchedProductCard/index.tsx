import Image from 'next/image';
import Link from 'next/link';

import type { FC } from 'react';

import type { SearchedProducts } from '@/app/_api/products';

import AddToCartButton from '@/components/products/AddToCartButton';

import { currency } from '@/constants';
import { productPage } from '@/constants/navigation';

import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export interface SearchedProductCardProps {
    searchedProduct: SearchedProducts[number];
}

const SearchedProductCard: FC<SearchedProductCardProps> = ({
    searchedProduct,
}) => {
    const { product } = searchedProduct;

    return (
        <Card sx={{ display: 'flex', marginY: 1, borderRadius: 4 }}>
            <CardMedia
                sx={{
                    width: 190,
                    minWidth: 150,
                }}
                title={product.name}
            >
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
                        blurDataURL={`data:image/jpg;base64,${product.blurred_image}`}
                        sizes="(max-width: 600px) 100vw, 600px"
                        fill
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </div>
            </CardMedia>
            <Box display="flex" flexDirection="column">
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="h6" lineHeight={1.25}>
                        {product.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                        {product.price_per_unit} {currency}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link href={productPage(product.id, product.name)}>
                        <Button size="small" startIcon={<InfoIcon />}>
                            Learn More
                        </Button>
                    </Link>
                    <AddToCartButton productId={product.id} />
                </CardActions>
            </Box>
        </Card>
    );
};

export default SearchedProductCard;
