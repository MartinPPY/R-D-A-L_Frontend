import type { Activity } from "@/models"
import { Button, Item, ItemActions, ItemContent, ItemDescription, ItemTitle, ScrollArea } from "../ui"
import { diferenciaEntreHoras } from "@/helpers"

interface Props {
    activity: Activity[]
}

export const AdminActivityDataMobile = ({ activity }: Props) => {
    return (
        <ScrollArea className="h-96 lg:hidden">
            <div className="flex w-full max-w-md flex-col gap-6 lg:hidden">
                <h3 className="text-lg font-semibold">Actividades de usuarios</h3>
                {activity.map((activity) => (
                    <Item variant="outline" key={activity.id}>
                        <ItemContent>
                            <ItemTitle>{activity.user.first_name} {activity.user.last_name}</ItemTitle>
                            <ItemDescription>
                                Area: {activity.area.name}, Cantidad: {diferenciaEntreHoras(activity.hora_inicio, activity.hora_fin)} horas
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <Button variant="outline" size="sm">
                                Aprobar
                            </Button>
                        </ItemActions>
                    </Item>
                ))}
            </div>
        </ScrollArea>
    )
}
