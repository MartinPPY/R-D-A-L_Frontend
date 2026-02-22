import type { ResumenPago } from "@/models"
import api from "./config"

export const getResumenMensualAlumno = async () => {
    const response = await api.get("/v1/core/resumen")
    return response.data
}

export const getResumenMensualAdmin = async () => {
    const response = await api.get("/v1/core/resumen-admin")
    return response.data
}

export const getResumenPagoMensual = async (): Promise<ResumenPago[]> => {
    const response = await api.get<ResumenPago[]>("/v1/core/resumen-pago")
    return response.data
}
