import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createOrdenCompra, getResumenPagoMensual } from "../services/pagos.service"
import { toast } from "sonner"

export const useResumenPagos = () => {
    return useQuery({
        queryKey: ["resumen-pago"],
        queryFn: getResumenPagoMensual
    })
}

export const useCreateOrdenCompra = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createOrdenCompra,
        onSuccess: async () => {
            toast.success("Orden de compra creada exitosamente", { position: "top-center" })
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["resumen-pago"] }),
                queryClient.invalidateQueries({ queryKey: ["resumen-admin"] })
            ])
        },
        onError: (error) => {
            toast.error("Error al crear orden de compra", { position: "top-center" })
            console.error(error)
        }
    })
}
