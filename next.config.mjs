/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'themesflat.co'
            },
            {
                protocol: 'https',
                hostname: 'i.postimg.cc'
            }
        ]
    }
};

export default nextConfig;
