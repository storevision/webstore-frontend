'use client';

import type { FC } from 'react';
import React, { createContext, useContext, useRef } from 'react';

import type { PartialDeep } from 'type-fest';
import { useStore } from 'zustand';

import type { CartState, CartStore } from '@/stores/cartStore';
import { createCartStore } from '@/stores/cartStore';

export type CartStoreApi = ReturnType<typeof createCartStore>;

const CartStoreContext = createContext<CartStoreApi | undefined>(undefined);

export interface CartStoreProviderProps {
    children: React.ReactNode;
    cartState?: PartialDeep<CartState>;
}

export const CartStoreProvider: FC<CartStoreProviderProps> = ({
    children,
    cartState,
}) => {
    const storeRef = useRef<CartStoreApi>(null);

    if (!storeRef.current) {
        storeRef.current = createCartStore(cartState);
    }

    return (
        <CartStoreContext.Provider value={storeRef.current}>
            {children}
        </CartStoreContext.Provider>
    );
};

export default CartStoreProvider;

/* eslint-disable-next-line @typescript-eslint/comma-dangle */
export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
    const store = useContext(CartStoreContext);

    if (!store) {
        throw new Error('useCartStore must be used within a CartStoreProvider');
    }

    return useStore(store, selector);
};
