'use client';

import type { FC } from 'react';

import type { Product } from '@/types';

import ProductCard from '@/components/products/ProductCard';
import Slider from '@/components/wrapper/Slider';

import Box from '@mui/material/Box';

export interface ProductSliderProps {
    products: Product[];
}

const autoplay: boolean = false;

const ProductSlider: FC<ProductSliderProps> = ({ products }) => (
    <>
        <Box
            sx={{ display: { xs: 'block', md: 'none' } }}
            marginX={3}
            data-testid="product-slider-mobile"
        >
            {/* Mobile only */}
            <Slider
                settings={{
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    autoplay,
                }}
            >
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Slider>
        </Box>
        <Box
            sx={{ display: { xs: 'none', md: 'block' } }}
            marginX={3}
            data-testid="product-slider-desktop"
        >
            {/* Desktop only */}
            <Slider
                settings={{
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true,
                    autoplay,
                }}
            >
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Slider>
        </Box>
    </>
);

export default ProductSlider;
