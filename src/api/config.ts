import type { AxiosError, AxiosInstance, AxiosResponse } from "axios"
import axios from "axios"

const BASE_URL = "http://localhost:8000/api/"

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})



api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,

    async (error: AxiosError | any) => {

        const originalRequest = error.config as any

        if (error.response?.data?.code === "token_not_valid" && !originalRequest._retry) {

            originalRequest._retry = true
            try {
                await api.post("/v1/auth/refresh",{},{withCredentials: true})
                return api(originalRequest)
            } catch (error) {
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
)

export default api

