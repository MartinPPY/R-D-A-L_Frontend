import type { OrdenCompra, ResumenPago } from "@/models"
import { TableRow, TableCell, Button } from "@/components/ui"
import { parseDate } from "@/helpers"
import { useCreateOrdenCompra } from "../hooks/usePagos"

interface Props {
  resumenPagos: ResumenPago[]
}

export const PagosRows = ({ resumenPagos }: Props) => {
  const mutation = useCreateOrdenCompra()

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
    <>
      {resumenPagos.map((resumen, index) => (
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
      ))}
    </>
  )
}
