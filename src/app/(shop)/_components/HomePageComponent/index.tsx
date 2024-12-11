'use client';

import { useRouter } from 'next/navigation';

import type { FC } from 'react';

import ProductSlider from '@/components/products/ProductSlider';

import { splitProductsByCategory } from '@/utils/helpers';

import { categoryPage } from '@/constants/navigation';
import { useProductsStore } from '@/providers/productsStoreProvider';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const HomePageComponent: FC = () => {
    const products = useProductsStore(store => store.products);
    const categories = useProductsStore(store => store.categories);

    const categorized = splitProductsByCategory(products, categories);

    const router = useRouter();

    return (
        <>
            {Object.entries(categorized).map(([category, productList]) => (
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
                            onClick={() =>
                                router.push(
                                    categoryPage(
                                        productList[0].category_id,
                                        category,
                                    ),
                                )
                            }
                        >
                            View all
                        </Button>
                    </Box>
                    <ProductSlider products={productList} />
                </Box>
            ))}
        </>
    );
};

export default HomePageComponent;
