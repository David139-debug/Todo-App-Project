import axios from "axios";

const api = axios.create({
    baseURL: "https://todo-app-nhbt.onrender.com",
    withCredentials: true
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest.retry = true;
            try {
                await api.get("/refresh");
                return api(originalRequest);
            } catch (err) {
                console.error("Failed to refresh token.");
            }
        }
        return Promise.reject(error);
    }
)

export default api;