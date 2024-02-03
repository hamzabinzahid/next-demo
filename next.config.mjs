/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8000',
                // pathname: '/account123/**',
            },
        ],
        unoptimized: true,
    },
};

export default nextConfig;
