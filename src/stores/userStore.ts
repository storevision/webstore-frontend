import deepmerge from 'deepmerge';
import type { PartialDeep } from 'type-fest';
import { createStore } from 'zustand';

import type {
    LoginArgs,
    LoginResponse,
    RegisterArgs,
    RegisterResponse,
} from '@/app/_api/users';
import { login, logout, register } from '@/app/_api/users';

import type { User } from '@/types';

export interface UserState {
    user: User | undefined;
}

export interface UserActions {
    doLogin: (args: LoginArgs) => Promise<LoginResponse>;
    doRegister: (args: RegisterArgs) => Promise<RegisterResponse>;
    doLogout: () => Promise<boolean>;
}

export type UserStore = UserState & UserActions;

export const defaultUserState: UserState = {
    user: undefined,
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createUserStore = (initialState?: PartialDeep<UserState>) =>
    createStore<UserStore>(set => ({
        ...(deepmerge(defaultUserState, initialState || {}) as UserState),
        doLogin: async args => {
            const response = await login(args);

            if (response.success) {
                set({ user: response.data });
            }

            return response;
        },
        doLogout: async () => {
            const response = await logout();

            if (response.success) {
                set({ user: undefined });
            }

            return response.success;
        },
        doRegister: async args => {
            const response = await register(args);

            if (response.success) {
                set({ user: response.data });
            }

            return response;
        },
    }));
