import getConfig from 'next/config';

import type { components, paths } from '@/generated/schema';

const { publicRuntimeConfig } = getConfig();
const { API_BASE_URL } = publicRuntimeConfig;

const getBaseUrl = (): string => {
    let baseUrl =
        typeof window === 'undefined' ? API_BASE_URL : window.location.origin;

    if (!baseUrl) {
        throw new Error('No base URL found');
    }

    if (baseUrl.endsWith('/')) {
        baseUrl = baseUrl.slice(0, -1);
    }

    if (!baseUrl.startsWith('http')) {
        baseUrl = `http://${baseUrl}`;
    }

    return baseUrl;
};

export type ValidPaths = keyof paths;

export interface SuccessResponseFromPath<Path extends ValidPaths> {
    success: true;
    data: paths[Path]['get']['responses'][200]['content']['application/json']['data'];
}

export interface ErrorResponse {
    success: false;
    error: string;
}

export type ResponseFromPath<Path extends ValidPaths> =
    | SuccessResponseFromPath<Path>
    | ErrorResponse;

export type ApiResponse<Path extends ValidPaths> = ResponseFromPath<Path>;

const fetchApi = async <Path extends ValidPaths>(
    url: Path,
    options: RequestInit = {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<ResponseFromPath<Path>> => {
    const baseUrl = getBaseUrl();
    const apiUrl = `${baseUrl}${url}`;

    console.log('fetching', apiUrl);

    const response = await fetch(apiUrl, options);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${apiUrl}`);
    }

    return (await response.json()) as ResponseFromPath<Path>;
};

export default fetchApi;
