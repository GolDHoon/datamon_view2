// axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_MAIN_API_BASE_URL, // 기본 URL 설정
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;