import api from "@/api/config";
import type { Activity, RequestBody } from "@/models";

export const activityService = {
    getActivitiesByMonth: async (): Promise<Activity[]> => {
        const { data } = await api.get("/v1/core/actividad/");
        return data
    },
    createActivity: async (activity: RequestBody) => {
        const { data } = await api.post("/v1/core/actividad/", activity);
        return data
    },
    aprobarActividad: async (id: number) => {
        const { data } = await api.patch(`/v1/core/actividad/${id}/`, { aprobado: true });
        return data
    }

}