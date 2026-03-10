import api from "@/api/config"
import type { OrdenCompra, ResumenPago } from "@/models"

export const getResumenPagoMensual = async (): Promise<ResumenPago[]> => {
    const response = await api.get("/v1/core/resumen-pago")
    return response.data
}

export const createOrdenCompra = async (ordenCompra: OrdenCompra) => {
    const response = await api.post("/v1/core/orden-compra/", ordenCompra)
    return response.data
}
