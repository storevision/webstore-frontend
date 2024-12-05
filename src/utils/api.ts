import createClient from 'openapi-fetch';
import type { Method } from 'openapi-typescript';
import type { PathsWithMethod } from 'openapi-typescript-helpers';

import type { paths } from '@/generated/schema';

const api =
    typeof window === 'undefined'
        ? createClient<paths>({
              baseUrl: `${process.env.API_BASE_URL}`,
          })
        : createClient<paths>({
              baseUrl: '/api',
          });

export interface ErrorResponse {
    success: false;
    error: string;
}

export type RequestBody<
    T extends PathsWithMethod<paths, M>,
    M extends Method = 'post',
> = paths[T][M] extends {
    requestBody: { content: { 'application/json': object } };
}
    ? paths[T][M]['requestBody']['content']['application/json']
    : never;

export default api;
