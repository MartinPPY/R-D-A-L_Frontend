import api from "./axiosService"

export const getResumenMensualAlumno = async () => {
    const response = await api.get("/v1/core/resumen", { withCredentials: true })
    return response.data
}

