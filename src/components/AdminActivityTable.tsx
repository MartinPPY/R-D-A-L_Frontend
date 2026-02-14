import { diferenciaEntreHoras } from "@/helpers/activityHelper";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { toast } from "sonner";
import { updateStatus } from "@/services/actividadService";
import { getResumenMensualAdmin } from "@/services/resumenService";

interface Actividad {
    id: number;
    area: {
        id: number;
        name: string;
    };
    user: {
        id: number;
        first_name: string;
        last_name: string;
    };
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    aprobado: boolean;
}


export const AdminActivityTable = ({ actividades, setResumen }: { actividades: Actividad[], setResumen: (resumen: any) => void }) => {

    const aprobarActividad = async (id:number) => {
        try {

            await updateStatus(id)
            toast("Actividad aprobada",{position:"top-center"});
            const response = await getResumenMensualAdmin()
            setResumen(response)        

        } catch (error:any) {

            toast("Error al aprobar la actividad",{position:"top-center"});
            console.error(error);

        }
    }


    return (
        <div className="px-12">
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
                                {
                                    actividades.map((act, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{act.user.first_name} {act.user.last_name}</TableCell>
                                            <TableCell>{act.area.name}</TableCell>
                                            <TableCell>{diferenciaEntreHoras(act.hora_inicio, act.hora_fin)}</TableCell>
                                            <TableCell>
                                                {act.aprobado ? <Badge variant="default">Aprobado</Badge> :
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="outline" size="sm">Aprobar</Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Esta acción aprobará la actividad del usuario.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => aprobarActividad(act.id)}>Aprobar</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>}
                                            </TableCell>
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
