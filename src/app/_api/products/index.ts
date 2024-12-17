import { getCookies } from '@/app/_api';

import type { ExtractSuccessData, RequestBody } from '@/utils/api';
import api from '@/utils/api';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getProducts = async () => {
    const cookie = await getCookies();

    const { data, error, response } = await api.GET('/products/list', {
        headers: {
            cookie,
        },
    });

    if (error) {
        return {
            ...(typeof error === 'object'
                ? error
                : ({ success: false } as const)),
            response,
        };
    }

    return data;
};

export type GetProductsResponse = Awaited<ReturnType<typeof getProducts>>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const searchProducts = async (query: string) => {
    const { data, error, response } = await api.GET('/products/search', {
        params: { query: { query } },
    });

    if (error) {
        return { ...error, response };
    }

    return data;
};

export type SearchProductsResponse = Awaited<ReturnType<typeof searchProducts>>;

export type SearchedProducts = ExtractSuccessData<SearchProductsResponse>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getProductById = async (id: string) => {
    const cookie = await getCookies();

    const parsedId = parseInt(id, 10);

    if (Number.isNaN(parsedId)) {
        return { success: false, error: 'Invalid ID' } as const;
    }

    const { data, error, response } = await api.GET('/products/get', {
        params: { query: { id: parsedId } },
        headers: {
            cookie,
        },
    });

    if (error) {
        return {
            ...error,
            response,
        };
    }

    return data;
};

export type GetProductByIdResponse = Awaited<ReturnType<typeof getProductById>>;

export type SendReviewArgs = RequestBody<'/products/review/add'>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const sendReview = async (body: SendReviewArgs) => {
    const { data, error, response } = await api.POST('/products/review/add', {
        body,
    });

    if (error) {
        return { ...error, response };
    }

    return data;
};

export type SendReviewResponse = Awaited<ReturnType<typeof sendReview>>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const editReview = async (body: SendReviewArgs) => {
    const { data, error, response } = await api.POST('/products/review/edit', {
        body,
    });

    if (error) {
        return { ...error, response };
    }

    return data;
};

export type EditReviewResponse = Awaited<ReturnType<typeof editReview>>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const deleteReview = async (productId: number) => {
    const { data, error, response } = await api.POST(
        '/products/review/delete',
        {
            body: { product_id: productId },
        },
    );

    if (error) {
        return { ...error, response };
    }

    return data;
};

export type DeleteReviewResponse = Awaited<ReturnType<typeof deleteReview>>;
