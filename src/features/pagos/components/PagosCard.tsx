import type { OrdenCompra, ResumenPago } from "@/models"
import { Card, CardContent, Button } from "@/components/ui"
import { parseDate } from "@/helpers"
import { useCreateOrdenCompra } from "../hooks/usePagos"

interface Props {
  resumen: ResumenPago
}

export const PagosCard = ({ resumen }: Props) => {
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
    <Card className="overflow-hidden border-l-4 border-l-primary/50">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-sm font-medium text-muted-foreground">Usuario</span>
            <h3 className="font-bold text-lg">{resumen.usuario}</h3>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-muted-foreground">Monto Acumulado</span>
            <p className="font-bold text-xl text-primary">${resumen.monto_acumulado} CLP</p>
          </div>
        </div>
        
        <div className="flex justify-end pt-2 border-t">
          <Button
            size="sm"
            className="w-full sm:w-auto"
            onClick={() => crearOrdenCompra(resumen.user_id, resumen.monto_acumulado)}
            disabled={mutation.isPending}>
            {mutation.isPending ? "Subiendo..." : "Subir orden de compra"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
