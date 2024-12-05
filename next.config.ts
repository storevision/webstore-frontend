import type { NextConfig } from 'next';
// import { configDotenv } from 'dotenv';

const apiBaseUrl = process.env.API_BASE_URL;

if (!apiBaseUrl) {
    throw new Error('Missing required environment variable "API_BASE_URL"');
}

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    env: {
        API_BASE_URL: apiBaseUrl,
    },
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
