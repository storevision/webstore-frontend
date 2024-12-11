import { getCookies } from '@/app/_api';

import type { RequestBody } from '@/utils/api';
import api from '@/utils/api';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const pGetUser = async () => {
    const cookie = await getCookies();

    const { data, error, response } = await api.GET('/users/info', {
        headers: {
            cookie,
        },
    });

    if (error) {
        return { ...error, response };
    }

    return data;
};

export type GetUserResponse = Awaited<ReturnType<typeof pGetUser>> | undefined;

export const getUser: () => Promise<GetUserResponse> = pGetUser;

export type LoginArgs = RequestBody<'/users/login'>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const pLogin = async (body: LoginArgs) => {
    const { data, error, response } = await api.POST('/users/login', {
        body,
    });

    if (error) {
        return { ...error, response };
    }

    return data;
};

export type LoginResponse = Awaited<ReturnType<typeof pLogin>> | undefined;

export const login: (body: LoginArgs) => Promise<LoginResponse> = pLogin;

export type RegisterArgs = RequestBody<'/users/register'>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const pRegister = async (body: RegisterArgs) => {
    const { data, error, response } = await api.POST('/users/register', {
        body,
    });

    if (error) {
        return { ...error, response };
    }

    return data;
};

export type RegisterResponse =
    | Awaited<ReturnType<typeof pRegister>>
    | undefined;

export const register: (body: RegisterArgs) => Promise<RegisterResponse> =
    pRegister;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const pLogout = async () => {
    const { data, error, response } = await api.POST('/users/logout');

    if (error) {
        return {
            ...(typeof error === 'object'
                ? error
                : ({ success: false } as const)),
            response,
        };
    }

    return data;
};

export type LogoutResponse = Awaited<ReturnType<typeof pLogout>> | undefined;

export const logout: () => Promise<LogoutResponse> = pLogout;
