import type { Activity } from "@/models"
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Badge, Button,
    TableCell, TableRow
} from "./ui"
import { diferenciaEntreHoras } from "@/helpers"
import { updateStatus } from "@/api"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"


interface Props {
    actividades: Activity[]
}

export const AdminActivityData = ({ actividades }: Props) => {

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: updateStatus,
        onSuccess: async () => {
            toast.success("Actividad aprobada", { position: "top-center" });
            Promise.all([
                queryClient.invalidateQueries({ queryKey: ["activities"] }),
                queryClient.invalidateQueries({ queryKey: ["resumen-admin"] })
            ])
        },
        onError: (error) => {
            console.error(error);
            toast.error("Error al aprobar la actividad", { position: "top-center" });
        }
    })

    const aprobarActividad = async (id: number) => {
        mutation.mutate(id);
    }

    return (
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
    )
}
