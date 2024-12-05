import api from '@/utils/api';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getProducts = async () => {
    const { data, error } = await api.GET('/products/list');

    if (error) {
        return error;
    }

    return data;
};

export type GetProductsResponse = Awaited<ReturnType<typeof getProducts>>;
