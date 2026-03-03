import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "./ui/table"
import { AdminActivityData } from "./AdminActivityData";
import type { Activity } from "@/models";

interface Props {
    actividades: Activity[];
}

export const AdminActivityTable = ({ actividades }: Props) => {

    return (
        <div className="px-12 hidden lg:block">
            <Card>
                <CardHeader>
                    <CardTitle>Actividades de usuarios </CardTitle>
                    <CardDescription>Registro de actividades de los usuarios</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="w-full">
                        <Table>
                            <TableCaption>Registros del mes</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Area</TableHead>
                                    <TableHead>Cantidad</TableHead>
                                    <TableHead>Acción</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <AdminActivityData actividades={actividades} />
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}
