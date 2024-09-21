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
            },
            {
                protocol: 'https',
                hostname: 'i.postimg.cc'
            },
            {
                protocol: 'https',
                hostname: 'gray-academic-grouse-23.mypinata.cloud'
            }
        ]
    },
};

export default nextConfig;
