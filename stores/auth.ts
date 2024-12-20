import {defineStore} from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string | null,
    }),
    actions: {
        async login(email: string, password: string) {
            try {
                const response = await axios.post('/auth/login', {email, password});
                this.token = response.data.accessToken;
                localStorage.setItem('accessToken', this.token);
                this.setAxiosToken(this.token);
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },
        setAxiosToken(token: string | null) {
            axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
        },
        logout() {
            this.token = null;
            localStorage.removeItem('accessToken');
            this.setAxiosToken(null);
        },
        loadTokenFromStorage() {
            const token = localStorage.getItem('accessToken');
            if (token) {
                this.token = token;
                this.setAxiosToken(token);
            }
        },
    },
});
