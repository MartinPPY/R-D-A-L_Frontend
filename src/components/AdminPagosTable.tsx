import { ChartColumn, Info } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { useState } from "react"
import { getResumenPagoMensual } from "@/services/resumenService"
import { createOrdenCompra } from "@/services/ordenPagoService"

interface ResumenPago {
    user_id: number;
    usuario: string;
    monto_acumulado: number;
}

interface OrdenCompra{
    fecha:string;
    monto:number;
    user:number;
}

export const AdminPagosTable = () => {

    const [resumenPago, setResumenPago] = useState<ResumenPago[]>([])

    const handleClick = async () => {
        const resumenPago = await getResumenPagoMensual()

        console.log(resumenPago)
        setResumenPago(resumenPago)
    }

    const crearOrdenCompra = async (user_id:number, monto:number) => {

        const date = new Date().getFullYear() + "-" + "0" + (new Date().getMonth() + 1) + "-" + (new Date().getDate().toString().length === 1 ? "0" + new Date().getDate() : new Date().getDate())

        const ordenCompra:OrdenCompra = {
            fecha:date,
            monto:monto,
            user:user_id    
        }

        console.log(ordenCompra)

        try {
            await createOrdenCompra(ordenCompra)
        } catch (error:any) {
            console.log(error.response)
        }

    }



    return (
        <div className="px-12">
            <div className="flex justify-end mb-4">
                <Button>Descargar reporte <ChartColumn /> </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex gap-2 " >
                        Resumen de pagos <Info size={16} />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="w-full">
                        <Table>
                            <TableCaption><Button size="sm" onClick={handleClick} >Generar Pagos a los usuarios</Button></TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Monto (CLP)</TableHead>
                                    <TableHead>Accion</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    resumenPago.map((resumen, index) => (
                                        resumen.monto_acumulado > 0 && (
                                            <TableRow key={index}>
                                                <TableCell>{resumen.usuario}</TableCell>
                                                <TableCell>{resumen.monto_acumulado}</TableCell>
                                                <TableCell> <Button size="sm" variant="outline" onClick={() => crearOrdenCompra(resumen.user_id, resumen.monto_acumulado)}>Subir orden de compra</Button></TableCell>
                                            </TableRow>
                                        )
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>


        </div>
    )
}
