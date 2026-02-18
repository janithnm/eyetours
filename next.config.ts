import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
            },
            {
                protocol: 'https',
                hostname: 'www.vecteezy.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'virgin-travel-app.b-cdn.net',
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '50mb',

        },
        

        proxyClientMaxBodySize: '50mb',

    },
};

export default nextConfig;
