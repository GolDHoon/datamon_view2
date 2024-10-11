/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/:companyId/login',
                destination: '/layout/:companyId/login',
            },
            {
                source: '/home',
                destination: '/layout/home',
            },
        ];
    },
};

export default nextConfig;
