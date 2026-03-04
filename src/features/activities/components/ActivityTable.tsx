import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, ScrollArea, Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui"
import type { Activity } from "@/models"
import { ApproveButton } from "./ApproveButton"
import { diferenciaEntreHoras } from "@/helpers"
import { useAuth } from "@/context/AuthContext"

interface Props {
    activities: Activity[]
}

const ActivityRow = ({ activity }: { activity: Activity }) => {
    const {rol} = useAuth()

    return (
        <TableRow>
            <TableCell>{activity.user.first_name} {activity.user.last_name}</TableCell>
            <TableCell>{activity.area.name}</TableCell>
            <TableCell>{activity.hora_inicio} - {activity.hora_fin}</TableCell>
            <TableCell>{diferenciaEntreHoras(activity.hora_inicio, activity.hora_fin)} H</TableCell>
            {rol === "moderador" && <TableCell>
                {activity.aprobado === true ? <Button variant="ghost" size="xs">Aprobada</Button> : <ApproveButton id={activity.id} />}
            </TableCell>}

        </TableRow>
    )
}

export const ActivityTable = ({ activities }: Props) => {
    const {rol} = useAuth()
    return (

        <Card>
            <CardHeader>
                <CardTitle>{rol === "moderador" ? "Actividades de usuarios" : "Mis actividades"} </CardTitle>
                <CardDescription>{rol === "moderador" ? "Registro de actividades de los usuarios" : "Registro de mis actividades"}</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="w-full">
                    <Table>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Area</TableHead>
                            <TableHead>Horario</TableHead>
                            <TableHead>Cantidad</TableHead>
                            {rol === "moderador" && <TableHead>Acción</TableHead>}
                        </TableRow>
                        <TableBody>
                            {activities.map((activity) => (
                                <ActivityRow key={activity.id} activity={activity} />
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>

        </Card>
    )
}
