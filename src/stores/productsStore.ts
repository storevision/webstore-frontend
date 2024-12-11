import deepmerge from 'deepmerge';
import type { PartialDeep } from 'type-fest';
import { createStore } from 'zustand';

import type { GetCategoriesResponse } from '@/app/_api/categories';
import { getCategories } from '@/app/_api/categories';
import type { GetProductsResponse } from '@/app/_api/products';
import { getProducts } from '@/app/_api/products';

import type { Category, Product } from '@/types';

export interface ProductsState {
    products: Product[] | undefined;
    categories: Category[] | undefined;
}

export interface ProductsActions {
    getProducts: () => Promise<GetProductsResponse>;
    getCategories: () => Promise<GetCategoriesResponse>;
}

export type ProductsStore = ProductsState & ProductsActions;

export const defaultProductsState: ProductsState = {
    products: undefined,
    categories: undefined,
};

export const createProductsStore = (
    initialState?: PartialDeep<ProductsState>,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) =>
    createStore<ProductsStore>(set => ({
        ...(deepmerge(
            defaultProductsState,
            initialState || {},
        ) as ProductsState),
        getProducts: async () => {
            const response = await getProducts();

            if (response.success) {
                set({ products: response.data });
            }

            return response;
        },
        getCategories: async () => {
            const response = await getCategories();

            if (response.success) {
                set({ categories: response.data });
            }

            return response;
        },
    }));
