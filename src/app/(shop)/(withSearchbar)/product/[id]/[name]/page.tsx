import type { NextPage } from 'next';
import { redirect } from 'next/navigation';

import { getProductById } from '@/app/_api/products';
import ProductControls from '@/app/(shop)/(withSearchbar)/product/[id]/[name]/_components/ProductControls';
import ProductImage from '@/app/(shop)/(withSearchbar)/product/[id]/[name]/_components/ProductImage';

import { homeLink } from '@/constants/navigation';

import { Grid2 } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

export interface ProductPageProps {
    params: Promise<{
        id?: string;
    }>;
}

const ProductPage: NextPage<ProductPageProps> = async ({ params }) => {
    const { id } = await params;

    if (!id) {
        redirect(homeLink);
    }

    const productResponse = await getProductById(id);

    if (!productResponse.success) {
        redirect(homeLink);
    }

    const product = productResponse.data;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid2 container spacing={2}>
                <Grid2 size={4} display="flex">
                    <ProductImage product={product} />
                </Grid2>
                <Grid2 size={5}>
                    <Box>
                        <Typography variant="h2">{product.name}</Typography>
                        <Typography variant="subtitle1">
                            {product.description}
                        </Typography>
                    </Box>
                </Grid2>
                <Grid2 size={3}>
                    <ProductControls product={product} />
                </Grid2>
            </Grid2>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="h5">Reviews</Typography>
            <Box marginY={1}>
                {Array.from({ length: 3 }).map((_, index) => (
                    <Box key={index} display="flex" gap={2} mb={2}>
                        <Skeleton
                            variant="circular"
                            width={40}
                            height={40}
                            sx={{ borderRadius: '50%' }}
                        />
                        <Box>
                            <Typography variant="h6">John Doe</Typography>
                            <Typography variant="body2">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec nec odio
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ProductPage;
