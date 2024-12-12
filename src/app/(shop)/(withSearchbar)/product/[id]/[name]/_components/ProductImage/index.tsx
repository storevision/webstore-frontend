'use client';

import Image from 'next/image';

import type { FC } from 'react';

import type { GetProductByIdResponse } from '@/app/_api/products';

import type { ExtractSuccessData } from '@/utils/api';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';

export interface ProductImageProps {
    product: ExtractSuccessData<GetProductByIdResponse>;
}

const ProductImage: FC<ProductImageProps> = ({ product }) => {
    const theme = useTheme();

    return (
        <Box flex={1} position="relative" width="100%">
            <Image
                src={product.image_url}
                alt={product.name}
                placeholder="blur"
                blurDataURL={`data:image/jpeg;base64,${product.blurred_image}`}
                sizes="100vw"
                style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 16,
                    boxShadow: theme.shadows[3],
                }}
                width={product.image_width}
                height={product.image_height}
            />
        </Box>
    );
};

export default ProductImage;
