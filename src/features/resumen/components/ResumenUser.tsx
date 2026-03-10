import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import type { Resumen } from "@/models";
import { Calendar, Check, DollarSign, Ticket } from "lucide-react";
import { useResumenUser } from "../hooks/useResumen";



export const ResumenUser = () => {
    const {data} = useResumenUser()

    const menus: Resumen[] = [
        {
            title: "Horas registradas",
            value: data?.horas_acumuladas?.toString() + "h",
            description: "Del mes de " + new Date().toLocaleString('default', { month: 'long' }),
            icon: Calendar,
        },
        {
            title: "Actividades aprobadas",
            value: data?.horas_aprobadas?.toString() + "",
            description: "Del mes de " + new Date().toLocaleString('default', { month: 'long' }),
            icon: Check
        },
        {
            title: "Monto Acumulado",
            value: "$" + data?.total_acumulado?.toString() + " CLP",
            description: "Del mes de " + new Date().toLocaleString('default', { month: 'long' }),
            icon: DollarSign
        },
        {
            title: "Orden de compra",
            value: data?.orden_compra?.toString() || "N/A",
            description: "Del mes de " + new Date().toLocaleString('default', { month: 'long' }),
            icon: Ticket
        }
    ]
    return (
        <div className="grid grid-cols-1 gap-4 px-4 md:px-12 md:grid-cols-2 lg:grid-cols-4">
            {menus.map((menu, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardDescription>{menu.title}</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {menu.value}
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            {menu.description} <menu.icon className="size-4" />
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
