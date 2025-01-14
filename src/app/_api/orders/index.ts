import { getCookies } from '@/app/_api';

import api from '@/utils/api';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getOrders = async () => {
    const cookie = await getCookies();

    const { data, error, response } = await api.GET('/orders/list', {
        headers: {
            cookie,
        },
    });

    if (error) {
        return {
            ...(typeof error !== 'undefined'
                ? error
                : ({ success: false, error: 'Unknown error' } as const)),
            response,
        };
    }

    return data;
};

export type GetOrdersResponse = Awaited<ReturnType<typeof getOrders>>;
