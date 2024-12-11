import api from '@/utils/api';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getCategories = async () => {
    const { data, error, response } = await api.GET('/categories/list');

    if (error) {
        return {
            ...(typeof error === 'undefined'
                ? error
                : ({ success: false } as const)),
            response,
        };
    }

    return data;
};

export type GetCategoriesResponse = Awaited<ReturnType<typeof getCategories>>;
