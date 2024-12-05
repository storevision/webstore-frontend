import api from '@/utils/api';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getCategories = async () => {
    const { data, error } = await api.GET('/categories/list');

    if (error) {
        return error;
    }

    return data;
};

export type GetCategoriesResponse = Awaited<ReturnType<typeof getCategories>>;
