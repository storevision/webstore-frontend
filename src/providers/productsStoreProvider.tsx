'use client';

import type { FC } from 'react';
import React, { createContext, useContext, useRef } from 'react';

import type { PartialDeep } from 'type-fest';
import { useStore } from 'zustand';

import type { ProductsState, ProductsStore } from '@/stores/productsStore';
import { createProductsStore } from '@/stores/productsStore';

export type ProductsStoreApi = ReturnType<typeof createProductsStore>;

const ProductsStoreContext = createContext<ProductsStoreApi | undefined>(
    undefined,
);

export interface ProductsStoreProviderProps {
    children: React.ReactNode;
    productsState?: PartialDeep<ProductsState>;
}

export const ProductsStoreProvider: FC<ProductsStoreProviderProps> = ({
    children,
    productsState,
}) => {
    const storeRef = useRef<ProductsStoreApi>(null);

    if (!storeRef.current) {
        storeRef.current = createProductsStore(productsState);
    }

    return (
        <ProductsStoreContext.Provider value={storeRef.current}>
            {children}
        </ProductsStoreContext.Provider>
    );
};

/* eslint-disable-next-line @typescript-eslint/comma-dangle */
export const useProductsStore = <T,>(
    selector: (store: ProductsStore) => T,
): T => {
    const store = useContext(ProductsStoreContext);

    if (!store) {
        throw new Error(
            'useProductsStore must be used within a ProductsStoreProvider',
        );
    }

    return useStore(store, selector);
};
