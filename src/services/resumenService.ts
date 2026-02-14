import api from "./axiosService"

export const getResumenMensualAlumno = async () => {
    const response = await api.get("/v1/core/resumen", { withCredentials: true })
    return response.data
}

export const getResumenMensualAdmin = async () => {
    const response = await api.get("/v1/core/resumen-admin", { withCredentials: true })
    return response.data
}

export const getResumenPagoMensual = async () => {
    const response = await api.get("/v1/core/resumen-pago", { withCredentials: true })
    return response.data
}


