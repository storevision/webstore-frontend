import deepmerge from 'deepmerge';
import type { PartialDeep } from 'type-fest';
import { createStore } from 'zustand';

import type {
    AddProductToCartResponse,
    ClearCartResponse,
    GetCartItemsResponse,
    RemoveProductFromCartResponse,
} from '@/app/_api/cart';
import {
    addProductToCart,
    clearCart,
    getCartItems,
    removeProductFromCart,
} from '@/app/_api/cart';

import type { ExtendedCartItem, Product } from '@/types';

export interface CartState {
    cartItems: ExtendedCartItem[] | undefined;
}

export interface CartActions {
    getCartItems: () => Promise<GetCartItemsResponse>;

    // cart actions
    addProductToCart: (
        productId: Product['id'],
        quantity: number,
    ) => Promise<AddProductToCartResponse>;
    removeProductFromCart: (
        productId: Product['id'],
        quantity: number,
    ) => Promise<RemoveProductFromCartResponse>;
    clearCart: () => Promise<ClearCartResponse>;
}

export type CartStore = CartState & CartActions;

export const defaultCartState: CartState = {
    cartItems: undefined,
};

export const createCartStore = (
    initialState?: PartialDeep<CartState>,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) =>
    createStore<CartStore>((set, get) => ({
        ...(deepmerge(defaultCartState, initialState || {}) as CartState),
        getCartItems: async () => {
            const response = await getCartItems();

            if (response.success) {
                set({ cartItems: response.data });
            }

            return response;
        },
        addProductToCart: async (productId, quantity) => {
            // This will make the user interface feel more responsive
            const originalItems = get().cartItems || [];

            const modifiedItems = originalItems
                .map(item => {
                    if (item.product.id === productId) {
                        return {
                            ...item,
                            quantity: item.quantity + quantity,
                        };
                    }

                    return item;
                })
                .filter(item => item.quantity > 0);

            set({ cartItems: modifiedItems });

            const response = await addProductToCart({
                product_id: productId,
                quantity,
            });

            const listResponse = await getCartItems();

            if (response.success && listResponse.success) {
                set({ cartItems: listResponse.data });
            } else {
                set({ cartItems: originalItems });
            }

            return response;
        },
        removeProductFromCart: async (productId, quantity) => {
            const originalItems = get().cartItems || [];

            const modifiedItems = originalItems
                .map(item => {
                    if (item.product.id === productId) {
                        return {
                            ...item,
                            quantity: Math.max(item.quantity - quantity, 0),
                        };
                    }

                    return item;
                })
                .filter(item => item.quantity > 0);

            set({ cartItems: modifiedItems });

            const response = await removeProductFromCart({
                product_id: productId,
                quantity,
            });

            const listResponse = await getCartItems();

            if (response.success && listResponse.success) {
                set({ cartItems: listResponse.data });
            } else {
                set({ cartItems: originalItems });
            }

            return response;
        },
        clearCart: async () => {
            const response = await clearCart();

            if (response.success) {
                set({ cartItems: [] });
            }

            return response;
        },
    }));
