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
                source: '/ad/custInfo/:dynamic',
                destination: '/layout/ad/custInfo/:dynamic',
            },
            {
                source: '/client/custInfo/:dynamic',
                destination: '/layout/client/custInfo/:dynamic',
            },
            {
                source: '/crm/custInfo/:dynamic',
                destination: '/layout/crm/custInfo/:dynamic',
            },
        ];
    },
};

export default nextConfig;
