import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

export const UserTable = () => {
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
                            <TableRow>
                                <TableCell>INV001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell>$250.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>

            </Card>
        </div>
    )
}
