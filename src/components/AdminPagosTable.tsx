import { Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "./ui/table"
import { useQuery } from "@tanstack/react-query"
import { getResumenPagoMensual } from "@/api"
import { AdminPagosData } from "./AdminPagosData"

export const AdminPagosTable = () => {

    const resumenPagoQuery = useQuery({ queryKey: ["resumen-pago"], queryFn: getResumenPagoMensual })

    return (
        <div className="px-12">
            <Card>
                <CardHeader>
                    <CardTitle className="flex gap-2 " >
                        Resumen de pagos <Info size={16} />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="w-full">
                        <Table>
                            <TableCaption>
                                Del mes de {new Date().toLocaleDateString('es-ES', { month: 'long' })}
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Monto (CLP)</TableHead>
                                    <TableHead>Accion</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <AdminPagosData resumenPagos={resumenPagoQuery.data || []} />
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>


        </div>
    )
}
