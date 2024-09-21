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
                hostname: 'memoraapi.bitnata.com'
            }
        ]
    }
};

export default nextConfig;
