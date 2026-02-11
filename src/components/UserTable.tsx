import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area";
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

const diferenciaEntreHoras = (inicio: string, fin: string) => {

    const toSeconds = (t: string) => {
        const [h, m, s] = t.split(":").map(Number);
        return h * 3600 + m * 60 + s;
    };

    let diff = toSeconds(fin) - toSeconds(inicio);

    // si cruza medianoche
    if (diff < 0) {
        diff += 24 * 3600;
    }

    // convertir a horas y redondear
    return Math.round(diff / 3600);

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
                    <ScrollArea className="h-80">
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
