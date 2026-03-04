import type { Resumen } from "@/models"
import { useResumenAdmin } from "../hooks/useResumen"
import { Clock, FileDigit, Users } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui"


export const ResumenAdmin = () => {
    const { data } = useResumenAdmin()
    console.log(data)

    const menus: Resumen[] = [
        {
            title: "Total de horas",
            value: data?.cantidad_horas.toString() || "0",
            description: "Del mes de " + new Date().toLocaleString('default', { month: 'long' }),
            icon: Clock
        },
        {
            title: "Alumnos",
            value: data?.usuarios.toString() || "0",
            description: "Total de usuarios registrados",
            icon: Users
        },
        {
            title: "Ordenes de compra",
            value: data?.cantidad_orden_compra.toString() || "0",
            description: "Del mes de " + new Date().toLocaleString('default', { month: 'long' }),
            icon: FileDigit
        }


    ]

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:px-12">
            {
                menus.map((menu, index) => (
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
                ))
            }

        </div>
    )

}
