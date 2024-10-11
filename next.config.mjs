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
            {
                source: '/ad/custInfo',
                destination: '/layout/ad/custInfo',
            },
            {
                source: '/client/custInfo',
                destination: '/layout/client/custInfo',
            },
            {
                source: '/crm/custInfo',
                destination: '/layout/crm/custInfo',
            },
        ];
    },
};

export default nextConfig;
