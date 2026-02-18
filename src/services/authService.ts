import api from "@/api/config"

export const login = async (username: string, password: string) => {
    return api.post("/v1/auth/login", { username, password })
}

export const getPermisos = async () => {
    return api.get("/v1/auth/permissions")
}

export const verifyAuth = async () => {
    const response = await api.get("/v1/auth/me")
    return response.data
}

export const logout = async () => {
    return api.post("/v1/auth/logout", {})
}
