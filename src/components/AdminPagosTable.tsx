import { ChartColumn, Info } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { useState } from "react"
import { getResumenMensualAdmin, getResumenPagoMensual } from "@/services/resumenService"
import { createOrdenCompra } from "@/services/ordenPagoService"
import { toast } from "sonner"
import type { OrdenCompra, Resumen, ResumenPago } from "@/models"

interface Props{
    setResumen:React.Dispatch<React.SetStateAction<Resumen>>; 
}

export const AdminPagosTable = ({setResumen}:Props) => {

    const [resumenPago, setResumenPago] = useState<ResumenPago[]>([])
    const [loading,setLoading] = useState<boolean>(false)

    const handleClick = async () => {
        const resumenPago = await getResumenPagoMensual()        
        setResumenPago(resumenPago)
    }

    const crearOrdenCompra = async (user_id:number, monto:number) => {

        const date = new Date().getFullYear() + "-" + "0" + 
        (new Date().getMonth() + 1) + "-" + (new Date().getDate().toString().length === 1 ? "0" + 
        new Date().getDate() : new Date().getDate())

        const ordenCompra:OrdenCompra = {
            fecha:date,
            monto:monto,
            user:user_id    
        }

        try {
            setLoading(true)
            await createOrdenCompra(ordenCompra)
            toast.success("Orden de compra creada exitosamente")
            setResumenPago([])
            const resumen = await getResumenMensualAdmin()
            setResumen(resumen)
        } catch (error:any) {

            toast.error("Error al crear orden de compra")
            console.error(error)
        } finally{
            setLoading(false)

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
                            <TableCaption>
                                <Button size="sm" onClick={handleClick} >{loading ? "Generando..." : "Generar Pagos"}</Button>
                            </TableCaption>
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
                                                <TableCell> 
                                                    <Button 
                                                        size="sm" 
                                                        variant="outline" 
                                                        onClick={() => crearOrdenCompra(resumen.user_id, resumen.monto_acumulado)}>
                                                            {loading ? "Subiendo..." : "Subir orden de compra"}
                                                    </Button>
                                                </TableCell>
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
