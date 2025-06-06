import axios from "axios";
import { emitAccessTokenRefresh } from "./event";

const api = axios.create({
    baseURL: "https://todo-app-nhbt.onrender.com",
    withCredentials: true
});

let isRefreshing = false; 
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach(prom => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                    return api(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await api.post(`https://todo-app-nhbt.onrender.com/refresh`);
                const newAccessToken = data.accessToken;

                api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                emitAccessTokenRefresh(newAccessToken);
                processQueue(null, newAccessToken);

                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                console.error("Refresh token failed, logging out:", refreshError);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
