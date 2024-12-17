import deepmerge from 'deepmerge';
import type { PartialDeep } from 'type-fest';
import { createStore } from 'zustand';

import type { GetCategoriesResponse } from '@/app/_api/categories';
import { getCategories } from '@/app/_api/categories';
import type {
    DeleteReviewResponse,
    GetProductsResponse,
    SendReviewArgs,
    SendReviewResponse,
} from '@/app/_api/products';
import {
    deleteReview,
    editReview,
    getProducts,
    sendReview,
} from '@/app/_api/products';

import type { Category, Product } from '@/types';

export interface ProductsState {
    products: Product[] | undefined;
    categories: Category[] | undefined;
    reviewDialogOpen: {
        productId: Product['id'];
        rating: number;
    } | null;
    editReviewDialogOpen: {
        productId: Product['id'];
        rating: number;
        comment: string;
    } | null;
}

export interface ProductsActions {
    getProducts: () => Promise<GetProductsResponse>;
    getCategories: () => Promise<GetCategoriesResponse>;

    // product review
    openReviewDialog: (data: ProductsState['reviewDialogOpen']) => void;
    closeReviewDialog: () => void;
    sendReview: (body: SendReviewArgs) => Promise<SendReviewResponse>;

    // edit product review
    openEditReviewDialog: (data: ProductsState['editReviewDialogOpen']) => void;
    closeEditReviewDialog: () => void;
    editReview: (body: SendReviewArgs) => Promise<SendReviewResponse>;

    // delete product review
    deleteReview: (productId: Product['id']) => Promise<DeleteReviewResponse>;
}

export type ProductsStore = ProductsState & ProductsActions;

export const defaultProductsState: ProductsState = {
    products: undefined,
    categories: undefined,
    reviewDialogOpen: null,
    editReviewDialogOpen: null,
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
        openReviewDialog: data => {
            set({ reviewDialogOpen: data });
        },
        closeReviewDialog: () => {
            set({ reviewDialogOpen: null });
        },
        sendReview: async data => {
            const response = await sendReview(data);

            if (response.success) {
                set({ reviewDialogOpen: null });
            }

            return response;
        },
        openEditReviewDialog: data => {
            set({ editReviewDialogOpen: data });
        },
        closeEditReviewDialog: () => {
            set({ editReviewDialogOpen: null });
        },
        editReview: async data => {
            const response = await editReview(data);

            if (response.success) {
                set({ editReviewDialogOpen: null });
            }

            return response;
        },
        deleteReview: async productId => {
            const response = await deleteReview(productId);

            if (response.success) {
                set({ editReviewDialogOpen: null });
            }

            return response;
        },
    }));
