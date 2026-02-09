import type { AxiosInstance } from "axios"
import axios from "axios"

const BASE_URL = "http://localhost:8000/api/"

const api:AxiosInstance = axios.create({
    baseURL: BASE_URL
})

export default api

