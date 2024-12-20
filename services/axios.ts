import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.API_HOST,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
