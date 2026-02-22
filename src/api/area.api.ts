import type { Area } from "@/models"
import api from "./config"

export const getAreas = async ():Promise<Area[]> => {
    const response = await api.get<Area[]>("/v1/core/area/")
    return response.data

}