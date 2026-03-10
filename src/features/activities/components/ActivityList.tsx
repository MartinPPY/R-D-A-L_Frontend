import type { Activity } from "@/models";
import { useAuth } from "@/context/AuthContext";
import { diferenciaEntreHoras } from "@/helpers";
import { ApproveButton } from "./ApproveButton";
import { Badge, Card, CardContent } from "@/components/ui";

interface Props {
    activities: Activity[];
}

export const ActivityList = ({ activities }: Props) => {
    const { rol } = useAuth();

    return (
        <div className="flex flex-col gap-4">
            {activities.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground bg-muted/20 rounded-lg">
                    No hay actividades para mostrar
                </div>
            ) : (
                activities.map((activity) => (
                    <Card key={activity.id} className="overflow-hidden border-l-4 border-l-primary/50">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-lg">
                                        {activity.user.first_name} {activity.user.last_name}
                                    </h3>
                                    <Badge variant="outline" className="mt-1">
                                        {activity.area.name}
                                    </Badge>
                                </div>
                                <div className="text-right">
                                    <span className="block text-sm text-muted-foreground">{activity.fecha}</span>
                                    <span className="block font-semibold text-primary">
                                        {diferenciaEntreHoras(activity.hora_inicio, activity.hora_fin)} H
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4 py-2 border-t text-sm">
                                <span className="text-muted-foreground">
                                    {activity.hora_inicio} - {activity.hora_fin}
                                </span>
                                
                                {rol === "moderador" && (
                                    <div>
                                        {activity.aprobado === true ? (
                                            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                                                Aprobada
                                            </Badge>
                                        ) : (
                                            <ApproveButton id={activity.id} />
                                        )}
                                    </div>
                                )}
                                
                                {rol !== "moderador" && (
                                    <Badge variant={activity.aprobado ? "secondary" : "outline"} 
                                           className={activity.aprobado ? "bg-green-100 text-green-700 border-none" : ""}>
                                        {activity.aprobado ? "Aprobada" : "Pendiente"}
                                    </Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    )
}
