import type { GetCategoriesResponse } from '@/app/_api/categories';
import type { GetProductsResponse } from '@/app/_api/products';

import type { Category, Product } from '@/types';

export const splitProductsByCategory = (
    productResponse: GetProductsResponse,
    categoryResponse: GetCategoriesResponse,
): Record<Category['name'], Product[]> => {
    if (!productResponse.success || !categoryResponse.success) {
        return {};
    }

    const products = productResponse.data;
    const categories = categoryResponse.data;

    return products.reduce(
        (acc, product) => {
            const category = categories.find(c => c.id === product.category_id);
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
