import type { NextConfig } from 'next';
// import { configDotenv } from 'dotenv';

const apiBaseUrl = process.env.API_BASE_URL;

if (!apiBaseUrl) {
    throw new Error('Missing required environment variable "API_BASE_URL"');
}

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    env: {
        API_BASE_URL: apiBaseUrl,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: 'standalone',
    compiler:
        process.env.NODE_ENV === 'production'
            ? {
                  removeConsole: {
                      exclude: ['dir'],
                  },
                  reactRemoveProperties: true,
              }
            : {},
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${apiBaseUrl}/:path*`,
            },
        ];
    },
};

export default nextConfig;
