import api from "./axiosService"

interface Activity {
    fecha: string,
    hora_inicio: string,
    hora_fin: string,
    area_id: number
}


export const createActivity = async (activity: Activity) => {
    const response = await api.post("/v1/core/actividad/", activity, { withCredentials: true })
    return response.data
}

export const getActivities = async ()=>{
    const response = await api.get("/v1/core/actividad/", { withCredentials: true })
    return response.data
}

export const updateStatus = async(id:number)=>{
    const response = await api.patch(`/v1/core/actividad/${id}/`,{aprobado:true},{withCredentials:true})
    return response.data
}