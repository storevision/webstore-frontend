import { unstable_cache } from 'next/cache';

import type { Category, Product } from '@/types';

import type { ApiResponse } from '@/utils/api/fetchApi';
import fetchApi from '@/utils/api/fetchApi';

export const getProducts = unstable_cache(
    async () => fetchApi('/products/list'),
    ['products'],
    { revalidate: 60, tags: ['products'] },
);

export const splitProductsByCategory = (
    products: ApiResponse<'/products/list'>,
    categories: ApiResponse<'/categories/list'>,
): Record<Category['name'], Product[]> => {
    if (!products.success || !categories.success) return {};

    return products.data.reduce(
        (acc, product) => {
            const category = categories.data.find(
                c => c.id === product.category_id,
            );
            if (!category) return acc;

            if (!acc[category.name]) {
                acc[category.name] = [];
            }

            acc[category.name].push(product);

            return acc;
        },
        {} as Record<Category['name'], Product[]>,
    );
};
