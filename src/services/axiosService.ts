import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import axios from "axios"

interface FailedRequest {
    resolve: (value?: unknown) => void;
    reject: (error: AxiosError) => void;
}

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}


let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: AxiosError | null = null): void => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};


const BASE_URL = "http://localhost:8000/api/"
const REFRESH_URL = "/v1/refresh"

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL
})



api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,

    async (error: AxiosError) => {

        if(!error.config){
            return Promise.reject(error)
        }

        const originalRequest = error.config as RetryAxiosRequestConfig;

        const isRefreshRequest =
            originalRequest.url === REFRESH_URL ||
            originalRequest.url?.endsWith(REFRESH_URL);

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !isRefreshRequest
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => api(originalRequest));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await api.post("/v1/refresh", { withCredentials: true });
                processQueue();
                return api(originalRequest);
            } catch (err) {
                processQueue(err as AxiosError);
                window.location.href = "/login";
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api

