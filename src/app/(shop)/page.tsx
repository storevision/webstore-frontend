import type { Metadata } from 'next';

import type { FC } from 'react';

import ProductSlider from '@/components/products/ProductSlider';

import { getCategories } from '@/utils/api/categories';
import { getProducts, splitProductsByCategory } from '@/utils/api/products';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = {
    title: 'Home',
};

const Home: FC = async () => {
    const productsResponse = await getProducts();
    const categoriesResponse = await getCategories();

    const categorized = splitProductsByCategory(
        productsResponse,
        categoriesResponse,
    );

    return (
        <Container>
            {Object.entries(categorized).map(([category, products]) => (
                <Box
                    key={category}
                    marginBottom={1}
                    padding={1}
                    borderRadius={4}
                    color="primary.contrastText"
                    bgcolor="white.main"
                >
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        marginBottom={1}
                        marginX={1}
                    >
                        Products in: {category}
                    </Typography>
                    <ProductSlider products={products} />
                </Box>
            ))}
        </Container>
    );
};

export default Home;
