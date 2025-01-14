import deepmerge from 'deepmerge';
import type { PartialDeep } from 'type-fest';
import { createStore } from 'zustand';

import type {
    GetUserSettingsResponse,
    LoginArgs,
    LoginResponse,
    RegisterArgs,
    RegisterResponse,
    UpdateUserSettingsResponse,
} from '@/app/_api/users';
import {
    getUserSettings,
    login,
    logout,
    register,
    updateUserSettings,
} from '@/app/_api/users';

import type { User, UserSettings } from '@/types';

export interface UserState {
    user: User | undefined;
    userSettings: UserSettings | undefined;
}

export interface UserActions {
    doLogin: (args: LoginArgs) => Promise<LoginResponse>;
    doRegister: (args: RegisterArgs) => Promise<RegisterResponse>;
    doLogout: () => Promise<boolean>;
    fetchUserSettings: () => Promise<GetUserSettingsResponse>;
    updateUserSettings: (
        settings: UserSettings,
    ) => Promise<UpdateUserSettingsResponse>;
}

export type UserStore = UserState & UserActions;

export const defaultUserState: UserState = {
    user: undefined,
    userSettings: undefined,
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createUserStore = (initialState?: PartialDeep<UserState>) =>
    createStore<UserStore>(set => ({
        ...(deepmerge(defaultUserState, initialState || {}) as UserState),
        doLogin: async args => {
            const response = await login(args);

            if (response?.success) {
                set({ user: response.data });
            }

            return response;
        },
        doLogout: async () => {
            const response = await logout();

            if (response?.success) {
                set({ user: undefined });
            }

            return response?.success ?? false;
        },
        doRegister: async args => {
            const response = await register(args);

            if (response?.success) {
                set({ user: response.data });
            }

            return response;
        },
        fetchUserSettings: async () => {
            const response = await getUserSettings();

            if (response?.success) {
                set({ userSettings: response.data });
            }

            return response;
        },
        updateUserSettings: async settings => updateUserSettings(settings),
    }));
