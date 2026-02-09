import api from "./axiosService"

export const getAreas = async () => {

    const response = await api.get("/v1/core/area", { withCredentials: true })
    return response

}