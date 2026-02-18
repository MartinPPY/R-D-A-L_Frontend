import api from "@/api/config"

export const getResumenMensualAlumno = async () => {
    const response = await api.get("/v1/core/resumen")
    return response.data
}

export const getResumenMensualAdmin = async () => {
    const response = await api.get("/v1/core/resumen-admin")
    return response.data
}

export const getResumenPagoMensual = async () => {
    const response = await api.get("/v1/core/resumen-pago")
    return response.data
}


