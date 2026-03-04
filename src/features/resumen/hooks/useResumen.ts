import { useQuery } from "@tanstack/react-query"
import { resumenService } from "../services/resumen.service"

export const useResumenUser = () => {
    return useQuery({
        queryKey:["resumen-user"],
        queryFn: resumenService.getResumenMensualByAlumno
    })
}

export const useResumenAdmin = () => {
    return useQuery({
        queryKey:["resumen-admin"],
        queryFn: resumenService.getResumenMensualAdmin
    })
}

export const useResumenPago = () => {
    return useQuery({
        queryKey:["resumen-pago"],
        queryFn: resumenService.getResumenPagoMensual
    })
}
