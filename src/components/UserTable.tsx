import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

interface Activity {
    id: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    area: {
        id: number,
        name: string
    };
}

export const UserTable = ({ actividades }: { actividades: Activity[] }) => {
    return (
        <div className="px-12">
            <Card>
                <CardHeader>
                    <CardTitle>Historial del mes</CardTitle>
                    <CardDescription>Registro de todas las transacciones del mes</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption> Actividades del mes de octubre</TableCaption>
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
                                        <TableCell>1</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardContent>

            </Card>
        </div>
    )
}
