import api from "./axiosService"

export const login = async (username: string, password: string) => {
    return api.post("/v1/auth/login", { username, password }, { withCredentials: true })
}

export const getPermisos = async () => {
    return api.get("/v1/auth/permissions", { withCredentials: true })
}