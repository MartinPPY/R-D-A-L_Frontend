import api from "@/api/config"
import type { ResumenAdmin, ResumenMensualUser, ResumenPago } from "@/models"

export const resumenService = {
    getResumenMensualByAlumno: async (): Promise<ResumenMensualUser> => {
        const { data } = await api.get("/v1/core/resumen")
        return data
    },
    getResumenMensualAdmin: async (): Promise<ResumenAdmin> => {
        const { data } = await api.get("/v1/core/resumen-admin")
        console.log(data)
        return data
    },
    getResumenPagoMensual: async (): Promise<ResumenPago> => {
        const { data } = await api.get("/v1/core/resumen-pago")
        return data
    }

}