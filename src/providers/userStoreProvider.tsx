'use client';

import type { FC } from 'react';
import React, { createContext, useContext, useRef } from 'react';

import type { PartialDeep } from 'type-fest';
import { useStore } from 'zustand';

import type { UserState, UserStore } from '@/stores/userStore';
import { createUserStore } from '@/stores/userStore';

export type UserStoreApi = ReturnType<typeof createUserStore>;

const UserStoreContext = createContext<UserStoreApi | undefined>(undefined);

export interface UserStoreProviderProps {
    children: React.ReactNode;
    userState?: PartialDeep<UserState>;
}

export const UserStoreProvider: FC<UserStoreProviderProps> = ({
    children,
    userState,
}) => {
    const storeRef = useRef<UserStoreApi>();

    if (!storeRef.current) {
        storeRef.current = createUserStore(userState);
    }

    return (
        <UserStoreContext.Provider value={storeRef.current}>
            {children}
        </UserStoreContext.Provider>
    );
};

/* eslint-disable-next-line @typescript-eslint/comma-dangle */
export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
    const store = useContext(UserStoreContext);

    if (!store) {
        throw new Error('useUserStore must be used within a UserStoreProvider');
    }

    return useStore(store, selector);
};
