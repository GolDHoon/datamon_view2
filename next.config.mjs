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
            {
                source: '/join/signup',
                destination: '/layout/join/signup',
            },
            {
                source: '/join/signup/complete',
                destination: '/layout/join/signup/complete',
            },
            {
                source: '/user/approval/:dynamic',
                destination: '/layout/user/approval/:dynamic',
            },
            {
                source: '/user/:dynamic',
                destination: '/layout/user/:dynamic',
            },
            {
                source: '/admin/approval/:dynamic',
                destination: '/layout/admin/approval/:dynamic',
            },
            {
                source: '/admin/:dynamic',
                destination: '/layout/admin/:dynamic',
            },
            {
                source: '/(.*)',  // 이 부분을 추가하여 나머지 모든 경로를 404로 리다이렉트합니다.
                destination: '/404'
            }
        ];
    },
};

export default nextConfig;
