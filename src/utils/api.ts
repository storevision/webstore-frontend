import type { Middleware } from 'openapi-fetch';
import createClient from 'openapi-fetch';
import type { Method } from 'openapi-typescript';
import type { PathsWithMethod } from 'openapi-typescript-helpers';

import type { paths } from '@/generated/schema';

const tag = `API-${typeof window === 'undefined' ? 'SERVER-SIDE' : 'CLIENT-SIDE'}`;

const apiMiddleware: Middleware = {
    onRequest: async ({ request }) => {
        // console.log('[API]', 'Fetching', request.url);
        // @ts-expect-error: requestTime is not part of the Node.js Request type
        request.requestTime = Date.now();
    },
    onResponse: async ({ request, response }) => {
        // @ts-expect-error: requestTime is not part of the Node.js Request type
        const time = Date.now() - request.requestTime;

        console.log(
            `[${tag}] [${request.method}] ${request.url} => ${response.status} ${response.statusText} (${time}ms)`,
        );
    },
    onError: async ({ error, request }) => {
        // @ts-expect-error: requestTime is not part of the Node.js Request type
        const time = Date.now() - request.requestTime;

        console.error(
            `[${tag}] Error fetching ${request.url}: ${error && typeof error === 'object' && 'message' in error ? error.message : 'Unknown error'} (${time}ms)`,
        );
    },
};

const api =
    typeof window === 'undefined'
        ? createClient<paths>({
              baseUrl: `${process.env.API_BASE_URL}`,
          })
        : createClient<paths>({
              baseUrl: '/api',
          });

if (process.env.NODE_ENV === 'development') {
    api.use(apiMiddleware);
}

export type RequestBody<
    T extends PathsWithMethod<paths, M>,
    M extends Method = 'post',
> = paths[T][M] extends {
    requestBody: { content: { 'application/json': object } };
}
    ? paths[T][M]['requestBody']['content']['application/json']
    : never;

export type ExtractSuccessData<T> = T extends { success: true; data: infer D }
    ? D
    : never;

export type ExtractErrorData<T> = T extends { success: false; error: infer E }
    ? E
    : never;

export default api;
