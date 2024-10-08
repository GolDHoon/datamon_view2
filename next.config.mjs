/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/:companyId/login',
                destination: '/layout/:companyId/login',
            },
        ];
    },
};

export default nextConfig;
