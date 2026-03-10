import { Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, ScrollArea, Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui"
import { useResumenPagos } from "../hooks/usePagos"
import { PagosRows } from "./PagosRows"
import { PagosCard } from "./PagosCard"

export const PagosTable = () => {
    const { data: resumenPagos = [] } = useResumenPagos()

    return (
        <div className="px-4 md:px-12">
            <Card>
                <CardHeader>
                    <CardTitle className="flex gap-2 " >
                        Resumen de pagos <Info size={16} />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="hidden md:block">
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
                                    <PagosRows resumenPagos={resumenPagos} />
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </div>

                    <div className="block md:hidden">
                        <div className="flex flex-col gap-4">
                            {resumenPagos.length === 0 ? (
                                <div className="text-center p-8 text-muted-foreground bg-muted/20 rounded-lg">
                                    No hay pagos para mostrar
                                </div>
                            ) : (
                                resumenPagos.map((resumen, index) => (
                                    resumen.monto_acumulado > 0 && (
                                        <PagosCard key={index} resumen={resumen} />
                                    )
                                ))
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
