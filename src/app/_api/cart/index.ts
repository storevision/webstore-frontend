import { getCookies } from '@/app/_api';

import type { RequestBody } from '@/utils/api';
import api from '@/utils/api';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getCartItems = async () => {
    const cookie = await getCookies();

    const { data, error, response } = await api.GET('/cart/list', {
        headers: {
            cookie,
        },
    });

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

export type GetCartItemsResponse = Awaited<ReturnType<typeof getCartItems>>;

export type CartAddArgs = RequestBody<'/cart/add'>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const addProductToCart = async (args: CartAddArgs) => {
    const cookie = await getCookies();

    const { data, error, response } = await api.POST('/cart/add', {
        body: args,
        headers: {
            cookie,
        },
    });

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

export type AddProductToCartResponse = Awaited<
    ReturnType<typeof addProductToCart>
>;

export type CartRemoveArgs = RequestBody<'/cart/remove'>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const removeProductFromCart = async (args: CartRemoveArgs) => {
    const cookie = await getCookies();

    const { data, error, response } = await api.POST('/cart/remove', {
        body: args,
        headers: {
            cookie,
        },
    });

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

export type RemoveProductFromCartResponse = Awaited<
    ReturnType<typeof removeProductFromCart>
>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const clearCart = async () => {
    const cookie = await getCookies();

    const { data, error, response } = await api.POST('/cart/clear', {
        headers: {
            cookie,
        },
    });

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

export type ClearCartResponse = Awaited<ReturnType<typeof clearCart>>;
