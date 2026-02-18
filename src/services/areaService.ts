import api from "@/api/config"

export const getAreas = async () => {

    const response = await api.get("/v1/core/area")
    return response

}