import type { Metadata, NextPage } from 'next';
import { redirect } from 'next/navigation';

import { getProductById } from '@/app/_api/products';
import ProductControls from '@/app/(shop)/(withSearchbar)/product/[id]/[name]/_components/ProductControls';
import ProductImage from '@/app/(shop)/(withSearchbar)/product/[id]/[name]/_components/ProductImage';
import UserReview from '@/app/(shop)/(withSearchbar)/product/[id]/[name]/_components/UserReview';

import { homeLink } from '@/constants/navigation';

import { Grid2 } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export interface ProductPageProps {
    params: Promise<{
        id?: string;
    }>;
}

export const generateMetadata = async ({
    params,
}: ProductPageProps): Promise<Metadata> => {
    const { id } = await params;

    if (!id) {
        redirect(homeLink);
    }

    const productResponse = await getProductById(id);

    if (!productResponse.success) {
        redirect(homeLink);
    }

    return {
        title: productResponse.data.product.name,
    };
};

const ProductPage: NextPage<ProductPageProps> = async ({ params }) => {
    const { id } = await params;

    if (!id) {
        redirect(homeLink);
    }

    const productResponse = await getProductById(id);

    if (!productResponse.success) {
        redirect(homeLink);
    }

    const { product, reviews } = productResponse.data;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid2 container spacing={2}>
                <Grid2
                    size={{ xs: 12, sm: 12, md: 4 }}
                    display="flex"
                    justifyContent="center"
                >
                    <ProductImage product={product} />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, md: 5 }}>
                    <Box>
                        <Typography variant="h2">{product.name}</Typography>
                        <Box display="flex" flexDirection="row" gap={1}>
                            <Rating
                                value={product.average_rating}
                                readOnly
                                precision={0.5}
                                data-testid="average-rating"
                            />
                            <Typography variant="h6" data-testid="review-count">
                                {reviews.length}{' '}
                                {reviews.length === 1 ? 'review' : 'reviews'}
                            </Typography>
                        </Box>
                        <Typography variant="subtitle1">
                            {product.description}
                        </Typography>
                    </Box>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, md: 3 }}>
                    <ProductControls product={product} reviews={reviews} />
                </Grid2>
            </Grid2>
            <Divider sx={{ marginY: 2 }} />
            <Container>
                <Typography variant="h5">Reviews</Typography>
                <Box marginY={1}>
                    {reviews.map((review, index) => (
                        <UserReview key={index} review={review} />
                    ))}
                    {reviews.length === 0 ? (
                        <Typography variant="body1">No reviews yet</Typography>
                    ) : null}
                </Box>
            </Container>
        </Box>
    );
};

export default ProductPage;
