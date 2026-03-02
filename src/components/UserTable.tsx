import { diferenciaEntreHoras } from "@/helpers/activityHelper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import type { Activity } from "@/models";

export const UserTable = ({ actividades }: { actividades: Activity[] }) => {
    return (
        <div className="px-12">
            <Card>
                <CardHeader>
                    <CardTitle>Historial del mes</CardTitle>
                    <CardDescription>Registro de todas las transacciones del mes</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-80">
                        <Table>
                            <TableCaption> {actividades.length === 0 && "No hay actividades"}</TableCaption>
                            <TableCaption> Actividades del mes de {new Date().toLocaleString('default', { month: 'long' })}</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Hora de inicio</TableHead>
                                    <TableHead>Hora fin</TableHead>
                                    <TableHead>Area</TableHead>
                                    <TableHead>Cantidad</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {
                                    actividades.map((act, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{act.hora_inicio}</TableCell>
                                            <TableCell>{act.hora_fin}</TableCell>
                                            <TableCell>{act.area.name}</TableCell>
                                            <TableCell>{diferenciaEntreHoras(act.hora_inicio, act.hora_fin)} H</TableCell>
                                        </TableRow>
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
