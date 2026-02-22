import type { Activity, RequestBody } from "@/models"
import api from "./config"

export const createActivity = async (activity: RequestBody) => {
    const response = await api.post("/v1/core/actividad/", activity)
    return response.data
}

export const getActivities = async ():Promise<Activity[]> => {
    const response = await api.get("/v1/core/actividad/")
    return response.data
}

export const updateStatus = async (id: number) => {
    const response = await api.patch(`/v1/core/actividad/${id}/`, { aprobado: true })
    return response.data
}