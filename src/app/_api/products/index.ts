import type { ExtractSuccessData } from '@/utils/api';
import api from '@/utils/api';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getProducts = async () => {
    const { data, error, response } = await api.GET('/products/list');

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
    const parsedId = parseInt(id, 10);

    if (Number.isNaN(parsedId)) {
        return { success: false, error: 'Invalid ID' } as const;
    }

    const { data, error, response } = await api.GET('/products/get', {
        params: { query: { id: parsedId } },
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
