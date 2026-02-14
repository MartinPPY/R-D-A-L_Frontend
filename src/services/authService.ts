import api from "./axiosService"

export const login = async (username: string, password: string) => {
    return api.post("/v1/auth/login", { username, password }, { withCredentials: true })
}

export const getPermisos = async () => {
    return api.get("/v1/auth/permissions", { withCredentials: true })
}

export const verifyAuth = async () => {
    const response = await api.get("/v1/auth/me", { withCredentials: true })
    return response.data
}

export const logout = async () => {
    return api.post("/v1/auth/logout", {}, { withCredentials: true })
}
