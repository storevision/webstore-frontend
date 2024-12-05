import { getCookies } from '@/app/_api';

import type { RequestBody } from '@/utils/api';
import api from '@/utils/api';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getUser = async () => {
    const cookie = await getCookies();

    const { data, error } = await api.GET('/users/info', {
        headers: {
            cookie,
        },
    });

    if (error) {
        return error;
    }

    return data;
};

export type GetUserResponse = Awaited<ReturnType<typeof getUser>>;

export type LoginArgs = RequestBody<'/users/login'>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const login = async (body: LoginArgs) => {
    const { data, error } = await api.POST('/users/login', {
        body,
    });

    if (error) {
        return error;
    }

    return data;
};

export type LoginResponse = Awaited<ReturnType<typeof login>>;

export type RegisterArgs = RequestBody<'/users/register'>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const register = async (body: RegisterArgs) => {
    const { data, error } = await api.POST('/users/register', {
        body,
    });

    if (error) {
        return error;
    }

    return data;
};

export type RegisterResponse = Awaited<ReturnType<typeof register>>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const logout = async () => {
    const { data, error } = await api.POST('/users/logout');

    if (error) {
        return error;
    }

    return data;
};

export type LogoutResponse = Awaited<ReturnType<typeof logout>>;
