import { Clock, FileDigit, Users } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface Menu {
    title: string;
    value: string;
    description: string;
    icon: React.ReactNode;
}

interface Resumen{
    usuarios: number;
    cantidad_horas: number;
    cantidad_orden_compra: number;
}

export const AdminCardSection = ({resumen}: {resumen: Resumen}) => {

    const menus: Menu[] = [
        {
            title: "Total de horas",
            value: resumen.cantidad_horas.toString(),
            description: "Del mes de " + new Date().toLocaleString('default', { month: 'long' }),
            icon: <Clock size={16} />
        },
        {
            title: "Alumnos",
            value: resumen.usuarios.toString(),
            description: "Total de usuarios registrados",
            icon: <Users size={16} />
        },
        {
            title: "Ordenes de compra",
            value: resumen.cantidad_orden_compra.toString(),
            description: "Del mes de " + new Date().toLocaleString('default', { month: 'long' }),
            icon: <FileDigit size={16} />
        }
    ]

    return (
        <div className="grid grid-cols-1 gap-4 px-12 md:grid-cols-2 lg:grid-cols-3">
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
                                {menu.description} {menu.icon}
                            </div>
                        </CardFooter>
                    </Card>
                ))
            }

        </div>
    )
}
