import type { OrdenCompra, ResumenPago } from "@/models"
import { TableRow, TableCell, Button } from "@/components/ui"
import { parseDate } from "@/helpers"
import { createOrdenCompra } from "@/services/ordenPagoService"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface Props {
  resumenPagos: ResumenPago[]
}

export const AdminPagosData = ({ resumenPagos }: Props) => {

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createOrdenCompra,
    onSuccess: async () => {
      toast.success("Orden de compra creada exitosamente", { position: "top-center" })
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["resumen-pago"] }),
        queryClient.invalidateQueries({ queryKey: ["resumen-admin"] })
      ])
    },
    onError: (error) => {
      toast.error("Error al crear orden de compra", { position: "top-center" })
      console.error(error)
    }
  })

  const crearOrdenCompra = (user_id: number, monto: number) => {
    const date = parseDate(new Date())
    const ordenCompra: OrdenCompra = {
      fecha: date,
      monto: monto,
      user: user_id
    }
    mutation.mutate(ordenCompra)
  }


  return (
    resumenPagos.map((resumen, index) => (
      resumen.monto_acumulado > 0 && (
        <TableRow key={index}>
          <TableCell>{resumen.usuario}</TableCell>
          <TableCell>{resumen.monto_acumulado}</TableCell>
          <TableCell>
            <Button
              size="sm"
              variant="outline"
              onClick={() => crearOrdenCompra(resumen.user_id, resumen.monto_acumulado)}
              disabled={mutation.isPending}>
              {mutation.isPending ? "Subiendo..." : "Subir orden de compra"}
            </Button>
          </TableCell>
        </TableRow>
      )
    ))
  )
}
