import type { Metadata } from 'next';

import type { FC } from 'react';

import { getCategories } from '@/app/_api/categories';
import { getProducts } from '@/app/_api/products';

import ProductSlider from '@/components/products/ProductSlider';

import { splitProductsByCategory } from '@/utils/helpers';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = {
    title: 'Home',
};

const HomePage: FC = async () => {
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
                    data-testid="product-category"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            marginX={1}
                            data-testid="category-name"
                        >
                            Products in: {category}
                        </Typography>
                        <Button
                            endIcon={<ArrowForwardIcon />}
                            variant="text"
                            color="primary"
                            size="small"
                        >
                            View all
                        </Button>
                    </Box>
                    <ProductSlider products={products} />
                </Box>
            ))}
        </Container>
    );
};

export default HomePage;
